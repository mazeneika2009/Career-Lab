import type { CareerDef } from '../framework.js'

export const frontendDeveloper: CareerDef = {
  slug: 'frontend-developer',
  name: 'Frontend Developer',
  category: 'Development',
  order: 2,
  description:
    'Builds the client side of web products with HTML, CSS, JavaScript, React and TypeScript inside real team workflows.',
  difficulty: 'Beginner-friendly',
  pathSummary:
    'HTML/CSS/JS fundamentals → DOM & browser APIs → responsive & accessible UIs → React components/hooks/routing → TypeScript & API integration → performance, testing & deployment.',
  mainSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Accessibility', 'Web Performance', 'Git & GitHub'],
  sourcePlatforms: ['MDN Web Docs', 'W3Schools', 'React Documentation', 'TypeScript Documentation', 'web.dev', 'GitHub Documentation', 'Vite Documentation'],
  companyName: 'Brightline Web',
  roleTitle: 'Frontend Developer',

  chapters: [
    {
      slug: 'web-platform-core',
      stage: 'Beginner',
      title: 'Web Platform Core',
      description: 'The three languages of the browser: structure, presentation and behavior.',
      topics: [
        {
          slug: 'html-semantics',
          title: 'HTML & Semantic Structure',
          objectives: ['Write semantic documents with landmarks', 'Use forms and tables correctly', 'Validate markup against standards'],
          sections: [
            { heading: 'Semantics carry meaning', body: 'Elements describe purpose: nav, main, article, button. Semantic HTML gives accessibility tools and search engines your page map for free, and makes styling predictable.' },
            { heading: 'Forms and tables honestly', body: 'Label every input, group related fields with fieldset, choose correct input types for keyboards. Use tables for tabular data only — never layout.' }
          ],
          links: [
            { title: 'Learn HTML', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML', sourceName: 'MDN Web Docs', resourceType: 'course', relationship: 'Structured path through HTML fundamentals.' },
            { title: 'HTML tutorial', url: 'https://www.w3schools.com/html/', sourceName: 'W3Schools', resourceType: 'tutorial', relationship: 'Quick syntax reference while practicing.' },
            { title: 'Markup validator', url: 'https://validator.w3.org/', sourceName: 'W3C', resourceType: 'checklist', relationship: 'Verify your documents meet the standard.' }
          ],
          quiz: { prompt: 'Best element for the primary page navigation region?', options: ['<div class="nav">', '<nav>', '<header> always', '<ul> alone'], answerIndex: 1, explanation: '<nav> exposes a navigation landmark to assistive technology; div carries no meaning.' }
        },
        {
          slug: 'css-fundamentals',
          title: 'CSS Fundamentals',
          objectives: ['Apply selectors, cascade and specificity deliberately', 'Use flexbox and grid for layout', 'Keep styles maintainable with custom properties'],
          sections: [
            { heading: 'Cascade literacy', body: 'Predictable styling requires understanding origin, specificity and order. Prefer class-based selectors of similar weight over specificity wars, and scope overrides intentionally.' },
            { heading: 'Modern layout', body: 'Flexbox handles one-dimensional distribution inside components; grid structures two-dimensional page regions. Both use gap for spacing instead of margin hacks.' },
            { heading: 'Tokens in CSS', body: 'Custom properties (--color-primary) centralize decisions and enable theming. Define scales once, reference everywhere, override within scopes deliberately.' }
          ],
          links: [
            { title: 'CSS learning area', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS', sourceName: 'MDN Web Docs', resourceType: 'course', relationship: 'Complete CSS foundations course.' },
            { title: 'CSS grid tutorial', url: 'https://www.w3schools.com/css/css_grid.asp', sourceName: 'W3Schools', resourceType: 'tutorial', relationship: 'Hands-on grid syntax.' },
            { title: 'CSS reference', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'Authoritative property documentation.' }
          ],
          quiz: { prompt: 'Space between items in a flex container is best set with…', options: ['margin on every child', 'gap on the container', 'padding on children', 'float'], answerIndex: 1, explanation: 'gap expresses distribution intent once on the container and adapts to dynamic item counts.' }
        },
        {
          slug: 'javascript-language',
          title: 'JavaScript Essentials',
          objectives: ['Work with values, functions and objects fluently', 'Use array methods for data transformation', 'Handle errors and modules properly'],
          sections: [
            { heading: 'Language core', body: 'Master primitives, references, closures and this before frameworks — React assumes them. Functions are values; scope determines lifetime; const/let signal intent.' },
            { heading: 'Data transformation', body: 'map/filter/reduce express data-to-UI pipelines declaratively. Mutating shared arrays causes subtle bugs; prefer returning new arrays from transformations.' },
            { heading: 'Modules and errors', body: 'ES modules organize code into importable units. Throw Error objects with useful messages; catch at boundaries; never swallow failures silently.' }
          ],
          links: [
            { title: 'JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Canonical language guide.' },
            { title: 'JavaScript tutorial', url: 'https://www.w3schools.com/js/', sourceName: 'W3Schools', resourceType: 'tutorial', relationship: 'Quick syntax reference.' },
            { title: 'JavaScript reference', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'Look up exact method behavior.' }
          ],
          quiz: { prompt: '[1,2,3].map(n => n * 2) returns…', options: ['undefined', 'A new array [2,4,6]', 'The same mutated array', '6'], answerIndex: 1, explanation: 'map projects each element into a new array, leaving the original untouched.' }
        }
      ]
    },
    {
      slug: 'dom-and-browser',
      stage: 'Foundation',
      title: 'DOM & Browser APIs',
      description: 'How scripts drive pages, and what else the browser gives you for free.',
      topics: [
        {
          slug: 'dom-manipulation',
          title: 'DOM Manipulation & Events',
          objectives: ['Select, create and update DOM nodes', 'Handle events with delegation', 'Understand reflow costs of direct manipulation'],
          sections: [
            { heading: 'The live tree', body: 'The browser parses HTML into a node tree your script can query and mutate. querySelector reads, appendChild/createElement writes. Frameworks automate this bookkeeping — but you must know what they automate.' },
            { heading: 'Event flow', body: 'Events bubble from target to ancestors. Attach one listener on a stable parent (delegation) to handle many children, including future ones added dynamically.' },
            { heading: 'Performance awareness', body: 'Reading layout (offsetHeight) after writes forces synchronous reflows. Batch DOM updates; measure with the Performance panel when lists stutter.' }
          ],
          links: [
            { title: 'Introduction to events', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Event model deep-dive.' },
            { title: 'Manipulating documents', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Practical DOM reading/writing patterns.' },
            { title: 'HTML DOM tutorials', url: 'https://www.w3schools.com/js/js_htmldom.asp', sourceName: 'W3Schools', resourceType: 'tutorial', relationship: 'Quick DOM method reference.' }
          ],
          quiz: { prompt: 'Event delegation means…', options: ['Copying listeners to each child', 'One listener on an ancestor handling events from descendants via bubbling', 'Preventing all events', 'Using inline onclick attributes'], answerIndex: 1, explanation: 'Bubbling lets a single ancestor listener serve dynamic child lists efficiently.' }
        },
        {
          slug: 'browser-apis',
          title: 'Browser APIs',
          objectives: ['Use fetch for network requests', 'Persist state with localStorage/sessionStorage', 'Reach for IntersectionObserver, history and geolocation appropriately'],
          sections: [
            { heading: 'fetch and JSON', body: 'fetch returns promises resolving to Response objects; parse with response.json() and check response.ok — network errors reject, HTTP errors do not. Always handle both paths.' },
            { heading: 'Storage APIs', body: 'localStorage persists strings synchronously per origin; sessionStorage clears with the tab. Never store tokens or secrets there — XSS reads it trivially. Store preferences, not credentials.' },
            { heading: 'Observers and history', body: 'IntersectionObserver powers lazy-loading without scroll math; History API enables client-side routing; Geolocation asks permission explicitly. These platform staples replace heavy libraries.' }
          ],
          links: [
            { title: 'Using the Fetch API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Authoritative fetch usage guide.' },
            { title: 'Web Storage API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Correct storage usage and limits.' },
            { title: 'Web APIs overview', url: 'https://developer.mozilla.org/en-US/docs/Web/API', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'Index of available browser interfaces.' }
          ],
          quiz: { prompt: 'A fetch to /api/x returns status 404. What happens?', options: ['The promise rejects automatically', 'It resolves; you must check response.ok yourself', 'The page throws immediately', 'Browser shows an error dialog'], answerIndex: 1, explanation: 'Only transport failures reject; HTTP error statuses resolve successfully, so check response.ok or status.' }
        },
        {
          slug: 'responsive-accessible-ui',
          title: 'Responsive & Accessible UI Code',
          objectives: ['Implement responsive layouts with media queries and fluid units', 'Meet keyboard and screen-reader expectations in markup', 'Test with keyboard and zoom'],
          sections: [
            { heading: 'Fluid implementation', body: 'Translate design breakpoints into media queries; size type with clamp(); make images fluid with max-width and srcset. Layout must survive 320px to ultrawide without horizontal scroll.' },
            { heading: 'Accessible behavior', body: 'Interactive elements need real buttons/links (keyboard operable), visible focus styles, labels tied to inputs, and alt text. ARIA patches gaps only after semantic HTML is exhausted.' },
            { heading: 'Verification habits', body: 'Tab through every screen; test 200% zoom; run Lighthouse audits in CI. Accessibility defects found in review cost minutes; found in production they cost users.' }
          ],
          links: [
            { title: 'Responsive design basics', url: 'https://web.dev/responsive-web-design-basics/', sourceName: 'web.dev', resourceType: 'guide', relationship: 'Implementation-focused responsive techniques.' },
            { title: 'Accessibility learning area', url: 'https://developer.mozilla.org/en-US/docs/Learn/Accessibility', sourceName: 'MDN Web Docs', resourceType: 'course', relationship: 'Building accessible interfaces end-to-end.' },
            { title: 'WCAG Quick Reference', url: 'https://www.w3.org/WAI/WCAG22/quickref/', sourceName: 'W3C', resourceType: 'reference', relationship: 'Normative criteria checklist.' }
          ],
          quiz: { prompt: 'Which change most improves keyboard accessibility of a custom dropdown?', options: ['Larger font', 'Real <button> trigger plus arrow-key/Escape handling and visible focus', 'Faster animation', 'More colors'], answerIndex: 1, explanation: 'Keyboard operability comes from native elements, focus management and key handling — not visual tweaks.' }
        }
      ]
    },
    {
      slug: 'react-engineering',
      stage: 'Intermediate',
      title: 'React Engineering',
      description: 'Components, state, hooks, routing and typed React applications.',
      topics: [
        {
          slug: 'react-components-state',
          title: 'React Components, Props & State',
          objectives: ['Compose UIs from function components', 'Pass data down with props', 'Manage local state and lifting patterns'],
          sections: [
            { heading: 'Component thinking', body: 'Split UIs by responsibility, not file convenience. Components take props in, render JSX out, stay side-effect-free during render. Composition beats inheritance everywhere in React.' },
            { heading: 'State placement', body: 'Start local with useState. When siblings need the same value, lift state to the nearest common parent. Reach for context or stores only when prop-drilling genuinely hurts.' },
            { heading: 'Rendering model', body: 'State changes schedule renders; renders must be pure. Deriving data during render (no duplicated state) prevents desynchronization bugs like “the count label lies”.' }
          ],
          links: [
            { title: 'Describing the UI', url: 'https://react.dev/learn/describing-the-ui', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Official components/props curriculum.' },
            { title: 'Managing state', url: 'https://react.dev/learn/managing-state', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'State placement and patterns.' },
            { title: 'Render and commit', url: 'https://react.dev/learn/render-and-commit', sourceName: 'React Documentation', resourceType: 'guide', relationship: 'Mental model of the render cycle.' }
          ],
          quiz: { prompt: 'Two sibling components need the same toggled value. Best first move?', options: ['Duplicate useState in both', 'Lift the state to their common parent and pass props', 'Use global Redux immediately', 'Store it in localStorage'], answerIndex: 1, explanation: 'Lifting state to the closest common ancestor is the canonical React pattern before reaching for global stores.' }
        },
        {
          slug: 'react-hooks-routing',
          title: 'Hooks, Effects & Routing',
          objectives: ['Use useEffect correctly for synchronization', 'Memoize with useMemo/useCallback where measured', 'Route declaratively with nested layouts'],
          sections: [
            { heading: 'Effects synchronize', body: 'useEffect runs after paint to sync with external systems — subscriptions, timers, analytics. Fetch-in-effect needs cleanup/abort handling; avoid effects that merely transform data.' },
            { heading: 'Memoization discipline', body: 'useMemo/useCallback trade memory for skipped recomputation. Profile first; premature memoization obscures code without measurable wins. React Compiler-era codebases often need far fewer manual memos.' },
            { heading: 'Routing', body: 'Declarative routers map URLs to component trees with nested layouts, loaders and params. Treat routes as features: co-locate data fetching, loading and error boundaries per route segment.' }
          ],
          links: [
            { title: 'Synchronizing with effects', url: 'https://react.dev/learn/synchronizing-with-effects', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'When and how to use useEffect.' },
            { title: 'Reusing logic with custom hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Extracting hook logic cleanly.' },
            { title: 'JavaScript closure reference', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'Closures underpin hook dependency semantics.' }
          ],
          quiz: { prompt: 'An effect keeps refetching forever. Most likely cause?', options: ['Too few dependencies', 'A dependency recreated every render (e.g., object literal) without memoization', 'Wrong HTTP method', 'Missing key prop'], answerIndex: 1, explanation: 'New object/array/function identities differ each render, retriggering effects. Stabilize dependencies or move data out of effect scope.' }
        },
        {
          slug: 'typescript-react',
          title: 'Typed React with TypeScript',
          objectives: ['Type props, state and events precisely', 'Model unions and generics for reusable components', 'Configure strictness sensibly'],
          sections: [
            { heading: 'Types as contracts', body: 'Explicit prop types document components and catch integration errors at compile time. Type event handlers with precise event types; avoid any which disables checking exactly where risk lives.' },
            { heading: 'Unions and generics', body: 'Discriminated unions model variant components (variant: "primary" | "ghost"). Generics keep list/select/table components reusable while preserving element typing.' },
            { heading: 'Strict configuration', body: 'Enable strict mode in tsconfig; treat new errors as bugs, not noise. Types describe runtime truth — if casts pile up, the model is wrong, not the language.' }
          ],
          links: [
            { title: 'Using TypeScript with React', url: 'https://react.dev/learn/typescript', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Official React + TypeScript guidance.' },
            { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', sourceName: 'TypeScript Documentation', resourceType: 'documentation', relationship: 'Complete language handbook.' },
            { title: 'Everyday types', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html', sourceName: 'TypeScript Documentation', resourceType: 'guide', relationship: 'Practical daily typings.' }
          ],
          quiz: { prompt: 'Prop variant limited to three literal strings should be typed as…', options: ['string', 'any', 'A union of string literals ("sm" | "md" | "lg")', 'object'], answerIndex: 2, explanation: 'Literal unions constrain values at compile time and power autocomplete — plain string accepts anything.' }
        }
      ]
    },
    {
      slug: 'state-management-data',
      stage: 'Intermediate',
      title: 'State Management & Data Layer',
      description: 'Choosing the right state strategy and building robust client-side data layers.',
      topics: [
        {
          slug: 'state-strategies',
          title: 'State Management Strategies',
          objectives: ['Classify state by ownership and lifetime', 'Choose local, lifted, context or global stores deliberately', 'Avoid over-engineering with interviews of stores'],
          sections: [
            { heading: 'Taxonomy of state', body: 'Server state lives on the backend and is cached client-side; URL state lives in search params and is shareable; local UI state dies with the component. Label each value before choosing where it lives — mislabeled state is the root of most store sprawl.' },
            { heading: 'Selecting a strategy', body: 'Start local (useState), lift to a common ancestor for siblings, reach for context for stable shared sessions, and global stores only for genuinely cross-cutting state like auth. If you cannot name two unrelated screens needing a value, it does not belong in a global store.' },
            { heading: 'Store interviews', body: 'Before adding a store, interview the candidate: what changes it, what reads it, and what is its lifetime? Answers that are all "one component" mean local state wins. Answers spanning sessions or routes justify the abstraction.' }
          ],
          links: [
            { title: 'Managing state documentation', url: 'https://react.dev/learn/managing-state', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Official React patterns for state ownership.' },
            { title: 'Scaling up global state', url: 'https://react.dev/learn/scaling-up-with-reducer-and-context', sourceName: 'React Documentation', resourceType: 'guide', relationship: 'Reducer + context composition before external stores.' },
            { title: 'JavaScript closures reference', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'The primitive underneath all state abstraction.' }
          ],
          quiz: { prompt: 'Best default for a value used by two sibling components?', options: ['Duplicate it in both', 'Lift it to their common parent and pass props', 'Put it in every store', 'Make it a global constant'], answerIndex: 1, explanation: 'Lifting to the nearest common ancestor is the canonical minimal step before reaching for heavier machinery.' }
        },
        {
          slug: 'data-layer-patterns',
          title: 'Client-side Data Layer Patterns',
          objectives: ['Centralize fetching with typed clients', 'Cache, deduplicate and invalidate sanely', 'Model mutation and optimistic UI'],
          sections: [
            { heading: 'One client seam', body: 'A single module owns baseURL, auth headers, and error normalization; domain functions wrap endpoints with typed returns. Components call getOrders(), never fetch. Swapping transports or adding retry touches one file.' },
            { heading: 'Stale-while-revalidate', body: 'Serve cached data immediately, refetch in the background, and update on arrival. Deduplicate in-flight identical requests. Invalidate caches on mutations that change the data shape. Hand-rolled caches rot; adopt a battle-tested data library.' },
            { heading: 'Mutations and optimism', body: 'Apply local updates immediately for low-collision actions, reconcile with the server response, and roll back on failure with a user-visible toast. Reserve optimism for reversible operations; non-idempotent or high-collision actions stay pessimistic.' }
          ],
          links: [
            { title: 'Fetch from effects', url: 'https://react.dev/learn/synchronizing-with-effects#fetching-data', sourceName: 'React Documentation', resourceType: 'guide', relationship: 'Official patterns and pitfalls for fetching.' },
            { title: 'Fetch API reference', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Transport mechanics behind the client layer.' },
            { title: 'HTTP caching explained', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Understanding cache headers your data layer relies on.' }
          ],
          quiz: { prompt: 'A todo list with 50 optimistically-checked items loses network. Worst outcome of naive optimism?', options: ['Nothing special', 'Silent divergence where the UI shows checked but server disagrees', 'Faster UI', 'Reduced memory'], answerIndex: 1, explanation: 'Without reconciliation, optimistic updates diverge from server truth indefinitely; rollback keeps them honest.' }
        },
        {
          slug: 'forms-and-validation-client',
          title: 'Forms, Validation & Controlled Components',
          objectives: ['Structure complex forms with typed models', 'Implement field- and form-level validation', 'Design submission UX with all states'],
          sections: [
            { heading: 'Typed form models', body: 'Represent form state as a typed object, not scattered useState calls. One model drives inputs, validation and submission. Keep a pristine/current copy to enable dirty tracking and reset.' },
            { heading: 'Validation tiers', body: 'Validate per-field as the user leaves a field (touched or blurred) and whole-form on submit. Show errors inline near the field and provide an accessible summary for assistive tech. Fail fast on the client, but never treat client validation as security.' },
            { heading: 'Submission states', body: 'Model submitting, success, and error-with-retained-input. Disable submit during flight to prevent double-posts. On server error, keep the data and surface the message — emptying fields on failure is a cardinal sin of form UX.' }
          ],
          links: [
            { title: 'React Hook Form documentation', url: 'https://react-hook-form.com/', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'De-facto forms library patterns discussed here.' },
            { title: 'Form validation (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Native HTML constraints and when to supplement.' },
            { title: 'Accessible error summaries', url: 'https://www.w3.org/WAI/ARIA/apg', sourceName: 'W3C', resourceType: 'guide', relationship: 'ARIA patterns for announcing errors to assistive tech.' }
          ],
          quiz: { prompt: 'On a failed form submission the component should…', options: ['Clear every field to allow a fresh start', 'Preserve input, show the error, keep focus where useful', 'Navigate to home', 'Silently log and retry forever'], answerIndex: 1, explanation: 'Losing user input on failure ranks among the most damaging form behaviors; preserve data and explain the error.' }
        }
      ]
    },
    {
      slug: 'advanced-js-engineering',
      stage: 'Advanced',
      title: 'Advanced JavaScript & Engineering Practices',
      description: 'Deepening language mastery and the engineering culture that ships maintainable frontends.',
      topics: [
        {
          slug: 'async-javascript',
          title: 'Asynchronous JavaScript & the Event Loop',
          objectives: ['Master promises, async/await and error handling', 'Reason about microtasks, macrotasks and render timing', 'Recognize concurrency pitfalls in the event loop'],
          sections: [
            { heading: 'Async discipline', body: 'Choose shaped concurrency: Promise.all for independent tasks, Promise.allSettled when partial failure is acceptable, and explicit chaining for dependencies. Every async boundary can throw — handle rejection at the user-facing edge, never swallow.' },
            { heading: 'Event-loop interleaving', body: 'Microtasks run before rendering and before the next macrotask. A state update that synchronously spins a long loop starves paint — break CPU work into chunks or move it off-thread. Deep async literacy makes debate about frameworks moot.' },
            { heading: 'Cancellation and timeouts', body: 'Async work outlives components unless you cancel it. Use AbortController for fetches, clear timers on unmount, and give every network call a timeout. Cancellation prevents late responses from overwriting newer state.' }
          ],
          links: [
            { title: 'Asynchronous programming guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Promise semantics and error patterns.' },
            { title: 'The event loop explained', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Stack, queue and microtask ordering.' },
            { title: 'AbortController reference', url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortController', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'Cancelling in-flight async work safely.' }
          ],
          quiz: { prompt: 'Promise.all with one rejected promise:', options: ['Resolves with others', 'Rejects immediately with that error (others continue)', 'Always rejects all', 'Returns undefined'], answerIndex: 1, explanation: 'Promise.all is fail-fast on first rejection; Promise.allSettled waits for all outcomes. Choice depends on caller requirements.' }
        },
        {
          slug: 'closures-prototypes-this',
          title: 'Closures, Prototypes & this Binding',
          objectives: ['Explain closures and use them without leaking memory', 'Understand prototypes, classes and inheritance', 'Predict this binding in functions, methods and callbacks'],
          sections: [
            { heading: 'Closures in practice', body: 'A closure is a function plus the lexical environment it captured. Closures power hooks, factories, memoisation and private state. They also retain whatever they reference, so avoid capturing large objects in long-lived callbacks — that is how memory leaks hide.' },
            { heading: 'Prototypes and classes', body: 'JavaScript’s class syntax sugarcoats prototypal inheritance. Every object has a prototype chain; methods live on the prototype, while instance fields live on the object. Understand Object.create, constructor functions and super calls before reaching for inheritance — composition is usually clearer.' },
            { heading: 'this binding', body: '`this` is determined by the call site, not the declaration. Methods bind to their receiver, callbacks often lose it, and arrow functions capture the surrounding scope. Use bind, a wrapper arrow, or a class field when passing methods as callbacks.' }
          ],
          links: [
            { title: 'Closure deep dive', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'The mental model every hook and store builds on.' },
            { title: 'Object prototypes', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'How the prototype chain and inheritance work.' },
            { title: 'this operator', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'Call-site rules for this binding.' }
          ],
          quiz: { prompt: 'An arrow function passed as an event handler uses…', options: ['The element as this', 'The this value of its surrounding lexical scope', 'Always undefined', 'The window object only'], answerIndex: 1, explanation: 'Arrow functions do not create their own this; they capture the enclosing scope, which is why they are used for callbacks that should keep the component or object context.' }
        },
        {
          slug: 'code-reviews-quality',
          title: 'Code Reviews, Refactoring & Technical Debt',
          objectives: ['Review code constructively with intent', 'Refactor safely with tests as safety nets', 'Manage and surface technical debt'],
          sections: [
            { heading: 'Review as conversation', body: 'Comment on code, not people. Block only genuine correctness/security/a11y issues; flag style as suggestions. Ask clarifying questions before prescribing changes. Reviews are the cheapest defect-catch in the pipeline when done with respect.' },
            { heading: 'Safe refactoring', body: 'Refactor only behind tests that describe current behavior. One behavior per commit: extract, rename, or move — not all three at once. Small commits make bisecting regressions trivial.' },
            { heading: 'Naming debt honestly', body: 'Technical debt is borrowing from future maintenance to ship today. Track it: log trade-offs, schedule repayment sprints, and communicate to stakeholders in effort terms. Invisible debt becomes unpayable interest.' }
          ],
          links: [
            { title: 'GitHub pull request workflow', url: 'https://docs.github.com/en/pull-requests', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'Canonical review mechanics.' },
            { title: 'Refactoring guidance', url: 'https://martinfowler.com/refactoring/', sourceName: 'GitHub Documentation', resourceType: 'article', relationship: 'Established refactoring patterns and motivations.' },
            { title: 'Semantic HTML accessibility', url: 'https://developer.mozilla.org/en-US/docs/Learn/Accessibility', sourceName: 'MDN Web Docs', resourceType: 'course', relationship: 'Accessibility review checklist context.' }
          ],
          quiz: { prompt: 'A reviewer should block a PR when…', options: ['They dislike the naming', 'There is a genuine correctness, security or accessibility defect', 'It does not match their style preferences', 'It is authored by a junior'], answerIndex: 1, explanation: 'Reviews protect correctness first; style and preference belong in non-blocking comments to respect velocity and psychological safety.' }
        }
      ]
    },
    {
      slug: 'production-frontends',
      stage: 'Advanced',
      title: 'Production Frontends',
      description: 'API integration, performance, testing, version control and deployment.',
      topics: [
        {
          slug: 'api-integration',
          title: 'API Integration Patterns',
          objectives: ['Structure typed API clients', 'Manage loading/error/empty states per view', 'Cache and revalidate server data sanely'],
          sections: [
            { heading: 'Client layer', body: 'Wrap endpoints in a typed module returning promises of parsed DTOs. Centralizing base URL, auth headers and error mapping turns “every component does its own fetch” into one auditable seam.' },
            { heading: 'Request states', body: 'Every async view has idle/loading/error/success plus empty results. Design and implement all five; most “bugs” are unhandled states rendered as blank screens.' },
            { heading: 'Data caching', body: 'Deduplicate identical requests, cache with stale-while-revalidate semantics, and invalidate on mutations. Hand-rolled caches rot; adopt an established data layer or keep caching minimal and explicit.' }
          ],
          links: [
            { title: 'Fetching data (React docs)', url: 'https://react.dev/learn/synchronizing-with-effects#fetching-data', sourceName: 'React Documentation', resourceType: 'guide', relationship: 'Official patterns for data fetching in React.' },
            { title: 'Fetch API guide', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Underlying transport mechanics.' },
            { title: 'Set up Vite', url: 'https://vite.dev/guide/', sourceName: 'Vite Documentation', resourceType: 'documentation', relationship: 'Dev-server proxy config for local API development.' }
          ],
          quiz: { prompt: 'A list view shows nothing on error because the component renders only success markup. Correct fix?', options: ['Hide errors from users', 'Add explicit error state UI with retry affordance', 'Retry silently forever', 'Remove loading states'], answerIndex: 1, explanation: 'Unhandled states become invisible failures. Surface errors with recovery actions — professional baseline.' }
        },
        {
          slug: 'web-performance',
          title: 'Web Performance',
          objectives: ['Ship optimized assets with code splitting', 'Hit Core Web Vitals targets', 'Measure before optimizing'],
          sections: [
            { heading: 'Loading performance', body: 'Bundle splitting by route keeps initial JS lean; lazy-load below-the-fold and admin-only views. Compress images, preload critical fonts, defer non-critical scripts — LCP is mostly asset discipline.' },
            { heading: 'Runtime performance', body: 'Interaction latency (INP) suffers from long tasks and giant re-renders. Break up work, virtualize long lists, and update narrowly-scoped state so rerenders stay cheap.' },
            { heading: 'Measurement loop', body: 'Optimize against lab (Lighthouse) and field (CrUX/RUM) data. Establish baselines, change one variable, re-measure — performance work without numbers is folklore.' }
          ],
          links: [
            { title: 'Learn Performance', url: 'https://web.dev/learn/performance', sourceName: 'web.dev', resourceType: 'course', relationship: 'Structured performance curriculum.' },
            { title: 'Core Web Vitals', url: 'https://web.dev/articles/vitals', sourceName: 'web.dev', resourceType: 'article', relationship: 'The metric definitions and thresholds.' },
            { title: 'Code splitting in Vite', url: 'https://vite.dev/guide/features.html#dynamic-import', sourceName: 'Vite Documentation', resourceType: 'documentation', relationship: 'Dynamic imports for route-level splitting.' }
          ],
          quiz: { prompt: 'Cheapest first win for slow initial load in a Vite SPA?', options: ['Rewrite in another framework', 'Route-level lazy loading plus image optimization', 'Buy a bigger server', 'Inline everything'], answerIndex: 1, explanation: 'Splitting routes shrinks the critical bundle; images usually dominate bytes. Both need no architectural change.' }
        },
        {
          slug: 'testing-git-deploy',
          title: 'Testing, Git & Deployment',
          objectives: ['Write meaningful unit and component tests', 'Collaborate through pull requests', 'Deploy static SPAs behind previews'],
          sections: [
            { heading: 'Testing pyramid, pragmatically', body: 'Unit-test pure logic exhaustively; component-test user-visible behavior with queries a user would perform; add a few end-to-end flows. Assert outcomes, not implementation details, so refactors survive.' },
            { heading: 'Git collaboration', body: 'Small commits with clear messages, feature branches, and pull requests describing intent and screenshots. Reviews catch defects and spread knowledge — respond to feedback professionally.' },
            { heading: 'Deployment basics', body: 'Static SPAs deploy to CDNs with history-API fallback configured. Environment variables via build-time injection; never bake secrets into client bundles — anything shipped is public.' }
          ],
          links: [
            { title: 'GitHub Docs', url: 'https://docs.github.com/en', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'Official workflows, PRs and Actions guides.' },
            { title: 'About pull requests', url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'PR-based collaboration specifics.' },
            { title: 'Deploying a static site (Vite)', url: 'https://vite.dev/guide/static-deploy', sourceName: 'Vite Documentation', resourceType: 'documentation', relationship: 'Build output and host configuration.' }
          ],
          quiz: { prompt: 'Secrets like API keys for third-party services in frontend bundles are…', options: ['Safe if minified', 'Public — never place secrets in client code', 'Encrypted by bundlers', 'Fine in dev'], answerIndex: 1, explanation: 'Everything shipped to browsers is inspectable. Proxy sensitive calls through a backend holding secrets server-side.' }
        }
      ]
    },
    {
      slug: 'frontend-architecture-frontiers',
      stage: 'Advanced',
      title: 'Frontend Architecture Frontiers',
      description: 'Design patterns, monitoring and engineering practice for production frontends at scale.',
      topics: [
        {
          slug: 'frontend-testing-strategies',
          title: 'Testing Strategies that Pay Off',
          minutes: 30,
          objectives: ['Choose unit, integration and E2E tests deliberately', 'Write resilient tests, not brittle snapshots', 'Use testing to document behavior'],
          sections: [
            { heading: 'The test pyramid', body: 'Lean on fast unit and integration tests at the base, a few critical E2E flows at the top. Over-investing in slow E2E suites makes teams avoid running them; over-investing in snapshots makes every refactor noisy.' },
            { heading: 'Test behavior, not implementation', body: 'Assert on what the user sees and the app does — rendered UI, state transitions, API calls — rather than internal component internals. Tests that mirror implementation break on every refactor.' },
            { heading: 'Testing as documentation', body: 'A readable test that encodes a business rule is living documentation. Name tests by behavior ("shows warning when quota exceeded"), not by line ("button works").' }
          ],
          links: [
            { title: 'Common testing pitfalls', url: 'https://kentcdodds.com/blog/common-testing-pitfalls', sourceName: 'Kent C. Dodds', resourceType: 'article', relationship: 'Framing around what and how to test.' },
            { title: 'Testing Library guidance', url: 'https://testing-library.com/docs/guiding-principles', sourceName: 'Testing Library', resourceType: 'documentation', relationship: 'Encourages interaction-level tests.' },
            { title: 'React testing overview', url: 'https://react.dev/learn/writing-tests', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Testing React components pragmatically.' }
          ],
          quiz: {
            prompt: 'A brittle snapshot test fails after an unrelated visual change. The best move is…',
            options: ['Update it blindly', 'Reconsider whether it tests behavior that matters, and make it assertion-based', 'Delete all tests', 'Run it only in production'],
            answerIndex: 1,
            explanation: 'Snapshots that over-couple to visuals add noise; replace them with behavioral assertions when they stop adding value.'
          }
        },
        {
          slug: 'browser-performance-profiles',
          title: 'Browser Performance Profiling',
          minutes: 30,
          objectives: ['Measure loading, rendering and interaction costs', 'Profile with Lighthouse, DevTools and Performance API', 'Prioritize optimizations by user impact'],
          sections: [
            { heading: 'What to measure', body: 'Track LCP, INP, CLS and TTFB — the Core Web Vitals that map to user experience. Identify the biggest user-visible bottleneck before optimizing; premature micro-optimization wastes effort.' },
            { heading: 'Finding the hot path', body: 'Use the Performance panel and Performance API to record where time actually goes: long tasks, layout thrash, large bundles, blocking scripts. Optimize what shows up, not what you guess.' },
            { heading: 'Sustained budgets', body: 'Set a performance budget and enforce it in CI (bundle size, image weight, LCP target). Performance that is not measured reverts silently; make it a commit-visible constraint.' }
          ],
          links: [
            { title: 'Web Vitals', url: 'https://web.dev/explore/learn-core-web-vitals', sourceName: 'web.dev', resourceType: 'course', relationship: 'The metrics that define user experience.' },
            { title: 'Lighthouse docs', url: 'https://developer.chrome.com/docs/lighthouse/', sourceName: 'Chrome DevTools', resourceType: 'documentation', relationship: 'Automated audits for load and interaction.' },
            { title: 'Performance reference (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Performance_API', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'Measuring with browser APIs.' }
          ],
          quiz: {
            prompt: 'When a page feels sluggish, the first diagnostic step should be…',
            options: ['Slicing every image in half', 'Measuring to find the actual bottleneck (load vs interaction vs render)', 'Adding more caching', 'Rewriting the styling'],
            answerIndex: 1,
            explanation: 'Measure what users actually feel to target real bottlenecks instead of guessing.'
          }
        },
        {
          slug: 'clean-architecture-frontend',
          title: 'Clean Architecture on the Frontend',
          minutes: 35,
          objectives: ['Separate UI from business logic', 'Use patterns like feature-slices and command/query boundaries', 'Keep the frontend testable and navigable'],
          sections: [
            { heading: 'Layering the app', body: 'Keep a simple, consistent structure: UI components, domain logic, data access and shared utilities. Feature-based folders keep related code together so you can find and change it quickly.' },
            { heading: 'Boundaries and contracts', body: 'Define clear interfaces between UI and data. Tuck business rules into pure functions that are easy to unit test, and let components talk to them through small hooks or queries.' },
            { heading: 'Fighting over-growth', body: 'Architecture is for clarity, not ceremony. Start simple (a few folders and conventions), and introduce abstraction only when repeated pain justifies it — premature architecture is as costly as none.' }
          ],
          links: [
            { title: 'Feature sling pattern', url: 'https://github.com/tanstack/query/discussions/2213', sourceName: 'TanStack Query', resourceType: 'article', relationship: 'Feature-scoped folder conventions.' },
            { title: 'Clean architecture notes', url: 'https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html', sourceName: 'Uncle Bob', resourceType: 'article', relationship: 'The original layering concepts, adapted to client apps.' },
            { title: 'React data fetching patterns', url: 'https://react.dev/learn/data-fetching', sourceName: 'React Documentation', resourceType: 'documentation', relationship: 'Where data logic lives in React apps.' }
          ],
          quiz: {
            prompt: 'Business rules in a frontend should live…',
            options: ['Inside giant components', 'In pure, testable functions separated from UI', 'Only in the backend', 'In the database'],
            answerIndex: 1,
            explanation: 'Pure domain logic decoupled from components is easy to test, reuse and change — keep components thin.'
          }
        }
      ]
    },
    {
      slug: 'engineering-communication-collaboration',
      stage: 'Advanced',
      title: 'Engineering Communication & Collaboration',
      description: 'Code review, PR etiquette, docs and cross-team collaboration for real teams.',
      topics: [
        {
          slug: 'effective-code-review',
          title: 'Effective Code & PR Review',
          minutes: 25,
          objectives: ['Write PRs that are easy to review', 'Give kind, specific, actionable feedback', 'Handle review feedback constructively'],
          sections: [
            { heading: 'PRs that review well', body: 'Keep changes small and logically scoped, with a clear description of the problem, approach and any trade-offs. Link the ticket and add a screenshot or test plan so reviewers can reason fast.' },
            { heading: 'Feedback that lands', body: 'Frame suggestions as options, ask questions rather than dictate, and separate must-fix from optional. Praise what is working so reviewers are partners, not gatekeepers.' },
            { heading: 'Receiving reviews', body: 'Treat comments as improving the shared codebase, not as personal criticism. Respond, resolve in code where possible, and explain reasoning where you disagree — respect the process and thank the reviewers.' }
          ],
          links: [
            { title: 'Code review guidelines', url: 'https://google.github.io/eng-practices/review/reviewer/', sourceName: 'Google', resourceType: 'documentation', relationship: 'Comprehensive reviewer guidance.' },
            { title: 'How to write a good PR', url: 'https://www.pullrequest.com/blog/writing-a-great-pull-request-description/', sourceName: 'PullRequest', resourceType: 'article', relationship: 'Descriptions that speed up review.' },
            { title: 'About pull requests (GitHub)', url: 'https://docs.github.com/en/pull-requests', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'PR workflow mechanics.' }
          ],
          quiz: {
            prompt: 'The most effective review feedback is…',
            options: ['A long list of style nits', 'Kind, specific, and categorized into must-fix vs optional improvements', 'Only negative', 'Left only in chat'],
            answerIndex: 1,
            explanation: 'Specific, prioritized, constructive feedback moves the code forward without eroding trust.'
          }
        },
        {
          slug: 'documentation-and-knowledge',
          title: 'Documentation & Knowledge Sharing',
          minutes: 25,
          objectives: ['Write docs that answer the question the reader actually has', 'Keep docs close to code and easy to maintain', 'Share context through ADRs and runbooks'],
          sections: [
            { heading: 'Docs as a ser (README) too', body: 'Treat the README as a living entry point: what the project does, how to run it, how to contribute, and current conventions. If a new teammate can get from zero to productive with it, it is working.' },
            { heading: 'Architecture Decision Records', body: 'Record significant decisions — why a library, why this folder structure — in short ADRs. A paragraph of rationale saves a team from re-litigating the same choice months later.' },
            { heading: 'Sustainable docs', body: 'Document ruthlessly close to the code (inline, colocated) so it stays current. Prefer many small, accurate notes over one huge stale wiki, and revisit regularly.' }
          ],
          links: [
            { title: 'Write the Docs guidance', url: 'https://www.writethedocs.org/guide/', sourceName: 'Write the Docs', resourceType: 'documentation', relationship: 'Principles for writing and maintaining docs.' },
            { title: 'How to write a README', url: 'https://www.makeareadme.com/', sourceName: 'makeareadme.com', resourceType: 'guide', relationship: 'Template and rationale for strong READMEs.' },
            { title: 'ADR intro', url: 'https://adr.github.io/', sourceName: 'ADRs', resourceType: 'documentation', relationship: 'Format and examples for decision records.' }
          ],
          quiz: {
            prompt: 'A dependency you chose three months ago is being challenged again. The best defense is…',
            options: ['Nothing; let it churn', 'An ADR documenting why you chose it and what you considered', 'A chat log screenshot', 'Insisting it is better'],
            answerIndex: 1,
            explanation: 'A written decision record preserves context and stops teams from re-deciding the same thing.'
          }
        },
        {
          slug: 'cross-team-collaboration',
          title: 'Collaborating Across Teams',
          minutes: 25,
          objectives: ['Align with designers, PMs and backend engineers', 'Communicate technical constraints clearly', 'Run effective standups and demos'],
          sections: [
            { heading: 'Translating technical trade-offs', body: 'Explain constraints in terms of outcomes ("this adds 400ms to first load and hurts our budget") rather than jargon. Give non-technical stakeholders a path to a decision.' },
            { heading: 'Shared planning', body: 'Break work into reviewable slices with your PM and designer before committing dates. Naming dependencies ("needs API contract by Monday") surfaces risk early.' },
            { heading: 'Demos keep alignment', body: 'Short, frequent demos of working software focus the team on outcomes and build trust. Show progress over perfection and invite feedback while change is cheap.' }
          ],
          links: [
            { title: 'Working with PMs', url: 'https://www.atlassian.com/agile/roles/product-manager', sourceName: 'Atlassian', resourceType: 'article', relationship: 'Bridging technical and product concerns.' },
            { title: 'Agile collaboration guide', url: 'https://www.atlassian.com/agile/collaboration', sourceName: 'Atlassian', resourceType: 'article', relationship: 'Team rituals that keep everyone aligned.' },
            { title: 'Design handoff for developers', url: 'https://www.figma.com/best-practices/design-and-code/working-together/', sourceName: 'Figma', resourceType: 'guide', relationship: 'Collaborating with designers on implementation.' }
          ],
          quiz: {
            prompt: 'Explaining a 400ms load regression to a non-technical PM works best when framed as…',
            options: ['"The TTFB and LCP regressed"', 'The impact on users and the trade-off cost to fix it', 'Showing bundle-size diffs', 'Blame on the network'],
            answerIndex: 1,
            explanation: 'Frame technical trade-offs by user impact and cost so stakeholders can make an informed call.'
          }
        }
      ]
    },
    {
      slug: 'frontend-career-and-portfolio',
      stage: 'Advanced',
      title: 'Frontend Career & Portfolio',
      description: 'Show your work, interview well, and grow from mid-level to senior engineer.',
      topics: [
        {
          slug: 'frontend-portfolio-projects',
          title: 'Projects That Demonstrate Skill',
          minutes: 25,
          objectives: ['Choose projects that show depth, not just breadth', 'Present code, trade-offs and outcomes', 'Keep a public, maintainable profile'],
          sections: [
            { heading: 'Depth over breadth', body: 'A few projects that go deep — real state, testing, performance, a tricky data flow — outweigh many copied tutorials. Show you can take a product to production, not just render components.' },
            { heading: 'Presenting your work', body: 'For each project, link the live app, source, and a short write-up of the problem, your architecture choices, trade-offs and what you learned. Interviewers probe code, so keep it runnable and commented on intent.' },
            { heading: 'The public profile', body: 'Keep your GitHub, portfolio and LinkedIn coherent and current. A small, polished, consistent footprint impresses more than a sprawling one you cannot defend.' }
          ],
          links: [
            { title: 'Show your work publicly', url: 'https://kentcdodds.com/blog/do-you-have-a-portfolio', sourceName: 'Kent C. Dodds', resourceType: 'article', relationship: 'Why a public engineering presence helps.' },
            { title: 'GitHub profile README guide', url: 'https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme', sourceName: 'GitHub', resourceType: 'documentation', relationship: 'Presenting a professional profile.' },
            { title: 'Vite static deploy', url: 'https://vite.dev/guide/static-deploy', sourceName: 'Vite Documentation', resourceType: 'documentation', relationship: 'Shipping portfolio projects cheaply.' }
          ],
          quiz: {
            prompt: 'Which portfolio project most credibly demonstrates senior-level depth?',
            options: ['Ten tutorial clones', 'One real project with tests, performance work and documented trade-offs', 'A landing page with no logic', 'A copied open-source dashboard'],
            answerIndex: 1,
            explanation: 'Depth — production readiness, testing, and reasoned architecture — signals the skills employers actually need.'
          }
        },
        {
          slug: 'frontend-interview-prep',
          title: 'Coding & System Interviews',
          minutes: 30,
          objectives: ['Solve problems aloud with structured reasoning', 'Discuss architecture and trade-offs clearly', 'Handle behavioral questions with evidence'],
          sections: [
            { heading: 'Think out loud', body: 'Interviewers want to see your reasoning, not just the final answer. Restate the problem, clarify constraints, sketch an approach, talk through edge cases, and communicate before, during and after coding.' },
            { heading: 'System discussion', body: 'Be ready to discuss how you would build a feature end-to-end: data flow, state, caching, accessibility, testing, performance. Tie choices to trade-offs and name what you would defer.' },
            { heading: 'Evidence-backed behaviorals', body: 'For "tell me about a time…", use a concrete example with structure: situation, action, result and what you learned. Quantify outcomes where you can.' }
          ],
          links: [
            { title: 'How to think in interviews', url: 'https://www.techinterviewhandbook.org/coding-interview-techniques/', sourceName: 'Tech Interview Handbook', resourceType: 'guide', relationship: 'Structured techniques for solving during interviews.' },
            { title: 'Frontend interview questions', url: 'https://www.frontendinterviewhandbook.com/', sourceName: 'Frontend Interview Handbook', resourceType: 'guide', relationship: 'Common frontend questions and how to answer them.' },
            { title: 'The DEV interview-prep guide', url: 'https://dev.to/', sourceName: 'DEV Community', resourceType: 'article', relationship: 'Community advice on interview prep.' }
          ],
          quiz: {
            prompt: 'During a coding interview, the highest-value habit is…',
            options: ['Silently coding as fast as possible', 'Communicating your reasoning, clarifying constraints and talking through edge cases', 'Copying a known solution verbatim', 'Skipping questions you dislike'],
            answerIndex: 1,
            explanation: 'Interviewers evaluate your thinking and collaboration; narration of the process matters as much as correctness.'
          }
        },
        {
          slug: 'senior-engineer-growth',
          title: 'Growth to Senior Engineer',
          minutes: 25,
          objectives: ['Define the senior boundary by impact and ownership', 'Develop estimation and scoping skills', 'Mentor and raise the bar for the team'],
          sections: [
            { heading: 'Impact over output', body: 'Seniority is scope of influence: unblocking others, driving a technical direction, improving team velocity. Growth is less about moving faster and more about raising everyone around you.' },
            { heading: 'Own the estimate', body: 'Break work into slices, name assumptions, and revisit estimates as new information arrives. Honest, updated estimates build team trust more than optimistic guesses.' },
            { heading: 'Mentorship as leverage', body: 'Writing clear design docs, reviewing thoroughly and teaching juniors multiply your output. Helping two humans ship well is worth more than shipping twice alone.' }
          ],
          links: [
            { title: 'Senior engineer traits', url: 'https://www.holloway.com/g/radical-career-advice', sourceName: 'Holloway', resourceType: 'guide', relationship: 'What separates senior from mid-level impact.' },
            { title: 'Engineering ladders', url: 'https://pathrise.com/guides/how-to-get-a-promotion-in-software-engineering/', sourceName: 'Pathrise', resourceType: 'guide', relationship: 'Leveling frameworks and how to demonstrate growth.' },
            { title: 'Mentoring engineers', url: 'https://kentcdodds.com/blog/what-great-mentors-do', sourceName: 'Kent C. Dodds', resourceType: 'article', relationship: 'Behaviors of effective engineering mentors.' }
          ],
          quiz: {
            prompt: 'Beyond writing more code, senior engineers chiefly add value by…',
            options: ['Committing more lines', 'Unblocking others, driving technical direction and raising team quality', 'Holding all knowledge privately', 'Avoiding mentorship'],
            answerIndex: 1,
            explanation: 'Senior impact is measured by influence and leverage on the whole team, not personal output.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Product Dashboard Feature Build',
    coverage: ['React Components & State', 'TypeScript', 'API Integration States', 'Accessibility', 'Performance'],
    brief:
      'Implement (describe precisely) a paginated, filterable orders table for a React + TypeScript app consuming GET /api/orders?page=&status=. Include the component structure, typed models, request handling with all UI states, keyboard-accessible filter controls, and one performance optimization.',
    requirements: [
      'Component breakdown with responsibilities',
      'TypeScript interfaces for Order DTO and component props',
      'Loading, error, empty and success state handling',
      'Accessible controls (labels, focus management) described',
      'One concrete performance improvement with rationale'
    ],
    expectedOutput:
      'A structured technical write-up of the implementation plan, as if preparing a pull-request description an engineer could follow exactly.',
    rubric: [
      { skill: 'React architecture', weight: 25, criteria: 'Sensible decomposition, state placed correctly, no duplicated derived state' },
      { skill: 'TypeScript quality', weight: 20, criteria: 'Precise DTO/prop types, no any, discriminated states modeled' },
      { skill: 'Async correctness', weight: 20, criteria: 'All four request states handled; race conditions addressed' },
      { skill: 'Accessibility', weight: 20, criteria: 'Semantic controls, labels, focus visibility and order' },
      { skill: 'Performance reasoning', weight: 15, criteria: 'Justified optimization tied to a named metric' }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'Semantic Marketing Page Implementation',
      stage: 'Foundation',
      objective: 'Convert a provided landing-page description into semantic, accessible HTML/CSS with responsive layout.',
      requirements: ['Landmarks and heading hierarchy', 'Flex/grid layout with gap-based spacing', 'Mobile-first media queries', 'Visible focus styles', 'Validated markup'],
      skillsEvaluated: ['HTML', 'CSS', 'Accessibility', 'Responsive Design'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: { instructions: 'Submit your annotated code walkthrough: structure decisions, layout approach and accessibility checks performed.', textLabel: 'Implementation walkthrough', minTextLength: 900 }
    },
    {
      title: 'React Form with Validation',
      stage: 'Intermediate',
      objective: 'Build a typed registration form with field-level validation, error summaries and submission states.',
      requirements: ['Typed form model and handlers', 'Per-field validation rules and messages', 'Disabled/submitting/success/error submit flow', 'Accessible labels and error announcement strategy'],
      skillsEvaluated: ['React', 'TypeScript', 'Forms & Events', 'Accessibility'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: { instructions: 'Describe the component API, validation flow and state machine; include key code excerpts.', textLabel: 'Form engineering notes', minTextLength: 1100 }
    },
    {
      title: 'Performance Audit & Fix Plan',
      stage: 'Advanced',
      objective: 'Audit a simulated slow dashboard and produce a prioritized remediation plan targeting Core Web Vitals.',
      requirements: ['Identify likely LCP/INP/CLS culprits from the symptom list provided', 'Map each issue to a fix with effort estimate', 'Define measurement plan before/after', 'Order fixes by impact-per-effort'],
      skillsEvaluated: ['Web Performance', 'Debugging', 'Professional Communication'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: { instructions: 'Submit the audit report with prioritized fix table and measurement plan.', textLabel: 'Performance audit', minTextLength: 1000, linkLabels: ['Supporting web.dev article(s) referenced'] }
    }
  ],

  simTasks: [
    {
      title: 'Checkout bug: double submissions',
      context: 'Users report duplicate orders when connection is slow — the pay button remains clickable during the request.',
      requirements: ['Explain the race condition', 'Specify the fix (disable + pending state, idempotency consideration)', 'List regression checks'],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Bug-fix note: cause, patch description, test checklist.',
      skills: ['JavaScript', 'Async Handling', 'Debugging']
    },
    {
      title: 'New settings section',
      context: 'Product wants an account notification-preferences panel shipping Thursday using existing design-system components.',
      requirements: ['Component plan with typed props', 'Optimistic update behavior specified', 'Accessibility annotations'],
      priority: 'high',
      dueDayOffset: 4,
      expectedOutput: 'Implementation plan ready for PR description.',
      skills: ['React', 'TypeScript', 'Component Architecture']
    },
    {
      title: 'Bundle diet',
      context: 'Initial JS bundle grew to 900KB after a charting library addition; mobile conversion dipped last release.',
      requirements: ['Propose route-level splitting targets', 'Evaluate lighter alternative or lazy-load strategy', 'Define before/after metrics'],
      priority: 'normal',
      dueDayOffset: 6,
      expectedOutput: 'Short RFC with measurements and rollout steps.',
      skills: ['Web Performance', 'Vite Tooling']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Sam Ortiz',
      personaRole: 'Backend Engineer',
      situation: 'API contract mismatch discovered during integration.',
      openingMessage:
        'Heads up — /api/orders currently returns dates as ISO strings and totals as strings ("129.99"), but your types expect number. Want us to change the API or will you adapt the client? Either works, just need to sync before QA tomorrow.',
      expectedPoints: ['Confirms exact contract (types/format)', 'States client-side adaptation plan or requests API change clearly', 'Flags timezone parsing concern for ISO strings', 'Agrees on verification step before QA']
    },
    {
      kind: 'team',
      personaName: 'Rae Lin',
      personaRole: 'Designer',
      situation: 'Design feasibility discussion.',
      openingMessage:
        'Mockup uses a sticky table header with row hover expansion and a floating action bar on scroll. Anything technically gnarly here before I finalize? Happy to adjust.',
      expectedPoints: ['Assesses feasibility honestly, flags sticky+floating scroll complexity', 'Raises keyboard focus management for expandable rows', 'Suggests simplification if justified', 'Tone stays collaborative']
    },
    {
      kind: 'client',
      personaName: 'Tomás Herrera',
      personaRole: 'Product Owner, Kestrel Retail',
      situation: 'Client requests functionality change mid-sprint.',
      openingMessage:
        'Can we swap the search to filter as-you-type instead of on submit? Also add recent searches. Sales team says competitors have it. How fast can we turn this around?',
      expectedPoints: ['Clarifies UX details (debounce, empty states)', 'Estimates impact on sprint commitments transparently', 'Notes privacy/storage considerations for recent searches', 'Proposes phasing option rather than silent overload']
    },
    {
      kind: 'client',
      personaName: 'Amara Diallo',
      personaRole: 'Operations Director, FleetTrack',
      situation: 'Escalation about reported slowness.',
      openingMessage:
        'Our dispatchers say the dashboard takes forever on their tablets in the warehouse. They’re threatening to go back to spreadsheets. What’s going on and what do you need from us?',
      expectedPoints: ['Asks for device/network context to reproduce', 'Explains investigation plan in plain language', 'Sets expectation for diagnosis before promising fixes', 'Offers interim mitigation if applicable']
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'Friday afternoon: the production site throws white-screen errors for ~10% of sessions after today’s deploy. The release owner already left.',
      requiredActions: [
        { action: 'Confirm scope from error monitoring before touching anything', good: true, note: 'Diagnosis precedes fixes.' },
        { action: 'Roll back the deploy to restore service, then investigate calmly', good: true, note: 'Availability first; root-cause second.' },
        { action: 'Hot-patch speculative guesses directly to production', good: false, note: 'Guessing under pressure compounds outages.' },
        { action: 'Post a concise incident summary and follow-up plan for the team', good: true, note: 'Communication is part of resolution.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'Two days before launch, marketing asks to replace the tested checkout copy with a promotional variant and add a banner above the payment form.',
      requiredActions: [
        { action: 'Ask which metric the change serves and whether it was tested', good: true, note: 'Evidence-based challenge, not reflex compliance.' },
        { action: 'Implement immediately skipping review because deadline pressure excuses process', good: false, note: 'Process exists for launch-day reliability.' },
        { action: 'Scope the change: flag analytics/QA implications and offer fastest safe path', good: true, note: 'Professionals make constraints visible.' },
        { action: 'Get written sign-off from the requesting stakeholder', good: true, note: 'Accountability documented.' }
      ]
    }
  ],

  interviewQuestions: [
    { dimension: 'technical_knowledge', prompt: 'Explain the difference between state and props, and when you lift state upward.', guidancePoints: ['Ownership vs passing-down', 'Common-ancestor pattern', 'Alternatives (context/stores) and when they earn complexity'] },
    { dimension: 'technical_knowledge', prompt: 'What does useEffect actually do, and what problems arise from misusing it for derived data?', guidancePoints: ['Post-paint synchronization role', 'Dependency array semantics', 'Derived state anti-pattern'] },
    { dimension: 'problem_solving', prompt: 'A user reports intermittent duplicate form submissions. Walk me through your debugging.', guidancePoints: ['Reproduce conditions', 'Inspect network timing/idempotency', 'Fix pattern: pending lock/disable + server dedupe', 'Regression tests'] },
    { dimension: 'problem_solving', prompt: 'List renders fine on desktop but crashes on older Safari. How do you proceed?', guidancePoints: ['Check unsupported syntax/APIs vs baseline targets', 'Transpilation/polyfill strategy', 'Error-monitoring stack traces', 'Guarded feature detection'] },
    { dimension: 'professional_reasoning', prompt: 'You estimate three days; the PM needs it tomorrow. Respond.', guidancePoints: ['Transparent constraint sharing', 'Offer scoped-down version meeting the date', 'Risk call-out, not silent heroics'] },
    { dimension: 'professional_reasoning', prompt: 'When would you argue against adding a library dependency?', guidancePoints: ['Bundle/maintenance cost', 'Coverage of actual use-case vs full library', 'Security supply-chain surface'] },
    { dimension: 'communication', prompt: 'Explain hydration or CORS to a non-technical stakeholder.', guidancePoints: ['Analogy accuracy', 'No jargon', 'Why it matters to their goals'] },
    { dimension: 'communication', prompt: 'Your PR receives critical review comments you disagree with. Handle it.', guidancePoints: ['Seek understanding first', 'Disagree with evidence respectfully', 'Decide and document outcome', 'No ego spiral'] }

  ]

}
