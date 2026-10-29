import type { CareerDef } from '../framework.js'

export const productDesigner: CareerDef = {
  slug: 'product-designer',
  name: 'Product Designer',
  category: 'Design',
  order: 41,
  description:
    'Owns products end to end — discovery, flows, IA, UI craft, design systems and collaboration with engineering.',
  difficulty: 'Intermediate',
  pathSummary:
    'Product Designers begin by mastering user research and discovery methods, progress through information architecture and interaction design, build pixel-perfect UI with design tokens and systems, and culminate in shipping polished products through tight cross-functional collaboration.',
  mainSkills: [
    'User research and synthesis',
    'Information architecture',
    'Interaction and flow design',
    'Visual UI design',
    'Design systems and tokens',
    'Prototyping and testing',
    'Accessibility (WCAG)',
    'Cross-functional collaboration',
  ],
  sourcePlatforms: [
    'Figma',
    'Nielsen Norman Group',
    'Material Design',
    'Apple Human Interface Guidelines',
    'W3C / WCAG',
  ],
  companyName: 'Bridgecraft Labs',
  roleTitle: 'Product Designer',

  chapters: [
    {
      slug: 'discovery-and-research',
      stage: 'Beginner',
      title: 'Discovery and Research',
      description:
        'Learn how product designers uncover user needs through research methods, journey mapping, and problem framing before a single pixel is placed.',
      topics: [
        {
          slug: 'research-methods',
          title: 'User Research Methods',
          minutes: 28,
          objectives: [
            'Distinguish between qualitative and quantitative research methods used in product design.',
            'Plan a guerrilla usability test with 5 participants and a task script.',
            'Synthesise research findings into actionable insights using an affinity diagram.',
          ],
          sections: [
            {
              heading: 'Qualitative vs. Quantitative',
              body: 'Qualitative methods — interviews, usability tests, diary studies — reveal the "why" behind user behaviour. Quantitative methods — surveys, analytics, A/B tests — reveal the "what" and "how much." Nielsen Norman Group recommends starting with qualitative research in early product stages to identify the right problems before measuring solutions at scale.',
            },
            {
              heading: 'Planning Usability Tests',
              body: 'A usability test needs a clear goal, a task script, and a neutral moderator. Recruiting 5 participants typically surfaces 80% of usability issues according to Jakob Nielsen\'s classic findings. Tasks should be realistic scenarios, not step-by-step instructions — "You want to return an item you purchased" rather than "Click the return button."',
            },
            {
              heading: 'Affinity Diagramming',
              body: 'After conducting research, designers write individual findings on sticky notes and group them into clusters on a wall or digital whiteboard. This affinity diagramming process reveals patterns, pain points, and opportunities that individual observations miss. Figma FigJam and Miro both support remote affinity mapping.',
            },
          ],
          links: [
            {
              title: 'Which UX Research Methods to Use',
              url: 'https://www.nngroup.com/articles/which-ux-research-methods/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Apple HIG — Understanding Users',
              url: 'https://developer.apple.com/design/human-interface-guidelines/accessing-private-data',
              sourceName: 'Apple Human Interface Guidelines',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Material Design — Understand Your Users',
              url: 'https://m3.material.io/foundations/content-design/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'How many participants does Jakob Nielsen recommend for a usability test to uncover most usability issues?',
            options: ['1–2', '5', '15–20', '50+'],
            answerIndex: 1,
            explanation:
              'Nielsen\'s research showed that testing with 5 users typically uncovers about 85% of usability issues, making it a cost-effective approach for most teams.',
          },
        },
        {
          slug: 'journey-mapping',
          title: 'Customer Journey Mapping',
          minutes: 27,
          objectives: [
            'Construct an end-to-end journey map covering awareness, onboarding, and retention stages.',
            'Identify emotional highs and lows (pain points and moments of delight) across the journey.',
            'Link journey-map insights to specific product opportunities using "How Might We" prompts.',
          ],
          sections: [
            {
              heading: 'What Is a Journey Map?',
              body: 'A journey map is a visual narrative of a user\'s experience over time. It plots actions, thoughts, and emotions across stages of a process — for example, signing up for a fitness app, completing a first workout, and returning the next week. Maps keep teams aligned on the holistic user experience rather than individual screens.',
            },
            {
              heading: 'Plotting Emotions and Pain Points',
              body: 'Beneath each stage, designers annotate the user\'s emotional state (frustrated, confused, satisfied) and specific friction points. A steep emotional drop during onboarding, for instance, signals a high-priority opportunity. Nielsen Norman Group emphasises that empathy is the primary output of journey mapping.',
            },
            {
              heading: 'From Map to Opportunities',
              body: 'After mapping, the team brainstorms "How Might We" (HMW) questions tied to each pain point. HMW prompts like "How might we reduce cognitive load during account setup?" translate empathy into actionable design briefs that can feed directly into ideation sprints.',
            },
          ],
          links: [
            {
              title: 'Journey Mapping 101',
              url: 'https://www.nngroup.com/articles/journey-mapping-101/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Figma FigJam for Journey Mapping',
              url: 'https://help.figma.com/hc/en-us/articles/24417925858711-FigJam-basics',
              sourceName: 'Figma',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Material Design — User Journey',
              url: 'https://m3.material.io/foundations/content-design/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What is the primary purpose of a customer journey map in product design?',
            options: [
              'To document technical architecture',
              'To visualise the holistic user experience across stages over time',
              'To define the colour palette for a product',
              'To list all features in the backlog',
            ],
            answerIndex: 1,
            explanation:
              'Journey maps capture the end-to-end user experience, including actions, thoughts, and emotions at each stage, helping teams identify pain points and opportunities holistically.',
          },
        },
        {
          slug: 'problem-framing',
          title: 'Problem Framing and Design Briefs',
          minutes: 26,
          objectives: [
            'Write a problem statement using the "User + Need + Insight" template.',
            'Differentiate between a problem statement and a solution hypothesis.',
            'Create a one-page design brief that aligns stakeholders before ideation begins.',
          ],
          sections: [
            {
              heading: 'The Problem Statement',
              body: 'A strong problem statement follows the format: [User] needs [Need] because [Insight]. For example: "New parents need a quick way to log feed times because they are sleep-deprived and forget details." This format keeps the team focused on the user\'s reality, not a proposed feature.',
            },
            {
              heading: 'Problem vs. Solution',
              body: 'Teams often jump to solutions before fully understanding the problem. A problem statement describes the gap between the current state and the desired state. A solution hypothesis — "We should add a timer button" — comes later. Mixing them leads to building the wrong thing elegantly.',
            },
            {
              heading: 'The One-Page Design Brief',
              body: 'A design brief captures context (background, constraints), the problem statement, target users, success metrics, and timeline. It is shared with engineering, product, and design before any screen is designed. A well-written brief prevents mid-sprint pivots caused by misaligned expectations.',
            },
          ],
          links: [
            {
              title: 'Problem Framing for Designers',
              url: 'https://www.nngroup.com/articles/problem-framing/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Apple HIG — Defining Your App',
              url: 'https://developer.apple.com/design/human-interface-guidelines/foundations',
              sourceName: 'Apple Human Interface Guidelines',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'W3C — Design Thinking and Accessibility',
              url: 'https://www.w3.org/WAI/planning/content-usable/',
              sourceName: 'W3C / WCAG',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Which template format is commonly used to write an effective problem statement?',
            options: [
              'Feature + Benefit + Timeline',
              'User + Need + Insight',
              'Design + Code + Deploy',
              'Hypothesis + Metric + Goal',
            ],
            answerIndex: 1,
            explanation:
              'The "User + Need + Insight" format keeps the problem statement grounded in the user\'s real-world context rather than prescribing a solution.',
          },
        },
      ],
    },

    {
      slug: 'information-architecture-and-flows',
      stage: 'Foundation',
      title: 'Information Architecture and Flows',
      description:
        'Design intuitive navigation structures, screen flows, and interaction patterns that make products feel effortless.',
      topics: [
        {
          slug: 'ia-fundamentals',
          title: 'Information Architecture Fundamentals',
          minutes: 29,
          objectives: [
            'Apply card sorting to organise content into logical categories.',
            'Create a site map that reflects user mental models rather than internal org charts.',
            'Evaluate an IA using the "three-click rule" and depth-to-breadth ratio.',
          ],
          sections: [
            {
              heading: 'Card Sorting',
              body: 'Card sorting asks participants to group content items into categories that make sense to them. Open card sorts let users define categories; closed card sorts use pre-defined ones. The results reveal how users naturally organise information, which should drive navigation labels and grouping.',
            },
            {
              heading: 'Site Maps and Mental Models',
              body: 'A site map is a hierarchical diagram of all screens or pages in a product. If the site map mirrors the company\'s internal departments rather than user goals, navigation will feel confusing. Nielsen Norman Group recommends tree testing to validate that users can find items in your proposed structure.',
            },
            {
              heading: 'Depth vs. Breadth',
              body: 'Narrow-and-deep navigation requires many clicks to reach content; wide-and-shallow navigation presents too many choices at once. The ideal balance depends on task complexity. Apple HIG recommends surfacing the most common tasks at the top level and burying advanced options deeper.',
            },
          ],
          links: [
            {
              title: 'Information Architecture for the Web',
              url: 'https://www.nngroup.com/articles/information-architecture-ux/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Apple HIG — Navigation Bars',
              url: 'https://developer.apple.com/design/human-interface-guidelines/navigation-bars',
              sourceName: 'Apple Human Interface Guidelines',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Material Design — Navigation',
              url: 'https://m3.material.io/components/navigation-bar/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What does a closed card sort differ from an open card sort?',
            options: [
              'Closed card sorts use sticky notes; open card sorts use digital tools',
              'Closed card sorts provide pre-defined categories; open card sorts let users create their own',
              'Closed card sorts are done remotely; open card sorts are done in person',
              'Closed card sorts test prototypes; open card sorts test wireframes',
            ],
            answerIndex: 1,
            explanation:
              'In a closed card sort, participants sort items into categories provided by the designer. In an open card sort, they create their own categories, revealing their mental models.',
          },
        },
        {
          slug: 'screen-flows',
          title: 'Screen Flows and User Tasks',
          minutes: 28,
          objectives: [
            'Map a primary user task from entry point to completion as a linear flow diagram.',
            'Identify and design branching paths for error states and edge cases.',
            'Use Figma\'s flow feature to annotate a prototype with user-goals at each step.',
          ],
          sections: [
            {
              heading: 'Primary Task Flows',
              body: 'A task flow maps every screen a user encounters to complete a single goal — for example, "add a product to cart and check out." Each step is a screen or decision point. Flows surface unnecessary steps, reveal dead ends, and ensure every exit leads somewhere intentional.',
            },
            {
              heading: 'Branching and Edge Cases',
              body: 'Real users don\'t follow happy paths. They lose connectivity, enter invalid data, or change their minds mid-flow. Product designers must map error states, confirmation dialogs, and recovery paths for every primary flow. A checkout flow without a "back" option creates user anxiety.',
            },
            {
              heading: 'Figma Flow Annotations',
              body: 'Figma allows designers to place flow connections between frames, creating visual diagrams of user journeys. Annotating each connection with the user\'s goal (e.g. "User selects size") makes the flow readable for engineers and product managers during reviews.',
            },
          ],
          links: [
            {
              title: 'User Flows, Task Flows, and Screen Flows',
              url: 'https://www.nngroup.com/articles/user-flows-task-flows/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Figma Prototyping Flows',
              url: 'https://help.figma.com/hc/en-us/articles/360040318013',
              sourceName: 'Figma',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Material Design — Error States',
              url: 'https://m3.material.io/components/text-fields/guidelines',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Why is it critical to map error states and edge cases in a user flow?',
            options: [
              'They look good in the final prototype',
              'They help the developer write unit tests',
              'Real users encounter them and without recovery paths they get stuck',
              'They are required by WCAG for screen reader navigation',
            ],
            answerIndex: 2,
            explanation:
              'Error states and edge cases are real user scenarios. Without designed recovery paths, users hit dead ends and abandon the task.',
          },
        },
        {
          slug: 'interaction-patterns',
          title: 'Common Interaction Patterns',
          minutes: 30,
          objectives: [
            'Recognise and apply the stepper, bottom sheet, and wizard interaction patterns.',
            'Decide which pattern to use based on task complexity and platform conventions.',
            'Prototype a wizard pattern in Figma with forward, back, and skip functionality.',
          ],
          sections: [
            {
              heading: 'Platform-Native Patterns',
              body: 'Apple HIG and Material Design each define platform-appropriate interaction patterns. Bottom sheets (Material) and action sheets (Apple) serve similar purposes but follow different visual conventions. Product designers must choose the pattern that feels native to the target platform.',
            },
            {
              heading: 'When to Use Wizards',
              body: 'A wizard (multi-step form) breaks complex tasks into manageable chunks — account setup, checkout, profile creation. Each step should focus on one decision. Wizards reduce cognitive load but add steps; use them when the task has 3+ logical stages.',
            },
            {
              heading: 'Steppers and Progress Indicators',
              body: 'Steppers show current position in a linear process. Material Design offers horizontal and vertical stepper variants. Apple HIG uses progress bars and step indicators. Both communicate how much work remains, reducing abandonment during multi-step flows.',
            },
          ],
          links: [
            {
              title: 'Apple HIG — Action Sheets',
              url: 'https://developer.apple.com/design/human-interface-guidelines/action-sheets',
              sourceName: 'Apple Human Interface Guidelines',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Material Design — Bottom Sheets',
              url: 'https://m3.material.io/components/bottom-sheets/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Nielsen Norman Group — Multi-Step Forms',
              url: 'https://www.nngroup.com/articles/multistep-forms/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'When should a product designer choose a wizard pattern over a single long form?',
            options: [
              'When the form has fewer than 2 fields',
              'When the task has 3 or more logical stages and cognitive load needs to be reduced',
              'When the user prefers scrolling over tapping',
              'When the backend requires sequential API calls',
            ],
            answerIndex: 1,
            explanation:
              'Wizards are appropriate when a task has multiple logical stages. Breaking them into steps reduces cognitive load and improves completion rates.',
          },
        },
      ],
    },

    {
      slug: 'ui-craft-and-design-systems',
      stage: 'Intermediate',
      title: 'UI Craft and Design Systems',
      description:
        'Craft polished visual interfaces, architect design tokens, and build scalable component libraries that keep growing teams consistent.',
      topics: [
        {
          slug: 'visual-polish',
          title: 'Visual Polish and Micro-Interactions',
          minutes: 29,
          objectives: [
            'Apply consistent spacing, alignment, and visual weight to create polished screen compositions.',
            'Design meaningful micro-interactions that communicate system state (loading, success, error).',
            'Use Figma\'s prototyping tools to animate state transitions with Smart Animate.',
          ],
          sections: [
            {
              heading: 'Spacing and Alignment',
              body: 'Consistent spacing creates rhythm. Material Design uses a 4dp baseline grid; Apple HIG uses 8pt increments. Aligning elements to a shared grid eliminates visual noise and makes interfaces feel intentional. Figma\'s layout grid overlays help designers verify alignment before handoff.',
            },
            {
              heading: 'Micro-Interactions',
              body: 'Micro-interactions are small, contained moments — a toggle animating from off to on, a checkmark appearing after a successful submission, a subtle shake on an invalid input. They provide immediate feedback, reduce uncertainty, and add personality. Nielsen Norman Group identifies feedback as one of the core usability heuristics.',
            },
            {
              heading: 'Animating State Transitions',
              body: 'Figma\'s Smart Animate interpolates between frames when matching layers exist. A button that changes from "Add to Cart" to "Added ✓" with a colour shift and icon change communicates success without words. Smart Animate is also used for stakeholder demos and usability test prototypes.',
            },
          ],
          links: [
            {
              title: 'Apple HIG — Animation',
              url: 'https://developer.apple.com/design/human-interface-guidelines/motion',
              sourceName: 'Apple Human Interface Guidelines',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Material Design — Motion',
              url: 'https://m3.material.io/styles/motion/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Figma Smart Animate Documentation',
              url: 'https://help.figma.com/hc/en-us/articles/360040318013',
              sourceName: 'Figma',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What is the recommended spacing increment for visual alignment in Material Design?',
            options: ['2dp', '4dp', '12dp', '20dp'],
            answerIndex: 1,
            explanation:
              'Material Design uses a 4dp baseline grid for spacing and alignment, ensuring consistent visual rhythm across all components.',
          },
        },
        {
          slug: 'design-tokens',
          title: 'Design Tokens and Theming',
          minutes: 28,
          objectives: [
            'Define primitive, semantic, and component-level tokens in a layered model.',
            'Configure Figma variable modes for light, dark, and brand-specific themes.',
            'Explain how tokens are exported as JSON and consumed by front-end developers.',
          ],
          sections: [
            {
              heading: 'Token Layering',
              body: 'Primitive tokens are raw values (blue-500, grey-100). Semantic tokens assign meaning to primitives (color.bg.surface = grey-50). Component tokens reference semantic tokens (button.bg.primary = color.bg.brand). This three-layer model keeps themes maintainable and theming changes isolated.',
            },
            {
              heading: 'Variable Modes in Figma',
              body: 'Figma variables support multiple modes — Light, Dark, High-Contrast — within a single collection. Switching modes on a frame re-maps all bound variables instantly. This lets designers validate both themes without duplicating screens, a major efficiency gain for multi-theme products.',
            },
            {
              heading: 'Token Export and Developer Consumption',
              body: 'Tools like Style Dictionary or the Figma Variables API transform Figma tokens into platform-specific code: CSS custom properties, Swift constants, Kotlin resources. This bridge eliminates manual token translation and reduces theming bugs between design and production.',
            },
          ],
          links: [
            {
              title: 'Material Design — Design Tokens',
              url: 'https://m3.material.io/foundations/design-tokens/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Figma Variables Documentation',
              url: 'https://help.figma.com/hc/en-us/articles/15339657166039',
              sourceName: 'Figma',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Apple HIG — Color',
              url: 'https://developer.apple.com/design/human-interface-guidelines/color',
              sourceName: 'Apple Human Interface Guidelines',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What is the primary benefit of a three-layer token model (primitive → semantic → component)?',
            options: [
              'It reduces the number of tokens in the system',
              'It enables theme-level swaps without renaming every token reference',
              'It eliminates the need for Figma variables',
              'It allows designers to skip accessibility checks',
            ],
            answerIndex: 1,
            explanation:
              'A layered model means theme changes only need to update semantic token mappings, not every individual reference throughout the design system.',
          },
        },
        {
          slug: 'component-architecture',
          title: 'Component Architecture in Figma',
          minutes: 27,
          objectives: [
            'Build a component with properties, variants, and slot patterns for content flexibility.',
            'Apply naming conventions that scale to 100+ components in a design system.',
            'Document a component\'s usage guidelines including do\'s, don\'ts, and accessibility notes.',
          ],
          sections: [
            {
              heading: 'Component Properties and Variants',
              body: 'Figma component properties — Boolean, Instance Swap, Text — allow a single component to serve multiple configurations without creating dozens of variants. A card component might use a Boolean property for an optional badge, an instance swap for the icon, and a text property for the title.',
            },
            {
              heading: 'Naming Conventions',
              body: 'Consistent naming like "Card / Default / Medium" enables alphabetical sorting and clear search in the assets panel. The slash-separated convention mirrors directory structures and helps designers find components quickly. As libraries grow, disciplined naming prevents duplication.',
            },
            {
              heading: 'Component Documentation',
              body: 'Every component needs a guideline section covering when to use it, when not to use it, accessibility requirements, and code references. Nielsen Norman Group emphasises that undocumented components lead to misuse. A component without documentation is a component waiting to be misused.',
            },
          ],
          links: [
            {
              title: 'Figma Component Properties',
              url: 'https://help.figma.com/hc/en-us/articles/15339657135383',
              sourceName: 'Figma',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Nielsen Norman Group — Design System Documentation',
              url: 'https://www.nngroup.com/articles/design-system-ux/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Material Design — Effective Design Systems',
              url: 'https://m3.material.io/foundations/design-systems/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Why is a slash-separated naming convention like "Button / Primary / Large" preferred in Figma component libraries?',
            options: [
              'It makes the component file smaller',
              'It enables alphabetical sorting and quick search in the assets panel',
              'It is required by Figma to create variants',
              'It prevents accidental detachment',
            ],
            answerIndex: 1,
            explanation:
              'Slash-separated names create a hierarchy that Figma renders as nested folders in the assets panel, making large libraries navigable.',
          },
        },
      ],
    },

    {
      slug: 'collaboration-and-delivery',
      stage: 'Advanced',
      title: 'Collaboration and Delivery',
      description:
        'Master developer handoff, accessibility audits, cross-functional communication, and the rituals that keep product teams shipping smoothly.',
      topics: [
        {
          slug: 'developer-handoff',
          title: 'Design-to-Code Handoff',
          minutes: 30,
          objectives: [
            'Prepare a Figma file for handoff using inspect mode and developer-friendly naming.',
            'Write a concise changelog for each design revision using Figma\'s branching.',
            'Translate Figma inspect values into CSS properties and explain spacing rationale to engineers.',
          ],
          sections: [
            {
              heading: 'Preparing for Handoff',
              body: 'Before marking a frame "ready for dev," ensure consistent naming, zero detached instances, all auto-layout frames, and linked variables. A clean file reduces back-and-forth by up to 40% according to design ops benchmarks. Detached components and hardcoded values create ambiguity.',
            },
            {
              heading: 'Branching and Changelogs',
              body: 'Figma branches let you iterate on design updates without affecting the main file. When merging, Figma generates a visual diff. Writing a brief changelog — "Updated button padding from 12 to 16dp per Material spec" — helps developers prioritise changes and understand intent.',
            },
            {
              heading: 'CSS Translation',
              body: 'Figma\'s inspect panel auto-generates CSS properties: width, height, padding, font-size, color, border-radius, gap. Developers can copy these directly. Product designers who understand the CSS box model — and when to recommend rem over px — communicate more effectively with engineers.',
            },
          ],
          links: [
            {
              title: 'Figma Developer Handoff Guide',
              url: 'https://help.figma.com/hc/en-us/articles/360040323353',
              sourceName: 'Figma',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'W3C — CSS Box Model Specification',
              url: 'https://www.w3.org/TR/css-box-3/',
              sourceName: 'W3C / WCAG',
              resourceType: 'specification',
              relationship: 'supporting',
            },
            {
              title: 'Material Design — Design and Development',
              url: 'https://m3.material.io/foundations/content-design/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What is the primary benefit of using Figma auto-layout frames in a file intended for developer handoff?',
            options: [
              'They make the file visually appealing',
              'They generate accurate spacing and sizing values in the inspect panel',
              'They prevent accidental edits',
              'They reduce file size',
            ],
            answerIndex: 1,
            explanation:
              'Auto-layout translates directly to CSS Flexbox, generating accurate width, height, padding, gap, and alignment values that developers can use verbatim.',
          },
        },
        {
          slug: 'accessibility-auditing',
          title: 'Accessibility Auditing in Design',
          minutes: 28,
          objectives: [
            'Audit a multi-screen flow for WCAG 2.1 AA contrast, focus visibility, and target size compliance.',
            'Configure Figma variables to enforce accessible color pairings automatically.',
            'Document keyboard navigation and screen-reader expectations for interactive components.',
          ],
          sections: [
            {
              heading: 'Contrast and Focus Auditing',
              body: 'WCAG requires 4.5:1 for body text, 3:1 for large text and UI components. A systematic audit checks every token pair against these thresholds. Figma plugins like Stark or the built-in contrast checker automate this during design reviews. Focus rings must also meet 3:1 contrast against adjacent colors.',
            },
            {
              heading: 'Target Size Requirements',
              body: 'WCAG 2.2 introduced a minimum target size of 24×24 CSS pixels for interactive elements (44×44 for AAA). This directly impacts button, link, and icon sizing in Figma. Designers who ignore target sizes create interfaces that fail touch-target accessibility on mobile devices.',
            },
            {
              heading: 'Keyboard and Screen Reader Specs',
              body: 'Designers communicate keyboard interaction order (tab sequence, focus traps in modals) and screen-reader labels (aria-label, role) through annotations in Figma. These specs prevent engineers from guessing and ensure assistive technology users get an equivalent experience.',
            },
          ],
          links: [
            {
              title: 'WCAG 2.1 — Contrast Minimum',
              url: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum',
              sourceName: 'W3C / WCAG',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Apple HIG — Accessibility',
              url: 'https://developer.apple.com/accessibility/',
              sourceName: 'Apple Human Interface Guidelines',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Material Design — Accessibility',
              url: 'https://m3.material.io/foundations/accessible-design/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What is the minimum contrast ratio required for normal-size body text under WCAG 2.1?',
            options: ['2:1', '3:1', '4.5:1', '7:1'],
            answerIndex: 2,
            explanation:
              'WCAG 2.1 Level AA requires at least 4.5:1 contrast for normal text and 3:1 for large text (18pt or 14pt bold).',
          },
        },
        {
          slug: 'cross-functional-collaboration',
          title: 'Cross-Functional Collaboration',
          minutes: 27,
          objectives: [
            'Run an effective design critique session with structured feedback protocols.',
            'Facilitate a design-dev sync that resolves implementation questions without blame.',
            'Write a design decision record (ADR) that justifies major product choices with evidence.',
          ],
          sections: [
            {
              heading: 'Design Critiques',
              body: 'A structured critique follows rules: present the problem first, not the solution; ask "what" questions before "why" questions; separate exploration from evaluation. Nielsen Norman Group recommends critiquing against user goals, not personal taste. Well-run critiques surface issues early when they are cheapest to fix.',
            },
            {
              heading: 'Design-Dev Syncs',
              body: 'Regular syncs between design and engineering prevent drift. The designer presents intent and constraints; the engineer shares technical feasibility. A blame-free tone — "What can we adjust to make this feasible?" rather than "Why didn\'t you build it right?" — keeps collaboration productive.',
            },
            {
              heading: 'Architecture Decision Records',
              body: 'An ADR documents a major design decision: context, options considered, chosen approach, and rationale. When a team revisits the decision months later — or a new member joins — the ADR provides context without tribal knowledge. ADRs are especially valuable for design-system governance.',
            },
          ],
          links: [
            {
              title: 'Nielsen Norman Group — Design Critiques',
              url: 'https://www.nngroup.com/articles/design-critiques/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'W3C — Accessible Collaboration Practices',
              url: 'https://www.w3.org/WAI/planning/',
              sourceName: 'W3C / WCAG',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Figma FigJam for Team Workshops',
              url: 'https://help.figma.com/hc/en-us/articles/24417925858711-FigJam-basics',
              sourceName: 'Figma',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What should a designer present first in a design critique session?',
            options: [
              'The final polished mockup',
              'The user problem and design goals',
              'A comparison with competitor designs',
              'The technical implementation plan',
            ],
            answerIndex: 1,
            explanation:
              'Presenting the problem and goals first ensures feedback is grounded in user needs rather than personal preferences about visual execution.',
          },
        },
      ],
    },
  ],

  practicalExam: {
    title: 'Design a Multi-Step Checkout Flow',
    coverage: [
      'User research synthesis',
      'Information architecture',
      'Screen flow and interaction design',
      'Visual UI design and polish',
      'Design tokens and theming',
      'Component architecture',
      'WCAG accessibility audit',
      'Developer handoff preparation',
    ],
    brief:
      'You are tasked with designing a four-step checkout flow for an e-commerce mobile app called "Craftory." The steps are: (1) cart review with item editing, (2) shipping address with autocomplete, (3) payment method selection, and (4) order confirmation with receipt. Deliver a fully prototyped Figma file with accessible tokens, documented components, and a handoff-ready annotation layer.',
    requirements: [
      'Four distinct screens designed for a 390×844 viewport (iPhone 14).',
      'A primary user task flow diagram annotated with user goals at each step.',
      'Error states and edge cases for at least two steps (invalid address, declined payment).',
      'A type scale with at least 5 named text styles (display, H1, H2, body, caption).',
      'Design tokens exported as Figma variables with light and dark modes.',
      'At least 4 reusable components (button, input field, card, progress indicator) with variants.',
      'Smart Animate prototype linking all four screens with forward, back, and error paths.',
      'Every text-on-background pairing must meet WCAG AA contrast (4.5:1 for body).',
      'A handoff page with CSS inspect values for the final confirmation screen.',
    ],
    expectedOutput:
      'A Figma file containing the four checkout screens, a task flow diagram, a prototype with error paths, a tokens page, a component library page, and a handoff annotation page with CSS values and accessibility notes.',
    rubric: [
      {
        skill: 'User Flow Design',
        weight: 20,
        criteria: 'Clear primary task flow with annotated user goals; error states and recovery paths are designed, not implied.',
      },
      {
        skill: 'Information Architecture',
        weight: 15,
        criteria: 'Logical step progression; content hierarchy supports the user\'s decision-making at each stage.',
      },
      {
        skill: 'Visual UI Design',
        weight: 20,
        criteria: 'Polished compositions with consistent spacing, alignment, and visual hierarchy; micro-interactions enhance the experience.',
      },
      {
        skill: 'Component Architecture',
        weight: 15,
        criteria: 'At least 4 components with meaningful variants; main components used (not detached); consistent naming conventions.',
      },
      {
        skill: 'Design Tokens',
        weight: 10,
        criteria: 'Tokens follow a layered naming convention; variables are mode-configurable for light and dark themes.',
      },
      {
        skill: 'Accessibility',
        weight: 10,
        criteria: 'All text/background pairs meet 4.5:1; target sizes meet WCAG requirements; keyboard flow is annotated.',
      },
      {
        skill: 'Handoff and Documentation',
        weight: 10,
        criteria: 'Handoff page includes accurate CSS values; components are documented with usage notes; changelog is clear.',
      },
    ],
    passScore: 72,
  },

  assignments: [
    {
      title: 'User Research Synthesis Board',
      stage: 'Beginner',
      objective:
        'Conduct 3 guerrilla usability tests on a provided mobile app prototype, synthesise findings into an affinity diagram in FigJam, and produce 5 "How Might We" prompts tied to the top pain points.',
      requirements: [
        'Conduct at least 3 moderated usability test sessions (remote or in-person).',
        'Record each session\'s key observations as individual sticky notes in FigJam.',
        'Group observations into 4–6 affinity clusters with descriptive headers.',
        'Write 5 "How Might We" prompts, each linked to a specific pain point cluster.',
        'Include a summary of participant demographics and session logistics.',
      ],
      skillsEvaluated: [
        'Usability test moderation',
        'Observation and note-taking',
        'Affinity diagramming',
        'Problem framing with HMW prompts',
      ],
      dueDays: 7,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions:
          'Submit a FigJam board link containing the affinity diagram and HMW prompts, plus a text summary.',
        textLabel: 'Research reflection',
        minTextLength: 150,
      },
    },
    {
      title: 'Checkout Flow IA and Screen Map',
      stage: 'Foundation',
      objective:
        'Design a complete information architecture and screen flow for a 5-step checkout process including primary flows, error states, and a Figma flow diagram.',
      requirements: [
        'A site map or screen hierarchy showing all checkout screens and their relationships.',
        'A primary task flow diagram with 5 steps, annotated with user goals.',
        'At least 3 error state branches (network failure, invalid input, empty cart).',
        'A Figma prototype linking the primary flow with forward and back navigation.',
        'IA validation: every screen is reachable within 2 taps from the home screen.',
      ],
      skillsEvaluated: [
        'Information architecture',
        'Screen flow design',
        'Edge case identification',
        'Figma prototyping',
      ],
      dueDays: 8,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions:
          'Submit a Figma file with the screen hierarchy, flow diagram, and linked prototype.',
        textLabel: 'Flow rationale',
        minTextLength: 200,
      },
    },
    {
      title: 'Design System Component Library',
      stage: 'Intermediate',
      objective:
        'Build a 10-component design system library in Figma with properties, variants, documentation, and token mapping, then export the token set as JSON.',
      requirements: [
        'At least 10 components (button, input, card, badge, toggle, avatar, modal, nav bar, tab bar, toast).',
        'Each component has at least 2 variants and uses Figma component properties.',
        'A documentation page for each component covering do\'s, don\'ts, and accessibility notes.',
        'All components use semantic design tokens, not hardcoded values.',
        'Export the token set as JSON and include a README explaining the structure.',
      ],
      skillsEvaluated: [
        'Component architecture',
        'Design token implementation',
        'Documentation and naming conventions',
        'JSON export for developer handoff',
      ],
      dueDays: 14,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions:
          'Submit a Figma file with the component library and documentation pages, plus a JSON token file.',
        textLabel: 'System rationale',
        minTextLength: 250,
      },
    },
  ],

  simTasks: [
    {
      title: 'Redesign a Cluttered Settings Screen',
      context:
        'The product manager sends a Figma link to the settings page. It has 14 options crammed into a single scrollable list with no grouping. Users are reporting that they "can\'t find anything." You have 4 hours to redesign it.',
      requirements: [
        'Group the 14 options into 3–5 logical sections with clear headings.',
        'Apply a consistent component pattern (list item with icon, label, and chevron).',
        'Ensure all text/background pairs meet WCAG AA contrast.',
        'Prototype the new settings screen with navigation to at least 2 sub-screens.',
        'Write a brief changelog explaining each grouping decision.',
      ],
      priority: 'high',
      dueDayOffset: 1,
      expectedOutput:
        'A redesigned settings screen in Figma with logical grouping, consistent components, accessible contrast, and a prototype flow.',
      skills: ['Information architecture', 'Component reuse', 'WCAG accessibility', 'Prototyping'],
    },
    {
      title: 'Adapt a Web Flow to Mobile',
      context:
        'The design team has a desktop checkout flow in Figma. The PM asks you to adapt it to mobile (iPhone 14 viewport) by end of day. The desktop flow has a two-column layout with a sidebar order summary.',
      requirements: [
        'Redesign the two-column layout into a single-column mobile layout.',
        'Maintain all functionality: item list, quantity editing, promo code, order total, CTA.',
        'Use the existing design system components — do not create new ones from scratch.',
        'Ensure touch targets meet 44×44pt minimum size.',
        'Prototype the mobile flow with forward and back navigation.',
      ],
      priority: 'normal',
      dueDayOffset: 2,
      expectedOutput:
        'A mobile-optimised checkout flow in Figma using existing design system components, with a linked prototype.',
      skills: ['Responsive adaptation', 'Component reuse', 'Platform conventions', 'Touch-target compliance'],
    },
    {
      title: 'Fix a Broken Design System Component',
      context:
        'The lead developer messages you: "The modal component in our design system is broken in production. It\'s supposed to have a focus trap but keyboard users can tab outside the modal. The Figma component also has 3 detached copies with inconsistent padding."',
      requirements: [
        'Audit the Figma modal component and all 3 detached copies.',
        'Rebuild the modal as a proper main component with auto-layout and correct padding.',
        'Document the expected keyboard interaction (tab order, focus trap, Escape to close).',
        'Add annotations for aria-label and role attributes in the component documentation.',
        'Update the component\'s usage guidelines with accessibility requirements.',
      ],
      priority: 'critical',
      dueDayOffset: 3,
      expectedOutput:
        'A rebuilt modal component in Figma with proper structure, accessibility annotations, and updated documentation.',
      skills: ['Component reconstruction', 'Accessibility specification', 'Documentation', 'Dev-communication'],
    },
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Lena Park',
      personaRole: 'Front-End Developer',
      situation:
        'Lena is implementing your checkout flow but is using hardcoded color values instead of the design tokens you documented. The production colors are drifting from the Figma spec.',
      openingMessage:
        'Hey, I noticed the checkout CSS has hardcoded hex values. Can we align on the token setup so the dark mode works correctly?',
      expectedPoints: [
        'Explain the purpose of the three-layer token model (primitive, semantic, component).',
        'Walk through how CSS custom properties map to Figma variables.',
        'Offer to pair on setting up the token import in the build pipeline.',
        'Agree on a naming convention that both design and code follow.',
        'Propose a periodic sync to catch drift before it reaches production.',
      ],
    },
    {
      kind: 'client',
      personaName: 'Raj Mehta',
      personaRole: 'Product Owner, E-Commerce Division',
      situation:
        'Raj wants to add a "guest checkout" flow but you believe requiring account creation improves retention. He insists on the feature, and you need to find a balanced solution.',
      openingMessage:
        'We need guest checkout by next sprint. Our analytics show 40% cart abandonment at the account creation step.',
      expectedPoints: [
        'Acknowledge the data — 40% abandonment at account creation is a real problem.',
        'Propose a compromise: offer guest checkout with an optional account-creation prompt post-purchase.',
        'Explain how this preserves the retention goal (account creation) while solving the immediate friction.',
        'Suggest an A/B test to measure the impact of guest checkout on both conversion and retention.',
        'Outline a timeline for design, prototype, and test.',
      ],
    },
    {
      kind: 'team',
      personaName: 'Tomás Gutiérrez',
      personaRole: 'UX Researcher',
      situation:
        'Tomás presents usability test results showing users struggle with your payment method selector. He suggests a redesign but you just shipped the current version and the team is fatigued.',
      openingMessage:
        'The test results show a 35% failure rate on the payment step. Users don\'t understand the card vs. wallet toggle. Can we prioritise a redesign?',
      expectedPoints: [
        'Review the test findings together to validate the severity and frequency.',
        'Propose a lightweight fix first (copy and label changes) before a full redesign.',
        'Frame the fix as a quick win that can ship in the current sprint.',
        'Document the improvement plan in the sprint backlog with clear success metrics.',
        'Schedule a follow-up test to validate the fix after it ships.',
      ],
    },
    {
      kind: 'client',
      personaName: 'Amara Osei',
      personaRole: 'Accessibility Auditor, Government Contract',
      situation:
        'Amara\'s team has completed a WCAG AA audit on your product. They found 15 contrast violations and missing ARIA labels on interactive components. The contract deadline is in 10 days.',
      openingMessage:
        'Our audit report is ready. We identified 15 contrast failures and 8 missing ARIA labels. We need these resolved before the submission deadline.',
      expectedPoints: [
        'Request the full audit report to understand every violation.',
        'Prioritise fixes by severity: text contrast first, ARIA labels second, cosmetic issues last.',
        'Propose a token-based fix for contrast issues to resolve them globally.',
        'Document ARIA specifications for each component and share with the dev team.',
        'Set up daily checkpoints to track progress toward the deadline.',
      ],
    },
  ],

  workplaceScenarios: [
    {
      category: 'Tooling & Process',
      situation:
        'Your team\'s Figma file has grown to 250+ pages. Designers report 30-second load times and difficulty finding components. Leadership asks you to propose a restructuring plan.',
      requiredActions: [
        {
          action: 'Audit the current file structure and catalogue unused, duplicate, and orphaned pages.',
          good: true,
          note: 'Understanding the current state is essential before proposing structural changes.',
        },
        {
          action: 'Propose splitting the file into modular libraries (Foundation, Components, Patterns, Archive) with clear ownership.',
          good: true,
          note: 'Modular libraries with ownership reduce conflicts, improve load times, and clarify responsibility.',
        },
        {
          action: 'Keep everything in one file and tell designers to "be more organised."',
          good: false,
          note: 'This ignores the structural problem and shifts blame without solving it.',
        },
        {
          action: 'Delete pages you consider unnecessary without consulting other designers.',
          good: false,
          note: 'Removing pages unilaterally risks discarding work others depend on. Consult the team first.',
        },
      ],
    },
    {
      category: 'Cross-Team Collaboration',
      situation:
        'The engineering team has shipped the checkout flow but the implemented colors differ from your Figma tokens. The visual gap between design and production is growing.',
      requiredActions: [
        {
          action: 'Schedule a cross-functional sync with the front-end lead to review the discrepancies together.',
          good: true,
          note: 'Direct, blame-free communication is the fastest way to identify root causes and fix them.',
        },
        {
          action: 'Export the current Figma tokens as JSON and compare them against the codebase CSS variables.',
          good: true,
          note: 'A systematic comparison pinpoints exact mismatches and provides actionable evidence for fixes.',
        },
        {
          action: 'Send a Slack message listing all the errors and asking engineering to fix them by Friday.',
          good: false,
          note: 'Blame-oriented messaging damages collaboration. Present discrepancies as a shared problem to solve.',
        },
        {
          action: 'Ignore the gap since "design is design and code is code."',
          good: false,
          note: 'Ignoring the gap means users see a different product than what was designed, harming brand consistency.',
        },
      ],
    },
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Walk me through how you would design a multi-step form flow. What screens, states, and edge cases would you consider?',
      guidancePoints: [
        'Start by defining the primary task flow and breaking it into logical steps.',
        'Design each step\'s screen with clear progress indication and navigation (back, skip).',
        'Map error states for each step (invalid input, network failure, session timeout).',
        'Consider edge cases: returning users, saved progress, abandoned mid-flow.',
        'Ensure accessibility: focus order, error announcements, target sizes.',
      ],
    },
    {
      dimension: 'problem_solving',
      prompt: 'A developer tells you that a component you designed is too complex to implement with the current tech stack. How do you handle this?',
      guidancePoints: [
        'Ask clarifying questions to understand the specific technical constraint.',
        'Research the platform\'s capabilities (CSS Grid, native components, framework limitations).',
        'Propose a revised design that respects the constraint while preserving the user goal.',
        'Collaborate on alternatives rather than insisting on the original design.',
        'Document the constraint for future reference to avoid repeating the issue.',
      ],
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you decide when to add a new component to the design system versus reusing an existing one?',
      guidancePoints: [
        'Evaluate whether the new element shares the same semantic purpose as an existing component.',
        'Consider variant properties: if the differences can be captured as variants, extend rather than create.',
        'Assess frequency of use: one-off elements may not warrant a new component.',
        'Check the existing taxonomy to avoid semantic overlap.',
        'Document the decision rationale for team governance.',
      ],
    },
    {
      dimension: 'communication',
      prompt: 'Describe a time you had to present a design decision to non-design stakeholders. How did you make your case?',
      guidancePoints: [
        'Frame the decision in terms of user outcomes and business metrics, not aesthetics.',
        'Use before/after visual comparisons to make the impact tangible.',
        'Reference usability heuristics or WCAG as objective justification.',
        'Anticipate objections and prepare data or examples to address them.',
        'Summarise with clear next steps and accountability.',
      ],
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the three-layer design token model (primitive, semantic, component). Why not just use hex values directly?',
      guidancePoints: [
        'Primitive tokens store raw values (blue-500, grey-100).',
        'Semantic tokens assign meaning (color.bg.surface = grey-50).',
        'Component tokens reference semantic tokens (button.bg.primary = color.bg.brand).',
        'A layered model enables theme-level swaps without renaming every reference.',
        'Direct hex values make theming, dark mode, and maintenance extremely difficult at scale.',
      ],
    },
    {
      dimension: 'problem_solving',
      prompt: 'You join a project where the existing design system has no documentation. How would you approach auditing and documenting it?',
      guidancePoints: [
        'Catalogue all components, variants, and current naming conventions.',
        'Identify inconsistencies (naming, spacing, color usage) and group by severity.',
        'Prioritise documentation for the most-used components first.',
        'Create a documentation template (usage, do\'s/don\'ts, accessibility, code references).',
        'Propose a phased rollout plan with team buy-in.',
      ],
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'A product manager asks you to prioritise a visual redesign over accessibility fixes. How do you respond?',
      guidancePoints: [
        'Acknowledge the business value of visual improvements.',
        'Present accessibility as a legal and ethical requirement, not an optional enhancement.',
        'Quantify the risk: exclusion of users, potential lawsuits, brand damage.',
        'Propose a phased approach: ship accessibility fixes first, then visual improvements.',
        'Suggest involving the PM in an accessibility testing session to build empathy.',
      ],
    },
    {
      dimension: 'communication',
      prompt: 'How do you handle a situation where a designer on your team consistently creates ad-hoc components outside the design system?',
      guidancePoints: [
        'Approach the conversation with curiosity, not criticism.',
        'Identify if the design system is missing something they need.',
        'Explain the downstream impact: developer confusion, inconsistency, maintenance burden.',
        'Propose a solution: add the missing pattern, or agree on an exception process.',
        'Establish a lightweight review gate for design system compliance.',
      ],
    },

  ]
  ,
}
