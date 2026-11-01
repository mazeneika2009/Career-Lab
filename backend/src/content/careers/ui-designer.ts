import type { CareerDef } from '../framework.js'

export const uiDesigner: CareerDef = {
  slug: 'ui-designer',
  name: 'UI Designer',
  category: 'Design',
  order: 39,
  description: 'Crafts polished interfaces — hierarchy, type, color, grids, components and design systems in Figma-ready workflows.',
  difficulty: 'Beginner-friendly',
  pathSummary:
    'UI Designers begin by mastering visual hierarchy and Figma fundamentals, progress through typography systems and color theory, build component libraries and design tokens, and culminate in managing full design systems across platforms.',
  mainSkills: [
    'Visual hierarchy and layout',
    'Typography and type systems',
    'Color theory and palette construction',
    'Component design and variation',
    'Design tokens and theming',
    'Figma prototyping and handoff',
    'Accessibility-aware interface design',
    'Grid systems and responsive layouts',
  ],
  sourcePlatforms: [
    'Figma',
    'Material Design',
    'Apple Human Interface Guidelines',
    'W3C / WCAG',
    'Nielsen Norman Group',
  ],
  companyName: 'Pixelcraft Studios',
  roleTitle: 'UI Designer',

  chapters: [
    {
      slug: 'visual-foundations',
      stage: 'Beginner',
      title: 'Visual Foundations',
      description:
        'Build a rock-solid grasp of the core visual principles — hierarchy, spacing, type, and color — that every polished interface depends on.',
      topics: [
        {
          slug: 'hierarchy-and-layout',
          title: 'Visual Hierarchy and Layout',
          minutes: 28,
          objectives: [
            'Explain why visual hierarchy drives user comprehension in UI.',
            'Apply the Gestalt principles to organise elements in a layout.',
            'Use Figma auto-layout to build a basic screen from a wireframe.',
          ],
          sections: [
            {
              heading: 'What Is Visual Hierarchy?',
              body: 'Visual hierarchy is the deliberate arrangement of elements to guide the eye in order of importance. Size, contrast, proximity, and whitespace all contribute. Nielsen Norman Group notes that users scan pages in an F-pattern or Z-pattern depending on content density, making deliberate placement essential.',
            },
            {
              heading: 'Gestalt Principles in UI',
              body: 'Proximity groups related items, similarity implies shared function, continuity leads the eye along a path, and closure lets the brain complete incomplete shapes. A button with an icon inside a card uses proximity and closure to communicate a clickable action without extra labels.',
            },
            {
              heading: 'Auto-Layout in Practice',
              body: 'Figma\'s auto-layout frames let you define direction, padding, spacing, and resizing behaviour. Building a simple card — image, title, subtitle, button — with auto-layout teaches you how nested frames and constraints create responsive, maintainable layouts from the start.',
            },
          ],
          links: [
            {
              title: 'Visual Hierarchy in User Interface Design',
              url: 'https://www.nngroup.com/articles/visual-hierarchy-organizing-content/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Figma Auto Layout Documentation',
              url: 'https://help.figma.com/hc/en-us/articles/5731381629847',
              sourceName: 'Figma',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Gestalt Principles for UI Design',
              url: 'https://www.interaction-design.org/literature/topics/gestalt-principles',
              sourceName: 'Interaction Design Foundation',
              resourceType: 'article',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Which Gestalt principle states that elements placed close together are perceived as a group?',
            options: ['Similarity', 'Proximity', 'Continuity', 'Closure'],
            answerIndex: 1,
            explanation:
              'Proximity states that objects near each other are perceived as related. UI designers use spacing to signal grouping without explicit borders.',
          },
        },
        {
          slug: 'typography-fundamentals',
          title: 'Typography Fundamentals',
          minutes: 27,
          objectives: [
            'Distinguish between display, heading, and body type hierarchies.',
            'Set a legible type scale using a modular or major-third ratio.',
            'Configure text styles in a Figma file that export cleanly to CSS.',
          ],
          sections: [
            {
              heading: 'Type Hierarchy',
              body: 'A well-structured interface uses a clear hierarchy: display type for hero moments, headings for section context, body for content, and caption/helper text for meta information. Apple HIG recommends at least four distinct sizes to differentiate hierarchy levels.',
            },
            {
              heading: 'Building a Type Scale',
              body: 'A modular scale generates harmonious sizes by multiplying a base size by a ratio. Common ratios include 1.2 (minor third) for dense UIs and 1.25 (major third) for spacious layouts. Combining scale with line-height (1.4–1.6 for body) ensures readability.',
            },
            {
              heading: 'Figma Text Styles',
              body: 'Creating named text styles in Figma (e.g. "Heading / H1", "Body / Regular") keeps your project consistent and enables accurate developer handoff. Pair each style with a specific font, size, weight, line-height, and letter-spacing value.',
            },
          ],
          links: [
            {
              title: 'Typography — Apple Human Interface Guidelines',
              url: 'https://developer.apple.com/design/human-interface-guidelines/typography',
              sourceName: 'Apple Human Interface Guidelines',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Material Design — Typography',
              url: 'https://m3.material.io/styles/typography/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Modular Scale Calculator',
              url: 'https://www.modularscale.com/',
              sourceName: 'Modular Scale',
              resourceType: 'reference',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What is the recommended line-height range for body text to ensure comfortable readability on screens?',
            options: ['0.9–1.1', '1.2–1.3', '1.4–1.6', '2.0–2.4'],
            answerIndex: 2,
            explanation:
              'A line-height of 1.4–1.6 (often called "leading" in design) provides enough whitespace between lines of body text for comfortable reading on screens.',
          },
        },
        {
          slug: 'color-theory-for-ui',
          title: 'Color Theory for UI',
          minutes: 30,
          objectives: [
            'Define hue, saturation, and lightness and their role in interface palettes.',
            'Construct a five-stop neutral grey ramp and a brand-primary ramp in HSL.',
            'Verify sufficient contrast ratios using WebAIM or Figma plugins.',
          ],
          sections: [
            {
              heading: 'HSL in UI Design',
              body: 'Hue, saturation, and lightness (HSL) give designers intuitive control. A UI palette typically starts with a brand hue, then derives tints (lower saturation, higher lightness) and shades (higher saturation, lower lightness) for interactive states, backgrounds, and text.',
            },
            {
              heading: 'Neutral Grey Ramps',
              body: 'Neutral greys are the backbone of any interface. A five-stop ramp — from near-white (grey-50) to near-black (grey-900) — covers backgrounds, borders, disabled states, and body text. Slight warm or cool tints in greys add personality without competing with brand color.',
            },
            {
              heading: 'Contrast and Accessibility',
              body: 'WCAG 2.1 requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. Using tools like WebAIM Contrast Checker or the Figma "Stark" plugin ensures your palette meets these thresholds before development begins.',
            },
          ],
          links: [
            {
              title: 'WCAG 2.1 — Understanding Contrast Requirements',
              url: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum',
              sourceName: 'W3C / WCAG',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Material Design — Color System',
              url: 'https://m3.material.io/styles/color/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Contrast Checker — WebAIM',
              url: 'https://webaim.org/resources/contrastchecker/',
              sourceName: 'WebAIM',
              resourceType: 'reference',
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
      ],
    },

    {
      slug: 'components-and-grids',
      stage: 'Foundation',
      title: 'Components and Grids',
      description:
        'Learn to design reusable components, manage variants, and apply responsive grid systems that scale across devices.',
      topics: [
        {
          slug: 'component-basics',
          title: 'Component Basics in Figma',
          minutes: 29,
          objectives: [
            'Explain the difference between a Figma main component and an instance.',
            'Create a button component with default, hover, and disabled variants.',
            'Swap instances to demonstrate variant overrides without breaking the design.',
          ],
          sections: [
            {
              heading: 'Main Components vs. Instances',
              body: 'A main component in Figma is the single source of truth. Instances inherit all properties from the main but allow overrides on non-linked fields. Updating the main propagates changes everywhere — a key efficiency gain for design systems.',
            },
            {
              heading: 'Building a Button Component',
              body: 'Start with a frame containing a label and optional icon. Turn it into a component, then add variants: Primary, Secondary, Ghost, and Disabled. Use Figma\'s variant property system to swap between states without duplicating components.',
            },
            {
              heading: 'Instance Swap and Overrides',
              body: 'Instance swap lets you replace an icon inside a button without detaching the instance. Overrides on text content, color, or padding are preserved through swaps. This pattern keeps designs maintainable as the component library evolves.',
            },
          ],
          links: [
            {
              title: 'Figma Components Documentation',
              url: 'https://help.figma.com/hc/en-us/articles/360039238751',
              sourceName: 'Figma',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Material Design — Buttons',
              url: 'https://m3.material.io/components/buttons/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Figma — Create and Use Variants',
              url: 'https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants',
              sourceName: 'Figma',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'In Figma, what happens when you update a property on a main component?',
            options: [
              'Only the selected instance updates',
              'A new instance is created',
              'All instances update unless the property was overridden',
              'Nothing changes until you re-import the file',
            ],
            answerIndex: 2,
            explanation:
              'Main component changes propagate to all instances. However, if an instance has a local override on that property, the override is preserved.',
          },
        },
        {
          slug: 'grid-systems',
          title: 'Grid Systems and Responsive Layouts',
          minutes: 26,
          objectives: [
            'Set up a 12-column grid with gutters and margins in Figma.',
            'Apply column constraints to build a layout that adapts from mobile to desktop.',
            'Use Figma\'s layout grid features to visually verify alignment across breakpoints.',
          ],
          sections: [
            {
              heading: 'Why Grids Matter',
              body: 'Grids impose consistent spatial rhythm across screens. Material Design recommends 4dp and 8dp grids for component spacing, while the 12-column system enables flexible combinations (4+4+4, 3+6+3, 6+6) for varied content layouts.',
            },
            {
              heading: 'Setting Up a 12-Column Grid',
              body: 'In Figma, add a Layout Grid to your top-level frame. Choose Columns mode, set 12 columns, a gutter of 24px, and margins of 32px for desktop (wider on large screens). Tighten margins and columns for mobile breakpoints.',
            },
            {
              heading: 'Responsive Constraints',
              body: 'Figma constraints (Left, Right, Center, Scale) determine how child frames reposition and resize. Combining constraints with auto-layout creates layouts that adapt fluidly between breakpoints, reducing the need for separate mobile and desktop frames.',
            },
          ],
          links: [
            {
              title: 'Material Design — Responsive Layout Grid',
              url: 'https://m3.material.io/foundations/layout/applying-layout/grid',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Apple HIG — Layout Fundamentals',
              url: 'https://developer.apple.com/design/human-interface-guidelines/layout',
              sourceName: 'Apple Human Interface Guidelines',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Figma Layout Grids Documentation',
              url: 'https://help.figma.com/hc/en-us/articles/360039957913',
              sourceName: 'Figma',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What is the typical gutter width recommended by Material Design for a 12-column grid on tablet devices?',
            options: ['4dp', '16dp', '24dp', '48dp'],
            answerIndex: 2,
            explanation:
              'Material Design recommends 24dp gutters for tablet and desktop grids, scaling down to 16dp on compact mobile screens.',
          },
        },
        {
          slug: 'variant-modes',
          title: 'Component Variants and Modes',
          minutes: 28,
          objectives: [
            'Define multi-property variants for a card component (size × content type).',
            'Use Figma modes to preview light and dark theme variants in one file.',
            'Document variant naming conventions that scale to large design systems.',
          ],
          sections: [
            {
              heading: 'Multi-Property Variants',
              body: 'Figma\'s variant system supports multiple properties (e.g. Size: Small/Medium/Large × Type: Default/Image/Minimal). Each combination becomes a unique variant while remaining a single component in the assets panel, reducing clutter.',
            },
            {
              heading: 'Figma Modes for Theming',
              body: 'Variable modes let you define a "Light" and "Dark" mode for your color tokens. Switching the mode on a frame re-maps all bound variables instantly, letting designers validate both themes without duplicating screens.',
            },
            {
              heading: 'Naming Conventions',
              body: 'A consistent naming scheme — "Card / Default / Medium" — enables alphabetical sorting and clear asset search. Convention-driven naming is critical as component libraries grow beyond 50 elements.',
            },
          ],
          links: [
            {
              title: 'Figma Variants Documentation',
              url: 'https://help.figma.com/hc/en-us/articles/15339657135383',
              sourceName: 'Figma',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Apple HIG — Dark Mode',
              url: 'https://developer.apple.com/design/human-interface-guidelines/dark-mode',
              sourceName: 'Apple Human Interface Guidelines',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Material Design — Dark Theme',
              url: 'https://m3.material.io/styles/color/static/baseline',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'In Figma, what feature allows a single component to have multiple selectable configurations (e.g. size, type) without creating separate components?',
            options: ['Auto-layout', 'Component properties', 'Variants', 'Detached instances'],
            answerIndex: 2,
            explanation:
              'Variants group multiple component states under one asset. Each variant is selectable by property values, keeping the component panel organised.',
          },
        },
      ],
    },

    {
      slug: 'design-systems',
      stage: 'Intermediate',
      title: 'Design Systems and Tokens',
      description:
        'Architect design tokens, build scalable component libraries, and document patterns that keep large teams aligned.',
      topics: [
        {
          slug: 'design-tokens',
          title: 'Design Tokens and Theming',
          minutes: 30,
          objectives: [
            'Define primitive, semantic, and component-level tokens in a layered model.',
            'Map Figma variables to a token naming convention (e.g. color.brand.primary).',
            'Export tokens as JSON and explain how developers consume them.',
          ],
          sections: [
            {
              heading: 'Token Layering',
              body: 'Primitive tokens are raw values (blue-500, grey-100). Semantic tokens reference primitives with meaning (color.bg.surface = grey-50). Component tokens reference semantic tokens (button.bg.primary = color.bg.brand). This three-layer model keeps themes maintainable.',
            },
            {
              heading: 'Figma Variables as Tokens',
              body: 'Figma variables store values that can be mode-dependent. Naming them with dot notation (color.brand.primary) mirrors JSON structures developers expect. Collections group related tokens and modes enable light/dark theme switching.',
            },
            {
              heading: 'Developer Handoff',
              body: 'Tools like Figma Tokens (now Variables API) or Style Dictionary transform Figma variables into platform-specific code (CSS custom properties, Swift constants, Kotlin resources). This bridge eliminates manual token translation and reduces theming bugs.',
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
              title: 'Style Dictionary — Design Token Transformer',
              url: 'https://amzn.github.io/style-dictionary/',
              sourceName: 'Amazon / Style Dictionary',
              resourceType: 'reference',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Which token layer represents a value with a clear purpose (e.g. "color.bg.surface") rather than a raw hex?',
            options: ['Primitive tokens', 'Semantic tokens', 'Component tokens', 'Global tokens'],
            answerIndex: 1,
            explanation:
              'Semantic tokens carry meaning ("surface", "brand", "danger") and reference primitive values. They allow theme-level swaps without renaming every reference.',
          },
        },
        {
          slug: 'documentation-patterns',
          title: 'Documentation and Pattern Libraries',
          minutes: 28,
          objectives: [
            'Write a usage guideline for a component covering do\'s and don\'ts.',
            'Structure a Figma page as a pattern library with clear navigation.',
            'Link design tokens to their rendered component states for traceability.',
          ],
          sections: [
            {
              heading: 'Usage Guidelines',
              body: 'Every component needs a guideline page: when to use it, when not to use it, accessibility notes, and code references. Nielsen Norman Group emphasises that documentation prevents "design drift" as teams scale.',
            },
            {
              heading: 'Page Structure in Figma',
              body: 'A well-structured Figma file uses named pages: Overview, Tokens, Foundations, Components, Patterns, and Archive. Each component page contains the main component, variants, usage guidelines, and real-world examples.',
            },
            {
              heading: 'Traceability',
              body: 'Linking each component variant to the exact token it consumes — via annotations or a linked Notion/Confluence page — ensures designers and developers stay in sync when tokens change during theming updates.',
            },
          ],
          links: [
            {
              title: 'Nielsen Norman Group — Design System Documentation',
              url: 'https://www.nngroup.com/articles/design-system-ux/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Figma Page Organisation Best Practices',
              url: 'https://help.figma.com/hc/en-us/articles/360039958313',
              sourceName: 'Figma',
              resourceType: 'documentation',
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
            prompt: 'Which of the following best prevents "design drift" in a growing product team?',
            options: [
              'Creating separate files per designer',
              'Documenting usage guidelines and maintaining a single source of truth',
              'Using only auto-layout in Figma',
              'Exporting static PNGs for developers',
            ],
            answerIndex: 1,
            explanation:
              'Documented guidelines and a shared component library (single source of truth) prevent designers from introducing inconsistent patterns.',
          },
        },
        {
          slug: 'accessibility-integration',
          title: 'Accessibility in Design Systems',
          minutes: 27,
          objectives: [
            'Audit a component for WCAG 2.1 AA contrast and focus visibility.',
            'Configure Figma variables to enforce accessible color pairings.',
            'Document keyboard navigation and screen-reader expectations for interactive components.',
          ],
          sections: [
            {
              heading: 'Contrast Auditing',
              body: 'WCAG requires 4.5:1 for body text and 3:1 for large text. A systematic audit checks every token pair (text-on-surface, text-on-brand) against these thresholds. Figma plugins like "Contrast" or "Stark" automate this during design reviews.',
            },
            {
              heading: 'Focus Indicators',
              body: 'Interactive components need a visible focus ring for keyboard users. Apple HIG recommends a 2pt offset ring; Material Design specifies a 3dp ring with a token (color.focus). Both approaches must meet the 3:1 contrast requirement against adjacent colors.',
            },
            {
              heading: 'Screen Reader Considerations',
              body: 'Designers communicate semantic meaning (roles, states, labels) to developers through component documentation. A toggle button, for example, should document its aria-pressed state, label text, and the visual indicator of on/off state.',
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
            prompt: 'What minimum contrast ratio does WCAG 2.1 require for non-text UI components and graphical objects?',
            options: ['2:1', '3:1', '4.5:1', '7:1'],
            answerIndex: 1,
            explanation:
              'WCAG 2.1 Success Criterion 1.4.11 (Non-text Contrast) requires at least 3:1 contrast for UI components and graphical objects against adjacent colours.',
          },
        },
      ],
    },

    {
      slug: 'prototyping-and-delivery',
      stage: 'Advanced',
      title: 'Prototyping and Delivery',
      description:
        'Create interactive prototypes, prepare pixel-perfect developer handoffs, and refine through usability heuristics.',
      topics: [
        {
          slug: 'interactive-prototyping',
          title: 'Interactive Prototyping in Figma',
          minutes: 29,
          objectives: [
            'Build a multi-screen prototype with smart-animate transitions.',
            'Use Figma variables to create toggleable UI state simulations.',
            'Present a prototype to stakeholders using FigJam or Figma presentation mode.',
          ],
          sections: [
            {
              heading: 'Smart Animate Transitions',
              body: 'Figma\'s Smart Animate interpolates between frames when layer names match. By carefully naming and ordering layers, you create fluid micro-interactions — modals sliding up, tabs fading — without code. This technique is ideal for stakeholder demos.',
            },
            {
              heading: 'Variables-Driven Prototypes',
              body: 'By binding variables to prototype interactions (e.g. clicking a toggle swaps the variable mode from "light" to "dark"), you create a single prototype that demonstrates both themes. This eliminates the need for duplicate flow paths.',
            },
            {
              heading: 'Presentation Tips',
              body: 'FigJam boards let you annotate a prototype flow with sticky notes, arrows, and context. Figma\'s presentation mode offers a focused full-screen view. Combining both formats communicates the "what" and the "why" to different audiences.',
            },
          ],
          links: [
            {
              title: 'Figma Prototyping Documentation',
              url: 'https://help.figma.com/hc/en-us/articles/360040318013',
              sourceName: 'Figma',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Nielsen Norman Group — Prototyping 101',
              url: 'https://www.nngroup.com/articles/prototyping-101/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'Apple HIG — Interaction and Feedback',
              url: 'https://developer.apple.com/design/human-interface-guidelines/interaction',
              sourceName: 'Apple Human Interface Guidelines',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Which Figma feature automatically interpolates matching layers between two frames when transitioning in a prototype?',
            options: ['Overlay transitions', 'Smart Animate', 'Instant swap', 'Slide-in'],
            answerIndex: 1,
            explanation:
              'Smart Animate detects layers with the same name in both frames and animates their position, size, rotation, and opacity for smooth transitions.',
          },
        },
        {
          slug: 'developer-handoff',
          title: 'Pixel-Perfect Developer Handoff',
          minutes: 28,
          objectives: [
            'Prepare a Figma file for handoff using inspect mode and developer-friendly naming.',
            'Write a concise changelog for each design revision using Figma\'s branching.',
            'Explain CSS properties generated from Figma inspect to a front-end developer.',
          ],
          sections: [
            {
              heading: 'Preparing for Handoff',
              body: 'Before marking a frame "ready for dev," ensure: consistent naming, zero detached instances, all auto-layout frames (not manual positioning), and linked variables. A clean file reduces back-and-forth by up to 40% according to design ops benchmarks.',
            },
            {
              heading: 'Figma Branching and Changelog',
              body: 'Branches let you iterate on design updates without affecting the main file. When merging, Figma generates a visual diff. Writing a brief changelog (e.g. "Updated button padding from 12 to 16dp per Material spec") helps developers prioritise changes.',
            },
            {
              heading: 'CSS from Inspect',
              body: 'Figma\'s inspect panel auto-generates CSS properties: width, height, padding, font-size, color, border-radius, and gap. Developers can copy these directly. Understanding which properties to copy — and when to adjust for rem vs px — is a key UI designer skill.',
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
              sourceName: 'W3C',
              resourceType: 'specification',
              relationship: 'supporting',
            },
            {
              title: 'Material Design — Design and Development Connection',
              url: 'https://m3.material.io/foundations/content-design/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What is the primary benefit of using Figma auto-layout frames in a file intended for developer handoff?',
            options: [
              'They look more visually appealing',
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
          slug: 'heuristic-evaluation',
          title: 'Usability Heuristics for UI Review',
          minutes: 26,
          objectives: [
            'Apply Jakob Nielsen\'s 10 usability heuristics to evaluate a screen design.',
            'Conduct a heuristic walkthrough and log findings in a structured table.',
            'Prioritise findings by severity and propose actionable design fixes.',
          ],
          sections: [
            {
              heading: 'Nielsen\'s 10 Heuristics',
              body: 'The 10 heuristics — including visibility of system status, match between system and real world, and error prevention — provide a lightweight framework for evaluating any interface. They surface issues without user testing, making them ideal for design critiques.',
            },
            {
              heading: 'Structured Walkthroughs',
              body: 'A heuristic walkthrough involves stepping through each screen as a user would, checking every heuristic against observed behaviour. Recording findings in a table (heuristic violated, screen, severity, recommendation) creates an actionable audit trail.',
            },
            {
              heading: 'Severity Rating',
              body: 'Severity is rated from 0 (cosmetic) to 4 (catastrophic). A "0" might be a missing tooltip; a "4" could be a destructive action without confirmation. Prioritising fixes by severity ensures the most impactful issues are addressed first in sprint planning.',
            },
          ],
          links: [
            {
              title: '10 Usability Heuristics for User Interface Design',
              url: 'https://www.nngroup.com/articles/ten-usability-heuristics/',
              sourceName: 'Nielsen Norman Group',
              resourceType: 'article',
              relationship: 'primary',
            },
            {
              title: 'WCAG 2.1 — Full Guidelines',
              url: 'https://www.w3.org/TR/WCAG21/',
              sourceName: 'W3C / WCAG',
              resourceType: 'specification',
              relationship: 'primary',
            },
            {
              title: 'Material Design — Usability Heuristics',
              url: 'https://m3.material.io/foundations/overview',
              sourceName: 'Material Design',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'In Nielsen\'s heuristic framework, which severity level indicates a cosmetic issue that should be fixed if time permits?',
            options: ['4 — Catastrophic', '3 — Major', '1 — Minor', '0 — Cosmetic'],
            answerIndex: 3,
            explanation:
              'Severity 0 is cosmetic — usability is not affected, but the issue is worth fixing for polish. It\'s the lowest priority in a heuristic audit.',
          },
        },
      ],
    },
  ],

  practicalExam: {
    title: 'Design a Mobile Onboarding Flow',
    coverage: [
      'Visual hierarchy and layout',
      'Typography and type systems',
      'Color and contrast compliance',
      'Component creation and variants',
      'Design tokens mapping',
      'Figma prototype with transitions',
      'WCAG accessibility audit',
      'Developer handoff preparation',
    ],
    brief:
      'You are tasked with designing a three-screen mobile onboarding flow for a new habit-tracking app called "Routine". The screens are: (1) a welcome/hero screen with the app name and illustration, (2) a permissions info screen explaining what the app needs and why, and (3) a preferences screen where users pick 3 interests. Deliver a fully prototyped Figma file with accessible tokens, documented components, and a handoff-ready annotation layer.',
    requirements: [
      'Three distinct screens designed for a 390×844 viewport (iPhone 14).',
      'A minimum 12-column grid with documented gutter and margin values.',
      'A type scale with at least 5 named text styles (display, H1, H2, body, caption).',
      'A five-stop neutral grey ramp and one brand-primary colour ramp exported as variables.',
      'At least 3 reusable components (button, card, icon badge) with 2+ variants each.',
      'Smart Animate prototype linking all three screens with forward and back navigation.',
      'Every text-on-background pairing must meet WCAG AA contrast (4.5:1 for body).',
      'A handoff page with CSS inspect values for the final preferences screen.',
    ],
    expectedOutput:
      'A Figma file containing the three onboarding screens, a prototype flow, a tokens page, a component library page, and a handoff annotation page with CSS values and accessibility notes.',
    rubric: [
      {
        skill: 'Visual Hierarchy',
        weight: 20,
        criteria: 'Clear size contrast between headline, subheadline, body, and CTA; effective use of whitespace to guide the eye.',
      },
      {
        skill: 'Typography',
        weight: 15,
        criteria: 'Consistent type scale; readable line-height; proper hierarchy across all screens.',
      },
      {
        skill: 'Color and Contrast',
        weight: 15,
        criteria: 'All text/background pairs meet 4.5:1; brand palette is cohesive; neutrals are well-structured.',
      },
      {
        skill: 'Component Design',
        weight: 20,
        criteria: 'At least 3 components with meaningful variants; main components used (not detached); consistent naming.',
      },
      {
        skill: 'Design Tokens',
        weight: 10,
        criteria: 'Tokens follow a layered naming convention; variables are mode-configurable; exported as JSON or documented.',
      },
      {
        skill: 'Prototyping',
        weight: 10,
        criteria: 'Smart Animate transitions are smooth; navigation is intuitive; prototype covers the full flow.',
      },
      {
        skill: 'Handoff and Documentation',
        weight: 10,
        criteria: 'Handoff page includes accurate CSS values; changelog is clear; components are documented with usage notes.',
      },
    ],
    passScore: 72,
  },

  assignments: [
    {
      title: 'Build a Button Component Library',
      stage: 'Beginner',
      objective:
        'Create a fully documented button component in Figma with primary, secondary, ghost, and disabled variants, complete with auto-layout, naming conventions, and a usage guideline page.',
      requirements: [
        'Main component uses auto-layout for internal spacing.',
        'At least 4 variants: Primary, Secondary, Ghost, Disabled.',
        'Each variant includes hover and pressed sub-states where applicable.',
        'Named text styles are used for the button label.',
        'A guideline page documents do\'s, don\'ts, and sizing (S/M/L).',
      ],
      skillsEvaluated: [
        'Component creation in Figma',
        'Auto-layout proficiency',
        'Variant management',
        'Documentation and naming conventions',
      ],
      dueDays: 5,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions:
          'Submit a Figma file link containing the button component, its variants, and the guideline page.',
        textLabel: 'Reflection',
        minTextLength: 120,
      },
    },
    {
      title: 'Design Token Extraction and Export',
      stage: 'Intermediate',
      objective:
        'Define a complete set of design tokens (color, typography, spacing) in Figma variables, apply them to a sample card component, and export the token set as JSON.',
      requirements: [
        'At least 15 primitive tokens and 10 semantic tokens defined in Figma variables.',
        'A sample card component uses only semantic tokens (no hardcoded values).',
        'Light and dark modes are configured as variable modes.',
        'Export the token file as JSON using Figma Variables API or a plugin.',
        'A brief README explains the token structure and how to import it.',
      ],
      skillsEvaluated: [
        'Design token architecture',
        'Figma variables and modes',
        'Theming and dark mode',
        'JSON export and developer handoff',
      ],
      dueDays: 7,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions:
          'Submit a Figma file link and a GitHub gist (or text file) containing the exported JSON tokens.',
        textLabel: 'Token rationale',
        minTextLength: 150,
      },
    },
    {
      title: 'Heuristic Audit and Redesign Proposal',
      stage: 'Advanced',
      objective:
        'Conduct a full heuristic evaluation of an existing (provided) mobile checkout screen, document findings with severity ratings, and propose a redesigned version addressing the top 5 issues.',
      requirements: [
        'Evaluate the screen against all 10 of Nielsen\'s heuristics.',
        'Log at least 8 findings in a structured table (heuristic, issue, severity 0–4, fix).',
        'Provide a Figma redesign of the screen addressing the top 5 severity issues.',
        'Include a before/after comparison panel annotated with the heuristic each fix addresses.',
        'Document WCAG contrast checks for the redesigned version.',
      ],
      skillsEvaluated: [
        'Heuristic evaluation methodology',
        'Usability analysis and prioritisation',
        'Responsive redesign',
        'Accessibility compliance',
      ],
      dueDays: 10,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions:
          'Submit a Figma file with the audit table, original annotated screen, and redesign. Include a summary text block.',
        textLabel: 'Audit summary',
        minTextLength: 200,
      },
    },
  ],

  simTasks: [
    {
      title: 'Fix Inaccessible Color Pairs in a Live Figma File',
      context:
        'Your team lead shares a Figma file containing the product\'s settings page. Three text-on-background combinations fail WCAG AA contrast. You have 2 hours to fix them before the developer sync.',
      requirements: [
        'Identify all failing text/background pairs using the Stark contrast checker plugin.',
        'Adjust each pair to meet 4.5:1 minimum without changing the brand palette.',
        'Update the corresponding design tokens (variables) so the fix is global.',
        'Document each change with before/after hex values and contrast ratios.',
      ],
      priority: 'high',
      dueDayOffset: 1,
      expectedOutput:
        'A Figma file update with corrected colors, updated variables, and a changelog panel documenting all fixes with contrast ratios.',
      skills: ['Color theory', 'WCAG accessibility', 'Figma variables', 'Deadline management'],
    },
    {
      title: 'Prototype a Modal Dialog for an Error State',
      context:
        'The product manager sends a Slack message: "We need a confirmation modal for the delete-account flow. Users must type DELETE to confirm. Build a prototype by end of day for the stakeholder demo."',
      requirements: [
        'Design the modal with title, description, text input, and two buttons (Cancel / Delete).',
        'Use the existing button and input components from the design system library.',
        'Prototype the flow: trigger → modal open → typing "DELETE" enables the Delete button → confirmation state.',
        'Ensure the modal meets focus-trap accessibility (document the expected keyboard flow).',
      ],
      priority: 'normal',
      dueDayOffset: 2,
      expectedOutput:
        'A Figma prototype with the modal flow, using existing design system components, with a notes panel documenting keyboard accessibility expectations.',
      skills: ['Component reuse', 'Prototyping', 'Accessibility documentation', 'Stakeholder communication'],
    },
    {
      title: 'Migrate a Sketch Component to Figma with Token Mapping',
      context:
        'The company is transitioning from Sketch to Figma. A senior designer sends you a Sketch export of the navigation bar component. You need to rebuild it in Figma using the new design token system and ensure it has light/dark mode variants.',
      requirements: [
        'Recreate the nav bar component in Figma using auto-layout.',
        'Map all colors and spacing values to Figma design variables (semantic tokens).',
        'Configure light and dark modes using variable modes.',
        'Verify that switching modes correctly updates all visual properties.',
        'Document the component with usage guidelines and token references.',
      ],
      priority: 'critical',
      dueDayOffset: 3,
      expectedOutput:
        'A Figma component with light/dark variants driven by design tokens, plus a documentation page with token mapping table.',
      skills: ['Component reconstruction', 'Design tokens', 'Theming', 'Migration planning'],
    },
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Marcus Chen',
      personaRole: 'Front-End Developer',
      situation:
        'Marcus is implementing your navigation bar component but keeps using hardcoded hex values instead of the design tokens you documented. The values are drifting from the spec.',
      openingMessage:
        'Hey, I noticed the nav bar CSS has hardcoded colors. I want to make sure we stay aligned — can we chat about the token setup?',
      expectedPoints: [
        'Explain the purpose and structure of the design tokens (primitive → semantic → component).',
        'Walk through how CSS custom properties map to Figma variables.',
        'Offer to pair on setting up the token import in the build pipeline.',
        'Agree on a naming convention that both design and code follow.',
        'Propose a periodic sync to catch drift early.',
      ],
    },
    {
      kind: 'client',
      personaName: 'Priya Sharma',
      personaRole: 'Product Owner, Client Company',
      situation:
        'Priya\'s team wants to add a new "enterprise" theme to the product. She asks for a separate set of brand colors but you believe using variable modes on existing tokens is cleaner.',
      openingMessage:
        'We need to launch an enterprise theme by Q3. Can you create a separate brand palette for it?',
      expectedPoints: [
        'Acknowledge the business need for a distinct enterprise identity.',
        'Propose variable modes on existing tokens to avoid duplicating the entire token set.',
        'Explain the maintenance benefits (single source of truth, easier updates).',
        'Offer a compromise: enterprise-specific hue tokens with shared structural tokens.',
        'Outline a timeline for mode setup and stakeholder review.',
      ],
    },
    {
      kind: 'team',
      personaName: 'Jordan Rivera',
      personaRole: 'Junior Designer',
      situation:
        'Jordan has been creating components by duplicating frames instead of using Figma main components. This is causing inconsistencies across the design file.',
      openingMessage:
        'I\'ve been building screens but the other designers say my components are "detached." What does that mean and how do I fix it?',
      expectedPoints: [
        'Explain the concept of main components vs. instances in Figma.',
        'Show how detached components break the update pipeline.',
        'Walk through converting Jordan\'s existing frames into proper components.',
        'Recommend a naming convention for variants.',
        'Suggest a quick component audit checklist for future work.',
      ],
    },
    {
      kind: 'client',
      personaName: 'David Okafor',
      personaRole: 'Accessibility Lead, Government Contract',
      situation:
        'David\'s team is conducting a WCAG AA compliance audit on the product you designed. Several components need contrast fixes and focus indicators before the contract deadline.',
      openingMessage:
        'Our audit found 12 contrast violations and missing focus rings on interactive components. We need these fixed before the submission deadline next Friday.',
      expectedPoints: [
        'Request the specific audit report to understand every violation.',
        'Prioritise fixes by severity (text contrast > graphical contrast > cosmetic).',
        'Propose a token-based fix that resolves issues globally rather than per-component.',
        'Document focus ring specifications per Apple HIG and Material Design.',
        'Commit to a timeline with checkpoints for David to verify before deadline.',
      ],
    },
  ],

  workplaceScenarios: [
    {
      category: 'Tooling & Process',
      situation:
        'Your team\'s Figma file has grown to 200+ pages. Designers report slow load times and difficulty finding components. Leadership asks you to propose a file restructuring plan.',
      requiredActions: [
        {
          action: 'Audit the current file structure and catalogue unused or duplicate pages.',
          good: true,
          note: 'Understanding the current state is the first step before proposing changes.',
        },
        {
          action: 'Propose splitting the file into modular libraries (Foundation, Components, Patterns) with clear ownership.',
          good: true,
          note: 'Modular libraries with ownership reduce conflicts and improve load times.',
        },
        {
          action: 'Suggest keeping all screens in one large file for simplicity.',
          good: false,
          note: 'This perpetuates the problem. Large monolithic files degrade performance and findability.',
        },
        {
          action: 'Delete pages you consider unnecessary without consulting other designers.',
          good: false,
          note: 'Removing pages unilaterally risks discarding work others depend on. Consult first.',
        },
      ],
    },
    {
      category: 'Cross-Team Collaboration',
      situation:
        'The engineering team has implemented the design system but is using different color values than what\'s in Figma. The visual gap between design and production is growing.',
      requiredActions: [
        {
          action: 'Schedule a cross-functional sync with the front-end lead to review the discrepancies.',
          good: true,
          note: 'Direct communication is the fastest way to identify root causes (token export issue, manual overrides, etc.).',
        },
        {
          action: 'Export the current Figma tokens as JSON and compare against the codebase\'s CSS variables.',
          good: true,
          note: 'A systematic comparison pinpoints exact mismatches and provides evidence for fixes.',
        },
        {
          action: 'Send a Slack message listing all the errors and ask engineering to fix them.',
          good: false,
          note: 'Blame-oriented messaging damages collaboration. Present discrepancies as a shared problem to solve together.',
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
      prompt: 'Walk me through how you would set up a design token system in Figma for a product that needs light, dark, and high-contrast themes.',
      guidancePoints: [
        'Define a three-layer token model: primitive, semantic, and component tokens.',
        'Use Figma variables with collections for each category (color, spacing, typography).',
        'Configure three variable modes: Light, Dark, High-Contrast.',
        'Bind component properties to semantic tokens, not primitives directly.',
        'Explain how the token set would be exported (JSON) and consumed by developers (CSS custom properties).',
      ],
    },
    {
      dimension: 'problem_solving',
      prompt: 'A developer tells you that a component you designed is "impossible to build" with the current tech stack. How do you handle this?',
      guidancePoints: [
        'Ask clarifying questions to understand the specific technical constraint.',
        'Research the platform\'s capabilities (e.g. CSS Flexbox vs. Figma auto-layout limitations).',
        'Propose a revised design that respects the constraint while preserving the user goal.',
        'Collaborate with the developer on alternatives rather than insisting on the original design.',
        'Document the constraint for future reference to avoid repeating the issue.',
      ],
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you decide when to create a new component versus extending an existing one?',
      guidancePoints: [
        'Evaluate whether the new element shares the same semantic purpose as an existing component.',
        'Consider variant properties: if the differences can be captured as variants, extend rather than create.',
        'Assess frequency: one-off elements may not warrant a new component; repeated patterns justify abstraction.',
        'Check the design system\'s existing taxonomy to avoid semantic overlap.',
        'Document the decision rationale for the team.',
      ],
    },
    {
      dimension: 'communication',
      prompt: 'Describe a time you had to present a design decision to non-design stakeholders (e.g. product managers, executives). How did you make your case?',
      guidancePoints: [
        'Frame the decision in terms of user outcomes and business metrics, not aesthetic preferences.',
        'Use before/after visual comparisons to make the impact tangible.',
        'Reference accessibility standards (WCAG) or usability heuristics as objective justification.',
        'Anticipate objections and prepare data or examples to address them.',
        'Summarise the decision with clear next steps and accountability.',
      ],
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between Figma\'s auto-layout and constraints. When would you use each?',
      guidancePoints: [
        'Auto-layout manages internal spacing and alignment of child elements dynamically.',
        'Constraints define how child elements behave when the parent frame resizes (pin, centre, scale).',
        'Use auto-layout for components (buttons, cards, lists) where content drives size.',
        'Use constraints for layout-level positioning (e.g. a fixed header, a floating action button).',
        'Combine both for responsive components that adapt to different screen sizes.',
      ],
    },
    {
      dimension: 'problem_solving',
      prompt: 'You join a project where the existing design system has no documentation. How would you approach auditing and documenting it?',
      guidancePoints: [
        'Start by cataloguing all components, variants, and their current naming conventions.',
        'Identify inconsistencies (naming, spacing, color usage) and group them by severity.',
        'Prioritise documentation for the most-used components first (button, input, card).',
        'Create a documentation template (usage, do\'s/don\'ts, accessibility notes, code references).',
        'Propose a phased rollout plan with team buy-in to avoid documentation fatigue.',
      ],
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'A product manager asks you to add three more button variants to an already large button component. How do you respond?',
      guidancePoints: [
        'Assess whether the new variants serve genuinely distinct use cases or duplicate existing ones.',
        'Propose a variant audit: map each existing variant to its use case to identify gaps.',
        'Suggest consolidating similar variants before adding new ones.',
        'Evaluate the maintenance cost: more variants increase cognitive load for designers and developers.',
        'Recommend a threshold or governance rule for when new variants are justified.',
      ],
    },
    {
      dimension: 'communication',
      prompt: 'How do you handle a situation where a designer on your team consistently ignores the design system and creates ad-hoc components?',
      guidancePoints: [
        'Approach the conversation with curiosity, not criticism — ask about their workflow.',
        'Identify if the design system is missing something they need (gap analysis).',
        'Explain the downstream impact: developer confusion, inconsistency, maintenance burden.',
        'Propose a solution: add the missing pattern to the system, or agree on a process for exceptions.',
        'Establish a lightweight review gate for design system compliance.',
      ],
    },

  ]
  ,
}
