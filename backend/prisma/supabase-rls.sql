-- Deny-by-default Row Level Security for the mirrored Career Lab tables.
--
-- The migration and any trusted server-side tooling use the service-role key,
-- which bypasses RLS. Anon/authenticated clients receive no rows until you add
-- explicit policies for the operations they need.
--
-- Apply after prisma/supabase-schema.sql:
--   psql "$env:SUPABASE_DB_URL" -f prisma/supabase-rls.sql
--
-- Add policies per table, for example:
--   CREATE POLICY "public careers are readable"
--     ON public.careers FOR SELECT
--     TO anon, authenticated
--     USING (true);
--
-- Do not expose users, sessions, email_tokens, or audit_logs to client roles.

DO $$
DECLARE
  target record;
BEGIN
  FOR target IN
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
    ORDER BY tablename
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', target.tablename);
  END LOOP;
END $$;

-- Ask PostgREST to pick up the new table settings immediately.
NOTIFY pgrst, 'reload schema';
