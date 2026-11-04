export interface PythonNotebookRequest {
  source: string
}

export type PythonNotebookResponse =
  | { ok: true; output: string[]; durationMs: number }
  | { ok: false; error: string; output: string[]; durationMs: number }
