import {
  languageForPath,
  normalizeLanguage,
  normalizeProjectPath,
  type ProjectFile
} from './project'
import type { SandboxLogLevel } from './runSandbox'

interface WorkerRequest {
  files: ProjectFile[]
  entryPath: string
  language: string
}

type WorkerResponse =
  | { type: 'log'; level: SandboxLogLevel; text: string }
  | { type: 'done'; ok: boolean; durationMs: number }

const scope = self as unknown as {
  onmessage: ((event: MessageEvent<WorkerRequest>) => void) | null
  postMessage: (message: WorkerResponse) => void
}

function formatValue(value: unknown): string {
  if (typeof value === 'string') return value
  if (value instanceof Error) return `${value.name}: ${value.message}`
  if (typeof value === 'bigint') return `${value.toString()}n`
  if (typeof value === 'function') return `[Function ${value.name || 'anonymous'}]`
  if (typeof value === 'symbol') return value.toString()
  if (value === undefined) return 'undefined'
  if (value === null) return 'null'
  if (typeof value === 'object') {
    const seen = new WeakSet<object>()
    try {
      return JSON.stringify(value, (_key, item: unknown) => {
        if (typeof item === 'bigint') return `${item.toString()}n`
        if (typeof item === 'object' && item !== null) {
          if (seen.has(item)) return '[Circular]'
          seen.add(item)
        }
        return item
      })
    } catch {
      return String(value)
    }
  }
  return String(value)
}

function formatArgs(args: unknown[]): string {
  return args.map(formatValue).join(' ')
}

function dirname(path: string): string {
  const separator = path.lastIndexOf('/')
  return separator >= 0 ? path.slice(0, separator) : ''
}

function moduleCandidates(path: string): string[] {
  const candidates = [path]
  const extension = path.split('.').pop()?.toLowerCase() ?? ''
  if (extension === 'js' || extension === 'jsx' || extension === 'mjs') {
    candidates.push(path.replace(/\.(?:js|jsx|mjs)$/i, '.ts'))
    candidates.push(path.replace(/\.(?:js|jsx|mjs)$/i, '.tsx'))
  }
  if (!path.includes('.')) {
    candidates.push(`${path}.js`, `${path}.ts`, `${path}.tsx`, `${path}.jsx`, `${path}.mjs`)
  }
  candidates.push(`${path}/index.js`, `${path}/index.ts`, `${path}/index.tsx`)
  return candidates
}

function resolveModulePath(
  files: Map<string, ProjectFile>,
  fromPath: string,
  specifier: string
): string | null {
  if (!specifier.startsWith('.') && !specifier.startsWith('/')) return null
  const base = specifier.startsWith('/') ? '' : dirname(fromPath)
  const parts = [...(base ? base.split('/') : []), ...specifier.replace(/^\/+/, '').split('/')]
  const resolved: string[] = []
  for (const part of parts) {
    if (!part || part === '.') continue
    if (part === '..') resolved.pop()
    else resolved.push(part)
  }
  const normalized = normalizeProjectPath(resolved.join('/'))
  for (const candidate of moduleCandidates(normalized)) {
    if (files.has(candidate)) return candidate
  }
  return null
}

function bundleModules(files: ProjectFile[], entryPath: string): {
  entryUrl: string
  urls: string[]
} {
  const fileMap = new Map(files.map((file) => [file.path, file]))
  const urls = new Map<string, string>()
  const building = new Set<string>()
  const importPattern =
    /((?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s*)(['"]))([^'"]+)\2/g

  const build = (path: string): string => {
    const existing = urls.get(path)
    if (existing) return existing
    if (building.has(path)) {
      throw new Error(`Circular import detected at ${path}. Break the import cycle to run the project.`)
    }
    const file = fileMap.get(path)
    if (!file) throw new Error(`Module ${path} was not found.`)
    building.add(path)

    const source = file.content.replace(importPattern, (match, prefix: string, quote: string, specifier: string) => {
      const dependency = resolveModulePath(fileMap, path, specifier)
      if (!dependency) {
        if (specifier.startsWith('.') || specifier.startsWith('/')) {
          throw new Error(`Could not resolve "${specifier}" from ${path}.`)
        }
        return match
      }
      return `${prefix}${build(dependency)}${quote}`
    })

    building.delete(path)
    const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }))
    urls.set(path, url)
    return url
  }

  const entryUrl = build(entryPath)
  return { entryUrl, urls: [...urls.values()] }
}

async function execute(request: WorkerRequest): Promise<void> {
  const startedAt = performance.now()
  const emit = (level: SandboxLogLevel, text: string): void => {
    scope.postMessage({ type: 'log', level, text })
  }

  const targetConsole = console as unknown as Record<string, (...args: unknown[]) => void>
  const originalConsole = {
    log: console.log.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    debug: console.debug.bind(console)
  }

  targetConsole.log = (...args: unknown[]) => emit('log', formatArgs(args))
  targetConsole.info = (...args: unknown[]) => emit('info', formatArgs(args))
  targetConsole.warn = (...args: unknown[]) => emit('warn', formatArgs(args))
  targetConsole.error = (...args: unknown[]) => emit('error', formatArgs(args))
  targetConsole.debug = (...args: unknown[]) => emit('log', formatArgs(args))

  let urls: string[] = []
  try {
    const entry = request.files.find((file) => file.path === request.entryPath)
    if (!entry) throw new Error(`Entry file ${request.entryPath} was not found.`)

    const language = normalizeLanguage(languageForPath(entry.path, request.language))
    if (language !== 'javascript' && language !== 'typescript') {
      throw new Error(
        `Live execution is available for JavaScript and TypeScript. ${request.language} work can still be saved and submitted for grading.`
      )
    }

    const bundle = bundleModules(request.files, request.entryPath)
    urls = bundle.urls
    await import(/* @vite-ignore */ bundle.entryUrl)
    await new Promise((resolve) => setTimeout(resolve, 250))

    scope.postMessage({ type: 'done', ok: true, durationMs: performance.now() - startedAt })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    emit('error', message)
    scope.postMessage({ type: 'done', ok: false, durationMs: performance.now() - startedAt })
  } finally {
    for (const url of urls) URL.revokeObjectURL(url)
    targetConsole.log = originalConsole.log
    targetConsole.info = originalConsole.info
    targetConsole.warn = originalConsole.warn
    targetConsole.error = originalConsole.error
    targetConsole.debug = originalConsole.debug
  }
}

scope.onmessage = (event: MessageEvent<WorkerRequest>) => {
  void execute(event.data)
}
