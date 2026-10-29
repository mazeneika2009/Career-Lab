# 10 — Platform Operations

## 1. File storage (object storage: S3-compatible)

Buckets (private by default):

```
cl-media-prod        avatars, portfolio covers, lesson assets   (public-read via CDN only)
cl-submissions-prod  student submissions, project archives      (strictly private)
cl-video-prod        video masters + HLS renditions             (CDN signed)
cl-quarantine-prod   files flagged by scanner                   (no read path from app)
cl-backups-prod      DB dumps, audit exports                    (object-lock, separate account)
```

Upload flow (direct-to-storage, never proxied through the API):

```
client - POST /media/sign {purpose, filename, mime, bytes}
       <- presigned PUT URL (TTL 5m) with constraints baked in
client - PUT object
worker - validate magic-bytes vs claimed MIME, size, extension allowlist
       -> ClamAV scan -> clean: mark clean (+ image variants / video transcode enqueue)
                      -> infected: quarantine + notify owner + security event
client - POST /media/complete {fileId} attaches record to business entity
```

| Rule | Value |
|---|---|
| Size caps | images 10 MB, documents 25 MB, code archives 50 MB, video masters 8 GB |
| MIME policy | per-purpose allowlist; executables/scripts never accepted from students |
| Malware | every upload scanned before any read path exists; rescan on signature updates for 7 days |
| Delivery | signed GET URLs TTL <= 15 min; HLS via short-lived tokens; CDN caches only public classes |
| Access control | every signed-URL issuance passes an ownership/entitlement policy check server-side |
| Lifecycle | submission originals archived to cold storage after grading + 90 days; deleted-user files purged by anonymization job |
| Integrity | SHA-256 recorded at intake; verified on restore paths |

Videos processed by the video worker (ffmpeg): HLS ladder (1080/720/480), thumbnail sprite,
captions slot; playback via hls.js with byte-range CDN delivery.

## 2. Caching

| Layer | What | Strategy |
|---|---|---|
| Browser HTTP | hashed static assets, fonts, images | immutable 1y; index.html no-store |
| CDN | marketing pages, public media, HLS segments | edge TTL per class; purge on publish |
| App memory | permission snapshots, feature flags, career catalog | 60s-10m + pub/sub invalidation |
| Redis | public catalog payloads, roadmap templates, rate counters, socket adapter, queues | key-versioned TTLs |
| Client (TanStack Query) | per-user view of GETs | staleTime tiers (03.7) |

Redis conventions: cache keys namespaced `cache:{domain}:v{n}:{paramsHash}` on a DB index separate
from queues. Invalidation = version bump on publish events (course published bumps the careers
version so stale entries age out without scans) plus targeted deletes for user-scoped mutations.
Stampede protection: single-flight locks + jittered TTLs. Never cached: personalized dashboards,
auth-scoped data at the CDN layer.

## 3. Logging

Pipeline: pino JSON from all processes, stdout to collector (Vector/Promtail) into Loki
(30d hot, 1y cold in object storage), viewed in Grafana. Correlation: X-Request-Id propagated
client through API through jobs into logs; AsyncLocalStorage binds request/user context.

Event taxonomy (mandatory fields):

| Class | Fields |
|---|---|
| http.request | method, route, status, dur_ms, user_id?, request_id |
| auth.* | kind, result, ip, ua_hash, user_id? |
| authz.denied | user_id, permission, resource (rate-limited emission) |
| exam.* | attempt_id, phase, anomaly flags |
| sim.* | run_id, beat, decision_id |
| ai.request | task, model, prompt_version, tokens, cost_cents, latency (never raw content) |
| sandbox.run | run_id, language, duration, exit, violations |
| job.* | queue, job_id, attempt, duration, error_code |
| admin.action | actor, entity, before/after digests |

Redaction enforced centrally via pino redact paths (password, token, authorization, cookie,
secret, key) plus lint rules banning raw header logging. Never logged: passwords, tokens/cookies,
API keys, encryption material, full student code on error paths (hashes instead).

## 4. Monitoring

Stack: Prometheus metrics + OpenTelemetry traces (HTTP, Prisma queries, jobs, socket events)
+ Grafana dashboards + Sentry (FE+BE errors, release-tagged) + Alertmanager routing.

Metrics:
- RED per route: rate, errors, duration p50/p95/p99.
- USE for infra: CPU, memory, disk, pool saturation, replica lag.
- Business: signups/day, activation, lessons completed, submissions/day, review latency p95,
  exam pass rates, active simulation runs, certificates issued.
- Cost guards: AI spend/day per task, sandbox CPU-minutes, storage growth.

Alerts (excerpt): API 5xx >2% over 5m (page); p95 latency >800ms 10m (warn/page); sandbox queue
depth >200 or wait p95 >60s (warn); AI daily budget at 80% (warn) then exceeded (page +
auto-degradation); failed logins >50/min per IP class (security page); any refresh-token reuse
(security page); any sandbox seccomp/network violation (security page); backup not verified in 24h
(page); TLS cert <30 days (warn). Synthetic probes every minute: login roundtrip, course fetch,
exam start dry-run, sandbox smoke run, socket connect. Every alert links a runbook.

## 5. Backup & disaster recovery

| Store | Method | RPO | RTO | Retention |
|---|---|---|---|---|
| MySQL | daily full snapshot + continuous binlog shipping (PITR) | <=5 min | <=1 h | 30 daily, 12 monthly, 3 yearly |
| Redis | reconstructable by design (cache + queues drain-or-discard documented) | n/a | minutes | none |
| Object storage | versioning + cross-region replication; backups bucket under compliance object-lock | <=1 h | <=4 h | lifecycle table |

Backups encrypted with dedicated KMS keys separate from production data keys, copied off-site /
cross-region, accessible only to two named roles. Quarterly restore drills: isolated environment,
restore snapshot + binlog to timestamped cut, run integrity suite (row counts, checksums, app boot,
sample flows), record timings against RTO. A backup never restored is not a backup.

DR playbooks cover: region loss (failover DNS + secondary-region replicas), data corruption
(PITR to pre-corruption marker within binlog window), ransomware/delete-all (immutable object-lock
backups in a separate account), bad migration (expand-contract discipline + tested rollback path).
Definitions: RPO = maximum tolerable data loss measured backward from failure; RTO = maximum
tolerable restoration time. Both are product commitments reviewed quarterly, not aspirations.
