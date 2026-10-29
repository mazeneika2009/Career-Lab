# 07 — Database Architecture (MySQL 8)

## 1. Conventions

| Aspect | Decision |
|---|---|
| Engine / charset | InnoDB · utf8mb4 · utf8mb4_0900_ai_ci |
| Identifiers | Internal PK `id BIGINT UNSIGNED AUTO_INCREMENT`; external identifier `public_id CHAR(26)` (ULID) unique-indexed and exposed in APIs — prevents enumeration and join leakage |
| Timestamps | `created_at`, `updated_at` DATETIME(3) UTC on every table; soft delete `deleted_at` only on content tables (courses, lessons, questions…) |
| Booleans/enums | `TINYINT(1)` booleans; enumerations as `VARCHAR` + CHECK constraint when open-set risk exists, else MySQL ENUM for fixed closed sets |
| Money/decimals | DECIMAL — never floats (scores stored as basis points INT where precision matters) |
| Semi-structured | JSON columns for snapshots/flexible payloads (attempt snapshots, AI raw output, scenario definitions) with generated columns extracting queried fields |
| FK policy | RESTRICT default · CASCADE for owned children that die with parent (exam_answers→attempt) · SET NULL for optional references |
| Migrations | Prisma Migrate only; expand-contract pattern; destructive migrations require two-release gap + backup verification |
| Naming | snake_case plural tables, snake_case columns; index `ix_<table>_<cols>`, unique `ux_`, FK `fk_<a>_<b>` |

## 2. Table catalog

Notation: `PK` primary key · `FK→table` foreign key · `UQ` unique · `IDX` indexed · `*` nullable.

### 2.1 Identity & access
```
users
  id PK · public_id UQ · email UQ(CI, 320) · password_hash VARCHAR(255)
  status ENUM(pending_verification, active, suspended, deleted)
  mfa_enabled BOOL · argon_params JSON · failed_login_count INT · locked_until *
  last_login_at * · created_at · updated_at
  IDX(status)

user_profiles                                   # 1:1 extension keeping auth row narrow
  id PK · FK→users UQ · display_name · avatar_file_id FK→files * · timezone
  weekly_hours TINYINT · bio * · onboarding_state JSON · onboarding_completed_at *

sessions                                        # refresh-token sessions (device management)
  id PK · FK→users IDX · family_id CHAR(26)     # rotation family for reuse-revocation
  refresh_hash CHAR(64) UQ                      # SHA-256 hex of token
  user_agent * · ip INET6_NTOA * · created_at · last_used_at · expires_at
  status ENUM(active, rotated, revoked)
  IDX(user_id,status) IDX(expires_at)

email_tokens
  id PK · FK→users IDX · purpose ENUM(email_verify, password_reset)
  token_hash CHAR(64) UQ · expires_at · consumed_at *

mfa_factors
  id PK · FK→users UQ · secret_enc VARBINARY    # AES-256-GCM envelope payload
  confirmed_at * · recovery_codes JSON          # array of argon2 hashes + used flags

user_roles        id PK · FK→users · FK→roles · assigned_by *   UX(user_id, role_id)
roles             id PK · name UQ · description
permissions       id PK · codename UQ           # e.g. exams.take
role_permissions  id PK · FK→role · FK→permission               UX(role_id, permission_id)

assessment_results
  id PK · FK→users · FK→careers · skill_priors JSON · total_items · correct
  taken_at                                      # calibration snapshot feeding roadmap
```

### 2.2 Careers & content
```
careers          id PK · slug UQ · title · summary · description_md · icon_ref *
                 is_published BOOL · est_months TINYINT · timestamps
career_levels    id PK · FK→careers IDX · code ENUM(beginner..senior) · title · order_no
                 gate_rules JSON                               # server-evaluated gate spec
enrollments      id PK · FK→users · FK→careers UX(user,career) · current_level_code
                 started_at · completed_at * · status

skills           id PK · slug UQ · title · description · category
skill_edges      id PK · FK→skills(from) · FK→skills(to)       UX(from,to)  # prerequisite DAG
career_skills    id PK · FK→careers · FK→skills · FK→career_levels · order_no  UX(career,skill)

courses          id PK · public_id UQ · FK→careers IDX · slug UQ · title · summary
                 status ENUM(draft,in_review,published,retired) · version INT
                 owner_id FK→users(instructor) · est_hours SMALLINT · timestamps(deleted_at)
course_modules   id PK · FK→courses IDX · title · order_no

lessons          id PK · public_id UQ · FK→course_modules IDX · slug · title · type
                 ENUM(reading,video,practice,homework,checkpoint) · content JSON
                 est_minutes SMALLINT · order_no · status · timestamps(deleted_at)
                 IDX(module_id,order_no)
lesson_resources id PK · FK→lessons IDX · kind ENUM(book_chapter,video,file,sandbox_template,
                 external) · ref_id BIGINT * · url *                          polymorphic target
books            id PK · slug UQ · title · author · version
book_chapters    id PK · FK→books IDX · title · content_md LONGTEXT · order_no
videos           id PK · FK→files(storage master) · duration_s · hls_path · thumbnails JSON
                 captions_path * · transcode_status ENUM(queued,processing,ready,failed)
                 chapter_markers JSON
media/files      id PK · owner_id FK→users * · bucket · object_key UQ · mime · bytes BIGINT
                 sha256 · scan_status ENUM(pending,clean,quarantined) · visibility ENUM(private,
                 public_read) · purpose ENUM(avatar,submission,portfolio_cover,video_master,…)
                 IDX(owner_id,purpose)
```

### 2.3 Practice & homework
```
practice_tasks      id PK · FK→lessons IDX · title · instructions_md · language
                    starter_files JSON · checks JSON(assertion suite ref) · xp_reward
practice_attempts   id PK · FK→practice_tasks · FK→users UX(task,user,latest flag via col)
                    workspace_snapshot JSON · status ENUM(active,passed,failed,abandoned)
sandbox_runs        id PK · owner_id FK→users IDX · context ENUM(practice,homework,exam,interview)
                    context_ref BIGINT · language · manifest JSON · result JSON *
                    status ENUM(queued,running,done,timeout,error,killed) · queued_at
                    started_at * · finished_at * · exit_code *
assignments         id PK · FK→lessons * · FK→courses * · title · brief_md · requirements JSON
                    rubric JSON · deadline_at * · late_policy · max_score
submissions         id PK · FK→assignment IDX · FK→users IDX · status ENUM(draft,submitted,
                    analyzing,reviewed,resubmitted) · attempt_no TINYINT
                    submitted_at * · reviewed_at * · score * · score_source ENUM(ai,human)
                    content JSON(code entries) · plagiarism_signal JSON *
submission_files    id PK · FK→submissions CASCADE · FK→files
ai_reviews          id PK · target_type ENUM(submission,exam_answer,interview_answer,message,
                    run_report) · target_id BIGINT · FK→users(subject) IDX
                    rubric_version · score * · dimensions JSON · strengths JSON
                    issues JSON · recommendations JSON · confidence TINYINT 0-100
                    needs_human BOOL · model · prompt_version · raw_output JSON
                    created_at                                    IDX(target_type,target_id)
```

### 2.4 Exams
```
question_pools   id PK · FK→careers * · title · objective_code
questions        id PK · FK→pool IDX · type ENUM(single,multi,short_answer,code_read,order)
                 stem_md · options JSON · answer_key JSON · difficulty TINYINT
                 discrimination REAL DEFAULT 0                  # calibration stats
                 status · timestamps(deleted_at)
exams            id PK · FK→careers IDX · FK→career_level · title · kind ENUM(theory,practical)
                 blueprint JSON(pool→count rules, shuffle seeds policy) · duration_s
                 passing_bps INT · retake_cooldown_h · max_attempts TINYINT
                 opens_at * · closes_at * · review_policy ENUM(full,objectives_only,none)
exam_questions   id PK · FK→exam IDX · FK→pool · count · order_no              # blueprint rows
exam_attempts    id PK · FK→exam · FK→users UX-ish partial via status col · status ENUM(
                 in_progress,submitted,grading,graded,expired,void)
                 started_at · server_deadline DATETIME(3) · submitted_at * · graded_at *
                 question_snapshot JSON                        # frozen ids+option order+seed
                 score_bps * · passed * · client_meta JSON(ip, ua hash)
exam_answers     id PK · FK→attempt CASCADE IDX · FK→questions(question_snapshot ref)
                 answer JSON · flagged BOOL · updated_at · autosave_seq INT
interview_*      see §2.7
```

### 2.5 Progress, XP, achievements, recommendations
```
progress_events     id PK · FK→users IDX · type ENUM(lesson_completed,video_segment,practice_passed,
                    homework_reviewed,exam_graded,task_done,decision_made,…)
                    source_type · source_id · payload JSON · occurred_at · event_id UQ(idempotency)
student_progress    id PK · FK→users · FK→lessons UX(user,lesson) · status ENUM(not_started,
                    in_progress,completed) · position JSON(resume pointer) · completed_at *
skills_progress     id PK · FK→users · FK→skills UX(user,skill) · mastery_bps SMALLINT
                    evidence JSON(last signals ring buffer) · state ENUM(calibrating,learning,
                    struggling,remediating,mastered) · updated_at
xp_transactions     id PK · FK→users IDX · amount SIGNED INT · reason · source_type/source_id
                    balance_after INT · created_at                             # append-only ledger
achievements        id PK · code UQ · title · description · rule JSON · rarity
user_achievements   id PK · FK→users · FK→achievements UX(user,achievement) · earned_at
recommendation_logs id PK · FK→users IDX · surface ENUM(next_skill,remediation,resource)
                    candidates JSON · chosen * · model_version · shown_at · clicked_at *
```

### 2.6 Company simulation
```
companies            id PK · name · industry · brand JSON                       # virtual employers
clients              id PK · FK→companies · name · persona JSON(voice, tone, quirks)
teams                id PK · FK→companies · name · department
team_members         id PK · FK→teams · name · role ENUM(manager,senior_dev,designer,qa,
                     backend_dev) · persona JSON · is_npc BOOL · linked_user_id *
simulation_scenarios id PK · slug UQ · FK→career_level · title · synopsis · definition JSON
                     (acts/beats/events/decision weights) · difficulty · est_hours
simulation_runs      id PK · FK→scenario · FK→user · company_id · team_id · status ENUM(
                     offered,active,completed,withdrawn) · seed BIGINT · current_act
                     sprint_clock JSON · started_at * · ends_at *
sim_projects         id PK · FK→run · name · brief_md · due_at
sim_tasks            id PK · FK→project IDX · FK→assignee(team_member|user polymorphic cols)
                     ticket_code · title · body_md · acceptance JSON · priority ENUM(P0..P3)
                     status ENUM(backlog,in_progress,review,done,blocked) · estimate_h
                     due_at * · completed_at * · grade_bps * · grade_dimensions JSON
threads              id PK · FK→run · channel ENUM(team,client,manager,standup) · subject
                     client_id * · task_id * · last_message_at IDX
messages             id PK · FK→thread CASCADE IDX · sender_type ENUM(npc,user,system)
                     sender_ref · body_md · sent_at · read_at * · tone_score * · meta JSON
incidents            id PK · FK→run · ticket_code · severity ENUM(SEV1..SEV4) · title
                     situation_md · opened_at · resolved_at * · mttr_s *
incident_events      id PK · FK→incident CASCADE · at · actor · action_md · meta JSON
decisions            id PK · FK→run · prompt_md · options JSON(label,deltas,rubric weights)
                     chosen_idx * · decided_at * · outcome_json *
simulation_events    id PK · FK→run IDX · type · trigger ENUM(clock,action,response) · payload JSON
                     fired_at · handled_at *
sim_dimension_scores id PK · FK→run UX(run,dimension) · dimension ENUM(technical,communication,
                     teamwork,timeliness,prioritization,problem_solving,decision_making,
                     professionalism) · score_bps · evidence JSON
simulation_results   id PK · FK→run UQ · overall_bps · rating ENUM(D,C,C+,B,B+,A) · report JSON
                     narrative_md · completed_at
```

### 2.7 Interviews, portfolio, certificates
```
interviews           id PK · FK→user · FK→career_level · kind ENUM(technical_mid,technical_final)
                     status ENUM(scheduled,in_progress,completed,cancelled) · script JSON
interview_questions  id PK · FK→interview CASCADE IDX · order_no · kind ENUM(behavioral,technical,
                     coding,system_design) · prompt · rubric JSON · generated BOOL
interview_answers    id PK · FK→question UQ(q) · body_md * · sandbox_run_id * · duration_s *
                     followup JSON * · scored_bps *
interview_results    id PK · FK→interview UQ · dimensions JSON · overall_bps · transcript JSON
                     improvement_plan JSON · completed_at
portfolios           id PK · FK→user UQ · username UQ · headline * · about_md * · theme JSON
                     is_published BOOL · published_snapshot JSON *
portfolio_projects   id PK · FK→portfolio IDX · title · summary · narrative_md · stack JSON
                     evidence_refs JSON(submission/exam ids) · cover_file_id * · order_no
certificates         id PK · serial UQ · FK→user IDX · FK→career_level · issued_at
                     metadata JSON(evidence digest, scores) · pdf_file_id * · revoked_at *
career_reports       id PK · FK→user IDX · period · report JSON · pdf_file_id * · generated_at
```

### 2.8 Platform & operations
```
notifications            id PK · FK→user IDX · class · title · body · link * · read_at *
                         created_at                              IDX(user_id,created_at desc)
notification_preferences id PK · FK→user UQ · matrix JSON(channel×class enabled)
audit_logs               id PK · actor_type · actor_id * · action · entity_type/entity_id
                         before JSON * · after JSON * · ip * · ua * · request_id · created_at
                         APPEND-ONLY (no UPDATE/DELETE grant)   IDX(entity) IDX(actor,time)
security_events          id PK · kind ENUM(login_fail,refresh_reuse,rate_limit_hit,
                         sandbox_violation,waf_block,perm_denied_hot) · subject * · meta JSON
                         severity · created_at                   IDX(kind,created_at)
feature_flags            id PK · key UQ · enabled BOOL · rollout JSON(percent, segments)
system_settings          id PK · key UQ · value JSON · updated_by
job_outbox               id PK · aggregate_type/id · event_type · payload JSON · published_at *
                         created_at            # transactional outbox → BullMQ dispatcher
ai_usage_log             id PK · FK→user * · task · model · prompt_tokens · completion_tokens
                         cost_usd_cents · latency_ms · status · created_at  IDX(created_at)
kms_data_keys            id PK · kek_version · wrapped_dek VARBINARY · created_at
idempotency_keys         id PK · key UQ · endpoint · response_hash · expires_at
analytics_daily          date PK · metric families JSON…                # pre-aggregations
```

## 3. Relationships

**One-to-one:** users↔user_profiles, users↔user_preferences(m), users↔mfa_factors,
users↔portfolios, simulation_runs↔simulation_results, interviews↔interview_results.
Rationale: hot auth row stays narrow; lifecycle differs from base entity.

**One-to-many (highlights):**
users→sessions, submissions, exam_attempts, xp_transactions, notifications;
careers→career_levels→courses→course_modules→lessons→lesson_resources;
assignments→submissions→submission_files→files;
exam_attempts→exam_answers;
simulation_runs→sim_projects→sim_tasks; runs→threads→messages; runs→incidents→incident_events;
runs→decisions; runs→simulation_events;
interviews→interview_questions→interview_answers.

**Many-to-many (junction tables):**
user_roles, role_permissions, career_skills (+level binding), skill_edges (skills-to-skills DAG),
pool↔questions implicit (questions belong to pools), exam blueprint rows bind pools to exams,
portfolio_projects↔evidence via JSON refs (deliberate denormalization — evidence is immutable).

**Cross-domain spine:** nearly every domain table carries `user_id` (or reaches it through its
aggregate root). Ownership policies always resolve to this spine — the same predicate pattern
used by repositories (`WHERE user_id = :actor`) implements "no cross-student access" mechanically.

## 4. ERD (domain clusters)

```
IDENTITY                    CONTENT                         ASSESSMENT
┌───────┐ 1:1 ┌────────────┐ ┌─────────┐ 1:N ┌────────┐ ┌──────────┐ 1:N ┌───────────────┐
│ users │────►│ profiles   │ │ careers │────►│ levels │ │  exams   │────►│ exam_attempts │
└──┬────┘     └────────────┘ └────┬────┘     └────────┘ └────┬─────┘     └──┬────────────┘
   │ 1:N                          │ M:N via career_skills    │ blueprint    │ 1:N
   ▼                              ▼                          ▼              ▼
sessions/submissions…        skills ◄──skill_edges──► courses/modules/lessons   exam_answers
                                 │                           │ 1:N
LEARNING ENGINE                  └────────────┐              ▼
┌────────────────┐  N:1 ┌──────────┴──┐      lesson_resources (books/chapters/videos/files)
│skills_progress │──────►progress_events│
└──────┬─────────┘     └─────────────┘      HOMEWORK
       │ feeds                              assignments 1:N submissions 1:N files
       ▼                                          └──► ai_reviews (polymorphic target)
xp_transactions · user_achievements ◄── achievement.rules evaluate events

SIMULATION                                  INTERVIEW & OUTPUT
simulation_runs ─1:N─ sim_projects ─1:N─ sim_tasks      interviews ─1:N─ questions ─1:1─ answers
      │ 1:N threads ─1:N messages (npc/user)                 └──1:1── results
      │ 1:N incidents ─1:N events                            portfolios ─1:N─ projects
      │ 1:N decisions                                        certificates (serial verify)
      └────1:1── results ──► sim_dimension_scores ×8         career_reports

PLATFORM SPINE: audit_logs · security_events · job_outbox · ai_usage_log · files · feature_flags
```

## 5. Integrity & transaction discipline

Transactions are **mandatory** for: enrollment init (enrollment + roadmap snapshot + skills_progress
seed), exam start (eligibility check + active-attempt guard + snapshot insert), submit (lock attempt
row FOR UPDATE, deadline check, answers flush, status flip), grading publication (scores +
skills_progress updates + XP award + possible level-gate evaluation + certificate issuance),
message send (insert + counters + outbox event), decision commit.

Isolation: default REPEATABLE READ; grading publication uses SELECT … FOR UPDATE on the attempt
row to serialize double-submits; unique indexes back every "only one active X" invariant
(active attempt enforced by transaction + status check because MySQL lacks partial indexes —
documented in engine doc).

Anti-farming guards: XP ledger append-only with per-source daily caps evaluated in service layer;
event_id unique prevents replay of idempotent progress events.
