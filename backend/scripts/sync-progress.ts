/**
 * Rebuild MySQL skill aggregates and mirror every user's progress to Supabase.
 *
 * Usage:
 *   npm run sync:progress
 *
 * Safe to re-run. The mirror is idempotent (upserts keyed by user/career/event
 * and user/career/skill), so historical data is backfilled without duplicates.
 */
import { config } from 'dotenv'
import { prisma } from '../src/utils/prisma.js'
import { recomputeSkillProgress } from '../src/services/progress.service.js'

config()

async function main(): Promise<void> {
  const selections = await prisma.studentCareer.findMany({
    where: { active: true },
    include: {
      user: { select: { email: true } },
      career: { select: { slug: true } }
    },
    orderBy: { selectedAt: 'asc' }
  })

  if (selections.length === 0) {
    console.log('No active career selections found.')
    return
  }

  let failed = 0
  for (const selection of selections) {
    try {
      const result = await recomputeSkillProgress(selection.userId, selection.careerId, {
        awaitMirror: true
      })
      console.log(
        `${selection.user.email} · ${selection.career.slug}: ` +
          `${result?.completedTopics ?? 0}/${result?.totalTopics ?? 0} topics, ` +
          `${result?.skills.length ?? 0} skills, ${result?.events.length ?? 0} graded events`
      )
    } catch (error) {
      failed += 1
      console.error(
        `${selection.user.email} · ${selection.career.slug}: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }

  if (failed > 0) {
    throw new Error(`${failed} progress sync(s) failed.`)
  }
  console.log(`Progress sync complete for ${selections.length} active career selection(s).`)
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
