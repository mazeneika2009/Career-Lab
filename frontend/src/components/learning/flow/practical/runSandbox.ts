import RunWorker from './runner.worker?worker'
import {
  languageForPath,
  normalizeLanguage,
  normalizeProjectPath,
  type ProjectFile
} from './project'

export type SandboxLogLevel = 'log' | 'info' | 'warn' | 'error' | 'system'

export interface SandboxLog {
  level: SandboxLogLevel
  text: string
}

export interface SandboxResult {
  ok: boolean
  logs: SandboxLog[]
  durationMs: number
  timedOut: boolean
  preview: string | null
}

type WorkerMessage =
  | { type: 'log'; level: SandboxLogLevel; text: string }
  | { type: 'done'; ok: boolean; durationMs: number }

const EXECUTION_TIMEOUT_MS = 6000

function dirname(path: string): string {
  const separator = path.lastIndexOf('/')
  return separator >= 0 ? path.slice(0, separator) : ''
}

function resolveProjectReference(fromPath: string, reference: string): string | null {
  const clean = reference.split('#')[0]?.split('?')[0]?.trim() ?? ''
  if (!clean) return null
  if (/^(?:[a-z]+:)?\/\//i.test(clean) || /^(?:data|blob|mailto):/i.test(clean)) return null
  const base = clean.startsWith('/') ? '' : dirname(fromPath)
  const parts = [...(base ? base.split('/') : []), ...clean.replace(/^\/+/, '').split('/')]
  const resolved: string[] = []
  for (const part of parts) {
    if (!part || part === '.') continue
    if (part === '..') resolved.pop()
    else resolved.push(part)
  }
  return normalizeProjectPath(resolved.join('/'))
}

function buildWebPreview(
  files: ProjectFile[],
  entryPath: string
): { preview: string; logs: SandboxLog[] } {
  const entry = files.find((file) => file.path === entryPath)
  if (!entry) throw new Error(`Entry file ${entryPath} was not found.`)

  const fileMap = new Map(files.map((file) => [file.path, file]))
  const parser = new DOMParser()
  const document = parser.parseFromString(entry.content, 'text/html')
  const logs: SandboxLog[] = []
  const inlined: string[] = []

  for (const link of [...document.querySelectorAll('link[href]')]) {
    const rel = link.getAttribute('rel')?.toLowerCase() ?? ''
    if (!rel.split(/\s+/).includes('stylesheet')) continue
    const href = link.getAttribute('href') ?? ''
    const path = resolveProjectReference(entryPath, href)
    const file = path ? fileMap.get(path) : null
    if (!file) {
      if (path && !/^https?:/i.test(href)) {
        logs.push({ level: 'warn', text: `Stylesheet ${href} was not found in the workspace.` })
      }
      continue
    }
    const style = document.createElement('style')
    style.textContent = file.content.replace(/<\/style/gi, '<\\/style')
    style.setAttribute('data-source', file.path)
    link.replaceWith(style)
    inlined.push(file.path)
  }

  for (const scriptElement of [...document.querySelectorAll('script[src]')]) {
    const src = scriptElement.getAttribute('src') ?? ''
    const path = resolveProjectReference(entryPath, src)
    const file = path ? fileMap.get(path) : null
    if (!file) {
      if (path && !/^https?:/i.test(src)) {
        logs.push({ level: 'warn', text: `Script ${src} was not found in the workspace.` })
      }
      continue
    }
    const script = document.createElement('script')
    if (scriptElement.getAttribute('type')) script.setAttribute('type', scriptElement.getAttribute('type')!)
    script.textContent = file.content.replace(/<\/script/gi, '<\\/script')
    script.setAttribute('data-source', file.path)
    scriptElement.replaceWith(script)
    inlined.push(file.path)
  }

  const bridge = document.createElement('script')
  bridge.textContent = [
    '(function () {',
    "  var send = function (level, text) { try { parent.postMessage({ source: 'career-lab-preview', level: level, text: String(text) }, '*') } catch (_) {} }",
    "  window.addEventListener('error', function (event) { send('error', event.message || 'Script error') })",
    "  window.addEventListener('unhandledrejection', function (event) { send('error', 'Unhandled promise rejection: ' + (event.reason && event.reason.message ? event.reason.message : event.reason)) })",
    '  var originalError = console.error.bind(console)',
    "  console.error = function () { originalError.apply(console, arguments); send('error', Array.prototype.join.call(arguments, ' ')) }",
    "  var originalWarn = console.warn.bind(console)",
    "  console.warn = function () { originalWarn.apply(console, arguments); send('warn', Array.prototype.join.call(arguments, ' ')) }",
    '})()'
  ].join('\n')
  if (document.head) document.head.prepend(bridge)
  else document.documentElement.prepend(bridge)

  if (inlined.length > 0) {
    logs.push({ level: 'info', text: `Preview bundled ${inlined.join(', ')}.` })
  }

  return {
    preview: `<!doctype html>\n${document.documentElement.outerHTML}`,
    logs
  }
}

async function compileTypeScriptFiles(files: ProjectFile[]): Promise<{
  files: ProjectFile[]
  logs: SandboxLog[]
}> {
  const tsFiles = files.filter((file) => {
    const language = languageForPath(file.path, 'javascript')
    return language === 'typescript'
  })
  if (tsFiles.length === 0) return { files, logs: [] }

  const { compileTypeScript } = await import('../monacoSetup')
  const compiled = new Map<string, string>()
  for (const file of tsFiles) {
    try {
      compiled.set(file.path, await compileTypeScript(file.content, file.path))
    } catch (error) {
      throw new Error(
        `${file.path}: ${error instanceof Error ? error.message : 'TypeScript compilation failed.'}`
      )
    }
  }

  return {
    files: files.map((file) =>
      compiled.has(file.path) ? { ...file, content: compiled.get(file.path)! } : file
    ),
    logs: [{ level: 'info', text: `Compiled ${tsFiles.length} TypeScript file(s).` }]
  }
}

function runSqlCheck(input: {
  files: ProjectFile[]
  entryPath: string
}): SandboxResult {
  const startedAt = performance.now()
  const entry = input.files.find((file) => file.path === input.entryPath)
  const logs: SandboxLog[] = []
  if (!entry) {
    return {
      ok: false,
      logs: [{ level: 'error', text: `Entry file ${input.entryPath} was not found.` }],
      durationMs: 0,
      timedOut: false,
      preview: null
    }
  }

  const source = entry.content.trim()
  if (!source) {
    logs.push({ level: 'error', text: `${entry.path} is empty.` })
  }
  if (/<script\b|<html\b/i.test(source)) {
    logs.push({
      level: 'error',
      text: 'SQL files must not contain HTML. Keep markup in .html files and queries in .sql files.'
    })
  }
  if (/\bfunction\s+\w+|(?:^|\s)const\s+\w+\s*=|=>/.test(source)) {
    logs.push({
      level: 'error',
      text: 'SQL files must not contain JavaScript. Move application code into a .js or .ts file.'
    })
  }
  if (/\byour_table\b/i.test(source)) {
    logs.push({ level: 'warn', text: 'Replace the placeholder your_table with the real table name.' })
  }
  if (source.length > 0 && !/;\s*$/.test(source)) {
    logs.push({ level: 'warn', text: 'Finish the final SQL statement with a semicolon.' })
  }

  const ok = logs.every((log) => log.level !== 'error')
  logs.push({
    level: 'system',
    text: ok
      ? 'SQL check passed. Connect the task database to execute the query against live data.'
      : 'SQL check failed. Fix the highlighted file issues.'
  })
  return {
    ok,
    logs,
    durationMs: performance.now() - startedAt,
    timedOut: false,
    preview: null
  }
}

export async function runPracticalCode(input: {
  files: ProjectFile[]
  entryPath: string
  language: string
}): Promise<SandboxResult> {
  const entryLanguage = languageForPath(input.entryPath, input.language)
  const normalized = normalizeLanguage(entryLanguage)
  const startedAt = performance.now()

  if (normalized === 'html') {
    try {
      const preview = buildWebPreview(input.files, input.entryPath)
      return {
        ok: true,
        logs: preview.logs,
        durationMs: performance.now() - startedAt,
        timedOut: false,
        preview: preview.preview
      }
    } catch (error) {
      return {
        ok: false,
        logs: [
          {
            level: 'error',
            text: error instanceof Error ? error.message : 'The web preview could not be built.'
          }
        ],
        durationMs: performance.now() - startedAt,
        timedOut: false,
        preview: null
      }
    }
  }

  if (normalized === 'sql') return runSqlCheck(input)

  if (normalized !== 'javascript' && normalized !== 'typescript') {
    return {
      ok: false,
      logs: [
        {
          level: 'error',
          text: `Live execution is available for JavaScript, TypeScript, SQL checks and HTML previews. ${input.language} work can still be saved and submitted for grading.`
        }
      ],
      durationMs: 0,
      timedOut: false,
      preview: null
    }
  }

  const entry = input.files.find((file) => file.path === input.entryPath)
  if (!entry) {
    return {
      ok: false,
      logs: [{ level: 'error', text: `Entry file ${input.entryPath} was not found.` }],
      durationMs: 0,
      timedOut: false,
      preview: null
    }
  }

  let preparedFiles = input.files
  let compileLogs: SandboxLog[] = []
  try {
    const compiled = await compileTypeScriptFiles(input.files)
    preparedFiles = compiled.files
    compileLogs = compiled.logs
  } catch (error) {
    return {
      ok: false,
      logs: [
        {
          level: 'error',
          text: error instanceof Error ? error.message : 'The TypeScript solution did not compile.'
        }
      ],
      durationMs: performance.now() - startedAt,
      timedOut: false,
      preview: null
    }
  }

  return new Promise((resolve) => {
    const worker = new RunWorker()
    const logs: SandboxLog[] = [...compileLogs]
    let settled = false

    const finish = (result: SandboxResult): void => {
      if (settled) return
      settled = true
      window.clearTimeout(timer)
      worker.terminate()
      resolve(result)
    }

    const timer = window.setTimeout(() => {
      finish({
        ok: false,
        logs: [
          ...logs,
          {
            level: 'error',
            text: 'Execution timed out after 6 seconds. Check for infinite loops or blocking work.'
          }
        ],
        durationMs: EXECUTION_TIMEOUT_MS,
        timedOut: true,
        preview: null
      })
    }, EXECUTION_TIMEOUT_MS)

    worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const message = event.data
      if (message.type === 'log') {
        logs.push({ level: message.level, text: message.text })
        return
      }
      finish({
        ok: message.ok,
        logs,
        durationMs: message.durationMs,
        timedOut: false,
        preview: null
      })
    }

    worker.onerror = (event) => {
      finish({
        ok: false,
        logs: [
          ...logs,
          { level: 'error', text: event.message || 'The execution worker stopped unexpectedly.' }
        ],
        durationMs: 0,
        timedOut: false,
        preview: null
      })
    }

    worker.postMessage({
      files: preparedFiles,
      entryPath: input.entryPath,
      language: normalized
    })
  })
}
