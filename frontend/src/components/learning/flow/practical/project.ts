export interface ProjectFile {
  path: string
  content: string
}

export interface PracticalProject {
  version: number
  files: ProjectFile[]
  folders: string[]
  activePath: string
  entryPath: string
}

export interface ProjectSeed {
  starterCode: string
  language: string
  title?: string
  brief?: string
  requirements?: string[]
}

export interface ProjectMutation {
  project: PracticalProject
  error: string | null
}

const PROJECT_VERSION = 2

const LANGUAGE_EXTENSIONS: Record<string, string> = {
  javascript: 'js',
  typescript: 'ts',
  python: 'py',
  sql: 'sql',
  html: 'html',
  css: 'css',
  json: 'json',
  markdown: 'md',
  kotlin: 'kt',
  swift: 'swift',
  dart: 'dart',
  java: 'java',
  csharp: 'cs',
  go: 'go',
  rust: 'rs'
}

const LANGUAGE_ALIASES: Record<string, string> = {
  'html / css': 'html',
  html: 'html',
  css: 'css',
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  py: 'python'
}

const EXTENSION_LANGUAGES: Record<string, string> = {
  js: 'javascript',
  jsx: 'javascript',
  mjs: 'javascript',
  cjs: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  html: 'html',
  htm: 'html',
  css: 'css',
  json: 'json',
  md: 'markdown',
  py: 'python',
  sql: 'sql',
  kt: 'kotlin',
  swift: 'swift',
  dart: 'dart',
  java: 'java',
  cs: 'csharp',
  go: 'go',
  rs: 'rust'
}

const STORAGE_PREFIX = 'career-lab:practical-exam:'

export function normalizeLanguage(language: string): string {
  const normalized = language.trim().toLowerCase()
  return LANGUAGE_ALIASES[normalized] ?? normalized
}

export function extensionForLanguage(language: string): string {
  return LANGUAGE_EXTENSIONS[normalizeLanguage(language)] ?? 'txt'
}

export function languageForPath(path: string, fallback: string): string {
  const extension = path.split('.').pop()?.toLowerCase() ?? ''
  return EXTENSION_LANGUAGES[extension] ?? normalizeLanguage(fallback)
}

export function storageKey(examPublicId: string): string {
  return `${STORAGE_PREFIX}${examPublicId}`
}

export function normalizeProjectPath(path: string): string {
  return path
    .trim()
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(/\/{2,}/g, '/')
    .split('/')
    .filter((part) => part.length > 0 && part !== '.')
    .join('/')
}

export function isValidProjectPath(path: string): boolean {
  if (!path || path.endsWith('/')) return false
  if (path.split('/').some((part) => part === '..' || part === '.' || part.length === 0)) return false
  return /^[\w./-]+\.[\w-]+$/.test(path)
}

export function isValidProjectFolderPath(path: string): boolean {
  if (!path || path.endsWith('/')) return false
  if (path.split('/').some((part) => part === '..' || part === '.' || part.length === 0)) return false
  return /^[\w.-]+(?:\/[\w.-]+)*$/.test(path)
}

function parentFolders(path: string): string[] {
  const parts = path.split('/')
  parts.pop()
  const folders: string[] = []
  let current = ''
  for (const part of parts) {
    current = current ? `${current}/${part}` : part
    folders.push(current)
  }
  return folders
}

function addFolders(folders: Set<string>, paths: string[]): void {
  for (const path of paths) {
    for (const folder of parentFolders(path)) folders.add(folder)
  }
}

function folderPrefix(path: string): string {
  return path ? `${path}/` : ''
}

function isInsideFolder(path: string, folder: string): boolean {
  return path === folder || path.startsWith(folderPrefix(folder))
}

function uniqueFolders(project: PracticalProject): string[] {
  const folders = new Set<string>()
  for (const folder of project.folders) {
    if (isValidProjectFolderPath(folder)) {
      for (const parent of parentFolders(folder)) folders.add(parent)
      folders.add(folder)
    }
  }
  addFolders(folders, project.files.map((file) => file.path))
  return [...folders].sort()
}

function withFolders(project: PracticalProject): PracticalProject {
  return { ...project, folders: uniqueFolders(project) }
}

function cleanRequirements(requirements: string[] | undefined): string[] {
  return (requirements ?? []).filter((item) => item.trim().length > 0).slice(0, 8)
}

function taskTitle(seed: ProjectSeed): string {
  return seed.title?.trim() || 'Practical task'
}

function taskText(seed: ProjectSeed): string {
  return `${seed.title ?? ''} ${seed.brief ?? ''} ${(seed.requirements ?? []).join(' ')}`.toLowerCase()
}

function isWebTask(seed: ProjectSeed): boolean {
  const language = normalizeLanguage(seed.language)
  if (language === 'html' || language === 'css') return true
  if (language !== 'javascript') return false
  return /\b(html|css|dom|stylesheet|responsive|web ?page|landing page|markup)\b/.test(
    taskText(seed)
  )
}

function isSqlTask(seed: ProjectSeed): boolean {
  return normalizeLanguage(seed.language) === 'sql'
}

function fallbackStarter(language: string, title: string, requirements: string[]): string {
  const normalized = normalizeLanguage(language)
  if (normalized === 'python') {
    return [`# Practical exam: ${title}`, ...requirements.map((item) => `# - ${item}`), '', 'def solve():', '    # TODO: implement the task.', '    pass'].join('\n')
  }
  if (normalized === 'sql') {
    return [`-- Practical exam: ${title}`, ...requirements.map((item) => `-- - ${item}`), '', 'SELECT 1;'].join('\n')
  }
  if (normalized === 'html') {
    return [`<!-- Practical exam: ${title} -->`, ...requirements.map((item) => `<!-- - ${item} -->`), '', '<main>', '  <h1>Your solution</h1>', '</main>'].join('\n')
  }
  if (normalized === 'css') {
    return [`/* Practical exam: ${title} */`, ...requirements.map((item) => `/* - ${item} */`), '', 'body {', '  margin: 0;', '}'].join('\n')
  }
  return [`// Practical exam: ${title}`, ...requirements.map((item) => `// - ${item}`), '', 'function solve() {', '  // TODO: implement the task.', '}', '', 'solve()'].join('\n')
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      default:
        return '&#39;'
    }
  })
}

function indent(value: string, spaces: string): string {
  return value
    .split('\n')
    .map((line) => (line.length > 0 ? `${spaces}${line}` : line))
    .join('\n')
}

function ensureWebLinks(html: string): string {
  let next = html
  if (!/<link[^>]+href=["'][^"']*styles?\.css["']/i.test(next)) {
    const link = '  <link rel="stylesheet" href="./styles.css" />'
    if (/<\/head>/i.test(next)) {
      next = next.replace(/<\/head>/i, `${link}\n</head>`)
    } else if (/<body[^>]*>/i.test(next)) {
      next = next.replace(/<body[^>]*>/i, (match) => `${match}\n${link}`)
    } else {
      next = `${link}\n${next}`
    }
  }
  if (!/<script[^>]+src=["'][^"']*script\.js["']/i.test(next)) {
    const script = '  <script src="./script.js"></script>'
    if (/<\/body>/i.test(next)) {
      next = next.replace(/<\/body>/i, `${script}\n</body>`)
    } else {
      next = `${next}\n${script}`
    }
  }
  return next
}

function extractWebAssets(html: string): {
  html: string
  styles: string[]
  scripts: string[]
} {
  const styles: string[] = []
  const scripts: string[] = []
  const markup = html
    .replace(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi, (_match, content: string) => {
      styles.push(content.trim())
      return ''
    })
    .replace(
      /<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script\s*>/gi,
      (_match, content: string) => {
        scripts.push(content.trim())
        return ''
      }
    )
  return { html: markup, styles, scripts }
}

function wrapWebDocument(html: string, title: string): string {
  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="utf-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1" />',
    `  <title>${escapeHtml(title)}</title>`,
    '  <link rel="stylesheet" href="./styles.css" />',
    '</head>',
    '<body>',
    indent(html, '  '),
    '  <script src="./script.js"></script>',
    '</body>',
    '</html>'
  ].join('\n')
}

function webStyles(seed: ProjectSeed): string {
  const requirements = cleanRequirements(seed.requirements)
  return [
    `/* Practical exam: ${taskTitle(seed)}`,
    ...requirements.map((item) => ` * - ${item}`),
    ' */',
    '',
    ':root {',
    '  color-scheme: light;',
    '  font-family: system-ui, sans-serif;',
    '}',
    '',
    'body {',
    '  margin: 0;',
    '  padding: 2rem;',
    '}',
    '',
    '/* TODO: add the styles required by the brief. */'
  ].join('\n')
}

function webScript(seed: ProjectSeed, starterCode: string): string {
  if (starterCode.trim().length > 0) return starterCode
  const requirements = cleanRequirements(seed.requirements)
  return [
    `// Practical exam: ${taskTitle(seed)}`,
    ...requirements.map((item) => `// - ${item}`),
    '',
    "document.addEventListener('DOMContentLoaded', () => {",
    '  // TODO: wire up the behaviour required by the brief.',
    '})'
  ].join('\n')
}

function webProject(seed: ProjectSeed): PracticalProject {
  const language = normalizeLanguage(seed.language)
  const title = taskTitle(seed)
  const starter = seed.starterCode.trim()
  let html = ''
  let styles = webStyles(seed)
  let script = ''

  if (language === 'html' || /<(!doctype|html|body|main|section|div|h1)\b/i.test(starter)) {
    const starterMarkup = /<html[\s>]/i.test(starter)
      ? starter
      : wrapWebDocument(starter || '<main>\n  <h1>Your solution</h1>\n</main>', title)
    const assets = extractWebAssets(starterMarkup)
    html = ensureWebLinks(assets.html)
    if (assets.styles.length > 0) styles = `${assets.styles.join('\n\n')}\n\n${styles}`
    script = assets.scripts.length > 0 ? assets.scripts.join('\n\n') : webScript(seed, '')
  } else if (language === 'css') {
    styles = starter.length > 0 ? starter : styles
    html = wrapWebDocument('<main>\n  <h1>Your solution</h1>\n</main>', title)
    script = webScript(seed, '')
  } else {
    html = wrapWebDocument('<main>\n  <h1>Your solution</h1>\n</main>', title)
    script = webScript(seed, seed.starterCode)
  }

  const files: ProjectFile[] = [
    { path: 'index.html', content: html },
    { path: 'styles.css', content: styles },
    { path: 'script.js', content: script }
  ]
  return withFolders({
    version: PROJECT_VERSION,
    files,
    folders: [],
    activePath: 'index.html',
    entryPath: 'index.html'
  })
}

function sqlProject(seed: ProjectSeed): PracticalProject {
  const title = taskTitle(seed)
  const requirements = cleanRequirements(seed.requirements)
  const starter = seed.starterCode.trim().length > 0
    ? seed.starterCode
    : fallbackStarter('sql', title, requirements)
  const schema = [
    `-- Practical exam: ${title}`,
    ...requirements.map((item) => `-- - ${item}`),
    '',
    '-- Add or inspect the supporting schema here.',
    '-- Write the required query in queries/query.sql.'
  ].join('\n')
  const files: ProjectFile[] = [
    { path: 'schema.sql', content: schema },
    { path: 'queries/query.sql', content: starter }
  ]
  return withFolders({
    version: PROJECT_VERSION,
    files,
    folders: ['queries'],
    activePath: 'queries/query.sql',
    entryPath: 'queries/query.sql'
  })
}

function scriptProject(seed: ProjectSeed): PracticalProject {
  const language = normalizeLanguage(seed.language)
  const title = taskTitle(seed)
  const requirements = cleanRequirements(seed.requirements)
  const extension = extensionForLanguage(language)
  const entryPath = `src/solution.${extension}`
  const starter = seed.starterCode.trim().length > 0
    ? seed.starterCode
    : fallbackStarter(language, title, requirements)
  const files: ProjectFile[] = [{ path: entryPath, content: starter }]
  if (['javascript', 'typescript', 'python'].includes(language)) {
    const helper = [
      language === 'python' ? `# Shared helpers for ${title}` : `// Shared helpers for ${title}`,
      '',
      language === 'python' ? '# TODO: add reusable functions and import them from solution.py.' : '// TODO: add reusable functions and import them from the solution file.',
      'export {}'
    ]
    files.push({
      path: `src/helpers.${extension}`,
      content: language === 'python' ? helper.filter((line) => line !== 'export {}').join('\n') : helper.join('\n')
    })
  }
  return withFolders({
    version: PROJECT_VERSION,
    files,
    folders: [],
    activePath: entryPath,
    entryPath
  })
}

export function defaultProject(seed: ProjectSeed): PracticalProject {
  if (isSqlTask(seed)) return sqlProject(seed)
  if (isWebTask(seed)) return webProject(seed)
  return scriptProject(seed)
}

function submissionHeaderPath(line: string): string | null {
  const patterns = [
    /^\/\/\s+([\w./-]+\.[\w-]+)\s*$/,
    /^#\s+([\w./-]+\.[\w-]+)\s*$/,
    /^--\s+([\w./-]+\.[\w-]+)\s*$/,
    /^\/\*\s+([\w./-]+\.[\w-]+)\s*\*\/\s*$/,
    /^<!--\s+([\w./-]+\.[\w-]+)\s*-->\s*$/
  ]
  for (const pattern of patterns) {
    const match = line.match(pattern)
    if (match?.[1]) return normalizeProjectPath(match[1])
  }
  return null
}

export function projectFromSubmission(submission: string, seed: ProjectSeed): PracticalProject {
  const template = defaultProject(seed)
  const lines = submission.replace(/\r\n/g, '\n').split('\n')
  const sections: Array<{ path: string; lines: string[] }> = []
  let current: { path: string; lines: string[] } | null = null

  for (const line of lines) {
    const path = submissionHeaderPath(line)
    if (path && isValidProjectPath(path)) {
      if (current) sections.push(current)
      current = { path, lines: [] }
      continue
    }
    if (current) current.lines.push(line)
  }
  if (current) sections.push(current)

  if (sections.length === 0) {
    return withFolders({
      ...template,
      files: template.files.map((file) =>
        file.path === template.entryPath ? { ...file, content: submission } : file
      )
    })
  }

  const templateFiles = new Map(template.files.map((file) => [file.path, file.content]))
  for (const section of sections) {
    templateFiles.set(
      section.path,
      section.lines.join('\n').replace(/^\n+/, '').replace(/\n+$/, '')
    )
  }
  const files = [...templateFiles.entries()].map(([path, content]) => ({ path, content }))
  const entryPath = sections[0]!.path
  return withFolders({
    version: PROJECT_VERSION,
    files,
    folders: template.folders,
    activePath: entryPath,
    entryPath
  })
}

export function addProjectFile(project: PracticalProject, path: string): ProjectMutation {
  const normalized = normalizeProjectPath(path)
  if (!isValidProjectPath(normalized)) {
    return { project, error: 'Use a file path with an extension, for example src/helpers.ts.' }
  }
  if (project.files.some((file) => file.path === normalized)) {
    return { project, error: 'That file already exists.' }
  }
  if (uniqueFolders(project).includes(normalized)) {
    return { project, error: 'A folder already uses that path.' }
  }
  const next: PracticalProject = {
    ...project,
    files: [...project.files, { path: normalized, content: '' }],
    activePath: normalized
  }
  return { project: withFolders(next), error: null }
}

export function addProjectFolder(project: PracticalProject, path: string): ProjectMutation {
  const normalized = normalizeProjectPath(path)
  if (!isValidProjectFolderPath(normalized)) {
    return { project, error: 'Use a folder path like src/components.' }
  }
  if (uniqueFolders(project).includes(normalized)) {
    return { project, error: 'That folder already exists.' }
  }
  if (project.files.some((file) => file.path === normalized)) {
    return { project, error: 'A file already uses that path.' }
  }
  return {
    project: withFolders({ ...project, folders: [...project.folders, normalized] }),
    error: null
  }
}

export function renameProjectFile(
  project: PracticalProject,
  path: string,
  nextPath: string
): ProjectMutation {
  if (!project.files.some((file) => file.path === path)) {
    return { project, error: 'That file was not found.' }
  }
  const normalized = normalizeProjectPath(nextPath)
  if (!isValidProjectPath(normalized)) {
    return { project, error: 'Use a file path with an extension, for example src/helpers.ts.' }
  }
  if (normalized === path) return { project, error: null }
  if (project.files.some((file) => file.path === normalized)) {
    return { project, error: 'That file already exists.' }
  }
  if (uniqueFolders(project).includes(normalized)) {
    return { project, error: 'A folder already uses that path.' }
  }
  const next: PracticalProject = {
    ...project,
    files: project.files.map((file) =>
      file.path === path ? { ...file, path: normalized } : file
    ),
    entryPath: project.entryPath === path ? normalized : project.entryPath,
    activePath: project.activePath === path ? normalized : project.activePath
  }
  return { project: withFolders(next), error: null }
}

export function renameProjectFolder(
  project: PracticalProject,
  path: string,
  nextPath: string
): ProjectMutation {
  const normalized = normalizeProjectPath(nextPath)
  if (!isValidProjectFolderPath(normalized)) {
    return { project, error: 'Use a folder path like src/components.' }
  }
  if (normalized === path) return { project, error: null }
  if (isInsideFolder(normalized, path)) {
    return { project, error: 'A folder cannot be moved inside itself.' }
  }
  const folders = uniqueFolders(project)
  if (folders.includes(normalized)) {
    return { project, error: 'That folder already exists.' }
  }
  if (project.files.some((file) => file.path === normalized)) {
    return { project, error: 'A file already uses that path.' }
  }
  const replace = (value: string): string =>
    value === path || value.startsWith(folderPrefix(path))
      ? `${normalized}${value.slice(path.length)}`
      : value
  const next: PracticalProject = {
    ...project,
    files: project.files.map((file) => ({ ...file, path: replace(file.path) })),
    folders: project.folders.map(replace),
    entryPath: replace(project.entryPath),
    activePath: replace(project.activePath)
  }
  return { project: withFolders(next), error: null }
}

function entryPriority(path: string): number {
  const extension = path.split('.').pop()?.toLowerCase() ?? ''
  if (extension === 'html') return 0
  if (['js', 'jsx', 'mjs', 'ts', 'tsx'].includes(extension)) return 1
  if (['py', 'sql'].includes(extension)) return 2
  if (extension === 'css') return 3
  return 4
}

function pickEntryPath(files: ProjectFile[]): string {
  return [...files].sort((a, b) => entryPriority(a.path) - entryPriority(b.path))[0]?.path ?? ''
}

export function deleteProjectFile(project: PracticalProject, path: string): ProjectMutation {
  const remaining = project.files.filter((file) => file.path !== path)
  if (remaining.length === project.files.length) {
    return { project, error: 'That file was not found.' }
  }
  if (remaining.length === 0) {
    return { project, error: 'Keep at least one file in the workspace.' }
  }
  const entryPath = project.entryPath === path ? pickEntryPath(remaining) : project.entryPath
  const activePath = project.activePath === path ? entryPath : project.activePath
  return {
    project: withFolders({ ...project, files: remaining, entryPath, activePath }),
    error: null
  }
}

export function deleteProjectFolder(project: PracticalProject, path: string): ProjectMutation {
  const remaining = project.files.filter((file) => !file.path.startsWith(folderPrefix(path)))
  if (remaining.length === 0 && project.files.length > 0) {
    return { project, error: 'Keep at least one file in the workspace.' }
  }
  const entryPath = remaining.some((file) => file.path === project.entryPath)
    ? project.entryPath
    : pickEntryPath(remaining)
  const activePath = remaining.some((file) => file.path === project.activePath)
    ? project.activePath
    : entryPath
  return {
    project: withFolders({
      ...project,
      files: remaining,
      folders: project.folders.filter(
        (folder) => folder !== path && !folder.startsWith(folderPrefix(path))
      ),
      entryPath,
      activePath
    }),
    error: null
  }
}

export function updateProjectFile(
  project: PracticalProject,
  path: string,
  content: string
): PracticalProject {
  return {
    ...project,
    files: project.files.map((file) => (file.path === path ? { ...file, content } : file))
  }
}

export function selectProjectFile(project: PracticalProject, path: string): PracticalProject {
  if (!project.files.some((file) => file.path === path)) return project
  return { ...project, activePath: path }
}

export function selectProjectEntry(project: PracticalProject, path: string): PracticalProject {
  if (!project.files.some((file) => file.path === path)) return project
  return { ...project, activePath: path, entryPath: path }
}

function mergeTemplate(project: PracticalProject, template: PracticalProject): PracticalProject {
  const paths = new Set(project.files.map((file) => file.path))
  const files = [...project.files]
  for (const file of template.files) {
    if (!paths.has(file.path)) files.push(file)
  }
  return withFolders({
    ...project,
    files,
    folders: [...project.folders, ...template.folders],
    entryPath: files.some((file) => file.path === project.entryPath)
      ? project.entryPath
      : template.entryPath,
    activePath: files.some((file) => file.path === project.activePath)
      ? project.activePath
      : template.entryPath
  })
}

export function readStoredProject(
  examPublicId: string,
  seed: ProjectSeed
): PracticalProject | null {
  try {
    const raw = window.localStorage.getItem(storageKey(examPublicId))
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<PracticalProject>
    if (!Array.isArray(parsed.files) || parsed.files.length === 0) return null
    const seen = new Set<string>()
    const files: ProjectFile[] = []
    for (const file of parsed.files) {
      if (typeof file?.path !== 'string' || typeof file?.content !== 'string') continue
      const path = normalizeProjectPath(file.path)
      if (!isValidProjectPath(path) || seen.has(path)) continue
      seen.add(path)
      files.push({ path, content: file.content })
    }
    if (files.length === 0) return null
    const template = defaultProject(seed)
    const stored: PracticalProject = {
      version: typeof parsed.version === 'number' ? parsed.version : 1,
      files,
      folders: Array.isArray(parsed.folders)
        ? parsed.folders
            .filter((folder): folder is string => typeof folder === 'string')
            .map(normalizeProjectPath)
            .filter(isValidProjectFolderPath)
        : [],
      entryPath:
        typeof parsed.entryPath === 'string' && files.some((file) => file.path === parsed.entryPath)
          ? parsed.entryPath
          : template.entryPath,
      activePath:
        typeof parsed.activePath === 'string' && files.some((file) => file.path === parsed.activePath)
          ? parsed.activePath
          : template.activePath
    }
    if (stored.version < PROJECT_VERSION) {
      if (files.length === 1) {
        return defaultProject({ ...seed, starterCode: files[0]!.content })
      }
      return mergeTemplate({ ...stored, version: PROJECT_VERSION }, template)
    }
    return withFolders(stored)
  } catch {
    return null
  }
}

export function persistProject(examPublicId: string, project: PracticalProject): void {
  try {
    window.localStorage.setItem(storageKey(examPublicId), JSON.stringify(project))
  } catch {}
}

export function clearStoredProject(examPublicId: string): void {
  try {
    window.localStorage.removeItem(storageKey(examPublicId))
  } catch {}
}

function commentForPath(path: string, language: string): string {
  const normalized = languageForPath(path, language)
  if (normalized === 'html') return `<!-- ${path} -->`
  if (normalized === 'css') return `/* ${path} */`
  if (normalized === 'python') return `# ${path}`
  if (normalized === 'sql') return `-- ${path}`
  return `// ${path}`
}

export function assembleSubmission(project: PracticalProject, language: string): string {
  const entry = project.files.find((file) => file.path === project.entryPath)
  const others = project.files.filter((file) => file.path !== project.entryPath)
  if (others.length === 0) return entry?.content ?? ''
  return [entry, ...others]
    .filter((file): file is ProjectFile => Boolean(file))
    .map((file) => `${commentForPath(file.path, language)}\n${file.content}`)
    .join('\n\n')
}
