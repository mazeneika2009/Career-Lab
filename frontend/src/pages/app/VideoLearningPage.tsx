import { useMemo, useState } from 'react'
import { learningApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { careerGateOrError } from './LearningPathPage'
import { EmptyState, LoadingState, PageHeader } from '../../components/app/primitives'
import { buildTopicVideo } from '../../components/learning/roadmap/lessonVideo'
import { LessonVideoSection } from '../../components/learning/roadmap/LessonVideoPlayer'

/**
 * Video Learning — the video layer for the selected career, filterable by
 * chapter and topic. Videos load lazily per filter selection.
 */
export default function VideoLearningPage(): React.JSX.Element {
  const book = useAsync(() => learningApi.bookChapters(), [])
  const [chapterFilter, setChapterFilter] = useState<string | null>(null)
  const [topicFilter, setTopicFilter] = useState<string | null>(null)

  const topics = useAsync(
    async () => (chapterFilter ? await learningApi.chapterTopics(chapterFilter) : null),
    [chapterFilter]
  )
  const videos = useAsync(
    () => learningApi.videos({ chapter: chapterFilter ?? undefined, topic: topicFilter ?? undefined }),
    [chapterFilter, topicFilter]
  )

  const chapterName = useMemo(
    () => book.data?.chapters.find((c) => c.publicId === chapterFilter)?.title ?? null,
    [book.data, chapterFilter]
  )

  if (book.loading) return <LoadingState />
  if (book.error) return careerGateOrError(book.error)

  const data = book.data!

  return (
    <div>
      <PageHeader
        eyebrow={data.career.name}
        title="Video Learning"
        description="Curated video material tied to specific chapters and topics of your career curriculum."
      />

      <div className="mb-4 flex flex-wrap gap-2" aria-label="Chapter filter">
        <Chip label="All chapters" active={chapterFilter === null} onClick={() => { setChapterFilter(null); setTopicFilter(null) }} />
        {data.chapters.map((ch) => (
          <Chip
            key={ch.publicId}
            label={`${String(ch.order).padStart(2, '0')} · ${ch.title}`}
            active={chapterFilter === ch.publicId}
            onClick={() => { setChapterFilter(ch.publicId); setTopicFilter(null) }}
          />
        ))}
      </div>

      {topics.data && !topics.loading ? (
        <div className="mb-5 flex flex-wrap gap-2 border-t border-border pt-4" aria-label="Topic filter">
          <Chip label="All topics in chapter" active={topicFilter === null} onClick={() => setTopicFilter(null)} />
          {topics.data.topics.map((t) => (
            <Chip key={t.publicId} label={t.title} active={topicFilter === t.publicId} onClick={() => setTopicFilter(t.publicId)} />
          ))}
        </div>
      ) : null}

      {videos.loading || topics.loading ? (
        <LoadingState />
      ) : videos.error ? (
        <p className="text-sm text-attention">Videos failed to load.</p>
      ) : videos.data && videos.data.videos.length > 0 ? (
        <>
          {chapterName ? (
            <p className="mb-3 text-xs uppercase tracking-[0.14em] text-primary/50">Chapter: {chapterName}</p>
          ) : null}
          <ul className="grid gap-4 md:grid-cols-2">
            {videos.data.videos.map((v) => {
              const video = buildTopicVideo({
                title: v.title,
                url: v.url,
                platform: v.platform,
                durationSec: v.durationSec,
                relationship: v.description
              })
              if (!video) return null
              return (
                <li
                  key={v.publicId}
                  className="card-lift rounded-lg border border-border bg-surface p-4 hover:border-accent/45"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                    {v.stage}
                  </p>
                  <h2 className="mt-1 text-sm font-semibold tracking-tight text-primary">{v.title}</h2>
                  <p className="mt-1 text-xs text-primary/60">
                    {v.platform}
                    {v.creator ? ` · ${v.creator}` : ''}
                    {v.durationSec ? ` · ${Math.round(v.durationSec / 60)} min` : ''}
                  </p>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-primary/70">
                    {v.description}
                  </p>
                  <p className="mt-2 text-xs text-primary/50">Part: {v.topic.title}</p>
                  <LessonVideoSection
                    video={video}
                    careerSlug={data.career.slug}
                    lessonId={`${v.topic.publicId}-${v.publicId}`}
                    variant="compact"
                  />
                </li>
              )
            })}
          </ul>
        </>
      ) : (
        <EmptyState
          title="No verified videos for this selection yet"
          description="Video records appear per topic only where suitable, professionally relevant material can be verified. Every topic's text lessons, links and sources remain available in Digital Books."
        />
      )}
    </div>
  )
}

function Chip({
  label,
  active,
  onClick
}: {
  label: string
  active: boolean
  onClick: () => void
}): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`max-w-full truncate border-b-2 px-0.5 pb-1 text-xs font-medium transition-colors ${
        active
          ? 'border-primary text-primary'
          : 'border-transparent text-primary/60 hover:border-accent/40 hover:text-primary'
      }`}
    >
      {label}
    </button>
  )
}
