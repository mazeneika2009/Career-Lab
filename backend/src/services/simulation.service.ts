import { prisma } from '../utils/prisma.js'
import { AppError } from '../utils/http.js'
import { ulid } from '../utils/ids.js'
import { INTERVIEW_PASS_SCORE } from '../config/constants.js'
import { requireActiveCareer, notify } from './domain.helpers.js'
import { assessSubmission, buildEvaluationDraft, recordEvaluation } from './evaluator.js'
import { computeSimulationGate, type SimulationGate } from './interview-gate.service.js'
import { recomputeSkillProgress } from './progress.service.js'
import {
  mirrorWorkplaceState,
  type WorkplaceModule,
  type WorkplaceModuleState
} from './workplace-progress.service.js'
import type { Prisma, SimulationState } from '@prisma/client'

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? (value as string[]) : []
}

/** Public simulation payload; internal BigInt identifiers never leave the API. */
function toSimulationView(state: SimulationState) {
  return {
    publicId: state.publicId,
    companyName: state.companyName,
    roleTitle: state.roleTitle,
    status: state.status,
    startedAt: state.startedAt
  }
}

export { getSimulationGate } from './interview-gate.service.js'

const WORKPLACE_MODULE_LABEL: Record<WorkplaceModule, string> = {
  company_simulation: 'the company simulation and workplace tasks',
  team_communication: 'team communication',
  client_communication: 'client communication',
  deadlines: 'deadlines and priorities',
  scenarios: 'workplace scenarios'
}

function workplaceAccess(gate: SimulationGate, module: WorkplaceModule): boolean {
  switch (module) {
    case 'company_simulation':
      return gate.workplace.companySimulation
    case 'team_communication':
      return gate.workplace.teamCommunication
    case 'client_communication':
      return gate.workplace.clientCommunication
    case 'deadlines':
      return gate.workplace.deadlines
    case 'scenarios':
      return gate.workplace.scenarios
  }
}

/** Throw a friendly, typed lock error for one specific workplace module. */
function assertWorkplaceAccess(gate: SimulationGate, module: WorkplaceModule): void {
  if (workplaceAccess(gate, module)) return

  if (!gate.unlocked) {
    const hrPending = gate.hr.status !== 'passed'
    const message = hrPending
      ? gate.hr.status === 'failed'
        ? `Your virtual interview scored ${gate.hr.score ?? 0}/100. Reach ${INTERVIEW_PASS_SCORE}/100 in a retake to unlock the technical interview and workplace.`
        : 'Pass the virtual interview first — the technical interview and workplace surfaces unlock afterwards.'
      : gate.technical.status === 'failed'
        ? `Your technical interview scored ${gate.technical.score ?? 0}/100. Reach ${INTERVIEW_PASS_SCORE}/100 in a retake to unlock the company simulation and workplace channels.`
        : 'Pass the technical interview to unlock the company simulation, team communication and workplace channels.'
    throw new AppError(403, 'SIMULATION_LOCKED', message, { gate, module })
  }

  throw new AppError(
    403,
    'SIMULATION_LOCKED',
    `Start the company simulation to unlock ${WORKPLACE_MODULE_LABEL[module]}.`,
    { gate, module }
  )
}

/**
 * Strict sequential gate. The technical interview is the single unlock event
 * for Company Simulation and Team Communication; the remaining workplace
 * modules open after the company simulation has started.
 */
async function requireSimulationUnlocked(userId: bigint, module: WorkplaceModule) {
  const active = await requireActiveCareer(userId)
  const gate = await computeSimulationGate(userId, active.career.id, active.career.slug)
  assertWorkplaceAccess(gate, module)
  return active
}

/** Mirror every module that becomes available when the workplace opens. */
function mirrorWorkplaceOpen(userId: bigint, careerSlug: string): void {
  void mirrorWorkplaceState({
    userId,
    careerSlug,
    modules: {
      company_simulation: { unlocked: true },
      team_communication: { unlocked: true },
      client_communication: { unlocked: true },
      deadlines: { unlocked: true },
      scenarios: { unlocked: true }
    }
  })
}

/** Persist a completion flag without clearing any existing unlock state. */
function mirrorWorkplaceCompletion(
  userId: bigint,
  careerSlug: string,
  modules: Partial<Record<WorkplaceModule, WorkplaceModuleState>>
): void {
  const changes = Object.fromEntries(
    Object.entries(modules).filter(([, state]) => state?.completed)
  ) as Partial<Record<WorkplaceModule, WorkplaceModuleState>>
  if (Object.keys(changes).length === 0) return
  void mirrorWorkplaceState({ userId, careerSlug, modules: changes })
}

/**
 * Enter the simulated company for the selected career.
 * Role/company identity and workload come from authored career data.
 */
export async function startSimulation(userId: bigint) {
  const active = await requireSimulationUnlocked(userId, 'company_simulation')
  const existing = await prisma.simulationState.findUnique({
    where: { userId_careerId: { userId, careerId: active.career.id } }
  })
  if (existing) {
    mirrorWorkplaceOpen(userId, active.career.slug)
    return toSimulationView(existing)
  }

  const state = await prisma.simulationState.create({
    data: {
      publicId: ulid(),
      userId,
      careerId: active.career.id,
      companyName: active.career.companyName || 'Meridian Group',
      roleTitle: active.career.roleTitle || 'Team Member'
    }
  })
  await notify(
    userId,
    'sim_task',
    `Welcome to ${state.companyName}`,
    `Your simulation as part of the ${active.career.name} track has started. Check your workplace tasks.`,
    '/simulation/tasks'
  )
  mirrorWorkplaceOpen(userId, active.career.slug)

  return toSimulationView(state)
}

export async function getSimulationOverview(userId: bigint) {
  const active = await requireActiveCareer(userId)
  const gate = await computeSimulationGate(userId, active.career.id, active.career.slug)
  const state = await prisma.simulationState.findUnique({
    where: { userId_careerId: { userId, careerId: active.career.id } }
  })
  const career = { name: active.career.name, slug: active.career.slug }

  // Passing the technical interview opens the workplace. The remaining
  // modules are exposed once the simulated company has been started.
  if (!gate.unlocked) {
    return {
      status: 'interview_required' as const,
      career,
      companyName: gate.companyName,
      roleTitle: gate.roleTitle,
      interview: gate
    }
  }

  if (!state) {
    return {
      status: 'not_started' as const,
      career,
      companyName: null,
      roleTitle: null,
      interview: gate
    }
  }

  const [tasks, threads, scenarioResponses] = await Promise.all([
    prisma.userSimTask.findMany({
      where: { userId, simTask: { careerId: active.career.id } },
      include: { simTask: true },
      orderBy: { simTask: { order: 'asc' } }
    }),
    prisma.commThread.findMany({
      where: { userId, scenario: { careerId: active.career.id } },
      include: { scenario: { select: { kind: true } } }
    }),
    prisma.scenarioResponse.findMany({ where: { userId, scenario: { careerId: active.career.id } } })
  ])

  const openTasks = tasks.filter((t) => t.status !== 'completed')
  const priorities = ['critical', 'high', 'normal', 'low']

  return {
    status: 'active' as const,
    career,
    companyName: state.companyName,
    roleTitle: state.roleTitle,
    startedAt: state.startedAt,
    currentTasks: openTasks.slice(0, 3).map((t) => ({
      publicId: t.publicId,
      title: t.simTask.title,
      priority: t.simTask.priority,
      dueDayOffset: t.simTask.dueDayOffset,
      status: t.status
    })),
    currentPriorities: [...openTasks]
      .sort((a, b) => priorities.indexOf(a.simTask.priority) - priorities.indexOf(b.simTask.priority))
      .slice(0, 3)
      .map((t) => ({ title: t.simTask.title, priority: t.simTask.priority })),
    deadlines: openTasks
      .map((t) => ({ title: t.simTask.title, dueInDays: Math.max(0, t.simTask.dueDayOffset - daysSince(state.startedAt)) }))
      .sort((a, b) => a.dueInDays - b.dueInDays),
    teamCommunicationStatus: {
      total: threads.filter((t) => t.scenario.kind === 'team').length,
      open: threads.filter((t) => t.scenario.kind === 'team' && t.status !== 'completed').length
    },
    clientCommunicationStatus: {
      total: threads.filter((t) => t.scenario.kind === 'client').length,
      open: threads.filter((t) => t.scenario.kind === 'client' && t.status !== 'completed').length
    },
    scenarioProgress: {
      responded: scenarioResponses.length,
      totalScenarios: undefined
    },
    interview: gate
  }
}

function daysSince(date: Date): number {
  return Math.floor((Date.now() - date.getTime()) / 86_400_000)
}

// ---------------------------------------------------------------------------
// Workplace tasks
// ---------------------------------------------------------------------------

export async function listWorkplaceTasks(userId: bigint) {
  const active = await requireSimulationUnlocked(userId, 'company_simulation')
  const definitions = await prisma.simTask.findMany({
    where: { careerId: active.career.id },
    orderBy: { order: 'asc' }
  })
  const userRows = await prisma.userSimTask.findMany({ where: { userId, simTask: { careerId: active.career.id } } })
  const byTaskId = new Map(userRows.map((u) => [u.simTaskId, u]))

  const evaluations = await prisma.evaluation.findMany({
    where: { userId, careerId: active.career.id, targetType: 'sim_task' }
  })
  const evalByTarget = new Map(evaluations.map((e) => [e.targetPublicId, e]))

  return {
    career: { name: active.career.name },
    companyName: (await prisma.simulationState.findUnique({ where: { userId_careerId: { userId, careerId: active.career.id } } }))?.companyName ?? null,
    tasks: definitions.map((t) => {
      const row = byTaskId.get(t.id)
      const evaluation = row ? evalByTarget.get(row.publicId) : undefined
      return {
        publicId: t.publicId,
        title: t.title,
        context: t.context,
        requirements: asStringArray(t.requirements),
        priority: t.priority,
        dueDayOffset: t.dueDayOffset,
        expectedOutput: t.expectedOutput,
        skillsEvaluated: asStringArray(t.skills),
        status: row?.status ?? 'not_started',
        submittedAt: row?.submittedAt ?? null,
        score: evaluation?.overallScore ?? null
      }
    })
  }
}

/** Ensure UserSimTask rows exist so deadlines/priorities views can operate on real rows. */
async function ensureUserSimTasks(userId: bigint, careerId: bigint): Promise<void> {
  const defs = await prisma.simTask.findMany({ where: { careerId } })
  const existing = await prisma.userSimTask.findMany({ where: { userId, simTask: { careerId } } })
  const have = new Set(existing.map((e) => e.simTaskId))
  for (const def of defs) {
    if (!have.has(def.id)) {
      await prisma.userSimTask.create({ data: { publicId: ulid(), userId, simTaskId: def.id } })
    }
  }
}

export async function submitWorkplaceTask(userId: bigint, taskPublicId: string, response: string) {
  const active = await requireSimulationUnlocked(userId, 'company_simulation')
  await ensureUserSimTasks(userId, active.career.id)

  const task = await prisma.simTask.findUnique({ where: { publicId: taskPublicId } })
  if (!task || task.careerId !== active.career.id) throw AppError.notFound('Task not found.')

  const row = await prisma.userSimTask.findUnique({
    where: { userId_simTaskId: { userId, simTaskId: task.id } }
  }) ?? await prisma.userSimTask.create({ data: { publicId: ulid(), userId, simTaskId: task.id } })

  if (row.submittedAt) throw new AppError(409, 'ALREADY_SUBMITTED', 'This task has already been submitted for review.')

  const areas = asStringArray(task.requirements).map((req, i) => ({
    skill: asStringArray(task.skills)[i % Math.max(1, asStringArray(task.skills).length)] ?? `Requirement ${i + 1}`,
    weight: Math.round(100 / Math.max(1, asStringArray(task.requirements).length)),
    criteria: req
  }))
  const result = assessSubmission({ submission: response, areas, minWords: 150 })

  const draft = buildEvaluationDraft({
    targetType: 'sim_task',
    targetPublicId: row.publicId,
    targetTitle: task.title,
    score: result.score,
    outcomes: result.outcomes,
    passScore: 70,
    careerName: `${active.career.name} · workplace standard`
  })
  const evaluation = await recordEvaluation(userId, active.career.id, draft)

  await prisma.userSimTask.update({
    where: { id: row.id },
    data: { status: 'completed', response, submittedAt: new Date() }
  })

  await notify(
    userId,
    'evaluation_available',
    `Task reviewed: ${task.title}`,
    `Your submission scored ${result.score}/100.`,
    '/evaluations'
  )
  await recomputeSkillProgress(userId, active.career.id)

  const [taskTotal, completedCount, submittedCount] = await Promise.all([
    prisma.simTask.count({ where: { careerId: active.career.id } }),
    prisma.userSimTask.count({
      where: { userId, status: 'completed', simTask: { careerId: active.career.id } }
    }),
    prisma.userSimTask.count({
      where: { userId, submittedAt: { not: null }, simTask: { careerId: active.career.id } }
    })
  ])
  mirrorWorkplaceCompletion(userId, active.career.slug, {
    company_simulation: { completed: taskTotal > 0 && completedCount >= taskTotal },
    deadlines: { completed: taskTotal > 0 && submittedCount >= taskTotal }
  })

  return { score: result.score, evaluationPublicId: evaluation.publicId }
}

// ---------------------------------------------------------------------------
// Team & client communication
// ---------------------------------------------------------------------------

interface ThreadMessage {
  from: 'persona' | 'student'
  body: string
  at: string
}

export async function listThreads(userId: bigint, kind: 'team' | 'client') {
  const active = await requireSimulationUnlocked(
    userId,
    kind === 'team' ? 'team_communication' : 'client_communication'
  )
  const scenarios = await prisma.commScenario.findMany({
    where: { careerId: active.career.id, kind }
  })
  const threads = await prisma.commThread.findMany({
    where: { userId, scenario: { careerId: active.career.id, kind } }
  })
  const threadByScenario = new Map(threads.map((t) => [t.scenarioId, t]))
  const evaluations = await prisma.evaluation.findMany({
    where: { userId, careerId: active.career.id, targetType: 'communication' }
  })
  const evalByTarget = new Map(evaluations.map((e) => [e.targetPublicId, e]))

  // Materialize threads with their opening message from the persona.
  for (const s of scenarios) {
    if (!threadByScenario.has(s.id)) {
      const created = await prisma.commThread.create({
        data: {
          publicId: ulid(),
          userId,
          scenarioId: s.id,
          messages: [{ from: 'persona', body: s.openingMessage, at: new Date().toISOString() }] as unknown as Prisma.InputJsonValue
        }
      })
      threadByScenario.set(s.id, created)
    }
  }

  return {
    career: { name: active.career.name },
    kind,
    threads: scenarios.map((s) => {
      const thread = threadByScenario.get(s.id)!
      const messages = (thread.messages as unknown as ThreadMessage[] | null) ?? []
      const evaluation = evalByTarget.get(thread.publicId)
      return {
        publicId: thread.publicId,
        personaName: s.personaName,
        personaRole: s.personaRole,
        situation: s.situation,
        messages,
        status: thread.status,
        awaitingStudentReply:
          thread.status !== 'completed' && messages[messages.length - 1]?.from === 'persona',
        score: evaluation?.overallScore ?? null
      }
    })
  }
}

interface ThreadPersona {
  personaName: string
  personaRole: string
  kind: 'team' | 'client'
}

const ROLE_STOP_WORDS = new Set([
  'that', 'this', 'with', 'from', 'have', 'your', 'their', 'will', 'before',
  'after', 'into', 'about', 'which', 'when', 'what', 'than', 'then', 'them',
  'they', 'there', 'here', 'also', 'just', 'must', 'should', 'could', 'would',
  'point', 'points', 'clear', 'clearly', 'state', 'states', 'stated'
])

function pointKeywords(point: string): string[] {
  return point
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length >= 4 && !ROLE_STOP_WORDS.has(word))
}

function lowerFirst(value: string): string {
  return value.charAt(0).toLowerCase() + value.slice(1)
}

type PersonaTone = 'lead' | 'peer' | 'stakeholder'

function personaTone(persona: ThreadPersona): PersonaTone {
  if (persona.kind === 'client') return 'stakeholder'
  if (/junior|intern|associate|peer/i.test(persona.personaRole)) return 'peer'
  if (/lead|senior|manager|head|director|principal|architect|reviewer/i.test(persona.personaRole)) return 'lead'
  return 'peer'
}

/**
 * Compose the persona's next in-character message. The reply acknowledges the
 * student, then either asks about the first expected point the student has not
 * covered yet or wraps the conversation up once the scenario closes.
 */
function buildPersonaReply(
  persona: ThreadPersona,
  messages: ThreadMessage[],
  expectedPoints: string[],
  closed: boolean
): ThreadMessage {
  const studentTurns = messages.filter((m) => m.from === 'student').length
  const studentText = messages
    .filter((m) => m.from === 'student')
    .map((m) => m.body.toLowerCase())
    .join(' ')

  const unaddressed = expectedPoints.find((point) => {
    const keywords = pointKeywords(point)
    return keywords.length > 0 && !keywords.some((word) => studentText.includes(word))
  })

  const ack = studentTurns <= 1 ? 'Thanks for getting back to me.' : 'Understood, thanks for the detail.'
  const tone = personaTone(persona)

  let body: string
  if (closed) {
    if (tone === 'lead') {
      body = `Thanks — that gives me enough to move forward. I'll flag anything that still needs tightening.`
    } else if (tone === 'stakeholder') {
      body = `Thank you — that gives me enough to move forward. Please keep me updated as this progresses.`
    } else {
      body = `Perfect, thanks — that gives me what I need for now. Ping me if you want a second pair of eyes.`
    }
  } else if (unaddressed) {
    const prompt = lowerFirst(unaddressed.replace(/\s*\(.*?\)\s*/g, '').trim())
    if (tone === 'lead') {
      body = `${ack} Before we sign off I still want to make sure we've covered: ${prompt}.`
    } else if (tone === 'stakeholder') {
      body = `${ack} I'd also like to be confident we've covered: ${prompt}.`
    } else {
      body = `${ack} I'm still not fully clear on: ${prompt}.`
    }
  } else {
    body = `${ack} That answers everything I needed. Anything else you'd like to confirm before we close this out?`
  }

  return { from: 'persona', body, at: new Date().toISOString() }
}

/**
 * Reply inside a communication thread. Every turn is persisted immediately —
 * including the final one — and the persona always answers in character so the
 * conversation never dead-ends. Once the student has answered enough turns the
 * scenario closes and is assessed against its expected points.
 */
export async function replyToThread(userId: bigint, threadPublicId: string, message: string) {
  const active = await requireActiveCareer(userId)
  const thread = await prisma.commThread.findUnique({
    where: { publicId: threadPublicId },
    include: { scenario: true }
  })
  if (!thread || thread.scenario.careerId !== active.career.id) throw AppError.notFound('Thread not found.')

  // The thread's channel decides which module gate applies: team threads share
  // the technical-interview unlock, client threads wait for the simulation.
  const channelModule: WorkplaceModule =
    thread.scenario.kind === 'team' ? 'team_communication' : 'client_communication'
  const gate = await computeSimulationGate(userId, active.career.id, active.career.slug)
  assertWorkplaceAccess(gate, channelModule)

  if (thread.status === 'completed') throw new AppError(409, 'THREAD_CLOSED', 'This scenario is already resolved and evaluated.')

  const messages = ((thread.messages as unknown as ThreadMessage[] | null) ?? []).concat({
    from: 'student',
    body: message,
    at: new Date().toISOString()
  })

  const studentTurns = messages.filter((m) => m.from === 'student').length
  const expectedPoints = asStringArray(thread.scenario.expectedPoints)
  const requiredTurns = Math.min(Math.max(expectedPoints.length, 1), 2)
  const closed = studentTurns >= requiredTurns

  messages.push(
    buildPersonaReply(
      {
        personaName: thread.scenario.personaName,
        personaRole: thread.scenario.personaRole,
        kind: thread.scenario.kind
      },
      messages,
      expectedPoints,
      closed
    )
  )

  let score: number | null = null
  if (closed) {
    const joined = messages.filter((m) => m.from === 'student').map((m) => m.body).join('\n')
    const rubricPoints =
      expectedPoints.length > 0
        ? expectedPoints
        : ['Addresses the situation directly with a clear, professional recommendation']
    const areas = rubricPoints.map((point, i) => ({
      skill: i === 0 ? 'Responsiveness' : i === 1 ? 'Professional judgment' : 'Communication quality',
      weight: Math.round(100 / Math.max(rubricPoints.length, 1)),
      criteria: point
    }))
    const assessed = assessSubmission({ submission: joined, areas, minWords: 40 })

    const draft = buildEvaluationDraft({
      targetType: 'communication',
      targetPublicId: thread.publicId,
      targetTitle: `${thread.scenario.kind === 'team' ? 'Team' : 'Client'} exchange — ${thread.scenario.personaName}`,
      score: assessed.score,
      outcomes: assessed.outcomes,
      passScore: 60,
      careerName: active.career.name
    })
    await recordEvaluation(userId, active.career.id, draft)
    await prisma.commThread.update({
      where: { id: thread.id },
      data: { status: 'completed', messages: messages as unknown as Prisma.InputJsonValue }
    })
    await recomputeSkillProgress(userId, active.career.id)

    const [channelTotal, channelCompleted] = await Promise.all([
      prisma.commScenario.count({
        where: { careerId: active.career.id, kind: thread.scenario.kind }
      }),
      prisma.commThread.count({
        where: {
          userId,
          status: 'completed',
          scenario: { careerId: active.career.id, kind: thread.scenario.kind }
        }
      })
    ])
    if (channelTotal > 0 && channelCompleted >= channelTotal) {
      mirrorWorkplaceCompletion(userId, active.career.slug, {
        [channelModule]: { completed: true }
      })
    }
    score = assessed.score
  } else {
    await prisma.commThread.update({
      where: { id: thread.id },
      data: { messages: messages as unknown as Prisma.InputJsonValue }
    })
  }

  return { studentTurns, score, closed, messages, awaitingStudentReply: !closed }
}

// ---------------------------------------------------------------------------
// Deadlines & priorities
// ---------------------------------------------------------------------------

export async function getDeadlinesView(userId: bigint) {
  const active = await requireSimulationUnlocked(userId, 'deadlines')
  await ensureUserSimTasks(userId, active.career.id)
  const state = await prisma.simulationState.findUnique({
    where: { userId_careerId: { userId, careerId: active.career.id } }
  })
  const rows = await prisma.userSimTask.findMany({
    where: { userId, simTask: { careerId: active.career.id } },
    include: { simTask: true }
  })
  const elapsedDays = state ? daysSince(state.startedAt) : 0

  return {
    career: { name: active.career.name },
    simulationStarted: Boolean(state),
    items: rows
      .map((r) => ({
        publicId: r.simTask.publicId,
        title: r.simTask.title,
        context: r.simTask.context,
        priority: r.simTask.priority,
        dueDayOffset: r.simTask.dueDayOffset,
        daysRemaining: Math.max(0, r.simTask.dueDayOffset - elapsedDays),
        overdue: !r.submittedAt && r.simTask.dueDayOffset - elapsedDays < 0,
        dependencies: [] as Array<{ title: string; status: string }>,
        status: r.status,
        requiredAction: r.submittedAt ? 'None — submitted for review.' : 'Prepare and submit before the deadline.'
      }))
      .sort((a, b) => a.daysRemaining - b.daysRemaining)
  }
}

// ---------------------------------------------------------------------------
// Workplace scenarios
// ---------------------------------------------------------------------------

export async function listScenarios(userId: bigint) {
  const active = await requireSimulationUnlocked(userId, 'scenarios')
  const scenarios = await prisma.workplaceScenario.findMany({
    where: { careerId: active.career.id }
  })
  const responses = await prisma.scenarioResponse.findMany({
    where: { userId, scenario: { careerId: active.career.id } }
  })
  const responseByScenario = new Map(responses.map((r) => [r.scenarioId, r]))

  return {
    career: { name: active.career.name },
    scenarios: scenarios.map((s) => {
      const response = responseByScenario.get(s.id)
      return {
        publicId: s.publicId,
        category: s.category,
        situation: s.situation,
        actions: ((s.requiredActions as Array<{ action: string }>) ?? []).map((a) => a.action),
        status: response ? 'responded' : 'open',
        score: response?.score ?? null
      }
    })
  }
}

export async function respondToScenario(
  userId: bigint,
  scenarioPublicId: string,
  chosenActions: number[]
) {
  const active = await requireSimulationUnlocked(userId, 'scenarios')
  const scenario = await prisma.workplaceScenario.findUnique({ where: { publicId: scenarioPublicId } })
  if (!scenario || scenario.careerId !== active.career.id) throw AppError.notFound('Scenario not found.')

  const actionsDef = (scenario.requiredActions as Array<{ action: string; good: boolean; note: string }>) ?? []
  if (chosenActions.some((i) => !Number.isInteger(i) || i < 0 || i >= actionsDef.length)) {
    throw AppError.validation('Invalid action selection.')
  }

  const goodIndices = actionsDef.map((a, i) => (a.good ? i : -1)).filter((i) => i >= 0)
  const goodHits = chosenActions.filter((i) => goodIndices.includes(i)).length
  const badPicks = chosenActions.filter((i) => !goodIndices.includes(i)).length
  const raw = goodIndices.length > 0 ? (goodHits / goodIndices.length) * 100 - badPicks * 15 : 0
  const score = Math.max(0, Math.min(100, Math.round(raw)))

  const response = await prisma.scenarioResponse.upsert({
    where: { userId_scenarioId: { userId, scenarioId: scenario.id } },
    update: { actions: chosenActions, score, createdAt: new Date() },
    create: { publicId: ulid(), userId, scenarioId: scenario.id, actions: chosenActions, score }
  })

  const feedback = chosenActions.map((i) => ({
    action: actionsDef[i]?.action,
    assessment: actionsDef[i]?.good ? 'Sound professional decision.' : actionsDef[i]?.note
  }))
  const missed = goodIndices
    .filter((i) => !chosenActions.includes(i))
    .map((i) => ({ action: actionsDef[i]?.action, note: actionsDef[i]?.note }))

  const draft = buildEvaluationDraft({
    targetType: 'scenario',
    targetPublicId: scenario.publicId,
    targetTitle: `Workplace scenario — ${scenario.category}`,
    score,
    outcomes: [
      { skill: 'Decision making', weight: 50, met: score >= 70, note: `Selected ${goodHits}/${goodIndices.length} sound options.` },
      { skill: 'Risk avoidance', weight: 30, met: badPicks === 0, note: badPicks === 0 ? 'No harmful selections.' : `${badPicks} counterproductive selection(s).` },
      { skill: 'Completeness', weight: 20, met: missed.length === 0, note: missed.length === 0 ? 'All key actions taken.' : `${missed.length} recommended action(s) missed.` }
    ],
    passScore: 70,
    careerName: active.career.name
  })
  await recordEvaluation(userId, active.career.id, draft)
  await recomputeSkillProgress(userId, active.career.id)

  const [scenarioTotal, respondedCount] = await Promise.all([
    prisma.workplaceScenario.count({ where: { careerId: active.career.id } }),
    prisma.scenarioResponse.count({
      where: { userId, scenario: { careerId: active.career.id } }
    })
  ])
  if (scenarioTotal > 0 && respondedCount >= scenarioTotal) {
    mirrorWorkplaceCompletion(userId, active.career.slug, {
      scenarios: { completed: true }
    })
  }

  return { score, feedback, missed, respondedAt: response.createdAt }
}

/** Three distinct AI personas based on career data. */
export interface SimPersona {
  id: string
  role: 'lead' | 'mid-level' | 'peer'
  name: string
  expertise: string[]
  messageTemplate: (context: string) => string
}

// ---------------------------------------------------------------------------
// Virtual Internship Multi-Agent Workspace
// ---------------------------------------------------------------------------

/** Get the 3 AI personas for the selected career path. */
export function getSimPersonas(careerSlug: string): SimPersona[] {
  return SIM_PERSONAS[careerSlug] || []
}

/** SIM_PERSONAS: Three distinct AI personas for each career path. */
export const SIM_PERSONAS: Record<string, SimPersona[]> = {
  'frontend-developer': [
    {
      id: 'lead-1',
      role: 'lead',
      name: 'Sarah Johnson',
      expertise: ['React', 'Component Architecture', 'TypeScript', 'CSS Architecture'],
      messageTemplate: (context) => `As your Engineering Lead, I'd like to focus on: ${context}. Please ensure your solution is scalable and maintainable.`
    },
    {
      id: 'mid-1',
      role: 'mid-level',
      name: 'Mike Chen',
      expertise: ['JavaScript', 'React Hooks', 'State Management', 'Testing'],
      messageTemplate: (context) => `Hi there! For this task about ${context}, remember to use proper hook patterns and consider edge cases.`
    },
    {
      id: 'peer-1',
      role: 'peer',
      name: 'Alex Wang',
      expertise: ['CSS', 'Git', 'Component Styling', 'Debugging'],
      messageTemplate: (context) => `Quick question on ${context}: I'm a bit stuck on the styling, any tips?`
    }
  ],
  'backend-developer': [
    {
      id: 'lead-2',
      role: 'lead',
      name: 'David Rodriguez',
      expertise: ['Node.js', 'Express', 'Database Design', 'API Security'],
      messageTemplate: (context) => `As your Engineering Lead, focus on the ${context} aspect and ensure proper error handling and security measures.`
    },
    {
      id: 'mid-2',
      role: 'mid-level',
      name: 'Emma Williams',
      expertise: ['SQL', 'MongoDB', 'API Design', 'Performance'],
      messageTemplate: (context) => `Quick tip for the ${context} task: make sure your queries are indexed properly for performance.`
    },
    {
      id: 'peer-2',
      role: 'peer',
      name: 'Chen Li',
      expertise: ['Git', 'Debugging', 'Node.js basics', 'Testing'],
      messageTemplate: (context) => `I'm working on the ${context} part too - struggling with the setup, any help?`
    }
  ],
  'data-scientist': [
    {
      id: 'lead-3',
      role: 'lead',
      name: 'Dr. Lisa Chen',
      expertise: ['Python', 'Machine Learning', 'Data Pipelines', 'Statistical Analysis'],
      messageTemplate: (context) => `For your ${context} project, prioritize data quality and reproducibility. Make sure your pipeline is well-documented.`
    },
    {
      id: 'mid-3',
      role: 'mid-level',
      name: 'Raj Patel',
      expertise: ['Python', 'Pandas', 'Visualization', 'SQL'],
      messageTemplate: (context) => `Quick help needed with ${context}: I'm having trouble with the data cleaning step.`
    },
    {
      id: 'peer-3',
      role: 'peer',
      name: 'Mia Olson',
      expertise: ['Python', 'Jupyter', 'Exploratory Analysis', 'Visualization'],
      messageTemplate: (context) => `Anyone familiar with ${context}? I could use a hand with the plot customization.`
    }
  ]
}
