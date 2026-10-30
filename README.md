# Career Lab

Educational career simulation platform — **Learn → Practice → Prove → Interview → Work → Certify**.

Students pick a career path, work through lessons, readings, videos, assignments, theory and
practical exams, pass a virtual (HR) and technical interview, then enter a simulated company with
real team, client, deadline and scenario workflows. Progress is authoritative in MySQL and mirrored
to Supabase for durable history and external integrations.

## Features

### Identity and account security

- Registration, email verification, login, logout, password forgot/reset/change, and session
  management with per-device revocation.
- RS256 access tokens, rotating opaque refresh tokens with reuse detection, CSRF protection,
  progressive lockout, rate limiting, RBAC, audit logging and security events.
- **Login security alert:** every successful login sends “New login detected on your Career Lab
  account” with the UTC and local time plus device/IP details when available. Delivery is
  fire-and-forget — an SMTP failure is logged and never blocks authentication.

### Learning and assessment

- Career selection, dashboard, learning path, and a unified course player with lesson content,
  assignments and practical steps.
- Digital books, a filterable video library, lesson notes with PDF export, and practice exercises in
  a Monaco editor (loaded only when a practical step needs it).
- Theory and practical exams, assignment submissions, evaluation and feedback reports, skill
  progress, roadmap, performance review and career report.
- Event-based score aggregation: assessment history, per-skill evidence and performance areas are
  derived from graded events rather than overwritten totals.

### Interviews and workplace progression

- Two server-scored interview stages: virtual/HR screening, then technical interview.
- Passing the **technical interview** unlocks **Company Simulation** and **Team Communication**
  together, immediately and durably.
- Starting the simulated company opens **Client Communication**, **Deadlines & Priorities**, and
  **Workplace Scenarios**.
- Sidebar order is fixed: Virtual Interview → Technical Interview → Company Simulation & Team
  Communication → Client Communication → Deadlines & Priorities → Workplace Scenarios.
- Locked steps stay visibly locked, cannot navigate, and show a contextual hint instead of a raw
  access error. Every gate is enforced by the backend as well as the UI.
- Unlock and completion state is persisted to MySQL and mirrored monotonically to Supabase, so it
  survives refreshes and re-logins.

### Outcomes

- Portfolio, certificate status, readiness score, notifications and a consolidated career report.

## Stack

| Layer    | Technology                                                                       |
| -------- | -------------------------------------------------------------------------------- |
| Frontend | React 18 · TypeScript · Vite 6 · Tailwind CSS 4 · React Router 7 · Zustand       |
| Backend  | Node.js 22+ · Express 5 · TypeScript · Prisma 6 · MySQL 8                        |
| Data     | MySQL (source of truth) · Supabase Postgres (mirrored history and progression)   |
| Email    | Nodemailer / SMTP (verification, reset and login alerts)                         |
| Testing  | Vitest · Supertest · Testing Library · jsdom                                     |

## Prerequisites

- Node.js >= 22 and npm
- MySQL 8 running locally (default expectation: `127.0.0.1:3306`)
- An SMTP account for verification/reset/login-alert emails (optional in dev — emails are logged)
- Optional: a Supabase project for the Postgres mirror

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env        # Windows: Copy-Item .env.example .env
```

Edit `backend/.env`:

- `DATABASE_URL="mysql://USER:PASSWORD@127.0.0.1:3306/career_lab"` — the account needs rights to
  create/alter tables in `career_lab` **and** `career_lab_test` (tests derive the test DB name).
- SMTP settings (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`) — if left empty,
  emails are logged to the server console instead of sent.
- `COOKIE_SECURE=false` for local HTTP dev; must be `true` behind HTTPS in production.

Generate JWT signing keys, push the schema, and seed roles/permissions (+ dev users outside prod):

```bash
npm run generate-keys       # writes keys/jwt-private.pem + keys/jwt-public.pem (gitignored)
npm run db:push             # creates career_lab + tables
npm run db:seed             # roles, permissions, dev users (APP_ENV != production)
```

Dev users created by the seed (non-production only):

```
student@careerlab.local     ChangeMe#2026lab
instructor@careerlab.local  ChangeMe#2026lab
admin@careerlab.local       ChangeMe#2026lab
```

Start the API:

```bash
npm run dev                 # http://localhost:4000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env        # leave VITE_API_URL unset for same-origin /api/v1
npm run dev                 # http://localhost:5173
```

`vite.config.ts` proxies `/api` to `http://localhost:4000` for both `vite dev` and
`vite preview`, so browser requests stay same-origin and the CSP can remain
`connect-src 'self'`. Override the target with `API_PROXY_TARGET` if the API runs
elsewhere. Production builds ignore a localhost `VITE_API_URL` and fall back to the
same-origin `/api/v1`; keep it unset (or relative) unless you intentionally use a
separate API origin with matching CSP and CORS.

### 3. Supabase mirror (optional)

MySQL remains authoritative. Supabase stores mirrored rows plus durable assessment, skill and
workplace progression; these mirrors are not used to grant access. Apply the base schema to a fresh
project, configure the `SUPABASE_*` variables in `backend/.env`, then run the idempotent sync:

```bash
cd backend
npm run migrate:supabase:dry   # validate transformations, write nothing
npm run migrate:supabase       # upsert all tables and reset identity sequences
```

Apply and verify the additional schemas separately:

```bash
npm run apply:progress-schema  # assessment_scores, skill_metrics, user_progress
npm run apply:learning-schema  # learning_step_progress, practical_submissions,
                               # interview_verifications, workplace_progress
npm run sync:progress          # rebuild MySQL skill aggregates and mirror progress
```

`apply:learning-schema` also installs the atomic `merge_workplace_progress` Postgres function. It
ORs unlock/completion flags inside Postgres so concurrent writes can never clear an unlock, and it
is restricted to `service_role`. The sequential-learning tables enable RLS with no anon/authenticated
policies: server-side access only.

See [`backend/scripts/README.md`](backend/scripts/README.md) for schema setup, RLS, incremental
runs, verification, and troubleshooting.

## Deploy on Vercel

The root [`vercel.json`](vercel.json) deploys the repository as one Vercel project with two
services:

| Service    | Root       | Public path | Purpose                          |
| ---------- | ---------- | ----------- | -------------------------------- |
| `backend`  | `backend/` | `/api/*`    | Express API (Vercel Function)    |
| `frontend` | `frontend/`| `/*`        | Vite single-page application     |

Both services are public because the browser calls `/api/v1` directly and the SPA is served from
`/`. There are no server-to-server calls between the services, so no service bindings are declared.
The frontend is static browser code, and service bindings resolve only inside functions at runtime.

Import the repository root into Vercel and set these environment variables for the project:

| Variable                  | Value                                                        |
| ------------------------- | ------------------------------------------------------------ |
| `NODE_ENV`                | `production`                                                 |
| `APP_ENV`                 | `production`                                                 |
| `COOKIE_SECURE`           | `true`                                                       |
| `DATABASE_URL`            | Remote MySQL URL reachable from Vercel, with TLS if required |
| `APP_WEB_URL`             | `https://<your-production-domain>`                           |
| `CORS_ORIGINS`            | `https://<your-production-domain>`                           |
| `JWT_PRIVATE_KEY_BASE64`  | Base64-encoded `keys/jwt-private.pem`                        |
| `JWT_PUBLIC_KEYS_BASE64`  | Base64-encoded `keys/jwt-public.pem` (comma-separated if rotated) |
| `SMTP_*`, `MAIL_FROM`     | Production mail credentials                                  |
| `SUPABASE_*`              | Optional; same values used by the backend locally            |
| `AI_GRADING_*`            | Optional; deterministic grading fallback works without them  |

Generate the base64 key values after `npm run generate-keys`:

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("keys/jwt-private.pem"))
[Convert]::ToBase64String([IO.File]::ReadAllBytes("keys/jwt-public.pem"))
```

`JWT_PRIVATE_KEY_BASE64` and `JWT_PUBLIC_KEYS_BASE64` take precedence over the local key paths. Do
not set `VITE_API_URL` on Vercel: the SPA defaults to the same-origin `/api/v1` path, which the
top-level rewrite sends to the backend. CSP keeps `connect-src 'self'` in every environment;
no production API domain is needed. Local development stays same-origin through the Vite
proxy. Apply the Supabase schemas separately with the
`apply:progress-schema` / `apply:learning-schema` scripts; they are not part of the Vercel build.

Services mode requires a services-capable Vercel CLI (65.7.0 or newer). Run both services locally
with:

```bash
npx -y vercel@latest dev
```

The backend entrypoint is `backend/src/index.ts` (the Express app exported for Vercel). The
reusable app factory lives in `backend/src/create-app.ts`; Vercel's Express builder auto-detects
entrypoints that import `express`, so `src/index.ts` is the file it selects. Local development
keeps using `backend/src/server.ts` for the listener, SMTP warm-up and graceful shutdown.

## Tests

Backend (`backend/`):

```bash
npm test                    # boots a fresh career_lab_test DB and runs the API suites
npm run typecheck           # strict TS across src/tests/scripts/prisma
```

Frontend (`frontend/`):

```bash
npm test                    # component, hook and utility suites
npm run typecheck
npm run build               # production build
```

The suites cover authentication and login alerts, learning flow, assessment aggregation, interviews,
workplace gate progression, the shared gate-invalidation refetch, video playback/fallbacks, lesson
notes, and responsive access logic.

## Security notes

- Argon2id password hashing (params via env, stored per user, opportunistic re-hash on drift)
- RS256 access token (15 min) held in browser memory only; opaque refresh token hashed (SHA-256)
  at rest in `sessions`; httpOnly Secure SameSite=Strict cookie scoped to `/api/v1/auth`
- Refresh rotation with family reuse detection; CSRF double-submit on the refresh endpoint
- Progressive account lockout after repeated failures; rate-limit classes per route group
- Zod allowlist validation everywhere; generic authentication errors (enumeration-safe flows)
- Audit log + security events written for every identity action
- Login alerts include UTC and local timestamps and never expose credentials or tokens
- Redis-backed revocation cache, CAPTCHA, HIBP breached-password check and MFA are deferred to
  their roadmap phases (documented deviations in the phase report)

## Frontend performance and responsiveness

- Route-level code splitting; Monaco and its language workers load only inside practical steps.
- YouTube/Vimeo iframes use `loading="lazy"`; players reserve their aspect ratio to prevent layout
  shift, and video thumbnails carry explicit dimensions and async decoding.
- Layout heights use `dvh` units so mobile browser chrome cannot clip the sidebar or page content.
- The initial production bundle stays small; the large Monaco/worker chunks are intentionally
  deferred and excluded from the initial load.

## Project layout

```
frontend/   React SPA (src/{components,pages,layouts,features,api,services,store,hooks,types,utils,styles})
backend/    Express modular monolith (src/{config,controllers,middleware,models,repositories,routes,
            security,services,validators,utils} · prisma/{schema.prisma,seed.ts,*.sql} ·
            scripts/ · tests/)
docs/       Approved architecture documents
```
