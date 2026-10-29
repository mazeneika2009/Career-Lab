import type { CareerDef } from '../framework.js'

export const reactNativeDeveloper: CareerDef = {
  slug: 'react-native-developer',
  name: 'React Native Developer',
  category: 'Development',
  order: 12,
  description:
    'Delivers mobile apps using React Native, TypeScript and Expo, bridging web knowledge to native platforms.',
  difficulty: 'Intermediate',
  pathSummary:
    'React & TypeScript fundamentals → Expo project setup & core components → Styling, layouts & responsive design → Navigation with React Navigation → State management (Context, Zustand) → Networking, async data & offline storage → Native modules, device APIs & Expo SDK → Testing, performance profiling & App Store / Play Store publishing.',
  mainSkills: [
    'React Native',
    'TypeScript',
    'Expo',
    'React Navigation',
    'State Management',
    'Native Device APIs',
    'Mobile UI/UX',
    'App Publishing'
  ],
  sourcePlatforms: [
    'React Native Documentation',
    'React Documentation',
    'Expo Documentation',
    'TypeScript Documentation'
  ],
  companyName: 'Bridgepoint Technologies',
  roleTitle: 'React Native Developer',

  chapters: [
    {
      slug: 'react-native-fundamentals',
      stage: 'Beginner',
      title: 'React Native Fundamentals',
      description: 'Core concepts of React Native, the Expo workflow and essential components.',
      topics: [
        {
          slug: 'react-native-intro',
          title: 'Introduction to React Native & Expo',
          minutes: 25,
          objectives: [
            'Understand how React Native bridges JavaScript to native UI',
            'Set up a new Expo project with TypeScript template',
            'Run an app on iOS Simulator, Android Emulator and Expo Go'
          ],
          sections: [
            {
              heading: 'What React Native is',
              body: 'React Native lets you write mobile UIs in JavaScript and render them to real native views — not WebViews. It uses a bridge (or the newer JSI/Fabric architecture) to communicate between a JavaScript thread and platform-specific rendering. Components like View and Text map to UIView and android.view.View, giving you native performance with a cross-platform codebase.'
            },
            {
              heading: 'Why Expo',
              body: 'Expo is a managed workflow around React Native that provides pre-configured native modules, a CLI for builds and an OTA update service. With Expo you never touch Xcode or Gradle unless you opt into a custom dev client. EAS Build handles CI for iOS and Android from the cloud, drastically reducing setup friction.'
            },
            {
              heading: 'Expo project anatomy',
              body: 'A bare Expo project contains package.json, tsconfig.json, app.json (or app.config.ts) and an app/ directory for file-based routing. The entry point is index.ts which registers the root component. The assets/ directory holds splash icons and fonts. Expo CLI starts a dev server that hot-reloads changes across platforms.'
            }
          ],
          links: [
            {
              title: 'Getting started with React Native',
              url: 'https://reactnative.dev/docs/getting-started',
              sourceName: 'React Native Documentation',
              resourceType: 'documentation',
              relationship: 'Official React Native setup and environment guide.'
            },
            {
              title: 'Expo quick start',
              url: 'https://docs.expo.dev/get-started/set-up-your-environment/',
              sourceName: 'Expo Documentation',
              resourceType: 'tutorial',
              relationship: 'Expo environment setup and first project creation.'
            },
            {
              title: 'Create a React Native app with Expo',
              url: 'https://docs.expo.dev/get-started/create-a-project/',
              sourceName: 'Expo Documentation',
              resourceType: 'guide',
              relationship: 'Step-by-step project scaffolding using create-expo-app.'
            }
          ],
          quiz: {
            prompt: 'What does React Native render UI to instead of a browser DOM?',
            options: ['WebViews', 'Native platform views via a bridge or JSI', 'Canvas 2D context', 'SVG elements'],
            answerIndex: 1,
            explanation: 'React Native maps components like View and Text to real UIView (iOS) and android.view.View (Android) through a bridge or the JSI layer, giving true native rendering.'
          }
        },
        {
          slug: 'core-components',
          title: 'Core Components & Props',
          minutes: 28,
          objectives: [
            'Use View, Text, Image, ScrollView and TextInput effectively',
            'Understand the StyleSheet API and why it replaces inline styles',
            'Apply props, children composition and prop types with TypeScript'
          ],
          sections: [
            {
              heading: 'Essential components',
              body: 'View is the fundamental container — a flexbox box that renders a native view. Text wraps strings and supports nesting, selection and accessibility. Image handles network and local assets. ScrollView provides a scrollable container for small lists; FlatList virtualizes long lists. TextInput captures user text input with platform-native behavior.'
            },
            {
              heading: 'StyleSheet and performance',
              body: 'StyleSheet.create() validates styles at creation time and sends them across the bridge as IDs, not full objects. This avoids serializing style objects on every render. Styles use CSS-like property names in camelCase: backgroundColor, borderRadius, padding. Platform.OS lets you apply platform-specific styles when necessary.'
            },
            {
              heading: 'Props and composition',
              body: 'React components accept props — typed in TypeScript as function parameters. Children prop enables composition: wrapping content in custom containers. Default props via destructuring defaults provide sensible fallbacks. StyleSheet prop overrides let consumers customize appearance without exposing internals.'
            }
          ],
          links: [
            {
              title: 'Core components and APIs',
              url: 'https://reactnative.dev/docs/components-and-apis',
              sourceName: 'React Native Documentation',
              resourceType: 'reference',
              relationship: 'Official reference for every built-in component.'
            },
            {
              title: 'View component',
              url: 'https://reactnative.dev/docs/view',
              sourceName: 'React Native Documentation',
              resourceType: 'documentation',
              relationship: 'View API reference and layout properties.'
            },
            {
              title: 'Using a list (FlatList)',
              url: 'https://reactnative.dev/docs/flatlist',
              sourceName: 'React Native Documentation',
              resourceType: 'documentation',
              relationship: 'Virtualized list component for performant rendering.'
            }
          ],
          quiz: {
            prompt: 'Why is StyleSheet.create preferred over plain JavaScript objects for styles?',
            options: ['It adds CSS Grid support', 'It validates styles at creation and serializes them as IDs across the bridge', 'It enables Tailwind classes', 'It auto-generates responsive breakpoints'],
            answerIndex: 1,
            explanation: 'StyleSheet.create validates property names at build time and sends style references by ID across the bridge instead of full objects, reducing serialization overhead per render.'
          }
        },
        {
          slug: 'flexbox-and-layout',
          title: 'Flexbox & Mobile Layout',
          minutes: 30,
          objectives: [
            'Apply flexDirection, justifyContent and alignItems to arrange components',
            'Handle screen-size differences with responsive units and Dimensions API',
            'Use SafeAreaView and StatusBar to respect device notches and system chrome'
          ],
          sections: [
            {
              heading: 'Flexbox defaults differ',
              body: 'React Native uses Yoga for layout, which defaults flexDirection to column (not row like web CSS). This means children stack vertically by default. alignItems stretches items on the cross-axis. flex, flexGrow and flexShrink control how items share space. Understanding the column default prevents most layout confusion when coming from web development.'
            },
            {
              heading: 'Responsive design patterns',
              body: 'useWindowDimensions() provides reactive width and height that update on rotation and fold. Combine with breakpoints or ratio-based sizing for phone vs tablet layouts. Platform.select() picks platform-specific values. Relative units like percentage strings (\"50%\") and flex proportions keep layouts fluid across devices.'
            },
            {
              heading: 'Safe area and status bar',
              body: 'SafeAreaView from react-native-safe-area-context insets content below the notch and home indicator. The StatusBar component controls bar style (light/dark), background color and translucent mode. Properly setting both prevents content from being obscured by camera cutouts, status bars and navigation bars on different device models.'
            }
          ],
          links: [
            {
              title: 'Flexbox layout',
              url: 'https://reactnative.dev/docs/flexbox',
              sourceName: 'React Native Documentation',
              resourceType: 'documentation',
              relationship: 'Flexbox implementation details specific to React Native.'
            },
            {
              title: 'Using Dimensions',
              url: 'https://reactnative.dev/docs/dimensions',
              sourceName: 'React Native Documentation',
              resourceType: 'documentation',
              relationship: 'API for reading screen dimensions and handling orientation changes.'
            },
            {
              title: 'Handling safe areas',
              url: 'https://reactnative.dev/docs/safeareaview',
              sourceName: 'React Native Documentation',
              resourceType: 'guide',
              relationship: 'SafeAreaView usage to handle notches and system bars.'
            }
          ],
          quiz: {
            prompt: 'What is the default flexDirection in React Native?',
            options: ['row', 'column', 'column-reverse', 'row-reverse'],
            answerIndex: 1,
            explanation: 'React Native defaults flexDirection to column, unlike web CSS which defaults to row. This matches the vertical nature of mobile screen layouts.'
          }
        }
      ]
    },
    {
      slug: 'navigation-and-state',
      stage: 'Foundation',
      title: 'Navigation & State Management',
      description: 'Moving between screens and sharing state across your app.',
      topics: [
        {
          slug: 'react-navigation-setup',
          title: 'React Navigation & Stack Navigation',
          minutes: 28,
          objectives: [
            'Install and configure React Navigation with native stack',
            'Define typed screen parameters and navigate between screens',
            'Handle deep linking and back button behavior correctly'
          ],
          sections: [
            {
              heading: 'Installation and providers',
              body: 'React Navigation requires installing @react-navigation/native, react-native-screens, react-native-safe-area-context and @react-navigation/native-stack. Wrap the app root in NavigationContainer. Define a Stack.Navigator containing Stack.Screen entries. Expo installs most peer dependencies automatically, reducing manual linking.'
            },
            {
              heading: 'Typed screen params',
              body: 'TypeScript generics on the navigator type list ensure screen params are type-safe: type RootStackParamList = { Home: undefined; Profile: { userId: string } }. Navigation.navigate("Profile", { userId }) enforces required params at compile time. useRoute() and useNavigation() hooks read the current route and navigator instance with correct types.'
            },
            {
              heading: 'Deep linking and back behavior',
              body: 'Configure a linking object mapping URL paths to screens: { screens: { Profile: "user/:id" } } enables external links to open specific screens. Platform-specific back button handling uses hardwareBackPress listener. BackHandler.addEventListener lets you override default back behavior for confirmation dialogs or custom transitions.'
            }
          ],
          links: [
            {
              title: 'React Navigation getting started',
              url: 'https://reactnavigation.org/docs/getting-started/',
              sourceName: 'React Navigation',
              resourceType: 'tutorial',
              relationship: 'Official React Navigation installation and setup guide.'
            },
            {
              title: 'Stack navigator',
              url: 'https://reactnavigation.org/docs/native-stack-navigator/',
              sourceName: 'React Navigation',
              resourceType: 'documentation',
              relationship: 'Native stack navigator API and screen options.'
            },
            {
              title: 'Deep linking configuration',
              url: 'https://reactnavigation.org/docs/deep-linking/',
              sourceName: 'React Navigation',
              resourceType: 'guide',
              relationship: 'URL-based navigation and deep link configuration.'
            }
          ],
          quiz: {
            prompt: 'Which peer dependency does React Navigation use to prevent creating new native view instances on every navigation?',
            options: ['react-native-reanimated', 'react-native-screens', 'react-native-gesture-handler', 'expo-haptics'],
            answerIndex: 1,
            explanation: 'react-native-screens optimizes navigation by recycling native view instances and using native navigation APIs instead of JavaScript-based screen management.'
          }
        },
        {
          slug: 'context-and-hooks',
          title: 'Context API & Custom Hooks',
          minutes: 27,
          objectives: [
            'Create and consume React Context for cross-component state sharing',
            'Build custom hooks to encapsulate reusable stateful logic',
            'Avoid unnecessary re-renders by splitting contexts and memoizing'
          ],
          sections: [
            {
              heading: 'Creating and providing context',
              body: 'createContext defines a typed context object. A provider component wraps the subtree and supplies a value via the value prop. useContext reads the nearest ancestor value. Avoid placing the provider too high — every consumer re-renders when the value changes. Split auth, theme and feature contexts into separate providers to limit re-render scope.'
            },
            {
              heading: 'Custom hooks as abstraction',
              body: 'Custom hooks extract stateful logic into reusable functions: useAuth(), useTheme(), useFetchPosts(). They can combine context reading with local state, effects and other hooks. Hooks should follow the use* naming convention and be placed in a hooks/ directory for discoverability. Each hook should do one thing well.'
            },
            {
              heading: 'Re-render optimization',
              body: 'React.memo wraps components to skip re-renders when props have not changed. useMemo and useCallback memoize expensive computations and stable function references. Context consumers only re-render when the context value reference changes — providing a stable object from useMemo prevents unnecessary downstream updates. Profile these with React DevTools before over-memoizing.'
            }
          ],
          links: [
            {
              title: 'React context docs',
              url: 'https://react.dev/reference/react/createContext',
              sourceName: 'React Documentation',
              resourceType: 'documentation',
              relationship: 'Official React Context API reference.'
            },
            {
              title: 'useContext hook',
              url: 'https://react.dev/reference/react/useContext',
              sourceName: 'React Documentation',
              resourceType: 'documentation',
              relationship: 'useContext API reference and usage patterns.'
            },
            {
              title: 'useMemo and useCallback',
              url: 'https://react.dev/reference/react/useMemo',
              sourceName: 'React Documentation',
              resourceType: 'documentation',
              relationship: 'Memoization hooks for performance optimization.'
            }
          ],
          quiz: {
            prompt: 'How do you prevent a Context consumer from re-rendering on every provider value change?',
            options: ['Use useEffect instead', 'Memoize the provider value with useMemo so the reference only changes when data changes', 'Use React.lazy on the consumer', 'Move context inside the component'],
            answerIndex: 1,
            explanation: 'Context consumers re-render when the value reference changes. Wrapping the value in useMemo ensures a stable object reference, preventing unnecessary re-renders when the underlying data has not changed.'
          }
        },
        {
          slug: 'zustand-state',
          title: 'Zustand for Global State',
          minutes: 26,
          objectives: [
            'Set up a Zustand store with typed state and actions',
            'Use selectors and the shallow equality check to prevent re-renders',
            'Persist store state with AsyncStorage or Zustand persist middleware'
          ],
          sections: [
            {
              heading: 'Defining a store',
              body: 'Zustand stores are created with create<T>() returning state and actions in one flat object. Unlike Redux, there are no reducers or action creators — actions directly call set() to merge state. The store is a hook: const count = useStore(s => s.count). TypeScript inference gives full autocompletion for state and actions without boilerplate.'
            },
            {
              heading: 'Selectors and performance',
              body: 'useStore(selector) runs the selector on every state change and re-renders only when the selected value differs. Zustand uses Object.is by default; import shallow from zustand/react/shallow for shallow equality on objects and arrays. Combining selectors with React.memo makes components re-render only when their specific slice changes.'
            },
            {
              heading: 'Persistence middleware',
              body: 'Zustand persist middleware serializes store state to a storage backend (AsyncStorage on mobile) and rehydrates on load. Configure it with name (storage key), partialize (which fields to persist) and version (for migrations). This replaces manual useEffect-based loading/saving patterns with a declarative approach.'
            }
          ],
          links: [
            {
              title: 'Zustand docs',
              url: 'https://zustand-demo.pmnd.rs/',
              sourceName: 'React Documentation',
              resourceType: 'reference',
              relationship: 'Zustand official documentation and examples.'
            },
            {
              title: 'Zustand GitHub',
              url: 'https://github.com/pmndrs/zustand',
              sourceName: 'React Documentation',
              resourceType: 'reference',
              relationship: 'Zustand source code, API reference and issues.'
            },
            {
              title: 'Zustand middleware',
              url: 'https://docs.pmnd.rs/zustand/integrations/persisting-store-data',
              sourceName: 'React Documentation',
              resourceType: 'guide',
              relationship: 'Persistence and middleware configuration guide.'
            }
          ],
          quiz: {
            prompt: 'What does the shallow equality function do in Zustand selectors?',
            options: ['Deep clones the state', 'Compares object properties one level deep to avoid re-renders on new but equal references', 'Disables all re-renders', 'Merges multiple stores'],
            answerIndex: 1,
            explanation: 'Zustand uses Object.is by default, which means new array/object references trigger re-renders even if contents are identical. shallow performs a one-level-deep property comparison to detect actual changes.'
          }
        }
      ]
    },
    {
      slug: 'data-and-networking',
      stage: 'Intermediate',
      title: 'Data, Networking & Storage',
      description: 'Fetching APIs, caching data and persisting state locally.',
      topics: [
        {
          slug: 'fetching-and-async',
          title: 'Fetch API & Async Data Patterns',
          minutes: 28,
          objectives: [
            'Fetch REST APIs with fetch or Axios and handle loading/error states',
            'Use React Query (TanStack Query) for caching, refetching and background updates',
            'Implement optimistic updates and retry logic for resilient data flows'
          ],
          sections: [
            {
              heading: 'Fetch basics in React Native',
              body: 'The global fetch API works identically to the browser. Call it in useEffect or event handlers, parse JSON with response.json(), and manage loading/error states via useState. AbortController cancels in-flight requests when components unmount, preventing state-update-on-unmounted-component warnings. Always wrap fetch in try/catch for network errors.'
            },
            {
              heading: 'TanStack Query for server state',
              body: 'TanStack Query (formerly React Query) manages server state with useQuery and useMutation hooks. It handles caching, stale-while-revalidate, background refetching and deduplication out of the box. Configure staleTime to control when data becomes stale, cacheTime for garbage collection, and retry for failure recovery. This eliminates manual loading-state management.'
            },
            {
              heading: 'Optimistic updates',
              body: 'Optimistic updates apply mutations to the local cache immediately, then reconcile with the server response. On success, the cache is updated to match the server; on failure, the mutation is rolled back with onMutate returning a rollback context. This makes UI feel instant while maintaining data correctness — a critical pattern for social feeds and collaborative apps.'
            }
          ],
          links: [
            {
              title: 'Networking guide',
              url: 'https://reactnative.dev/docs/network',
              sourceName: 'React Native Documentation',
              resourceType: 'documentation',
              relationship: 'Official React Native networking and fetch guide.'
            },
            {
              title: 'TanStack Query docs',
              url: 'https://tanstack.com/query/latest/docs/react/overview',
              sourceName: 'React Documentation',
              resourceType: 'documentation',
              relationship: 'TanStack Query API reference and getting started.'
            },
            {
              title: 'AbortController usage',
              url: 'https://react.dev/learn/synchronizing-with-effects#fetching-data',
              sourceName: 'React Documentation',
              resourceType: 'guide',
              relationship: 'React data fetching patterns with cleanup.'
            }
          ],
          quiz: {
            prompt: 'Why should you use AbortController in useEffect-based data fetching?',
            options: ['To speed up requests', 'To cancel in-flight requests when the component unmounts and prevent state-update warnings', 'To retry failed requests', 'To cache the response'],
            answerIndex: 1,
            explanation: 'When a component unmounts while a fetch is in flight, calling setState on the response causes a React warning. AbortController cancels the request in the cleanup function, preventing this issue.'
          }
        },
        {
          slug: 'local-storage',
          title: 'AsyncStorage & Secure Storage',
          minutes: 25,
          objectives: [
            'Persist key-value data with @react-native-async-storage/async-storage',
            'Use expo-secure-store for sensitive tokens and credentials',
            'Design storage schemas that support migrations and versioning'
          ],
          sections: [
            {
              heading: 'AsyncStorage basics',
              body: 'AsyncStorage is a simple key-value store backed by SQLite on Android and plist on iOS. It stores strings only — serialize objects with JSON.stringify. Use getItem, setItem, removeItem and multiGet/multiSet. It is unencrypted and suitable for non-sensitive preferences, cached data and feature flags. Set a namespace prefix per feature to avoid key collisions.'
            },
            {
              heading: 'Secure storage for secrets',
              body: 'expo-secure-store uses iOS Keychain and Android EncryptedSharedPreferences for hardware-backed encryption. It stores small values (< 2KB) — use it for auth tokens, refresh tokens and API keys, not large datasets. Always wrap reads in try/catch as the store can return null for missing keys or throw on platform errors.'
            },
            {
              heading: 'Migration strategy',
              body: 'Version your storage schema by storing a schemaVersion key. On app startup, check the version and run migrations sequentially: add default values for new keys, rename keys, transform data formats. Never delete old data until migration is confirmed. This prevents data loss when users update from older app versions.'
            }
          ],
          links: [
            {
              title: 'AsyncStorage docs',
              url: 'https://react-native-async-storage.github.io/async-storage/docs/usage',
              sourceName: 'React Native Documentation',
              resourceType: 'documentation',
              relationship: 'AsyncStorage installation and API reference.'
            },
            {
              title: 'Expo SecureStore',
              url: 'https://docs.expo.dev/versions/latest/sdk/securestore/',
              sourceName: 'Expo Documentation',
              resourceType: 'documentation',
              relationship: 'expo-secure-store API and platform behavior.'
            },
            {
              title: 'AsyncStorage migration guide',
              url: 'https://react-native-async-storage.github.io/async-storage/docs/migration',
              sourceName: 'React Native Documentation',
              resourceType: 'guide',
              relationship: 'Migrating from legacy AsyncStorage to the community package.'
            }
          ],
          quiz: {
            prompt: 'When should you use expo-secure-store instead of AsyncStorage?',
            options: ['For storing large images', 'For sensitive data like auth tokens and API keys that need encryption', 'For caching API responses', 'For storing user preferences like theme choice'],
            answerIndex: 1,
            explanation: 'expo-secure-store uses platform keychain/keystore encryption for hardware-backed security. It is limited to ~2KB and should be reserved for secrets, while AsyncStorage handles larger non-sensitive data.'
          }
        },
        {
          slug: 'offline-first',
          title: 'Offline-First Architecture',
          minutes: 27,
          objectives: [
            'Detect network connectivity with NetInfo and update UI accordingly',
            'Design a cache-first strategy with background sync for resilient UX',
            'Handle conflict resolution for data created or modified offline'
          ],
          sections: [
            {
              heading: 'Network state detection',
              body: '@react-native-community/netinfo provides isConnected and type (wifi, cellular, none). Use it to toggle between online and offline UI modes — showing cached data when offline and fresh data when online. Combine with a global network context provider so any component can read connectivity status without prop drilling.'
            },
            {
              heading: 'Cache-first data strategy',
              body: 'Display cached data immediately (cache-first), then attempt a network fetch in background. On success, update the cache and re-render with fresh data. On failure, the UI already shows usable cached content. This is the standard pattern for messaging, feeds and dashboards — users see data instantly regardless of network conditions.'
            },
            {
              heading: 'Conflict resolution',
              body: 'When offline-created data syncs with the server, conflicts may arise. Simple strategies include last-write-wins (server timestamp comparison) or client-wins for user-generated content. For complex cases, maintain a pending-operations queue, replay them in order on reconnection, and apply the server response to local state. Log conflicts for debugging even if resolution is automatic.'
            }
          ],
          links: [
            {
              title: 'NetInfo docs',
              url: 'https://github.com/react-native-netinfo/react-native-netinfo',
              sourceName: 'React Native Documentation',
              resourceType: 'documentation',
              relationship: 'NetInfo API reference and platform support.'
            },
            {
              title: 'Offline storage patterns',
              url: 'https://reactnative.dev/docs/asyncstorage',
              sourceName: 'React Native Documentation',
              resourceType: 'guide',
              relationship: 'AsyncStorage patterns for offline caching.'
            },
            {
              title: 'Fetch and offline handling',
              url: 'https://reactnative.dev/docs/network#offline-requests',
              sourceName: 'React Native Documentation',
              resourceType: 'guide',
              relationship: 'React Native networking with offline awareness.'
            }
          ],
          quiz: {
            prompt: 'In a cache-first offline strategy, what should the UI display while the background network fetch is in progress?',
            options: ['A loading spinner with no data', 'The cached data immediately, then update when fresh data arrives', 'An error message', 'A blank screen until the fetch completes'],
            answerIndex: 1,
            explanation: 'Cache-first strategy shows cached content instantly, providing a responsive experience. Fresh data replaces cached data when the background fetch completes, keeping the UI up to date without blocking.'
          }
        }
      ]
    },
    {
      slug: 'native-modules-and-publishing',
      stage: 'Advanced',
      title: 'Native Modules, Performance & Publishing',
      description: 'Accessing device APIs, optimizing performance and shipping to app stores.',
      topics: [
        {
          slug: 'expo-sdk-modules',
          title: 'Expo SDK & Device APIs',
          minutes: 29,
          objectives: [
            'Access camera, location and notifications through Expo SDK modules',
            'Handle runtime permissions with expo-permissions or platform-specific flows',
            'Use expo-modules-core to create custom native modules when needed'
          ],
          sections: [
            {
              heading: 'Expo SDK modules',
              body: 'The Expo SDK provides pre-built native modules: expo-camera for camera access, expo-location for GPS and geolocation, expo-notifications for push and local notifications, expo-image-picker for media selection, expo-haptics for tactile feedback. Each module wraps platform-specific APIs behind a consistent JavaScript interface with TypeScript types.'
            },
            {
              heading: 'Runtime permissions',
              body: 'iOS and Android require runtime permission requests for sensitive capabilities. expo-permissions wraps the platform permission dialogs into async prompts. Always check permission status before accessing a feature and gracefully degrade when denied. Expo modules often handle permission checks internally — check the docs for each module to avoid duplicate prompts.'
            },
            {
              heading: 'Custom native modules',
              body: 'When the Expo SDK does not cover a specific native API, expo-modules-core lets you write Swift/Kotlin modules that bridge to JavaScript. Define a TypeScript interface, implement it in Swift or Kotlin, and the Expo module system exposes it as a standard import. This avoids ejecting to bare workflow for small native features.'
            }
          ],
          links: [
            {
              title: 'Expo SDK overview',
              url: 'https://docs.expo.dev/versions/latest/',
              sourceName: 'Expo Documentation',
              resourceType: 'reference',
              relationship: 'Complete list of Expo SDK modules and APIs.'
            },
            {
              title: 'Expo Modules API',
              url: 'https://docs.expo.dev/modules/module-api/',
              sourceName: 'Expo Documentation',
              resourceType: 'documentation',
              relationship: 'Guide to building custom native modules with expo-modules-core.'
            },
            {
              title: 'Expo Notifications',
              url: 'https://docs.expo.dev/push-notifications/overview/',
              sourceName: 'Expo Documentation',
              resourceType: 'guide',
              relationship: 'Push notification setup, permissions and handling.'
            }
          ],
          quiz: {
            prompt: 'What is the advantage of expo-modules-core over ejecting to bare React Native workflow?',
            options: ['It is faster at runtime', 'It lets you write small custom native modules without ejecting, keeping the managed workflow benefits', 'It removes the need for Swift or Kotlin', 'It automatically publishes to app stores'],
            answerIndex: 1,
            explanation: 'expo-modules-core allows adding custom native code through Swift/Kotlin modules while remaining in the managed workflow, preserving OTA updates, EAS Build and zero-Xcode setup for the rest of the app.'
          }
        },
        {
          slug: 'performance-profiling',
          title: 'Performance Profiling & Optimization',
          minutes: 30,
          objectives: [
            'Use Flipper and React DevTools profiler to identify bottlenecks',
            'Optimize re-renders with React.memo, useMemo and stable references',
            'Apply Hermes engine optimizations and image caching strategies'
          ],
          sections: [
            {
              heading: 'Profiling tools',
              body: 'Flipper provides a React DevTools tab showing component tree, re-render frequency and performance timeline. The Performance tab in React DevTools records flame charts showing which components re-render and how long composition takes. Hermes (default in Expo) enables compile-ahead bytecode for faster startup. Use console.time for micro-benchmarks of specific operations.'
            },
            {
              heading: 'Re-render optimization',
              body: 'The most common React Native performance issue is unnecessary re-renders. Use React.memo on leaf components that receive stable props. Move expensive computations into useMemo. Ensure event handlers passed as props are wrapped in useCallback to maintain reference stability. Profile first — premature optimization wastes time on non-bottlenecks.'
            },
            {
              heading: 'Image and asset optimization',
              body: 'Use expo-image for caching and progressive loading instead of the basic Image component. Compress images before bundling with tools like imagemin. Use WebP format for smaller file sizes. Implement placeholder blurhash for skeleton states. Lazy-load images below the fold with FlatList or FlatList pagination to reduce initial memory footprint.'
            }
          ],
          links: [
            {
              title: 'React Native performance',
              url: 'https://reactnative.dev/docs/performance',
              sourceName: 'React Native Documentation',
              resourceType: 'guide',
              relationship: 'Official performance guide and common pitfalls.'
            },
            {
              title: 'Hermes engine',
              url: 'https://reactnative.dev/docs/hermes',
              sourceName: 'React Native Documentation',
              resourceType: 'documentation',
              relationship: 'Hermes JavaScript engine setup and optimization benefits.'
            },
            {
              title: 'React DevTools profiler',
              url: 'https://react.dev/learn/react-developer-tools',
              sourceName: 'React Documentation',
              resourceType: 'guide',
              relationship: 'Using React DevTools for profiling component re-renders.'
            }
          ],
          quiz: {
            prompt: 'A component re-renders every time its parent renders even though its props have not changed. What is the most targeted fix?',
            options: ['Add a useEffect dependency', 'Wrap the component with React.memo so it only re-renders when props actually change', 'Move the component to a different file', 'Use useReducer instead of useState'],
            answerIndex: 1,
            explanation: 'React.memo performs a shallow comparison of props and skips re-rendering when they are equal. This directly addresses the problem of unnecessary re-renders from parent updates without restructuring the component tree.'
          }
        },
        {
          slug: 'app-publishing',
          title: 'App Store & Play Store Publishing',
          minutes: 28,
          objectives: [
            'Configure EAS Build for iOS and Android release builds',
            'Prepare store listings with screenshots, descriptions and privacy policies',
            'Manage over-the-air updates and staged rollouts with EAS Update'
          ],
          sections: [
            {
              heading: 'EAS Build configuration',
              body: 'eas.json defines build profiles: development, preview and production. The production profile sets minification, source maps and environment variables. eas build handles code signing (iOS certificates, Android keystore) — submit credentials once and EAS manages them securely. Run eas build --platform ios and --platform android for cloud-based builds without local Xcode or Android Studio.'
            },
            {
              heading: 'Store listing requirements',
              body: 'Apple App Store and Google Play Console both require app name, description, category, screenshots per device class, privacy policy URL and content rating. Prepare 5.5-inch and 6.5-inch iPhone screenshots plus tablet variants for iOS. Play Console requires phone, 7-inch tablet and 10-inch tablet screenshots. Write descriptions that highlight key features and include relevant keywords.'
            },
            {
              heading: 'OTA updates and staged rollouts',
              body: 'EAS Update pushes JavaScript bundle updates to users without app store review. Configure channel-based rollouts: send updates to a preview channel first, then promote to production. Roll out to 5% of users, monitor crash reports and performance, then expand. This dramatically reduces the time to hotfix bugs in production without waiting for store review cycles.'
            }
          ],
          links: [
            {
              title: 'EAS Build docs',
              url: 'https://docs.expo.dev/build/introduction/',
              sourceName: 'Expo Documentation',
              resourceType: 'documentation',
              relationship: 'EAS Build setup, configuration and credentials.'
            },
            {
              title: 'EAS Submit',
              url: 'https://docs.expo.dev/submit/introduction/',
              sourceName: 'Expo Documentation',
              resourceType: 'documentation',
              relationship: 'Automated submission to App Store and Play Store.'
            },
            {
              title: 'EAS Update',
              url: 'https://docs.expo.dev/eas-update/introduction/',
              sourceName: 'Expo Documentation',
              resourceType: 'documentation',
              relationship: 'Over-the-air JavaScript bundle updates.'
            }
          ],
          quiz: {
            prompt: 'What is the primary advantage of EAS Update over a traditional app store release for a JavaScript bug fix?',
            options: ['EAS Update is free while store releases cost money', 'EAS Update pushes the fix instantly without waiting for app store review', 'EAS Update changes native code', 'EAS Update requires user action to install'],
            answerIndex: 1,
            explanation: 'EAS Update delivers JavaScript bundle changes directly to users\' devices, bypassing the 24-48 hour app store review cycle. This makes it ideal for hotfixes and rapid iterations on non-native code.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Food Delivery App Feature Specification',
    coverage: [
      'React Native',
      'TypeScript',
      'Expo',
      'React Navigation',
      'State Management',
      'Networking'
    ],
    brief:
      'Design a build-ready technical specification for a restaurant menu browsing feature in a React Native + Expo food delivery app. The feature loads restaurant menus from a REST API, supports offline caching, uses React Navigation for screen flow, and Zustand for cart state management with local persistence.',
    requirements: [
      'TypeScript interfaces for API response models (Restaurant, MenuItem, CartItem)',
      'React Navigation screen definitions with typed params for restaurant and item detail',
      'Zustand store design for cart state with persist middleware configuration',
      'TanStack Query setup with cache-first strategy and offline fallback logic',
      'FlatList rendering strategy with lazy image loading and skeleton placeholders',
      'Permission handling for location to find nearby restaurants'
    ],
    expectedOutput:
      'A complete technical specification another React Native developer could implement without follow-up questions.',
    rubric: [
      {
        skill: 'TypeScript & React Native',
        weight: 25,
        criteria: 'Correct TypeScript typing, idiomatic component composition, proper use of core components'
      },
      {
        skill: 'State management',
        weight: 20,
        criteria: 'Zustand store design with typed actions, persistence config, selector performance'
      },
      {
        skill: 'Networking & caching',
        weight: 20,
        criteria: 'TanStack Query configuration, cache-first strategy, error and loading state handling'
      },
      {
        skill: 'Navigation',
        weight: 15,
        criteria: 'Typed screen params, proper navigator structure, deep link consideration'
      },
      {
        skill: 'Performance',
        weight: 10,
        criteria: 'FlatList optimization, image lazy loading, skeleton placeholder UX'
      },
      {
        skill: 'Native APIs',
        weight: 10,
        criteria: 'Location permission flow, graceful degradation when permissions are denied'
      }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'React Native Component Library',
      stage: 'Beginner',
      objective: 'Build a reusable Button, Card and Input component library with TypeScript props, StyleSheet and accessibility props.',
      requirements: [
        'Three components: Button (primary/secondary variants), Card (with image header), Input (with label and error state)',
        'TypeScript interfaces for all props with sensible defaults via destructuring',
        'StyleSheet.create for all styles with platform-specific adjustments where needed',
        'Accessibility props: accessible, accessibilityLabel, accessibilityRole on every component',
        'Storybook-style usage examples showing each variant and state combination'
      ],
      skillsEvaluated: ['React Native Components', 'TypeScript', 'Accessibility'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the component source code with TypeScript interfaces and usage examples.',
        textLabel: 'Component library specification',
        minTextLength: 1000
      }
    },
    {
      title: 'Navigation & State Integration',
      stage: 'Foundation',
      objective: 'Design a multi-screen app flow with React Navigation and Zustand, including deep linking and offline state persistence.',
      requirements: [
        'Three-screen navigation flow: Home → Product Detail → Checkout',
        'TypeScript-typed navigator with screen params for each route',
        'Zustand store with cart actions (add, remove, update quantity) and persist middleware',
        'Deep link configuration mapping URLs to screens',
        'Offline indicator that reads network state and adjusts UI accordingly'
      ],
      skillsEvaluated: ['React Navigation', 'Zustand', 'Offline Architecture'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the navigation configuration, Zustand store design and deep link setup.',
        textLabel: 'Navigation and state specification',
        minTextLength: 1100,
        linkLabels: ['Deep link configuration example']
      }
    },
    {
      title: 'Production Release Strategy',
      stage: 'Advanced',
      objective: 'Plan the App Store and Play Store release for a React Native app including EAS Build, staged rollout and OTA update strategy.',
      requirements: [
        'EAS Build profile configuration for development, preview and production',
        'Store listing checklist: screenshots, descriptions, privacy policy for both stores',
        'Staged rollout percentage plan over 5 days with rollback triggers',
        'EAS Update channel strategy for hotfixes versus full releases',
        'Monitoring plan using crash reporting and performance metrics'
      ],
      skillsEvaluated: ['EAS Build', 'App Publishing', 'Release Management'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the release strategy as a structured document.',
        textLabel: 'Release strategy document',
        minTextLength: 1100,
        linkLabels: ['EAS Build configuration referenced']
      }
    }
  ],

  simTasks: [
    {
      title: 'P0: App crashes on launch after Expo SDK upgrade',
      context: 'After upgrading from Expo SDK 49 to SDK 50 and running EAS Build, the production build crashes immediately on launch. The development build works fine. Crash logs point to a native module compatibility issue with expo-camera.',
      requirements: [
        'List top 3 hypotheses for the crash ranked by likelihood',
        'Specify immediate fix or rollback steps to restore the production build',
        'Describe verification steps before re-deploying to the App Store'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Incident note: cause diagnosis, chosen mitigation, re-deploy checklist.',
      skills: ['Expo SDK', 'Debugging', 'EAS Build']
    },
    {
      title: 'State leak causes excessive re-renders and battery drain',
      context: 'Users report the app drains battery rapidly and becomes sluggish after 15 minutes of use. Profiling shows a global Zustand store is updating on every keystroke in a text input, causing the entire app tree to re-render.',
      requirements: [
        'Identify the exact cause in the Zustand store and why it triggers app-wide re-renders',
        'Specify the fix: selector optimization and store splitting strategy',
        'Describe regression checks to prevent the pattern from recurring'
      ],
      priority: 'high',
      dueDayOffset: 3,
      expectedOutput: 'Performance analysis memo with fix description and prevention strategy.',
      skills: ['Zustand', 'Performance Profiling', 'React Re-rendering']
    },
    {
      title: 'Offline sync creates duplicate entries',
      context: 'A field sales app lets reps log visits offline. When connectivity returns, the sync creates duplicate records because the server assigns IDs on creation and the client cannot predict them.',
      requirements: [
        'Diagnose why duplicates are created in the current sync flow',
        'Propose a fix: client-side UUID generation or server-side idempotency keys',
        'Specify a deduplication strategy for existing duplicates in the database'
      ],
      priority: 'normal',
      dueDayOffset: 5,
      expectedOutput: 'Sync architecture fix plan with deduplication and conflict resolution approach.',
      skills: ['Offline-First Architecture', 'Data Modeling', 'Sync Strategies']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Leah Kim',
      personaRole: 'iOS Developer',
      situation: 'Cross-platform feature parity discussion.',
      openingMessage:
        'We\'re aligning the checkout flow across platforms. The iOS team is building it natively in SwiftUI. Can you share your React Native navigation and state architecture so we match the user flow and data behavior? I want to avoid divergent UX.',
      expectedPoints: [
        'Shares navigation structure and Zustand store design openly',
        'Identifies areas where platform-specific behavior is expected and justified',
        'Proposes shared API contract to keep data models aligned',
        'Agrees on a follow-up sync for payment flow edge cases'
      ]
    },
    {
      kind: 'team',
      personaName: 'Marcus Chen',
      personaRole: 'QA Engineer',
      situation: 'Device-specific layout issue.',
      openingMessage:
        'The product detail screen looks correct on iPhone 14 and Pixel 7 but overflows on Samsung Galaxy Fold in unfolded state. The price text and add-to-cart button overlap. Can we look at this together?',
      expectedPoints: [
        'Engages collaboratively on reproduction steps and screenshots',
        'Checks flex layout and whether useWindowDimensions is used correctly',
        'Proposes a fix using responsive breakpoints or percentage-based widths',
        'Documents the foldable device behavior for future reference'
      ]
    },
    {
      kind: 'client',
      personaName: 'Priya Sharma',
      personaRole: 'Product Manager, FreshCart',
      situation: 'Push notification opt-in rate is low.',
      openingMessage:
        'Our push notification opt-in rate is 22% — the industry benchmark is 55%. Users dismiss the permission dialog immediately. Can we improve this without tricking them?',
      expectedPoints: [
        'Explains rationale-first permission flow — show value before asking',
        'Proposes a custom pre-permission screen explaining notification benefits',
        'Discusses notification channel best practices and do-not-disturb handling',
        'Measures opt-in rate before and after the change with A/B testing'
      ]
    },
    {
      kind: 'client',
      personaName: 'Ethan Brooks',
      personaRole: 'CTO, RideNow',
      situation: 'Concern about JavaScript performance in their React Native app.',
      openingMessage:
        'We\'re worried about React Native performance for our real-time ride tracking feature. The map needs to update every second with driver positions. Should we use a native module instead?',
      expectedPoints: [
        'Acknowledges performance concerns are valid for real-time data',
        'Explains Hermes engine and optimized FlatList for handling frequent updates',
        'Proposes native module for the map component while keeping UI in React Native',
        'Offers a profiling plan to measure frame rate and memory before deciding'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Incident',
      situation:
        'Friday 16:00: App Store Connect shows a 40% crash rate spike on the latest iOS release. Crashlytics points to a null reference in the onboarding flow caused by a missing TypeScript null check that only manifests in production builds due to Hermes optimization.',
      requiredActions: [
        {
          action: 'Halt the staged rollout immediately in App Store Connect',
          good: true,
          note: 'Stop the bleeding before investigating — limit affected users.'
        },
        {
          action: 'Check the crash stack trace in Crashlytics and identify the exact component and line',
          good: true,
          note: 'Data-driven triage is faster than guessing.'
        },
        {
          action: 'Push a hotfix via EAS Update to deliver the TypeScript fix without a new store review',
          good: true,
          note: 'OTA updates bypass the 24-hour review cycle for JavaScript fixes.'
        },
        {
          action: 'Wait until Monday since it\'s already Friday afternoon',
          good: false,
          note: '40% crash rate affects thousands of users per hour and demands immediate action.'
        }
      ]
    },
    {
      category: 'Process improvement',
      situation:
        'Three of the last five releases introduced regressions caught only in QA, not during development. The team lacks a consistent pre-merge testing standard and CI is not enforcing checks.',
      requiredActions: [
        {
          action: 'Propose a mandatory PR checklist: TypeScript compiles, tests pass, lint clean, EAS Build preview succeeds',
          good: true,
          note: 'Process gates reduce regression surface before QA even runs.'
        },
        {
          action: 'Blame individual developers for missing bugs in standup',
          good: false,
          note: 'Public blame kills psychological safety; systemic fixes prevent recurrence.'
        },
        {
          action: 'Set up an EAS Build CI gate that blocks merge on red checks',
          good: true,
          note: 'Automated enforcement removes human discipline from the equation.'
        },
        {
          action: 'Track regression count per sprint to measure improvement over time',
          good: true,
          note: 'Measurement makes the problem visible and the improvement measurable.'
        }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain how React Native renders UI and what Hermes engine changes about performance.',
      guidancePoints: [
        'JavaScript thread runs React components, communicates with native via bridge or JSI',
        'Hermes compiles JS to bytecode at build time, reducing startup time significantly',
        'Hermes provides faster memory allocation and garbage collection for mobile',
        'JSI enables synchronous native calls without the async bridge bottleneck'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'How does React Navigation differ from web-based routing, and why does it matter for React Native?',
      guidancePoints: [
        'React Navigation uses native navigation primitives, not DOM history API',
        'Native stack provides real platform transitions and back gesture support',
        'JavaScript-based navigation (like React Router) does not provide native feel or performance',
        'Deep linking maps URLs to screen configs, not path matching on a web server'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Users report the app becomes sluggish after 10 minutes of browsing a product catalog. Investigate.',
      guidancePoints: [
        'Check for FlatList not using getItemLayout or keyExtractor, causing layout recalculation',
        'Inspect Zustand selectors for creating new object references on every render',
        'Profile image loading — uncompressed images cause memory spikes',
        'Look for unbounded event listeners or subscriptions accumulating in useEffect'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Design an offline-first sync strategy for a field inspection app that collects photos and form data.',
      guidancePoints: [
        'Queue operations in SQLite or AsyncStorage with a pending status',
        'Use NetInfo to detect connectivity and trigger batch sync',
        'Handle conflict resolution with last-write-wins or server-authoritative merge',
        'Compress and queue photos separately from form metadata for bandwidth efficiency'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'A product manager asks to use Expo for a project that requires a custom native Bluetooth SDK not available in Expo. Push back or eject?',
      guidancePoints: [
        'Evaluate expo-modules-core as a way to wrap the native SDK without ejecting',
        'Explain the cost of ejecting: losing OTA updates, managed workflow benefits',
        'Propose a custom dev client with the native SDK included via config plugin',
        'Discuss the trade-offs and let the team make an informed decision'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'When would you choose Zustand over React Context for state management in a React Native app?',
      guidancePoints: [
        'Context re-renders all consumers on value change; Zustand uses granular selectors',
        'Zustand provides middleware (persist, devtools) without additional libraries',
        'Context is fine for low-frequency, app-wide values like theme and auth',
        'Zustand is better for high-frequency state like cart, forms and real-time data'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain why your React Native app needs location permission to a non-technical stakeholder who is concerned about privacy.',
      guidancePoints: [
        'State exactly when and where the permission is triggered in the app',
        'Explain that denied permission means the feature gracefully degrades to manual entry',
        'No background location access — only when the user explicitly opens the feature',
        'Reference the App Store and Play Store privacy labels for transparency'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Your code review feedback on a teammate\'s TypeScript types was perceived as pedantic. How do you handle it?',
      guidancePoints: [
        'Acknowledge the perception without being defensive',
        'Reframe feedback as explaining why strict types prevent runtime errors on mobile',
        'Separate must-fix (type safety) from style preferences',
        'Propose shared team TypeScript configuration to depersonalize strictness'
      ]
    }

  ]

}
