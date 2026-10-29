# 13 — Appendix: Stack, Trees, Roadmap, Checklists, Final Architecture

## 13.1 Complete technology stack

### Frontend
| Technology | Role | Version pin |
|---|---|---|
| React | UI runtime | 18.x |
| TypeScript | language | 5.x strict |
| Vite | build/dev server | 6.x |
| Tailwind CSS | styling via tokens | 4.x |
| React Router | routing/nested layouts | 7.x |
| TanStack Query | server-state cache | 5.x |
| Zustand | client global state | 5.x |
| React Hook Form | form engine | 7.x |
| Zod | validation schemas (shared) | 3.x |
| Monaco Editor (@monaco-editor/react) | code editing | lazy chunk |
| Framer Motion | motion system | 11.x |
| Lucide React | icons (sparing) | latest |
| Radix UI | headless a11y primitives | per-component |
| cva + clsx + tailwind-merge | variant system | latest |
| socket.io-client | realtime transport | 4.x |
| @tanstack/react-virtual | list virtualization | 3.x |
| hls.js | adaptive video | 1.x |
| react-error-boundary | route error isolation | 4.x |

### Backend
| Technology | Role | Version pin |
|---|---|---|
| Node.js | runtime | 22 LTS |
| TypeScript | language | 5.x strict |
| Express | HTTP framework | 5.x |
| Prisma | ORM/migrations | 6.x |
| MySQL | primary database | 8.x InnoDB |
| Redis | cache/rate/pubsub/queue backend | 7.x |
| BullMQ | job queues | 5.x |
| Socket.IO | websockets (+redis adapter) | 4.x |
| Zod | DTO/env/AI validation | 3.x |
| pino | structured logging | 9.x |
| node-argon2 | password hashing | latest |
| jose | JWT (RS256) | 5.x |
| helmet | security headers | 8.x |
| ffmpeg | video transcoding worker | 6.x |
| Qdrant | vector index for RAG/retrieval | managed/container |

### Infrastructure & operations
| Technology | Role |
|---|---|
| Docker + Compose | packaging, local/staging parity |
| Nginx | edge LB/TLS/static in front of app nodes |
| Cloud platform (AWS-class) | compute (ECS/Lightsail-class), RDS MySQL, ElastiCache Redis, S3, KMS/Secrets Manager |
| CDN | static SPA, public media, HLS |
| Object storage (S3/R2) | uploads, videos, backups (object-lock on backup bucket) |
| Prometheus + Grafana + Alertmanager | metrics/dashboards/alerting |
| OpenTelemetry | tracing across api/jobs/sockets |
| Sentry | error tracking FE+BE |
| Loki + Vector | log aggregation |
| ClamAV | upload malware scanning |
| GitHub Actions | CI/CD |
| k6 | load testing |
| OWASP ZAP | DAST baseline |

### Testing & security tooling
| Layer | Tools |
|---|---|
| Unit/integration | Vitest, Supertest, testcontainers |
| Component/E2E | React Testing Library, axe-core, Playwright |
| SAST/secrets/deps | CodeQL, Semgrep, gitleaks, Dependabot, npm audit/Snyk gate |
| Container | Trivy, syft SBOM |
| Crypto | Argon2id (passwords), AES-256-GCM + KMS envelope (data), RS256 rotating keys (JWT), TLS 1.2+/1.3 |
| AppSec controls | RBAC + ownership policies, CSP/HSTS, rate classes, audit log, WAF |

## 13.2 Complete folder trees

Monorepo (pnpm workspaces + Turborepo):

```
career-lab/
├── apps/
│   ├── web/                     # frontend (structure detailed in doc 03 §5)
│   ├── api/                     # backend modular monolith (doc 04 §6)
│   │   └── src/{app,main,worker,realtime}.ts · config · modules/* · middleware/
│   │        routes · security · ai/{gateway,prompts,schemas,budgets} · jobs/*
│   │        workers/sandbox-pool.ts · events/{outbox,bus} · database/{migrations,seeds}
│   │        validators · utils · types · tests/
│   └── docs-site/               # optional public docs/help center
├── packages/
│   ├── shared/                  # zod schemas, DTO types, error codes, permission catalog,
│   │   exam/scenario contracts  # consumed by web + api (single source of truth)
│   ├── ui/                      # design-system package if extracted later
│   └── config/                  # eslint/ts/tailwind shared configs
├── infra/
│   ├── docker/                  # Dockerfiles per app, compose.base.yml, overrides dev/prod
│   ├── nginx/                   # edge conf templates (TLS, headers, caching, ws upgrade)
│   ├── terraform/               # cloud resources (db, redis, buckets, kms, sg zones)
│   └── grafana/                 # dashboards + alert rules as code
├── tools/
│   ├── scripts/                 # seed, anonymize-staging, restore-drill, rotate-keys runbooks
│   └── sandbox-images/          # runner images per language (node, python) + escape-test suite
├── .github/workflows/           # ci.yml, cd-staging.yml, cd-prod.yml, nightly.yml(evals,dast,k6)
├── .env.example                 # names only, never values
└── turbo.json · pnpm-workspace.yaml
```

Environment variable contract (names only):

```
# runtime profile
NODE_ENV · APP_ENV=development|staging|production · LOG_LEVEL
# core
DATABASE_URL (app user, no DDL) · MIGRATE_DATABASE_URL (migrator role)
REDIS_URL · REDIS_QUEUE_DB · REDIS_CACHE_DB
JWT_PRIVATE_KEY_PATH · JWT_PUBLIC_KEYS_DIR · ACCESS_TOKEN_TTL
SESSION_COOKIE_NAME · SESSION_TTL_DAYS
ARGON2_MEMORY_KIB · ARGON2_TIME_COST · ARGON2_PARALLELISM
# encryption
KMS_PROVIDER=aws|local-dev · KMS_KEK_ALIAS · FIELD_ENCRYPTION_ENABLED
# storage / mail / ai
S3_ENDPOINT · S3_REGION · S3_BUCKET_* (media/submissions/video/quarantine/backups)
SMTP_URL · MAIL_FROM
AI_PROVIDER_KEYS_SECRET_ARN · AI_DAILY_BUDGET_USD · AI_MODEL_ROUTING_JSON
# sandbox
SANDBOX_QUEUE_CONCURRENCY · SANDBOX_MAX_WALL_SECONDS · SANDBOX_HOST_URL
# observability
SENTRY_DSN · OTEL_EXPORTER_OTLP_ENDPOINT
PUBLIC: VITE_API_URL · VITE_WS_URL · VITE_SENTRY_DSN (public-scope only)
```

## 13.3 Development roadmap (10 phases)

Assumptions: team of 2–4 engineers + designer; durations are focused-work estimates; every phase
ends with demo-able software behind flags, migrations applied, tests green, security checklist
items for that phase done.

**Phase 1 — Foundation (weeks 1–4)**
Features: landing/auth pages, register→verify→login→logout→password reset, session management UI.
Backend: repo scaffolding, env/config system, auth+rbac modules, middleware chain, error envelope,
audit logging, health endpoints, email queue, Docker compose, CI skeleton.
Database: identity domain tables + rbac + sessions/tokens.
Frontend: app shell, router/guards, design-system base components, api-client with refresh flow.
Security: Argon2id, token rotation w/ reuse detection, rate classes, headers/CSP baseline, gitleaks/SAST wired.
Testing: auth integration suite incl. matrix generator v1; component tests for forms.
Exit criteria: full identity lifecycle demoed; matrix tests prove cross-user denial.

**Phase 2 — Career & learning core (weeks 5–10)**
Features: career catalog/details, onboarding wizard, initial assessment, roadmap page, courses/
lessons reader/video, progress dashboard, notifications center.
Backend: careers/skills/courses/lessons/media modules, learning-engine projections, assessment
scoring, notification fan-out, video transcode pipeline, admin CRUD APIs.
DB: content + progress domains.
Frontend: reader typography system, video player, roadmap ladder visualization, admin console MVP.
Security: signed media URLs + entitlement checks; ownership predicates on all reads.
Testing: projection rebuild from events; E2E happy-path lesson completion.
Exit: student can enroll, be assessed, study, and see live progress.

**Phase 3 — Practice & sandbox (weeks 11–14)**
Features: interactive practice, code workspace editor, live preview, homework submission + files.
Backend: practice module, submissions intake, media sign/scan flow, sandbox host pool worker,
quota accounting.
Infra: sandbox zone isolation, runner images, escape-test suite.
Frontend: workspace IDE UX (split panes, console, preview), submission flows.
Security: sandbox hardening checklist executed; quotas; abuse alerts.
Testing: sandbox security suite in CI; k6 burst on runs endpoint.
Exit: code runs safely end-to-end with results streamed back.

**Phase 4 — Exams (weeks 15–17)**
Features: theory + practical exams, results views, retake policy, instructor authoring + review queues.
Backend: questions/exams modules, attempt transactions, sweeper, grading pipelines, plagiarism signals.
Frontend: FocusLayout runner, timer drift handling, navigator, results evidence view.
DB: assessment domain tables finalized.
Security: anti-cheat control set verified; step-up hook point prepared.
Testing: timing/concurrency chaos tests (double-submit, deadline races); matrix extension.
Exit: gated level progression works on real exam passes.

**Phase 5 — Intelligence layer (weeks 18–21)**
Features: performance reviews on homework, recommendations, mentor chat, remediation loops.
Backend: ai-gateway, prompts/schemas versioned, evaluation workers, recommendation service,
budgets/kill-switch, admin AI-config.
Frontend: review panel, recommended-next cards, mentor dock — zero AI-label copy.
Security: injection fencing + canary, PII scrub, provider zero-retention config, quota breakers.
Testing: golden-set eval harness nightly; schema validity 100%; fallback degradation drill.
Exit: review p95 < 5 min at realistic load; eval agreement within tolerance.

**Phase 6 — Company simulation (weeks 22–28)**
Features: workspace hub, scenario runtime, task board, inbox threads, incidents, decisions,
weekly/final reviews.
Backend: simulations module (runtime, scheduler sweep, personas), telemetry scoring, dimension
aggregation, report generation.
Frontend: professional workspace UI (board, threads, incident rooms, decision panels).
DB: simulation domain.
Security: message content moderation path; entitlement-scoped sockets.
Testing: deterministic-seed replay tests; scenario linting; E2E sprint cycle.
Exit: cohort completes Junior scenario with credible reviews.

**Phase 7 — Interview, portfolio, certificates (weeks 29–31)**
Features: technical interview engine + scorecards, portfolio builder/public profiles, certificates
with public verification, career report PDF.
Backend: interviews module, portfolio/certificates/report services, serial verification API.
Frontend: interview focus mode, portfolio editor, certificate verify page.
Testing: interview determinism harness; E2E certify-and-verify journey.
Exit: full journey demo — beginner to certified with shareable proof.

**Phase 8 — Security hardening (weeks 32–33, partially parallel)**
MFA rollout, step-up enforcement, impersonation-with-audit, DR drills #1, external pentest window,
ZAP full scan, dependency freeze policy, key rotation rehearsal, incident-response tabletop.
Exit: pentest criticals = 0; tabletop actions assigned.

**Phase 9 — Performance & polish (weeks 34–35)**
Budget enforcement pass (Lighthouse CI gates, k6 targets), DB slow-query fixes, cache tuning,
a11y manual audits (NVDA/VoiceOver), motion/reduced-motion pass, empty/error state sweep.
Exit: budgets green at 2× load; a11y statement published.

**Phase 10 — Production launch (week 36+)**
Prod provisioning (IaC), blue-green cutover rehearsal, synthetics + on-call rotation live, status
page, launch runbook, phased opening (waitlist cohorts) with flag-controlled capacity.
Exit: first real cohort onboarded with SLOs monitored.

Post-launch track: second career path authoring (validates multi-career claim), voice interviews,
peer review pilots, employer portal exploration.

## 13.4 Security checklist (launch gate)

Identity: [ ] Argon2id tuned + param drift rehash · [ ] refresh rotation + reuse revocation tested ·
[ ] MFA available + recovery codes hashed · [ ] step-up on sensitive ops · [ ] generic auth errors ·
[ ] lockout + CAPTCHA thresholds set
Authorization: [ ] permission catalog seeded (no wildcard strings) · [ ] ownership policies on every
service write/read path · [ ] repo owner-predicate pattern audited · [ ] matrix tests 100% green ·
[ ] 404 blinding on sensitive existence
Transport/headers: [ ] TLS1.2+/HSTS preload · [ ] CSP nonce-based, no unsafe-inline scripts ·
[ ] frame-ancestors none · [ ] CORS exact origins · [ ] secure cookie attrs verified
Input/output: [ ] Zod allowlist everywhere · [ ] upload magic-byte + MIME policy enforced ·
[ ] sanitizer on rich text · [ ] mass-assignment impossible (DTO mapping)
Compute: [ ] sandbox zone isolation proven (network graph reviewed) · [ ] seccomp/net deny verified ·
[ ] hidden tests never leave worker memory · [ ] quota + violation alerting live
Data: [ ] envelope encryption on designated fields · [ ] KMS-only KEK access · [ ] hashed tokens at
rest · [ ] private buckets + short-TTL signed URLs · [ ] backups encrypted + object-lock +
restore-drilled
Ops: [ ] redaction paths verified by test · [ ] audit log append-only grant · [ ] security alerts
routed + on-call defined · [ ] gitleaks/SAST/dep gates blocking · [ ] pentest criticals closed ·
[ ] IR runbook + tabletop complete

## 13.5 Scalability strategy (staged)

| Stage | Trigger | Action |
|---|---|---|
| S0 launch | <1k MAU | Single app node group + managed DB/Redis; workers on same cluster |
| S1 growth | sustained CPU >60% or p95 drift | Scale API/realtime replicas horizontally (stateless by design); read replica for analytics |
| S2 load spikes | exam days, cohort waves | Per-queue worker autoscaling; sandbox host group expands; CDN absorbs media |
| S3 scale walls | DB >200GB or hot-table contention | Partition event/message tables by month; move heavy admin/analytics reads fully to replica; extract `ai-gateway` + `sandbox` services (already separate processes/zones) |
| S4 multi-region | geographic demand | Region-local read replicas + CDN-first; async-replicated primary; realtime pinned regionally |
Extraction seams were designed in (module boundaries + process separation), so microservices remain
an option — never the starting point.

## 13.6 Architectural rules & enforcement

| Rule | Enforcement mechanism |
|---|---|
| Never trust the frontend | Server-side validation/authz everywhere; matrix tests prove it in CI |
| Authorization only on backend | requirePermission middleware mandatory per route (lint: route without guard fails) |
| Hash passwords, never encrypt | Only crypto module exposes hashing; code-review checklist item |
| No secrets to frontend/Git | VITE_ allowlist + bundle grep + gitleaks |
| Student code never on API servers | Network topology + deploy review; sandbox hosts are separate SG |
| Validate AI output always | Gateway is the only import path to providers; schema check before persist |
| No cross-student data | Owner-predicate repository pattern + IDOR matrix tests |
| Server-owned scoring/timing | Exam/sandbox engines contain all math; FE renders read-only |
| Transactions on critical paths | Service-layer tx helpers; review checklist for multi-aggregate writes |
| Least privilege | Separate DB roles (app vs migrator), IAM scoping per workload |
| Defense in depth | Layered controls documented (D13); each assumes previous fails |
| Modular monolith first | Module boundary lint rules; extraction seams pre-built |
| Business logic out of React | ESLint boundaries; features own logic, pages compose |
| DB logic out of controllers | Repositories only touch Prisma (lint rule) |
| Versioned APIs | /api/v1 prefix enforced in route composition root |

## 13.7 Final recommended architecture (summary)

Build **one disciplined modular monolith** (Express + Prisma + MySQL) with **three purpose-separated
process families from day one** — API, workers, realtime — plus an **isolated sandbox fleet**, all
behind a CDN/WAF edge. Keep intelligence behind a **single validated AI gateway** with budgets and
kill-switches; keep authority in deterministic engines (exams, gates, XP) that AI can inform but
never own. Enforce security through layered, tested mechanisms rather than policy documents:
rotating sessions, RBAC + ownership predicates generated into tests, sandbox isolation, encrypted
envelope data, immutable audit. Ship in ten phases where each phase leaves the product usable —
the architecture's success measure is simple: **a student goes from registration to a verifiable
certificate without a single line of the platform needing to say the word "AI" to feel
intelligent doing it.**
