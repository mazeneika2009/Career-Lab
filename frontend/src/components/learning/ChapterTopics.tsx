import { learningApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { StatusText } from '../app/primitives'

/** Chapter Engine — lists a chapter's topics with objectives and status. */
export default function ChapterTopics({
  chapterPublicId,
  onOpenTopic,
  onBack
}: {
  chapterPublicId: string
  onOpenTopic: (topicPublicId: string) => void
  onBack?: () => void
}): React.JSX.Element {
  const state = useAsync(() => learningApi.chapterTopics(chapterPublicId), [chapterPublicId])

  if (state.loading) return <Loading />
  if (state.error) return <p className="text-sm text-attention">Chapter failed to load.</p>

  const d = state.data!

  return (
    <section className="rounded-lg border border-border bg-surface">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-primary">
            {d.chapter.order}. {d.chapter.title}
          </h2>
          <p className="text-xs text-primary/55">{d.bookTitle}</p>
        </div>
        {onBack ? (
          <button type="button" onClick={onBack} className="text-sm font-medium text-accent hover:underline">
            Close
          </button>
        ) : null}
      </header>
      <ul className="divide-y divide-border/70">
        {d.topics.map((t) => (
          <li key={t.publicId} className="px-5 py-3">
            <div className="flex items-center justify-between gap-3">
              <button type="button" onClick={() => onOpenTopic(t.publicId)} className="text-left text-sm font-medium text-primary hover:text-accent">
                {t.title}
              </button>
              <StatusText tone={t.status} />
            </div>
            <ul className="mt-1 space-y-0.5">
              {t.objectives.map((o, i) => (
                <li key={i} className="text-xs leading-relaxed text-primary/60">
                  · {o}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Loading(): React.JSX.Element {
  return (
    <div className="flex min-h-24 items-center justify-center" role="status" aria-label="Loading chapter">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary/20 border-t-accent" />
    </div>
  )
}
