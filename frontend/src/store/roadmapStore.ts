import { create } from 'zustand'

/**
 * Roadmap store — client state for the unified learning roadmap.
 *
 * Server data (topic completion, exam results) stays the source of truth and
 * is refetched after mutations. The store keeps:
 * - `activeLessonId`: the lesson node currently open in the hub.
 * - `optimisticPassed`: lesson ids the user has just passed locally, merged
 *   with server state so the timeline updates instantly when a chapter exam
 *   is passed (reconciled away on the next server refetch).
 * - `refreshToken`: bumped after any completion mutation so the page refetches.
 */
interface RoadmapState {
  activeLessonId: string | null
  optimisticPassed: Record<string, true>
  refreshToken: number
  setActiveLesson: (id: string | null) => void
  markLessonPassed: (id: string) => void
  notifyProgressChanged: () => void
  reset: () => void
}

export const useRoadmapStore = create<RoadmapState>()((set) => ({
  activeLessonId: null,
  optimisticPassed: {},
  refreshToken: 0,
  setActiveLesson: (id) => set({ activeLessonId: id }),
  markLessonPassed: (id) =>
    set((s) => ({
      optimisticPassed: { ...s.optimisticPassed, [id]: true },
      refreshToken: s.refreshToken + 1
    })),
  notifyProgressChanged: () => set((s) => ({ refreshToken: s.refreshToken + 1 })),
  reset: () => set({ activeLessonId: null, optimisticPassed: {} })
}))
