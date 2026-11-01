/**
 * Apply and verify the progress/assessment Supabase schema.
 *
 * Usage:
 *   npm run apply:progress-schema
 *
 * Requires SUPABASE_DB_URL (direct Postgres connection; port 5432 works best).
 * Re-running is safe: every statement is idempotent. Verification checks the
 * tables, foreign keys, updated_at triggers and RLS state before exiting.
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { config as loadEnv } from 'dotenv'
import { Client } from 'pg'

loadEnv()

const TABLES = ['assessment_scores', 'skill_metrics', 'user_progress'] as const

function envFlag(name: string, fallback: boolean): boolean {
  const raw = process.env[name]
  if (raw === undefined || raw === '') return fallback
  return ['1', 'true', 'yes', 'on'].includes(raw.toLowerCase())
}

function pgConnectionString(raw: string): string {
  try {
    const url = new URL(raw)
    for (const key of ['sslmode', 'ssl', 'uselibpqcompat']) url.searchParams.delete(key)
    return url.toString()
  } catch {
    return raw
  }
}

async function main(): Promise<void> {
  const databaseUrl = process.env.SUPABASE_DB_URL?.trim()
  if (!databaseUrl) {
    throw new Error('SUPABASE_DB_URL is required to apply the progress schema.')
  }

  const sqlPath = resolve(process.cwd(), 'prisma/supabase-progress.sql')
  const sql = readFileSync(sqlPath, 'utf8')

  const client = new Client({
    connectionString: pgConnectionString(databaseUrl),
    ssl: envFlag('SUPABASE_DB_SSL', true)
      ? { rejectUnauthorized: envFlag('SUPABASE_DB_SSL_REJECT_UNAUTHORIZED', true) }
      : false,
    connectionTimeoutMillis: 15_000,
    application_name: 'career-lab-progress-schema'
  })

  await client.connect()
  try {
    await client.query(sql)

    const tables = await client.query<{ table_name: string }>(
      `SELECT table_name
         FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name = ANY($1::text[])
        ORDER BY table_name`,
      [[...TABLES]]
    )

    const foreignKeys = await client.query<{
      table_name: string
      conname: string
      definition: string
    }>(
      `SELECT rel.relname AS table_name,
              con.conname,
              pg_get_constraintdef(con.oid) AS definition
         FROM pg_constraint con
         JOIN pg_class rel ON rel.oid = con.conrelid
         JOIN pg_namespace n ON n.oid = rel.relnamespace
        WHERE n.nspname = 'public'
          AND rel.relname = ANY($1::text[])
          AND con.contype = 'f'
        ORDER BY rel.relname, con.conname`,
      [[...TABLES]]
    )

    const triggers = await client.query<{ table_name: string; trigger_name: string }>(
      `SELECT event_object_table AS table_name, trigger_name
         FROM information_schema.triggers
        WHERE trigger_schema = 'public'
          AND event_object_table = ANY($1::text[])
          AND event_manipulation = 'UPDATE'
        ORDER BY event_object_table, trigger_name`,
      [[...TABLES]]
    )

    const rls = await client.query<{ relname: string; relrowsecurity: boolean }>(
      `SELECT c.relname, c.relrowsecurity
         FROM pg_class c
         JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public'
          AND c.relname = ANY($1::text[])
        ORDER BY c.relname`,
      [[...TABLES]]
    )

    const columns = await client.query<{ table_name: string; column_name: string }>(
      `SELECT table_name, column_name
         FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = ANY($1::text[])
          AND column_name = 'updated_at'
        ORDER BY table_name`,
      [[...TABLES]]
    )

    const fkCounts = new Map<string, number>()
    for (const row of foreignKeys.rows) {
      fkCounts.set(row.table_name, (fkCounts.get(row.table_name) ?? 0) + 1)
    }
    const fkSql = foreignKeys.rows.map((row) => row.definition).join(' ')
    const triggerTables = new Set(triggers.rows.map((row) => row.table_name))
    const updatedAtTables = new Set(columns.rows.map((row) => row.table_name))
    const rlsOff = rls.rows.filter((row) => !row.relrowsecurity).map((row) => row.relname)

    console.log(
      `Progress tables present: ${tables.rows.map((row) => row.table_name).join(', ') || 'none'}`
    )
    console.log(
      `Foreign keys: ${TABLES.map((table) => {
        const count = fkCounts.get(table) ?? 0
        return `${table}=${count}${count >= 2 ? '' : ' (expected 2)'}`
      }).join(', ')}`
    )
    console.log(
      `FK targets: users(public_id)=${/users\(public_id\)/.test(fkSql) ? 'yes' : 'no'}, ` +
        `careers(slug)=${/careers\(slug\)/.test(fkSql) ? 'yes' : 'no'}`
    )
    console.log(
      `updated_at triggers: ${TABLES.map(
        (table) => `${table}=${triggerTables.has(table) ? 'yes' : 'no'}`
      ).join(', ')}`
    )
    console.log(
      `updated_at columns: ${TABLES.map(
        (table) => `${table}=${updatedAtTables.has(table) ? 'yes' : 'no'}`
      ).join(', ')}`
    )
    console.log(`Row Level Security: ${rls.rows.map((row) => `${row.relname}=${row.relrowsecurity ? 'on' : 'off'}`).join(', ')}`)

    const missingTables = TABLES.filter(
      (table) => !tables.rows.some((row) => row.table_name === table)
    )
    const missingFks = TABLES.filter((table) => (fkCounts.get(table) ?? 0) < 2)
    const missingTriggers = TABLES.filter((table) => !triggerTables.has(table))
    const missingUpdatedAt = TABLES.filter((table) => !updatedAtTables.has(table))

    if (
      missingTables.length > 0 ||
      missingFks.length > 0 ||
      missingTriggers.length > 0 ||
      missingUpdatedAt.length > 0 ||
      !/users\(public_id\)/.test(fkSql) ||
      !/careers\(slug\)/.test(fkSql) ||
      rlsOff.length > 0
    ) {
      throw new Error(
        `Progress schema verification failed (tables: ${missingTables.join(', ') || 'ok'}; ` +
          `FKs: ${missingFks.join(', ') || 'ok'}; triggers: ${missingTriggers.join(', ') || 'ok'}; ` +
          `updated_at: ${missingUpdatedAt.join(', ') || 'ok'}; RLS off: ${rlsOff.join(', ') || 'none'}).`
      )
    }

    console.log('Progress schema verification passed.')
  } finally {
    await client.end().catch(() => undefined)
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
