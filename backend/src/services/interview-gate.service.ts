import type { InterviewSession } from '@prisma/client'
import {
  INTERVIEW_PASS_SCORE,
  normalizeInterviewStage,
  type InterviewStage
} from '../config/constants.js'
import { prisma } from '../utils/prisma.js'
import { requireActiveCareer } from './domain.helpers.js'
import {
  fetchInterviewVerifications,
  reconcileInterviewVerification,
  type InterviewVerification
} from './interview-verification.service.js'
import { mirrorWorkplaceState } from './workplace-progress.service.js'

export type InterviewStageStatus = 'not_started' | 'in_progress' | 'passed' | 'failed'

export interface InterviewStageGate {
  status: InterviewStageStatus
  score: number | null
  sessionPublicId: string | null
  /** True when a matching Supabase verification row confirms the MySQL result. */
  verified: boolean
}

/**
 * Module-level workplace access derived from one sequential gate.
 *
 * Company Simulation and Team Communication intentionally share the exact same
 * condition — a passed technical interview — so they unlock together. Client
 * communication, deadlines and scenarios are subsequent steps that open once
 * the simulated company has been entered.
 */
export interface WorkplaceAccess {
  companySimulation: boolean
  teamCommunication: boolean
  clientCommunication: boolean
  deadlines: boolean
  scenarios: boolean
}

export interface SimulationGate {
  /** True once the technical interview has been passed. */
  unlocked: boolean
  hr: InterviewStageGate
  technical: InterviewStageGate
  workplace: WorkplaceAccess
  companyName: string | null
  roleTitle: string | null
  simulationStarted: boolean
}

function emptyStage(): InterviewStageGate {
  return { status: 'not_started', score: null, sessionPublicId: null, verified: false }
}

function buildStageGate(
  session: InterviewSession | undefined,
  verification: InterviewVerification | undefined
): InterviewStageGate {
  if (!session) {
    if (!verification) return emptyStage()
    return {
      status: verification.passed ? 'passed' : 'failed',
      score: verification.score,
      sessionPublicId: verification.sessionPublicId,
      verified: true
    }
  }

  const score = session.score ?? null
  const verified = verification?.sessionPublicId === session.publicId

  if (session.status !== 'completed') {
    return {
      status: 'in_progress',
      score,
      sessionPublicId: session.publicId,
      verified: false
    }
  }

  return {
    status: (score ?? 0) >= INTERVIEW_PASS_SCORE ? 'passed' : 'failed',
    score,
    sessionPublicId: session.publicId,
    verified
  }
}

/**
 * Resolve the sequential workplace gate for one career.
 *
 * MySQL stores the original attempt; Supabase stores a verification mirror.
 * A matching verification row marks the stage as confirmed, while a missing or
 * unavailable mirror falls back to MySQL so an outage never locks a student out.
 */
export async function computeSimulationGate(
  userId: bigint,
  careerId: bigint,
  careerSlug: string
): Promise<SimulationGate> {
  const [sessions, state, verifications] = await Promise.all([
    prisma.interviewSession.findMany({
      where: { userId, careerId },
      orderBy: { startedAt: 'desc' }
    }),
    prisma.simulationState.findUnique({ where: { userId_careerId: { userId, careerId } } }),
    fetchInterviewVerifications(userId, careerSlug)
  ])

  const latest: Partial<Record<InterviewStage, InterviewSession>> = {}
  for (const session of sessions) {
    const stage = normalizeInterviewStage(session.stage)
    if (!latest[stage]) latest[stage] = session
  }

  const hr = buildStageGate(latest.hr, verifications.get('hr'))
  const technical = buildStageGate(latest.technical, verifications.get('technical'))

  // A previous submission may have failed to mirror during a network drop.
  // Reconcile in the background; the gate itself still answers from MySQL.
  reconcileInterviewVerification({
    userId,
    careerSlug,
    stage: 'hr',
    sessionPublicId: latest.hr?.publicId ?? null,
    score: latest.hr?.score ?? null,
    passed: hr.status === 'passed',
    completed: latest.hr?.status === 'completed',
    verified: hr.verified
  })
  reconcileInterviewVerification({
    userId,
    careerSlug,
    stage: 'technical',
    sessionPublicId: latest.technical?.publicId ?? null,
    score: latest.technical?.score ?? null,
    passed: technical.status === 'passed',
    completed: latest.technical?.status === 'completed',
    verified: technical.verified
  })

  // Passing the technical interview is the single unlock event for the
  // workplace. Both modules derive from this one boolean, so they can never
  // drift apart. Client communication, deadlines and scenarios follow once the
  // student has actually entered the simulated company.
  const technicalPassed = technical.status === 'passed'
  const workplace: WorkplaceAccess = {
    companySimulation: technicalPassed,
    teamCommunication: technicalPassed,
    clientCommunication: technicalPassed && Boolean(state),
    deadlines: technicalPassed && Boolean(state),
    scenarios: technicalPassed && Boolean(state)
  }

  scheduleWorkplaceMirror({
    userId,
    careerSlug,
    technicalSessionPublicId: technical.sessionPublicId,
    simulationStarted: Boolean(state),
    workplace
  })

  return {
    unlocked: technicalPassed,
    hr,
    technical,
    workplace,
    companyName: state?.companyName ?? null,
    roleTitle: state?.roleTitle ?? null,
    simulationStarted: Boolean(state)
  }
}

const workplaceMirrorCooldown = new Map<string, number>()
const WORKPLACE_MIRROR_COOLDOWN_MS = 5 * 60_000

/**
 * Mirror unlock state without delaying a gate read. Repeated page loads within
 * the cooldown window are ignored; a new technical session or the simulation
 * starting changes the key and immediately schedules a fresh write.
 */
function scheduleWorkplaceMirror(input: {
  userId: bigint
  careerSlug: string
  technicalSessionPublicId: string | null
  simulationStarted: boolean
  workplace: WorkplaceAccess
}): void {
  const key = `${input.userId}:${input.careerSlug}:${input.technicalSessionPublicId ?? 'none'}:${
    input.simulationStarted ? 'started' : 'not-started'
  }`
  const now = Date.now()
  if ((workplaceMirrorCooldown.get(key) ?? 0) > now) return
  workplaceMirrorCooldown.set(key, now + WORKPLACE_MIRROR_COOLDOWN_MS)

  void mirrorWorkplaceState({
    userId: input.userId,
    careerSlug: input.careerSlug,
    modules: {
      company_simulation: { unlocked: input.workplace.companySimulation },
      team_communication: { unlocked: input.workplace.teamCommunication },
      client_communication: { unlocked: input.workplace.clientCommunication },
      deadlines: { unlocked: input.workplace.deadlines },
      scenarios: { unlocked: input.workplace.scenarios }
    }
  })
}

/** Gate used by the sidebar, workplace route guards and dashboard. */
export async function getSimulationGate(userId: bigint): Promise<SimulationGate> {
  const active = await requireActiveCareer(userId)
  return computeSimulationGate(userId, active.career.id, active.career.slug)
}
