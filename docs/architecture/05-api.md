# 05 — REST API Architecture

Base URL: `https://api.<domain>/api/v1` · JSON only · UTF-8 · HTTP/2 at the edge.

## 1. Conventions

**Methods**
| Method | Semantics | Idempotent | Examples |
|---|---|---|---|
| GET | Read; never mutates; cacheable per tier | Yes | list/detail/search |
| POST | Create resource, or trigger non-CRUD action (`/verbs`) | No (unless Idempotency-Key) | create course, start exam attempt |
| PATCH | Partial update of resource | Yes (same patch) | update lesson, autosave answer |
| PUT | Full replace of subresource where client owns shape | Yes | replace notification preferences matrix |
| DELETE | Remove/archive (soft delete preferred on content) | Yes | delete draft submission file |

Naming: plural kebab-case resources; relationships nested one level max
(`/courses/:id/lessons`); actions that aren't CRUD are explicit verbs
(`/exams/:id/attempts`, `/attempts/:id/submit`). State-changing side effects are modeled as
resources or verb endpoints — never via GET.

**Versioning:** URL major version (`/api/v1`). Breaking change ⇒ `/v2` alongside v1 with sunset
header. Additive fields are non-breaking.

**Pagination:** feeds/cursors `?cursor=<opaque>&limit=` → `{items,nextCursor}`; admin tables
offset `?page=&pageSize=&sort=-created_at&filter[status]=graded` → `{items,total,page,pageSize}`.
Hard caps: limit ≤ 100.

**Filtering/sorting:** allowlisted keys server-side (validated by Zod); unknown keys → 400
`VALIDATION_ERROR`. Prevents mass-assignment and injection through query DSLs.

**Concurrency:** optimistic locking via `version` int on editable content rows (409
`VERSION_CONFLICT` on mismatch). Exam answers use last-write-wins with server timestamps.

**Standard response envelopes**

```json
// success
{ "success": true, "data": { ... }, "meta": { "pagination": {...} } }

// error
{ "success": false,
  "error": { "code": "EXAM_NOT_AVAILABLE",
             "message": "This exam is not available yet.",
             "details": { "opensAt": "2026-09-01T09:00:00Z" },
             "requestId": "req_01J9..." } }
```

## 2. HTTP status usage

| Status | Used for |
|---|---|
| 200 | success w/ body |
| 201 | created resource (+ Location) |
| 202 | accepted async job (submission review, sandbox run, report generation) — includes `jobId` + status poll path |
| 204 | success no content |
| 400 | validation error (Zod details flattened into `details.fields`) |
| 401 | missing/invalid/expired access token (code distinguishes TOKEN_EXPIRED for refresh flow) |
| 403 | authenticated but forbidden (RBAC/ownership/prereq/state) — or 404 blinding where existence is sensitive |
| 404 | not found / not visible |
| 409 | conflict (duplicate email, active attempt exists, version conflict, deadline passed) |
| 410 | gone (expired token/link) |
| 422 | semantic rejection of well-formed input (e.g., unsupported language for sandbox) |
| 423 | locked (exam window closed, account suspended → distinct codes) |
| 429 | rate limited (+ `Retry-After`) |
| 5xx | server fault; generic `INTERNAL_ERROR`; never leak stack/config |

## 3. Rate limiting classes (Redis sliding window)

| Class | Limit | Applies to |
|---|---|---|
| public | 60/min/IP | marketing APIs, careers catalog |
| auth-sensitive | 5/min/IP + progressive lockout | login, register, password reset, verify |
| standard-authed | 120/min/user | most app endpoints |
| mutation-heavy | 30/min/user | submissions, portfolio edits, task moves |
| ai-interactive | 10/min/user, daily quota | mentor chat, interview turns |
| sandbox-run | 20/hour/user + concurrency 2 | code execution triggers |
| admin-export | 10/min/user | analytics CSV exports |

Headers on every response: `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`.

## 4. Error code registry (excerpt — full registry maintained in `packages/shared/errors`)

| Domain | Codes (HTTP) |
|---|---|
| Auth | INVALID_CREDENTIALS(401), TOKEN_EXPIRED(401), REFRESH_REUSE_DETECTED(401), EMAIL_NOT_VERIFIED(403), MFA_REQUIRED(401), MFA_INVALID_CODE(401), ACCOUNT_LOCKED(423), WEAK_PASSWORD(400) |
| Validation | VALIDATION_ERROR(400), UNSUPPORTED_LANGUAGE(422), FILE_TOO_LARGE(413), FILE_TYPE_FORBIDDEN(415) |
| Careers/Learning | CAREER_NOT_FOUND(404), ALREADY_ENROLLED(409), LESSON_LOCKED(403), PREREQUISITE_MISSING(403) |
| Exams | EXAM_NOT_AVAILABLE(403), ATTEMPT_ACTIVE_EXISTS(409), ATTEMPT_EXPIRED(410), RETAKE_COOLDOWN(403), EXAM_WINDOW_CLOSED(423), ANSWER_WRITE_LOCKED(409) |
| Sandbox | RUN_QUOTA_EXCEEDED(429), RUN_CONCURRENCY_LIMIT(429), RUN_TIMEOUT(422), RUN_INTERNAL(500→retryable) |
| Simulation | SIMULATION_NOT_ENROLLED(403), TASK_STATE_INVALID(409), DECISION_ALREADY_MADE(409), DEADLINE_PASSED(410) |
| AI | AI_BUDGET_EXCEEDED(429), AI_UNAVAILABLE(503→fallback copy shown), AI_REVIEW_PENDING(409) |
| Media | SCAN_QUARANTINED(422), SIGNED_URL_EXPIRED(410) |
| System | INTERNAL_ERROR(500), MAINTENANCE_MODE(503) |

Client behavior contract: FE maps codes → UI copy dictionary; unknown codes render message text;
`requestId` always surfaced in error toasts ("Reference: req_…") for support correlation.

## 5. Endpoint reference (major modules)

### `/auth`
```
POST   /auth/register                      public        create account (pending verify)
POST   /auth/login                         public+rl     → {accessToken, expiresIn} + Set-Cookie refresh
POST   /auth/mfa/challenge                 mfa-pending    verify TOTP during login
POST   /auth/refresh                       cookie+csrf    rotate refresh → new pair
POST   /auth/logout                        auth           revoke current session
POST   /auth/logout-all                    auth           revoke all sessions (password change)
POST   /auth/email/send-verification       auth           resend (rate limited)
POST   /auth/email/verify                  public         consume token
POST   /auth/password/forgot               public+rl      request reset
POST   /auth/password/reset                public+rl      consume token, revoke sessions
PATCH  /auth/password                      auth+stepup    change password (current pw required)
POST   /auth/mfa/enroll · /verify · /disable             TOTP lifecycle + recovery codes
GET    /auth/sessions                      auth           device/session list
DELETE /auth/sessions/:sessionId           auth           revoke one session
```

### `/users` (self)
```
GET    /users/me                           auth          profile + roles + prefs summary
PATCH  /users/me                           auth          profile fields (allowlist)
PUT    /users/me/notification-preferences  auth          full matrix replace
GET/PATCH /users/me/preferences            auth          theme/density/editor settings
POST   /users/me/avatar                    auth          returns media sign payload
DELETE /users/me                           stepup        anonymization workflow (GDPR-style)
GET    /users/me/security-log              auth          own security events feed
```

### `/careers`
```
GET    /careers                            public        catalog (cached 10m)
GET    /careers/:slug                      public        detail + ladder outline
POST   /careers/:id/enroll                 auth          enrollment (transactional init)
GET    /me/roadmap                         student       personalized roadmap projection
GET    /me/skills                          student       skill tree state for enrolled career
```

### `/courses` & `/lessons`
```
GET    /courses?level=&career=             auth          visible courses grid
GET    /courses/:slug                      auth          syllabus + progress markers
GET    /courses/:slug/lessons              auth          lesson index w/ lock states
GET    /lessons/:id                        student       content (reader/video payload) + position
POST   /lessons/:id/complete               student       idempotent completion event
GET    /lessons/:id/resources              student       signed URLs for authorized assets
# instructor authoring under /teach/courses... (create/update/publish lifecycle)
```

### `/practice`
```
GET    /practice/tasks?lessonId=           student       tasks for lesson
POST   /practice/tasks/:id/attempts        student       create attempt session
PUT    /practice/attempts/:id/code         student       save workspace snapshot (debounced)
POST   /practice/attempts/:id/run          student       queue execution → 202 {runId}
GET    /practice/runs/:runId               owner         result/status poll (or socket push)
POST   /practice/attempts/:id/check        student       run assertion suite → pass/fail map
```

### `/assignments` & `/submissions`
```
GET    /assignments/:id                    student       brief + requirements + rubric preview + deadline
POST   /assignments/:id/submissions        student       create/replace draft (files via media)
PATCH  /submissions/:id                    owner         edit while status=draft|submitted<deadline
POST   /submissions/:id/submit             owner         final submit (idempotency-key) → 202 review job
GET    /submissions/:id/review             owner         AI/instructor review when ready
GET    /me/submissions?status=             owner         my submissions feed (cursor)
# instructor:
GET    /teach/reviews?queue=pending        instructor    review queue (low-confidence first)
PATCH  /teach/reviews/:reviewId            instructor    override score/comments (audited)
```

### `/exams` & attempts
```
GET    /exams/:id                          student       blueprint info, eligibility, retake state
POST   /exams/:id/attempts                 student       start (tx: prereqs, active-attempt check,
                                                         question snapshot) → {attemptId, questions[],
                                                         serverDeadline, heartbeatSec}
PATCH  /attempts/:id/answers/:questionId   owner         upsert answer (server-time validated)
POST   /attempts/:id/heartbeat             owner         keepalive + clock sync + anomaly ping
POST   /attempts/:id/submit                owner         finalize (idempotent) → grading pipeline
GET    /attempts/:id/result                owner         scores when published
GET    /me/exams/history                   owner         attempt history
```

### `/progress`
```
GET    /me/progress/summary                student       level, %, XP total (no leaderboard v1)
GET    /me/progress/skills                 student       mastery map + unlock states
GET    /me/xp/transactions                 owner         ledger (audit-grade)
GET    /me/achievements                    owner         earned + available
```

### `/simulations` (workspace)
```
GET    /simulations/me                     student       run overview, company, sprint clock state
GET    /simulations/me/projects            student       project list + board columns
GET    /projects/:projectId/tasks          member        task board payload
PATCH  /tasks/:taskId                      member        status move / claim (state machine validated)
GET    /tasks/:taskId                      member        detail incl. comments
GET    /inbox/threads?channel=team|client  member        thread list (cursor)
GET    /threads/:threadId/messages         member        messages (cursor, realtime-supplemented)
POST   /threads/:threadId/messages         member        send (evaluated async for comms scoring)
GET    /incidents/:incidentId              member        incident + timeline
POST   /incidents/:incidentId/actions      member        mitigation choice (scored)
POST   /decisions/:decisionId              member        commit decision option (irreversible)
GET    /simulations/me/reviews             student       weekly + final performance reviews
```

### `/interviews`
```
POST   /interviews                         student       schedule/start eligible interview
GET    /interviews/:id                     owner         script state, next prompt (turn-based)
POST   /interviews/:id/answers             owner         submit turn → 202 follow-up generation
POST   /interviews/:id/code-runs           owner         coding question execution (sandbox)
GET    /interviews/:id/results             owner         scorecard + transcript when complete
```

### `/portfolio` & `/certificates`
```
GET    /portfolio/:username                public        published profile
GET/PATCH /me/portfolio                    owner         builder data
POST   /me/portfolio/projects              owner         add project (evidence-linked)
POST   /me/portfolio/publish               owner         publish snapshot
GET    /certificates                       owner         mine
GET    /verify/certificates/:serial        public        validity (name, career, level, date)
POST   /me/career-report                   owner         generate PDF → 202
```

### `/notifications`
```
GET    /notifications?unread=              auth          cursor feed
POST   /notifications/read                 auth          mark ids/cursor read (bulk)
PUT    /notification-preferences           auth          channel×event matrix
SSE fallback: GET /notifications/stream        (when WS unavailable)
```

### `/ai` (explicit interactive surfaces; evaluation flows live inside their resources)
```
POST   /mentor/messages                    auth+quota    ask scoped question → streamed reply chunks
GET    /recommendations/next               student       recommended-next card payload
```

### Admin `/admin/*` (role-gated, all actions audited)
```
CRUD   /admin/users · /admin/users/:id/roles · suspend · restore · impersonate(start/stop)
CRUD   /admin/careers · levels · skills(+edges) · courses · lessons · videos · pools/questions
CRUD   /admin/exams · assignments · scenarios · personas
GET    /admin/analytics/*                  pre-aggregated KPI series
GET    /admin/audit-logs                   filterable immutable view
GET    /admin/security/events              failed logins, rate-limit hits, sandbox flags
GET/PATCH /admin/settings · feature-flags
GET/PATCH /admin/ai-config                 routing table, budgets, kill-switch, template versions
```

## 6. Cross-cutting headers

Request: `Authorization: Bearer`, `X-Request-Id`, `Idempotency-Key` (mutations), `Accept-Language`.
Response: `RateLimit-*`, `X-Request-Id` (echo), `Deprecation`/`Sunset` (during version transitions),
standard security headers set at edge + app layer (Section 06).
