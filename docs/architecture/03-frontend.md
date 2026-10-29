# 03 — Frontend Architecture

## 1. Application shape

A **React SPA** with selective **prerendering** of public marketing routes for SEO.
Authenticated surfaces are excluded from indexing (`noindex`) and render client-side behind auth.

- Build: Vite (esbuild dev, Rollup prod). Output: hashed static assets deployed to CDN/object
  storage fronted by the edge; `index.html` immutable-cache-busted per release.
- Language: TypeScript `strict` (no `any` escapes without documented justification).
- Rendering strategy: CSR + route-level code splitting; Suspense boundaries per route segment;
  streaming/SSR intentionally avoided in v1 to reduce complexity — SEO handled via prerendered
  public pages and complete meta/OpenGraph injection.

## 2. Technology decisions

| Technology | What it does | Why we need it | Why better than alternatives here | Where used |
|---|---|---|---|---|
| React 18 | Component UI runtime | Team-standard ecosystem; concurrent features; huge hiring pool | vs Svelte/Vue: largest ecosystem for editors, players, virtualization libs we depend on | Entire app |
| TypeScript | Static types | Refactor safety across 70+ pages; shared contracts with backend via packages/shared | Non-negotiable for a codebase this size | Everywhere |
| Vite | Dev server + bundler | Instant HMR; native ESM; simple config | vs CRA (dead), Next (SSR complexity unneeded), Webpack (slow) | Build pipeline |
| Tailwind CSS | Utility styling | Design tokens → utilities keeps visual language consistent; tiny prod CSS; fast iteration | vs CSS-in-JS (runtime cost), CSS Modules (drift) | All components |
| React Router v7 | Client routing | Nested layouts, loaders, data routers; file-agnostic | vs TanStack Router: RR more mature docs/patterns; both fine — RR chosen for nested-layout ergonomics | Route tree |
| TanStack Query v5 | Server-state cache | Deduping, retries, background refresh, optimistic updates, infinite lists — replaces hand-rolled fetching | vs Redux Toolkit Query: better DX w/ React suspense & invalidation granularity; vs SWR: richer mutation/devtools story | All API data |
| Zustand | Minimal global state | Tiny, selector-based subscriptions, no provider nesting | vs Redux: 90% less ceremony for our small global surface; vs Context: no re-render storms | UI store, auth session, exam runtime, socket store |
| React Hook Form | Form state | Uncontrolled perf on large forms (exams, admin CRUD) | vs Formik (stale, slower); pairs natively with Zod resolvers | Auth, onboarding, submissions, admin forms |
| Zod | Schema validation | Single source of validation shared FE/BE from packages/shared; infers types | vs Yup/Joi: TS-first inference | Forms, API responses, env vars, AI output schemas (shared pkg) |
| Monaco Editor | Code editing | VS Code-grade editing: LSP-ish IntelliSense, multi-file, diff view | vs CodeMirror 6: Monaco stronger TS/JS intellisense out of box; heavier but lazy-loaded only where needed | Practice, homework, practical exams, interview coding |
| Framer Motion | Animation | Declarative gestures/transitions, layout animations, reduced-motion hook | vs GSAP: React-idiomatic, smaller mental model; vs CSS-only: orchestration for lists/morphs | Page transitions, micro-interactions |
| Lucide React | Icon set | Consistent stroke icons tree-shaken per-import | vs Font Awesome/MUI icons: cleaner, MIT, tree-shakable | Sparse usage per icon rule |

**Additional justified dependencies**

| Library | Justification |
|---|---|
| Radix UI primitives | WAI-ARIA behavior for Dialog/Dropdown/Tabs/Tooltip/Toast — accessibility done right once |
| class-variance-authority + clsx + tailwind-merge | Typed variant system for the design language |
| socket.io-client | Real-time transport matching backend Socket.IO (reconnect, rooms, acks) |
| @tanstack/react-virtual | Virtualized long lists (inbox threads, question banks, audit logs) |
| react-error-boundary | Route-level error isolation |
| monaco-editor via @monaco-editor/react | Loader wrapper keeping Monaco out of initial bundles |
| date-fns (+ tz support) | Deadlines/simulation clock math, tree-shakeable |
| hls.js | Adaptive video playback |
| vite-plugin-pwa (later phase) | Installability/offline shell for lesson reading |

Anti-dependencies: no Redux, no axios+fetch mix (single fetch wrapper), no moment/lodash-full,
no component kit (MUI/Ant) — they would fight the custom design language.

## 3. Routing architecture

### 3.1 Layout tree

```
RootLayout (ErrorBoundary, Toaster, ThemeProvider, QueryClientProvider)
├── MarketingLayout        (public, prerendered, SEO meta)
│   ├── /                        Landing
│   ├── /about  /how-it-works  /faq  /careers  /careers/:slug
├── AuthLayout (centered card, redirects if authenticated)
│   ├── /login  /register  /forgot-password  /reset-password  /verify-email
├── AppShellLayout (sidebar + topbar; ProtectedRoute + OnboardingGate)
│   ├── /onboarding/*            wizard (career select, assessment)
│   ├── /dashboard               student dashboard
│   ├── /roadmap                 career roadmap (ladder + skill clusters)
│   ├── /skills                  skill tree graph
│   ├── /learn                   learning dashboard (courses grid)
│   ├── /learn/courses/:courseSlug             course page
│   ├── /learn/courses/:courseSlug/lessons/:lessonSlug    lesson shell (reader/video)
│   │     └── tabs: practice · homework · review (nested routes)
│   ├── /homework/:homeworkId                  homework workspace
│   ├── /homework/:homeworkId/review           performance review view
│   ├── /exams/:examId                         exam info/prereqs
│   ├── /exams/:examId/attempts/:attemptId     runner  ← FocusLayout (no chrome)
│   ├── /exams/results/:attemptId              results
│   ├── /progress                              progress dashboard
│   ├── /achievements                          achievements
│   ├── /workspace                             simulation home (offer letter, overview)
│   ├── /workspace/projects/:projectId         project board
│   ├── /workspace/tasks/:taskId               task detail
│   ├── /workspace/inbox                       team/client inbox (threads)
│   ├── /workspace/inbox/:threadId             thread view
│   ├── /workspace/incidents/:incidentId       incident room
│   ├── /workspace/reviews                     weekly + final reviews
│   ├── /interviews/:interviewId               interview runner (FocusLayout)
│   ├── /interviews/:interviewId/results       scorecard
│   ├── /portfolio                             my portfolio editor
│   ├── /portfolio/:username                   PUBLIC profile (MarketingLayout meta)
│   ├── /certificates                          my certificates
│   ├── /verify/certificates/:serial           PUBLIC verification
│   ├── /settings/profile · /security · /notifications · /preferences
├── TeachLayout (role: instructor)   /teach/*
├── AdminLayout  (role: admin)       /admin/*
```

### 3.2 Guard chain

`ProtectedRoute` (session exists? else redirect login w/ return URL) → `OnboardingGate`
(onboarding incomplete? funnel to `/onboarding`) → `RoleRoute` (required roles/permissions from
session snapshot; frontend check is UX only — backend always re-verifies) → `FocusGuard`
(exam/interview routes block navigation & idle-detect, warn on leave).

Route-based code splitting: every top-level segment is a lazy chunk; heavy libs load inside their
features (Monaco in editor feature, hls.js in video player). Intent prefetch: hovering a nav item
for >120ms prefetches its chunk + primary query.

## 4. Page catalog

Format: Route — purpose — key components — primary data.

### Public (prerendered)
| # | Page | Purpose | Key components | Data |
|---|---|---|---|---|
| 1 | `/` Landing | Proposition, level ladder preview, careers index, social proof, CTA | Hero, LadderPreview, CareerCard grid | public careers list |
| 2 | `/about` About | Mission, method (Learn→Prove→Work), team | Prose, Timeline | static |
| 3 | `/careers` Careers catalog | All paths overview | CareerCard grid | GET /careers |
| 4 | `/careers/:slug` Career details | Curriculum outline, projects sample, outcomes, time estimates | LadderPreview, SyllabusPreview | career detail |
| 5 | `/how-it-works` Method explainer | Journey stages explained | StageCards, FAQ teaser | static |
| 6 | `/faq` FAQ | Accordion Q&A | Accordion | static/CMS |
| 7 | `/login` Login | Credentials + MFA step-up | AuthForm | POST /auth/login |
| 8 | `/register` Register | Account creation | AuthForm | POST /auth/register |
| 9 | `/forgot-password` Request reset | Email form | AuthForm | POST /auth/password/reset-request |
| 10 | `/verify-email` Verify | Token consume + status | StatusPanel | POST /auth/email/verify |

### Onboarding
| # | Page | Purpose |
|---|---|---|
| 11 | `/onboarding` Wizard shell | Steps: profile → schedule → experience self-report |
| 12 | `/onboarding/career` Career selection | Career cards + confirm dialog (commitment summary) |
| 13 | `/onboarding/assessment` Initial assessment | Adaptive quiz runner (reuses ExamQuestion primitives, untimed) |

### Learning & progress
| # | Page | Purpose |
|---|---|---|
| 14 | `/dashboard` Student dashboard | Today plan, continue learning, deadlines, recent feedback, progress % |
| 15 | `/roadmap` Career roadmap | The Ladder: levels→clusters→courses; locked states with requirements |
| 16 | `/skills` Skill tree | SkillTree DAG + selected-node drawer (resources, mastery evidence) |
| 17 | `/learn` Learning dashboard | Course cards by level/module; filters |
| 18 | `/learn/courses/:slug` Course page | Syllabus, LessonCards, instructor, progress |
| 19 | `/lessons/:slug` Lesson reader | LessonReader + ChapterNavigation + inline quizzes |
| 20 | Book/tutorial mode | Reader variant with book chapters (same shell, source=book resource) |
| 21 | Video lesson | VideoPlayer + transcript + notes |
| 22 | `/lessons/:id/practice` Interactive practice | PracticeTask list + CodeEditor/LivePreview/Console |
| 23 | Code editor workspace | Multi-file Monaco workspace (practice/homework/exam share it) |
| 24 | Live preview pane | iframe sandbox preview (part of workspace split view) |
| 25 | Console pane | Run results, test output (part of workspace) |
| 26 | `/lessons/:id/homework` Homework brief | Spec, requirements checklist, deadline, submit entry |
| 27 | `/homework/:id` Homework workspace | SubmissionPanel: files/code, checklist, drafts autosave |
| 28 | `/homework/:id/review` Performance review | ReviewPanel: score, strengths, needs attention, recommended next, diff annotations |
| 29 | `/exams/:id` Theory exam info | Rules, duration, attempt policy, start gate (prereq check) |
| 30 | Practical exam info | Project spec, time budget, deliverables, rubric preview |
| 31 | Exam runner (theory) | FocusLayout: questions, navigator, timer, flagging |
| 32 | Exam runner (practical) | FocusLayout: instructions + full IDE + submission |
| 33 | `/exams/results/:attemptId` Results | Score, objective breakdown, review policy, remediation links, retake policy |
| 34 | `/progress` Progress dashboard | Level ladder position, skill mastery rows, XP trend (subtle), history |
| 35 | Skills dashboard | Per-skill deep view: evidence timeline (lessons, practices, exams) |
| 36 | `/achievements` Achievements | Quiet grid of earned/locked milestones w/ criteria text |

### Workspace (company simulation)
| # | Page | Purpose |
|---|---|---|
| 37 | `/workspace` Simulation home | Company header, current sprint, alerts, quick links, manager note |
| 38 | Projects index/board | ProjectBoard per active project |
| 39 | Task detail | TaskPanel: description, acceptance criteria, comments, status controls |
| 40 | My tasks | Cross-project task list w/ filters (assigned/due/priority) |
| 41 | `/workspace/inbox` Inbox | Thread list (team/client channels), unread counts |
| 42 | Thread view | ThreadView + Composer; meeting agendas appear as thread types |
| 43 | Team directory | TeamRoster personas + presence + roles |
| 44 | Incidents index | Open/resolved incident tickets |
| 45 | Incident room | IncidentPanel: timeline, updates, actions taken |
| 46 | Decision moments | DecisionPanel modal-page hybrid during scenarios |
| 47 | Calendar/deadlines | DeadlineTimer chips aggregated weekly view |
| 48 | `/workspace/reviews` Reviews | WeeklyReviewCard list + final PerformanceReviewDoc |
| 49 | Simulation settings | Notification pacing within simulation (quiet hours) |

### Interview & career output
| # | Page | Purpose |
|---|---|---|
| 50 | `/interviews/:id` Interview runner | FocusLayout: staged Q&A, coding tasks embedded, pacing controls |
| 51 | Interview results | InterviewScorecard + transcript + improvement plan |
| 52 | `/portfolio` Portfolio editor | PortfolioGrid + ProjectDetails editor + publish controls |
| 53 | `/portfolio/:username` Public portfolio | Read-only premium profile (public meta tags) |
| 54 | `/certificates` Certificates | CertificateCard list + verification links |
| 55 | `/verify/certificates/:serial` Verification | Public validity check (name, career, level, date) |
| 56 | Career report | Report viewer + PDF download |

### Settings
| # | Page | Purpose |
|---|---|---|
| 57 | `/settings/profile` Profile | Identity, avatar upload, public bio |
| 58 | `/settings/security` Security | Password change (step-up), MFA setup, sessions/devices revoke |
| 59 | `/settings/notifications` Notifications | Channel matrix (in-app/email × event classes) |
| 60 | `/settings/preferences` Preferences | Theme, density, motion reduction, editor keybindings, language (i18n-ready) |

### Instructor console (`/teach`)
| # | Page | Purpose |
|---|---|---|
| 61 | Dashboard | Review queues, upcoming deadlines, flagged low-confidence reviews |
| 62 | Course create/edit | EntityForm over course schema, publishing lifecycle |
| 63 | Lesson builder | Reader content editor, resources attach, quiz composer |
| 64 | Exam builder | Blueprint: pools, counts, timing, retake policy, rubric |
| 65 | Assignment builder | Brief editor, starter files upload, requirement checklist, rubric |
| 66 | Scenario builder | Simulation scenario authoring (acts/beats/events JSON editor + validators) |
| 67 | Student progress | Cohort table + per-student drilldown (progress events feed) |
| 68 | Submission review | Queue with DiffView, override AI scores, annotate |

### Admin console (`/admin`)
| # | Page | Purpose |
|---|---|---|
| 69 | Admin dashboard | KPI tiles, queue depths, error rates, cost meters |
| 70 | User management | Search, roles, suspend/restore, impersonation-with-audit (support) |
| 71 | Career management | Careers, levels, ladder gates config |
| 72 | Course management | Global course registry, ownership assignment |
| 73 | Lesson management | Cross-course lessons, media status |
| 74 | Video management | Uploads, transcode statuses, captions |
| 75 | Question management | Question bank, pools, calibration stats (item difficulty) |
| 76 | Exam management | Exam blueprints, schedules, anomalies report |
| 77 | Assignment management | Assignments library, review SLA monitor |
| 78 | Simulation management | Scenarios registry, runs monitor, persona library |
| 79 | AI configuration | Model routing, prompt template versions, budgets, kill-switch |
| 80 | Analytics | Funnel, retention, cohort completion (pre-aggregated tables) |
| 81 | Audit logs | Filterable audit trail (immutable) |
| 82 | Security monitoring | Failed logins, rate-limit hits, sandbox abuse flags |
| 83 | System settings | Feature flags, maintenance mode, retention policies |

## 5. Folder structure

```
src/
├── app/                        # application composition
│   ├── App.tsx                 # root providers + router mount
│   ├── router.tsx              # route tree (lazy imports)
│   ├── guards/                 # ProtectedRoute, OnboardingGate, RoleRoute, FocusGuard
│   └── providers/              # QueryProvider, ThemeProvider, SocketProvider, ToastHost
├── layouts/                    # Marketing, Auth, AppShell, Focus, Teach, Admin layouts
├── pages/                      # one folder per route; thin — compose features
│   └── learn/
│       ├── LearnPage.tsx
│       ├── course/[courseSlug]/...
├── features/                   # vertical slices; own their data + state
│   ├── auth/                   # hooks, api, forms, mfa flows
│   ├── onboarding/
│   ├── careers/                # roadmap + skill tree
│   ├── learning/               # courses, lessons, reader, video
│   ├── practice/               # workspace editor, preview, console
│   ├── homework/
│   ├── exams/
│   ├── progress/               # xp, achievements, ladder
│   ├── workspace/              # simulation: board, inbox, incidents, decisions
│   ├── interviews/
│   ├── portfolio/
│   ├── certificates/
│   ├── notifications/
│   ├── settings/
│   ├── instructor/
│   └── admin/
├── components/
│   ├── ui/                     # design-system base components (no data, no routes)
│   ├── patterns/               # composed cross-feature patterns (PageHeader, DataTable, EmptyState)
│   └── feedback/               # toasts, error states, skeletons
├── hooks/                      # generic hooks (useDebounce, useMediaQuery, useIdle, useHotkey)
├── services/
│   ├── api-client.ts           # fetch wrapper + interceptors
│   ├── query-client.ts         # QueryClient defaults
│   └── socket.ts               # socket connection + cache bridge
├── stores/                     # zustand slices (ui, session, exam-runtime, realtime)
├── lib/                        # cn(), dates, format, constants-bound helpers
├── types/                      # ambient types + DTO re-exports from @careerlab/shared
├── utils/                      # pure functions
├── constants/                  # routes, permissions maps, copy dictionaries
├── assets/                     # fonts, images (svg sprite via plugin)
└── styles/                     # globals.css, tokens.css, prose.css
```

Rules enforced by ESLint boundaries plugin: `ui/` may not import from `features/`; pages import
from at most one feature; cross-feature reuse goes through `components/patterns` or shared hooks;
stores are imported only via their hook files.

## 6. State management

Ownership matrix — nothing enters global state unless ≥2 unrelated trees need it or it must
survive route changes:

| State kind | Owner | Examples | Persistence |
|---|---|---|---|
| Server state | TanStack Query | courses, lessons, roadmap, submissions, reviews, tasks, threads, admin tables | query cache (memory) |
| Auth/session | Zustand `sessionStore` | user profile snapshot, role/permission set, access token (memory ONLY), MFA pending flag | memory; refresh via cookie |
| UI state | Zustand `uiStore` | theme, density, sidebar collapsed, command palette open, focus-mode banner | localStorage (theme/density only) |
| Exam runtime | Zustand `examRuntimeStore` | attempt id, answers buffer, flagged set, server deadline + drift, heartbeat | sessionStorage (resume), synced to server per answer |
| Realtime | Zustand `realtimeStore` | socket status, unread counters, presence map | memory; counters reconciled from REST on reconnect |
| Ephemeral local | useState/useReducer | dropdown open, tab index, draft text (also debounced to server/localStorage) | none |

Query cache conventions:
- Keys: `[domain, entity, params]` e.g. `['courses', slug]`, `['submissions','list',{status}]`.
- staleTime tiers: static/public 10m · content 5m · personal progress 0 (always refetch on mount).
- Optimistic updates for: marking lesson complete, notification read, task status move, message send
  (rollback + toast on failure).
- Mutations invalidate precisely (e.g., grade published → invalidate `['submission', id]`,
  `['progress']`, `['roadmap']`).

Exam runtime protocol: timer anchored to `serverDeadline` returned at attempt start; client computes
drift each heartbeat (30s) and displays corrected remaining; autosave PATCH per answer change
(debounced 800ms) with local buffer so typing never blocks; final submit sends checksum of buffered
answers to detect desync.

## 7. API communication layer

Pipeline: Component → feature `api.ts` (typed functions) → `api-client` (fetch wrapper) → HTTP/2
→ Express `/api/v1` → controller → service → Prisma → MySQL. Responses validated lightly at the
boundary (Zod parse on critical payloads; trust + TS elsewhere to keep bundle lean).

**Request interceptor chain:** attach `Authorization: Bearer <accessToken>` from memory ·
attach `X-Request-Id` (uuid, echoed by server logs) · locale header.

**Response/error normalization:** non-2xx → `ApiError { status, code, message, details?, requestId }`
parsed from the standard envelope (Section 05.4). Unknown shape → generic `UNKNOWN`.

**Auth 401 single-flight:** first 401 triggers one refresh call (promise shared by all queued
requests); success replays queued requests; failure → logout + redirect with return URL.
Refresh token itself lives only in an httpOnly cookie — JS can't read or leak it.

**Retry policy:** GET/HEAD retried ×2 exponential backoff + jitter on network/5xx/429
(honor `Retry-After`). Mutations retried only when idempotency-key provided (POST /submissions).
Never retry 4xx client errors otherwise.

**Cancellation:** every queryFn receives `AbortSignal`; route change aborts in-flight reads.
Sandbox runs/interview streams use explicit cancellation semantics server-side (run killed).

**Pagination:** cursor-based for feeds (`?cursor=&limit=` → `{items,nextCursor}`), offset for
admin tables (`?page&pageSize&sort&filter[field]`) with total count. Infinite scroll UI for feeds,
table pagination for consoles.

**Loading/UX contract:** every query consumer renders skeleton shaped like content; mutations show
inline pending on trigger control; global route-level fallback for chunk loads; error boundary per
route with retry action; empty states with next-action copy.
