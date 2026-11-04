export interface SqlScratchpadResult {
  columns: string[]
  rows: Array<Array<string | number | null>>
  truncated: boolean
}

export interface SqlWorkerRequest {
  query: string
  tables: string[]
}

export type SqlWorkerResponse =
  | { ok: true; result: SqlScratchpadResult }
  | { ok: false; error: string }
