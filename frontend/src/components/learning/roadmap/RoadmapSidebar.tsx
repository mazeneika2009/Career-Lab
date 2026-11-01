import type { Lesson, LessonStatus } from './buildLessons'

/**
 * Vertical lesson list for the unified roadmap. Shows every lesson node with
 * its progression state; locked nodes are not selectable.
 */
export function RoadmapSidebar({
  lessons,
  statuses,
  activeLessonId,
  onSelect
}: {
  lessons: Lesson[]
  statuses: LessonStatus[]
  activeLessonId: string | null
  onSelect: (lessonId: string) => void
}): React.JSX.Element {
  return (
    <nav aria-label="Learning roadmap" className="rounded-lg border border-border bg-surface p-2">
      <ol className="space-y-0.5">
        {lessons.map((lesson, i) => {
          const status = statuses[i]!
          const active = lesson.id === activeLessonId
          const locked = status === 'locked'
          return (
            <li key={lesson.id}>
              <button
                type="button"
                disabled={locked}
                onClick={() => onSelect(lesson.id)}
                aria-current={active ? 'true' : undefined}
                aria-label={`Lesson ${lesson.number}: ${lesson.chapterTitle}${lesson.partsTotal > 1 ? `, part ${lesson.part}` : ''} — ${status.replace('_', ' ')}`}
                className={`flex w-full flex-col rounded-md px-3 py-2 text-left transition-colors ${
                  active
                    ? 'bg-primary/5 ring-1 ring-accent/50'
                    : locked
                      ? 'cursor-not-allowed opacity-60'
                      : 'hover:bg-primary/5'
                }`}
              >
                <span className="block font-mono text-[11px] uppercase tracking-widest text-primary/50">
                  Lesson {String(lesson.number).padStart(2, '0')}
                </span>
                <span className={`block truncate text-sm ${locked ? 'text-primary/45' : 'text-primary'} ${active ? 'font-semibold' : 'font-medium'}`}>
                  {lesson.chapterTitle}
                  {lesson.partsTotal > 1 ? ` · P${lesson.part}` : ''}
                </span>
                <span className="block text-xs text-primary/50">
                  {lesson.topics.length} topic{lesson.topics.length === 1 ? '' : 's'}
                  {lesson.carriesExam ? ' · exam' : ''}
                  {' · '}
                  {status === 'completed' ? 'Completed' : status === 'in_progress' ? 'In progress' : 'Locked'}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
