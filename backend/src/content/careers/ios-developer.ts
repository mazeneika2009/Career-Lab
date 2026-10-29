import type { CareerDef } from '../framework.js'

export const iosDeveloper: CareerDef = {
  slug: 'ios-developer',
  name: 'iOS Developer',
  category: 'Development',
  order: 10,
  description:
    'Builds iOS applications in Swift and SwiftUI following Apple platform conventions from first view to App Store.',
  difficulty: 'Intermediate',
  pathSummary:
    'Swift language fundamentals & project structure → SwiftUI views, layout & theming → Navigation, state management & data flow → Networking with URLSession & Codable → persistence with Core Data & SwiftData → accessibility & Apple HIG → testing with XCTest & UI Testing → App Store submission & distribution.',
  mainSkills: [
    'Swift',
    'SwiftUI',
    'UIKit Interop',
    'Concurrency (async/await)',
    'Core Data & SwiftData',
    'URLSession Networking',
    'XCTest & UI Testing',
    'App Store Distribution'
  ],
  sourcePlatforms: [
    'Apple Developer Documentation',
    'Swift.org',
    'SwiftUI Documentation',
    'Apple Human Interface Guidelines'
  ],
  companyName: 'Canopy Digital',
  roleTitle: 'iOS Developer',

  chapters: [
    {
      slug: 'swift-and-project-core',
      stage: 'Beginner',
      title: 'Swift & iOS Project Core',
      description: 'The language and platform fundamentals every iOS app is built on.',
      topics: [
        {
          slug: 'swift-essentials',
          title: 'Swift Language Essentials',
          minutes: 28,
          objectives: [
            'Write idiomatic Swift with optionals, closures and value types',
            'Use enums, structs and protocol-oriented patterns effectively',
            'Apply Swift concurrency basics: async/await and structured concurrency'
          ],
          sections: [
            {
              heading: 'Optionals and type safety',
              body: 'Swift\'s Optional type encodes the possibility of absence at compile time. The ?, !, ?? and if-let/guard-let idioms eliminate null-pointer crashes — the most common class of mobile bug. Every variable is non-optional by default, forcing you to handle absence explicitly when it arises.'
            },
            {
              heading: 'Structs and protocols over classes',
              body: 'Swift favors value semantics: structs are copied on assignment, avoiding shared-reference bugs. Protocols define capability contracts; protocol extensions provide default implementations. This protocol-oriented approach reduces class hierarchies and makes code composable and testable.'
            },
            {
              heading: 'Async/await concurrency',
              body: 'Swift 5.5 introduced structured concurrency: async functions read linearly, Task and TaskGroup manage parallel work, and actors provide data-race safety for mutable shared state. Replacing callback pyramids with async/await makes asynchronous code auditable and maintainable.'
            }
          ],
          links: [
            {
              title: 'Swift Programming Language',
              url: 'https://www.swift.org/documentation/',
              sourceName: 'Swift.org',
              resourceType: 'documentation',
              relationship: 'Official Swift language guide and reference.'
            },
            {
              title: 'A Tour of Swift',
              url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/guidedtour/',
              sourceName: 'Swift.org',
              resourceType: 'tutorial',
              relationship: 'Interactive introduction to Swift syntax and patterns.'
            },
            {
              title: 'Concurrency',
              url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency',
              sourceName: 'Swift.org',
              resourceType: 'documentation',
              relationship: 'async/await, actors and structured concurrency reference.'
            }
          ],
          quiz: {
            prompt: 'What is the primary benefit of using a struct over a class for a model type in Swift?',
            options: [
              'Structs are faster to compile',
              'Structs use value semantics, preventing shared-reference mutations',
              'Structs can conform to protocols and classes cannot',
              'Structs are automatically thread-safe'
            ],
            answerIndex: 1,
            explanation: 'Value semantics mean each assignment creates an independent copy, eliminating accidental shared-state mutations that plague reference types.'
          }
        },
        {
          slug: 'xcode-project-structure',
          title: 'Xcode Project Structure & Lifecycle',
          minutes: 27,
          objectives: [
            'Navigate a standard Xcode project and its key files',
            'Understand the iOS app lifecycle and scene phases',
            'Configure build settings, signing and targets'
          ],
          sections: [
            {
              heading: 'Project anatomy',
              body: 'An Xcode project contains an .xcodeproj (or .xcworkspace for SPM/CocoaPods), source groups, asset catalogs, Info.plist and build settings per target. Source folders map to modules; Info.plist declares URL schemes, permissions and scene configuration. Understanding this layout prevents common build and signing failures.'
            },
            {
              heading: 'App lifecycle and scene phases',
              body: 'UIKit-driven apps transition through scene phases: disconnected → foreground inactive → foreground active → background → suspended. SwiftUI uses @main App struct and scenePhase environment. Life-cycle callbacks like application(_:didFinishLaunchingWithOptions:) handle early setup; scenePhase changes drive UI state updates.'
            },
            {
              heading: 'Signing and build configuration',
              body: 'Xcode manages signing identities and provisioning profiles through automatic or manual configuration. Build configurations (Debug/Release) control optimization levels, preprocessor macros and strip settings. Entitlements files grant capabilities like push notifications, Keychain sharing and HealthKit access.'
            }
          ],
          links: [
            {
              title: 'About Xcode projects',
              url: 'https://developer.apple.com/documentation/xcode/about-xcode-projects',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'documentation',
              relationship: 'Official Xcode project structure reference.'
            },
            {
              title: 'Managing app capabilities',
              url: 'https://developer.apple.com/documentation/xcode/managing-capabilities',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'documentation',
              relationship: 'How to enable and configure app capabilities.'
            },
            {
              title: 'App lifecycle',
              url: 'https://developer.apple.com/documentation/uikit/app-and-scenes/lifecycle',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'documentation',
              relationship: 'UIKit app lifecycle and scene phase reference.'
            }
          ],
          quiz: {
            prompt: 'In a SwiftUI app, where does the @main entry point declare its scenes?',
            options: [
              'In the AppDelegate',
              'In an App-conforming struct using @SceneBuilder',
              'In the Info.plist directly',
              'In a UIKit lifecycle delegate'
            ],
            answerIndex: 1,
            explanation: 'SwiftUI uses a struct conforming to the App protocol as the entry point, with @SceneBuilder defining WindowGroup and other scene types.'
          }
        },
        {
          slug: 'swift-error-handling',
          title: 'Error Handling & Resources',
          minutes: 26,
          objectives: [
            'Throw, catch and propagate errors with Swift\'s error protocol',
            'Use Result types and do-catch blocks effectively',
            'Manage resources safely with defer and RAII patterns'
          ],
          sections: [
            {
              heading: 'Throwing and catching errors',
              body: 'Swift errors are values conforming to the Error protocol. Functions declare throws to indicate failure; callers use do-catch or try?/try! to handle results. Typed throws (Swift 6) narrow the error set at the function signature level, making failure modes explicit at call sites.'
            },
            {
              heading: 'Result and optional patterns',
              body: 'Result<Success, Failure> represents a value that may have succeeded or failed, modeling operations like network calls without exceptions. map and flatMap chain transformations. try? converts throwing expressions into optionals; try! asserts non-failure — useful only when failure is truly impossible.'
            },
            {
              heading: 'Resource management with defer',
              body: 'defer executes a block when leaving scope, regardless of how the scope exits. This guarantees cleanup of file handles, locks and temporary state even when errors occur. Combined with RAII-style resource acquisition in init, defer prevents resource leaks in complex multi-step operations.'
            }
          ],
          links: [
            {
              title: 'Error Handling',
              url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/errorhandling',
              sourceName: 'Swift.org',
              resourceType: 'documentation',
              relationship: 'Swift error handling guide and patterns.'
            },
            {
              title: 'Result type',
              url: 'https://developer.apple.com/documentation/swift/result',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'reference',
              relationship: 'Result enum API reference and usage.'
            },
            {
              title: 'Defer statement',
              url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/statements/#Defer-Statement',
              sourceName: 'Swift.org',
              resourceType: 'reference',
              relationship: 'Defer statement semantics and examples.'
            }
          ],
          quiz: {
            prompt: 'What happens when a guard let else branch contains a return statement?',
            options: [
              'It causes a compiler warning',
              'The defer block in the enclosing scope still executes before returning',
              'The defer block is skipped',
              'The else branch cannot contain a return'
            ],
            answerIndex: 1,
            explanation: 'Defer blocks execute when leaving their enclosing scope — including early returns triggered by guard-let else branches — guaranteeing cleanup.'
          }
        }
      ]
    },
    {
      slug: 'swiftui-layout-state',
      stage: 'Foundation',
      title: 'SwiftUI Layout & State',
      description: 'Building declarative interfaces and managing data flow in SwiftUI.',
      topics: [
        {
          slug: 'swiftui-view-fundamentals',
          title: 'SwiftUI Views & Layout System',
          minutes: 29,
          objectives: [
            'Compose views using VStack, HStack, ZStack and their modifiers',
            'Understand the SwiftUI layout negotiation: propose, decide, place',
            'Apply custom modifiers and ViewModifier for reusable styling'
          ],
          sections: [
            {
              heading: 'Layout negotiation',
              body: 'SwiftUI layout is a three-step negotiation: the parent proposes a size, the child decides its ideal size within that proposal, and the parent places it. frame, padding and fixedSize override this negotiation. Understanding this flow prevents the frustrating "layout ambiguity" warnings that plague SwiftUI newcomers.'
            },
            {
              heading: 'Stack and container views',
              body: 'VStack and HStack arrange children along vertical and horizontal axes; ZStack layers them in depth. .padding(), .frame() and .background() modify layout boundaries. GeometryReader lets a child adapt to the available space — use sparingly as it disables automatic layout optimization.'
            },
            {
              heading: 'Custom ViewModifiers',
              body: 'ViewModifier encapsulates a reusable set of view modifications into a single, testable unit. Apply with .modifier(MyModifier()) or as a .myStyle() extension. This replaces copy-paste modifier chains and enables consistent theming across screens without subclassing.'
            }
          ],
          links: [
            {
              title: 'Building layouts with SwiftUI',
              url: 'https://developer.apple.com/tutorials/swiftui/building-layouts',
              sourceName: 'SwiftUI Documentation',
              resourceType: 'tutorial',
              relationship: 'Hands-on layout tutorial from Apple.'
            },
            {
              title: 'View layout process',
              url: 'https://developer.apple.com/documentation/swiftui/view-layout-geometry',
              sourceName: 'SwiftUI Documentation',
              resourceType: 'documentation',
              relationship: 'How SwiftUI proposes, decides and places views.'
            },
            {
              title: 'ViewModifier protocol',
              url: 'https://developer.apple.com/documentation/swiftui/viewmodifier',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'reference',
              relationship: 'ViewModifier API reference.'
            }
          ],
          quiz: {
            prompt: 'When a parent proposes a size of 300×100 to a Text view, what does Text decide?',
            options: [
              'It always fills the full 300×100 area',
              'It returns its natural intrinsic content size, ignoring the proposal',
              'It uses the width but ignores height',
              'It crashes because Text cannot accept size proposals'
            ],
            answerIndex: 1,
            explanation: 'Text uses its natural intrinsic content size as the decided size, regardless of the proposed dimensions — the parent then places it within those bounds.'
          }
        },
        {
          slug: 'state-management',
          title: 'State, Binding & Data Flow',
          minutes: 30,
          objectives: [
            'Use @State, @Binding, @ObservedObject and @StateObject correctly',
            'Manage data flow with ObservableObject and @Published',
            'Apply @Environment for implicit dependency injection'
          ],
          sections: [
            {
              heading: 'Ownership and property wrappers',
              body: '@State owns simple value-type state inside a view; @Binding provides a two-way reference to state owned elsewhere. @StateObject creates and owns an ObservableObject; @ObservedObject references one without owning it. Misusing these wrappers causes state loss on view recreation or unnecessary re-renders.'
            },
            {
              heading: 'ObservableObject and @Published',
              body: 'ObservableObject is a class-based reference type that publishes changes via Combine. @Published marks individual properties that trigger objectWillChange notifications. With iOS 17\'s @Observable macro, you can replace the boilerplate with a simpler observation model — but understanding the underlying Combine flow prevents subtle bugs.'
            },
            {
              heading: 'Environment and environment objects',
              body: '@Environment reads system-provided values (colorScheme, locale, horizontalSizeClass) and custom values injected via environmentObject(). This decouples views from their data source, making previews and tests straightforward. Always provide required environment objects in previews to avoid runtime crashes.'
            }
          ],
          links: [
            {
              title: 'Managing state',
              url: 'https://developer.apple.com/tutorials/swiftui/managing-state',
              sourceName: 'SwiftUI Documentation',
              resourceType: 'tutorial',
              relationship: 'Official state management tutorial.'
            },
            {
              title: 'SwiftUI data flow',
              url: 'https://developer.apple.com/documentation/swiftui/managing-model-data-in-your-app',
              sourceName: 'SwiftUI Documentation',
              resourceType: 'documentation',
              relationship: 'Data flow guide: @State through @Environment.'
            },
            {
              title: 'ObservableObject protocol',
              url: 'https://developer.apple.com/documentation/combine/observableobject',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'reference',
              relationship: 'ObservableObject and Combine integration reference.'
            }
          ],
          quiz: {
            prompt: 'What is the key difference between @StateObject and @ObservedObject?',
            options: [
              '@StateObject is for classes, @ObservedObject for structs',
              '@StateObject creates and owns the object; @ObservedObject references one owned elsewhere',
              '@StateObject publishes changes, @ObservedObject does not',
              'There is no practical difference'
            ],
            answerIndex: 1,
            explanation: '@StateObject ensures the ObservableObject is created once and survives view re-creation; @ObservedObject does not own the object and can cause duplicate instances if misused.'
          }
        },
        {
          slug: 'navigation-routes',
          title: 'Navigation & Routing',
          minutes: 28,
          objectives: [
            'Navigate between views using NavigationStack and NavigationLink',
            'Implement value-based navigation with NavigationPath and Codable routes',
            'Handle sheet presentation and full-screen covers idiomatically'
          ],
          sections: [
            {
              heading: 'NavigationStack',
              body: 'NavigationStack replaces the deprecated NavigationView with a type-safe path-driven model. NavigationPath stores a stack of Codable values; each value maps to a destination view via .navigationDestination(for:). This decouples the navigation model from view construction, enabling deep-link and state-restoration scenarios.'
            },
            {
              heading: 'NavigationLink and programmatic push',
              body: 'NavigationLink can bind to a path or trigger on value selection. Programmatic navigation uses path.append(value) or path.removeLast().isActive binding is available for conditional presentation. Avoid embedding NavigationLink in List rows for complex flows — programmatic control is more predictable.'
            },
            {
              heading: 'Sheets and modal presentation',
              body: '.sheet presents a modal view over the current context; .fullScreenCover fills the entire screen. Both accept isPresented binding or item binding for data-driven presentation. Sheet detents (.medium, .large, .fraction) allow partial-height sheets — a common iOS pattern for secondary content.'
            }
          ],
          links: [
            {
              title: 'NavigationStack',
              url: 'https://developer.apple.com/documentation/swiftui/navigationstack',
              sourceName: 'SwiftUI Documentation',
              resourceType: 'documentation',
              relationship: 'NavigationStack API reference.'
            },
            {
              title: 'Navigation in SwiftUI',
              url: 'https://developer.apple.com/tutorials/swiftui/working-with-rows',
              sourceName: 'SwiftUI Documentation',
              resourceType: 'tutorial',
              relationship: 'Navigation patterns tutorial from Apple.'
            },
            {
              title: 'Presenting data with sheets',
              url: 'https://developer.apple.com/documentation/swiftui/sheet',
              sourceName: 'SwiftUI Documentation',
              resourceType: 'reference',
              relationship: 'Sheet modifier API reference and detent configuration.'
            }
          ],
          quiz: {
            prompt: 'In a NavigationStack, what is the benefit of using a Codable value as the navigation path element?',
            options: [
              'It compiles faster than string routes',
              'It enables type-safe routing and automatic deep-link decoding',
              'It prevents navigation entirely',
              'It removes the need for NavigationPath'
            ],
            answerIndex: 1,
            explanation: 'Codable route types let you serialize/deserialize navigation state for deep links and state restoration while catching invalid routes at compile time.'
          }
        }
      ]
    },
    {
      slug: 'networking-persistence',
      stage: 'Intermediate',
      title: 'Networking, Data & Persistence',
      description: 'Fetching remote data, decoding it and storing it locally.',
      topics: [
        {
          slug: 'urlsession-networking',
          title: 'URLSession & Async Networking',
          minutes: 29,
          objectives: [
            'Fetch data from REST APIs using async/await URLSession',
            'Decode JSON responses with Codable and custom keys',
            'Handle network errors, timeouts and retry logic'
          ],
          sections: [
            {
              heading: 'URLSession with async/await',
              body: 'URLSession has native async support: let (data, response) = try await session.data(for: request). The async API eliminates delegate boilerplate for simple fetches. Combine with Task and TaskGroup for parallel requests, or use async sequences with URLSession.bytes(for:) for streaming responses.'
            },
            {
              heading: 'Codable and JSON decoding',
              body: 'JSONDecoder with snake_case keyDecodingStrategy and dateDecodingStrategy handles most API shapes. Custom CodingKeys map non-standard keys. Nested models decode via nested keyed containers. For inconsistent APIs, write init(from decoder:) to handle missing or variant fields gracefully.'
            },
            {
              heading: 'Error handling and resilience',
              body: 'Network calls fail for transport (no connection, DNS) and HTTP reasons (4xx, 5xx). Check HTTPURLResponse.statusCode; model errors as typed enums. Retry failed requests with exponential backoff using a simple loop or AsyncRetry library. Cache responses with URLSession\'s built-in caching or a custom URLCache.'
            }
          ],
          links: [
            {
              title: 'URLSession',
              url: 'https://developer.apple.com/documentation/foundation/urlsession',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'documentation',
              relationship: 'URLSession API reference and async methods.'
            },
            {
              title: 'Using JSON with Swift',
              url: 'https://developer.apple.com/documentation/foundation/jsondecoder',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'guide',
              relationship: 'JSONDecoder configuration and Codable patterns.'
            },
            {
              title: 'URLSession documentation',
              url: 'https://developer.apple.com/documentation/foundation/urlsession',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'documentation',
              relationship: 'URLSession task creation and configuration.'
            }
          ],
          quiz: {
            prompt: 'What does URLSession.bytes(for:) return that data(for:) does not?',
            options: [
              'A decoded Codable object',
              'An AsyncSequence of Data chunks for streaming',
              'A cached response from disk',
              'A Combine publisher'
            ],
            answerIndex: 1,
            explanation: 'bytes(for:) returns an AsyncBytes async sequence, enabling incremental processing of large responses without loading the full payload into memory.'
          }
        },
        {
          slug: 'core-data-persistence',
          title: 'Core Data & SwiftData Persistence',
          minutes: 30,
          objectives: [
            'Define data models with Core Data and persistent containers',
            'Use SwiftData\'s @Model for simpler persistence',
            'Implement fetch requests, predicates and sorting'
          ],
          sections: [
            {
              heading: 'Core Data fundamentals',
              body: 'Core Data is Apple\'s persistence framework: NSManagedObjectModel defines entities and attributes, NSPersistentContainer manages the stack, and NSManagedObjectContext tracks changes. .xcdatamodeld files define your schema visually or in code. Managed objects are reference types tied to a context — always access them on the correct thread.'
            },
            {
              heading: 'SwiftData simplification',
              body: 'SwiftData (iOS 17+) replaces Core Data boilerplate with @Model macro: define a class, annotate it, and SwiftData generates the persistence layer automatically. @Query replaces NSFetchedResultsController for reactive list binding. Migration is handled via versioned schemas. SwiftData is ideal for new projects; Core Data remains necessary for complex existing models.'
            },
            {
              heading: 'Fetch, sort and filter',
              body: 'NSFetchRequest with NSPredicate enables server-side filtering: NSPredicate(format: "createdAt > %@", date as NSDate). SortDescriptors order results. SwiftData\'s @Query macro accepts sort and filter parameters declaratively. For complex queries, use NSPredicate with compound predicates (AND, OR, NOT).'
            }
          ],
          links: [
            {
              title: 'Core Data',
              url: 'https://developer.apple.com/documentation/coredata',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'documentation',
              relationship: 'Core Data framework reference.'
            },
            {
              title: 'SwiftData',
              url: 'https://developer.apple.com/xcode/swiftdata/',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'documentation',
              relationship: 'SwiftData introduction and migration guide.'
            },
            {
              title: 'NSPersistentContainer',
              url: 'https://developer.apple.com/documentation/coredata/nspersistentcontainer',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'reference',
              relationship: 'NSPersistentContainer setup and configuration.'
            }
          ],
          quiz: {
            prompt: 'What is the primary advantage of SwiftData @Model over Core Data NSManagedObject?',
            options: [
              'SwiftData is faster at runtime',
              '@Model eliminates boilerplate and integrates natively with SwiftUI\'s observation system',
              'SwiftData supports more data types',
              'Core Data cannot be used with SwiftUI'
            ],
            answerIndex: 1,
            explanation: '@Model generates persistence plumbing automatically and integrates with Swift\'s observation framework, eliminating the manual NSManagedObject subclass boilerplate.'
          }
        },
        {
          slug: 'accessibility-hig',
          title: 'Accessibility & Apple HIG',
          minutes: 27,
          objectives: [
            'Apply VoiceOver accessibility to SwiftUI views',
            'Follow Apple Human Interface Guidelines for iOS layout and typography',
            'Support Dynamic Type, dark mode and reduced motion preferences'
          ],
          sections: [
            {
              heading: 'VoiceOver and accessibility',
              body: '.accessibilityLabel, .accessibilityHint and .accessibilityValue expose view semantics to VoiceOver. Group related elements with .accessibilityElement(children: .combine). Test with Accessibility Inspector — never assume labels are correct without verification. Accessible apps ship on the App Store; inaccessible ones face rejection.'
            },
            {
              heading: 'Human Interface Guidelines',
              body: 'The HIG covers navigation patterns (tab bars, navigation bars), typography (SF Pro, Dynamic Type scales), color (semantic colors with dark mode), and interaction (minimum 44pt tap targets). Following HIG makes your app feel native — users expect consistent behavior across apps on the platform.'
            },
            {
              heading: 'Adaptive layouts and traits',
              body: '@Environment(\\.horizontalSizeClass) adapts layouts between compact (iPhone) and regular (iPad) width classes. SF Symbols scale with Dynamic Type. ColorScheme switching provides automatic dark mode support. Respecting these system traits ensures your app works across the full Apple device ecosystem.'
            }
          ],
          links: [
            {
              title: 'Accessibility in SwiftUI',
              url: 'https://developer.apple.com/documentation/swiftui/supporting-accessibility',
              sourceName: 'SwiftUI Documentation',
              resourceType: 'guide',
              relationship: 'SwiftUI accessibility modifier reference.'
            },
            {
              title: 'Human Interface Guidelines',
              url: 'https://developer.apple.com/design/human-interface-guidelines/',
              sourceName: 'Apple Human Interface Guidelines',
              resourceType: 'guide',
              relationship: 'Official Apple design guidelines for all platforms.'
            },
            {
              title: 'Dynamic Type',
              url: 'https://developer.apple.com/design/human-interface-guidelines/typography',
              sourceName: 'Apple Human Interface Guidelines',
              resourceType: 'guide',
              relationship: 'Typography scales and Dynamic Type support.'
            }
          ],
          quiz: {
            prompt: 'What is the minimum recommended tap target size for interactive elements according to the HIG?',
            options: [
              '24×24 points',
              '32×32 points',
              '44×44 points',
              '48×48 points'
            ],
            answerIndex: 2,
            explanation: 'Apple HIG specifies 44×44 points as the minimum tap target to ensure comfortable, accurate interactions — especially important for accessibility and touch accuracy.'
          }
        }
      ]
    },
    {
      slug: 'testing-publishing',
      stage: 'Advanced',
      title: 'Testing & App Store Publishing',
      description: 'Quality assurance, test automation and shipping to the App Store.',
      topics: [
        {
          slug: 'xctest-unit-testing',
          title: 'Unit Testing with XCTest',
          minutes: 28,
          objectives: [
            'Write unit tests for business logic and view models',
            'Use test doubles (fakes and mocks) to isolate layers',
            'Apply XCTest async testing and expectation patterns'
          ],
          sections: [
            {
              heading: 'XCTest basics',
              body: 'XCTestCase subclasses contain test methods prefixed with test. Use XCTAssert variants for assertions: XCTAssertEqual, XCTAssertTrue, XCTAssertNil. setUp() and tearDown() run before and after each test. Test methods must be void, take no parameters, and be discoverable at runtime.'
            },
            {
              heading: 'Test doubles and isolation',
              body: 'Fakes are lightweight real implementations (FakeAPIClient returning canned data) for most tests. Mocks verify interactions when call counts or argument capture matter. Use protocols as seams: inject FakeNetworkClient via protocol, swap in real implementation in production. This makes tests fast, deterministic and device-independent.'
            },
            {
              heading: 'Async testing',
              body: 'XCTestExpectation waits for asynchronous operations: fulfill() when the async work completes. Swift concurrency tests use async test methods directly — no expectations needed. Measure block performance with measure {} to catch regressions in hot paths. Time profiling catches allocations that cause frame drops.'
            }
          ],
          links: [
            {
              title: 'Writing test suites',
              url: 'https://developer.apple.com/documentation/xctest/writing_test_suites',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'documentation',
              relationship: 'Official XCTest test suite guide.'
            },
            {
              title: 'XCTestCase',
              url: 'https://developer.apple.com/documentation/xctest/xctestcase',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'reference',
              relationship: 'XCTestCase API reference.'
            },
            {
              title: 'Testing with Xcode',
              url: 'https://developer.apple.com/xcode/testing/',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'guide',
              relationship: 'Xcode testing overview and best practices.'
            }
          ],
          quiz: {
            prompt: 'What is the main purpose of a fake vs a mock in unit testing?',
            options: [
              'Fakes are slower but more accurate',
              'Fakes provide canned responses; mocks verify interaction behavior',
              'Mocks are used only for networking',
              'There is no difference between fakes and mocks'
            ],
            answerIndex: 1,
            explanation: 'Fakes implement simplified real behavior for deterministic tests; mocks track calls, arguments and order to verify that the code under test interacts with dependencies correctly.'
          }
        },
        {
          slug: 'ui-testing',
          title: 'UI Testing & Accessibility Testing',
          minutes: 27,
          objectives: [
            'Write UI tests with XCUIElement and accessibility identifiers',
            'Test navigation flows and modal presentation paths',
            'Verify accessibility compliance programmatically'
          ],
          sections: [
            {
              heading: 'XCUIElement interactions',
              body: 'XCUIElement represents UI elements found by accessibility identifiers, labels or traits. app.buttons["Login"].tap() and app.staticTexts["Welcome"].waitForExistence(timeout: 5) drive UI tests like real users. Always set .accessibilityIdentifier on testable elements — unidentifiable elements require fragile coordinate-based tapping.'
            },
            {
              heading: 'Navigation flow testing',
              body: 'UI tests verify complete user journeys: launch → navigate to settings → toggle a switch → verify persistence. Use waitForExistence to handle async view loading. Snapshot testing (point-free/SnapshotTesting) captures visual regressions by rendering views to images and comparing against baselines.'
            },
            {
              heading: 'Accessibility audit',
              body: 'XCUITest can audit accessibility: let app = XCUIApplication(); app.launch(); XCTAssertTrue(app.buttons.firstMatch.isHittable). Run Accessibility Inspector in Xcode to identify missing labels, insufficient contrast and small touch targets. Automated accessibility testing prevents regressions as the UI evolves.'
            }
          ],
          links: [
            {
              title: 'UI testing in Xcode',
              url: 'https://developer.apple.com/documentation/xctest/user-interface-tests',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'documentation',
              relationship: 'Official UI testing guide.'
            },
            {
              title: 'XCUIElement',
              url: 'https://developer.apple.com/documentation/xctest/xcuielement',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'reference',
              relationship: 'XCUIElement API reference.'
            },
            {
              title: 'Accessibility Inspector',
              url: 'https://developer.apple.com/accessibility/inspector/',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'guide',
              relationship: 'Accessibility Inspector tool overview.'
            }
          ],
          quiz: {
            prompt: 'Why should you set accessibilityIdentifier on SwiftUI views for UI testing?',
            options: [
              'It makes the views render faster',
              'It provides a stable identifier for XCUIElement queries, avoiding fragile label-based lookups',
              'It is required for App Store submission',
              'It automatically adds VoiceOver support'
            ],
            answerIndex: 1,
            explanation: 'Accessibility identifiers are stable, localizable-free identifiers that UI tests use to locate elements reliably — labels change with localization, but identifiers remain constant.'
          }
        },
        {
          slug: 'app-store-publishing',
          title: 'App Store Submission & Distribution',
          minutes: 26,
          objectives: [
            'Prepare an app for App Store submission with screenshots and metadata',
            'Configure TestFlight for beta testing',
            'Understand App Store review guidelines and common rejection reasons'
          ],
          sections: [
            {
              heading: 'App Store Connect',
              body: 'App Store Connect manages your listing: app name, subtitle, description, keywords, screenshots per device class and privacy policy URL. The binary is uploaded via Xcode Organizer or altool. Metadata must be accurate — misleading descriptions or missing privacy disclosures cause rejections during review.'
            },
            {
              heading: 'TestFlight beta distribution',
              body: 'TestFlight distributes builds to internal testers (up to 100) and external testers (up to 10,000) before App Store release. External testing requires an exported compliance document and beta app review. Collect feedback via the built-in feedback form. TestFlight is essential for catching device-specific issues across the Apple device matrix.'
            },
            {
              heading: 'Review process and rejection avoidance',
              body: 'App Store review checks functionality, metadata accuracy, privacy compliance and guideline adherence. Common rejections: incomplete features, broken links, placeholder content, missing privacy nutrition labels and crashing on launch. Submit with detailed review notes explaining any non-obvious login flows or test accounts.'
            }
          ],
          links: [
            {
              title: 'App Store Connect',
              url: 'https://developer.apple.com/app-store-connect/',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'documentation',
              relationship: 'App Store Connect overview and guides.'
            },
            {
              title: 'App Store Review Guidelines',
              url: 'https://developer.apple.com/app-store/review/guidelines/',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'reference',
              relationship: 'Official review criteria and common rejection causes.'
            },
            {
              title: 'TestFlight',
              url: 'https://developer.apple.com/testflight/',
              sourceName: 'Apple Developer Documentation',
              resourceType: 'documentation',
              relationship: 'TestFlight setup and beta distribution guide.'
            }
          ],
          quiz: {
            prompt: 'What is a common reason for App Store rejection related to app metadata?',
            options: [
              'Using SF Symbols in screenshots',
              'Incomplete features or placeholder content visible during review',
              'Including the app icon in screenshots',
              'Using system fonts'
            ],
            answerIndex: 1,
            explanation: 'App Store review rejects apps with incomplete functionality, placeholder text or broken links — every feature shown in screenshots and descriptions must be fully functional.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Fitness Tracker Feature Build',
    coverage: [
      'Swift',
      'SwiftUI',
      'Networking',
      'Persistence',
      'Accessibility',
      'Testing'
    ],
    brief:
      'Design and specify (build-ready) a workout history feature for a SwiftUI iOS app. The app fetches completed workouts from a REST API, caches them in SwiftData, displays them in a filterable list with pull-to-refresh, and supports VoiceOver navigation end-to-end.',
    requirements: [
      'SwiftData model (Workout entity) with field types and relationships',
      'URLSession service interface with async/await endpoint definition',
      'Repository interface with offline-first caching strategy documented',
      'SwiftUI screen component tree with state holders and @State/@Query usage',
      'Navigation route definition and how the screen is reached from the app graph',
      'VoiceOver accessibility annotations for every interactive element'
    ],
    expectedOutput:
      'A complete technical specification another iOS developer could implement without follow-up questions.',
    rubric: [
      {
        skill: 'Swift & SwiftUI',
        weight: 25,
        criteria: 'Idiomatic Swift, correct property wrapper usage, composable view decomposition'
      },
      {
        skill: 'Networking & persistence',
        weight: 25,
        criteria: 'Async URLSession correctness, offline-first strategy, SwiftData model accuracy'
      },
      {
        skill: 'Architecture',
        weight: 20,
        criteria: 'Clean separation of concerns, repository pattern, dependency injection readiness'
      },
      {
        skill: 'Accessibility',
        weight: 15,
        criteria: 'VoiceOver labels, semantic grouping, Dynamic Type and contrast compliance'
      },
      {
        skill: 'Navigation',
        weight: 15,
        criteria: 'Type-safe NavigationStack routing, deep link handling, sheet presentation'
      }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'Swift Data Layer Design',
      stage: 'Foundation',
      objective: 'Design the data layer for a bookmark app: SwiftData models, query predicates and a repository with offline-first caching logic.',
      requirements: [
        'SwiftData @Model with @Attribute(.unique) and @Relationship',
        'At least 4 query patterns (all, filter-by-category, search-by-title, sort-by-date)',
        'Repository interface with offline-first caching pseudocode',
        'Codable conformance for API serialization with CodingKeys',
        'Migration strategy from version 1 to version 2 adding a tags field'
      ],
      skillsEvaluated: ['Swift', 'SwiftData', 'Repository Pattern'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the complete data layer specification with annotated Swift code.',
        textLabel: 'Data layer spec',
        minTextLength: 1000
      }
    },
    {
      title: 'SwiftUI Profile Screen Specification',
      stage: 'Intermediate',
      objective: 'Specify a profile settings screen in SwiftUI: state management, layout decisions, accessibility annotations and adaptive sizing.',
      requirements: [
        'Composable component tree with @State and @StateObject holders documented',
        'Layout decisions using VStack, Grid and GeometryReader with rationale',
        'Accessibility annotations: .accessibilityLabel, .accessibilityHint, children combining',
        'Dynamic Type support and dark mode adaptation strategy',
        'Navigation integration: how this screen is pushed from the tab bar'
      ],
      skillsEvaluated: ['SwiftUI', 'Accessibility', 'Apple HIG'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the UI specification with component tree and accessibility decisions.',
        textLabel: 'UI specification',
        minTextLength: 1100,
        linkLabels: ['HIG reference cited']
      }
    },
    {
      title: 'App Store Release Plan',
      stage: 'Advanced',
      objective: 'Plan the App Store release for a new feature: signing, TestFlight beta, review submission and crash monitoring.',
      requirements: [
        'App Store Connect metadata checklist (name, subtitle, screenshots, privacy labels)',
        'TestFlight beta distribution plan: internal testers, external testers, feedback loop',
        'Review notes preparation: login credentials, test data, feature walkthrough',
        'Crash monitoring setup with Xcode Organizer and MetricKit',
        'Rollback procedure: previous binary, staged rollout and communication plan'
      ],
      skillsEvaluated: ['App Store Distribution', 'Testing', 'Release Management'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the release plan as a structured document.',
        textLabel: 'Release plan',
        minTextLength: 1100,
        linkLabels: ['App Store Review Guidelines referenced']
      }
    }
  ],

  simTasks: [
    {
      title: 'P0: App crash on launch after SwiftData migration',
      context: 'After updating the SwiftData model schema to add a required field, the app crashes immediately on launch for existing users. No crash reports are arriving because the crash happens before analytics initialization.',
      requirements: [
        'List top 3 crash hypotheses ranked by likelihood',
        'Specify the immediate fix or rollback steps',
        'Describe verification steps before re-deploying'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Incident note: cause diagnosis, chosen mitigation, re-deploy checklist.',
      skills: ['Debugging', 'SwiftData', 'App Store']
    },
    {
      title: 'Retain cycle in ObservableObject',
      context: 'Instruments Leaks tool shows a retained ClosureSandbox after navigating back from the settings screen. The leak path goes through a view model holding a Combine subscription that references self.',
      requirements: [
        'Identify the exact retain cycle path and explain why self is captured',
        'Specify the fix: weak/unowned capture or [weak self] annotation',
        'Describe regression checks to prevent recurrence'
      ],
      priority: 'high',
      dueDayOffset: 3,
      expectedOutput: 'Leak analysis memo with fix description and prevention strategy.',
      skills: ['Swift Memory Management', 'Combine', 'Debugging']
    },
    {
      title: 'VoiceOver users cannot navigate the checkout flow',
      context: 'Accessibility audit reveals VoiceOver users cannot identify the order total or confirm the purchase button in the checkout screen. The screen uses custom shapes without accessibility labels.',
      requirements: [
        'Diagnose the root cause (missing labels, incorrect traits, broken grouping)',
        'Propose a fix: .accessibilityLabel, .accessibilityAddTraits, .accessibilityElement(children:)',
        'Specify verification: Accessibility Inspector audit and manual VoiceOver walkthrough'
      ],
      priority: 'normal',
      dueDayOffset: 5,
      expectedOutput: 'Accessibility remediation plan with specific SwiftUI modifier changes and audit checklist.',
      skills: ['Accessibility', 'SwiftUI', 'Apple HIG']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Leah Kim',
      personaRole: 'Android Developer',
      situation: 'Cross-platform feature parity discussion.',
      openingMessage:
        'We\'re aligning the feature roadmap — the Android team is building the profile screen with Jetpack Compose. Can you share your SwiftUI architecture decisions so we match behavior and data models? I want to avoid divergent UX.',
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
      situation: 'Device-specific UI test failure.',
      openingMessage:
        'The latest UI test suite fails on iPhone SE (3rd generation) running iOS 16 when the keyboard covers the submit button. iPad tests pass. Logs show the button is off-screen during keyboard presentation. Can we look at this together?',
      expectedPoints: [
        'Engages collaboratively on reproduction steps',
        'Checks safeAreaInset and keyboardAvoidance modifier on the screen',
        'Proposes a fix using .scrollDismissesKeyboard or .ignoresSafeArea adjustments',
        'Documents the device-specific behavior for future test stability'
      ]
    },
    {
      kind: 'client',
      personaName: 'Priya Sharma',
      personaRole: 'Product Manager, FitTrack',
      situation: 'Feature request with health data privacy implications.',
      openingMessage:
        'We want to read HealthKit workout data in the background to auto-log exercises even when the app is closed. Legal says it\'s fine with a disclosure. How quickly can we add this and what are the App Store implications?',
      expectedPoints: [
        'Flags App Store health data privacy requirements and review scrutiny',
        'Explains background app refresh limitations and battery impact',
        'Offers phased approach: foreground HealthKit first, then background with clear consent',
        'Documents privacy nutrition label and App Store privacy requirements before proceeding'
      ]
    },
    {
      kind: 'client',
      personaName: 'Ethan Brooks',
      personaRole: 'CTO, FreshCart',
      situation: 'Push notification opt-in rate is low.',
      openingMessage:
        'Our push notification opt-in rate is 15% — the industry benchmark is 40%. Users dismiss the permission dialog. Can we improve this without tricking them?',
      expectedPoints: [
        'Explains rationale-first permission flow (show value before asking)',
        'Proposes a custom pre-permission screen explaining benefits',
        'Discusses notification authorization options and provisional delivery',
        'Measures opt-in rate before and after the change'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Incident',
      situation:
        'Friday 16:00: App Store Connect shows a 28% crash rate spike on the latest release. MetricKit points to a fatal error in the onboarding flow affecting 9,000 users in the last hour.',
      requiredActions: [
        {
          action: 'Halt the phased release immediately in App Store Connect',
          good: true,
          note: 'Stop the bleeding before investigating — limit affected users.'
        },
        {
          action: 'Check Xcode Organizer crash log and identify the exact frame causing the fatal error',
          good: true,
          note: 'Data-driven triage is faster than guessing.'
        },
        {
          action: 'Submit a hotfix binary through App Store Connect expedited review',
          good: true,
          note: 'Apple offers expedited review for critical bugs — use it to restore stability.'
        },
        {
          action: 'Wait until Monday to address it since it is Friday afternoon',
          good: false,
          note: '9,000 affected users per hour demands immediate action regardless of day.'
        }
      ]
    },
    {
      category: 'Process improvement',
      situation:
        'Three of the last five App Store submissions were rejected for missing privacy nutrition labels. The team lacks a consistent pre-submission checklist.',
      requiredActions: [
        {
          action: 'Create a pre-submission checklist: privacy labels, required reason API declarations, sign-in with Apple review',
          good: true,
          note: 'Process gates reduce rejection surface before submission.'
        },
        {
          action: 'Blame the team lead for missing privacy labels in standup',
          good: false,
          note: 'Public blame kills psychological safety; systemic fixes prevent recurrence.'
        },
        {
          action: 'Add a CI check that validates Info.plist required reason API usage declarations',
          good: true,
          note: 'Automated enforcement removes human discipline from the equation.'
        },
        {
          action: 'Track rejection count per quarter to measure improvement over time',
          good: true,
          note: 'Measurement makes the problem visible and the improvement measurable.'
        }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the SwiftUI view lifecycle and when @State values are reset.',
      guidancePoints: [
        'SwiftUI destroys and recreates view structs when the parent invalidates the identity',
        '@State persists across re-renders within the same view identity',
        'Navigation push/pop can destroy view identity, resetting @State',
        'Using stable identity with NavigationPath prevents unexpected state loss'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'How does async/await concurrency differ from GCD, and when would you choose one over the other?',
      guidancePoints: [
        'async/await provides structured, linear concurrency flow with compiler-checked contexts',
        'GCD uses DispatchQueues and closures — more flexible but harder to reason about',
        'async/await integrates with Task, TaskGroup and actors for structured concurrency',
        'GCD remains useful for legacy code, dispatch barriers and RunLoop scheduling'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Users report the app becomes sluggish after 10 minutes of use. Investigate.',
      guidancePoints: [
        'Check Instruments Allocations for objects retained past their lifecycle',
        'Profile the Time Profiler for main-thread blocking operations',
        'Look for unbounded @Published property updates causing excessive view re-renders',
        'Inspect Core Data main-context usage for performant fetch request patterns'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Design an offline-first sync strategy for a note-taking app.',
      guidancePoints: [
        'Local SwiftData/Core Data database as source of truth',
        'Background URLSession task for sync with conflict resolution (last-write-wins or merge)',
        'Network monitor (NWPathMonitor) to trigger sync when connectivity returns',
        'Pending-changes queue for operations created offline'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'A product manager asks to use UserDefaults for a complex nested user profile. Push back or comply?',
      guidancePoints: [
        'UserDefaults is flat key-value; nested models require manual serialization',
        'SwiftData or Keychain (for sensitive data) is the appropriate tool',
        'Explain maintenance cost and type-safety benefits of structured storage',
        'Offer to prototype the recommended approach quickly to demonstrate'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'When would you use background app refresh vs a background URL session task?',
      guidancePoints: [
        'Background URL sessions guarantee completion for network uploads/downloads',
        'Background app refresh is for short content updates and is not guaranteed to run',
        'BGTaskScheduler provides more control over task scheduling and dependencies',
        'Choose based on whether the work is network-bound or requires execution time'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain why your app needs the HealthKit permission to a non-technical stakeholder who is concerned about privacy.',
      guidancePoints: [
        'State exactly when and where the permission is triggered in the app',
        'Explain the user controls: denied permission means feature gracefully degrades',
        'No background health data access — only when user explicitly opens the feature',
        'Reference the App Store privacy nutrition label for transparency'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Your code review feedback on a teammate\'s SwiftUI code was perceived as harsh. How do you handle it?',
      guidancePoints: [
        'Acknowledge the perception without being defensive',
        'Reframe feedback as questions or suggestions rather than directives',
        'Separate must-fix (correctness/accessibility) from style preferences',
        'Propose a team-wide Swift style guide to depersonalize style feedback'
      ]
    }

  ]

}
