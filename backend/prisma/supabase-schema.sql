-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('pending_verification', 'active', 'suspended', 'deleted');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('active', 'rotated', 'revoked');

-- CreateEnum
CREATE TYPE "EmailTokenPurpose" AS ENUM ('email_verify', 'password_reset');

-- CreateEnum
CREATE TYPE "ActorType" AS ENUM ('user', 'system', 'anonymous');

-- CreateEnum
CREATE TYPE "SecurityEventKind" AS ENUM ('login_fail', 'refresh_reuse', 'rate_limit_hit', 'perm_denied');

-- CreateEnum
CREATE TYPE "ResourceKind" AS ENUM ('link', 'video', 'tool', 'source');

-- CreateEnum
CREATE TYPE "ProgressStatus" AS ENUM ('not_started', 'in_progress', 'completed');

-- CreateEnum
CREATE TYPE "ExamKind" AS ENUM ('theory', 'practical');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('submitted', 'evaluated');

-- CreateEnum
CREATE TYPE "EvalTargetType" AS ENUM ('assignment', 'practical_exam', 'sim_task', 'scenario', 'communication', 'interview');

-- CreateEnum
CREATE TYPE "SimPriority" AS ENUM ('low', 'normal', 'high', 'critical');

-- CreateEnum
CREATE TYPE "ThreadKind" AS ENUM ('team', 'client');

-- CreateEnum
CREATE TYPE "NotificationKind" AS ENUM ('assignment_available', 'assignment_deadline', 'exam_available', 'exam_result', 'evaluation_available', 'sim_task', 'interview_available', 'certificate_eligible', 'readiness_update');

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'pending_verification',
    "mfa_enabled" BOOLEAN NOT NULL DEFAULT false,
    "argon_params" JSONB NOT NULL,
    "failed_login_count" INTEGER NOT NULL DEFAULT 0,
    "locked_until" TIMESTAMP(3),
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "display_name" VARCHAR(120) NOT NULL,
    "timezone" VARCHAR(64) NOT NULL,
    "weekly_hours" SMALLINT,
    "bio" VARCHAR(1000),
    "onboarding_state" JSONB,
    "onboarding_completed_at" TIMESTAMP(3),

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "family_id" CHAR(26) NOT NULL,
    "refresh_hash" CHAR(64) NOT NULL,
    "status" "SessionStatus" NOT NULL DEFAULT 'active',
    "user_agent" VARCHAR(512),
    "ip" VARCHAR(45),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_used_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_tokens" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "purpose" "EmailTokenPurpose" NOT NULL,
    "token_hash" CHAR(64) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "consumed_at" TIMESTAMP(3),

    CONSTRAINT "email_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" BIGSERIAL NOT NULL,
    "codename" VARCHAR(100) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "role_id" BIGINT NOT NULL,
    "assigned_by" CHAR(26),

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "id" BIGSERIAL NOT NULL,
    "role_id" BIGINT NOT NULL,
    "permission_id" BIGINT NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" BIGSERIAL NOT NULL,
    "actor_type" "ActorType" NOT NULL,
    "actor_id" VARCHAR(64),
    "action" VARCHAR(100) NOT NULL,
    "entity_type" VARCHAR(60) NOT NULL,
    "entity_id" VARCHAR(64) NOT NULL,
    "before" JSONB,
    "after" JSONB,
    "ip" VARCHAR(45),
    "ua" VARCHAR(512),
    "request_id" VARCHAR(64) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security_events" (
    "id" BIGSERIAL NOT NULL,
    "kind" "SecurityEventKind" NOT NULL,
    "subject" VARCHAR(320),
    "meta" JSONB,
    "severity" SMALLINT NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "security_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "careers" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "slug" VARCHAR(80) NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "category" VARCHAR(60) NOT NULL,
    "description" VARCHAR(600) NOT NULL,
    "difficulty" VARCHAR(40) NOT NULL,
    "path_summary" VARCHAR(400) NOT NULL,
    "main_skills" JSONB NOT NULL,
    "source_platforms" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "company_name" VARCHAR(120) NOT NULL DEFAULT '',
    "role_title" VARCHAR(120) NOT NULL DEFAULT '',

    CONSTRAINT "careers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" BIGSERIAL NOT NULL,
    "career_id" BIGINT NOT NULL,
    "title" VARCHAR(160) NOT NULL,
    "description" VARCHAR(600) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapters" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "book_id" BIGINT NOT NULL,
    "stage" VARCHAR(30) NOT NULL,
    "order" INTEGER NOT NULL,
    "slug" VARCHAR(80) NOT NULL,
    "title" VARCHAR(160) NOT NULL,
    "description" VARCHAR(500) NOT NULL,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topics" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "chapter_id" BIGINT NOT NULL,
    "order" INTEGER NOT NULL,
    "slug" VARCHAR(80) NOT NULL,
    "title" VARCHAR(160) NOT NULL,
    "minutes" INTEGER NOT NULL DEFAULT 20,
    "objectives" JSONB NOT NULL,
    "sections" JSONB NOT NULL,
    "quiz" JSONB NOT NULL,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topic_resources" (
    "id" BIGSERIAL NOT NULL,
    "topic_id" BIGINT NOT NULL,
    "kind" "ResourceKind" NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "platform" VARCHAR(60),
    "creator" VARCHAR(120),
    "duration_sec" INTEGER,
    "relationship" VARCHAR(300) NOT NULL,

    CONSTRAINT "topic_resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_careers" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "career_id" BIGINT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "selected_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "student_careers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topic_progress" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "topic_id" BIGINT NOT NULL,
    "status" "ProgressStatus" NOT NULL DEFAULT 'not_started',
    "last_viewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "topic_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "practice_exercises" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "career_id" BIGINT NOT NULL,
    "topic_id" BIGINT NOT NULL,
    "order" INTEGER NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "instructions" TEXT NOT NULL,

    CONSTRAINT "practice_exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "practice_attempts" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "exercise_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "response" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "practice_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exams" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "career_id" BIGINT NOT NULL,
    "chapter_id" BIGINT,
    "kind" "ExamKind" NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "coverage" JSONB NOT NULL,
    "pass_score" INTEGER NOT NULL,
    "duration_min" INTEGER,
    "questions" JSONB,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_attempts" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "exam_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "answers" JSONB,
    "score" INTEGER,
    "passed" BOOLEAN,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submitted_at" TIMESTAMP(3),

    CONSTRAINT "exam_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignments" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "career_id" BIGINT NOT NULL,
    "chapter_id" BIGINT,
    "order" INTEGER NOT NULL,
    "stage" VARCHAR(30) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "objective" TEXT NOT NULL,
    "requirements" JSONB NOT NULL,
    "skills_evaluated" JSONB NOT NULL,
    "due_days" INTEGER NOT NULL,
    "difficulty" VARCHAR(40) NOT NULL,
    "submission_spec" JSONB NOT NULL,

    CONSTRAINT "assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignment_submissions" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "assignment_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "payload" TEXT NOT NULL,
    "links" JSONB NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'submitted',
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assignment_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluations" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "career_id" BIGINT NOT NULL,
    "target_type" "EvalTargetType" NOT NULL,
    "target_public_id" TEXT NOT NULL,
    "target_title" VARCHAR(200) NOT NULL,
    "overall_score" INTEGER NOT NULL,
    "verdict" VARCHAR(400) NOT NULL,
    "strengths" JSONB NOT NULL,
    "weaknesses" JSONB NOT NULL,
    "error_notes" JSONB NOT NULL,
    "recommendations" JSONB NOT NULL,
    "skill_levels" JSONB NOT NULL,
    "next_area" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_progress" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "career_id" BIGINT NOT NULL,
    "skill" VARCHAR(120) NOT NULL,
    "percent" INTEGER NOT NULL,
    "learning_done" INTEGER NOT NULL DEFAULT 0,
    "learning_total" INTEGER NOT NULL DEFAULT 0,
    "exam_avg" INTEGER,
    "assignment_avg" INTEGER,
    "practical_avg" INTEGER,
    "simulation_avg" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skill_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulation_states" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "career_id" BIGINT NOT NULL,
    "company_name" VARCHAR(120) NOT NULL,
    "role_title" VARCHAR(120) NOT NULL,
    "status" "ProgressStatus" NOT NULL DEFAULT 'in_progress',
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "simulation_states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sim_tasks" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "career_id" BIGINT NOT NULL,
    "order" INTEGER NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "context" TEXT NOT NULL,
    "requirements" JSONB NOT NULL,
    "priority" "SimPriority" NOT NULL,
    "due_day_offset" INTEGER NOT NULL,
    "expected_output" TEXT NOT NULL,
    "skills" JSONB NOT NULL,

    CONSTRAINT "sim_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sim_tasks" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "sim_task_id" BIGINT NOT NULL,
    "status" "ProgressStatus" NOT NULL DEFAULT 'not_started',
    "response" TEXT,
    "submitted_at" TIMESTAMP(3),

    CONSTRAINT "user_sim_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comm_scenarios" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "career_id" BIGINT NOT NULL,
    "kind" "ThreadKind" NOT NULL,
    "persona_name" VARCHAR(120) NOT NULL,
    "persona_role" VARCHAR(120) NOT NULL,
    "situation" TEXT NOT NULL,
    "opening_message" TEXT NOT NULL,
    "expected_points" JSONB NOT NULL,

    CONSTRAINT "comm_scenarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comm_threads" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "scenario_id" BIGINT NOT NULL,
    "messages" JSONB NOT NULL,
    "status" "ProgressStatus" NOT NULL DEFAULT 'in_progress',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comm_threads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workplace_scenarios" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "career_id" BIGINT NOT NULL,
    "category" VARCHAR(60) NOT NULL,
    "situation" TEXT NOT NULL,
    "required_actions" JSONB NOT NULL,

    CONSTRAINT "workplace_scenarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scenario_responses" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "scenario_id" BIGINT NOT NULL,
    "actions" JSONB NOT NULL,
    "score" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scenario_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interview_questions" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "career_id" BIGINT NOT NULL,
    "stage" VARCHAR(20) NOT NULL DEFAULT 'technical',
    "order" INTEGER NOT NULL,
    "dimension" VARCHAR(60) NOT NULL,
    "prompt" TEXT NOT NULL,
    "guidance" JSONB NOT NULL,

    CONSTRAINT "interview_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interview_sessions" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "career_id" BIGINT NOT NULL,
    "stage" VARCHAR(20) NOT NULL DEFAULT 'technical',
    "questions" JSONB NOT NULL,
    "answers" JSONB,
    "status" "ProgressStatus" NOT NULL DEFAULT 'in_progress',
    "score" INTEGER,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "interview_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interview_verifications" (
    "id" BIGSERIAL NOT NULL,
    "user_public_id" CHAR(26) NOT NULL,
    "career_slug" VARCHAR(80) NOT NULL,
    "stage" VARCHAR(20) NOT NULL,
    "session_public_id" CHAR(26) NOT NULL,
    "score" INTEGER NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "verified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "interview_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_items" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "career_id" BIGINT NOT NULL,
    "source_type" VARCHAR(40) NOT NULL,
    "source_public_id" VARCHAR(64) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "summary" VARCHAR(600) NOT NULL,
    "artifacts" JSONB NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "portfolio_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificates" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "career_id" BIGINT NOT NULL,
    "serial" VARCHAR(40) NOT NULL,
    "requirements_snapshot" JSONB NOT NULL,
    "issued_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "readiness_records" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "career_id" BIGINT NOT NULL,
    "overall_percent" INTEGER NOT NULL,
    "ready" BOOLEAN NOT NULL,
    "components" JSONB NOT NULL,
    "missing" JSONB NOT NULL,
    "computed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "readiness_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" BIGSERIAL NOT NULL,
    "public_id" CHAR(26) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "kind" "NotificationKind" NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "body" VARCHAR(400) NOT NULL,
    "link_path" VARCHAR(120),
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_public_id_key" ON "users"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "users"("status");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_user_id_key" ON "user_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_public_id_key" ON "sessions"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_refresh_hash_key" ON "sessions"("refresh_hash");

-- CreateIndex
CREATE INDEX "sessions_user_id_status_idx" ON "sessions"("user_id", "status");

-- CreateIndex
CREATE INDEX "sessions_expires_at_idx" ON "sessions"("expires_at");

-- CreateIndex
CREATE INDEX "sessions_family_id_idx" ON "sessions"("family_id");

-- CreateIndex
CREATE UNIQUE INDEX "email_tokens_token_hash_key" ON "email_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "email_tokens_user_id_idx" ON "email_tokens"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_codename_key" ON "permissions"("codename");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_user_id_role_id_key" ON "user_roles"("user_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "role_permissions_role_id_permission_id_key" ON "role_permissions"("role_id", "permission_id");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_entity_id_idx" ON "audit_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "audit_logs_actor_id_created_at_idx" ON "audit_logs"("actor_id", "created_at");

-- CreateIndex
CREATE INDEX "security_events_kind_created_at_idx" ON "security_events"("kind", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "careers_public_id_key" ON "careers"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "careers_slug_key" ON "careers"("slug");

-- CreateIndex
CREATE INDEX "careers_category_idx" ON "careers"("category");

-- CreateIndex
CREATE INDEX "careers_order_idx" ON "careers"("order");

-- CreateIndex
CREATE UNIQUE INDEX "books_career_id_key" ON "books"("career_id");

-- CreateIndex
CREATE UNIQUE INDEX "chapters_public_id_key" ON "chapters"("public_id");

-- CreateIndex
CREATE INDEX "chapters_book_id_order_idx" ON "chapters"("book_id", "order");

-- CreateIndex
CREATE UNIQUE INDEX "chapters_book_id_slug_key" ON "chapters"("book_id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "topics_public_id_key" ON "topics"("public_id");

-- CreateIndex
CREATE INDEX "topics_chapter_id_order_idx" ON "topics"("chapter_id", "order");

-- CreateIndex
CREATE UNIQUE INDEX "topics_chapter_id_slug_key" ON "topics"("chapter_id", "slug");

-- CreateIndex
CREATE INDEX "topic_resources_topic_id_kind_idx" ON "topic_resources"("topic_id", "kind");

-- CreateIndex
CREATE INDEX "student_careers_user_id_active_idx" ON "student_careers"("user_id", "active");

-- CreateIndex
CREATE UNIQUE INDEX "student_careers_user_id_career_id_key" ON "student_careers"("user_id", "career_id");

-- CreateIndex
CREATE INDEX "topic_progress_user_id_status_idx" ON "topic_progress"("user_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "topic_progress_user_id_topic_id_key" ON "topic_progress"("user_id", "topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "practice_exercises_public_id_key" ON "practice_exercises"("public_id");

-- CreateIndex
CREATE INDEX "practice_exercises_career_id_order_idx" ON "practice_exercises"("career_id", "order");

-- CreateIndex
CREATE UNIQUE INDEX "practice_attempts_public_id_key" ON "practice_attempts"("public_id");

-- CreateIndex
CREATE INDEX "practice_attempts_user_id_exercise_id_idx" ON "practice_attempts"("user_id", "exercise_id");

-- CreateIndex
CREATE UNIQUE INDEX "exams_public_id_key" ON "exams"("public_id");

-- CreateIndex
CREATE INDEX "exams_career_id_kind_idx" ON "exams"("career_id", "kind");

-- CreateIndex
CREATE UNIQUE INDEX "exam_attempts_public_id_key" ON "exam_attempts"("public_id");

-- CreateIndex
CREATE INDEX "exam_attempts_user_id_exam_id_idx" ON "exam_attempts"("user_id", "exam_id");

-- CreateIndex
CREATE UNIQUE INDEX "assignments_public_id_key" ON "assignments"("public_id");

-- CreateIndex
CREATE INDEX "assignments_career_id_order_idx" ON "assignments"("career_id", "order");
CREATE INDEX "assignments_chapter_id_idx" ON "assignments"("chapter_id");

-- CreateIndex
CREATE UNIQUE INDEX "assignment_submissions_public_id_key" ON "assignment_submissions"("public_id");

-- CreateIndex
CREATE INDEX "assignment_submissions_user_id_assignment_id_idx" ON "assignment_submissions"("user_id", "assignment_id");

-- CreateIndex
CREATE UNIQUE INDEX "evaluations_public_id_key" ON "evaluations"("public_id");

-- CreateIndex
CREATE INDEX "evaluations_user_id_created_at_idx" ON "evaluations"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "evaluations_user_id_target_type_target_public_id_key" ON "evaluations"("user_id", "target_type", "target_public_id");

-- CreateIndex
CREATE UNIQUE INDEX "skill_progress_user_id_career_id_skill_key" ON "skill_progress"("user_id", "career_id", "skill");

-- CreateIndex
CREATE UNIQUE INDEX "simulation_states_public_id_key" ON "simulation_states"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "simulation_states_user_id_career_id_key" ON "simulation_states"("user_id", "career_id");

-- CreateIndex
CREATE UNIQUE INDEX "sim_tasks_public_id_key" ON "sim_tasks"("public_id");

-- CreateIndex
CREATE INDEX "sim_tasks_career_id_order_idx" ON "sim_tasks"("career_id", "order");

-- CreateIndex
CREATE UNIQUE INDEX "user_sim_tasks_public_id_key" ON "user_sim_tasks"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_sim_tasks_user_id_sim_task_id_key" ON "user_sim_tasks"("user_id", "sim_task_id");

-- CreateIndex
CREATE UNIQUE INDEX "comm_scenarios_public_id_key" ON "comm_scenarios"("public_id");

-- CreateIndex
CREATE INDEX "comm_scenarios_career_id_kind_idx" ON "comm_scenarios"("career_id", "kind");

-- CreateIndex
CREATE UNIQUE INDEX "comm_threads_public_id_key" ON "comm_threads"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "comm_threads_user_id_scenario_id_key" ON "comm_threads"("user_id", "scenario_id");

-- CreateIndex
CREATE UNIQUE INDEX "workplace_scenarios_public_id_key" ON "workplace_scenarios"("public_id");

-- CreateIndex
CREATE INDEX "workplace_scenarios_career_id_idx" ON "workplace_scenarios"("career_id");

-- CreateIndex
CREATE UNIQUE INDEX "scenario_responses_public_id_key" ON "scenario_responses"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "scenario_responses_user_id_scenario_id_key" ON "scenario_responses"("user_id", "scenario_id");

-- CreateIndex
CREATE UNIQUE INDEX "interview_questions_public_id_key" ON "interview_questions"("public_id");

-- CreateIndex
CREATE INDEX "interview_questions_career_id_stage_order_idx" ON "interview_questions"("career_id", "stage", "order");

-- CreateIndex
CREATE UNIQUE INDEX "interview_sessions_public_id_key" ON "interview_sessions"("public_id");

-- CreateIndex
CREATE INDEX "interview_sessions_user_id_career_id_stage_idx" ON "interview_sessions"("user_id", "career_id", "stage");

-- CreateIndex
CREATE INDEX "interview_sessions_user_id_status_idx" ON "interview_sessions"("user_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "interview_verifications_user_career_stage_key" ON "interview_verifications"("user_public_id", "career_slug", "stage");

-- CreateIndex
CREATE UNIQUE INDEX "portfolio_items_public_id_key" ON "portfolio_items"("public_id");

-- CreateIndex
CREATE INDEX "portfolio_items_user_id_career_id_idx" ON "portfolio_items"("user_id", "career_id");

-- CreateIndex
CREATE UNIQUE INDEX "portfolio_items_user_id_source_type_source_public_id_key" ON "portfolio_items"("user_id", "source_type", "source_public_id");

-- CreateIndex
CREATE UNIQUE INDEX "certificates_public_id_key" ON "certificates"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "certificates_serial_key" ON "certificates"("serial");

-- CreateIndex
CREATE UNIQUE INDEX "certificates_user_id_career_id_key" ON "certificates"("user_id", "career_id");

-- CreateIndex
CREATE UNIQUE INDEX "readiness_records_user_id_career_id_key" ON "readiness_records"("user_id", "career_id");

-- CreateIndex
CREATE UNIQUE INDEX "notifications_public_id_key" ON "notifications"("public_id");

-- CreateIndex
CREATE INDEX "notifications_user_id_created_at_idx" ON "notifications"("user_id", "created_at");

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_tokens" ADD CONSTRAINT "email_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "careers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "topics_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_resources" ADD CONSTRAINT "topic_resources_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_careers" ADD CONSTRAINT "student_careers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_careers" ADD CONSTRAINT "student_careers_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "careers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_progress" ADD CONSTRAINT "topic_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_progress" ADD CONSTRAINT "topic_progress_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_exercises" ADD CONSTRAINT "practice_exercises_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_exercises" ADD CONSTRAINT "practice_exercises_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "careers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_attempts" ADD CONSTRAINT "practice_attempts_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "practice_exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_attempts" ADD CONSTRAINT "practice_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "careers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_attempts" ADD CONSTRAINT "exam_attempts_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_attempts" ADD CONSTRAINT "exam_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "careers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignment_submissions" ADD CONSTRAINT "assignment_submissions_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignment_submissions" ADD CONSTRAINT "assignment_submissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_progress" ADD CONSTRAINT "skill_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "simulation_states" ADD CONSTRAINT "simulation_states_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "simulation_states" ADD CONSTRAINT "simulation_states_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "careers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sim_tasks" ADD CONSTRAINT "sim_tasks_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "careers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sim_tasks" ADD CONSTRAINT "user_sim_tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sim_tasks" ADD CONSTRAINT "user_sim_tasks_sim_task_id_fkey" FOREIGN KEY ("sim_task_id") REFERENCES "sim_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comm_scenarios" ADD CONSTRAINT "comm_scenarios_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "careers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comm_threads" ADD CONSTRAINT "comm_threads_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comm_threads" ADD CONSTRAINT "comm_threads_scenario_id_fkey" FOREIGN KEY ("scenario_id") REFERENCES "comm_scenarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workplace_scenarios" ADD CONSTRAINT "workplace_scenarios_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "careers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scenario_responses" ADD CONSTRAINT "scenario_responses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scenario_responses" ADD CONSTRAINT "scenario_responses_scenario_id_fkey" FOREIGN KEY ("scenario_id") REFERENCES "workplace_scenarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview_questions" ADD CONSTRAINT "interview_questions_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "careers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview_sessions" ADD CONSTRAINT "interview_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_items" ADD CONSTRAINT "portfolio_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "readiness_records" ADD CONSTRAINT "readiness_records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Ask PostgREST to reload its schema cache after the tables are created.
NOTIFY pgrst, 'reload schema';

