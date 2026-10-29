import type { CareerDef } from '../framework.js'

export const flutterDeveloper: CareerDef = {
  slug: 'flutter-developer',
  name: 'Flutter Developer',
  category: 'Development',
  order: 11,
  description:
    'Ships cross-platform apps with Flutter and Dart — widgets, state, navigation, Firebase integration and release.',
  difficulty: 'Beginner-friendly',
  pathSummary:
    'Dart language fundamentals → Flutter project structure & widget tree → State management & navigation → Theming, layouts & responsive design → Networking, storage & Firebase integration → Platform channels & testing → Performance profiling, CI/CD & app store release.',
  mainSkills: [
    'Dart',
    'Flutter Widgets',
    'State Management',
    'Flutter Navigation',
    'Firebase Integration',
    'Responsive Design',
    'Cross-Platform Development',
    'App Publishing'
  ],
  sourcePlatforms: ['Flutter Documentation', 'Dart Documentation', 'Firebase Documentation'],
  companyName: 'Crosswave Labs',
  roleTitle: 'Flutter Developer',

  chapters: [
    {
      slug: 'dart-and-widget-fundamentals',
      stage: 'Beginner',
      title: 'Dart & Widget Fundamentals',
      description: 'The language and widget system that form the foundation of every Flutter application.',
      topics: [
        {
          slug: 'dart-language-essentials',
          title: 'Dart Language Essentials',
          minutes: 28,
          objectives: [
            'Write idiomatic Dart with variables, functions and null safety',
            'Use classes, mixins and extension methods effectively',
            'Apply async/await, Futures and Streams for asynchronous work'
          ],
          sections: [
            {
              heading: 'Dart is both familiar and unique',
              body: 'Dart looks like a mix of JavaScript and Java — it has a familiar C-style syntax but adds null safety as a first-class language feature. The ? operator makes absence explicit at compile time, and late variables handle deferred initialization safely. val-like immutability comes from final — prefer it over var wherever the reference does not change.'
            },
            {
              heading: 'Object orientation done right',
              body: 'Dart classes support single inheritance with mixins for shared behavior. Named constructors, factory constructors and const constructors give flexibility for object creation. Extension methods let you add methods to existing types without modifying them — a clean alternative to inheritance for utility functions.'
            },
            {
              heading: 'Futures, Streams and isolates',
              body: 'Dart\'s event-loop model runs single-threaded with async/await for non-blocking operations. A Future represents a value not yet available; a Stream emits a sequence of values over time. For CPU-intensive work, isolates provide true parallelism without shared memory — each isolate has its own memory heap and event loop.'
            }
          ],
          links: [
            {
              title: 'Dart language fundamentals',
              url: 'https://dart.dev/language',
              sourceName: 'Dart Documentation',
              resourceType: 'documentation',
              relationship: 'Official Dart language reference and learning path.'
            },
            {
              title: 'Dart null safety',
              url: 'https://dart.dev/null-safety',
              sourceName: 'Dart Documentation',
              resourceType: 'documentation',
              relationship: 'Sound null safety deep dive and migration guide.'
            },
            {
              title: 'Futures and async-await',
              url: 'https://dart.dev/language/async',
              sourceName: 'Dart Documentation',
              resourceType: 'documentation',
              relationship: 'Asynchronous programming in Dart.'
            }
          ],
          quiz: {
            prompt: 'What does the ? suffix do on a Dart variable declaration?',
            options: [
              'Makes the variable immutable',
              'Declares the variable as nullable, allowing it to hold null',
              'Marks the variable as a constant',
              'Makes the variable lazy-initialized'
            ],
            answerIndex: 1,
            explanation: 'Without ?, a Dart variable cannot be null. The ? suffix explicitly opts into nullability — the compiler then forces you to handle the null case before using the value.'
          }
        },
        {
          slug: 'flutter-widget-tree',
          title: 'The Flutter Widget Tree',
          minutes: 27,
          objectives: [
            'Distinguish StatelessWidget from StatefulWidget and when to use each',
            'Build a composable widget tree with child and children patterns',
            'Understand the build method, element tree and widget reuse lifecycle'
          ],
          sections: [
            {
              heading: 'Everything is a widget',
              body: 'Flutter UIs are composed of small, single-responsibility widgets nested in a tree. A StatelessWidget takes immutable config and returns a subtree — no internal state. A StatefulWidget manages mutable state across rebuilds via a State object. The framework calls build() whenever state changes and reconciles the old and new widget trees efficiently.'
            },
            {
              heading: 'Parent-child composition',
              body: 'Flutter uses a single-child pattern (Container → child) and multi-child pattern (Column → children). Widgets never inherit from each other for layout — instead, they compose. A Card might contain a Column containing a Text and an Image. This composition model keeps each widget testable and replaceable in isolation.'
            },
            {
              heading: 'The element tree behind the scenes',
              body: 'Widgets are immutable configuration objects. The element tree is the mutable, long-lived representation that actually manages state and lifecycle. When Flutter rebuilds, it diffs the new widget tree against the existing element tree using keys — reusing elements where possible and destroying only where necessary. Understanding this separation prevents subtle state-loss bugs.'
            }
          ],
          links: [
            {
              title: 'Flutter widget fundamentals',
              url: 'https://docs.flutter.dev/ui/widgets-intro',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Official introduction to the widget system.'
            },
            {
              title: 'Stateful and StatefulWidgets',
              url: 'https://docs.flutter.dev/ui/interactivity',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Adding interactivity with stateful widgets.'
            },
            {
              title: 'Effective Flutter: widget best practices',
              url: 'https://docs.flutter.dev/effective-ui',
              sourceName: 'Flutter Documentation',
              resourceType: 'guide',
              relationship: 'Community best practices for widget composition.'
            }
          ],
          quiz: {
            prompt: 'A widget\'s build() method returns a tree of widgets. When is build() called again?',
            options: [
              'Only when the widget is first inserted into the tree',
              'Whenever setState is called on a StatefulWidget or the parent rebuilds',
              'Every frame regardless of state changes',
              'Only when the app resumes from background'
            ],
            answerIndex: 1,
            explanation: 'build() re-runs on setState calls and parent rebuilds. Flutter diffs the output against the previous tree to apply minimal DOM changes — so builds should be fast and side-effect-free.'
          }
        },
        {
          slug: 'layouts-and-responsive-design',
          title: 'Layouts & Responsive Design',
          minutes: 30,
          objectives: [
            'Use Row, Column, Stack and Flex layouts with correct constraint passing',
            'Apply SingleChildScrollView, ListView and GridView for scrollable content',
            'Build responsive UIs with LayoutBuilder, MediaQuery and OrientationBuilder'
          ],
          sections: [
            {
              heading: 'Constraints flow down, sizes flow up',
              body: 'Flutter layout works by passing constraints from parent to child. A parent tells its child the minimum and maximum width/height it can use. The child picks a size within those bounds, then tells the parent its actual size. This top-down constraint, bottom-up sizing model is the core mental model — misunderstanding it causes the most common overflow and layout errors.'
            },
            {
              heading: 'Scrollable vs non-scrollable',
              body: 'A Column inside a non-scrollable parent gets infinite vertical constraints — this causes the yellow-and-black overflow stripe. Wrap it in SingleChildScrollView or use a ListView instead. ListView.builder creates children lazily, making it the default choice for lists with more than a handful of items. GridViews use SliverGridDelegate to control column count and aspect ratio.'
            },
            {
              heading: 'Responsive strategies',
              body: 'MediaQuery.of(context) gives you screen dimensions and text scale for density-independent layouts. LayoutBuilder lets you respond to the constraints of the parent widget — ideal for adaptive layouts inside cards or navigation destinations. OrientationBuilder triggers rebuilds on rotation. For extreme screen sizes (foldables, desktop), use adaptive or adaptive-resolve patterns to swap entire widget trees.'
            }
          ],
          links: [
            {
              title: 'Introduction to layouts',
              url: 'https://docs.flutter.dev/ui/layout',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Official layout model and constraint rules.'
            },
            {
              title: 'List and grid views',
              url: 'https://docs.flutter.dev/ui/layout/scrolling',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Scrollable collections with ListView and GridView.'
            },
            {
              title: 'Responsive and adaptive design',
              url: 'https://docs.flutter.dev/ui/layout/responsive',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Building adaptive layouts for different screen sizes.'
            }
          ],
          quiz: {
            prompt: 'A Column contains a Text and an Image, and the parent gives the Column unlimited height. What happens?',
            options: [
              'Flutter automatically adds a scrollbar',
              'A yellow-and-black overflow warning is shown when children exceed available space',
              'The image disappears',
              'Nothing — unlimited height is always fine'
            ],
            answerIndex: 1,
            explanation: 'Without a scrolling ancestor, non-scrollable layouts enforce finite constraints. When children exceed the max width, Flutter shows the overflow error stripe. Wrapping in SingleChildScrollView or ListView fixes it.'
          }
        }
      ]
    },
    {
      slug: 'state-and-navigation',
      stage: 'Foundation',
      title: 'State Management & Navigation',
      description: 'Managing application state cleanly and moving between screens with Flutter\'s navigation system.',
      topics: [
        {
          slug: 'local-state-and-setstate',
          title: 'Local State & setState',
          minutes: 26,
          objectives: [
            'Decide when setState is sufficient versus when a state management solution is needed',
            'Use ValueNotifier and ValueListenableBuilder for simple observable state',
            'Manage form state with TextFormField, validation and FormState'
          ],
          sections: [
            {
              heading: 'setState is not the enemy',
              body: 'setState is perfectly fine for local, ephemeral state — toggling a switch, expanding an accordion, controlling animation direction. The problem arises when state needs to be shared across distant parts of the widget tree or survives navigation. Start with setState and only move to a state management solution when the pain becomes real.'
            },
            {
              heading: 'ValueNotifier as the simplest shared state',
              body: 'ValueNotifier wraps a value and notifies listeners when it changes. ValueListenableBuilder rebuilds only its subtree on change, avoiding full widget-tree rebuilds. This is a lightweight alternative to Provider for state shared between two or three widgets without external dependencies.'
            },
            {
              heading: 'Form state management',
              body: 'TextFormField stores its own editing state internally. FormState coordinates validation and submission across multiple fields. Use a GlobalKey<FormState> to call validate() and save(). AutovalidateMode.onUserInteraction gives real-time feedback without overwhelming users on initial load.'
            }
          ],
          links: [
            {
              title: 'State management approaches',
              url: 'https://docs.flutter.dev/data-and-backend/state-mgmt',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Official survey of state management options.'
            },
            {
              title: 'ValueNotifier and ChangeNotifier',
              url: 'https://api.flutter.dev/flutter/foundation/ValueNotifier-class.html',
              sourceName: 'Flutter Documentation',
              resourceType: 'reference',
              relationship: 'API reference for lightweight observable state.'
            },
            {
              title: 'Forms in Flutter',
              url: 'https://docs.flutter.dev/ui/navigation/forms-validation',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Form validation and TextFormField usage.'
            }
          ],
          quiz: {
            prompt: 'A toggle button should show a heart icon when tapped and remove it when tapped again. What is the simplest approach?',
            options: [
              'Provider with a ChangeNotifier',
              'setState inside a StatefulWidget',
              'Riverpod with a StateProvider',
              'A global boolean variable'
            ],
            answerIndex: 1,
            explanation: 'A single boolean toggle is classic local ephemeral state — setState is the simplest and most readable solution. Adding state management libraries for this is unnecessary complexity.'
          }
        },
        {
          slug: 'provider-and-riverpod',
          title: 'Provider & Riverpod State Management',
          minutes: 30,
          objectives: [
            'Use ChangeNotifier with Provider for shared widget-tree state',
            'Understand Riverpod\'s provider types: StateProvider, FutureProvider and StateNotifierProvider',
            'Apply code generation with riverpod_annotation for type-safe providers'
          ],
          sections: [
            {
              heading: 'Provider puts state in the tree',
              body: 'Provider wraps ChangeNotifier instances and exposes them via Provider.of or Consumer widgets. It scopes state to a subtree — the provider\'s descendants can read it, ancestors cannot. ChangeNotifier is the bridge: it calls notifyListeners() when state changes, triggering rebuilds in consumers. This pattern avoids passing state through constructors multiple levels deep.'
            },
            {
              heading: 'Riverpod makes providers global and testable',
              body: 'Riverpod provides compile-safe, globally accessible providers. StateProvider manages a single value. FutureProvider wraps async data. StateNotifierProvider manages complex state with immutable updates via a StateNotifier. Providers are scoped to widgets using ConsumerWidget, eliminating the need for InheritedWidget wrappers entirely.'
            },
            {
              heading: 'Choosing between Provider and Riverpod',
              body: 'Provider is mature, widely used and simple — ideal for projects already using it. Riverpod offers better testability (providers can be overridden in tests without wrapping in widgets), code generation for type safety and no BuildContext dependency. For new projects, Riverpod is generally the recommended choice; migration from Provider is incremental and well-documented.'
            }
          ],
          links: [
            {
              title: 'Provider package documentation',
              url: 'https://pub.dev/packages/provider',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Official Provider package and usage guide.'
            },
            {
              title: 'Riverpod documentation',
              url: 'https://riverpod.dev/introduction/getting-started',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Getting started with Riverpod state management.'
            },
            {
              title: 'Architecture samples',
              url: 'https://docs.flutter.dev/data-and-backend/state-mgmt/options',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Comparison of state management options and their trade-offs.'
            }
          ],
          quiz: {
            prompt: 'In Riverpod, which provider type is best for managing a list of items with add/remove operations?',
            options: [
              'StateProvider<List<T>>',
              'StateNotifierProvider with a StateNotifier',
              'FutureProvider',
              'Provider<List<T>>'
            ],
            answerIndex: 1,
            explanation: 'StateNotifier encapsulates the list mutation logic in a testable, immutable-update pattern. StateProvider stores a raw value without encapsulating transitions — poor for complex list operations.'
          }
        },
        {
          slug: 'navigation-and-routing',
          title: 'Navigation & Routing',
          minutes: 28,
          objectives: [
            'Navigate between screens with Navigator.push and Navigator.pop',
            'Use named routes and route tables for decoupled navigation',
            'Implement deep linking with Router 2.0 and declarative routing'
          ],
          sections: [
            {
              heading: 'Imperative navigation basics',
              body: 'Navigator.push(context, MaterialPageRoute(builder: ...)) adds a route to the stack. Navigator.pop removes the topmost route. pass data via constructor arguments and receive results via Navigator.pop(context, result). This imperative style is simple, direct and suitable for most apps — start here before adopting declarative routing.'
            },
            {
              heading: 'Named routes and route tables',
              body: "Named routes (Navigator.pushNamed(context, '/settings')) decouple the caller from the target widget. Define a route map in MaterialApp.routes so the framework resolves routes by string key. This enables consistent URLs for web and deep linking on mobile. Named routes also simplify testing — assert on route strings, not widget types."
            },
            {
              heading: 'Declarative routing with Router 2.0',
              body: 'Flutter\'s Router/GoRouter package provides declarative, URL-driven routing. Define routes as a hierarchy with parameters, guards and redirects. The router syncs the URL bar (on web) and platform navigation (on mobile) automatically. Deep link URLs map directly to routes, and navigation guards handle authentication redirects — essential for modern apps targeting multiple platforms.'
            }
          ],
          links: [
            {
              title: 'Navigation and routing fundamentals',
              url: 'https://docs.flutter.dev/ui/navigation',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Official navigation and routing overview.'
            },
            {
              title: 'Named routes and parameters',
              url: 'https://docs.flutter.dev/cookbook/navigation/named-routes',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Setting up named routes with parameters.'
            },
            {
              title: 'GoRouter package',
              url: 'https://pub.dev/packages/go_router',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Declarative URL-based routing for Flutter.'
            }
          ],
          quiz: {
            prompt: 'When using Navigator.push, the pushed screen receives data via its constructor. What is the alternative way to return data to the previous screen?',
            options: [
              'Set a global variable before pushing',
              'Pass a result via Navigator.pop(context, result)',
              'Use a callback set on the previous widget',
              'Store it in SharedPreferences'
            ],
            answerIndex: 1,
            explanation: 'Navigator.pop accepts an optional result value that the awaiting push call receives. This is the standard pattern for returning data from a screen without coupling through shared state.'
          }
        }
      ]
    },
    {
      slug: 'data-layer-and-firebase',
      stage: 'Intermediate',
      title: 'Data Layer & Firebase Integration',
      description: 'Networking, local storage and Firebase services that turn a UI into a functional application.',
      topics: [
        {
          slug: 'networking-with-http-and-dio',
          title: 'Networking with http & Dio',
          minutes: 29,
          objectives: [
            'Fetch and parse JSON data using the http package',
            'Configure Dio with interceptors, timeouts and error handling',
            'Implement retry logic and offline-aware networking'
          ],
          sections: [
            {
              heading: 'http: simple and sufficient',
              body: 'The http package gives you a single client for GET, POST, PUT and DELETE. Decode responses with jsonDecode and map them to model classes. Wrap requests in try-catch to handle network errors, and use timeout parameters to avoid hanging on slow connections. For most CRUD apps, http plus a clean model layer is all you need.'
            },
            {
              heading: 'Dio for complex networking',
              body: 'Dio adds interceptors (for auth tokens, logging), request/response transformation, cancellation tokens, and retry strategies. Interceptors chain automatically — a logging interceptor calls next() to pass to the auth interceptor, which passes to the actual request. DioError distinguishes between timeout, server and connection errors, enabling type-specific recovery strategies.'
            },
            {
              heading: 'Offline-aware patterns',
              body: 'Cache-first strategies store responses locally and return cached data while fetching fresh data in the background. A network connectivity listener (connectivity_plus package) triggers sync when the device comes online. These patterns prevent blank screens on slow or absent connections — the most common user complaint in mobile apps.'
            }
          ],
          links: [
            {
              title: 'Fetch data from the internet',
              url: 'https://docs.flutter.dev/data-and-backend/networking',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Official networking tutorial with http.'
            },
            {
              title: 'Dio package',
              url: 'https://pub.dev/packages/dio',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Dio package with interceptors and advanced features.'
            },
            {
              title: 'JSON serialization with code generation',
              url: 'https://dart.dev/tools/json_serializable',
              sourceName: 'Dart Documentation',
              resourceType: 'documentation',
              relationship: 'Using json_serializable for model class code generation.'
            }
          ],
          quiz: {
            prompt: 'What does a Dio interceptor do with the request before sending it?',
            options: [
              'Deletes the request',
              'Transforms, adds headers or cancels the request before it reaches the server',
              'Only logs the request URL',
              'Automatically retries failed requests'
            ],
            answerIndex: 1,
            explanation: 'Interceptors can modify the request (add auth headers), transform it (compress body), or cancel it. They chain together — each interceptor calls next(handler) to pass control to the next interceptor in the chain.'
          }
        },
        {
          slug: 'local-storage',
          title: 'Local Storage Solutions',
          minutes: 27,
          objectives: [
            'Persist key-value data with SharedPreferences and Hive',
            'Store structured data locally with SQLite (sqflite) or Isar',
            'Choose the right storage solution based on data complexity and query needs'
          ],
          sections: [
            {
              heading: 'SharedPreferences for simple settings',
              body: 'SharedPreferences stores key-value pairs (strings, ints, booleans) persistently on disk. Perfect for app settings, first-launch flags and auth tokens. It loads synchronously after the initial async read, and all writes are async. Do not store complex objects — serialize them manually or choose a structured store.'
            },
            {
              heading: 'Hive for structured local storage',
              body: 'Hive is a fast, key-value database with typed boxes and code-generated adapters. It supports nested objects, encryption, and reactive queries via watchBoxEvents. For apps that need to store structured data without SQL complexity, Hive offers the best performance-to-simplicity ratio in the Flutter ecosystem.'
            },
            {
              heading: 'sqflite and Isar for query-heavy data',
              body: 'sqflite wraps SQLite with a Dart-friendly API — write SQL, create tables, run migrations. Ideal when you need complex queries (joins, aggregations, full-text search). Isar provides a modern alternative with automatic indexing, reactive queries, and no SQL knowledge required. Choose Isar for new projects; sqflite when you need raw SQL power.'
            }
          ],
          links: [
            {
              title: 'Persistent data storage',
              url: 'https://docs.flutter.dev/data-and-backend/persistence',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Overview of storage options in Flutter.'
            },
            {
              title: 'Hive package',
              url: 'https://pub.dev/packages/hive',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Fast, lightweight key-value database for Flutter.'
            },
            {
              title: 'sqflite package',
              url: 'https://pub.dev/packages/sqflite',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'SQLite plugin for Flutter with full SQL support.'
            }
          ],
          quiz: {
            prompt: 'A Flutter app needs to store 5000 user-generated notes with full-text search. Which storage is most appropriate?',
            options: [
              'SharedPreferences — it handles any amount of data',
              'Hive — it is the fastest',
              'sqflite or Isar — they support indexed queries and search',
              'A plain JSON file written to disk'
            ],
            answerIndex: 2,
            explanation: 'SharedPreferences is flat key-value and cannot query. Hive is fast but lacks full-text search. sqflite (SQLite FTS) or Isar (built-in indexing) are designed for structured, queryable data.'
          }
        },
        {
          slug: 'firebase-services',
          title: 'Firebase Services for Flutter',
          minutes: 30,
          objectives: [
            'Authenticate users with Firebase Auth (email, Google, Apple)',
            'Store and sync data with Cloud Firestore in real time',
            'Send push notifications with Firebase Cloud Messaging'
          ],
          sections: [
            {
              heading: 'Firebase Auth: multiple providers, one API',
              body: 'Firebase Auth handles email/password, Google Sign-In, Apple Sign-In and anonymous auth through a unified API. On Flutter, flutterfire packages wrap each provider. Auth state streams via authStateChanges() — listen once in your app\'s root widget and conditionally render authenticated vs guest UI. Always validate the ID token server-side before trusting client claims.'
            },
            {
              heading: 'Firestore: real-time, offline-ready database',
              body: 'Cloud Firestore stores data in collections of documents. The onSnapshot() listener pushes updates to all connected clients in real time — no polling. Firestore automatically caches data and syncs when the device reconnects, making it ideal for collaborative and chat features. Structure data for your query patterns — Firestore does not support joins or server-side aggregations beyond basic counts.'
            },
            {
              heading: 'FCM: targeted push notifications',
              body: 'Firebase Cloud Messaging delivers push notifications to specific users or topic subscribers. On Flutter, firebase_messaging handles token registration, permission requests and message handling. Topics enable pub/sub patterns (e.g., subscribe to "sports_updates") without device-level targeting. Background message handlers run in a separate isolate — keep them lightweight and avoid UI access.'
            }
          ],
          links: [
            {
              title: 'FlutterFire overview',
              url: 'https://firebase.google.com/docs/flutter/setup',
              sourceName: 'Firebase Documentation',
              resourceType: 'documentation',
              relationship: 'Official FlutterFire setup guide for all Firebase services.'
            },
            {
              title: 'Firebase Auth for Flutter',
              url: 'https://firebase.google.com/docs/auth/flutter/start',
              sourceName: 'Firebase Documentation',
              resourceType: 'documentation',
              relationship: 'Authentication setup with multiple providers.'
            },
            {
              title: 'Cloud Firestore for Flutter',
              url: 'https://firebase.google.com/docs/firestore/quickstart',
              sourceName: 'Firebase Documentation',
              resourceType: 'documentation',
              relationship: 'Firestore quickstart with real-time listeners.'
            }
          ],
          quiz: {
            prompt: 'Why should you validate Firebase Auth ID tokens on your server rather than trusting client-side auth state?',
            options: [
              'It makes the app faster',
              'Client-side auth state can be manipulated; tokens can be forged or stolen',
              'Firestore requires server-side validation',
              'It is only needed for anonymous auth'
            ],
            answerIndex: 1,
            explanation: 'Client-side state is trivially manipulable. ID tokens should be verified against Firebase\'s public keys on your server before performing sensitive operations — this is the standard security model for any authenticated backend.'
          }
        }
      ]
    },
    {
      slug: 'advanced-patterns-and-release',
      stage: 'Advanced',
      title: 'Advanced Patterns & Release',
      description: 'Platform integration, testing, performance optimization and shipping to production.',
      topics: [
        {
          slug: 'platform-channels-and-plugins',
          title: 'Platform Channels & Plugins',
          minutes: 28,
          objectives: [
            'Call native Android/iOS code from Dart using MethodChannel',
            'Understand when to use platform channels versus pure Flutter packages',
            'Wrap platform-specific SDKs in a clean Dart interface'
          ],
          sections: [
            {
              heading: 'Platform channels bridge Dart and native',
              body: 'MethodChannel sends method calls from Dart to the platform side (Kotlin/Swift). The platform handler receives the method name and arguments, performs native work (camera, sensors, system APIs) and returns a result. MessageChannel and EventChannel handle continuous data streams. This bridge lets Flutter access any platform capability without rewriting it in Dart.'
            },
            {
              heading: 'When to use platform channels',
              body: 'Use platform channels for platform APIs that have no good Flutter/Dart equivalent: native biometric auth, system permissions dialogs, custom native SDKs. Avoid them for simple UI — Flutter renders everything itself. Many platform capabilities already have Flutter packages (camera, geolocator, sensors) that use platform channels internally — prefer these maintained packages over writing your own.'
            },
            {
              heading: 'Clean wrapper pattern',
              body: 'Abstract platform-specific calls behind a Dart interface. A BiometricAuthService abstract class defines sign-in, sign-out and check methods. Two implementations — one for Android (using MethodChannel), one for iOS (using MethodChannel). This pattern makes your business logic platform-agnostic and testable via mocks, hiding native complexity from feature code.'
            }
          ],
          links: [
            {
              title: 'Platform channels overview',
              url: 'https://docs.flutter.dev/platform-integration/platform-channels',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Official platform channels and native interop guide.'
            },
            {
              title: 'Writing a simple Flutter plugin',
              url: 'https://docs.flutter.dev/packages-and-plugins/developing-packages',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'How to create plugins with platform-specific code.'
            },
            {
              title: 'MethodChannel API reference',
              url: 'https://api.flutter.dev/flutter/services/MethodChannel-class.html',
              sourceName: 'Flutter Documentation',
              resourceType: 'reference',
              relationship: 'MethodChannel API details and callback setup.'
            }
          ],
          quiz: {
            prompt: 'A Flutter app needs to access the device\'s native biometric authentication. What is the recommended approach?',
            options: [
              'Rewrite the biometric API entirely in Dart',
              'Use a Flutter plugin that wraps the native API via platform channels',
              'Tell users biometrics are not supported in Flutter',
              'Use a JavaScript bridge to call the native API'
            ],
            answerIndex: 1,
            explanation: 'Maintained Flutter plugins (like local_auth) already use platform channels to wrap native biometric APIs. Wrapping it yourself is unnecessary unless you need custom native behavior not covered by existing plugins.'
          }
        },
        {
          slug: 'testing-flutter-apps',
          title: 'Testing Flutter Applications',
          minutes: 30,
          objectives: [
            'Write unit tests for Dart logic and widget tests for UI components',
            'Use mockito for mocking dependencies and verify interactions',
            'Structure a test suite covering unit, widget and integration layers'
          ],
          sections: [
            {
              heading: 'Three test layers',
              body: 'Unit tests verify Dart functions, services and state management in isolation — fast, focused, cheap. Widget tests render widgets in a test environment and interact with them via pump, pumpWidget and tap/finders — covering rendering, state changes and layout. Integration tests run on real devices via flutter_driver or integration_test, testing full user journeys end-to-end.'
            },
            {
              heading: 'Mocking with mockito',
              body: 'Generate mock classes with @GenerateMocks annotation and build_runner. Use when().thenAnswer() to stub async calls, verifyNever() to assert methods were not called, and verifyInOrder() to check call sequences. Mock at the boundary — do not mock your own classes, only external dependencies (APIs, platform channels, storage).'
            },
            {
              heading: 'Widget test interaction',
              body: 'tester.pumpWidget renders the widget tree. finder.text, finder.byType and finder.byKey locate elements. tester.tap simulates user input, tester.enterText fills fields. After each interaction, pump again to trigger rebuilds. assert with expect comparing actual widget state to expected values. These tests run in seconds without a device, making them ideal for CI.'
            }
          ],
          links: [
            {
              title: 'Testing Flutter apps',
              url: 'https://docs.flutter.dev/testing',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Official testing overview and strategy guide.'
            },
            {
              title: 'Widget tests in Flutter',
              url: 'https://docs.flutter.dev/testing/widget-tests',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'How to write and run widget tests.'
            },
            {
              title: 'mockito package',
              url: 'https://pub.dev/packages/mockito',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Mock generation for Dart test doubles.'
            }
          ],
          quiz: {
            prompt: 'A widget test calls tester.tap and then asserts on a Text widget. Why must pump() be called after the tap?',
            options: [
              'To dismiss the keyboard',
              'To trigger a rebuild so the widget tree reflects the tap interaction',
              'To wait for the tap animation to complete',
              'It is not required — assertions work immediately'
            ],
            answerIndex: 1,
            explanation: 'pump() advances the widget lifecycle, triggering rebuilds in response to state changes from the tap. Without it, assertions run against the pre-tap widget tree and fail.'
          }
        },
        {
          slug: 'performance-and-release',
          title: 'Performance Profiling & App Release',
          minutes: 29,
          objectives: [
            'Profile Flutter apps using DevTools timeline and performance overlay',
            'Optimize widget rebuilds, image caching and shader compilation',
            'Configure Android and iOS release builds and app store deployment'
          ],
          sections: [
            {
              heading: 'Flutter DevTools for performance',
              body: 'Flutter DevTools shows the frame timeline — each frame must render in under 16ms for 60fps. Green frames are smooth; red and yellow exceed the budget. The widget inspector highlights which widgets rebuilt and why. Use const constructors to prevent unnecessary rebuilds. Profile in release mode — debug mode adds assertion overhead and disables optimizations that change timing characteristics.'
            },
            {
              heading: 'Rebuild optimization',
              body: 'const constructors skip rebuilds entirely when inputs do not change — make every possible widget const. Split large widgets into smaller ones so setState only rebuilds the affected subtree. Use RepaintBoundary to isolate expensive paint operations. Image caching with cached_network_image avoids re-downloading and re-decoding network images across rebuilds.'
            },
            {
              heading: 'Release builds and store deployment',
              body: 'flutter build apk --release for Android, flutter build ios --release for iOS. App size analysis with flutter build appbundle reveals heavy assets and unused code. Android requires keystore signing for release builds; iOS requires provisioning profiles and certificates. Automated CI/CD with Codemagic or GitHub Actions runs builds on every merge and publishes to internal tracks for testing.'
            }
          ],
          links: [
            {
              title: 'Performance optimization',
              url: 'https://docs.flutter.dev/perf',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Official performance profiling and optimization guide.'
            },
            {
              title: 'Use the performance overlay',
              url: 'https://docs.flutter.dev/perf/rendering-performance',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Reading the DevTools timeline and performance overlay.'
            },
            {
              title: 'Build and release an Android app',
              url: 'https://docs.flutter.dev/deployment/android',
              sourceName: 'Flutter Documentation',
              resourceType: 'documentation',
              relationship: 'Android release build configuration and Play Store deployment.'
            }
          ],
          quiz: {
            prompt: 'A Flutter app shows yellow frames in the DevTools timeline. What does this indicate?',
            options: [
              'The app crashed',
              'Frames exceeded the 16ms budget — the UI thread was too slow',
              'Memory is being exhausted',
              'The GPU cannot keep up with paint commands'
            ],
            answerIndex: 1,
            explanation: 'Yellow frames in the Flutter timeline indicate the UI thread (widget build, layout, paint) exceeded the 16ms per-frame budget, causing visible jank. Profiling reveals which widgets or operations are the bottleneck.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Flutter Cross-Platform Task Manager Specification',
    coverage: [
      'Dart & Widget Architecture',
      'State Management',
      'Navigation',
      'Networking & Firebase',
      'Platform Integration',
      'Testing Strategy'
    ],
    brief:
      'Design and specify (build-ready) a cross-platform task manager application in Flutter. The app supports user authentication via Firebase Auth, stores tasks in Firestore with real-time syncing, includes local caching for offline use, and handles push notifications when tasks are assigned. The app must work on Android, iOS and web with adaptive layouts.',
    requirements: [
      'Project structure with clear separation: models, services, state, screens, widgets',
      'Firebase Auth integration flow: sign up, sign in, password reset, sign out',
      'Firestore data model with collections, document structure and security rules',
      'State management solution with provider/riverpod integration for task list and auth state',
      'Navigation structure with named routes, deep link support and auth guards',
      'Offline caching strategy for task data with conflict resolution on reconnect',
      'Adaptive layout strategy for phone, tablet and web form factors'
    ],
    expectedOutput:
      'A complete technical specification a Flutter developer could implement without follow-up questions.',
    rubric: [
      { skill: 'Dart & Widget Architecture', weight: 20, criteria: 'Clean widget decomposition, const usage, single-responsibility components' },
      { skill: 'State Management', weight: 25, criteria: 'Correct provider/riverpod setup, separation of local vs shared state, reactive data flow' },
      { skill: 'Firebase Integration', weight: 20, criteria: 'Secure auth flow, correct Firestore data modeling, real-time listeners, FCM setup' },
      { skill: 'Navigation', weight: 15, criteria: 'Typed routes, deep link readiness, auth guard redirects' },
      { skill: 'Architecture & Testing', weight: 20, criteria: 'Clean separation of concerns, testable service abstractions, mockable boundaries' }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'Flutter Widget Cookbook',
      stage: 'Beginner',
      objective: 'Build a catalog of 8 commonly-used Flutter widgets with documentation, variants and interactive examples.',
      requirements: [
        'Implementation of Container, Card, ListView, GridView, Stack, AppBar, BottomNavigationBar and Drawer',
        'Each widget demonstrates at least two layout variants',
        'Responsive adaptation using LayoutBuilder for each widget',
        'Unit tests verifying each widget renders correctly under different constraints',
        'A demo screen where users can toggle between variants'
      ],
      skillsEvaluated: ['Flutter Widgets', 'Layouts', 'Responsive Design', 'Widget Testing'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the Flutter project with all widget implementations and test coverage.',
        textLabel: 'Widget cookbook walkthrough',
        minTextLength: 1000
      }
    },
    {
      title: 'Firebase Auth & Firestore Integration',
      stage: 'Intermediate',
      objective: 'Implement a complete Firebase-powered data layer: user authentication, Firestore CRUD, offline caching and push notifications.',
      requirements: [
        'Firebase Auth with email/password and Google Sign-In',
        'Firestore CRUD operations with real-time onSnapshot listeners',
        'Offline persistence enabled with a strategy for conflict resolution on reconnect',
        'FCM push notification registration and handling in background/foreground',
        'Unit tests mocking Firebase services to verify each flow'
      ],
      skillsEvaluated: ['Firebase', 'Networking', 'Offline Caching', 'Testing'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the Flutter project with Firebase integration and test suite.',
        textLabel: 'Firebase integration report',
        minTextLength: 1200,
        linkLabels: ['Firebase project configuration screenshot']
      }
    },
    {
      title: 'Cross-Platform Adaptive App Release',
      stage: 'Advanced',
      objective: 'Plan the release of a Flutter app targeting Android, iOS and web with performance budgets and CI/CD pipeline.',
      requirements: [
        'Release build configuration for each platform with signing and provisioning',
        'App size budget and analysis for each target platform',
        'Performance profiling report with frame timing measurements',
        'CI/CD pipeline specification (Codemagic or GitHub Actions) with test gates',
        'Staged rollout plan for Android with rollback procedure',
        'Store listing optimization: screenshots, descriptions and keyword strategy'
      ],
      skillsEvaluated: ['App Publishing', 'Performance', 'CI/CD', 'Cross-Platform Development'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the complete release plan with profiling evidence and pipeline configuration.',
        textLabel: 'Release plan document',
        minTextLength: 1100,
        linkLabels: ['Profiling screenshots or pipeline config']
      }
    }
  ],

  simTasks: [
    {
      title: 'P0: App crashes on startup after Flutter upgrade',
      context: 'After upgrading Flutter from 3.19 to 3.22, the release build crashes immediately on both Android and iOS. Debug mode works fine. Crashlytics is not initialized so no reports are arriving. The crash log shows a Null check operator error in the rendering engine.',
      requirements: [
        'List top 3 crash hypotheses ranked by likelihood given the upgrade context',
        'Specify the immediate fix or rollback steps',
        'Describe verification steps before re-deploying to production',
        'Draft a communication to stakeholders about the timeline'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Incident note: cause diagnosis, chosen mitigation, re-deploy checklist.',
      skills: ['Debugging', 'Flutter Release Builds', 'CI/CD']
    },
    {
      title: 'Firestore sync conflicts causing data loss',
      context: 'Users on slow connections report that edits to shared documents sometimes disappear. Investigation shows the onSnapshot listener is replacing local state before the user\'s write completes, overwriting their changes. The conflict window is approximately 2 seconds on 3G connections.',
      requirements: [
        'Analyze the write-then-listen race condition in the current architecture',
        'Propose an optimistic update strategy that prevents overwrites',
        'Design a conflict resolution mechanism for concurrent edits',
        'Specify the UX for indicating sync status to the user'
      ],
      priority: 'high',
      dueDayOffset: 4,
      expectedOutput: 'Architecture fix document with sync state diagram and conflict resolution rules.',
      skills: ['Firebase', 'Offline Caching', 'State Management']
    },
    {
      title: 'App Store rejection due to privacy manifest',
      context: 'Apple rejects the latest build with ITMS-90713: Missing required reason API usage. The app uses UserDefaults through a third-party analytics package. The team has 5 days to fix and resubmit before the deadline.',
      requirements: [
        'Identify the affected APIs and third-party packages causing the rejection',
        'Specify the fix: update the package, add a privacy manifest entry, or remove the dependency',
        'Document the Apple-required reason for each privacy manifest declaration',
        'Outline regression testing to ensure the fix does not break analytics functionality'
      ],
      priority: 'normal',
      dueDayOffset: 5,
      expectedOutput: 'Fix specification with privacy manifest entries and App Store resubmission checklist.',
      skills: ['iOS Privacy', 'App Store Guidelines', 'Dependency Management']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Zara Patel',
      personaRole: 'iOS Developer',
      situation: 'Cross-platform feature parity discussion.',
      openingMessage:
        'We\'re aligning the profile screen implementation. The iOS team is building it in SwiftUI. Can you share your Flutter widget decomposition and state management approach so we can match behavior across platforms? I want to avoid divergent UX.',
      expectedPoints: [
        'Shares composable widget decomposition and state strategy openly',
        'Identifies areas where platform differences (haptics, gestures) are expected and justified',
        'Proposes shared data model contract to keep behavior aligned',
        'Agrees on a follow-up sync for API shape and edge case alignment'
      ]
    },
    {
      kind: 'team',
      personaName: 'Daniel Okafor',
      personaRole: 'QA Engineer',
      situation: 'Performance regression found on older Android devices.',
      openingMessage:
        'Users on Android 10 devices (Galaxy A12) report severe jank when scrolling the task list. The frame timeline shows yellow frames on our Pixel 6 test devices too, but it\'s much worse on lower-end hardware. Can we investigate together?',
      expectedPoints: [
        'Engages collaboratively on reproduction steps and profiling approach',
        'Checks for common Flutter performance pitfalls (unbounded lists, unnecessary rebuilds)',
        'Proposes a fix strategy targeting the worst-performing widget subtree',
        'Documents the device-specific performance budget for future reference'
      ]
    },
    {
      kind: 'client',
      personaName: 'Nina Vasquez',
      personaRole: 'Product Manager, HealthTrack',
      situation: 'Feature request with platform-specific privacy rules.',
      openingMessage:
        'We want to access the user\'s health data (steps, heart rate) for the dashboard. Legal says it\'s fine with consent. How quickly can we add health data and what are the App Store and Play Store implications?',
      expectedPoints: [
        'Flags the stricter review process for health data on both stores',
        'Explains the permission request flow and user-consent UX requirements',
        'Offers phased approach: health connect API on Android, HealthKit on iOS with a shared interface',
        'Documents privacy policy requirements before proceeding'
      ]
    },
    {
      kind: 'client',
      personaName: 'Tom Brennan',
      personaRole: 'CTO, ShopLocal',
      situation: 'Client concerned about maintaining separate native and Flutter codebases.',
      openingMessage:
        'We have an existing native Android app and a SwiftUI iOS app. We want to consolidate into Flutter but are worried about the migration cost and risk. What does a realistic migration plan look like?',
      expectedPoints: [
        'Assesses which screens are best candidates for first migration (low-risk, high-visibility)',
        'Explains platform channel integration to reuse existing native code during transition',
        'Proposes a hybrid strategy: new features in Flutter, existing screens migrated incrementally',
        'Provides a realistic timeline with risk mitigation at each phase'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Incident',
      situation:
        'Friday 15:30: App Store Connect shows a 40% crash rate spike on the latest iOS release. The crash trace points to a platform channel Null check operator error affecting the payment flow. Android is unaffected. The CEO is in a board meeting until 17:00.',
      requiredActions: [
        {
          action: 'Halt the iOS release by rejecting the binary in App Store Connect or submitting a hotfix',
          good: true,
          note: 'Stop the bleeding immediately on the affected platform before investigating.'
        },
        {
          action: 'Check the platform channel call site for the null check operator and identify the breaking iOS API change',
          good: true,
          note: 'Systematic diagnosis against the crash trace prevents patching the wrong thing.'
        },
        {
          action: 'Roll back to the previous stable iOS build by resubmitting the last known good version',
          good: true,
          note: 'Restore stability for users while root cause investigation continues.'
        },
        {
          action: 'Wait for the CEO to return from the board meeting before taking action',
          good: false,
          note: 'Crisis response should not be gated on executive availability — act first, communicate after.'
        }
      ]
    },
    {
      category: 'Process improvement',
      situation:
        'Four of the last six releases introduced regressions caught only in QA, not during development. The team lacks consistent pre-merge testing and has no automated integration tests for critical user journeys.',
      requiredActions: [
        {
          action: 'Propose a mandatory PR checklist: unit tests pass, lint clean, widget tests verified locally',
          good: true,
          note: 'Process gates reduce regression surface before QA even runs.'
        },
        {
          action: 'Blame individual developers for missing bugs in standup',
          good: false,
          note: 'Public blame kills psychological safety; systemic fixes prevent recurrence.'
        },
        {
          action: 'Set up a CI gate that blocks merge on red checks and runs integration tests on critical paths',
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
      prompt: 'Explain how Flutter renders a frame. What happens from setState to pixels on screen?',
      guidancePoints: [
        'setState marks element as dirty, triggering a rebuild',
        'Build phase: widget tree is traversed, elements created/reused',
        'Layout phase: constraints passed down, sizes calculated bottom-up',
        'Paint and compositing: layers rasterized to GPU and displayed'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'What is the difference between a StatelessWidget and a StatefulWidget, and when would you choose each?',
      guidancePoints: [
        'StatelessWidget: immutable config, no internal state, purely declarative',
        'StatefulWidget: mutable state via a State object that survives rebuilds',
        'Choose StatelessWidget for display-only components and derived values',
        'Choose StatefulWidget only when state changes over time within the widget\'s own lifecycle'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A Flutter list of 1000 items stutters when scrolling fast. Profile and fix it.',
      guidancePoints: [
        'Check if ListView.builder is used (lazy) vs ListView (eagerly builds all)',
        'Profile with DevTools: which widgets rebuild on scroll and why',
        'Use const constructors to prevent unnecessary rebuilds',
        'Consider caching image thumbnails and separating expensive widgets with RepaintBoundary'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Design an offline-first sync strategy for a collaborative note-taking app in Flutter.',
      guidancePoints: [
        'Local database (Isar or sqflite) as source of truth for all writes',
        'Timestamp-based conflict resolution with last-write-wins or merge strategy',
        'Connectivity listener to trigger sync when device reconnects',
        'Pending-changes queue for operations created while offline'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'A product manager asks you to build a feature using a deprecated Flutter package. Push back or comply?',
      guidancePoints: [
        'Check the deprecation reason — security risk vs simply superseded',
        'Assess migration cost to the recommended alternative',
        'Explain long-term maintenance and compatibility risks of deprecated packages',
        'Offer to prototype the migration to demonstrate the effort is reasonable'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'When would you choose platform channels over a pure Dart implementation?',
      guidancePoints: [
        'Platform channels are necessary when native SDKs (biometrics, payments, sensors) have no Dart equivalent',
        'Avoid them for features achievable with existing Flutter plugins or pure Dart',
        'Maintenance cost of platform code is higher — each platform needs separate implementation',
        'Consider the trade-off: platform power vs cross-platform simplicity and testing burden'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain why the Flutter app needs the CAMERA permission to a non-technical stakeholder who is concerned about privacy.',
      guidancePoints: [
        'State exactly when and where the permission is triggered in the user journey',
        'Explain the user controls: denied permission means the feature gracefully degrades',
        'No background camera access — only when the user explicitly opens the feature',
        'Reference the app store data safety declaration for transparency'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Your code review feedback on a teammate\'s Compose/Flutter widget code was perceived as harsh. How do you handle it?',
      guidancePoints: [
        'Acknowledge the perception without being defensive',
        'Reframe feedback as questions or suggestions rather than directives',
        'Separate must-fix (correctness, accessibility) from style preferences',
        'Propose a team-wide style convention (flutter_lints, effective_dart) to depersonalize style feedback'
      ]
    }

  ]

}
