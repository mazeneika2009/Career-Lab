import type { CareerDef } from '../framework.js'

export const uxDesigner: CareerDef = {
  slug: 'ux-designer',
  name: 'UX Designer',
  category: 'Design',
  order: 40,
  description:
    'Designs experiences grounded in research — personas, journeys, IA, wireframes, prototypes and usability testing.',
  difficulty: 'Beginner-friendly',
  pathSummary:
    'UX Designers begin by understanding users through research and empathy mapping, progress through information architecture and interaction design, build interactive prototypes and run usability tests, and culminate in delivering accessible, research-backed experiences with design systems.',
  mainSkills: [
    'User research and interviewing',
    'Persona and empathy map creation',
    'Information architecture',
    'Wireframing and low-fidelity prototyping',
    'Usability testing and analysis',
    'Interaction design patterns',
    'Accessibility (WCAG) compliance',
    'Design system thinking and handoff',
  ],
  sourcePlatforms: [
    'Nielsen Norman Group',
    'Figma',
    'W3C / WCAG',
    'Google UX Resources',
    'Material Design',
  ],
  companyName: 'PivotPoint Design Co.',
  roleTitle: 'UX Designer',

  chapters: [
    {
      slug: 'ux-foundations-and-research',
      stage: 'Beginner',
      title: 'UX Foundations and Research',
      description:
        'Understand the principles of user-centred design, learn core research methods, and build personas and journey maps that drive every downstream decision.',
      topics: [
        {
          slug: 'what-ux-design-is',
          title: 'What UX Design Is',
          minutes: 25,
          objectives: [
            'Define user experience design as a discipline distinct from visual design.',
            'Explain the stages of the UX design process (research, design, test, iterate).',
            'Describe how user-centred design leads to better business outcomes.',
          ],
          sections: [
            {
              heading: 'UX vs. Visual Design',
              body: 'User experience design focuses on how a product works and feels, not just how it looks. While visual design shapes aesthetics, UX design maps the entire journey a user takes — from first contact to task completion. Nielsen Norman Group defines UX as encompassing "all aspects of the end-user\'s interaction with the company, its services, and its products."',
            },
            {
              heading: 'The Design Process',
              body: 'The UX process typically follows a double-diamond model: discover (research), define (synthesise), develop (ideate and prototype), and deliver (test and refine). Google\'s UX Design Certificate emphasises this iterative cycle, where each phase produces artefacts — affinity diagrams, personas, wireframes — that inform the next.',
            },
            {
              heading: 'Why UX Matters for Business',
              body: 'Every dollar invested in UX returns an estimated $100 in ROI according to Forrester Research. Products with strong UX see higher adoption, lower support costs, and stronger brand loyalty. Material Design\'s guidelines exist precisely to reduce the UX debt teams accumulate when designing without a system.',
            },
          ],
          links: [
            {
              title: 'What Is UX Design?',
              url: 'https://www.nngroup.com/articles/definition-user-experience/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Google UX Design Certificate — Overview',
              url: 'https://www.coursera.org/professional-certificates/google-ux-design',
              sourceName: 'Google UX Resources',
              resourceType: 'course',
              relationship: 'primary',
            },
            {
              title: 'Material Design — What is Material?',
              url: 'https://m3.material.io/foundations/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Which of the following best describes the primary focus of UX design?',
            options: [
              'Making interfaces visually beautiful',
              'Ensuring a product is easy and satisfying to use',
              'Writing frontend code for web applications',
              'Creating marketing campaigns for products',
            ],
            answerIndex: 1,
            explanation:
              'UX design centres on the overall feel and usability of a product — how easily and pleasantly users can accomplish their goals.',
          },
        },
        {
          slug: 'user-research-methods',
          title: 'User Research Methods',
          minutes: 30,
          objectives: [
            'Distinguish between qualitative and quantitative research methods.',
            'Plan and conduct a moderated usability interview with 5 participants.',
            'Synthesise research findings into actionable insights using affinity mapping.',
          ],
          sections: [
            {
              heading: 'Qualitative vs. Quantitative',
              body: 'Qualitative methods — interviews, contextual inquiries, diary studies — reveal why users behave a certain way. Quantitative methods — surveys, analytics, A/B tests — reveal what is happening at scale. Nielsen Norman Group recommends combining both for a complete picture: numbers tell you where problems exist, stories tell you why.',
            },
            {
              heading: 'Conducting User Interviews',
              body: 'A good user interview follows a semi-structured format: start with warm-up questions, move to task-based scenarios, and close with wrap-up reflections. Google\'s UX resources stress the importance of asking open-ended questions ("Tell me about the last time you...") rather than leading ones ("Don\'t you think this feature is confusing?").',
            },
            {
              heading: 'Affinity Mapping',
              body: 'After interviews, write each insight on a sticky note and cluster them by theme. Affinity mapping transforms raw quotes into patterns — pain points, mental models, and opportunities. This synthesis step is critical for aligning teams around evidence-based design decisions.',
            },
          ],
          links: [
            {
              title: 'User Research Methods',
              url: 'https://www.nngroup.com/articles/which-ux-research-methods/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Conducting User Interviews — Google UX Course',
              url: 'https://www.coursera.org/learn/ux-research-interviewing',
              sourceName: 'Google UX Resources',
              resourceType: 'course',
              relationship: 'primary',
            },
            {
              title: 'Material Design — Understanding Users',
              url: 'https://m3.material.io/foundations/content-design/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'You want to understand why users are abandoning a checkout flow. Which research method is most appropriate?',
            options: [
              'A/B testing two checkout layouts',
              'A moderated usability interview asking users to walk through checkout',
              'A survey asking users to rate the checkout on a scale of 1–10',
              'Reviewing traffic analytics for the checkout page',
            ],
            answerIndex: 1,
            explanation:
              'To understand "why" users abandon, a qualitative interview lets you observe behaviour and ask follow-up questions in real time. A/B tests and analytics reveal what is happening, not why.',
          },
        },
        {
          slug: 'personas-and-empathy-maps',
          title: 'Personas and Empathy Maps',
          minutes: 28,
          objectives: [
            'Create a research-backed persona with goals, frustrations, and behaviours.',
            'Build an empathy map capturing what a user says, thinks, does, and feels.',
            'Explain how personas prevent "designing for yourself" bias.',
          ],
          sections: [
            {
              heading: 'Research-Backed Personas',
              body: 'A persona is a fictional but data-informed representation of a key user segment. It includes demographics, goals, pain points, and context of use. Unlike marketing personas, UX personas are grounded in research interviews and behavioural data, not assumptions. Nielsen Norman Group warns that "proto-personas" built without research can actually harm decision-making.',
            },
            {
              heading: 'Empathy Maps',
              body: 'An empathy map captures four quadrants — says, thinks, does, feels — based on observed and inferred data. It helps teams step into the user\'s shoes before jumping to solutions. Placing empathy maps beside personas keeps the emotional dimension of UX visible during design sprints.',
            },
            {
              heading: 'Preventing Design Bias',
              body: 'Without personas, designers default to their own preferences — a phenomenon called the "false consensus effect." Personas anchor decisions in user needs rather than personal taste. Google UX Design emphasises referring back to personas at every design review to keep teams accountable to real users.',
            },
          ],
          links: [
            {
              title: 'Personas — User-Centered Design',
              url: 'https://www.nngroup.com/articles/persona/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Empathy Maps — Google UX Design',
              url: 'https://www.coursera.org/learn/user-research-empathy-mapping',
              sourceName: 'Google UX Resources',
              resourceType: 'course',
              relationship: 'primary',
            },
            {
              title: 'Material Design — Understand Your User',
              url: 'https://m3.material.io/foundations/design-tokens/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What is the primary risk of using "proto-personas" built without conducting real user research?',
            options: [
              'They take too long to create',
              'They may reinforce assumptions rather than reflect actual user needs',
              'They are too detailed for design reviews',
              'They conflict with marketing personas',
            ],
            answerIndex: 1,
            explanation:
              'Proto-personas without research data risk embedding team assumptions as if they were user truths, leading to designs that solve imagined problems.',
          },
        },
      ],
    },

    {
      slug: 'information-architecture-and-interaction',
      stage: 'Foundation',
      title: 'Information Architecture and Interaction Design',
      description:
        'Organise content through IA structures, map user journeys, design intuitive interaction patterns, and ensure accessibility from the start.',
      topics: [
        {
          slug: 'information-architecture',
          title: 'Information Architecture',
          minutes: 27,
          objectives: [
            'Conduct a card sort to derive a navigation structure from user data.',
            'Create a sitemap that reflects user mental models, not organisational charts.',
            'Apply the principles of progressive disclosure to reduce cognitive load.',
          ],
          sections: [
            {
              heading: 'What Is Information Architecture?',
              body: 'Information architecture (IA) is the structural design of shared information environments. It determines how content is organised, labelled, and navigated. Good IA lets users find what they need without thinking about the structure itself — the hallmark of invisible, effective design.',
            },
            {
              heading: 'Card Sorting',
              body: 'In a card sort, participants group labelled cards (representing content or features) into categories that make sense to them. Open card sorts let users create their own categories; closed sorts test an existing structure. Results reveal the mental models your users actually hold, which often differ from what the team assumes.',
            },
            {
              heading: 'Progressive Disclosure',
              body: 'Progressive disclosure shows only what users need at each step, revealing complexity gradually. Instead of presenting a 20-field form at once, break it into steps with clear progression. This technique reduces overwhelm and abandonment, a principle Material Design explicitly advocates in its layout guidelines.',
            },
          ],
          links: [
            {
              title: 'Information Architecture — Overview',
              url: 'https://www.nngroup.com/articles/information-architecture/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Google UX — Organise Content',
              url: 'https://www.coursera.org/learn/user-research-organize',
              sourceName: 'Google UX Resources',
              resourceType: 'course',
              relationship: 'primary',
            },
            {
              title: 'Material Design — Layout Principles',
              url: 'https://m3.material.io/foundations/layout/understanding-layout',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'In an open card sort, what does each participant do?',
            options: [
              'Rate each card on a satisfaction scale',
              'Group cards into categories they define themselves',
              'Select cards from a predefined list of categories',
              'Arrange cards in chronological order',
            ],
            answerIndex: 1,
            explanation:
              'An open card sort lets participants create their own categories, revealing their natural mental models for organising content.',
          },
        },
        {
          slug: 'user-journey-mapping',
          title: 'User Journey Mapping',
          minutes: 29,
          objectives: [
            'Map a complete user journey from first awareness to post-purchase follow-up.',
            'Identify pain points and moments of delight at each stage of the journey.',
            'Use journey maps to prioritise design opportunities across the experience.',
          ],
          sections: [
            {
              heading: 'What Is a Journey Map?',
              body: 'A user journey map is a visual narrative of every touchpoint a person has with a product or service over time. It captures actions, thoughts, emotions, and channel transitions. Unlike a task flow (which focuses on one screen sequence), a journey map spans the full lifecycle — before, during, and after product use.',
            },
            {
              heading: 'Anatomy of a Journey Map',
              body: 'A standard journey map includes: stages (awareness, consideration, use, support), user actions, touchpoints, thoughts, emotions (visualised as a spectrum), pain points, and opportunities. Each row adds a dimension of understanding. Google UX Design teaches building these maps collaboratively in FigJam for maximum team alignment.',
            },
            {
              heading: 'From Map to Action',
              body: 'Journey maps are only valuable if they drive decisions. Mark pain points as "red zones" and opportunities as "green zones." Prioritise fixes where pain intersects with business impact. A journey map that sits in a file unused is wasted effort — reference it in sprint planning and design reviews.',
            },
          ],
          links: [
            {
              title: 'Customer Journey Mapping 101',
              url: 'https://www.nngroup.com/articles/journey-mapping-101/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Journey Mapping — Google UX Design',
              url: 'https://www.coursera.org/learn/user-journey-mapping',
              sourceName: 'Google UX Resources',
              resourceType: 'course',
              relationship: 'primary',
            },
            {
              title: 'W3C — User Journey Accessibility',
              url: 'https://www.w3.org/WAI/test-evaluate/preparing-for-test/',
              sourceName: 'W3C / WCAG',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What dimension distinguishes a journey map from a simple task flow?',
            options: [
              'Journey maps include visual designs; task flows do not',
              'Journey maps span the full user lifecycle across multiple touchpoints and emotions',
              'Task flows are more detailed than journey maps',
              'Journey maps are only for mobile products',
            ],
            answerIndex: 1,
            explanation:
              'A journey map captures the end-to-end experience — multiple stages, emotions, and channels — whereas a task flow focuses on a single interaction sequence within a product.',
          },
        },
        {
          slug: 'interaction-design-patterns',
          title: 'Interaction Design Patterns',
          minutes: 26,
          objectives: [
            'Identify common interaction patterns (tabs, accordions, carousels, modals) and their appropriate use cases.',
            'Explain the usability trade-offs of each pattern using research-backed criteria.',
            'Select the right pattern for a given user goal and context of use.',
          ],
          sections: [
            {
              heading: 'Why Patterns Matter',
              body: 'Interaction design patterns are reusable solutions to common usability problems. Users have learned these patterns across products — a hamburger menu, a tab bar, a modal dialog — and expect them to behave consistently. Deviating from established patterns increases cognitive load and error rates.',
            },
            {
              heading: 'Common Patterns and Trade-offs',
              body: 'Tabs work well for parallel content at the same level but fail for hierarchical data. Accordions save space but hide content, reducing discoverability. Modals focus attention but interrupt flow and trap keyboard focus. Carousels expose multiple items but suffer from low engagement beyond the first slide. Choosing a pattern requires weighing visibility, efficiency, and user context.',
            },
            {
              heading: 'Pattern Selection Framework',
              body: 'Google Material Design provides a decision framework: if the user needs to compare items side-by-side, use tabs; if content is supplementary, use an accordion; if an action requires explicit confirmation, use a modal. The framework anchors pattern choice in user goals rather than aesthetic preference.',
            },
          ],
          links: [
            {
              title: 'Tab Usability Guidelines',
              url: 'https://www.nngroup.com/articles/tabs-used-carefully/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Material Design — Navigation Patterns',
              url: 'https://m3.material.io/components/navigation-rail/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'W3C — Accessible Interaction Patterns',
              url: 'https://www.w3.org/WAI/ARIA/apg/patterns/',
              sourceName: 'W3C / WCAG',
              resourceType: 'reference',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'When should a UX designer choose a tab interface over an accordion?',
            options: [
              'When content is supplementary and can be hidden',
              'When users need to compare multiple panels of content at the same level',
              'When the screen has limited vertical space',
              'When the content is a long article',
            ],
            answerIndex: 1,
            explanation:
              'Tabs are ideal for parallel, equal-level content that users may need to compare. Accordions are better for supplementary content that users can expand as needed.',
          },
        },
      ],
    },

    {
      slug: 'prototyping-and-usability-testing',
      stage: 'Intermediate',
      title: 'Prototyping and Usability Testing',
      description:
        'Build interactive prototypes at varying fidelity, design and run usability tests, and iterate your designs based on real user feedback.',
      topics: [
        {
          slug: 'low-fi-and-hi-fi-prototyping',
          title: 'Low-Fidelity and High-Fidelity Prototyping',
          minutes: 28,
          objectives: [
            'Build a paper prototype and use it to validate a concept in under 30 minutes.',
            'Create a clickable high-fidelity prototype in Figma with realistic data and transitions.',
            'Explain when to use low-fi vs. high-fi fidelity based on the design question being answered.',
          ],
          sections: [
            {
              heading: 'Low-Fidelity Prototypes',
              body: 'Low-fi prototypes — paper sketches, wireframes, or simple Figma frames — test structure and flow without investing in visual polish. They are fast to make and fast to change. Nielsen Norman Group notes that testing with low-fi prototypes catches 85% of usability issues at a fraction of the cost of hi-fi revisions.',
            },
            {
              heading: 'High-Fidelity Prototypes',
              body: 'Hi-fi prototypes in Figma replicate the real product experience: real text, real images, realistic interactions. Smart Animate transitions, component variants, and conditional logic create convincing simulations. They are essential for stakeholder demos and late-stage usability testing where visual details matter.',
            },
            {
              heading: 'Fidelity Matching',
              body: 'The right fidelity matches the question you\'re answering. Early concept validation? Paper sketch. Navigation structure? Wireframe flow. Micro-interaction timing? Hi-fi prototype. Over-investing in fidelity too early wastes time; under-investing too late loses testing accuracy.',
            },
          ],
          links: [
            {
              title: 'Prototyping 101',
              url: 'https://www.nngroup.com/articles/prototyping-101/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Figma Prototyping — Get Started',
              url: 'https://help.figma.com/hc/en-us/articles/360040318013',
              sourceName: 'Figma',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Google UX — Build Wireframes and Prototypes',
              url: 'https://www.coursera.org/learn/wireframes-prototypes',
              sourceName: 'Google UX Resources',
              resourceType: 'course',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'At which stage of the design process is a paper prototype most valuable?',
            options: [
              'When presenting the final design to stakeholders',
              'When validating early concepts before investing in visual design',
              'When preparing developer handoff specifications',
              'When conducting A/B testing against a competitor',
            ],
            answerIndex: 1,
            explanation:
              'Paper prototypes let you test concepts quickly and cheaply, making them ideal for early-stage validation before committing to high-fidelity design.',
          },
        },
        {
          slug: 'usability-testing',
          title: 'Usability Testing',
          minutes: 30,
          objectives: [
            'Write a test plan with tasks, success criteria, and metrics (success rate, time on task, error rate).',
            'Moderate a remote usability test using think-aloud protocol.',
            'Classify usability issues by severity and create an actionable fix list.',
          ],
          sections: [
            {
              heading: 'Test Planning',
              body: 'A usability test plan defines the objectives, participant profile, tasks to observe, metrics to collect, and the testing format (moderated vs. unmoderated, remote vs. in-person). Google UX Design teaches that each task should map to a specific research question — "Can users complete checkout without assistance?" — rather than vague explorations.',
            },
            {
              heading: 'Moderation and Think-Aloud',
              body: 'During a test, the moderator asks participants to think aloud — narrate their thoughts as they interact. The moderator remains neutral: "What are you looking for?" rather than "Click the blue button." Remote tools like Figma\'s FigJam or dedicated platforms record screens and audio for later analysis.',
            },
            {
              heading: 'Severity Classification',
              body: 'After testing, classify each issue: Critical (blocks task completion), Major (causes significant difficulty), Minor (causes slight inconvenience), or Cosmetic (doesn\'t affect usability). Prioritise fixes by severity multiplied by frequency. Nielsen Norman Group\'s severity scale provides a standard framework for this classification.',
            },
          ],
          links: [
            {
              title: 'Usability Testing 101',
              url: 'https://www.nngroup.com/articles/usability-testing-101/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'WCAG — Usability Testing Guidance',
              url: 'https://www.w3.org/WAI/test-evaluate/',
              sourceName: 'W3C / WCAG',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Google UX — Conduct Usability Tests',
              url: 'https://www.coursera.org/learn/usability-testing',
              sourceName: 'Google UX Resources',
              resourceType: 'course',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'A usability issue prevents users from completing a core task. How should it be classified?',
            options: [
              'Cosmetic — fix if time permits',
              'Minor — annoying but not blocking',
              'Major — causes difficulty but users can work around it',
              'Critical — blocks task completion',
            ],
            answerIndex: 3,
            explanation:
              'Critical issues block users from completing tasks entirely and must be fixed before release. They represent the highest severity in usability classification.',
          },
        },
        {
          slug: 'iterating-on-research',
          title: 'Iterating Based on Research',
          minutes: 27,
          objectives: [
            'Translate usability test findings into specific design changes with clear rationale.',
            'Prioritise design iterations using an impact vs. effort matrix.',
            'Run a second round of testing to validate that fixes resolved the identified issues.',
          ],
          sections: [
            {
              heading: 'From Findings to Design Changes',
              body: 'Each usability finding should produce a concrete design action. "Users couldn\'t find the search bar" becomes "Move search to the top-right position per platform convention, increase tap target to 48×48dp." Vague findings like "users were confused" are useless — dig into what specifically caused confusion and what would resolve it.',
            },
            {
              heading: 'Impact vs. Effort Matrix',
              body: 'Plot each proposed change on a 2×2 matrix: high impact / low effort (do first), high impact / high effort (plan), low impact / low effort (do if time permits), low impact / high effort (deprioritise). This framework prevents teams from sinking time into cosmetic fixes while critical issues remain unaddressed.',
            },
            {
              heading: 'Validation Testing',
              body: 'After iterating, run a focused retest with 3–5 participants targeting the specific tasks that failed previously. If the fixes resolve the issues without introducing new problems, the iteration is validated. This closed feedback loop is the core of evidence-based UX design.',
            },
          ],
          links: [
            {
              title: 'Iterative Design Process',
              url: 'https://www.nngroup.com/articles/iterative-design/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Google UX — Create Design Solutions',
              url: 'https://www.coursera.org/learn/design-solutions',
              sourceName: 'Google UX Resources',
              resourceType: 'course',
              relationship: 'primary',
            },
            {
              title: 'Figma — Collaboration and Iteration',
              url: 'https://help.figma.com/hc/en-us/articles/360039958313',
              sourceName: 'Figma',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'After a usability test reveals that users struggle to find the settings page, what is the most appropriate next step?',
            options: [
              'Redesign the entire app\'s navigation from scratch',
              'Translate the finding into a specific design change and validate with a retest',
              'Run another round of the same usability test with more participants',
              'Ask the development team to add a tooltip pointing to settings',
            ],
            answerIndex: 1,
            explanation:
              'Effective iteration means translating findings into specific, testable design changes and then validating those changes with a focused retest.',
          },
        },
      ],
    },

    {
      slug: 'accessibility-delivery-and-systems',
      stage: 'Advanced',
      title: 'Accessibility, Delivery, and Design Systems',
      description:
        'Apply WCAG accessibility standards, prepare research-backed handoffs to development, and contribute to scalable design systems.',
      topics: [
        {
          slug: 'accessibility-for-ux',
          title: 'Accessibility for UX Designers',
          minutes: 29,
          objectives: [
            'Audit a prototype against WCAG 2.1 AA criteria covering perceivable, operable, and understandable.',
            'Design accessible forms with proper labels, error messages, and focus order.',
            'Explain how accessibility benefits all users, not just those with disabilities.',
          ],
          sections: [
            {
              heading: 'WCAG Principles for UX',
              body: 'WCAG 2.1 is built on four principles: Perceivable (information must be presentable), Operable (interface must be navigable), Understandable (content must be clear), and Robust (content must work with assistive technologies). As a UX designer, you directly control perceivability and operability through layout, content structure, and interaction patterns.',
            },
            {
              heading: 'Accessible Forms and Errors',
              body: 'Every form input needs a visible label (not just placeholder text), error messages that identify the field and describe the fix, and a logical tab order. WCAG 3.3.1 requires error identification and 3.3.3 requires error suggestion. Designing these states upfront prevents costly retrofits.',
            },
            {
              heading: 'Accessibility as Universal Design',
              body: 'Curb cuts were designed for wheelchair users but benefit everyone — parents with strollers, cyclists, travellers with luggage. Similarly, captions benefit users in noisy environments, high contrast helps in bright sunlight, and keyboard navigation speeds up power users. Accessibility is not a constraint; it is an enhancement for all.',
            },
          ],
          links: [
            {
              title: 'WCAG 2.1 — Full Guidelines',
              url: 'https://www.w3.org/TR/WCAG21/',
              sourceName: 'W3C / WCAG',
              resourceType: 'specification',
              relationship: 'primary',
            },
            {
              title: 'How to Meet WCAG — Quick Reference',
              url: 'https://www.w3.org/WAI/WCAG21/quickref/',
              sourceName: 'W3C / WCAG',
              resourceType: 'reference',
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
            prompt: 'A form uses placeholder text as the only label for input fields. Which WCAG principle does this violate?',
            options: [
              'Robust — the form doesn\'t work with screen readers',
              'Perceivable — placeholder text disappears when users start typing',
              'Understandable — the form uses technical jargon',
              'Operable — the form cannot be navigated with a keyboard',
            ],
            answerIndex: 1,
            explanation:
              'Placeholder text that disappears on focus violates perceivability because the label is no longer visible when the user is actively filling in the field.',
          },
        },
        {
          slug: 'ux-design-handoff',
          title: 'UX Design Handoff',
          minutes: 28,
          objectives: [
            'Prepare a developer-ready Figma file with annotated specs, redlines, and interaction notes.',
            'Write a design specification document covering states, edge cases, and responsive behaviour.',
            'Conduct a design walkthrough with developers to align on implementation priorities.',
          ],
          sections: [
            {
              heading: 'What Developers Need',
              body: 'Developers need more than pretty screens. They need annotated states (default, hover, active, disabled, error, loading), edge cases (empty states, long text, no data), responsive behaviour (how layouts adapt across breakpoints), and interaction specifications (animation timing, trigger conditions). A Figma file without these annotations creates a wall of questions during implementation.',
            },
            {
              heading: 'Interaction Specifications',
              body: 'Document transitions, animations, and gestures with specifics: "Modal slides up over 300ms with ease-out curve." Use Figma\'s Smart Animate as a reference but write down the exact timing and easing in an annotation layer. This prevents developers from guessing at values that the designer intended.',
            },
            {
              heading: 'The Walkthrough',
              body: 'Before development begins, walk the team through the design file screen by screen. Highlight edge cases, discuss technical feasibility in real time, and agree on implementation priorities. Google UX Design emphasises this collaborative step as the bridge between design intent and production reality.',
            },
          ],
          links: [
            {
              title: 'Design Handoff Best Practices',
              url: 'https://www.nngroup.com/articles/developer-handoff/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Figma Developer Handoff',
              url: 'https://help.figma.com/hc/en-us/articles/360040323353',
              sourceName: 'Figma',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Google UX — Design Handoff and Collaboration',
              url: 'https://www.coursera.org/learn/collaborate-with-developers',
              sourceName: 'Google UX Resources',
              resourceType: 'course',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Which of the following should a UX designer include in a design specification for developers?',
            options: [
              'Only final screen mockups',
              'Edge cases, interaction timings, and responsive behaviour alongside screen designs',
              'A list of recommended fonts without specific sizes',
              'Marketing copy for every screen',
            ],
            answerIndex: 1,
            explanation:
              'Comprehensive handoff documentation covers states, edge cases, interaction specifications, and responsive behaviour — not just the visual appearance of screens.',
          },
        },
        {
          slug: 'contributing-to-design-systems',
          title: 'Contributing to Design Systems',
          minutes: 26,
          objectives: [
            'Identify when a pattern should be elevated from a screen-specific solution to a system-level component.',
            'Write a component proposal that includes usage guidelines, accessibility requirements, and variants.',
            'Participate in a design system governance review to maintain consistency across teams.',
          ],
          sections: [
            {
              heading: 'Recognising System Opportunities',
              body: 'A design pattern becomes a system component when it appears in three or more places with the same structure. Before proposing a new component, audit existing designs: is this truly new, or can an existing component be extended? Over-creating components bloats the system and increases maintenance cost for designers and developers alike.',
            },
            {
              heading: 'Writing a Component Proposal',
              body: 'A strong proposal includes: the use case (when and why to use it), the variants needed (sizes, states, content types), accessibility requirements (keyboard interaction, screen reader labels), and responsive behaviour. Reference Material Design\'s component documentation as a model for thorough, structured proposals.',
            },
            {
              heading: 'Governance and Reviews',
              body: 'Design system governance involves regular review sessions where proposed components are evaluated against existing patterns, accessibility standards, and scalability. Participation in these reviews sharpens your systems thinking and ensures your contributions strengthen rather than fragment the system.',
            },
          ],
          links: [
            {
              title: 'Design System Governance',
              url: 'https://www.nngroup.com/articles/design-system-ux/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Material Design — Component Documentation',
              url: 'https://m3.material.io/components/buttons/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Figma — Building Component Libraries',
              url: 'https://help.figma.com/hc/en-us/articles/360039238751',
              sourceName: 'Figma',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'When should a repeated UI pattern be promoted to a design system component?',
            options: [
              'The first time it appears in a design file',
              'When it appears in three or more contexts with the same structure',
              'When the lead designer requests it',
              'Only when developers ask for it',
            ],
            answerIndex: 1,
            explanation:
              'A pattern qualifies for system-level promotion when it demonstrates consistent reuse across multiple contexts, justifying the investment in documentation, variants, and maintenance.',
          },
        },
      ],
    },
  ],

  practicalExam: {
    title: 'Design a Mobile Food-Ordering Experience',
    coverage: [
      'User research and persona development',
      'Information architecture and navigation',
      'User journey mapping',
      'Wireframing and low-fidelity prototyping',
      'High-fidelity Figma prototype with interactions',
      'Usability testing plan and moderation',
      'WCAG accessibility compliance',
      'Developer handoff documentation',
    ],
    brief:
      'You are the UX Designer at PivotPoint Design Co., tasked with redesigning the mobile ordering flow for a restaurant chain called "GreenBowl." The current app has a 62% checkout abandonment rate. Your deliverable includes research-backed personas, a journey map, information architecture, wireframes, a high-fidelity Figma prototype, a usability test plan with findings, and a developer-ready handoff file.',
    requirements: [
      'Two research-backed personas based on secondary research about food-ordering app users.',
      'A user journey map covering awareness, browsing, ordering, checkout, and post-order stages.',
      'A sitemap and navigation structure derived from a card sort (document the process).',
      'Low-fidelity wireframes for the three core screens: browse menu, item detail, and checkout.',
      'A high-fidelity Figma prototype with Smart Animate transitions covering the full order flow.',
      'A usability test plan with 5 tasks, success criteria, and metrics for each task.',
      'Accessibility annotations covering contrast ratios, focus order, and screen reader labels.',
      'A developer handoff page with annotated specs, interaction timings, and responsive notes.',
    ],
    expectedOutput:
      'A Figma file containing personas, journey map, sitemap, wireframes, high-fidelity prototype, usability test plan, accessibility annotations, and handoff documentation.',
    rubric: [
      {
        skill: 'Research and Personas',
        weight: 15,
        criteria: 'Personas are grounded in evidence, include goals and pain points, and directly inform design decisions.',
      },
      {
        skill: 'Journey Mapping',
        weight: 15,
        criteria: 'Journey map covers the full lifecycle, identifies pain points and opportunities, and links to design priorities.',
      },
      {
        skill: 'Information Architecture',
        weight: 15,
        criteria: 'Navigation structure is logical, derived from card sort data, and follows progressive disclosure principles.',
      },
      {
        skill: 'Wireframing and Prototyping',
        weight: 20,
        criteria: 'Wireframes are clear and uncluttered; hi-fi prototype demonstrates realistic interactions and covers the complete flow.',
      },
      {
        skill: 'Usability Testing',
        weight: 15,
        criteria: 'Test plan is well-structured with measurable tasks; findings are classified by severity with actionable recommendations.',
      },
      {
        skill: 'Accessibility',
        weight: 10,
        criteria: 'All text meets 4.5:1 contrast; focus order is logical; screen reader annotations are present and accurate.',
      },
      {
        skill: 'Handoff Quality',
        weight: 10,
        criteria: 'Handoff includes interaction specs, edge cases, responsive behaviour, and clear annotations for developers.',
      },
    ],
    passScore: 72,
  },

  assignments: [
    {
      title: 'Build a Research-Backed Persona and Empathy Map',
      stage: 'Beginner',
      objective:
        'Conduct secondary research on a target audience for a fitness-tracking app, create two detailed personas, and build an empathy map for each that captures says, thinks, does, and feels.',
      requirements: [
        'Two personas with demographics, goals, frustrations, and context of use.',
        'Each persona includes at least 3 goals and 3 pain points grounded in research evidence.',
        'An empathy map for each persona covering says, thinks, does, and feels quadrants.',
        'A brief research summary citing the sources used to inform the personas.',
        'A "How Might We" statement derived from each persona\'s top frustration.',
      ],
      skillsEvaluated: [
        'User research synthesis',
        'Persona creation methodology',
        'Empathy mapping',
        'Insight generation',
      ],
      dueDays: 5,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions:
          'Submit a PDF or Figma page containing both personas, their empathy maps, and the research summary.',
        textLabel: 'Research summary and reflections',
        minTextLength: 150,
      },
    },
    {
      title: 'Conduct and Document a Usability Test',
      stage: 'Intermediate',
      objective:
        'Conduct a moderated usability test with 3–5 participants on an existing mobile app (or provided prototype), document findings in a structured report, and propose design improvements for the top 3 issues.',
      requirements: [
        'A test plan with objectives, participant profile, 4 task scenarios, and success criteria.',
        'Observations from at least 3 participants recorded in a structured format.',
        'Findings classified by severity (Critical, Major, Minor, Cosmetic) with frequency noted.',
        'Proposed design changes for the top 3 issues with rationale tied to findings.',
        'A before/after visual comparison for the highest-severity fix.',
      ],
      skillsEvaluated: [
        'Usability test planning',
        'Test moderation',
        'Finding classification and prioritisation',
        'Design iteration from evidence',
      ],
      dueDays: 8,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions:
          'Submit a usability test report (PDF or Figma) containing the test plan, raw observations, severity-rated findings, and proposed design fixes.',
        textLabel: 'Test reflection',
        minTextLength: 200,
      },
    },
    {
      title: 'Design an Accessible Multi-Step Form',
      stage: 'Advanced',
      objective:
        'Design a three-step registration form (account details, preferences, profile photo) for a mobile app, ensuring full WCAG 2.1 AA compliance, and prepare a complete developer handoff package.',
      requirements: [
        'Three screens designed for a 390×844 viewport with clear progress indication.',
        'All form inputs have visible labels, not just placeholder text.',
        'Error states designed for every input with specific, helpful error messages.',
        'Tab order and focus indicators documented for keyboard and screen reader navigation.',
        'A developer handoff page with CSS inspect values, interaction timings, and edge case notes.',
      ],
      skillsEvaluated: [
        'Form design and error handling',
        'WCAG accessibility compliance',
        'Interaction design',
        'Developer handoff preparation',
      ],
      dueDays: 7,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions:
          'Submit a Figma file with the three form screens, error states, accessibility annotations, and the developer handoff page.',
        textLabel: 'Accessibility rationale',
        minTextLength: 200,
      },
    },
  ],

  simTasks: [
    {
      title: 'Diagnose and Fix a High Checkout Abandonment Rate',
      context:
        'The product manager sends a Slack message: "Our checkout abandonment rate jumped from 45% to 62% last month. I need you to investigate, run quick usability tests, and propose fixes by end of week. The CEO wants answers in Monday\'s all-hands."',
      requirements: [
        'Review the existing checkout flow and identify the 3 most likely friction points using heuristic evaluation.',
        'Conduct at least 3 remote think-aloud usability sessions with the checkout flow.',
        'Document findings with severity ratings and supporting participant quotes.',
        'Propose specific design changes for the top 3 issues with before/after wireframes.',
        'Prepare a 5-slide summary for the CEO presentation covering problem, evidence, and proposed solutions.',
      ],
      priority: 'critical',
      dueDayOffset: 4,
      expectedOutput:
        'A usability findings document with severity-rated issues, proposed wireframe fixes, and a concise CEO-ready summary deck.',
      skills: ['Heuristic evaluation', 'Usability testing', 'Finding prioritisation', 'Stakeholder communication'],
    },
    {
      title: 'Redesign a Confusing Navigation Structure',
      context:
        'The analytics team flags that users take an average of 4.2 steps to reach the "Account Settings" page. The current IA was designed by engineers without UX input. You have one sprint to redesign the navigation and validate it with users.',
      requirements: [
        'Conduct an open card sort with at least 5 participants to derive a new navigation structure.',
        'Create a sitemap comparing the old structure with the proposed new structure.',
        'Design wireframes for the main navigation screens (bottom nav or side drawer, depending on platform).',
        'Prototype the navigation flow in Figma with realistic transitions.',
        'Run a tree test or first-click test with 5 participants to validate the new structure.',
      ],
      priority: 'high',
      dueDayOffset: 5,
      expectedOutput:
        'A Figma file with card sort results, a before/after sitemap, navigation wireframes, and validation test results.',
      skills: ['Information architecture', 'Card sorting', 'Navigation design', 'Validation testing'],
    },
    {
      title: 'Create an Accessibility Audit Report for a Stakeholder',
      context:
        'The legal team informs you that a major client requires WCAG 2.1 AA compliance certification for a dashboard product before the contract renewal in 2 weeks. You need to audit the current designs and produce a report with prioritised remediation steps.',
      requirements: [
        'Audit every screen in the dashboard prototype against WCAG 2.1 AA criteria.',
        'Document each violation with a specific criterion reference (e.g., 1.4.3 Contrast Minimum).',
        'Classify violations by severity and provide estimated effort to fix (low, medium, high).',
        'Propose a prioritised remediation plan that can be completed within 2 weeks.',
        'Include a brief executive summary for the legal and business teams.',
      ],
      priority: 'normal',
      dueDayOffset: 3,
      expectedOutput:
        'An accessibility audit report with a criterion-referenced violation list, severity ratings, effort estimates, and a 2-week remediation roadmap.',
      skills: ['WCAG auditing', 'Accessibility documentation', 'Risk assessment', 'Stakeholder reporting'],
    },
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Alex Kim',
      personaRole: 'Front-End Developer',
      situation:
        'Alex has been implementing your checkout redesign but skipped the accessibility annotations you provided. The result works visually but fails basic keyboard navigation and screen reader testing.',
      openingMessage:
        'Hey, I finished implementing the checkout flow. It looks great visually, but I didn\'t get to the accessibility annotations yet — figured I\'d handle them later. Is that okay?',
      expectedPoints: [
        'Explain that accessibility is not a "later" task but a core part of the design spec.',
        'Walk Alex through the specific annotations that were missed (focus order, ARIA labels, contrast).',
        'Offer to pair on implementing the keyboard navigation flow together.',
        'Share the WCAG criteria that apply to form inputs and explain the business case for compliance.',
        'Agree on a process where accessibility annotations are reviewed before development starts.',
      ],
    },
    {
      kind: 'client',
      personaName: 'Rachel Torres',
      personaRole: 'VP of Product, GreenBowl Restaurant Chain',
      situation:
        'Rachel has seen the usability test results for the new ordering app. She is surprised by how many issues emerged and questions whether the testing methodology was valid.',
      openingMessage:
        'I saw the test results and honestly, I\'m worried. We have 14 usability issues across 5 screens? That seems excessive. Was the test set up correctly?',
      expectedPoints: [
        'Reassure Rachel that finding issues is the entire purpose of usability testing — it\'s a good sign.',
        'Walk through the severity classification to distinguish cosmetic issues from critical blockers.',
        'Highlight that most critical issues have straightforward fixes with low effort.',
        'Present the top 3 fixes with before/after comparisons to show the quick wins.',
        'Explain that addressing these issues early is far cheaper than fixing them post-launch.',
      ],
    },
    {
      kind: 'team',
      personaName: 'Jamie Patel',
      personaRole: 'UX Researcher',
      situation:
        'Jamie conducted user interviews for the onboarding flow but the findings are vague — "users found it confusing" — and don\'t give you enough detail to design specific improvements.',
      openingMessage:
        'I finished the onboarding interviews. Users generally found the flow confusing. I\'ve written up a summary but I\'m not sure what to do next.',
      expectedPoints: [
        'Review Jamie\'s notes to identify which specific steps caused confusion.',
        'Ask Jamie to re-watch interview recordings and timestamp the exact moments of confusion.',
        'Suggest a follow-up study with task-based scenarios targeting the problematic steps.',
        'Help Jamie develop more specific research questions for the next round.',
        'Document the findings in a structured format (journey map or task flow) to make them actionable.',
      ],
    },
    {
      kind: 'client',
      personaName: 'Marcus Lee',
      personaRole: 'CTO, GreenBowl Restaurant Chain',
      situation:
        'Marcus is concerned that the UX team\'s research phase is taking too long. He wants to see screens being designed and argues that the team "already knows enough" to move forward.',
      openingMessage:
        'Look, I respect the process, but we\'ve been in research mode for 3 weeks now and we haven\'t shipped a single screen. Can we speed this up?',
      expectedPoints: [
        'Acknowledge the pressure to move quickly and validate the business concern.',
        'Present the key findings so far that directly inform design decisions.',
        'Explain the cost of designing without research: a 2023 study showed 50% more rework cycles.',
        'Propose a phased approach: deliver low-fi wireframes based on current research while continuing validation.',
        'Commit to a specific date for the first interactive prototype review.',
      ],
    },
  ],

  workplaceScenarios: [
    {
      category: 'Research Ethics and Consent',
      situation:
        'You\'re about to run a usability test with a participant who has disclosed a visual impairment. You realise the test script and consent form were not designed for accessibility — the font is small and there\'s no option for screen-reader-compatible digital consent.',
      requiredActions: [
        {
          action: 'Pause the session, acknowledge the oversight, and provide an accessible version of the consent form before proceeding.',
          good: true,
          note: 'User research must be inclusive. Pausing to fix an accessibility gap respects the participant and ensures informed consent.',
        },
        {
          action: 'Ask the participant to sign the paper form anyway and proceed with the test.',
          good: false,
          note: 'Ignoring the accessibility gap violates informed consent principles and risks harm to the participant.',
        },
        {
          action: 'Offer to reschedule the session while you prepare an accessible version, but only if the participant agrees.',
          good: true,
          note: 'Giving the participant the choice to proceed or reschedule respects their autonomy while acknowledging the oversight.',
        },
        {
          action: 'Skip the consent form entirely to save time since it\'s just an internal test.',
          good: false,
          note: 'Consent is legally and ethically required for any research involving human participants, regardless of the test\'s internal nature.',
        },
      ],
    },
    {
      category: 'Design-Engineering Conflict',
      situation:
        'The engineering team pushes back on your proposed design for the settings page, arguing that the multi-column layout you designed is too complex to implement responsively. They suggest a simpler single-column approach that changes the information hierarchy you carefully designed.',
      requiredActions: [
        {
          action: 'Ask the engineering team to explain the specific technical constraint causing the issue and discuss alternatives collaboratively.',
          good: true,
          note: 'Understanding the constraint before reacting leads to solutions that satisfy both design goals and technical reality.',
        },
        {
          action: 'Present the user research that justifies the multi-column layout and propose a simplified version that preserves the core hierarchy.',
          good: true,
          note: 'Grounding the discussion in research evidence elevates it from opinion-based debate to evidence-based problem-solving.',
        },
        {
          action: 'Demand that engineering implement the design exactly as specified since the UX team "owns" the user experience.',
          good: false,
          note: 'Insisting without understanding the constraint damages the working relationship and ignores legitimate technical concerns.',
        },
        {
          action: 'Abandon your design and adopt the engineering team\'s single-column suggestion without further discussion.',
          good: false,
          note: 'Fully capitulating without exploring alternatives means the user need that drove the original design goes unaddressed.',
        },
      ],
    },
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Walk me through your process for conducting a usability test. What do you plan before, during, and after the session?',
      guidancePoints: [
        'Define clear objectives and hypotheses before the test.',
        'Write task scenarios that are realistic, specific, and free of leading language.',
        'Select an appropriate sample size (5 is sufficient for finding 85% of issues per Nielsen).',
        'Use think-aloud protocol during sessions while remaining neutral as a moderator.',
        'Classify findings by severity and translate them into actionable design changes.',
      ],
    },
    {
      dimension: 'problem_solving',
      prompt: 'You discover during testing that users consistently skip an important feature on the homepage. How do you diagnose and address this?',
      guidancePoints: [
        'Observe whether users see the feature at all (visibility/visual hierarchy issue).',
        'Determine whether users understand what the feature does (label clarity issue).',
        'Assess whether the feature appears at a point in the journey where users need it (context issue).',
        'Consider alternative placements, labels, or visual treatments based on findings.',
        'Validate proposed changes with a follow-up test before finalising.',
      ],
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you balance user research findings with business requirements when they seem to conflict?',
      guidancePoints: [
        'Seek to understand the business requirement deeply before assuming it conflicts with user needs.',
        'Look for solutions that satisfy both constraints — often the conflict is a false dichotomy.',
        'Present research evidence to business stakeholders with concrete impact data (conversion, retention).',
        'Propose a compromise with a measurable test to validate which approach performs better.',
        'Document the decision and its rationale for future reference.',
      ],
    },
    {
      dimension: 'communication',
      prompt: 'Describe a time you had to communicate a negative research finding to a stakeholder who was emotionally invested in a feature.',
      guidancePoints: [
        'Lead with the data, not with opinions or blame.',
        'Acknowledge the stakeholder\'s investment and the work that went into the feature.',
        'Frame findings as opportunities to improve, not as failures.',
        'Present specific, actionable alternatives rather than just criticism.',
        'Follow up with a summary email to ensure alignment on next steps.',
      ],
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between a journey map, a task flow, and a user flow. When would you use each?',
      guidancePoints: [
        'A journey map captures the full end-to-end experience across channels over time.',
        'A task flow maps the specific steps a user takes to complete a single task within a product.',
        'A user flow includes decision points and branching paths within a product.',
        'Use journey maps for strategic, cross-touchpoint analysis.',
        'Use task flows and user flows for tactical, screen-level design decisions.',
      ],
    },
    {
      dimension: 'problem_solving',
      prompt: 'You join a project with no existing research, no personas, and a product that\'s already in production. How do you approach building a UX foundation without disrupting the current team?',
      guidancePoints: [
        'Start with a lightweight heuristic evaluation to identify immediate usability issues.',
        'Conduct 3–5 user interviews with existing customers to build initial personas.',
        'Analyse existing analytics data to identify high-traffic and high-abandonment flows.',
        'Prioritise research on the most impactful user journeys first.',
        'Present findings to the team in a digestible format to build buy-in for ongoing research.',
      ],
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'When do you decide that a design is "good enough" to ship, and when do you continue iterating?',
      guidancePoints: [
        'Set measurable success criteria before testing (e.g., 90% task completion rate).',
        'Ship when critical issues are resolved and remaining issues are minor or cosmetic.',
        'Consider the cost of delay: perfectionism can harm the business more than minor usability gaps.',
        'Plan for post-launch monitoring with analytics and feedback mechanisms.',
        'Document known issues and schedule them for future sprints rather than blocking release.',
      ],
    },
    {
      dimension: 'communication',
      prompt: 'How do you present UX research findings to a room full of engineers who may not be familiar with UX methodology?',
      guidancePoints: [
        'Translate research jargon into plain language — "think-aloud" becomes "we asked users to narrate their thoughts."',
        'Lead with visual evidence: video clips, screenshots with annotations, and journey maps.',
        'Connect findings directly to engineering impact: "this issue causes 30% of support tickets."',
        'Provide a prioritised action list with clear owner assignments and effort estimates.',
        'Invite questions and create a shared document for follow-up discussion.',
      ],
    },

  ]
  ,
}
