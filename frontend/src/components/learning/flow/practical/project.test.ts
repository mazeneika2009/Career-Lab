import { beforeEach, describe, expect, it } from 'vitest'
import {
  addProjectFile,
  addProjectFolder,
  assembleSubmission,
  defaultProject,
  deleteProjectFile,
  deleteProjectFolder,
  projectFromSubmission,
  readStoredProject,
  renameProjectFile,
  renameProjectFolder,
  selectProjectEntry,
  storageKey,
  type ProjectSeed
} from './project'

function seed(overrides: Partial<ProjectSeed> = {}): ProjectSeed {
  return {
    starterCode: '',
    language: 'javascript',
    title: 'Implement a queue',
    requirements: ['Use an array', 'Export a class'],
    ...overrides
  }
}

beforeEach(() => {
  window.localStorage.clear()
})

describe('defaultProject', () => {
  it('creates separate HTML, CSS and JS files for web tasks', () => {
    const project = defaultProject(
      seed({
        language: 'html',
        title: 'Build a landing page',
        starterCode: '<main><h1>Hello</h1></main>'
      })
    )

    expect(project.entryPath).toBe('index.html')
    expect(project.files.map((file) => file.path)).toEqual([
      'index.html',
      'styles.css',
      'script.js'
    ])
    const html = project.files.find((file) => file.path === 'index.html')!.content
    expect(html).toContain('href="./styles.css"')
    expect(html).toContain('src="./script.js"')
    expect(html).not.toContain('function')
    expect(project.files.find((file) => file.path === 'script.js')!.content).toContain(
      'DOMContentLoaded'
    )
  })

  it('moves inline starter styles and scripts into their dedicated web files', () => {
    const project = defaultProject(
      seed({
        language: 'html',
        title: 'Build a dashboard',
        starterCode:
          '<!doctype html><html><head><style>body { color: red; }</style></head><body><main>Hello</main><script>window.ready = true</script></body></html>'
      })
    )
    const html = project.files.find((file) => file.path === 'index.html')!.content
    const css = project.files.find((file) => file.path === 'styles.css')!.content
    const js = project.files.find((file) => file.path === 'script.js')!.content

    expect(html).not.toContain('<style')
    expect(html).not.toContain('<script>')
    expect(html).toContain('href="./styles.css"')
    expect(html).toContain('src="./script.js"')
    expect(css).toContain('body { color: red; }')
    expect(js).toContain('window.ready = true')
  })

  it('keeps JavaScript web starter code out of the HTML file', () => {
    const starter = "document.querySelector('h1')!.textContent = 'Ready'"
    const project = defaultProject(
      seed({ language: 'javascript', title: 'Build a web page', starterCode: starter })
    )

    expect(project.files.map((file) => file.path)).toEqual([
      'index.html',
      'styles.css',
      'script.js'
    ])
    expect(project.files.find((file) => file.path === 'script.js')!.content).toBe(starter)
    expect(project.files.find((file) => file.path === 'index.html')!.content).not.toContain(
      'querySelector'
    )
  })

  it('creates schema and query files for SQL tasks', () => {
    const project = defaultProject(
      seed({ language: 'sql', title: 'Report sales', starterCode: 'SELECT * FROM sales;' })
    )

    expect(project.entryPath).toBe('queries/query.sql')
    expect(project.files.map((file) => file.path)).toEqual([
      'schema.sql',
      'queries/query.sql'
    ])
    expect(project.folders).toContain('queries')
  })

  it('creates a solution and helpers file for script tasks', () => {
    const project = defaultProject(seed({ language: 'python' }))

    expect(project.entryPath).toBe('src/solution.py')
    expect(project.files.map((file) => file.path)).toEqual([
      'src/solution.py',
      'src/helpers.py'
    ])
    expect(project.files.find((file) => file.path === 'src/solution.py')!.content).toContain(
      'def solve'
    )
  })
})

describe('project mutations', () => {
  it('creates folders, files and renames both', () => {
    const base = defaultProject(seed())
    const folder = addProjectFolder(base, 'src/components')
    expect(folder.error).toBeNull()
    expect(folder.project.folders).toContain('src/components')

    const file = addProjectFile(folder.project, 'src/components/Button.ts')
    expect(file.error).toBeNull()
    expect(file.project.activePath).toBe('src/components/Button.ts')

    const renamedFile = renameProjectFile(
      file.project,
      'src/components/Button.ts',
      'src/components/Widget.ts'
    )
    expect(renamedFile.error).toBeNull()
    expect(renamedFile.project.activePath).toBe('src/components/Widget.ts')

    const renamedFolder = renameProjectFolder(
      renamedFile.project,
      'src/components',
      'src/ui'
    )
    expect(renamedFolder.error).toBeNull()
    expect(renamedFolder.project.activePath).toBe('src/ui/Widget.ts')
    expect(renamedFolder.project.folders).toContain('src/ui')
  })

  it('lets a custom file become the execution entry', () => {
    const project = defaultProject(seed())
    const customFile = addProjectFile(project, 'src/custom.js').project
    const selected = selectProjectEntry(customFile, 'src/custom.js')

    expect(selected.entryPath).toBe('src/custom.js')
    expect(selected.activePath).toBe('src/custom.js')
  })

  it('prevents duplicate paths and empty workspaces', () => {
    const base = defaultProject(seed())
    expect(addProjectFile(base, 'src/solution.js').error).toContain('already exists')
    expect(addProjectFolder(base, 'src').error).toContain('already exists')
    expect(renameProjectFolder(base, 'src', 'src/nested').error).toContain('inside itself')

    const withoutHelpers = deleteProjectFile(base, 'src/helpers.js')
    expect(withoutHelpers.error).toBeNull()
    expect(deleteProjectFile(withoutHelpers.project, 'src/solution.js').error).toContain(
      'at least one file'
    )
    expect(renameProjectFile(base, 'missing.js', 'src/renamed.js').error).toContain(
      'not found'
    )
  })

  it('moves the entry file when it is deleted or its folder is removed', () => {
    const web = defaultProject(seed({ language: 'html', title: 'Build a page' }))
    const deletedEntry = deleteProjectFile(web, 'index.html')
    expect(deletedEntry.error).toBeNull()
    expect(deletedEntry.project.entryPath).toBe('script.js')

    const sql = defaultProject(seed({ language: 'sql' }))
    const deletedQuery = deleteProjectFolder(sql, 'queries')
    expect(deletedQuery.error).toBeNull()
    expect(deletedQuery.project.entryPath).toBe('schema.sql')
  })
})

describe('submission round trips', () => {
  it('restores separate web files from an assembled submission', () => {
    const task = seed({ language: 'html', title: 'Build a page' })
    const project = defaultProject(task)
    const updated = {
      ...project,
      files: project.files.map((file) =>
        file.path === 'styles.css' ? { ...file, content: 'body { color: red; }' } : file
      )
    }

    const restored = projectFromSubmission(assembleSubmission(updated, 'html'), task)
    expect(restored.entryPath).toBe('index.html')
    expect(restored.files.map((file) => file.path)).toEqual([
      'index.html',
      'styles.css',
      'script.js'
    ])
    expect(restored.files.find((file) => file.path === 'styles.css')!.content).toBe(
      'body { color: red; }'
    )
  })

  it('restores Python files without injecting invalid comment syntax', () => {
    const task = seed({ language: 'python', title: 'Implement a queue' })
    const project = defaultProject(task)
    const submission = assembleSubmission(project, 'python')

    expect(submission).toContain('# src/solution.py')
    expect(submission).not.toContain('-- src/solution.py')
    const restored = projectFromSubmission(submission, task)
    expect(restored.entryPath).toBe('src/solution.py')
    expect(restored.files.find((file) => file.path === 'src/helpers.py')).toBeTruthy()
  })
})

describe('stored project migration', () => {
  it('migrates a single-file draft into the current template', () => {
    const task = seed()
    window.localStorage.setItem(
      storageKey('exam-1'),
      JSON.stringify({
        version: 1,
        files: [{ path: 'solution.js', content: 'console.log("saved")' }],
        activePath: 'solution.js',
        entryPath: 'solution.js'
      })
    )

    const restored = readStoredProject('exam-1', task)
    expect(restored).not.toBeNull()
    expect(restored!.entryPath).toBe('src/solution.js')
    expect(restored!.files.map((file) => file.path)).toEqual([
      'src/solution.js',
      'src/helpers.js'
    ])
    expect(restored!.files.find((file) => file.path === 'src/solution.js')!.content).toBe(
      'console.log("saved")'
    )
  })
})
