import { useMemo, useState } from 'react'
import { cn } from '../../../../utils/cn'
import { Icon } from '../../../ui/icon/Icon'
import type { PracticalProject, ProjectFile } from './project'

type ItemKind = 'file' | 'folder'

interface CreateState {
  kind: ItemKind
  parent: string
}

interface RenameState {
  kind: ItemKind
  path: string
}

export function ProjectFileTree({
  project,
  dark,
  onSelect,
  onSetEntry,
  onAddFile,
  onAddFolder,
  onRenameFile,
  onRenameFolder,
  onDeleteFile,
  onDeleteFolder,
  className
}: {
  project: PracticalProject
  dark: boolean
  onSelect: (path: string) => void
  onSetEntry: (path: string) => void
  onAddFile: (path: string) => string | null
  onAddFolder: (path: string) => string | null
  onRenameFile: (path: string, nextPath: string) => string | null
  onRenameFolder: (path: string, nextPath: string) => string | null
  onDeleteFile: (path: string) => string | null
  onDeleteFolder: (path: string) => string | null
  className?: string
}): React.JSX.Element {
  const [creating, setCreating] = useState<CreateState | null>(null)
  const [createPath, setCreatePath] = useState('')
  const [renaming, setRenaming] = useState<RenameState | null>(null)
  const [renamePath, setRenamePath] = useState('')
  const [error, setError] = useState<string | null>(null)

  const tree = useMemo(() => {
    const folders = new Set(project.folders)
    for (const file of project.files) {
      const parts = file.path.split('/')
      parts.pop()
      let current = ''
      for (const part of parts) {
        current = current ? `${current}/${part}` : part
        folders.add(current)
      }
    }
    const byFolder = new Map<string, ProjectFile[]>()
    for (const file of project.files) {
      const separator = file.path.lastIndexOf('/')
      const folder = separator >= 0 ? file.path.slice(0, separator) : ''
      const bucket = byFolder.get(folder)
      if (bucket) bucket.push(file)
      else byFolder.set(folder, [file])
    }
    return {
      folders: [...folders].sort((left, right) => left.localeCompare(right)),
      rootFiles: (byFolder.get('') ?? []).slice().sort((left, right) => left.path.localeCompare(right.path)),
      byFolder
    }
  }, [project.files, project.folders])

  const startCreate = (kind: ItemKind, parent = ''): void => {
    setCreating({ kind, parent })
    setCreatePath(parent ? `${parent}/` : '')
    setRenaming(null)
    setError(null)
  }

  const startRename = (kind: ItemKind, path: string): void => {
    setRenaming({ kind, path })
    setRenamePath(path)
    setCreating(null)
    setError(null)
  }

  const cancel = (): void => {
    setCreating(null)
    setRenaming(null)
    setCreatePath('')
    setRenamePath('')
    setError(null)
  }

  const submitCreate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (!creating) return
    const nextError =
      creating.kind === 'file' ? onAddFile(createPath) : onAddFolder(createPath)
    if (nextError) {
      setError(nextError)
      return
    }
    cancel()
  }

  const submitRename = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (!renaming) return
    const nextError =
      renaming.kind === 'file'
        ? onRenameFile(renaming.path, renamePath)
        : onRenameFolder(renaming.path, renamePath)
    if (nextError) {
      setError(nextError)
      return
    }
    cancel()
  }

  const deleteFolder = (path: string): void => {
    const confirmed = window.confirm(
      `Delete ${path} and every file inside it? This cannot be undone.`
    )
    if (!confirmed) return
    const nextError = onDeleteFolder(path)
    if (nextError) setError(nextError)
  }

  const renderCreateForm = (): React.JSX.Element => {
    const folder = creating?.kind === 'folder'
    return (
      <form
        onSubmit={submitCreate}
        className={cn(
          'border-b px-3 py-2.5',
          dark ? 'border-white/10 bg-[#14211d]' : 'border-border bg-surface/60'
        )}
      >
        <label htmlFor="new-project-path" className="sr-only">
          {folder ? 'New folder path' : 'New file path'}
        </label>
        <input
          id="new-project-path"
          autoFocus
          value={createPath}
          onChange={(event) => {
            setCreatePath(event.target.value)
            setError(null)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') cancel()
          }}
          placeholder={folder ? 'src/components' : 'src/helpers.ts'}
          className={cn(
            'h-8 w-full rounded-lg border px-2 font-mono text-xs outline-none transition-colors focus:border-accent/50',
            dark
              ? 'border-white/10 bg-[#0f1a17] text-[#e2ece7] placeholder:text-[#8fa39a]/60'
              : 'border-border bg-surface text-primary placeholder:text-primary/30'
          )}
        />
        {error ? (
          <p role="alert" className="mt-1.5 text-[11px] leading-snug text-attention">
            {error}
          </p>
        ) : null}
        <div className="mt-1.5 flex items-center gap-1.5">
          <button
            type="submit"
            disabled={createPath.trim().length === 0}
            className={cn(
              'rounded-lg px-2.5 py-1.5 text-[11px] font-semibold disabled:opacity-40',
              dark
                ? 'bg-[#d8e5df] text-[#14211d] hover:bg-white'
                : 'bg-primary text-surface'
            )}
          >
            Create
          </button>
          <button
            type="button"
            onClick={cancel}
            className={cn(
              'rounded-lg px-2 py-1.5 text-[11px] font-medium',
              dark
                ? 'text-[#9aada3] hover:bg-white/[0.08] hover:text-[#e2ece7]'
                : 'text-primary/50 hover:bg-primary/[0.05] hover:text-primary'
            )}
          >
            Cancel
          </button>
        </div>
      </form>
    )
  }

  const renderRenameForm = (): React.JSX.Element => (
    <form onSubmit={submitRename} className="px-1.5 py-1">
      <label htmlFor="rename-project-path" className="sr-only">
        Rename path
      </label>
      <input
        id="rename-project-path"
        autoFocus
        value={renamePath}
        onChange={(event) => {
          setRenamePath(event.target.value)
          setError(null)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') cancel()
        }}
        className={cn(
          'h-7 w-full rounded-md border border-accent/40 px-1.5 font-mono text-[11px] outline-none',
          dark ? 'bg-[#0f1a17] text-[#e2ece7]' : 'bg-surface text-primary'
        )}
      />
      {error ? (
        <p role="alert" className="mt-1 text-[10px] leading-snug text-attention">
          {error}
        </p>
      ) : null}
      <div className="mt-1 flex items-center gap-1">
        <button
          type="submit"
          disabled={renamePath.trim().length === 0}
          className={cn(
            'rounded-md px-1.5 py-0.5 text-[10px] font-semibold disabled:opacity-40',
            dark ? 'bg-[#d8e5df] text-[#14211d]' : 'bg-primary text-surface'
          )}
        >
          Save
        </button>
        <button
          type="button"
          onClick={cancel}
          className={cn(
            'rounded px-1.5 py-0.5 text-[10px] font-medium',
            dark ? 'text-[#9aada3] hover:text-[#e2ece7]' : 'text-primary/50 hover:text-primary'
          )}
        >
          Cancel
        </button>
      </div>
    </form>
  )

  const renderFile = (file: ProjectFile, depth: number): React.JSX.Element => {
    const active = file.path === project.activePath
    const name = file.path.split('/').pop() ?? file.path
    const isEntry = file.path === project.entryPath
    const isRenaming = renaming?.kind === 'file' && renaming.path === file.path
    return (
      <li key={file.path}>
        {isRenaming ? (
          renderRenameForm()
        ) : (
          <div
            className={cn(
              'group flex items-center gap-0.5 rounded-md',
              dark
                ? active
                  ? 'bg-[#263a33] text-[#e2ece7]'
                  : 'hover:bg-white/[0.06]'
                : active
                  ? 'bg-primary text-surface'
                  : 'hover:bg-primary/[0.045]'
            )}
            style={{ marginLeft: depth * 8 }}
          >
            <button
              type="button"
              onClick={() => onSelect(file.path)}
              title={file.path}
              className={cn(
                'flex min-w-0 flex-1 items-center gap-1.5 px-2 py-1.5 text-left text-xs',
                dark
                  ? active
                    ? 'text-[#e2ece7]'
                    : 'text-[#c2d0c9]/75'
                  : active
                    ? 'text-surface'
                    : 'text-primary/75'
              )}
            >
              <Icon
                name="file-text"
                className={cn(
                  'h-3.5 w-3.5 shrink-0',
                  dark
                    ? active
                      ? 'text-[#c2d0c9]'
                      : 'text-[#9aada3]/60'
                    : active
                      ? 'text-surface/75'
                      : 'text-primary/35'
                )}
              />
              <span className="truncate font-mono">{name}</span>
            </button>
            {!isEntry ? (
              <button
                type="button"
                aria-label={`Set ${file.path} as entry`}
                title={`Set ${file.path} as entry`}
                onClick={() => onSetEntry(file.path)}
                className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100',
                  dark
                    ? 'text-[#9aada3]/70 hover:bg-white/10 hover:text-[#e2ece7]'
                    : active
                      ? 'text-surface/60 hover:bg-surface/15 hover:text-surface'
                      : 'text-primary/35 hover:bg-primary/[0.08] hover:text-accent'
                )}
              >
                <Icon name="play" className="h-3 w-3" />
              </button>
            ) : null}
            <button
              type="button"
              aria-label={`Rename ${file.path}`}
              title={`Rename ${file.path}`}
              onClick={() => startRename('file', file.path)}
              className={cn(
                'flex h-5 w-5 shrink-0 items-center justify-center rounded opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100',
                dark
                  ? 'text-[#9aada3]/70 hover:bg-white/10 hover:text-[#e2ece7]'
                  : active
                    ? 'text-surface/60 hover:bg-surface/15 hover:text-surface'
                    : 'text-primary/40 hover:bg-primary/[0.08] hover:text-primary'
              )}
            >
              <Icon name="edit" className="h-3 w-3" />
            </button>
            <button
              type="button"
              aria-label={`Delete ${file.path}`}
              title={`Delete ${file.path}`}
              onClick={() => {
                const nextError = onDeleteFile(file.path)
                if (nextError) setError(nextError)
              }}
              className={cn(
                'mr-1 flex h-5 w-5 shrink-0 items-center justify-center rounded opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100',
                dark
                  ? 'text-[#9aada3]/70 hover:bg-white/10 hover:text-[#ff9b85]'
                  : active
                    ? 'text-surface/60 hover:bg-surface/15 hover:text-surface'
                    : 'text-primary/40 hover:bg-primary/[0.08] hover:text-attention'
              )}
            >
              <Icon name="close" className="h-3 w-3" />
            </button>
          </div>
        )}
      </li>
    )
  }

  return (
    <aside
      aria-label="Project files"
      className={cn(
        'flex min-h-0 flex-col border-r transition-colors duration-200',
        dark ? 'border-white/10 bg-[#111c18]' : 'border-border bg-bg/30',
        className
      )}
    >
      <header
        className={cn(
          'flex items-center justify-between gap-1 border-b px-3 py-2.5',
          dark ? 'border-white/10' : 'border-border'
        )}
      >
        <span
          className={cn(
            'text-[10px] font-semibold uppercase tracking-[0.14em]',
            dark ? 'text-[#9aada3]' : 'text-primary/45'
          )}
        >
          Explorer
        </span>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            aria-label="New file"
            title="New file"
            onClick={() => startCreate('file')}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-lg transition-colors',
              dark
                ? 'text-[#9aada3] hover:bg-white/[0.08] hover:text-[#e2ece7]'
                : 'text-primary/50 hover:bg-primary/[0.06] hover:text-primary'
            )}
          >
            <Icon name="file-plus" className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="New folder"
            title="New folder"
            onClick={() => startCreate('folder')}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-lg transition-colors',
              dark
                ? 'text-[#9aada3] hover:bg-white/[0.08] hover:text-[#e2ece7]'
                : 'text-primary/50 hover:bg-primary/[0.06] hover:text-primary'
            )}
          >
            <Icon name="folder-plus" className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {creating ? renderCreateForm() : null}
      {error && !creating && !renaming ? (
        <p role="alert" className="border-b border-border px-2.5 py-1.5 text-[11px] text-attention">
          {error}
        </p>
      ) : null}

      <div className="min-h-0 flex-1 overflow-y-auto p-1.5">
        {tree.rootFiles.length > 0 ? (
          <ul className="mb-1 space-y-0.5">{tree.rootFiles.map((file) => renderFile(file, 0))}</ul>
        ) : null}

        {tree.folders.map((folder) => {
          const files = (tree.byFolder.get(folder) ?? [])
            .slice()
            .sort((left, right) => left.path.localeCompare(right.path))
          const depth = folder.split('/').length - 1
          const name = folder.split('/').pop() ?? folder
          const isRenaming = renaming?.kind === 'folder' && renaming.path === folder
          const hasChildFolder = tree.folders.some((candidate) =>
            candidate.startsWith(`${folder}/`)
          )
          return (
            <section key={folder} className="mb-1">
              {isRenaming ? (
                renderRenameForm()
              ) : (
                <div
                  className={cn(
                    'group flex items-center gap-0.5 rounded-md',
                    dark ? 'hover:bg-white/[0.06]' : 'hover:bg-primary/[0.045]'
                  )}
                  style={{ marginLeft: depth * 8 }}
                >
                  <button
                    type="button"
                    onClick={() => startCreate('file', folder)}
                    title={`New file in ${folder}`}
                    className={cn(
                      'flex min-w-0 flex-1 items-center gap-1.5 px-2 py-1 text-left text-[10px] font-semibold uppercase tracking-[0.1em]',
                      dark ? 'text-[#9aada3] hover:text-[#e2ece7]' : 'text-primary/40 hover:text-primary/65'
                    )}
                  >
                    <Icon
                      name="folder"
                      className={cn('h-3 w-3 shrink-0', dark && 'text-[#9aada3]')}
                    />
                    <span className="truncate">{name}</span>
                  </button>
                  <button
                    type="button"
                    aria-label={`Rename ${folder}`}
                    title={`Rename ${folder}`}
                    onClick={() => startRename('folder', folder)}
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100',
                      dark
                        ? 'text-[#9aada3]/70 hover:bg-white/10 hover:text-[#e2ece7]'
                        : 'text-primary/35 hover:bg-primary/[0.08] hover:text-primary'
                    )}
                  >
                    <Icon name="edit" className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${folder}`}
                    title={`Delete ${folder}`}
                    onClick={() => deleteFolder(folder)}
                    className={cn(
                      'mr-1 flex h-5 w-5 shrink-0 items-center justify-center rounded opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100',
                      dark
                        ? 'text-[#9aada3]/70 hover:bg-white/10 hover:text-[#ff9b85]'
                        : 'text-primary/35 hover:bg-primary/[0.08] hover:text-attention'
                    )}
                  >
                    <Icon name="close" className="h-3 w-3" />
                  </button>
                </div>
              )}
              {files.length > 0 ? (
                <ul className="space-y-0.5">
                  {files.map((file) => renderFile(file, depth + 1))}
                </ul>
              ) : !hasChildFolder ? (
                <p
                  className={cn(
                    'px-2 py-1 text-[10px] italic',
                    dark ? 'text-[#8fa39a]' : 'text-primary/30'
                  )}
                  style={{ marginLeft: (depth + 1) * 8 }}
                >
                  Empty folder
                </p>
              ) : null}
            </section>
          )
        })}
      </div>

      <footer
        className={cn(
          'border-t px-3 py-2 text-[10px] font-medium uppercase tracking-[0.08em]',
          dark ? 'border-white/10 text-[#8fa39a]' : 'border-border text-primary/35'
        )}
      >
        {project.files.length} {project.files.length === 1 ? 'file' : 'files'} /{' '}
        {tree.folders.length} {tree.folders.length === 1 ? 'folder' : 'folders'}
      </footer>
    </aside>
  )
}
