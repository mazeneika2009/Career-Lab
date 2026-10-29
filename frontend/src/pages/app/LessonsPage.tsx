import { lazy, Suspense, useState } from 'react'
import { learningApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { careerGateOrError } from './LearningPathPage'
import {
  ErrorState,
  LoadingState,
  PageHeader,
  Panel,
  StatusText
} from '../../components/app/primitives'

const TopicReader = lazy(() => import('../../components/learning/TopicReader'))

/**
 * Lessons: current chapter with its topics, objectives and status.
 * Opening a topic loads the full educational content lazily (topic reader).
 */
export default function LessonsPage(): React.JSX.Element {
  const chapters = useAsync(() => learningApi.bookChapters(), [])
  const [activeChapter, setActiveChapter] = useState<string | null>(null)

  if (chapters.loading) return <LoadingState />
  if (chapters.error) return careerGateOrError(chapters.error)

  const data = chapters.data!
  const chapterId = activeChapter ?? data.continueReading
    ? activeChapter ?? findChapterOfTopic(data, data.continueReading)
    : null

  return (
    <div>
      <PageHeader
        eyebrow={data.career.name}
        title="Lessons"
        description={data.book.title}
      />

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <nav aria-label="Chapters" className="rounded-lg border border-border bg-surface p-2">
          <ul className="space-y-1">
            {data.chapters.map((ch) => (
              <li key={ch.publicId}>
                <button
                  type="button"
                  onClick={() => setActiveChapter(ch.publicId)}
                  aria-current={chapterId === ch.publicId}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    chapterId === ch.publicId ? 'bg-primary/5 font-medium text-primary' : 'text-primary/70 hover:bg-primary/5'
                  }`}
                >
                  <span className="block truncate">{ch.title}</span>
                  <span className="mt-0.5 block text-xs tabular-nums text-primary/50">
                    {ch.stage} · {ch.progress.completed}/{ch.progress.total} done
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>{chapterId ? <LessonChapterView chapterPublicId={chapterId} /> : <p className="text-sm text-primary/60">Select a chapter.</p>}</div>
      </div>
    </div>
  )
}

function findChapterOfTopic(
  data: { chapters: Array<{ publicId: string; topicIds: string[] }> },
  topicId: string | null
): string | null {
  if (!topicId) return null
  const chapter = data.chapters.find((ch) => ch.topicIds.includes(topicId))
  return chapter?.publicId ?? data.chapters[0]?.publicId ?? null
}

function LessonChapterView({ chapterPublicId }: { chapterPublicId: string }): React.JSX.Element {
  const state = useAsync(() => learningApi.chapterTopics(chapterPublicId), [chapterPublicId])
  const [openTopic, setOpenTopic] = useState<string | null>(null)

  if (state.loading) return <LoadingState />
  if (state.error) return <ErrorState error={state.error} />

  const d = state.data!

  return (
    <div className="space-y-4">
      <Panel title={`${d.chapter.order}. ${d.chapter.title}`}>
        <p className="text-sm leading-relaxed text-primary/70">{d.chapter.description}</p>
      </Panel>

      {openTopic ? (
        <div>
          <button
            type="button"
            onClick={() => setOpenTopic(null)}
            className="mb-3 text-sm font-medium text-accent hover:underline"
          >
            ← Back to topics
          </button>
          <Suspense fallback={<LoadingState />}>
            <TopicReader topicPublicId={openTopic} />
          </Suspense>
        </div>
      ) : (
        <ul className="space-y-3">
          {d.topics.map((t) => (
            <li key={t.publicId} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-primary">{t.title}</h3>
                  <p className="mt-0.5 text-xs tabular-nums text-primary/50">{t.minutes} min</p>
                </div>
                <StatusText tone={t.status} />
              </div>
              <ul className="mt-3 space-y-1">
                {t.objectives.map((o, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-primary/70">
                    <span aria-hidden className="text-accent">–</span>
                    {o}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setOpenTopic(t.publicId)}
                  className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-primary hover:border-accent/60"
                >
                  {t.status === 'completed' ? 'Revisit lesson' : t.status === 'in_progress' ? 'Continue' : 'Open lesson'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
