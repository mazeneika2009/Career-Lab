import type { PythonNotebookRequest, PythonNotebookResponse } from './pythonNotebookTypes'

const EXECUTION_TIMEOUT_MS = 45000

export function runPythonNotebook(source: string): Promise<PythonNotebookResponse> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./pythonNotebook.worker.ts', import.meta.url), { type: 'module' })
    const timeout = window.setTimeout(() => {
      worker.terminate()
      reject(new Error('Python execution exceeded the 45 second time limit.'))
    }, EXECUTION_TIMEOUT_MS)

    const finish = (): void => {
      window.clearTimeout(timeout)
      worker.terminate()
    }

    worker.onmessage = (event: MessageEvent<PythonNotebookResponse>): void => {
      finish()
      resolve(event.data)
    }
    worker.onerror = (event: ErrorEvent): void => {
      finish()
      reject(new Error(event.message || 'The Python notebook could not start.'))
    }

    const request: PythonNotebookRequest = { source }
    worker.postMessage(request)
  })
}
