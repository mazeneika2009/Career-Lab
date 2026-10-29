-- Career Lab — progress, assessment evidence and per-skill metrics
--
-- MySQL is the operational source of truth. These tables are an exact,
-- server-maintained mirror written after every graded event:
--
--   assessment_scores — immutable event ledger (one row per event × skill)
--   skill_metrics     — latest per-skill aggregate snapshot
--   user_progress     — per-career dashboard/performance rollup
--
-- Apply with:
--   npm run apply:progress-schema
-- (or psql "$env:SUPABASE_DB_URL" -f prisma/supabase-progress.sql)
--
-- Every statement is idempotent.

-- Shared updated_at trigger function ---------------------------------------

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Event ledger --------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.assessment_scores (
    id BIGSERIAL PRIMARY KEY,
    user_public_id CHAR(26) NOT NULL,
    career_slug VARCHAR(80) NOT NULL,
    source_type VARCHAR(24) NOT NULL CHECK (source_type IN (
        'theory_exam', 'practical_exam', 'assignment', 'sim_task',
        'communication', 'scenario', 'interview'
    )),
    source_public_id VARCHAR(64) NOT NULL,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(16) NOT NULL CHECK (category IN (
        'theory', 'practical', 'assignment', 'communication', 'simulation', 'interview'
    )),
    skill VARCHAR(120) NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    status VARCHAR(16) NOT NULL CHECK (status IN ('passed', 'failed', 'completed')),
    passed BOOLEAN,
    occurred_at TIMESTAMP(3) NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT assessment_scores_event_skill_key
        UNIQUE (user_public_id, career_slug, source_type, source_public_id, skill),
    CONSTRAINT assessment_scores_user_fk
        FOREIGN KEY (user_public_id) REFERENCES public.users(public_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT assessment_scores_career_fk
        FOREIGN KEY (career_slug) REFERENCES public.careers(slug)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS assessment_scores_user_career_time_idx
    ON public.assessment_scores (user_public_id, career_slug, occurred_at DESC);

CREATE INDEX IF NOT EXISTS assessment_scores_category_idx
    ON public.assessment_scores (user_public_id, career_slug, category);

-- Per-skill aggregate snapshot ---------------------------------------------

CREATE TABLE IF NOT EXISTS public.skill_metrics (
    id BIGSERIAL PRIMARY KEY,
    user_public_id CHAR(26) NOT NULL,
    career_slug VARCHAR(80) NOT NULL,
    skill VARCHAR(120) NOT NULL,
    percent INTEGER NOT NULL DEFAULT 0 CHECK (percent >= 0 AND percent <= 100),
    learning_done INTEGER NOT NULL DEFAULT 0 CHECK (learning_done >= 0),
    learning_total INTEGER NOT NULL DEFAULT 0 CHECK (learning_total >= 0),
    theory_avg INTEGER CHECK (theory_avg IS NULL OR (theory_avg >= 0 AND theory_avg <= 100)),
    practical_avg INTEGER CHECK (practical_avg IS NULL OR (practical_avg >= 0 AND practical_avg <= 100)),
    assignment_avg INTEGER CHECK (assignment_avg IS NULL OR (assignment_avg >= 0 AND assignment_avg <= 100)),
    communication_avg INTEGER CHECK (communication_avg IS NULL OR (communication_avg >= 0 AND communication_avg <= 100)),
    simulation_avg INTEGER CHECK (simulation_avg IS NULL OR (simulation_avg >= 0 AND simulation_avg <= 100)),
    interview_avg INTEGER CHECK (interview_avg IS NULL OR (interview_avg >= 0 AND interview_avg <= 100)),
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT skill_metrics_user_career_skill_key
        UNIQUE (user_public_id, career_slug, skill),
    CONSTRAINT skill_metrics_user_fk
        FOREIGN KEY (user_public_id) REFERENCES public.users(public_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT skill_metrics_career_fk
        FOREIGN KEY (career_slug) REFERENCES public.careers(slug)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS skill_metrics_user_career_idx
    ON public.skill_metrics (user_public_id, career_slug);

-- Per-career dashboard rollup ----------------------------------------------

CREATE TABLE IF NOT EXISTS public.user_progress (
    id BIGSERIAL PRIMARY KEY,
    user_public_id CHAR(26) NOT NULL,
    career_slug VARCHAR(80) NOT NULL,
    completed_topics INTEGER NOT NULL DEFAULT 0 CHECK (completed_topics >= 0),
    total_topics INTEGER NOT NULL DEFAULT 0 CHECK (total_topics >= 0),
    learning_percent INTEGER NOT NULL DEFAULT 0 CHECK (learning_percent >= 0 AND learning_percent <= 100),
    theory_avg INTEGER CHECK (theory_avg IS NULL OR (theory_avg >= 0 AND theory_avg <= 100)),
    practical_avg INTEGER CHECK (practical_avg IS NULL OR (practical_avg >= 0 AND practical_avg <= 100)),
    assignment_avg INTEGER CHECK (assignment_avg IS NULL OR (assignment_avg >= 0 AND assignment_avg <= 100)),
    communication_avg INTEGER CHECK (communication_avg IS NULL OR (communication_avg >= 0 AND communication_avg <= 100)),
    simulation_avg INTEGER CHECK (simulation_avg IS NULL OR (simulation_avg >= 0 AND simulation_avg <= 100)),
    technical_interview_latest INTEGER
        CHECK (technical_interview_latest IS NULL OR (technical_interview_latest >= 0 AND technical_interview_latest <= 100)),
    overall_percent INTEGER NOT NULL DEFAULT 0 CHECK (overall_percent >= 0 AND overall_percent <= 100),
    assessments_count INTEGER NOT NULL DEFAULT 0 CHECK (assessments_count >= 0),
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT user_progress_user_career_key
        UNIQUE (user_public_id, career_slug),
    CONSTRAINT user_progress_user_fk
        FOREIGN KEY (user_public_id) REFERENCES public.users(public_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT user_progress_career_fk
        FOREIGN KEY (career_slug) REFERENCES public.careers(slug)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS user_progress_user_idx
    ON public.user_progress (user_public_id);

-- updated_at triggers ------------------------------------------------------

DROP TRIGGER IF EXISTS assessment_scores_set_updated_at ON public.assessment_scores;
CREATE TRIGGER assessment_scores_set_updated_at
    BEFORE UPDATE ON public.assessment_scores
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS skill_metrics_set_updated_at ON public.skill_metrics;
CREATE TRIGGER skill_metrics_set_updated_at
    BEFORE UPDATE ON public.skill_metrics
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS user_progress_set_updated_at ON public.user_progress;
CREATE TRIGGER user_progress_set_updated_at
    BEFORE UPDATE ON public.user_progress
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Server-only data. No anon/authenticated policies: the service-role key
-- bypasses RLS and every API route is authenticated.
ALTER TABLE public.assessment_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.assessment_scores FROM anon, authenticated;
REVOKE ALL ON public.skill_metrics FROM anon, authenticated;
REVOKE ALL ON public.user_progress FROM anon, authenticated;

NOTIFY pgrst, 'reload schema';
