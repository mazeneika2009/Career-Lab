-- Career Lab — sequential learning state (Supabase/Postgres)
--
-- These tables are written only by the authenticated backend with the
-- service-role key. The browser never talks to Supabase directly.
--
-- Apply with:
--   npm run apply:learning-schema
-- (or psql "$env:SUPABASE_DB_URL" -f prisma/supabase-learning.sql)

CREATE TABLE IF NOT EXISTS public.learning_step_progress (
    id BIGSERIAL PRIMARY KEY,
    user_public_id CHAR(26) NOT NULL,
    career_slug VARCHAR(80) NOT NULL,
    chapter_public_id CHAR(26) NOT NULL,
    step VARCHAR(16) NOT NULL CHECK (step IN ('content', 'theory', 'practical', 'assignment')),
    status VARCHAR(16) NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
    score INTEGER CHECK (score IS NULL OR (score >= 0 AND score <= 100)),
    completed_at TIMESTAMP(3),
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT learning_step_progress_unique
        UNIQUE (user_public_id, career_slug, chapter_public_id, step)
);

-- Existing installations created the table with a three-step check. Replace
-- that check idempotently so the assignment stage is accepted everywhere.
ALTER TABLE public.learning_step_progress
    DROP CONSTRAINT IF EXISTS learning_step_progress_step_check;

DO $$
DECLARE
    step_constraint TEXT;
BEGIN
    SELECT conname
      INTO step_constraint
      FROM pg_constraint
     WHERE conrelid = 'public.learning_step_progress'::regclass
       AND contype = 'c'
       AND pg_get_constraintdef(oid) ILIKE '%step%'
       AND pg_get_constraintdef(oid) NOT ILIKE '%assignment%'
     LIMIT 1;

    IF step_constraint IS NOT NULL THEN
        EXECUTE format(
            'ALTER TABLE public.learning_step_progress DROP CONSTRAINT %I',
            step_constraint
        );
    END IF;
END
$$;

ALTER TABLE public.learning_step_progress
    ADD CONSTRAINT learning_step_progress_step_check
    CHECK (step IN ('content', 'theory', 'practical', 'assignment'));

CREATE INDEX IF NOT EXISTS learning_step_progress_user_career_idx
    ON public.learning_step_progress (user_public_id, career_slug);

CREATE TABLE IF NOT EXISTS public.practical_submissions (
    id BIGSERIAL PRIMARY KEY,
    public_id CHAR(26) NOT NULL UNIQUE,
    user_public_id CHAR(26) NOT NULL,
    career_slug VARCHAR(80) NOT NULL,
    chapter_public_id CHAR(26) NOT NULL,
    exam_public_id CHAR(26) NOT NULL,
    language VARCHAR(40) NOT NULL,
    code TEXT NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    passed BOOLEAN NOT NULL,
    feedback JSONB NOT NULL DEFAULT '{}'::jsonb,
    graded_by VARCHAR(20) NOT NULL CHECK (graded_by IN ('ai', 'deterministic')),
    model VARCHAR(120),
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS practical_submissions_user_exam_idx
    ON public.practical_submissions (user_public_id, exam_public_id, created_at DESC);

-- Two-stage interview support on the mirrored interview tables. The backend
-- uses MySQL for attempt state and this table as the verification mirror.
ALTER TABLE IF EXISTS public.interview_questions
    ADD COLUMN IF NOT EXISTS stage VARCHAR(20) NOT NULL DEFAULT 'technical';

ALTER TABLE IF EXISTS public.interview_sessions
    ADD COLUMN IF NOT EXISTS stage VARCHAR(20) NOT NULL DEFAULT 'technical';

CREATE INDEX IF NOT EXISTS interview_questions_career_stage_order_idx
    ON public.interview_questions (career_id, stage, "order");

CREATE INDEX IF NOT EXISTS interview_sessions_user_career_stage_idx
    ON public.interview_sessions (user_id, career_id, stage);

CREATE TABLE IF NOT EXISTS public.interview_verifications (
    id BIGSERIAL PRIMARY KEY,
    user_public_id CHAR(26) NOT NULL,
    career_slug VARCHAR(80) NOT NULL,
    stage VARCHAR(20) NOT NULL CHECK (stage IN ('hr', 'technical')),
    session_public_id CHAR(26) NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    passed BOOLEAN NOT NULL,
    verified_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT interview_verifications_user_career_stage_key
        UNIQUE (user_public_id, career_slug, stage)
);

CREATE INDEX IF NOT EXISTS interview_verifications_user_career_idx
    ON public.interview_verifications (user_public_id, career_slug);

-- Workplace unlock/completion mirror -----------------------------------------
--
-- Company Simulation and Team Communication share one technical-interview
-- unlock. The remaining modules open once the simulated company is entered.
-- Rows are monotonic: an unlock or completion is never cleared.

CREATE TABLE IF NOT EXISTS public.workplace_progress (
    id BIGSERIAL PRIMARY KEY,
    user_public_id CHAR(26) NOT NULL,
    career_slug VARCHAR(80) NOT NULL,
    module VARCHAR(32) NOT NULL CHECK (module IN (
        'company_simulation', 'team_communication', 'client_communication',
        'deadlines', 'scenarios'
    )),
    unlocked BOOLEAN NOT NULL DEFAULT FALSE,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    unlocked_at TIMESTAMP(3),
    completed_at TIMESTAMP(3),
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT workplace_progress_user_career_module_key
        UNIQUE (user_public_id, career_slug, module),
    CONSTRAINT workplace_progress_user_fk
        FOREIGN KEY (user_public_id) REFERENCES public.users(public_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT workplace_progress_career_fk
        FOREIGN KEY (career_slug) REFERENCES public.careers(slug)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS workplace_progress_user_career_idx
    ON public.workplace_progress (user_public_id, career_slug);

CREATE OR REPLACE FUNCTION public.set_workplace_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS workplace_progress_set_updated_at ON public.workplace_progress;
CREATE TRIGGER workplace_progress_set_updated_at
    BEFORE UPDATE ON public.workplace_progress
    FOR EACH ROW EXECUTE FUNCTION public.set_workplace_progress_updated_at();

-- Atomic monotonic merge -----------------------------------------------------
--
-- The backend writes unlock and completion events from several flows (gate
-- reads, interview submission, simulation start, task/thread/scenario
-- completion). A read-then-upsert in application code could race and clear a
-- flag, so the OR happens inside Postgres in a single statement instead.

CREATE OR REPLACE FUNCTION public.merge_workplace_progress(
    p_user_public_id CHAR(26),
    p_career_slug VARCHAR(80),
    p_rows JSONB
)
RETURNS VOID AS $$
    INSERT INTO public.workplace_progress (
        user_public_id,
        career_slug,
        module,
        unlocked,
        completed,
        unlocked_at,
        completed_at
    )
    SELECT
        p_user_public_id,
        p_career_slug,
        item->>'module',
        COALESCE((item->>'unlocked')::boolean, FALSE),
        COALESCE((item->>'completed')::boolean, FALSE),
        CASE
            WHEN COALESCE((item->>'unlocked')::boolean, FALSE)
            THEN CURRENT_TIMESTAMP
        END,
        CASE
            WHEN COALESCE((item->>'completed')::boolean, FALSE)
            THEN CURRENT_TIMESTAMP
        END
    FROM jsonb_array_elements(p_rows) AS item
    ON CONFLICT (user_public_id, career_slug, module) DO UPDATE
    SET unlocked = public.workplace_progress.unlocked OR EXCLUDED.unlocked,
        completed = public.workplace_progress.completed OR EXCLUDED.completed,
        unlocked_at = COALESCE(
            public.workplace_progress.unlocked_at,
            EXCLUDED.unlocked_at
        ),
        completed_at = COALESCE(
            public.workplace_progress.completed_at,
            EXCLUDED.completed_at
        ),
        updated_at = CURRENT_TIMESTAMP;
$$ LANGUAGE sql;

REVOKE ALL ON FUNCTION public.merge_workplace_progress(
    CHAR(26), VARCHAR(80), JSONB
) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.merge_workplace_progress(
    CHAR(26), VARCHAR(80), JSONB
) TO service_role;

-- Server-only data. No anon/authenticated policies are added on purpose:
-- the service-role key bypasses RLS and every API route is authenticated.
ALTER TABLE public.learning_step_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practical_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workplace_progress ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.learning_step_progress FROM anon, authenticated;
REVOKE ALL ON public.practical_submissions FROM anon, authenticated;
REVOKE ALL ON public.interview_verifications FROM anon, authenticated;
REVOKE ALL ON public.workplace_progress FROM anon, authenticated;

NOTIFY pgrst, 'reload schema';
