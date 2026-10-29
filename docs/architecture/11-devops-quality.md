# 11 — DevOps, Docker, Testing, Performance, Accessibility

## 1. Environments

| Env | Purpose | Data | Deploy trigger | Access |
|---|---|---|---|---|
| local dev | feature work | seeded fixtures (faker), MailHog, MinIO | docker compose watch | devs |
| staging | integration + QA + DAST + demos | anonymized copy of prod-shaped data; separate cloud project | auto on merge to main | team |
| production | live | live | manual approval gate after staging green | deploy role only |

Branch model: trunk-based, short-lived branches, PR checks mandatory. Feature flags decouple
deploy from release (flags table + admin toggle); migrations always backward-compatible
(expand-contract) so rollback never requires data surgery.

## 2. CI/CD pipeline (GitHub Actions)

```
PR opened
 ├ lint + typecheck (eslint, tsc --noEmit)          ─┐
 ├ unit tests (vitest) + coverage delta gate         │ parallel,
 ├ integration tests (supertest + ephemeral MySQL/Redis via services)  │ ~8 min budget
 ├ SAST (CodeQL, Semgrep) + secret scan (gitleaks)   │
 └ dependency audit (high+ blocks) + license check  ─┘
merge to main →
 build multi-stage images (web, api, worker, realtime) → SBOM (syft) + provenance attestation
 → Trivy image scan (critical blocks) → push registry (immutable digest tags)
 → prisma migrate deploy against staging (dry-run diff reviewed in PR)
 → deploy staging → e2e smoke suite (Playwright critical journeys) + ZAP baseline
manual approval → production rolling deploy (health-gated) or blue-green for DB-adjacent releases
 → post-deploy synthetics; failed health = automatic rollback to previous digest
```

## 3. Docker

Per-service images: multi-stage builds (deps → build → runtime), node:22-alpine base (distroless
evaluation later), non-root USER, dumb-init as PID 1, HEALTHCHECK endpoints, .dockerignore strict.
No secrets baked into images — config injected at runtime.

Compose topology:

```
services:
  web        nginx serving built SPA + edge headers (prod analog of CDN origin)
  api        x2 replicas profile (dev: 1)
  worker     same image, command=worker.ts, scaled per queue via env
  realtime   socket.io process
  mysql      volume, healthcheck (dev/staging only; prod uses managed)
  redis      single node (dev)
  minio      S3-compatible storage (dev)
  mailhog    SMTP sink (dev)
  qdrant     vector index (dev/staging)
  sandbox-host  privileged-isolated service running the container pool (NEVER on API hosts;
             in prod runs as dedicated instance group with its own security group)
```

Isolation rule: sandbox-host is a distinct trust zone everywhere — it shares no network with
mysql/secrets services even locally; compose networks enforce it so dev mirrors prod topology.

## 4. Testing strategy

Pyramid with explicit ownership per layer:

| Layer | Tooling | What must be tested | Gate |
|---|---|---|---|
| Unit | Vitest (FE+BE) | pure logic: mastery math, XP caps, gate rules, token utils, validators, reducers, cva variants | changed-lines coverage ≥80%, global ≥70% |
| Integration (API) | Vitest + Supertest + testcontainers (MySQL, Redis) | module flows through HTTP incl. auth, RBAC matrix, transactions, outbox emission, error envelopes | full suite <10 min, deterministic |
| Contract | OpenAPI schema generated from Zod; CI diffs against committed spec | FE/BE drift caught pre-deploy | breaking diff fails PR |
| Authorization matrix | generated tests from declarative table (role × endpoint × ownership state) | every endpoint × student/instructor/admin/anonymous × own/others' resources | 100% cases pass — this is where "never trust frontend" is proven |
| Sandbox security | dedicated suite | network denial, filesystem escape attempts, fork bomb, resource exhaustion, hidden-test leakage, timeout kill correctness | fail closed = pass |
| AI output | golden-set eval harness (expert-graded fixtures per task) nightly | schema validity 100%; score agreement within tolerance; injection canary trips; refusal behavior on off-scope prompts | regression > epsilon blocks release of prompt/model changes |
| Frontend component | Vitest + React Testing Library + axe-core | rendering states (loading/error/empty), keyboard interaction, ARIA roles, form validation wiring | axe violations block PR |
| E2E | Playwright (chromium+webkit) | critical journeys: register→verify→onboard→assessment→lesson complete→submit homework→review appears→exam attempt→result; workspace task cycle; interview turn; portfolio publish; certificate verify | smoke subset on staging every deploy; full nightly |
| Load | k6 scenarios | exam-start spike (500 rps), sustained browse, submission storm, sandbox burst saturation | p95 budgets met at 2× expected launch load |

Practices: factories/fakers for deterministic seed data; time-travel clock injection for exam/
deadline tests; flaky-test quarantine policy (max 7 days, then fix-or-delete); no skipped tests
merged to main.

## 5. Performance

Budgets (enforced by CI Lighthouse + server metrics):

| Area | Budget |
|---|---|
| Web Vitals | LCP < 2.5s · INP < 200ms · CLS < 0.1 on marketing + dashboard routes |
| Initial JS | < 200 KB gzip main chunk; route chunks lazy |
| API reads | p95 < 300ms; writes < 500ms; roadmap/dashboard aggregates < 400ms |
| DB queries | p95 < 50ms; zero N+1 on hot paths (prisma query logging assertion in CI perf spec) |
| Sandbox turnaround | practice p95 < 15s queued-to-result; exam priority lane < 10s |
| Review latency | homework review p95 < 5 min |

Frontend levers: route-level code splitting; Monaco + hls.js lazy; virtualized long lists;
prefetch on hover/idle; image srcset + AVIF; font subsetting + swap; skeleton layouts matching
final geometry (no layout shift); memoization discipline (React Compiler evaluation when stable);
RUM via web-vitals beacon feeding Grafana.

Backend levers: connection pool sizing (pool ≈ cores × 2 + spindle, tuned under load test);
cursor pagination everywhere user-facing; batch helpers for N+1 patterns; read replica routing for
analytics/admin heavy reads; queue offload for anything >800ms; compression brotli/gzip at nginx;
HTTP cache headers per resource class; Redis payload cache for hot public catalogs.

Database levers: covering indexes for dashboard aggregates; monthly partitioning path prepared for
progress_events/submissions/messages (range by created_at) once tables exceed ~50M rows; slow-query
log digested weekly; EXPLAIN reviews required for new query shapes in review checklist.

Media/editor/simulation: HLS adaptive streaming; editor linting in Monaco web workers with debounced
validation; simulation tick sweep is O(active_runs) with index-backed due-beat queries and batched
message inserts.

## 6. Accessibility (WCAG 2.2 AA commitment)

Structural: semantic landmarks (header/nav/main/aside/footer), one h1 per page, logical heading
order; skip-to-content link first focusable.

Keyboard: everything operable without pointer — menus, dialogs (focus trap + restore), tabs,
tables, drag alternatives (task board move via menu), code editor retains native textarea mode
toggle; visible `:focus-visible` ring token on all interactive elements; no keyboard traps except
intentional modal scope with Escape hatch.

Screen readers: Radix primitives provide correct ARIA patterns; forms bind label/error/hint via
`aria-describedby`; async results announced via polite live regions (review ready, search results);
exam timer announces at T-5min/T-1min (assertive); socket events do not announce raw — UI reflects
then announces summary.

Visuals: token pairs verified ≥4.5:1 text / 3:1 UI; information never encoded by color alone
(status carries text label too); motion respects prefers-reduced-motion globally (Framer Motion
`useReducedMotion` gate); zoom to 200% reflows without loss; target sizes ≥24px.

Testing: axe-core in component tests + Playwright a11y assertions per page template; manual NVDA +
VoiceOver passes each phase exit; accessibility statement page with contact channel published.
