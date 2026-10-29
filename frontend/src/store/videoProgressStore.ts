import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Video progress store — client-side watch state for lesson videos.
 *
 * The backend (Phase 1 scope) has no video-watch endpoint, so completion is
 * persisted per browser per career (`careerSlug:lessonId`). When a watch
 * endpoint lands, replace `markWatched` with a server call and keep this as
 * an optimistic cache.
 */
interface VideoProgressState {
  watched: Record<string, true>
  /** Last reported 0..1 watch position per lesson key. */
  progress: Record<string, number>
  isWatched: (careerSlug: string, lessonId: string) => boolean
  watchProgress: (careerSlug: string, lessonId: string) => number
  markWatched: (careerSlug: string, lessonId: string) => void
  setProgress: (careerSlug: string, lessonId: string, fraction: number) => void
}

export function videoLessonKey(careerSlug: string, lessonId: string): string {
  return `${careerSlug}:${lessonId}`
}

export const useVideoProgressStore = create<VideoProgressState>()(
  persist(
    (set, get) => ({
      watched: {},
      progress: {},
      isWatched: (careerSlug, lessonId) => get().watched[videoLessonKey(careerSlug, lessonId)] === true,
      watchProgress: (careerSlug, lessonId) => get().progress[videoLessonKey(careerSlug, lessonId)] ?? 0,
      markWatched: (careerSlug, lessonId) =>
        set((s) => ({
          watched: { ...s.watched, [videoLessonKey(careerSlug, lessonId)]: true },
          progress: { ...s.progress, [videoLessonKey(careerSlug, lessonId)]: 1 }
        })),
      setProgress: (careerSlug, lessonId, fraction) => {
        const key = videoLessonKey(careerSlug, lessonId)
        const prev = get().progress[key] ?? 0
        // Throttle store writes: ignore sub-2% jitter to avoid re-render spam.
        if (Math.abs(fraction - prev) < 0.02 || get().watched[key]) return
        set((s) => ({ progress: { ...s.progress, [key]: fraction } }))
      }
    }),
    {
      name: 'career-lab-video-progress',
      partialize: (s) => ({ watched: s.watched, progress: s.progress })
    }
  )
)
