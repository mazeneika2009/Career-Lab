import type { CareerDef } from '../framework.js'

export const automationTester: CareerDef = {
  slug: 'automation-tester',
  name: 'Automation Tester',
  category: 'Quality',
  order: 38,
  description:
    'Builds maintainable test automation with Selenium, Playwright, Cypress and Appium wired into CI/CD pipelines.',
  difficulty: 'Intermediate',
  pathSummary:
    'Test automation fundamentals & Selenium WebDriver → Modern browser automation with Playwright & Cypress → Mobile testing with Appium & API automation → CI/CD integration, parallel execution & scalable test infrastructure.',
  mainSkills: [
    'Selenium WebDriver & Cross-Browser Testing',
    'Playwright Modern Browser Automation',
    'Cypress Component & E2E Testing',
    'Appium Mobile Test Automation',
    'Page Object Model & Test Design Patterns',
    'CI/CD Pipeline Integration for Test Suites',
    'API Testing & Automation',
    'Test Reporting & Metrics Analysis'
  ],
  sourcePlatforms: [
    'Selenium Documentation',
    'Playwright Documentation',
    'Cypress Documentation',
    'Appium Documentation',
    'GitHub Documentation'
  ],
  companyName: 'QualiForge Solutions',
  roleTitle: 'Automation Tester',

  chapters: [
    {
      slug: 'test-automation-foundations-selenium',
      stage: 'Beginner',
      title: 'Test Automation Foundations & Selenium WebDriver',
      description: 'Understanding test automation strategy, writing your first Selenium scripts, mastering locator strategies and handling dynamic web elements with waits and assertions.',
      topics: [
        {
          slug: 'test-automation-fundamentals',
          title: 'Test Automation Fundamentals & Strategy',
          minutes: 25,
          objectives: [
            'Distinguish between manual testing, exploratory testing and automated testing and articulate the ROI of each approach',
            'Identify which test cases are good candidates for automation versus those better suited to manual execution',
            'Set up a local development environment with Java or Python, a Selenium-compatible browser and a test runner framework'
          ],
          sections: [
            { heading: 'When to automate and when to stay manual', body: 'Test automation delivers the greatest return on repetitive, data-driven regression tests that run frequently across multiple browsers or environments. Manual testing remains essential for exploratory testing, usability assessment and ad-hoc scenarios where human intuition uncovers defects that scripted checks miss. A balanced strategy assigns regression suites, smoke tests and data validation to automation while reserving exploratory and accessibility reviews for skilled manual testers. Understanding this split prevents wasted effort automating one-off edge cases while leaving critical regression paths unverified.' },
            { heading: 'Choosing a test automation stack', body: 'The automation stack begins with a programming language — Java and Python dominate the Selenium ecosystem, while JavaScript powers Cypress. A test runner organizes and executes tests: JUnit and TestNG for Java, pytest for Python, Mocha for Cypress. An assertion library verifies expected outcomes: AssertJ, Hamcrest or built-in expect. A reporting tool captures results for stakeholders. Selecting the stack early ensures the team builds on consistent foundations rather than cobbling together incompatible tools after the first sprint.' },
            { heading: 'The test pyramid and automation coverage', body: 'The test pyramid model prescribes a large base of fast unit tests, a middle layer of integration and API tests and a thin top layer of end-to-end UI tests. Each layer has different speed, cost and reliability characteristics. UI automation sits at the top — slower, more brittle and more expensive to maintain than lower layers. A mature automation strategy allocates approximately 70% of tests to the unit layer, 20% to integration and API and 10% to end-to-end UI. This distribution maximizes feedback speed while maintaining confidence in critical user journeys.' }
          ],
          links: [
            { title: 'Selenium WebDriver Documentation', url: 'https://www.selenium.dev/documentation/webdriver/', sourceName: 'Selenium Documentation', resourceType: 'reference', relationship: 'Official Selenium documentation covering WebDriver setup, browser drivers and core API usage.' },
            { title: 'Playwright Getting Started', url: 'https://playwright.dev/docs/intro', sourceName: 'Playwright Documentation', resourceType: 'guide', relationship: 'Playwright introduction covering installation, first test creation and browser configuration.' },
            { title: 'Cypress Testing Getting Started', url: 'https://docs.cypress.io/guides/getting-started/installing-cypress', sourceName: 'Cypress Documentation', resourceType: 'guide', relationship: 'Cypress installation and first test walkthrough including browser requirements and project setup.' }
          ],
          quiz: {
            prompt: 'A team has 200 test cases for their e-commerce application. Which of the following would be the best initial candidates for automation?',
            options: [
              'Usability tests that evaluate the visual layout of the checkout page',
              'Regression tests that verify login, search and checkout flows on every build',
              'Exploratory tests that investigate edge cases discovered during development',
              'Accessibility tests requiring screen reader interaction validation'
            ],
            answerIndex: 1,
            explanation: 'Regression tests that verify core user flows on every build provide the highest automation ROI because they are repetitive, critical and benefit from consistent execution across environments.'
          }
        },
        {
          slug: 'selenium-webdriver-basics',
          title: 'Selenium WebDriver Basics',
          minutes: 30,
          objectives: [
            'Initialize a WebDriver instance for Chrome, Firefox and Edge with configurable options',
            'Navigate to URLs, interact with form elements and extract text content from web pages',
            'Apply different wait strategies — implicit, explicit and fluent — to handle dynamic page loads'
          ],
          sections: [
            { heading: 'WebDriver initialization and browser options', body: 'A Selenium test begins by creating a WebDriver instance that communicates with the browser through a driver executable. ChromeDriver, GeckoDriver and msedgedriver translate WebDriver protocol commands into browser-native actions. Browser options configure headless mode, window dimensions, proxy settings and download directories. ChromeOptions().addArguments("--headless") enables CI-friendly headless execution without a display. Setting implicit waits establishes a global timeout for element lookups, while explicit waits target specific conditions.' },
            { heading: 'Element interaction and navigation', body: 'WebDriver locates elements using the findElement method with By strategies — id, name, className, cssSelector, xpath and linkText. Once located, elements support click, sendKeys, clear, getText, getAttribute and submit actions. Navigation uses driver.get for direct URL loading, driver.navigate().back and driver.navigate().forward for history traversal and driver.navigate().refresh for page reload. Handling dropdowns requires the Select class, and file uploads use the sendKeys method on input elements of type file.' },
            { heading: 'Wait strategies for dynamic web applications', body: 'Modern web applications load content asynchronously with JavaScript frameworks, lazy loading and API-driven rendering. Implicit waits apply a default timeout to every element lookup but cannot handle specific conditions. Explicit waits using WebDriverWait with ExpectedConditions target precise states: elementToBeClickable, visibilityOfElementLocated, presenceOfAllElementsLocatedBy. Fluent waits define custom polling intervals and exception whitelists. Choosing the right wait strategy is the single most important factor in test stability — premature sleep-based waits are unreliable and slow.' }
          ],
          links: [
            { title: 'Selenium WebDriver — Browser Drivers', url: 'https://www.selenium.dev/documentation/webdriver/browsers/', sourceName: 'Selenium Documentation', resourceType: 'reference', relationship: 'Official Selenium documentation on browser driver setup, options and WebDriver initialization.' },
            { title: 'Playwright Auto-Waiting', url: 'https://playwright.dev/docs/basics#auto-waiting', sourceName: 'Playwright Documentation', resourceType: 'guide', relationship: 'Playwright documentation explaining how auto-waiting eliminates the need for explicit sleep calls.' },
            { title: 'GitHub — SeleniumHQ/selenium', url: 'https://github.com/SeleniumHQ/selenium', sourceName: 'GitHub Documentation', resourceType: 'reference', relationship: 'Selenium project repository with examples, release notes and community-contributed utilities.' }
          ],
          quiz: {
            prompt: 'A Selenium test intermittently fails because a button is not clickable when the test attempts to click it, even though the element is present in the DOM. What is the most likely cause and solution?',
            options: [
              'The element locator is incorrect and needs to be updated',
              'The element has not yet transitioned to a clickable state — use an explicit wait with elementToBeClickable',
              'The browser driver is outdated and needs to be replaced',
              'An implicit wait is set too low and should be increased to 30 seconds'
            ],
            answerIndex: 1,
            explanation: 'The element is present but not yet interactable, which means it may be covered by an overlay, still animating or waiting for a JavaScript event. An explicit wait with ExpectedConditions.elementToBeClickable waits for both visibility and clickability before proceeding.'
          }
        },
        {
          slug: 'locator-strategies-element-interaction',
          title: 'Locator Strategies & Element Interaction',
          minutes: 30,
          objectives: [
            'Compare locator strategies — ID, CSS selector, XPath and relative XPath — and select the most resilient option for each scenario',
            'Handle complex UI interactions including dropdowns, file uploads, alerts and multi-window switching',
            'Write stable locators that survive minor DOM refactoring using data attributes and ARIA roles'
          ],
          sections: [
            { heading: 'Locator hierarchy and selection strategy', body: 'Selenium provides six primary locator strategies: id, name, className, tagName, cssSelector and xpath. IDs are the fastest and most stable when they are unique and static. CSS selectors offer a concise, readable alternative for complex hierarchies — div.form-group > input[type="email"]. XPath is the most powerful, supporting axes like following-sibling, ancestor and contains() for dynamic attributes, but it is slower and more brittle. A robust locator strategy prioritizes data-testid attributes, falls back to CSS selectors and reserves XPath for situations where no other option provides a unique match.' },
            { heading: 'Complex UI interactions', body: 'Dropdowns use the Select class wrapping the element — selectByVisibleText, selectByValue and selectByIndex provide different selection methods. File uploads require setting the element\'s display property to block before sending the file path via sendKeys. JavaScript alerts use driver.switchTo().alert() with accept, dismiss and getText methods. Multi-window scenarios call driver.getWindowHandles to collect all window IDs, then switchTo().window to target a specific handle. Iframes require switchTo().frame with the element, name or index before interacting with content inside.' },
            { heading: 'Writing maintainable locators', body: 'Maintainable locators are immune to implementation details that change frequently — CSS class names generated by frameworks like Tailwind, numeric IDs assigned dynamically or absolute XPath paths that break on any DOM change. Prefer locators anchored to stable attributes: data-testid, aria-label, role, name or placeholder. When no stable attribute exists, construct relative XPath expressions using visible text content, attribute combinations or parent-child relationships that describe the element\'s semantic purpose rather than its position in the DOM tree.' }
          ],
          links: [
            { title: 'Selenium WebDriver — Locators', url: 'https://www.selenium.dev/documentation/webdriver/elements/locators/', sourceName: 'Selenium Documentation', resourceType: 'reference', relationship: 'Official Selenium documentation on element locator strategies and their trade-offs.' },
            { title: 'Appium Element Selection', url: 'https://appium.io/docs/en/writing-running-appium/finding-elements/', sourceName: 'Appium Documentation', resourceType: 'reference', relationship: 'Appium documentation on mobile element locator strategies including accessibility ID, class name and XPath.' },
            { title: 'Cypress Selecting Elements', url: 'https://docs.cypress.io/guides/references/best-practices#Selecting-Elements', sourceName: 'Cypress Documentation', resourceType: 'guide', relationship: 'Cypress best practices for selecting DOM elements using data attributes and semantic selectors.' }
          ],
          quiz: {
            prompt: 'A web application uses dynamically generated CSS class names that change on every deployment. The element has a stable data-testid attribute of "submit-button". Which locator strategy is most maintainable?',
            options: [
              'XPath with contains() on the class attribute to match partial class names',
              'CSS selector targeting the dynamically generated class pattern',
              'CSS selector using [data-testid="submit-button"]',
              'tagName selector for the button element'
            ],
            answerIndex: 2,
            explanation: 'The data-testid attribute is specifically designed for test automation and remains stable across deployments. A CSS selector using this attribute is both fast and immune to class name changes.'
          }
        }
      ]
    },
    {
      slug: 'modern-browser-automation',
      stage: 'Foundation',
      title: 'Modern Browser Automation with Playwright & Cypress',
      description: 'Leveraging Playwright for cross-browser, cross-platform testing with auto-waiting and network interception, and Cypress for fast component and end-to-end testing with time-travel debugging.',
      topics: [
        {
          slug: 'playwright-cross-browser-testing',
          title: 'Playwright Cross-Browser Testing',
          minutes: 30,
          objectives: [
            'Set up a Playwright test project with Chromium, Firefox and WebKit browser configurations',
            'Use Playwright locators, auto-waiting and assertion APIs to write reliable cross-browser tests',
            'Configure network mocking, request interception and HAR recording for deterministic test environments'
          ],
          sections: [
            { heading: 'Playwright project setup and configuration', body: 'Playwright installs browser binaries independently of the system browser, guaranteeing consistent versions across development, CI and teammate machines. The npx playwright install command downloads Chromium, Firefox and WebKit. The playwright.config.ts file defines projects that run the same test suite across all three engines, sets base URLs, timeouts and screenshot/video capture options. Project-specific configurations — such as different viewports for mobile and desktop — run in parallel, providing cross-browser coverage in a single test execution.' },
            { heading: 'Locators and auto-waiting', body: 'Playwright\'s locator API replaces raw element handles with smart locators that auto-wait for elements to be actionable before interacting. page.getByRole("button", { name: "Submit" }) uses the accessibility tree, page.getByLabel("Email") matches form fields by label text and page.getByTestId("login-form") targets test IDs. These locators are resilient because they describe what the user sees and interacts with, not how the element is structured in the DOM. The auto-waiting engine retries actions until the element reaches a stable, visible and enabled state — eliminating the need for explicit waits.' },
            { heading: 'Network mocking and request interception', body: 'Playwright intercepts network requests at the protocol level, enabling tests to mock API responses without modifying application code. page.route("**/api/users", route => route.fulfill({ status: 200, body: JSON.stringify(mockUsers) })) replaces a real API call with controlled test data. This technique isolates the frontend from backend flakiness, tests error scenarios like 500 responses and verifies offline behavior with route.abort. HAR recording captures real network traffic to file, which can be replayed in subsequent test runs for fully deterministic network conditions.' }
          ],
          links: [
            { title: 'Playwright Locators Guide', url: 'https://playwright.dev/docs/locators', sourceName: 'Playwright Documentation', resourceType: 'reference', relationship: 'Playwright documentation on locator strategies, getByRole, getByLabel and auto-waiting behavior.' },
            { title: 'Selenium WebDriver — Waits', url: 'https://www.selenium.dev/documentation/webdriver/waits/', sourceName: 'Selenium Documentation', resourceType: 'reference', relationship: 'Selenium documentation on implicit, explicit and fluent wait strategies for comparison with Playwright auto-waiting.' },
            { title: 'GitHub — microsoft/playwright', url: 'https://github.com/microsoft/playwright', sourceName: 'GitHub Documentation', resourceType: 'reference', relationship: 'Playwright repository with examples, API documentation and community contributions.' }
          ],
          quiz: {
            prompt: 'Playwright intercepts an API call to /api/products and returns a mocked response with zero products. How does the application typically display an empty state, and why is this useful for testing?',
            options: [
              'It shows an error page — network mocking is only useful for testing failures',
              'It shows an empty-state message — mocking isolates frontend testing from backend instability',
              'It crashes — Playwright cannot mock API responses',
              'It shows cached data — mocking is only useful for offline testing'
            ],
            answerIndex: 1,
            explanation: 'Network mocking returns controlled responses to the application, isolating frontend tests from backend flakiness. When the mock returns zero products, the frontend should render its empty-state UI — a critical test scenario that is difficult to trigger reliably with a live backend.'
          }
        },
        {
          slug: 'cypress-component-e2e-testing',
          title: 'Cypress Component & E2E Testing',
          minutes: 30,
          objectives: [
            'Write end-to-end tests with Cypress commands including cy.visit, cy.get, cy.intercept and custom commands',
            'Configure Cypress for component testing of individual React, Vue or Angular components',
            'Use Cypress time-travel debugging, screenshots and video recording to diagnose test failures'
          ],
          sections: [
            { heading: 'Cypress end-to-end testing fundamentals', body: 'Cypress executes tests inside the browser alongside the application, giving it native access to the DOM, cookies, localStorage and network requests. The chainable API — cy.visit("/login"), cy.get("[data-testid=email]").type("user@test.com"), cy.get("button[type=submit]").click() — reads like a user journey. cy.intercept replaces or stubs API responses, cy.wait waits for specific network calls and cy.session caches login state across tests. Cypress automatically retries assertions, takes screenshots on failure and records video of every test run.' },
            { heading: 'Component testing in Cypress', body: 'Cypress component testing mounts individual components in isolation without rendering the full application. After configuring cypress.config.ts with a devServer framework — React, Vue or Angular — component tests import the component, mount it with cy.mount and interact with it exactly like an E2E test. This catches component-level regressions faster than full E2E tests because it skips routing, authentication and data loading. Component tests complement E2E tests by validating the boundaries between components in isolation.' },
            { heading: 'Debugging with time-travel and artifacts', body: 'Cypress time-travel debugging is its signature feature. Every command in the test runner records a snapshot of the DOM, network state and application state at the moment of execution. Clicking any command in the Command Log rewinds the application to that exact state, showing what the DOM looked like before and after the action. Failed tests automatically capture a screenshot and, if configured, a video of the entire test run. These artifacts eliminate the guesswork of debugging CI failures — a developer can open the screenshot, see the exact UI state and trace the root cause without reproducing the environment locally.' }
          ],
          links: [
            { title: 'Cypress Testing Guide', url: 'https://docs.cypress.io/guides/core-concepts/introduction-to-cypress', sourceName: 'Cypress Documentation', resourceType: 'guide', relationship: 'Cypress introduction covering the test runner, commands, assertions and debugging workflow.' },
            { title: 'Playwright Test Configuration', url: 'https://playwright.dev/docs/test-configuration', sourceName: 'Playwright Documentation', resourceType: 'reference', relationship: 'Playwright test configuration options for comparison with Cypress configuration approaches.' },
            { title: 'GitHub — cypress-io/cypress', url: 'https://github.com/cypress-io/cypress', sourceName: 'GitHub Documentation', resourceType: 'reference', relationship: 'Cypress project repository with example recipes, plugins and community plugins.' }
          ],
          quiz: {
            prompt: 'A Cypress E2E test fails in CI but passes locally. The test interacts with an API that returns different response times. What is the most likely cause and the best Cypress feature to diagnose it?',
            options: [
              'The CI machine has a different browser version — update the browser in CI',
              'The application state is different in CI — use cy.session to cache login state',
              'Network timing difference — check the automatically captured screenshot and video artifacts for the exact failure state',
              'The test is flaky — add cy.wait(5000) to increase the timeout'
            ],
            answerIndex: 2,
            explanation: 'Cypress automatically captures screenshots on failure and records video of the entire test. These artifacts show the exact UI state at the moment of failure, which is the fastest way to diagnose CI-specific issues like timing differences or missing test data.'
          }
        },
        {
          slug: 'api-testing-automation',
          title: 'API Testing & Automation',
          minutes: 25,
          objectives: [
            'Design and execute API tests using Postman, Rest Assured or Playwright\'s request context',
            'Validate response schemas, status codes, headers and business logic in JSON payloads',
            'Integrate API tests into a test suite that runs before UI tests to catch backend issues early'
          ],
          sections: [
            { heading: 'API testing fundamentals', body: 'API tests verify that endpoints return correct status codes, response bodies, headers and response times without rendering a UI. REST APIs use GET for retrieval, POST for creation, PUT/PATCH for updates and DELETE for removal. Each operation should return appropriate HTTP status codes: 200 for success, 201 for creation, 400 for validation errors, 401 for authentication failures and 404 for missing resources. API tests run in seconds compared to minutes for UI tests, making them ideal for fast feedback loops in CI pipelines.' },
            { heading: 'Schema validation and contract testing', body: 'JSON Schema validation ensures API responses conform to an expected structure, catching missing fields, type mismatches and unexpected additions before they reach the frontend. Contract testing frameworks like Pact verify that an API provider delivers what consumers expect, enabling teams to develop frontend and backend independently. Playwright provides request context for direct HTTP calls, while tools like Rest Assured offer a fluent API for Java-based assertions. Automated schema validation prevents silent breaking changes in API responses.' },
            { heading: 'API test integration strategy', body: 'API tests should execute before UI tests in the pipeline because they run faster and catch backend issues that would cause UI tests to fail with misleading error messages. A layered approach uses API tests to set up test data, validate business logic and verify error handling, then uses UI tests to validate the end-to-end user journey. This separation reduces UI test complexity, speeds up the feedback loop and makes failures easier to diagnose — an API test failure points directly to the backend, while a UI test failure could be anywhere in the stack.' }
          ],
          links: [
            { title: 'Playwright API Testing', url: 'https://playwright.dev/docs/test-api-testing', sourceName: 'Playwright Documentation', resourceType: 'guide', relationship: 'Playwright guide on making HTTP requests and writing API-level tests within the test framework.' },
            { title: 'Selenium WebDriver — HTTP Requests', url: 'https://www.selenium.dev/documentation/webdriver/bidirectional/bidi_api/', sourceName: 'Selenium Documentation', resourceType: 'reference', relationship: 'Selenium documentation on the BiDi protocol and network interception capabilities.' },
            { title: 'GitHub — rest-assured/rest-assured', url: 'https://github.com/rest-assured/rest-assured', sourceName: 'GitHub Documentation', resourceType: 'reference', relationship: 'Rest Assured repository for Java-based REST API testing with fluent assertions.' }
          ],
          quiz: {
            prompt: 'A UI test fails because the product list page shows zero items, but the API returns 200 with an empty array. The database has 50 products. What is the most efficient way to isolate the root cause?',
            options: [
              'Fix the UI test to handle empty states',
              'Write an API test that validates the /api/products endpoint returns the expected count from the database',
              'Rewrite the UI test using a different locator strategy',
              'Increase the UI test timeout to allow for slow database queries'
            ],
            answerIndex: 1,
            explanation: 'An API test directly validates the backend response, isolating whether the issue is in the API logic, database query or data seeding. If the API test also shows an empty array, the bug is in the backend. If the API returns 50 products, the bug is in the UI rendering.'
          }
        }
      ]
    },
    {
      slug: 'mobile-testing-and-design-patterns',
      stage: 'Intermediate',
      title: 'Mobile Testing with Appium & Test Design Patterns',
      description: 'Automating mobile application tests on Android and iOS with Appium, applying the Page Object Model and factory patterns to build maintainable test suites and managing test data effectively.',
      topics: [
        {
          slug: 'appium-mobile-automation',
          title: 'Appium Mobile Test Automation',
          minutes: 30,
          objectives: [
            'Configure Appium with Android SDK and Xcode toolchains to automate native and hybrid mobile applications',
            'Identify mobile elements using accessibility IDs, class names, XPath and mobile-specific locator strategies',
            'Execute mobile gestures — swipe, tap, long-press, pinch and scroll — using W3C Actions and Appium driver methods'
          ],
          sections: [
            { heading: 'Appium architecture and setup', body: 'Appium is an open-source test automation framework that uses the WebDriver protocol to communicate with native, hybrid and mobile web applications on Android and iOS. The Appium server receives commands from the test script and translates them into platform-specific actions using UiAutomator2 for Android and XCUITest for iOS. Setup requires the Appium server, platform SDKs and a driver initialization with capabilities like automationName, platformName, deviceName and app path. Appium Inspector provides a visual element inspection tool for identifying locators on running applications.' },
            { heading: 'Mobile element identification', body: 'Mobile applications present unique element identification challenges because CSS selectors do not apply to native elements. Accessibility IDs are the most stable and recommended locator strategy for Appium — they use the accessibilityLabel or accessibilityIdentifier attributes designed for screen readers. Class names identify element types like XCUIElementTypeButton or android.widget.EditText. XPath provides full hierarchical navigation but is slower and more fragile on mobile. Mobile-specific strategies include Android UI Automator selectors for Android-only apps and iOS predicate strings for iOS-specific locators.' },
            { heading: 'Mobile gestures and interactions', body: 'Mobile user interfaces rely heavily on gestures that have no desktop equivalent. Appium provides touch action chains for constructing multi-step gestures: tap at coordinates, long press, swipe between points with duration control, pinch-to-zoom and scroll. The W3C Actions API is the modern standard, defining pointer, keyboard and touch input sources with precise timing. Common mobile test scenarios — scrolling a feed, swiping a carousel, pulling to refresh and navigating drawer menus — require gesture composition that combines multiple actions in sequence.' }
          ],
          links: [
            { title: 'Appium Documentation — Getting Started', url: 'https://appium.io/docs/en/about-appium/intro/', sourceName: 'Appium Documentation', resourceType: 'guide', relationship: 'Appium introduction covering architecture, setup requirements and first test execution.' },
            { title: 'Appium Element Identification', url: 'https://appium.io/docs/en/writing-running-appium/finding-elements/', sourceName: 'Appium Documentation', resourceType: 'reference', relationship: 'Appium documentation on mobile element locator strategies and element interaction methods.' },
            { title: 'GitHub — appium/appium', url: 'https://github.com/appium/appium', sourceName: 'GitHub Documentation', resourceType: 'reference', relationship: 'Appium project repository with release notes, plugin ecosystem and example configurations.' }
          ],
          quiz: {
            prompt: 'You are automating a React Native mobile application. The login button has no accessible text but has an accessibility ID of "login-button". Which locator strategy should you use?',
            options: [
              'XPath with the button text as the selector',
              'Class name to locate all buttons and select the third one',
              'Accessibility ID with value "login-button"',
              'Absolute XPath path to the button element'
            ],
            answerIndex: 2,
            explanation: 'Accessibility IDs are the most stable locator strategy for mobile automation. They are explicitly designed for automation tools and screen readers, survive app rebuilds and are supported on both Android and iOS platforms.'
          }
        },
        {
          slug: 'page-object-model-patterns',
          title: 'Page Object Model & Test Design Patterns',
          minutes: 30,
          objectives: [
            'Implement the Page Object Model to encapsulate page elements and interactions behind reusable classes',
            'Apply the Factory and Builder patterns to construct complex test data and page configurations',
            'Refactor brittle test scripts into maintainable automation frameworks using SOLID principles'
          ],
          sections: [
            { heading: 'Page Object Model fundamentals', body: 'The Page Object Model separates test logic from page-specific element definitions and interaction methods. Each page or component gets its own class that encapsulates locators as private elements and exposes public methods like login(username, password) or navigateToCheckout(). Tests call page methods instead of directly locating elements, so when the UI changes, only the page class needs updating — not every test that interacts with that page. This single-responsibility principle reduces maintenance cost dramatically as the test suite grows from dozens to hundreds of tests.' },
            { heading: 'Factory and Builder patterns for test data', body: 'The Factory pattern creates test data objects through centralized builder methods — UserFactory.createAdmin(), ProductFactory.createWithDefaults(). This eliminates hardcoded test data scattered across test files and ensures every test uses valid, consistent data. The Builder pattern constructs complex objects step by step: new OrderBuilder().withItems(3).withDiscount(10).withShipping("express").build(). Combining Factory and Builder patterns gives tests readable, flexible data creation while maintaining a single source of truth for data structure requirements. When data schemas change, the factory absorbs the impact.' },
            { heading: 'Framework organization and SOLID principles', body: 'A well-organized test framework mirrors the application architecture: a pages/ directory for page objects, a components/ directory for reusable UI components, a fixtures/ directory for test data, a utils/ directory for helpers and a tests/ directory organized by feature or user journey. Each layer depends only on the layer below it — tests depend on pages, pages depend on components and components depend on utilities. This dependency direction prevents circular references, makes testing individual layers possible and allows new team members to contribute without understanding the entire framework.' }
          ],
          links: [
            { title: 'Selenium WebDriver — Page Objects', url: 'https://www.selenium.dev/documentation/test_practices/optimizing_your_tests/', sourceName: 'Selenium Documentation', resourceType: 'guide', relationship: 'Selenium guidance on test organization patterns including page objects and test structure.' },
            { title: 'Playwright Test Fixtures', url: 'https://playwright.dev/docs/test-fixtures', sourceName: 'Playwright Documentation', resourceType: 'reference', relationship: 'Playwright fixtures documentation as an alternative to page objects for test setup and teardown.' },
            { title: 'Cypress Custom Commands', url: 'https://docs.cypress.io/api/cypress-api/custom-commands', sourceName: 'Cypress Documentation', resourceType: 'reference', relationship: 'Cypress custom commands API for building reusable abstractions similar to page objects.' }
          ],
          quiz: {
            prompt: 'A test suite has 40 tests that all interact with the login page. The login form\'s submit button ID changes from "btn-login" to "submit-btn". Without the Page Object Model, how many files must be updated? What is the advantage of the POM approach?',
            options: [
              '1 file — all tests are in one file',
              '40 files — each test directly locates the button, POM would require updating only the LoginPage class',
              '2 files — the test file and the configuration',
              '0 files — CSS selectors automatically adapt to ID changes'
            ],
            answerIndex: 1,
            explanation: 'Without POM, every test that locates the button must be updated. With POM, only the LoginPage class needs the locator change, and all 40 tests automatically use the updated method. This is the core maintenance advantage of the Page Object Model.'
          }
        },
        {
          slug: 'test-data-management',
          title: 'Test Data Management & Fixtures',
          minutes: 25,
          objectives: [
            'Design test data strategies using fixtures, factories and external data sources to keep tests independent and repeatable',
            'Implement data-driven testing that executes the same test logic across multiple data sets',
            'Manage test database state with setup and teardown operations that ensure clean test isolation'
          ],
          sections: [
            { heading: 'Test data lifecycle management', body: 'Every test needs data in a known, predictable state. The Arrange-Act-Assert pattern begins with data arrangement — creating users, products or orders that the test will interact with. Without proper lifecycle management, tests create data that contaminates subsequent tests, causing flaky failures. Each test must create its own data in setup (beforeEach or @Before), use it during execution and clean it up in teardown (afterEach or @After). Database transactions that roll back after each test provide the most reliable isolation, while API-based cleanup handles data created through the application itself.' },
            { heading: 'Data-driven testing', body: 'Data-driven tests separate test logic from test data, executing the same verification across multiple input combinations. In pytest, the @pytest.mark.parametrize decorator runs the same test function with different argument sets. In TestNG, the @DataProvider supplies test data from arrays, CSV files or databases. This pattern is essential for login testing with valid/invalid credentials, form validation with edge cases and API testing with different payload configurations. A single parameterized test replaces dozens of nearly identical test methods.' },
            { heading: 'Fixtures and test environment seeding', body: 'Test fixtures define the preconditions for each test: database state, configuration values, user authentication state and external service stubs. Playwright fixtures extend the base test object with custom setup — a logged-in user fixture authenticates once and reuses the session across tests. Cypress cy.session achieves similar session caching. Environment-specific configuration — different API URLs, database connections and feature flags — should be externalized in environment variable files, not hardcoded. This separation allows the same tests to run against development, staging and pre-production environments without code changes.' }
          ],
          links: [
            { title: 'Playwright Test Fixtures', url: 'https://playwright.dev/docs/test-fixtures', sourceName: 'Playwright Documentation', resourceType: 'reference', relationship: 'Playwright documentation on extending tests with custom fixtures for authentication, database seeding and reusable setup.' },
            { title: 'Cypress Fixture and Session', url: 'https://docs.cypress.io/commands/intercepts#cy-session', sourceName: 'Cypress Documentation', resourceType: 'guide', relationship: 'Cypress documentation on fixtures for test data loading and session caching for authentication state reuse.' },
            { title: 'GitHub — pytest-fixtures', url: 'https://github.com/pytest-dev/pytest', sourceName: 'GitHub Documentation', resourceType: 'reference', relationship: 'Pytest repository with fixture documentation, parametrize examples and plugin ecosystem.' }
          ],
          quiz: {
            prompt: 'Two Cypress tests both create a user account during setup and log in with that account. The second test sometimes fails because the username already exists. What is the root cause and the best fix?',
            options: [
              'The second test has a timing issue — add a cy.wait(1000) before account creation',
              'Test isolation is broken — each test must create unique data or the database must be cleaned between tests',
              'The Cypress session cache is corrupted — clear cy.session between tests',
              'The form validation is too strict — use a shorter username'
            ],
            answerIndex: 1,
            explanation: 'When tests share mutable state, the second test fails because the username from the first test still exists. The fix is to generate unique usernames per test (using timestamps or random strings) or clean the database in a beforeEach hook to ensure each test starts from a known state.'
          }
        }
      ]
    },
    {
      slug: 'cicd-integration-and-scale',
      stage: 'Advanced',
      title: 'CI/CD Integration, Parallel Execution & Test Infrastructure',
      description: 'Wiring test suites into continuous integration pipelines, executing tests in parallel across environments, generating actionable reports and building scalable test infrastructure for enterprise teams.',
      topics: [
        {
          slug: 'cicd-pipeline-integration',
          title: 'CI/CD Pipeline Integration for Test Suites',
          minutes: 30,
          objectives: [
            'Configure GitHub Actions, Jenkins or GitLab CI to run Selenium, Playwright and Cypress test suites on every pull request',
            'Implement pipeline stages — lint, unit test, API test, E2E test, report — with appropriate failure gates',
            'Manage browser driver versions and test environment dependencies in containerized CI environments'
          ],
          sections: [
            { heading: 'Pipeline architecture for test automation', body: 'A well-designed CI pipeline runs tests in layers that match the test pyramid. The first stage runs linting and static analysis for fast feedback — under 30 seconds. The second stage executes unit tests — under 2 minutes. The third stage runs API tests — under 3 minutes. The final stage runs E2E browser tests — the slowest but most comprehensive. Each stage gates the next: a unit test failure prevents API tests from running, saving CI resources and giving the developer faster feedback on what broke. This staged approach typically delivers the first failure feedback in under 60 seconds.' },
            { heading: 'GitHub Actions for test automation', body: 'GitHub Actions provides native integration with repository events — pull requests, pushes and scheduled runs. A test workflow uses a matrix strategy to run tests across multiple browser and OS combinations: { browser: [chromium, firefox, webkit], os: [ubuntu-latest, windows-latest] }. Playwright and Cypress have official GitHub Actions that cache browser binaries and dependencies. Service containers in GitHub Actions can spin up databases, mock servers or application instances for integration tests. Artifact upload steps preserve screenshots, videos and HTML reports from failed runs.' },
            { heading: 'Containerized test environments', body: 'Docker containers guarantee that the test environment matches between local development and CI. A Dockerfile installs the application, browser drivers and test runner with pinned versions. Docker Compose orchestrates multi-service test environments — application under test, API mocks, database and message queue — with a single docker-compose up command. Selenium Grid in Docker runs browser containers that scale horizontally, eliminating the single-machine bottleneck. This approach eliminates the "works on my machine" class of test failures entirely.' }
          ],
          links: [
            { title: 'Playwright CI/CD Integration', url: 'https://playwright.dev/docs/ci', sourceName: 'Playwright Documentation', resourceType: 'guide', relationship: 'Playwright CI/CD guide covering GitHub Actions, Jenkins, Azure Pipelines and Docker configuration.' },
            { title: 'Cypress CI/CD', url: 'https://docs.cypress.io/guides/guides/continuous-integration', sourceName: 'Cypress Documentation', resourceType: 'guide', relationship: 'Cypress continuous integration guide covering Docker, GitHub Actions and dashboard recording.' },
            { title: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions', sourceName: 'GitHub Documentation', resourceType: 'reference', relationship: 'GitHub Actions documentation covering workflow syntax, matrix strategies and artifact management.' }
          ],
          quiz: {
            prompt: 'A GitHub Actions workflow runs 200 Cypress tests sequentially and takes 25 minutes. The team wants to reduce this to under 10 minutes. Which approach provides the most significant improvement?',
            options: [
              'Upgrade the CI runner to a faster CPU',
              'Use Cypress Dashboard parallelization to distribute tests across multiple machines',
              'Reduce the number of test assertions per test',
              'Disable video recording to save processing time'
            ],
            answerIndex: 1,
            explanation: 'Cypress parallelization splits tests across multiple CI machines using intelligent load balancing. With 4 parallel machines, a 25-minute suite can complete in approximately 7 minutes. CPU upgrades provide marginal gains; parallelization provides proportional scaling.'
          }
        },
        {
          slug: 'parallel-execution-cloud-grid',
          title: 'Parallel Execution & Cloud Testing Grids',
          minutes: 30,
          objectives: [
            'Configure Selenium Grid and Selenium Grid 4 for local parallel browser execution across multiple nodes',
            'Integrate with cloud testing platforms — BrowserStack, Sauce Labs or LambdaTest — for cross-browser matrix coverage',
            'Optimize test distribution strategies to minimize total execution time and resource utilization'
          ],
          sections: [
            { heading: 'Selenium Grid architecture', body: 'Selenium Grid 4 introduces a modern architecture with a Router, Distributor, Session Queue and Node components. The Router accepts test requests and routes them to available nodes. The Distributor manages node registration and capability matching. Nodes register their browser capabilities — Chrome 120 on Linux, Firefox 119 on Windows — and the Grid matches incoming test requests to matching nodes. Docker images for each browser node enable rapid scaling: docker-compose up --scale chrome=4 spins up four parallel Chrome instances. Grid 4 also supports Kubernetes deployment for production-grade parallel execution.' },
            { heading: 'Cloud testing platforms', body: 'Cloud testing platforms eliminate the infrastructure burden of maintaining browser farms. BrowserStack and Sauce Labs provide thousands of real devices and browsers in the cloud, accessible via remote WebDriver URLs. Tests connect by setting the remote address and desired capabilities — no local browser installation required. These platforms provide video recording, network logs, console logs and visual diffs for every test run. The trade-off is cost per minute versus maintenance cost of self-hosted grids — for teams with fewer than 500 test executions per day, cloud platforms are typically more economical.' },
            { heading: 'Test distribution and load balancing', body: 'Naive parallel execution — splitting tests into equal-sized batches by file — leads to poor load balancing when test files vary in execution time. Smart balancing uses historical timing data to distribute tests evenly across workers. Playwright sharding uses --shard=1/4 to distribute tests across four machines. Cypress parallelization uses the Cypress Cloud service to rebalance tests mid-run when faster tests finish early. For custom grids, implementing a work-stealing queue where idle workers pull tests from busy workers achieves near-optimal utilization.' }
          ],
          links: [
            { title: 'Selenium Grid 4 Documentation', url: 'https://www.selenium.dev/documentation/grid/', sourceName: 'Selenium Documentation', resourceType: 'reference', relationship: 'Selenium Grid 4 documentation covering architecture, Docker deployment and Kubernetes scaling.' },
            { title: 'Playwright Sharding', url: 'https://playwright.dev/docs/test-sharding', sourceName: 'Playwright Documentation', resourceType: 'guide', relationship: 'Playwright documentation on test sharding for parallel execution across multiple machines.' },
            { title: 'GitHub — SeleniumHQ/selenium-grid', url: 'https://github.com/SeleniumHQ/docker-selenium', sourceName: 'GitHub Documentation', resourceType: 'reference', relationship: 'Docker Selenium repository with official images for Grid 4 nodes and hub configuration.' }
          ],
          quiz: {
            prompt: 'A Selenium Grid has two Chrome nodes and one Firefox node. Three test sessions are requested simultaneously with Chrome 120 capability. What happens to the third request?',
            options: [
              'It fails immediately because all Chrome nodes are occupied',
              'It waits in the session queue until a Chrome node becomes available',
              'It runs on Firefox because that is the only available node',
              'It is rejected by the Distributor because capability matching is strict'
            ],
            answerIndex: 1,
            explanation: 'Selenium Grid 4 queues session requests when no matching node is immediately available. The session queue holds the request until a matching Chrome node finishes its current session and becomes available, at which point the Distributor assigns the waiting request.'
          }
        },
        {
          slug: 'test-reporting-and-metrics',
          title: 'Test Reporting, Metrics & Quality Gates',
          minutes: 25,
          objectives: [
            'Configure Allure or ReportPortal to generate comprehensive test reports with trends, history and failure analysis',
            'Define quality gates that prevent deployments when test coverage, flakiness or failure thresholds are breached',
            'Track automation metrics — pass rate, flake rate, execution time and defect detection ratio — to drive improvement'
          ],
          sections: [
            { heading: 'Comprehensive test reporting', body: 'Raw pass-fail output is insufficient for enterprise test suites. Allure Report generates rich HTML reports with test categorization by severity, duration, tags and defects. Each failed test links to its screenshot, stack trace and retry history. Trend charts show pass rate evolution across builds, revealing degradation patterns before they reach critical levels. ReportPortal provides a self-hosted alternative with AI-powered failure analysis that clusters similar failures and suggests root causes. These tools transform test output from a binary gate into an actionable diagnostic resource.' },
            { heading: 'Quality gates in CI/CD', body: 'Quality gates are automated checkpoints that block deployment when defined thresholds are breached. A minimum pass rate gate — 95% of tests must pass — prevents deployments with known regressions. A flakiness gate — no more than 2% of tests may be flaky — prevents teams from ignoring unreliable tests. A code coverage gate — minimum 80% line coverage — ensures new code is tested. A visual regression gate blocks deployments with pixel-diff thresholds exceeded. These gates are configured in the CI pipeline and fail the build immediately, providing a hard safety net that prevents quality erosion.' },
            { heading: 'Metrics for continuous improvement', body: 'Automation maturity is measured through metrics that reveal both current quality and improvement trajectory. Pass rate (tests passing on first run) indicates overall suite health — below 95% signals maintenance debt. Flake rate (tests that fail intermittently) directly impacts developer trust — flaky tests are the fastest path to test suite abandonment. Mean time to feedback (time from commit to test result) determines whether developers context-switch before getting results. Defect detection ratio (bugs found by automation versus manual testing) measures the suite\'s effectiveness at catching real defects.' }
          ],
          links: [
            { title: 'Playwright HTML Reporter', url: 'https://playwright.dev/docs/test-reporters', sourceName: 'Playwright Documentation', resourceType: 'reference', relationship: 'Playwright test reporter options including HTML, JSON, JUnit and Allure integration.' },
            { title: 'Cypress Dashboard Reporting', url: 'https://docs.cypress.io/guides/dashboard/overview', sourceName: 'Cypress Documentation', resourceType: 'guide', relationship: 'Cypress Dashboard documentation covering test results, flake detection and parallelization analytics.' },
            { title: 'GitHub — Allure Framework', url: 'https://github.com/allure-framework', sourceName: 'GitHub Documentation', resourceType: 'reference', relationship: 'Allure Report framework repositories for generating rich test reports across multiple languages and frameworks.' }
          ],
          quiz: {
            prompt: 'A test suite shows 98% pass rate but developers report that they ignore test failures because "they are always flaky." What metric should you prioritize tracking and what quality gate should you implement?',
            options: [
              'Increase the pass rate threshold to 99% to force more reliable tests',
              'Track the flakiness rate per test file and implement a maximum 2% flakiness gate that blocks deployment',
              'Remove all failing tests to restore a 100% pass rate',
              'Switch from pass rate to test execution time as the primary metric'
            ],
            answerIndex: 1,
            explanation: 'Flakiness is the primary destroyer of test suite trust. A flakiness gate — tracking how often each test fails on retry — identifies and blocks unreliable tests. Teams must fix or quarantine flaky tests before deploying, forcing the reliability investment that restores developer confidence.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'End-to-End Test Automation Framework & CI/CD Pipeline',
    coverage: [
      'Selenium WebDriver & Cross-Browser Test Scripts',
      'Playwright & Cypress E2E Test Implementation',
      'Appium Mobile Test Setup & Execution',
      'Page Object Model & Framework Architecture',
      'CI/CD Pipeline with Parallel Execution & Reporting'
    ],
    brief:
      'You are the automation tester at QualiForge Solutions assigned to build a complete test automation framework for a new e-commerce platform launching on web and mobile. The platform uses a React frontend, a Node.js API and a React Native mobile app. Create a maintainable test framework with page objects, implement tests across Selenium, Playwright and Cypress for the web app, set up Appium tests for the mobile app and wire everything into a GitHub Actions CI/CD pipeline with parallel execution and comprehensive reporting.',
    requirements: [
      'Design a Page Object Model framework structure with reusable components, test data factories and configuration management',
      'Write Selenium WebDriver tests for critical user journeys — login, search, add to cart and checkout — with cross-browser support',
      'Implement Playwright tests with network mocking for the product catalog API and visual regression testing for key pages',
      'Create Cypress E2E tests for the checkout flow with custom commands and session caching for authentication',
      'Set up Appium tests for the React Native mobile app covering login, product browsing and order placement on Android',
      'Configure a GitHub Actions pipeline with matrix strategy running all test suites in parallel across browsers and environments',
      'Integrate Allure reporting with trend analysis, flakiness tracking and failed test artifact collection',
      'Define quality gates that block deployment when pass rate drops below 95% or flakiness exceeds 2%'
    ],
    expectedOutput:
      'A complete test automation framework repository with Page Object classes, test suites for Selenium/Playwright/Cypress/Appium, GitHub Actions workflow configuration, Allure reporting integration, quality gate definitions and documentation explaining framework architecture and contribution guidelines.',
    rubric: [
      { skill: 'Framework Architecture', weight: 20, criteria: 'Page Object Model is correctly implemented with separation of concerns, test data factories provide reusable data and configuration management handles multiple environments' },
      { skill: 'Selenium & Playwright Tests', weight: 20, criteria: 'Selenium tests use proper waits and locators, Playwright tests leverage auto-waiting and network mocking, both suites are stable and repeatable' },
      { skill: 'Cypress E2E Testing', weight: 15, criteria: 'Cypress tests use custom commands, session caching and intercept for API mocking with time-travel debugging artifacts on failure' },
      { skill: 'Appium Mobile Tests', weight: 15, criteria: 'Appium tests use accessibility ID locators, handle mobile gestures correctly and execute on both Android emulator and real device' },
      { skill: 'CI/CD Pipeline', weight: 15, criteria: 'GitHub Actions workflow runs tests in parallel with matrix strategy, browser binaries are cached and test artifacts are preserved on failure' },
      { skill: 'Reporting & Quality Gates', weight: 15, criteria: 'Allure reports include trend charts and failure categorization, quality gates enforce pass rate and flakiness thresholds' }
    ],
    passScore: 72
  },

  assignments: [
    {
      title: 'Cross-Browser Test Automation Suite',
      stage: 'Foundation',
      objective: 'Build a Selenium WebDriver test suite that verifies critical user journeys across Chrome, Firefox and Edge with proper waits, assertions and reporting.',
      requirements: [
        'Implement page objects for the login page, dashboard and settings page with encapsulated element locators',
        'Write end-to-end tests for login, navigation and settings update flows using explicit waits',
        'Configure the test suite to run across Chrome, Firefox and Edge using a test runner with parallel execution',
        'Implement screenshot capture on test failure and integrate with a basic HTML report',
        'Create a test data factory that generates unique user credentials for each test run'
      ],
      skillsEvaluated: ['Selenium WebDriver', 'Page Object Model', 'Cross-Browser Testing', 'Test Reporting'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the complete test framework with page objects, test scripts, configuration files, test data factory and a sample HTML report from a cross-browser run.',
        textLabel: 'Selenium cross-browser test suite documentation',
        minTextLength: 1200,
        linkLabels: ['Framework repository and HTML report output']
      }
    },
    {
      title: 'Playwright API and Visual Regression Testing',
      stage: 'Intermediate',
      objective: 'Build a Playwright test project that combines API testing with visual regression testing, including network mocking and screenshot comparison.',
      requirements: [
        'Write API tests for a RESTful product catalog that validate status codes, response schemas and business logic',
        'Implement network mocking to simulate API error scenarios — 500, timeout, empty responses — and verify frontend handling',
        'Create visual regression tests that capture and compare screenshots of key pages across viewport sizes',
        'Configure Playwright to run across Chromium, Firefox and WebKit with a project-based configuration',
        'Set up GitHub Actions to run the test suite on every pull request with artifact upload for failure screenshots'
      ],
      skillsEvaluated: ['Playwright', 'API Testing', 'Visual Regression', 'Network Mocking'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the Playwright project with API tests, visual regression baseline screenshots, GitHub Actions workflow and a summary of visual diff results.',
        textLabel: 'Playwright API and visual regression test report',
        minTextLength: 1200,
        linkLabels: ['Playwright project, baseline screenshots and CI workflow']
      }
    },
    {
      title: 'Enterprise Test Framework with CI/CD and Quality Gates',
      stage: 'Advanced',
      objective: 'Design and implement a complete enterprise-grade test automation framework with multi-framework integration, parallel CI execution, reporting dashboards and enforced quality gates.',
      requirements: [
        'Architect a monorepo test framework that organizes Selenium, Playwright, Cypress and Appium tests with shared utilities',
        'Implement a configuration system that supports multiple environments — dev, staging, production — through environment variables',
        'Configure GitHub Actions with matrix strategy for parallel execution across browser-engine and OS combinations',
        'Integrate Allure reporting with historical trend data, test categorization by severity and flakiness analysis',
        'Implement quality gates in CI that block deployment on below-threshold pass rates and excessive flakiness',
        'Document the framework architecture with contribution guidelines for new test authors'
      ],
      skillsEvaluated: ['Framework Architecture', 'Multi-Framework Integration', 'CI/CD Pipeline Design', 'Quality Engineering'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the complete enterprise framework with architecture documentation, CI pipeline configuration, Allure reporting setup, quality gate definitions and a guide for adding new tests.',
        textLabel: 'Enterprise test framework architecture and implementation report',
        minTextLength: 1500,
        linkLabels: ['Framework repository, CI configuration and Allure report sample']
      }
    }
  ],

  simTasks: [
    {
      title: 'Production E2E test suite fails after deployment',
      context: 'A new version of the e-commerce frontend was deployed to staging last night. This morning, the Selenium E2E regression suite ran in CI and 35 out of 200 tests failed — all in the checkout flow. The failures show "element not interactable" errors on the payment form. The deployment included a UI library update that changed the payment form component structure. The release is scheduled for tomorrow and marketing has a launch campaign tied to it.',
      requirements: [
        'Analyze the failed test screenshots and DOM snapshots to identify what changed in the payment form component',
        'Update the page object locators for the payment form to match the new component structure',
        'Run the 35 failing tests locally to verify the locator fixes resolve all failures',
        'Check for additional tests that may be affected by the same UI library change across other flows',
        'Provide a summary of root cause, fixes applied and confidence level for the release'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Root cause identified as UI library component refactor, all 35 locator-based failures resolved, additional impact areas checked, release confidence assessment documented.',
      skills: ['Selenium WebDriver', 'Page Object Model', 'CI Failure Diagnosis', 'Release Risk Assessment']
    },
    {
      title: 'Mobile test suite showing 40% flakiness rate',
      context: 'The Appium test suite for the React Native mobile app has a 40% flakiness rate, primarily in tests that involve scrolling through product feeds and loading images. The team has been manually rerunning failed tests, which wastes CI time and erodes trust in the automation. The product manager is questioning whether the mobile automation investment is worthwhile. You need to stabilize the suite within the sprint.',
      requirements: [
        'Analyze the last 50 test runs to identify the most frequent failure patterns and their root causes',
        'Replace sleep-based waits with Appium explicit waits for element visibility and scroll position',
        'Implement scroll-and-wait utilities that handle dynamic content loading and image rendering delays',
        'Add retry logic with diagnostic logging for tests that fail due to environment instability',
        'Present a before-and-after flakiness comparison to the product manager with a recommendation for continued investment'
      ],
      priority: 'high',
      dueDayOffset: 3,
      expectedOutput: 'Flakiness analysis completed, root causes identified and fixed, flakiness rate reduced below 10%, product manager presentation with metrics.',
      skills: ['Appium', 'Test Flakiness Analysis', 'Wait Strategy Optimization', 'Stakeholder Communication']
    },
    {
      title: 'CI pipeline test execution time exceeds 30 minutes',
      context: 'The GitHub Actions CI pipeline for the web application now takes 32 minutes to complete. Developers are complaining that they wait too long for merge feedback and have started skipping test runs locally. The pipeline runs Selenium tests (12 minutes), Playwright tests (10 minutes) and Cypress tests (10 minutes) sequentially on a single machine. The team has budget for up to 4 parallel CI runners.',
      requirements: [
        'Analyze the current pipeline to identify which test suites can be parallelized and which have dependencies',
        'Restructure the GitHub Actions workflow to use matrix strategy for parallel execution across browsers',
        'Implement test sharding to distribute the largest test suites across multiple runners',
        'Configure browser binary caching and dependency caching to reduce cold-start overhead',
        'Measure and document the new execution time with a comparison to the baseline'
      ],
      priority: 'normal',
      dueDayOffset: 5,
      expectedOutput: 'Pipeline restructured with parallel execution, test sharding implemented, execution time reduced below 12 minutes, before-and-after performance comparison documented.',
      skills: ['GitHub Actions', 'Parallel Execution', 'CI/CD Optimization', 'Performance Analysis']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Priya Sharma',
      personaRole: 'QA Lead',
      situation: 'The QA lead wants to transition the team from manual regression testing to a fully automated suite but is concerned about the learning curve and sprint velocity impact during the transition.',
      openingMessage:
        'We have been doing manual regression testing for three years and it takes two days every sprint. I want to automate the critical regression paths, but I am worried about the learning curve for the team. Some testers have never written code. How do we make this transition without derailing our current sprint commitments?',
      expectedPoints: [
        'Proposes a phased approach starting with the most repetitive and highest-value regression tests',
        'Recommends pairing programmers with non-coding testers to build skills gradually',
        'Suggests allocating 20% of sprint capacity to automation work initially, increasing as velocity improves',
        'Identifies quick-win automation targets that demonstrate value early and build team confidence'
      ]
    },
    {
      kind: 'team',
      personaName: 'Alex Chen',
      personaRole: 'Senior Developer',
      situation: 'A developer argues that the team should skip writing E2E tests for a new feature because it "will be covered by manual QA" and the deadline is tight.',
      openingMessage:
        'We are two sprints behind on the feature roadmap and writing E2E tests for the new payment integration will add at least three days. The QA team will manually test it before release. Can we skip the automation and add it later after launch?',
      expectedPoints: [
        'Acknowledges the legitimate deadline pressure while explaining the long-term cost of deferring automation',
        'Proposes a minimum automation scope that covers the critical payment path without full regression coverage',
        'Explains that post-launch automation is significantly harder because context is lost and code is moving',
        'Suggests a risk-based approach that prioritizes the highest-impact test cases for the deadline'
      ]
    },
    {
      kind: 'client',
      personaName: 'David Park',
      personaRole: 'VP of Engineering, FinPay Solutions',
      situation: 'The client is evaluating whether to invest in building an in-house test automation team or contract QualiForge to build and maintain the automation framework.',
      openingMessage:
        'We currently have no test automation and our manual testing cycle takes a full week before every release. We need to decide between hiring three automation engineers internally or engaging QualiForge to build and maintain the framework. Which approach gives us faster time-to-value?',
      expectedPoints: [
        'Evaluates the total cost of each option including hiring time, ramp-up period and ongoing maintenance',
        'Proposes a hybrid approach: QualiForge builds the initial framework while training internal engineers to maintain it',
        'Estimates timeline for each option with milestones for first automated tests, full regression coverage and self-sufficiency',
          'Addresses scalability: what happens as the application grows and the test suite needs to scale'
      ]
    },
    {
      kind: 'client',
      personaName: 'Maria Gonzalez',
      personaRole: 'CTO, MedConnect Health',
      situation: 'The CTO needs to justify the test automation budget to the board by connecting automation investment to measurable business outcomes like reduced defect escape rate and faster release cycles.',
      openingMessage:
        'Our board approved a budget for test automation but wants to see measurable ROI within six months. They want to know exactly how many defects we will prevent, how much faster we will release and what the dollar value is. How do I present this to them?',
      expectedPoints: [
        'Establishes baseline metrics: current release cycle time, defect escape rate and cost per defect in production',
        'Sets specific, measurable automation targets aligned with the board\'s six-month timeline',
        'Calculates cost avoidance from preventing production defects versus the cost of fixing them post-release',
        'Proposes a monthly dashboard that tracks automation coverage, defect trends and release frequency'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'The CI pipeline starts failing intermittently because the Chrome browser driver version installed in the Docker image no longer matches the Chrome version available in the package repository. Approximately 30% of pipeline runs fail with a session creation error, and the team has been rerunning failed jobs to get green builds.',
      requiredActions: [
        { action: 'Pin the Chrome driver version in the Dockerfile to match the specific Chrome version installed', good: true, note: 'Pinning the driver version eliminates the source of version drift and produces deterministic CI runs.' },
        { action: 'Add a browser version check step at the start of the pipeline that fails fast with a clear error message', good: true, note: 'Early failure with a clear message prevents wasted CI minutes running tests with incompatible drivers.' },
        { action: 'Investigate whether the Docker base image update cadence can be automated with a dependency bot', good: true, note: 'Automated dependency updates with a test verification step prevent version drift from accumulating silently.' },
        { action: 'Document the Chrome and ChromeDriver version matrix for the team to reference during local development', good: true, note: 'A version matrix prevents local development mismatches and onboards new team members faster.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'The product team decides to launch the mobile app on iOS alongside Android two months earlier than planned. The current Appium test suite covers Android only, and the team needs to extend coverage to iOS while maintaining existing Android tests.',
      requiredActions: [
        { action: 'Audit the existing Android test suite to identify tests that use Android-specific locators or gestures', good: true, note: 'Platform-specific code must be identified before cross-platform tests can be designed.' },
        { action: 'Refactor platform-specific test logic into driver-specific implementations behind a common interface', good: true, note: 'Abstraction layers allow the same test logic to run on both platforms with platform-specific implementations.' },
        { action: 'Set up an iOS CI environment with Xcode, simulators and the XCUITest driver in parallel with Android CI', good: true, note: 'Parallel CI environments enable simultaneous Android and iOS test execution without blocking each other.' },
        { action: 'Defer all iOS testing until the Android suite is fully stable to avoid spreading effort too thin', good: false, note: 'The iOS launch is two months away. Delaying iOS test development until Android is stable will miss the launch deadline.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the differences between Selenium WebDriver, Playwright and Cypress. In what scenarios would you choose each tool for a test automation project?',
      guidancePoints: [
        'Selenium uses the WebDriver protocol and supports Java, Python, C# and JavaScript with the broadest browser and language support',
        'Playwright provides auto-waiting, network interception and cross-browser testing with a modern API and independent browser binaries',
        'Cypress executes inside the browser with time-travel debugging, but is limited to JavaScript and does not support multi-tab or multi-origin scenarios',
        'Choose Selenium for multi-language teams with legacy codebases, Playwright for modern web apps needing network control and Cypress for JavaScript teams wanting fast feedback',
        'Consider ecosystem maturity, community support and integration with existing CI infrastructure when making the final choice'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'How do you design a test automation framework from scratch for a new web application? Walk through your architectural decisions.',
      guidancePoints: [
        'Start with the test pyramid: determine the ratio of unit, integration and E2E tests based on the application architecture',
        'Choose the Page Object Model for E2E tests and define a clear directory structure for pages, components, utilities and test data',
        'Select a test runner that matches the team\'s language and integrates with the CI pipeline',
        'Design a configuration system that supports multiple environments through environment variables, not code changes',
        'Plan for parallel execution from day one — choose a test runner and framework that support sharding and concurrent execution'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'Your test suite has a 95% pass rate but the team reports that developers have stopped paying attention to failures because they assume they are flaky. How do you diagnose and fix this problem?',
      guidancePoints: [
        'Collect data on which specific tests fail intermittently and analyze the failure patterns for correlation with timing, data or environment',
        'Implement retry tracking that distinguishes first-run failures from retry-passed tests to quantify actual flakiness',
        'Quarantine identified flaky tests into a separate suite that runs after the stable suite, preventing them from blocking deploys',
        'Address root causes: race conditions, shared test data, network dependencies and missing waits are the most common sources',
        'Set a quality gate that requires flakiness rate below 2% before any new test is merged into the stable suite'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A Playwright visual regression test shows a pixel difference in a button color after a dependency update. The button still functions correctly and the color change is intentional. How do you handle this situation?',
      guidancePoints: [
        'Verify with the developer that the color change is intentional and document the expected new appearance',
        'Update the baseline screenshot to reflect the intentional change and commit it to the repository',
        'Review the visual regression threshold configuration to ensure it distinguishes meaningful changes from anti-aliasing noise',
        'Consider implementing component-level visual tests that isolate individual UI components from page-level layout changes',
        'Document the baseline update process so other team members can handle similar situations independently'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'The development team wants to release a feature without waiting for the full E2E test suite to complete because "the unit tests passed." How do you argue for test automation without alienating the team?',
      guidancePoints: [
        'Acknowledge that unit tests provide valuable confidence at the code level and that the team has made good progress',
        'Explain what E2E tests catch that unit tests cannot: integration failures, environment issues and user-facing regressions',
        'Propose a risk-based shortcut: run only the critical path smoke tests — a subset that completes in under 5 minutes',
        'Agree on a definition of done that includes E2E verification for production, even if the feature ships to staging first',
        'Track and share data on defects caught by E2E tests that unit tests missed to build the evidence-based case over time'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you decide which tests to automate first when building a test automation suite from scratch for an existing application with no automation?',
      guidancePoints: [
        'Start with the highest-traffic, highest-risk user journeys that generate the most defects or support tickets',
        'Automate smoke tests that verify core functionality — login, critical path, payment — to provide immediate regression safety',
        'Prioritize tests that run on every build and have the highest maintenance burden if run manually',
        'Avoid automating rarely-used features, exploratory test scenarios and tests that depend on external third-party services',
        'Measure the time saved per sprint by automating each test to prioritize the next batch based on ROI data'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain to a non-technical product owner why the test automation suite takes 20 minutes to run and why this is actually a significant improvement over the previous manual process.',
      guidancePoints: [
        'Compare the current 20-minute automated run to the previous 2-day manual regression cycle — a 99% time reduction',
        'Explain that the 20 minutes include tests across multiple browsers, which would require separate manual cycles for each',
        'Highlight that the automated suite runs on every code change, not just before releases, catching issues much earlier',
        'Show the cumulative time savings over a quarter: hours of manual testing replaced by minutes of automated execution',
        'Offer to create a trimmed smoke suite that runs in under 5 minutes for faster feedback on individual commits'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'You discover a critical regression that escaped the test suite and reached production. How do you communicate this to the team and what process improvements do you propose?',
      guidancePoints: [
        'Take ownership of the gap in the automation suite without assigning blame to individual developers or testers',
        'Present the post-incident analysis focusing on what the test suite was missing and why, not who is responsible',
        'Propose specific improvements: new test cases that would have caught this regression, updated smoke suite and monitoring',
        'Recommend a brief blameless retrospective to identify systemic process gaps beyond just the test suite',
        'Set a follow-up timeline for implementing the proposed improvements and measure their effectiveness'
      ]
    }

  ]

}
