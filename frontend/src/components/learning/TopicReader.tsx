import { useState } from 'react'
import { learningApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { Button } from '../ui/button/Button'
import { ErrorState, LoadingState, StatusText } from '../app/primitives'
import { buildTopicVideo, isVideoUrl } from './roadmap/lessonVideo'
import { LessonVideoSection } from './roadmap/LessonVideoPlayer'

/**
 * Topic Engine — renders one topic's full learning material:
 * text sections, links, videos, tooling and source attribution.
 * Content is fetched lazily per topic.
 */
export default function TopicReader({
  topicPublicId,
  onNavigate
}: {
  topicPublicId: string
  onNavigate?: (topicPublicId: string | null) => void
}): React.JSX.Element {
  const state = useAsync(() => learningApi.topicContent(topicPublicId), [topicPublicId])
  const [completing, setCompleting] = useState(false)

  if (state.loading) return <LoadingState />
  if (state.error) return <ErrorState error={state.error} />

  const d = state.data!
  const nav = d.navigation

  const complete = async (): Promise<void> => {
    setCompleting(true)
    try {
      await learningApi.completeTopic(d.topic.publicId)
      if (onNavigate && nav.next) onNavigate(nav.next)
    } finally {
      setCompleting(false)
    }
  }

  return (
    <article>
      <header className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          {d.chapter.title} · Stage: {d.chapter.stage}
        </p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold tracking-tight text-primary">{d.topic.title}</h2>
          <StatusText tone={d.topic.status} />
        </div>
        <p className="mt-1 text-xs tabular-nums text-primary/50">
          Topic {nav.position} of {nav.totalInChapter} · {d.topic.minutes} min
        </p>
      </header>

      <section className="rounded-lg border border-border bg-surface px-6 py-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary/50">Learning objectives</h3>
        <ul className="space-y-1.5">
          {d.topic.objectives.map((o, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-primary/80">
              <span aria-hidden className="mt-0.5 text-accent">–</span>
              {o}
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-5 border-t border-border pt-5">
          {d.topic.sections.map((s, i) => (
            <div key={i}>
              <h4 className="text-base font-semibold tracking-tight text-primary">{s.heading}</h4>
              <p className="mt-1.5 text-[15px] leading-[1.75] text-primary/85">{s.body}</p>
            </div>
          ))}
        </div>

        {d.resources.links.some((r) => !isVideoUrl(r.url)) ? (
          <ResourceBlock
            title="Links"
            items={d.resources.links.filter((r) => !isVideoUrl(r.url))}
          />
        ) : null}
        {d.resources.videos.length > 0 ? (
          <div className="mt-6 border-t border-border pt-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary/50">Videos</h3>
            <div className="mt-3 space-y-3">
              {d.resources.videos.map((r) => {
                const video = buildTopicVideo(r, d.topic.objectives)
                return video ? (
                  <LessonVideoSection
                    key={String(r.id)}
                    video={video}
                    careerSlug=""
                    lessonId={`${d.topic.publicId}-${r.id}`}
                  />
                ) : null
              })}
            </div>
          </div>
        ) : null}
        {d.resources.tools.some((r) => !isVideoUrl(r.url)) ? (
          <ResourceBlock
            title="Tooling"
            items={d.resources.tools.filter((r) => !isVideoUrl(r.url))}
          />
        ) : null}
        {d.resources.sources.some((r) => !isVideoUrl(r.url)) ? (
          <>
            <h3 className="mt-6 border-t border-border pt-5 text-sm font-semibold uppercase tracking-wide text-primary/50">Sources</h3>
            <ul className="mt-2 space-y-1.5">
              {d.resources.sources.filter((r) => !isVideoUrl(r.url)).map((r) => (
                <li key={String(r.id)} className="text-sm leading-relaxed text-primary/70">
                  {r.platform} — <span className="text-primary/50">{r.relationship}</span>{' '}
                  <a href={r.url} target="_blank" rel="noreferrer" className="break-all text-accent hover:underline">
                    {r.url}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </section>

      <footer className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {nav.previous ? (
            <Button variant="secondary" size="sm" onClick={() => onNavigate?.(nav.previous)}>
              Previous topic
            </Button>
          ) : null}
          {nav.next ? (
            <Button variant="secondary" size="sm" onClick={() => onNavigate?.(nav.next)}>
              Next topic
            </Button>
          ) : null}
        </div>
        <Button size="sm" disabled={completing} onClick={() => void complete()}>
          {completing ? 'Saving…' : 'Mark topic complete'}
        </Button>
      </footer>
    </article>
  )
}

function ResourceBlock({
  title,
  items
}: {
  title: string
  items: Array<{ id: number | string; title: string; url: string; platform: string | null; relationship: string; durationSec?: number | null }>
}): React.JSX.Element {
  return (
    <div className="mt-6 border-t border-border pt-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-primary/50">{title}</h3>
      <ul className="mt-2 space-y-2">
        {items.map((r) => (
          <li key={String(r.id)} className="text-sm leading-relaxed">
            <a href={r.url} target="_blank" rel="noreferrer" className="font-medium text-primary underline decoration-border hover:decoration-accent">
              {r.title}
            </a>
            {r.platform ? <span className="ml-1.5 text-xs text-primary/50">{r.platform}</span> : null}
            <span className="block text-xs text-primary/55">{r.relationship}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
