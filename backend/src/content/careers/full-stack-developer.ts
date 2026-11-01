import type { CareerDef } from '../framework.js'

export const fullStackDeveloper: CareerDef = {
  slug: 'full-stack-developer',
  name: 'Full-Stack Developer',
  category: 'Development',
  order: 4,
  description:
    'Ships complete features across React frontends and Node/Express/MySQL backends with production-grade practices.',
  difficulty: 'Intermediate',
  pathSummary:
    'Web fundamentals & TypeScript → React frontend architecture → Node/Express APIs → MySQL data layer → auth & security → integration, testing & deployment → full-stack architecture.',
  mainSkills: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MySQL', 'REST APIs', 'Authentication', 'Git & GitHub'],
  sourcePlatforms: ['MDN Web Docs', 'React Documentation', 'TypeScript Documentation', 'Node.js Documentation', 'Express Documentation', 'MySQL Documentation', 'GitHub Documentation', 'OWASP'],
  companyName: 'Northgate Digital',
  roleTitle: 'Full-Stack Developer',

  chapters: [
    {
      slug: 'shared-foundations',
      stage: 'Beginner',
      title: 'Shared Foundations',
      description: 'The browser triad plus typed JavaScript — the base both sides of the stack stand on.',
      topics: [
        {
          slug: 'html-css-js-core',
          title: 'HTML, CSS & JavaScript Core',
          objectives: ['Structure documents semantically', 'Lay out interfaces with flex/grid', 'Program confidently in modern JS'],
          sections: [
            { heading: 'One platform, three layers', body: 'Full-stack work still lives or dies on the client basics: semantic HTML for meaning, CSS flexbox/grid for layout, JavaScript for behavior. Frameworks compile down to these — weak fundamentals surface as unexplainable bugs.' },
            { heading: 'Modern JS you will use daily', body: 'Modules, promises/async-await, destructuring, spread, array methods. These appear identically in React components and Node services, which is why they come first.' }
          ],
          links: [
            { title: 'Learn web development', url: 'https://developer.mozilla.org/en-US/docs/Learn', sourceName: 'MDN Web Docs', resourceType: 'course', relationship: 'Complete client-platform foundations.' },
            { title: 'JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Language core reference.' },
            { title: 'CSS layout tutorials', url: 'https://www.w3schools.com/css/css_grid.asp', sourceName: 'W3Schools', resourceType: 'tutorial', relationship: 'Grid/flex syntax practice.' }
          ],
          quiz: { prompt: 'async function returning 42 gives callers…', options: ['42 synchronously', 'A Promise resolving to 42', 'A callback', 'An exception'], answerIndex: 1, explanation: 'Async functions wrap return values in promises; await unwraps them.' }
        },
        {
          slug: 'typescript-for-the-stack',
          title: 'TypeScript Across the Stack',
          objectives: ['Model domain data with interfaces and unions', 'Share types between client and server', 'Configure strict projects'],
          sections: [
            { heading: 'Types as shared contract', body: 'Define Order, User and API envelopes once; import them in React components and Express handlers. A single source of truth eliminates the classic “frontend expects string, backend sends number” class of bugs.' },
            { heading: 'Pragmatic strictness', body: 'Enable strict mode; ban any in shared contracts first if nowhere else. Unions model states (“idle” | “loading” | …), generics type reusable fetchers and tables.' }
          ],
          links: [
            { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', sourceName: 'TypeScript Documentation', resourceType: 'documentation', relationship: 'Authoritative language handbook.' },
            { title: 'TS + React patterns', url: 'https://react.dev/learn/typescript', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Typing components officially.' },
            { title: 'Narrowing types', url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html', sourceName: 'TypeScript Documentation', resourceType: 'guide', relationship: 'Handling union states safely.' }
          ],
          quiz: { prompt: 'Best way to keep API response types in sync across FE/BE?', options: ['Duplicate by memory', 'Shared types module imported by both', 'any everywhere', 'Runtime guessing'], answerIndex: 1, explanation: 'A shared types package/module is the standard monorepo pattern for cross-boundary contracts.' }
        },
        {
          slug: 'git-github-flow',
          title: 'Git & GitHub Flow',
          objectives: ['Branch, commit and PR professionally', 'Review code constructively', 'Resolve conflicts calmly'],
          sections: [
            { heading: 'Feature branch workflow', body: 'main stays deployable; work happens on short-lived branches opened as pull requests. Small diffs review fast and revert safely — large ones rot.' },
            { heading: 'Reviews as teaching', body: 'Comment on code not people; ask questions before prescribing; distinguish blocking issues from nits. Being reviewable — responsive, humble, evidence-driven — accelerates teams.' }
          ],
          links: [
            { title: 'GitHub Flow', url: 'https://docs.github.com/en/get-started/using-github/github-flow', sourceName: 'GitHub Documentation', resourceType: 'guide', relationship: 'The canonical branching flow.' },
            { title: 'About PRs', url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'PR mechanics.' },
            { title: 'Resolving merge conflicts', url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'Conflict resolution procedure.' }
          ],
          quiz: { prompt: 'Healthiest PR size?', options: ['Whole feature, 2000 lines', 'Small, single-purpose slices that review quickly', 'Whatever accumulates in a month', 'Only docs changes'], answerIndex: 1, explanation: 'Review quality collapses with size; small PRs ship safer code faster.' }
        }
      ]
    },
    {
      slug: 'react-frontend-layer',
      stage: 'Foundation',
      title: 'React Frontend Layer',
      description: 'Component architecture, state management and consuming your own APIs.',
      topics: [
        {
          slug: 'components-and-state',
          title: 'Components, Props, State & Hooks',
          objectives: ['Decompose UIs into typed components', 'Manage local vs lifted state', 'Use hooks per official rules'],
          sections: [
            { heading: 'Composition discipline', body: 'Pages compose containers compose presentational pieces. Props flow down typed; events bubble up as callbacks. Hooks (useState/useEffect/useMemo) follow the rules of hooks without exception.' },
            { heading: 'Data fetching shape', body: 'Each view models request state explicitly: loading skeletons, empty results, error retries. Centralized clients add auth headers and error normalization once.' }
          ],
          links: [
            { title: 'Learn React', url: 'https://react.dev/learn', sourceName: 'React Documentation', resourceType: 'course', relationship: 'Official learning path.' },
            { title: 'Managing state', url: 'https://react.dev/learn/managing-state', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'State placement patterns.' },
            { title: 'Hooks reference', url: 'https://react.dev/reference/react/hooks', sourceName: 'React Documentation', resourceType: 'reference', relationship: 'Hook API details.' }
          ],
          quiz: { prompt: 'Rules of hooks require…', options: ['Calling hooks inside conditions when convenient', 'Top-level calls in same order every render', 'One hook per component', 'Class components'], answerIndex: 1, explanation: 'React maps hook state positionally; conditional calls corrupt that mapping.' }
        },
        {
          slug: 'frontend-architecture',
          title: 'Frontend Architecture',
          objectives: ['Organize features-first folder structures', 'Split bundles by route', 'Handle errors with boundaries'],
          sections: [
            { heading: 'Feature modules', body: 'Group by feature (orders/, billing/) with colocated components/hooks/api files rather than global type-dumps. Cross-feature imports go through public barrels only.' },
            { heading: 'Loading strategy', body: 'Lazy-load routes so the initial payload covers login + shell only. Suspense boundaries pair with error boundaries so failures degrade gracefully per section, never blanking the app.' }
          ],
          links: [
            { title: 'Code splitting (React lazy)', url: 'https://react.dev/reference/react/lazy', sourceName: 'React Documentation', resourceType: 'reference', relationship: 'Route-level splitting mechanics.' },
            { title: 'Error boundaries guidance', url: 'https://react.dev/errors/boundary?file=src/App.tsx', sourceName: 'React Documentation', resourceType: 'guide', relationship: 'Containing render errors.' },
            { title: 'Vite build guide', url: 'https://vite.dev/guide/build.html', sourceName: 'Vite Documentation', resourceType: 'documentation', relationship: 'Bundling configuration.' }
          ],
          quiz: { prompt: 'Error boundaries primarily prevent…', options: ['Slow networks', 'One component’s render error from unmounting the whole tree', 'CSS conflicts', 'CORS errors'], answerIndex: 1, explanation: 'Boundaries catch render-time exceptions in their children and render fallbacks instead.' }
        },
        {
          slug: 'consuming-rest-apis',
          title: 'Consuming REST APIs',
          objectives: ['Build typed API clients with interceptors', 'Model all request states', 'Optimistically update where safe'],
          sections: [
            { heading: 'Client seam', body: 'One module owns baseURL, token attach/refresh and error mapping. Components consume domain functions (getOrders), never raw fetch — swapping transports later touches one file.' },
            { heading: 'Optimistic updates', body: 'Apply local change immediately, reconcile on server response, roll back on failure with user-visible feedback. Reserve optimism for low-collision actions with clear undo paths.' }
          ],
          links: [
            { title: 'Fetch API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Transport layer reference.' },
            { title: 'HTTP status codes', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'Interpreting backend responses correctly.' },
            { title: 'Synchronizing with effects', url: 'https://react.dev/learn/synchronizing-with-effects', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Fetching patterns within React.’s model.' }
          ],
          quiz: { prompt: '401 received mid-session most likely requires…', options: ['Retrying forever silently', 'Refreshing tokens via the auth flow then replaying the request once', 'Logging the user out immediately always', 'Ignoring'], answerIndex: 1, explanation: 'Standard refresh-token flows rotate credentials and replay failed requests exactly once.' }
        }
      ]
    },
    {
      slug: 'node-backend-layer',
      stage: 'Intermediate',
      title: 'Node & Express Backend Layer',
      description: 'APIs, business logic and the MySQL data layer behind them.',
      topics: [
        {
          slug: 'express-api-build',
          title: 'Express REST Implementation',
          objectives: ['Wire routers/middleware/validation', 'Return consistent envelopes and statuses', 'Keep controllers thin'],
          sections: [
            { heading: 'Pipeline consistency', body: 'request-context → rate limit → authenticate → validate(zod) → handler → central error middleware. Handlers call services and map results to HTTP; no SQL or business rules inline.' },
            { heading: 'Response contracts', body: 'Every endpoint returns {success, data|error} envelopes with stable error codes. Frontends coded against contracts stop breaking on cosmetic backend edits.' }
          ],
          links: [
            { title: 'Express routing', url: 'https://expressjs.com/en/guide/routing.html', sourceName: 'Express Documentation', resourceType: 'documentation', relationship: 'Routing reference.' },
            { title: 'Using middleware', url: 'https://expressjs.com/en/guide/using-middleware.html', sourceName: 'Express Documentation', resourceType: 'documentation', relationship: 'Middleware ordering.' },
            { title: 'Node.js guides', url: 'https://nodejs.org/en/learn', sourceName: 'Node.js Documentation', resourceType: 'course', relationship: 'Runtime idioms.' }
          ],
          quiz: { prompt: 'Controller responsibilities should include…', options: ['SQL queries', 'HTTP concerns only — parse input, call service, shape response', 'Business rules', 'CSS'], answerIndex: 1, explanation: 'Thin controllers keep HTTP swappable and services testable without servers.' }
        },
        {
          slug: 'mysql-integration',
          title: 'MySQL Data Layer Integration',
          objectives: ['Design schemas for features end-to-end', 'Query through parameterized repositories', 'Migrate safely'],
          sections: [
            { heading: 'Schema-first thinking', body: 'Sketch entities/relations before endpoints; the data model outlives frameworks. Use migrations (versioned, reversible) so every environment converges identically.' },
            { heading: 'Repository isolation', body: 'Services ask repositories for data; repositories own SQL/ORM calls. Tests fake repositories to exercise rules instantly without databases.' }
          ],
          links: [
            { title: 'MySQL tutorial', url: 'https://dev.mysql.com/doc/refman/8.0/en/tutorial.html', sourceName: 'MySQL Documentation', resourceType: 'tutorial', relationship: 'Official SQL grounding.' },
            { title: 'CREATE TABLE / schema', url: 'https://dev.mysql.com/doc/refman/8.0/en/create-table.html', sourceName: 'MySQL Documentation', resourceType: 'reference', relationship: 'DDL specifics.' },
            { title: 'SQL injection prevention', url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'checklist', relationship: 'Parameterization requirements.' }
          ],
          quiz: { prompt: 'Why do repositories exist as a layer?', options: ['To slow things down', 'Isolate persistence details so business logic stays framework/database agnostic', 'Required by Express', 'For CSS organization'], answerIndex: 1, explanation: 'Repository seams enable unit testing and storage swaps without touching domain rules.' }
        },
        {
          slug: 'auth-security-stack',
          title: 'Authentication & Security End-to-End',
          objectives: ['Implement register/login/refresh securely', 'Authorize ownership on every resource', 'Harden headers, CORS and inputs'],
          sections: [
            { heading: 'Flow ownership', body: 'Argon2id hashing, rotation-based refresh sessions stored hashed, HttpOnly cookies scoped to /auth, CSRF protection on cookie-authenticated mutations. Reuse these defaults verbatim across projects.' },
            { heading: 'Per-resource authorization', body: 'Every query includes userId scoping or explicit role checks. “The frontend hides the button” is not authorization — direct API calls are trivial.' }
          ],
          links: [
            { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', sourceName: 'OWASP', resourceType: 'reference', relationship: 'Risk catalog mapping.' },
            { title: 'Authentication cheat sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'checklist', relationship: 'Flow requirements.' },
            { title: 'Session management cheat sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'checklist', relationship: 'Token/session properties.' }
          ],
          quiz: { prompt: 'GET /api/orders/88 must…', options: ['Trust the client asked for its own order', 'Verify the authenticated owner/admin before returning', 'Return everything publicly', 'Rely on ID randomness'], answerIndex: 1, explanation: 'IDOR prevention means server-side ownership checks on every object access.' }
        }
      ]
    },
    {
      slug: 'performance-optimization',
      stage: 'Intermediate',
      title: 'Performance & Production Optimization',
      description: 'End-to-end optimization across the stack: frontend Core Web Vitals, API latency and database tuning.',
      topics: [
        {
          slug: 'frontend-performance',
          title: 'Core Web Vitals & Frontend Performance',
          objectives: ['Target Core Web Vitals metrics: LCP, INP, CLS', 'Measure field and lab data before optimizing', 'Fix the largest render-blocking cost first'],
          sections: [
            { heading: 'Core Web Vitals', body: 'LCP measures perceived load speed (under 2.5s); INP captures interaction responsiveness (under 200ms); CLS tracks layout stability (under 0.1). These three metrics define real user experience more reliably than synthetic scores. Optimize what the field data reveals.' },
            { heading: 'Measure before optimizing', body: 'Collect field data with RUM and lab data with Lighthouse. Establish a baseline per route, change one variable at a time, and re-measure. Chasing a score without a user-facing baseline produces optimizations that do not matter.' },
            { heading: 'Largest content first', body: 'Identify the largest element in the viewport and trace what blocks it: server response, render-blocking CSS, a hero image, or the framework bundle. Preload the critical asset and defer everything that is not needed for first paint.' }
          ],
          links: [
            { title: 'Core Web Vitals', url: 'https://web.dev/articles/vitals', sourceName: 'web.dev', resourceType: 'article', relationship: 'Metric definitions and measurement methods.' },
            { title: 'Optimize LCP', url: 'https://web.dev/articles/optimize-lcp', sourceName: 'web.dev', resourceType: 'guide', relationship: 'Practical steps for the largest contentful paint.' },
            { title: 'Optimize INP', url: 'https://web.dev/articles/optimize-inp', sourceName: 'web.dev', resourceType: 'guide', relationship: 'Reducing interaction latency and long tasks.' }
          ],
          quiz: { prompt: 'LCP is slow. First investigative step?', options: ['Rewrite the framework', 'Check Lighthouse timing breakdown for the largest element and its dependency chain', 'Buy faster hosting', 'Compress all images to 1KB'], answerIndex: 1, explanation: 'Lighthouse breakdown tells you which resource or render path is blocking the largest element, directing effort accurately.' }
        },
        {
          slug: 'bundle-asset-delivery',
          title: 'Bundle Splitting & Asset Delivery',
          objectives: ['Split bundles by route and lazy-load non-critical features', 'Serve modern image formats with correct dimensions', 'Optimize font loading to protect LCP and CLS'],
          sections: [
            { heading: 'Bundle splitting', body: 'Split by route: initial JS covers login + shell; feature routes load on demand. Lazy-load modals, dashboards, admin views. Analyze with Vite source-map-inspector to find unexpected large imports. Tree-shaking works only if code is ESM-exported.' },
            { heading: 'Asset pipeline', body: 'Preload critical fonts, defer non-essential scripts, serve modern image formats with fallbacks. Compress assets with Brotli on the server. Every megabyte on mobile costs real conversion — measure transfer size per route, not just raw file size.' },
            { heading: 'Fonts and layout stability', body: 'Use font-display: swap for body text, preload the one font needed above the fold, and set size-adjust or fallback metrics to reduce layout shift. Subset fonts to the characters you use and never load five weights to use two.' }
          ],
          links: [
            { title: 'Code splitting in Vite', url: 'https://vite.dev/guide/features.html#dynamic-import', sourceName: 'Vite Documentation', resourceType: 'documentation', relationship: 'Implementation of route-level splitting.' },
            { title: 'Font loading strategy', url: 'https://web.dev/articles/font-best-practices', sourceName: 'web.dev', resourceType: 'guide', relationship: 'Font loading best practices that affect CLS and LCP.' },
            { title: 'Image optimization', url: 'https://web.dev/articles/image-optimization', sourceName: 'web.dev', resourceType: 'guide', relationship: 'Formats, sizing and responsive image delivery.' }
          ],
          quiz: { prompt: 'The highest-leverage first step for a heavy initial bundle is to…', options: ['Inline every dependency', 'Split routes and lazy-load features that are not needed on first paint', 'Remove TypeScript', 'Disable caching'], answerIndex: 1, explanation: 'Route-level splitting shrinks the JavaScript needed before the app becomes interactive; lazy-loading secondary features keeps the critical path small.' }
        },
        {
          slug: 'api-latency-diagnosis',
          title: 'API Latency Diagnosis',
          objectives: ['Trace requests end-to-end', 'Identify N+1 queries and synchronous bottlenecks', 'Implement request-level tracing'],
          sections: [
            { heading: 'End-to-end tracing', body: 'Every slow response has a timeline: DNS, TCP, TLS, server queue, handler execution, DB time, serialization. Instrument each span with timing. The longest span wins — no guessing.' },
            { heading: 'N+1 queries', body: 'Loading N items then fetching each items relations individually produces N+1 total queries. Eager-load (JOIN) related data in a single query or use batch-load patterns. This is the most common performance killer in ORM-heavy APIs.' },
            { heading: 'Async pipeline', body: 'Express is single-threaded. Any synchronous blocking (sync file read, JSON.parse of huge payload, crypto.pbkdf2 without async) stalls the whole process. Offload CPU-heavy work to worker threads or queues and keep the handler path async.' }
          ],
          links: [
            { title: 'Node.js performance measurement', url: 'https://nodejs.org/en/learn/diagnostic/understanding-the-nodejs-diagnostic-diagram', sourceName: 'Node.js Documentation', resourceType: 'guide', relationship: 'Tooling and techniques for profiling Node APIs.' },
            { title: 'Prisma query performance', url: 'https://www.prisma.io/docs/concepts/components/prisma-client/exhaustive-queries', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'ORM-specific N+1 avoidance patterns.' },
            { title: 'HTTP status codes for latency', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'Status semantics that clients interpret during slow responses.' }
          ],
          quiz: { prompt: 'An endpoint loads 50 orders, then for each runs a separate query for items. Most likely fix?', options: ['Add a cache', 'Eager-load items with a JOIN or batch query', 'Reduce page size', 'Add a CDN'], answerIndex: 1, explanation: 'N+1 eager-loading collapses 51 queries into 1; caching helps but does not fix the structural pattern.' }
        }
      ]
    },
    {
      slug: 'advanced-fullstack-architecture',
      stage: 'Advanced',
      title: 'Advanced Full-Stack Architecture',
      description: 'Scaling patterns, observability and event-driven systems spanning both halves of the stack.',
      topics: [
        {
          slug: 'horizontal-scaling',
          title: 'Horizontal Scaling & Load Balancing',
          objectives: ['Identify what must be stateless for horizontal scale', 'Design load balancing and health-check behaviour', 'Remove local session and file dependencies'],
          sections: [
            { heading: 'Stateless first', body: 'Servers behind a load balancer handle requests interchangeably only if they share no local state. Move sessions to Redis or signed JWTs; keep uploads on shared storage or object stores. Once stateless, scaling is adding instances.' },
            { heading: 'Load balancing and health checks', body: 'A load balancer spreads requests across healthy instances. Readiness tells it when an instance can accept traffic; liveness tells the orchestrator when to restart. Remove a failing instance from rotation before restarting it, and drain connections on shutdown.' },
            { heading: 'Session and work distribution', body: 'Sticky sessions route the same user to the same server; convenient but fragile on failure. Stateless tokens are preferred. For long-running tasks, distribute work to a job queue so any worker picks it up, not just the instance that received the HTTP request.' }
          ],
          links: [
            { title: 'Node.js clustering docs', url: 'https://nodejs.org/api/cluster.html', sourceName: 'Node.js Documentation', resourceType: 'reference', relationship: 'Single-machine horizontal scaling via worker processes.' },
            { title: 'Express scaling guidance', url: 'https://expressjs.com/en/advanced/best-practice-performance.html', sourceName: 'Express Documentation', resourceType: 'guide', relationship: 'Production scaling and process management.' },
            { title: 'Redis session store patterns', url: 'https://redis.io/docs/latest/develop/use/patterns/', sourceName: 'Redis Documentation', resourceType: 'documentation', relationship: 'External session backends enabling stateless instances.' }
          ],
          quiz: { prompt: 'When moving behind a load balancer, which must become external?', options: ['Database only', 'In-memory session state and local filesystem uploads', 'TypeScript types', 'Route definitions'], answerIndex: 1, explanation: 'Local state binds a request to a specific instance. Moving sessions to Redis and uploads to shared storage removes that dependency.' }
        },
        {
          slug: 'data-partitioning',
          title: 'Data Partitioning & Capacity Planning',
          objectives: ['Partition large datasets by tenant, entity or time', 'Choose replication and sharding strategies deliberately', 'Plan capacity from measured load rather than guesses'],
          sections: [
            { heading: 'Data partitioning', body: 'Vertical scaling hits limits (CPU, memory, IOPS). Partition by tenant, entity type, or time to keep individual datasets manageable. Partition early at the write path — retroactive partitioning of large tables is painful and risky.' },
            { heading: 'Replication and sharding', body: 'Read replicas scale read-heavy workloads but introduce replication lag; route reads that can tolerate staleness to them. Sharding splits writes across independent databases but makes cross-shard joins and transactions expensive. Choose the simplest model that meets the measured limit.' },
            { heading: 'Capacity from evidence', body: 'Load-test the real request mix, then measure connections, queue depth, CPU and p95 latency under expected and peak traffic. Leave headroom for failover. Capacity planning from a dashboard average, without a peak test, is a guess.' }
          ],
          links: [
            { title: 'Database sharding patterns', url: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/sharding', sourceName: 'Microsoft Azure', resourceType: 'documentation', relationship: 'Partitioning strategies and trade-offs.' },
            { title: 'Read replicas and consistency', url: 'https://aws.amazon.com/rds/features/read-replicas/', sourceName: 'AWS Documentation', resourceType: 'documentation', relationship: 'Scaling reads and handling replication lag.' },
            { title: 'Performance testing guidance', url: 'https://learn.microsoft.com/en-us/azure/architecture/antipatterns/noisy-neighbor/', sourceName: 'Microsoft Azure', resourceType: 'documentation', relationship: 'Capacity, isolation and noisy-neighbour effects.' }
          ],
          quiz: { prompt: 'Read replicas are a poor fit when…', options: ['Read traffic dominates', 'Every read must immediately reflect the latest write', 'The dataset is large', 'The workload is analytics-heavy'], answerIndex: 1, explanation: 'Replication is asynchronous in most systems, so a replica can serve stale data. Read-your-writes requirements need the primary or a consistency-aware routing strategy.' }
        },
        {
          slug: 'observability-production',
          title: 'Observability & Production Monitoring',
          objectives: ['Implement structured logging with correlation', 'Design actionable health checks and alerts', 'Instrument distributed tracing across services'],
          sections: [
            { heading: 'Structured logs', body: 'One JSON line per event: timestamp, level, requestId, actorId, event name, duration, outcome. Correlation ids threaded through frontend fetch, API, DB and queue ties a user report to a precise server trace.' },
            { heading: 'Health checks', body: 'Liveness confirms the process responds; readiness confirms downstream dependencies (DB, cache, queue) are reachable. Load balancers and orchestrators use these to route and restart. Return meaningful status codes, not just 200.' },
            { heading: 'Alert on user impact', body: 'Alert on error rate increases, latency percentile regressions, queue depth growth and disk fill — metrics that map to user experience. Alerting on CPU usage alone creates noise without actionable context.' }
          ],
          links: [
            { title: 'Node.js logging best practices', url: 'https://nodejs.org/en/learn', sourceName: 'Node.js Documentation', resourceType: 'guide', relationship: 'Structured logging patterns in Node.' },
            { title: 'OWASP logging cheat sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html', sourceName: 'OWASP', resourceType: 'checklist', relationship: 'What to log and what never to log.' },
            { title: '12-factor app logging', url: 'https://12factor.net/logs', sourceName: 'MDN Web Docs', resourceType: 'article', relationship: 'Treat logs as event streams, not files.' }
          ],
          quiz: { prompt: 'A user reports slowness. Most useful information in your logs is...', options: ['Server CPU average', 'Correlation id linking frontend fetch through API and DB queries', 'Timestamps alone', 'Random debug prints'], answerIndex: 1, explanation: 'A correlation id ties the entire request path together, enabling you to diagnose the precise slow span without guessing.' }
        }
      ]
    },
    {
      slug: 'integration-and-delivery',
      stage: 'Advanced',
      title: 'Integration, Testing & Delivery',
      description: 'Wiring both halves together and shipping them reliably.',
      topics: [
        {
          slug: 'fe-be-integration',
          title: 'Frontend ↔ Backend Integration',
          objectives: ['Contract-test endpoints against real schemas', 'Coordinate environments and CORS', 'Debug across the boundary efficiently'],
          sections: [
            { heading: 'Contracts verified, not assumed', body: 'Integration tests hit running servers asserting status/shape; shared TS types catch drift at build time. Contract mismatches die in CI, not staging demos.' },
            { heading: 'Cross-boundary debugging', body: 'Correlate requestId from browser network tab into server logs. Reproduce CORS/auth failures with curl minus the browser before blaming proxies.' }
          ],
          links: [
            { title: 'CORS guide', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Diagnosing cross-origin failures.' },
            { title: 'Network request inspection concepts', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'Client-side visibility into calls.' },
            { title: 'GitHub Actions', url: 'https://docs.github.com/en/actions', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'Automating integration checks.' }
          ],
          quiz: { prompt: 'Browser shows CORS error though API works via curl. First check?', options: ['Rewrite backend in another language', 'Server’s Access-Control-Allow-Origin/response to preflight for the exact origin', 'Delete node_modules', 'Disable WiFi'], answerIndex: 1, explanation: 'CORS is enforced by browsers from server responses; verify OPTIONS preflight handling and origin allowlists.' }
        },
        {
          slug: 'testing-strategy-fullstack',
          title: 'Testing Strategy (Full Stack)',
          objectives: ['Balance unit/integration/e2e investment', 'Test authZ boundaries explicitly', 'Keep CI under ten minutes'],
          sections: [
            { heading: 'Investment curve', body: 'Many unit tests on pure logic, focused integration tests per endpoint, handful of e2e happy paths. E2E suites over five minutes get flaky and ignored.' },
            { heading: 'Security tests are tests', body: 'Assert user B cannot fetch user A’s orders; assert expired tokens reject; assert validation rejects malformed payloads. These cases encode your threat model permanently.' }
          ],
          links: [
            { title: 'Testing overview (Node)', url: 'https://nodejs.org/en/learn/test-runner/introduction-to-test-runner', sourceName: 'Node.js Documentation', resourceType: 'guide', relationship: 'Runner foundations.' },
            { title: 'Vitest guide', url: 'https://vitest.dev/guide/', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'Ecosystem runner usage.' },
            { title: 'CI with Actions', url: 'https://docs.github.com/en/actions/automating-builds-and-tests/about-continuous-integration', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'Pipelines gating merges.' }
          ],
          quiz: { prompt: 'Fastest failing test suite signal of trouble?', options: ['Green but skipped 40% of cases', 'Authorization regression caught pre-merge', 'Coverage number alone', 'Longest file tested'], answerIndex: 1, explanation: 'Skips hide regressions; catching an authZ break is the suite doing precisely its job.' }
        },
        {
          slug: 'deploy-operate-fullstack',
          title: 'Deployment & Operations',
          objectives: ['Deploy SPA + API coherently', 'Manage env-specific configuration', 'Observe post-release health'],
          sections: [
            { heading: 'Coherent delivery', body: 'Static assets on CDN/edge, API behind process manager, history fallback configured, database migrated via expand/contract. One pipeline deploys both halves atomically enough to avoid skew.' },
            { heading: 'Post-release watch', body: 'Watch error rates, latency percentiles and key funnels for one release cycle. Rollback triggers defined beforehand remove mid-incident debate.' }
          ],
          links: [
            { title: 'Static deploy (Vite)', url: 'https://vite.dev/guide/static-deploy', sourceName: 'Vite Documentation', resourceType: 'documentation', relationship: 'Frontend hosting patterns.' },
            { title: 'Express production best practices', url: 'https://expressjs.com/en/advanced/best-practice-performance.html', sourceName: 'Express Documentation', resourceType: 'guide', relationship: 'API hardening in production.' },
            { title: 'Node security best practices', url: 'https://nodejs.org/en/learn/getting-started/security-best-practices', sourceName: 'Node.js Documentation', resourceType: 'guide', relationship: 'Runtime hardening.' }
          ],
          quiz: { prompt: 'Immediately after deploy, checkout conversion drops 30%. Best first action?', options: ['Celebrate', 'Compare release diff and metrics; roll back if regression confirmed', 'Rewrite checkout from scratch', 'Ignore until Monday'], answerIndex: 1, explanation: 'Defined rollback criteria make the decision mechanical instead of political.' }
        }
      ]
    },
    {
      slug: 'fullstack-performance-scale',
      stage: 'Advanced',
      title: 'Full-Stack Performance & Scale',
      description: 'Make the whole stack fast and resilient: caching, concurrency, edge delivery and load testing.',
      topics: [
        {
          slug: 'end-to-end-performance',
          title: 'End-to-End Performance Budgets',
          minutes: 30,
          objectives: ['Trace performance from client to database', 'Set and enforce performance budgets', 'Optimize the highest-impact bottleneck'],
          sections: [
            { heading: 'Follow the request', body: 'When a page is slow, trace the whole path: bundle size, API latency, database queries, third-party calls. Optimize the segment where time is actually spent, not the one you find most interesting.' },
            { heading: 'Budgets that bind', body: 'Set budgets for load (bundle bytes, LCP), API (p95 latency, error rate) and database (query time, connections). Enforce them in CI so regressions fail the build before they reach users.' },
            { heading: 'Compounding wins', body: 'Swap the cheapest, highest-leverage wins first: caching, payload trimming, fewer round-trips, query optimization. Each win compounds the perceived speed of the product.' }
          ],
          links: [
            { title: 'Web performance budgets', url: 'https://web.dev/articles/performance-budgets-101', sourceName: 'web.dev', resourceType: 'guide', relationship: 'Defining and enforcing budgets.' },
            { title: 'Rendering performance', url: 'https://developer.chrome.com/blog/rendering-performance/', sourceName: 'Chrome Developers', resourceType: 'article', relationship: 'Frontend rendering costs.' },
            { title: 'Database indexing fundamentals', url: 'https://use-the-index-luke.com/', sourceName: 'Use The Index, Luke', resourceType: 'guide', relationship: 'Making queries fast.' }
          ],
          quiz: {
            prompt: 'After a perf audit a page is still slow. The best next step is to…',
            options: ['Squeeze the cheapest favorite optimization again', 'Trace the full request path and fix the peak bottleneck', 'Add more servers', 'Disable logging'],
            answerIndex: 1,
            explanation: 'Optimization should be driven by the actual time distribution across the request path.'
          }
        },
        {
          slug: 'caching-and-cdn',
          title: 'Caching Layers & Edge Delivery',
          minutes: 30,
          objectives: ['Layer caching at browser, CDN and server', 'Dominate cache invalidation with correct keys', 'Use edge/CDN for static and dynamic content'],
          sections: [
            { heading: 'Cache everywhere, correctly', body: 'Cache aggressively where data is stable: static assets, public pages, repeated queries. Use correct Cache-Control, ETags and a CDN to serve content close to users and unload your origin.' },
            { heading: 'Invalidation is the hard part', body: 'The two hard problems — naming things and cache invalidation — meet in caching. Design cache keys and invalidation strategies (purge, versioned URLs, short TTLs) before you enable them.' },
            { heading: 'Edge for dynamic too', body: 'Edge functions and CDN caching can serve personalized-but-cacheable content and offload auth/geo logic. Keep cache keys safe: vary on user, locale or A/B bucket where needed.' }
          ],
          links: [
            { title: 'HTTP caching', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching', sourceName: 'MDN Web Docs', resourceType: 'documentation', relationship: 'Browser and proxy caching semantics.' },
            { title: 'CloudFront edge caching', url: 'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-content.html', sourceName: 'AWS', resourceType: 'documentation', relationship: 'CDN configuration and invalidation.' },
            { title: 'web.dev performance caches', url: 'https://web.dev/articles/http-cache', sourceName: 'web.dev', resourceType: 'article', relationship: 'Styling cache headers and serving cached content.' }
          ],
          quiz: {
            prompt: 'The real difficulty with caching is usually…',
            options: ['Adding enough servers', 'Making sure stale data is invalidated with correct cache keys and strategies', 'Compressing text', 'Using a CDN'],
            answerIndex: 1,
            explanation: 'Cache invalidation and correct keys prevent serving stale or wrong (e.g., cross-user) content.'
          }
        },
        {
          slug: 'concurrency-and-reliability',
          title: 'Concurrency, Load & Reliability',
          minutes: 35,
          objectives: ['Handle concurrent requests and idempotency', 'Load-test and capacity-plan honestly', 'Meet reliability targets with SLOs'],
          sections: [
            { heading: 'Concurrency correctness', body: 'When many requests touch the same data, guard with transactions, optimistic locking or idempotent APIs. Idempotency keys make retries safe for payments and order placement.' },
            { heading: 'Load-testing with purpose', body: 'Load-test against realistic concurrency and data to find the breaking point before users do. Record results, set capacity budgets, and revisit as traffic grows.' },
            { heading: 'Reliability by design', body: 'Set SLOs for availability and latency, track an error budget, and make rollback/scale routine. A full-stack engineer who can both tune the frontend and harden the backend is high-leverage.' }
          ],
          links: [
            { title: 'Idempotency in APIs', url: 'https://stripe.com/blog/idempotency', sourceName: 'Stripe', resourceType: 'article', relationship: 'Making retries safe with idempotency keys.' },
            { title: 'Load testing intro', url: 'https://k6.io/docs/', sourceName: 'k6', resourceType: 'documentation', relationship: 'Open-source load testing tooling.' },
            { title: 'Google SRE Workbook', url: 'https://sre.google/workbook/table-of-contents/', sourceName: 'Google SRE', resourceType: 'documentation', relationship: 'Operating reliability targets.' }
          ],
          quiz: {
            prompt: 'To make an order-placing endpoint safe under retries, you should…',
            options: ['Disable retries entirely', 'Use an idempotency key so duplicate requests create one order', 'Double the timeout', 'Ignore duplicates'],
            answerIndex: 1,
            explanation: 'Idempotency keys let clients retry safely without creating duplicate side effects like double charges.'
          }
        }
      ]
    },
    {
      slug: 'cross-functional-leadership',
      stage: 'Advanced',
      title: 'Cross-Functional Leadership',
      description: 'Own features end-to-end, run delivery, communicate risk and lead technical decisions.',
      topics: [
        {
          slug: 'feature-ownership',
          title: 'Owning a Feature End-to-End',
          minutes: 30,
          objectives: ['Scope a feature across frontend and backend', 'Sequence work and manage dependencies', 'Ship and measure a feature you own'],
          sections: [
            { heading: 'Full-stack scope', body: 'Break a feature into frontend, API, data and platform slices, then sequence them so reviewing is easy and risk surfaces early. Name external dependencies (design, API, data) up front.' },
            { heading: 'Vertical slices', body: 'Ship thin vertical slices (a working slice end-to-end) rather than completing whole layers. Each slice is demos and measurable, so stakeholders see progress and you de-risk integration.' },
            { heading: 'Measure what you ship', body: 'Define success metrics before you start and instrument them at launch. Owning a feature means answering "did it move the number?" and iterating from real data.' }
          ],
          links: [
            { title: 'Slicing work for delivery', url: 'https://www.mountaingoatsoftware.com/blog/how-to-slice-work-into-user-stories', sourceName: 'Mountain Goat Software', resourceType: 'article', relationship: 'Splitting features into thin slices.' },
            { title: 'Agile feature ownership', url: 'https://www.atlassian.com/agile/project-management/user-stories', sourceName: 'Atlassian', resourceType: 'article', relationship: 'Writing effective user stories.' },
            { title: 'Measuring product success', url: 'https://www.productplan.com/glossary/success-metric/', sourceName: 'ProductPlan', resourceType: 'article', relationship: 'Selecting metrics that matter.' }
          ],
          quiz: {
            prompt: 'To de-risk integration of a new full-stack feature, you should…',
            options: ['Build the whole backend then the whole frontend', 'Deliver thin vertical slices that work end-to-end', 'Skip the frontend', 'Deploy it untested'],
            answerIndex: 1,
            explanation: 'Vertical slices integrate all layers early, surfacing mismatches before they compound.'
          }
        },
        {
          slug: 'leading-technical-decisions',
          title: 'Leading Technical Decisions',
          minutes: 30,
          objectives: ['Facilitate decisions with trade-offs and consent', 'Write short RFCs and design docs', 'Align a group on an approach'],
          sections: [
            { heading: 'Decide with structure', body: 'Write a concise proposal (RFC/design doc) stating the problem, options, trade-offs and a recommendation. Deciding on paper sharply focuses discussion and captures rationale.' },
            { heading: 'Consent over consensus', body: 'Aim for consent — everyone can live with the decision and proceed — not unanimous agreement. Name a decision owner and a deadline so groups do not stall.' },
            { heading: 'Sunsetting decisions', body: 'Record the date and conditions under which a decision should be revisited. "We chose X because Y; revisit if Z" prevents zombie decisions and re-litigation.' }
          ],
          links: [
            { title: 'How to write a design doc', url: 'https://www.industrialempathy.com/posts/design-docs-at-google/', sourceName: 'Industrial Empathy', resourceType: 'article', relationship: 'Templates for effective design docs.' },
            { title: 'The decision-making guide', url: 'https://www.atlassian.com/team-playbook/plays/decision-stack', sourceName: 'Atlassian', resourceType: 'guide', relationship: 'Running efficient team decisions.' },
            { title: 'Architecture decision records', url: 'https://adr.github.io/', sourceName: 'ADRs', resourceType: 'documentation', relationship: 'Capturing decisions durably.' }
          ],
          quiz: {
            prompt: 'A cost of omitting trade-offs from a technical proposal is…',
            options: ['It is faster and better', 'The team cannot weigh alternatives and the decision is fragile', 'Nothing', 'Fewer meetings'],
            answerIndex: 1,
            explanation: 'Naming trade-offs lets reviewers find flaws early and makes the decision defensible later.'
          }
        },
        {
          slug: 'delivery-and-risk-communication',
          title: 'Delivery & Communicating Risk',
          minutes: 25,
          objectives: ['Estimate and communicate risk honestly', 'Run delivery rituals that build trust', 'Escalate blockers early and clearly'],
          sections: [
            { heading: 'Honest estimation', body: 'Estimate in ranges with named assumptions, and update as you learn. Saying "90–120 hours, assuming the API contract lands Monday" is far more useful than a false-precision single number.' },
            { heading: 'Escalate early', body: 'Surface blockers the moment they threaten delivery, with the impact and options, not when the deadline has already slipped. Early escalation is a feature, not a weakness.' },
            { heading: 'Rituals that build trust', body: 'Regular, short demos and a visible board keep stakeholders aligned. Communicate progress against the plan and recalibrate dates as soon as facts change.' }
          ],
          links: [
            { title: 'Estimation techniques', url: 'https://www.atlassian.com/agile/project-management/estimation', sourceName: 'Atlassian', resourceType: 'article', relationship: 'Estimating software work honestly.' },
            { title: 'Communicating status', url: 'https://www.mountaingoatsoftware.com/blog/how-to-report-project-status', sourceName: 'Mountain Goat Software', resourceType: 'article', relationship: 'Reporting status that stakeholders trust.' },
            { title: 'Escalation playbook', url: 'https://www.productplan.com/learn/escalation-process/', sourceName: 'ProductPlan', resourceType: 'article', relationship: 'Escalating blockers with clarity.' }
          ],
          quiz: {
            prompt: 'When a dependency slips, the professional move is to…',
            options: ['Stay quiet until the deadline', 'Escalate early with the impact and options', 'Blame others publicly', 'Promise more to compensate'],
            answerIndex: 1,
            explanation: 'Early escalation with impact and options lets stakeholders adapt instead of being surprised.'
          }
        }
      ]
    },
    {
      slug: 'fullstack-career-freelance',
      stage: 'Advanced',
      title: 'Full-Stack Careers, Portfolio & Freelance',
      description: 'Position your full-stack versatility: portfolio, freelance and growth to a lead role.',
      topics: [
        {
          slug: 'fullstack-portfolio',
          title: 'A Portfolio That Sells Full-Stack Depth',
          minutes: 25,
          objectives: ['Show both breadth and depth across the stack', 'Document architecture, reliability and process', 'Make your work inspectable and runnable'],
          sections: [
            { heading: 'Show the seam', body: 'Employers hire full-stack for the ability to move across the seam between frontend and backend. Demonstrate one or two features you carried end-to-end — schema, API, UI, deployment, tests.' },
            { heading: 'Make it real', body: 'Deploy projects so you can name real constraints and host a live demo. Include tests, migrations, security and a README that explains why you made each architectural choice.' },
            { heading: 'Curate for the role', body: 'Choose projects that reflect the jobs you want — SaaS dashboards, e-commerce, APIs — and lead case studies with the problem and outcome, anchored by your role.' }
          ],
          links: [
            { title: 'Full-stack project ideas', url: 'https://roadmap.sh/full-stack/project-ideas', sourceName: 'roadmap.sh', resourceType: 'guide', relationship: 'Projects demonstrating integration depth.' },
            { title: 'Vite static deploy', url: 'https://vite.dev/guide/static-deploy', sourceName: 'Vite Documentation', resourceType: 'documentation', relationship: 'Shipping and hosting your frontend.' },
            { title: 'ADR format', url: 'https://adr.github.io/', sourceName: 'ADRs', resourceType: 'documentation', relationship: 'Documenting decisions in project READMEs.' }
          ],
          quiz: {
            prompt: 'The most persuasive full-stack portfolio project is one that…',
            options: ['Uses only a framework trick', 'Takes a feature from database schema to deployed UI with tests and docs', 'Is copied from a tutorial', 'Shows only login screens'],
            answerIndex: 1,
            explanation: 'Carrying a feature across the whole stack demonstrates the integration skill employers seek.'
          }
        },
        {
          slug: 'fullstack-freelance',
          title: 'Freelance Full-Stack Work',
          minutes: 30,
          objectives: ['Scope and price full-stack engagements well', 'Manage clients and scope creep', 'Deliver maintainable client projects'],
          sections: [
            { heading: 'Scope the whole stack', body: 'A full-stack client project spans design-to-deploy: define pages, data, integrations, hosting and support. Write a clear scope with phases, deliverables, revision caps and what is out of scope.' },
            { heading: 'Price for value and risk', body: 'Price for the business value and the maintenance risk you carry, not just hours. Include ongoing support/maintenance boundaries so expectations are explicit.' },
            { heading: 'Deliver maintainably', body: 'Hand over documented, tested code with a runbook and credentials plan. Clients will revisit; leaving clean code and docs protects you and the relationship.' }
          ],
          links: [
            { title: 'Freelance contracts', url: 'https://www.hellobonsai.com/freelance-contracts', sourceName: 'Bonsai', resourceType: 'article', relationship: 'Contract templates for client work.' },
            { title: 'Freelance pricing guide', url: 'https://www.smashingmagazine.com/2018/12/freelance-and-pricing/', sourceName: 'Smashing Magazine', resourceType: 'article', relationship: 'Pricing frameworks for independent work.' },
            { title: 'Client communication', url: 'https://www.productplan.com/learn/client-communication/', sourceName: 'ProductPlan', resourceType: 'article', relationship: 'Managing client expectations.' }
          ],
          quiz: {
            prompt: 'A client keeps adding features after scope approval. The best control is…',
            options: ['Doing them free to be liked', 'A written scope with a change-control process and pricing for out-of-scope work', 'Refusing to talk', 'Delivering half the work'],
            answerIndex: 1,
            explanation: 'A documented scope plus a clear change process keeps the project healthy and the relationship fair.'
          }
        },
        {
          slug: 'growth-to-lead',
          title: 'Growth to Tech Lead & Architect',
          minutes: 25,
          objectives: ['Own architecture and cross-team outcomes', 'Mentor and raise the team bar', 'Balance technical and leadership work'],
          sections: [
            { heading: 'From doer to multiplier', body: 'Tech leads set direction, unblock, review and mentor — output becomes leverage on others. Grow by owning increasingly cross-cutting outcomes and decisions.' },
            { heading: 'Architect for the whole product', body: 'As an architect you weigh frontend and backend together: data flow, security, performance, maintainability. Decisions span the stack, so breadth of judgment matters.' },
            { heading: 'Balance the roles', body: 'Protect time for the deep work that sustains the team (design, reliability, mentorship) while staying technically strong. Delegating implementation without losing technical credibility is the craft.' }
          ],
          links: [
            { title: 'StaffEng', url: 'https://staffeng.com/', sourceName: 'StaffEng', resourceType: 'guide', relationship: 'Staff and lead roles across the stack.' },
            { title: 'Engineering leadership paths', url: 'https://www.progression.fyi/', sourceName: 'progression.fyi', resourceType: 'reference', relationship: 'Leveling for leads and architects.' },
            { title: 'Mentoring engineers', url: 'https://kentcdodds.com/blog/what-great-mentors-do', sourceName: 'Kent C. Dodds', resourceType: 'article', relationship: 'Leveraging mentorship as a leader.' }
          ],
          quiz: {
            prompt: 'A tech lead’s output is best measured by…',
            options: ['Their personal feature count', 'The outcomes and velocity of the team and systems they influence', 'Their office hours', 'The size of their commits'],
            answerIndex: 1,
            explanation: 'Leadership removes leverage from personal output and places it on team and system outcomes.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Task Manager Feature — Full Stack Specification',
    coverage: ['React + TypeScript', 'Express API Design', 'MySQL Modeling', 'AuthZ', 'Integration Testing'],
    brief:
      'Specify end-to-end a team task manager feature: MySQL schema (projects/tasks/users/membership), Express endpoints with role-based permissions (owner/editor/viewer), React views with request states, shared TypeScript contracts, and the integration tests you would write.',
    requirements: [
      'Normalized DDL sketch with membership join table',
      'Endpoint list with methods/status codes/authZ matrix',
      'React component/state plan incl. optimistic update choice',
      'Shared type definitions excerpt',
      'Five named integration test cases incl. two security assertions'
    ],
    expectedOutput: 'A complete build-ready specification document.',
    rubric: [
      { skill: 'Data modeling', weight: 20, criteria: 'Relations, constraints, sensible keys/indexes' },
      { skill: 'API design', weight: 20, criteria: 'Consistent REST, envelopes, statuses' },
      { skill: 'Security', weight: 25, criteria: 'Role matrix correct; ownership enforced server-side' },
      { skill: 'React architecture', weight: 15, criteria: 'Typed components, explicit request states' },
      { skill: 'Testing rigor', weight: 20, criteria: 'Boundary-focused integration cases specified' }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'Shared Contracts Library',
      stage: 'Foundation',
      objective: 'Define the shared TypeScript contracts for an invoicing feature used by both React and Express sides.',
      requirements: ['Domain types with unions for states', 'Request/response envelope generics', 'Validation schema mirroring each DTO', 'Document three drift risks the library prevents'],
      skillsEvaluated: ['TypeScript', 'APIs', 'Frontend + Backend Integration'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: { instructions: 'Submit the contracts module design with excerpts.', textLabel: 'Contracts design doc', minTextLength: 900 }
    },
    {
      title: 'Comments Feature Build Plan',
      stage: 'Intermediate',
      objective: 'Plan a nested comments feature across stack: schema → endpoints → components.',
      requirements: ['Table design incl. parent_id strategy', 'CRUD endpoint table with authZ', 'Component hierarchy with state placement', 'Optimistic-create flow with rollback', 'Two abuse cases (spam/XSS) and mitigations'],
      skillsEvaluated: ['Node.js', 'MySQL', 'React', 'Security'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: { instructions: 'Submit the feature plan.', textLabel: 'Feature plan', minTextLength: 1200 }
    },
    {
      title: 'Production Readiness Review',
      stage: 'Advanced',
      objective: 'Review a described full-stack app and produce a launch-readiness checklist with findings ranked.',
      requirements: ['Security findings mapped to OWASP categories', 'Performance risks with measurement plans', 'Deployment/rollback gaps', 'Observability minimums', 'Prioritized remediation table'],
      skillsEvaluated: ['Security', 'Deployment', 'Architecture'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: { instructions: 'Submit the readiness review.', textLabel: 'Readiness review', minTextLength: 1100 }
    }
  ],

  simTasks: [
    {
      title: 'Incident: login outage',
      context: 'Users cannot sign in after a dependency upgrade; refresh endpoint 500s. Marketing campaign traffic arriving.',
      requirements: ['Triage steps ordered', 'Rollback vs hotfix decision criteria', 'Status comms draft'],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Incident response note with timeline slots filled.',
      skills: ['Node.js', 'Deployment', 'Communication']
    },
    {
      title: 'Dashboard pagination retrofit',
      context: 'The admin dashboard loads ALL invoices then filters client-side; DB CPU pegged during month-end.',
      requirements: ['Server-side pagination/filter API plan', 'React migration steps preserving UX', 'Index additions justified'],
      priority: 'high',
      dueDayOffset: 4,
      expectedOutput: 'Technical plan with query sketches.',
      skills: ['MySQL', 'React', 'Performance']
    },
    {
      title: 'Onboarding handover doc',
      context: 'A new developer joins next sprint; current docs are stale screenshots.',
      requirements: ['Architecture overview diagram-in-text', 'Local setup steps reproducible', 'Where things live: contracts, repos, pipelines'],
      priority: 'normal',
      dueDayOffset: 7,
      expectedOutput: 'Onboarding document draft.',
      skills: ['Architecture', 'Documentation', 'Communication']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Iris Novak',
      personaRole: 'Senior Engineer (reviewer)',
      situation: 'Review disagreement on your PR.',
      openingMessage:
        'Left comments on your PR — the service method does three jobs and hits the repo directly. I’d extract the pricing rule and inject the repo. Curious why you went inline? Happy to pair if useful.',
      expectedPoints: ['Engages with technical reasoning, not defensiveness', 'Asks clarifying question about extraction scope', 'Agrees on concrete next step (pair/refactor commit)', 'Keeps tone professional']
    },
    {
      kind: 'team',
      personaName: 'Owen Reid',
      personaRole: 'DevOps Engineer',
      situation: 'Pipeline red before release.',
      openingMessage:
        'Release pipeline fails at integration stage — your new endpoint test can’t reach the seeded DB. Looks like it needs the new migration first. Can you check and re-trigger? Release window closes 17:00.',
      expectedPoints: ['Acknowledges and investigates promptly', 'Identifies migration-order cause', 'Fixes and communicates re-trigger', 'Confirms green before window']
    },
    {
      kind: 'client',
      personaName: 'Grace Liu',
      personaRole: 'Founder, PetalCart',
      situation: 'Scope expansion attempt.',
      openingMessage:
        'Since you’re already touching checkout, could we also add loyalty points, gift cards and referral links this sprint? It’s all “small”, right?',
      expectedPoints: ['Quantifies effort honestly per item', 'Explains compounding risk near deadline', 'Proposes phased roadmap with dates', 'Documents agreed scope in writing']
    },
    {
      kind: 'client',
      personaName: 'Derek Fontaine',
      personaRole: 'Ops Lead, TrackMyFleet',
      situation: 'Data incident worry.',
      openingMessage:
        'A customer emailed saying they saw ANOTHER customer’s dashboard for a second after logging in?! Is our data leaking? What happened and how do we tell them?',
      expectedPoints: ['Treats as potential IDOR/security incident seriously', 'Outlines immediate investigation + containment steps', 'Commits to factual root-cause report', 'Avoids premature reassurance or blame']
    }
  ],

  workplaceScenarios: [
    {
      category: 'Deadline pressure',
      situation: 'Demo in 6 hours. The payment sandbox integration is half-done and failing intermittently.',
      requiredActions: [
        { action: 'Present demo behind a feature flag using mocked success path', good: true, note: 'Honest demo beats broken live demo.' },
        { action: 'Hide known-flaky flow from stakeholders without disclosure', good: false, note: 'Surprise defects destroy trust more than scoping.' },
        { action: 'Tell PM early: what works, what doesn’t, revised ETA', good: true, note: 'Early transparency enables stakeholder decisions.' },
        { action: 'Skip writing the regression test because demo looms', good: false, note: 'Deferred tests become permanent debt.' }
      ]
    },
    {
      category: 'Quality issue',
      situation: 'You discover a teammate’s merged feature leaks other tenants’ data when given crafted IDs. They’re on leave; launch is tomorrow.',
      requiredActions: [
        { action: 'Treat as P0 security issue; add ownership check + regression test immediately', good: true, note: 'Severity dictates action speed.' },
        { action: 'Wait for the teammate to return since it’s their code', good: false, note: 'Ownership belongs to the team, especially for security.' },
        { action: 'Notify lead with reproduction steps and fix status', good: true, note: 'Incidents need visibility, not heroics in silence.' },
        { action: 'Scan for the same pattern in sibling endpoints', good: true, note: 'Classes of bugs rarely occur once.' }
      ]
    }
  ],

  interviewQuestions: [
    { dimension: 'technical_knowledge', prompt: 'Describe your default architecture for a React + Express + MySQL app and justify each layer.', guidancePoints: ['Folder/module structure', 'Repository/service separation', 'Shared contracts location', 'State/data-fetch approach'] },
    { dimension: 'technical_knowledge', prompt: 'How does a refresh-token rotation flow work and what does reuse detection prevent?', guidancePoints: ['Short access + rotating refresh', 'Hash-at-rest storage', 'Family revocation on reuse', 'CSRF pairing'] },
    { dimension: 'problem_solving', prompt: 'Checkout works locally, fails in production with CORS preflight 404. Diagnose.', guidancePoints: ['OPTIONS handling/route config', 'Proxy/CDN differences', 'Env allowlists', 'curl reproduction'] },
    { dimension: 'problem_solving', prompt: 'Page makes 47 sequential API calls on load. Fix systematically.', guidancePoints: ['Batch/nested endpoints', 'Parallelization where independent', 'Cache/dedupe layer', 'Measure wins'] },
    { dimension: 'professional_reasoning', prompt: 'Choose between shipping Monday with known minor security misconfig vs slipping 2 days.', guidancePoints: ['Risk quantification', 'Exploitability assessment', 'Stakeholder communication', 'Decision documentation'] },
    { dimension: 'professional_reasoning', prompt: 'When is a monolith the right call over services?', guidancePoints: ['Team size/deployment simplicity', 'Premature distribution costs', 'Extraction trigger points'] },
    { dimension: 'communication', prompt: 'A designer asks “why is this so hard to build?” about a small-looking animation. Respond.', guidancePoints: ['Translate cost drivers plainly', 'Offer alternatives meeting intent', 'Collaborative framing'] },
    { dimension: 'communication', prompt: 'Summarize a week of full-stack work to non-technical leadership.', guidancePoints: ['Outcome-first framing', 'Business metric linkage', 'Risks flagged with asks'] }

  ]

}
