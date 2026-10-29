/**
 * Apply the sequential-learning Supabase schema.
 *
 * Usage:
 *   npm run apply:learning-schema
 *
 * Requires SUPABASE_DB_URL (direct Postgres connection; port 5432 works best).
 * Re-running is safe: every statement is idempotent.
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { config as loadEnv } from 'dotenv'
import { Client } from 'pg'

loadEnv()

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
    throw new Error('SUPABASE_DB_URL is required to apply the learning schema.')
  }

  const sqlPath = resolve(process.cwd(), 'prisma/supabase-learning.sql')
  const sql = readFileSync(sqlPath, 'utf8')

  const client = new Client({
    connectionString: pgConnectionString(databaseUrl),
    ssl: envFlag('SUPABASE_DB_SSL', true)
      ? { rejectUnauthorized: envFlag('SUPABASE_DB_SSL_REJECT_UNAUTHORIZED', true) }
      : false,
    connectionTimeoutMillis: 15_000,
    application_name: 'career-lab-learning-schema'
  })

  await client.connect()
  try {
    await client.query(sql)

    const tables = await client.query<{ table_name: string }>(
      `SELECT table_name
         FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name IN (
            'learning_step_progress',
            'practical_submissions',
            'interview_verifications',
            'workplace_progress'
          )
        ORDER BY table_name`
    )
    const rls = await client.query<{ relname: string; relrowsecurity: boolean }>(
      `SELECT c.relname, c.relrowsecurity
         FROM pg_class c
         JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public'
          AND c.relname IN (
            'learning_step_progress',
            'practical_submissions',
            'interview_verifications',
            'workplace_progress'
          )
        ORDER BY c.relname`
    )
    const merge = await client.query<{ routine_name: string }>(
      `SELECT routine_name
         FROM information_schema.routines
        WHERE routine_schema = 'public'
          AND routine_name = 'merge_workplace_progress'`
    )

    console.log(`Learning tables present: ${tables.rows.map((r) => r.table_name).join(', ') || 'none'}`)
    console.log(`Row Level Security: ${rls.rows.map((r) => `${r.relname}=${r.relrowsecurity ? 'on' : 'off'}`).join(', ')}`)
    console.log(`Workplace merge function: ${merge.rows.length > 0 ? 'present' : 'missing'}`)
    if (
      tables.rows.length !== 4 ||
      rls.rows.some((r) => !r.relrowsecurity) ||
      merge.rows.length === 0
    ) {
      throw new Error('Learning schema verification failed.')
    }
  } finally {
    await client.end().catch(() => undefined)
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
