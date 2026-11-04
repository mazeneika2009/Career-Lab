import { loadPyodide } from 'pyodide'
import type { PythonNotebookRequest, PythonNotebookResponse } from './pythonNotebookTypes'

const scope = self as unknown as {
  onmessage: ((event: MessageEvent<PythonNotebookRequest>) => void) | null
  postMessage: (message: PythonNotebookResponse) => void
}

async function execute(source: string): Promise<PythonNotebookResponse> {
  const startedAt = performance.now()
  const output: string[] = []
  try {
    const pyodide = await loadPyodide({ indexURL: `${import.meta.env.BASE_URL}pyodide/` })
    pyodide.setStdout({ batched: (line) => output.push(line) })
    pyodide.setStderr({ batched: (line) => output.push(line) })
    const result = await pyodide.runPythonAsync(source)
    if (result !== null && result !== undefined) {
      const text = result.toString()
      if (text && text !== 'None') output.push(text)
      if (typeof result === 'object' && 'destroy' in result && typeof result.destroy === 'function') {
        result.destroy()
      }
    }
    return { ok: true, output, durationMs: performance.now() - startedAt }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Python execution failed.',
      output,
      durationMs: performance.now() - startedAt
    }
  }
}

scope.onmessage = (event: MessageEvent<PythonNotebookRequest>) => {
  void execute(event.data.source).then((response) => scope.postMessage(response))
}
