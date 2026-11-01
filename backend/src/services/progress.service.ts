import { prisma } from '../utils/prisma.js'
import { INTERVIEW_PASS_SCORE } from '../config/constants.js'
import { requireActiveCareer } from './domain.helpers.js'
import {
  syncProgressToSupabase,
  type ProgressCategory,
  type ProgressMirrorEvent,
  type ProgressSource,
  type SkillMetricSnapshot,
  type UserProgressSnapshot
} from './progress-sync.service.js'
import type { Career, Evaluation } from '@prisma/client'

// ---------------------------------------------------------------------------
// Skill matching
//
// The curriculum declares skills per career, per assignment, per simulation
// task and per practical rubric. We map those declarations onto the career's
// skill list with whole-token matching instead of matching every common word
// contained in a JSON blob. Unmatched declared skills are kept as their own
// labels so no graded evidence is lost.
// ---------------------------------------------------------------------------

const SKILL_TOKEN_STOP = new Set([
  'and', 'or', 'the', 'a', 'an', 'of', 'for', 'with', 'in', 'to', 'on', 'at', 'by',
  'from', 'per', 'using', 'use', 'basic', 'basics', 'core', 'key', 'common',
  'introduction', 'intro', 'fundamentals', 'essentials', 'principles', 'practices',
  'practice', 'skills', 'skill'
])

const GENERIC_SKILL_TOKENS = new Set([
  'design', 'web', 'development', 'developer', 'system', 'systems', 'quality',
  'implementation', 'engineering', 'architecture', 'communication', 'professional',
  'platform', 'data', 'modeling', 'models', 'patterns', 'concept', 'concepts',
  'knowledge', 'technique', 'techniques', 'tool', 'tools', 'workflow', 'process',
  'management', 'handling', 'behavior', 'behaviour', 'experience', 'frontend',
  'backend', 'code', 'coding', 'programming', 'software', 'application',
  'applications', 'project', 'projects'
])

const SYNTHETIC_SKILLS = new Set([
  'Team communication',
  'Client communication',
  'Technical interview',
  'Virtual interview',
  'Workplace judgment'
])

const ASSIGNMENT_PASS_SCORE = 70
const PRACTICAL_PASS_SCORE = 70
const SIMULATION_PASS_SCORE = 70
const COMMUNICATION_PASS_SCORE = 60

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? (value as unknown[]).filter((v): v is string => typeof v === 'string') : []
}

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9+#]+/g, ' ').trim()
}

function stemToken(token: string): string {
  if (token.length > 4 && token.endsWith('s') && !token.endsWith('ss')) return token.slice(0, -1)
  return token
}

function tokenList(value: string): string[] {
  const tokens = value
    .toLowerCase()
    .split(/[^a-z0-9+#]+/)
    .filter(Boolean)
    .map(stemToken)
  return [...new Set(tokens)]
}

function tokenMatches(a: string, b: string): boolean {
  const left = stemToken(a)
  const right = stemToken(b)
  if (left === right) return true
  if (left.length >= 4 && right.length >= 4) {
    const prefix = Math.min(5, left.length, right.length)
    if (left.slice(0, prefix) === right.slice(0, prefix)) return true
  }
  return false
}

function skillTokens(skill: string): string[] {
  const all = tokenList(skill)
  const meaningful = all.filter((token) => !SKILL_TOKEN_STOP.has(token))
  return meaningful.length > 0 ? meaningful : all
}

function isDistinctive(token: string): boolean {
  return !GENERIC_SKILL_TOKENS.has(token) && !SKILL_TOKEN_STOP.has(token)
}

function textMatchesSkill(text: string, skill: string): boolean {
  const tokens = skillTokens(skill)
  if (tokens.length === 0) return false
  const haystack = tokenList(text)
  const matched = tokens.filter((token) => haystack.some((word) => tokenMatches(token, word)))
  if (matched.length === 0) return false
  if (matched.length === tokens.length) return true

  const distinctive = matched.filter(isDistinctive)
  if (tokens.length <= 2) return distinctive.length >= 1
  return distinctive.length >= 2 && distinctive.length / tokens.length >= 0.5
}

function resolveDeclaredSkill(declared: string, careerSkills: string[]): string {
  const cleaned = declared.trim().replace(/\s+/g, ' ')
  if (!cleaned) return ''

  const key = normalizeKey(cleaned)
  const exact = careerSkills.find((skill) => normalizeKey(skill) === key)
  if (exact) return exact

  const declaredTokens = tokenList(cleaned)
  let best: { skill: string; score: number } | null = null
  let tied = false

  for (const skill of careerSkills) {
    const tokens = skillTokens(skill)
    if (tokens.length === 0) continue

    const common = tokens.filter((token) =>
      declaredTokens.some((declaredToken) => tokenMatches(token, declaredToken))
    ).length
    if (common === 0) continue

    const allSkillTokens = common === tokens.length
    const allDeclaredTokens =
      declaredTokens.length > 0 &&
      declaredTokens.every((declaredToken) =>
        tokens.some((token) => tokenMatches(token, declaredToken))
      )
    const distinctive = tokens.filter(
      (token) =>
        isDistinctive(token) &&
        declaredTokens.some((declaredToken) => tokenMatches(token, declaredToken))
    ).length

    let score = common / tokens.length
    if (allSkillTokens || allDeclaredTokens) score = Math.max(score, 1.2)
    else if (tokens.length <= 2 && distinctive >= 1) score = Math.max(score, 0.6)
    else if (distinctive >= 2 && distinctive / tokens.length >= 0.5) score = Math.max(score, 0.55)
    else continue

    if (!best || score > best.score + 1e-9) {
      best = { skill, score }
      tied = false
    } else if (Math.abs(score - best.score) <= 1e-9) {
      tied = true
    }
  }

  return best && !tied ? best.skill : cleaned
}

function uniqueSkills(skills: string[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const skill of skills) {
    const cleaned = skill.trim().replace(/\s+/g, ' ')
    if (!cleaned) continue
    const key = normalizeKey(cleaned)
    if (seen.has(key)) continue
    seen.add(key)
    result.push(cleaned)
  }
  return result
}

function eventSkills(declared: string[], careerSkills: string[]): string[] {
  return uniqueSkills(declared.map((skill) => resolveDeclaredSkill(skill, careerSkills)))
}

function evaluationSkillLabels(evaluation: Evaluation): string[] {
  return Array.isArray(evaluation.skillLevels)
    ? (evaluation.skillLevels as unknown[]).flatMap((row) => {
        if (!row || typeof row !== 'object') return []
        const skill = (row as { skill?: unknown }).skill
        return typeof skill === 'string' ? [skill] : []
      })
    : []
}

function practicalRubricSkills(questions: unknown): string[] {
  if (!questions || typeof questions !== 'object') return []
  const rubric = (questions as { rubric?: unknown }).rubric
  if (!Array.isArray(rubric)) return []
  return rubric.flatMap((row) => {
    if (!row || typeof row !== 'object') return []
    const skill = (row as { skill?: unknown }).skill
    return typeof skill === 'string' ? [skill] : []
  })
}

// ---------------------------------------------------------------------------
// Computation
// ---------------------------------------------------------------------------

export interface AreaScores {
  learning: number
  theory: number | null
  practical: number | null
  assignments: number | null
  communication: number | null
  simulation: number | null
  technicalInterview: number | null
}

interface EvidenceCounts {
  simSubmitted: number
  threadCount: number
  scenarioCount: number
  interviewCount: number
}

export interface ProgressComputation {
  career: Career
  events: ProgressMirrorEvent[]
  skills: SkillMetricSnapshot[]
  areas: AreaScores
  completedTopics: number
  totalTopics: number
  counts: EvidenceCounts
  snapshot: UserProgressSnapshot
}

interface EvidenceBundle {
  events: ProgressMirrorEvent[]
  topics: Array<{ id: bigint; title: string; slug: string }>
  completedTopicIds: Set<bigint>
  counts: EvidenceCounts
}

function meanScore(values: number[]): number | null {
  if (values.length === 0) return null
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)
}

function passStatus(score: number, passScore: number): 'passed' | 'failed' {
  return score >= passScore ? 'passed' : 'failed'
}

function latestByDate(events: ProgressMirrorEvent[]): ProgressMirrorEvent | null {
  return [...events].sort((a, b) => b.occurredAt.getTime() - a.occurredAt.getTime())[0] ?? null
}

async function collectEvidence(userId: bigint, career: Career): Promise<EvidenceBundle> {
  const [
    attempts,
    practicalExams,
    evaluations,
    assignments,
    simRows,
    threads,
    scenarioResponses,
    sessions,
    topics,
    progressRows
  ] = await Promise.all([
    prisma.examAttempt.findMany({
      where: { userId, exam: { careerId: career.id }, submittedAt: { not: null } },
      include: {
        exam: { select: { publicId: true, kind: true, title: true, coverage: true, questions: true } }
      }
    }),
    prisma.exam.findMany({
      where: { careerId: career.id, kind: 'practical' },
      select: { publicId: true, title: true, passScore: true, coverage: true, questions: true }
    }),
      prisma.evaluation.findMany({ where: { userId, careerId: career.id } }),
      prisma.assignment.findMany({
        where: { careerId: career.id },
        select: { publicId: true, title: true, skillsEvaluated: true }
      }),
      prisma.userSimTask.findMany({
        where: { userId, simTask: { careerId: career.id }, submittedAt: { not: null } },
        include: { simTask: { select: { title: true, skills: true } } }
      }),
      prisma.commThread.findMany({
        where: { userId, scenario: { careerId: career.id }, status: 'completed' },
        include: { scenario: { select: { kind: true } } }
      }),
      prisma.scenarioResponse.findMany({
        where: { userId, scenario: { careerId: career.id } },
        include: { scenario: { select: { publicId: true, category: true } } }
      }),
      prisma.interviewSession.findMany({
        where: { userId, careerId: career.id, completedAt: { not: null } },
        select: { publicId: true, stage: true, score: true, completedAt: true }
      }),
      prisma.topic.findMany({
        where: { chapter: { book: { careerId: career.id } } },
        select: { id: true, title: true, slug: true }
      }),
      prisma.topicProgress.findMany({
        where: {
          userId,
          status: 'completed',
          topic: { chapter: { book: { careerId: career.id } } }
        },
        select: { topicId: true }
      })
    ])

  const careerSkills = uniqueSkills(asStringArray(career.mainSkills))
  const evaluationByTarget = new Map(
    evaluations.map((evaluation) => [
      `${evaluation.targetType}:${evaluation.targetPublicId}`,
      evaluation
    ])
  )
  const assignmentByPublicId = new Map(assignments.map((assignment) => [assignment.publicId, assignment]))
  const practicalExamByPublicId = new Map(practicalExams.map((exam) => [exam.publicId, exam]))
  const practicalExamByTitle = new Map(practicalExams.map((exam) => [normalizeKey(exam.title), exam]))
  // ExamAttempt rows already surface their own practical event. Each matching
  // evaluation consumes one slot so retakes are never double-counted, while
  // historical evaluations with no surviving attempt still become evidence.
  const uncoveredPracticalAttempts = new Map<string, number>()

  const events: ProgressMirrorEvent[] = []

  for (const attempt of attempts) {
    if (attempt.score === null || !attempt.submittedAt) continue
    const kind = attempt.exam.kind
    const declared =
      kind === 'practical'
        ? [...practicalRubricSkills(attempt.exam.questions), ...asStringArray(attempt.exam.coverage)]
        : asStringArray(attempt.exam.coverage)
    const skills = eventSkills(declared, careerSkills)
    if (skills.length === 0) skills.push(attempt.exam.title)

    events.push({
      sourceType: kind === 'theory' ? 'theory_exam' : 'practical_exam',
      sourcePublicId: attempt.publicId,
      title: attempt.exam.title,
      category: kind,
      score: attempt.score,
      status: attempt.passed === null ? 'completed' : attempt.passed ? 'passed' : 'failed',
      passed: attempt.passed,
      skills,
      occurredAt: attempt.submittedAt
    })

    if (kind === 'practical') {
      const examKey = attempt.exam.publicId
      uncoveredPracticalAttempts.set(examKey, (uncoveredPracticalAttempts.get(examKey) ?? 0) + 1)
    }
  }

  for (const evaluation of evaluations) {
    if (evaluation.targetType === 'practical_exam') {
      const covered = uncoveredPracticalAttempts.get(evaluation.targetPublicId) ?? 0
      if (covered > 0) {
        uncoveredPracticalAttempts.set(evaluation.targetPublicId, covered - 1)
        continue
      }

      // A historical submission can outlive the exam row it was graded
      // against (for example after a content reseed). Keep the evidence by
      // resolving the current exam when possible and otherwise using the
      // rubric snapshot stored on the evaluation itself.
      const exam =
        practicalExamByPublicId.get(evaluation.targetPublicId) ??
        practicalExamByTitle.get(normalizeKey(evaluation.targetTitle))
      const declared = exam
        ? [...practicalRubricSkills(exam.questions), ...asStringArray(exam.coverage)]
        : evaluationSkillLabels(evaluation)
      const skills = eventSkills(declared, careerSkills)
      if (skills.length === 0) skills.push(evaluation.targetTitle)
      const passScore = exam?.passScore ?? PRACTICAL_PASS_SCORE

      events.push({
        sourceType: 'practical_exam',
        sourcePublicId: evaluation.targetPublicId,
        title: exam?.title ?? evaluation.targetTitle,
        category: 'practical',
        score: evaluation.overallScore,
        status: passStatus(evaluation.overallScore, passScore),
        passed: evaluation.overallScore >= passScore,
        skills,
        occurredAt: evaluation.createdAt
      })
      continue
    }

    if (evaluation.targetType !== 'assignment') continue
    const assignment = assignmentByPublicId.get(evaluation.targetPublicId)
    const declared = asStringArray(assignment?.skillsEvaluated)
    const skills = eventSkills(
      declared.length > 0 ? declared : evaluationSkillLabels(evaluation),
      careerSkills
    )
    if (skills.length === 0) skills.push(evaluation.targetTitle)

    events.push({
      sourceType: 'assignment',
      sourcePublicId: evaluation.targetPublicId,
      title: assignment?.title ?? evaluation.targetTitle,
      category: 'assignment',
      score: evaluation.overallScore,
      status: passStatus(evaluation.overallScore, ASSIGNMENT_PASS_SCORE),
      passed: evaluation.overallScore >= ASSIGNMENT_PASS_SCORE,
      skills,
      occurredAt: evaluation.createdAt
    })
  }

  for (const row of simRows) {
    const evaluation = evaluationByTarget.get(`sim_task:${row.publicId}`)
    if (!evaluation) continue
    const declared = asStringArray(row.simTask.skills)
    const skills = eventSkills(
      declared.length > 0 ? declared : evaluationSkillLabels(evaluation),
      careerSkills
    )
    if (skills.length === 0) skills.push(row.simTask.title)

    events.push({
      sourceType: 'sim_task',
      sourcePublicId: row.publicId,
      title: row.simTask.title,
      category: 'simulation',
      score: evaluation.overallScore,
      status: passStatus(evaluation.overallScore, SIMULATION_PASS_SCORE),
      passed: evaluation.overallScore >= SIMULATION_PASS_SCORE,
      skills,
      occurredAt: row.submittedAt ?? evaluation.createdAt
    })
  }

  for (const thread of threads) {
    const evaluation = evaluationByTarget.get(`communication:${thread.publicId}`)
    if (!evaluation) continue
    const skill = thread.scenario.kind === 'team' ? 'Team communication' : 'Client communication'

    events.push({
      sourceType: 'communication',
      sourcePublicId: thread.publicId,
      title: evaluation.targetTitle,
      category: 'communication',
      score: evaluation.overallScore,
      status: passStatus(evaluation.overallScore, COMMUNICATION_PASS_SCORE),
      passed: evaluation.overallScore >= COMMUNICATION_PASS_SCORE,
      skills: [skill],
      occurredAt: evaluation.createdAt
    })
  }

  for (const session of sessions) {
    const evaluation = evaluationByTarget.get(`interview:${session.publicId}`)
    const score = evaluation?.overallScore ?? session.score
    if (score === null || score === undefined) continue
    const skill = session.stage === 'technical' ? 'Technical interview' : 'Virtual interview'

    events.push({
      sourceType: 'interview',
      sourcePublicId: session.publicId,
      title: evaluation?.targetTitle ?? `${career.name} interview`,
      category: 'interview',
      score,
      status: passStatus(score, INTERVIEW_PASS_SCORE),
      passed: score >= INTERVIEW_PASS_SCORE,
      skills: [skill],
      occurredAt: session.completedAt ?? evaluation?.createdAt ?? new Date()
    })
  }

  for (const response of scenarioResponses) {
    const evaluation = evaluationByTarget.get(`scenario:${response.scenario.publicId}`)
    const score = response.score ?? evaluation?.overallScore
    if (score === null || score === undefined) continue
    const declared = evaluation ? evaluationSkillLabels(evaluation) : ['Workplace judgment']
    const skills = eventSkills(declared, careerSkills)
    if (skills.length === 0) skills.push('Workplace judgment')

    events.push({
      sourceType: 'scenario',
      sourcePublicId: response.scenario.publicId,
      title: evaluation?.targetTitle ?? `Workplace scenario — ${response.scenario.category}`,
      category: 'simulation',
      score,
      status: passStatus(score, SIMULATION_PASS_SCORE),
      passed: score >= SIMULATION_PASS_SCORE,
      skills,
      occurredAt: response.createdAt
    })
  }

  return {
    events,
    topics,
    completedTopicIds: new Set(progressRows.map((row) => row.topicId)),
    counts: {
      simSubmitted: simRows.length,
      threadCount: threads.length,
      scenarioCount: scenarioResponses.length,
      interviewCount: sessions.length
    }
  }
}

function buildAreas(events: ProgressMirrorEvent[], completedTopics: number, totalTopics: number): AreaScores {
  const categoryAverage = (category: ProgressCategory): number | null =>
    meanScore(events.filter((event) => event.category === category).map((event) => event.score))

  const technicalEvents = events.filter((event) =>
    event.skills.some((skill) => normalizeKey(skill) === 'technical interview')
  )

  return {
    learning: totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0,
    theory: categoryAverage('theory'),
    practical: categoryAverage('practical'),
    assignments: categoryAverage('assignment'),
    communication: categoryAverage('communication'),
    simulation: categoryAverage('simulation'),
    technicalInterview: latestByDate(technicalEvents)?.score ?? null
  }
}

function topicStatsForSkills(
  topics: EvidenceBundle['topics'],
  completedTopicIds: Set<bigint>,
  careerSkills: string[]
): Map<string, { done: number; total: number }> {
  const stats = new Map<string, { done: number; total: number }>()
  for (const skill of careerSkills) stats.set(normalizeKey(skill), { done: 0, total: 0 })

  for (const topic of topics) {
    const text = `${topic.title} ${topic.slug.replace(/-/g, ' ')}`
    for (const skill of careerSkills) {
      if (!textMatchesSkill(text, skill)) continue
      const entry = stats.get(normalizeKey(skill)) ?? { done: 0, total: 0 }
      entry.total += 1
      if (completedTopicIds.has(topic.id)) entry.done += 1
      stats.set(normalizeKey(skill), entry)
    }
  }
  return stats
}

function buildSkillSnapshot(
  skill: string,
  events: ProgressMirrorEvent[],
  stats: Map<string, { done: number; total: number }>
): SkillMetricSnapshot {
  const key = normalizeKey(skill)
  const matching = events.filter((event) => event.skills.some((label) => normalizeKey(label) === key))
  const average = (category: ProgressCategory): number | null =>
    meanScore(matching.filter((event) => event.category === category).map((event) => event.score))

  const theoryAvg = average('theory')
  const practicalAvg = average('practical')
  const assignmentAvg = average('assignment')
  const communicationAvg = average('communication')
  const simulationAvg = average('simulation')
  const interviewAvg = latestByDate(matching.filter((event) => event.category === 'interview'))?.score ?? null

  const learning = stats.get(key) ?? { done: 0, total: 0 }
  const learningPercent = learning.total > 0 ? Math.round((learning.done / learning.total) * 100) : null
  const components = [
    learningPercent,
    theoryAvg,
    practicalAvg,
    assignmentAvg,
    communicationAvg,
    simulationAvg,
    interviewAvg
  ].filter((value): value is number => value !== null)

  return {
    skill,
    percent: components.length > 0 ? Math.round(meanScore(components) ?? 0) : 0,
    learningDone: learning.done,
    learningTotal: learning.total,
    theoryAvg,
    practicalAvg,
    assignmentAvg,
    communicationAvg,
    simulationAvg,
    interviewAvg
  }
}

function trackedSkills(careerSkills: string[], events: ProgressMirrorEvent[]): string[] {
  const tracked = uniqueSkills(careerSkills)
  const keys = new Set(tracked.map(normalizeKey))

  for (const event of events) {
    for (const skill of event.skills) {
      if (!SYNTHETIC_SKILLS.has(skill)) continue
      const key = normalizeKey(skill)
      if (keys.has(key)) continue
      keys.add(key)
      tracked.push(skill)
    }
  }
  return tracked
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface RecomputeOptions {
  /** Await the Supabase mirror (used by admin backfills). Defaults to fire-and-forget. */
  awaitMirror?: boolean
}

/**
 * Recompute per-skill aggregates for the active career from real student data:
 * completed learning, every graded exam attempt, assignment/practical
 * evaluations, simulation tasks, communication threads and interviews.
 *
 * Each event is attributed only to the skills it actually exercised. The
 * career's declared skills always get a row; communication and interview
 * evidence get their own rows so those scores are never hidden.
 */
export async function recomputeSkillProgress(
  userId: bigint,
  careerId: bigint,
  options: RecomputeOptions = {}
): Promise<ProgressComputation | null> {
  const career = await prisma.career.findUnique({ where: { id: careerId } })
  if (!career) return null

  const careerSkills = uniqueSkills(asStringArray(career.mainSkills))
  const evidence = await collectEvidence(userId, career)
  const stats = topicStatsForSkills(evidence.topics, evidence.completedTopicIds, careerSkills)
  const skills = trackedSkills(careerSkills, evidence.events).map((skill) =>
    buildSkillSnapshot(skill, evidence.events, stats)
  )

  for (const row of skills) {
    await prisma.skillProgress.upsert({
      where: { userId_careerId_skill: { userId, careerId, skill: row.skill } },
      update: {
        percent: row.percent,
        learningDone: row.learningDone,
        learningTotal: row.learningTotal,
        examAvg: row.theoryAvg,
        assignmentAvg: row.assignmentAvg,
        practicalAvg: row.practicalAvg,
        simulationAvg: row.simulationAvg,
        communicationAvg: row.communicationAvg,
        interviewAvg: row.interviewAvg
      },
      create: {
        userId,
        careerId,
        skill: row.skill,
        percent: row.percent,
        learningDone: row.learningDone,
        learningTotal: row.learningTotal,
        examAvg: row.theoryAvg,
        assignmentAvg: row.assignmentAvg,
        practicalAvg: row.practicalAvg,
        simulationAvg: row.simulationAvg,
        communicationAvg: row.communicationAvg,
        interviewAvg: row.interviewAvg
      }
    })
  }

  if (skills.length > 0) {
    await prisma.skillProgress.deleteMany({
      where: { userId, careerId, skill: { notIn: skills.map((row) => row.skill) } }
    })
  } else {
    await prisma.skillProgress.deleteMany({ where: { userId, careerId } })
  }

  const completedTopics = evidence.completedTopicIds.size
  const totalTopics = evidence.topics.length
  const areas = buildAreas(evidence.events, completedTopics, totalTopics)
  const areaValues = [
    areas.learning,
    areas.theory,
    areas.practical,
    areas.assignments,
    areas.communication,
    areas.simulation,
    areas.technicalInterview
  ].filter((value): value is number => value !== null)

  const snapshot: UserProgressSnapshot = {
    completedTopics,
    totalTopics,
    learningPercent: areas.learning,
    theoryAvg: areas.theory,
    practicalAvg: areas.practical,
    assignmentAvg: areas.assignments,
    communicationAvg: areas.communication,
    simulationAvg: areas.simulation,
    technicalInterviewLatest: areas.technicalInterview,
    overallPercent: areaValues.length > 0 ? Math.round(meanScore(areaValues) ?? 0) : 0,
    assessmentsCount: evidence.events.length
  }

  const mirrorInput = { userId, careerId, events: evidence.events, skills, snapshot }
  if (options.awaitMirror) {
    await syncProgressToSupabase(mirrorInput)
  } else {
    void syncProgressToSupabase(mirrorInput)
  }

  return {
    career,
    events: evidence.events,
    skills,
    areas,
    completedTopics,
    totalTopics,
    counts: evidence.counts,
    snapshot
  }
}

function levelFor(percent: number): string {
  if (percent >= 85) return 'Advanced'
  if (percent >= 70) return 'Proficient'
  if (percent >= 50) return 'Intermediate'
  if (percent > 0) return 'Beginner'
  return 'Not started'
}

export async function getSkillProgress(userId: bigint) {
  const active = await requireActiveCareer(userId)
  const computation = await recomputeSkillProgress(userId, active.career.id)
  const rows = (computation?.skills ?? []).slice().sort((a, b) => {
    if (b.percent !== a.percent) return b.percent - a.percent
    if (b.learningTotal !== a.learningTotal) return b.learningTotal - a.learningTotal
    return a.skill.localeCompare(b.skill)
  })

  return {
    career: { name: active.career.name, slug: active.career.slug },
    skills: rows.map((row) => ({
      skill: row.skill,
      currentLevel: levelFor(row.percent),
      percent: row.percent,
      learningDone: row.learningDone,
      learningTotal: row.learningTotal,
      examPerformance: row.theoryAvg,
      assignmentPerformance: row.assignmentAvg,
      practicalPerformance: row.practicalAvg,
      simulationPerformance: row.simulationAvg,
      communicationPerformance: row.communicationAvg,
      interviewPerformance: row.interviewAvg
    }))
  }
}

const PIPELINE_TAIL = [
  'Virtual Interview',
  'Technical Interview',
  'Professional Simulation',
  'Career Readiness'
] as const

export async function getRoadmap(userId: bigint) {
  const active = await requireActiveCareer(userId)
  const chapters = await prisma.chapter.findMany({
    where: { book: { careerId: active.career.id } },
    orderBy: { order: 'asc' },
    include: { topics: { select: { id: true } } }
  })
  const topicIds = chapters.flatMap((c) => c.topics.map((t) => t.id))
  const progress = await prisma.topicProgress.findMany({
    where: { userId, topicId: { in: topicIds }, status: 'completed' },
    select: { topicId: true }
  })
  const doneSet = new Set(progress.map((p) => p.topicId))

  const stageOrder = ['Beginner', 'Foundation', 'Intermediate', 'Advanced']
  const learningStages = stageOrder
    .map((stage) => {
      const stageChapters = chapters.filter((c) => c.stage === stage)
      const allTopics = stageChapters.flatMap((c) => c.topics.map((t) => t.id))
      const completed = allTopics.filter((id) => doneSet.has(id)).length
      return {
        name: stage,
        kind: 'learning' as const,
        chapters: stageChapters.map((c) => c.title),
        totalTopics: allTopics.length,
        completedTopics: completed,
        complete: allTopics.length > 0 && completed === allTopics.length
      }
    })
    .filter((s) => s.chapters.length > 0)

  const sim = await prisma.simulationState.findUnique({
    where: { userId_careerId: { userId, careerId: active.career.id } }
  })
  const interviewDone = await prisma.interviewSession.count({
    where: {
      userId,
      careerId: active.career.id,
      stage: 'hr',
      status: 'completed',
      score: { gte: INTERVIEW_PASS_SCORE }
    }
  })
  const technicalDone = await prisma.interviewSession.count({
    where: {
      userId,
      careerId: active.career.id,
      stage: 'technical',
      status: 'completed',
      score: { gte: INTERVIEW_PASS_SCORE }
    }
  })
  const readiness = await prisma.readinessRecord.findUnique({
    where: { userId_careerId: { userId, careerId: active.career.id } }
  })

  const tailStatuses = [
    interviewDone > 0 ? 'complete' : 'available',
    technicalDone > 0 ? 'complete' : interviewDone > 0 ? 'available' : 'locked',
    sim ? (sim.status === 'completed' ? 'complete' : 'in_progress') : technicalDone > 0 ? 'available' : 'locked',
    readiness ? (readiness.ready ? 'complete' : 'in_progress') : 'locked'
  ]

  const tailStages = PIPELINE_TAIL.map((name, i) => ({
    name,
    kind: 'pipeline' as const,
    chapters: [],
    totalTopics: 0,
    completedTopics: 0,
    complete: tailStatuses[i] === 'complete',
    status: tailStatuses[i]
  }))

  return {
    career: { name: active.career.name, slug: active.career.slug },
    stages: [...learningStages, ...tailStages]
  }
}

export async function getPerformanceReview(userId: bigint) {
  const active = await requireActiveCareer(userId)
  const computation = await recomputeSkillProgress(userId, active.career.id)
  const events = computation?.events ?? []
  const areas = computation?.areas ?? buildAreas([], 0, 0)
  const counts = computation?.counts ?? {
    simSubmitted: 0,
    threadCount: 0,
    scenarioCount: 0,
    interviewCount: 0
  }
  const ordered = [...events].sort((a, b) => b.occurredAt.getTime() - a.occurredAt.getTime())

  const strengths: string[] = []
  const weaknesses: string[] = []
  const areaRows: Array<[string, number | null]> = [
    ['Learning completion', areas.learning],
    ['Theory exams', areas.theory],
    ['Practical exams', areas.practical],
    ['Assignments', areas.assignments],
    ['Communication', areas.communication],
    ['Simulation', areas.simulation],
    ['Technical interview', areas.technicalInterview]
  ]
  for (const [name, score] of areaRows) {
    if (score === null) continue
    if (score >= 75) strengths.push(`${name}: ${score}/100`)
    else if (score < 60) weaknesses.push(`${name}: ${score}/100 — below the professional bar`)
  }

  const improvementAreas = areaRows
    .filter(([, score]) => score !== null)
    .sort((a, b) => (a[1] as number) - (b[1] as number))
    .slice(0, 3)
    .map(([name, score]) => `${name} (${score}/100)`)

  return {
    career: { name: active.career.name, slug: active.career.slug },
    performance: {
      learning: areas.learning,
      theory: areas.theory,
      practical: areas.practical,
      assignments: areas.assignments,
      communication: areas.communication,
      simulation: areas.simulation,
      technicalInterview: areas.technicalInterview
    },
    detail: {
      theoryExams: events
        .filter((event) => event.category === 'theory')
        .map((event) => ({ title: event.title, score: event.score })),
      practicalExams: events
        .filter((event) => event.category === 'practical')
        .map((event) => ({ title: event.title, score: event.score })),
      assignmentEvaluations: events
        .filter((event) => event.category === 'assignment')
        .map((event) => ({ title: event.title, score: event.score })),
      communicationEvaluations: events
        .filter((event) => event.category === 'communication')
        .map((event) => ({ title: event.title, score: event.score })),
      simulationEvaluations: events
        .filter((event) => event.category === 'simulation')
        .map((event) => ({ title: event.title, score: event.score })),
      assessmentHistory: ordered.map((event) => ({
        publicId: `${event.sourceType}:${event.sourcePublicId}`,
        sourceType: event.sourceType,
        title: event.title,
        category: event.category,
        score: event.score,
        status: event.status,
        skills: event.skills,
        occurredAt: event.occurredAt.toISOString()
      })),
      communicationThreads: counts.threadCount,
      workplaceScenarios: counts.scenarioCount,
      simulationSubmissions: counts.simSubmitted,
      interviews: counts.interviewCount
    },
    strengths,
    weaknesses,
    improvementAreas
  }
}

export async function getCareerReport(userId: bigint) {
  const active = await requireActiveCareer(userId)
  const computation = await recomputeSkillProgress(userId, active.career.id)
  const events = computation?.events ?? []
  const areas = computation?.areas ?? buildAreas([], 0, 0)
  const counts = computation?.counts ?? {
    simSubmitted: 0,
    threadCount: 0,
    scenarioCount: 0,
    interviewCount: 0
  }

  const certificate = await prisma.certificate.findUnique({
    where: { userId_careerId: { userId, careerId: active.career.id } }
  })
  const readiness = await prisma.readinessRecord.findUnique({
    where: { userId_careerId: { userId, careerId: active.career.id } }
  })
  const latestEvaluations = await prisma.evaluation.findMany({
    where: { userId, careerId: active.career.id },
    orderBy: { createdAt: 'desc' },
    take: 5
  })

  const strengths = latestEvaluations.flatMap((e) =>
    Array.isArray(e.strengths) ? (e.strengths as string[]).slice(0, 2) : []
  )
  const developmentAreas = [
    ...new Set(
      latestEvaluations.flatMap((e) =>
        Array.isArray(e.nextArea) ? [] : typeof e.nextArea === 'string' ? [e.nextArea] : []
      )
    )
  ].slice(0, 4)

  const interviews = events.filter((event) => event.category === 'interview')

  return {
    career: { name: active.career.name, slug: active.career.slug, category: active.career.category },
    generatedAt: new Date().toISOString(),
    learningCompletion: {
      completedTopics: computation?.completedTopics ?? 0,
      totalTopics: computation?.totalTopics ?? 0,
      percent: areas.learning
    },
    skillDevelopment: (computation?.skills ?? []).map((skill) => ({
      skill: skill.skill,
      percent: skill.percent
    })),
    examResults: {
      theory: events
        .filter((event) => event.category === 'theory')
        .map((event) => ({ title: event.title, score: event.score })),
      practical: events
        .filter((event) => event.category === 'practical')
        .map((event) => ({ title: event.title, score: event.score }))
    },
    assignmentResults: events
      .filter((event) => event.category === 'assignment')
      .map((event) => ({ title: event.title, score: event.score })),
    simulationResults: {
      tasksSubmitted: counts.simSubmitted,
      averageScore: areas.simulation,
      workplaceScenariosCompleted: counts.scenarioCount,
      communicationThreads: counts.threadCount
    },
    interviewResults: {
      completedSessions: counts.interviewCount,
      bestScore: interviews.length > 0 ? Math.max(...interviews.map((event) => event.score)) : null
    },
    strengths: [...new Set(strengths)].slice(0, 5),
    developmentAreas,
    careerReadiness: readiness
      ? { overallPercent: readiness.overallPercent, ready: readiness.ready }
      : null,
    certificate: certificate
      ? { serial: certificate.serial, issuedAt: certificate.issuedAt }
      : null
  }
}

export type { ProgressSource }
