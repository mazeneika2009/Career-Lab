# 12 — Architecture Diagrams

Legend: `─►` sync call · `⇢` async (queue/event) · `[Z]` security zone boundary.

## D1. Overall system architecture
```
                       ┌────────────────────────────[Z1 EDGE]────────────────────────┐
 Browser / Mobile ───► │ CDN · WAF · TLS · Rate shield · Static SPA assets            │
                       └───────────────┬──────────────────────────┬──────────────────┘
                                       │ HTTPS / WSS              │ signed URLs
                       ┌───────────────▼────────[Z2 APP]─────────▼──────────────┐
                       │ Nginx LB → API xN (Express)   Socket.IO node(s)         │
                       │      │        │                │                        │
                       │      │        └── Redis (cache · rate · pubsub) ── BullMQ  │
                       │      ▼                                          ▲        │
                       │ MySQL 8 (+read replica) ◄── outbox dispatcher ──┘        │
                       └───────┬───────────────┬─────────────────┬───────────────┘
                               ⇢               ⇢                 ⇢
                    ┌──────────▼───[Z3 WORK]───▼──────[Z4 SANDBOX]▼───────────────┐
                    │ Workers: ai-eval · video · email · analytics · sim-scheduler│
                    │ Object storage S3 + KMS          Sandbox hosts (no net,    │
                    │ Vector index (Qdrant)            container pool, tests)     │
                    └──────────────────────────────────────────────────────────────┘
```

## D2. Frontend architecture
```
Router (lazy routes)
 ├── MarketingLayout (prerendered SEO)
 ├── AuthLayout
 ├── AppShellLayout ── guards: Protected → Onboarding → Role
 │      ├── pages/* compose features/*
 │      │      features = api hooks (TanStack Query) + state (zustand slices) + components
 │      └── FocusLayout (exam/interview/coding — chrome removed)
 Design system ui/ (Radix behavior + cva tokens) ← used by everything
 services/api-client (interceptors, refresh single-flight) → REST /api/v1
 services/socket → wss namespaces /app /sim → writes into query caches
```

## D3. Backend request lifecycle
```
HTTP → requestId → helmet/CSP → CORS → rateLimit(class) → authenticate(JWT)
     → requirePermission(codename) → validate(Zod DTO) → controller
     → service [tx boundary, policies, domain events → job_outbox]
     → repository (Prisma) → MySQL
     ← {success,data|error envelope} ; logs pino(requestId,user)
Background: outbox-dispatcher ⇢ BullMQ ⇢ workers ⇢ results via socket/REST poll
```

## D4. Authentication flow
```
Register: POST /auth/register → argon2 hash → user(pending) + token(SHA-256 stored)
        → email link → verify → active
Login:    credentials ✓? → MFA enrolled? → challenge → access JWT(15m,memory) +
          refresh cookie(httpOnly,Strict) + sessions row
Refresh:  cookie → lookup hash → rotated? REUSE ⇒ revoke family + security event
          : issue new pair (sliding expiry)
Access:   Bearer JWT per request; sid checked against revocation cache (Redis)
Logout:   revoke session row + cache entry; cookie cleared
Step-up:  sensitive ops require fresh credential/MFA confirmation ≤5 min
```

## D5. Authorization flow
```
request(user, resource, action)
 ├ 1 authenticate → user context (roles, perm snapshot from cache)
 ├ 2 requirePermission(resource.action)          deny ⇒ 403
 ├ 3 policy check in service:
 │     ownership (row.user_id == actor) OR instructor-owns-course-chain OR admin
 │     + state rules (window open, prereqs met, attempt active…)   deny ⇒ 403/404-blind
 └ 4 repository WHERE clauses embed owner predicate   # mechanical isolation
Frontend role checks exist for UX only; server is the only authority.
CI proves it: generated matrix tests across roles × endpoints × ownership states.
```

## D6. AI gateway flow
```
Caller module ─► task registry (template vX, schema, model tier, budget check)
             ─► context builder (rubric + facts + scoped profile; PII scrub)
             ─► moderation(in) ─► fence(student content) ─► provider adapter
             ─► moderation(out) ─► Zod schema ─► semantic/fact cross-checks
             ─► repair loop ≤2 ─► persist typed result ─► accounting(ai_usage_log)
Failure path: deterministic-only fallback + needs_human flag + kill-switch honored.
Canary trip ⇒ discard output + security event.
```

## D7. Homework evaluation flow
```
student submits ─► API(202, jobId) ⇢ queue ai-evaluation
   worker: sandbox static pass(lint/tests) ⇒ FACTS
   → context(brief, rubric, requirements, level, history, skills)
   → LLM structured review → validate(score range, locations real, req ids valid)
   → ai_reviews row (confidence, needs_human?) 
   → notify(socket+notification) → student sees Performance Review
   low confidence / borderline ⇒ instructor review queue first
```

## D8. Exam flow
```
info page → eligibility shown (prereqs, attempts, cooldown, window)
POST attempts [TX]: checks + question snapshot(seed) + server_deadline
runner(FocusLayout): answers PATCH autosave · heartbeat 30s(clock drift fix)
deadline passes → client submits AND sweeper auto-submits (server enforces)
submit [TX]: FOR UPDATE lock → deadline recheck → flush answers → submitted
grading: objective sync · code/essay ⇢ sandbox + AI rubric → publication TX
        (scores + skills_progress + XP + gate/certificate evaluation)
results: policy-driven review view + remediation links + retake cooldown
```

## D9. Code execution sandbox
```
editor run ─► API validate(lang allowlist, size, quota) ⇢ queue sandbox
sandbox host[Z4]: warm pool slot → mount code(ro tmpfs) + decrypt-in-memory hidden tests
   runner as uid10001: no network namespace · cgroups(cpu .5, mem 512M, pids 64)
   seccomp allowlist · tmpfs 64M · wall clock 10s · rootfs read-only · zero secrets
result{stdout,stderr,test cases,timings} ─► API persist ─► socket push owner
violations(seccomp/net/escape probes) ⇒ kill + security_events + quota penalty
Hosts share nothing with DB/secrets zones; egress denied at SG level.
```

## D10. Company simulation runtime
```
scenario(def JSON, seed) ─► simulation_run(state machine, sprint clock)
tick sweep(60s) ── due beats ──► fire events ─► messages/tasks/incidents/decisions
action triggers: task done → QA follow-up / next beat
response triggers: student msg → persona reply after simulated latency
telemetry: sandbox grades · message tone · decision weights · lateness math
periodic aggregation → act reviews → final performance review (8 dimensions + evidence)
all artifacts persisted as workplace records (threads, tickets, reviews)
```

## D11. Database architecture
```
MySQL primary (InnoDB, utf8mb4) ── binlog ──► PITR shipping ──► offsite encrypted backups
        │ reads (analytics/admin heavy)
        ▼
   read replica
Domains: identity/rbac · content(careers→lessons) · assessment(practice/homework/exams)
       · progress(events→projections, xp ledger) · simulation · interviews/output
       · platform(audit, security, outbox, ai_usage, files, flags, settings)
Rules: BIGINT PK + ULID public_id · FK discipline · JSON snapshots where flexible
       · append-only ledgers(xp, audit, progress_events) · transactions at aggregates
```

## D12. Deployment architecture
```
GitHub → Actions CI(test·scan·build) → registry(digest tags, SBOM)
      → staging deploy(auto) → smoke+E2E+DAST
      → approval gate → prod rolling/blue-green (health-gated, auto-rollback)
Runtime: LB → api xN · realtime xN · workers(per-queue scale groups)
         managed MySQL(+replica) · managed Redis · object storage+CDN
         sandbox host group (isolated SG) · KMS/Secrets · monitoring stack
```

## D13. Security architecture (defense in depth)
```
[L0 edge]   TLS1.3 · HSTS preload · WAF · DDoS shield · bot rules
[L1 app]    CSP nonce · security headers · CORS allowlist · rate classes · body caps
[L2 data-in] Zod allowlists · magic-byte file validation · mass-assignment-proof DTOs
[L3 ident]  Argon2id · MFA TOTP · refresh rotation+reuse detection · step-up
[L4 authz]  RBAC perms · ownership policies · repo-level owner predicates
[L5 compute] sandbox zone(no net/no secrets) · worker least privilege IAM
[L6 data]   field envelope AES-256-GCM(KMS KEK) · hashed tokens · private buckets+signed URLs
[L7 ops]    audit append-only · SIEM alerts · gitleaks/SAST/DAST/dep scanning · pentests
[L8 recover] encrypted immutable backups · restore drills · IR runbooks
Every layer assumes the previous one can fail.
```
