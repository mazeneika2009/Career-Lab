import { useEffect, useMemo, useState } from 'react'
import { cn } from '../../../../../utils/cn'
import { Button } from '../../../../ui/button/Button'
import { Icon } from '../../../../ui/icon/Icon'
import { EnvironmentNote, FieldLabel, WorkbenchShell, submitGuard } from './WorkbenchShell'
import { runSqlScratchpad } from './runSqlScratchpad'
import type { SqlScratchpadResult } from './sqlRunnerTypes'
import type { PracticalWorkbenchProps } from './types'

interface QueryCheck {
  tone: 'ok' | 'warn' | 'error'
  text: string
}

const DEFAULT_TABLES = ['customers', 'orders', 'products']
const SQL_DRAFT_KEY = 'career-lab:practical-sql:'
const SCHEMA_COLUMNS: Record<string, string[]> = {
  customers: ['id INTEGER', 'name TEXT', 'email TEXT', 'city TEXT', 'created_at TEXT'],
  orders: ['id INTEGER', 'customer_id INTEGER', 'product_id INTEGER', 'order_date TEXT', 'status TEXT', 'total_amount REAL'],
  products: ['id INTEGER', 'name TEXT', 'category TEXT', 'price REAL', 'stock INTEGER']
}

function checkQuery(query: string): QueryCheck[] {
  const text = query.trim()
  const checks: QueryCheck[] = []
  const statements = text.split(';').filter((part) => part.trim().length > 0)

  if (text.length === 0) {
    return [{ tone: 'error', text: 'Write at least one SQL statement.' }]
  }
  if (statements.length === 0) {
    checks.push({ tone: 'error', text: 'No executable statement found. End statements with a semicolon.' })
  } else {
    checks.push({ tone: 'ok', text: `${statements.length} statement${statements.length === 1 ? '' : 's'} ready.` })
  }
  if (/\byour_table\b|\btable_name\b/i.test(text)) {
    checks.push({ tone: 'error', text: 'Replace placeholder table names with real schema tables.' })
  }
  if (/\bselect\s+\*/i.test(text)) {
    checks.push({ tone: 'warn', text: 'SELECT * works, but explicit columns score better on the rubric.' })
  }
  if (/\b(delete|update)\b/i.test(text) && !/\bwhere\b/i.test(text)) {
    checks.push({ tone: 'error', text: 'UPDATE/DELETE without WHERE would affect every row. Add a predicate.' })
  }
  if (/\bjoin\b/i.test(text) && !/\bon\b/i.test(text)) {
    checks.push({ tone: 'error', text: 'Every JOIN needs an ON condition.' })
  }
  if (/\bgroup\s+by\b/i.test(text)) {
    checks.push({ tone: 'ok', text: 'Aggregation detected. Verify non-aggregated columns appear in GROUP BY.' })
  }
  if (checks.every((check) => check.tone !== 'error')) {
    checks.push({ tone: 'ok', text: 'Static validation passed. The server will grade semantic correctness.' })
  }
  return checks
}

function inferredTables(brief: string, starter: string): string[] {
  const found = new Set<string>()
  const patterns = [
    /\b(?:table|from|join)\s+`?([a-z_][a-z0-9_]*)`?/gi,
    /`?([a-z_][a-z0-9_]*)`?\s+table\b/gi
  ]
  for (const source of [brief, starter]) {
    for (const pattern of patterns) {
      let match: RegExpExecArray | null
      while ((match = pattern.exec(source)) !== null) {
        const name = match[1]?.toLowerCase()
        if (name && !['your_table', 'table_name', 'prepared', 'name'].includes(name)) found.add(name)
      }
    }
  }
  return [...found].slice(0, 8)
}

function loadDraft(examPublicId: string, initial: string): { query: string; error: string | null } {
  try {
    return {
      query: window.localStorage.getItem(`${SQL_DRAFT_KEY}${examPublicId}`) ?? initial,
      error: null
    }
  } catch {
    return { query: initial, error: 'Your saved SQL draft could not be loaded from this browser.' }
  }
}

function columnsFor(table: string): string[] {
  return SCHEMA_COLUMNS[table.toLowerCase()] ?? [
    'id INTEGER',
    'name TEXT',
    'status TEXT',
    'category TEXT',
    'amount REAL',
    'created_at TEXT'
  ]
}

export function DatabaseWorkbench(props: PracticalWorkbenchProps): React.JSX.Element {
  const initial = props.restoreCode ?? props.starterCode
  const [draft] = useState(() => loadDraft(props.examPublicId, initial))
  const [query, setQuery] = useState(draft.query)
  const [checks, setChecks] = useState<QueryCheck[] | null>(null)
  const [error, setError] = useState<string | null>(draft.error)
  const [result, setResult] = useState<SqlScratchpadResult | null>(null)
  const [running, setRunning] = useState(false)
  const tables = useMemo(
    () => [...new Set([...DEFAULT_TABLES, ...inferredTables(props.brief ?? '', props.starterCode)])],
    [props.brief, props.starterCode]
  )
  const lines = query.split('\n').length

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(`${SQL_DRAFT_KEY}${props.examPublicId}`, query)
        setError(null)
      } catch {
        setError('Your SQL draft could not be saved in this browser.')
      }
    }, 350)
    return () => window.clearTimeout(timer)
  }, [props.examPublicId, query])

  const submit = (): void => {
    if (!submitGuard(query, 20, setError)) return
    setError(null)
    props.onSubmit(query)
  }

  const run = async (): Promise<void> => {
    if (running || props.submitting) return
    setChecks(checkQuery(query))
    setResult(null)
    setError(null)
    setRunning(true)
    try {
      setResult(await runSqlScratchpad(query, tables))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'The query could not be executed.')
    } finally {
      setRunning(false)
    }
  }

  return (
    <WorkbenchShell
      title={props.title}
      icon="layers"
      badge="SQL environment"
      meta={`${props.languageLabel} / ${lines} lines`}
      error={error ?? props.error}
      submitting={props.submitting || running}
      submitLabel={props.submitLabel}
      disabled={query.trim().length === 0}
      onSubmit={submit}
      onReset={() => {
        setQuery(props.starterCode)
        setChecks(null)
        setResult(null)
        setError(null)
        props.onReset()
      }}
      toolbar={
        <Button variant="secondary" size="sm" onClick={() => void run()} disabled={props.submitting || running}>
          <Icon name="play" className="h-3.5 w-3.5" />
          {running ? 'Running query…' : 'Run query'}
        </Button>
      }
      footerNote="Queries run against an isolated in-browser SQLite sample database. Drafts are saved locally."
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div className="flex min-h-0 flex-col">
          <div className="flex items-center justify-between gap-2 border-b border-border bg-bg/40 px-4 py-2">
            <FieldLabel>SQL scratchpad</FieldLabel>
            <span className="font-mono text-[11px] text-primary/40">query.sql</span>
          </div>
          <textarea
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            spellCheck={false}
            aria-label="SQL query editor"
            className="min-h-[340px] flex-1 resize-none bg-[#0f1720] px-4 py-3 font-mono text-[13px] leading-6 text-[#d6e2dc] outline-none placeholder:text-[#6b7f76]"
            placeholder="-- Write your SQL here"
          />
        </div>

        <aside className="flex min-h-0 flex-col border-t border-border xl:border-l xl:border-t-0">
          <div className="border-b border-border bg-bg/40 px-4 py-2">
            <FieldLabel>Schema explorer</FieldLabel>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            <ul className="space-y-1.5">
              {tables.map((table) => (
                <li key={table} className="rounded-md border border-border/70 bg-bg/30">
                  <details>
                    <summary className="flex cursor-pointer list-none items-center gap-2 px-2.5 py-2 font-mono text-xs text-primary/75 [&::-webkit-details-marker]:hidden">
                      <Icon name="layers" className="h-3.5 w-3.5 text-accent/70" />
                      {table}
                    </summary>
                    <ul className="space-y-1 border-t border-border/70 px-3 py-2 font-mono text-[10px] text-primary/55">
                      {columnsFor(table).map((column) => <li key={column}>{column}</li>)}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>
            <EnvironmentNote>
              The sample schema is local to this exam. Changes made by queries are discarded after each run.
            </EnvironmentNote>
          </div>
        </aside>
      </div>

      <div className="border-t border-border bg-bg/30 px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <FieldLabel>Query output</FieldLabel>
          <span className="text-[11px] text-primary/40">
            {result ? `${result.rows.length}${result.truncated ? '+' : ''} rows` : running ? 'Executing…' : 'Not run yet'}
          </span>
        </div>
        {result ? (
          result.columns.length > 0 ? (
            <div className="mt-2 overflow-x-auto rounded-md border border-border/70">
              <table className="min-w-full divide-y divide-border/70 text-left text-xs">
                <thead className="bg-bg/60">
                  <tr>{result.columns.map((column) => <th key={column} className="whitespace-nowrap px-3 py-2 font-semibold text-primary/65">{column}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {result.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((value, columnIndex) => (
                        <td key={columnIndex} className="whitespace-nowrap px-3 py-2 font-mono text-primary/75">
                          {value === null ? 'NULL' : String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {result.truncated ? <p className="border-t border-border/70 px-3 py-2 text-[11px] text-primary/50">Showing the first 200 rows.</p> : null}
            </div>
          ) : (
            <p className="mt-2 rounded-md border border-info/20 bg-info/[0.04] px-3 py-2 text-xs text-info">
              Query executed successfully. It did not return rows.
            </p>
          )
        ) : null}
        {checks ? (
          <ul className="mt-2 space-y-1.5">
            {checks.map((check, index) => (
              <li
                key={index}
                className={cn(
                  'flex items-start gap-2 text-xs leading-relaxed',
                  check.tone === 'error'
                    ? 'text-attention'
                    : check.tone === 'warn'
                      ? 'text-warning'
                      : 'text-info'
                )}
              >
                <Icon
                  name={check.tone === 'ok' ? 'check-circle' : 'alert-triangle'}
                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                />
                {check.text}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1.5 text-xs text-primary/50">Run a query to inspect its results before submitting.</p>
        )}
      </div>
    </WorkbenchShell>
  )
}
