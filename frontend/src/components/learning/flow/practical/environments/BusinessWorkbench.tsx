import { useState } from 'react'
import { cn } from '../../../../../utils/cn'
import { Icon } from '../../../../ui/icon/Icon'
import { EnvironmentNote, FieldLabel, WorkbenchShell, submitGuard } from './WorkbenchShell'
import type { PracticalWorkbenchProps } from './types'

const CHANNELS = ['Search', 'Social', 'Email', 'Content', 'Partnerships', 'Events', 'Referral']

interface Kpi {
  id: string
  name: string
  target: string
}

function buildSubmission(
  plan: { objective: string; audience: string; offer: string; budget: string },
  channels: string[],
  kpis: Kpi[],
  execution: string
): string {
  return [
    'CAMPAIGN PLAN',
    `Objective: ${plan.objective || '(not specified)'}`,
    `Audience: ${plan.audience || '(not specified)'}`,
    `Offer: ${plan.offer || '(not specified)'}`,
    `Budget: ${plan.budget || '(not specified)'}`,
    '',
    'CHANNEL MIX',
    ...(channels.length > 0 ? channels.map((channel) => `- ${channel}`) : ['(no channels selected)']),
    '',
    'KPIs',
    ...(kpis.length > 0
      ? kpis.map((kpi) => `- ${kpi.name || 'Metric'}: ${kpi.target || 'target pending'}`)
      : ['(no KPIs defined)']),
    '',
    'EXECUTION PLAN',
    execution.trim() || '(no execution plan supplied)'
  ].join('\n')
}

export function BusinessWorkbench(props: PracticalWorkbenchProps): React.JSX.Element {
  const [objective, setObjective] = useState('')
  const [audience, setAudience] = useState('')
  const [offer, setOffer] = useState('')
  const [budget, setBudget] = useState('')
  const [channels, setChannels] = useState<string[]>([])
  const [kpis, setKpis] = useState<Kpi[]>([{ id: 'kpi-0', name: '', target: '' }])
  const [execution, setExecution] = useState(props.restoreCode ?? props.starterCode)
  const [error, setError] = useState<string | null>(null)

  const toggleChannel = (channel: string): void => {
    setChannels((current) =>
      current.includes(channel) ? current.filter((item) => item !== channel) : [...current, channel]
    )
  }

  const submit = (): void => {
    const submission = buildSubmission({ objective, audience, offer, budget }, channels, kpis, execution)
    if (channels.length === 0) {
      setError('Select at least one channel for the campaign.')
      return
    }
    if (!submitGuard(submission, 80, setError)) return
    setError(null)
    props.onSubmit(submission)
  }

  return (
    <WorkbenchShell
      title={props.title}
      icon="trending-up"
      badge="Business environment"
      meta={`${channels.length} channels / ${kpis.length} KPIs`}
      error={error ?? props.error}
      submitting={props.submitting}
      submitLabel={props.submitLabel}
      disabled={execution.trim().length === 0}
      onSubmit={submit}
      onReset={() => {
        setObjective('')
        setAudience('')
        setOffer('')
        setBudget('')
        setChannels([])
        setKpis([{ id: 'kpi-0', name: '', target: '' }])
        setExecution(props.starterCode)
        setError(null)
        props.onReset()
      }}
      footerNote="Define the audience, channel mix and measurable outcomes before writing the execution plan."
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex min-h-0 flex-col">
          <div className="grid gap-3 border-b border-border p-4 sm:grid-cols-2">
            <TextField label="Objective" value={objective} onChange={setObjective} placeholder="e.g. 250 qualified signups in 8 weeks" />
            <TextField label="Audience" value={audience} onChange={setAudience} placeholder="Segment, pain point, buying trigger" />
            <TextField label="Offer" value={offer} onChange={setOffer} placeholder="Value proposition and incentive" />
            <TextField label="Budget" value={budget} onChange={setBudget} placeholder="Total and split by channel" />
          </div>

          <div className="flex items-center justify-between gap-2 border-b border-border bg-bg/40 px-4 py-2">
            <FieldLabel>Execution plan</FieldLabel>
            <span className="font-mono text-[11px] text-primary/40">plan.md</span>
          </div>
          <textarea
            value={execution}
            onChange={(event) => setExecution(event.target.value)}
            aria-label="Execution plan"
            className="min-h-[260px] flex-1 resize-none bg-surface px-4 py-3 text-sm leading-7 text-primary outline-none placeholder:text-primary/35"
            placeholder="Week-by-week execution: messaging, assets, owners, dependencies and measurement cadence."
          />
        </div>

        <aside className="flex min-h-0 flex-col border-t border-border xl:border-l xl:border-t-0">
          <div className="border-b border-border bg-bg/40 px-4 py-2">
            <FieldLabel>Channel mix</FieldLabel>
          </div>
          <div className="space-y-4 overflow-y-auto p-4">
            <div className="flex flex-wrap gap-1.5">
              {CHANNELS.map((channel) => {
                const selected = channels.includes(channel)
                return (
                  <button
                    key={channel}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleChannel(channel)}
                    className={cn(
                      'rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors',
                      selected
                        ? 'border-accent/40 bg-accent/[0.08] text-primary'
                        : 'border-border/70 bg-bg/20 text-primary/55 hover:border-accent/25 hover:text-primary'
                    )}
                  >
                    {channel}
                  </button>
                )
              })}
            </div>

            <div>
              <div className="flex items-center justify-between gap-2">
                <FieldLabel>KPIs</FieldLabel>
                <button
                  type="button"
                  onClick={() => setKpis((current) => [...current, { id: `kpi-${Date.now()}`, name: '', target: '' }])}
                  className="flex items-center gap-1 text-[11px] font-medium text-accent hover:underline"
                >
                  <Icon name="file-plus" className="h-3 w-3" />
                  Add
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {kpis.map((kpi) => (
                  <div key={kpi.id} className="rounded-lg border border-border/70 bg-bg/20 p-2">
                    <div className="flex items-center gap-1.5">
                      <input
                        value={kpi.name}
                        onChange={(event) =>
                          setKpis((current) =>
                            current.map((item) => (item.id === kpi.id ? { ...item, name: event.target.value } : item))
                          )
                        }
                        placeholder="Metric"
                        aria-label="KPI name"
                        className="min-w-0 flex-1 rounded border border-border/70 bg-surface px-2 py-1 text-xs text-primary outline-none focus:border-accent/50"
                      />
                      <input
                        value={kpi.target}
                        onChange={(event) =>
                          setKpis((current) =>
                            current.map((item) => (item.id === kpi.id ? { ...item, target: event.target.value } : item))
                          )
                        }
                        placeholder="Target"
                        aria-label="KPI target"
                        className="w-20 rounded border border-border/70 bg-surface px-2 py-1 text-xs text-primary outline-none focus:border-accent/50"
                      />
                      {kpis.length > 1 ? (
                        <button
                          type="button"
                          aria-label="Remove KPI"
                          onClick={() => setKpis((current) => current.filter((item) => item.id !== kpi.id))}
                          className="text-primary/35 hover:text-attention"
                        >
                          <Icon name="close" className="h-3.5 w-3.5" />
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <EnvironmentNote>
              Strong answers tie every channel and KPI back to the objective and name the measurement method.
            </EnvironmentNote>
          </div>
        </aside>
      </div>
    </WorkbenchShell>
  )
}

function TextField({
  label,
  value,
  onChange,
  placeholder
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}): React.JSX.Element {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-md border border-border bg-bg/20 px-2.5 py-1.5 text-xs text-primary outline-none placeholder:text-primary/35 focus:border-accent/50"
      />
    </label>
  )
}
