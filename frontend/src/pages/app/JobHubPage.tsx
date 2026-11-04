import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { jobHubApi } from '../../api/learning'
import { ROUTES } from '../../constants/routes'
import { useAsync } from '../../hooks/useAsync'
import { careerGateOrError } from './LearningPathPage'
import { useUiStore } from '../../store/uiStore'
import type { JobHubQuery, JobPostingView } from '../../types/domain'
import { cn } from '../../utils/cn'
import { Button } from '../../components/ui/button/Button'
import { Icon } from '../../components/ui/icon/Icon'
import {
  EmptyState,
  LoadingState,
  PageHeader,
  Panel,
  StatusText
} from '../../components/app/primitives'

type JobView = 'all' | 'saved' | 'applied'

const APPLICATION_LABELS: Record<string, string> = {
  applied: 'Applied',
  interviewing: 'Interviewing',
  offer: 'Offer',
  rejected: 'Closed',
  withdrawn: 'Withdrawn'
}

function postedAgo(value: string): string {
  const days = Math.floor((Date.now() - new Date(value).getTime()) / 86_400_000)
  if (days <= 0) return 'Posted today'
  if (days === 1) return 'Posted yesterday'
  if (days < 30) return `Posted ${days}d ago`
  const weeks = Math.floor(days / 7)
  return `Posted ${weeks}w ago`
}

function seniorityLabel(experienceLevel: string): string {
  const level = experienceLevel.trim().toLowerCase()
  if (level === 'internship' || level === 'entry level' || level === 'junior') return 'Junior'
  if (level === 'associate' || level === 'mid level' || level === 'mid') return 'Mid'
  if (level === 'senior level' || level === 'lead' || level === 'senior') return 'Senior'
  return experienceLevel
}

export default function JobHubPage(): React.JSX.Element {
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [employmentType, setEmploymentType] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('')
  const [workMode, setWorkMode] = useState('')
  const [view, setView] = useState<JobView>('all')
  const [savingId, setSavingId] = useState<string | null>(null)
  const pushToast = useUiStore((s) => s.pushToast)

  useEffect(() => {
    const timer = window.setTimeout(() => setSearch(searchInput.trim()), 300)
    return () => window.clearTimeout(timer)
  }, [searchInput])

  const query = useMemo<JobHubQuery>(
    () => ({
      search: search || undefined,
      location: location || undefined,
      employmentType: employmentType || undefined,
      experienceLevel: experienceLevel || undefined,
      workMode: workMode || undefined
    }),
    [search, location, employmentType, experienceLevel, workMode]
  )

  const state = useAsync(
    () => jobHubApi.list(query),
    [query.search, query.location, query.employmentType, query.experienceLevel, query.workMode]
  )

  if (!state.data && state.loading) return <LoadingState />
  if (state.error) return careerGateOrError(state.error)

  const data = state.data!
  if (data.locked) return <LockedJobHub careerName={data.career.name} />

  const hasFilters = Boolean(search || location || employmentType || experienceLevel || workMode)
  const visibleJobs = data.jobs.filter((job) => {
    if (view === 'saved') return job.saved
    if (view === 'applied') return job.applicationStatus !== null
    return true
  })

  const resetFilters = (): void => {
    setSearchInput('')
    setSearch('')
    setLocation('')
    setEmploymentType('')
    setExperienceLevel('')
    setWorkMode('')
  }

  const toggleSaved = async (job: JobPostingView): Promise<void> => {
    setSavingId(job.publicId)
    try {
      if (job.saved) {
        await jobHubApi.unsave(job.publicId)
        pushToast('success', 'Removed from saved jobs.')
      } else {
        await jobHubApi.save(job.publicId)
        pushToast('success', 'Job saved to your shortlist.')
      }
      state.reload()
    } catch (error) {
      pushToast('danger', error instanceof Error ? error.message : 'Could not update saved jobs.')
    } finally {
      setSavingId(null)
    }
  }

  const trackApply = (job: JobPostingView): void => {
    if (job.applicationStatus) return
    void jobHubApi
      .apply(job.publicId)
      .then(() => state.reload())
      .catch(() => undefined)
  }

  const tabs: Array<{ key: JobView; label: string; count: number }> = [
    { key: 'all', label: 'All roles', count: data.total },
    { key: 'saved', label: 'Saved', count: data.savedCount },
    { key: 'applied', label: 'Applied', count: data.appliedCount }
  ]

  return (
    <div>
      <PageHeader
        eyebrow={`Career Bridge · ${data.career.name}`}
        title="Job Opportunities"
        description="Roles matched to the skills in your active career. Listings open the latest public search on each job board, so you always see current openings."
      />

      <section className="mb-5 rounded-lg border border-border bg-surface p-3 shadow-sm sm:p-4">
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,0.7fr))_auto]">
          <div className="relative sm:col-span-2 xl:col-span-1">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/35"
            />
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search roles or skills…"
              aria-label="Search jobs"
              className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-3 text-sm text-primary placeholder:text-primary/40 hover:border-primary/25 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <FilterSelect
            label="Location"
            value={location}
            onChange={setLocation}
            options={data.filters.locations}
            allLabel="All locations"
          />
          <FilterSelect
            label="Work mode"
            value={workMode}
            onChange={setWorkMode}
            options={data.filters.workModes}
            allLabel="All modes"
          />
          <FilterSelect
            label="Employment"
            value={employmentType}
            onChange={setEmploymentType}
            options={data.filters.employmentTypes}
            allLabel="All types"
          />
          <FilterSelect
            label="Experience"
            value={experienceLevel}
            onChange={setExperienceLevel}
            options={data.filters.experienceLevels}
            allLabel="All levels"
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={resetFilters}
            disabled={!hasFilters}
            className="self-stretch"
          >
            Reset
          </Button>
        </div>
      </section>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Job views">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={view === tab.key}
              onClick={() => setView(tab.key)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors duration-150',
                view === tab.key
                  ? 'border-primary bg-primary text-surface'
                  : 'border-border bg-surface text-primary/60 hover:border-primary/30 hover:text-primary'
              )}
            >
              {tab.label}
              <span
                className={cn(
                  'rounded px-1 text-[10px] font-semibold tabular-nums',
                  view === tab.key ? 'bg-surface/15 text-surface/80' : 'bg-primary/[0.055] text-primary/45'
                )}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
        <p className="text-xs tabular-nums text-primary/45">
          {visibleJobs.length} {visibleJobs.length === 1 ? 'role' : 'roles'}
          {search ? ` for “${search}”` : ''}
        </p>
      </div>

      {state.loading ? (
        <p className="mb-3 text-xs text-primary/45" role="status">
          Refreshing matches…
        </p>
      ) : null}

      {visibleJobs.length === 0 ? (
        <EmptyState
          icon={view === 'saved' ? 'bookmark' : 'search'}
          title={
            view === 'saved'
              ? 'No saved jobs yet'
              : view === 'applied'
                ? 'No tracked applications yet'
                : 'No roles match those filters'
          }
          description={
            view === 'saved'
              ? 'Bookmark a role from the All roles tab to build your shortlist.'
              : view === 'applied'
                ? 'When you open a role and apply on the source platform, it will appear here for tracking.'
                : 'Try a broader search or reset one of the filters.'
          }
          action={
            hasFilters ? (
              <Button variant="secondary" size="sm" onClick={resetFilters}>
                Clear filters
              </Button>
            ) : undefined
          }
        />
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2">
          {visibleJobs.map((job) => (
            <li key={job.publicId}>
              <article className="card-lift flex h-full flex-col rounded-lg border border-border bg-surface p-5 hover:border-accent/45">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/45">
                      {job.sourcePlatform}
                    </p>
                    <h2 className="mt-1 text-balance text-base font-semibold leading-snug tracking-tight text-primary">
                      {job.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => void toggleSaved(job)}
                    disabled={savingId === job.publicId}
                    aria-pressed={job.saved}
                    aria-label={job.saved ? 'Remove from saved jobs' : 'Save job'}
                    title={job.saved ? 'Remove from saved jobs' : 'Save job'}
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors duration-150',
                      job.saved
                        ? 'border-accent/35 bg-accent/[0.07] text-accent'
                        : 'border-border text-primary/40 hover:border-accent/35 hover:text-accent'
                    )}
                  >
                    <Icon name="bookmark" className={cn('h-4 w-4', job.saved && 'fill-current')} />
                  </button>
                </div>

                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-primary/60">
                  <li className="inline-flex items-center gap-1">
                    <Icon name="map-pin" className="h-3.5 w-3.5 text-accent/70" />
                    {job.location}
                  </li>
                  <li className="inline-flex items-center gap-1">
                    <Icon name="briefcase" className="h-3.5 w-3.5 text-accent/70" />
                    {job.workMode}
                  </li>
                  <li className="inline-flex items-center gap-1">
                    <Icon name="clock" className="h-3.5 w-3.5 text-accent/70" />
                    {job.employmentType}
                  </li>
                  <li
                    title={`Experience: ${job.experienceLevel}`}
                    className="inline-flex items-center rounded-full border border-accent/20 bg-accent/[0.06] px-2 py-0.5 text-[10px] font-semibold text-primary/70"
                  >
                    {seniorityLabel(job.experienceLevel)}
                  </li>
                </ul>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-primary/70">
                  {job.description}
                </p>

                <div className="mt-auto pt-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-medium text-primary/70">{job.salaryRange ?? 'Salary not listed'}</span>
                    <span className="text-primary/40">
                      {postedAgo(job.postedAt)}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                    <span className="text-[11px] text-primary/50">
                      {job.applicationStatus
                        ? APPLICATION_LABELS[job.applicationStatus] ?? job.applicationStatus
                        : 'Track this application'}
                    </span>
                    <a
                      href={job.externalUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={() => trackApply(job)}
                      className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-medium text-surface transition-colors hover:bg-primary/90"
                    >
                      {job.applicationStatus ? 'View listing' : 'Apply now'}
                      <Icon name="arrow-right" className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-primary/45">
        Opportunities are curated from public job-board searches for your active career. Always confirm the
        role, salary and requirements on {data.jobs[0]?.sourcePlatform ?? 'the source platform'} before
        applying.
      </p>
    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  allLabel
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
  allLabel: string
}): React.JSX.Element {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-md border border-border bg-surface px-2.5 py-2 text-xs text-primary/75 hover:border-primary/25 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20"
    >
      <option value="">{allLabel}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

function LockedJobHub({ careerName }: { careerName: string }): React.JSX.Element {
  return (
    <div>
      <PageHeader
        eyebrow="Career Bridge"
        title="Job Opportunities"
        description="Turn your completed training into a real job search. The Career Bridge opens automatically once your certificate has been issued."
      />
      <Panel>
        <div className="mx-auto max-w-xl py-6 text-center">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg/40 text-primary/45">
            <Icon name="lock" className="h-5 w-5" />
          </span>
          <h2 className="mt-4 font-display text-lg font-semibold tracking-tight text-primary">
            Certificate required
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-primary/60">
            Your {careerName} job matches unlock when every certificate requirement is verified. Open the
            certificate page to see exactly what remains.
          </p>
          <Link
            to={ROUTES.certificate}
            className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface transition-colors hover:bg-primary/90"
          >
            View certificate requirements
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
          <div className="mt-5 flex items-center justify-center gap-2">
            <StatusText tone="locked" />
            <span className="text-xs text-primary/40">Locked until your certificate is issued</span>
          </div>
        </div>
      </Panel>
    </div>
  )
}
