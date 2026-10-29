import type { CareerDef } from '../framework.js'

export const nodejsDeveloper: CareerDef = {
  slug: 'nodejs-developer',
  name: 'Node.js Developer',
  category: 'Development',
  order: 6,
  description:
    'Builds services and APIs on the Node.js runtime — modules, async programming, Express, security and deployment.',
  difficulty: 'Intermediate',
  pathSummary:
    'Node.js runtime & event loop → modules, npm & async patterns → Express routing & middleware → databases & ORMs → security & OWASP defenses → performance & testing → containerized deployment → backend architecture at scale.',
  mainSkills: ['Node.js', 'Express.js', 'npm', 'REST APIs', 'Async Programming', 'API Security', 'Testing', 'Docker & Deployment'],
  sourcePlatforms: ['Node.js Documentation', 'Express Documentation', 'npm Documentation', 'MDN Web Docs', 'OWASP', 'GitHub Documentation'],
  companyName: 'Velocity Stack',
  roleTitle: 'Node.js Developer',

  chapters: [
    {
      slug: 'nodejs-runtime-core',
      stage: 'Beginner',
      title: 'Node.js Runtime Core',
      description: 'How Node executes JavaScript and how to organize code with modules and npm.',
      topics: [
        {
          slug: 'event-loop-and-async',
          title: 'Event Loop & Asynchronous Programming',
          minutes: 30,
          objectives: ['Explain the phases of the Node.js event loop', 'Distinguish callbacks, promises and async/await', 'Identify and avoid blocking the loop'],
          sections: [
            { heading: 'The single-threaded model', body: 'Node handles I/O concurrency on a single thread by delegating blocking operations to the OS libuv pool. While one request waits on disk or network, the loop processes other events. CPU-bound work, however, stalls every concurrent request — offload it to worker threads or a separate service.' },
            { heading: 'Event loop phases', body: 'The loop ticks through timers, pending I/O callbacks, idle/prepare, poll, check and close callbacks. process.nextTick and microtasks (Promise continuations) run between phases, starving lower-priority work if they queue endlessly. Understanding this ordering prevents subtle timing bugs.' },
            { heading: 'Promises and async/await', body: 'Promises represent future values; async/await makes consuming them synchronous-looking while remaining non-blocking. Every await is a suspension point — sequential awaits are fine for dependent work, but independent calls should run concurrently with Promise.all. Unhandled rejections crash in recent Node versions; always catch.' }
          ],
          links: [
            { title: 'The Node.js event loop', url: 'https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nextticks', sourceName: 'Node.js Documentation', resourceType: 'guide', relationship: 'Authoritative event-loop explanation.' },
            { title: 'Asynchronous JavaScript overview', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous', sourceName: 'MDN Web Docs', resourceType: 'course', relationship: 'Callbacks, promises and async patterns.' },
            { title: 'Using promises', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Promise semantics and error handling.' }
          ],
          quiz: {
            prompt: 'A route handler runs a 3-second synchronous cryptographic hash. What happens?',
            options: ['Node spawns a worker automatically', 'The event loop blocks — every concurrent request stalls', 'Only that request is slow; others proceed', 'The hash is skipped for speed'],
            answerIndex: 1,
            explanation: 'Synchronous CPU work monopolizes the single thread. Use crypto.scrypt (async) or worker threads to avoid blocking.'
          }
        },
        {
          slug: 'modules-and-npm',
          title: 'Modules, package.json & npm',
          minutes: 28,
          objectives: ['Structure code with CommonJS and ES modules', 'Manage dependencies with package.json and lockfiles', 'Write useful npm scripts and understand semantic versioning'],
          sections: [
            { heading: 'Module systems', body: 'CommonJS (require/module.exports) was Node original; ES modules (import/export) are the standard going forward. Mixing them in one package causes confusion — pick one per project and configure type: "module" explicitly. Named exports enable tree-shaking; default exports suit single-responsibility files.' },
            { heading: 'package.json anatomy', body: 'The manifest declares name, version, scripts, dependencies and engines. dependencies are runtime-required; devDependencies are test/build-only. The lockfile (package-lock.json) pins the entire tree for reproducible installs — commit it always and never edit by hand.' },
            { heading: 'Semantic versioning', body: 'SemVer (MAJOR.MINOR.PATCH) communicates breaking-change risk. Caret ranges (^1.2.3) allow patches and features; tilde (~1.2.3) allows only patches. Run npm outdated regularly; update deliberately with npm update or npx npm-check-updates. Breaking upgrades deserve a PR, not an autopilot merge.' }
          ],
          links: [
            { title: 'Node.js modules guide', url: 'https://nodejs.org/api/modules.html', sourceName: 'Node.js Documentation', resourceType: 'reference', relationship: 'Official module system documentation.' },
            { title: 'npm docs: package.json', url: 'https://docs.npmjs.com/cli/v10/configuring-npm/package-json', sourceName: 'npm Documentation', resourceType: 'documentation', relationship: 'Package manifest reference.' },
            { title: 'npm semver calculator', url: 'https://semver.npmjs.com/', sourceName: 'npm Documentation', resourceType: 'reference', relationship: 'Visual semver range tester.' }
          ],
          quiz: {
            prompt: 'A teammate commits only package.json without package-lock.json. What risk does that introduce?',
            options: ['No risk, npm resolves correctly', 'Different developers may install different transitive versions', 'Faster installs', 'The project becomes CommonJS'],
            answerIndex: 1,
            explanation: 'Without a lockfile, semver ranges resolve differently over time, producing non-reproducible dependency trees.'
          }
        },
        {
          slug: 'nodejs-core-apis',
          title: 'Node Core APIs: fs, path, streams',
          minutes: 30,
          objectives: ['Read and write files with callbacks, promises and streams', 'Join and manipulate platform-independent paths', 'Process stdin/stdout for CLI tools'],
          sections: [
            { heading: 'File system access', body: 'fs/promises provides async file operations (readFile, writeFile, mkdir). Always handle errors — file not found is EACCES, not a mystery. Use recursive: true for nested directories. Prefer async methods to avoid blocking the loop; sync variants exist for one-off scripts only.' },
            { heading: 'Path manipulation', body: 'path.join and path.resolve handle OS differences in separators and root resolution. Use path.extname to inspect file types and path.parse for structured breakdowns. Never concatenate paths with string interpolation — it breaks across platforms.' },
            { heading: 'Streams for large data', body: 'fs.createReadStream and fs.createWriteStream process files in chunks, keeping memory flat regardless of file size. Pipe streams together (readable.pipe(transform).pipe(writable)) for compression or transformation. Handle errors on every stream in the pipeline, not just the first.' }
          ],
          links: [
            { title: 'File system docs', url: 'https://nodejs.org/api/fs.html', sourceName: 'Node.js Documentation', resourceType: 'reference', relationship: 'Official fs module reference.' },
            { title: 'Path module docs', url: 'https://nodejs.org/api/path.html', sourceName: 'Node.js Documentation', resourceType: 'reference', relationship: 'Path utility reference.' },
            { title: 'Stream handbook', url: 'https://nodejs.org/docs/latest-v22.x/api/stream.html', sourceName: 'Node.js Documentation', resourceType: 'reference', relationship: 'Streams API and piping.' }
          ],
          quiz: {
            prompt: 'Reading a 2 GB log file with fs.readFile is problematic because…',
            options: ['The file is too large for the OS', 'It buffers the entire file into memory, potentially exhausting the heap', 'fs.readFile cannot handle text files', 'It only works on Linux'],
            answerIndex: 1,
            explanation: 'readFile loads the full content into a Buffer. Use createReadStream to process large files in memory-efficient chunks.'
          }
        }
      ]
    },
    {
      slug: 'express-and-middleware',
      stage: 'Foundation',
      title: 'Express, Middleware & Database Access',
      description: 'Building HTTP services with Express and connecting to databases through ORMs.',
      topics: [
        {
          slug: 'express-routing',
          title: 'Express Routing & Middleware Pipeline',
          minutes: 30,
          objectives: ['Structure route modules per resource', 'Compose reusable middleware for cross-cutting concerns', 'Handle errors centrally with typed responses'],
          sections: [
            { heading: 'Router composition', body: 'Express.Router() creates isolated routers per domain (users, orders, products). Mount them under prefixes in app.ts so the entry file stays clean. Route params (:id) capture identifiers; chain .route() for shared-path CRUD to avoid repetition.' },
            { heading: 'Middleware ordering', body: 'Requests traverse middleware in registration order: logging → body parsing → CORS → auth → validation → route handler. Each middleware either calls next() or sends a response. Never place auth after your routes.' },
            { heading: 'Central error handler', body: 'A four-argument function (err, req, res, next) registered last catches all errors forwarded via next(err). Map known error types to status codes, log stack traces server-side, and return sanitized JSON to clients. Custom AppError classes make this clean.' }
          ],
          links: [
            { title: 'Express routing guide', url: 'https://expressjs.com/en/guide/routing.html', sourceName: 'Express Documentation', resourceType: 'documentation', relationship: 'Official routing reference.' },
            { title: 'Using middleware', url: 'https://expressjs.com/en/guide/using-middleware.html', sourceName: 'Express Documentation', resourceType: 'documentation', relationship: 'Middleware mechanics and creation.' },
            { title: 'Error handling guide', url: 'https://expressjs.com/en/guide/error-handling.html', sourceName: 'Express Documentation', resourceType: 'documentation', relationship: 'Canonical error-handling middleware pattern.' }
          ],
          quiz: {
            prompt: 'Where should request-body validation execute in the middleware chain?',
            options: ['Inside each route handler', 'After auth, before the route handler', 'In the database layer', 'Client-side only'],
            answerIndex: 1,
            explanation: 'Validate after auth (so unauthenticated requests are rejected cheaply) and before the handler (so business logic receives clean data).'
          }
        },
        {
          slug: 'http-concepts-for-node',
          title: 'HTTP Concepts for Node Developers',
          minutes: 28,
          objectives: ['Explain request/response lifecycle in Node', 'Use status codes and headers intentionally', 'Handle streaming request and response bodies'],
          sections: [
            { heading: 'Incoming requests', body: 'req is a readable stream with metadata: method, url, headers and params. Body parsing (express.json, express.urlencoded) accumulates the stream into req.body. For large uploads, use multer or busboy to stream to disk instead of buffering in memory.' },
            { heading: 'Outgoing responses', body: 'res is a writable stream. Set status and headers before the first res.write or res.end. Content-Type tells the client how to interpret the body; Content-Length enables progress. Never call res.send twice — it throws.' },
            { heading: 'Status codes as contracts', body: '2xx means success, 4xx means caller error, 5xx means server fault. Precise codes (409 Conflict, 422 Unprocessable, 429 Too Many Requests) communicate better than a generic 400. Status codes are part of your API surface — treat them as stable.' }
          ],
          links: [
            { title: 'HTTP overview', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Protocol fundamentals.' },
            { title: 'HTTP status codes', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'Complete status code catalog.' },
            { title: 'Express res API', url: 'https://expressjs.com/en/5x/api.html', sourceName: 'Express Documentation', resourceType: 'reference', relationship: 'Response methods reference.' }
          ],
          quiz: {
            prompt: 'A client sends a request with an unsupported Content-Type header. The correct response is…',
            options: ['200 with a warning body', '415 Unsupported Media Type', '500 Internal Server Error', '204 No Content'],
            answerIndex: 1,
            explanation: '415 signals the server refuses to process the request because the content type is unacceptable.'
          }
        },
        {
          slug: 'databases-and-orms',
          title: 'Database Access with ORMs',
          minutes: 30,
          objectives: ['Connect to a database from a Node application', 'Define schemas and run migrations', 'Write parameterized queries and understand N+1 problems'],
          sections: [
            { heading: 'Connection management', body: 'Database connections are expensive to create. Use a connection pool (pg-pool, mysql2 pool, or Prisma connection management) and reuse it for the application lifetime. Close the pool on shutdown to drain connections cleanly.' },
            { heading: 'ORM vs raw queries', body: 'Prisma, TypeORM and Sequelize generate parameterized queries, handle migrations and provide type-safe APIs. They save boilerplate but can hide inefficient queries. Understand what SQL they emit — explain logs in development to build intuition.' },
            { heading: 'N+1 and eager loading', body: 'A list endpoint that fires one query per row to fetch a relation is an N+1 problem. Use include/join (Prisma include, Sequelize eager loading, Knex join) to fetch related data in one or two queries. Monitor with logging and fix proactively.' }
          ],
          links: [
            { title: 'Prisma getting started', url: 'https://www.prisma.io/docs/getting-started', sourceName: 'Prisma', resourceType: 'documentation', relationship: 'ORM setup and schema definition.' },
            { title: 'mysql2 documentation', url: 'https://sidorares.github.io/node-mysql2/docs', sourceName: 'npm Documentation', resourceType: 'documentation', relationship: 'MySQL driver with promise support.' },
            { title: 'Knex query builder', url: 'https://knexjs.org/guide/', sourceName: 'Knex.js', resourceType: 'documentation', relationship: 'SQL query builder and migration tool.' }
          ],
          quiz: {
            prompt: 'Fetching 100 users and then their profiles in a loop results in…',
            options: ['A single optimized query', '101 queries — one for users plus one per profile (N+1)', 'An ORM compilation error', 'Automatic batching'],
            answerIndex: 1,
            explanation: 'Without eager loading, each relation lookup is a separate query. Use include or JOIN to batch them.'
          }
        }
      ]
    },
    {
      slug: 'security-and-quality',
      stage: 'Intermediate',
      title: 'Security, Validation & Testing',
      description: 'Hardening Node services against the OWASP Top 10 and validating quality with automated tests.',
      topics: [
        {
          slug: 'input-validation-and-sanitization',
          title: 'Input Validation & Sanitization',
          minutes: 30,
          objectives: ['Validate request bodies with schema libraries', 'Prevent injection attacks at the application boundary', 'Sanitize output to prevent XSS in JSON responses'],
          sections: [
            { heading: 'Schema-driven validation', body: 'Libraries like Zod, Joi or Yup define explicit shapes for query params, body and path params. Reject unknown fields, enforce types, lengths, ranges and enums. Return field-level errors so clients can pinpoint the problem. Validate before any business logic runs.' },
            { heading: 'Injection prevention', body: 'SQL injection is prevented by parameterized queries, not string escaping. NoSQL injection (MongoDB operators in user input) is prevented by type-checking inputs. Command injection happens when user data reaches exec/spawn — never pass unsanitized input to shell commands.' },
            { heading: 'Output encoding', body: 'Even server-side JSON responses can carry XSS if the client renders them as HTML. Sanitize user-supplied strings before embedding in any markup context. Use a library like DOMPurify on the client side; on the server, validate that content is safe for its consumption context.' }
          ],
          links: [
            { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', sourceName: 'OWASP', resourceType: 'reference', relationship: 'The canonical web risk catalog.' },
            { title: 'Input validation cheat sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'checklist', relationship: 'Validation strategy specifics.' },
            { title: 'Zod documentation', url: 'https://zod.dev/', sourceName: 'Zod', resourceType: 'documentation', relationship: 'TypeScript-first schema validation.' }
          ],
          quiz: {
            prompt: 'The safest defense against SQL injection is…',
            options: ['Escaping single quotes manually', 'Parameterized queries / prepared statements', 'Limiting database permissions only', 'Using a stored procedure'],
            answerIndex: 1,
            explanation: 'Parameterization separates SQL structure from data at the protocol level — escaping is bypassable and stored procedures are not immune.'
          }
        },
        {
          slug: 'authentication-and-secrets',
          title: 'Authentication, Authorization & Secrets',
          minutes: 30,
          objectives: ['Implement JWT or session-based auth flows', 'Enforce authorization per resource server-side', 'Manage secrets with environment variables and vaults'],
          sections: [
            { heading: 'Auth strategy selection', body: 'Stateless JWTs scale easily but require token revocation workarounds (short-lived access + refresh rotation). Session cookies (express-session) are simpler for same-origin SPAs but need session stores for horizontal scaling. Choose based on your architecture, not trends.' },
            { heading: 'Authorization server-side', body: 'Authentication proves identity; authorization checks permissions. Enforce every access decision against ownership or roles on the server. Client-side route guards are UX, not security — API endpoints are directly callable regardless of what the UI hides.' },
            { heading: 'Secrets hygiene', body: 'Never commit secrets to version control. Use .env files locally (gitignored), environment variables in CI, and managed secret stores (Vault, AWS Secrets Manager) in production. Rotate credentials periodically and scope database users to the minimum required operations.' }
          ],
          links: [
            { title: 'Authentication cheat sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'checklist', relationship: 'Credential and session best practices.' },
            { title: 'Authorization cheat sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'checklist', relationship: 'Server-side permission enforcement.' },
            { title: 'Managing secrets in Node.js', url: 'https://nodejs.org/en/learn/gutorials/diagnostics/permissions', sourceName: 'Node.js Documentation', resourceType: 'guide', relationship: 'Environment variable and secrets patterns.' }
          ],
          quiz: {
            prompt: 'You must revoke a compromised JWT access token immediately. The fastest reliable approach is…',
            options: ['Delete it from the client', 'Wait for it to expire naturally', 'Use short-lived tokens with a server-side refresh token store you can invalidate', 'Change the signing key for everyone'],
            answerIndex: 2,
            explanation: 'Short-lived access tokens limit the exposure window; invalidating the refresh token prevents reissue.'
          }
        },
        {
          slug: 'automated-testing',
          title: 'Testing Node.js Applications',
          minutes: 30,
          objectives: ['Unit-test service logic with mocked dependencies', 'Integration-test endpoints against a real database', 'Write E2E tests for critical user flows'],
          sections: [
            { heading: 'Unit testing services', body: 'Test business logic in isolation by injecting mock repositories or HTTP clients. Mocks verify interactions; assertions verify outcomes. Keep unit tests fast and deterministic — they run on every commit.' },
            { heading: 'Integration testing APIs', body: 'Boot the Express app against an ephemeral database, seed test data, and hit real endpoints. Assert status codes, response shapes and side effects (database state). Use supertest for clean HTTP assertions in Node.' },
            { heading: 'E2E and CI', body: 'End-to-end tests exercise the full stack including external services (or fakes). Reserve them for critical paths: registration, checkout, payment. Run the full suite in CI; gate deploys on green builds. Flaky tests erode trust — fix or quarantine them promptly.' }
          ],
          links: [
            { title: 'Node.js test runner', url: 'https://nodejs.org/api/test.html', sourceName: 'Node.js Documentation', resourceType: 'reference', relationship: 'Built-in test runner and assertions.' },
            { title: 'Vitest getting started', url: 'https://vitest.dev/guide/', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'Fast Vite-native test runner.' },
            { title: 'Supertest documentation', url: 'https://github.com/ladjs/supertest', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'HTTP assertion library for Express testing.' }
          ],
          quiz: {
            prompt: 'A test calls the database, an external API and a file system path. This is a…',
            options: ['Pure unit test', 'Integration or E2E test (depends on scope)', 'Performance test', 'Static analysis check'],
            answerIndex: 1,
            explanation: 'Tests that touch real infrastructure are integration or E2E tests. Unit tests mock external boundaries.'
          }
        }
      ]
    },
    {
      slug: 'performance-and-deployment',
      stage: 'Advanced',
      title: 'Performance, Deployment & Architecture',
      description: 'Optimizing Node services and shipping them reliably to production.',
      topics: [
        {
          slug: 'performance-profiling',
          title: 'Profiling & Performance Optimization',
          minutes: 30,
          objectives: ['Profile CPU and memory usage with Node diagnostic tools', 'Identify and fix common performance bottlenecks', 'Apply caching and connection pooling strategically'],
          sections: [
            { heading: 'Profiling tools', body: '--prof generates V8 CPU profiles you can visualize with clinic.js or speedscope. clinic doctor diagnoses event-loop delay, CPU flame graphs and memory leaks. Node --inspect enables Chrome DevTools debugging remotely. Profile before optimizing — guesswork wastes effort.' },
            { heading: 'Common bottlenecks', body: 'N+1 database queries are the most frequent API performance killer. Synchronous file I/O in handlers blocks the loop. Large JSON payloads without streaming exhaust memory. Redundant computations per request add up under load. Measure, identify the biggest offender, fix, repeat.' },
            { heading: 'Caching and pooling', body: 'Use in-process caches (LRU-cache) for hot read-heavy data with sensible TTLs. HTTP caching (ETag, Cache-Control) reduces network overhead. Connection pooling eliminates handshake latency for databases and HTTP clients. Reuse pool instances across the application lifetime.' }
          ],
          links: [
            { title: 'Diagnostics documentation', url: 'https://nodejs.org/en/learn/diagnostics/getting-started', sourceName: 'Node.js Documentation', resourceType: 'guide', relationship: 'Official profiling and diagnostic workflows.' },
            { title: 'Clinic.js documentation', url: 'https://clinicjs.org/documentation/', sourceName: 'Clinic.js', resourceType: 'documentation', relationship: 'Node.js performance profiling tools.' },
            { title: 'HTTP caching fundamentals', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Cache-Control and ETag semantics.' }
          ],
          quiz: {
            prompt: 'clinic doctor shows 200ms event-loop delay under moderate load. Most likely cause?',
            options: ['Too many console.log calls', 'Synchronous or CPU-heavy work on the main thread', 'Insufficient RAM', 'DNS resolution delay'],
            answerIndex: 1,
            explanation: 'Event-loop delay measures main-thread blocking. Synchronous work (crypto, parsing, file I/O without streams) is the primary suspect.'
          }
        },
        {
          slug: 'containerized-deployment',
          title: 'Docker, CI/CD & Production Deployment',
          minutes: 30,
          objectives: ['Write production-ready Dockerfiles for Node apps', 'Configure health checks and graceful shutdown', 'Set up a CI/CD pipeline for automated deploys'],
          sections: [
            { heading: 'Dockerfile best practices', body: 'Use multi-stage builds: install dev dependencies in a build stage, copy only production artifacts. Pin base images by digest, use node:20-alpine for small images, and run as non-root. Layer package.json before source code to leverage Docker cache on code-only changes.' },
            { heading: 'Production process management', body: 'Run with --max-old-space-size to cap heap. Handle SIGTERM for graceful shutdown: finish in-flight requests, close database pools, then exit. Expose /health (liveness) and /ready (readiness) endpoints for orchestrators. Log to stdout so container runtimes capture it.' },
            { heading: 'CI/CD pipeline', body: 'Pipeline stages: lint → typecheck → unit test → integration test → build → deploy. Gate each stage on the previous. Deploy with blue-green or canary strategies to limit blast radius. Roll back by redeploying the previous image — if you cannot rollback in minutes, your deploy process is not ready.' }
          ],
          links: [
            { title: 'Dockerfile reference', url: 'https://docs.docker.com/engine/reference/builder/', sourceName: 'Docker', resourceType: 'documentation', relationship: 'Official Dockerfile syntax.' },
            { title: 'GitHub Actions docs', url: 'https://docs.github.com/en/actions', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'CI/CD pipeline implementation.' },
            { title: 'Node.js production best practices', url: 'https://nodejs.org/en/learn/production', sourceName: 'Node.js Documentation', resourceType: 'guide', relationship: 'Official production deployment guidance.' }
          ],
          quiz: {
            prompt: 'A Dockerfile copies the entire source tree before running npm install. What problem does this cause?',
            options: ['No problem, it is standard', 'Every code change invalidates the npm install cache layer', 'npm fails on large trees', 'Docker ignores the cache for Node.js'],
            answerIndex: 1,
            explanation: 'Docker caches layers sequentially. Copy package files first, install, then copy source — so code changes reuse the cached install layer.'
          }
        },
        {
          slug: 'backend-architecture-patterns',
          title: 'Node.js Architecture Patterns',
          minutes: 30,
          objectives: ['Layer applications to isolate concerns', 'Design for testability and replaceability', 'Handle cross-cutting concerns with middleware and dependency injection'],
          sections: [
            { heading: 'Layered architecture', body: 'Routes translate HTTP, controllers orchestrate flows, services hold business rules, repositories own persistence. Dependencies point inward — swapping Express or the database touches edges only. This separation makes refactoring safe and tests targeted.' },
            { heading: 'Dependency injection', body: 'Pass dependencies (database clients, email services, logger) into constructors or factory functions instead of importing singletons. This makes swapping implementations trivial in tests and different environments. Simple manual DI beats heavy frameworks for most projects.' },
            { heading: 'Graceful degradation', body: 'Design services that degrade under partial failure: serve cached data when the database lags, queue emails when the mailer is down, return partial results when a downstream is slow. Circuit breakers prevent cascading failures by failing fast after repeated errors.' }
          ],
          links: [
            { title: 'Express application structure', url: 'https://expressjs.com/en/starter/examples.html', sourceName: 'Express Documentation', resourceType: 'documentation', relationship: 'Structural patterns in real applications.' },
            { title: 'Node.js design patterns', url: 'https://www.nodejsdesignpatterns.com/', sourceName: 'Node.js Design Patterns', resourceType: 'guide', relationship: 'Proven patterns for Node.js applications.' },
            { title: '12 Factor App', url: 'https://12factor.net/', sourceName: '12 Factor', resourceType: 'documentation', relationship: 'Principles for cloud-native, maintainable apps.' }
          ],
          quiz: {
            prompt: 'Business rule "only the order owner can cancel within 24 hours" belongs in…',
            options: ['The route handler', 'The service layer', 'The database trigger', 'The frontend'],
            answerIndex: 1,
            explanation: 'Services encode domain rules once where they are testable and reusable regardless of entry point (API, CLI, job).'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'RESTful Task Manager API',
    coverage: ['Express Routing', 'Middleware Pipeline', 'Authentication', 'Input Validation', 'Error Handling', 'Database Access'],
    brief:
      'Design a complete implementation plan for a Task Manager REST API: user registration/login with JWT, CRUD endpoints for tasks with ownership enforcement, pagination, input validation with Zod, structured error responses, and a health-check endpoint.',
    requirements: [
      'Database schema sketch with users and tasks tables, including keys and indexes',
      'Endpoint table with methods, paths, request/response shapes and status codes',
      'JWT auth flow: register, login, refresh, with middleware design',
      'Authorization rules: only task owners can read/update/delete their tasks',
      'Zod validation schemas for registration, login and task creation',
      'Centralized error handler with AppError class mapping'
    ],
    expectedOutput:
      'An implementation specification another Node.js developer could execute without clarification.',
    rubric: [
      { skill: 'Data modeling', weight: 20, criteria: 'Proper schema with foreign keys, timestamps, indexes and cascading rules' },
      { skill: 'API design', weight: 20, criteria: 'RESTful consistency, pagination, precise status codes and error envelopes' },
      { skill: 'Security', weight: 25, criteria: 'JWT flow correctness, server-side authorization, parameterized queries, secrets handling' },
      { skill: 'Validation', weight: 15, criteria: 'Schema-driven input validation with field-level error reporting' },
      { skill: 'Code architecture', weight: 20, criteria: 'Clean layering, dependency injection readiness, testability' }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'CLI File Processor',
      stage: 'Beginner',
      objective: 'Build a Node.js CLI that reads a CSV file, transforms rows and writes output — using streams and core modules.',
      requirements: ['Read from stdin or a file path argument', 'Stream-based processing for memory efficiency', 'Proper error handling for missing files and malformed rows', 'Output formatted JSON to stdout', 'npm script to invoke the CLI'],
      skillsEvaluated: ['Node Core APIs', 'Streams', 'Error Handling', 'npm'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: { instructions: 'Submit source code with a README explaining usage, design decisions and how to test it.', textLabel: 'CLI implementation and README', minTextLength: 800 }
    },
    {
      title: 'Express Middleware Library',
      stage: 'Intermediate',
      objective: 'Create a reusable middleware package: rate limiter, request logger and error formatter — with tests.',
      requirements: ['Rate limiter using in-memory sliding window', 'Structured request logger with correlation IDs', 'Error formatter that maps AppError subclasses to status codes', 'Unit and integration tests for each middleware', 'Published as an npm package (or simulated with package.json)'],
      skillsEvaluated: ['Express Middleware', 'Testing', 'npm Publishing', 'Error Handling'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: { instructions: 'Submit the package source, tests and a README with usage examples.', textLabel: 'Middleware package', minTextLength: 1000, linkLabels: ['npm package or GitHub repo link'] }
    },
    {
      title: 'Production Deployment Audit',
      stage: 'Advanced',
      objective: 'Audit an existing Node.js project for production readiness and produce a remediation plan.',
      requirements: ['Dockerfile review with multi-stage and security fixes', 'CI/CD pipeline assessment with improvement recommendations', 'Health check and graceful shutdown evaluation', 'Dependency audit (vulnerabilities, outdated packages)', 'Hardening checklist with prioritized action items'],
      skillsEvaluated: ['Docker', 'CI/CD', 'Security', 'Production Operations'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: { instructions: 'Submit the audit report with prioritized findings and a phased remediation plan.', textLabel: 'Production audit report', minTextLength: 1100 }
    }
  ],

  simTasks: [
    {
      title: 'P0: Memory leak in production',
      context: 'The API server RSS grows steadily from 200MB to 2GB over 6 hours after each restart, then the container is OOM-killed. Alerts fire at 1.5GB.',
      requirements: ['Identify likely causes (unreleased references, event listener leaks, cache without eviction)', 'Propose immediate mitigation (restart strategy, heap dump)', 'Outline investigation steps with profiling tools', 'Suggest long-term fixes'],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Incident note: hypothesis list, mitigation, profiling plan and fix approach.',
      skills: ['Node.js Diagnostics', 'Performance', 'Debugging']
    },
    {
      title: 'Auth bypass vulnerability report',
      context: 'A security scan flagged that the GET /api/users/:id endpoint returns any user profile regardless of the requesting user\'s identity — the ownership check was never implemented.',
      requirements: ['Specify the authorization middleware fix', 'Define the correct ownership rule', 'List affected endpoints to audit', 'Write a regression test to prevent recurrence'],
      priority: 'high',
      dueDayOffset: 3,
      expectedOutput: 'Security fix specification with code-level detail and test plan.',
      skills: ['Authentication', 'Authorization', 'Testing', 'OWASP']
    },
    {
      title: 'API versioning strategy',
      context: 'Mobile team needs breaking changes to the user profile endpoint for v2 — new field names, removed legacy fields. The web app still uses v1.',
      requirements: ['Propose versioning strategy (URL prefix vs header)', 'Define backward compatibility approach for both clients', 'Plan a deprecation timeline with communication', 'Document the migration guide for v1 consumers'],
      priority: 'normal',
      dueDayOffset: 6,
      expectedOutput: 'Versioning proposal with migration plan ready for team review.',
      skills: ['REST API Design', 'Communication', 'Versioning']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Lena Park',
      personaRole: 'DevOps Engineer',
      situation: 'Disagreement on deployment approach.',
      openingMessage:
        'I want to move the API to Kubernetes with Helm charts. You mentioned preferring simpler Docker Compose on a VM. The rest of the team is split. Can we talk through the trade-offs before the architecture review?',
      expectedPoints: ['Acknowledges DevOps perspective honestly', 'Names concrete trade-offs (complexity vs scalability)', 'Asks clarifying questions about traffic and team expertise', 'Suggests a phased approach or PoC to gather evidence']
    },
    {
      kind: 'team',
      personaName: 'Omar Farouk',
      personaRole: 'Frontend Lead',
      situation: 'API response format change request.',
      openingMessage:
        'The new search feature needs the API to return results in a different shape — nested objects instead of flat. It\'d simplify our rendering a lot, but other consumers exist. How should we handle this without breaking them?',
      expectedPoints: ['Proposes additive field approach or versioned endpoint', 'Identifies all API consumers to assess impact', 'Suggests a deprecation window with clear communication', 'Documents the contract change in shared API docs']
    },
    {
      kind: 'client',
      personaName: 'Sarah Mitchell',
      personaRole: 'CTO, NovaPay',
      situation: 'Client demands a faster delivery timeline.',
      openingMessage:
        'Our board needs this integration live in three weeks. Your estimate says six. What would it take to make three work? We can throw more people at it if that helps.',
      expectedPoints: ['Explains why adding people may not linearly speed up complex work', 'Identifies what could be scoped down for a three-week MVP', 'Offers a phased delivery plan with the most critical features first', 'Commits to clear milestones and trade-off documentation']
    },
    {
      kind: 'client',
      personaName: 'Daniel Ruiz',
      personaRole: 'Security Officer, MedData Corp',
      situation: 'Security audit finding discussion.',
      openingMessage:
        'Our penetration test flagged that your API doesn\'t rate-limit the login endpoint. They demonstrated a brute-force attempt that ran for minutes without throttling. This is a blocker for our compliance audit next week.',
      expectedPoints: ['Acknowledges the finding and takes it seriously', 'Proposes an immediate rate-limiting fix with specific thresholds', 'Explains additional hardening (account lockout, CAPTCHA, monitoring)', 'Provides a timeline and verification approach for the fix']
    }
  ],

  workplaceScenarios: [
    {
      category: 'Incident',
      situation: 'Thursday 14:00: The API response times degrade from 120ms to 3s across all endpoints. No deploy happened today. Database CPU shows 95% utilization.',
      requiredActions: [
        { action: 'Check for long-running queries or missing indexes in the database', good: true, note: 'Database CPU saturation points to query-level investigation first.' },
        { action: 'Kill the offending queries and restore service before deep-diving root cause', good: true, note: 'Mitigate first, investigate in parallel.' },
        { action: 'Blame the database team publicly in Slack', good: false, note: 'Blame damages cross-team relationships without fixing anything.' },
        { action: 'Notify stakeholders with a timeline and next update cadence', good: true, note: 'Transparent communication during incidents builds trust.' }
      ]
    },
    {
      category: 'Ethical dilemma',
      situation: 'A product manager asks you to add telemetry that tracks user keystrokes in a form field labeled "confidential notes" without adding a disclosure notice, because "the analytics team really needs it."',
      requiredActions: [
        { action: 'Decline and explain the privacy and legal implications of undisclosed tracking', good: true, note: 'Undisclosed user tracking is an ethical and legal violation.' },
        { action: 'Implement it silently to avoid conflict', good: false, note: 'Complying with unethical requests makes you complicit.' },
        { action: 'Propose an alternative: anonymized analytics with clear disclosure', good: true, note: 'Offering a better path respects both the user and the team.' },
        { action: 'Escalate to your manager if the pressure continues', good: true, note: 'Escalation is the correct path when ethical boundaries are pushed.' }
      ]
    }
  ],

  interviewQuestions: [
    { dimension: 'technical_knowledge', prompt: 'Explain the Node.js event loop phases and where process.nextTick and Promise callbacks execute relative to them.', guidancePoints: ['Timer, poll, check phases', 'Microtask queue runs between phases', 'nextTick before microtasks', 'Practical implications for ordering'] },
    { dimension: 'technical_knowledge', prompt: 'When and why would you use streams instead of readFile/writeFile?', guidancePoints: ['Memory pressure with large files', 'Backpressure handling', 'Piping transforms (compression, encryption)', 'Streaming HTTP responses'] },
    { dimension: 'problem_solving', prompt: 'Your Express API works locally but returns 502 in production behind a reverse proxy. Investigate.', guidancePoints: ['Check proxy timeout configuration', 'Look for unhandled promise rejections crashing the process', 'Verify health endpoint responsiveness', 'Inspect process manager and container logs'] },
    { dimension: 'problem_solving', prompt: 'Design a job queue for sending email newsletters to 100,000 users with rate-limited SMTP.', guidancePoints: ['Producer/consumer separation', 'Batch sizing and concurrency control', 'Idempotency for redelivery', 'Dead-letter queue for bounces and failures'] },
    { dimension: 'professional_reasoning', prompt: 'A junior developer pushes code that works but has no tests and uses callbacks instead of async/await. How do you handle this?', guidancePoints: ['Constructive feedback with specific examples', 'Pair-programming offer', 'Team convention documentation', 'Balancing mentorship with delivery pressure'] },
    { dimension: 'professional_reasoning', prompt: 'You discover a critical security vulnerability two days before a major release. What do you do?', guidancePoints: ['Assess severity and exploitation risk immediately', 'Communicate to stakeholders with clear recommendation', 'Delay release if risk is unmitigable', 'Propose a hotfix timeline with verification plan'] },
    { dimension: 'communication', prompt: 'Explain CORS and why it exists to a frontend developer who keeps asking you to just "turn it off."', guidancePoints: ['Browser same-origin policy motivation', 'How preflight requests work', 'Why disabling it opens attack vectors', 'Proper configuration with specific origins'] },
    { dimension: 'communication', prompt: 'Your API is being deprecated. Write the communication to consuming teams.', guidancePoints: ['Clear timeline with sunset date', 'Migration guide with code examples', 'Alternative endpoint documentation', 'Support channel and escalation path'] }

  ]

}
