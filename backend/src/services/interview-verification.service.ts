import { env } from '../config/env.js'
import { normalizeInterviewStage, type InterviewStage } from '../config/constants.js'
import { prisma } from '../utils/prisma.js'
import { logger } from '../utils/logger.js'
import {
  describeSupabaseError,
  runSupabase,
  supabaseAdmin,
  supabaseConfigured,
  supabaseSchema
} from '../utils/supabase.js'

export interface InterviewVerification {
  stage: InterviewStage
  score: number
  passed: boolean
  sessionPublicId: string
  verifiedAt: string | null
}

function supabaseEnabled(): boolean {
  // Tests must never touch the live verification table.
  return supabaseConfigured() && env.NODE_ENV !== 'test'
}

async function findUserPublicId(userId: bigint): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { publicId: true }
  })
  return user?.publicId ?? null
}

/**
 * Mirror a completed interview result into Supabase. The write is best-effort:
 * MySQL remains the operational source of truth, and the gate falls back to it
 * whenever Supabase is unavailable or the row is missing.
 *
 * Transient network failures are retried by `runSupabase`; anything that still
 * fails is logged with the underlying undici cause (ENOTFOUND, ECONNRESET,
 * timeout, ...) and reconciled on a later gate read.
 */
export async function recordInterviewVerification(input: {
  userId: bigint
  careerSlug: string
  stage: InterviewStage
  sessionPublicId: string
  score: number
  passed: boolean
}): Promise<boolean> {
  if (!supabaseEnabled()) return false

  try {
    const userPublicId = await findUserPublicId(input.userId)
    if (!userPublicId) return false

    const now = new Date().toISOString()
    const { error } = await runSupabase(
      () =>
        supabaseAdmin()
          .schema(supabaseSchema())
          .from('interview_verifications')
          .upsert(
            {
              user_public_id: userPublicId,
              career_slug: input.careerSlug,
              stage: input.stage,
              session_public_id: input.sessionPublicId,
              score: input.score,
              passed: input.passed,
              verified_at: now,
              updated_at: now
            },
            { onConflict: 'user_public_id,career_slug,stage' }
          ),
      { label: 'interview_verifications.upsert' }
    )

    if (error) {
      logger.warn(
        {
          error: error.message,
          code: error.code,
          stage: input.stage,
          careerSlug: input.careerSlug,
          sessionPublicId: input.sessionPublicId
        },
        'Unable to mirror interview verification to Supabase'
      )
      return false
    }

    logger.debug(
      { stage: input.stage, careerSlug: input.careerSlug, sessionPublicId: input.sessionPublicId },
      'Interview verification mirrored to Supabase'
    )
    return true
  } catch (error) {
    logger.warn(
      {
        error: describeSupabaseError(error),
        stage: input.stage,
        careerSlug: input.careerSlug,
        sessionPublicId: input.sessionPublicId
      },
      'Unable to mirror interview verification to Supabase'
    )
    return false
  }
}

const reconciliationCooldown = new Map<string, number>()
const RECONCILIATION_COOLDOWN_MS = 5 * 60_000

/**
 * Heal a mirror that was missed during a network outage. Gate reads already
 * fall back to MySQL, so this only schedules a best-effort background write;
 * the student never waits for it and repeated page loads are throttled.
 */
export function reconcileInterviewVerification(input: {
  userId: bigint
  careerSlug: string
  stage: InterviewStage
  sessionPublicId: string | null
  score: number | null
  passed: boolean
  completed: boolean
  verified: boolean
}): void {
  if (
    !supabaseEnabled() ||
    input.verified ||
    !input.completed ||
    !input.passed ||
    !input.sessionPublicId ||
    input.score === null
  ) {
    return
  }

  const key = `${input.userId}:${input.stage}:${input.sessionPublicId}`
  const now = Date.now()
  const nextAllowed = reconciliationCooldown.get(key) ?? 0
  if (nextAllowed > now) return

  reconciliationCooldown.set(key, now + RECONCILIATION_COOLDOWN_MS)
  void recordInterviewVerification({
    userId: input.userId,
    careerSlug: input.careerSlug,
    stage: input.stage,
    sessionPublicId: input.sessionPublicId,
    score: input.score,
    passed: input.passed
  })
}

/**
 * Read the latest Supabase verification for each stage. A missing table or an
 * unavailable Supabase instance returns an empty map so callers can fall back
 * to MySQL-derived state without locking students out.
 *
 * Reads deliberately get a single attempt: a gate check must stay fast, and a
 * failed read already falls back to MySQL.
 */
export async function fetchInterviewVerifications(
  userId: bigint,
  careerSlug: string
): Promise<Map<InterviewStage, InterviewVerification>> {
  const empty = new Map<InterviewStage, InterviewVerification>()
  if (!supabaseEnabled()) return empty

  try {
    const userPublicId = await findUserPublicId(userId)
    if (!userPublicId) return empty

    const { data, error } = await runSupabase(
      () =>
        supabaseAdmin()
          .schema(supabaseSchema())
          .from('interview_verifications')
          .select('stage,score,passed,session_public_id,verified_at')
          .eq('user_public_id', userPublicId)
          .eq('career_slug', careerSlug),
      { label: 'interview_verifications.select', attempts: 1 }
    )

    if (error) {
      logger.warn(
        {
          error: error.message,
          code: error.code,
          careerSlug,
          detail: describeSupabaseError(error)
        },
        'Unable to read interview verifications from Supabase'
      )
      return empty
    }

    const rows = (data ?? []) as Array<{
      stage: string
      score: number | string
      passed: boolean
      session_public_id: string
      verified_at: string | null
    }>

    return new Map(
      rows.map((row) => [
        normalizeInterviewStage(row.stage),
        {
          stage: normalizeInterviewStage(row.stage),
          score: Number(row.score),
          passed: Boolean(row.passed),
          sessionPublicId: row.session_public_id,
          verifiedAt: row.verified_at
        }
      ])
    )
  } catch (error) {
    logger.warn(
      { error: describeSupabaseError(error), careerSlug },
      'Unable to read interview verifications from Supabase'
    )
    return empty
  }
}
