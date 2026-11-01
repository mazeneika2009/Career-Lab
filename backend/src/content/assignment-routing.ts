/**
 * Assignment → lesson routing.
 *
 * Authored careers ship a small number of stage-level capstone assignments
 * while every chapter has its own four-stage flow. Each authored assignment is
 * therefore attached to the last unclaimed chapter of the same stage; chapters
 * without an authored assignment get a generated, lesson-specific project in
 * `ensureCareerAssignments`.
 *
 * The same deterministic rule is used when seeding and when backfilling an
 * existing database, so both paths produce identical lesson coupling.
 */
export interface RoutableChapter {
  id: bigint
  stage: string
  order: number
}

export interface RoutableAssignment {
  stage: string
  order: number
}

export function pickChapterForAssignment<T extends RoutableChapter>(
  assignment: RoutableAssignment,
  chapters: T[],
  claimedChapterIds: Set<bigint>
): T | null {
  const available = chapters
    .filter((chapter) => !claimedChapterIds.has(chapter.id))
    .sort((a, b) => a.order - b.order)
  if (available.length === 0) return null

  const sameStage = available.filter((chapter) => chapter.stage === assignment.stage)
  if (sameStage.length > 0) return sameStage[sameStage.length - 1]!

  // Fall back to the closest unclaimed position when a career uses a stage
  // label that has no matching chapter.
  const position = Math.min(available.length - 1, Math.max(0, assignment.order - 1))
  return available[position] ?? available[0]!
}
