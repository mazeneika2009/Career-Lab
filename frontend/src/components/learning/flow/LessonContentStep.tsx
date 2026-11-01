import { useEffect, useState } from 'react'
import { learningApi } from '../../../api/learning'
import { useAsync } from '../../../hooks/useAsync'
import type {
  LearningFlowLesson,
  TopicContentData,
  TopicResourceView
} from '../../../types/domain'
import { Button } from '../../ui/button/Button'
import { ErrorState, LoadingState, ProgressBar, StatusText } from '../../app/primitives'
import { buildTopicVideo, isVideoUrl } from '../roadmap/lessonVideo'
import { LessonVideoSection } from '../roadmap/LessonVideoPlayer'

/** Exact lesson location a student should re-study after a missed exam question. */
export interface LessonContentFocus {
  topicPublicId: string
  /** Zero-based section index. */
  sectionIndex: number
  /** One-based paragraph number. */
  paragraphNumber: number
  /** Changes on every navigation request so repeated reviews re-scroll. */
  nonce: number
}

/**
 * The content stage of a lesson: optional career video, every reading topic,
 * and an explicit completion action per topic. The lesson (and the following
 * theory exam) only unlocks after every topic is marked complete on the server.
 */
export function LessonContentStep({
  lesson,
  careerSlug,
  focus,
  onTopicSaved,
  onContentComplete
}: {
  lesson: LearningFlowLesson
  careerSlug: string
  focus?: LessonContentFocus | null
  onTopicSaved: () => void
  onContentComplete: () => void
}): React.JSX.Element {
  const focusedTopicId =
    focus && lesson.topics.some((topic) => topic.publicId === focus.topicPublicId)
      ? focus.topicPublicId
      : null
  const firstOpen = lesson.topics.find((topic) => topic.status !== 'completed')?.publicId ?? null
  const [openTopic, setOpenTopic] = useState<string | null>(focusedTopicId ?? firstOpen)

  useEffect(() => {
    if (focusedTopicId) setOpenTopic(focusedTopicId)
  }, [focusedTopicId, focus?.nonce])

  const done = lesson.topics.filter((topic) => topic.status === 'completed').length
  const total = lesson.topics.length
  const complete = total > 0 && done === total

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-border bg-surface">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/45">
              Lesson {String(lesson.number).padStart(2, '0')} · Content
            </p>
            <h2 className="mt-1 font-display text-lg font-semibold tracking-tight text-primary">
              {lesson.title}
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-primary/65">
              {lesson.description}
            </p>
          </div>
          <StatusText tone={complete ? 'completed' : 'in_progress'} />
        </div>
        <div className="px-5 py-4">
          <div className="max-w-md">
            <ProgressBar
              percent={total === 0 ? 100 : (done / total) * 100}
              label={`${done}/${total} topics complete`}
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-primary/60">
            Work through all three parts in order. Each part pairs its targeted crash-course video
            with the reading; the theory exam unlocks as soon as every part is completed.
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4">
          <div>
            <h2 className="font-display text-sm font-semibold tracking-tight text-primary">
              Reading material
            </h2>
            <p className="mt-0.5 text-sm text-primary/60">
              {total} topic{total === 1 ? '' : 's'} · complete each one to unlock the theory exam.
            </p>
          </div>
        </div>

        {total === 0 ? (
          <p className="px-5 py-5 text-sm text-primary/60">
            No reading topics are attached to this lesson. Continue with the theory exam when it
            becomes available.
          </p>
        ) : (
          <ol className="divide-y divide-border/70">
            {lesson.topics.map((topic, index) => {
              const isOpen = openTopic === topic.publicId
              return (
                <li key={topic.publicId}>
                  <button
                    type="button"
                    onClick={() => setOpenTopic((current) => (current === topic.publicId ? null : topic.publicId))}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors hover:bg-primary/[0.025]"
                  >
                    <span className="flex min-w-0 items-baseline gap-3">
                      <span className="shrink-0 font-mono text-[11px] font-semibold tabular-nums text-primary/40">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-primary">{topic.title}</span>
                        <span className="mt-0.5 block text-xs text-primary/50">
                          {topic.minutes} min
                        </span>
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <StatusText tone={topic.status} />
                      <span aria-hidden className="text-xs text-primary/35">{isOpen ? 'Close' : 'Open'}</span>
                    </span>
                  </button>
                  {isOpen ? (
                    <div className="border-t border-border/60 bg-bg/35 px-5 py-4">
                      <TopicReader
                        topicPublicId={topic.publicId}
                        careerSlug={careerSlug}
                        completed={topic.status === 'completed'}
                        nextTopicId={lesson.topics[index + 1]?.publicId ?? null}
                        focus={
                          focus?.topicPublicId === topic.publicId
                            ? {
                                sectionIndex: focus.sectionIndex,
                                paragraphNumber: focus.paragraphNumber,
                                nonce: focus.nonce
                              }
                            : null
                        }
                        onAdvance={(nextId) => setOpenTopic(nextId)}
                        onSaved={(lessonComplete) => {
                          if (lessonComplete) onContentComplete()
                          else onTopicSaved()
                        }}
                      />
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ol>
        )}
      </section>
    </div>
  )
}

function TopicReader({
  topicPublicId,
  careerSlug,
  completed,
  nextTopicId,
  focus,
  onAdvance,
  onSaved
}: {
  topicPublicId: string
  careerSlug: string
  completed: boolean
  nextTopicId: string | null
  focus?: { sectionIndex: number; paragraphNumber: number; nonce: number } | null
  onAdvance: (nextTopicId: string | null) => void
  onSaved: (lessonComplete: boolean) => void
}): React.JSX.Element {
  const state = useAsync(() => learningApi.topicContent(topicPublicId), [topicPublicId])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [highlightedSection, setHighlightedSection] = useState<number | null>(null)
  const focusSectionIndex = focus?.sectionIndex
  const focusParagraphNumber = focus?.paragraphNumber
  const focusNonce = focus?.nonce

  useEffect(() => {
    if (focusSectionIndex === undefined || !state.data) {
      setHighlightedSection(null)
      return
    }
    const topicId = state.data.topic.publicId
    const sectionElement = document.getElementById(`topic-${topicId}-section-${focusSectionIndex}`)
    const paragraphIndex = Math.max(0, (focusParagraphNumber ?? 1) - 1)
    const paragraphElement = document.getElementById(
      `topic-${topicId}-section-${focusSectionIndex}-p-${paragraphIndex}`
    )
    const target = paragraphElement ?? sectionElement
    if (!target) return

    setHighlightedSection(focusSectionIndex)
    const scrollTimer = window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 80)
    const clearTimer = window.setTimeout(() => setHighlightedSection(null), 8_000)
    return () => {
      window.clearTimeout(scrollTimer)
      window.clearTimeout(clearTimer)
    }
  }, [state.data, focusSectionIndex, focusParagraphNumber, focusNonce])

  if (state.loading) return <LoadingState />
  if (state.error || !state.data) return <ErrorState error={state.error} />

  const data = state.data
  const save = async (): Promise<void> => {
    setSaving(true)
    setError(null)
    try {
      const response = await learningApi.completeTopic(data.topic.publicId)
      onAdvance(nextTopicId)
      onSaved(response.lessonContentComplete)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save your progress.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <article className="max-w-3xl">
      {data.topic.objectives.length > 0 ? (
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
            Learning objectives
          </h3>
          <ul className="mt-2 space-y-1.5">
            {data.topic.objectives.map((objective, index) => (
              <li key={index} className="flex gap-2 text-sm leading-relaxed text-primary/80">
                <span aria-hidden className="mt-0.5 text-accent">–</span>
                {objective}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {data.resources.videos.length > 0 ? (
        <section className="mt-5">
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
            Part video · targeted crash course
          </h3>
          <div className="mt-2 space-y-3">
            {data.resources.videos.map((resource) => {
              const video = buildTopicVideo(resource, data.topic.objectives)
              return video ? (
                <LessonVideoSection
                  key={resource.id}
                  video={video}
                  careerSlug={careerSlug}
                  lessonId={`${data.topic.publicId}-${resource.id}`}
                />
              ) : null
            })}
          </div>
        </section>
      ) : null}

      <div className="mt-5 space-y-5">
        {data.topic.sections.map((section, index) => {
          const highlighted = highlightedSection === index
          return (
            <section
              key={index}
              id={`topic-${data.topic.publicId}-section-${index}`}
              className={`scroll-mt-24 rounded-md transition-colors duration-300 ${
                highlighted
                  ? '-mx-3 bg-accent/[0.055] px-3 py-2 ring-1 ring-accent/25'
                  : ''
              }`}
            >
              <h3 className="text-sm font-semibold tracking-tight text-primary">
                {section.heading}
              </h3>
              <div className="mt-1.5 space-y-2">
                {splitParagraphs(section.body).map((paragraph, paragraphIndex) => {
                  const paragraphHighlighted =
                    highlighted && (focusParagraphNumber ?? 1) - 1 === paragraphIndex
                  return (
                    <p
                      key={paragraphIndex}
                      id={`topic-${data.topic.publicId}-section-${index}-p-${paragraphIndex}`}
                      className={`whitespace-pre-line text-sm leading-[1.85] text-primary/85 ${
                        paragraphHighlighted
                          ? '-mx-2 rounded bg-accent/10 px-2 py-1 ring-1 ring-accent/20'
                          : ''
                      }`}
                    >
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      <ResourceList data={data} />

      {error ? (
        <p className="mt-3 rounded-md bg-attention/10 px-3 py-2 text-sm text-attention">{error}</p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border/70 pt-4">
        {completed ? (
          <>
            <StatusText tone="completed" />
            <span className="text-sm text-primary/60">
              This topic is saved as complete. Review it any time.
            </span>
          </>
        ) : (
          <>
            <Button size="sm" disabled={saving} onClick={() => void save()}>
              {saving ? 'Saving…' : 'Mark topic complete'}
            </Button>
            <span className="text-xs text-primary/50">
              Completing every topic unlocks the theory exam.
            </span>
          </>
        )}
      </div>
    </article>
  )
}

function splitParagraphs(body: string): string[] {
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
  return paragraphs.length > 0 ? paragraphs : [body]
}

function ResourceList({ data }: { data: TopicContentData }): React.JSX.Element | null {
  const nonVideo = (items: TopicResourceView[]): TopicResourceView[] =>
    items.filter((item) => !isVideoUrl(item.url))
  const rows: Array<{ label: string; items: TopicResourceView[] }> = [
    { label: 'Links', items: nonVideo(data.resources.links) },
    { label: 'Tools', items: nonVideo(data.resources.tools) },
    { label: 'Sources', items: nonVideo(data.resources.sources) }
  ].filter((row) => row.items.length > 0)

  if (rows.length === 0) return null

  return (
    <div className="mt-5 space-y-3 border-t border-border/70 pt-4">
      {rows.map((row) => (
        <div key={row.label}>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/50">
            {row.label}
          </h3>
          <ul className="mt-1.5 space-y-1">
            {row.items.map((item) => (
              <li key={item.id} className="text-sm">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-accent hover:underline"
                >
                  {item.title}
                </a>
                {item.platform ? <span className="ml-1.5 text-xs text-primary/45">{item.platform}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
