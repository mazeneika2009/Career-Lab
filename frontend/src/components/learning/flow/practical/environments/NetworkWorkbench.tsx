import { useState } from 'react'
import { cn } from '../../../../../utils/cn'
import { Icon } from '../../../../ui/icon/Icon'
import { EnvironmentNote, FieldLabel, WorkbenchShell, submitGuard } from './WorkbenchShell'
import type { PracticalWorkbenchProps } from './types'

const DEVICES = [
  { id: 'router', label: 'Router', icon: 'route' as const },
  { id: 'switch', label: 'Switch', icon: 'git-branch' as const },
  { id: 'firewall', label: 'Firewall', icon: 'shield' as const },
  { id: 'server', label: 'Server', icon: 'layers' as const },
  { id: 'client', label: 'Client', icon: 'users' as const },
  { id: 'cloud', label: 'Cloud', icon: 'compass' as const }
]

function buildSubmission(devices: string[], config: string, rationale: string): string {
  return [
    'NETWORK TOPOLOGY',
    ...(devices.length > 0 ? devices.map((device, index) => `${index + 1}. ${device}`) : ['(not described)']),
    '',
    'DEVICE CONFIGURATION',
    config.trim() || '(no configuration supplied)',
    '',
    'DESIGN RATIONALE',
    rationale.trim() || '(no rationale supplied)'
  ].join('\n')
}

export function NetworkWorkbench(props: PracticalWorkbenchProps): React.JSX.Element {
  const [config, setConfig] = useState(props.restoreCode ?? props.starterCode)
  const [rationale, setRationale] = useState('')
  const [devices, setDevices] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const toggleDevice = (label: string): void => {
    setDevices((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label]
    )
  }

  const submit = (): void => {
    const submission = buildSubmission(devices, config, rationale)
    if (!submitGuard(submission, 60, setError)) return
    setError(null)
    props.onSubmit(submission)
  }

  return (
    <WorkbenchShell
      title={props.title}
      icon="route"
      badge="Network environment"
      meta={`${devices.length} devices / ${config.split('\n').length} config lines`}
      error={error ?? props.error}
      submitting={props.submitting}
      submitLabel={props.submitLabel}
      disabled={config.trim().length === 0}
      onSubmit={submit}
      onReset={() => {
        setConfig(props.starterCode)
        setRationale('')
        setDevices([])
        setError(null)
        props.onReset()
      }}
      footerNote="Describe the topology, paste device configuration, then justify your design decisions."
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="flex min-h-0 flex-col border-b border-border xl:border-b-0 xl:border-r">
          <div className="border-b border-border bg-bg/40 px-4 py-2">
            <FieldLabel>Topology builder</FieldLabel>
          </div>
          <div className="space-y-3 overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-2">
              {DEVICES.map((device) => {
                const selected = devices.includes(device.label)
                return (
                  <button
                    key={device.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleDevice(device.label)}
                    className={cn(
                      'flex items-center gap-2 rounded-lg border px-2.5 py-2 text-xs font-medium transition-colors',
                      selected
                        ? 'border-accent/40 bg-accent/[0.07] text-primary'
                        : 'border-border/70 bg-bg/20 text-primary/60 hover:border-accent/25 hover:text-primary'
                    )}
                  >
                    <Icon name={device.icon} className="h-3.5 w-3.5" />
                    {device.label}
                  </button>
                )
              })}
            </div>

            <div>
              <FieldLabel>Selected stack</FieldLabel>
              {devices.length > 0 ? (
                <ol className="mt-2 space-y-1.5">
                  {devices.map((device, index) => (
                    <li key={device} className="flex items-center gap-2 font-mono text-xs text-primary/75">
                      <span className="text-primary/35">{String(index + 1).padStart(2, '0')}</span>
                      {device}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-1.5 text-xs text-primary/50">Pick the devices this solution needs.</p>
              )}
            </div>

            <EnvironmentNote>
              State IP ranges, VLANs, and security zones explicitly. The reviewer checks addressing and
              access rules.
            </EnvironmentNote>
          </div>
        </aside>

        <div className="flex min-h-0 flex-col">
          <div className="flex items-center justify-between gap-2 border-b border-border bg-bg/40 px-4 py-2">
            <FieldLabel>Device configuration</FieldLabel>
            <span className="font-mono text-[11px] text-primary/40">devices.conf</span>
          </div>
          <textarea
            value={config}
            onChange={(event) => setConfig(event.target.value)}
            spellCheck={false}
            aria-label="Network device configuration"
            className="min-h-[260px] flex-1 resize-none bg-[#0f1720] px-4 py-3 font-mono text-[13px] leading-6 text-[#d6e2dc] outline-none placeholder:text-[#6b7f76]"
            placeholder="interface GigabitEthernet0/1&#10; ip address 10.0.0.1 255.255.255.0"
          />
          <div className="border-t border-border bg-bg/30 px-4 py-3">
            <FieldLabel>Design rationale</FieldLabel>
            <textarea
              value={rationale}
              onChange={(event) => setRationale(event.target.value)}
              aria-label="Design rationale"
              rows={3}
              className="mt-2 w-full resize-none rounded-md border border-border bg-surface px-3 py-2 text-sm leading-relaxed text-primary placeholder:text-primary/35 focus:border-accent/50 focus:outline-none"
              placeholder="Why this topology, addressing scheme and security posture?"
            />
          </div>
        </div>
      </div>
    </WorkbenchShell>
  )
}
