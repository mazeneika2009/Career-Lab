# Career Lab — Technical Architecture Specification

Production-grade architecture blueprint for an educational career simulation platform.
Version 1.0 · Status: Approved for implementation planning

## What this platform is

A career-to-job-readiness platform that takes a student from first lesson to job-ready professional
through a single continuous pipeline:

Learn → Practice → Get Reviewed → Prove (Exams) → Work (Company Simulation) → Interview → Certify

First career path: **Full-Stack Web Developer**. The system is designed so additional career paths
(AI Engineer, Data Analyst, Cybersecurity Engineer, UI/UX Designer, etc.) are data, not code.

## Document map

| # | Document | Covers |
|---|----------|--------|
| 01 | [Product Vision & User Journey](01-product-vision.md) | Vision, complete user journey, product features, success metrics |
| 02 | [Design System & UI/UX Direction](02-design-system.md) | Visual identity, typography-first principles, icon/label rules, full component system |
| 03 | [Frontend Architecture](03-frontend.md) | React stack rationale, page catalog, routing, folder structure, state management, API layer |
| 04 | [Backend Architecture](04-backend.md) | Modular monolith, technology choices, module catalog, backend structure |
| 05 | [REST API Architecture](05-api.md) | Endpoint design per module, conventions, error model, rate limits |
| 06 | [Security Architecture](06-security.md) | AuthN, AuthZ/RBAC, defense in depth, hashing vs encryption, key management |
| 07 | [Database Architecture](07-database.md) | MySQL schema, all tables, relationships, ERD, integrity rules |
| 08 | [AI Architecture](08-ai.md) | Evaluation pipelines, adaptive learning, mentor, interview, AI safety |
| 09 | [Platform Engines](09-engines.md) | Learning engine/skill graph, exam engine, code sandbox, company simulation, real-time, queues |
| 10 | [Platform Operations](10-platform-ops.md) | File storage, caching, logging, monitoring, backup & disaster recovery |
| 11 | [DevOps & Quality](11-devops-quality.md) | Environments, CI/CD, Docker, testing strategy, performance budgets, accessibility |
| 12 | [Architecture Diagrams](12-diagrams.md) | 13 text-based system diagrams |
| 13 | [Appendix](13-appendix.md) | Full tech stack tables, complete folder trees, roadmap, security checklist, scalability, final architecture |

## Architectural summary (one screen)

- **Frontend:** React 18 + TypeScript + Vite SPA, Tailwind CSS, TanStack Query v5, Zustand,
  React Hook Form + Zod, Monaco Editor (lazy-loaded), Framer Motion, Radix primitives styled
  into a custom typography-first design language.
- **Backend:** Node.js 22 LTS + TypeScript + Express.js **modular monolith** (not microservices),
  layered routes → controllers → services → repositories, Prisma ORM on MySQL 8.
- **Async:** Redis 7 + BullMQ for AI evaluation, code execution, email, video processing, analytics.
- **Real-time:** Socket.IO (Redis adapter) for simulation events, inbox messages, notifications.
- **Code execution:** never on API nodes — dedicated sandbox worker fleet running hardened
  containers (no network, cgroup limits, seccomp, non-root, hard timeout).
- **AI:** provider-agnostic gateway; every model output validated against JSON schemas before use;
  AI has no privileged capabilities and writes only to designated suggestion/review tables.
- **Security:** JWT access tokens (15 min) + rotating refresh tokens with reuse detection,
  Argon2id passwords, RBAC + ownership policies enforced server-side, strict CSP/HSTS headers,
  Redis-backed rate limiting, structured audit log, AES-256-GCM envelope encryption via KMS
  for sensitive fields only.
- **Ops:** Docker everywhere, GitHub Actions CI/CD with SAST/dependency/container scanning,
  Prometheus/Grafana/OpenTelemetry/Sentry observability, encrypted MySQL backups with PITR,
  RPO ≤ 5 min / RTO ≤ 1 h.
- **Delivery:** 10-phase roadmap; each phase ships a usable increment behind feature flags.

## Non-negotiable rules (full list in Appendix §13.7)

1. Never trust the frontend. All authorization, scoring, timing, grading on the server.
2. Hash passwords (Argon2id). Never encrypt or encode them.
3. Never execute student code on API servers.
4. Never trust AI output without validation. AI gets no privileged actions.
5. Secrets never in Git, frontend, database, or source code.
6. Versioned APIs: `/api/v1/...`.
7. Business logic out of React components; database logic out of controllers.
