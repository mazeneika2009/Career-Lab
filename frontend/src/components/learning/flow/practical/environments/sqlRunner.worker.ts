import initSqlJs from 'sql.js'
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url'
import type { SqlWorkerRequest, SqlWorkerResponse } from './sqlRunnerTypes'

const scope = self as unknown as {
  onmessage: ((event: MessageEvent<SqlWorkerRequest>) => void) | null
  postMessage: (message: SqlWorkerResponse) => void
}

const SAMPLE_SCHEMAS: Record<
  string,
  { columns: Array<[string, string]>; rows: Array<Array<string | number | null>> }
> = {
  customers: {
    columns: [
      ['id', 'INTEGER'],
      ['name', 'TEXT'],
      ['email', 'TEXT'],
      ['city', 'TEXT'],
      ['created_at', 'TEXT']
    ],
    rows: [
      [1, 'Amina Hassan', 'amina@example.test', 'Cairo', '2025-01-12'],
      [2, 'Omar Nasser', 'omar@example.test', 'Amman', '2025-02-03'],
      [3, 'Layla Farouk', 'layla@example.test', 'Cairo', '2025-03-19'],
      [4, 'Yusuf Karim', 'yusuf@example.test', 'Beirut', '2025-04-08']
    ]
  },
  orders: {
    columns: [
      ['id', 'INTEGER'],
      ['customer_id', 'INTEGER'],
      ['product_id', 'INTEGER'],
      ['order_date', 'TEXT'],
      ['status', 'TEXT'],
      ['total_amount', 'REAL']
    ],
    rows: [
      [101, 1, 1, '2025-02-01', 'shipped', 149.99],
      [102, 2, 2, '2025-02-14', 'pending', 79.5],
      [103, 1, 3, '2025-03-02', 'shipped', 239],
      [104, 3, 1, '2025-03-17', 'cancelled', 149.99]
    ]
  },
  products: {
    columns: [
      ['id', 'INTEGER'],
      ['name', 'TEXT'],
      ['category', 'TEXT'],
      ['price', 'REAL'],
      ['stock', 'INTEGER']
    ],
    rows: [
      [1, 'Desk lamp', 'Home', 149.99, 18],
      [2, 'Notebook set', 'Stationery', 79.5, 42],
      [3, 'Wireless keyboard', 'Electronics', 239, 7]
    ]
  }
}

function safeTableName(name: string): boolean {
  return /^[a-z_][a-z0-9_]{0,62}$/i.test(name)
}

function genericSchema(name: string): (typeof SAMPLE_SCHEMAS)[string] {
  return {
    columns: [
      ['id', 'INTEGER'],
      ['name', 'TEXT'],
      ['status', 'TEXT'],
      ['category', 'TEXT'],
      ['amount', 'REAL'],
      ['created_at', 'TEXT']
    ],
    rows: [
      [1, `${name} alpha`, 'active', 'general', 125.5, '2025-01-15'],
      [2, `${name} beta`, 'pending', 'priority', 80, '2025-02-10'],
      [3, `${name} gamma`, 'active', 'general', 210, '2025-03-22']
    ]
  }
}

function asResultValue(value: unknown): string | number | null {
  if (value === null || typeof value === 'string' || typeof value === 'number') return value
  if (value instanceof Uint8Array) {
    return [...value].map((byte) => byte.toString(16).padStart(2, '0')).join('')
  }
  return String(value)
}

async function execute(request: SqlWorkerRequest): Promise<SqlWorkerResponse> {
  const query = request.query.trim()
  if (!query) return { ok: false, error: 'Write a SQL statement before running it.' }

  const names = [...new Set([...Object.keys(SAMPLE_SCHEMAS), ...request.tables])]
    .filter(safeTableName)
    .slice(0, 16)

  let database: InstanceType<Awaited<ReturnType<typeof initSqlJs>>['Database']> | null = null
  try {
    const SQL = await initSqlJs({ locateFile: () => wasmUrl })
    database = new SQL.Database()
    for (const name of names) {
      const schema = SAMPLE_SCHEMAS[name.toLowerCase()] ?? genericSchema(name)
      const columns = schema.columns
        .map(([column, type]) => `"${column}" ${type}`)
        .join(', ')
      database.run(`CREATE TABLE "${name}" (${columns})`)
      const placeholders = schema.columns.map(() => '?').join(', ')
      const insert = database.prepare(
        `INSERT INTO "${name}" (${schema.columns.map(([column]) => `"${column}"`).join(', ')}) VALUES (${placeholders})`
      )
      for (const row of schema.rows) insert.run(row)
      insert.free()
    }

    const results = database.exec(query)
    const result = results.at(-1)
    if (!result) {
      return {
        ok: true,
        result: { columns: [], rows: [], truncated: false }
      }
    }

    const truncated = result.values.length > 200
    return {
      ok: true,
      result: {
        columns: result.columns,
        rows: result.values.slice(0, 200).map((row) => row.map(asResultValue)),
        truncated
      }
    }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'The query could not be executed.'
    }
  } finally {
    database?.close()
  }
}

scope.onmessage = (event: MessageEvent<SqlWorkerRequest>) => {
  void execute(event.data).then((response) => scope.postMessage(response))
}
