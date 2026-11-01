# MySQL → Supabase migration

`migrate-to-supabase.ts` copies the Career Lab MySQL database into the Supabase
Postgres project. It discovers tables from MySQL, orders them by foreign-key
dependencies, normalizes MySQL-specific values, and upserts every row through
PostgREST in bounded batches. The command is **idempotent** and can be rerun at
any time.

## What it does

- Reads every selected table using keyset pagination on the primary key.
- Orders tables parent-first so foreign keys are satisfied.
- Converts values that differ between MySQL and Postgres:
  - `BIGINT` → decimal string
  - `tinyint(1)` → boolean
  - MySQL `JSON` → JSON object/array
  - MySQL `DATETIME`/`TIMESTAMP` → UTC ISO-8601
  - MySQL `ENUM` → the matching Postgres enum label
- Upserts on the MySQL primary key, so reruns update instead of duplicate.
- Splits large tables into row- and byte-bounded requests (default 500 rows /
  4 MB), retries transient failures, and logs every table and batch.
- Optionally verifies row counts and advances Postgres identity sequences.

It **never deletes** target rows. Rows removed from MySQL stay in Supabase until
you delete them explicitly.

## Prerequisites

1. Node.js 22+ and `npm install` in `backend/`.
2. A reachable MySQL database (`DATABASE_URL` or the `MYSQL_*` variables).
3. A Supabase project with the mirrored schema applied. Use
   [`prisma/supabase-schema.sql`](../prisma/supabase-schema.sql) on a **fresh**
   project, either in the Supabase SQL editor or with `psql`:

   ```powershell
   psql "$env:SUPABASE_DB_URL" -f prisma/supabase-schema.sql
   ```

   The SQL creates the 13 enum types, 38 tables, indexes, and foreign keys. It
   assumes the `public` schema is empty; do not rerun it against a populated
   project.

4. Optional but recommended: apply
   [`prisma/supabase-rls.sql`](../prisma/supabase-rls.sql) to enable
   deny-by-default Row Level Security:

   ```powershell
   psql "$env:SUPABASE_DB_URL" -f prisma/supabase-rls.sql
   ```

5. Supabase credentials in `backend/.env` (see `.env.example`). Use the
   **service-role** or **secret** key for server-side writes. The anon key is a
   fallback only and will be blocked once RLS is enabled.

### Regenerating the schema SQL

`prisma/supabase-schema.sql` was generated from `prisma/schema.prisma` with
Prisma's PostgreSQL provider. If the Prisma model changes, regenerate it:

1. Copy `prisma/schema.prisma` to a temporary file.
2. Change `provider = "mysql"` to `provider = "postgresql"`.
3. Replace `@db.TinyInt` with `@db.SmallInt` (Postgres has no `TinyInt`).
4. Ensure the file has **no UTF-8 BOM** (Prisma rejects a leading BOM).
5. Generate the DDL and apply it to a fresh project:

   ```powershell
   npx prisma migrate diff `
     --from-empty `
     --to-schema-datamodel "$env:TEMP\career-lab-supabase.prisma" `
     --script | Out-File -Encoding utf8 prisma/supabase-schema.sql
   ```

## Configuration

| Variable | Required | Purpose |
| --- | --- | --- |
| `SUPABASE_URL` | yes | Project URL, e.g. `https://<ref>.supabase.co`. |
| `SUPABASE_SERVICE_ROLE_KEY` | recommended | Service-role key. `SUPABASE_SECRET_KEY` is also accepted. |
| `SUPABASE_ANON_KEY` | fallback | Anon/publishable key; subject to RLS. |
| `SUPABASE_SCHEMA` | no | Target schema (default `public`). |
| `SUPABASE_DB_URL` | optional | Direct Postgres URL used only to advance identity sequences. Use the non-pooling endpoint on port 5432. |
| `SUPABASE_DB_SSL` | no | `true` (default) enables TLS for the sequence-reset connection. |
| `SUPABASE_DB_SSL_REJECT_UNAUTHORIZED` | no | Defaults to `true`; set `false` for Supabase's self-signed pooler chain. |
| `MIGRATION_TABLES` | no | Comma-separated allow-list. |
| `MIGRATION_EXCLUDE_TABLES` | no | Comma-separated deny-list. `_prisma_migrations` is always excluded. |
| `MIGRATION_SINCE` | no | ISO timestamp for incremental runs. |
| `MIGRATION_BATCH_SIZE` | no | Rows per request (default 500). |
| `MIGRATION_MAX_BYTES` | no | Approximate JSON payload cap (default 4 MB). |
| `MIGRATION_MAX_RETRIES` | no | Retries after transient Supabase failures (default 4). |
| `MIGRATION_VERIFY` | no | Set `true` to verify counts. |
| `MIGRATION_DRY_RUN` | no | Set `true` to transform without writing. |
| `MIGRATION_DEBUG` | no | Set `true` for stack traces on fatal errors. |

The MySQL side uses `DATABASE_URL` when present, otherwise `MYSQL_HOST`,
`MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`, and optional
`MYSQL_SSL*` variables.

## Usage

```powershell
# Inspect discovered tables and foreign-key order (no Supabase connection needed)
npm run migrate:supabase:list

# Read and transform every row, but write nothing
npm run migrate:supabase:dry

# Full idempotent sync
npm run migrate:supabase

# Full sync with row-count verification
npx tsx scripts/migrate-to-supabase.ts --verify

# One or more tables
npx tsx scripts/migrate-to-supabase.ts --tables=users,careers,topics

# Incremental sync since a timestamp
npx tsx scripts/migrate-to-supabase.ts --since=2026-01-01T00:00:00Z
```

Useful flags: `--table`, `--tables`, `--exclude`, `--batch-size`,
`--max-bytes`, `--max-retries`, `--fail-fast`, `--skip-target-check`,
`--no-sequence-reset`, `--verify`, `--help`.

For a first run against a large database, start with `--dry-run` and inspect the
per-table counts and enum warnings. Use `--fail-fast` when diagnosing a schema
mismatch.

## Verification

`--verify` compares the exact Supabase count with the number of rows read from
MySQL per table. It passes when Supabase has **at least** that many rows (extra
target-only rows are allowed). Verification is skipped for `--since` runs
because only a subset is migrated.

It also audits the learning structure that the course player depends on:

- every chapter has exactly three ordered, distinct lesson parts;
- every part has at least one embedded `video` resource;
- `topic_progress` rows still resolve to a migrated topic;
- `learning_step_progress` rows still resolve to a migrated chapter public ID
  (the check is skipped with a warning when the learning schema is not applied).

Because chapters and topics are upserted by stable slug/public ID and resource
rows are replaced in place, rerunning the seed or migration preserves existing
student progress on unchanged lessons. Progress for content removed from the
authored curriculum is the only progress intentionally dropped.

The command also logs `status` and `priority` distributions per table after each
table finishes, which is useful for confirming enum normalization.

## Identity sequences

The mirrored tables use `BIGSERIAL` primary keys. Because the migration inserts
explicit IDs, the sequences must be advanced before normal `INSERT`s. When
`SUPABASE_DB_URL` is set, the script runs `setval` for every migrated table
after the migration completes. Without it, you get a warning and must reset
sequences manually:

```sql
SELECT setval(pg_get_serial_sequence('public.users', 'id'),
              COALESCE(MAX(id), 1),
              MAX(id) IS NOT NULL)
FROM public.users;
```

Skip this step with `--no-sequence-reset` only if you reset sequences yourself.

## Row Level Security

The migration uses the service-role key, which bypasses RLS. Apply
`prisma/supabase-rls.sql` after loading data to enable deny-by-default RLS on
every mirrored table:

```powershell
psql "$env:SUPABASE_DB_URL" -f prisma/supabase-rls.sql
```

Anon/authenticated clients then receive no rows until you add explicit policies.
Add policies only for the tables and operations the frontend actually needs, and
keep sensitive tables (`users`, `sessions`, `email_tokens`, `audit_logs`)
private. Trusted server-side code that uses the service-role key bypasses RLS and
is unaffected.

## Troubleshooting

- **`SELF_SIGNED_CERT_IN_CHAIN`** — Supabase's pooler uses a self-signed chain.
  Set `SUPABASE_DB_SSL_REJECT_UNAUTHORIZED=false` and keep `sslmode` out of the
  URL, or use the non-pooling endpoint. The script strips `sslmode` from
  `SUPABASE_DB_URL` so the explicit TLS settings win.
- **`PGRST205` / table not found after creating tables** — PostgREST caches the
  schema. Run `NOTIFY pgrst, 'reload schema';` in the SQL editor (the DDL
  application does this).
- **Enum value rejected** — the script logs unknown values and normalizes common
  aliases (`urgent` → `critical`, `medium` → `normal`, `done` → `completed`,
  etc.). Add a mapping in `ENUM_ALIASES` if the source has a new label.
- **Foreign-key violation** — confirm the parent table finished without errors
  and rerun; upserts are safe. Tables are ordered by dependency automatically.
- **RLS blocks writes** — use `SUPABASE_SERVICE_ROLE_KEY`, not the anon key.

## Security

`backend/.env` is gitignored. Never commit service-role keys or database
passwords, and never expose them to the frontend. Rotate keys and the database
password if they were shared in plaintext.
