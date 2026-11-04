import { useState } from 'react'
import { cn } from '../../../../../utils/cn'
import { Button } from '../../../../ui/button/Button'
import { Icon } from '../../../../ui/icon/Icon'
import { EnvironmentNote, FieldLabel, WorkbenchShell, submitGuard } from './WorkbenchShell'
import type { PracticalWorkbenchProps } from './types'

interface DesignBlock {
  id: string
  role: string
  heading: string
  notes: string
}

const BLOCKS = [
  { role: 'Hero', heading: 'Headline, subhead and primary call to action' },
  { role: 'Navigation', heading: 'Logo, primary links, account actions' },
  { role: 'Feature grid', heading: 'Three to six benefit cards with icons' },
  { role: 'Social proof', heading: 'Logos, testimonials or usage metrics' },
  { role: 'Pricing', heading: 'Plan comparison with a recommended tier' },
  { role: 'Form', heading: 'Fields, validation and submit state' },
  { role: 'Footer', heading: 'Secondary links, legal and contact' },
  { role: 'Empty state', heading: 'Illustration, explanation and recovery action' }
]

const PALETTES = [
  { id: 'editorial', label: 'Editorial', swatches: ['#14201b', '#f5efe4', '#b5651d'] },
  { id: 'clinical', label: 'Clinical', swatches: ['#0f2a43', '#f4f8fb', '#2f80ed'] },
  { id: 'warm', label: 'Warm', swatches: ['#3b2416', '#fff7ec', '#d9822b'] },
  { id: 'mono', label: 'Mono', swatches: ['#111111', '#f7f7f7', '#666666'] }
]

function buildSubmission(blocks: DesignBlock[], palette: string, typography: string, rationale: string): string {
  return [
    'DESIGN SPECIFICATION',
    `Palette: ${palette}`,
    `Typography: ${typography}`,
    '',
    'SCREEN STRUCTURE',
    ...blocks.map(
      (block, index) => `${index + 1}. ${block.role} - ${block.heading}${block.notes ? ` (${block.notes})` : ''}`
    ),
    '',
    'DESIGN RATIONALE',
    rationale.trim() || '(no rationale supplied)'
  ].join('\n')
}

export function DesignWorkbench(props: PracticalWorkbenchProps): React.JSX.Element {
  const [blocks, setBlocks] = useState<DesignBlock[]>([])
  const [palette, setPalette] = useState(PALETTES[0]!.id)
  const [typography, setTypography] = useState('Display serif headings / neutral sans body')
  const [rationale, setRationale] = useState('')
  const [error, setError] = useState<string | null>(null)

  const addBlock = (role: string, heading: string): void => {
    setBlocks((current) => [
      ...current,
      { id: `${role}-${current.length}-${Date.now()}`, role, heading, notes: '' }
    ])
  }

  const updateBlock = (id: string, patch: Partial<DesignBlock>): void => {
    setBlocks((current) => current.map((block) => (block.id === id ? { ...block, ...patch } : block)))
  }

  const move = (index: number, direction: -1 | 1): void => {
    setBlocks((current) => {
      const next = [...current]
      const target = index + direction
      if (target < 0 || target >= next.length) return current
      const [item] = next.splice(index, 1)
      if (item) next.splice(target, 0, item)
      return next
    })
  }

  const submit = (): void => {
    const submission = buildSubmission(blocks, palette, typography, rationale)
    if (blocks.length < 2) {
      setError('Add at least two screen sections to describe the design.')
      return
    }
    if (!submitGuard(submission, 60, setError)) return
    setError(null)
    props.onSubmit(submission)
  }

  return (
    <WorkbenchShell
      title={props.title}
      icon="layers"
      badge="Design environment"
      meta={`${blocks.length} sections / ${palette}`}
      error={error ?? props.error}
      submitting={props.submitting}
      submitLabel={props.submitLabel}
      disabled={blocks.length === 0}
      onSubmit={submit}
      onReset={() => {
        setBlocks([])
        setPalette(PALETTES[0]!.id)
        setTypography('Display serif headings / neutral sans body')
        setRationale('')
        setError(null)
        props.onReset()
      }}
      footerNote="Compose the screen, choose a visual system, then explain your decisions."
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="flex min-h-0 flex-col border-b border-border xl:border-b-0 xl:border-r">
          <div className="border-b border-border bg-bg/40 px-4 py-2">
            <FieldLabel>Component palette</FieldLabel>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto p-4">
            {BLOCKS.map((block) => (
              <button
                key={block.role}
                type="button"
                onClick={() => addBlock(block.role, block.heading)}
                className="flex w-full items-start gap-2 rounded-lg border border-border/70 bg-bg/20 px-3 py-2 text-left transition-colors hover:border-accent/30 hover:bg-accent/[0.03]"
              >
                <Icon name="file-plus" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/70" />
                <span>
                  <span className="block text-xs font-semibold text-primary/80">{block.role}</span>
                  <span className="mt-0.5 block text-[11px] leading-relaxed text-primary/50">{block.heading}</span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <div className="flex min-h-0 flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="rounded-xl border border-dashed border-border bg-bg/20 p-3">
              <div className="mb-3 flex items-center justify-between gap-2">
                <FieldLabel>Artboard</FieldLabel>
                <span className="text-[11px] text-primary/40">Desktop 1440</span>
              </div>
              {blocks.length === 0 ? (
                <div className="flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-lg border border-border/60 bg-surface px-4 py-8 text-center">
                  <Icon name="layers" className="h-6 w-6 text-primary/25" />
                  <p className="text-sm text-primary/55">Add sections from the palette to build the screen.</p>
                </div>
              ) : (
                <ol className="space-y-2">
                  {blocks.map((block, index) => (
                    <li key={block.id} className="rounded-lg border border-border bg-surface p-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                          {block.role}
                        </span>
                        <div className="flex items-center gap-1">
                          <IconButton icon="arrow-left" label="Move up" disabled={index === 0} onClick={() => move(index, -1)} />
                          <IconButton
                            icon="arrow-right"
                            label="Move down"
                            disabled={index === blocks.length - 1}
                            onClick={() => move(index, 1)}
                          />
                          <IconButton
                            icon="trash"
                            label="Remove"
                            onClick={() => setBlocks((current) => current.filter((item) => item.id !== block.id))}
                          />
                        </div>
                      </div>
                      <input
                        value={block.heading}
                        onChange={(event) => updateBlock(block.id, { heading: event.target.value })}
                        aria-label={`${block.role} heading`}
                        className="mt-2 w-full rounded-md border border-border bg-bg/30 px-2.5 py-1.5 text-sm text-primary outline-none focus:border-accent/50"
                      />
                      <input
                        value={block.notes}
                        onChange={(event) => updateBlock(block.id, { notes: event.target.value })}
                        aria-label={`${block.role} notes`}
                        placeholder="Interaction, content or accessibility notes"
                        className="mt-1.5 w-full rounded-md border border-border bg-bg/20 px-2.5 py-1.5 text-xs text-primary/80 outline-none placeholder:text-primary/35 focus:border-accent/50"
                      />
                    </li>
                  ))}
                </ol>
              )}
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div>
                <FieldLabel>Visual system</FieldLabel>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {PALETTES.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={palette === option.id}
                      onClick={() => setPalette(option.id)}
                      className={cn(
                        'flex items-center gap-2 rounded-lg border px-2.5 py-2 text-xs transition-colors',
                        palette === option.id
                          ? 'border-accent/40 bg-accent/[0.06]'
                          : 'border-border/70 bg-bg/20 hover:border-accent/25'
                      )}
                    >
                      <span className="flex overflow-hidden rounded-sm border border-black/10">
                        {option.swatches.map((swatch) => (
                          <span key={swatch} style={{ backgroundColor: swatch }} className="h-5 w-3" />
                        ))}
                      </span>
                      <span className="font-medium text-primary/75">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Typography</FieldLabel>
                <input
                  value={typography}
                  onChange={(event) => setTypography(event.target.value)}
                  aria-label="Typography system"
                  className="mt-2 w-full rounded-md border border-border bg-bg/20 px-2.5 py-2 text-sm text-primary outline-none focus:border-accent/50"
                />
              </div>
            </div>

            <div className="mt-4">
              <FieldLabel>Design rationale</FieldLabel>
              <textarea
                value={rationale}
                onChange={(event) => setRationale(event.target.value)}
                aria-label="Design rationale"
                rows={3}
                className="mt-2 w-full resize-none rounded-md border border-border bg-bg/20 px-3 py-2 text-sm leading-relaxed text-primary placeholder:text-primary/35 focus:border-accent/50 focus:outline-none"
                placeholder="How does the layout and visual system serve the brief and audience?"
              />
            </div>

            <div className="mt-3">
              <EnvironmentNote>
                Reviewers look for hierarchy, accessible contrast, responsive intent and a clear call to action.
              </EnvironmentNote>
            </div>
          </div>
        </div>
      </div>
    </WorkbenchShell>
  )
}

function IconButton({
  icon,
  label,
  disabled,
  onClick
}: {
  icon: 'arrow-left' | 'arrow-right' | 'trash'
  label: string
  disabled?: boolean
  onClick: () => void
}): React.JSX.Element {
  return (
    <Button variant="ghost" size="sm" aria-label={label} disabled={disabled} onClick={onClick} className="h-7 w-7 px-0">
      <Icon name={icon} className="h-3.5 w-3.5" />
    </Button>
  )
}
