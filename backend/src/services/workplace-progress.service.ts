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
 * Workplace progression mirror.
 *
 * MySQL remains the operational source of truth. These rows give Supabase an
 * explicit, queryable record of which workplace modules a student has opened
 * and finished, so unlock state survives refreshes, re-logins and local MySQL
 * resets. Writes are monotonic (unlock/completion never regresses) and always
 * best-effort: Supabase being unavailable never blocks the student flow.
 */
export const WORKPLACE_MODULES = [
  'company_simulation',
  'team_communication',
  'client_communication',
  'deadlines',
  'scenarios'
] as const

export type WorkplaceModule = (typeof WORKPLACE_MODULES)[number]

export interface WorkplaceModuleState {
  unlocked?: boolean
  completed?: boolean
}

function supabaseEnabled(): boolean {
  // Tests must never touch the live workplace mirror.
  return supabaseConfigured() && env.NODE_ENV !== 'test'
}

/**
 * Upsert unlock/completion state for one or more workplace modules.
 *
 * The Postgres `merge_workplace_progress` function ORs the incoming flags into
 * the existing row, so concurrent writes can never clear an unlock or a
 * completion. Only achieved states are written; a `false`/omitted flag is
 * never sent, which also keeps the table free of noise rows for locked users.
 */
export async function mirrorWorkplaceState(input: {
  userId: bigint
  careerSlug: string
  modules: Partial<Record<WorkplaceModule, WorkplaceModuleState>>
}): Promise<void> {
  if (!supabaseEnabled()) return

  const rows = WORKPLACE_MODULES.flatMap((module) => {
    const next = input.modules[module]
    if (!next) return []

    // Completing a module always implies it was unlocked.
    const completed = Boolean(next.completed)
    const unlocked = Boolean(next.unlocked) || completed
    if (!unlocked && !completed) return []

    return [{ module, unlocked, completed }]
  })
  if (rows.length === 0) return

  try {
    const user = await prisma.user.findUnique({
      where: { id: input.userId },
      select: { publicId: true }
    })
    if (!user) return

    const { error } = await runSupabase(
      () =>
        supabaseAdmin()
          .schema(supabaseSchema())
          .rpc('merge_workplace_progress', {
            p_user_public_id: user.publicId,
            p_career_slug: input.careerSlug,
            p_rows: rows
          }),
      { label: 'workplace_progress.merge' }
    )

    if (error) {
      logger.warn(
        {
          error: error.message,
          code: error.code,
          careerSlug: input.careerSlug,
          detail: describeSupabaseError(error)
        },
        'Unable to mirror workplace progress to Supabase'
      )
      return
    }

    logger.debug(
      { careerSlug: input.careerSlug, modules: rows.map((row) => row.module) },
      'Workplace progress mirrored to Supabase'
    )
  } catch (error) {
    logger.warn(
      { error: describeSupabaseError(error), careerSlug: input.careerSlug },
      'Unable to mirror workplace progress to Supabase'
    )
  }
}
