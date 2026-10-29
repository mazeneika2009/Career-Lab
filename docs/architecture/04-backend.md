# 04 — Backend Architecture

## 1. Architectural style: Modular Monolith

**Decision:** a single deployable Node.js application composed of strictly bounded internal
modules. Not microservices.

Why this is correct for this project:

| Concern | Reasoning |
|---|---|
| Team size | Small team; operating 10+ services (deployments, tracing, versioned contracts) would consume more effort than building features |
| Domain stability | Career platform domains (learning, exams, simulation) change together during product discovery; cross-service API churn would be constant |
| Transactions | Critical flows (exam start, grading + XP award, certificate issuance) need ACID across entities — trivial in one MySQL database, painful as sagas |
| Performance | In-process calls vs network hops for hot paths (roadmap rendering touches careers+skills+progress) |
| Exit strategy | Modules are structured with explicit public interfaces and own their tables, so extraction into services later is a refactor, not a rewrite |

**Extraction seams designed from day one** (different scaling profiles / isolation needs):
`ai-gateway`, `sandbox-workers`, `realtime gateway`. These already run as separate *processes*
from v1 (see §2), so the monolith boundary stays honest.

## 2. Process topology

```
                    ┌────────────────────────┐
   Clients ────────►│  Nginx / Edge (TLS,    │
                    │  WAF, static assets)   │
                    └───┬─────────┬──────────┘
                        │         │
              ┌─────────▼──┐   ┌──▼───────────┐
              │ API process│   │ API process  │      stateless, N replicas
              │ (Express)  │   │ (Express)    │
              └─┬───┬──────┘   └───┬───┬──────┘
                │   │              │   │
     ┌──────────▼┐ ┌▼─────────────▼┐ ┌▼──────────────┐
     │ MySQL 8   │ │ Redis 7       │ │ Socket.IO node│  realtime process(es)
     └───────────┘ └───────────────┘ └───────────────┘
                ▲            ▲               ▲
        ┌───────┴──┐  ┌──────┴──────┐  ┌─────┴─────────┐
        │ Workers: │  │ Workers:    │  │ Sandbox hosts │  ISOLATED network zone
        │ email,   │  │ ai-eval,    │  │ (container    │  no DB access, only
        │ video,   │  │ video,      │  │ pool runner)  │  queue via scoped creds
        │ analytics│  │ simulation  │  └───────────────┘
        └──────────┘  └─────────────┘
```

- **API processes:** stateless; horizontal scale behind load balancer. No sessions in memory.
- **Worker processes:** same codebase, different entrypoint (`worker.ts`) consuming BullMQ queues;
  scaled independently per queue (AI evaluation needs more concurrency than email).
- **Realtime process:** Socket.IO with Redis adapter; can scale horizontally.
- **Sandbox hosts:** dedicated machines/containers, separate security zone. They receive job
  payloads from the queue with scoped credentials and return results; they have **no** route to
  MySQL or secrets stores.

## 3. Request lifecycle & layering

```
HTTP request
 → middleware chain: requestId · helmet headers · cors · rate limit · authenticate(JWT)
   → authorize(permission + policy)
 → router → controller          (validate input DTO via Zod; map to service calls; format response)
           → service             (business rules, transactions via unit-of-work, domain events)
             → repository        (Prisma queries; no business logic)
             → outbox            (transactional domain events → BullMQ)
 ← response { success, data } | error envelope
```

Rules:
- Controllers contain **no business logic** — validation, delegation, HTTP semantics only.
- Services never import PrismaClient directly — repositories do.
- Cross-module calls go through the target module's `public-api.ts` interface only; ESLint
  boundaries enforce it. Events for decoupled reactions use the transactional outbox pattern.
- All writes that span aggregates (grade submission + award XP + unlock skill) run in one Prisma
  transaction in the owning service.

## 4. Technology decisions

| Technology | What it does | Why we need it | Why better than alternatives here | Where used |
|---|---|---|---|---|
| Node.js 22 LTS | JS runtime | Single language across stack; shared types/schemas; excellent async I/O for IO-bound API | vs Deno/Bun: ecosystem maturity, hiring; CPU-heavy work (video, AI pre/post) deliberately offloaded to workers anyway | API, workers, realtime |
| TypeScript strict | Types | Same rationale as frontend; shared package contracts | Non-negotiable at this scale | Everything |
| Express.js 5 | HTTP framework | Minimal, explicit, huge middleware ecosystem; team familiarity | vs NestJS: less framework magic, smaller surface to audit, faster onboarding; vs Fastify: plugin ecosystem + familiarity outweigh perf delta (bottleneck is DB/IO, not framework) | API layer |
| Prisma ORM | Typed DB access + migrations | Schema-as-code, generated typed client, migration history, relation queries; prevents SQLi via parameterization by default | vs Sequelize (legacy patterns, weaker typing), TypeORM (history of maintainer/migration issues), Knex (query builder, no schema mgmt). Raw escape hatch exists but gated by lint rule + review for edge cases | Repositories, migrations |
| MySQL 8 | Relational store | Strong consistency for progress/exams/grades; mature ops, backups, PITR; team ops knowledge | vs Postgres (both fine — MySQL chosen per project constraint; JSON columns cover semi-structured needs) | Primary database |
| Redis 7 | Cache, rate limits, queues backend, pub/sub, presence | Multi-purpose low-latency store; BullMQ native support | vs KeyDB/Memcached: BullMQ requirement + richer structures | Cache DB index 0, queues index 1, pub/sub |
| BullMQ | Job queues | Reliable async processing with retries, priorities, rate limiting, repeatable jobs (simulation ticks, schedulers) | vs RabbitMQ/Kafka: dramatically simpler ops at our scale; Kafka unjustified until event volume demands it | ai-evaluation, sandbox, email, video, notifications, analytics, simulation-scheduler |
| Socket.IO | WebSockets | Rooms, reconnection, fallbacks, Redis adapter scaling | vs ws: built-in room/presence patterns save months; overhead acceptable | Realtime process |
| Zod (shared) | Runtime validation | Same schemas validate FE forms, BE DTOs, env config, AI outputs | One validation language across tiers | Everywhere |
| pino | Structured logging | Fast JSON logger with redaction paths | vs winston: performance + redaction support | All processes |
| Argon2 (node-argon2) | Password hashing | Memory-hard KDF; OWASP-recommended | vs bcrypt: stronger GPU resistance; bcrypt acceptable fallback documented | Auth module |

## 5. Module catalog

Modules live under `src/modules/<name>/` with structure:

```
modules/auth/
├── auth.routes.ts        # route definitions only
├── auth.controller.ts    # HTTP handlers (thin)
├── auth.service.ts       # business logic
├── auth.repository.ts    # persistence
├── auth.validators.ts    # Zod DTOs
├── auth.policies.ts      # ownership/access rules used by authorization layer
├── auth.events.ts        # published/subscribed domain events
└── public-api.ts         # the ONLY export surface other modules may import
```

| Module | Owns (tables) | Responsibilities | Emits events | Consumes |
|---|---|---|---|---|
| auth | users, sessions, email_tokens, mfa_factors | register/login/refresh rotation/revoke, MFA, password lifecycle | user.registered, auth.login.failed_repeatedly | — |
| users | user_profiles, user_settings | profile, preferences, avatar, account deletion workflow | profile.updated | — |
| rbac | roles, permissions, role_permissions, user_roles | role/permission resolution (Redis-cached), permission checks API | role.assigned | — |
| careers | careers, career_levels, career_skills | catalog, ladder gates definition, enrollment | career.enrolled | — |
| skills | skills, skill_edges | skill graph CRUD, prerequisite resolution | — | — |
| courses | courses, course_modules | course lifecycle (draft→published), instructor assignment | course.published | — |
| lessons | lessons, lesson_resources, books?, chapters | lesson content, reader/video resources | lesson.published | media |
| media | files | upload signing, scan status, delivery authorization | media.scanned.clean/quarantined | storage, scanner |
| practice | practice_tasks, practice_attempts | interactive exercise engine, instant checks | practice.attempt.recorded | sandbox |
| assignments | assignments | homework briefs, rubrics, deadlines | assignment.due_soon | — |
| submissions | submissions, submission_files | submission intake, drafts, plagiarism signals | submission.created | sandbox, ai |
| ai_review | ai_reviews | evaluation pipeline orchestration, review persistence, confidence flagging | review.completed | ai-gateway worker |
| questions | questions, question_options, question_pools | bank CRUD, calibration metadata | — | — |
| exams | exams, exam_questions, exam_attempts, exam_answers | attempt lifecycle, server timing, snapshotting, grading orchestration | exam.attempt.submitted, exam.graded | sandbox, ai |
| learning_engine | student_progress, skills_progress, progress_events | projections, completion computation, XP, achievements triggers | level.completed, skill.unlocked | — |
| achievements | achievements, user_achievements, xp_transactions | rule engine, XP ledger (append-only) | achievement.unlocked | learning_engine events |
| recommendations | recommendation_logs | candidate generation + ranking; writes suggestion rows consumed by FE | — | learning_engine, ai-gateway(embed) |
| simulations | companies, teams, team_members, clients, projects, sim_tasks, sim_events, incidents, decisions, messages, simulation_runs, simulation_results | scenario runtime, scheduler ticks, NPC messaging, telemetry scoring | sim.tick, message.received, incident.opened | sandbox (task artifacts), ai (tone eval) |
| interviews | interviews, interview_questions, interview_answers, interview_results | session scripting, follow-up control, scoring | interview.completed | ai-gateway |
| portfolio | portfolios, portfolio_projects | builder, publish/unpublish, public view assembly | portfolio.published | — |
| certificates | certificates | issuance (transactional w/ gate check), serial verification | certificate.issued | — |
| notifications | notifications, notification_preferences | fan-out, digest batching, channel routing | notification.delivered | email worker |
| analytics | analytics_daily, kpi_snapshots | pre-aggregation jobs, admin dashboards feed | — | all event streams |
| audit | audit_logs | append-only security/compliance trail (write-only API) | — | everyone (via helper) |
| admin | (cross-module read APIs) | console aggregation endpoints, feature flags, system settings | — | — |
| instructor | (scoped views over courses/exams/submissions) | authoring + review tooling | — | — |
| ai_gateway | ai_usage_log | provider adapters, prompt templates, budgets, output validation helpers | ai.request.completed | — |
| sandbox | sandbox_runs | run manifests, result intake, quota accounting | run.completed | — |

Cross-module relationship map (who depends on whom):

```
auth → rbac ← (all modules for checks)
courses → careers, lessons, media
submissions → assignments, sandbox, ai_review
exams → questions, sandbox, ai_review
learning_engine → lessons/practice/exams events → achievements, recommendations
simulations → sandbox, ai_gateway, notifications
interviews → ai_gateway, sandbox
portfolio/certificates → learning_engine gates, submissions(evidence)
admin/instructor → read-scoped facades over content modules
```

Dependency rule: arrows may only point "down" toward stable modules; cycles are compile errors.

## 6. Folder structure

```
apps/api/src/
├── app.ts                     # express app factory (middleware pipeline, routers mount)
├── main.ts                    # bootstrap: config, db, redis, server listen
├── worker.ts                  # worker entrypoint (queue consumers registration)
├── realtime.ts                # socket.io entrypoint
├── config/
│   ├── env.ts                 # Zod-validated process.env schema (fail-fast boot)
│   ├── constants.ts
│   └── features.ts            # feature flags defaults
├── modules/                   # ~30 modules as §5 (each self-contained vertical slice)
│   └── <module>/{routes,controller,service,repository,validators,policies,events,public-api}.ts
├── middleware/
│   ├── request-context.ts     # requestId, user, logger child binding (AsyncLocalStorage)
│   ├── authenticate.ts        # JWT verify → req.user
│   ├── require-permission.ts  # RBAC gate
│   ├── rate-limit.ts          # Redis-backed buckets per route class
│   ├── validate.ts            # Zod body/query/params parsing middleware factory
│   ├── error-handler.ts       # normalizes AppError → envelope; logs; hides internals
│   └── not-found.ts
├── routes/
│   └── index.ts               # /api/v1 composition root mounting module routers
├── security/
│   ├── password.ts            # argon2id wrappers (hash/verify, param rotation)
│   ├── tokens.ts              # access JWT sign/verify (RS256, kid), refresh mint/hash
│   ├── encryption.ts          # AES-256-GCM envelope encrypt/decrypt service (KMS-backed)
│   ├── csrf.ts                # double-submit token for cookie-based refresh endpoint
│   └── headers.ts             # helmet/CSP configuration source
├── ai/
│   ├── gateway.ts             # provider adapters (complete/embed/moderate), model routing
│   ├── prompts/               # versioned prompt templates per task
│   ├── schemas/               # Zod output contracts per task
│   └── budgets.ts             # per-user/task/day token budgets, circuit breaker
├── jobs/
│   ├── queues.ts              # queue declarations, concurrency, backoff policies
│   ├── schedulers.ts          # repeatable jobs (sim tick sweep, digests, backup hooks)
│   └── jobs/                  # job processors grouped by queue
├── workers/                   # long-running worker loops not tied to a single job type
│   └── sandbox-pool.ts        # warm container pool manager (runs on sandbox hosts)
├── events/
│   ├── outbox.ts              # transactional outbox writer + dispatcher
│   └── bus.ts                 # in-process subscription registry
├── database/
│   ├── prisma.ts              # client singleton, pool tuning
│   ├── migrations/            # prisma migrate history
│   └── seeds/                 # dev/staging seed data (never prod)
├── validators/                # shared cross-module Zod schemas re-exported to packages/shared build
├── utils/                     # result type, pagination helpers, clock, ids (ulid), slugify
├── types/                     # ambient + domain unions
└── tests/                     # unit/integration colocated mirrors + fixtures
```

## 7. Configuration & runtime concerns

- **Env validation:** `env.ts` parses `process.env` against a Zod schema at boot; missing/malformed
  variables crash startup with a precise report. Three profiles: development, staging, production.
- **Secrets:** injected at runtime from Secret Manager into env vars; never committed. Rotation
  procedures in Section 06.
- **Health endpoints:** `/health/live` (process up), `/health/ready` (DB ping, Redis ping, queue
  heartbeat, migrations current). Load balancers and orchestrators act on readiness only.
- **Graceful shutdown:** SIGTERM → stop accepting, drain in-flight requests (30s cap), flush outbox,
  close Prisma/Redis pools, ack-idle jobs. Workers finish current job before exit (visibility timeout).
- **Idempotency:** mutating endpoints accept optional `Idempotency-Key`; keys cached (Redis, 24h).
- **Time:** everything UTC (`DATETIME(3)`); `clock.ts` injectable for test determinism.
