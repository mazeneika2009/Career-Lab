import type { SqlScratchpadResult, SqlWorkerRequest, SqlWorkerResponse } from './sqlRunnerTypes'

const EXECUTION_TIMEOUT_MS = 5000

export function runSqlScratchpad(query: string, tables: string[]): Promise<SqlScratchpadResult> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./sqlRunner.worker.ts', import.meta.url), { type: 'module' })
    const timeout = window.setTimeout(() => {
      worker.terminate()
      reject(new Error('Query execution exceeded the 5 second time limit.'))
    }, EXECUTION_TIMEOUT_MS)

    const finish = (): void => {
      window.clearTimeout(timeout)
      worker.terminate()
    }

    worker.onmessage = (event: MessageEvent<SqlWorkerResponse>): void => {
      finish()
      if (event.data.ok) resolve(event.data.result)
      else reject(new Error(event.data.error))
    }
    worker.onerror = (event: ErrorEvent): void => {
      finish()
      reject(new Error(event.message || 'The SQL runner could not start.'))
    }

    const request: SqlWorkerRequest = { query, tables }
    worker.postMessage(request)
  })
}
