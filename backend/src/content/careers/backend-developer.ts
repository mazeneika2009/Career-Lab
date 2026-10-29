import type { CareerDef } from '../framework.js'

export const backendDeveloper: CareerDef = {
  slug: 'backend-developer',
  name: 'Backend Developer',
  category: 'Development',
  order: 3,
  description:
    'Builds server-side APIs with Node.js, Express and MySQL — routing, auth, data modeling, security and deployment.',
  difficulty: 'Intermediate',
  pathSummary:
    'HTTP & REST fundamentals → Node.js runtime & Express → data modeling in MySQL → auth, validation & security → testing, logging & deployment → backend architecture.',
  mainSkills: ['Node.js', 'Express.js', 'REST APIs', 'MySQL', 'Authentication', 'API Security', 'Testing', 'Backend Architecture'],
  sourcePlatforms: ['Node.js Documentation', 'Express Documentation', 'MDN Web Docs', 'MySQL Documentation', 'OWASP', 'GitHub Documentation'],
  companyName: 'Ledger Systems',
  roleTitle: 'Backend Developer',

  chapters: [
    {
      slug: 'http-rest-foundations',
      stage: 'Beginner',
      title: 'HTTP & REST Foundations',
      description: 'The protocol every API speaks and the architectural style clients expect.',
      topics: [
        {
          slug: 'http-essentials',
          title: 'HTTP Essentials',
          objectives: ['Explain request/response semantics', 'Use methods, status codes and headers correctly', 'Understand statelessness'],
          sections: [
            { heading: 'The conversation', body: 'HTTP is a stateless request/response protocol: client sends method, path, headers, optional body; server returns status, headers, body. Idempotent methods (GET, PUT, DELETE) tolerate retries; POST may not.' },
            { heading: 'Status codes as vocabulary', body: '2xx success, 3xx redirection, 4xx caller error (400 validation, 401 unauthenticated, 403 forbidden, 404 missing), 5xx server fault. Precise codes are API documentation; vague 200-with-error-body is a bug factory.' },
            { heading: 'Headers that matter', body: 'Content-Type negotiates payloads, Authorization carries credentials, Cache-Control governs reuse, Rate-Limit headers communicate quotas. Headers carry the metadata contracts your clients rely on.' }
          ],
          links: [
            { title: 'HTTP overview', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Protocol fundamentals reference.' },
            { title: 'HTTP status', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'Complete status code catalog.' },
            { title: 'CORS explanation', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Cross-origin rules every API must handle.' }
          ],
          quiz: { prompt: 'Correct status for a valid request whose token expired?', options: ['400', '401', '403', '500'], answerIndex: 1, explanation: '401 signals authentication failure/expiry; 403 means authenticated but not permitted.' }
        },
        {
          slug: 'rest-design',
          title: 'REST API Design',
          objectives: ['Model resources with nouns and proper methods', 'Design pagination, filtering and errors consistently', 'Version APIs deliberately'],
          sections: [
            { heading: 'Resources, not verbs', body: 'URLs name things (/orders/42), methods express actions. Nesting expresses ownership (/users/7/orders) but flattens once depth exceeds two levels to avoid brittle URLs.' },
            { heading: 'Collections done right', body: 'Paginate everything unbounded (cursor or offset), support filtering via query params, return a consistent envelope with total counts where useful. Errors follow one machine-readable schema with stable codes.' },
            { heading: 'Evolution', body: 'Add fields without breaking readers; remove or reshape only behind versioning (path prefix /v1/). Document contracts so frontend teams integrate against promises, not accidents.' }
          ],
          links: [
            { title: 'Express routing guide', url: 'https://expressjs.com/en/guide/routing.html', sourceName: 'Express Documentation', resourceType: 'documentation', relationship: 'Implementing REST resources in Express.' },
            { title: 'Fetch API (client view)', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'How clients consume the APIs you design.' },
            { title: 'Node.js REST API basics', url: 'https://www.w3schools.com/nodejs/nodejs_restapi.asp', sourceName: 'W3Schools', resourceType: 'tutorial', relationship: 'Hands-on REST basics with Node.' }
          ],
          quiz: { prompt: 'Most RESTful route for deleting a specific invoice?', options: ['POST /invoices/delete', 'GET /removeInvoice?id=42', 'DELETE /invoices/42', 'PUT /invoices/42?action=delete'], answerIndex: 2, explanation: 'Resource path + DELETE method expresses intent; RPC-style URLs fight the protocol.' }
        },
        {
          slug: 'node-runtime-basics',
          title: 'Node.js Runtime Basics',
          objectives: ['Describe the event loop and non-blocking I/O', 'Organize code with modules and npm scripts', 'Read environment configuration safely'],
          sections: [
            { heading: 'Single-threaded concurrency', body: 'Node handles thousands of connections on one thread by delegating blocking work (disk, network) to the OS and continuing when callbacks/promises resolve. CPU-heavy handlers block everyone — offload them.' },
            { heading: 'Modules and npm', body: 'Split features into CommonJS or ESM modules; declare dependencies in package.json with lockfiles for reproducible installs. Semantic versioning communicates breaking-change risk.' },
            { heading: 'Configuration', body: 'Environment variables configure ports, database URLs and secrets per environment. Never commit .env files; validate required values at boot so misconfiguration fails loudly at start.' }
          ],
          links: [
            { title: 'Node.js introduction', url: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs', sourceName: 'Node.js Documentation', resourceType: 'guide', relationship: 'Official runtime orientation.' },
            { title: 'The Node.js event loop', url: 'https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nextticks', sourceName: 'Node.js Documentation', resourceType: 'guide', relationship: 'Authoritative event-loop explanation.' },
            { title: 'npm documentation', url: 'https://docs.npmjs.com/', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'Package management workflows.' }
          ],
          quiz: { prompt: 'A handler runs heavy image resizing synchronously. Expected impact?', options: ['Faster responses', 'Event loop blocked — all concurrent requests stall', 'Automatic worker threads engage', 'Nothing, Node is multithreaded by default'], answerIndex: 1, explanation: 'Synchronous CPU work monopolizes the loop; use async pipelines or worker threads for CPU-bound tasks.' }
        }
      ]
    },
    {
      slug: 'express-services',
      stage: 'Foundation',
      title: 'Building Services with Express',
      description: 'Routing, middleware and the structure of maintainable Express applications.',
      topics: [
        {
          slug: 'express-routing-middleware',
          title: 'Express Routing & Middleware',
          objectives: ['Structure routers per resource', 'Compose middleware chains', 'Handle errors centrally'],
          sections: [
            { heading: 'Router composition', body: 'Mount feature routers under prefixes (app.use("/api/v1/orders", ordersRouter)). Routers compose sub-routers and parameterized paths (:id), keeping app.ts boring — which is the goal.' },
            { heading: 'Middleware pipeline', body: 'Requests flow through middleware in registration order: logging → parsing → rate limit → authenticate → validate → handler. Each calls next() or terminates. Cross-cutting concerns belong here, never copy-pasted into handlers.' },
            { heading: 'Central error handling', body: 'Register one error-handling middleware last; handlers pass errors via next(err). Map domain errors to status codes once, log server details, return sanitized messages to clients.' }
          ],
          links: [
            { title: 'Express routing', url: 'https://expressjs.com/en/guide/routing.html', sourceName: 'Express Documentation', resourceType: 'documentation', relationship: 'Official routing reference.' },
            { title: 'Using middleware', url: 'https://expressjs.com/en/guide/using-middleware.html', sourceName: 'Express Documentation', resourceType: 'documentation', relationship: 'Middleware mechanics and ordering.' },
            { title: 'Error handling', url: 'https://expressjs.com/en/guide/error-handling.html', sourceName: 'Express Documentation', resourceType: 'documentation', relationship: 'Canonical error middleware patterns.' }
          ],
          quiz: { prompt: 'Where should request-body validation live?', options: ['Inside each handler ad hoc', 'A validation middleware before the handler', 'In the database', 'Client-side only'], answerIndex: 1, explanation: 'Validation middleware centralizes schema checks and rejects bad input before business logic runs.' }
        },
        {
          slug: 'mysql-data-modeling',
          title: 'MySQL Data Modeling & SQL',
          objectives: ['Normalize schemas around entities and relations', 'Write safe parameterized queries', 'Index for real query patterns'],
          sections: [
            { heading: 'Relational modeling', body: 'Identify entities (users, orders), their columns, and relationships (one-to-many, many-to-many via join tables). Normalize first; denormalize later only against measured read pressure.' },
            { heading: 'Parameterized SQL', body: 'Always query with placeholders (connection.execute("SELECT … WHERE id = ?", [id])). String-concatenated SQL is the injection vector OWASP ranks first. ORMs parameterize too — understand what they emit.' },
            { heading: 'Indexes serve queries', body: 'Index columns appearing in WHERE/JOIN/ORDER BY of hot queries; verify with EXPLAIN. Every index taxes writes — index deliberately, not speculatively.' }
          ],
          links: [
            { title: 'MySQL Tutorial (official)', url: 'https://dev.mysql.com/doc/refman/8.0/en/tutorial.html', sourceName: 'MySQL Documentation', resourceType: 'guide', relationship: 'Official hands-on SQL tutorial.' },
            { title: 'CREATE INDEX statement', url: 'https://dev.mysql.com/doc/refman/8.0/en/create-index.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Index syntax and options.' },
            { title: 'SQL injection prevention cheat sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'checklist', relationship: 'Authoritative injection defenses.' }
          ],
          quiz: { prompt: 'Which query pattern is safe from SQL injection?', options: ['"SELECT * FROM u WHERE name = \'" + n + "\'"', 'Prepared statement with placeholder bound to n', 'Escaping quotes manually then concatenating', 'Base64-encoding n'], answerIndex: 1, explanation: 'Parameterization separates code from data structurally; manual escaping is error-prone and repeatedly bypassed.' }
        },
        {
          slug: 'auth-authz',
          title: 'Authentication & Authorization',
          objectives: ['Store passwords with modern hashing (Argon2/bcrypt)', 'Issue sessions or tokens correctly', 'Enforce authorization server-side per resource'],
          sections: [
            { heading: 'Credential handling', body: 'Hash passwords with Argon2id or bcrypt including per-user salts; never encrypt or plain-store them. Compare in constant time and rate-limit login attempts to blunt credential stuffing.' },
            { heading: 'Session/token strategy', body: 'Short-lived access tokens plus rotating refresh tokens stored hashed server-side give revocation power. Cookies need HttpOnly, Secure and SameSite attributes scoped tightly to auth endpoints.' },
            { heading: 'Authorization checks', body: 'Authenticate who the caller is, then authorize each action against ownership/roles on the server. Client-side hiding of buttons is UX, not security — IDs are guessable.' }
          ],
          links: [
            { title: 'Password storage cheat sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'checklist', relationship: 'Approved hashing algorithms and parameters.' },
            { title: 'Authentication cheat sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'checklist', relationship: 'Session and credential best practices.' },
            { title: 'Authorization cheat sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'checklist', relationship: 'Deny-by-default enforcement patterns.' }
          ],
          quiz: { prompt: 'Correct password storage approach?', options: ['AES encryption with server key', 'SHA-256 once', 'Argon2id with per-user salt and tuned cost', 'Reversible encoding'], answerIndex: 2, explanation: 'Passwords need deliberately slow, salted hashing so leaked hashes resist cracking; encryption implies intended reversibility.' }
        }
      ]
    },
    {
      slug: 'hardening-and-quality',
      stage: 'Intermediate',
      title: 'Hardening & Code Quality',
      description: 'Validation, API security, error handling and automated tests.',
      topics: [
        {
          slug: 'input-validation-security',
          title: 'Input Validation & API Security',
          objectives: ['Validate bodies, params and queries with schemas', 'Apply rate limiting and secure headers', 'Prevent the OWASP Top 10 classes in your stack'],
          sections: [
            { heading: 'Allowlist validation', body: 'Parse every input against explicit schemas (e.g., zod): types, lengths, ranges, enums. Reject unknown fields where practical. Validation failures return 400 with field-level details — never echo raw provider errors.' },
            { heading: 'Perimeter controls', body: 'Rate-limit per IP/user class, set CORS allowlists instead of *, apply helmet-style headers, and size JSON body limits. These blunt scraping, brute force and content-type attacks cheaply.' },
            { heading: 'Top-10 literacy', body: 'Know the OWASP Top 10 by class: injection, broken auth, sensitive data exposure, broken access control… Map each to your concrete defenses so review conversations cite mechanisms, not vibes.' }
          ],
          links: [
            { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', sourceName: 'OWASP', resourceType: 'reference', relationship: 'The canonical risk catalog.' },
            { title: 'Input validation cheat sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'checklist', relationship: 'Validation strategy specifics.' },
            { title: 'Express security best practices', url: 'https://expressjs.com/en/advanced/best-practice-security.html', sourceName: 'Express Documentation', resourceType: 'guide', relationship: 'Framework-level hardening checklist.' }
          ],
          quiz: { prompt: 'CORS configured with origin: "*"' + ' plus credentials: true is…', options: ['Ideal for development', 'Invalid/insecure — browsers reject credentialed wildcard origins; allowlist specific origins', 'Required for REST', 'Only a performance issue'], answerIndex: 1, explanation: 'Credentialed requests require exact origins. Wildcards invite abuse and simply fail with cookies.' }
        },
        {
          slug: 'errors-and-logging',
          title: 'Error Handling & Logging',
          objectives: ['Distinguish expected errors from faults', 'Log structured events with correlation ids', 'Avoid leaking internals to clients'],
          sections: [
            { heading: 'Error taxonomy', body: 'Expected errors (validation, not found, conflicts) get precise codes and client-safe messages. Unexpected faults return generic 500s while logging full context server-side. Clients should never see stack traces.' },
            { heading: 'Structured logs', body: 'Log JSON lines with timestamp, level, requestId, actorId and event names. Correlation ids stitched through a request make production triage possible; console.log sprawl does not.' },
            { heading: 'Log discipline', body: 'Never log passwords, tokens or personal data beyond necessity. Log enough to diagnose: inputs’ shapes, outcomes, latencies. Alert on error rates, not individual blips.' }
          ],
          links: [
            { title: 'Logging cheat sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'checklist', relationship: 'What to log and what never to log.' },
            { title: 'Error handling guide', url: 'https://expressjs.com/en/guide/error-handling.html', sourceName: 'Express Documentation', resourceType: 'documentation', relationship: 'Framework error flow.' },
            { title: 'Node.js process warnings/errors', url: 'https://nodejs.org/api/process.html', sourceName: 'Node.js Documentation', resourceType: 'reference', relationship: 'Runtime-level failure hooks.' }
          ],
          quiz: { prompt: 'A database connection fails mid-request. The API response should be…', options: ['Stack trace with connection string', 'Generic 503/500 with requestId, details only in server logs', '200 with error flag', 'Silent empty response'], answerIndex: 1, explanation: 'Internal details aid attackers; correlation ids let legitimate users report issues you can trace.' }
        },
        {
          slug: 'testing-backends',
          title: 'Testing Backends',
          objectives: ['Unit-test services with isolated dependencies', 'Integration-test routes against a disposable database', 'Keep the suite fast enough to run always'],
          sections: [
            { heading: 'Unit vs integration', body: 'Unit tests exercise service logic with faked repositories — instant feedback on business rules. Integration tests boot the real app against an ephemeral database to catch wiring, SQL and serialization truths.' },
            { heading: 'What to assert', body: 'Status codes, response shapes, authorization boundaries (user A cannot read user B’s data) and persistence effects. Authorization tests pay for themselves the first time a regression is caught pre-deploy.' },
            { heading: 'Suite hygiene', body: 'Seed minimal fixtures per test, clean between cases, parallelize safely. A suite slower than coffee breeds skip-culture; invest in speed like a feature.' }
          ],
          links: [
            { title: 'Node.js testing overview', url: 'https://nodejs.org/en/learn/test-runner/introduction-to-test-runner', sourceName: 'Node.js Documentation', resourceType: 'guide', relationship: 'Built-in test runner basics.' },
            { title: 'Getting started with Vitest', url: 'https://vitest.dev/guide/', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'Common ecosystem runner used in CI.' },
            { title: 'MySQL test databases', url: 'https://dev.mysql.com/doc/refman/8.0/en/database-use.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Creating/disposable schemas for integration runs.' }
          ],
          quiz: { prompt: 'Highest-value automated backend test?', options: ['Snapshot of every response', 'Authorization boundary test proving cross-user access fails', 'Testing ORM internals', 'Console.log coverage'], answerIndex: 1, explanation: 'Broken access control is catastrophic and easy to regression-test — assert other users’ data is unreachable.' }
        }
      ]
    },
    {
      slug: 'data-and-performance',
      stage: 'Intermediate',
      title: 'Data Engineering & Performance',
      description: 'Advanced SQL, caching and optimizing data-heavy backends.',
      topics: [
        {
          slug: 'advanced-sql',
          title: 'Advanced SQL & Query Plans',
          objectives: ['Write efficient JOINs, subqueries and window functions', 'Use EXPLAIN to diagnose query plans', 'Recognize scans, filesorts and temporary tables'],
          sections: [
            { heading: 'Beyond CRUD', body: 'Window functions (ROW_NUMBER, RANK, LAG) solve ranking, pagination and change-detection elegantly without self-joins. Correlated subqueries answer per-row questions but often optimize better as joins. Master these constructs to stop fighting SQL.' },
            { heading: 'Reading query plans', body: 'EXPLAIN reveals the plan: full table scans vs index seek, join algorithms, temp tables and cardinality estimates. A slow query without EXPLAIN is a guess; with EXPLAIN it is a diagnosis. Memorize the common offenders: filesort, temp tables and type=ALL.' },
            { heading: 'Rewriting for the planner', body: 'Move filters closer to the data, avoid functions on indexed columns, and select only the columns you need. Use EXISTS instead of IN for large subqueries, and paginate by keyset rather than OFFSET on large tables. Always re-run EXPLAIN after a rewrite.' }
          ],
          links: [
            { title: 'MySQL EXPLAIN reference', url: 'https://dev.mysql.com/doc/refman/8.0/en/explain.html', sourceName: 'MySQL Documentation', resourceType: 'documentation', relationship: 'Official EXPLAIN output semantics.' },
            { title: 'MySQL optimization guidance', url: 'https://dev.mysql.com/doc/refman/8.0/en/optimization.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Query rewriting and optimization methods.' },
            { title: 'Use The Index, Luke', url: 'https://use-the-index-luke.com/', sourceName: 'Use The Index, Luke', resourceType: 'guide', relationship: 'How SQL performance depends on indexes and query shape.' }
          ],
          quiz: { prompt: 'A query scans 12M rows every call. First diagnostic step is...', options: ['Buy a bigger server', 'Run EXPLAIN to inspect the plan and candidate indexes', 'Rewrite the report in another language', 'Cache blindly'], answerIndex: 1, explanation: 'The query plan tells you whether an index, rewritten join, or covering index is warranted before touching infrastructure.' }
        },
        {
          slug: 'index-strategy',
          title: 'Index Design for Query Performance',
          objectives: ['Design composite indexes from real query patterns', 'Use covering indexes to remove table lookups', 'Balance read speed against write and storage cost'],
          sections: [
            { heading: 'Composite indexes and leftmost prefix', body: 'A composite index on (customer_id, created_at) serves queries filtered by customer_id, or by customer_id plus a created_at range. It cannot serve a query filtered only by created_at. Order columns by equality filters first, then range and sort columns.' },
            { heading: 'Covering indexes', body: 'When an index contains every column a query reads, the engine answers from the index alone and skips table lookups. Add the selected columns to the index only after measuring the query plan; covering indexes speed reads but make writes larger and slower.' },
            { heading: 'Selectivity, cost and review', body: 'Indexes on low-selectivity columns (status, boolean flags) rarely help alone. Every index costs insert, update and delete work plus disk and memory. Keep indexes justified by EXPLAIN and load tests, review unused indexes quarterly, and drop the ones no query needs.' }
          ],
          links: [
            { title: 'MySQL index optimization', url: 'https://dev.mysql.com/doc/refman/8.0/en/optimization-indexes.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'How MySQL chooses and uses indexes.' },
            { title: 'Use The Index, Luke', url: 'https://use-the-index-luke.com/', sourceName: 'Use The Index, Luke', resourceType: 'guide', relationship: 'Composite, covering and function-based index design.' },
            { title: 'SQL indexing best practices', url: 'https://use-the-index-luke.com/sql/table-of-contents', sourceName: 'Use The Index, Luke', resourceType: 'guide', relationship: 'End-to-end index design workflow.' }
          ],
          quiz: { prompt: 'The index (customer_id, created_at) best serves a query filtering on…', options: ['created_at alone', 'customer_id alone or customer_id plus a created_at range', 'Any two columns in any order', 'Only exact matches on both columns'], answerIndex: 1, explanation: 'Composite indexes follow the leftmost-prefix rule: the leading column can be used alone, and later columns extend the search once the leading column is constrained.' }
        },
        {
          slug: 'caching-strategies',
          title: 'Caching & Read Optimization',
          objectives: ['Choose cache layers: response, data, CDN', 'Design cache invalidation and TTL policies', 'Handle cache stampedes gracefully'],
          sections: [
            { heading: 'Cache hierarchy', body: 'HTTP/CDN caches serve static and aggregate responses; application caches store computed or hot datasets; DB query caches are last resort. Push caching as close to the client as correctness allows — a CDN hit costs microseconds versus a socket round-trip.' },
            { heading: 'Invalidation models', body: 'TTL-based invalidation is simple and eventually consistent; write-through keeps reads correct but adds latency; event-driven invalidation (publish on write, evict on subscribe) is precise but complex. Choose the simplest that preserves data integrity for your read/write ratio.' },
            { heading: 'Stampede control', body: 'When a hot key expires, thousands of concurrent misses can overwhelm the DB. Use request coalescing (single async miss shared across callers), small random TTL jitter, or a lock around regeneration. Also consider stale serving: serve old data on miss while regenerating in background.' }
          ],
          links: [
            { title: 'HTTP caching fundamentals', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Cache-Control, ETag and validation semantics.' },
            { title: 'MySQL optimization reference', url: 'https://dev.mysql.com/doc/refman/8.0/en/optimization.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'Query-level read optimization context.' },
            { title: 'SQL injection cheat sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'checklist', relationship: 'Caching must not bypass parameterized query discipline.' }
          ],
          quiz: { prompt: 'A product page is read 100x per write. Best caching baseline?', options: ['No cache, premature', 'Cache the rendered response or hot DB rows with TTL and short staleness allowance', 'Cache everything forever', 'Only cache images'], answerIndex: 1, explanation: 'For read-heavy data, TTL-based response or row caching dramatically cuts DB load with rare staleness acceptable for most content.' }
        }
      ]
    },
    {
      slug: 'message-queues-jobs',
      stage: 'Intermediate',
      title: 'Background Jobs & Message Queues',
      description: 'Reliable async processing: queues, workers, retries and event-driven architecture.',
      topics: [
        {
          slug: 'queue-basics',
          title: 'Queue Fundamentals & Workers',
          objectives: ['Understand producer/consumer and queue semantics', 'Choose work-queue or publish/subscribe delivery', 'Operate workers with acknowledgements and visibility timeouts'],
          sections: [
            { heading: 'Why queues', body: 'Queues decouple the request lifecycle from long or retry-prone work: emails, image processing, reports, webhooks. Producers enqueue fast; workers process when capacity allows. Latency-sensitive paths stay snappy while heavy work completes asynchronously.' },
            { heading: 'Work queues and pub/sub', body: 'A work queue delivers each message to one worker, spreading load. Publish/subscribe delivers a copy to every subscriber, spreading events. Choose by intent: commands that must happen once belong in a work queue; facts that several services react to belong on a topic.' },
            { heading: 'Acknowledgement and visibility', body: 'Workers acknowledge a message only after the work succeeds. If a worker crashes, the visibility timeout expires and the broker redelivers. Tune that timeout above the longest normal job, or healthy jobs will be duplicated while still running.' }
          ],
          links: [
            { title: 'AWS SQS visibility timeout', url: 'https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html', sourceName: 'AWS Documentation', resourceType: 'documentation', relationship: 'Ack, redelivery and timeout semantics.' },
            { title: 'Queue-based load levelling', url: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling', sourceName: 'Microsoft Azure', resourceType: 'documentation', relationship: 'Using a queue to absorb bursts safely.' },
            { title: 'Idempotency in HTTP', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Idempotent', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'HTTP method idempotency parallels job idempotency.' }
          ],
          quiz: { prompt: 'A worker receives the same job twice due to redelivery. Correct approach?', options: ['Process both times blindly', 'Make the handler idempotent or track processed markers', 'Crash loudly', 'Ignore the job'], answerIndex: 1, explanation: 'Duplicates are a queue reality; an idempotent handler or an ACK/processed record makes redelivery safe.' }
        },
        {
          slug: 'idempotency-retries-dlq',
          title: 'Idempotency, Retries & Dead-Letter Queues',
          objectives: ['Build idempotent job handlers', 'Design bounded retries with backoff and jitter', 'Route poisoned jobs to a dead-letter queue and alert on them'],
          sections: [
            { heading: 'Idempotency', body: 'Workers can run a job more than once — crashes, redelivery and retries make it inevitable. Handlers must be idempotent: either no side effect on repeat or safe to repeat. Persist a processed-marker or make the operation naturally idempotent (e.g. INSERT IGNORE, upsert).' },
            { heading: 'Retries and DLQs', body: 'Transient failures deserve retries with backoff; permanent ones do not. Route repeatedly failing jobs to a dead-letter queue for inspection. Cap retry counts to avoid infinite loops and add exponential backoff plus jitter to spread retry storms.' },
            { heading: 'Observability for background work', body: 'Track queue depth, age of the oldest message, processing time and failure rate. Alert when depth grows without draining or when the DLQ receives messages. Include a correlation id in every job so logs connect producer, worker and downstream calls.' }
          ],
          links: [
            { title: 'AWS SQS dead-letter queues', url: 'https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html', sourceName: 'AWS Documentation', resourceType: 'documentation', relationship: 'Capturing and replaying failed messages.' },
            { title: 'Retries and backoff with jitter', url: 'https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/', sourceName: 'AWS Builder’s Library', resourceType: 'article', relationship: 'Bounded retry strategy that avoids storms.' },
            { title: 'OWASP logging cheat sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'checklist', relationship: 'Logging job outcomes with correlation ids.' }
          ],
          quiz: { prompt: 'A job fails permanently because its payload is invalid. The right move is to…', options: ['Retry it forever with no backoff', 'Send it to a dead-letter queue with context and alert for inspection', 'Delete it silently', 'Process it twice to be sure'], answerIndex: 1, explanation: 'Permanent failures should leave the retry loop. A DLQ preserves the payload for diagnosis while alerts make the failure visible.' }
        },
        {
          slug: 'event-driven-architecture',
          title: 'Event-Driven Integration',
          objectives: ['Design event contracts and schemas', 'Publish and subscribe safely', 'Handle ordering and at-least-once semantics'],
          sections: [
            { heading: 'Events as facts', body: 'An event records that something happened: orderPlaced, paymentFailed. Services publish facts, not commands. Subscribers react; the publisher does not know or care who subscribes. This decouples teams and lets new features subscribe without touching producers.' },
            { heading: 'Schema governance', body: 'Events are contracts across services. Version them so you can evolve without breaking consumers: additive fields are safe, renames/removals are breaking. Publish schemas to a registry and validate producers and consumers against it.' },
            { heading: 'Delivery semantics', body: 'Most brokers offer at-least-once delivery, so subscribers must handle duplicates (idempotent processing). Ordering is per-partition: pick a partition key that keeps related events ordered (orderId, userId) and accept that cross-key ordering cannot be guaranteed.' }
          ],
          links: [
            { title: 'Event-driven architecture overview', url: 'https://www.aws.amazon.com/what-is/eda/', sourceName: 'MDN Web Docs', resourceType: 'article', relationship: 'Conceptual grounding for event-driven patterns.' },
            { title: 'Idempotent receiver pattern', url: 'https://enterpriseintegrationpatterns.com/', sourceName: 'GitHub Documentation', resourceType: 'article', relationship: 'Canonical patterns catalog for messaging.' },
            { title: 'API design with events', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'How event flows complement HTTP APIs.' }
          ],
          quiz: { prompt: 'At-least-once delivery means subscribers must…', options: ['Guarantee global ordering', 'Handle duplicates with idempotent processing', 'Only accept once', 'Use only synchronous calls'], answerIndex: 1, explanation: 'At-least-once allows duplicates; idempotent processing and dedup markers make them harmless.' }
        }
      ]
    },
    {
      slug: 'operations-and-architecture',
      stage: 'Advanced',
      title: 'Deployment & Backend Architecture',
      description: 'Shipping reliably and structuring services that outlive their authors.',
      topics: [
        {
          slug: 'deployment-node',
          title: 'Deploying Node Services',
          objectives: ['Configure processes and environments for production', 'Manage secrets outside code', 'Run stateless services with health endpoints'],
          sections: [
            { heading: 'Production process', body: 'Run behind process managers/containers with health endpoints for readiness and liveness. Keep servers stateless so horizontal scaling and restarts are boring. Pin the Node version, handle SIGTERM, and drain connections before shutdown.' },
            { heading: 'Secrets management', body: 'Inject credentials via environment or secret stores; rotate periodically; scope database users minimally. Secrets in git history are burned forever — treat leaks as incidents.' },
            { heading: 'Configuration and environments', body: 'Keep development, staging and production as close as practical. Validate required environment variables at boot and fail loudly rather than starting a half-configured service. Never ship production credentials to a developer machine.' }
          ],
          links: [
            { title: 'Node.js production best practices', url: 'https://nodejs.org/en/learn/getting-started/security-best-practices', sourceName: 'Node.js Documentation', resourceType: 'guide', relationship: 'Official production/security guidance.' },
            { title: 'Express production practices', url: 'https://expressjs.com/en/advanced/best-practice-performance.html', sourceName: 'Express Documentation', resourceType: 'guide', relationship: 'Performance and reliability checklist.' },
            { title: 'The Twelve-Factor App', url: 'https://12factor.net/', sourceName: '12 Factor', resourceType: 'documentation', relationship: 'Config, processes and stateless deployment principles.' }
          ],
          quiz: { prompt: 'Safe migration practice during rolling deploys?', options: ['Drop columns immediately in same release', 'Expand (add nullable/backfill), deploy, then contract later', 'Rename columns directly', 'Manual ALTER on prod during traffic'], answerIndex: 1, explanation: 'Expand/contract keeps both application versions functional throughout rollout; immediate drops break old instances.' }
        },
        {
          slug: 'ci-cd-migrations',
          title: 'CI/CD & Safe Database Migrations',
          objectives: ['Gate releases with lint, typecheck, tests and build', 'Ship backward-compatible expand/contract migrations', 'Use canaries and rollbacks to limit blast radius'],
          sections: [
            { heading: 'Pipeline gates', body: 'A dependable pipeline runs lint → typecheck → unit and integration tests → build → deploy. Fail the build on any red gate; a pipeline that can be ignored is worse than no pipeline. Cache dependencies for speed and keep the whole run under ten minutes.' },
            { heading: 'Expand and contract', body: 'Never remove or rename a column in the same release that stops using it. Add the new nullable column (expand), deploy code that writes both and backfills, then remove the old column in a later release (contract). Old and new instances stay compatible during the rollout.' },
            { heading: 'Canaries and rollback', body: 'Deploy to a small slice first, compare error rate and latency with the baseline, then widen. Define rollback triggers before the release. Prefer feature flags so a code rollback is not needed for every regression.' }
          ],
          links: [
            { title: 'GitHub Actions documentation', url: 'https://docs.github.com/en/actions', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'CI/CD pipeline implementation.' },
            { title: 'Prisma migrate deploy', url: 'https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production', sourceName: 'Prisma Documentation', resourceType: 'documentation', relationship: 'Applying migrations safely in production.' },
            { title: 'The Twelve-Factor App', url: 'https://12factor.net/', sourceName: '12 Factor', resourceType: 'documentation', relationship: 'Build, release and run separation.' }
          ],
          quiz: { prompt: 'The expand/contract pattern exists because…', options: ['It makes SQL prettier', 'Old and new application versions must both work during a rolling deploy', 'It avoids backups', 'It removes the need for tests'], answerIndex: 1, explanation: 'During a rolling deploy, both versions run at once. Expand adds compatible structures first; contract removes old ones only after every instance has moved on.' }
        },
        {
          slug: 'architecture-patterns',
          title: 'Backend Architecture Patterns',
          objectives: ['Layer applications: routes → controllers → services → repositories', 'Isolate business logic from framework and DB details', 'Design for change across modules'],
          sections: [
            { heading: 'Layered monolith', body: 'Routes translate HTTP, controllers orchestrate, services hold business rules, repositories own persistence. Dependencies point inward; swapping Express or MySQL should touch edges only.' },
            { heading: 'Module boundaries', body: 'Group by domain (orders/, billing/) rather than technical type. Cross-module calls go through exported service APIs, preventing entangled private reach-ins.' },
            { heading: 'Evolving design', body: 'Start simple, extract queues/caches when measured load demands. Architecture records live in short decision notes — future teammates inherit reasons, not archaeology.' }
          ],
          links: [
            { title: 'Express examples', url: 'https://expressjs.com/en/starter/examples.html', sourceName: 'Express Documentation', resourceType: 'documentation', relationship: 'Structural patterns in real apps.' },
            { title: 'Node.js application structure guidance', url: 'https://nodejs.org/en/learn', sourceName: 'Node.js Documentation', resourceType: 'course', relationship: 'Runtime idioms supporting architecture.' },
            { title: 'GitHub repository structure docs', url: 'https://docs.github.com/en/repositories', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'Organizing and documenting codebases.' }
          ],
          quiz: { prompt: 'Business rule “a cancelled order cannot ship” belongs in…', options: ['Route handler', 'Service layer', 'CSS', 'Database trigger only'], answerIndex: 1, explanation: 'Services encode domain rules once where they are testable and reusable regardless of entry point.' }
        }
      ]
    },
    {
      slug: 'distributed-systems-hardening',
      stage: 'Advanced',
      title: 'Distributed Systems & Hardening',
      description: 'Reliability patterns for many moving parts: resilience, consistency, security and observability.',
      topics: [
        {
          slug: 'resilience-and-failure',
          title: 'Designing for Failure',
          minutes: 30,
          objectives: ['Apply timeouts, retries and circuit breakers deliberately', 'Plan graceful degradation and bulkheads', 'Run chaos-minded thinking without breaking prod'],
          sections: [
            { heading: 'Assume chaos', body: 'Networks stall, services lag, disks fill. Design with explicit timeouts, bounded retries with exponential backoff and jitter, and circuit breakers that fail fast instead of crawling.' },
            { heading: 'Degrade, don’t die', body: 'Plan what the system shows when a dependency is down: cached fallbacks, stale data with a banner, or a clear limited-scope response. A graceful degradation preserves trust and revenue.' },
            { heading: 'Bulkheads and budgets', body: 'Isolate risky consumers (per-user, per-tenant, per-workqueue) so one noisy caller cannot starve others. Set concurrency and memory budgets and protect shared resources.' }
          ],
          links: [
            { title: 'Resilience patterns', url: 'https://docs.aws.amazon.com/whitepapers/latest/architecture-center/resilience.html', sourceName: 'AWS Architecture Center', resourceType: 'documentation', relationship: 'Industry resilience patterns and practices.' },
            { title: 'Retries and timeouts guide', url: 'https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/', sourceName: 'AWS Builder’s Library', resourceType: 'article', relationship: 'Implementing robust retry behavior.' },
            { title: 'Bulkhead pattern', url: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/bulkhead', sourceName: 'Microsoft Azure', resourceType: 'documentation', relationship: 'Isolating failures to protect shared resources.' }
          ],
          quiz: {
            prompt: 'When a downstream service is timing out, unbounded retries without backoff are dangerous because…',
            options: ['They cost a few extra packets', 'They can amplify load into a cascade of failures', 'They always work', 'They are too slow'],
            answerIndex: 1,
            explanation: 'Retry storms can overwhelm an already-struggling dependency and turn one failure into an outage. Bounded retries with backoff and jitter are the safe default.'
          }
        },
        {
          slug: 'data-consistency-patterns',
          title: 'Consistency at Scale',
          minutes: 35,
          objectives: ['Choose consistency models for the right trade-offs', 'Implement events, sagas and outbox for reliability', 'Reason about partitioning and replication'],
          sections: [
            { heading: 'Consistency models', body: 'Strong consistency is easy to reason about but costly at scale; eventual consistency is fast but needs reconciliation. Choose per-requirement: financial writes differ from a social feed.' },
            { heading: 'Transactions across services', body: 'Distributed transactions are hard. Use patterns like the saga (a chain of compensations) or the transactional outbox to keep a source of truth reliable, and accept eventual consistency where appropriate.' },
            { heading: 'Replication and partitions', body: 'Understand how your datastore replicates (synchronous vs async) and rebalances partitions, because that governs read-your-writes and availability when nodes fail.' }
          ],
          links: [
            { title: 'The CAP theorem explained', url: 'https://www.ibm.com/think/topics/cap-theorem', sourceName: 'IBM', resourceType: 'article', relationship: 'The trade-off space for distributed data.' },
            { title: 'Saga pattern', url: 'https://microservices.io/patterns/data/saga.html', sourceName: 'microservices.io', resourceType: 'reference', relationship: 'Long-running transactions via compensating steps.' },
            { title: 'Transactional outbox', url: 'https://microservices.io/patterns/data/transactional-outbox.html', sourceName: 'microservices.io', resourceType: 'reference', relationship: 'Reliably publishing events with state changes.' }
          ],
          quiz: {
            prompt: 'A payment must be reliably delivered to an analytics system that may be down. The robust pattern is…',
            options: ['Fire-and-forget the event', 'Write to an outbox in the same transaction, then publish from it', 'Block the payment on analytics', 'Store the event in memory'],
            answerIndex: 1,
            explanation: 'The transactional outbox guarantees the event is persisted with the state change and can be reliably published/retried later.'
          }
        },
        {
          slug: 'security-observability',
          title: 'Security, Observability & Operational Hardening',
          minutes: 60,
          objectives: ['Harden authentication and authorization', 'Prevent the OWASP-top risks in API design', 'Handle secrets and audit responsibly', 'Instrument logs, metrics and traces coherently', 'Define alerts that fire for real problems', 'Use structured data to debug production fast'],
          sections: [
            { heading: 'Auth done right', body: 'Hash passwords with a strong algorithm, use short-lived tokens with refresh, enforce HTTPS, and scope JWTs by audience. Always authorize server-side — never trust client claims.' },
            { heading: 'API risk surface', body: 'Guard against injection (parameterize queries), SSRF (validate outbound targets), mass assignment, and broken access control. Validate and limit request payloads and rate-limit abuse.' },
            { heading: 'Secrets and logging', body: 'Inject secrets via environment/secrets manager, never the codebase. Log structure but redact PII and secrets. Store audit trails for sensitive operations without cluttering them with noise.' },
            { heading: 'The three pillars', body: 'Logs tell you what happened, metrics tell you the rate/level, traces connect the request across services. Instrument all three with consistent correlation IDs so a trace links its logs and metrics.' },
            { heading: 'Alerts that matter', body: 'Alert on user-impacting symptoms with clear thresholds (error rate, latency, saturation), not on noise. Every alert should have a runbook and an owner, and pages should be rare.' },
            { heading: 'Debugging by data', body: 'With good observability you reproduce by querying instead of guessing. Add structured fields (status, service, latency, user segment) so you can slice dashboards and answer "what changed?" fast.' }
          ],
          links: [
            { title: 'OWASP API Security Top 10', url: 'https://owasp.org/API-Security/editions/2023/en/0x11-t10/', sourceName: 'OWASP', resourceType: 'reference', relationship: 'The most critical API risks.' },
            { title: 'OWASP Cheat Sheet Series', url: 'https://cheatsheetseries.owasp.org/', sourceName: 'OWASP', resourceType: 'documentation', relationship: 'Practical guidance for common vulnerabilities.' },
            { title: 'Auth best practices', url: 'https://www.oauth.com/', sourceName: 'oauth.com', resourceType: 'documentation', relationship: 'Designing secure authorization flows.' },
            { title: 'OpenTelemetry docs', url: 'https://opentelemetry.io/docs/', sourceName: 'OpenTelemetry', resourceType: 'documentation', relationship: 'Standard instrumentation for logs, metrics and traces.' },
            { title: 'Monitoring vs observability', url: 'https://www.honeycomb.io/what-is-observability', sourceName: 'Honeycomb', resourceType: 'article', relationship: 'Going beyond dashboards to reason from telemetry.' }
          ],
          quiz: {
            prompt: 'The most reliable way to keep database secrets out of your repository is…',
            options: ['Committing them but minifying', 'Injecting via environment variables or a secrets manager', 'Hard-coding with a comment', 'Sharing them in chat'],
            answerIndex: 1,
            explanation: 'Environment variables and secret managers keep credentials out of version control and centralize rotation.'
          }
        }
      ]
    },
    {
      slug: 'backend-teams-and-communication',
      stage: 'Advanced',
      title: 'Backend Teams & Communication',
      description: 'Contracts, API design review, DevOps collaboration and clear technical communication.',
      topics: [
        {
          slug: 'api-design-review',
          title: 'Designing & Reviewing APIs',
          minutes: 30,
          objectives: ['Design REST/HTTP APIs with consistent conventions', 'Version and evolve APIs without breaking clients', 'Run productive API design reviews'],
          sections: [
            { heading: 'Consistent conventions', body: 'Name resources with nouns, use proper status codes and consistent error shapes (code, message, details). Predictable APIs need less client-doc digging and fewer bugs.' },
            { heading: 'Versioning and evolution', body: 'Additive, backward-compatible changes are safest (new optional fields, new endpoints). When you must break, version explicitly (URL or header), document migration, and support both briefly.' },
            { heading: 'Review as contract', body: 'Review API surfaces like a public contract: naming, symmetry, pagination, idempotency, error handling, and authorization. A cheap design-review pass prevents expensive rework.' }
          ],
          links: [
            { title: 'REST API design (Microsoft)', url: 'https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design', sourceName: 'Microsoft Azure', resourceType: 'documentation', relationship: 'Guidelines for consistent API design.' },
            { title: 'Web API design (Google)', url: 'https://cloud.google.com/apis/design', sourceName: 'Google Cloud', resourceType: 'documentation', relationship: 'Canonical API design practices.' },
            { title: 'OpenAPI spec', url: 'https://spec.openapis.org/oas/latest.html', sourceName: 'OpenAPI', resourceType: 'specification', relationship: 'Describing API contracts in a machine-readable way.' }
          ],
          quiz: {
            prompt: 'The safest way to add a capability to an existing, widely used API is…',
            options: ['Deleting the old endpoint', 'Adding new optional fields/endpoints that are backward-compatible', 'Changing error codes at random', 'Silently changing semantics'],
            answerIndex: 1,
            explanation: 'Additive, backward-compatible changes keep existing clients working while you extend the surface.'
          }
        },
        {
          slug: 'devops-and-platform-collaboration',
          title: 'Working with DevOps & Platform',
          minutes: 30,
          objectives: ['Collaborate on deployment, CI/CD and infrastructure', 'Own environments and observability access', 'Communicate release risk clearly'],
          sections: [
            { heading: 'Shared ownership', body: 'Write code that deploys cleanly: container images, health checks, migrations that run safely, and config injected at runtime. The smoother the handoff to platform teams, the faster you ship.' },
            { heading: 'Release discipline', body: 'Use feature flags and canary/shadow deploys to limit blast radius. Keep rollback trivial by making deploys repeatable and migrations reversible or forward-compatible.' },
            { heading: 'Environment hygiene', body: 'Keep dev/staging as close to prod as practical and document what differs. Clear communication about release windows, risks and rollback plans builds trust with platform and ops.' }
          ],
          links: [
            { title: 'Twelve-Factor App', url: 'https://12factor.net/', sourceName: '12 Factor', resourceType: 'documentation', relationship: 'Principles for cloud-friendly, deployable apps.' },
            { title: 'DevOps best practices', url: 'https://www.atlassian.com/devops/devops-tools/devops-tools-tutorial', sourceName: 'Atlassian', resourceType: 'article', relationship: 'Tooling and culture for strong DevOps.' },
            { title: 'Feature flags guidance', url: 'https://martinfowler.com/articles/feature-toggles.html', sourceName: 'Martin Fowler', resourceType: 'article', relationship: 'Deploying changes safely behind toggles.' }
          ],
          quiz: {
            prompt: 'To ship a backend change with minimal blast radius on a bad day, you would…',
            options: ['Deploy directly to production on Friday', 'Feature-flag it and deploy gradually (canary), with a trivial rollback', 'Hide the change and hope', 'Skip testing'],
            answerIndex: 1,
            explanation: 'Flags plus gradual rollout plus easy rollback limit the impact of any single deploy.'
          }
        },
        {
          slug: 'clear-technical-communication',
          title: 'Clear Technical Communication',
          minutes: 25,
          objectives: ['Explain architecture to non-engineers', 'Write clear incident and status communications', 'Present technical decisions to stakeholders'],
          sections: [
            { heading: 'Translate, don’t drown', body: 'Frame architecture in business terms: "this service isolates risk so one failure can’t take down checkout." Use analogies and diagrams; invite questions early.' },
            { heading: 'Incident communication', body: 'State what is happening, who is affected, what is being done, and the next update time — in plain language. Honest, calm status updates preserve trust under pressure.' },
            { heading: 'Decisions worth recording', body: 'When you present a decision, lead with the recommendation and the trade-offs you weighed, then add detail for those who want it. Decision-ready summaries respect stakeholders’ time.' }
          ],
          links: [
            { title: 'Stripe incident communication', url: 'https://stripe.com/incident-report/2023-06-01', sourceName: 'Stripe', resourceType: 'article', relationship: 'An exemplar of clear incident reporting.' },
            { title: 'Presenting technical decisions', url: 'https://www.mapof.zone/blog/a-guide-to-technical-decision-making', sourceName: 'mapof.zone', resourceType: 'article', relationship: 'Communicating decisions to stakeholders.' },
            { title: 'The Pragmatic Programmer', url: 'https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/', sourceName: 'Pragmatic Bookshelf', resourceType: 'article', relationship: 'Professional communication principles.' }
          ],
          quiz: {
            prompt: 'During an active outage, the first status update should contain…',
            options: ['A full root-cause dissertation', 'What is happening, who is affected, and when the next update comes', 'Silence until resolved', 'Only technical acronyms'],
            answerIndex: 1,
            explanation: 'Users need immediate, plain-language reassurance and a cadence, not premature analysis.'
          }
        }
      ]
    },
    {
      slug: 'backend-career-and-sre',
      stage: 'Advanced',
      title: 'Backend Career & SRE Mindset',
      description: 'Grow toward senior and staff backend roles, and adopt a reliability mindset.',
      topics: [
        {
          slug: 'senior-backend-growth',
          title: 'Senior & Staff Backend Roles',
          minutes: 25,
          objectives: ['Own architecture and cross-team impact', 'Drive design reviews and technical strategy', 'Mentor other engineers'],
          sections: [
            { heading: 'Own the system', body: 'Senior backend engineers own reliability, security and architecture of their systems, not just tickets. They anticipate failure, question scale assumptions and lead by design.' },
            { heading: 'Scope of influence', body: 'Move from "implement this" to "challenge and shape this": raising risks early, driving RFCs, aligning across teams. Staff engineers influence across multiple squads and systems.' },
            { heading: 'Raising the team', body: 'Mentor through design reviews, concise ADRs and calm incident leadership. Your leverage grows when the engineers around you make smarter trade-offs.' }
          ],
          links: [
            { title: 'Staff Engineer path', url: 'https://staffeng.com/', sourceName: 'StaffEng', resourceType: 'guide', relationship: 'How staff-level backend roles operate across teams.' },
            { title: 'Engineering leadership ladders', url: 'https://www.progression.fyi/', sourceName: 'progression.fyi', resourceType: 'reference', relationship: 'Leveling frameworks for engineering roles.' },
            { title: 'Design review practices', url: 'https://www.industrialempathy.com/posts/design-docs-at-google/', sourceName: 'Industrial Empathy', resourceType: 'article', relationship: 'Running effective design reviews.' }
          ],
          quiz: {
            prompt: 'A mark of a senior backend engineer is…',
            options: ['Knowing every framework', 'Anticipating failure modes and driving architecture and reliability, while raising the team', 'Working alone', 'Never asking questions'],
            answerIndex: 1,
            explanation: 'Seniority lies in ownership of systems and influence on others, not raw framework trivia.'
          }
        },
        {
          slug: 'reliability-sre-mindset',
          title: 'The SRE & Reliability Mindset',
          minutes: 25,
          objectives: ['Shift from "it works" to "it works under load and failure"', 'Use SLOs and error budgets to guide decisions', 'Turn incidents into durable improvement'],
          sections: [
            { heading: 'Reliability as a first-class goal', body: 'Beyond correctness, define user-facing reliability: availability targets, latency budgets, and capacity. Ask what happens at 10x traffic or when any dependency disappears.' },
            { heading: 'SLOs and error budgets', body: 'Set service-level objectives and an error budget (allowed downtime). When the budget burns, prioritize reliability work over new features — data over emotion.' },
            { heading: 'Postmortems that matter', body: 'Blameless postmortems focus on systems and process, not people. Write durable fixes (guardrails, alerts, docs) so the same failure cannot return silently.' }
          ],
          links: [
            { title: 'Google SRE Book', url: 'https://sre.google/sre-book/table-of-contents/', sourceName: 'Google', resourceType: 'documentation', relationship: 'Foundational reliability engineering practice.' },
            { title: 'SLOs explained', url: 'https://sre.google/workbook/slo-doc/', sourceName: 'Google SRE Workbook', resourceType: 'documentation', relationship: 'Defining and operating SLOs and error budgets.' },
            { title: 'Blameless postmortems', url: 'https://www.atlassian.com/incident-management/postmortem/blameless', sourceName: 'Atlassian', resourceType: 'article', relationship: 'Learning from incidents without blame.' }
          ],
          quiz: {
            prompt: 'An error budget that is nearly exhausted tells the team to…',
            options: ['Ship features faster', 'Prioritize reliability work over new features until the budget recovers', 'Increase the SLO to hide it', 'Ignore it'],
            answerIndex: 1,
            explanation: 'The error budget is the agreed allowance; overspending means reliability now takes priority.'
          }
        },
        {
          slug: 'portfolio-no-code-proof',
          title: 'Showing Backend Skill to Employers',
          minutes: 25,
          objectives: ['Create projects that demonstrate architecture and reliability', 'Write about design decisions and trade-offs', 'Present backend work credibly in interviews'],
          sections: [
            { heading: 'Projects with depth', body: 'A backend project that shows real depth has tests, migrations, observability, security and a documented architecture — not just a CRUD endpoint. Deploy it so you can name real constraints.' },
            { heading: 'Document your reasoning', body: 'Write concise READMEs and ADRs explaining why you chose the stack and how you handle failures. Employers hire judgment as much as skills; make yours visible.' },
            { heading: 'Interview evidence', body: 'Be ready to walk through a system you built: schema, concurrency, failure handling, deployment. Focus on decisions and trade-offs, not just features.' }
          ],
          links: [
            { title: 'Backend project ideas', url: 'https://roadmap.sh/backend/project-ideas', sourceName: 'roadmap.sh', resourceType: 'guide', relationship: 'Projects that demonstrate backend depth.' },
            { title: 'System design interview guidance', url: 'https://github.com/donnemartin/system-design-primer', sourceName: 'System Design Primer', resourceType: 'guide', relationship: 'Reasoning through architecture in interviews.' },
            { title: 'ADR format', url: 'https://adr.github.io/', sourceName: 'ADRs', resourceType: 'documentation', relationship: 'Recording your design decisions.' }
          ],
          quiz: {
            prompt: 'A backend project is most credible to an employer when it demonstrates…',
            options: ['Only a login form', 'Tests, deployment, security and documented architecture decisions', 'Copied boilerplate', 'A huge untested endpoint'],
            answerIndex: 1,
            explanation: 'Depth in reliability, security and reasoning signals the judgment employers hire backend engineers for.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Orders API Implementation Task',
    coverage: ['Express Routing', 'MySQL Modeling', 'Authentication', 'Validation', 'Server-Side Rules'],
    brief:
      'Specify (precisely, build-ready) a paginated Orders API: schema DDL outline, endpoint list with methods/status codes, auth rules (owner or admin roles), zod validation schemas, and how “only pending orders can be cancelled” is enforced server-side.',
    requirements: [
      'Normalized table sketch with keys and one justified index',
      'Endpoints with request/response shapes and status codes',
      'AuthZ matrix per role/action',
      'Validation schema examples for create/list',
      'Server-enforced cancellation rule with rejection code'
    ],
    expectedOutput:
      'An implementation specification another backend developer could execute without clarification.',
    rubric: [
      { skill: 'Data modeling', weight: 25, criteria: 'Sane normalization, keys, targeted indexing rationale' },
      { skill: 'API design', weight: 20, criteria: 'RESTful consistency, pagination, precise statuses' },
      { skill: 'Security', weight: 25, criteria: 'Parameterized queries stated, correct authZ boundaries, no secret leakage' },
      { skill: 'Validation', weight: 15, criteria: 'Schema-driven allowlists with field errors' },
      { skill: 'Domain rules', weight: 15, criteria: 'Rules enforced centrally server-side' }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'Library API Foundation',
      stage: 'Foundation',
      objective: 'Design and describe a small books/reviews API end-to-end before writing code.',
      requirements: ['ER model with relations', 'Endpoint table incl. pagination/filtering', 'Error envelope definition', 'Three parameterized example queries', 'Threat notes: top risks and mitigations'],
      skillsEvaluated: ['REST APIs', 'MySQL', 'API Security'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: { instructions: 'Submit the design document as specified.', textLabel: 'API design doc', minTextLength: 1000 }
    },
    {
      title: 'Secure Auth Flow Walkthrough',
      stage: 'Intermediate',
      objective: 'Produce a security review of register/login/refresh flows against OWASP checklists.',
      requirements: ['Sequence description of each flow', 'Storage choices for passwords/tokens with justification', 'Attack scenarios considered (stuffing, fixation, replay) and defenses', 'Rate limiting plan', 'What gets logged vs never logged'],
      skillsEvaluated: ['Authentication', 'Authorization', 'API Security'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: { instructions: 'Submit the security walkthrough.', textLabel: 'Security review', minTextLength: 1200, linkLabels: ['OWASP cheat sheet(s) cited'] }
    },
    {
      title: 'Reliability Hardening Plan',
      stage: 'Advanced',
      objective: 'Harden a flaky demo service: structured errors, logging with correlation ids, and a deployment pipeline.',
      requirements: ['Error taxonomy table', 'Log line schema with requestId propagation points', 'Health/readiness endpoints defined', 'CI pipeline stages listed with gates', 'Rollback strategy'],
      skillsEvaluated: ['Error Handling', 'Logging', 'Deployment'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: { instructions: 'Submit the hardening plan.', textLabel: 'Hardening plan', minTextLength: 1100 }
    }
  ],

  simTasks: [
    {
      title: 'P0: payments webhook failing',
      context: 'The payment provider reports 100% webhook rejections since this morning’s release; merchants see stale balances.',
      requirements: ['Triage hypothesis list ranked', 'Immediate mitigation (retry queue / rollback call)', 'Post-fix verification steps'],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Incident note: diagnosis path, chosen mitigation, comms draft.',
      skills: ['Debugging', 'Logging', 'Deployment']
    },
    {
      title: 'Slow report endpoint',
      context: 'The monthly revenue report times out; it scans 4M rows with three correlated subqueries.',
      requirements: ['Rewrite plan (joins/indexes/aggregation)', 'EXPLAIN-based justification', 'Cache strategy if appropriate'],
      priority: 'high',
      dueDayOffset: 4,
      expectedOutput: 'Optimization memo with before/after query plans.',
      skills: ['MySQL', 'Performance']
    },
    {
      title: 'Team API contract review',
      context: 'Mobile team requests bulk endpoint GET /orders?ids=1,2,…&fields=... — review and respond.',
      requirements: ['Assess pagination/auth implications', 'Define max ids, allowed fields allowlist', 'Document final contract'],
      priority: 'normal',
      dueDayOffset: 6,
      expectedOutput: 'Contract review reply ready to send.',
      skills: ['REST APIs', 'API Security', 'Communication']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Jonas Weber',
      personaRole: 'Frontend Lead',
      situation: 'Breaking-change negotiation.',
      openingMessage:
        'We’re shipping Tuesday using /v1/users shape. If you rename `email` to `primary_email` now we break staging. Can the rename wait for v2? What’s driving it?',
      expectedPoints: ['Explains motivation honestly', 'Proposes compatible interim approach', 'Commits to versioned timeline', 'Confirms written contract update']
    },
    {
      kind: 'team',
      personaName: 'Mei Tanaka',
      personaRole: 'QA Engineer',
      situation: 'Test environment instability.',
      openingMessage:
        'Staging DB resets randomly mid-suite and my auth tests fail intermittently. Logs show connection resets. Can we look together? I suspect migrations racing the seeder.',
      expectedPoints: ['Engages collaboratively on reproduction steps', 'Checks migration/seeding ordering hypothesis', 'Proposes deterministic env setup', 'Documents fix for future runs']
    },
    {
      kind: 'client',
      personaName: 'Victor Almeida',
      personaRole: 'CTO, CartFlow',
      situation: 'Client demands direct database access.',
      openingMessage:
        'Our analysts want read access straight to your production MySQL. Simplest for everyone, right? Just send credentials.',
      expectedPoints: ['Declines prod credentials politely but firmly', 'Offers alternatives: read replica, nightly export, reporting API', 'Cites security/data-protection reasoning briefly', 'Provides next step and owner']
    },
    {
      kind: 'client',
      personaName: 'Hannah Cole',
      personaRole: 'Product Manager, BrightCart',
      situation: 'Deadline pressure vs quality gate.',
      openingMessage:
        'Board demo Monday. Can we skip the remaining auth tests and launch Friday? We’ll add them next sprint, promise.',
      expectedPoints: ['Explains concrete risk of skipping security tests', 'Offers risk-based compromise (demo behind feature flag)', 'Keeps tone solution-focused', 'Documents agreed trade-off']
    }
  ],

  workplaceScenarios: [
    {
      category: 'Incident',
      situation: 'Monday 09:00: monitoring alerts 5xx spike. Cause unknown. Support queue filling; CEO tweets about it.',
      requiredActions: [
        { action: 'Declare incident, assign roles (comms/investigation) even informally', good: true, note: 'Structure beats heroic improvisation.' },
        { action: 'Check recent deploys/migrations first — most incidents correlate with change', good: true, note: 'Fastest high-probability lead.' },
        { action: 'Announce “investigating” publicly before root cause is known', good: true, note: 'Early honest comms reduce pressure.' },
        { action: 'Wait silently until fully fixed before saying anything externally', good: false, note: 'Silence reads as indifference during outages.' }
      ]
    },
    {
      category: 'Quality dispute',
      situation: 'A teammate merged directly to main bypassing review because “it was a tiny fix”. It broke staging auth tests.',
      requiredActions: [
        { action: 'Fix forward quickly and restore green builds', good: true, note: 'System health precedes process debate.' },
        { action: 'Blame the person publicly in channel', good: false, note: 'Shaming kills psychological safety and honesty.' },
        { action: 'Raise branch protection/review policy with team lead constructively', good: true, note: 'Fix systems, not scapegoats.' },
        { action: 'Add the missed test case covering the regression', good: true, note: 'Converts incident into durable protection.' }
      ]
    }
  ],

  interviewQuestions: [
    { dimension: 'technical_knowledge', prompt: 'Walk me through what happens from HTTP request hitting Express to MySQL row update.', guidancePoints: ['Middleware chain', 'Controller/service/repository split', 'Parameterized execution', 'Response/error path'] },
    { dimension: 'technical_knowledge', prompt: 'How would you store and verify passwords? Defend the choice.', guidancePoints: ['Argon2id/bcrypt reasoning', 'Salts and tuning', 'Constant-time comparison', 'Rate limiting complement'] },
    { dimension: 'problem_solving', prompt: 'API latency jumped from 80ms to 900ms after a release. Investigate.', guidancePoints: ['Diff recent changes', 'Check N+1 queries/missing indexes', 'Measure with tracing/EXPLAIN', 'Rollback criteria'] },
    { dimension: 'problem_solving', prompt: 'Design rate limiting for a public login endpoint.', guidancePoints: ['Keying by IP+account', 'Sliding window/token bucket', 'Progressive lockout interplay', 'Bypass/fairness considerations'] },
    { dimension: 'professional_reasoning', prompt: 'A senior insists on storing session tokens unhashed in the DB “for debugging”. React.', guidancePoints: ['Risk articulation', 'Alternative debugging means (correlation ids)', 'Escalation path', 'Respectful firmness'] },
    { dimension: 'professional_reasoning', prompt: 'When would you choose a background job over doing work inline?', guidancePoints: ['Latency sensitivity', 'Retry/idempotency needs', 'Failure isolation', 'Queue observability'] },
    { dimension: 'communication', prompt: 'Explain why wildcard CORS with credentials is dangerous to a PM pushing for it.', guidancePoints: ['Plain-language attack scenario', 'Browser behavior fact', 'Safe alternative offered'] },
    { dimension: 'communication', prompt: 'You find your own PR caused yesterday’s incident. Tell the team.', guidancePoints: ['Prompt disclosure', 'Focus on remediation', 'Blameless framing', 'Process improvement proposal'] }

  ]

}
