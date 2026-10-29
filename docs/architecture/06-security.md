# 06 — Security Architecture

## 1. Threat model summary

| Threat | Primary controls |
|---|---|
| Credential stuffing / brute force | Argon2id, rate limits, progressive lockout, CAPTCHA, breached-password check |
| Session theft / XSS | CSP strict, httpOnly refresh cookie, access token in memory only, short TTL |
| Token replay | Refresh rotation with reuse detection → family revocation; jti denylist |
| Privilege escalation | Deny-by-default RBAC + ownership policies server-side; matrix-tested |
| IDOR (cross-student data) | Every read/write passes a policy check binding resource→owner; integration tests enumerate |
| SQL injection | Prisma parameterization; raw SQL lint-gated and reviewed; no string interpolation |
| XSS | React escaping, CSP no `unsafe-inline` for scripts, output encoding, sanitizer for rich text |
| CSRF | Bearer-token API (not cookie-authed) ⇒ CSRF-immune main surface; refresh endpoint uses SameSite=Strict + double-submit token |
| Malicious student code | Isolated sandbox fleet: no network, cgroups, seccomp, timeouts, non-root (Section 09.2) |
| Prompt injection to AI | Fencing, instruction hierarchy, schema-validated outputs, no tool execution from models (Section 08.6) |
| Data exfiltration via AI | PII scrubbing before provider calls, zero-retention contracts, scoped context windows |
| Abuse of free compute | Per-user quotas on runs/AI/uploads; anomaly detection |
| Insider/admin misuse | Immutable audit log, dual-control on destructive ops, impersonation sessions loudly logged |
| Supply chain | Lockfiles, Dependabot, SAST/SCA in CI, provenance attestation |

## 2. Authentication

### 2.1 Credentials
- Passwords: **Argon2id** (OWASP-aligned baseline: memory 19 MiB, iterations 2, parallelism 1;
  parameters stored alongside hash for future tuning). Re-hash opportunistically on login when
  parameters drift. Min length 12, checked against top breached-password list (k-anonymity API).
- **Hashing ≠ Encryption ≠ Encoding** — definitions the whole team must share:

| Technique | Reversible? | Purpose | Example here |
|---|---|---|---|
| Encoding (base64) | Yes (no key) | Transport/format safety — NOT security | JWT payload segments |
| Encryption (AES-256-GCM) | Yes (with key) | Confidentiality of data we must read back later | MFA seeds, encrypted test suites |
| Hashing (Argon2id / SHA-256) | No | Verification/integrity without recovery | Passwords, token lookups |

Passwords are **hashed, never encrypted or encoded**. If data must be displayed back to the user
later it is encrypted; if it is only *verified*, it is hashed.

### 2.2 Tokens & sessions
| Item | Choice | Rationale |
|---|---|---|
| Access token | JWT RS256, 15 min, claims: sub, roles, perms-hash, sid, jti, kid | Stateless verification per request; asymmetric so verifiers never hold signing key |
| Refresh token | 256-bit opaque random; SHA-256 hash stored in `sessions` row; httpOnly Secure SameSite=Strict cookie, Path=/api/v1/auth | Server-revocable; unreadable to JS; rotation-friendly |
| Lifetime | Access 15m · Refresh sliding 30d inactive-expiry, absolute 180d | Balance UX vs exposure |
| Storage FE | Access token in Zustand memory store ONLY | XSS cannot persist-steal; page reloads use silent refresh |

**Rotation with reuse detection (core algorithm):**
1. `POST /auth/refresh` presents cookie → hash lookup.
2. If valid and unused: mark old rotated (single-use), issue new refresh (+access). Sliding expiry.
3. If presented token is already rotated (**reuse**): treat as theft signal → revoke entire session
   family (all descendants), log `security.refresh.reuse`, force re-login.
4. Revocation list: `sessions.status`; JWT guard additionally checks `sid` against revoked cache
   (Redis, TTL = remaining access lifetime) so logout kills access within seconds.

### 2.3 Flow specifics
- **Registration:** generic success regardless of email existence (enumeration-safe); verification
  token = 32B random, SHA-256 at rest, single-use, 24h expiry.
- **Login:** constant-time verify; identical error for unknown-email vs wrong-password; per-IP +
  per-account counters with exponential lockout (soft: delay grows; CAPTCHA after threshold);
  new-device notification email.
- **Password reset:** same token discipline; on success revoke all sessions + notify.
- **MFA:** TOTP (RFC 6238), secret stored AES-256-GCM-encrypted; 10 single-use recovery codes
  (Argon2-hashed); step-up required to disable. Login returns `MFA_REQUIRED` intermediate state.
- **Step-up:** sensitive actions (password/email change, MFA disable, account delete, admin
  destructive ops) require fresh credential confirmation ≤ 5 min old (`stepup_at` claim).

## 3. Authorization

Model = **RBAC + permission scopes + ownership policies (ABAC-lite)**, deny-by-default.

Roles: `student`, `instructor`, `admin`. Roles carry permissions; users carry roles
(`user_roles`). Permission strings: `<resource>.<action>[:scope]`.

Permission catalog (excerpt):

| Role | Permissions |
|---|---|
| Student | courses.read, lessons.read, practice.play, assignments.read:self, submissions.create, submissions.update:self, exams.take, attempts.read:self, simulations.play, progress.read:self, portfolio.manage:self, certificates.read:self, mentor.use |
| Instructor | all Student content-read perms + courses.create/update:own, lessons.write:own, questions.manage:own, exams.create:own, exams.grade:own, assignments.review:own, analytics.read:students:own, reviews.override:own |
| Admin | `*` (expressed as explicit enumerated set in seed, not wildcard string, for auditability) plus admin.* family |

Scopes: `:self` enforced by ownership policy; `:own` = instructor owns the course/exam chain.

**Enforcement pipeline (server-side only — frontend checks are cosmetic UX):**
```
authenticate(JWT) → load role/permission snapshot (Redis cache, invalidated on change)
 → requirePermission('exams.take')            # coarse gate
 → policy check inside service                # fine gate: attempt.userId === req.user.id,
                                              # exam window open, prerequisites met...
 → repository query always includes owner predicate in WHERE (defense in depth:
    even if a policy branch is forgotten, the query cannot return another user's row)
```

403 vs 404 blinding: where existence leaks info (other students' submissions), return 404.

**Authorization tests are first-class:** CI generates the matrix from a declarative table
(role × endpoint × ownership-state → expected status) and runs it against the real app —
hundreds of cases; any drift fails the build. This is how "never trust the frontend" is proven,
not just stated.

Prerequisites (lesson locks, level gates) are re-evaluated server-side at every relevant action;
frontend lock icons are presentation only.

## 4. Defense in depth — layer by layer

| Layer | Control | Why it matters |
|---|---|---|
| Edge | TLS 1.2+/1.3 only, HSTS (1y, preload), modern cipher suite, OCSP stapling | Encrypts transport; downgrade protection |
| Edge | WAF (managed, e.g., Cloudflare) + DDoS L3-L7 | Absorbs volumetric + common exploit patterns before origin |
| Edge | Static assets from CDN bucket, no origin path mixing | Shrinks attack surface of app servers |
| App perimeter | CORS allowlist (exact origins, credentials only where needed) | Blocks cross-origin abuse |
| App perimeter | Security headers (helmet): CSP, X-Content-Type-Options, Referrer-Policy strict-origin-when-cross-origin, frame-ancestors 'none' | Clickjacking, sniffing, injection blast-radius |
| App perimeter | CSP: `default-src 'self'; script-src 'self' https://www.youtube.com https://s.ytimg.com https://player.vimeo.com; img-src 'self' data: https://i.ytimg.com https://img.youtube.com; frame-src 'self' https://www.youtube.com https://player.vimeo.com; object-src 'none'; base-uri 'self'; connect-src 'self'` | XSS mitigation even if escaping fails; video providers are explicitly allowlisted (legacy `child-src` intentionally omitted so worker fallback is unaffected) |
| Request handling | Zod validation on body/query/params (allowlists) · size caps (body 1MB default, uploads separate) · parameter pollution guards · unicode normalization | Reject malformed early; mass-assignment impossible (DTO allowlists) |
| Persistence | Prisma parameterization · raw-SQL lint gate · least-privilege DB user (app: DML only; migrator: DDL, separate creds) | SQLi containment; blast-radius reduction |
| Output | JSON only APIs (no HTML templating) · rich-text rendered through sanitize allowlist · Content-Disposition on downloads | Stored-XSS prevention |
| Identity | Section 2 | Account takeover resistance |
| Access | Section 3 | Privilege containment |
| Compute isolation | Sandbox zone (09.2) | Student code never near secrets/data |
| Secrets | KMS/Secret Manager runtime injection; no secrets in env files committed; `.env.example` names only | Leak-proofing by construction |
| Keys | Envelope encryption + rotation (§6) | Compromise recovery without full re-secret |
| Auditing | Append-only `audit_logs` + security event stream + alerts | Detection + forensics |
| Dependencies | npm ci lockfile, Dependabot weekly, `npm audit`/Snyk gate (high+ blocks), license scan | Supply-chain risk |
| Code | CodeQL + Semgrep SAST on PR · ZAP baseline DAST nightly on staging · external pentest annually + pre-launch | Vulnerability discovery pre-prod |
| Backups | Encrypted, immutable (object-lock), restore-drilled (Section 10.5) | Ransomware/corruption recovery |
| Process | Incident response runbook (severity S1–S4, roles, comms templates, postmortems blameless) | Organized reaction |

Rate limiting, account lockout, and WAF together form the anti-abuse triad; each alone is bypassable.

## 5. What is protected how (data treatment matrix)

| Data | At rest (app layer) | In transit | Notes |
|---|---|---|---|
| Passwords | Argon2id hash | TLS | Never reversible; never logged |
| Access tokens | Not stored server-side (JWT) | TLS; FE memory only | jti/sid revocation covers theft |
| Refresh tokens | SHA-256 hash in DB | TLS; httpOnly cookie | Rotation + reuse detection |
| MFA secrets | AES-256-GCM envelope | TLS | Decrypted only during TOTP verify |
| Email verification/reset tokens | SHA-256 hash | TLS link | Single-use, short TTL |
| User profile/Pii-lite | Plaintext columns (needed for product), DB volume encryption at rest, TLS | TLS | Minimal collection principle |
| Submission files | Private bucket, SSE | Signed URLs (short TTL) | Scanned before availability |
| Hidden exam tests | AES-256-GCM; decrypted only inside sandbox worker | mTLS to worker | Never served to client |
| Chat/messages | Plaintext columns (product requires search/review), DB-at-rest encryption | TLS/wss | Moderation-accessible by policy |
| AI prompts/context | ai_usage_log stores hashes+token counts, not raw user content (retention-minimized) | TLS to provider | Zero-retention provider flag |
| Audit logs | Append-only table + WORM export | TLS | Integrity via daily hash-chain anchor |
| Backups | Encrypted (KMS), separate key | TLS to offsite | Restore drills validate keys exist |

**Never stored anywhere:** passwords in plaintext, cardholder data (v1 has no payments; if added,
PCI-scope a processor and never touch PAN), full session tokens in logs, provider API keys in DB.

**Never sent to frontend:** hidden tests, other users' data, grading rubric internals beyond
published previews, encryption keys, service credentials, raw prompt templates.

## 6. Encryption & key management

- **Algorithm:** AES-256-GCM for application-layer field encryption. 96-bit random IV per
  encryption operation (never reused under same key); AAD binds ciphertext to
  `table:column:recordId` preventing ciphertext swapping between rows.
- **Envelope structure:** KEK (key-encryption key) lives in cloud KMS and never leaves it.
  DEKs (data keys) are random 256-bit, stored wrapped (`kms_data_keys`: id, kek_version,
  wrapped_dek, created_at). Payload format: `{v, dkId, iv, ct, tag}` base64 JSON.
- **Key rotation:**
  1. New KEK version activated (KMS alias bump). Old version kept decrypt-only.
  2. All *new* writes wrap DEKs under current KEK.
  3. Background job progressively re-wraps DEKs (cheap) and re-encrypts hot fields (bounded rate).
  4. After dual-read window + zero usage metrics, retire old KEK version.
  Rotation cadence: KEK 12 months or on suspected compromise (compromise ⇒ immediate rotate +
  forced password resets if password-adjacent material affected).
- **TLS certificates:** ACM/Let's Encrypt automated; expiry monitoring alert at 30 days.
- **JWT signing keys:** RS256 keypair per `kid`; JWKS endpoint for future services; rotation =
  publish new kid, sign-new/verify-both overlap 24h, then retire.

## 7. Secrets management rules

| Rule | Enforcement |
|---|---|
| No secrets in Git | gitleaks pre-commit + CI scan; history monitored |
| No secrets in frontend bundles | Only public vars (VITE_* allowlist) reach the client; CI greps bundle for key shapes |
| No secrets in database/source | Config comes from Secret Manager → env at boot only |
| Least privilege IAM | Each workload role scopes exactly its buckets/keys/queues |
| Rotation schedule | DB creds 90d (IAM-auth preferred) · JWT signing 90d · storage keys 90d · AI provider keys 90d · KMS auto-annual |
| Incident key compromise | Rotate first, investigate second; revocation paths documented per secret type |
