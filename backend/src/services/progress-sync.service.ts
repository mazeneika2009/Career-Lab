import { env } from '../config/env.js'
import { prisma } from '../utils/prisma.js'
import { logger } from '../utils/logger.js'
import {
  describeSupabaseError,
  runSupabase,
  supabaseAdmin,
  supabaseConfigured,
  supabaseSchema
} from '../utils/supabase.js'

/**
 * Supabase progress mirror.
 *
 * MySQL remains the operational source of truth. After every recompute we
 * mirror the exact, already-graded evidence into Supabase so analytics,
 * reporting jobs and support tooling can query a single Postgres copy:
 *
 *   assessment_scores — immutable event ledger (one row per event/skill)
 *   skill_metrics     — per-skill aggregate snapshot
 *   user_progress     — per-career dashboard rollup
 *
 * Every write is best-effort: a missing table, network timeout or RLS
 * misconfiguration must never break a student-facing request.
 */

export type ProgressSource =
  | 'theory_exam'
  | 'practical_exam'
  | 'assignment'
  | 'sim_task'
  | 'communication'
  | 'scenario'
  | 'interview'

export type ProgressCategory =
  | 'theory'
  | 'practical'
  | 'assignment'
  | 'communication'
  | 'simulation'
  | 'interview'

export interface ProgressMirrorEvent {
  sourceType: ProgressSource
  sourcePublicId: string
  title: string
  category: ProgressCategory
  score: number
  status: 'passed' | 'failed' | 'completed'
  passed: boolean | null
  skills: string[]
  occurredAt: Date
}

export interface SkillMetricSnapshot {
  skill: string
  percent: number
  learningDone: number
  learningTotal: number
  theoryAvg: number | null
  practicalAvg: number | null
  assignmentAvg: number | null
  communicationAvg: number | null
  simulationAvg: number | null
  /** Latest evaluated interview score, not an average. */
  interviewAvg: number | null
}

export interface UserProgressSnapshot {
  completedTopics: number
  totalTopics: number
  learningPercent: number
  theoryAvg: number | null
  practicalAvg: number | null
  assignmentAvg: number | null
  communicationAvg: number | null
  simulationAvg: number | null
  technicalInterviewLatest: number | null
  overallPercent: number
  assessmentsCount: number
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)))
}

function uniqueBy<T>(rows: T[], key: (row: T) => string): T[] {
  const seen = new Set<string>()
  const result: T[] = []
  for (const row of rows) {
    const id = key(row)
    if (seen.has(id)) continue
    seen.add(id)
    result.push(row)
  }
  return result
}

async function upsertRows(
  table: string,
  rows: Array<Record<string, unknown>>,
  onConflict: string
): Promise<void> {
  if (rows.length === 0) return
  const result = await runSupabase(
    () =>
      supabaseAdmin()
        .schema(supabaseSchema())
        .from(table)
        .upsert(rows, { onConflict }),
    { label: `${table}.upsert` }
  )
  if (result.error) {
    logger.warn(
      { table, error: describeSupabaseError(result.error) },
      'Supabase progress mirror write failed; MySQL remains authoritative'
    )
  }
}

export async function syncProgressToSupabase(input: {
  userId: bigint
  careerId: bigint
  events: ProgressMirrorEvent[]
  skills: SkillMetricSnapshot[]
  snapshot: UserProgressSnapshot
}): Promise<void> {
  if (env.NODE_ENV === 'test' || !supabaseConfigured()) return

  try {
    const [user, career] = await Promise.all([
      prisma.user.findUnique({ where: { id: input.userId }, select: { publicId: true } }),
      prisma.career.findUnique({ where: { id: input.careerId }, select: { slug: true } })
    ])
    if (!user?.publicId || !career?.slug) return

    const userPublicId = user.publicId
    const careerSlug = career.slug

    const eventRows = uniqueBy(
      input.events.flatMap((event) =>
        event.skills
          .map((skill) => skill.trim())
          .filter(Boolean)
          .map((skill) => ({
            user_public_id: userPublicId,
            career_slug: careerSlug,
            source_type: event.sourceType,
            source_public_id: event.sourcePublicId,
            title: event.title.slice(0, 200),
            category: event.category,
            skill: skill.slice(0, 120),
            score: clampScore(event.score),
            status: event.status,
            passed: event.passed,
            occurred_at: event.occurredAt.toISOString()
          }))
      ),
      (row) =>
        `${row.user_public_id}|${row.career_slug}|${row.source_type}|${row.source_public_id}|${row.skill}`
    )

    const skillRows = uniqueBy(
      input.skills.map((skill) => ({
        user_public_id: userPublicId,
        career_slug: careerSlug,
        skill: skill.skill.slice(0, 120),
        percent: clampScore(skill.percent),
        learning_done: skill.learningDone,
        learning_total: skill.learningTotal,
        theory_avg: skill.theoryAvg,
        practical_avg: skill.practicalAvg,
        assignment_avg: skill.assignmentAvg,
        communication_avg: skill.communicationAvg,
        simulation_avg: skill.simulationAvg,
        interview_avg: skill.interviewAvg
      })),
      (row) => `${row.user_public_id}|${row.career_slug}|${row.skill}`
    )

    const progressRow = {
      user_public_id: userPublicId,
      career_slug: careerSlug,
      completed_topics: input.snapshot.completedTopics,
      total_topics: input.snapshot.totalTopics,
      learning_percent: clampScore(input.snapshot.learningPercent),
      theory_avg: input.snapshot.theoryAvg,
      practical_avg: input.snapshot.practicalAvg,
      assignment_avg: input.snapshot.assignmentAvg,
      communication_avg: input.snapshot.communicationAvg,
      simulation_avg: input.snapshot.simulationAvg,
      technical_interview_latest: input.snapshot.technicalInterviewLatest,
      overall_percent: clampScore(input.snapshot.overallPercent),
      assessments_count: input.snapshot.assessmentsCount
    }

    await upsertRows(
      'assessment_scores',
      eventRows,
      'user_public_id,career_slug,source_type,source_public_id,skill'
    )
    await upsertRows('skill_metrics', skillRows, 'user_public_id,career_slug,skill')
    await upsertRows('user_progress', [progressRow], 'user_public_id,career_slug')
  } catch (error) {
    logger.warn(
      { error: describeSupabaseError(error) },
      'Supabase progress mirror failed; MySQL remains authoritative'
    )
  }
}
