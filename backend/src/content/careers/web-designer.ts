import type { CareerDef } from '../framework.js'

export const webDesigner: CareerDef = {
  slug: 'web-designer',
  name: 'Web Designer',
  category: 'Design',
  order: 1,
  description:
    'Designs usable, accessible websites — from layout, typography and color systems to responsive interfaces handed off cleanly to developers.',
  difficulty: 'Beginner-friendly',
  pathSummary:
    'Design foundations → typography, color & spacing → responsive layouts & design systems → UI/UX, accessibility & usability → Figma craft & prototyping → client workflow and handoff.',
  mainSkills: ['Visual Design', 'Layout & Composition', 'Typography', 'Color Theory', 'Responsive Design', 'Figma', 'Accessibility', 'Design Handoff'],
  sourcePlatforms: ['Figma', 'MDN Web Docs', 'W3Schools', 'W3C', 'WCAG', 'Nielsen Norman Group', 'web.dev'],
  companyName: 'Meridian Studio',
  roleTitle: 'Web Designer',

  chapters: [
    {
      slug: 'foundations',
      stage: 'Beginner',
      title: 'Web Design Foundations',
      description: 'What professional web design is, the visual principles behind good interfaces, and how layout and composition carry meaning.',
      topics: [
        {
          slug: 'what-web-design-is',
          title: 'What Web Design Is',
          minutes: 25,
          objectives: [
            'Define web design as a discipline distinct from graphic print design',
            'Describe the designer’s responsibilities across research, interface and delivery',
            'Explain how browsers and standards shape design decisions'
          ],
          sections: [
            {
              heading: 'The discipline',
              body: 'Web design is the practice of planning how a website looks, behaves and reads inside a browser. Unlike print, the canvas changes size, the typeface may be missing, and the user controls the viewport. A web designer therefore designs constraints and rules — spacing scales, breakpoints, states — not just static pictures.'
            },
            {
              heading: 'Where the designer sits',
              body: 'A professional designer moves between three concerns: understanding the audience and business goal, shaping structure and interface, and handing implementation-ready work to developers. Each concern produces artifacts: brief notes, wireframes, component specs, annotated flows.'
            },
            {
              heading: 'Standards shape the work',
              body: 'Browsers implement open standards maintained by the W3C. Designers who understand what HTML, CSS and accessibility standards can do produce designs that are cheaper to build and usable by more people. Good web design is achievable design.'
            }
          ],
          links: [
            { title: 'Learn web development — overview', url: 'https://developer.mozilla.org/en-US/docs/Learn', sourceName: 'MDN Web Docs', resourceType: 'course', relationship: 'Orientation on how the web platform works under the designs you will draw.' },
            { title: 'W3C — Web Design and Applications standards', url: 'https://www.w3.org/standards/webdesign/', sourceName: 'W3C', resourceType: 'reference', relationship: 'The standards bodies that define what browsers can render.' },
            { title: 'Figma Resource Library', url: 'https://www.figma.com/resource-library/', sourceName: 'Figma', resourceType: 'guide', relationship: 'Official guides for the primary tool of this career.' }
          ],
          tools: [{ title: 'Figma', url: 'https://www.figma.com/', note: 'Industry-standard interface design tool used throughout this program.' }],
          quiz: {
            prompt: 'Compared with print design, professional web design primarily requires designing…',
            options: ['A single fixed artboard', 'Rules and constraints that adapt across viewports', 'Higher-resolution images only', 'Animations instead of layouts'],
            answerIndex: 1,
            explanation: 'Websites render on many devices, so designers deliver adaptable systems — grids, scales, breakpoints — rather than fixed canvases.'
          }
        },
        {
          slug: 'visual-design-principles',
          title: 'Visual Design Principles',
          minutes: 30,
          objectives: ['Apply hierarchy, contrast and alignment deliberately', 'Use repetition and proximity to group related content', 'Diagnose why an interface feels unbalanced'],
          sections: [
            {
              heading: 'Hierarchy first',
              body: 'Every screen answers one question: what should the eye read first? Hierarchy comes from size, weight, color and position working together. Before touching pixels, rank your content: primary action, key message, supporting detail, metadata. If two elements compete visually at the same level, one of them is wrong.'
            },
            {
              heading: 'Contrast, alignment, proximity',
              body: 'Contrast separates figure from ground; alignment creates invisible lines that make layouts feel intentional; proximity tells users which things belong together. Weak interfaces usually fail here — everything shouts, edges drift, unrelated items sit close together.'
            },
            {
              heading: 'Repetition builds trust',
              body: 'Repeating visual patterns (button styles, card anatomy, icon stroke weight) teaches users the system. Consistency is not aesthetic preference; it lowers cognitive load because learned patterns are reused instead of re-decoded.'
            }
          ],
          links: [
            { title: 'Visual hierarchy in UX', url: 'https://www.nngroup.com/articles/visual-hierarchy-ux-definition/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Research-backed definition and application of visual hierarchy.' },
            { title: 'Minimize cognitive load', url: 'https://www.nngroup.com/articles/minimize-cognitive-load/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Why consistency and simplicity matter cognitively.' },
            { title: 'CSS basics reference', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'How the properties you specify visually are expressed in CSS.' }
          ],
          quiz: {
            prompt: 'Two unrelated cards sit directly next to each other and users mistake them for one unit. Which principle was violated?',
            options: ['Repetition', 'Proximity', 'Alignment', 'Saturation'],
            answerIndex: 1,
            explanation: 'Proximity signals grouping; placing unrelated items adjacent implies they belong together. Increase separation or reorder content.'
          }
        },
        {
          slug: 'layout-and-composition',
          title: 'Layout & Composition',
          minutes: 35,
          objectives: ['Structure a page around a single dominant focal point', 'Balance whitespace against density intentionally', 'Compose pages that guide scanning paths'],
          sections: [
            {
              heading: 'Composition is direction',
              body: 'A composed page leads the eye along a deliberate path: headline, proof, action. Start by deciding the single most important element, give it the strongest contrast, then arrange supporting blocks so nothing competes for first attention.'
            },
            {
              heading: 'Whitespace is a material',
              body: 'Beginners fill space; professionals spend it. Whitespace isolates the focal point, groups related items and gives dense pages room to breathe. When a layout feels crowded, the fix is usually removing or shrinking secondary elements — not shrinking gaps.'
            },
            {
              heading: 'Scanning patterns',
              body: 'Users scan rather than read. Front-load headings, keep paragraphs short, align text blocks to predictable axes, and place primary actions where scanning ends. Test composition at 50% zoom: if the structure is unreadable small, it is unclear full-size.'
            }
          ],
          links: [
            { title: 'Responsive web design basics', url: 'https://web.dev/responsive-web-design-basics/', sourceName: 'web.dev', resourceType: 'guide', relationship: 'How composition decisions translate to adaptive browser layouts.' },
            { title: 'CSS layout learning area', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS', sourceName: 'MDN Web Docs', resourceType: 'course', relationship: 'The CSS mechanisms behind the compositions you draw.' },
            { title: 'HTML responsive layout basics', url: 'https://www.w3schools.com/css/css_rwd_intro.asp', sourceName: 'W3Schools', resourceType: 'tutorial', relationship: 'Quick introduction to responsive layout mechanics.' }
          ],
          quiz: {
            prompt: 'A landing page feels cluttered. The most professional first move is to…',
            options: ['Reduce all font sizes', 'Remove or demote secondary elements and increase whitespace', 'Add more colors to separate sections', 'Center every element'],
            answerIndex: 1,
            explanation: 'Clutter is usually a content-priority problem. Establish hierarchy and whitespace before adjusting styling details.'
          }
        }
      ]
    },
    {
      slug: 'typography-color-spacing',
      stage: 'Foundation',
      title: 'Typography, Color & Spacing',
      description: 'The three materials every interface is made of: type scales, purposeful color, and consistent spatial rhythm.',
      topics: [
        {
          slug: 'typography-for-the-web',
          title: 'Typography for the Web',
          minutes: 35,
          objectives: ['Build a modular type scale with limited weights', 'Set readable measure, line-height and hierarchy', 'Choose web-safe font strategies and fallbacks'],
          sections: [
            {
              heading: 'Scales, not sizes',
              body: 'Professional type is systematic: pick a base size, multiply by a ratio (e.g. 1.25) and round to a scale of 6–8 steps. Limit families to one or two and weights to regular/medium/bold. Every new arbitrary size multiplies inconsistency downstream.'
            },
            {
              heading: 'Readability settings',
              body: 'Body copy stays between roughly 45–75 characters per line with line-height near 1.5. Headings tighten line-height and gain size contrast. Check hierarchy by squinting: if title and paragraph blur together, contrast in weight or size is insufficient.'
            },
            {
              heading: 'Fonts on the web',
              body: 'Fonts load over networks and may fail. Always define fallback stacks and test with system fonts. Prefer variable fonts licensed for web use, subset weights actually needed, and never rely on a typeface alone to convey tone.'
            }
          ],
          links: [
            { title: 'CSS Fonts module reference', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'Font properties available to express typographic intent.' },
            { title: 'CSS typography tutorial', url: 'https://www.w3schools.com/css/css_font.asp', sourceName: 'W3Schools', resourceType: 'tutorial', relationship: 'Hands-on font-family, size and weight syntax.' },
            { title: 'Legibility and readability research', url: 'https://www.nngroup.com/articles/legibility-readability-comprehension/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Evidence on what makes on-screen text readable.' }
          ],
          tools: [{ title: 'Google Fonts', url: 'https://fonts.google.com/', note: 'Browse and pair open-licensed webfonts with live previews.' }],
          quiz: {
            prompt: 'A comfortable reading measure for long-form body copy is approximately…',
            options: ['20–35 characters', '45–75 characters', '90–120 characters', 'Any length if line-height is large'],
            answerIndex: 1,
            explanation: 'Long lines lose the reader’s return path; short lines fragment rhythm. 45–75 characters is the researched sweet spot.'
          }
        },
        {
          slug: 'color-theory-in-practice',
          title: 'Color Theory in Practice',
          minutes: 30,
          objectives: ['Construct a functional palette: brand, neutrals, semantic colors', 'Apply the 60-30-10 balance rule', 'Verify accessible contrast ratios'],
          sections: [
            {
              heading: 'Functional palettes',
              body: 'A working palette has roles, not just hues: one brand color, a neutral ramp for surfaces and text, and semantic colors (success, warning, error, info). Define tints and shades of each ramp up front so dark text on tinted backgrounds never becomes guesswork.'
            },
            {
              heading: 'Balance and restraint',
              body: 'The 60-30-10 guideline keeps interfaces calm: ~60% dominant neutral, ~30% secondary surface, ~10% accent for actions and highlights. Color earns attention by scarcity — if everything is orange, nothing is.'
            },
            {
              heading: 'Accessible color',
              body: 'Check text/background pairs against WCAG contrast thresholds early, not after build. Remember color cannot be the only carrier of meaning; pair state colors with icons or labels so color-blind users receive the same message.'
            }
          ],
          links: [
            { title: 'Applying color to UI (web.dev design course)', url: 'https://web.dev/learn/design', sourceName: 'web.dev', resourceType: 'course', relationship: 'Color lessons within the official web.dev design curriculum.' },
            { title: 'CSS color reference', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'Color formats (hex, rgb, hsl) you will specify in handoff.' },
            { title: 'WCAG 2 Quick Reference', url: 'https://www.w3.org/WAI/WCAG22/quickref/', sourceName: 'WCAG', resourceType: 'reference', relationship: 'Look up the exact contrast minimums for normal and large text.' }
          ],
          tools: [{ title: 'W3C Markup Validation Service', url: 'https://validator.w3.org/', note: 'Validate markup when reviewing implemented color tokens and themes.' }],
          quiz: {
            prompt: 'Your accent color is also used for decorative banners, tags and charts everywhere. The main risk is…',
            options: ['Slower page load', 'Loss of emphasis hierarchy and weaker affordance for actions', 'Broken responsive layout', 'Invalid CSS'],
            answerIndex: 1,
            explanation: 'Accent scarcity drives attention. Overuse flattens hierarchy and makes interactive elements less discoverable.'
          }
        },
        {
          slug: 'spacing-and-rhythm',
          title: 'Spacing & Visual Rhythm',
          minutes: 25,
          objectives: ['Adopt a spacing scale based on one base unit', 'Distinguish padding, gap and margin roles', 'Keep vertical rhythm consistent across sections'],
          sections: [
            {
              heading: 'One base unit',
              body: 'Choose a base (commonly 4 or 8px) and derive all spacing from multiples: 8, 16, 24, 32, 48. A finite scale turns “does this look right?” debates into arithmetic and keeps components aligned when assembled by different people.'
            },
            {
              heading: 'Inside vs outside space',
              body: 'Padding lives inside a component and defines its breathing room; gap distributes space between children in flex/grid containers; margin pushes whole components apart. In handoff, name these distinctly — developers implement them differently.'
            },
            {
              heading: 'Vertical rhythm',
              body: 'Sections stack with intentional intervals: tight within related content, larger between groups, largest between page areas. Rhythm is what makes a page feel designed even before content is read.'
            }
          ],
          links: [
            { title: 'Box model introduction', url: 'https://www.w3schools.com/css/css_boxmodel.asp', sourceName: 'W3Schools', resourceType: 'tutorial', relationship: 'The box model underlying padding/margin behavior.' },
            { title: 'CSS box model reference', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Deeper explanation of how spacing properties interact.' },
            { title: 'Minimize cognitive load', url: 'https://www.nngroup.com/articles/minimize-cognitive-load/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Why consistent spacing reduces user effort.' }
          ],
          quiz: {
            prompt: 'Space distributed automatically between items inside a card container is best specified as…',
            options: ['Individual margins on each item', 'Container gap', 'Padding on each item', 'Fixed absolute positions'],
            answerIndex: 1,
            explanation: 'Gap expresses distribution intent in flex/grid layouts, adapts to item count, and avoids margin-collapse edge cases.'
          }
        }
      ]
    },
    {
      slug: 'responsive-and-systems',
      stage: 'Intermediate',
      title: 'Responsive Layouts & Systems Thinking',
      description: 'Design once for many screens: fluid responsive behavior, structural grids, and reusable design systems.',
      topics: [
        {
          slug: 'responsive-design',
          title: 'Responsive Design',
          minutes: 40,
          objectives: ['Design mobile-first with progressive enhancement', 'Define sensible breakpoints from content, not devices', 'Handle images and media responsibly across sizes'],
          sections: [
            {
              heading: 'Mobile-first thinking',
              body: 'Start from the smallest meaningful screen: what must remain, in what order? Mobile-first forces content priority, then larger viewports enhance layout with more columns and navigation depth. Retrofitting desktop designs downward almost always breaks priority.'
            },
            {
              heading: 'Content-driven breakpoints',
              body: 'Breakpoints come from where the content strains — a row wrapping badly, a measure stretching past 75ch — not from a device catalog. Define 3–5 named breakpoints, document their pixel ranges in handoff, and design the in-between fluidly with percentages and flexible units.'
            },
            {
              heading: 'Media that adapts',
              body: 'Specify image crops per breakpoint, provide multiple resolutions, and mark decorative versus informative imagery. Tables, code blocks and embeds are the usual overflow offenders — design their narrow-screen behavior explicitly.'
            }
          ],
          links: [
            { title: 'Responsive web design basics', url: 'https://web.dev/responsive-web-design-basics/', sourceName: 'web.dev', resourceType: 'guide', relationship: 'Canonical practical guide to responsive technique.' },
            { title: 'HTML responsive intro', url: 'https://www.w3schools.com/html/html_responsive.asp', sourceName: 'W3Schools', resourceType: 'tutorial', relationship: 'Viewport meta and responsive building blocks.' },
            { title: 'Responsive design course', url: 'https://web.dev/learn/design', sourceName: 'web.dev', resourceType: 'course', relationship: 'Full structured course including breakpoints and media.' }
          ],
          quiz: {
            prompt: 'The most defensible way to choose breakpoints is…',
            options: ['Copy another site’s numbers', 'Add one per popular device width', 'Find where the content layout breaks, then fix it', 'Only support 1920px and 375px'],
            answerIndex: 2,
            explanation: 'Devices churn; content strain is durable. Breakpoints should emerge from where the layout stops serving its content.'
          }
        },
        {
          slug: 'grid-systems',
          title: 'Grid Systems',
          minutes: 35,
          objectives: ['Lay out pages on a column grid with consistent gutters', 'Choose 12-column structures and span content sensibly', 'Align components to shared baselines'],
          sections: [
            {
              heading: 'Why grids',
              body: 'Grids constrain placement decisions so dozens of screens share one logic. A 12-column grid is standard because it divides evenly by 2, 3, 4 and 6 — flexible spans for cards, forms and editorial layouts alike.'
            },
            {
              heading: 'Columns, gutters, margins',
              body: 'Define column count, gutter width (space between columns) and outer margins per breakpoint. Content spans columns, never pixels. When a component seems to need an odd width, suspect wrong span choice rather than special-casing the grid.'
            },
            {
              heading: 'Baseline alignment',
              body: 'Vertical alignment benefits from the same discipline: snap section spacing and component heights to the spacing scale so stacked screens feel continuous. Misaligned baselines are the most common tell of hand-built pages.'
            }
          ],
          links: [
            { title: 'CSS Grid Layout guide', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'How your column grid is implemented in CSS Grid.' },
            { title: 'CSS grid tutorial', url: 'https://www.w3schools.com/css/css_grid.asp', sourceName: 'W3Schools', resourceType: 'tutorial', relationship: 'Syntax walkthrough for grid templates and gaps.' },
            { title: 'Flexbox guide', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'The companion layout system for component interiors.' }
          ],
          quiz: {
            prompt: 'In a 12-column grid, three equal cards should each span…',
            options: ['3 columns with 1 spare', '4 columns exactly', '6 columns stacked vertically', '12 columns each'],
            answerIndex: 1,
            explanation: '12 ÷ 3 = 4 columns per card — the divisibility that makes 12-column grids convenient for equal distributions.'
          }
        },
        {
          slug: 'design-systems',
          title: 'Design Systems',
          minutes: 40,
          objectives: ['Extract tokens: color, type, spacing, radius, elevation', 'Document component anatomy, variants and states', 'Govern the system through contribution and versioning'],
          sections: [
            {
              heading: 'Tokens first',
              body: 'A design system starts with named decisions: color-primary-500, space-3, radius-md, font-body-lg. Tokens decouple values from usage, making rebrands and theming mechanical instead of archaeological.'
            },
            {
              heading: 'Components with contracts',
              body: 'Each component documents anatomy (slots/parts), variants (size, tone), and states (hover, focus, disabled, error, loading). Undocumented states are where implementations silently diverge from design.'
            },
            {
              heading: 'Systems are governed',
              body: 'Decide who merges new patterns, how deprecations happen, and how design and code stay synchronized. Without governance, systems decay into sticker sheets within months.'
            }
          ],
          links: [
            { title: 'Design systems articles (resource library)', url: 'https://www.figma.com/resource-library/design-systems/', sourceName: 'Figma', resourceType: 'guide', relationship: 'Official Figma guidance on building systems in-file.' },
            { title: 'Design tokens via CSS custom properties', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/--*', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'How tokens map to CSS custom properties in implementation.' },
            { title: 'Consistency and standards heuristic', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Usability rationale behind systematic consistency.' }
          ],
          quiz: {
            prompt: 'Which artifact most prevents implementation drift?',
            options: ['A logo pack', 'Named tokens plus documented component states', 'High-resolution mockups only', 'A mood board'],
            answerIndex: 1,
            explanation: 'Tokens pin values; documented states cover hover/focus/disabled/error cases that mockups routinely miss.'
          }
        }
      ]
    },
    {
      slug: 'ui-ux-accessibility',
      stage: 'Intermediate',
      title: 'UI, UX & Accessibility',
      description: 'Interface conventions, experience fundamentals, and building pages everyone can use.',
      topics: [
        {
          slug: 'ui-fundamentals',
          title: 'UI Fundamentals',
          minutes: 30,
          objectives: ['Style buttons, inputs and cards with clear affordances', 'Design complete interactive states', 'Apply iconography and imagery consistently'],
          sections: [
            {
              heading: 'Affordance and feedback',
              body: 'Interactive elements must look interactive: buttons read as raised or filled actions, links styled consistently, inputs visibly editable. Every control answers clicks with visible feedback — hover, active, focus, loading — or users doubt the app heard them.'
            },
            {
              heading: 'States are design work',
              body: 'For each component design default, hover, focus-visible, active, disabled, loading and error states. Focus styles deserve special care: they serve keyboard users and are required by WCAG, yet are frequently deleted as “ugly”.'
            },
            {
              heading: 'Icons and imagery',
              body: 'Icons clarify when familiar and labeled; they confuse when abstract or unlabeled. Keep one icon family with uniform stroke and sizing. Imagery should inform or demonstrate — decorative stock photos add noise and weight.'
            }
          ],
          links: [
            { title: 'Focus visibility guidance', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'The pseudo-class implementing keyboard-only focus rings.' },
            { title: 'Icon usability', url: 'https://www.nngroup.com/articles/icon-usability/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Research on when icons help or hurt comprehension.' },
            { title: 'UI design resources', url: 'https://www.figma.com/resource-library/ui-design/', sourceName: 'Figma', resourceType: 'guide', relationship: 'Official UI design practice resources.' }
          ],
          quiz: {
            prompt: 'Removing the visible focus outline globally is…',
            options: ['Good minimalism', 'Harmful: it blinds keyboard navigation and violates accessibility expectations', 'Required for modern CSS', 'Safe if hover states exist'],
            answerIndex: 1,
            explanation: 'Focus indicators are the primary way keyboard users locate themselves. Replace with a well-designed focus style, never remove outright.'
          }
        },
        {
          slug: 'ux-usability',
          title: 'UX Fundamentals & Usability Testing',
          minutes: 55,
          objectives: ['Frame problems as user goals within business limits', 'Map basic user journeys to spot friction', 'Apply core heuristics during self-review', 'Run lightweight usability tests on clickable prototypes', 'Write tasks that reveal real behavior', 'Turn observations into prioritized fixes'],
          sections: [
            {
              heading: 'Goals before screens',
              body: 'UX asks what a person is trying to accomplish and what stands in their way. Before drawing, write the job sentence: “a returning customer needs to reorder supplies in under two minutes.” Screens are hypotheses about achieving that sentence.'
            },
            {
              heading: 'Journeys expose friction',
              body: 'Sketch the journey end-to-end — entry, decision points, dead ends, recovery paths. Friction concentrates at transitions: form to confirmation, search to results. Fix sequence and flow before polishing any single screen.'
            },
            {
              heading: 'Heuristic self-review',
              body: 'Run Nielsen’s ten usability heuristics over your own work: visibility of status, match with the real world, user control, consistency, error prevention, recognition over recall, flexibility, aesthetics, error recovery, help. It catches half the issues before anyone else sees the file.'
            },
            {
              heading: 'Small tests, real users',
              body: 'Five participants per round uncovers most usability problems. Give tasks phrased as goals (“book a table for Friday”) without narrating the UI, watch silently, and note where expectation diverges from behavior. Opinions differ; task failure does not lie.'
            },
            {
              heading: 'Prototype fidelity',
              body: 'Test with enough fidelity to click the intended path — wireflows or mid-fi prototypes suffice. High polish too early invites comments about colors instead of structure, which is the wrong feedback loop.'
            },
            {
              heading: 'From notes to changes',
              body: 'Tag findings as blocker, friction or delight, count occurrences, then fix blockers first. Re-test after changes. One disciplined iteration cycle beats ten speculative redesigns.'
            }
          ],
          links: [
            { title: 'Ten Usability Heuristics', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'The canonical review checklist referenced above.' },
            { title: 'Usability Testing 101', url: 'https://www.nngroup.com/articles/usability-testing-101/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Method reference for planning and running tests.' },
            { title: 'Prototyping to learn', url: 'https://www.nngroup.com/articles/prototyping-learn/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Choosing fidelity for what you need to learn.' },
            { title: 'Evaluation overview', url: 'https://www.w3.org/WAI/test-evaluate/', sourceName: 'W3C', resourceType: 'guide', relationship: 'Where usability testing fits into accessibility evaluation.' }
          ],
          quiz: {
            prompt: 'The cheapest valid usability round is…',
            options: ['Surveying 500 people about preferences', 'Task-based sessions with about five participants on a clickable prototype', 'A/B testing after launch only', 'Asking stakeholders to rate screenshots'],
            answerIndex: 1,
            explanation: 'Qualitative task testing finds most severe issues quickly; large surveys measure opinion, not observed behavior.'
          }
        },
        {
          slug: 'accessibility-and-wcag',
          title: 'Accessibility & WCAG',
          minutes: 45,
          objectives: ['Meet WCAG perceivable, operable, understandable, robust criteria in designs', 'Specify alt text, labels and focus order', 'Verify contrast and target sizes before handoff'],
          sections: [
            {
              heading: 'POUR principles',
              body: 'WCAG organizes success criteria under four principles: Perceivable (content can be sensed — text alternatives, captions, contrast), Operable (everything reachable by keyboard, adequate targets), Understandable (predictable behavior, clear language), Robust (works with assistive technology).'
            },
            {
              heading: 'Designer-owned criteria',
              body: 'Designers own much of conformance: color contrast (4.5:1 normal text, 3:1 large), visible focus indication, logical tab order matching visual order, labeled form fields, error suggestions, and alt-text specifications for every meaningful image.'
            },
            {
              heading: 'Checking early',
              body: 'Run W3C’s Easy Checks on prototypes, annotate alt text and reading order in handoff, and treat “we’ll fix accessibility later” as a defect, not a plan. Retrofits cost multiples of upfront care.'
            }
          ],
          links: [
            { title: 'WCAG 2.2 standard', url: 'https://www.w3.org/TR/WCAG22/', sourceName: 'WCAG', resourceType: 'specification', relationship: 'The normative standard your designs must satisfy.' },
            { title: 'Easy Checks — first review', url: 'https://www.w3.org/WAI/test-evaluate/preliminary/', sourceName: 'WCAG', resourceType: 'checklist', relationship: 'Practical first-pass accessibility evaluation method.' },
            { title: 'Accessibility overview', url: 'https://developer.mozilla.org/en-US/docs/Learn/Accessibility', sourceName: 'MDN Web Docs', resourceType: 'course', relationship: 'Developer-side view so annotations land correctly.' }
          ],
          quiz: {
            prompt: 'Minimum WCAG AA contrast ratio for normal-sized body text is…',
            options: ['2:1', '3:1', '4.5:1', '7:1'],
            answerIndex: 2,
            explanation: 'AA requires 4.5:1 for normal text and 3:1 for large text (and UI graphics). AAA raises normal text to 7:1.'
          }
        }
      ]
    },
    {
      slug: 'figma-craft',
      stage: 'Intermediate',
      title: 'Figma Craft: Wireframes & Prototypes',
      description: 'Working fluently in Figma — from low-fidelity wireframes to realistic interactive prototypes.',
      topics: [
        {
          slug: 'figma-essentials',
          title: 'Figma Essentials',
          minutes: 35,
          objectives: ['Organize files with pages, frames and naming conventions', 'Use auto layout to build responsive components', 'Share libraries and styles across projects'],
          sections: [
            {
              heading: 'File hygiene',
              body: 'Professional files separate pages by concern — explorations, final screens, components, archive. Name layers semantically (button/primary, card/pricing) because developers consume names. “Frame 427 copy” is technical debt rendered in italic.'
            },
            {
              heading: 'Auto layout as real layout',
              body: 'Auto layout mirrors flexbox: direction, gap, padding, hug/fill behaviors. Building with auto layout means components resize like the built product, and spacing survives content edits — the difference between a picture and a specification.'
            },
            {
              heading: 'Shared libraries',
              body: 'Publish reusable components and styles as team libraries so updates propagate. Version deliberately: breaking component changes get changelog notes, and consuming teams migrate on their own schedule.'
            }
          ],
          links: [
            { title: 'Figma Help Center', url: 'https://help.figma.com/hc/en-us', sourceName: 'Figma', resourceType: 'documentation', relationship: 'Authoritative documentation for every Figma feature.' },
            { title: 'Figma Resource Library', url: 'https://www.figma.com/resource-library/', sourceName: 'Figma', resourceType: 'guide', relationship: 'Official practice guides and examples.' },
            { title: 'Flexbox concepts', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'Auto layout maps closely to these CSS semantics.' }
          ],
          tools: [{ title: 'Figma', url: 'https://www.figma.com/', note: 'Primary design tool for this entire career track.' }],
          quiz: {
            prompt: 'The main benefit of auto layout for handoff is that it…',
            options: ['Makes files smaller', 'Behaves like CSS flexbox, communicating real layout intent', 'Exports PNGs faster', 'Prevents others editing layers'],
            answerIndex: 1,
            explanation: 'Auto layout encodes direction, gap and padding — the same contract developers implement — reducing interpretation errors.'
          }
        },
        {
          slug: 'wireframing',
          title: 'Wireframing',
          minutes: 30,
          objectives: ['Sketch structure and flow at low fidelity', 'Choose appropriate fidelity per decision', 'Annotate wireframes with behavior notes'],
          sections: [
            {
              heading: 'Structure before skin',
              body: 'Wireframes decide placement, priority and flow while staying cheap to discard. Boxes, honest text lengths and gray fills keep conversations on structure. Color and type arrive after the skeleton survives scrutiny.'
            },
            {
              heading: 'Fidelity ladder',
              body: 'Paper sketches explore breadth; grayscale digital wireframes refine chosen directions; high-fidelity applies the system. Jumping straight to hi-fi hides structural disagreements behind aesthetic polish until they are expensive to change.'
            },
            {
              heading: 'Annotations carry intent',
              body: 'Attach notes for behavior the frame cannot show: scroll behavior, empty/loading/error states, character limits. Wireframes without annotations transfer ambiguity to development meetings.'
            }
          ],
          links: [
            { title: 'Wireframes article', url: 'https://www.nngroup.com/articles/wireframes/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Definition, uses and pitfalls of wireframing.' },
            { title: 'Structuring screens (design course)', url: 'https://web.dev/learn/design', sourceName: 'web.dev', resourceType: 'course', relationship: 'How wireframe structure maps onto responsive implementation.' },
            { title: 'W3C design standards overview', url: 'https://www.w3.org/standards/webdesign/', sourceName: 'W3C', resourceType: 'reference', relationship: 'Standards context for the structures you sketch.' }
          ],
          quiz: {
            prompt: 'Wireframes deliberately avoid color and final type because they…',
            options: ['Load faster', 'Keep critique focused on structure and flow, not styling', 'Cannot display fonts', 'Are only for developers'],
            answerIndex: 1,
            explanation: 'Low fidelity postpones aesthetic debate until structural decisions — the costly ones — are settled.'
          }
        },
        {
          slug: 'prototyping',
          title: 'Prototyping',
          minutes: 35,
          objectives: ['Wire clickable flows with correct triggers and transitions', 'Simulate states like loading and errors', 'Prepare prototypes for stakeholder and usability review'],
          sections: [
            {
              heading: 'Flow-first connections',
              body: 'Prototype the journey, not the decorations: link frames along the real path including back-navigation and dead-end recoveries. Smart-animate transitions communicate spatial relationships; instant cuts suit state changes.'
            },
            {
              heading: 'States sell reality',
              body: 'Include loading skeletons, validation errors and confirmations. Stakeholders judge products by their worst moment; showing only happy paths hides exactly the screens that need design attention.'
            },
            {
              heading: 'Review-ready delivery',
              body: 'Before sharing, set the starting frame, prune dead links, and add a short scenario script for reviewers. A prototype that strands reviewers on frame one generates noise instead of feedback.'
            }
          ],
          links: [
            { title: 'Prototyping guidance', url: 'https://www.figma.com/resource-library/what-is-prototyping/', sourceName: 'Figma', resourceType: 'guide', relationship: 'Official introduction to prototyping practice.' },
            { title: 'Prototyping to learn', url: 'https://www.nngroup.com/articles/prototyping-learn/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Matching prototype fidelity to the question being asked.' },
            { title: 'Operable content (WCAG)', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/', sourceName: 'WCAG', resourceType: 'specification', relationship: 'Interaction patterns prototypes must respect.' }
          ],
          quiz: {
            prompt: 'The highest-value prototype addition before a usability session is…',
            options: ['Micro-animations on every element', 'Realistic error and loading states along the tested path', 'More color variations', 'Background music'],
            answerIndex: 1,
            explanation: 'Users hit failures constantly in real products; testing those moments reveals the most consequential design gaps.'
          }
        }
      ]
    },
    {
      slug: 'motion-interaction-design',
      stage: 'Advanced',
      title: 'Motion & Interaction Design',
      description: 'Designing meaningful motion that guides attention, communicates state, and respects user preferences.',
      topics: [
        {
          slug: 'motion-principles',
          title: 'Motion Design Principles',
          minutes: 35,
          objectives: ['Apply easing, duration and staging to guide attention', 'Use motion to communicate spatial and logical relationships', 'Design accessible motion with reduced-motion support'],
          sections: [
            {
              heading: 'Motion has a purpose',
              body: 'Good motion explains relationships: an element that slides out of a button clarifies where it came from; a fade with scale signals enter versus exit. Every animation should answer a question the interface posed — never animate for decoration alone.'
            },
            {
              heading: 'Easing and duration',
              body: 'Real-world motion decelerates: use ease-out for entering elements, ease-in-out for looping, and near-instant sharp easing for exits. Durations sit between 150–400ms for UI feedback; longer reads as sluggish, shorter as twitchy. Keep consistent timing curves across the product.'
            },
            {
              heading: 'Reduced motion',
              body: 'Motion can trigger vestibular disorders. Provide reduced-motion alternatives: communicate state through color and text, not just movement. WCAG 2.2.2 requires users be able to pause, stop or hide non-essential motion.'
            }
          ],
          links: [
            { title: 'Animation principles for UI', url: 'https://www.nngroup.com/articles/animation-purpose-ux/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Research-backed guidance on when motion helps UX.' },
            { title: 'CSS transitions reference', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'The property mechanics behind implemented UI motion.' },
            { title: 'WCAG 2.2.2 Pause, Stop, Hide', url: 'https://www.w3.org/WAI/WCAG22/quickref/#pause-stop-hide', sourceName: 'WCAG', resourceType: 'reference', relationship: 'The normative requirement for non-essential motion.' }
          ],
          quiz: {
            prompt: 'An element entering a card should most likely…',
            options: ['Spring violently from random offsets', 'Ease out from a nearby related position', 'Blink repeatedly to get attention', 'Animate for 1.5 seconds with linear easing'],
            answerIndex: 1,
            explanation: 'Entering elements ease out from a location that explains their origin; implicit spatial storytelling is the core of useful UI motion.'
          }
        },
        {
          slug: 'micro-interactions',
          title: 'Micro-interactions & Feedback',
          minutes: 30,
          objectives: ['Design feedback loops for every user action', 'Specify trigger, rules, feedback and loops', 'Audit interfaces for missing state feedback'],
          sections: [
            {
              heading: 'Feedback is a contract',
              body: 'Every action deserves a visible consequence: button press, checkbox toggle, data save, process completion, and importantly — errors. Micro-interactions are the difference between an app that feels "alive" and one that feels unresponsive, even when both function identically under the hood.'
            },
            {
              heading: 'Four-part anatomy',
              body: 'Describe each interaction as: trigger (what starts it), rules (guards), feedback (what the user sees/hears/feels), and loops (repeat conditions). Writing these out as annotations forces teams to address edge cases like empty states and rapid double-triggers before they ship.'
            },
            {
              heading: 'Auditing for silence',
              body: 'Walk every state: loading, empty, error, success, disabled, offline. Interfaces that go silent when work is happening — no toast, no spinner, no progress — create the most user anxiety. Design the no-op states deliberately rather than leaving them to default behavior.'
            }
          ],
          links: [
            { title: 'Feedback visibility heuristic', url: 'https://www.nngroup.com/articles/feedback-ux/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Why visible system status matters.' },
            { title: 'Micro-interactions guide', url: 'https://www.figma.com/resource-library/what-are-microinteractions/', sourceName: 'Figma', resourceType: 'guide', relationship: 'Official tooling guidance for designing micro-interactions.' },
            { title: 'CSS animation for UI states', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations', sourceName: 'MDN Web Docs', resourceType: 'reference', relationship: 'Animation mechanics for feedback patterns.' }
          ],
          quiz: {
            prompt: 'A user submits a form and sees nothing change for 3 seconds. The primary issue is…',
            options: ['The network, not the design', 'Missing feedback — the interface must acknowledge the in-progress state', 'Font size too small', 'The button color is wrong'],
            answerIndex: 1,
            explanation: 'System status must be visible; silence during work creates uncertainty and double-submissions. The design must show progress.'
          }
        },
        {
          slug: 'interactive-prototypes-motion',
          title: 'Interactive Prototypes & Motion Handoff',
          minutes: 35,
          objectives: ['Prototype timing, easing and choreography in Figma', 'Document motion tokens for engineers', 'Test motion with real users and shareable links'],
          sections: [
            {
              heading: 'Prototyping motion',
              body: 'Figma Smart Animate interpolates matching layers between frames. Prototype the real flow — enter, exit, state change — with durations matching your system. A prototype that shows only instant cuts hides half the design; motion decisions land last and inconsistently when left unspecified.'
            },
            {
              heading: 'Motion tokens',
              body: 'Engineers implement what you document. Define motion tokens: duration-short (150ms), duration-base (250ms), duration-long (400ms), easing-standard, easing-enter, easing-exit. Name the intent, not just values, so implementations stay consistent across teams and tools.'
            },
            {
              heading: 'Verification',
              body: 'Share clickable prototypes for stakeholder review and usability sessions. Test one motion decision at a time — timing, spatial mapping, or hierarchy — never all together. Reduced-motion previews let you confirm alternatives behave acceptably.'
            }
          ],
          links: [
            { title: 'Smart Animate documentation', url: 'https://help.figma.com/hc/en-us/articles/360051484394', sourceName: 'Figma', resourceType: 'documentation', relationship: 'How to use Smart Animate for prototype transitions.' },
            { title: 'Motion design tips', url: 'https://www.animatron.com/', sourceName: 'Figma', resourceType: 'guide', relationship: 'Practical exercise library for motion sketches.' },
            { title: 'ARIA animation guidance', url: 'https://www.w3.org/WAI/ARIA/apg', sourceName: 'W3C', resourceType: 'guide', relationship: 'Why marking decorative motion properly matters for assistive tech.' }
          ],
          quiz: {
            prompt: 'Best practice for handing off motion to developers is…',
            options: ['A video of the animation with no values', 'Named tokens for duration and easing plus frame-by-frame annotations', 'Only written explanation', 'Nothing — engineers can infer it'],
            answerIndex: 1,
            explanation: 'Named motion tokens plus annotated examples give engineers values they can reuse consistently, exactly like spacing and color tokens.'
          }
        }
      ]
    },
    {
      slug: 'brand-and-visual-systems',
      stage: 'Advanced',
      title: 'Brand & Visual Identity Systems',
      description: 'Building coherent visual identities that scale across touchpoints, from logo to full digital product.',
      topics: [
        {
          slug: 'brand-identity-basics',
          title: 'Brand Identity Foundations',
          minutes: 30,
          objectives: ['Define brand personality and positioning', 'Translate brand into visual language', 'Create consistent brand guidelines'],
          sections: [
            {
              heading: 'Personality before pixels',
              body: 'A brand is a promise expressed repeatedly. Define the personality using a simple 3-5 word description (playful, expert, trustworthy, premium) and let it drive every later choice: photo direction, voice, color temperature, typography mood. Blind color-picking without personality settles nothing.'
            },
            {
              heading: 'Visual language systems',
              body: 'The visual identity is a coherent system: logo lockups, color palette, typography pairing, icon style, photography treatment, and spatial rules. Consistency across all these creates recognition — the currency of brand equity.'
            },
            {
              heading: 'Documenting guidelines',
              body: 'Write guidelines someone else can follow without you: clear usage rules, do/don\'t examples, clear-space and minimum-size rules for the logo, color ratio guidance, and anatomy of the system. Guidelines are governance, not decoration.'
            }
          ],
          links: [
            { title: 'Logos and branding basics', url: 'https://www.smashingmagazine.com/2012/10/the-principles-of-beautiful-web-design/', sourceName: 'MDN Web Docs', resourceType: 'article', relationship: 'Foundational principles for cohesive visual branding.' },
            { title: 'Figma branding resources', url: 'https://www.figma.com/resource-library/branding/', sourceName: 'Figma', resourceType: 'guide', relationship: 'Tooling workflows for brand systems.' },
            { title: 'Color contrast for brand assets', url: 'https://www.nngroup.com/articles/color-contrast/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Brand color choices must not sacrifice readability.' }
          ],
          quiz: {
            prompt: 'The chief function of brand guidelines is…',
            options: ['Restricting freedom', 'Enabling consistent self-service brand application by others', 'Padding the project', 'Making the designer look busy'],
            answerIndex: 1,
            explanation: 'Guidelines let other people apply the brand correctly without the designer present at every touchpoint — governance scales the system.'
          }
        },
        {
          slug: 'design-tokens-brand',
          title: 'Design Tokens & Cross-Platform Consistency',
          minutes: 35,
          objectives: ['Define token architecture with semantic naming', 'Bridge brand tokens to product tokens', 'Scale identities across web and mobile'],
          sections: [
            {
              heading: 'Token architecture',
              body: 'Tokens are the single source of truth. Structure them in layers: primitive (hex values, raw font sizes) → semantic (color-surface-strong, text-primary) → component (button-default-bg). Semantic naming makes rebranding a remap, not a search-and-replace.'
            },
            {
              heading: 'Brand to product bridge',
              body: 'Brand colors rarely map 1:1 to product states. A vibrant brand orange becomes a lighter tint for success, a desaturated variant for hover, a darker shade for borders. Map brand tokens to product roles deliberately so designers and engineers share one vocabulary.'
            },
            {
              heading: 'Cross-platform parity',
              body: 'An identity must hold on web, iOS, and Android. Define platform-specific type scales and spacing (native sizes differ), but keep semantic roles identical. Document the mapping table so engineers in three codebases make the same brand decision.'
            }
          ],
          links: [
            { title: 'CSS custom properties tokens', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties', sourceName: 'MDN Web Docs', resourceType: 'guide', relationship: 'How tokens are expressed in implementation.' },
            { title: 'Design tokens specification', url: 'https://tr.designtokens.org/format/', sourceName: 'WCAG', resourceType: 'specification', relationship: 'The emerging cross-tool token format.' },
            { title: 'Figma variables documentation', url: 'https://help.figma.com/hc/en-us/articles/15339657135383', sourceName: 'Figma', resourceType: 'documentation', relationship: 'Managing token-scale design decisions in-tool.' }
          ],
          quiz: {
            prompt: 'A semantic token like color-surface is preferred over color-#f5f5f5 because…',
            options: ['It is shorter', 'It abstracts intent from value, enabling theming and rebranding cheaply', 'It is required by browsers', 'It prevents access'],
            answerIndex: 1,
            explanation: 'Semantic naming separates the decision (what a color is for) from the value, so themes and rebrands become remaps.'
          }
        },
        {
          slug: 'design-ops-overview',
          title: 'Design Ops & Team Collaboration',
          minutes: 30,
          objectives: ['Structure design teams and file ownership', 'Run contribution and review processes', 'Maintain systems after launch'],
          sections: [
            {
              heading: 'Ownership structure',
              body: 'Design systems need an owner: one person accountable for the token set, published components, and contribution process. Without clear ownership, systems drift — everyone follows precedents that contradict the library.'
            },
            {
              heading: 'Contribution process',
              body: 'Define how new patterns enter the system: proposal → review against criteria → prototype → documentation → release to library → changelog. A structured path prevents both chaos (anyone merges anything) and bottleneck (one designer gates everything).'
            },
            {
              heading: 'Evolution without stagnation',
              body: 'Systems live. Schedule deprecations with a migration path, keep changelogs, version breaking changes, and revisit decisions against usage data. A system nobody uses is documentation; a used system is infrastructure worth maintaining.'
            }
          ],
          links: [
            { title: 'Design systems governance', url: 'https://www.figma.com/resource-library/design-systems/building-a-design-system/', sourceName: 'Figma', resourceType: 'guide', relationship: 'Official guidance on design operations.' },
            { title: 'Component libraries best practices', url: 'https://www.microsoft.com/design/fluent', sourceName: 'MDN Web Docs', resourceType: 'article', relationship: 'Industry example of a large scale system.' },
            { title: 'Team governance patterns', url: 'https://www.nngroup.com/articles/design-systems-governance/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Research on how teams successfully govern shared systems.' }
          ],
          quiz: {
            prompt: 'The most common cause of design system drift is…',
            options: ['Too much documentation', 'Missing ownership and governance process', 'Too few colors', 'Engineers not reading design specs'],
            answerIndex: 1,
            explanation: 'Without an accountable owner and contribution process, individual teams quietly fork patterns, and consistency erodes.'
          }
        }
      ]
    },
    {
      slug: 'professional-practice',
      stage: 'Advanced',
      title: 'Professional Practice',
      description: 'Handoff engineering can build from, managing client requirements, and running a dependable design workflow.',
      topics: [
        {
          slug: 'design-handoff',
          title: 'Design Handoff',
          minutes: 35,
          objectives: ['Package specs: measurements, tokens, assets, breakpoints', 'Annotate interactions, states and edge cases', 'Walk engineers through files and stay available during build'],
          sections: [
            {
              heading: 'Complete specifications',
              body: 'Handoff includes: final frames per breakpoint, token references instead of raw hexes, exported assets at required densities, and spacing/type values matching the system. Anything ambiguous will be guessed — usually inconsistently.'
            },
            {
              heading: 'Annotate the invisible',
              body: 'Mark focus order, alt text, truncation rules, max character counts, and behavior for empty, loading and error data. These invisible requirements cause most post-launch defects attributed vaguely to “design bugs”.'
            },
            {
              heading: 'Collaborative build',
              body: 'Deliver in a walkthrough meeting, invite questions in a tracked channel, and review implemented screens before release. Handoff is a relationship phase, not a file upload.'
            }
          ],
          links: [
            { title: 'Developer handoff resources', url: 'https://www.figma.com/resource-library/what-is-developer-handoff/', sourceName: 'Figma', resourceType: 'guide', relationship: 'Official handoff workflow guidance.' },
            { title: 'Dev Mode documentation', url: 'https://help.figma.com/hc/en-us/categories/360002051613', sourceName: 'Figma', resourceType: 'documentation', relationship: 'How engineers inspect your files for measurements and code.' },
            { title: 'ARIA authoring practices', url: 'https://www.w3.org/WAI/ARIA/apg/', sourceName: 'W3C', resourceType: 'guide', relationship: 'Interaction semantics your annotations must respect for widgets.' }
          ],
          quiz: {
            prompt: 'Which omission most often causes post-launch “design bugs”?',
            options: ['Missing hex codes', 'Unspecified states and edge cases like errors and truncation', 'Wrong file naming', 'Too many artboards'],
            answerIndex: 1,
            explanation: 'Engineers implement defaults well; unspecified exceptional states force guesses that later register as design defects.'
          }
        },
        {
          slug: 'client-requirements-and-review',
          title: 'Client Requirements & Design Review',
          minutes: 30,
          objectives: ['Translate vague client requests into concrete requirements', 'Present design rationale, not just artifacts', 'Manage revision rounds professionally'],
          sections: [
            {
              heading: 'Requirements archaeology',
              body: 'Clients describe symptoms (“make it pop”) not causes. Convert requests into testable requirements — audience, action, constraints, success measure — and confirm in writing. Scope creep enters through unconfirmed verbal agreements.'
            },
            {
              heading: 'Rationale-driven presentation',
              body: 'Present against goals: “this layout supports scanning because…”. Feedback anchored to goals stays objective; feedback anchored to taste spirals. Offer bounded alternatives rather than open-ended menus.'
            },
            {
              heading: 'Structured revisions',
              body: 'Agree revision counts and feedback consolidation upfront. Collect one consolidated round of feedback per milestone, log decisions, and flag when requests conflict with accessibility or performance — with evidence, not opinion.'
            }
          ],
          links: [
            { title: 'User needs analysis articles', url: 'https://www.nngroup.com/articles/ux-research-cheat-sheet/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Lightweight methods to ground client assumptions.' },
            { title: 'W3C design process context', url: 'https://www.w3.org/standards/webdesign/', sourceName: 'W3C', resourceType: 'reference', relationship: 'Standards constraints to surface in requirement discussions.' },
            { title: 'Stakeholder presentation guides', url: 'https://www.figma.com/resource-library/', sourceName: 'Figma', resourceType: 'guide', relationship: 'Communicating design work effectively.' }
          ],
          quiz: {
            prompt: 'A client emails scattered feedback from five colleagues over a week. Best practice is to…',
            options: ['Apply each comment immediately', 'Consolidate into one prioritized round, confirm conflicts with the client, then revise', 'Ignore written feedback', 'Restart the project'],
            answerIndex: 1,
            explanation: 'Fragmented feedback contains contradictions. Consolidation plus written confirmation protects both quality and scope.'
          }
        },
        {
          slug: 'professional-workflow',
          title: 'Professional Design Workflow',
          minutes: 30,
          objectives: ['Run the full loop: brief → research → IA → wireframes → visual → prototype → test → handoff', 'Estimate and schedule design phases realistically', 'Maintain quality with checklists and versioning'],
          sections: [
            {
              heading: 'The dependable loop',
              body: 'Mature workflows repeat: clarify the brief, research users and competitors, define information architecture, wireframe flows, apply the visual system, prototype, test, iterate, hand off, support build. Skipping stages moves work downstream where fixes cost more.'
            },
            {
              heading: 'Estimation honesty',
              body: 'Estimate per phase with explicit assumptions and review checkpoints. Buffer for one structured revision round. Design timelines collapse when discovery is compressed — say so before committing dates.'
            },
            {
              heading: 'Quality rituals',
              body: 'Use pre-handoff checklists (states, accessibility, breakpoints, tokens), keep one source-of-truth file, archive explorations, and record decisions. Rituals convert individual talent into team-level reliability.'
            }
          ],
          links: [
            { title: 'UX process cheat sheet', url: 'https://www.nngroup.com/articles/ux-research-cheat-sheet/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Choosing right-sized methods per project phase.' },
            { title: 'Design workflow library', url: 'https://www.figma.com/resource-library/', sourceName: 'Figma', resourceType: 'guide', relationship: 'Tooling practices that support the workflow.' },
            { title: 'WCAG Quick Reference', url: 'https://www.w3.org/WAI/WCAG22/quickref/', sourceName: 'WCAG', resourceType: 'reference', relationship: 'Final-check criteria before delivery.' }
          ],
          quiz: {
            prompt: 'Projects most often go sideways in professional design work because…',
            options: ['Wrong font pairing', 'Early stages (brief, requirements, IA) were skipped, pushing fixes downstream', 'Too few gradients', 'Files were named inconsistently'],
            answerIndex: 1,
            explanation: 'Ambiguity compounds. Unclear briefs and unvalidated structure resurface as expensive rework after visual design and build.'
          }
        }
      ]
    },
    {
      slug: 'design-systems-in-depth',
      stage: 'Advanced',
      title: 'Design Systems in Depth',
      description: 'Scale your design across a product: tokens, components, documentation and governance.',
      topics: [
        {
          slug: 'design-tokens-architecture',
          title: 'Design Tokens & Theming',
          minutes: 30,
          objectives: ['Distinguish raw from semantic tokens', 'Structure token groups for theming and dark mode', 'Publish tokens that engineers can consume'],
          sections: [
            { heading: 'Raw vs semantic tokens', body: 'Raw tokens hold primitive values (color hexes, type sizes, spacings). Semantic tokens reference them by role (color.background.surface, space.inset.md). The indirection lets you retheme a whole product by changing one layer instead of hunting arbitrary values.' },
            { heading: 'Theming without pain', body: 'Dark mode, brand variants and density changes all become token-swap operations when you forbid hard-coded values in components. Establish neutral ramps and role-based accents so a theme never breaks contrast.' },
            { heading: 'Token pipeline', body: 'Author tokens in one place (JSON, Style Dictionary, or a Figma plugin like Tokens Studio), then generate CSS custom properties, Android XML and iOS Swift for every consumer. Version tokens like a library so changes are reviewable.' }
          ],
          links: [
            { title: 'Design tokens explained', url: 'https://sparkbox.com/foundry/design_tokens_wtf', sourceName: 'Sparkbox', resourceType: 'article', relationship: 'Clear introduction to token concepts.' },
            { title: 'Style Dictionary docs', url: 'https://styledictionary.com/', sourceName: 'Style Dictionary', resourceType: 'documentation', relationship: 'Tool for transforming token sources into platform output.' },
            { title: 'Tokens Studio', url: 'https://tokens.studio/', sourceName: 'Tokens Studio', resourceType: 'documentation', relationship: 'Figma plugin and engine for token workflows.' }
          ],
          quiz: {
            prompt: 'A semantic token that references another token value is most valuable for…',
            options: ['Saving file space', 'Enabling theme and role-based change in one place', 'Making colors prettier', 'Speeding up Figma auto-layout'],
            answerIndex: 1,
            explanation: 'Semantic indirection means a role change updates everywhere the role is used — the core of scalable theming.'
          }
        },
        {
          slug: 'component-library-standards',
          title: 'Component Library Standards',
          minutes: 35,
          objectives: ['Define component anatomy and API contracts', 'Document states, variants and usage guidance', 'Bridge design and code parity'],
          sections: [
            { heading: 'Anatomy and API', body: 'Every component needs defined anatomy (which internal parts exist), a clear prop/parameter API, and guidance on when to compose vs extend. A button with predictable variants beats twenty bespoke buttons.' },
            { heading: 'States and variants', body: 'Document default, hover, focus, pressed, disabled, loading and error states for interactive components. Accessibility states (focus ring, aria) are part of the contract, not an afterthought.' },
            { heading: 'Design-code parity', body: 'Keep Figma components and code components in lockstep. Name tokens and components identically across both, and run regular audits so the library does not drift into two realities.' }
          ],
          links: [
            { title: 'Building your design system', url: 'https://www.smashingmagazine.com/design-systems-book/', sourceName: 'Smashing Magazine', resourceType: 'article', relationship: 'Foundational design system guidance.' },
            { title: 'Component guidelines', url: 'https://carbondesignsystem.com/guidelines/overview/', sourceName: 'Carbon Design System', resourceType: 'documentation', relationship: 'Real-world component API and state documentation.' },
            { title: 'WCAG Quick Reference', url: 'https://www.w3.org/WAI/WCAG22/quickref/', sourceName: 'WCAG', resourceType: 'reference', relationship: 'State and interaction criteria for component docs.' }
          ],
          quiz: {
            prompt: 'The most reliable way to keep Figma and code components from drifting apart is…',
            options: ['Never updating either', 'Shared naming conventions plus periodic parity audits and token-driven values', 'Duplicating both in a wiki', 'Screenshot comparisons only'],
            answerIndex: 1,
            explanation: 'Shared contracts plus regular audits catch drift before it becomes a full redesign.'
          }
        },
        {
          slug: 'design-system-governance',
          title: 'Governance & Contribution',
          minutes: 30,
          objectives: ['Align a design system to business goals', 'Run a contribution process with review', 'Measure system adoption and health'],
          sections: [
            { heading: 'System as product', body: 'Treat the design system like a product with its own roadmap, stakeholders and metrics. It exists to multiply team speed and consistency, so every decision should tie back to shipped product velocity or quality.' },
            { heading: 'Contribution workflow', body: 'Publish clear contribution guidelines: how to propose, prototype, review (design + engineering), and sunset a component. A lightweight review board preserves coherence while welcoming growth.' },
            { heading: 'Measuring adoption', body: 'Track which components are used, how many teams consume tokens, and time-to-first-usable-UI. Low adoption—not missing features—is the signal that the system needs love, not more parts.' }
          ],
          links: [
            { title: 'Design systems in practice', url: 'https://www.smashingmagazine.com/2019/03/design-systems-in-practice/', sourceName: 'Smashing Magazine', resourceType: 'article', relationship: 'Governance and adoption lessons.' },
            { title: 'Style Dictionary adoption', url: 'https://styledictionary.com/', sourceName: 'Style Dictionary', resourceType: 'documentation', relationship: 'Pipeline that reinforces token governance.' },
            { title: 'DesignOps resources', url: 'https://www.designops.assembly.com/', sourceName: 'DesignOps Assembly', resourceType: 'article', relationship: 'Community guidance on operating and measuring design systems.' }
          ],
          quiz: {
            prompt: 'A design system is underused a year in. The best first move is to…',
            options: ['Add more components', 'Investigate why teams are not adopting it and fix the friction', 'Delete the system', 'Rebuild in another tool'],
            answerIndex: 1,
            explanation: 'Adoption problems are usually friction or trust problems — diagnose before adding surface area.'
          }
        }
      ]
    },
    {
      slug: 'design-collaboration-workflow',
      stage: 'Advanced',
      title: 'Design Collaboration & Workflow',
      description: 'Thrive in cross-functional teams: critiques, design reviews, handoff and remote rituals.',
      topics: [
        {
          slug: 'design-critique-and-review',
          title: 'Running & Receiving Design Critique',
          minutes: 25,
          objectives: ['Facilitate critiques that stay objective', 'Give feedback that improves outcomes', 'Receive criticism without defensiveness'],
          sections: [
            { heading: 'Framing critique', body: 'Anchor critique to the brief and user goals, not personal taste. Ask reviewers for concrete, actionable observations, such as how one hero competes with the search bar for attention. Ban ungrounded preferences like "I just do not like it."' },
            { heading: 'Structuring sessions', body: 'Present the problem, the chosen direction and what is still open. Limit reviewers to a few focus questions and time-box discussion. Capture decisions and owners so the session produces motion, not opinions.' },
            { heading: 'Receiving feedback', body: 'Listen before defending. Separate the idea from your identity, ask clarifying questions, and say what you will try next. Great designers treat critique as data about the design, not a verdict on them.' }
          ],
          links: [
            { title: 'Design critique methods', url: 'https://www.nngroup.com/articles/design-critiques/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Facilitating productive critique sessions.' },
            { title: 'Giving design feedback', url: 'https://www.smashingmagazine.com/2018/10/design-criticism-and-feedback/', sourceName: 'Smashing Magazine', resourceType: 'article', relationship: 'Principles for actionable feedback.' },
            { title: 'UX team rituals', url: 'https://www.nngroup.com/articles/daily-ux-stand-up/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Lightweight team practices that support review cadence.' }
          ],
          quiz: {
            prompt: 'The most productive way to start a design critique is…',
            options: ['Letting everyone free-associate on taste', 'Stating the brief, current direction, and what is still undecided', 'Showing only the final design without context', 'Skipping it to save time'],
            answerIndex: 1,
            explanation: 'Clear intent and open questions focus the room on goals and trade-offs rather than personal preference.'
          }
        },
        {
          slug: 'design-engineering-handoff',
          title: 'Design to Engineering Handoff',
          minutes: 30,
          objectives: ['Produce specs engineers can build without guesswork', 'Annotate states, tokens and responsive behavior', 'Communicate around implementation constraints'],
          sections: [
            { heading: 'Specs that travel', body: 'A handoff includes clear dimensions, spacing, type, color tokens, component names and state behavior. Annotate responsive intent (what happens at each breakpoint) rather than only a desktop screenshot.' },
            { heading: 'Working with constraints', body: 'Engineers will surface technical limits: animation budgets, browser support, data availability. Treat these as design inputs, explore alternatives together, and update stored specs so files stay the single source of truth.' },
            { heading: 'Redlines and reviews', body: 'Run a visual QA pass against the built UI using your stored expectations. A short structured review at each milestone prevents drift and builds a trust loop with the team.' }
          ],
          links: [
            { title: 'Design handoff guide', url: 'https://www.figma.com/best-practices/tips-on-developer-handoff-with-figma-design/', sourceName: 'Figma', resourceType: 'guide', relationship: 'Preparing files for developers.' },
            { title: 'Communicating design intent', url: 'https://www.smashingmagazine.com/2019/01/communicating-design-ideas/', sourceName: 'Smashing Magazine', resourceType: 'article', relationship: 'Presenting and handing off coherently.' },
            { title: 'WCAG Quick Reference', url: 'https://www.w3.org/WAI/WCAG22/quickref/', sourceName: 'WCAG', resourceType: 'reference', relationship: 'Annotating compliance states for handoff.' }
          ],
          quiz: {
            prompt: 'A fully annotated handoff spec is missing if it lacks…',
            options: ['A decorative background image', 'Responsive behavior and interactive states', 'A watermark', 'Bold text everywhere'],
            answerIndex: 1,
            explanation: 'States and responsive intent are what let engineers build the experience, not just a static pixel match.'
          }
        },
        {
          slug: 'remote-collaboration-tools',
          title: 'Remote Collaboration & Tools',
          minutes: 25,
          objectives: ['Run effective async design rituals', 'Use Figma, Miro and comms tools purposefully', 'Keep a healthy feedback loop in distributed teams'],
          sections: [
            { heading: 'Async-first design', body: 'Share a clear design request, context link and question with a deadline. Async reviews scale attention: record a 2-minute Loom walkthrough and ask for comments on specific frames instead of herd-reviewing live.' },
            { heading: 'Choosing the right tool', body: 'Figma for shared artifacts, Miro for mapping and workshops, Slack/Teams for quick loops, and a written decision log for durable choices. Match tool to decision type; do not let chat bury decisions.' },
            { heading: 'Keeping momentum', body: 'In distributed teams, over-communicate intent and iterate in visible branches/tabs. Regular short demos and a public roadmap keep stakeholders aligned without constant meetings.' }
          ],
          links: [
            { title: 'Remote design collaboration', url: 'https://www.nngroup.com/articles/remote-ux-collaboration/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Practices for distributed design teams.' },
            { title: 'Miro academy', url: 'https://academy.miro.com/', sourceName: 'Miro', resourceType: 'course', relationship: 'Workshop techniques in a shared canvas.' },
            { title: 'Async communication guide', url: 'https://doist.com/blog/asynchronous-communication/', sourceName: 'Doist', resourceType: 'article', relationship: 'Principles for async-first workflows.' }
          ],
          quiz: {
            prompt: 'For an important design decision with a remote team, the safest place to record the outcome is…',
            options: ['A chat thread that scrolls fast', 'A written decision log with rationale', 'Someone’s memory', 'A private note'],
            answerIndex: 1,
            explanation: 'Written, findable decision logs keep the rationale and ownership durable across time zones.'
          }
        }
      ]
    },
    {
      slug: 'freelance-and-career-growth',
      stage: 'Advanced',
      title: 'Freelance & Career Growth',
      description: 'Build a portfolio that converts, price your work, and grow as a professional designer.',
      topics: [
        {
          slug: 'design-portfolio-strategy',
          title: 'Portfolio Strategy & Case Studies',
          minutes: 30,
          objectives: ['Select projects that tell a capability story', 'Write case studies focused on problems and outcomes', 'Present work with clear roles and metrics'],
          sections: [
            { heading: 'Less, done well', body: 'Three or four strong case studies beat a gallery of twenty thumbs. Curate for the role you want, showing range across a coherent thread (e.g., systems + accessibility + business impact).' },
            { heading: 'Outcome-led case studies', body: 'Each case study should state the problem, your role, constraints, process, decisions and measurable results. Recruiters skim roles and metrics first — make both explicit.' },
            { heading: 'Honest scope', body: 'Label what you actually did versus collaboration. Claiming credit for others’ work collapses under one reference check; named attribution builds credibility.' }
          ],
          links: [
            { title: 'Writing a UX case study', url: 'https://www.nngroup.com/articles/case-studies/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Structuring portfolio case studies well.' },
            { title: 'Portfolio best practices', url: 'https://www.smashingmagazine.com/2018/05/designing-and-building-a-portfolio/', sourceName: 'Smashing Magazine', resourceType: 'article', relationship: 'Designing a portfolio site that converts.' },
            { title: 'Behance guidelines', url: 'https://help.behance.net/hc/en-us/categories/204485388-Guidelines', sourceName: 'Behance', resourceType: 'documentation', relationship: 'Presenting design work on a public platform.' }
          ],
          quiz: {
            prompt: 'A portfolio case study is most effective when it leads with…',
            options: ['Your favorite color palette', 'The problem, your role, and the measurable outcome', 'Every tool you’ve ever touched', 'A list of clients'],
            answerIndex: 1,
            explanation: 'Hiring managers scan for problems solved and impact; lead with those and place screenshots in support.'
          }
        },
        {
          slug: 'pricing-and-client-work',
          title: 'Pricing & Managing Client Work',
          minutes: 30,
          objectives: ['Price projects with scope and value in mind', 'Write contracts that protect scope and revisions', 'Manage expectations through delivery'],
          sections: [
            { heading: 'Value-based pricing', body: 'Anchor price to the business value you deliver, not just hours. Scope the project into phases with explicit deliverables and capped revision rounds so "a few small tweaks" cannot silently grow the project.' },
            { heading: 'Contracts save relationships', body: 'A clear agreement covers scope, timeline, payment schedule, intellectual property transfer on full payment, and what is out of scope. Written scope prevents the worst client conflicts.' },
            { heading: 'Delivery rituals', body: 'Kick off with a shared brief, milestone check-ins, and a sign-off at each phase. Update the client before they ask, and keep a decisions log. Calm, communicative delivery earns referrals.' }
          ],
          links: [
            { title: 'Freelance pricing guide', url: 'https://www.smashingmagazine.com/2018/12/freelance-and-pricing/', sourceName: 'Smashing Magazine', resourceType: 'article', relationship: 'Frameworks for setting rates and pricing.' },
            { title: 'Writing a design contract', url: 'https://www.and.co/blog/dear-copy-that-what-does-a-basic-freelance-contract-look-like', sourceName: 'AND CO', resourceType: 'article', relationship: 'Contract essentials for freelancers.' },
            { title: 'Client communication', url: 'https://www.nngroup.com/articles/design-and-client-communication/', sourceName: 'Nielsen Norman Group', resourceType: 'article', relationship: 'Managing expectations with clients.' }
          ],
          quiz: {
            prompt: 'When a client adds "just a few small tweaks" a third time, the professional move is…',
            options: ['Silently doing them to be nice', 'Explaining the new scope, its impact, and the cost/option to include it', 'Refusing all contact', 'Charging the original price'],
            answerIndex: 1,
            explanation: 'Name the additional scope and its impact transparently; this preserves the relationship and the project scope.'
          }
        },
        {
          slug: 'career-and-progression',
          title: 'Career Growth & Specialization',
          minutes: 25,
          objectives: ['Chart a progression path (IC to senior to staff)', 'Choose a specialization that matches demand and you', 'Build a learning loop and network'],
          sections: [
            { heading: 'Beyond the portfolio', body: 'Advancing means influencing outcomes and others, not just producing artifacts. Seniors set direction and unblock teams; staff designers drive systems and strategy. Build those muscles deliberately.' },
            { heading: 'Specializing wisely', body: 'Specialties like design systems, accessibility, motion, or product design demand different skills and pay differently. Pick the intersection of what you love, what you are good at, and what the market rewards.' },
            { heading: 'A compounding learning loop', body: 'Keep a review practice: after each project, note what you would repeat and what you would change. Contribute to communities, mentor juniors, and stay current with the tools the market actually uses.' }
          ],
          links: [
            { title: 'Career ladders in design', url: 'https://www.smashingmagazine.com/2019/02/design-career-ladders/', sourceName: 'Smashing Magazine', resourceType: 'article', relationship: 'Mapping progression from intern to staff.' },
            { title: 'State of UX salaries', url: 'https://www.linkedin.com/insights/salary/ux-research/global', sourceName: 'LinkedIn', resourceType: 'reference', relationship: 'Market data to inform specialization choices.' },
            { title: 'DesignOps Assembly', url: 'https://www.designops.assembly.com/', sourceName: 'DesignOps Assembly', resourceType: 'article', relationship: 'Community and roles developing within design ops.' }
          ],
          quiz: {
            prompt: 'The most reliable way to grow beyond "mid-level designer" is to…',
            options: ['Make more pixel-perfect mockups', 'Influence outcomes and unblock others, and drive systems/strategy', 'Memorize more shortcuts', 'Wait for a title change'],
            answerIndex: 1,
            explanation: 'Senior and staff levels are defined by scope of influence and ownership, not output volume.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Client Landing Page — Design Task',
    coverage: ['Layout & Composition', 'Typography', 'Color Theory', 'Responsive Behavior', 'Accessibility', 'Handoff Readiness'],
    brief:
      'You are designing a landing page for “Harbor Coffee”, a local roastery. Audience: weekend customers aged 25–45 ordering beans online. Goal: drive newsletter signups. Deliver a desktop (1440px) and mobile (390px) composition for the hero, product highlights and signup section, using a defined type scale, palette with contrast checks, and annotations for states.',
    requirements: [
      'Clear visual hierarchy with one primary call-to-action',
      'Type scale of 5+ steps documented with sizes and weights',
      'Palette listing roles (brand/neutral/semantic) with contrast ratios for text pairs',
      'Desktop and mobile compositions sharing one grid logic',
      'Annotations for hover, focus and error states on the signup form',
      'Alt-text notes for every informative image'
    ],
    expectedOutput:
      'A structured submission describing your compositions: section-by-section breakdown with measurements/tokens, palette table with contrast ratios, breakpoint behavior notes, and annotation lists. Describe artifacts precisely enough for an engineer to build without questions.',
    rubric: [
      { skill: 'Layout & Composition', weight: 25, criteria: 'Single focal point, deliberate scanning path, consistent grid spans and margins' },
      { skill: 'Typography', weight: 15, criteria: 'Coherent modular scale, readable measure/line-height, strong heading contrast' },
      { skill: 'Color Theory', weight: 15, criteria: 'Role-based palette, restrained accent use, documented contrast compliance' },
      { skill: 'Responsive Behavior', weight: 15, criteria: 'Content-driven breakpoint strategy with explicit mobile adaptations' },
      { skill: 'Accessibility', weight: 20, criteria: 'Contrast, focus, alt text and form-label annotations present and correct' },
      { skill: 'Handoff Readiness', weight: 10, criteria: 'Tokens, states and edge cases specified clearly enough to build from' }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'Design System Starter',
      stage: 'Foundation',
      objective: 'Create the token layer and three core components for a fictional bookstore website, demonstrating systematic visual foundations.',
      requirements: [
        'Define color tokens (brand, neutral ramp 9 steps, success/warning/error) with roles',
        'Build a 6-step type scale with named styles',
        'Specify an 8px-base spacing scale and 12-column grid settings per breakpoint',
        'Document button (primary/secondary), input and card components with default/hover/focus/disabled/error states',
        'Explain each decision briefly in your own words'
      ],
      skillsEvaluated: ['Color Theory', 'Typography', 'Spacing', 'Design Systems'],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit a written specification of your system (tokens tables, component state descriptions) exactly as you would annotate a Figma library for engineers.',
        textLabel: 'System specification',
        minTextLength: 900
      }
    },
    {
      title: 'Responsive Marketing Site Redesign',
      stage: 'Intermediate',
      objective: 'Redesign a cluttered local-gym landing page for clarity and responsiveness across three breakpoints.',
      requirements: [
        'Audit the existing layout: list hierarchy, grouping and responsiveness problems found',
        'Propose a revised composition with one primary action per screen region',
        'Define desktop/tablet/mobile behavior using a content-driven breakpoint strategy',
        'Show grid spans and spacing tokens applied per section',
        'Verify text contrast pairs meet WCAG AA and list the ratios'
      ],
      skillsEvaluated: ['Layout & Composition', 'Responsive Design', 'Grid Systems', 'Accessibility'],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the audit, revised section-by-section breakdown, and breakpoint behavior notes.',
        textLabel: 'Redesign report',
        minTextLength: 1200,
        linkLabels: ['Reference or inspiration link (optional)']
      }
    },
    {
      title: 'Accessible Checkout Flow Case Study',
      stage: 'Advanced',
      objective: 'Design and evaluate a three-step checkout flow that meets WCAG 2.2 AA for the steps you design.',
      requirements: [
        'Map the flow: cart → shipping/payment → confirmation, including error paths',
        'Annotate labels, instructions, focus order and error messaging per step',
        'List applicable WCAG success criteria and how your design satisfies them',
        'Describe a usability test plan (tasks, participants, metrics)',
        'Summarize trade-offs you accepted and why'
      ],
      skillsEvaluated: ['Accessibility', 'UX Fundamentals', 'Prototyping', 'Usability'],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the case study: flow description, accessibility annotations, criteria mapping, test plan and trade-off summary.',
        textLabel: 'Case study',
        minTextLength: 1500,
        linkLabels: ['WCAG Quick Reference link used']
      }
    }
  ],

  simTasks: [
    {
      title: 'Homepage hero refresh',
      context: 'Marketing reports the Harbor Coffee-style homepage underperforms on signups. Analytics show users scroll past the hero without acting.',
      requirements: [
        'Propose a revised hero hierarchy with one primary CTA',
        'Specify headline length limits and responsive behavior',
        'Note contrast ratios for new text/background pairs'
      ],
      priority: 'high',
      dueDayOffset: 3,
      expectedOutput: 'A concise revision memo: hierarchy changes, token usage, CTA treatment, responsive notes.',
      skills: ['Layout & Composition', 'Color Theory', 'Responsive Design']
    },
    {
      title: 'Spacing inconsistency sweep',
      context: 'QA flagged that card paddings vary between 12, 14 and 16px across pricing pages after several contributors edited files.',
      requirements: [
        'Define the correct spacing tokens for card padding/gap',
        'List every affected component and its corrected values',
        'Propose a library update to prevent recurrence'
      ],
      priority: 'normal',
      dueDayOffset: 5,
      expectedOutput: 'Standardization note with token mappings and component-by-component corrections.',
      skills: ['Spacing', 'Design Systems']
    },
    {
      title: 'Developer handoff package',
      context: 'Engineering starts sprint planning Monday and needs the checkout redesign ready to build without blocking questions.',
      requirements: [
        'Provide per-breakpoint specs with tokens, not raw values',
        'Annotate focus order, labels, alt text and error states',
        'Export checklist of assets with required sizes'
      ],
      priority: 'critical',
      dueDayOffset: 2,
      expectedOutput: 'Handoff summary listing deliverables, annotations completed, and open questions (target: zero).',
      skills: ['Design Handoff', 'Accessibility', 'Professional Workflow']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Dana Kovač',
      personaRole: 'Frontend Engineer',
      situation: 'Implementation question about spacing tokens discovered mid-build.',
      openingMessage:
        'Hi! Building the pricing cards — the file shows 16px padding in one variant and 14px in another. Which is correct, and should I use the token space-2 or a literal value? Also the mobile cards currently stretch full-width; is that intended?',
      expectedPoints: [
        'Confirms the correct token (e.g. space-2 = 16px) and asks to replace literals',
        'Answers the mobile-width question explicitly (full-width intended or not)',
        'Offers to update the library/file so the discrepancy disappears for everyone'
      ]
    },
    {
      kind: 'team',
      personaName: 'Priya Nair',
      personaRole: 'Product Manager',
      situation: 'Scope pressure two days before review.',
      openingMessage:
        'Leadership wants a testimonials carousel added to the homepage before Thursday’s review. I know it wasn’t scoped — can we squeeze it in? What would you need, and what might slip if we add it?',
      expectedPoints: [
        'Responds constructively without immediate over-commitment',
        'Estimates effort and names concrete trade-offs (which deliverable slips)',
        'Proposes an option such as a static testimonial block now, carousel post-review',
        'Asks a clarifying question about review goals/audience'
      ]
    },
    {
      kind: 'client',
      personaName: 'Marcus Bell',
      personaRole: 'Owner, Harbor Coffee',
      situation: 'Client requests design changes to the approved homepage hero.',
      openingMessage:
        'Love the site, but my partner thinks the hero feels “too quiet”. Could we make it more exciting? Maybe bigger photos, brighter colors, something moving? We want people to stop scrolling!',
      expectedPoints: [
        'Translates the vague request into goals (attention on hero, drive signups)',
        'Explains trade-offs of auto-playing motion and saturated color (performance, accessibility)',
        'Proposes a concrete alternative honoring the design system',
        'Confirms next step: a revised option within the agreed revision round'
      ]
    },
    {
      kind: 'client',
      personaName: 'Elena Ruiz',
      personaRole: 'Marketing Lead, Northbeam Fitness',
      situation: 'Client demands a brand-color swap late in the project.',
      openingMessage:
        'Our board prefers teal instead of the green we agreed on. Can you just find-and-replace the color everywhere? Also make buttons red — red converts better, right?',
      expectedPoints: [
        'Clarifies scope impact: token swap vs full re-audit of contrast and imagery',
        'Flags that button red must still meet WCAG contrast and distinguish from error states',
        'Asks whether “converts better” came from their data; offers to test if not',
        'States what changes within current round vs additional effort'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Requirement change',
      situation:
        'Two days before handoff, the client adds a bilingual requirement: every screen must accommodate German labels, which run ~35% longer than English.',
      requiredActions: [
        { action: 'Assess impact on layouts: truncation, wrapping, nav overflow at each breakpoint', good: true, note: 'Impact assessment before promises — professional reflex.' },
        { action: 'Reply agreeing instantly to “just fit it in” without scoping', good: false, note: 'Silent scope absorption guarantees missed deadlines and resentment.' },
        { action: 'Propose practical mitigations: min/max widths, truncation rules, longer-label variants for CTAs', good: true, note: 'Concrete solutions move the conversation forward.' },
        { action: 'Confirm timeline change in writing with the client and team', good: true, note: 'Written scope agreement protects everyone.' }
      ]
    },
    {
      category: 'Technical constraint',
      situation:
        'The engineer reports your animated hero cannot ship: autoplay video violates their performance budget and the animation relies on motion some users must avoid.',
      requiredActions: [
        { action: 'Get curious: ask for the budget numbers and constraints instead of defending the design', good: true, note: 'Understanding constraints precedes redesigning within them.' },
        { action: 'Insist the effect is essential to the brand concept', good: false, note: 'Rigidity over accessibility/performance harms the product and trust.' },
        { action: 'Offer reduced-motion-safe alternatives (static image with subtle CSS fade, poster frame)', good: true, note: 'Respects user preferences (vestibular disorders) and budgets.' },
        { action: 'Update the design file and annotations to reflect the agreed solution', good: true, note: 'Keeping source-of-truth current is part of the job.' }
      ]
    }
  ],

  interviewQuestions: [
    { dimension: 'technical_knowledge', prompt: 'Walk me through building a type scale for a new marketing site. What values do you choose and why?', guidancePoints: ['Base size and ratio reasoning', 'Limiting weights/families', 'Measure and line-height for body', 'Documenting as named styles'] },
    { dimension: 'technical_knowledge', prompt: 'How do you verify a color pair is WCAG compliant, and what ratios do you need for normal vs large text?', guidancePoints: ['4.5:1 vs 3:1 thresholds', 'Checking early in palette definition', 'Not relying on color alone'] },
    { dimension: 'problem_solving', prompt: 'A stakeholder insists on a change that would break accessibility. Take me through your response.', guidancePoints: ['Understand underlying goal', 'Present compliant alternatives', 'Escalate with evidence if unresolved', 'Document the decision'] },
    { dimension: 'problem_solving', prompt: 'Your 12-column layout breaks at tablet width — cards wrap unevenly. Diagnose likely causes.', guidancePoints: ['Span choices vs column math', 'Gutter/margin definitions per breakpoint', 'Content exceeding min widths', 'Fixing at grid level not per-card hacks'] },
    { dimension: 'professional_reasoning', prompt: 'How do you decide what belongs in the design system versus a one-off screen?', guidancePoints: ['Reuse evidence across contexts', 'Maintenance cost of abstraction', 'Contribution/versioning process', 'When duplication is acceptable short-term'] },
    { dimension: 'professional_reasoning', prompt: 'Mid-project, analytics show users ignore your carefully designed CTA. What do you do?', guidancePoints: ['Form hypothesis from data', 'Lightweight test before redesign', 'Prioritize measurable outcomes over taste', 'Communicate findings to stakeholders'] },
    { dimension: 'communication', prompt: 'A client says “make it pop”. Translate that request into requirements you could act on.', guidancePoints: ['Ask about audience/action/success metric', 'Offer bounded options', 'Confirm in writing', 'Anchor feedback rounds to goals'] },
    { dimension: 'communication', prompt: 'Describe presenting an unfinished direction to leadership confidently.', guidancePoints: ['State what is decided vs open', 'Frame questions you need answered', 'Show progress against milestones', 'Avoid defensive reactions to critique'] }
  ]
}
