/**
 * Career Lab — MySQL → Supabase migration / sync.
 *
 * Copies every selected MySQL table into the matching Supabase (Postgres)
 * table, preserving primary keys and relationships. Tables are discovered from
 * MySQL's information_schema, ordered by foreign-key dependencies, transformed
 * (BigInt → string, tinyint(1) → boolean, JSON → object, UTC timestamps → ISO)
 * and upserted in bounded batches so the command is safe to run repeatedly.
 *
 * Usage:
 *   npm run migrate:supabase -- --dry-run
 *   npm run migrate:supabase -- --list
 *   npm run migrate:supabase
 *   npm run migrate:supabase -- --tables=users,careers --since=2026-01-01T00:00:00Z
 *
 * Required Supabase environment (not needed for --dry-run / --list):
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (preferred) or SUPABASE_ANON_KEY
 *
 * Required MySQL environment (or DATABASE_URL):
 *   MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE
 *
 * See backend/scripts/README.md for the full reference.
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { config as loadEnv } from 'dotenv'
import {
  createPool,
  escapeId,
  type Pool,
  type PoolOptions,
  type RowDataPacket
} from 'mysql2/promise'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { Client as PgClient } from 'pg'

loadEnv()

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type Row = Record<string, unknown>

interface ColumnMeta {
  name: string
  dataType: string
  columnType: string
  nullable: boolean
  isPrimary: boolean
  isBigInt: boolean
  isBoolean: boolean
  isJson: boolean
  isEnum: boolean
  isTimestamp: boolean
  enumValues: string[]
}

interface TableMeta {
  name: string
  estimatedRows: number
  columns: ColumnMeta[]
  primaryKey: string[]
  dependencies: string[]
  sinceColumn: string | null
}

interface CliArgs {
  dryRun: boolean
  list: boolean
  help: boolean
  tables: string[]
  exclude: string[]
  since: string | null
  batchSize: number | null
  maxBytes: number | null
  maxRetries: number | null
  skipTargetCheck: boolean
  failFast: boolean
  noSequenceReset: boolean
  verify: boolean
}

interface Settings {
  dryRun: boolean
  since: string | null
  batchSize: number
  maxBytes: number
  maxRetries: number
  skipTargetCheck: boolean
  failFast: boolean
  noSequenceReset: boolean
  verify: boolean
  tables: string[]
  exclude: string[]
}

interface MysqlConfig {
  host: string
  port: number
  user: string
  password: string
  database: string
  connectionLimit: number
  ssl: PoolOptions['ssl']
}

interface TableStats {
  table: string
  rowsRead: number
  rowsWritten: number
  batchesSucceeded: number
  batchesFailed: number
  statusCounts: Map<string, Map<string, number>>
  enumWarnings: string[]
}

interface MigrationError {
  table: string
  scope: 'table' | 'batch' | 'verify' | 'sequence'
  batch?: number
  rows?: number
  message: string
}

interface TableMigrationResult {
  stats: TableStats
  errors: MigrationError[]
}

interface SupabaseSettings {
  url: string
  key: string
  schema: string
  keyRole: string
}

/* -------------------------------------------------------------------------- */
/* Logging                                                                    */
/* -------------------------------------------------------------------------- */

type LogLevel = 'info' | 'warn' | 'error' | 'ok'

function writeLog(level: LogLevel, message: string, meta?: Record<string, unknown>): void {
  const timestamp = new Date().toISOString()
  const label = level === 'ok' ? 'OK   ' : level.toUpperCase().padEnd(5)
  const suffix = meta && Object.keys(meta).length > 0 ? ` ${safeJson(meta)}` : ''
  const line = `${timestamp} ${label} ${message}${suffix}`
  if (level === 'error') console.error(line)
  else console.log(line)
}

const log = {
  info: (message: string, meta?: Record<string, unknown>): void => writeLog('info', message, meta),
  warn: (message: string, meta?: Record<string, unknown>): void => writeLog('warn', message, meta),
  error: (message: string, meta?: Record<string, unknown>): void => writeLog('error', message, meta),
  ok: (message: string, meta?: Record<string, unknown>): void => writeLog('ok', message, meta)
}

function safeJson(value: unknown): string {
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

function describeError(error: unknown): string {
  if (error instanceof Error) {
    const code = (error as { code?: unknown }).code
    return `${error.name}${typeof code === 'string' ? ` [${code}]` : ''}: ${error.message}`
  }
  return String(error)
}

function formatDuration(ms: number): string {
  if (ms < 1_000) return `${ms}ms`
  const seconds = Math.round(ms / 1_000)
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  return `${minutes}m ${seconds % 60}s`
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms))
}

/* -------------------------------------------------------------------------- */
/* CLI + settings                                                             */
/* -------------------------------------------------------------------------- */

const HELP = `
Career Lab — MySQL → Supabase migration / sync

Usage:
  npm run migrate:supabase -- [options]

Options:
  --dry-run                 Read and transform MySQL rows; write nothing to Supabase.
  --list                    List discovered tables, exclusions and dependency order.
  --table=NAME              Migrate one table (repeatable).
  --tables=a,b,c            Migrate a comma-separated list of tables.
  --exclude=a,b,c           Exclude tables (repeatable). _prisma_migrations is always excluded.
  --since=ISO_TIMESTAMP     Only rows whose updated_at/created_at (etc.) is newer.
  --batch-size=N            Rows per upsert request (default 500).
  --max-bytes=N             Maximum approximate JSON payload per request (default 4 MB).
  --max-retries=N           Retries after a transient Supabase failure (default 4).
  --skip-target-check       Do not preflight Supabase target tables.
  --fail-fast               Stop after the first table/batch error.
  --no-sequence-reset       Skip advancing Postgres identity sequences.
  --verify                  Compare row counts and audit the three-part learning map.
  --help                    Show this help text.

Environment:
  MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE
  (or DATABASE_URL), MYSQL_SSL, MYSQL_SSL_CA, MYSQL_SSL_REJECT_UNAUTHORIZED
  SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY / SUPABASE_SECRET_KEY (or SUPABASE_ANON_KEY), SUPABASE_SCHEMA
  SUPABASE_DB_URL (optional; used only to reset identity sequences)
  MIGRATION_TABLES, MIGRATION_EXCLUDE_TABLES, MIGRATION_SINCE,
  MIGRATION_BATCH_SIZE, MIGRATION_MAX_BYTES, MIGRATION_MAX_RETRIES,
  MIGRATION_VERIFY, MIGRATION_DRY_RUN, MIGRATION_DEBUG

Safety:
  Target tables must already exist in Supabase with matching snake_case columns
  and a primary key. The command never deletes target rows; it upserts on the
  MySQL primary key. Service-role access is strongly recommended.
`.trim()

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    dryRun: false,
    list: false,
    help: false,
    tables: [],
    exclude: [],
    since: null,
    batchSize: null,
    maxBytes: null,
    maxRetries: null,
    skipTargetCheck: false,
    failFast: false,
    noSequenceReset: false,
    verify: false
  }

  const takeNumber = (
    name: string,
    raw: string | undefined,
    min: number,
    max: number
  ): number => {
    if (!raw) throw new Error(`Missing value for ${name}.`)
    const value = Number(raw)
    if (!Number.isInteger(value) || value < min || value > max) {
      throw new Error(`${name} must be an integer between ${min} and ${max} (received "${raw}").`)
    }
    return value
  }

  for (const raw of argv) {
    const [flag, ...rest] = raw.split('=')
    const value = rest.length > 0 ? rest.join('=') : undefined

    switch (flag) {
      case '--dry-run':
        args.dryRun = true
        break
      case '--list':
        args.list = true
        break
      case '--help':
      case '-h':
        args.help = true
        break
      case '--table':
        if (!value) throw new Error('--table requires a table name, e.g. --table=users.')
        args.tables.push(value)
        break
      case '--tables':
        if (!value) throw new Error('--tables requires a comma-separated list.')
        args.tables.push(...splitList(value))
        break
      case '--exclude':
        if (!value) throw new Error('--exclude requires a comma-separated list.')
        args.exclude.push(...splitList(value))
        break
      case '--since':
        if (!value) throw new Error('--since requires an ISO timestamp.')
        args.since = value
        break
      case '--batch-size':
        args.batchSize = takeNumber('--batch-size', value, 1, 5_000)
        break
      case '--max-bytes':
        args.maxBytes = takeNumber('--max-bytes', value, 10_000, 50_000_000)
        break
      case '--max-retries':
        args.maxRetries = takeNumber('--max-retries', value, 0, 10)
        break
      case '--skip-target-check':
        args.skipTargetCheck = true
        break
      case '--fail-fast':
        args.failFast = true
        break
      case '--no-sequence-reset':
        args.noSequenceReset = true
        break
      case '--verify':
        args.verify = true
        break
      default:
        throw new Error(`Unknown option "${raw}". Run with --help for usage.`)
    }
  }

  return args
}

function splitList(value: string): string[] {
  return value
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
}

function envFlag(name: string, fallback: boolean): boolean {
  const raw = process.env[name]
  if (raw === undefined || raw === '') return fallback
  return ['1', 'true', 'yes', 'on'].includes(raw.toLowerCase())
}

function envInt(name: string, fallback: number, min: number, max: number): number {
  const raw = process.env[name]
  if (raw === undefined || raw === '') return fallback
  const value = Number(raw)
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new Error(`${name} must be an integer between ${min} and ${max} (received "${raw}").`)
  }
  return value
}

function resolveSettings(args: CliArgs): Settings {
  const batchSize = args.batchSize ?? envInt('MIGRATION_BATCH_SIZE', 500, 1, 5_000)
  const maxBytes = args.maxBytes ?? envInt('MIGRATION_MAX_BYTES', 4_000_000, 10_000, 50_000_000)
  const maxRetries = args.maxRetries ?? envInt('MIGRATION_MAX_RETRIES', 4, 0, 10)
  const since = args.since ?? (process.env.MIGRATION_SINCE?.trim() || null)

  if (since !== null && Number.isNaN(Date.parse(since))) {
    throw new Error(`Invalid --since / MIGRATION_SINCE timestamp "${since}". Use an ISO date.`)
  }

  const envTables = splitList(process.env.MIGRATION_TABLES ?? '')
  const envExclude = splitList(process.env.MIGRATION_EXCLUDE_TABLES ?? '')
  const dryRun = args.dryRun || envFlag('MIGRATION_DRY_RUN', false)

  return {
    dryRun,
    since: since === null ? null : new Date(since).toISOString(),
    batchSize,
    maxBytes,
    maxRetries,
    skipTargetCheck: args.skipTargetCheck,
    failFast: args.failFast,
    noSequenceReset: args.noSequenceReset,
    verify: args.verify || envFlag('MIGRATION_VERIFY', false),
    tables: [...new Set([...args.tables, ...envTables])],
    exclude: [...new Set([...args.exclude, ...envExclude, '_prisma_migrations'])]
  }
}

/* -------------------------------------------------------------------------- */
/* Configuration                                                              */
/* -------------------------------------------------------------------------- */

function buildMysqlConfig(): MysqlConfig {
  const connectionLimit = envInt('MYSQL_CONNECTION_LIMIT', 5, 1, 20)
  const sslEnabled = envFlag('MYSQL_SSL', false)
  const sslRejectUnauthorized = envFlag('MYSQL_SSL_REJECT_UNAUTHORIZED', true)
  const sslCa = process.env.MYSQL_SSL_CA?.trim()
  const ssl = sslEnabled
    ? {
        rejectUnauthorized: sslRejectUnauthorized,
        ...(sslCa ? { ca: readFileSync(resolve(sslCa), 'utf8') } : {})
      }
    : undefined

  const explicitFields = ['MYSQL_HOST', 'MYSQL_USER', 'MYSQL_PASSWORD', 'MYSQL_DATABASE'].filter(
    (name) => process.env[name] !== undefined
  )

  if (explicitFields.length > 0) {
    const host = process.env.MYSQL_HOST?.trim() || '127.0.0.1'
    const user = process.env.MYSQL_USER?.trim()
    const database = process.env.MYSQL_DATABASE?.trim()
    if (!user) throw new Error('MYSQL_USER is required when using MYSQL_* settings.')
    if (!database) throw new Error('MYSQL_DATABASE is required when using MYSQL_* settings.')
    return {
      host,
      port: envInt('MYSQL_PORT', 3306, 1, 65_535),
      user,
      password: process.env.MYSQL_PASSWORD ?? '',
      database,
      connectionLimit,
      ssl
    }
  }

  const databaseUrl = process.env.DATABASE_URL?.trim()
  if (!databaseUrl) {
    throw new Error(
      'No MySQL configuration found. Set MYSQL_HOST/MYSQL_USER/MYSQL_PASSWORD/MYSQL_DATABASE or DATABASE_URL.'
    )
  }

  let parsed: URL
  try {
    parsed = new URL(databaseUrl)
  } catch {
    throw new Error('DATABASE_URL is not a valid MySQL URL.')
  }

  const database = parsed.pathname.replace(/^\//, '')
  if (!parsed.username || !database || !parsed.hostname) {
    throw new Error('DATABASE_URL must include a user, host and database name.')
  }

  return {
    host: parsed.hostname,
    port: parsed.port ? Number(parsed.port) : 3306,
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database,
    connectionLimit,
    ssl
  }
}

function buildSupabaseSettings(): SupabaseSettings {
  const url = process.env.SUPABASE_URL?.trim().replace(/\/+$/, '')
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || process.env.SUPABASE_SECRET_KEY?.trim()
  const anonKey =
    process.env.SUPABASE_ANON_KEY?.trim() || process.env.SUPABASE_PUBLISHABLE_KEY?.trim()
  const genericKey = process.env.SUPABASE_KEY?.trim()
  const key = serviceKey || anonKey || genericKey
  const schema = process.env.SUPABASE_SCHEMA?.trim() || 'public'

  if (!url) throw new Error('SUPABASE_URL is required.')
  if (!key) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY (recommended) or SUPABASE_ANON_KEY is required.')
  }
  if (!/^[a-z_][a-z0-9_]*$/i.test(schema)) {
    throw new Error(`SUPABASE_SCHEMA "${schema}" is not a valid Postgres schema name.`)
  }

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    throw new Error('SUPABASE_URL is not a valid URL.')
  }
  if (parsed.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(parsed.hostname)) {
    throw new Error('SUPABASE_URL must use HTTPS unless it points at localhost.')
  }

  return { url, key, schema, keyRole: describeKeyRole(key) }
}

function describeKeyRole(key: string): string {
  if (key.startsWith('sb_secret_')) return 'secret'
  if (key.startsWith('sb_publishable_')) return 'publishable'

  const parts = key.split('.')
  if (parts.length === 3 && parts[1]) {
    try {
      const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8')) as {
        role?: unknown
      }
      return typeof payload.role === 'string' ? payload.role : 'unknown'
    } catch {
      return 'unknown'
    }
  }
  return 'unknown'
}

function makeSupabaseClient(settings: SupabaseSettings): SupabaseClient {
  return createClient(settings.url, settings.key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    },
    global: {
      headers: { 'x-application-name': 'career-lab-supabase-migration' }
    }
  })
}

/* -------------------------------------------------------------------------- */
/* MySQL schema introspection                                                 */
/* -------------------------------------------------------------------------- */

const TIMESTAMP_COLUMN_ORDER = [
  'updated_at',
  'created_at',
  'computed_at',
  'selected_at',
  'issued_at',
  'submitted_at',
  'started_at',
  'last_viewed_at',
  'last_used_at',
  'completed_at'
]

async function loadSchema(pool: Pool, database: string): Promise<TableMeta[]> {
  const [tableRows] = await pool.query<RowDataPacket[]>(
    `SELECT TABLE_NAME AS table_name, TABLE_ROWS AS table_rows
       FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = ? AND TABLE_TYPE = 'BASE TABLE'
      ORDER BY TABLE_NAME`,
    [database]
  )
  const [columnRows] = await pool.query<RowDataPacket[]>(
    `SELECT TABLE_NAME AS table_name, COLUMN_NAME AS column_name,
            DATA_TYPE AS data_type, COLUMN_TYPE AS column_type,
            IS_NULLABLE AS is_nullable
       FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = ?
      ORDER BY TABLE_NAME, ORDINAL_POSITION`,
    [database]
  )
  const [primaryRows] = await pool.query<RowDataPacket[]>(
    `SELECT TABLE_NAME AS table_name, COLUMN_NAME AS column_name
       FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = ? AND CONSTRAINT_NAME = 'PRIMARY'
      ORDER BY TABLE_NAME, ORDINAL_POSITION`,
    [database]
  )
  const [foreignRows] = await pool.query<RowDataPacket[]>(
    `SELECT TABLE_NAME AS table_name, REFERENCED_TABLE_NAME AS referenced_table
       FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = ?
        AND REFERENCED_TABLE_NAME IS NOT NULL
        AND TABLE_NAME <> REFERENCED_TABLE_NAME`,
    [database]
  )

  const primaryByTable = new Map<string, string[]>()
  for (const row of primaryRows) {
    const table = String(row.table_name)
    const columns = primaryByTable.get(table) ?? []
    columns.push(String(row.column_name))
    primaryByTable.set(table, columns)
  }

  const dependenciesByTable = new Map<string, Set<string>>()
  for (const row of foreignRows) {
    const table = String(row.table_name)
    const dependencies = dependenciesByTable.get(table) ?? new Set<string>()
    dependencies.add(String(row.referenced_table))
    dependenciesByTable.set(table, dependencies)
  }

  const columnsByTable = new Map<string, ColumnMeta[]>()
  for (const row of columnRows) {
    const table = String(row.table_name)
    const name = String(row.column_name)
    const dataType = String(row.data_type).toLowerCase()
    const columnType = String(row.column_type).toLowerCase()
    const isEnum = dataType === 'enum'

    const columns = columnsByTable.get(table) ?? []
    columns.push({
      name,
      dataType,
      columnType,
      nullable: String(row.is_nullable).toUpperCase() === 'YES',
      isPrimary: (primaryByTable.get(table) ?? []).includes(name),
      isBigInt: dataType === 'bigint',
      isBoolean: dataType === 'tinyint' && /^tinyint\(1\)/.test(columnType),
      isJson: dataType === 'json',
      isEnum,
      isTimestamp: dataType === 'datetime' || dataType === 'timestamp',
      enumValues: isEnum ? parseEnumValues(columnType) : []
    })
    columnsByTable.set(table, columns)
  }

  const tables: TableMeta[] = []
  for (const row of tableRows) {
    const name = String(row.table_name)
    const columns = columnsByTable.get(name) ?? []
    const primaryKey = primaryByTable.get(name) ?? []
    const dependencies = [...(dependenciesByTable.get(name) ?? [])]
    const sinceColumn =
      TIMESTAMP_COLUMN_ORDER.find((column) =>
        columns.some((candidate) => candidate.name === column && candidate.isTimestamp)
      ) ?? null

    tables.push({
      name,
      estimatedRows: Number(row.table_rows ?? 0) || 0,
      columns,
      primaryKey,
      dependencies,
      sinceColumn
    })
  }

  return tables
}

function parseEnumValues(columnType: string): string[] {
  const values: string[] = []
  for (const match of columnType.matchAll(/'((?:[^'\\]|\\.)*)'/g)) {
    const raw = match[1]
    if (raw === undefined) continue
    values.push(raw.replace(/\\(.)/g, '$1').replace(/''/g, "'"))
  }
  return values
}

/* -------------------------------------------------------------------------- */
/* Table selection + dependency ordering                                      */
/* -------------------------------------------------------------------------- */

function selectTables(all: TableMeta[], settings: Settings): TableMeta[] {
  const available = new Set(all.map((table) => table.name))
  const unknown = [...settings.tables, ...settings.exclude].filter(
    (name) => name !== '_prisma_migrations' && !available.has(name)
  )
  if (unknown.length > 0) {
    throw new Error(
      `Unknown MySQL table(s): ${[...new Set(unknown)].join(', ')}. Available: ${[...available]
        .sort()
        .join(', ')}`
    )
  }

  const requested = new Set(settings.tables)
  const excluded = new Set(settings.exclude)
  const selected = all.filter(
    (table) =>
      !excluded.has(table.name) && (requested.size === 0 || requested.has(table.name))
  )

  if (selected.length === 0) {
    throw new Error('No tables selected. Check --table/--exclude and MIGRATION_TABLES.')
  }
  return selected
}

function orderByDependencies(tables: TableMeta[]): TableMeta[] {
  const byName = new Map(tables.map((table) => [table.name, table]))
  const dependencies = new Map<string, Set<string>>()
  for (const table of tables) {
    dependencies.set(
      table.name,
      new Set(table.dependencies.filter((dependency) => dependency !== table.name && byName.has(dependency)))
    )
  }

  const remaining = new Set(tables.map((table) => table.name))
  const ordered: TableMeta[] = []

  while (remaining.size > 0) {
    const ready = [...remaining]
      .filter((name) => {
        const deps = dependencies.get(name) ?? new Set<string>()
        return [...deps].every((dependency) => !remaining.has(dependency))
      })
      .sort()

    if (ready.length === 0) {
      const cyclic = [...remaining].sort()
      log.warn(
        `Circular foreign-key dependency detected; appending remaining tables: ${cyclic.join(', ')}`
      )
      for (const name of cyclic) {
        const table = byName.get(name)
        if (table) ordered.push(table)
        remaining.delete(name)
      }
      break
    }

    for (const name of ready) {
      const table = byName.get(name)
      if (table) ordered.push(table)
      remaining.delete(name)
    }
  }

  return ordered
}

function printTableList(all: TableMeta[], settings: Settings, ordered: TableMeta[]): void {
  const excluded = new Set(settings.exclude)
  const requested = new Set(settings.tables)
  const selected = new Set(ordered.map((table) => table.name))

  console.log('')
  console.log(`MySQL tables (${all.length}):`)
  for (const table of all) {
    const flags: string[] = []
    if (selected.has(table.name)) flags.push('selected')
    else if (excluded.has(table.name)) flags.push('excluded')
    else if (requested.size > 0) flags.push('not requested')
    if (!table.primaryKey.length) flags.push('NO PRIMARY KEY')
    if (table.sinceColumn) flags.push(`incremental:${table.sinceColumn}`)
    console.log(
      `  ${table.name.padEnd(28)} ~${String(table.estimatedRows).padStart(7)} rows  ${flags.join(', ')}`
    )
  }

  console.log('')
  console.log('Migration order (foreign-key dependencies first):')
  ordered.forEach((table, index) => {
    console.log(`  ${String(index + 1).padStart(2)}. ${table.name}`)
  })
  console.log('')
}

function validateTables(tables: TableMeta[]): void {
  for (const table of tables) {
    if (!/^[a-z_][a-z0-9_]*$/i.test(table.name)) {
      throw new Error(
        `Table "${table.name}" contains characters that are not safe for Supabase identifiers.`
      )
    }
    if (table.primaryKey.length === 0) {
      throw new Error(
        `Table "${table.name}" has no primary key. Add one so this script can upsert idempotently.`
      )
    }
  }
}

/* -------------------------------------------------------------------------- */
/* Data transformation                                                        */
/* -------------------------------------------------------------------------- */

const ENUM_ALIASES: Record<string, string> = {
  urgent: 'critical',
  medium: 'normal',
  medium_priority: 'normal',
  normal_priority: 'normal',
  pending: 'pending_verification',
  pending_email: 'pending_verification',
  done: 'completed',
  complete: 'completed',
  inprogress: 'in_progress',
  in_progress: 'in_progress',
  notstarted: 'not_started',
  not_started: 'not_started',
  not_passed: 'failed',
  pass: 'passed',
  fail: 'failed'
}

function transformValue(
  value: unknown,
  column: ColumnMeta,
  tableName: string,
  warnings: Set<string>
): unknown {
  if (value === null || value === undefined) return null

  if (column.isBoolean) {
    return value === true || value === 1 || value === '1' || value === 'true'
  }

  if (column.isBigInt) {
    return typeof value === 'bigint' ? value.toString() : String(value)
  }

  if (column.isTimestamp) {
    return transformTimestamp(value)
  }

  if (column.isJson) {
    return transformJson(value, tableName, column, warnings)
  }

  if (column.isEnum) {
    return normalizeEnum(value, column, tableName, warnings)
  }

  if (Buffer.isBuffer(value)) {
    return value.toString('base64')
  }

  if (typeof value === 'bigint') {
    return value.toString()
  }

  return value
}

function transformTimestamp(value: unknown): unknown {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value.toISOString()
  }

  if (typeof value === 'number') {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? null : date.toISOString()
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed || /^0000-00-00(?: 00:00:00)?/.test(trimmed)) return null
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})$/.test(trimmed)) {
      return trimmed
    }
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:\.\d+)?$/.test(trimmed)) {
      return `${trimmed.replace(' ', 'T')}Z`
    }
    return trimmed
  }

  return value
}

function transformJson(
  value: unknown,
  tableName: string,
  column: ColumnMeta,
  warnings: Set<string>
): unknown {
  if (typeof value === 'object' && value !== null) return value

  const text = Buffer.isBuffer(value) ? value.toString('utf8') : String(value)
  if (text.trim() === '') return null

  try {
    return JSON.parse(text) as unknown
  } catch {
    const key = `${tableName}.${column.name}: invalid JSON`
    if (!warnings.has(key)) {
      warnings.add(key)
      log.warn(`[${tableName}] column ${column.name} contains invalid JSON; sending it as text.`)
    }
    return text
  }
}

function normalizeEnum(
  value: unknown,
  column: ColumnMeta,
  tableName: string,
  warnings: Set<string>
): unknown {
  const raw = String(value)
  if (column.enumValues.includes(raw)) return raw

  const normalized = raw.trim().toLowerCase().replace(/[\s-]+/g, '_')
  if (column.enumValues.includes(normalized)) return normalized

  const alias = ENUM_ALIASES[normalized]
  if (alias && column.enumValues.includes(alias)) return alias

  const warningKey = `${tableName}.${column.name}:${raw}`
  if (!warnings.has(warningKey)) {
    warnings.add(warningKey)
    log.warn(
      `[${tableName}] unknown enum value "${raw}" for ${column.name}; sending "${normalized}".`
    )
  }
  return normalized
}

function transformRow(row: Row, table: TableMeta, warnings: Set<string>): Row {
  const transformed: Row = {}
  for (const column of table.columns) {
    if (!(column.name in row)) continue
    transformed[column.name] = transformValue(row[column.name], column, table.name, warnings)
  }
  return transformed
}

function collectStatusCounts(
  row: Row,
  table: TableMeta,
  counts: Map<string, Map<string, number>>
): void {
  for (const column of table.columns) {
    if (column.name !== 'status' && column.name !== 'priority') continue
    const value = row[column.name]
    if (value === null || value === undefined) continue

    const valueCounts = counts.get(column.name) ?? new Map<string, number>()
    const key = String(value)
    valueCounts.set(key, (valueCounts.get(key) ?? 0) + 1)
    counts.set(column.name, valueCounts)
  }
}

/* -------------------------------------------------------------------------- */
/* Batching                                                                   */
/* -------------------------------------------------------------------------- */

function chunkRows(rows: Row[], maxRows: number, maxBytes: number): Row[][] {
  const batches: Row[][] = []
  let batch: Row[] = []
  let bytes = 2 // surrounding JSON array brackets

  for (const row of rows) {
    const rowBytes = Buffer.byteLength(safeJson(row), 'utf8') + 1
    if (batch.length > 0 && (batch.length >= maxRows || bytes + rowBytes > maxBytes)) {
      batches.push(batch)
      batch = []
      bytes = 2
    }
    batch.push(row)
    bytes += rowBytes
  }

  if (batch.length > 0) batches.push(batch)
  return batches
}

/* -------------------------------------------------------------------------- */
/* MySQL reads                                                                */
/* -------------------------------------------------------------------------- */

function isTransientMysqlError(error: unknown): boolean {
  const code = (error as { code?: unknown }).code
  return (
    typeof code === 'string' &&
    [
      'PROTOCOL_CONNECTION_LOST',
      'ECONNRESET',
      'ECONNREFUSED',
      'ETIMEDOUT',
      'EPIPE',
      'ENOTFOUND',
      'EAI_AGAIN',
      'ER_LOCK_WAIT_TIMEOUT',
      'ER_LOCK_DEADLOCK',
      'ER_CON_COUNT_ERROR'
    ].includes(code)
  )
}

async function withMysqlRetry<T>(
  label: string,
  operation: () => Promise<T>,
  attempts = 3
): Promise<T> {
  let lastError: unknown
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      if (!isTransientMysqlError(error) || attempt === attempts) throw error
      const delay = 500 * 2 ** (attempt - 1)
      log.warn(`${label} failed (${describeError(error)}); retrying in ${delay}ms.`)
      await sleep(delay)
    }
  }
  throw lastError
}

async function fetchRows(
  pool: Pool,
  table: TableMeta,
  lastPrimaryKey: unknown,
  offset: number,
  limit: number,
  sinceSql: string | null
): Promise<Row[]> {
  const where: string[] = []
  const params: unknown[] = []

  if (table.primaryKey.length === 1) {
    const primary = table.primaryKey[0]
    if (!primary) throw new Error(`Table "${table.name}" has an invalid primary key.`)
    if (lastPrimaryKey !== null && lastPrimaryKey !== undefined) {
      where.push(`${escapeId(primary)} > ?`)
      params.push(lastPrimaryKey)
    }
  }

  if (sinceSql !== null && table.sinceColumn) {
    where.push(`${escapeId(table.sinceColumn)} > ?`)
    params.push(sinceSql)
  }

  const orderBy = table.primaryKey.map((column) => escapeId(column)).join(', ')
  const sql =
    `SELECT * FROM ${escapeId(table.name)}` +
    (where.length > 0 ? ` WHERE ${where.join(' AND ')}` : '') +
    ` ORDER BY ${orderBy} LIMIT ?` +
    (table.primaryKey.length === 1 ? '' : ' OFFSET ?')

  params.push(limit)
  if (table.primaryKey.length !== 1) params.push(offset)

  const [rows] = await pool.query<RowDataPacket[]>(sql, params)
  return rows as unknown as Row[]
}

/* -------------------------------------------------------------------------- */
/* Supabase writes                                                            */
/* -------------------------------------------------------------------------- */

function describeSupabaseError(error: unknown): string {
  if (typeof error === 'object' && error !== null) {
    const candidate = error as {
      message?: unknown
      details?: unknown
      hint?: unknown
      code?: unknown
      status?: unknown
    }
    const parts = [
      typeof candidate.message === 'string' ? candidate.message : null,
      typeof candidate.details === 'string' && candidate.details ? candidate.details : null,
      typeof candidate.hint === 'string' && candidate.hint ? candidate.hint : null,
      typeof candidate.code === 'string' && candidate.code ? `code=${candidate.code}` : null,
      typeof candidate.status === 'number' ? `status=${candidate.status}` : null
    ].filter((part): part is string => part !== null)
    if (parts.length > 0) return parts.join(' | ')
  }
  return describeError(error)
}

function isTransientSupabaseError(error: unknown): boolean {
  const candidate = error as { message?: unknown; code?: unknown; status?: unknown }
  const code = typeof candidate.code === 'string' ? candidate.code : ''
  const status = typeof candidate.status === 'number' ? candidate.status : 0
  const message = typeof candidate.message === 'string' ? candidate.message.toLowerCase() : ''

  if (code === 'PGRST000') return true
  if (status === 429 || status >= 500) return true
  if (code === 'PGRST301') return false

  return [
    'fetch failed',
    'network',
    'timeout',
    'timed out',
    'temporarily unavailable',
    'rate limit',
    'too many requests',
    'econnreset',
    'etimedout',
    'eai_again',
    'socket hang up'
  ].some((fragment) => message.includes(fragment))
}

async function upsertBatch(
  supabase: SupabaseClient,
  schema: string,
  table: TableMeta,
  rows: Row[],
  batchNumber: number,
  settings: Settings
): Promise<void> {
  const maxAttempts = settings.maxRetries + 1
  const onConflict = table.primaryKey.join(',')

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const { error } = await supabase
        .schema(schema)
        .from(table.name)
        .upsert(rows, {
          onConflict,
          ignoreDuplicates: false,
          defaultToNull: false
        })

      if (!error) return

      if (!isTransientSupabaseError(error) || attempt === maxAttempts) {
        throw new Error(`Supabase upsert failed: ${describeSupabaseError(error)}`)
      }

      const delay = Math.round(500 * 2 ** (attempt - 1) + Math.random() * 250)
      log.warn(
        `[${table.name}] batch ${batchNumber} attempt ${attempt}/${maxAttempts} failed ` +
          `(${describeSupabaseError(error)}); retrying in ${delay}ms.`
      )
      await sleep(delay)
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('Supabase upsert failed:')) throw error
      if (!isTransientSupabaseError(error) || attempt === maxAttempts) {
        throw new Error(`Supabase upsert failed: ${describeSupabaseError(error)}`)
      }
      const delay = Math.round(500 * 2 ** (attempt - 1) + Math.random() * 250)
      log.warn(
        `[${table.name}] batch ${batchNumber} attempt ${attempt}/${maxAttempts} threw ` +
          `(${describeSupabaseError(error)}); retrying in ${delay}ms.`
      )
      await sleep(delay)
    }
  }
}

/* -------------------------------------------------------------------------- */
/* Table migration                                                            */
/* -------------------------------------------------------------------------- */

function newStats(table: string): TableStats {
  return {
    table,
    rowsRead: 0,
    rowsWritten: 0,
    batchesSucceeded: 0,
    batchesFailed: 0,
    statusCounts: new Map(),
    enumWarnings: []
  }
}

async function migrateTable(
  pool: Pool,
  supabase: SupabaseClient | null,
  schema: string,
  table: TableMeta,
  settings: Settings,
  stopRequested: () => boolean
): Promise<TableMigrationResult> {
  const stats = newStats(table.name)
  const errors: MigrationError[] = []
  const warnings = new Set<string>()

  if (table.primaryKey.length === 0) {
    errors.push({
      table: table.name,
      scope: 'table',
      message: 'Table has no primary key; upsert would not be idempotent.'
    })
    return { stats, errors }
  }

  log.info(
    `[${table.name}] start · primary key=${table.primaryKey.join(', ')} · ` +
      `columns=${table.columns.length}` +
      (settings.since && table.sinceColumn ? ` · since ${table.sinceColumn}` : '')
  )

  const sinceSql =
    settings.since && table.sinceColumn
      ? new Date(settings.since).toISOString().slice(0, 23).replace('T', ' ')
      : null

  let lastPrimaryKey: unknown = null
  let offset = 0
  let batchNumber = 0

  for (;;) {
    if (stopRequested()) {
      log.warn(`[${table.name}] interrupted before the next read.`)
      break
    }

    let rows: Row[]
    try {
      rows = await withMysqlRetry(`[${table.name}] read`, () =>
        fetchRows(pool, table, lastPrimaryKey, offset, settings.batchSize, sinceSql)
      )
    } catch (error) {
      errors.push({
        table: table.name,
        scope: 'table',
        message: `MySQL read failed: ${describeError(error)}`
      })
      break
    }

    if (rows.length === 0) break

    stats.rowsRead += rows.length
    const transformed = rows.map((row) => transformRow(row, table, warnings))
    for (const row of transformed) collectStatusCounts(row, table, stats.statusCounts)

    if (settings.dryRun) {
      const batches = chunkRows(transformed, settings.batchSize, settings.maxBytes)
      batchNumber += batches.length
      stats.rowsWritten += transformed.length
      stats.batchesSucceeded += batches.length
      log.info(
        `[${table.name}] dry-run batch ${batchNumber} · ${transformed.length} rows transformed ` +
          `(${batches.length} upsert request${batches.length === 1 ? '' : 's'})`
      )
    } else if (supabase) {
      const batches = chunkRows(transformed, settings.batchSize, settings.maxBytes)
      for (const batch of batches) {
        batchNumber += 1
        if (stopRequested()) break

        try {
          await upsertBatch(supabase, schema, table, batch, batchNumber, settings)
          stats.rowsWritten += batch.length
          stats.batchesSucceeded += 1
          log.info(`[${table.name}] batch ${batchNumber} · ${batch.length} rows upserted.`)
        } catch (error) {
          stats.batchesFailed += 1
          const message = describeError(error)
          errors.push({
            table: table.name,
            scope: 'batch',
            batch: batchNumber,
            rows: batch.length,
            message
          })
          log.error(
            `[${table.name}] batch ${batchNumber} failed · ${batch.length} rows · ${message}`
          )
          if (settings.failFast) break
        }
      }
    }

    const finalRow = rows[rows.length - 1]
    lastPrimaryKey =
      table.primaryKey.length === 1 ? finalRow?.[table.primaryKey[0] ?? ''] ?? null : null
    offset += rows.length

    if (rows.length < settings.batchSize) break
    if (settings.failFast && errors.length > 0) break
    if (stopRequested()) break
  }

  for (const warning of warnings) stats.enumWarnings.push(warning)

  log.info(
    `[${table.name}] done · read=${stats.rowsRead} written=${stats.rowsWritten} ` +
      `batches=${stats.batchesSucceeded}` +
      (stats.batchesFailed > 0 ? ` failed-batches=${stats.batchesFailed}` : '')
  )

  for (const [column, counts] of stats.statusCounts) {
    const distribution = [...counts.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([value, count]) => `${value}=${count}`)
      .join(', ')
    log.ok(`[${table.name}] ${column}: ${distribution}`)
  }

  if (stats.enumWarnings.length > 0) {
    log.warn(
      `[${table.name}] ${stats.enumWarnings.length} enum/JSON warning(s): ` +
        stats.enumWarnings.slice(0, 10).join('; ') +
        (stats.enumWarnings.length > 10 ? ' …' : '')
    )
  }

  return { stats, errors }
}

/* -------------------------------------------------------------------------- */
/* Supabase target preflight + verification                                   */
/* -------------------------------------------------------------------------- */

async function preflightTargetTables(
  supabase: SupabaseClient,
  schema: string,
  tables: TableMeta[]
): Promise<void> {
  const failures: string[] = []

  for (const table of tables) {
    const { error } = await supabase.schema(schema).from(table.name).select('*', { head: true })
    if (error) {
      failures.push(`  - ${table.name}: ${describeSupabaseError(error)}`)
    }
  }

  if (failures.length > 0) {
    throw new Error(
      `Supabase target preflight failed for ${failures.length} table(s):\n` +
        `${failures.join('\n')}\n` +
        'Create the matching tables first, or use --skip-target-check to try them individually. ' +
        'If you are using an anon key, Row Level Security may be blocking access; use the service-role key.'
    )
  }

  log.ok(`Supabase preflight passed · schema=${schema} · tables=${tables.length}`)
}

async function verifyTableCounts(
  supabase: SupabaseClient,
  schema: string,
  ordered: TableMeta[],
  statsByTable: Map<string, TableStats>,
  since: string | null
): Promise<MigrationError[]> {
  const errors: MigrationError[] = []

  if (since) {
    log.warn('Verification skipped because --since only migrated a subset of rows.')
    return errors
  }

  for (const table of ordered) {
    const stats = statsByTable.get(table.name)
    if (!stats) continue

    const { count, error } = await supabase
      .schema(schema)
      .from(table.name)
      .select('*', { count: 'exact', head: true })

    if (error) {
      errors.push({
        table: table.name,
        scope: 'verify',
        message: `Count check failed: ${describeSupabaseError(error)}`
      })
      continue
    }

    if (count === null) {
      log.warn(`[${table.name}] verification returned no count.`)
      continue
    }

    if (count < stats.rowsRead) {
      errors.push({
        table: table.name,
        scope: 'verify',
        message: `Supabase has ${count} row(s), but MySQL supplied ${stats.rowsRead}.`
      })
      log.error(`[${table.name}] verify failed · supabase=${count} source=${stats.rowsRead}`)
    } else {
      log.ok(`[${table.name}] verify · supabase=${count} source=${stats.rowsRead}`)
    }
  }

  return errors
}

async function verifyLearningStructure(
  supabase: SupabaseClient,
  schema: string,
  ordered: TableMeta[]
): Promise<MigrationError[]> {
  const errors: MigrationError[] = []
  const migrated = new Set(ordered.map((table) => table.name))
  if (!migrated.has('chapters') || !migrated.has('topics')) {
    log.warn('[learning] structure verification skipped: chapters/topics were not selected.')
    return errors
  }

  interface ChapterRow {
    id: string
    public_id: string
    title: string
  }
  interface TopicRow {
    id: string
    chapter_id: string
    order: number
    slug: string
    title: string
  }
  interface VideoRow {
    topic_id: string
  }
  interface TopicProgressRow {
    topic_id: string
  }
  interface StepProgressRow {
    chapter_public_id: string
    step: string
    status: string
  }

  async function fetchPaged<T>(
    table: string,
    columns: string,
    options?: { order?: string; filter?: { column: string; value: string } }
  ): Promise<T[]> {
    const pageSize = 1_000
    const rows: T[] = []
    for (let from = 0; ; from += pageSize) {
      let query = supabase
        .schema(schema)
        .from(table)
        .select(columns)
        .order(options?.order ?? 'id', { ascending: true })
        .range(from, from + pageSize - 1)
      if (options?.filter) query = query.eq(options.filter.column, options.filter.value)
      const { data, error } = await query
      if (error) throw new Error(`[${table}] ${describeSupabaseError(error)}`)
      const page = (data ?? []) as T[]
      rows.push(...page)
      if (page.length < pageSize) break
    }
    return rows
  }

  try {
    const [chapters, topics, videos, topicProgress] = await Promise.all([
      fetchPaged<ChapterRow>('chapters', 'id, public_id, title'),
      fetchPaged<TopicRow>('topics', 'id, chapter_id, order, slug, title'),
      fetchPaged<VideoRow>('topic_resources', 'topic_id', {
        filter: { column: 'kind', value: 'video' }
      }),
      fetchPaged<TopicProgressRow>('topic_progress', 'topic_id').catch(() => [])
    ])

    let steps: StepProgressRow[] = []
    try {
      steps = await fetchPaged<StepProgressRow>(
        'learning_step_progress',
        'chapter_public_id, step, status'
      )
    } catch (error) {
      log.warn(
        'Learning-step progress is not available in Supabase yet; skipping orphan check. ' +
          'Apply prisma/supabase-learning.sql to enable the sequential course flow. ' +
          `(${describeError(error)})`
      )
    }

    const topicsByChapter = new Map<string, TopicRow[]>()
    for (const topic of topics) {
      const key = String(topic.chapter_id)
      const list = topicsByChapter.get(key) ?? []
      list.push(topic)
      topicsByChapter.set(key, list)
    }
    const chapterPublicIds = new Set(chapters.map((chapter) => chapter.public_id))
    const topicIds = new Set(topics.map((topic) => String(topic.id)))
    const videoTopicIds = new Set(videos.map((video) => String(video.topic_id)))

    const badChapterParts = chapters.filter((chapter) => {
      const parts = topicsByChapter.get(String(chapter.id)) ?? []
      if (parts.length !== 3) return true
      const orders = parts.map((part) => part.order).sort((a, b) => a - b)
      const titles = new Set(parts.map((part) => part.title.trim()))
      return orders.join(',') !== '1,2,3' || titles.size !== 3
    })
    const missingPartVideos = topics.filter((topic) => !videoTopicIds.has(String(topic.id)))
    const orphanTopicProgress = topicProgress.filter(
      (row) => !topicIds.has(String(row.topic_id))
    )
    const orphanSteps = steps.filter((row) => !chapterPublicIds.has(row.chapter_public_id))

    const issues: string[] = []
    if (badChapterParts.length > 0) {
      issues.push(
        `${badChapterParts.length} chapter(s) without exactly three ordered, distinct parts: ` +
          badChapterParts
            .slice(0, 8)
            .map((chapter) => `${chapter.title} (${chapter.public_id})`)
            .join(', ') +
          (badChapterParts.length > 8 ? ' …' : '')
      )
    }
    if (missingPartVideos.length > 0) {
      issues.push(
        `${missingPartVideos.length} lesson part(s) without an embedded video: ` +
          missingPartVideos
            .slice(0, 8)
            .map((topic) => `${topic.title} (${topic.slug})`)
            .join(', ') +
          (missingPartVideos.length > 8 ? ' …' : '')
      )
    }
    if (orphanTopicProgress.length > 0) {
      issues.push(
        `${orphanTopicProgress.length} topic-progress row(s) no longer resolve to a migrated topic.`
      )
    }
    if (orphanSteps.length > 0) {
      issues.push(
        `${orphanSteps.length} learning-step row(s) no longer resolve to a migrated chapter public ID.`
      )
    }

    for (const issue of issues) {
      errors.push({ table: 'learning-structure', scope: 'verify', message: issue })
      log.error(`[learning] ${issue}`)
    }

    if (issues.length === 0) {
      log.ok(
        `[learning] structure verified · lessons=${chapters.length} parts=${topics.length} ` +
          `videos=${videoTopicIds.size} topic-progress=${topicProgress.length} ` +
          `step-progress=${steps.length}`
      )
    }
  } catch (error) {
    const message = `Learning structure verification failed: ${describeError(error)}`
    log.error(message)
    errors.push({ table: 'learning-structure', scope: 'verify', message })
  }

  return errors
}

/* -------------------------------------------------------------------------- */
/* Identity sequence reset                                                    */
/* -------------------------------------------------------------------------- */

function quotePgIdentifier(identifier: string): string {
  return `"${identifier.replaceAll('"', '""')}"`
}

function pgConnectionString(raw: string): string {
  try {
    const url = new URL(raw)
    // pg-connection-string gives sslmode precedence over the explicit `ssl` option. Supabase's
    // pooler certificate chain is often self-signed, so let SUPABASE_DB_SSL_* control TLS instead.
    for (const key of ['sslmode', 'ssl', 'uselibpqcompat']) url.searchParams.delete(key)
    return url.toString()
  } catch {
    return raw
  }
}

async function resetIdentitySequences(
  schema: string,
  ordered: TableMeta[]
): Promise<MigrationError[]> {
  const errors: MigrationError[] = []
  const databaseUrl = process.env.SUPABASE_DB_URL?.trim()

  if (!databaseUrl) {
    log.warn(
      'Identity sequence reset skipped: SUPABASE_DB_URL is not set. ' +
        'After inserting explicit bigint IDs, advance each Postgres sequence before normal inserts, e.g. ' +
        `SELECT setval(pg_get_serial_sequence('${schema}.users', 'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM ${schema}.users;`
    )
    return errors
  }

  const sslEnabled = envFlag('SUPABASE_DB_SSL', true)
  const ssl = sslEnabled
    ? { rejectUnauthorized: envFlag('SUPABASE_DB_SSL_REJECT_UNAUTHORIZED', true) }
    : false

  const client = new PgClient({
    connectionString: pgConnectionString(databaseUrl),
    ssl,
    connectionTimeoutMillis: 15_000,
    application_name: 'career-lab-migration'
  })

  try {
    await client.connect()
    let resetCount = 0

    for (const table of ordered) {
      const qualified = `${quotePgIdentifier(schema)}.${quotePgIdentifier(table.name)}`
      const sequenceResult = await client.query<{ sequence_name: string | null }>(
        'SELECT pg_get_serial_sequence($1, $2) AS sequence_name',
        [qualified, 'id']
      )
      const sequenceName = sequenceResult.rows[0]?.sequence_name
      if (!sequenceName) continue

      const target = qualified
      const maxResult = await client.query<{ max_id: string | null }>(
        `SELECT MAX(${quotePgIdentifier('id')})::text AS max_id FROM ${target}`
      )
      const maxId = maxResult.rows[0]?.max_id

      if (maxId === null || maxId === undefined) {
        await client.query('SELECT setval($1::regclass, 1, false)', [sequenceName])
      } else {
        await client.query('SELECT setval($1::regclass, $2::bigint, true)', [sequenceName, maxId])
      }
      resetCount += 1
    }

    if (resetCount === 0) {
      log.info('Identity sequence reset: no serial/identity sequences found.')
    } else {
      log.ok(`Identity sequence reset complete · sequences=${resetCount}`)
    }
  } catch (error) {
    const message = `Identity sequence reset failed: ${describeError(error)}`
    log.error(message)
    errors.push({ table: '*', scope: 'sequence', message })
  } finally {
    await client.end().catch(() => undefined)
  }

  return errors
}

/* -------------------------------------------------------------------------- */
/* Summary                                                                    */
/* -------------------------------------------------------------------------- */

function printSummary(
  startedAt: number,
  ordered: TableMeta[],
  statsByTable: Map<string, TableStats>,
  errors: MigrationError[],
  settings: Settings,
  interrupted: boolean
): void {
  const tablesSucceeded = ordered.filter((table) => {
    const stats = statsByTable.get(table.name)
    return stats !== undefined && !errors.some((error) => error.table === table.name)
  }).length
  const rowsRead = [...statsByTable.values()].reduce((total, stats) => total + stats.rowsRead, 0)
  const rowsWritten = [...statsByTable.values()].reduce(
    (total, stats) => total + stats.rowsWritten,
    0
  )
  const batches = [...statsByTable.values()].reduce(
    (total, stats) => total + stats.batchesSucceeded + stats.batchesFailed,
    0
  )

  console.log('')
  console.log('────────────────────────────────────────────────────────────')
  console.log(`Migration ${settings.dryRun ? 'dry run ' : ''}summary`)
  console.log(`  Mode:            ${settings.dryRun ? 'DRY RUN (no writes)' : 'UPSERT'}`)
  console.log(`  Tables:          ${tablesSucceeded}/${ordered.length} clean`)
  console.log(`  Rows read:       ${rowsRead}`)
  console.log(`  Rows ${settings.dryRun ? 'validated' : 'upserted'}:      ${rowsWritten}`)
  console.log(`  Batches:         ${batches}`)
  console.log(`  Errors:          ${errors.length}`)
  console.log(`  Duration:        ${formatDuration(Date.now() - startedAt)}`)
  if (settings.since) console.log(`  Since:           ${settings.since}`)
  if (settings.verify && !settings.dryRun) console.log('  Verification:    enabled')
  if (interrupted) console.log('  Status:          INTERRUPTED — rerun to resume safely (upserts are idempotent).')
  console.log('────────────────────────────────────────────────────────────')

  if (errors.length > 0) {
    console.log('')
    console.log('Errors:')
    for (const error of errors.slice(0, 30)) {
      const scope = error.scope === 'batch' ? `batch ${error.batch ?? '?'}` : error.scope
      console.log(`  - ${error.table} (${scope}): ${error.message}`)
    }
    if (errors.length > 30) console.log(`  … ${errors.length - 30} more`)
  }
  console.log('')
}

/* -------------------------------------------------------------------------- */
/* Main                                                                       */
/* -------------------------------------------------------------------------- */

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    console.log(HELP)
    return
  }

  const settings = resolveSettings(args)
  const startedAt = Date.now()
  let stopRequested = false
  let interrupted = false

  const handleSignal = (): void => {
    if (stopRequested) {
      log.warn('Second interrupt received — exiting immediately.')
      process.exit(130)
    }
    stopRequested = true
    interrupted = true
    log.warn(
      'Interrupt received — the current batch will finish, then the migration will stop safely. ' +
        'Press Ctrl+C again to force exit.'
    )
  }
  process.once('SIGINT', handleSignal)
  process.once('SIGTERM', handleSignal)

  const mysqlConfig = buildMysqlConfig()
  log.info(
    `MySQL source: ${mysqlConfig.user}@${mysqlConfig.host}:${mysqlConfig.port}/${mysqlConfig.database}` +
      ` · ssl=${mysqlConfig.ssl ? 'on' : 'off'}`
  )

  const supabaseSettings = settings.dryRun || args.list ? null : buildSupabaseSettings()
  if (supabaseSettings) {
    log.info(
      `Supabase target: ${supabaseSettings.url} · schema=${supabaseSettings.schema} · ` +
        `key=${supabaseSettings.keyRole}`
    )
    if (['anon', 'publishable', 'unknown'].includes(supabaseSettings.keyRole)) {
      log.warn(
        'The Supabase key is not a confirmed service-role/secret key. Row Level Security may block ' +
          'upserts. Use SUPABASE_SERVICE_ROLE_KEY for a server-side migration.'
      )
    }
  } else if (args.list) {
    log.info('List mode: Supabase connection is not required.')
  } else {
    log.info('Dry run: Supabase writes and target checks are disabled.')
  }

  log.info(
    `Settings: batch=${settings.batchSize} rows · max-bytes=${settings.maxBytes} · ` +
      `retries=${settings.maxRetries}` +
      (settings.since ? ` · since=${settings.since}` : '') +
      (settings.verify ? ' · verify=on' : '')
  )

  const pool = createPool({
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
    connectionLimit: mysqlConfig.connectionLimit,
    waitForConnections: true,
    queueLimit: 0,
    charset: 'utf8mb4',
    timezone: 'Z',
    supportBigNumbers: true,
    bigNumberStrings: true,
    dateStrings: false,
    jsonStrings: false,
    multipleStatements: false,
    connectTimeout: 15_000,
    ...(mysqlConfig.ssl ? { ssl: mysqlConfig.ssl } : {})
  })

  const supabase = supabaseSettings ? makeSupabaseClient(supabaseSettings) : null
  const statsByTable = new Map<string, TableStats>()
  const errors: MigrationError[] = []

  try {
    await withMysqlRetry('MySQL connection check', () => pool.query('SELECT 1 AS ok'))
    log.ok('MySQL connection established.')

    const allTables = await withMysqlRetry('MySQL schema introspection', () =>
      loadSchema(pool, mysqlConfig.database)
    )
    log.ok(`Discovered ${allTables.length} MySQL table(s).`)

    const selected = selectTables(allTables, settings)
    const ordered = orderByDependencies(selected)

    if (args.list) {
      printTableList(allTables, settings, ordered)
      return
    }

    validateTables(ordered)
    log.info(`Migration order: ${ordered.map((table) => table.name).join(' → ')}`)

    if (supabase && !settings.skipTargetCheck) {
      await preflightTargetTables(supabase, supabaseSettings?.schema ?? 'public', ordered)
    }

    for (const table of ordered) {
      if (stopRequested) {
        interrupted = true
        break
      }

      const result = await migrateTable(
        pool,
        supabase,
        supabaseSettings?.schema ?? 'public',
        table,
        settings,
        () => stopRequested
      )
      statsByTable.set(table.name, result.stats)
      errors.push(...result.errors)

      if (settings.failFast && result.errors.length > 0) {
        log.error('--fail-fast is enabled; stopping after the first failed table/batch.')
        break
      }
    }

    if (settings.verify && supabase && !settings.dryRun && !interrupted) {
      const schema = supabaseSettings?.schema ?? 'public'
      errors.push(...(await verifyTableCounts(supabase, schema, ordered, statsByTable, settings.since)))
      errors.push(...(await verifyLearningStructure(supabase, schema, ordered)))
    }

    if (!settings.dryRun && !settings.noSequenceReset && !interrupted) {
      errors.push(...(await resetIdentitySequences(supabaseSettings?.schema ?? 'public', ordered)))
    }

    printSummary(startedAt, ordered, statsByTable, errors, settings, interrupted)
    if (errors.length > 0) process.exitCode = 1
    if (interrupted) process.exitCode = 130
  } finally {
    process.off('SIGINT', handleSignal)
    process.off('SIGTERM', handleSignal)
    await pool.end().catch((error: unknown) => {
      log.warn(`MySQL pool close failed: ${describeError(error)}`)
    })
  }
}

void main().catch((error: unknown) => {
  log.error('Migration aborted.', { error: describeError(error) })
  if (process.env.MIGRATION_DEBUG === 'true' && error instanceof Error && error.stack) {
    console.error(error.stack)
  }
  process.exitCode = 1
})
