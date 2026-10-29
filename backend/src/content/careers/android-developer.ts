import type { CareerDef } from '../framework.js'

export const androidDeveloper: CareerDef = {
  slug: 'android-developer',
  name: 'Android Developer',
  category: 'Development',
  order: 9,
  description:
    'Creates native Android apps in Kotlin with Jetpack, covering UI, navigation, networking, Firebase and publishing.',
  difficulty: 'Intermediate',
  pathSummary:
    'Kotlin language fundamentals → Android project structure & Activity lifecycle → Jetpack Compose UI & theming → Navigation, ViewModels & state → Retrofit networking & repositories → Room persistence & background work → Firebase integration → testing, profiling & Play Store publishing.',
  mainSkills: [
    'Kotlin',
    'Jetpack Compose',
    'Android UI',
    'Navigation',
    'Retrofit & Networking',
    'Room & Data Persistence',
    'Firebase',
    'Play Store Publishing'
  ],
  sourcePlatforms: [
    'Android Developers',
    'Kotlin Documentation',
    'Jetpack Documentation',
    'Firebase Documentation'
  ],
  companyName: 'Vantage Mobile',
  roleTitle: 'Android Developer',

  chapters: [
    {
      slug: 'kotlin-and-android-core',
      stage: 'Beginner',
      title: 'Kotlin & Android Core',
      description: 'The language and platform every Android app is built on.',
      topics: [
        {
          slug: 'kotlin-essentials',
          title: 'Kotlin Language Essentials',
          objectives: [
            'Write idiomatic Kotlin with val/var, functions and lambdas',
            'Use null safety operators and data classes effectively',
            'Apply collection operations (map, filter, reduce) fluently'
          ],
          sections: [
            {
              heading: 'Kotlin by default',
              body: 'Kotlin favors val over var, concise single-expression functions and extension functions that add behavior without inheritance. Null safety via ? and !! eliminates entire crash classes — the type system encodes absence at compile time.'
            },
            {
              heading: 'Data and sealed classes',
              body: 'Data classes auto-generate equals, hashCode, toString and copy — ideal for DTOs and model objects. Sealed classes restrict inheritance to a known set of subtypes, enabling exhaustive when expressions that catch missing branches at compile time.'
            },
            {
              heading: 'Collections and lambdas',
              body: 'Kotlin lists, maps and sets support chained functional operations: filter, map, fold, flatMap. Lambdas with trailing syntax and it shorthand make callbacks readable. These patterns replace imperative loops in most Android code.'
            }
          ],
          links: [
            {
              title: 'Kotlin fundamentals',
              url: 'https://kotlinlang.org/docs/home.html',
              sourceName: 'Kotlin Documentation',
              resourceType: 'documentation',
              relationship: 'Official language reference and learning path.'
            },
            {
              title: 'Kotlin playground',
              url: 'https://play.kotlinlang.org/',
              sourceName: 'Kotlin Documentation',
              resourceType: 'documentation',
              relationship: 'Browser-based Kotlin REPL for experimenting.'
            },
            {
              title: 'Kotlin syntax overview',
              url: 'https://kotlinlang.org/docs/basic-syntax.html',
              sourceName: 'Kotlin Documentation',
              resourceType: 'guide',
              relationship: 'Quick syntax reference for core constructs.'
            }
          ],
          quiz: {
            prompt: 'val x: String? = null; println(x?.length ?: 0) prints…',
            options: ['NullPointerException', '0', 'null', 'Compilation error'],
            answerIndex: 1,
            explanation: 'The safe-call operator ?. short-circuiting to null triggers the elvis ?: fallback, which prints 0.'
          }
        },
        {
          slug: 'android-project-structure',
          title: 'Android Project Structure & Manifest',
          objectives: [
            'Navigate a standard Android Studio project layout',
            'Understand the role of AndroidManifest.xml and permissions',
            'Configure Gradle dependencies and build variants'
          ],
          sections: [
            {
              heading: 'Project anatomy',
              body: 'An Android project contains app/ (source, res, manifest), build.gradle.kts per module, and a settings file linking modules. Source sets separate main, test and androidTest code. Resources live under res/ organized by type: layout, drawable, values.'
            },
            {
              heading: 'The manifest',
              body: 'AndroidManifest.xml declares every activity, service, receiver and provider the OS can reach. Permissions (INTERNET, CAMERA) are requested here or at runtime for dangerous ones. The manifest also sets launch activity, theme and min/target SDK versions.'
            },
            {
              heading: 'Gradle and dependencies',
              body: 'Gradle orchestrates builds: dependencies are declared with version catalogs, implementations are scoped (implementation vs api), and build types (debug/release) control signing and minification. Understanding Gradle avoids mysterious build failures.'
            }
          ],
          links: [
            {
              title: 'Android project overview',
              url: 'https://developer.android.com/build',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Official build system and project structure guide.'
            },
            {
              title: 'App manifest overview',
              url: 'https://developer.android.com/guide/topics/manifest/manifest-intro',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Manifest element reference and role.'
            },
            {
              title: 'Gradle Kotlin DSL',
              url: 'https://developer.android.com/build/releases/gradle-plugin',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Build configuration and plugin updates.'
            }
          ],
          quiz: {
            prompt: 'Where does Android look to discover an app\'s activities before any code runs?',
            options: ['build.gradle.kts', 'AndroidManifest.xml', 'settings.gradle.kts', 'res/values/strings.xml'],
            answerIndex: 1,
            explanation: 'The OS reads the manifest at install time to register components, permissions and launch configuration.'
          }
        },
        {
          slug: 'activity-lifecycle',
          title: 'Activity Lifecycle & Context',
          objectives: [
            'Trace the Activity lifecycle callbacks and their triggers',
            'Handle configuration changes with ViewModel and saved state',
            'Understand Context and when to use application vs activity context'
          ],
          sections: [
            {
              heading: 'Lifecycle callbacks',
              body: 'Activities move through onCreate → onStart → onResume → onPause → onStop → onDestroy. The OS manages this stack: screen rotations, backgrounding and memory pressure all trigger transitions. Leaking resources past onDestroy is the classic Android memory leak.'
            },
            {
              heading: 'Surviving rotation',
              body: 'Configuration changes destroy and recreate activities by default. ViewModel survives these changes, holding UI state across recreations. SavedStateHandle persists across process death. Together they replace the deprecated onRetainNonConfigurationInstance pattern.'
            },
            {
              heading: 'Context mastery',
              body: 'Context provides access to resources, databases, preferences and system services. Activity context binds to windowed UI; Application context outlives activities. Leaking Activity context in singletons or static references causes the most common Android memory leaks.'
            }
          ],
          links: [
            {
              title: 'Activity lifecycle',
              url: 'https://developer.android.com/guide/components/activities/activity-lifecycle',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Authoritative lifecycle callback reference.'
            },
            {
              title: 'Save UI state',
              url: 'https://developer.android.com/topic/libraries/architecture/viewmodel',
              sourceName: 'Jetpack Documentation',
              resourceType: 'documentation',
              relationship: 'ViewModel and SavedStateHandle patterns.'
            },
            {
              title: 'Understanding Context',
              url: 'https://developer.android.com/guide/topics/resources/providing-resources',
              sourceName: 'Android Developers',
              resourceType: 'guide',
              relationship: 'How Context relates to resources and components.'
            }
          ],
          quiz: {
            prompt: 'A ViewModel is destroyed when…',
            options: ['The screen rotates', 'The Activity is finished and not returning', 'onPause is called', 'onStart is called'],
            answerIndex: 1,
            explanation: 'ViewModel survives configuration changes; it is cleared only when the Activity finishes permanently (e.g., finish() or process death).'
          }
        }
      ]
    },
    {
      slug: 'jetpack-compose-ui',
      stage: 'Foundation',
      title: 'Jetpack Compose UI',
      description: 'Building modern, declarative Android interfaces with Compose.',
      topics: [
        {
          slug: 'compose-fundamentals',
          title: 'Compose Fundamentals & State',
          objectives: [
            'Build UIs with composable functions and remember',
            'Understand recomposition and stable vs unstable types',
            'Manage state with mutableStateOf and derivedStateOf'
          ],
          sections: [
            {
              heading: 'Composables as blueprints',
              body: 'Compose replaces XML layouts with Kotlin functions annotated @Composable. Each function describes a piece of UI declaratively; the framework tracks state reads and recomposes only affected scopes. Naming conventions: PascalCase composable names like regular class constructors.'
            },
            {
              heading: 'State triggers recomposition',
              body: 'State in Compose must be observable. remember { mutableStateOf("") } holds state across recompositions. When the value changes, only the composable reading that state recomposes. Unstable parameters (List, Map without @Immutable) force unnecessary recompositions — model state precisely.'
            },
            {
              heading: 'Derived and hoisted state',
              body: 'derivedStateOf computes derived values that only recompose when the computed result changes, not on every source change. Hoisting state upward (passing values down and events up) makes composables testable and reusable without coupling to specific state holders.'
            }
          ],
          links: [
            {
              title: 'Compose basics',
              url: 'https://developer.android.com/develop/ui/compose/basics',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Official Compose fundamentals tutorial.'
            },
            {
              title: 'State in Compose',
              url: 'https://developer.android.com/develop/ui/compose/state',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'State management patterns and hoisting.'
            },
            {
              title: 'Recomposition performance',
              url: 'https://developer.android.com/develop/ui/compose/performance',
              sourceName: 'Android Developers',
              resourceType: 'guide',
              relationship: 'Optimizing recomposition and stability.'
            }
          ],
          quiz: {
            prompt: 'A composable reads a mutableStateOf variable but does not take it as a parameter. What happens on state change?',
            options: ['It recomposes automatically', 'It does not recompose — reads must happen during composition to trigger recomposition', 'It crashes', 'It recomposes the entire screen'],
            answerIndex: 1,
            explanation: 'Compose only tracks state reads that occur during composition; reading outside composition scope has no effect on recomposition.'
          }
        },
        {
          slug: 'compose-layouts',
          title: 'Layouts, Modifiers & Theming',
          objectives: [
            'Use Column, Row, Box and LazyColumn for common layouts',
            'Chain Modifier parameters to control size, padding and appearance',
            'Apply Material3 theming with dynamic color support'
          ],
          sections: [
            {
              heading: 'Layout primitives',
              body: 'Column arranges children vertically, Row horizontally, Box stacks them. LazyColumn/LazyRow virtualize lists for performance. ConstraintLayout handles complex overlapping constraints. Choose the simplest layout that works — nesting adds measure passes that hurt scroll jank.'
            },
            {
              heading: 'Modifiers in order',
              body: 'Modifiers are applied in left-to-right order and that order matters: padding before background differs from background before padding. Common modifiers: padding, size, background, clip, clickable, border. Each returns a new modified element immutably.'
            },
            {
              heading: 'Material3 theming',
              body: 'MaterialTheme provides colorScheme, typography and shapes to all descendant composables. Dynamic color (Android 12+) extracts palettes from the wallpaper. Define a custom theme function wrapping MaterialTheme to apply your brand consistently across all screens.'
            }
          ],
          links: [
            {
              title: 'Layouts in Compose',
              url: 'https://developer.android.com/develop/ui/compose/layouts/basics',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Official layout composable reference.'
            },
            {
              title: 'Compose modifier reference',
              url: 'https://developer.android.com/develop/ui/compose/modifiers',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Modifier API reference and ordering rules.'
            },
            {
              title: 'Material Design 3 theming',
              url: 'https://developer.android.com/jetpack/compose/designsystems/material3',
              sourceName: 'Jetpack Documentation',
              resourceType: 'documentation',
              relationship: 'Material3 theming integration in Compose.'
            }
          ],
          quiz: {
            prompt: 'How should a vertical list of 1000 items be rendered in Compose?',
            options: ['Column with 1000 children', 'LazyColumn with item{} blocks', 'Row rotated -90 degrees', 'Box with overlapping items'],
            answerIndex: 1,
            explanation: 'LazyColumn virtualizes items, composing only visible ones — essential for performance with large datasets.'
          }
        },
        {
          slug: 'compose-navigation',
          title: 'Navigation with Compose',
          objectives: [
            'Set up NavHost and route definitions',
            'Pass typed arguments and handle deep links',
            'Understand back stack management and navigation events'
          ],
          sections: [
            {
              heading: 'NavHost and routes',
              body: 'Navigation Compose uses a NavHost containing composable("route") blocks that define destination screens. The NavController manages the back stack. Routes are strings (or @Serializable data objects with type-safe args) mapping URLs to composable destinations.'
            },
            {
              heading: 'Typed arguments and deep links',
              body: 'Pass data between screens with route arguments: composable("user/{userId}") or type-safe NavArgs. Validate arguments in the destination composable. Deep links with navDeepLink allow external URLs to open specific screens directly from notifications or browser.'
            },
            {
              heading: 'Back stack discipline',
              body: 'navigate() pushes onto the stack; popBackStack() removes. launchSingleTop prevents duplicate destinations. saveState and restoreState support bottom navigation tab switching without losing per-tab state. Deep link handlers should clear the back stack appropriately for external entry points.'
            }
          ],
          links: [
            {
              title: 'Navigation in Compose',
              url: 'https://developer.android.com/develop/ui/compose/navigation',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Official Navigation Compose guide.'
            },
            {
              title: 'Type-safe navigation',
              url: 'https://developer.android.com/develop/ui/compose/navigation#type-safe',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Type-safe route definitions with Kotlin Serialization.'
            },
            {
              title: 'Deep links reference',
              url: 'https://developer.android.com/guide/navigation/deep-links',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Deep link configuration and intent filtering.'
            }
          ],
          quiz: {
            prompt: 'To prevent duplicate screen pushes when a bottom-nav tab is double-tapped, use…',
            options: ['popBackStack before navigate', 'launchSingleTop = true on the navOptions', 'removeAll on the navController', 'a global state flag'],
            answerIndex: 1,
            explanation: 'launchSingleTop prevents pushing the same top destination twice, which is exactly what double-tap requires.'
          }
        }
      ]
    },
    {
      slug: 'data-networking-persistence',
      stage: 'Intermediate',
      title: 'Data, Networking & Persistence',
      description: 'Fetching remote data, storing it locally and managing it reactively.',
      topics: [
        {
          slug: 'retrofit-networking',
          title: 'Retrofit & Networking',
          objectives: [
            'Define typed API interfaces with Retrofit',
            'Handle JSON serialization with Kotlinx Serialization or Moshi',
            'Manage errors, interceptors and token refresh correctly'
          ],
          sections: [
            {
              heading: 'Retrofit service interfaces',
              body: 'Retrofit generates HTTP clients from annotated Kotlin interfaces: @GET("users/{id}") suspend fun getUser(@Path("id") id: String): UserDto. The suspend keyword integrates directly with coroutines. Base URL lives in a single Retrofit builder — not scattered across calls.'
            },
            {
              heading: 'Serialization and interceptors',
              body: 'Kotlinx Serialization (preferred for Kotlin) or Moshi handles JSON↔model conversion with compile-time safety. OkHttp interceptors add logging, auth headers and rate limiting once — applied to every request without manual boilerplate in each call.'
            },
            {
              heading: 'Error handling',
              body: 'Network calls fail for transport (no connection, timeout) and HTTP reasons (4xx, 5xx). Wrap calls in try/catch for transport errors and inspect response.code for HTTP errors. Model Result<T> or sealed classes to represent success/failure states the UI can handle cleanly.'
            }
          ],
          links: [
            {
              title: 'Retrofit getting started',
              url: 'https://square.github.io/retrofit/',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Official Retrofit documentation and examples.'
            },
            {
              title: 'Kotlin Serialization',
              url: 'https://kotlinlang.org/docs/serialization.html',
              sourceName: 'Kotlin Documentation',
              resourceType: 'documentation',
              relationship: 'Compile-time JSON serialization for Kotlin data classes.'
            },
            {
              title: 'OkHttp interceptors',
              url: 'https://square.github.io/okhttp/features/interceptors/',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Adding auth headers and logging via interceptors.'
            }
          ],
          quiz: {
            prompt: 'A Retrofit call throws IOException on a device with no internet. The correct handling is…',
            options: ['Ignore and return empty list', 'Catch the IOException and surface a "no connection" state to the UI', 'Log and crash the app', 'Retry indefinitely in a loop'],
            answerIndex: 1,
            explanation: 'Transport errors are distinct from HTTP errors; the UI should inform the user and offer retry — never crash silently or loop.'
          }
        },
        {
          slug: 'room-persistence',
          title: 'Room Database & Data Layer',
          objectives: [
            'Define Room entities, DAOs and the database class',
            'Run database operations off the main thread with coroutines',
            'Apply migrations safely without data loss'
          ],
          sections: [
            {
              heading: 'Room architecture',
              body: 'Room provides compile-time SQL verification: @Entity defines tables, @Dao contains query methods, @Database ties them together. Type converters handle complex types (Date, enums) by mapping to primitives. The schema is checked at compile time against rawQuery annotations.'
            },
            {
              heading: 'Coroutines and Flow',
              body: 'DAO queries returning Flow emit new results whenever the underlying table changes — reactive UIs without manual refresh. Suspend DAO functions execute once on the caller\'s dispatcher. Never run Room operations on Dispatchers.Main; use Dispatchers.IO or viewModelScope.'
            },
            {
              heading: 'Migrations',
              body: 'Room migrations are versioned SQL statements: addColumn, createTable, etc. Start with fallbackToDestructiveMigration during development, switch to proper migrations before release. Export your schema to a JSON directory so migration tests can verify correctness against the expected schema.'
            }
          ],
          links: [
            {
              title: 'Room fundamentals',
              url: 'https://developer.android.com/training/data-storage/room',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Official Room database guide.'
            },
            {
              title: 'Room with coroutines',
              url: 'https://developer.android.com/training/data-storage/room/async-queries',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Flow and suspend DAO patterns.'
            },
            {
              title: 'Room migrations',
              url: 'https://developer.android.com/training/data-storage/room/migrating-db-versions',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Schema versioning and migration testing.'
            }
          ],
          quiz: {
            prompt: 'A Room DAO returns Flow<List<User>>. When does the Flow emit a new value?',
            options: ['Only on app restart', 'Whenever the Users table data changes', 'Every 5 seconds', 'Only when manually refreshed'],
            answerIndex: 1,
            explanation: 'Room automatically invalidates the Flow when the queried table is modified, keeping the UI reactive without manual refresh calls.'
          }
        },
        {
          slug: 'repository-and-dependency-injection',
          title: 'Repository Pattern & Dependency Injection',
          objectives: [
            'Abstract data sources behind a repository interface',
            'Apply Hilt for compile-time-safe dependency injection',
            'Separate data fetching strategy from UI logic'
          ],
          sections: [
            {
              heading: 'Repository as seam',
              body: 'A repository owns data access decisions: cache-first, network-first, or offline-first. UI and ViewModels depend on the repository interface, not on Retrofit or Room directly. This makes swapping sources, adding caching layers or testing with fakes trivial.'
            },
            {
              heading: 'Hilt fundamentals',
              body: 'Hilt uses annotations (@Inject, @Module, @Provides) to wire dependencies at compile time. @HiltViewModel injects dependencies into ViewModels cleanly. Scopes (@Singleton, @ActivityScoped) control lifecycle-aligned lifetimes — preventing leaks and re-creation waste.'
            },
            {
              heading: 'Offline-first strategy',
              body: 'Cache the last successful network response in Room, display it immediately, refresh in background, and merge on success. NetworkBoundResource (or a similar wrapper) encapsulates this pattern so every repository does not reinvent the cache-network dance.'
            }
          ],
          links: [
            {
              title: 'Hilt getting started',
              url: 'https://developer.android.com/training/dependency-injection/hilt-android',
              sourceName: 'Jetpack Documentation',
              resourceType: 'documentation',
              relationship: 'Official Hilt DI setup guide.'
            },
            {
              title: 'Repository pattern guide',
              url: 'https://developer.android.com/topic/libraries/architecture/adding-components',
              sourceName: 'Android Developers',
              resourceType: 'guide',
              relationship: 'Where repositories fit in architecture.'
            },
            {
              title: 'Guide to app architecture',
              url: 'https://developer.android.com/topic/architecture',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'UI, domain and data layer separation principles.'
            }
          ],
          quiz: {
            prompt: 'Why inject a repository interface instead of a concrete Retrofit implementation into a ViewModel?',
            options: ['Interfaces are faster at runtime', 'It enables swapping implementations for testing and keeps the ViewModel source-agnostic', 'Hilt cannot inject concrete classes', 'There is no reason — both are equivalent'],
            answerIndex: 1,
            explanation: 'Interface-based injection creates a seam for fake/test implementations and prevents the ViewModel from depending on network details.'
          }
        }
      ]
    },
    {
      slug: 'firebase-testing-publishing',
      stage: 'Advanced',
      title: 'Firebase, Testing & Publishing',
      description: 'Backend services, quality gates and shipping to the Play Store.',
      topics: [
        {
          slug: 'firebase-integration',
          title: 'Firebase Services Integration',
          objectives: [
            'Set up Firebase in an Android project with google-services.json',
            'Use Firestore or Realtime Database for cloud data',
            'Implement authentication and push notifications with FCM'
          ],
          sections: [
            {
              heading: 'Firebase setup',
              body: 'Register the app in the Firebase console, download google-services.json, and add the Google Services plugin to Gradle. Firebase SDKs auto-initialize; modular imports (firebase-firestore-ktx, firebase-auth-ktx) keep your APK lean by including only what you use.'
            },
            {
              heading: 'Firestore data model',
              body: 'Firestore organizes data as collections of documents with nested maps and arrays. Real-time listeners (addSnapshotListener) push updates to the UI without polling. Security rules govern read/write access per document — test rules in the emulator before deploying to production.'
            },
            {
              heading: 'Auth and messaging',
              body: 'Firebase Auth supports email/password, Google Sign-In, phone and anonymous providers with minimal integration code. FCM delivers push notifications via topics or device tokens; handle notifications in the foreground with onMessageReceived and in the background via the default tray behavior.'
            }
          ],
          links: [
            {
              title: 'Firebase Android setup',
              url: 'https://firebase.google.com/docs/android/setup',
              sourceName: 'Firebase Documentation',
              resourceType: 'documentation',
              relationship: 'Official Firebase integration guide for Android.'
            },
            {
              title: 'Firestore guide',
              url: 'https://firebase.google.com/docs/firestore',
              sourceName: 'Firebase Documentation',
              resourceType: 'documentation',
              relationship: 'Cloud Firestore data model and queries.'
            },
            {
              title: 'Firebase Authentication',
              url: 'https://firebase.google.com/docs/auth/android/start',
              sourceName: 'Firebase Documentation',
              resourceType: 'documentation',
              relationship: 'Sign-in providers and session management.'
            }
          ],
          quiz: {
            prompt: 'Firestore addSnapshotListener stops receiving updates when…',
            options: ['The Activity pauses', 'The listener is removed or the app loses Firestore connection without reconnection', 'You call get() instead', 'The document is not modified'],
            answerIndex: 1,
            explanation: 'Listeners are active until explicitly removed or the connection drops; always clean up listeners in lifecycle-aware scopes.'
          }
        },
        {
          slug: 'android-testing',
          title: 'Testing Android Apps',
          objectives: [
            'Write unit tests with JUnit for ViewModels and repositories',
            'Create UI tests with Compose testing APIs',
            'Use test doubles (fakes and mocks) to isolate layers'
          ],
          sections: [
            {
              heading: 'Unit testing architecture',
              body: 'ViewModel and repository tests run on the JVM via JUnit — no device needed. Inject fake dependencies (FakeUserRepository, FakeDispatcher) so tests are deterministic and fast. Assert state transitions, not internal implementation details.'
            },
            {
              heading: 'Compose UI tests',
              body: 'ComposeTestRule lets you assert on the rendered UI tree: onNodeWithText("Save").performClick(). Use testTag modifiers to locate elements reliably. Test semantic properties (contentDescription, role) rather than pixel positions to keep tests stable across devices.'
            },
            {
              heading: 'Test doubles',
              body: 'Fakes are lightweight real implementations (FakeNetworkClient returning canned data) for most tests. Mocks (Mockk) verify interactions when behavior matters more than state. Prefer fakes for clarity; resort to mocks when verifying call counts or argument capture.'
            }
          ],
          links: [
            {
              title: 'Testing overview',
              url: 'https://developer.android.com/training/testing/fundamentals',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Android testing strategy and fundamentals.'
            },
            {
              title: 'Compose testing',
              url: 'https://developer.android.com/develop/ui/compose/testing',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Testing Compose UIs with semantics and test rules.'
            },
            {
              title: 'Mockk documentation',
              url: 'https://mockk.io/',
              sourceName: 'MockK',
              resourceType: 'documentation',
              relationship: 'Kotlin-native mocking library reference.'
            }
          ],
          quiz: {
            prompt: 'Best practice for testing a ViewModel that calls a repository?',
            options: ['Test against the real Room database', 'Inject a fake repository and assert ViewModel state transitions', 'Only test the UI layer', 'Skip unit tests — instrumented tests are sufficient'],
            answerIndex: 1,
            explanation: 'Fakes isolate the ViewModel logic from the data layer, yielding fast, deterministic tests on the JVM.'
          }
        },
        {
          slug: 'play-store-publishing',
          title: 'Play Store Publishing & Release',
          objectives: [
            'Prepare a release build with signing and ProGuard/R8 rules',
            'Navigate the Play Console listing requirements and policy checks',
            'Manage staged rollouts and crash monitoring post-launch'
          ],
          sections: [
            {
              heading: 'Signing and release builds',
              body: 'Release builds are signed with a keystore; Google Play App Signing manages the upload and distribution keys. Enable R8 (code shrinking, obfuscation) with keep rules for classes accessed via reflection. Test the release build locally before uploading — debug builds hide R8 bugs.'
            },
            {
              heading: 'Store listing',
              body: 'Play Console requires a title, short/full description, screenshots per device class, feature graphic and privacy policy URL. Content ratings are determined by questionnaire. Data safety section declares what data you collect and share — fill honestly, as policy violations cause takedowns.'
            },
            {
              heading: 'Staged rollout and monitoring',
              body: 'Start with a 5% internal test track, expand to 20% production, then full rollout over days. Monitor Firebase Crashlytics and Play Console vitals (ANR rate, crash rate) at each stage. A bad release can be halted and rolled back — staged rollouts make recovery fast and low-drama.'
            }
          ],
          links: [
            {
              title: 'Play Console guide',
              url: 'https://support.google.com/googleplay/android-developer/answer/9859673',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Official Play Console publishing checklist.'
            },
            {
              title: 'App signing overview',
              url: 'https://developer.android.com/studio/publish/app-signing',
              sourceName: 'Android Developers',
              resourceType: 'documentation',
              relationship: 'Keystore management and Play App Signing.'
            },
            {
              title: 'Firebase Crashlytics',
              url: 'https://firebase.google.com/docs/crashlytics',
              sourceName: 'Firebase Documentation',
              resourceType: 'documentation',
              relationship: 'Real-time crash reporting and triage.'
            }
          ],
          quiz: {
            prompt: 'Why test the release build specifically before publishing, not just the debug build?',
            options: ['It looks better', 'R8 shrinks and obfuscates code; it can break reflection-based libraries that debug builds miss', 'Release builds auto-fix bugs', 'Debug builds cannot connect to Firebase'],
            answerIndex: 1,
            explanation: 'R8 strips classes and renames members; if your code uses reflection, Gson or serializers without keep rules, the release build crashes in ways debug never reveals.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Weather App Feature Build',
    coverage: [
      'Kotlin',
      'Jetpack Compose',
      'Navigation',
      'Retrofit',
      'Room',
      'Firebase'
    ],
    brief:
      'Design and specify (build-ready) a weather dashboard feature for a Kotlin + Compose Android app. The app fetches hourly forecasts from a REST API, caches them in Room, displays them in a scrollable list with pull-to-refresh, and sends a daily notification via FCM if the user opts in.',
    requirements: [
      'Data models (ForecastDto, ForecastEntity) with field types and Room TypeConverters',
      'Retrofit service interface with the endpoint, request and response shapes',
      'Repository interface with offline-first caching strategy documented',
      'Compose screen component tree with state holders and recomposition-relevant decisions',
      'Navigation route definition and how the screen is reached from the app graph',
      'Firebase notification registration and permission handling flow'
    ],
    expectedOutput:
      'A complete technical specification another Android developer could implement without follow-up questions.',
    rubric: [
      {
        skill: 'Kotlin & Compose',
        weight: 25,
        criteria: 'Idiomatic Kotlin, correct state modeling, composable decomposition'
      },
      {
        skill: 'Networking & caching',
        weight: 25,
        criteria: 'Retrofit interface correctness, offline-first strategy, error state handling'
      },
      {
        skill: 'Architecture',
        weight: 20,
        criteria: 'Clean separation of concerns, repository pattern, DI readiness'
      },
      {
        skill: 'Firebase integration',
        weight: 15,
        criteria: 'Notification permission flow, FCM token registration, security rules consideration'
      },
      {
        skill: 'Navigation',
        weight: 15,
        criteria: 'Typed routes, back stack handling, deep link consideration'
      }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'Kotlin Data Layer Design',
      stage: 'Foundation',
      objective: 'Design the data layer for a todo app: Room entities, DAO queries and a repository with offline-first caching logic.',
      requirements: [
        'Room @Entity with primary key, timestamps and nullable fields',
        'At least 4 DAO queries (insert, delete, observe-all, filter-by-status)',
        'Repository interface with offline-first caching pseudocode',
        'TypeConverter for date and enum fields',
        'Migration from version 1 to version 2 adding a priority column'
      ],
      skillsEvaluated: ['Kotlin', 'Room', 'Repository Pattern'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the complete data layer specification with annotated code.',
        textLabel: 'Data layer spec',
        minTextLength: 1000
      }
    },
    {
      title: 'Compose UI Feature Specification',
      stage: 'Intermediate',
      objective: 'Specify a profile settings screen in Compose: state management, layout decisions, theming and accessibility annotations.',
      requirements: [
        'Composable component tree with state holders documented',
        'Modifier chaining decisions with rationale for padding/background order',
        'Material3 theme token mapping (color, typography) for the screen',
        'Accessibility considerations: contentDescription, focus order, semantic role',
        'Navigation integration: how this screen is pushed/popped'
      ],
      skillsEvaluated: ['Jetpack Compose', 'Android UI', 'Accessibility'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the UI specification with component tree and theming decisions.',
        textLabel: 'UI specification',
        minTextLength: 1100,
        linkLabels: ['Material3 theme reference cited']
      }
    },
    {
      title: 'End-to-End Release Plan',
      stage: 'Advanced',
      objective: 'Plan the Play Store release for a new feature branch: signing, testing gates, staged rollout and crash monitoring.',
      requirements: [
        'Release build checklist (signing, R8 keep rules, ProGuard mapping)',
        'Testing gate criteria: unit test coverage threshold, UI test pass rate',
        'Staged rollout percentage plan over 5 days with pause triggers',
        'Crashlytics alert thresholds and escalation path',
        'Rollback procedure documented step-by-step'
      ],
      skillsEvaluated: ['Play Store Publishing', 'Testing', 'Release Management'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the release plan as a structured document.',
        textLabel: 'Release plan',
        minTextLength: 1100,
        linkLabels: ['Play Console checklist referenced']
      }
    }
  ],

  simTasks: [
    {
      title: 'P0: App crash on startup after Firebase migration',
      context: 'After updating google-services.json from a new Firebase project, the app crashes immediately on launch with a SecurityException. Crashlytics is not yet initialized so no reports are arriving.',
      requirements: [
        'List top 3 crash hypotheses ranked by likelihood',
        'Specify the immediate fix or rollback steps',
        'Describe verification steps before re-deploying'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Incident note: cause diagnosis, chosen mitigation, re-deploy checklist.',
      skills: ['Debugging', 'Firebase', 'Play Store']
    },
    {
      title: 'Memory leak: Activity Context in singleton',
      context: 'LeakCanary reports a retained Activity after navigating back from the profile screen. The leak path goes through a Singleton image loader holding Activity context.',
      requirements: [
        'Identify the exact leak path and explain why Activity context is retained',
        'Specify the fix: context type change and lifecycle-aware scoping',
        'Describe regression checks to prevent recurrence'
      ],
      priority: 'high',
      dueDayOffset: 3,
      expectedOutput: 'Leak analysis memo with fix description and prevention strategy.',
      skills: ['Android Lifecycle', 'Memory Management', 'Debugging']
    },
    {
      title: 'Network timeout complaints from users',
      context: 'Users on slow mobile networks report the home feed shows a blank screen for 10+ seconds. The current implementation blocks the main thread during a sequential network call chain.',
      requirements: [
        'Diagnose the root cause (threading, sequential calls, missing timeout)',
        'Propose a fix: coroutine dispatchers, parallel fetching, timeout configuration',
        'Specify UX improvements: skeleton loading state and error retry affordance'
      ],
      priority: 'normal',
      dueDayOffset: 5,
      expectedOutput: 'Optimization plan with threading model, UX improvement and metrics to measure.',
      skills: ['Kotlin Coroutines', 'Networking', 'Android UI']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Leah Kim',
      personaRole: 'iOS Developer',
      situation: 'Cross-platform feature parity discussion.',
      openingMessage:
        'We\'re aligning the feature roadmap — the iOS team is building the profile screen with SwiftUI. Can you share your Compose architecture decisions so we match behavior and data models? I want to avoid divergent UX.',
      expectedPoints: [
        'Shares composable decomposition and state strategy openly',
        'Identifies areas where platform differences are expected and justified',
        'Proposes shared data model contract to keep behavior aligned',
        'Agrees on a follow-up sync for API shape alignment'
      ]
    },
    {
      kind: 'team',
      personaName: 'Marcus Chen',
      personaRole: 'QA Engineer',
      situation: 'Device-specific crash report.',
      openingMessage:
        'The latest build crashes on Samsung Galaxy A13 running Android 11 when opening the camera permission dialog. Pixel devices are fine. Logs show a WindowManager$BadTokenException. Can we look at this together?',
      expectedPoints: [
        'Engages collaboratively on reproduction steps',
        'Checks permission dialog lifecycle handling on older API levels',
        'Proposes a fix addressing the Activity context timing issue',
        'Documents the device-specific behavior for future reference'
      ]
    },
    {
      kind: 'client',
      personaName: 'Priya Sharma',
      personaRole: 'Product Manager, RideNow',
      situation: 'Feature request with privacy implications.',
      openingMessage:
        'We want background location tracking for ride ETA updates even when the app is closed. Legal says it\'s fine with a disclosure. How quickly can we add this and what are the Play Store implications?',
      expectedPoints: [
        'Flags Play Store background location policy and the stricter review process',
        'Explains battery optimization and user-permission UX trade-offs',
        'Offers phased approach: foreground first, then background with clear consent',
        'Documents privacy and store-policy considerations before proceeding'
      ]
    },
    {
      kind: 'client',
      personaName: 'Ethan Brooks',
      personaRole: 'CTO, FreshCart',
      situation: 'Push notification opt-in rate is low.',
      openingMessage:
        'Our push notification opt-in rate is 18% — the Android team benchmark is 60%. Users dismiss the permission dialog. Can we improve this without tricking them?',
      expectedPoints: [
        'Explains rationale-first permission flow (show value before asking)',
        'Proposes a custom pre-permission screen explaining benefits',
        'Discusses do-not-disturb and notification channel best practices',
        'Measures opt-in rate before and after the change'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Incident',
      situation:
        'Friday 16:00: Play Console shows a 35% crash rate spike on the latest release. Crashlytics points to a NullPointerException in the onboarding flow affecting 12,000 users in the last hour.',
      requiredActions: [
        {
          action: 'Halt the staged rollout immediately in Play Console',
          good: true,
          note: 'Stop the bleeding before investigating — limit affected users.'
        },
        {
          action: 'Check Crashlytics stack trace and identify the exact commit causing the NPE',
          good: true,
          note: 'Data-driven triage is faster than guessing.'
        },
        {
          action: 'Roll back to the previous stable release via Play Console',
          good: true,
          note: 'Restore stable state; investigate root cause after users are safe.'
        },
        {
          action: 'Wait until Monday to address it since it is Friday afternoon',
          good: false,
          note: '12,000 affected users per hour demands immediate action regardless of day.'
        }
      ]
    },
    {
      category: 'Process improvement',
      situation:
        'Three of the last five releases introduced regressions caught only in QA, not during development. The team lacks a consistent pre-merge testing standard.',
      requiredActions: [
        {
          action: 'Propose a mandatory PR checklist: unit tests pass, lint clean, release build verified locally',
          good: true,
          note: 'Process gates reduce regression surface before QA even runs.'
        },
        {
          action: 'Blame individual developers for missing bugs in standup',
          good: false,
          note: 'Public blame kills psychological safety; systemic fixes prevent recurrence.'
        },
        {
          action: 'Set up a CI gate that blocks merge on red checks',
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
      prompt: 'Explain the Activity lifecycle and how ViewModel survives configuration changes.',
      guidancePoints: [
        'Lifecycle callback sequence: onCreate → onStart → onResume → onPause → onStop → onDestroy',
        'ViewModel scope tied to Activity, not configuration lifecycle',
        'SavedStateHandle for process death survival',
        'Common memory leak: holding Activity reference in ViewModel'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'How does Jetpack Compose recomposition work, and what makes a type "unstable"?',
      guidancePoints: [
        'State read tracking during composition triggers scoped recomposition',
        'Stable types (primitive, data class with stable fields) skip recomposition when unchanged',
        'Unstable collections (List, Map without @Immutable/@Stable) force recomposition',
        'derivedStateOf and remember for optimizing recomposition scope'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Users report the app becomes sluggish after 10 minutes of use. Investigate.',
      guidancePoints: [
        'Check memory profiler for leaks (Activity/Fragment retained after navigation)',
        'Inspect database operations for main-thread blocking',
        'Look for unbounded Flow collections accumulating in memory',
        'Profile recomposition counts in Compose for unnecessary recompositions'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Design an offline-first sync strategy for a note-taking app.',
      guidancePoints: [
        'Local Room database as source of truth',
        'Background WorkManager sync with conflict resolution (last-write-wins or merge)',
        'Network state listener to trigger sync when connectivity returns',
        'Pending-changes queue for operations created offline'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'A product manager asks to use SharedPreferences for a complex nested user profile. Push back or comply?',
      guidancePoints: [
        'SharedPreferences is flat key-value; nested models require manual serialization',
        'Room or DataStore (with protobuf) is the appropriate tool',
        'Explain maintenance cost and type-safety benefits of structured storage',
        'Offer to prototype the recommended approach quickly to demonstrate'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'When would you choose WorkManager over AlarmManager or a foreground service?',
      guidancePoints: [
        'WorkManager guarantees execution with OS-friendly deferral and constraints',
        'AlarmManager requires manual handling of Doze and battery optimization',
        'Foreground services are for visible, ongoing user-facing work',
        'WorkManager is for deferrable, guaranteed background work'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain why your app needs the CAMERA permission to a non-technical stakeholder who is concerned about privacy.',
      guidancePoints: [
        'State exactly when and where the permission is triggered in the app',
        'Explain the user controls: denied permission means feature gracefully degrades',
        'No background camera access — only when user explicitly opens the feature',
        'Reference the Play Store data safety declaration for transparency'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Your code review feedback on a teammate\'s Compose code was perceived as harsh. How do you handle it?',
      guidancePoints: [
        'Acknowledge the perception without being defensive',
        'Reframe feedback as questions or suggestions rather than directives',
        'Separate must-fix (correctness) from style preferences',
        'Propose a team-wide code style convention to depersonalize style feedback'
      ]
    }

  ]

}
