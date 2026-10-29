# 01 — Product Vision, User Journey, Product Features

## 1. Project Vision

### 1.1 Definition

Career Lab is an educational career simulation platform. It does not deliver courses; it delivers
**job readiness**. A student enters as a beginner in a chosen career and exits with verified skills,
a reviewed portfolio, real workplace experience (simulated), interview performance evidence, and a
career report — the full set of signals an employer actually screens for.

Positioning statement:

> The platform between "I watched tutorials" and "I can do the job."

### 1.2 Core value loop

```
LEARN → PRACTICE → GET REVIEWED → PROVE (exams) → WORK (simulation) → INTERVIEW → CERTIFY
  ↑                                                                        |
  └────────────── adaptive engine redirects the path ←─────────────────────┘
```

Every loop iteration raises the student's level. The platform's intelligence layer (evaluation,
recommendations, adaptive pathing) runs invisibly inside this loop.

### 1.3 Level ladder

The student journey is expressed as six levels. Gates are server-enforced combinations of
completion, exam results, simulation ratings, and interview scores — never frontend state.

| Level | Enters when | Gate to next level |
|-------|-------------|--------------------|
| Beginner | Enrolls in career | Foundation courses complete + foundation theory exam passed |
| Learner | Passes foundation gate | Core-skill practical exams passed + homework review average ≥ threshold |
| Trainee | Passes core gate | Guided projects accepted + mid-track theory exams |
| Junior | Passes trainee gate | Company Simulation completed at Junior rating ≥ C+ |
| Mid-Level | Junior gate cleared | Advanced simulation scenarios + system-design practical + technical interview ≥ B |
| Senior / Advanced | Mid gate cleared | Capstone project defended + final interview + portfolio certified |

### 1.4 Multi-career scalability

A career is **configuration**: rows in `careers`, `career_levels`, `skills`, `skill_edges`,
`courses`, exam blueprints, simulation scenario bindings. Adding "Data Analyst" requires content
authoring and admin configuration — no schema migration, no new code paths. Career-agnostic
engines (learning, exams, sandbox, simulation, AI) read configuration at runtime.

---

## 2. Complete User Journey

Each step below lists: what the user experiences, what the system does, what data is written.

### Stage A — Acquisition & Entry

**A1. Landing Page (`/`)**
- *Experience:* Clear proposition: "Learn the work, not just the lessons." Career paths shown with
  level ladder preview. No AI clichés, no icon walls — typographic hierarchy.
- *System:* Static/prerendered for SEO. Anonymous telemetry (page views only).
- *Data:* anonymous visit events.

**A2. Register (`/register`)**
- *Experience:* Email, password, full name, accept terms. Inline validation, generic errors.
- *System:* Validate via shared Zod schema; check email uniqueness (case-insensitive); hash
  password with Argon2id; create `user` (status `pending_verification`) + assign default
  `student` role; create verification token (32-byte random, SHA-256 hash stored, 24h expiry);
  queue welcome/verify email.
- *Data:* `users`, `user_roles`, `email_tokens`, audit log `auth.register`.

**A3. Email Verification (`/verify-email?token=`)**
- *Experience:* One click; success screen routes to login.
- *System:* Hash-compare token, single-use, expire on success, set status `active`.
- *Data:* update `users.status`, consume `email_tokens`.

**A4. Login (`/login`)**
- *Experience:* Email + password (+ TOTP code if MFA enabled). Generic failure message always:
  "Invalid credentials." Rate-limited with exponential backoff; CAPTCHA after repeated failures.
- *System:* Verify Argon2id hash; issue access token (JWT, 15 min, held in memory) + refresh token
  (opaque random, SHA-256-hashed in DB, httpOnly Secure SameSite cookie, 30-day sliding session).
  Session recorded in `sessions` for device management and revocation.
- *Data:* `sessions`, audit `auth.login.success/failure`, security events on anomalies.

**A5. Password Recovery (`/forgot-password`, `/reset-password`)**
- *Experience:* Request link by email; set new password; all other devices signed out.
- *System:* Token lifecycle identical to verification; on reset, revoke all sessions of the user,
  notify by email ("your password changed").
- *Data:* `email_tokens`, delete/revoke `sessions`, audit trail.

### Stage B — Onboarding & Calibration

**B1. Onboarding (`/onboarding`)**
- *Experience:* 3–4 focused steps: profile basics (name, timezone, weekly hours available,
  learning goal), experience self-rating per relevant skill areas, preferred schedule.
- *System:* Draft stored progressively (resumable). Completion sets `onboarding_completed_at`.

**B2. Career Selection (`/onboarding/career`)**
- *Experience:* Career cards with realistic role descriptions, market context, level ladder, time
  estimate, sample projects. Selection is deliberate, not gamified.
- *System:* Creates `enrollments(user_id, career_id, current_level='beginner', started_at)`;
  initializes progress projections; generates personalized roadmap (see B3).

**B3. Initial Assessment (`/onboarding/assessment`)**
- *Experience:* Adaptive calibration quiz (~15–25 items): fundamentals probe with difficulty
  adjusting per answer. Feels like a placement test, not a game.
- *System:* Items sampled from calibrated question pools; responses scored server-side;
  result = per-skill mastery priors (Bayesian-ish starting estimates). Students who already know
  HTML basics skip ahead — the roadmap reflects it immediately.
- *Data:* `assessment_results`, initial `skills_progress` rows, roadmap snapshot.

**B4. Personalized Roadmap (`/roadmap`)**
- *Experience:* A vertical career map: levels → skill clusters → courses → checkpoints. Current
  position highlighted; locked items visibly gated with requirement text ("Pass JavaScript
  Fundamentals exam"). Recommended-next section at top (no AI labels).
- *System:* Roadmap = deterministic projection over `career_levels` × `skills` × prerequisite
  edges, filtered/ordered by assessment priors and weekly-hours pacing. Recomputed on every
  meaningful progress event; versioned so history remains explainable.

### Stage C — Learning Loop

**C1. Student Dashboard (`/dashboard`)** — Today's plan, continue-where-left-off, upcoming
deadlines (simulation), recent feedback, streak-free motivation (subtle progress %, not badges).
Aggregated from progress projections + notifications.

**C2. Learning Dashboard (`/learn`)** — Course grid for current level with completion states.

**C3. Course Page (`/learn/courses/:slug`)** — Syllabus, lesson list with types (reading/video/
practice/homework/exam checkpoint), estimated durations, prerequisites, instructor.

**C4. Lesson Page — Reader (`/learn/courses/:slug/lessons/:slug`)**
- Digital book/tutorial reader: typography-first layout, chapter navigation, progress saved on
  scroll milestones, inline quizzes, runnable snippets, key-takeaways summary.
- System: `lesson_progress` upserts (idempotent events); reading time analytics.

**C5. Video Learning** — Same lesson shell, video mode: HLS adaptive streaming, speed control,
chapters from markers, resume position, transcripts (accessibility + search), note-taking
timestamps. Progress = watched-segments heuristic, not raw seconds.

**C6. Interactive Practice (`/lessons/:id/practice`)**
- Small scoped exercises: fill-in-code, reorder, predict-output, mini build tasks with instant
  automated checks; Monaco editor with language services; live preview pane for web exercises.
- System: practice attempts recorded; failures feed the adaptive engine (Section 08.5).

**C7. Homework (`/lessons/:id/homework` → `/homework/:id`)**
- Larger assignments: brief (realistic spec), starter repo/file set, requirements checklist,
  deadline. Submission = file uploads and/or repository-style code entry in workspace editor.

**C8. Performance Review (homework analysis)** — After submission:
```
Score            82 / 100        (auto-calculated rubric)
Strengths        Clean component structure · Good naming · Responsive layout
Needs attention  Accessibility attributes missing on interactive elements
Recommended next Accessibility Basics
Feedback         Per-requirement notes with references into your submission
```
- System: submission → BullMQ `ai-evaluation` queue → worker builds rubric context (assignment
  requirements, student skill profile, level) → LLM structured analysis → schema validation →
  persisted `ai_reviews`; static checks (lint/tests) run first in sandbox to ground the review in
  facts. Status flows `submitted → analyzing → reviewed`. User sees honest "Analyzing…" state.
  Low-confidence or borderline reviews are flagged for instructor spot-check.

**C9. Theory Exam (`/exams/:id/info` → runner)** — Timed MCQ/multi-select/short-answer pools;
randomized selection per attempt; server-side timing; see Section 09.3 (Engine doc).

**C10. Practical Exam** — Build-a-project under time budget in sandboxed workspace; hidden tests +
rubric grading; partial credit; results with dimension breakdown.

**C11. Exam Results (`/exams/results/:attemptId`)** — Per-objective mastery, missed-question
review policy (configurable), remediation links, retake cooldown countdown.

**C12. Level Completion & Skill Unlock** — Gate evaluation job fires on exam pass: updates
`student_levels`, unlocks next skill cluster (visible on roadmap/skill tree), awards XP
(subtle), triggers notification + optional certificate at career milestones.

### Stage D — Company Simulation (Workspace)

The student becomes a virtual employee at a simulated company. The interface resembles a real
workplace tool — tasks board, inbox threads, deadlines — deliberately not game-like.

**D1. Joining (`/workspace`)** — First entry: offer letter moment (restrained), department intro,
team roster (NPC personas: manager, senior dev, designer, QA, backend dev), client account intro.

**D2. Projects & Tasks** — Kanban-ish task board with priorities, estimates, acceptance criteria,
dependencies, deadlines. Tasks map to real-world problems (bugfix ticket with reproduction steps,
feature request from client email, incident during deploy window).

**D3. Communication (`/workspace/inbox`)** — Threads with team members and clients. NPC messages
arrive on the simulation clock; student replies are evaluated for clarity, tone, professionalism
(communication scoring pipeline). Meetings appear as agenda items requiring decisions.

**D4. Incidents & Decisions** — Production-incident tickets (error spike, bad deploy, security
report) with time pressure; decision panels present options with trade-offs; choices branch the
scenario and feed decision-quality scoring against author-defined weights.

**D5. Evaluation** — Continuous telemetry → dimension scores (technical quality, communication,
timeliness, prioritization, teamwork, professionalism, problem solving, decision making) → weekly
in-run "review" from the manager persona + final performance review document.

Simulation architecture details: Section 09.4.

### Stage E — Career Proof & Completion

**E1. Technical Interview (`/interviews/:id`)** — Structured mock interview driven by the
interview engine: question script adapted to career/level, dynamic follow-ups based on answers
(text-first; voice later), coding questions executed in the same sandbox. Ends with scorecard:
technical depth, communication, problem solving, culture signals + improvement plan.

**E2. Portfolio (`/portfolio/:username`)** — Public, shareable page auto-populated from accepted
projects/simulation artifacts, curated and edited by the student. Employer-facing polish.

**E3. Certificates & Career Report (`/certificates`, public verify `/verify/:serial`)** —
Verifiable certificates (serial + public verification endpoint) per level/career; final Career
Report PDF: skills radar, evidence index (exams, reviews, simulation ratings, interview),
readiness statement. This is the exit artifact of the whole journey.

---

## 3. Product Features

MoSCoW-prioritized inventory. Phase tags reference the roadmap (Appendix §13.6).

### 3.1 Identity & Access
| Feature | Priority | Phase |
|---|---|---|
| Registration, email verification, login, logout, password reset | Must | 1 |
| Session/device management, refresh rotation, revocation | Must | 1 |
| MFA (TOTP + recovery codes) | Should | 8 |
| Step-up auth for sensitive actions | Should | 8 |

### 3.2 Careers & Learning
| Feature | Priority | Phase |
|---|---|---|
| Career catalog + selection + enrollment | Must | 2 |
| Initial adaptive assessment | Must | 2 |
| Roadmap generation + skill tree visualization | Must | 2 |
| Courses, lessons, book reader, video learning | Must | 2 |
| Progress tracking, XP, achievements (subtle) | Must | 2 |
| Adaptive recommendations & remediation | Must | 5 |

### 3.3 Practice & Assessment
| Feature | Priority | Phase |
|---|---|---|
| Interactive practice engine + code editor + live preview | Must | 3 |
| Homework submissions w/ file upload | Must | 3 |
| Automated performance review (static checks + AI rubric) | Must | 5 |
| Theory exams (pools, timers, anti-cheat) | Must | 4 |
| Practical exams (sandbox projects, hidden tests) | Must | 4 |
| Retake policies, cooldowns, attempt history | Must | 4 |

### 3.4 Intelligence Layer
| Feature | Priority | Phase |
|---|---|---|
| Homework/code analysis pipeline | Must | 5 |
| Recommendation engine (next skill, resources) | Must | 5 |
| Mentor chat (RAG over platform content) | Should | 5 |
| Skill/career readiness evaluation reports | Should | 7 |
| Technical interview engine | Must | 7 |

### 3.5 Company Simulation
| Feature | Priority | Phase |
|---|---|---|
| Scenario runtime (acts/beats/events/state machine) | Must | 6 |
| Task board, projects, deadlines | Must | 6 |
| Team/client messaging + meeting agendas | Must | 6 |
| Incident tickets + decision branching | Must | 6 |
| Telemetry scoring across 8 dimensions + reviews | Must | 6 |

### 3.6 Career Output
| Feature | Priority | Phase |
|---|---|---|
| Portfolio builder + public profiles | Must | 7 |
| Verifiable certificates | Must | 7 |
| Career report generation (PDF) | Should | 7 |

### 3.7 Platform & Operations
| Feature | Priority | Phase |
|---|---|---|
| Admin console (users, content CRUD, exams, simulations, AI config, analytics, audit logs) | Must | 2–6 |
| Instructor console (authoring, review queues, student progress) | Should | 4–6 |
| Notifications center + preferences (in-app/email) | Must | 2 |
| Analytics warehouse tables + dashboards | Should | 9 |
| Feature flags, audit logging, security monitoring | Must | 1–10 |

## 4. Success metrics (product)

| Metric | Definition | Target (12 mo) |
|---|---|---|
| Activation | New registrant reaches first completed lesson within 48 h | ≥ 60% |
| Learning engagement | Median lessons/active week | ≥ 5 |
| Review throughput | p95 homework review latency | ≤ 5 min |
| Assessment integrity | Exam attempt anomaly rate flagged/manual-reviewed | ≤ 2% |
| Simulation completion | Enrolled students finishing a scenario | ≥ 70% |
| Job-readiness proxy | Students reaching Junior gate within 6 months of start | ≥ 35% |
| Platform trust | Certificate verifications by external parties | tracked |
