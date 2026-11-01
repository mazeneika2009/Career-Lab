import type { CareerDef } from '../framework.js'

export const qaEngineer: CareerDef = {
  slug: 'qa-engineer',
  name: 'QA Engineer',
  category: 'Quality',
  order: 37,
  description:
    'Guards product quality — test planning, cases, bug reports plus API testing and browser automation with modern tools.',
  difficulty: 'Beginner-friendly',
  pathSummary:
    'Testing fundamentals & QA process → test case design with ISTQB techniques → API testing with Postman → browser automation with Selenium, Playwright & Cypress.',
  mainSkills: [
    'Test Case Design & Execution',
    'Bug Reporting & Defect Management',
    'API Testing with Postman',
    'Browser Automation with Selenium',
    'Playwright End-to-End Testing',
    'Cypress Component Testing',
    'Test Planning & Strategy',
    'ISTQB Foundation Knowledge'
  ],
  sourcePlatforms: [
    'ISTQB',
    'Selenium Documentation',
    'Playwright Documentation',
    'Cypress Documentation',
    'Postman Documentation'
  ],
  companyName: 'Apex Quality Labs',
  roleTitle: 'QA Engineer',

  chapters: [
    {
      slug: 'testing-fundamentals-and-qa-process',
      stage: 'Beginner',
      title: 'Testing Fundamentals & QA Process',
      description: 'The core principles of software testing, QA lifecycle processes, and how to write effective bug reports that accelerate defect resolution.',
      topics: [
        {
          slug: 'software-testing-principles',
          title: 'Software Testing Principles',
          minutes: 25,
          objectives: [
            'Explain the seven fundamental testing principles defined by ISTQB',
            'Differentiate between verification and validation in a software development context',
            'Identify where testing activities fit within the software development lifecycle'
          ],
          sections: [
            { heading: 'The seven testing principles', body: 'ISTQB defines seven foundational principles: testing shows the presence of defects (not absence), exhaustive testing is impossible, early testing saves cost, defect clustering follows the Pareto principle, the pesticide paradox means tests must evolve, testing is context-dependent, and the absence-of-errors fallacy means finding no defects does not prove the software works. Understanding these principles shapes every testing decision.' },
            { heading: 'Verification versus validation', body: 'Verification confirms that the software is being built correctly by checking it against requirements and design documents. Validation confirms that the correct software is being built by testing whether it meets user needs in real scenarios. Verification uses reviews, inspections and static analysis. Validation uses functional testing, integration testing and user acceptance testing. Both are essential for comprehensive quality assurance.' },
            { heading: 'Testing in the development lifecycle', body: 'Testing is not a phase that happens after development — it is continuous. Requirements reviews catch ambiguity early. Unit testing during coding verifies individual components. Integration testing checks module interactions. System testing validates the complete application. Acceptance testing confirms business requirements are met. Each level catches different defect types at different costs.' }
          ],
          links: [
            { title: 'ISTQB Foundation Level Syllabus', url: 'https://www.istqb.org/certifications/foundation-level/', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'The definitive ISTQB document covering all foundational testing concepts, terminology and principles.' },
            { title: 'ISTQB — Testing Principles', url: 'https://www.istqb.org/certifications/foundation-level-syllabus-2018/testing-principles.html', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'Detailed explanation of the seven ISTQB testing principles with practical examples.' },
            { title: 'ISTQB — Testing in the Software Development Lifecycle', url: 'https://www.istqb.org/certifications/foundation-level-syllabus-2018/the-software-development-processes.html', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'ISTQB guidance on how testing integrates across different software development models.' }
          ],
          quiz: {
            prompt: 'According to the ISTQB pesticide paradox, what happens when the same tests are repeated multiple times?',
            options: [
              'Defects are guaranteed to be found eventually',
              'The tests become less effective at finding new defects over time',
              'The software becomes more stable with each test run',
              'The number of test cases should always increase'
            ],
            answerIndex: 1,
            explanation: 'The pesticide paradox states that if the same tests are repeated, they will eventually stop finding new defects. Test cases must be regularly reviewed, modified and new tests added to find different types of defects.'
          }
        },
        {
          slug: 'qa-process-and-lifecycle',
          title: 'QA Process & Lifecycle',
          minutes: 28,
          objectives: [
            'Describe the QA lifecycle from test planning through test closure',
            'Identify the key activities and deliverables in each QA phase',
            'Understand the difference between QA, QC and testing'
          ],
          sections: [
            { heading: 'QA versus QC versus testing', body: 'Quality Assurance is a process-oriented activity focused on preventing defects by improving development processes. Quality Control is product-oriented and focuses on identifying defects in the finished product. Testing is the execution of software to find defects. QA is proactive (process improvement), QC is detective (defect detection) and testing is the mechanism that enables both.' },
            { heading: 'The test process lifecycle', body: 'The ISTQB test process has six phases: planning establishes scope and resources; analysis and specification derives test conditions from requirements; implementation creates test cases and procedures; execution runs tests and records results; evaluation determines whether exit criteria are met; and closure produces the final test report and lessons learned. Each phase has specific inputs, activities and outputs.' },
            { heading: 'Test documentation essentials', body: 'Test documentation provides the structure for consistent, repeatable testing. The test plan defines scope, approach and resources. Test cases describe what to test, how to test and expected results. Test procedures specify the step-by-step execution process. The test summary report communicates results to stakeholders. Good documentation enables traceability from requirements to test execution to defect discovery.' }
          ],
          links: [
            { title: 'ISTQB — Test Process', url: 'https://www.istqb.org/certifications/foundation-level-syllabus-2018/the-test-process.html', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'ISTQB definition of the test process lifecycle including planning, design, execution and closure.' },
            { title: 'ISTQB — Test Documentation', url: 'https://www.istqb.org/certifications/foundation-level-syllabus-2018/test-documentation.html', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'ISTQB guidance on test plan, test case and test report documentation standards.' },
            { title: 'ISTQB — Testing Throughout the Lifecycle', url: 'https://www.istqb.org/certifications/foundation-level-syllabus-2018/testing-through-the-software-development-lifecycle.html', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'ISTQB overview of test levels, types and how testing activities map to development phases.' }
          ],
          quiz: {
            prompt: 'A QA engineer reviews the development process to identify potential quality issues before coding begins, while a QC engineer runs tests on the completed build to find defects. Which correctly describes their roles?',
            options: [
              'The QA engineer is performing testing, and the QC engineer is performing inspection',
              'The QA engineer is performing quality assurance, and the QC engineer is performing quality control',
              'Both are performing the same function with different titles',
              'The QC engineer is performing quality assurance, and the QA engineer is performing quality control'
            ],
            answerIndex: 1,
            explanation: 'QA is process-oriented and proactive (preventing defects through process improvement), while QC is product-oriented and detective (finding defects in the finished product through testing and inspection).'
          }
        },
        {
          slug: 'bug-reporting-and-defect-management',
          title: 'Bug Reporting & Defect Management',
          minutes: 30,
          objectives: [
            'Write clear, reproducible bug reports with complete reproduction steps',
            'Classify defect severity and priority correctly for effective triage',
            'Use a defect tracking workflow from discovery through resolution and verification'
          ],
          sections: [
            { heading: 'Anatomy of an effective bug report', body: 'A good bug report contains a descriptive title that identifies the component and symptom, a clear description of the expected versus actual behavior, numbered step-by-step reproduction instructions, the test environment details (OS, browser, version), supporting evidence (screenshots, logs, API responses) and an assessment of severity and priority. Ambiguous reports like "it does not work" waste developer time and delay resolution.' },
            { heading: 'Severity and priority classification', body: 'Severity measures the technical impact of a defect: critical means data loss or system crash, major means a core feature fails with no workaround, minor means a non-critical feature fails, and trivial means a cosmetic issue. Priority measures business urgency: P1 requires immediate fix, P2 should be in the next sprint, P3 can wait for a scheduled release. A critical severity bug on a rarely-used feature may have lower priority than a major bug on the checkout flow.' },
            { heading: 'Defect lifecycle management', body: 'A defect moves through defined states: new (just reported), assigned (developer is responsible), in progress (being fixed), fixed (code committed), ready for test (awaiting verification), verified (QA confirms the fix), closed (resolved and confirmed). Reopened means the fix was insufficient. Each state transition should be documented with the person responsible, timestamp and notes. This workflow ensures no defect falls through the cracks.' }
          ],
          links: [
            { title: 'ISTQB — Test Reporting', url: 'https://www.istqb.org/certifications/foundation-level-syllabus-2018/test-reporting.html', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'ISTQB guidance on defect reporting, severity classification and test summary documentation.' },
            { title: 'ISTQB — Test Management', url: 'https://www.istqb.org/certifications/foundation-level-syllabus-2018/test-management.html', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'ISTQB overview of defect management processes and defect lifecycle workflows.' },
            { title: 'ISTQB — Static Testing Techniques', url: 'https://www.istqb.org/certifications/foundation-level-syllabus-2018/static-testing.html', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'ISTQB guidance on static testing methods including defect classification and reporting standards.' }
          ],
          quiz: {
            prompt: 'A bug causes the application to crash every time a user tries to export a report, but the export feature is used by only 5% of users. How should severity and priority be classified?',
            options: [
              'Low severity and low priority because few users are affected',
              'High severity (crash) but medium priority because only a small percentage of users use the feature',
              'High severity and high priority because the application crashes',
              'Low severity but high priority because it affects all users who try the feature'
            ],
            answerIndex: 1,
            explanation: 'Severity reflects the technical impact — a crash is always high severity regardless of how many users trigger it. Priority reflects business urgency — since only 5% of users use the export feature, it does not require an immediate hotfix but should be resolved in the next release cycle.'
          }
        }
      ]
    },
    {
      slug: 'test-design-and-case-writing',
      stage: 'Foundation',
      title: 'Test Design & Case Writing',
      description: 'Systematic test design techniques for creating thorough, maintainable test cases and building a robust test suite that covers functional and edge cases.',
      topics: [
        {
          slug: 'test-case-design-techniques',
          title: 'Test Case Design Techniques',
          minutes: 30,
          objectives: [
            'Apply equivalence partitioning to reduce redundant test cases while maintaining coverage',
            'Use boundary value analysis to identify the most defect-prone input ranges',
            'Design test cases using decision tables for complex business logic scenarios'
          ],
          sections: [
            { heading: 'Equivalence partitioning', body: 'Equivalence partitioning divides input data into groups where each member of the group is expected to behave the same way. For a field accepting ages 18-65, valid partitions are 18-65 and invalid partitions are 0-17 and 66+. Testing one value from each partition gives the same defect-detection power as testing every value, dramatically reducing test case count without sacrificing coverage.' },
            { heading: 'Boundary value analysis', body: 'Defects cluster at boundaries between equivalence partitions. If valid input is 18-65, test values 17, 18, 19 and 64, 65, 66. BVA typically finds off-by-one errors, incorrect range operators and type conversion issues. For numeric ranges, test the minimum, minimum+1, maximum-1, maximum and values just outside the valid range. For string inputs, test empty strings, single characters and the maximum length boundary.' },
            { heading: 'Decision table testing', body: 'Decision tables capture complex business rules where multiple conditions determine the expected outcome. Each column represents a rule, rows represent conditions and actions. A login scenario with conditions (username exists, password correct, account active) and actions (grant access, show error, lock account) produces a complete matrix that ensures every combination of inputs is tested. This technique prevents missing logical branches in complex conditional logic.' }
          ],
          links: [
            { title: 'ISTQB — Test Design Techniques', url: 'https://www.istqb.org/certifications/foundation-level-syllabus-2018/test-design-techniques.html', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'ISTQB comprehensive guide to test design techniques including equivalence partitioning, BVA and decision tables.' },
            { title: 'ISTQB — Test Design Techniques Explained', url: 'https://www.istqb.org/certifications/foundation-level-syllabus-2018/test-design-techniques-explained.html', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'Detailed explanation of black-box, white-box and experience-based test design techniques.' },
            { title: 'ISTQB — Coverage Criteria', url: 'https://www.istqb.org/certifications/foundation-level-syllabus-2018/test-design-techniques.html#coverage-criteria', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'ISTQB coverage criteria definitions for test design including statement, decision and equivalence partition coverage.' }
          ],
          quiz: {
            prompt: 'An input field accepts values from 1 to 1000 inclusive. Using equivalence partitioning and boundary value analysis, how many test values would you select to cover all partitions and boundaries?',
            options: [
              'Five values: 0, 1, 500, 1000, 1001',
              'Three values: 1, 500, 1000',
              'Seven values: 0, 1, 2, 500, 999, 1000, 1001',
              'Two values: 1 and 1000'
            ],
            answerIndex: 2,
            explanation: 'Equivalence partitioning identifies three partitions (invalid low: 0, valid: 1-1000, invalid high: 1001). BVA adds the boundaries: 0, 1, 2 (below, at, just above lower bound) and 999, 1000, 1001 (just below, at, above upper bound). Seven values cover all partitions and boundaries.'
          }
        },
        {
          slug: 'functional-and-regression-testing',
          title: 'Functional & Regression Testing',
          minutes: 28,
          objectives: [
            'Write functional test cases that verify requirements against implemented features',
            'Design regression test suites that protect against defects reintroduced during development',
            'Manage test case maintenance as the application evolves'
          ],
          sections: [
            { heading: 'Functional test case development', body: 'Functional test cases map directly to business requirements. Each test case traces back to a specific requirement, has clear preconditions, numbered execution steps, expected results and pass/fail criteria. A functional test case for a login feature would verify: valid credentials grant access, invalid password shows an error, locked accounts display a lockout message, and empty fields show validation messages. Coverage metrics measure how many requirements have corresponding test cases.' },
            { heading: 'Regression test strategy', body: 'Regression testing ensures that new changes do not break existing functionality. A regression test suite consists of the most critical functional test cases that run after every code change. Prioritize regression tests by: defect history (areas with frequent bugs), user impact (features with high traffic), integration complexity (components with many dependencies) and business criticality (revenue-generating flows). Automate regression tests first since they run most frequently.' },
            { heading: 'Test case maintenance', body: 'Test cases degrade over time as the application evolves. Deprecated features leave orphaned test cases, UI changes break step-by-step instructions, and new features create coverage gaps. Regular test case reviews (monthly or per release cycle) identify obsolete cases, update expected results and add new coverage. Version-controlled test cases with change history prevent knowledge loss when team members leave.' }
          ],
          links: [
            { title: 'ISTQB — Test Levels', url: 'https://www.istqb.org/certifications/foundation-level-syllabus-2018/testing-through-the-software-development-lifecycle.html', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'ISTQB definitions of functional, regression and other test types within the development lifecycle.' },
            { title: 'ISTQB — Regression Testing', url: 'https://www.istqb.org/certifications/foundation-level-syllabus-2018/testing-through-the-software-development-lifecycle.html#regression-testing', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'ISTQB guidance on regression test selection, maintenance and execution strategies.' },
            { title: 'ISTQB — Test Monitoring and Control', url: 'https://www.istqb.org/certifications/foundation-level-syllabus-2018/test-management.html#test-monitoring-control-and-progress', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'ISTQB framework for measuring test progress including test coverage and defect metrics.' }
          ],
          quiz: {
            prompt: 'After a code change to the payment module, you need to run regression tests. Which approach gives the most effective coverage with limited time?',
            options: [
              'Run all test cases from the entire test suite regardless of the change',
              'Run only the tests that cover the payment module since that is what changed',
              'Run the critical path tests for payment flows plus tests for tightly integrated modules like user authentication and order management',
              'Skip regression testing since the change was small'
            ],
            answerIndex: 2,
            explanation: 'Risk-based regression testing targets the changed component and its integration points. Payment changes affect authentication (session tokens) and order management (order creation flow), so testing those modules catches integration regressions without wasting time on unrelated areas like profile settings.'
          }
        },
        {
          slug: 'test-case-management-tools',
          title: 'Test Case Management Tools',
          minutes: 25,
          objectives: [
            'Organize test cases in a management tool with logical grouping and traceability',
            'Track test execution progress and results across multiple test cycles',
            'Generate test reports that communicate coverage and quality metrics to stakeholders'
          ],
          sections: [
            { heading: 'Organizing test suites', body: 'Test management tools like TestRail, Zephyr and qTest organize test cases into suites and folders. Structure test cases by module, feature or user journey. Tag test cases for cross-cutting concerns (smoke, regression, accessibility). Use custom fields for priority, automation status, requirements linkage and assigned tester. A well-organized test suite enables quick retrieval of relevant tests for any testing scenario.' },
            { heading: 'Test execution tracking', body: 'Test execution in management tools records which test cases ran, their pass/fail status, the tester who executed them, the build version and the execution date. Execution filters narrow the view to tests assigned to a specific tester, tests for a specific module or tests pending re-execution. Dashboards visualize progress against the plan, showing completion percentage, pass rate trends and outstanding critical failures.' },
            { heading: 'Reporting and traceability', body: 'Test management tools generate reports that communicate quality status to different audiences. Test execution reports show which tests passed and failed in a cycle. Coverage reports show which requirements have corresponding test cases. Traceability matrices map requirements to test cases to defects, proving that every requirement is tested and every defect is verified. Export these reports for sprint reviews, release gates and compliance audits.' }
          ],
          links: [
            { title: 'ISTQB — Test Management', url: 'https://www.istqb.org/certifications/foundation-level-syllabus-2018/test-management.html', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'ISTQB framework for test management including tools, metrics and reporting.' },
            { title: 'ISTQB — Test Metrics', url: 'https://www.istqb.org/certifications/foundation-level-syllabus-2018/test-management.html#test-metrics', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'ISTQB definitions of test metrics including defect detection rate, test coverage and pass rates.' },
            { title: 'ISTQB — Tool Support for Testing', url: 'https://www.istqb.org/certifications/foundation-level-syllabus-2018/tool-support-for-testing.html', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'ISTQB overview of test tool categories including test management, defect tracking and test execution tools.' }
          ],
          quiz: {
            prompt: 'You are preparing for a release and need to show the product owner that all critical user stories have been tested. Which report from the test management tool is most appropriate?',
            options: [
              'A defect report showing all open bugs',
              'A requirements traceability matrix mapping user stories to test cases and execution results',
              'A test execution timeline showing when each test was run',
              'A chart showing the total number of test cases in the suite'
            ],
            answerIndex: 1,
            explanation: 'A requirements traceability matrix directly maps each user story to its corresponding test cases and shows whether they passed or failed. This gives the product owner clear evidence that every critical story was tested, which is the information needed for a release decision.'
          }
        }
      ]
    },
    {
      slug: 'api-testing-with-postman',
      stage: 'Intermediate',
      title: 'API Testing with Postman',
      description: 'Testing REST APIs for correctness, performance and security using Postman collections, automated scripts and integration into CI/CD pipelines.',
      topics: [
        {
          slug: 'rest-api-fundamentals-for-testing',
          title: 'REST API Fundamentals for Testing',
          minutes: 30,
          objectives: [
            'Understand REST API concepts including methods, status codes, headers and authentication',
            'Construct API requests that test happy paths, error conditions and edge cases',
            'Interpret API responses to identify defects in status codes, response bodies and headers'
          ],
          sections: [
            { heading: 'HTTP methods and status codes', body: 'REST APIs use HTTP methods with specific semantics: GET retrieves resources, POST creates resources, PUT replaces resources, PATCH partially updates resources and DELETE removes resources. Status codes indicate the outcome: 2xx means success, 3xx means redirection, 4xx means client error and 5xx means server error. A tester must verify that each endpoint returns the correct status code for each method — a POST returning 200 instead of 201, or a GET returning 500 on a valid ID, are both defects.' },
            { heading: 'Request construction for test coverage', body: 'Testing API requests goes beyond the happy path. Test with missing required fields, invalid data types, boundary values, special characters and excessively long strings. Test query parameters, path parameters and request body separately and in combination. Verify that authentication is enforced by making requests without tokens. Test rate limiting, pagination parameters and filter conditions. Each variation reveals different potential defects in the API implementation.' },
            { heading: 'Response validation techniques', body: 'API response validation goes beyond checking the status code. Verify the response body contains expected fields with correct data types. Check that timestamps use ISO 8601 format. Ensure error responses include a descriptive message and error code. Validate that response headers include Content-Type, CORS headers and cache-control directives. Confirm that sensitive data (passwords, tokens, internal IDs) is not leaked in response bodies.' }
          ],
          links: [
            { title: 'Postman Learning Center — Sending Requests', url: 'https://learning.postman.com/docs/sending-requests/requests/', sourceName: 'Postman Documentation', resourceType: 'guide', relationship: 'Postman guide to constructing and sending HTTP requests with different methods, headers and authentication.' },
            { title: 'Postman Learning Center — API Testing', url: 'https://learning.postman.com/docs/writing-scripts/intro-to-scripts/', sourceName: 'Postman Documentation', resourceType: 'guide', relationship: 'Postman introduction to scripting for API test automation including pre-request and test scripts.' },
            { title: 'ISTQB — Testing at the API Level', url: 'https://www.istqb.org/certifications/foundation-level-syllabus-2018/testing-through-the-software-development-lifecycle.html', sourceName: 'ISTQB', resourceType: 'reference', relationship: 'ISTQB guidance on integration and API-level testing concepts within the development lifecycle.' }
          ],
          quiz: {
            prompt: 'You test a POST /api/users endpoint with a valid request body and receive a 200 OK response with the created user. What is the correct assessment?',
            options: [
              'The test passed because the user was created successfully',
              'The test failed because a successful resource creation should return 201 Created, not 200 OK',
              'The test passed because 200 OK is acceptable for all successful operations',
              'The test should be skipped because status code 200 is always correct for POST requests'
            ],
            answerIndex: 1,
            explanation: 'Per REST conventions, POST requests that create a resource should return 201 Created. A 200 OK indicates the request succeeded but does not communicate the specific outcome of resource creation. This is a defect in the API implementation that could confuse API consumers.'
          }
        },
        {
          slug: 'postman-collections-and-scripting',
          title: 'Postman Collections & Scripting',
          minutes: 30,
          objectives: [
            'Build organized Postman collections with folders, environments and data variables',
            'Write JavaScript test scripts that validate response data programmatically',
            'Chain API requests using pre-request scripts and extracted variables'
          ],
          sections: [
            { heading: 'Collections and environment management', body: 'Postman collections group related requests into a structured test suite. Organize collections by feature or user flow, with folders for CRUD operations on each resource. Environments store variable sets (base URL, API keys, user credentials) that requests reference using {{variableName}} syntax. Switch between development, staging and production environments without modifying individual requests. Collection-level and folder-level variables share common configuration across all requests.' },
            { heading: 'Test script writing with pm.test()', body: 'Postman test scripts use the pm.test() function to define assertions that run after each request. The pm.response object provides access to the status code, headers and body. Use pm.expect() for assertions: pm.expect(pm.response.code).to.equal(200), pm.expect(pm.response.json().name).to.equal("John"). Chain assertions with .and for compound checks. Test scripts can validate JSON schemas using tv4 or ajv libraries, check response times and verify header values.' },
            { heading: 'Request chaining and dynamic data', body: 'API testing often requires using data from one response in the next request. Pre-request scripts run before the request and can generate dynamic data (timestamps, UUIDs, calculated values). Test scripts extract values from responses using pm.environment.set("variableName", value) and pm.collectionVariables.set(). Subsequent requests reference these variables with {{variableName}}. This chaining enables testing complete user flows: register, login, create resource, update resource, delete resource.' }
          ],
          links: [
            { title: 'Postman Learning Center — Writing Scripts', url: 'https://learning.postman.com/docs/writing-scripts/intro-to-scripts/', sourceName: 'Postman Documentation', resourceType: 'guide', relationship: 'Postman guide to writing pre-request and test scripts including assertions and variable management.' },
            { title: 'Postman Learning Center — Working with Environments', url: 'https://learning.postman.com/docs/sending-requests/environments/', sourceName: 'Postman Documentation', resourceType: 'guide', relationship: 'Postman guide to managing environments and variables for different test configurations.' },
            { title: 'Postman Learning Center — Collection Runner', url: 'https://learning.postman.com/docs/running-collections/intro-to-collection-runner/', sourceName: 'Postman Documentation', resourceType: 'guide', relationship: 'Postman guide to running collections for automated test execution with data files.' }
          ],
          quiz: {
            prompt: 'In a Postman test script, you need to extract the user ID from a POST /api/users response and use it in a subsequent GET /api/users/{id} request. What is the correct approach?',
            options: [
              'Copy the user ID manually from the response and paste it into the next request URL',
              'Use pm.collectionVariables.set("userId", response.id) in the test script and reference {{userId}} in the GET request',
              'Hardcode the user ID in the environment file',
              'Use console.log() to display the user ID and type it into the next request'
            ],
            answerIndex: 1,
            explanation: 'Test scripts use pm.collectionVariables.set() to store values extracted from responses. The subsequent request references the variable with {{userId}} in the URL path. This creates an automated chain where each request uses data from the previous one without manual intervention.'
          }
        },
        {
          slug: 'api-test-automation-and-ci',
          title: 'API Test Automation & CI Integration',
          minutes: 28,
          objectives: [
            'Export Postman collections as runnable Newman scripts for command-line execution',
            'Integrate API test collections into CI/CD pipelines for automated regression testing',
            'Analyze test results to identify flaky tests and improve test reliability'
          ],
          sections: [
            { heading: 'Newman for command-line execution', body: 'Newman is Postman\'s command-line runner that executes collections without the Postman application. Export the collection as a JSON file and run it with newman run collection.json --environment env.json. Newman produces JUnit XML reports, HTML reports and exit codes that indicate pass/fail status. This enables running API tests on servers, in containers and in CI environments where the Postman GUI is unavailable.' },
            { heading: 'CI/CD pipeline integration', body: 'API test automation integrates into CI/CD pipelines to catch regressions before deployment. Add a Newman step to your pipeline that runs after the build and deploy stages. Configure the pipeline to fail if any critical test fails, while allowing non-critical test failures to generate warnings. Use pipeline variables for environment-specific configurations. Generate and publish test reports as build artifacts for team visibility. Schedule nightly full regression runs separately from the fast critical-path checks on every commit.' },
            { heading: 'Test reliability and maintenance', body: 'Flaky API tests fail intermittently due to timing issues, shared test data or environment inconsistencies. Fix flakiness by: using unique test data (generated timestamps or UUIDs), cleaning up test data after execution, adding retry logic for network-dependent tests and isolating test data between parallel test runs. Monitor test reliability metrics — a test that fails more than 2% of the time without a code change needs investigation. Maintain a stable test suite as the API evolves by updating assertions when response formats change.' }
          ],
          links: [
            { title: 'Postman Learning Center — Newman', url: 'https://learning.postman.com/docs/running-collections/using-newman-cli/', sourceName: 'Postman Documentation', resourceType: 'guide', relationship: 'Postman guide to Newman CLI for running Postman collections in CI/CD environments.' },
            { title: 'Postman Learning Center — CI Integrations', url: 'https://learning.postman.com/docs/running-collections/collection-runs/integration-with-ci-cd-tools/', sourceName: 'Postman Documentation', resourceType: 'guide', relationship: 'Postman guide to integrating collections with Jenkins, GitLab CI, GitHub Actions and other CI/CD platforms.' },
            { title: 'Postman Learning Center — Monitoring', url: 'https://learning.postman.com/docs/monitoring-your-api/setting-up-monitoring/', sourceName: 'Postman Documentation', resourceType: 'guide', relationship: 'Postman guide to setting up monitors for scheduled API test execution and alerting.' }
          ],
          quiz: {
            prompt: 'Your Postman collection runs locally but fails intermittently in the CI pipeline. Newman reports "Connection refused" on approximately 30% of runs. What is the most likely cause and best fix?',
            options: [
              'The Postman collection has a bug and needs to be rewritten',
              'The API server is not fully started when the test runs — add a health check wait or startup delay in the pipeline',
              'Newman does not support that API endpoint',
              'The CI server has a slower network and tests should have longer request timeouts'
            ],
            answerIndex: 1,
            explanation: 'Intermittent "Connection refused" errors in CI typically mean the API server under test has not finished starting when the tests begin. Adding a health check that waits for the server to respond before running tests, or a startup delay, resolves the timing issue.'
          }
        }
      ]
    },
    {
      slug: 'browser-automation-testing',
      stage: 'Advanced',
      title: 'Browser Automation Testing',
      description: 'End-to-end browser testing with Selenium, Playwright and Cypress — from writing selectors to building maintainable, parallel test suites.',
      topics: [
        {
          slug: 'selenium-webdriver-fundamentals',
          title: 'Selenium WebDriver Fundamentals',
          minutes: 30,
          objectives: [
            'Set up Selenium WebDriver projects with language bindings and browser drivers',
            'Write browser automation scripts that interact with web elements using locators and waits',
            'Handle dynamic content, dropdowns, file uploads and multi-window scenarios'
          ],
          sections: [
            { heading: 'Selenium WebDriver architecture', body: 'Selenium WebDriver communicates with browsers through browser-specific drivers (ChromeDriver, GeckoDriver, msedgedriver). The test code sends commands to the driver, which translates them into browser actions. The WebDriver instance represents a browser session. Create a session with options for headless mode, window size and capabilities. The session persists until explicitly closed, maintaining cookies and state across multiple page navigations.' },
            { heading: 'Element locators and interaction', body: 'Selenium locators identify page elements: By.id for unique IDs, By.cssSelector for CSS selectors, By.xpath for XML path expressions, By.name for name attributes, By.className for CSS classes and By.tagName for element types. CSS selectors are preferred for readability and performance. XPath provides powerful positioning with axes (following-sibling, preceding, parent) for elements without unique identifiers. Never rely on auto-generated IDs that change between builds.' },
            { heading: 'Waits and synchronization', body: 'Selenium provides implicit waits (global timeout for element lookup), explicit waits (wait for specific conditions like element visibility or clickability) and FluentWait (polling with custom exception handling). Always use explicit waits over implicit waits because they wait for specific conditions rather than just element presence. WebDriverWait with ExpectedConditions handles dynamic content loading, AJAX responses and animations. Avoid Thread.sleep() which creates flaky tests by assuming fixed load times.' }
          ],
          links: [
            { title: 'Selenium Documentation — WebDriver Basics', url: 'https://www.selenium.dev/documentation/webdriver/', sourceName: 'Selenium Documentation', resourceType: 'guide', relationship: 'Official Selenium WebDriver guide covering setup, browser management and element interaction.' },
            { title: 'Selenium Documentation — Locators', url: 'https://www.selenium.dev/documentation/webdriver/elements/locators/', sourceName: 'Selenium Documentation', resourceType: 'guide', relationship: 'Selenium guide to element locator strategies including CSS selectors, XPath and other methods.' },
            { title: 'Selenium Documentation — Waits', url: 'https://www.selenium.dev/documentation/webdriver/waits/', sourceName: 'Selenium Documentation', resourceType: 'guide', relationship: 'Selenium documentation on implicit, explicit and FluentWait synchronization strategies.' }
          ],
          quiz: {
            prompt: 'Your Selenium test uses driver.findElement(By.id("submit")).click() but it fails intermittently with a NoSuchElementException. The element exists on the page. What is the best fix?',
            options: [
              'Add Thread.sleep(5000) before the click to wait for the page to load',
              'Use an explicit wait to wait until the element is clickable before attempting the click',
              'Change the locator from By.id to By.cssSelector for better performance',
              'Add a try-catch block and retry the click up to three times'
            ],
            answerIndex: 1,
            explanation: 'An explicit wait with ExpectedConditions.elementToBeClickable waits for the element to be both present in the DOM and visible/enabled. This handles dynamic content loading correctly and avoids the brittleness of fixed sleep times or bare retry loops.'
          }
        },
        {
          slug: 'playwright-for-end-to-end-testing',
          title: 'Playwright for End-to-End Testing',
          minutes: 30,
          objectives: [
            'Install and configure Playwright with multiple browser support and test fixtures',
            'Write reliable tests using Playwright\'s auto-waiting and built-in assertions',
            'Use Playwright features like network interception, screenshots and video recording'
          ],
          sections: [
            { heading: 'Playwright setup and architecture', body: 'Playwright runs tests in a dedicated browser context that provides complete isolation between tests. Install with npm init playwright@latest which configures browsers, test runners and a test config. Playwright supports Chromium, Firefox and WebKit in a single test run. The test runner (playwright test) provides parallel execution, retries and HTML reports out of the box. Use playwright.config.ts to configure browsers, timeouts, retries and output directories.' },
            { heading: 'Auto-waiting and locator strategies', body: 'Playwright automatically waits for elements to be actionable before performing actions, eliminating the explicit wait code that Selenium requires. Locator strategies include page.getByRole() for accessible role-based locators (most resilient), page.getByText() for visible text, page.getByTestId() for test attributes, page.locator() for CSS/XPath and page.getByLabel() for form elements. Prefer role-based and text-based locators because they are readable and resistant to UI changes.' },
            { heading: 'Advanced Playwright features', body: 'Playwright intercepts network requests with page.route() to mock API responses, simulate errors and test offline behavior. Take screenshots with page.screenshot() for visual evidence in test reports. Record videos of test sessions with video: "on" in the config. Use Playwright Test fixtures for setup and teardown (authentication state, database seeding). Trace Viewer captures a complete timeline of test execution including DOM snapshots, network requests and console logs for debugging failures.' }
          ],
          links: [
            { title: 'Playwright Documentation — Getting Started', url: 'https://playwright.dev/docs/intro', sourceName: 'Playwright Documentation', resourceType: 'guide', relationship: 'Official Playwright getting started guide covering installation, configuration and first test.' },
            { title: 'Playwright Documentation — Locators', url: 'https://playwright.dev/docs/locators', sourceName: 'Playwright Documentation', resourceType: 'guide', relationship: 'Playwright guide to locator strategies including role, text, test ID and CSS/XPath locators.' },
            { title: 'Playwright Documentation — Test Configuration', url: 'https://playwright.dev/docs/test-configuration', sourceName: 'Playwright Documentation', resourceType: 'guide', relationship: 'Playwright test configuration reference covering browsers, timeouts, retries and project setup.' }
          ],
          quiz: {
            prompt: 'Playwright automatically waits before performing actions, unlike Selenium which requires explicit waits. When writing a test, how should you handle an element that appears after a network request completes?',
            options: [
              'Add a page.waitForTimeout(2000) before interacting with the element',
              'Use page.waitForResponse() or rely on Playwright auto-waiting with a locator action',
              'Add an explicit JavaScript wait using page.evaluate()',
              'Use a try-catch loop with manual retries'
            ],
            answerIndex: 1,
            explanation: 'Playwright\'s auto-waiting handles most scenarios automatically. For network-dependent elements, use page.waitForResponse() to wait for the specific API call, or simply call the action on a locator — Playwright will wait for the element to be actionable. Avoid fixed timeouts.'
          }
        },
        {
          slug: 'cypress-component-and-e2e-testing',
          title: 'Cypress Component & E2E Testing',
          minutes: 28,
          objectives: [
            'Configure Cypress for end-to-end and component testing in modern frameworks',
            'Write Cypress tests using custom commands, fixtures and network stubbing',
            'Integrate Cypress into a development workflow with continuous integration'
          ],
          sections: [
            { heading: 'Cypress architecture and setup', body: 'Cypress runs inside the browser alongside the application code, giving it access to the DOM, localStorage, cookies and the network layer directly. This architecture enables time-travel debugging — each command in the test is clickable in the Cypress Test Runner to see the DOM state at that point. Install with npm install cypress and configure with cypress.config.ts. Cypress supports both end-to-end and component testing (for React, Vue and Angular components).' },
            { heading: 'Commands, fixtures and aliases', body: 'Cypress custom commands (cypress/support/commands.js) encapsulate repeated operations like login, navigation and data setup. Fixtures (cypress/fixtures/) store test data as JSON files loaded with cy.fixture(). Aliases created with .as() store references to DOM elements or network responses for later use. cy.intercept() stubs or spies on API calls, enabling tests that run without a live backend. Chain commands with cy.get().should().and() for fluent, readable assertions.' },
            { heading: 'Cypress in CI and best practices', body: 'Cypress CI integration uses the cypress run command for headless execution with JUnit XML or Mochawesome reports. Parallelize tests across CI machines with Cypress Cloud. Use data-cy attributes as test selectors to decouple tests from implementation details. Avoid cy.wait() with fixed timeouts — use cy.intercept() wait patterns instead. Structure tests with describe blocks for features and it blocks for scenarios. Each test should be independent and not depend on state from previous tests.' }
          ],
          links: [
            { title: 'Cypress Documentation — Getting Started', url: 'https://docs.cypress.io/guides/getting-started/installing-cypress', sourceName: 'Cypress Documentation', resourceType: 'guide', relationship: 'Official Cypress installation and setup guide for end-to-end and component testing.' },
            { title: 'Cypress Documentation — Core Concepts', url: 'https://docs.cypress.io/guides/core-concepts/introduction-to-cypress', sourceName: 'Cypress Documentation', resourceType: 'guide', relationship: 'Cypress guide to the test runner, commands, assertions and time-travel debugging.' },
            { title: 'Cypress Documentation — CI Integration', url: 'https://docs.cypress.io/guides/guides/continuous-integration', sourceName: 'Cypress Documentation', resourceType: 'guide', relationship: 'Cypress guide to running tests in CI environments including GitHub Actions, GitLab CI and Jenkins.' }
          ],
          quiz: {
            prompt: 'A Cypress test fails intermittently because a button only appears after an API call completes. You are currently using cy.get("[data-cy=submit]").click(). What is the recommended fix?',
            options: [
              'Add cy.wait(3000) before the click to give the API time to respond',
              'Use cy.intercept() to wait for the specific API response before clicking the button',
              'Increase the Cypress defaultCommandTimeout in the config',
              'Use cy.reload() to refresh the page before clicking'
            ],
            answerIndex: 1,
            explanation: 'cy.intercept() combined with cy.wait("@alias") lets you wait for the specific network response that triggers the button appearance. This is deterministic and fast — it proceeds as soon as the response arrives rather than waiting an arbitrary time.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Full API and E2E Test Suite for E-Commerce Platform',
    coverage: [
      'Test Planning & Strategy',
      'REST API Test Design & Execution with Postman',
      'End-to-End Browser Test Automation',
      'Defect Reporting & Regression Test Management',
      'CI/CD Test Integration'
    ],
    brief:
      'You have been hired by BrightCart, a mid-size e-commerce startup, to build their QA practice from scratch. Their platform has a REST API (products, users, cart, orders, payments) and a React storefront. Currently all testing is manual and ad hoc. Create a complete test strategy, build automated API tests in Postman, write E2E browser tests in Playwright or Cypress, integrate everything into a CI pipeline, and produce a defect report for three critical bugs you find during testing.',
    requirements: [
      'Write a test plan document covering scope, approach, test levels, entry/exit criteria and resource estimates',
      'Create a Postman collection with at least 25 API test cases covering products, users, cart, orders and payment endpoints',
      'Include positive tests, negative tests, boundary tests and authentication tests in the Postman collection',
      'Write at least 10 E2E browser tests covering the user registration, login, product browsing, cart and checkout flows',
      'Report at least 3 real defects found during testing with complete bug reports including reproduction steps and severity',
      'Integrate the Postman collection into a CI pipeline using Newman with a pass/fail gate',
      'Produce a final test summary report with coverage metrics, defect summary and release readiness recommendation'
    ],
    expectedOutput:
      'A complete QA deliverable package: test plan, Postman collection with automated assertions, Playwright or Cypress test suite, CI configuration file, defect reports with severity and priority ratings, and a test summary report with metrics.',
    rubric: [
      { skill: 'Test Planning & Strategy', weight: 15, criteria: 'Test plan is comprehensive with clear scope, realistic approach, defined criteria and sufficient coverage of test levels' },
      { skill: 'API Test Coverage', weight: 25, criteria: 'Postman collection covers all required endpoints with a mix of positive, negative, boundary and auth tests with proper assertions' },
      { skill: 'E2E Test Quality', weight: 25, criteria: 'Browser tests are reliable, well-structured, cover critical user journeys and use proper locator strategies and synchronization' },
      { skill: 'Defect Reporting', weight: 15, criteria: 'Bug reports are clear, reproducible and properly classified with accurate severity and priority' },
      { skill: 'CI Integration & Reporting', weight: 20, criteria: 'Newman integration works correctly, test summary report provides actionable metrics and the release recommendation is well-justified' }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'Test Case Design for a Login Feature',
      stage: 'Beginner',
      objective: 'Design a comprehensive test case suite for a login feature using ISTQB test design techniques, demonstrating equivalence partitioning, boundary value analysis and decision table approaches.',
      requirements: [
        'Write at least 20 test cases covering the login form (username, password, submit button, forgot password link)',
        'Apply equivalence partitioning to categorize input tests into valid and invalid partitions',
        'Apply boundary value analysis to email length limits, password complexity rules and rate limiting thresholds',
        'Create a decision table covering all combinations of username existence, password correctness and account status',
        'Include accessibility test cases and cross-browser test cases in the suite'
      ],
      skillsEvaluated: ['Test Case Design', 'ISTQB Techniques', 'Boundary Value Analysis', 'Decision Table Testing'],
      dueDays: 10,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the complete test case suite organized by test design technique, with each test case including title, preconditions, steps, expected result and the technique it demonstrates.',
        textLabel: 'Login feature test case suite',
        minTextLength: 1200,
        linkLabels: ['Decision table covering login logic combinations']
      }
    },
    {
      title: 'Postman API Test Collection with CI Integration',
      stage: 'Intermediate',
      objective: 'Build a comprehensive Postman collection for a REST API and integrate it into a CI pipeline with automated reporting.',
      requirements: [
        'Create a Postman collection with at least 20 requests covering CRUD operations on at least 3 API resources',
        'Write test scripts for each request that validate status codes, response body schema and response time',
        'Implement request chaining using variables to test complete user flows (create, read, update, delete)',
        'Configure environment files for development and staging environments',
        'Set up Newman in a CI pipeline (GitHub Actions, GitLab CI or Jenkins) with JUnit XML reporting'
      ],
      skillsEvaluated: ['API Testing', 'Postman Scripting', 'Test Automation', 'CI/CD Integration'],
      dueDays: 14,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the Postman collection JSON file, environment files, CI pipeline configuration file, Newman execution output and a summary report documenting test coverage and results.',
        textLabel: 'API test automation report',
        minTextLength: 1500,
        linkLabels: ['Postman collection JSON', 'CI pipeline configuration']
      }
    },
    {
      title: 'E2E Browser Test Suite with Playwright or Cypress',
      stage: 'Advanced',
      objective: 'Build a maintainable E2E browser test suite for an e-commerce application using Playwright or Cypress with proper page object patterns and CI integration.',
      requirements: [
        'Write at least 15 E2E tests covering product browsing, search, cart management and checkout flows',
        'Implement a page object model or component fixtures to separate page structure from test logic',
        'Use network interception to mock API responses for tests that should not depend on backend state',
        'Generate HTML test reports and visual evidence (screenshots on failure)',
        'Configure parallel test execution and CI integration with failure notifications'
      ],
      skillsEvaluated: ['Browser Automation', 'Playwright or Cypress', 'Test Architecture', 'CI Pipeline Design'],
      dueDays: 21,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the complete test suite source code, page objects/fixtures, test configuration files, CI pipeline definition and an HTML test report from a full execution run.',
        textLabel: 'E2E test suite report',
        minTextLength: 1800,
        linkLabels: ['Test suite source code', 'HTML execution report']
      }
    }
  ],

  simTasks: [
    {
      title: 'Critical API vulnerability — unauthenticated data access',
      context: 'During API testing of BrightCart\'s e-commerce platform, you discover that the GET /api/v1/orders endpoint returns all customer orders (including names, addresses and payment details) without requiring authentication. Any user can access any other user\'s order history by changing the order ID in the URL. The endpoint is live in production.',
      requirements: [
        'Verify the vulnerability by making unauthenticated requests and documenting the data exposed',
        'Determine the full scope of accessible data through this endpoint',
        'Check whether the same authentication issue affects related endpoints (users, payments, addresses)',
        'Write a critical-severity bug report with complete reproduction steps',
        'Recommend a remediation approach with authentication and authorization fixes'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'Bug report documenting the unauthenticated access vulnerability, scope assessment, related endpoint analysis and remediation recommendation with authorization fixes.',
      skills: ['API Security Testing', 'Bug Reporting', 'Authentication Testing', 'Authorization Analysis']
    },
    {
      title: 'Flaky E2E test suite blocking CI pipeline',
      context: 'The Playwright E2E test suite for BrightCart has 120 tests but 18 of them fail intermittently in CI, blocking deployments. The failures are inconsistent — the same test may pass locally but fail in CI. The team has started skipping the flaky tests, which means regression coverage is declining.',
      requirements: [
        'Identify the root causes of flakiness in at least 5 of the 18 failing tests by analyzing the test code and CI logs',
        'Classify each root cause (timing issue, test data conflict, network dependency, environment mismatch, selector fragility)',
        'Refactor the identified tests to eliminate the flakiness using appropriate synchronization and data isolation techniques',
        'Propose a team-wide strategy for preventing future flaky tests (coding standards, CI practices, test review checklist)',
        'Create a dashboard or report tracking flaky test count over time'
      ],
      priority: 'high',
      dueDayOffset: 5,
      expectedOutput: 'Root cause analysis of flaky tests, refactored test code eliminating identified issues, prevention strategy document and a flaky test tracking report.',
      skills: ['Test Reliability', 'Root Cause Analysis', 'Playwright Debugging', 'CI/CD Quality']
    },
    {
      title: 'Cross-browser compatibility test plan for new checkout flow',
      context: 'BrightCart is launching a redesigned checkout flow next week. The design team has confirmed it must work on Chrome, Firefox, Safari and Edge on both desktop and mobile viewports. The current test suite only runs on Chrome desktop. You need to expand coverage before the release.',
      requirements: [
        'Create a cross-browser test matrix covering all required browser and viewport combinations',
        'Write Playwright tests that execute across all four browsers using Playwright projects',
        'Identify and report any browser-specific UI or behavior differences discovered during testing',
        'Set up parallel cross-browser execution in CI with aggregated reporting',
        'Deliver a browser compatibility report with go/no-go recommendation for each browser'
      ],
      priority: 'normal',
      dueDayOffset: 7,
      expectedOutput: 'Cross-browser test matrix, multi-browser Playwright configuration, browser-specific defect reports, CI pipeline configuration and compatibility report with release recommendation.',
      skills: ['Cross-Browser Testing', 'Playwright Projects', 'UI Compatibility', 'Test Matrix Design']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Raj Patel',
      personaRole: 'Lead Developer',
      situation: 'The lead developer pushes back on the number of bugs you have filed, claiming that many of them are "cosmetic" and not worth fixing before the release.',
      openingMessage:
        'We have 47 open bugs from your testing and honestly a lot of them seem minor — alignment issues, color differences, text casing. The release is in five days and we need to focus on functional issues. Can we close the cosmetic ones and ship?',
      expectedPoints: [
        'Distinguishes between genuinely cosmetic issues and issues that affect user trust and brand perception',
        'Proposes a severity-based triage where critical functional bugs are fixed first and cosmetic issues are batched for the next sprint',
        'References accessibility guidelines (WCAG) to show that some "cosmetic" issues have compliance implications',
        'Offers to help the team prioritize by re-evaluating each cosmetic bug for actual user impact'
      ]
    },
    {
      kind: 'team',
      personaName: 'Lisa Nguyen',
      personaRole: 'QA Team Lead',
      situation: 'Your manager asks you to present test coverage metrics to the team and recommend improvements to the testing process.',
      openingMessage:
        'The sprint review is tomorrow and I need you to present our current test coverage metrics, explain where the gaps are and recommend specific improvements. The team needs actionable takeaways, not just numbers.',
      expectedPoints: [
        'Presents coverage metrics clearly — requirements coverage, code coverage and defect detection rates',
        'Identifies specific gaps (untested modules, missing negative test cases, no performance testing) with business impact',
        'Recommends prioritized improvements with estimated effort and expected quality impact',
        'Suggests concrete next steps such as adding API tests for the highest-risk module or automating the manual regression suite'
      ]
    },
    {
      kind: 'client',
      personaName: 'Amanda Torres',
      personaRole: 'Product Owner',
      situation: 'The product owner wants to know if the application is ready for release based on your testing results, and whether the remaining open bugs are acceptable.',
      openingMessage:
        'We have the board meeting on Friday and they want a quality sign-off. Can you tell me whether we should launch? I need a clear answer — what is the risk if we go live with the bugs that are still open?',
      expectedPoints: [
        'Provides a clear go/no-go recommendation backed by specific test results and risk analysis',
        'Summarizes remaining open bugs by severity with an explanation of the user impact for each category',
        'Quantifies the risk of launching with known defects in terms of user impact, support cost and brand risk',
        'Offers conditional recommendations (go if high-severity bugs are fixed, delay if data loss or security risks exist)'
      ]
    },
    {
      kind: 'client',
      personaName: 'David Kim',
      personaRole: 'Engineering Manager',
      situation: 'The engineering manager wants to understand why your E2E tests take 45 minutes to run and whether this can be reduced to unblock faster deployments.',
      openingMessage:
        'Our CI pipeline takes 45 minutes mostly because of the E2E test suite. Developers are waiting a long time for feedback. Can you analyze the test execution time and propose ways to speed it up without sacrificing coverage?',
      expectedPoints: [
        'Analyzes the test suite breakdown to identify which tests consume the most time and why',
        'Proposes test parallelization across multiple CI machines to reduce wall-clock time',
        'Recommends splitting the suite into critical-path (fast, runs on every commit) and full regression (runs nightly)',
        'Identifies tests that can be converted to faster unit or component tests without losing coverage value'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'You are running a Postman API test collection against the staging environment when the staging server goes down mid-execution. 60% of tests pass, 30% fail with connection errors and 10% time out. The deployment to production is scheduled in 2 hours.',
      requiredActions: [
        { action: 'Stop the test execution and verify whether the staging server issue is related to a recent deployment or infrastructure problem', good: true, note: 'Stopping prevents generating false negative results that could be mistaken for application defects.' },
        { action: 'Document which tests passed before the server failure and which failed due to the infrastructure issue versus genuine bugs', good: true, note: 'Separating infrastructure failures from real defects prevents incorrect release decisions.' },
        { action: 'Notify the deployment team about the staging environment instability and request the production deployment be held until staging is restored', good: true, note: 'Communicating infrastructure issues to the deployment team allows informed decisions about the release timeline.' },
        { action: 'Rerun only the tests that failed due to connection errors, assuming they would pass if the server had not gone down', good: false, note: 'Re-running failed tests without root cause analysis risks shipping undetected defects if some failures were genuine bugs masked by the infrastructure noise.' }
      ]
    },
    {
      category: 'Requirement change',
      situation: 'Two days before release, the product owner adds a new payment method (Apple Pay) to the checkout flow. The feature is already deployed to staging. You are asked to test it before the release deadline.',
      requiredActions: [
        { action: 'Assess the risk of the new payment method by reviewing the code changes, API endpoints involved and integration points with the payment provider', good: true, note: 'Risk assessment determines the testing depth needed — a new payment integration touching financial data requires thorough testing.' },
        { action: 'Write targeted test cases for the Apple Pay flow covering happy path, error handling, network timeout and cancellation scenarios', good: true, note: 'Targeted test cases focusing on the highest-risk scenarios provide meaningful coverage within a compressed timeline.' },
        { action: 'Run the existing regression suite on the payment module to verify the new code does not break existing payment methods', good: true, note: 'Regression testing on the affected module ensures the new feature has not introduced regressions in critical financial flows.' },
        { action: 'Skip testing the Apple Pay integration because it was developed by the payments team who presumably tested it already', good: false, note: 'Assuming the development team has fully tested their own code skips independent QA verification, which is the QA engineer\'s core responsibility.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between functional testing, integration testing and system testing. Give a concrete example of a defect that each level would catch.',
      guidancePoints: [
        'Functional testing verifies individual features against requirements (e.g., login form accepts valid credentials)',
        'Integration testing verifies module interactions (e.g., login service does not correctly communicate with the user database)',
        'System testing verifies the complete application workflow (e.g., end-to-end purchase flow fails when payment gateway times out)',
        'Each level operates at a different scope and catches defects that lower levels cannot detect',
        'The testing pyramid shows that functional tests are most numerous, integration tests are fewer and system tests are fewest'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'How do you decide whether to automate a test case or keep it as a manual test? What criteria do you use?',
      guidancePoints: [
        'Automate tests that run frequently: regression suites, smoke tests and CI pipeline checks',
        'Keep manual tests for exploratory testing, usability evaluation and one-time validations',
        'Consider test stability: highly stable selectors and deterministic flows automate well; UI that changes frequently does not',
        'Evaluate ROI: the cost of automation is offset by the number of times the test will be executed',
        'Edge cases requiring human judgment (visual design, accessibility feel) are better as manual tests'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'You find a bug that only reproduces on Safari on macOS but works correctly on Chrome and Firefox. How do you approach investigation and reporting?',
      guidancePoints: [
        'Reproduce the bug consistently on Safari to confirm it is not intermittent',
        'Check Safari-specific CSS differences (flexbox behavior, WebKit-specific properties, date input handling)',
        'Inspect the browser console for Safari-specific errors or deprecation warnings',
        'Document the exact Safari version, macOS version and screen resolution in the bug report',
        'Report with a video recording since Safari bugs are often layout-related and difficult to describe in text alone'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A developer tells you that a bug you reported is "works as designed" because the code does exactly what the spec says. But you believe the spec is wrong and the behavior is a defect from the user perspective. How do you handle this?',
      guidancePoints: [
        'Review the original requirement and user story to understand the intended business outcome',
        'Document why the current behavior does not serve the user need even if it matches the literal specification',
        'Propose a specific change to both the specification and the implementation to align with user expectations',
        'Escalate to the product owner for a decision if the developer and QA engineer disagree on the interpretation',
        'File the discrepancy as a specification defect alongside the functional defect so both are tracked'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'You are testing a feature and discover a data privacy issue where user email addresses are visible in API response logs. This was not in your test plan. What do you do?',
      guidancePoints: [
        'Report the privacy issue immediately as a security finding, even though it was outside the original test scope',
        'Document the exposure including which logs contain PII, how long the data persists and who has access to the logs',
        'Assess regulatory implications (GDPR, CCPA) and include them in the bug report severity assessment',
        'Recommend immediate remediation such as log redaction and a retroactive audit of existing logs',
        'Update the test plan to include privacy and PII detection as a standing test category for future testing'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'Your test results show that the application passes all automated tests but you have identified several usability issues through manual exploration. The team considers the feature "done" based on automated test results. How do you advocate for addressing the usability issues?',
      guidancePoints: [
        'Document each usability issue with screenshots, user impact description and which user persona is affected',
        'Quantify the usability impact in terms of user task completion rate, time-on-task and support ticket prediction',
        'Present usability findings alongside automated test results to show that passing tests does not equal a good user experience',
        'Propose a usability test session with real users to validate your findings with evidence',
        'Recommend classifying usability fixes as a separate workstream so they do not block the functional release'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'A developer asks you to explain a bug you found, but they believe your test is wrong rather than their code. How do you demonstrate the bug clearly without creating a confrontational dynamic?',
      guidancePoints: [
        'Walk through the test step by step with screen sharing so the developer can see the actual behavior',
        'Present the expected behavior from the requirement alongside the actual behavior with evidence',
        'Use a concrete example with specific input data rather than abstract descriptions',
        'Ask the developer what they expect the behavior to be, and compare that to what actually happens',
        'Focus on the shared goal of shipping a working product rather than proving who is right'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'You need to explain to the VP of Engineering why the QA team cannot guarantee zero defects in a release. How do you communicate this without losing confidence in the QA process?',
      guidancePoints: [
        'Explain the testing principle that testing can show the presence of defects but cannot prove their absence',
        'Describe the risk-based testing approach that prioritizes testing the highest-risk, highest-impact areas',
        'Present the defect detection rate and test coverage metrics to demonstrate the effectiveness of the QA process',
        'Explain that QA reduces risk to an acceptable level rather than eliminating all risk',
        'Recommend monitoring and rapid response processes for post-release defect detection and resolution'
      ]
    }

  ]

}
