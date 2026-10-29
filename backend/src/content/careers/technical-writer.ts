import type { CareerDef } from '../framework.js'

export const technicalWriter: CareerDef = {
  slug: 'technical-writer',
  name: 'Technical Writer',
  category: 'Business',
  order: 50,
  description:
    'Writes clear docs users trust — guides, API references, tutorials and style-driven editing on GitHub-based workflows.',
  difficulty: 'Beginner-friendly',
  pathSummary:
    'Writing foundations & style guides → structured documentation & Markdown → API docs & GitHub workflows → documentation strategy, editing & information architecture.',
  mainSkills: [
    'Technical Writing & Editing',
    'Markdown & Docs-as-Code',
    'API Documentation',
    'Information Architecture',
    'Style Guide Application',
    'GitHub-Based Documentation Workflows',
    'Content Strategy & Planning',
    'Audience Analysis'
  ],
  sourcePlatforms: [
    'Google Technical Writing',
    'Microsoft Writing Style Guide',
    'GitHub Documentation',
    'Write the Docs'
  ],
  companyName: 'ClarityDocs Inc.',
  roleTitle: 'Technical Writer',

  chapters: [
    {
      slug: 'writing-foundations-style',
      stage: 'Beginner',
      title: 'Writing Foundations & Style',
      description: 'The core principles of clear technical writing, sentence-level clarity and applying established style guides consistently.',
      topics: [
        {
          slug: 'principles-clear-writing',
          title: 'Principles of Clear Technical Writing',
          minutes: 28,
          objectives: [
            'Apply the active voice, short sentences and concrete language to reduce ambiguity',
            'Identify and eliminate jargon, filler words and unnecessary complexity',
            'Structure paragraphs and sections so readers can scan and find answers quickly'
          ],
          sections: [
            { heading: 'Why clarity matters', body: 'Technical documentation exists to help users accomplish tasks. Every unclear sentence forces readers to stop, re-read or guess — and each of those moments erodes trust. Clear writing respects the reader\'s time and reduces support costs by answering questions before they are asked.' },
            { heading: 'Active voice and sentence structure', body: 'The active voice tells the reader who is doing what: "Click Save" instead of "The Save button should be clicked." Short sentences with one idea each are easier to parse than long, compound constructions. When a sentence exceeds 25 words, consider splitting it. Active voice also makes instructions unambiguous about the actor.' },
            { heading: 'Scannable structure', body: 'Readers scan technical docs — they do not read word by word. Use descriptive headings, bullet lists for steps and key facts, and bold for terms the reader must notice. Start each section with a summary sentence so skimmers can decide whether to read deeper. White space between sections gives the eye a place to rest.' }
          ],
          links: [
            { title: 'Google technical writing fundamentals', url: 'https://developers.google.com/tech-writing/one', sourceName: 'Google Technical Writing', resourceType: 'course', relationship: 'Google\'s free course on sentence-level clarity and active voice for technical writing.' },
            { title: 'Microsoft Writing Style Guide — Principles', url: 'https://learn.microsoft.com/en-us/style-guide/welcome/', sourceName: 'Microsoft Writing Style Guide', resourceType: 'documentation', relationship: 'Microsoft\'s style guide covering voice, tone and sentence-level guidance for technical content.' },
            { title: 'Write the Docs learning resources', url: 'https://www.writethedocs.org/guide/', sourceName: 'Write the Docs', resourceType: 'guide', relationship: 'Community-maintained guide covering writing fundamentals and documentation best practices.' }
          ],
          quiz: {
            prompt: 'Which sentence follows technical writing best practices?',
            options: [
              'The user should make sure that the configuration file is saved prior to execution.',
              'Save the configuration file before you run the script.',
              'It is recommended that saving of the configuration file be performed.',
              'Prior to execution, the saving of the configuration file is a necessary step.'
            ],
            answerIndex: 1,
            explanation: 'Active voice, direct address ("you") and a concrete instruction make the sentence clear and scannable. The other options use passive voice or unnecessary filler.'
          }
        },
        {
          slug: 'applying-style-guides',
          title: 'Applying Style Guides Consistently',
          minutes: 30,
          objectives: [
            'Explain the purpose of a style guide and why consistency builds reader trust',
            'Navigate the Microsoft Writing Style Guide and apply its conventions to common decisions',
            'Resolve style conflicts between guides using a documented project standard'
          ],
          sections: [
            { heading: 'Why style guides exist', body: 'A style guide is a set of agreed conventions for capitalization, punctuation, terminology and tone. Without one, different writers produce inconsistent documents — capitalizing the same term two ways, using different past tenses for steps, or formatting code blocks differently. Consistency signals professionalism and reduces cognitive load for readers.' },
            { heading: 'The Microsoft Writing Style Guide', body: 'Microsoft\'s guide is the industry default for software documentation. It governs how to address the user ("you," not "the user"), when to use active voice, how to format UI elements, and how to handle terms like "click" versus "select." Referencing it early in your project saves debates later because the decisions are already made.' },
            { heading: 'Building a project style sheet', body: 'No style guide covers every situation your project will face. A project style sheet records local decisions: product name capitalization, preferred synonyms for common actions, code formatting rules and audience-specific terminology. Maintaining it as a living document in the same repo as your docs ensures every contributor uses the same conventions.' }
          ],
          links: [
            { title: 'Microsoft Writing Style Guide', url: 'https://learn.microsoft.com/en-us/style-guide/welcome/', sourceName: 'Microsoft Writing Style Guide', resourceType: 'documentation', relationship: 'The full Microsoft Writing Style Guide covering voice, tone, grammar and formatting.' },
            { title: 'Google Technical Writing — second course', url: 'https://developers.google.com/tech-writing/two', sourceName: 'Google Technical Writing', resourceType: 'course', relationship: 'Google\'s advanced technical writing course covering paragraphs, passages and editing.' },
            { title: 'Write the Docs documentation survey', url: 'https://www.writethedocs.org/guide/docs-as-code/', sourceName: 'Write the Docs', resourceType: 'guide', relationship: 'Community guidance on docs-as-code workflows, style management and tooling.' }
          ],
          quiz: {
            prompt: 'Your team uses both the Microsoft Writing Style Guide and a custom project style sheet. The project sheet says to capitalize "Dashboard" but the Microsoft guide does not treat it as a proper noun. Which should you follow?',
            options: [
              'Always follow the Microsoft guide because it is the industry standard',
              'Follow the project style sheet since it documents local conventions for the team',
              'Alternate between them depending on the page',
              'Remove the project style sheet and use only the Microsoft guide'
            ],
            answerIndex: 1,
            explanation: 'A project style sheet exists to record decisions specific to the product and team. When it intentionally diverges from an external guide, the project sheet takes precedence for that project\'s documentation.'
          }
        },
        {
          slug: 'audience-analysis',
          title: 'Audience Analysis & Tone',
          minutes: 25,
          objectives: [
            'Identify the primary audience and their technical level for a piece of documentation',
            'Adapt tone, vocabulary and depth of explanation to match the reader\'s expertise',
            'Use personas and scenarios to guide content decisions before writing begins'
          ],
          sections: [
            { heading: 'Who is reading this?', body: 'Documentation written for experienced developers reads differently from docs aimed at first-time users. Before writing, ask: What does the reader already know? What task are they trying to complete? What will they do next after reading this page? Answering these questions shapes everything from vocabulary choice to the level of detail in each step.' },
            { heading: 'Tone as a tool', body: 'Tone is not decoration — it is a functional decision. A Getting Started guide benefits from a welcoming, encouraging tone that reduces intimidation. An API reference demands precision and neutrality. Error messages should be direct and helpful, not apologetic or vague. Matching tone to context helps readers feel confident they are in the right place.' },
            { heading: 'Personas and task scenarios', body: 'A persona is a fictional representation of a typical reader: their role, experience level, goals and frustrations. Pairing a persona with a task scenario — "Priya, a backend developer, needs to integrate the payments API into her Node.js app" — forces writers to stay concrete and avoid writing for an abstract audience that does not exist.' }
          ],
          links: [
            { title: 'Microsoft Writing Style Guide — voice and tone', url: 'https://learn.microsoft.com/en-us/style-guide/welcome/', sourceName: 'Microsoft Writing Style Guide', resourceType: 'guide', relationship: 'Guidance on adapting voice and tone for different audiences in Microsoft documentation.' },
            { title: 'Write the Docs — understanding your audience', url: 'https://www.writethedocs.org/guide/producing-docs/', sourceName: 'Write the Docs', resourceType: 'guide', relationship: 'Community advice on audience research, personas and writing for different readers.' },
            { title: 'Google technical writing — second course', url: 'https://developers.google.com/tech-writing/two', sourceName: 'Google Technical Writing', resourceType: 'course', relationship: 'Covers structuring paragraphs and passages for a specific audience.' }
          ],
          quiz: {
            prompt: 'You are writing an installation guide for a developer tool. Your audience includes both experienced DevOps engineers and junior developers. What is the best approach?',
            options: [
              'Write only for the junior developers and assume the experts can skip ahead',
              'Write at the expert level and let juniors figure it out',
              'Provide a clear prerequisites section and offer separate advanced tips or links for experienced readers',
              'Write one guide that covers everything in full detail for both audiences'
            ],
            answerIndex: 2,
            explanation: 'A prerequisites section lets experienced readers verify they are ready, while separate advanced tips serve experts without overwhelming beginners. This layered approach respects both audiences.'
          }
        }
      ]
    },
    {
      slug: 'structured-docs-markdown',
      stage: 'Foundation',
      title: 'Structured Documentation & Markdown',
      description: 'Writing organized, reusable documentation using Markdown, reStructuredText and the docs-as-code workflow.',
      topics: [
        {
          slug: 'markdown-fundamentals',
          title: 'Markdown Fundamentals for Documentation',
          minutes: 30,
          objectives: [
            'Write well-formatted documentation using Markdown syntax',
            'Use headings, lists, tables, code blocks and links to structure content',
            'Create documents that render correctly across GitHub, static site generators and wikis'
          ],
          sections: [
            { heading: 'Markdown as the documentation lingua franca', body: 'Markdown is a lightweight markup language that lets you write formatted text in plain files. It has become the standard for technical documentation because it is version-controllable, renders on GitHub and feeds static site generators like Docusaurus, MkDocs and Jekyll. Learning Markdown well is the single highest-leverage skill for a docs-as-code workflow.' },
            { heading: 'Structural elements', body: 'Headings (#, ##, ###) create the document hierarchy. Bullet lists and numbered lists organize steps and facts. Tables present structured data. Code blocks with language tags provide syntax highlighting for examples. Each element serves a specific reading pattern — headings for scanning, lists for steps, tables for comparison, code blocks for reference.' },
            { heading: 'Links, images and cross-references', body: 'Internal links connect related pages and let readers navigate a documentation set. External links cite sources and provide further reading. Images should have descriptive alt text and be stored in the repo alongside the docs. In multi-page sites, relative paths and slug conventions keep links stable as the documentation grows.' }
          ],
          links: [
            { title: 'GitHub Markdown basics', url: 'https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax', sourceName: 'GitHub Documentation', resourceType: 'guide', relationship: 'GitHub\'s guide to Markdown syntax for writing and formatting on the platform.' },
            { title: 'Microsoft docs Markdown reference', url: 'https://learn.microsoft.com/en-us/contribute/markdown-reference', sourceName: 'GitHub Documentation', resourceType: 'reference', relationship: 'Microsoft\'s Markdown reference for contributing to docs.microsoft.com.' },
            { title: 'Write the Docs — docs-as-code', url: 'https://www.writethedocs.org/guide/docs-as-code/', sourceName: 'Write the Docs', resourceType: 'guide', relationship: 'Community guide to the docs-as-code approach using Markdown and Git.' }
          ],
          quiz: {
            prompt: 'In Markdown, what does wrapping text in triple backticks with a language identifier produce?',
            options: [
              'An italicized paragraph',
              'A fenced code block with syntax highlighting',
              'A table with two columns',
              'A hyperlink to the language name'
            ],
            answerIndex: 1,
            explanation: 'Triple backticks create a fenced code block, and the language identifier (e.g., ```python) enables syntax highlighting in GitHub and most static site generators.'
          }
        },
        {
          slug: 'information-architecture',
          title: 'Information Architecture for Documentation',
          minutes: 28,
          objectives: [
            'Plan a documentation set with a clear hierarchy and navigation model',
            'Choose between task-based, concept-based and reference-based content types',
            'Design a landing page that orients new readers and connects to all major sections'
          ],
          sections: [
            { heading: 'Content types in technical docs', body: 'Technical documentation serves three fundamental needs: how to do something (tasks), how something works (concepts) and what something is (reference). Mixing these types on a single page confuses readers who came for one and got the other. Separating them into distinct pages or sections lets readers find exactly what they need.' },
            { heading: 'Building the navigation hierarchy', body: 'The left sidebar or table of contents is the map of your documentation. Group pages into sections by user goal, not by the product\'s internal architecture. A Getting Started section, a How-To Guides section, an API Reference section and a Troubleshooting section give readers four distinct entry points depending on what they need right now.' },
            { heading: 'The landing page as a front door', body: 'A documentation landing page should answer three questions in ten seconds: What is this product? Who is it for? Where do I start? A brief description, a quick-start link and a visual table of contents or card grid that links to major sections gives readers the orientation they need to proceed confidently.' }
          ],
          links: [
            { title: 'Write the Docs — information architecture', url: 'https://www.writethedocs.org/guide/producing-docs/', sourceName: 'Write the Docs', resourceType: 'guide', relationship: 'Community guidance on structuring documentation sets for discoverability and clarity.' },
            { title: 'Google technical writing — second course', url: 'https://developers.google.com/tech-writing/two', sourceName: 'Google Technical Writing', resourceType: 'course', relationship: 'Covers structuring passages, paragraphs and documents for clarity.' },
            { title: 'GitHub Documentation', url: 'https://docs.github.com/en', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'A real-world example of well-structured documentation with clear navigation hierarchy.' }
          ],
          quiz: {
            prompt: 'A user wants to know why an authentication error occurs when calling your API. Which content type should they look for?',
            options: [
              'A task-based how-to guide',
              'A conceptual explanation of the authentication flow',
              'A reference page listing all error codes and their meanings',
              'A tutorial walking through a basic setup'
            ],
            answerIndex: 2,
            explanation: 'When a user encounters a specific error and wants to understand its cause, an error code reference page that lists the error, its cause and the fix is the most direct and useful content type.'
          }
        },
        {
          slug: 'task-based-writing',
          title: 'Writing Task-Based Documentation',
          minutes: 30,
          objectives: [
            'Write procedural steps that are accurate, sequential and testable',
            'Use prerequisites, expected results and troubleshooting notes to support the reader',
            'Verify that every step can be followed without external context'
          ],
          sections: [
            { heading: 'The anatomy of a procedure', body: 'A task-based topic starts with a one-sentence purpose statement, then lists prerequisites the reader needs before starting, then presents numbered steps, and ends with expected results or next steps. Each step contains exactly one action. This structure lets readers start, pause and resume a procedure without losing their place.' },
            { heading: 'Writing testable steps', body: 'Every step should produce a visible, verifiable result. "Install the dependencies" is ambiguous — "Run npm install in the project root and verify that node_modules appears" is testable. If a step can fail, say so and explain what failure looks like. Testable steps are also reviewable — a colleague can follow them and catch mistakes before publication.' },
            { heading: 'Handling branching and conditions', body: 'Real procedures have decision points: "If you use macOS, run this command. If you use Windows, run that one." Present these as clearly labeled alternatives rather than inline conditionals. Use an admonition or note block for optional steps and warnings. Keeping conditions visible prevents readers from accidentally following the wrong path.' }
          ],
          links: [
            { title: 'Google technical writing — first course', url: 'https://developers.google.com/tech-writing/one', sourceName: 'Google Technical Writing', resourceType: 'course', relationship: 'Covers writing clear sentences and paragraphs for procedural documentation.' },
            { title: 'Microsoft Writing Style Guide — procedures', url: 'https://learn.microsoft.com/en-us/style-guide/procedures-instructions/', sourceName: 'Microsoft Writing Style Guide', resourceType: 'guide', relationship: 'Microsoft\'s guidance on writing numbered procedures and step-by-step instructions.' },
            { title: 'GitHub Documentation', url: 'https://docs.github.com/en', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'GitHub Docs provides excellent examples of task-based procedural writing.' }
          ],
          quiz: {
            prompt: 'Which of the following is a well-written procedural step?',
            options: [
              'Make sure the environment is properly configured.',
              'Set the DATABASE_URL environment variable to your connection string.',
              'Configuration is important for the database.',
              'You might want to check the environment settings.'
            ],
            answerIndex: 1,
            explanation: 'A well-written step names the specific action, the target and the expected input. It is testable and unambiguous, unlike the vague alternatives.'
          }
        }
      ]
    },
    {
      slug: 'api-docs-github-workflows',
      stage: 'Intermediate',
      title: 'API Documentation & GitHub Workflows',
      description: 'Writing developer-facing API references, maintaining docs in Git-based repositories and contributing through pull requests.',
      topics: [
        {
          slug: 'api-documentation-fundamentals',
          title: 'API Documentation Fundamentals',
          minutes: 30,
          objectives: [
            'Describe the structure of a well-documented REST API endpoint',
            'Write accurate request and response examples with correct status codes',
            'Document authentication, error handling and rate limiting in a developer-friendly way'
          ],
          sections: [
            { heading: 'What developers need from API docs', body: 'Developers reading API docs are trying to solve a problem right now — connect a service, debug a failure or understand a data model. They need the endpoint URL, the HTTP method, required parameters, a request example they can copy, the expected response shape and the error codes they might hit. Anything else is secondary.' },
            { heading: 'Writing request and response examples', body: 'A good example is worth paragraphs of explanation. Show the full request with headers, the body in JSON, and the response with realistic data. Include both success and error examples. Annotate the example with comments explaining non-obvious fields. Developers copy examples first and read descriptions only when the example does not work.' },
            { heading: 'Error documentation and edge cases', body: 'Document every error status code the endpoint can return, the conditions that trigger it and the shape of the error response body. Include rate-limit headers and explain what happens when they are exceeded. Edge cases — empty results, partial updates, idempotency — are the source of most integration bugs and deserve explicit coverage.' }
          ],
          links: [
            { title: 'GitHub REST API documentation', url: 'https://docs.github.com/en/rest', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'GitHub\'s own REST API reference — a model of clear endpoint documentation.' },
            { title: 'Write the Docs — API documentation', url: 'https://www.writethedocs.org/guide/', sourceName: 'Write the Docs', resourceType: 'guide', relationship: 'Community guidance on writing and structuring API documentation effectively.' },
            { title: 'Microsoft Writing Style Guide — developer content', url: 'https://learn.microsoft.com/en-us/style-guide/welcome/', sourceName: 'Microsoft Writing Style Guide', resourceType: 'guide', relationship: 'Style guidance for writing developer-facing content at Microsoft.' }
          ],
          quiz: {
            prompt: 'A developer reports that your API docs say "returns a list of users" but the actual response nests users inside a data object. What is the best fix?',
            options: [
              'Tell the developer to read the example more carefully',
              'Update the documentation to show the exact response shape including the data wrapper',
              'Add a note saying the docs might be slightly inaccurate',
              'Remove the response documentation entirely'
            ],
            answerIndex: 1,
            explanation: 'Documentation must match reality. Updating the response description and example to show the actual structure — including the data wrapper — prevents confusion for every future developer.'
          }
        },
        {
          slug: 'github-docs-workflow',
          title: 'GitHub-Based Documentation Workflows',
          minutes: 30,
          objectives: [
            'Create, edit and review documentation through pull requests on GitHub',
            'Use branches, commits and review comments to collaborate on doc changes',
            'Set up automated checks and previews for documentation builds'
          ],
          sections: [
            { heading: 'Docs as code in GitHub', body: 'Treating documentation like code means storing it in the same repository, using the same branching model, and reviewing changes through pull requests. Every doc edit goes through a review cycle where peers can comment on accuracy, style and completeness. This workflow produces documentation that stays in sync with the product because the same process governs both.' },
            { heading: 'Pull request workflow for docs', body: 'Create a feature branch, make your changes, open a pull request with a clear title and description, and request review from a subject-matter expert and a writing peer. The PR description should explain what changed and why. Reviewers comment on accuracy, clarity and style. Once approved, the PR merges and the documentation site rebuilds.' },
            { heading: 'Automated checks and previews', body: 'CI pipelines can lint Markdown for broken links, validate code snippets compile, and build the documentation site so reviewers see a live preview before merging. Setting up these checks once prevents entire categories of errors — broken links, formatting mistakes and outdated examples — from reaching production documentation.' }
          ],
          links: [
            { title: 'GitHub pull request documentation', url: 'https://docs.github.com/en/pull-requests', sourceName: 'GitHub Documentation', resourceType: 'guide', relationship: 'Official guide to creating, reviewing and merging pull requests on GitHub.' },
            { title: 'GitHub Actions documentation', url: 'https://docs.github.com/en/actions', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'Documentation for GitHub Actions — used to automate documentation builds and checks.' },
            { title: 'Write the Docs — docs-as-code', url: 'https://www.writethedocs.org/guide/docs-as-code/', sourceName: 'Write the Docs', resourceType: 'guide', relationship: 'Community guide to using Git, PRs and CI for documentation workflows.' }
          ],
          quiz: {
            prompt: 'You are updating API documentation after a breaking change. What is the correct workflow?',
            options: [
              'Edit the documentation file directly on the main branch',
              'Create a feature branch, update the docs, open a PR for review, and merge after approval',
              'Ask the developer to update the docs when they have time',
              'Create an issue describing the needed update and close it'
            ],
            answerIndex: 1,
            explanation: 'A feature branch with a pull request ensures the doc changes are reviewed for accuracy and style before reaching production, just like code changes.'
          }
        },
        {
          slug: 'editing-reviewing-docs',
          title: 'Editing & Reviewing Documentation',
          minutes: 28,
          objectives: [
            'Perform a structural edit that improves organization and completeness before line-editing',
            'Apply copyediting rules for grammar, style guide compliance and consistency',
            'Give and receive actionable feedback on documentation through PR reviews'
          ],
          sections: [
            { heading: 'Two-pass editing', body: 'Effective editing happens in passes. The first pass is structural: Is the content in the right place? Does the structure match the reader\'s needs? Are major topics covered? The second pass is line-level: grammar, style guide compliance, consistency and clarity. Trying to fix typos before fixing structure wastes time because you may delete paragraphs that need to move, not disappear.' },
            { heading: 'Style guide compliance in practice', body: 'When editing, keep the project style guide open alongside the document. Check each term against the glossary, verify capitalization matches the standard, confirm UI element formatting follows the guide and ensure voice and tone are consistent. Most style violations are systematic — once you spot a pattern, you can fix every instance in a single pass.' },
            { heading: 'Giving useful review feedback', body: 'Good review comments explain the problem and suggest a fix, not just "this is unclear." Say what was unclear and propose specific rewording. Reference the style guide rule being violated. Separate blocking issues from suggestions. A review that educates the writer makes the next review faster.' }
          ],
          links: [
            { title: 'Write the Docs — reviewing documentation', url: 'https://www.writethedocs.org/guide/producing-docs/', sourceName: 'Write the Docs', resourceType: 'guide', relationship: 'Community guidance on documentation review processes and giving constructive feedback.' },
            { title: 'Microsoft Writing Style Guide', url: 'https://learn.microsoft.com/en-us/style-guide/welcome/', sourceName: 'Microsoft Writing Style Guide', resourceType: 'documentation', relationship: 'The style reference to consult during copyediting for consistency and correctness.' },
            { title: 'Google technical writing — second course', url: 'https://developers.google.com/tech-writing/two', sourceName: 'Google Technical Writing', resourceType: 'course', relationship: 'Covers editing principles including paragraph and passage-level improvements.' }
          ],
          quiz: {
            prompt: 'You are reviewing a documentation PR and find that the API response example uses a different field name than the actual API. What is the most helpful review comment?',
            options: [
              '"Wrong."',
              '"This needs fixing."',
              '"The field user_name in the example should be userName to match the API response — see the endpoint source at api/users.ts:42."',
              '"Looks good to me."'
            ],
            answerIndex: 2,
            explanation: 'A useful review comment identifies the specific error, explains what is correct and provides a reference source so the writer can fix it confidently.'
          }
        }
      ]
    },
    {
      slug: 'documentation-strategy',
      stage: 'Advanced',
      title: 'Documentation Strategy & Information Architecture',
      description: 'Planning documentation programs at scale — measuring impact, governing content and building sustainable writing processes.',
      topics: [
        {
          slug: 'measuring-doc-success',
          title: 'Measuring Documentation Quality & Impact',
          minutes: 28,
          objectives: [
            'Define metrics that measure documentation usefulness, not just volume',
            'Use analytics and feedback loops to identify docs that need improvement',
            'Build a documentation health dashboard that the team reviews regularly'
          ],
          sections: [
            { heading: 'Beyond page views', body: 'Page views tell you how many people found a page, not whether it helped them. Useful metrics include time on page relative to content length (too short suggests abandonment, too long suggests confusion), search queries that return no results (gaps in coverage), and support ticket volume for topics your docs should answer.' },
            { heading: 'Feedback loops', body: 'A "Was this helpful?" button, a feedback form or a link to an issue tracker lets readers flag problems directly. Categorizing feedback — unclear steps, missing information, outdated content — reveals patterns. Pages with high traffic and low satisfaction scores are your highest-priority improvement targets.' },
            { heading: 'The documentation health dashboard', body: 'A lightweight dashboard tracking pages with recent updates, pages with unresolved feedback, broken links and search queries with no results gives the team a weekly pulse on documentation health. Reviewing it in a standing meeting keeps documentation quality visible and prevents slow decay that no individual notices.' }
          ],
          links: [
            { title: 'Write the Docs — measuring docs', url: 'https://www.writethedocs.org/guide/', sourceName: 'Write the Docs', resourceType: 'guide', relationship: 'Community advice on measuring documentation success and building feedback loops.' },
            { title: 'Microsoft Writing Style Guide', url: 'https://learn.microsoft.com/en-us/style-guide/welcome/', sourceName: 'Microsoft Writing Style Guide', resourceType: 'documentation', relationship: 'Guidance on content quality standards that inform measurement criteria.' },
            { title: 'GitHub Documentation', url: 'https://docs.github.com/en', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'An example of large-scale documentation with built-in feedback mechanisms.' }
          ],
          quiz: {
            prompt: 'Your analytics show that the "Getting Started" guide has very high page views but users spend an average of 30 seconds on the page. What is the most likely interpretation?',
            options: [
              'The guide is so well written that users finish it instantly',
              'Users are landing on the page, realizing it is not what they need, and leaving',
              'The analytics tracking is broken',
              'The page is loading too slowly to read'
            ],
            answerIndex: 1,
            explanation: 'Extremely short time on a long-form page almost always indicates that readers are not finding what they expected. The content, title or navigation is misleading, or the page needs restructuring to serve the actual audience.'
          }
        },
        {
          slug: 'content-governance',
          title: 'Content Governance & Lifecycle',
          minutes: 30,
          objectives: [
            'Establish ownership, review cadence and retirement policies for documentation',
            'Design a content lifecycle from creation through archival',
            'Manage documentation across multiple versions and product releases'
          ],
          sections: [
            { heading: 'Who owns the docs?', body: 'Without clear ownership, documentation decays. Assigning an owner to every page or section means someone is responsible for keeping it accurate, updating it when the product changes and retiring it when it is no longer relevant. Ownership does not mean doing all the writing — it means ensuring the content is maintained.' },
            { heading: 'The content lifecycle', body: 'Documentation goes through stages: draft, review, publish, maintain and retire. A lifecycle process defines who acts at each stage, what "ready to publish" means and how old content gets reviewed. Pages without a scheduled review date are ticking time bombs — the product will change and the docs will silently become wrong.' },
            { heading: 'Versioning and release management', body: 'Products with multiple supported versions need documentation that matches. A version selector in the navigation, clear version labels and a policy for when old-version docs are archived prevent users from following instructions for a version they are not running. Automating versioned builds from release branches keeps docs synchronized with releases.' }
          ],
          links: [
            { title: 'GitHub Documentation — versioning', url: 'https://docs.github.com/en', sourceName: 'GitHub Documentation', resourceType: 'documentation', relationship: 'GitHub Docs demonstrates versioned documentation with multiple product versions.' },
            { title: 'Write the Docs — documentation lifecycle', url: 'https://www.writethedocs.org/guide/', sourceName: 'Write the Docs', resourceType: 'guide', relationship: 'Community guidance on managing documentation through its full lifecycle.' },
            { title: 'Microsoft Writing Style Guide', url: 'https://learn.microsoft.com/en-us/style-guide/welcome/', sourceName: 'Microsoft Writing Style Guide', resourceType: 'documentation', relationship: 'Microsoft\'s approach to governance and consistency across a massive documentation corpus.' }
          ],
          quiz: {
            prompt: 'A feature you documented six months ago has been deprecated in the latest release. What should you do with the documentation?',
            options: [
              'Leave it in place in case someone still uses the old version',
              'Delete the page immediately without a redirect',
              'Add a clear deprecation notice, update the page to note the replacement feature and retire the page on a documented schedule',
              'Archive the entire documentation site and start over'
            ],
            answerIndex: 2,
            explanation: 'A deprecation notice with a migration path helps remaining users, and a scheduled retirement ensures the page is eventually removed so it does not mislead new readers.'
          }
        },
        {
          slug: 'cross-functional-collaboration',
          title: 'Collaborating with Engineers & Product Teams',
          minutes: 25,
          objectives: [
            'Establish a sustainable process for gathering technical information from engineers',
            'Translate complex technical concepts into user-friendly documentation',
            'Advocate for documentation quality as part of the product development process'
          ],
          sections: [
            { heading: 'Getting information from engineers', body: 'Engineers are busy and often view documentation as secondary to shipping code. The most effective writers do not wait for complete specifications — they attend design reviews, read pull requests and ask targeted questions. A 15-minute chat with the engineer who built a feature yields more accurate information than guessing from API output.' },
            { heading: 'Translating complexity', body: 'A writer\'s job is not to dumb things down — it is to make complexity accessible. This means understanding the technology well enough to explain it accurately, identifying which details matter for the reader and which are implementation noise, and choosing analogies and examples that connect to what the reader already knows.' },
            { heading: 'Making documentation part of the definition of done', body: 'Documentation that is written after the feature ships is already outdated and rushed. The most effective teams include documentation in the definition of done: a feature is not finished until the docs are reviewed, accurate and merged. This makes documentation a shared responsibility, not an afterthought.' }
          ],
          links: [
            { title: 'Write the Docs — working with engineers', url: 'https://www.writethedocs.org/guide/', sourceName: 'Write the Docs', resourceType: 'guide', relationship: 'Community advice on collaborating with engineering teams on documentation.' },
            { title: 'GitHub Documentation — contributing', url: 'https://docs.github.com/en/contributing', sourceName: 'GitHub Documentation', resourceType: 'guide', relationship: 'How GitHub\'s own docs team collaborates with engineers through contributing guidelines.' },
            { title: 'Google technical writing — first course', url: 'https://developers.google.com/tech-writing/one', sourceName: 'Google Technical Writing', resourceType: 'course', relationship: 'Covers the writing fundamentals needed to translate technical concepts clearly.' }
          ],
          quiz: {
            prompt: 'An engineer hands you a complex architectural design doc and says "just publish this as the user-facing documentation." What should you do?',
            options: [
              'Publish it as-is because the engineer is the subject-matter expert',
              'Rewrite it from the user\'s perspective, focusing on what they need to know and do, not how the system is built internally',
              'Refuse to touch it and tell the engineer to write the docs themselves',
              'Publish it with a note that it is written for developers'
            ],
            answerIndex: 1,
            explanation: 'Architecture docs serve a different audience than user documentation. The writer\'s job is to translate the technical details into what the user needs — the interface, the behavior and the workflow — not the internal implementation.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'End-to-End Documentation Project',
    coverage: [
      'Style Guide Application',
      'Markdown & Structured Documentation',
      'API Reference Writing',
      'GitHub-Based Workflow',
      'Content Strategy & Information Architecture'
    ],
    brief:
      'Write a complete documentation set for a fictional REST API that manages a task-tracking application. You will define the documentation structure, write task-based guides, a full API reference and an error reference, host the docs in a GitHub repository using a static site generator, and submit all changes through a realistic pull request workflow.',
    requirements: [
      'Create a documentation site with a landing page, navigation hierarchy and at least eight pages',
      'Write at least three task-based how-to guides that follow a consistent procedure format',
      'Document at least five REST API endpoints with request examples, response schemas and error codes',
      'Write an error reference covering at least eight error conditions with causes and fixes',
      'Apply the Microsoft Writing Style Guide consistently across all pages',
      'Use Markdown hosted in a GitHub repository with at least one pull request demonstrating the review workflow',
      'Include a project style sheet documenting local style decisions'
    ],
    expectedOutput:
      'A complete, navigable documentation site hosted on GitHub with task guides, API references, error documentation and a documented writing process that follows the Microsoft Writing Style Guide.',
    rubric: [
      { skill: 'Style & Consistency', weight: 20, criteria: 'Consistent application of the Microsoft Writing Style Guide across all pages with a documented project style sheet' },
      { skill: 'Structured Documentation', weight: 25, criteria: 'Clear information architecture with appropriate content types, navigation and a useful landing page' },
      { skill: 'API Reference Quality', weight: 25, criteria: 'Accurate endpoint documentation with request/response examples, status codes and error coverage' },
      { skill: 'GitHub Workflow', weight: 15, criteria: 'Documentation maintained in Git with at least one reviewed pull request demonstrating the docs-as-code process' },
      { skill: 'Reader Focus', weight: 15, criteria: 'Content is written for the target audience with appropriate tone, task-based structure and scannable formatting' }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'Style-Guided Documentation Rewrite',
      stage: 'Beginner',
      objective: 'Rewrite a provided draft of unclear documentation to apply the Microsoft Writing Style Guide conventions for active voice, sentence structure and formatting.',
      requirements: [
        'Read and analyze the provided draft documentation for style violations',
        'Create a project style sheet documenting your terminology and formatting decisions',
        'Rewrite all sections using active voice, short sentences and clear headings',
        'Add structured formatting: bullet lists for key facts, numbered steps for procedures, bold for UI elements',
        'Write a brief summary of the changes you made and the style rules you applied'
      ],
      skillsEvaluated: ['Style Guide Application', 'Editing', 'Markdown', 'Clarity'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the rewritten documentation in Markdown, your project style sheet and a summary of style changes applied.',
        textLabel: 'Style change summary',
        minTextLength: 600,
        linkLabels: ['Rewritten documentation', 'Style sheet']
      }
    },
    {
      title: 'Task-Based API How-To Guide',
      stage: 'Intermediate',
      objective: 'Write a complete, task-based how-to guide for a provided API endpoint that walks a developer through a real-world integration scenario from setup to verification.',
      requirements: [
        'Write a prerequisites section listing everything the reader needs before starting',
        'Provide numbered steps with one action per step and a testable result for each',
        'Include request and response examples in Markdown code blocks with language tags',
        'Document at least three error conditions the reader might encounter with fixes',
        'Add a troubleshooting section for the five most common issues'
      ],
      skillsEvaluated: ['Technical Writing', 'API Documentation', 'Task-Based Writing', 'Markdown'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the how-to guide in Markdown format and a short note explaining how you verified the accuracy of the technical content.',
        textLabel: 'Accuracy verification note',
        minTextLength: 800,
        linkLabels: ['How-to guide']
      }
    },
    {
      title: 'Documentation Repository with GitHub Workflow',
      stage: 'Advanced',
      objective: 'Build a small documentation repository on GitHub that demonstrates a complete docs-as-code workflow including structure, automation and review.',
      requirements: [
        'Set up a documentation repository with a static site generator (e.g., MkDocs or Docusaurus)',
        'Create a documentation set with a landing page, at least eight pages and a navigation hierarchy',
        'Configure a GitHub Actions workflow that builds the site and checks for broken links',
        'Open at least two pull requests demonstrating branch, review and merge workflow',
        'Include a contributing guide explaining how new contributors should write and submit documentation'
      ],
      skillsEvaluated: ['GitHub Workflow', 'Information Architecture', 'CI/CD', 'Documentation Strategy'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the GitHub repository URL, a PDF export of the built site and a written overview of your documentation architecture decisions.',
        textLabel: 'Architecture overview',
        minTextLength: 1000,
        linkLabels: ['GitHub repository', 'Site export']
      }
    }
  ],

  simTasks: [
    {
      title: 'Rewrite a legacy API reference',
      context: 'The engineering team shipped a new payments API but the only existing documentation is a 200-line internal wiki page written by an engineer who has since left the company. The wiki page mixes conceptual explanation with endpoint details and uses inconsistent terminology. Sales is about to demo the API to a major prospect and needs user-facing docs ready in one week.',
      requirements: [
        'Audit the existing wiki page for accuracy by comparing it against the actual API endpoints',
        'Restructure the content into a landing page, task-based guides and an API reference section',
        'Rewrite all endpoint documentation using the Microsoft Writing Style Guide',
        'Add request and response examples with realistic data',
        'Set up the docs in a GitHub repository and open a PR for engineering review'
      ],
      priority: 'critical',
      dueDayOffset: 5,
      expectedOutput: 'A restructured, style-compliant documentation set in a GitHub repository with a PR ready for engineering review.',
      skills: ['API Documentation', 'Style Guides', 'Information Architecture', 'GitHub Workflow']
    },
    {
      title: 'Create a troubleshooting guide from support tickets',
      context: 'The support team reports that 40% of incoming tickets are about the same five issues with the product\'s authentication flow. The product manager asks you to write a troubleshooting guide that deflects these tickets without requiring users to contact support.',
      requirements: [
        'Analyze the five most common support ticket themes and identify the underlying user confusion',
        'Write a troubleshooting guide with a clear decision-tree structure for each issue',
        'Include screenshots or diagrams describing where users get stuck',
        'Document each issue\'s symptoms, cause and step-by-step resolution',
        'Get the guide reviewed by at least two support agents for accuracy'
      ],
      priority: 'high',
      dueDayOffset: 7,
      expectedOutput: 'A troubleshooting guide that maps each common issue to a clear resolution, ready to publish on the support site.',
      skills: ['Audience Analysis', 'Task-Based Writing', 'Troubleshooting Documentation', 'Stakeholder Collaboration']
    },
    {
      title: 'Draft a release notes document for a breaking change',
      context: 'The product team is planning a major version release that includes three breaking API changes, two new features and several deprecations. The release ships in two weeks and the documentation must be ready for developers who depend on the API.',
      requirements: [
        'Categorize changes into breaking changes, new features and deprecations',
        'Write a migration guide for each breaking change with before-and-after code examples',
        'Document new features with brief descriptions and links to full reference pages',
        'Write deprecation notices with timelines and replacement recommendations',
        'Format the document for publication on the documentation site and as a blog post'
      ],
      priority: 'high',
      dueDayOffset: 5,
      expectedOutput: 'A release notes document with migration guides, new feature descriptions and deprecation notices, formatted for both docs site and blog publication.',
      skills: ['Release Communication', 'API Documentation', 'Migration Guides', 'Versioning']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Raj Patel',
      personaRole: 'Senior Backend Engineer',
      situation: 'You need to get accurate technical details for API documentation from an engineer who considers documentation a distraction from feature work.',
      openingMessage:
        'I know you want details on the new payments endpoint but I am in the middle of sprint work and honestly the existing wiki page covers most of it. Can you just work from that?',
      expectedPoints: [
        'Acknowledges the engineer\'s time constraints and proposes a time-efficient approach',
        'Identifies specific gaps in the existing wiki that need engineering input',
        'Proposes a 15-minute focused chat instead of a long meeting',
        'Explains how accurate docs reduce future support interruptions for the engineer'
      ]
    },
    {
      kind: 'team',
      personaName: 'Sophie Laurent',
      personaRole: 'Product Manager',
      situation: 'A product manager wants to launch a feature without documentation and add docs later, but you know the feature is complex enough that users will struggle without guidance.',
      openingMessage:
        'We are shipping the new reporting dashboard on Friday and I want to launch without docs. We can write them the week after. The feature is pretty self-explanatory.',
      expectedPoints: [
        'Respects the launch timeline while raising the user-risk of launching undocumented',
        'Proposes a minimal viable documentation set that can ship on time',
        'Explains the cost difference between writing docs pre-launch versus fixing confusion post-launch',
        'Suggests a concrete compromise such as a quick-start guide with full docs to follow'
      ]
    },
    {
      kind: 'client',
      personaName: 'Marcus Webb',
      personaRole: 'CTO, Finova Systems',
      situation: 'The client\'s development team is struggling to integrate with your API because the documentation is incomplete and outdated, and they are considering switching to a competitor.',
      openingMessage:
        'Our developers have spent three days trying to get your payments API working and the docs are missing half the information they need. We have a deadline and I am starting to question whether this is the right platform.',
      expectedPoints: [
        'Takes the criticism seriously and validates the frustration without being defensive',
        'Identifies the specific documentation gaps causing the integration delay',
        'Provides immediate support: direct answers, code examples or a call with the docs team',
        'Communicates a concrete plan and timeline for fixing the documentation gaps'
      ]
    },
    {
      kind: 'client',
      personaName: 'Ayumi Tanaka',
      personaRole: 'Engineering Lead, NovaPay',
      situation: 'The client wants to contribute improvements to your open-source documentation through pull requests but is unfamiliar with your style guide and review process.',
      openingMessage:
        'We have found several issues in your API docs and our engineers would like to submit fixes. We have never contributed to your project before — how do we get started without creating a mess?',
      expectedPoints: [
        'Welcomes the contribution and explains it is valued by the project',
        'Points them to the contributing guide, style sheet and getting-started instructions',
        'Explains the PR review process and what reviewers look for',
        'Offers to review their first PR quickly to provide feedback and build confidence'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation: 'You discover that a documentation page you wrote three months ago contains an incorrect code example that is causing developers to experience authentication failures. The page has been viewed 2,000 times since publication.',
      requiredActions: [
        { action: 'Fix the code example immediately and verify it against the current API', good: true, note: 'Correcting an error that is actively harming users is the highest-priority task for a technical writer.' },
        { action: 'Add a brief note or changelog entry explaining what was corrected', good: true, note: 'Transparency about corrections builds trust with readers who may have been affected.' },
        { action: 'Notify the support team about the fix so they can update their responses to affected tickets', good: true, note: 'Support teams need to know about documentation corrections to handle backlog tickets accurately.' },
        { action: 'Wait for someone else to report the issue before fixing it', good: false, note: 'Leaving a known error in published documentation while users are affected by it is a failure of documentation quality.' }
      ]
    },
    {
      category: 'Process improvement',
      situation: 'The documentation site has grown to 200 pages over two years but nobody has reviewed most pages in over a year. Several pages reference deprecated features and some contain broken links. The team has no process for keeping content current.',
      requiredActions: [
        { action: 'Audit the full site to identify pages with outdated content, broken links and deprecated references', good: true, note: 'A systematic audit provides the data needed to prioritize cleanup and build a maintenance process.' },
        { action: 'Propose a content review schedule that assigns ownership and review dates to every page', good: true, note: 'A documented review schedule prevents the same decay from recurring after cleanup.' },
        { action: 'Set up automated link checking in the CI pipeline to catch broken links continuously', good: true, note: 'Automation catches an entire category of maintenance problems without manual effort.' },
        { action: 'Delete the entire documentation site and start over from scratch', good: false, note: 'Destroying existing content discards accurate, valuable pages alongside outdated ones and wastes significant accumulated effort.' }
      ]
    }
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between task-based documentation, conceptual documentation and API reference. When should a technical writer use each?',
      guidancePoints: [
        'Task-based docs answer "how do I do X" with numbered steps and a clear outcome',
        'Conceptual docs answer "how does X work" with explanations, diagrams and context',
        'API reference answers "what does this endpoint do" with parameters, types, examples and errors',
        'Mixing these types on a single page confuses readers who came for one and got the other'
      ]
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'How would you document a REST API endpoint that accepts a JSON body with multiple optional fields?',
      guidancePoints: [
        'List every field with its type, whether it is required or optional and a default value if applicable',
        'Provide a complete request example with all optional fields shown and commented',
        'Provide a minimal request example showing only required fields',
        'Document the response schema, status codes and error cases for invalid field combinations'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'You are asked to document a feature that is changing rapidly during development. How do you keep documentation accurate without rewriting it every day?',
      guidancePoints: [
        'Attend design reviews and read PRs to track changes early rather than catching up after the fact',
        'Write documentation against stable interfaces rather than implementation details that change frequently',
        'Use modular pages so individual sections can be updated without rewriting entire documents',
        'Flag known instabilities with notices and plan a final accuracy review before the feature ships'
      ]
    },
    {
      dimension: 'problem_solving',
      prompt: 'A developer tells you that your documentation is wrong, but the documentation matches the code in the repository. How do you handle this?',
      guidancePoints: [
        'Take the report seriously — the developer may be running a different version or configuration',
        'Reproduce the developer\'s scenario to verify whether the docs, the code or the environment differs',
        'Check whether the issue is version-specific, configuration-specific or a genuine documentation bug',
        'Update the documentation to cover the discovered scenario and thank the reporter'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'Your manager suggests writing shorter docs to save time, arguing that developers prefer to figure things out themselves. How do you respond?',
      guidancePoints: [
        'Short docs save writing time but shift cost to every reader who has to figure things out manually',
        'Data from analytics, support tickets and developer surveys can quantify the cost of insufficient documentation',
        'Quality and completeness matter more than length — a concise but complete page is ideal',
        'Propose a middle ground: prioritize thorough docs for complex or high-traffic areas and keep simple topics brief'
      ]
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'You discover that two product teams are writing documentation for the same feature independently, creating conflicting and duplicated content. What do you do?',
      guidancePoints: [
        'Propose a single documentation owner or a shared review process to eliminate duplication',
        'Create a documentation map that assigns every feature to a responsible team or writer',
        'Establish a style sheet and template so both teams write with consistent structure and terminology',
        'Merge the existing content into a single authoritative page rather than maintaining two versions'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'Explain to a non-technical stakeholder why updating documentation is important for the business, not just a nice-to-have for developers.',
      guidancePoints: [
        'Accurate documentation reduces support ticket volume and the cost of handling each ticket',
        'Good docs shorten the onboarding time for new customers and new employees',
        'Documentation quality directly affects customer satisfaction, retention and willingness to recommend',
        'Outdated or missing docs create liability if customers make decisions based on incorrect information'
      ]
    },
    {
      dimension: 'communication',
      prompt: 'How would you explain a complex authentication flow to a developer audience who is integrating your API for the first time?',
      guidancePoints: [
        'Start with a one-sentence summary of what the authentication flow accomplishes',
        'Provide a step-by-step walkthrough with request/response examples they can copy',
        'Include a visual diagram showing the sequence of requests and token exchanges',
        'Link to deeper conceptual content for readers who want to understand why the flow works this way'
      ]
    }

  ]

}
