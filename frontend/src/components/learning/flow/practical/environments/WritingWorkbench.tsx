import { useMemo, useState } from 'react'
import { cn } from '../../../../../utils/cn'
import { Icon } from '../../../../ui/icon/Icon'
import { EnvironmentNote, FieldLabel, WorkbenchShell, submitGuard } from './WorkbenchShell'
import type { PracticalWorkbenchProps } from './types'

type WritingTab = 'write' | 'preview'

interface OutlineItem {
  level: number
  text: string
}

function outlineOf(markdown: string): OutlineItem[] {
  return markdown
    .split('\n')
    .map((line) => /^(#{1,3})\s+(.+)$/.exec(line.trim()))
    .filter((match): match is RegExpExecArray => match !== null)
    .map((match) => ({ level: match[1]!.length, text: match[2]! }))
    .slice(0, 12)
}

function plainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function inline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key} className="font-semibold text-primary">{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={key} className="rounded bg-primary/[0.06] px-1 py-0.5 font-mono text-[0.9em]">{part.slice(1, -1)}</code>
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
    if (link) {
      return <span key={key} className="text-info underline underline-offset-2">{link[1]}</span>
    }
    return <span key={key}>{part}</span>
  })
}

function MarkdownPreview({ markdown }: { markdown: string }): React.JSX.Element {
  const blocks = markdown.split(/\n{2,}/)
  return (
    <div className="space-y-3">
      {blocks.map((block, blockIndex) => {
        const trimmed = block.trim()
        if (!trimmed) return null
        const heading = /^(#{1,3})\s+(.+)$/.exec(trimmed)
        if (heading) {
          const level = heading[1]!.length
          const text = heading[2]!
          if (level === 1) {
            return <h1 key={blockIndex} className="font-display text-2xl font-bold tracking-tight text-primary">{inline(text, `h${blockIndex}`)}</h1>
          }
          if (level === 2) {
            return <h2 key={blockIndex} className="mt-5 text-lg font-semibold text-primary">{inline(text, `h${blockIndex}`)}</h2>
          }
          return <h3 key={blockIndex} className="mt-4 text-sm font-semibold uppercase tracking-wide text-primary/70">{inline(text, `h${blockIndex}`)}</h3>
        }
        if (/^[-*]\s+/m.test(trimmed)) {
          const items = trimmed.split('\n').filter((line) => /^[-*]\s+/.test(line.trim()))
          return (
            <ul key={blockIndex} className="space-y-1.5 pl-4">
              {items.map((item, index) => (
                <li key={index} className="list-disc text-sm leading-7 text-primary/85">
                  {inline(item.replace(/^[-*]\s+/, ''), `li${blockIndex}-${index}`)}
                </li>
              ))}
            </ul>
          )
        }
        if (/^\d+\.\s+/m.test(trimmed)) {
          const items = trimmed.split('\n').filter((line) => /^\d+\.\s+/.test(line.trim()))
          return (
            <ol key={blockIndex} className="space-y-1.5 pl-4">
              {items.map((item, index) => (
                <li key={index} className="list-decimal text-sm leading-7 text-primary/85">
                  {inline(item.replace(/^\d+\.\s+/, ''), `ol${blockIndex}-${index}`)}
                </li>
              ))}
            </ol>
          )
        }
        return (
          <p key={blockIndex} className="text-sm leading-7 text-primary/85">
            {inline(trimmed, `p${blockIndex}`)}
          </p>
        )
      })}
    </div>
  )
}

export function WritingWorkbench(props: PracticalWorkbenchProps): React.JSX.Element {
  const [markdown, setMarkdown] = useState(props.restoreCode ?? props.starterCode)
  const [tab, setTab] = useState<WritingTab>('write')
  const [audience, setAudience] = useState('')
  const [tone, setTone] = useState('Clear and practical')
  const [error, setError] = useState<string | null>(null)
  const outline = useMemo(() => outlineOf(markdown), [markdown])
  const words = useMemo(() => plainText(markdown).split(/\s+/).filter(Boolean).length, [markdown])

  const submit = (): void => {
    const submission = [
      `Audience: ${audience || 'general'}`,
      `Tone: ${tone || 'clear'}`,
      '',
      markdown.trim()
    ].join('\n')
    if (!submitGuard(submission, 80, setError)) return
    setError(null)
    props.onSubmit(submission)
  }

  return (
    <WorkbenchShell
      title={props.title}
      icon="file-text"
      badge="Writing environment"
      meta={`${words} words / ${outline.length} headings`}
      error={error ?? props.error}
      submitting={props.submitting}
      submitLabel={props.submitLabel}
      disabled={markdown.trim().length === 0}
      onSubmit={submit}
      onReset={() => {
        setMarkdown(props.starterCode)
        setAudience('')
        setTone('Clear and practical')
        setError(null)
        props.onReset()
      }}
      footerNote="Write in Markdown; the outline and word count update as you type."
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_240px]">
        <div className="flex min-h-0 flex-col">
          <div className="flex items-center justify-between gap-2 border-b border-border bg-bg/40 px-3 py-2">
            <div className="flex gap-1">
              {(['write', 'preview'] as const).map((item) => (
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
                  {item}
                </button>
              ))}
            </div>
            <span className="font-mono text-[11px] text-primary/40">document.md</span>
          </div>

          {tab === 'write' ? (
            <textarea
              value={markdown}
              onChange={(event) => setMarkdown(event.target.value)}
              aria-label="Markdown document"
              spellCheck
              className="min-h-[420px] flex-1 resize-none bg-surface px-4 py-3 font-mono text-[13px] leading-6 text-primary outline-none placeholder:text-primary/35"
              placeholder="# Title&#10;&#10;Open with the reader's problem, then deliver the promised outcome."
            />
          ) : (
            <div className="min-h-[420px] flex-1 overflow-y-auto bg-surface px-5 py-4">
              {markdown.trim() ? (
                <MarkdownPreview markdown={markdown} />
              ) : (
                <p className="text-sm text-primary/45">Nothing to preview yet.</p>
              )}
            </div>
          )}
        </div>

        <aside className="flex min-h-0 flex-col border-t border-border xl:border-l xl:border-t-0">
          <div className="border-b border-border bg-bg/40 px-4 py-2">
            <FieldLabel>Document brief</FieldLabel>
          </div>
          <div className="space-y-4 overflow-y-auto p-4">
            <label className="block">
              <FieldLabel>Audience</FieldLabel>
              <input
                value={audience}
                onChange={(event) => setAudience(event.target.value)}
                placeholder="Who is this for?"
                className="mt-1.5 w-full rounded-md border border-border bg-bg/20 px-2.5 py-1.5 text-xs text-primary outline-none placeholder:text-primary/35 focus:border-accent/50"
              />
            </label>
            <label className="block">
              <FieldLabel>Tone</FieldLabel>
              <input
                value={tone}
                onChange={(event) => setTone(event.target.value)}
                className="mt-1.5 w-full rounded-md border border-border bg-bg/20 px-2.5 py-1.5 text-xs text-primary outline-none focus:border-accent/50"
              />
            </label>

            <div>
              <div className="flex items-center justify-between gap-2">
                <FieldLabel>Outline</FieldLabel>
                <span className="text-[11px] text-primary/40">{outline.length}</span>
              </div>
              {outline.length > 0 ? (
                <ol className="mt-2 space-y-1">
                  {outline.map((item, index) => (
                    <li
                      key={index}
                      className="truncate text-xs text-primary/70"
                      style={{ paddingInlineStart: `${(item.level - 1) * 10}px` }}
                    >
                      {item.text}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-1.5 text-xs text-primary/45">Add Markdown headings to build the outline.</p>
              )}
            </div>

            <EnvironmentNote>
              Use short paragraphs, concrete examples and headings that scan. Reviewers assess structure and
              audience fit as well as grammar.
            </EnvironmentNote>
          </div>
        </aside>
      </div>
    </WorkbenchShell>
  )
}
