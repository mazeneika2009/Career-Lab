import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '../../../../utils/cn'
import { Button } from '../../../ui/button/Button'
import { Icon } from '../../../ui/icon/Icon'
import {
  addProjectFile,
  addProjectFolder,
  assembleSubmission,
  clearStoredProject,
  defaultProject,
  deleteProjectFile,
  deleteProjectFolder,
  languageForPath,
  persistProject,
  projectFromSubmission,
  readStoredProject,
  renameProjectFile,
  renameProjectFolder,
  selectProjectEntry,
  selectProjectFile,
  updateProjectFile,
  type PracticalProject,
  type ProjectMutation,
  type ProjectSeed
} from './project'
import { ProjectFileTree } from './ProjectFileTree'
import { runPracticalCode, type SandboxLog } from './runSandbox'

const MonacoCodeEditor = lazy(() => import('../MonacoCodeEditor'))

const EDITOR_THEME_KEY = 'career-lab:editor-theme'

type RunMode = 'run' | 'debug'
type TerminalTab = 'output' | 'problems' | 'preview'

function initialProject(
  examPublicId: string,
  seed: ProjectSeed,
  restoreCode: string | null
): PracticalProject {
  if (restoreCode !== null) return projectFromSubmission(restoreCode, seed)
  return readStoredProject(examPublicId, seed) ?? defaultProject(seed)
}

function initialTheme(): 'light' | 'dark' {
  try {
    return window.localStorage.getItem(EDITOR_THEME_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function logTone(level: SandboxLog['level'], dark: boolean): string {
  if (dark) {
    if (level === 'error') return 'text-[#ff9b85]'
    if (level === 'warn') return 'text-[#f3c77a]'
    if (level === 'info') return 'text-[#8fd0a9]'
    if (level === 'system') return 'text-[#8fa39a]'
    return 'text-[#d8e5df]/80'
  }
  if (level === 'error') return 'text-attention'
  if (level === 'warn') return 'text-warning'
  if (level === 'info') return 'text-info'
  if (level === 'system') return 'text-primary/45'
  return 'text-primary/75'
}

export function PracticalWorkbench({
  examPublicId,
  starterCode,
  restoreCode,
  title,
  brief,
  requirements,
  language,
  languageLabel,
  submitting,
  error,
  submitLabel,
  meta,
  onSubmit,
  onReset,
  className
}: {
  examPublicId: string
  starterCode: string
  restoreCode: string | null
  title: string
  brief?: string
  requirements: string[]
  language: string
  languageLabel: string
  submitting: boolean
  error: string | null
  submitLabel: string
  meta?: string
  onSubmit: (code: string) => void
  onReset: () => void
  className?: string
}): React.JSX.Element {
  const seed = useMemo<ProjectSeed>(
    () => ({ starterCode, language, title, brief, requirements }),
    [brief, language, requirements, starterCode, title]
  )
  const [project, setProject] = useState<PracticalProject>(() =>
    initialProject(examPublicId, seed, restoreCode)
  )
  const [dirty, setDirty] = useState(false)
  const [saveFlash, setSaveFlash] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme)
  const [logs, setLogs] = useState<SandboxLog[]>([
    { level: 'system', text: 'Ready. Run the entry file to execute your solution.' }
  ])
  const [terminalTab, setTerminalTab] = useState<TerminalTab>('output')
  const [running, setRunning] = useState<RunMode | null>(null)
  const [durationMs, setDurationMs] = useState<number | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const activeFile =
    project.files.find((file) => file.path === project.activePath) ?? project.files[0]!
  const activeLanguage = languageForPath(activeFile.path, language)
  const entryLanguage = languageForPath(project.entryPath, language)
  const canPreview = entryLanguage === 'html'
  const dark = theme === 'dark'
  const displayError = localError ?? error
  const problems = useMemo(() => logs.filter((log) => log.level === 'error'), [logs])
  const visibleLogs = terminalTab === 'problems' ? problems : logs

  useEffect(() => {
    if (!canPreview && terminalTab === 'preview') setTerminalTab('output')
  }, [canPreview, terminalTab])

  useEffect(() => {
    if (!preview) return
    const handler = (event: MessageEvent): void => {
      const message = event.data as { source?: string; level?: string; text?: string }
      if (message?.source !== 'career-lab-preview' || typeof message.text !== 'string') return
      const level: SandboxLog['level'] =
        message.level === 'error' || message.level === 'warn' ? message.level : 'log'
      setLogs((current) => [...current, { level, text: message.text! }])
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [preview])

  useEffect(() => {
    if (!dirty) return
    const timer = window.setTimeout(() => {
      persistProject(examPublicId, project)
      setDirty(false)
    }, 500)
    return () => window.clearTimeout(timer)
  }, [dirty, examPublicId, project])

  useEffect(() => {
    const node = outputRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [logs, terminalTab])

  const changeActiveFile = (content: string): void => {
    setProject((current) => updateProjectFile(current, current.activePath, content))
    setDirty(true)
    setLocalError(null)
  }

  const selectFile = (path: string): void => {
    setProject((current) => selectProjectFile(current, path))
    setDirty(true)
  }

  const setEntryFile = (path: string): void => {
    setProject((current) => selectProjectEntry(current, path))
    setDirty(true)
  }

  const applyMutation = (result: ProjectMutation): string | null => {
    if (result.error) return result.error
    setProject(result.project)
    setDirty(true)
    setLocalError(null)
    return null
  }

  const addFile = (path: string): string | null => applyMutation(addProjectFile(project, path))

  const addFolder = (path: string): string | null => applyMutation(addProjectFolder(project, path))

  const renameFile = (path: string, nextPath: string): string | null =>
    applyMutation(renameProjectFile(project, path, nextPath))

  const renameFolder = (path: string, nextPath: string): string | null =>
    applyMutation(renameProjectFolder(project, path, nextPath))

  const deleteFile = (path: string): string | null =>
    applyMutation(deleteProjectFile(project, path))

  const deleteFolder = (path: string): string | null =>
    applyMutation(deleteProjectFolder(project, path))

  const save = (): void => {
    persistProject(examPublicId, project)
    setDirty(false)
    setSaveFlash(true)
    window.setTimeout(() => setSaveFlash(false), 1600)
  }

  const toggleTheme = (): void => {
    const next = dark ? 'light' : 'dark'
    setTheme(next)
    try {
      window.localStorage.setItem(EDITOR_THEME_KEY, next)
    } catch {}
  }

  const execute = async (mode: RunMode): Promise<void> => {
    if (running || submitting) return
    setRunning(mode)
    setLocalError(null)
    setDurationMs(null)
    setPreview(null)
    setTerminalTab('output')
    const startLine: SandboxLog = {
      level: 'system',
      text: `${mode === 'debug' ? 'Debugging' : 'Running'} ${project.entryPath} with ${languageLabel}.`
    }
    setLogs([startLine])
    const startedAt = performance.now()
    try {
      const result = await runPracticalCode({
        files: project.files,
        entryPath: project.entryPath,
        language
      })

      setDurationMs(result.durationMs)
      setPreview(result.preview)
      setLogs([
        startLine,
        ...result.logs,
        {
          level: result.ok ? 'system' : 'error',
          text: result.ok
            ? `Finished in ${Math.max(1, Math.round(result.durationMs))} ms.`
            : result.timedOut
              ? 'Execution was stopped at the time limit.'
              : `Execution stopped after ${Math.max(1, Math.round(result.durationMs))} ms.`
        }
      ])
      if (!result.ok) setTerminalTab('problems')
      else if (result.preview) setTerminalTab('preview')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'The code runner could not start.'
      setDurationMs(performance.now() - startedAt)
      setPreview(null)
      setLogs([startLine, { level: 'error', text: message }])
      setTerminalTab('problems')
    } finally {
      setRunning(null)
    }
  }

  const reset = (): void => {
    clearStoredProject(examPublicId)
    setProject(defaultProject(seed))
    setDirty(false)
    setSaveFlash(false)
    setLocalError(null)
    setDurationMs(null)
    setPreview(null)
    setLogs([{ level: 'system', text: 'Workspace reset to the starter files.' }])
    setTerminalTab('output')
    onReset()
  }

  const submit = (): void => {
    const entry = project.files.find((file) => file.path === project.entryPath)
    if (!entry || entry.content.trim().length < 20) {
      setLocalError('Write a real implementation (at least 20 characters) before submitting.')
      setTerminalTab('problems')
      return
    }
    setLocalError(null)
    persistProject(examPublicId, project)
    setDirty(false)
    onSubmit(assembleSubmission(project, language))
  }

  return (
    <section
      aria-label="Practical workbench"
      data-theme={theme}
      className={cn(
        '@container overflow-hidden rounded-2xl border shadow-sm transition-colors duration-200 focus-within:border-accent/45',
        dark ? 'border-[#2a3a34] bg-[#0f1a17]' : 'border-border bg-surface',
        className
      )}
    >
      <header
        className={cn(
          'flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-5',
          dark ? 'border-white/10 bg-[#14211d]' : 'border-border bg-surface'
        )}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
              dark ? 'bg-white/[0.06] text-[#c2d0c9]' : 'bg-primary/[0.055] text-primary'
            )}
          >
            <Icon name="terminal" className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p
              className={cn(
                'text-sm font-semibold tracking-tight',
                dark ? 'text-[#e2ece7]' : 'text-primary'
              )}
            >
              Practical workspace
            </p>
            <p
              className={cn(
                'flex items-center gap-1.5 truncate text-[11px]',
                dark ? 'text-[#9aada3]' : 'text-primary/45'
              )}
            >
              <span>{project.files.length} files</span>
              <span aria-hidden>/</span>
              <span>{languageLabel}</span>
              <span aria-hidden>/</span>
              <span
                className={
                  dirty
                    ? 'text-warning'
                    : saveFlash
                      ? 'text-success'
                      : dark
                        ? 'text-[#9aada3]'
                        : 'text-primary/45'
                }
              >
                {dirty ? 'Unsaved changes' : saveFlash ? 'Saved' : 'Local draft'}
              </span>
            </p>
          </div>
        </div>

        <div
          className={cn(
            'flex flex-wrap items-center gap-1 rounded-xl p-1',
            dark ? 'bg-[#0f1a17]' : 'bg-bg/60'
          )}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className={cn(
              'h-8 rounded-lg px-2.5 text-xs',
              dark ? 'text-[#c2d0c9] hover:bg-white/[0.08]' : 'text-primary/65'
            )}
          >
            <Icon name="lightbulb" className="h-3.5 w-3.5" />
            {dark ? 'Light' : 'Dark'}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => void execute('run')}
            loading={running === 'run'}
            disabled={Boolean(running) || submitting}
            className={cn(
              'h-8 rounded-lg px-3 text-xs',
              dark && 'border-white/10 bg-[#263a33] text-[#e2ece7] hover:bg-[#30483e]'
            )}
          >
            <Icon name="play" className="h-3.5 w-3.5" />
            Run
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void execute('debug')}
            loading={running === 'debug'}
            disabled={Boolean(running) || submitting}
            className={cn(
              'h-8 rounded-lg px-2.5 text-xs',
              dark ? 'text-[#c2d0c9] hover:bg-white/[0.08]' : 'text-primary/60'
            )}
          >
            Debug
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={save}
            disabled={!dirty}
            className={cn(
              'h-8 rounded-lg px-2.5 text-xs',
              dark ? 'text-[#c2d0c9] hover:bg-white/[0.08]' : 'text-primary/60'
            )}
          >
            Save
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className={cn(
              'h-8 rounded-lg px-2.5 text-xs',
              dark ? 'text-[#9aada3] hover:bg-white/[0.08]' : 'text-primary/50'
            )}
          >
            <Icon name="arrow-left" className="h-3.5 w-3.5" />
            Reset
          </Button>
          <Button
            size="sm"
            onClick={submit}
            loading={submitting}
            disabled={Boolean(running)}
            className="ml-auto h-8 rounded-lg px-3 text-xs"
          >
            {submitLabel}
          </Button>
        </div>
      </header>

      <div className="grid min-h-0 grid-cols-1 @3xl:grid-cols-[210px_minmax(0,1fr)]">
        <ProjectFileTree
          project={project}
          dark={dark}
          onSelect={selectFile}
          onSetEntry={setEntryFile}
          onAddFile={addFile}
          onAddFolder={addFolder}
          onRenameFile={renameFile}
          onRenameFolder={renameFolder}
          onDeleteFile={deleteFile}
          onDeleteFolder={deleteFolder}
          className={cn(
            'max-h-56 border-r-0 border-b @3xl:max-h-[38rem] @3xl:border-r @3xl:border-b-0',
            dark ? 'border-white/10' : 'border-border'
          )}
        />

        <div className={cn('min-w-0', dark ? 'bg-[#0f1a17]' : 'bg-surface')}>
          <div
            className={cn(
              'flex min-h-11 items-center gap-2 border-b px-4 py-2',
              dark ? 'border-white/10 bg-[#111c18]' : 'border-border bg-bg/25'
            )}
          >
            <select
              aria-label="Active file"
              value={activeFile.path}
              onChange={(event) => selectFile(event.target.value)}
              className={cn(
                'h-8 max-w-[16rem] rounded-lg border px-2 font-mono text-[11px] outline-none focus-visible:ring-2 focus-visible:ring-accent/40 @3xl:hidden',
                dark
                  ? 'border-white/10 bg-[#14211d] text-[#e2ece7]'
                  : 'border-border bg-surface text-primary'
              )}
            >
              {project.files.map((file) => (
                <option key={file.path} value={file.path}>
                  {file.path}
                </option>
              ))}
            </select>
            <span
              className={cn(
                'hidden min-w-0 items-center gap-1.5 font-mono text-[11px] @3xl:flex',
                dark ? 'text-[#c2d0c9]' : 'text-primary/50'
              )}
            >
              <Icon name="file-text" className="h-3 w-3 shrink-0" />
              <span className="truncate">{activeFile.path}</span>
              {activeFile.path === project.entryPath ? (
                <span
                  className={cn(
                    'rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em]',
                    dark ? 'bg-white/[0.08] text-[#9aada3]' : 'bg-accent/[0.08] text-accent'
                  )}
                >
                  Entry
                </span>
              ) : null}
            </span>
            <span
              className={cn(
                'ml-auto shrink-0 text-[10px] uppercase tracking-[0.08em]',
                dark ? 'text-[#8fa39a]' : 'text-primary/35'
              )}
            >
              {activeLanguage}
            </span>
          </div>

          <div
            className={cn(
              'h-[24rem] transition-colors duration-200 sm:h-[28rem] @4xl:h-[36rem]',
              dark ? 'bg-[#0f1a17]' : 'bg-surface'
            )}
          >
            <Suspense
              fallback={
                <div
                  className={cn(
                    'flex h-full items-center justify-center text-sm',
                    dark ? 'text-[#d8e5df]/50' : 'text-primary/50'
                  )}
                  role="status"
                >
                  Loading code editor...
                </div>
              }
            >
              <MonacoCodeEditor
                value={activeFile.content}
                language={activeLanguage}
                path={activeFile.path}
                theme={theme}
                onChange={changeActiveFile}
              />
            </Suspense>
          </div>

          <div
            className={cn(
              'border-t transition-colors duration-200',
              dark ? 'border-white/10 bg-[#0b1412]' : 'border-border bg-bg/30'
            )}
          >
            <div
              className={cn(
                'flex items-center gap-1 border-b px-2 py-1.5',
                dark ? 'border-white/10' : 'border-border'
              )}
            >
              <TerminalTabButton
                active={terminalTab === 'output'}
                onClick={() => setTerminalTab('output')}
                label="Output"
                dark={dark}
              />
              <TerminalTabButton
                active={terminalTab === 'problems'}
                onClick={() => setTerminalTab('problems')}
                label={problems.length > 0 ? `Problems ${problems.length}` : 'Problems'}
                dark={dark}
              />
              {canPreview ? (
                <TerminalTabButton
                  active={terminalTab === 'preview'}
                  onClick={() => setTerminalTab('preview')}
                  label="Preview"
                  dark={dark}
                />
              ) : null}
              <span
                className={cn(
                  'ml-auto text-[10px] tabular-nums',
                  dark ? 'text-[#8fa39a]' : 'text-primary/35'
                )}
              >
                {running
                  ? running === 'debug'
                    ? 'Debugging...'
                    : 'Running...'
                  : durationMs !== null
                    ? `${Math.max(1, Math.round(durationMs))} ms`
                    : 'idle'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setLogs([{ level: 'system', text: 'Output cleared.' }])
                  setDurationMs(null)
                }}
                className={cn(
                  'rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors',
                  dark
                    ? 'text-[#8fa39a] hover:bg-white/10 hover:text-white'
                    : 'text-primary/40 hover:bg-primary/[0.06] hover:text-primary'
                )}
              >
                Clear
              </button>
            </div>
            {terminalTab === 'preview' ? (
              <div className="h-72 bg-white">
                {preview ? (
                  <iframe
                    title="Web preview"
                    sandbox="allow-scripts allow-forms allow-modals"
                    referrerPolicy="no-referrer"
                    srcDoc={preview}
                    className="h-full w-full border-0"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-4 text-center text-xs text-primary/45">
                    Run the HTML entry file to render the live preview.
                  </div>
                )}
              </div>
            ) : (
              <div
                ref={outputRef}
                className="h-28 overflow-y-auto px-3 py-2 font-mono text-[11px] leading-relaxed"
              >
                {visibleLogs.length === 0 ? (
                  <p className={dark ? 'text-[#8fa39a]' : 'text-primary/35'}>
                    {terminalTab === 'problems' ? 'No runtime problems detected.' : 'No output yet.'}
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {visibleLogs.map((log, index) => (
                      <li key={index} className={cn('flex gap-2', logTone(log.level, dark))}>
                        <span aria-hidden className="w-3 shrink-0 select-none opacity-40">
                          {log.level === 'error' ? '!' : log.level === 'warn' ? '!' : '>'}
                        </span>
                        <span className="whitespace-pre-wrap break-words">{log.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <footer
        className={cn(
          'border-t px-4 py-3',
          dark ? 'border-white/10 bg-[#111c18]' : 'border-border bg-bg/35'
        )}
      >
        {displayError ? (
          <p
            role="alert"
            className="mb-2 rounded-lg border border-attention/30 bg-attention/[0.06] px-3 py-2 text-sm leading-relaxed text-attention"
          >
            {displayError}
          </p>
        ) : null}
        <div
          className={cn(
            'flex flex-wrap items-center justify-between gap-2 text-[11px]',
            dark ? 'text-[#9aada3]' : 'text-primary/45'
          )}
        >
          <span>
            {canPreview ? 'Previews' : 'Runs'}{' '}
            <span className={cn('font-mono', dark ? 'text-[#c2d0c9]' : 'text-primary/60')}>
              {project.entryPath}
            </span>
            . Changes save
            locally after a short pause.
          </span>
          {meta ? <span>{meta}</span> : null}
        </div>
      </footer>
    </section>
  )
}

function TerminalTabButton({
  active,
  onClick,
  label,
  dark
}: {
  active: boolean
  onClick: () => void
  label: string
  dark: boolean
}): React.JSX.Element {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors',
        active
          ? dark
            ? 'bg-white/10 text-white'
            : 'bg-surface text-primary shadow-sm'
          : dark
            ? 'text-[#8fa39a] hover:bg-white/[0.06] hover:text-white'
            : 'text-primary/40 hover:bg-surface/70 hover:text-primary'
      )}
    >
      {label}
    </button>
  )
}
