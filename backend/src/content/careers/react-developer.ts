import type { CareerDef } from '../framework.js'

export const reactDeveloper: CareerDef = {
  slug: 'react-developer',
  name: 'React Developer',
  category: 'Development',
  order: 5,
  description:
    'Specializes in component architecture, hooks, state management, routing and performance for React applications.',
  difficulty: 'Beginner-friendly',
  pathSummary:
    'JSX & component fundamentals → props, state & rendering model → hooks, effects & custom patterns → component composition & state management → testing, routing & TypeScript integration → performance, optimization & production deployment.',
  mainSkills: ['React', 'JavaScript', 'TypeScript', 'Component Architecture', 'State Management', 'React Hooks', 'Web Performance', 'Testing'],
  sourcePlatforms: ['React Documentation', 'MDN Web Docs', 'TypeScript Documentation', 'Vite Documentation', 'GitHub Documentation'],
  companyName: 'Axiom Labs',
  roleTitle: 'React Developer',

  chapters: [
    {
      slug: 'jsx-and-component-fundamentals',
      stage: 'Beginner',
      title: 'JSX & Component Fundamentals',
      description: 'The building blocks of every React UI: JSX expressions, function components, props and the rendering lifecycle.',
      topics: [
        {
          slug: 'jsx-and-expressions',
          title: 'JSX & Expressions',
          minutes: 25,
          objectives: ['Write valid JSX with embedding and conditional rendering', 'Distinguish JSX from HTML and understand transpilation', 'Use map, ternaries and short-circuit operators in markup'],
          sections: [
            { heading: 'JSX is not HTML', body: 'JSX compiles to function calls via Babel or Vite\'s esbuild transform. Class becomes className, htmlFor replaces for, and every tag must close. Expressions live inside curly braces — no statements, just values. Understanding this compilation demystifies errors and keeps debugging fast.' },
            { heading: 'Conditional rendering patterns', body: 'Short-circuit with && for show/hide, ternaries for either/or, and early returns for guard clauses. Avoid embedding booleans directly in JSX (0 renders nothing confusingly with &&). Extract complex conditionals into helper variables above the return for readability.' },
            { heading: 'Lists and keys', body: 'Use Array.map to render collections and provide stable, unique keys derived from data identifiers — never array indices for sorted/filterable lists. Keys help React reconcile which items changed, were added or removed. Poor key choices cause silent UI bugs: stale inputs, broken transitions, wrong item removal.' }
          ],
          links: [
            { title: 'Writing markup with JSX', url: 'https://react.dev/learn/writing-markup-with-jsx', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Official JSX syntax fundamentals.' },
            { title: 'JavaScript expressions in JSX', url: 'https://react.dev/learn/javascript-in-jsx-with-curly-braces', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Embedding values and logic in components.' },
            { title: 'Array.prototype.map', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'The iteration primitive behind list rendering.' }
          ],
          quiz: { prompt: 'Why must list items have stable, unique keys?', options: ['For CSS styling hooks', 'So React can efficiently track which items changed during reconciliation', 'To prevent XSS attacks', 'For accessibility landmarks'], answerIndex: 1, explanation: 'Keys let React match old and new list items by identity rather than position, enabling targeted DOM updates instead of re-rendering the entire list.' }
        },
        {
          slug: 'function-components-and-props',
          title: 'Function Components & Props',
          minutes: 28,
          objectives: ['Compose UIs from small, single-responsibility function components', 'Design typed prop interfaces with defaults and children', 'Apply composition over inheritance patterns'],
          sections: [
            { heading: 'Components as functions', body: 'A React function component is a function that accepts a props object and returns JSX. No this binding, no lifecycle methods — just a function. Keep components pure during render: same inputs must produce the same JSX. Side effects, data fetching and subscriptions belong in effects, not render bodies.' },
            { heading: 'Props flow downward', body: 'Props are the interface contract of a component. Destructure what you need, provide defaults for optional values with destructuring defaults, and never mutate the props object. Children is a special prop enabling composition — pass markup between component tags for maximum flexibility.' },
            { heading: 'Composition patterns', body: 'Compose complex UIs by nesting simple components. Pass components as props for slots (like header, footer). Extract repeated markup into shared components. Inheritance hierarchies create rigid coupling; composition keeps components independent and testable.' }
          ],
          links: [
            { title: 'Your first component', url: 'https://react.dev/learn/your-first-component', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Official component creation fundamentals.' },
            { title: 'Passing props to a component', url: 'https://react.dev/learn/passing-props-to-a-component', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Props mechanics and design patterns.' },
            { title: 'Function component vs class component', url: 'https://react.dev/learn/state-of-a-component', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Why modern React favors function components.' }
          ],
          quiz: { prompt: 'A component receives a prop object and modifies a field before returning JSX. What problem does this cause?', options: ['No problem — props are mutable', 'Props are read-only; mutation can cause unexpected rendering bugs and breaks React\'s predictable data flow', 'Only performance issues', 'TypeScript will prevent it at runtime'], answerIndex: 1, explanation: 'Mutating props violates React\'s one-way data flow and can cause bugs where parent and child disagree about state. Always treat props as immutable.' }
        },
        {
          slug: 'rendering-lifecycle',
          title: 'Rendering & Reconciliation',
          minutes: 28,
          objectives: ['Describe the render-commit cycle and when it triggers', 'Use React DevTools to identify unnecessary re-renders', 'Apply key-based remounting and conditional mounting deliberately'],
          sections: [
            { heading: 'The render phase', body: 'When state or props change, React calls your component function again to produce new JSX. This render phase is pure — no DOM mutations, no side effects. React then diffs the new virtual tree against the previous one and applies minimal DOM updates in the commit phase.' },
            { heading: 'Reconciliation and keys', body: 'React compares element types and keys to decide what to update, reuse or destroy. Changing a key forces a full unmount/remount — useful for resetting component state. Type changes (div to section) always destroy and recreate. Understanding reconciliation prevents subtle bugs with list ordering and state retention.' },
            { heading: 'Why re-renders happen', body: 'State updates, parent re-renders, and context changes all trigger re-renders. Not all re-renders are wasteful — React is fast. Profile with DevTools to find actual bottlenecks before memoizing. Premature optimization adds complexity without measurable wins.' }
          ],
          links: [
            { title: 'Render and commit', url: 'https://react.dev/learn/render-and-commit', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Official render lifecycle explanation.' },
            { title: 'React DevTools Profiler', url: 'https://react.dev/learn/react-devtools', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Measuring re-renders in practice.' },
            { title: 'Reconciliation algorithm', url: 'https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'How React decides what to update.' }
          ],
          quiz: { prompt: 'A parent component re-renders ten child components, but only one child\'s data changed. React will…', options: ['Skip all ten children entirely', 'Re-render all ten but only commit DOM changes where JSX differs', 'Only call the one child\'s function', 'Use a timer to batch updates'], answerIndex: 1, explanation: 'React re-calls every child\'s render function but only touches the DOM where actual differences exist. This is why render functions should be pure and fast.' }
        }
      ]
    },
    {
      slug: 'hooks-and-side-effects',
      stage: 'Foundation',
      title: 'Hooks & Side Effects',
      description: 'The built-in hooks that give function components state, effects, context and performance optimizations.',
      topics: [
        {
          slug: 'usestate-and-useeffect',
          title: 'useState & useEffect',
          minutes: 30,
          objectives: ['Manage local state with useState and functional updates', 'Synchronize with external systems using useEffect', 'Handle cleanup and dependency arrays correctly'],
          sections: [
            { heading: 'State updates are batches', body: 'React 18 batches state updates automatically. Multiple set calls inside event handlers produce one re-render. State snapshots capture the value at render time — stale closures are the most common hook bug. Use the functional updater form when next state depends on previous state.' },
            { heading: 'Effects synchronize, not transform', body: 'useEffect runs after the browser paints and is designed to synchronize with external systems: subscriptions, timers, analytics, manual DOM measurements. It is not for computing derived data — that goes directly in the render body. Effects without cleanup accumulate side effects on every render.' },
            { heading: 'Dependency discipline', body: 'The dependency array must contain every value from the component scope that the effect reads. Lying to the dependency array (omitting values) causes stale closures. Use ESLint\'s exhaustive-deps rule — it catches real bugs. If an effect re-runs too often, restructure the code rather than suppressing the lint.' }
          ],
          links: [
            { title: 'State: a component\'s memory', url: 'https://react.dev/learn/state-a-components-memory', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Official useState fundamentals.' },
            { title: 'Synchronizing with effects', url: 'https://react.dev/learn/synchronizing-with-effects', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'When and how to use useEffect correctly.' },
            { title: 'You might not need an effect', url: 'https://react.dev/learn/you-might-not-need-an-effect', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Common misuse patterns and alternatives.' }
          ],
          quiz: { prompt: 'An effect fetches data but never cleans up the AbortController. What risk does this create?', options: ['No risk — fetch always completes', 'Memory leaks and stale-state updates if the component unmounts before fetch resolves', 'Only a performance penalty', 'A TypeScript error'], answerIndex: 1, explanation: 'Without cleanup, in-flight requests can update state on an unmounted component, causing memory leaks and React warnings. Always return a cleanup function that aborts or unsubscribes.' }
        },
        {
          slug: 'usecontext-and-providers',
          title: 'useContext & Provider Pattern',
          minutes: 28,
          objectives: ['Share cross-cutting state without prop drilling', 'Create provider components with logical context boundaries', 'Avoid context performance pitfalls with selective splitting'],
          sections: [
            { heading: 'Context shares, not replaces', body: 'Context passes data down the component tree without explicit props — useful for themes, auth, locale. But every consumer re-renders when any context value changes. Split contexts by update frequency: auth context rarely changes, filter context changes constantly. They should not share a provider.' },
            { heading: 'Provider composition', body: 'Wrap children in logical context boundaries, not one giant provider at the root. A ThemeProvider wraps only the themed UI, an AuthProvider wraps only routes needing auth. Compose providers in layout components. This limits re-render scope and makes dependencies visible.' },
            { heading: 'When context is not enough', body: 'Context transmits data but does not provide update functions or derived computations efficiently. For frequently changing state consumed by many components, a state management library with selectors (like Zustand or Jotai) avoids the full-tree re-render problem context has. Context is for infrequent, cross-cutting values.' }
          ],
          links: [
            { title: 'Passing data deeply with context', url: 'https://react.dev/learn/passing-data-deeply-with-context', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Official context and use fundamentals.' },
            { title: 'Scaling up with reducer and context', url: 'https://react.dev/learn/scaling-up-with-reducer-and-context', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Combining context with useReducer for complex state.' },
            { title: 'useContext reference', url: 'https://react.dev/reference/react/useContext', sourceName: 'React Documentation', resourceType: 'reference', relationship: 'API reference and behavior details.' }
          ],
          quiz: { prompt: 'A context provides { user, theme } and theme changes frequently. How does this affect performance?', options: ['No impact — context is optimized automatically', 'All consumers re-render on every theme change, even if they only read user', 'Only the provider re-renders', 'React skips the re-render if values are structurally equal'], answerIndex: 1, explanation: 'Context triggers re-renders in all consumers when any value changes. Splitting into separate contexts — AuthContext and ThemeContext — limits re-render scope.' }
        },
        {
          slug: 'useRef-and-memo',
          title: 'useRef, useMemo & useCallback',
          minutes: 30,
          objectives: ['Store mutable values without triggering re-renders', 'Stabilize expensive computations with useMemo', 'Preserve referential identity with useCallback for child components'],
          sections: [
            { heading: 'useRef: values that persist without re-rendering', body: 'useRef holds a mutable .current that survives re-renders without causing them. Perfect for DOM access (scrollIntoView, focus), storing previous values, and holding timers/intervals. Unlike useState, updating ref.current does not schedule a re-render — it is a side-channel for imperative data.' },
            { heading: 'Memoization is an optimization, not a default', body: 'useMemo caches expensive computations between renders; useCallback caches function references. Both trade memory for fewer recomputations. Profile first — if a component re-renders infrequently or the computation is cheap, memoization adds complexity without measurable benefit. Let the React Compiler handle routine cases in modern codebases.' },
            { heading: 'Stable references matter for children', body: 'When passing callbacks to memoized child components (React.memo), unstable function references defeat the optimization because every parent re-render creates a new function. useCallback wraps the function to preserve identity. Only worth it when profiling shows the child is a genuine bottleneck.' }
          ],
          links: [
            { title: 'Referencing values with useRef', url: 'https://react.dev/learn/referencing-values-with-refs', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Official useRef usage and patterns.' },
            { title: 'You might not need useMemo', url: 'https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'When memoization earns its complexity.' },
            { title: 'Stable callback references', url: 'https://react.dev/reference/react/useCallback', sourceName: 'React Documentation', resourceType: 'reference', relationship: 'API reference for useCallback semantics.' }
          ],
          quiz: { prompt: 'useRef is preferred over useState when the value should…', options: ['Trigger a re-render when changed', 'Persist across renders without causing re-renders', 'Be accessible from child components via props', 'Sync with an external API'], answerIndex: 1, explanation: 'useRef holds mutable values that survive re-renders without triggering them — ideal for DOM nodes, timers and previous values that do not affect rendering.' }
        }
      ]
    },
    {
      slug: 'composition-and-state-management',
      stage: 'Intermediate',
      title: 'Composition & State Management',
      description: 'Component patterns, shared state strategies, routing and building robust data-driven UIs.',
      topics: [
        {
          slug: 'lifting-state-and-controlled-components',
          title: 'Lifting State & Controlled Components',
          minutes: 28,
          objectives: ['Identify shared state and lift it to the common ancestor', 'Build controlled form components with typed props', 'Apply the single source of truth principle consistently'],
          sections: [
            { heading: 'The lifting pattern', body: 'When two sibling components need the same value, lift the state to their nearest common parent and pass it down as props. This keeps one source of truth without global stores. Start here before reaching for context or external libraries — lifting is the simplest correct solution.' },
            { heading: 'Controlled components', body: 'A controlled component receives its value and onChange handler via props, making the parent the source of truth. This pattern gives full control: validation, formatting, conditional behavior. Uncontrolled components (with defaultValue) are simpler but sacrifice this control — use them for initial-load forms that do not need real-time coordination.' },
            { heading: 'Extracting shared behavior', body: 'When multiple components share similar state logic, extract a custom hook that encapsulates the pattern (useToggle, usePagination, useDebouncedSearch). Custom hooks return values and setters, letting components stay thin while sharing behavior cleanly.' }
          ],
          links: [
            { title: 'Sharing state between components', url: 'https://react.dev/learn/sharing-state-between-components', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Official state-lifting guidance.' },
            { title: 'Conditional rendering', url: 'https://react.dev/learn/conditional-rendering', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Pattern for rendering based on lifted state.' },
            { title: 'Reacting to input with state', url: 'https://react.dev/learn/reacting-to-input-with-state', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'State-driven UI pattern foundation.' }
          ],
          quiz: { prompt: 'Two sibling components need to stay in sync. The simplest first approach is…', options: ['Global Redux store', 'Lift the shared state to their common parent and pass props down', 'Broadcast custom DOM events', 'Store in localStorage'], answerIndex: 1, explanation: 'Lifting state to the nearest common ancestor is React\'s canonical pattern. It is explicit, testable and does not add external dependencies.' }
        },
        {
          slug: 'custom-hooks-patterns',
          title: 'Custom Hooks & Reusable Logic',
          minutes: 30,
          objectives: ['Extract logic into custom hooks with clear interfaces', 'Compose custom hooks together for complex behaviors', 'Name and structure hooks following community conventions'],
          sections: [
            { heading: 'What makes a custom hook', body: 'Any function whose name starts with use and may call other hooks is a custom hook. They let you extract component logic into reusable functions without changing the component hierarchy. A custom hook should do one thing and expose a minimal, well-typed interface. If it manages unrelated concerns, split it.' },
            { heading: 'Composition inside hooks', body: 'Custom hooks compose naturally: a useAuth hook may call useContext, a useFetch hook may use useState and useEffect internally. The consumer does not care — it just calls useAuth().name. This layering builds complex behaviors from simple, testable pieces without prop drilling or wrapper components.' },
            { heading: 'Testing custom hooks', body: 'Custom hooks are testable in isolation using renderHook from testing utilities. Test edge cases, error states and cleanup behavior without mounting full component trees. Well-tested hooks become reliable shared infrastructure across the application.' }
          ],
          links: [
            { title: 'Reusing logic with custom hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Official custom hooks curriculum.' },
            { title: 'Building a custom useFetch hook', url: 'https://react.dev/reference/react/useEffect#fetching-data', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Practical data-fetching hook pattern.' },
            { title: 'Rules of hooks', url: 'https://react.dev/reference/react/rules-of-hooks', sourceName: 'React Documentation', resourceType: 'reference', relationship: 'The two rules every custom hook must satisfy.' }
          ],
          quiz: { prompt: 'A function calls useState but does not start with "use". Is this a valid custom hook?', options: ['Yes — the prefix is just a convention', 'No — React\'s linter relies on the "use" prefix to enforce the rules of hooks', 'Only if it returns JSX', 'Only if it takes props'], answerIndex: 1, explanation: 'The "use" prefix is how React\'s lint plugin verifies hooks rules (no conditional calls). A function violating this can silently break hook ordering.' }
        },
        {
          slug: 'react-router-patterns',
          title: 'Client-Side Routing with React Router',
          minutes: 28,
          objectives: ['Define routes with parameters and nested layouts', 'Manage navigation state and URL synchronization', 'Implement loaders and error boundaries per route segment'],
          sections: [
            { heading: 'Routes as component trees', body: 'Modern declarative routers map URL paths to component trees with nested layouts. A parent route defines a layout shell (sidebar, header), and child routes render into an Outlet. This mirrors component composition — the URL selects which branch of the tree renders, not which page loads.' },
            { heading: 'URL params and search state', body: 'Dynamic segments (/orders/:id) and search params (?status=pending) encode UI state in the URL, making it shareable and bookmarkable. Sync filter and pagination state to search params; persist form drafts to local state, not the URL. This distinction keeps URLs meaningful and shareable.' },
            { heading: 'Data loading patterns', body: 'Route-level loaders fetch data before rendering, eliminating waterfall fetches in nested routes. Error boundaries catch per-route failures without crashing the whole app. Loading indicators per route segment (not global) give users precise feedback. Treat each route as a feature with its own data, loading and error states.' }
          ],
          links: [
            { title: 'React Router docs', url: 'https://reactrouter.com/start/framework/routing', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Official routing patterns for React.' },
            { title: 'Nested routes and layouts', url: 'https://reactrouter.com/start/framework/layouts', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Layout composition with Outlet.' },
            { title: 'Data loading in React Router', url: 'https://reactrouter.com/start/framework/data-loading', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Route-level data fetching patterns.' }
          ],
          quiz: { prompt: 'Filter state that should survive page refreshes and be shareable belongs in…', options: ['useState', 'useRef', 'URL search params', 'localStorage'], answerIndex: 2, explanation: 'URL search params persist across refreshes, are shareable via link, and restore state on navigation — ideal for filters, pagination and sort order.' }
        }
      ]
    },
    {
      slug: 'testing-performance-and-deployment',
      stage: 'Advanced',
      title: 'Testing, Performance & Deployment',
      description: 'Testing React components, optimizing render performance, and shipping applications to production with confidence.',
      topics: [
        {
          slug: 'react-testing-strategies',
          title: 'Testing React Applications',
          minutes: 30,
          objectives: ['Test component behavior with React Testing Library', 'Write integration tests that mirror user interactions', 'Structure a test suite that catches real regressions'],
          sections: [
            { heading: 'Test behavior, not implementation', body: 'Query by role, label and text — the way users and assistive tech interact with your UI. Avoid querying by class names, internal state or component internals. Tests that assert on implementation details break on refactors that do not change behavior. When the test fails and the user would not notice, the test is wrong.' },
            { heading: 'User-event over fireEvent', body: 'userEvent simulates real interaction sequences: click includes mousedown, focus, mouseup. fireEvent fires a single synthetic event. userEvent catches bugs that fireEvent misses because real users trigger full event chains. Use userEvent for every user interaction test.' },
            { heading: 'Testing async behavior', body: 'Wait for loading states to resolve with findBy or waitFor before asserting. Test error states by mocking network failures. Integration tests cover the full component tree; unit tests exercise isolated logic. A few end-to-end tests on critical paths complete the strategy — do not aim for 100% coverage everywhere.' }
          ],
          links: [
            { title: 'Writing tests for React', url: 'https://react.dev/learn/writing-tests', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Official testing philosophy and patterns.' },
            { title: 'React Testing Library docs', url: 'https://testing-library.com/docs/react-testing-library/intro/', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Testing library fundamentals and query priority.' },
            { title: 'Testing Library guiding principles', url: 'https://testing-library.com/docs/guiding-principles', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'The philosophy behind testing by user behavior.' }
          ],
          quiz: { prompt: 'The preferred way to find a button in a test is…', options: ['screen.getByClassName("submit-btn")', 'screen.getByRole("button", { name: "Submit" })', 'document.querySelector("button")', 'screen.getByTestId("submit")'], answerIndex: 1, explanation: 'Queries by role mirror how users and assistive technology find elements. They remain valid after visual refactors that change classes or IDs.' }
        },
        {
          slug: 'performance-optimization',
          title: 'React Performance Optimization',
          minutes: 30,
          objectives: ['Profile and fix unnecessary re-renders with React DevTools', 'Apply memo, useMemo and useCallback where profiling justifies', 'Implement code splitting, lazy loading and virtualization for large lists'],
          sections: [
            { heading: 'Profile before you optimize', body: 'React DevTools Profiler shows exactly which components re-rendered and why. Highligting unnecessary re-renders is the starting point — do not guess. If a re-render is fast enough that the user never notices, optimization adds complexity for zero benefit. Measure frame budgets: 16ms per frame for 60fps.' },
            { heading: 'Memoization as targeted fix', body: 'React.memo wraps a component to skip re-renders when props have not changed. useMemo caches computed values; useCallback caches functions. Each targets a specific bottleneck identified by profiling. The React Compiler automates much of this in newer codebases — manual memoization is a scalpel, not a blanket.' },
            { heading: 'Splitting and virtualizing', body: 'Route-level code splitting with React.lazy shrinks the initial bundle — only load what the current route needs. Virtualize long lists (react-window, tanstack-virtual) so only visible items render. Image lazy loading with native loading="lazy" and intersection observer handle below-the-fold media cheaply.' }
          ],
          links: [
            { title: 'React Profiler API', url: 'https://react.dev/reference/react/Profiler', sourceName: 'React Documentation', resourceType: 'reference', relationship: 'Measuring render performance programmatically.' },
            { title: 'Optimizing performance', url: 'https://react.dev/learn/rendering-lists#vue-no', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Official performance optimization guidance.' },
            { title: 'Code splitting with lazy', url: 'https://vite.dev/guide/features.html#dynamic-import', sourceName: 'Vite Documentation', resourceType: 'documentation', relationship: 'Vite dynamic import and chunk splitting.' }
          ],
          quiz: { prompt: 'A list of 500 items re-renders every time a filter changes. The best first optimization is…', options: ['Wrap every child in React.memo', 'Virtualize the list to render only visible items', 'Replace React with another framework', 'Move state to localStorage'], answerIndex: 1, explanation: 'Virtualization renders only visible items, reducing DOM nodes from 500 to ~15. This is a higher-impact optimization than individual memoization when the list is large.' }
        },
        {
          slug: 'production-deployment',
          title: 'Production Build & Deployment',
          minutes: 28,
          objectives: ['Configure Vite for production builds with environment variables', 'Implement error boundaries, monitoring and graceful degradation', 'Deploy to static hosts with proper caching and fallback strategies'],
          sections: [
            { heading: 'Build configuration', body: 'Vite\'s production build uses esbuild for fast bundling and Rollup for output optimization. Configure base paths for subdirectory deploys, set environment variables via .env files (VITE_ prefix exposed to client), and analyze bundle size with vite-plugin-visualizer. Never ship secrets in client bundles — anything in VITE_ is public.' },
            { heading: 'Error boundaries and monitoring', body: 'React error boundaries catch render errors and display fallback UI instead of a blank white screen. Wrap route-level boundaries around pages, not the entire app. Integrate error monitoring (Sentry, LogRocket) inside boundaries to capture stack traces. Combine with runtime logging for diagnosis in production.' },
            { heading: 'Static hosting and caching', body: 'React apps compile to static assets deployable to CDNs (Netlify, Vercel, Cloudflare Pages). Configure cache headers: immutable hashed assets get long TTLs, index.html gets no-cache so users always get the latest version hash. History API fallback is required for client-side routing — configure it for your host.' }
          ],
          links: [
            { title: 'Vite environment variables', url: 'https://vite.dev/guide/env-and-mode', sourceName: 'Vite Documentation', resourceType: 'documentation', relationship: 'Environment variable configuration for builds.' },
            { title: 'Deploying with Vite', url: 'https://vite.dev/guide/static-deploy', sourceName: 'Vite Documentation', resourceType: 'documentation', relationship: 'Production deployment and host configuration.' },
            { title: 'Error boundaries reference', url: 'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary', sourceName: 'React Documentation', resourceType: 'reference', relationship: 'Catching and handling render errors in production.' }
          ],
          quiz: { prompt: 'After deploying a React app, users report seeing the old version despite your changes. Most likely cause?', options: ['React cache bug', 'CDN/browser serving cached index.html without checking for new asset hashes', 'JavaScript disabled', 'Wrong React version'], answerIndex: 1, explanation: 'If index.html is cached with a long TTL, users keep loading old asset references. Set Cache-Control: no-cache on index.html so browsers always validate, while hashed assets get immutable long caching.' }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Task Manager Application Specification',
    coverage: ['React Component Architecture', 'Hooks & State', 'TypeScript Integration', 'Performance Considerations', 'Testing Strategy'],
    brief:
      'Design and specify a full-featured task manager React application: component hierarchy with typed props, state management strategy, hook usage for shared logic, data fetching flow with all UI states, and a performance optimization plan. The app supports creating, filtering and sorting tasks with user authentication.',
    requirements: [
      'Component tree with responsibilities and typed props',
      'State ownership map (which component owns which state)',
      'Custom hooks for shared logic (at least two)',
      'Loading, error, empty and success states per data-driven view',
      'Performance optimization plan for a 1000+ task list'
    ],
    expectedOutput:
      'A structured implementation specification that a React developer could use to build the application without clarification.',
    rubric: [
      { skill: 'Component architecture', weight: 25, criteria: 'Sensible decomposition, single-responsibility components, composition over inheritance' },
      { skill: 'State management', weight: 25, criteria: 'Correct state placement, lifting strategy, context usage justified where needed' },
      { skill: 'Hooks proficiency', weight: 20, criteria: 'Clean custom hooks with typed interfaces, correct dependency arrays, cleanup handled' },
      { skill: 'TypeScript quality', weight: 15, criteria: 'Precise types, no any, discriminated unions for component variants' },
      { skill: 'Performance reasoning', weight: 15, criteria: 'Measurable optimization tied to profiling, virtualization or memoization with rationale' }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'Component Library Foundation',
      stage: 'Foundation',
      objective: 'Build a small, typed React component library: Button, Input, Card and Modal with consistent prop interfaces.',
      requirements: ['TypeScript props interfaces with variants and defaults', 'Composition pattern (children, render props)', 'Accessible markup with ARIA attributes', 'Storybook or demo page showing all variants', 'Unit tests for core behavior'],
      skillsEvaluated: ['React', 'TypeScript', 'Component Architecture', 'Accessibility'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: { instructions: 'Submit your component library with documentation on prop interfaces and usage examples.', textLabel: 'Component library walkthrough', minTextLength: 1000 }
    },
    {
      title: 'Custom Hook Collection',
      stage: 'Intermediate',
      objective: 'Extract and implement five production-quality custom hooks with TypeScript, tests and documentation.',
      requirements: ['useDebounce, useLocalStorage, useFetch, usePagination, useMediaQuery implementations', 'Full TypeScript generics and return types', 'Tests using renderHook', 'Usage examples and edge case documentation', 'Cleanup and error handling in async hooks'],
      skillsEvaluated: ['React Hooks', 'TypeScript', 'Testing', 'Code Organization'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: { instructions: 'Submit each hook implementation with tests and documentation.', textLabel: 'Custom hooks collection', minTextLength: 1200, linkLabels: ['GitHub repository with hooks'] }
    },
    {
      title: 'Performance Audit & Optimization Plan',
      stage: 'Advanced',
      objective: 'Audit a provided slow React dashboard and produce a prioritized remediation plan with profiling evidence.',
      requirements: ['Identify re-render bottlenecks using Profiler traces', 'Evaluate lazy loading, virtualization and memoization opportunities', 'Propose code-splitting boundaries by route', 'Define measurement plan with before/after Core Web Vitals', 'Rollback strategy for each optimization'],
      skillsEvaluated: ['Web Performance', 'React Rendering', 'Tooling', 'Professional Communication'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: { instructions: 'Submit the audit report with profiling evidence and prioritized fix table.', textLabel: 'Performance audit report', minTextLength: 1100, linkLabels: ['Profiling screenshots or traces'] }
    }
  ],

  simTasks: [
    {
      title: 'P0: Production white screen after deploy',
      context: 'After today\'s release, 30% of users report a blank white screen on the dashboard. Error monitoring shows "Cannot read properties of undefined" in a recently changed component.',
      requirements: ['Triage approach: check error monitoring, identify affected component', 'Immediate mitigation (rollback vs hotfix)', 'Root cause hypothesis and fix plan', 'Communication to stakeholders'],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Incident note: diagnosis path, chosen mitigation, status update draft.',
      skills: ['Debugging', 'Error Boundaries', 'Deployment']
    },
    {
      title: 'State management for real-time notifications',
      context: 'Product wants a notification bell component that receives real-time updates, shows unread count, and supports marking individual notifications as read. Currently notifications are fetched once on mount.',
      requirements: ['State ownership design (local vs shared context)', 'Real-time update strategy (polling, SSE, WebSocket)', 'Optimistic marking as read with reconciliation', 'Component structure with typed interfaces'],
      priority: 'high',
      dueDayOffset: 4,
      expectedOutput: 'Implementation plan with state diagram and component tree.',
      skills: ['React', 'State Management', 'TypeScript']
    },
    {
      title: 'Accessibility audit response',
      context: 'QA reports that the navigation menu is not keyboard-operable and the color contrast on secondary buttons fails WCAG AA. Product wants both fixed before next release.',
      requirements: ['Keyboard interaction fix plan (focus trap, arrow keys, Escape)', 'Color contrast remediation with specific hex values', 'Automated accessibility test additions', 'Manual testing checklist for the fix'],
      priority: 'normal',
      dueDayOffset: 6,
      expectedOutput: 'Fix specification ready for implementation with acceptance criteria.',
      skills: ['Accessibility', 'React Components', 'CSS']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Kai Nakamura',
      personaRole: 'Backend Engineer',
      situation: 'API response shape changed without notice.',
      openingMessage:
        'We refactored the user endpoint to nest profile data under a "profile" key instead of spreading it flat. I know your components read from the flat shape — wanted to give you a heads up before it hits staging tonight. Want the swagger docs link?',
      expectedPoints: ['Asks for migration timeline and versioning approach', 'Outlines affected components or a migration path', 'Proposes a shared contract-testing approach for the future', 'Confirms verification steps before the change deploys']
    },
    {
      kind: 'team',
      personaName: 'Priya Sharma',
      personaRole: 'UX Designer',
      situation: 'Design review for a complex modal interaction.',
      openingMessage:
        'The new filter modal needs to remember scroll position when reopened, support keyboard navigation between sections, and announce active filters to screen readers. Can we walk through the interaction before I hand off the final mockup?',
      expectedPoints: ['Assesses technical feasibility of each requirement honestly', 'Raises focus management and ARIA considerations', 'Suggests simplifications where justified by complexity vs user value', 'Agrees on a verification approach with the designer']
    },
    {
      kind: 'client',
      personaName: 'Elena Voss',
      personaRole: 'Product Owner, NovaMart',
      situation: 'Client requests a feature that conflicts with performance budget.',
      openingMessage:
        'We need a live product feed that updates every second showing all active auctions. The sales team is excited about urgency. How fast can this go in?',
      expectedPoints: ['Explains the performance impact of per-second full re-renders', 'Proposes alternatives (websockets with incremental updates, virtualized list)', 'Frames the trade-off in user-impact terms', 'Offers a phased approach meeting the core need within budget']
    },
    {
      kind: 'client',
      personaName: 'Marcus Bell',
      personaRole: 'CTO, GreenLeaf',
      situation: 'Client concerned about React version upgrade.',
      openingMessage:
        'We are still on React 16.8. Sales says we need React 19 features for the new product. How risky is this upgrade and what does it actually cost us to stay behind?',
      expectedPoints: ['Assesses actual dependency on new features vs marketing claims', 'Outlines migration risks and testing strategy', 'Explains what is gained vs what is lost staying current', 'Provides a realistic timeline with risk mitigation']
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'Sprint demo in 30 minutes. The feature branch you are presenting throws a hydration mismatch error only in production build — dev mode works fine. The CEO is joining the demo.',
      requiredActions: [
        { action: 'Reproduce in a production-like build locally (vite build && vite preview)', good: true, note: 'Dev mode hides SSR/hydration issues — test in the mode that matches production.' },
        { action: 'Identify the mismatch source: date-dependent rendering, browser-only API access, or stale server HTML', good: true, note: 'Systematic diagnosis prevents patching the wrong thing.' },
        { action: 'Apply a targeted fix or wrap the problematic area in a no-SSR boundary', good: true, note: 'A scoped fix under time pressure beats a full refactor.' },
        { action: 'Cancel the demo because it is not perfect', good: false, note: 'Working software with a known minor issue beats no demo at all.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'Product decides mid-sprint to replace the current table component with a third-party data grid library. The sprint has 4 days left and the table is used in 6 screens.',
      requiredActions: [
        { action: 'Assess the actual impact: how many screens, shared logic, migration effort', good: true, note: 'Scope reality before committing to the change.' },
        { action: 'Flag the risk to sprint goals with a written estimate, propose deferring to next sprint', good: true, note: 'Making constraints visible lets PMs make informed priority calls.' },
        { action: 'Implement it immediately because the PM seems stressed', good: false, note: 'Rushing a 6-screen migration under time pressure guarantees regressions.' },
        { action: 'Propose a phased approach: migrate the most-used screen this sprint, plan the rest', good: true, note: 'Phasing delivers value incrementally while protecting quality.' }
      ]
    }
  ],

  interviewQuestions: [
    { dimension: 'technical_knowledge', prompt: 'Explain the React rendering lifecycle: what triggers a re-render, what happens during render, and what happens after.', guidancePoints: ['State/prop/context changes trigger re-renders', 'Render phase: function called, JSX produced, virtual DOM diffed', 'Commit phase: DOM mutations applied, effects scheduled', 'React 18 automatic batching behavior'] },
    { dimension: 'technical_knowledge', prompt: 'When would you use useRef instead of useState, and vice versa?', guidancePoints: ['useRef for mutable values that should not trigger renders', 'useState for values that affect the UI', 'Common useRef cases: DOM access, timers, previous values', 'When updating without re-render is a bug, not a feature'] },
    { dimension: 'problem_solving', prompt: 'A component re-renders 200 times per second when an input changes. Profile and fix it.', guidancePoints: ['Use React DevTools Profiler to identify the source', 'Check for unstable props defeating React.memo', 'Evaluate whether state can be lifted or split', 'Consider debouncing the input handler'] },
    { dimension: 'problem_solving', prompt: 'Design a notification system that shows real-time updates without polling.', guidancePoints: ['WebSocket or SSE for server push', 'State management for unread count and notification list', 'Optimistic UI for mark-as-read', 'Reconnection strategy for dropped connections'] },
    { dimension: 'professional_reasoning', prompt: 'A team member wants to introduce Redux for a new feature that only needs two pieces of shared state. React.', guidancePoints: ['Evaluate if context + useReducer is sufficient', 'Assess the maintenance and learning-curve cost', 'Propose the lighter solution with reasoning', 'Acknowledge when Redux genuinely wins (complex middleware, devtools)'] },
    { dimension: 'professional_reasoning', prompt: 'When would you argue against writing tests for a particular component?', guidancePoints: ['Trivial presentational components with no logic', 'Test ROI: low-complexity, low-change-frequency components', 'When integration tests already cover the behavior', 'Never skip tests for complex stateful or business-critical components'] },
    { dimension: 'communication', prompt: 'Explain React\'s virtual DOM to a non-technical product manager.', guidancePoints: ['Analogy: React maintains a draft before committing changes', 'Why it matters: faster updates, fewer bugs visible to users', 'Connect to their concern: performance and user experience', 'No jargon, no implementation details'] },
    { dimension: 'communication', prompt: 'You discover during code review that a teammate\'s PR will cause a 40% bundle size increase. Address it constructively.', guidancePoints: ['Quantify the impact with specific metrics', 'Offer alternatives (lazy load, lighter library, tree-shaking)', 'Frame as a team concern, not personal criticism', 'Suggest a quick pair-programming session to find the solution'] }

  ]

}
