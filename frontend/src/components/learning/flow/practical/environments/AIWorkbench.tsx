import { useState } from 'react'
import { cn } from '../../../../../utils/cn'
import { Button } from '../../../../ui/button/Button'
import { Icon } from '../../../../ui/icon/Icon'
import { EnvironmentNote, FieldLabel, WorkbenchShell, submitGuard } from './WorkbenchShell'
import { runPythonNotebook } from './runPythonNotebook'
import type { PracticalWorkbenchProps } from './types'

type NotebookTab = 'code' | 'notes'

const PIPELINE = ['Data preparation', 'Model choice', 'Training setup', 'Evaluation', 'Deployment']

function buildSubmission(code: string, notes: string, config: { dataset: string; model: string; metric: string }): string {
  return [
    'MODEL PIPELINE',
    ...PIPELINE.map((stage, index) => `${index + 1}. ${stage}`),
    '',
    'EXPERIMENT CONFIG',
    `Dataset: ${config.dataset || '(not specified)'}`,
    `Model: ${config.model || '(not specified)'}`,
    `Primary metric: ${config.metric || '(not specified)'}`,
    '',
    'IMPLEMENTATION',
    code.trim() || '(no code supplied)',
    '',
    'ANALYSIS NOTES',
    notes.trim() || '(no notes supplied)'
  ].join('\n')
}

export function AIWorkbench(props: PracticalWorkbenchProps): React.JSX.Element {
  const [code, setCode] = useState(props.restoreCode ?? props.starterCode)
  const [notes, setNotes] = useState('')
  const [tab, setTab] = useState<NotebookTab>('code')
  const [dataset, setDataset] = useState('')
  const [model, setModel] = useState('')
  const [metric, setMetric] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [output, setOutput] = useState<string[]>([])
  const [running, setRunning] = useState(false)

  const submit = (): void => {
    const submission = buildSubmission(code, notes, { dataset, model, metric })
    if (!submitGuard(submission, 60, setError)) return
    setError(null)
    props.onSubmit(submission)
  }

  const run = async (): Promise<void> => {
    if (running || props.submitting || !code.trim()) return
    setRunning(true)
    setError(null)
    setOutput([])
    try {
      const result = await runPythonNotebook(code)
      setOutput(result.output)
      if (!result.ok) setError(result.error)
      else if (result.output.length === 0) setOutput(['Notebook executed successfully with no output.'])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Python execution failed.')
    } finally {
      setRunning(false)
    }
  }

  return (
    <WorkbenchShell
      title={props.title}
      icon="zap"
      badge="AI / ML environment"
      meta={`${props.languageLabel} / ${code.split('\n').length} lines`}
      error={error ?? props.error}
      submitting={props.submitting || running}
      submitLabel={props.submitLabel}
      disabled={code.trim().length === 0}
      onSubmit={submit}
      onReset={() => {
        setCode(props.starterCode)
        setNotes('')
        setDataset('')
        setModel('')
        setMetric('')
        setOutput([])
        setError(null)
        props.onReset()
      }}
      toolbar={
        <Button variant="secondary" size="sm" onClick={() => void run()} disabled={props.submitting || running || !code.trim()}>
          <Icon name="play" className="h-3.5 w-3.5" />
          {running ? 'Starting Python…' : 'Run notebook'}
        </Button>
      }
      footerNote="Describe the pipeline, implementation and how you evaluated the result."
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="flex min-h-0 flex-col">
          <div className="flex items-center justify-between gap-2 border-b border-border bg-bg/40 px-3 py-2">
            <div className="flex gap-1">
              {(['code', 'notes'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-selected={tab === item}
                  onClick={() => setTab(item)}
                  className={cn(
                    'rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors',
                    tab === item ? 'bg-surface text-primary shadow-sm' : 'text-primary/50 hover:text-primary'
                  )}
                >
                  {item === 'code' ? 'Notebook' : 'Analysis'}
                </button>
              ))}
            </div>
            <span className="font-mono text-[11px] text-primary/40">
              {tab === 'code' ? 'solution.py' : 'analysis.md'}
            </span>
          </div>

          {tab === 'code' ? (
            <>
              <textarea
                value={code}
                onChange={(event) => setCode(event.target.value)}
                spellCheck={false}
                aria-label="Python notebook"
                className="min-h-[340px] flex-1 resize-none bg-[#0f1720] px-4 py-3 font-mono text-[13px] leading-6 text-[#d6e2dc] outline-none placeholder:text-[#6b7f76]"
                placeholder="# Load data, build the pipeline, train and evaluate"
              />
              <section className="border-t border-border bg-bg/30 px-4 py-3" aria-live="polite">
                <div className="flex items-center justify-between gap-2">
                  <FieldLabel>Notebook output</FieldLabel>
                  <span className="text-[11px] text-primary/40">
                    {running ? 'Running in local Python runtime…' : 'Python standard library'}
                  </span>
                </div>
                <pre
                  className={cn(
                    'mt-2 max-h-40 min-h-10 overflow-auto whitespace-pre-wrap rounded-md bg-[#0f1720] px-3 py-2 font-mono text-xs leading-5',
                    error ? 'text-attention' : 'text-[#d6e2dc]'
                  )}
                >
                  {output.join('\n') || (running ? 'Loading the Python runtime…' : 'Run the notebook to inspect output.')}
                </pre>
              </section>
            </>
          ) : (
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              aria-label="Analysis notes"
              className="min-h-[380px] flex-1 resize-none bg-surface px-4 py-3 text-sm leading-7 text-primary outline-none placeholder:text-primary/35"
              placeholder="Explain preprocessing, model choice, metrics, error analysis and next steps."
            />
          )}
        </div>

        <aside className="flex min-h-0 flex-col border-t border-border xl:border-l xl:border-t-0">
          <div className="border-b border-border bg-bg/40 px-4 py-2">
            <FieldLabel>Experiment config</FieldLabel>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            <ConfigField label="Dataset" value={dataset} onChange={setDataset} placeholder="e.g. 12k labelled tickets" />
            <ConfigField label="Model" value={model} onChange={setModel} placeholder="e.g. fine-tuned DistilBERT" />
            <ConfigField label="Primary metric" value={metric} onChange={setMetric} placeholder="e.g. macro F1 >= 0.82" />

            <div>
              <FieldLabel>Pipeline checklist</FieldLabel>
              <ol className="mt-2 space-y-1.5">
                {PIPELINE.map((stage, index) => (
                  <li key={stage} className="flex items-center gap-2 text-xs text-primary/70">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/[0.06] font-mono text-[9px] text-primary/50">
                      {index + 1}
                    </span>
                    {stage}
                  </li>
                ))}
              </ol>
            </div>

            <EnvironmentNote>
              Include concrete metrics and failure cases. Reviewers grade methodology as heavily as code.
            </EnvironmentNote>
          </div>
        </aside>
      </div>
    </WorkbenchShell>
  )
}

function ConfigField({
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
