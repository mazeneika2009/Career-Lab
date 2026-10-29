import { Suspense, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { learningApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import ChapterTopics from '../../components/learning/ChapterTopics'
import TopicReader from '../../components/learning/TopicReader'
import { Icon } from '../../components/ui/icon/Icon'
import { careerGateOrError } from './LearningPathPage'
import { LoadingState, PageHeader } from '../../components/app/primitives'

/**
 * Digital Books: interactive text-based book for the selected career.
 * Chapter metadata loads first; opening a chapter loads its topics; opening a
 * topic lazily loads its full text, links, videos, tooling and sources.
 * Book search is supported within loaded topic content.
 */
export default function DigitalBooksPage(): React.JSX.Element {
  const [params, setParams] = useSearchParams()
  const book = useAsync(() => learningApi.bookChapters(), [])
  const [searchText, setSearchText] = useState('')

  if (book.loading) return <LoadingState />
  if (book.error) return careerGateOrError(book.error)

  const data = book.data!
  const openTopic = params.get('topic')
  const openChapter = params.get('chapter')

  const setParam = (key: string, value: string | null): void => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  return (
    <div>
      <PageHeader
        eyebrow={data.career.name}
        title="Digital Books"
        description={data.book.description}
      />

      {openTopic ? (
        <div>
          <button
            type="button"
            onClick={() => {
              setParam('topic', null)
              if (openChapter) setParam('chapter', openChapter)
            }}
            className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-primary"
          >
            <Icon name="arrow-left" className="h-4 w-4" />
            Back to chapters
          </button>
          <Suspense fallback={<LoadingState />}>
            <TopicReader
              topicPublicId={openTopic}
              onNavigate={(next) => (next ? setParam('topic', next) : setParam('topic', null))}
            />
          </Suspense>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <div className="relative w-full max-w-sm">
              <Icon
                name="search"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/35"
              />
              <input
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search chapter titles…"
                aria-label="Search the book"
                className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-3 text-sm text-primary placeholder:text-primary/40 hover:border-primary/25 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
          </div>

          <div className="mb-4">
            {data.continueReading ? (
              <button
                type="button"
                onClick={() => setParam('topic', data.continueReading)}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-all duration-150 hover:brightness-95"
              >
                <Icon name="folder" className="h-4 w-4" />
                Continue reading
              </button>
            ) : null}
          </div>

          <ul className="grid gap-3 md:grid-cols-2">
            {data.chapters
              .filter((ch) => !searchText || ch.title.toLowerCase().includes(searchText.toLowerCase()))
              .map((ch) => (
                <li key={ch.publicId}>
                  <button
                    type="button"
                    onClick={() => setParam('chapter', ch.publicId)}
                    className="card-lift h-full w-full rounded-lg border border-border bg-surface p-5 text-left hover:border-accent/50"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                      Chapter {String(ch.order).padStart(2, '0')} · {ch.stage}
                    </p>
                    <h2 className="mt-1 text-base font-semibold tracking-tight text-primary">{ch.title}</h2>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-primary/70">{ch.description}</p>
                    <p className="mt-3 text-xs tabular-nums text-primary/50">
                      {ch.progress.completed}/{ch.progress.total} topics completed
                    </p>
                  </button>
                </li>
              ))}
          </ul>

          {openChapter ? (
            <div className="mt-6">
              <ChapterTopics
                chapterPublicId={openChapter}
                onOpenTopic={(id) => setParam('topic', id)}
                onBack={() => setParam('chapter', null)}
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
