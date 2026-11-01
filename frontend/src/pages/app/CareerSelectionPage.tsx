import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { careersApi } from '../../api/learning'
import type { CareerCard } from '../../types/domain'
import { ROUTES } from '../../constants/routes'
import { useUiStore } from '../../store/uiStore'
import { useAsync } from '../../hooks/useAsync'
import { Button } from '../../components/ui/button/Button'
import { Icon } from '../../components/ui/icon/Icon'
import { EmptyState, ErrorState, LoadingState, PageHeader } from '../../components/app/primitives'

export default function CareerSelectionPage(): React.JSX.Element {
  const [searchInput, setSearchInput] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [selectingSlug, setSelectingSlug] = useState<string | null>(null)
  const pushToast = useUiStore((s) => s.pushToast)
  const navigate = useNavigate()

  const query = useMemo(() => ({ search: searchInput || undefined, category: categoryFilter ?? undefined }), [searchInput, categoryFilter])
  const state = useAsync(() => careersApi.list(query), [query.search, query.category])

  const handleSelect = async (career: CareerCard): Promise<void> => {
    setSelectingSlug(career.slug)
    try {
      await careersApi.select(career.slug)
      pushToast('success', `${career.name} selected — your learning path is ready.`)
      navigate(ROUTES.dashboard)
    } catch (error) {
      pushToast('danger', error instanceof Error ? error.message : 'Selection failed. Please try again.')
    } finally {
      setSelectingSlug(null)
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Step 1 of your journey"
        title="Choose your career"
        description="Pick one career to train for. Your selection drives your learning path, digital book, exams, assignments, company simulation and final certification."
      />

      <div className="mb-5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Icon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/35"
          />
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search careers, skills or interests…"
            aria-label="Career search"
            className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-3 text-sm text-primary placeholder:text-primary/40 hover:border-primary/25 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <p className="flex items-center gap-1.5 text-xs text-primary/45">
          <Icon name="search" className="h-3.5 w-3.5 text-accent/80" />
          Searches role names, skills and categories
        </p>
      </div>

      {state.loading ? (
        <LoadingState />
      ) : state.error ? (
        <ErrorState error={state.error} />
      ) : (
        <>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Career categories">
              <CategoryChip label="All" active={categoryFilter === null} onClick={() => setCategoryFilter(null)} />
              {(state.data?.categories ?? []).map((c) => (
                <CategoryChip key={c} label={c} active={categoryFilter === c} onClick={() => setCategoryFilter(c)} />
              ))}
            </div>
            {state.data ? (
              <p className="inline-flex items-center gap-1.5 text-xs tabular-nums text-primary/40">
                <Icon name="target" className="h-3.5 w-3.5 text-accent/70" />
                {state.data.total} guided {state.data.total === 1 ? 'path' : 'paths'}
              </p>
            ) : null}
          </div>

          {state.data && state.data.careers.length === 0 ? (
            <EmptyState icon="search" title="No careers match" description="Try a different search term or category." />
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {(state.data?.careers ?? []).map((career, index) => (
                <li key={career.publicId}>
                  <article className="card-lift flex h-full flex-col rounded-lg border border-border bg-surface p-5 hover:border-accent/50">
                    <div className="mb-3 flex items-baseline justify-between gap-2">
                      <span className="font-mono text-[11px] font-semibold tabular-nums text-primary/40">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[11px] font-medium text-primary/55">{career.category}</span>
                    </div>
                    <h2 className="text-base font-semibold tracking-tight text-primary">{career.name}</h2>
                    <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-primary/70">{career.description}</p>

                    <p className="mt-3 text-xs leading-relaxed text-primary/65">
                      {career.mainSkills.slice(0, 4).join(' · ')}
                    </p>

                    <dl className="mt-4 space-y-1 border-t border-border pt-3 text-xs text-primary/60">
                      <div className="flex justify-between gap-2">
                        <dt>Difficulty</dt>
                        <dd className="font-medium text-primary/80">{career.difficulty}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt>Curriculum</dt>
                        <dd className={`font-medium ${career.published ? 'text-success' : 'text-attention'}`}>
                          {career.published ? 'Published' : 'In publishing'}
                        </dd>
                      </div>
                    </dl>

                    <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-primary/50">
                      <Icon name="route" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/60" />
                      <span className="line-clamp-2">{career.pathSummary}</span>
                    </p>

                    <div className="mt-auto pt-4">
                      {career.published ? (
                        <Button
                          size="sm"
                          className="group w-full"
                          disabled={selectingSlug !== null}
                          onClick={() => void handleSelect(career)}
                        >
                          {selectingSlug === career.slug ? 'Selecting…' : 'Select this career'}
                          {selectingSlug === career.slug ? null : (
                            <Icon
                              name="arrow-right"
                              className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                            />
                          )}
                        </Button>
                      ) : (
                        <Link
                          to={ROUTES.dashboard}
                          className="block w-full rounded-md border border-border px-3 py-2 text-center text-sm text-primary/60"
                        >
                          Curriculum in progress
                        </Link>
                      )}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}

function CategoryChip({
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
      className={`border-b-2 px-0.5 pb-1 text-xs font-medium transition-colors ${
        active
          ? 'border-primary text-primary'
          : 'border-transparent text-primary/60 hover:border-accent/40 hover:text-primary'
      }`}
    >
      {label}
    </button>
  )
}
