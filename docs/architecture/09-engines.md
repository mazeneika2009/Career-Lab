# 09 — Platform Engines

## 1. Learning engine & skill graph

**Event-sourced core:** every meaningful action appends an immutable `progress_events` row
(idempotent via `event_id` unique). Projections (`student_progress`, `skills_progress`, XP ledger,
achievement checks) are rebuilt from events — enabling audit ("why is this locked?"), analytics,
and safe recomputation.

**Skill graph:** `skills` + `skill_edges` form a DAG per domain; `career_skills` binds skills into
career levels and ordering. Unlock rule evaluated server-side:

```
skill S unlocks for user U when:
  prerequisites(S) all have state MASTERED (or waived by assessment calibration)
  AND mastery(U,S) ≥ UNLOCK_MASTERY for its level band
Mastery inputs: lesson completions (small), practice pass-rate (medium),
homework review scores (large), exam objective results (largest), simulation evidence.
```

Level gates (Beginner→…→Senior) are JSON rule documents on `career_levels` evaluated by the gate
service after every grading/completion event — mixing completion %, specific exam passes with
minimum scores, simulation rating minimums, interview score minimums. Gate evaluation is
idempotent and transactional with the grade publication that triggered it.

XP: awarded only from server-verified events through the append-only ledger with daily per-source
caps. Achievements: declarative rule JSON (event predicates over rolling windows) evaluated by the
rule runner on event arrival — no hardcoded achievement logic.

## 2. Exam engine

### 2.1 Attempt lifecycle & integrity

```
POST /exams/:id/attempts   [single transaction]
  eligibility: enrollment ✓ · level prereqs ✓ · window open ✓ · attempts left ✓ ·
               cooldown passed ✓ · no active attempt (status check inside tx) ✓
  → build attempt snapshot: sample questions per blueprint pools (seeded RNG stored),
    shuffle option order, store full snapshot JSON on the attempt row
  → server_deadline = now() + duration_s (+ grace 10s network tolerance)
PATCH answers             upsert per question; rejected after deadline+grace (409)
POST heartbeat every 30s  clock sync, presence, anomaly ping (tab-blur counts, no auto-punish)
POST submit [tx]          SELECT attempt FOR UPDATE → deadline recheck → flush buffered
                          answers → status=submitted → enqueue graders
Timeout sweeper           in_progress past deadline+grace → auto-submit whatever exists
```

**Server-authoritative timing:** client timer displays `server_deadline − corrected_now()`;
client clocks never trusted; drift corrected each heartbeat. Frontend "time expired" triggers a
submit request — but enforcement lives server-side.

**Grading:** objective items graded synchronously at submit (instant provisional score);
code/essay items queued to sandbox + AI rubric pipeline; final publication transactional
(scores + skills_progress + XP + possible gate/certificate). Score release follows exam's
review_policy.

### 2.2 Anti-cheat control set
| Threat | Control |
|---|---|
| Question harvesting | Pools + randomized selection + option shuffling per attempt; snapshots isolate live edits |
| Shared answers mid-exam | Per-attempt seeds differ; short windows; anomaly review queue (identical wrong-answer patterns) |
| Timer tampering | Server deadline; late answers rejected; auto-submit sweep |
| Multi-tab/repeat starts | Single active attempt invariant (transactional); device session binding logged |
| Code plagiarism (practical) | AST-token fingerprint similarity across cohort + public repos (later phase); flagged, not auto-punished |
| Impersonation | Step-up MFA before high-stakes exams (configurable) |
| Result forgery | Scores computed/stored server-side only; FE renders read-only results |

Retake policy: cooldown hours, max attempts, best-or-latest score policy configurable per exam;
every attempt fully audited.

## 3. Code execution sandbox

### 3.1 Flow
```
Student code ─► API validates (language allowlist, size caps, quota)
            ─► BullMQ 'sandbox' queue
            ─► Sandbox host worker claims job
                 ├─ acquires slot from warm container pool (pre-pulled image)
                 ├─ mounts: student files (ro tmpfs) + tests injected at runtime
                 │          (decrypted in worker memory only — never on disk/API/DB plaintext)
                 └─ runs runner binary as uid 10001 under hard rlimits + seccomp
            ◄─ structured result {stdout, stderr, per-test cases, timings, exit}
            ─► API persists run result ─► socket push to owner ─► optional AI review enqueue
```

### 3.2 Isolation guarantees (per execution)
| Resource | Limit |
|---|---|
| Wall clock | 10s default (exam practicals 30–120s budgets) |
| CPU | 0.5 core cgroup quota |
| Memory | 512 MB cap, OOM ⇒ clean failure result |
| Processes | pids.max 64 (fork-bomb proof) |
| Filesystem | tmpfs write 64 MB, world read-only rootfs, wiped per run |
| Network | **none** — namespace without interfaces; DNS disabled |
| Syscalls | seccomp allowlist (no ptrace/mount/keyring…) + AppArmor profile |
| Privileges | non-root uid/gid, no caps, no docker.sock, no env secrets |
| Secrets | none mounted; DB/cloud unreachable by network policy |

Host-level: sandbox hosts are a separate security zone — reachable only from the queue broker
with scoped credentials; zero routes to MySQL/secrets/KMS. Egress denied by default at the
security-group level. MVP implementation: hardened containers as above; roadmap phase 9+: gVisor
or Firecracker microVMs for kernel-boundary isolation when scale justifies dedicated infra.

Quotas & abuse: per-user concurrency 2, hourly quotas, burst queues with priority (exams >
homework > practice); violations land in security_events; repeated abuse throttles account runs.

Escape testing: CI suite probes network egress, filesystem escapes, fork bombs, crypto-miner
signature patterns, resource exhaustion — must fail closed. Results are structured; raw host
state never returned to students.

## 4. Company simulation engine

### 4.1 Authoring model (declarative scenarios)
```yaml
scenario:
  acts:                       # narrative phases (onboarding → sprint 1 → incident week …)
    - id: act_1_sprint
      beats:                  # units of work delivered to the student
        - id: ticket_login_bug
          type: task
          task_template: {priority: P1, estimate_h: 4, due_offset_h: 26,
                          acceptance: [tests_ref], artifact: code}
        - id: client_email_scope
          type: message
          channel: client
          trigger: {after_task: ticket_login_bug, delay_h: 2}
          persona: client_acme_pm
          template_refs: [scope_change_v3]
        - id: deploy_incident
          type: incident
          trigger: {at_act_hour: 34}
          severity: SEV2
          options: [rollback, hotfix_forward, freeze]
        - id: prioritization_decision
          type: decision
          options:
            - label: Fix client demo first
              weights: {prioritization: +6, timeliness: +2, technical: -2}
```
Scenarios are data (admin/instructor-authored, versioned, validated by schema linting in builder).
Deterministic seed drives all randomness so runs are reproducible for debugging and fairness audits.

### 4.2 Runtime
State machine per run advanced by three trigger sources:
1. **Clock scheduler** (repeatable job, 60s sweep): fires time-based beats relative to sprint clock.
2. **Action triggers:** task completion/submission quality spawns next beat (e.g., QA files follow-up
   bug if hidden tests reveal gaps).
3. **Response triggers:** student message replies schedule NPC responses with persona-appropriate
   latency (minutes-to-hours simulated, compressible pacing setting).

NPC messaging: templated base + constrained variability; tone stays professional; personas carry
consistent voice specs. All messages persist like real artifacts; nothing regenerates retroactively.

### 4.3 Evaluation model (8 dimensions)
| Dimension | Primary telemetry |
|---|---|
| Technical | Sandbox test pass rates, revision counts on deliverables |
| Communication | Response latency, clarity/tone classifier, thread resolution |
| Teamwork | Handoff quality signals, helping behaviors, meeting agenda completion |
| Timeliness | due_at vs done_at distribution, lateness severity curve |
| Prioritization | Ordering decisions vs author-weighted ideal orderings; P0 handling |
| Problem solving | Incident MTTR, decision outcomes, unassisted progress ratio |
| Decision making | Option weights × downstream consequences |
| Professionalism | Tone scores, etiquette markers, deadline communication |

Scores aggregate into act reviews (weekly manager note) and the final performance review with
evidence excerpts. Mid-run nudges keep it formative, not just summative.

## 5. Real-time architecture

Transport: Socket.IO over WSS; namespaces `/app` (notifications, mentor stream) and `/sim`
(workspace). Auth: client exchanges access token for short-lived socket token at connect;
handshake verified server-side; rooms joined strictly by entitlement (`user:{id}`,
`run:{runId}:member`, `thread:{threadId}`).

Event catalog: `notification.new`, `inbox.message`, `task.updated`, `sim.beat_fired`,
`incident.opened`, `decision.requested`, `run.result.ready`, `review.ready`,
`interview.turn`, `presence.update`. At-least-once delivery with client dedupe by monotonic
event id; reconnect with exponential backoff + jitter; on reconnect, sockets reconcile counters
via targeted REST refetch. Scale-out via Redis adapter; sticky sessions not required (adapter).

Decision matrix:

| Need | Mechanism |
|---|---|
| CRUD, reads, forms | REST (cacheable, simple, versioned) |
| Live push to online clients | WebSocket |
| Heavy/slow work | Background jobs (AI, video, reports) — REST returns 202 + poll/socket notify |
| Fan-out digests, scheduled sweeps | Queue schedulers |

Rule: WebSockets optimize delivery; **the REST/database layer remains the source of truth** —
a missed socket event never loses data.

## 6. Queue architecture (Redis + BullMQ)

Queues, concurrency profile, retry policy:

| Queue | Concurrency profile | Retries / backoff | DLQ |
|---|---|---|---|
| ai-evaluation | IO-heavy, moderate concurrency, provider rate-aware | 5× exp (2s→2m) | yes + human-flag |
| sandbox | latency-sensitive, bounded by pool slots, priority-sorted | 2× fast (runner failures aren't retried blindly; timeout ≠ retry) | yes |
| email | low rate, provider-limited | 8× exp | yes |
| notifications-fanout | bursty | 5× exp | yes |
| video-processing | long-running, single-flight per file | 2× | yes + admin alert |
| analytics-rollup | scheduled batch | 3× | yes |
| sim-scheduler | frequent tick sweep, idempotent | no retry (next tick heals) | alert |
| outbox-dispatch | high-frequency small jobs | until published | alert |

Practices: idempotent processors keyed by business ids (job replay-safe); payload size small —
workers re-hydrate from MySQL rather than carrying blobs; visibility timeouts sized per job class;
metrics (depth, wait p95, failure rate) exported to Prometheus; dead-letter inspection tooling in
admin console. Why queues at all: user-facing latency isolation (API never blocks on AI/video/
email), load leveling for spikes (deadline-day submission storms), failure isolation with retry/DLQ
semantics, and independent worker scaling per workload.
