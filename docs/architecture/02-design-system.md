# 02 — UI/UX Visual Direction & Component System

## 1. Design philosophy

The product must feel like a **professional environment where I learn, practice, and work** —
closer to a modern developer tool or enterprise workplace product than to a school website,
a SaaS dashboard template, or an AI chatbot product.

Design personality: **Professional · Minimal · Focused · Calm · Intelligent · Trustworthy.**

### 1.1 Typography-first hierarchy

Typography, whitespace, layout and contrast carry the interface. A UI element must make sense
with icons removed.

- Display/headings: **Inter** (or IBM Plex Sans) tight tracking, strong weight steps.
- Body: same family at 15–16px/1.6 for reading comfort in lessons.
- Code & data: **JetBrains Mono**; tabular numerals for scores, timers, deadlines.
- Hierarchy via scale + weight + spacing only — never via icon decoration.

Type scale (desktop): 12 / 13 / 14 / 16 / 20 / 24 / 32 / 44 px with a 4px base grid
(8px section rhythm). Line lengths capped at ~72ch in readers.

### 1.2 Icon rule

Icons only when they: represent a recognizable action (close, play/pause, send, download),
replace repeated text controls (toolbar buttons), communicate system status (error/success),
or are required for navigation affordance. If removing an icon changes nothing, remove it.

```
BAD:   [📚 Lessons]  [🎯 Progress]  [🤖 AI Analysis]  [💼 Career]
GOOD:  Lessons       Progress       Performance Review  Career      (plain text nav)
```

One icon set: Lucide React. No mixed metaphors, no filled/outline mixing within a surface.
Default icon size 16–18px, stroke 1.5, muted color unless interactive state demands emphasis.

### 1.3 Label rule & AI-invisible copywriting

AI is an invisible intelligence layer. The word "AI" never appears as a label, badge, or prefix.
The platform communicates intelligence through behavior: personalization, recommendations,
feedback quality.

| BAD | GOOD |
|---|---|
| 🤖 AI Recommendation: study JavaScript Functions | Recommended next — JavaScript Functions |
| 🤖 AI Evaluation | Performance Review |
| 🤖 AI Feedback | Feedback |
| 🤖 AI Assistant / Chatbot bubble everywhere | Ask about this lesson (quiet input affordance) |
| AI-Powered Platform | — (never stated) |
| Progress: 72% with chart icon | Progress — 72% |

No robot icons, neural-network backdrops, glowing brains, neon cyberpunk gradients, floating
particles, or chatbot bubbles. No confetti. Gamification is limited to restrained progress
indicators and a quiet achievements list — supporting elements, never identity.

Copy tone: concise, human, professional. Sentence case headings. Buttons say what they do:
"Submit solution", not "Submit your awesome work!" Empty states explain the next action in one
sentence plus one action link.

### 1.4 Motion design rules

Motion communicates state — it never decorates. Framer Motion is the single motion system;
`useReducedMotion()` is honored globally (WCAG).

| Pattern | Spec |
|---|---|
| Page/route transitions | 150–200ms fade + 8px slide, ease-out |
| Element enter (lists/cards) | stagger ≤ 30ms/item, fade+rise 6px |
| Dialogs/popovers | 120ms scale 0.98→1 + fade |
| State change (score reveal, progress) | 250ms value/count transition |
| Loading | skeleton shimmer (subtle) or 1.2s indeterminate bar |
| Hover micro-interaction | 100ms background/border shift only |
| Reduced motion | all of the above collapse to opacity-only or none |

Forbidden: parallax excess, looping ambient animations, spring bounces on data UI, animated
gradients.

---

## 2. Visual identity

### 2.1 Color system (design tokens)

Neutral-led palette with one accent. Light and dark themes are first-class; dark default for
workspace/code surfaces, light available everywhere. All pairs verified WCAG AA (4.5:1 text,
3:1 large text/UI components); tokens live in CSS variables consumed by Tailwind.

| Token | Light | Dark | Usage |
|---|---|---|---|
| `bg/base` | #FFFFFF | #0B0E14 | App background |
| `bg/surface` | #F7F8FA | #11151C | Cards, panels |
| `bg/inset` | #EEF0F3 | #171C25 | Wells, code blocks |
| `border/default` | #E3E6EA | #232A36 | Hairlines |
| `text/primary` | #10141B | #E8ECF2 | Headings/body |
| `text/secondary` | #4A5568 | #9AA6B5 | Supporting text |
| `accent` | #3B5BDB | #5C7CFA | Primary actions, active states (single accent) |
| `success` | #2F9E44 | #38B263 | Pass states, online presence |
| `warning` | #E8890C | #F0A02B | Deadlines approaching, review pending |
| `danger` | #D9480F | #F0714A | Errors, incidents, failed exams |
| `focus-ring` | accent @ 40% halo | same | Keyboard focus visibility |

Deliberately avoided: multi-color gradient washes, neon glows, per-feature rainbow accents.
Status colors appear only where status exists.

### 2.2 Layout, density, responsiveness

- Breakpoints: 360 / 480 / 768 / 1024 / 1280 / 1536. Mobile layouts are re-composed
  (stacked navigation, bottom tab bar in workspace, collapsible filters) — never shrunken desktop.
- App shell: left sidebar (collapsible to rail), top bar contextual per module, content max-width
  1280 with generous gutters. Focus mode (exams, interviews, coding): chrome removed entirely.
- Density modes: Comfortable (learning surfaces) and Compact (tables, inbox, task boards).
- Radii: 6px controls, 10px cards, full for avatars/pills. Shadows minimal (1 level);
  separation prefers borders + background shifts over elevation.

### 2.3 Signature patterns (ownable design language)

- **The Ladder:** recurring vertical progress motif (roadmap, levels, exam objectives) rendered
  as a typographic spine with hairline connectors — becomes the brand's recognizable structure.
- **Evidence blocks:** every score/review renders as structured evidence (dimension rows with
  values and short rationales), consistent from homework feedback to career report.
- **Workspace realism:** simulation UI mirrors professional tooling conventions — task IDs,
  priority labels, due chips, thread subjects, sprint markers — using real workplace vocabulary.

---

## 3. Component system

### 3.1 Architecture approach

- **Headless behavior + custom skin:** Radix UI primitives provide accessible behavior
  (Dialog, DropdownMenu, Tabs, Tooltip, Popover, Toast, Select, Switch); Tailwind +
  class-variance-authority (cva) define our visual language on top. We own the look completely.
- **Variant-driven:** every component exposes typed variants (`intent`, `size`, `emphasis`) via
  cva; no ad-hoc class strings at call sites. `cn()` = clsx + tailwind-merge resolves conflicts.
- **Composition over configuration:** compound components expose subcomponents
  (`Card.Header`, `Tabs.List`, `Dialog.Content`) instead of boolean prop explosions.
- **Controlled/uncontrolled parity** where sensible; forms integrate React Hook Form through a
  thin `FormField` wrapper that binds label/error/description wiring automatically (ARIA done once).
- **Zero business logic in the design system.** Data-fetching lives in feature components.

### 3.2 Base components

Button (variants: primary, secondary, ghost, destructive, link; sizes sm/md/lg; loading state;
asChild polymorphism), Input, Textarea, Select, Combobox (async search), Checkbox, RadioGroup,
Switch, Slider, DatePicker, FileDropzone, FormField, FormSection, Label, FieldError,
Modal/Dialog (sizes sm–full, focus trap, scroll lock), Drawer/SidePanel, Popover, Tooltip,
DropdownMenu, ContextMenu, Tabs (line + segmented styles), Accordion, Card (+Header/Footer),
Badge (neutral/accent/success/warning/danger), StatusDot, Avatar/AvatarGroup, Separator,
Skeleton, Spinner, ProgressBar, ProgressRing, Table (sortable, sticky header, row selection),
Pagination, Breadcrumbs, Navbar, Sidebar/Rail, Footer, EmptyState, Callout (info/warning/danger),
Toast (queue, aria-live polite/assertive), CommandPalette (⌘K navigation), Timeline, StatBlock,
Chart primitives (bar/line/radar wrappers over a light chart lib — used sparingly, always with
data-table alternative), Kbd, CopyButton, Link (external auto-indicator), ConfirmDialog.

All base components ship keyboard-complete, labeled, focus-visible, reduced-motion aware.

### 3.3 Learning domain components

| Component | Responsibility | Notes |
|---|---|---|
| CourseCard | Course summary → CTA | completion %, next lesson deep-link |
| LessonCard | Lesson row item | type marker (text/video/practice/homework/exam), duration, lock state |
| LessonShell | Unified lesson frame | tabs Reader / Video / Practice / Homework; saves position |
| LessonReader | Book/tutorial renderer | typography-first prose, chapter TOC, inline quiz slots, runnable snippets |
| ChapterNavigation | Prev/next + outline rail | sticky, current-section highlight |
| VideoPlayer | HLS player wrapper | chapters, speed, transcript panel, resume |
| TranscriptViewer | Searchable transcript | click→seek |
| LearningProgress | Course/lesson completion display | evidence-style bars |
| SkillNode | Single skill cell | mastery %, locked/unlocked/mastered states |
| SkillTree | Prerequisite graph view | layered DAG, zoom/pan, keyboard navigable list alternative |
| PracticeTask | Exercise frame | instructions + checks panel |
| CodeEditor | Monaco wrapper | lazy chunk, language services, themes, a11y textarea fallback toggle |
| LivePreview | Sandboxed iframe render | web exercises; srcdoc + postMessage bridge |
| ConsolePane | Program output viewer | stdout/stderr/test results tabs |
| TestResultsList | Per-case pass/fail rows | diff view on failure |
| HomeworkCard | Assignment brief summary | deadline chip, status, score when reviewed |
| SubmissionPanel | Submit/edit/view submission | files + code entries + requirement checklist |
| ReviewPanel | Structured feedback rendering | score, strengths, needs attention, recommended next (no AI labels) |
| DiffView | Side-by-side/unified diff | review annotations anchored to lines |

### 3.4 Exam components

ExamTimer (server-authoritative countdown w/ drift correction + aria-live warnings at T-5/T-1),
ExamQuestion (type-polymorphic renderer), AnswerOption (radio/checkbox semantics, keyboard),
QuestionNavigator (grid of question states), ExamProgress, FlagForReview control,
ExamSubmitGate (confirm dialog listing unanswered), ExamResult (score + objective breakdown),
RetakePolicyCard (cooldown countdown, attempts remaining).

### 3.5 Simulation (Workspace) components

SimulationDashboard (role header, sprint clock, alerts), CompanyPanel (org context), TeamRoster
(personas, presence, roles), ProjectBoard (task columns), TaskPanel, TaskCard (id, priority,
status, due, assignee), InboxLayout, ThreadView, MessageBubble (professional message styling —
not chat-game bubbles), Composer (attachments, drafts persisted), ClientThreadBadge,
MeetingAgendaItem, IncidentPanel (severity, timeline, runbook hints), DecisionPanel (options with
trade-offs, commit action, consequence preview disabled), DeadlineTimer (chip + urgency color
only past thresholds), SimulationTimeline (act/beat history), WeeklyReviewCard, PerformanceReviewDoc
(dimension table + narrative).

### 3.6 Intelligence-layer components (unlabeled intelligence)

RecommendedNext (single-card suggestion row), ResourceSuggestion (tutorial/book/video links),
MentorDock (slide-in panel scoped to current lesson; quiet input, cited answers),
ReviewScoreBlock, DimensionBreakdown, ImprovementPlan, InterviewTranscript, InterviewScorecard,
CareerReportView. Naming describes function, never the mechanism.

### 3.7 Portfolio & certification components

PortfolioGrid, ProjectCard (cover, role, stack tags, outcome metric), ProjectDetails (narrative,
evidence links, gallery), PortfolioEditor, CertificateCard, CertificateVerifyView,
CareerReportDownload.

### 3.8 Admin/Instructor console components

DataTable (server-paginated, column config, CSV export), FilterBar, EntityForm (schema-driven CRUD
forms generated from shared Zod schemas), JsonEditor (scenario authoring), RubricEditor,
QuestionBankTable, PublishingControls (draft/review/published lifecycle), AuditLogViewer,
MetricTile.

### 3.9 Component communication model

1. **Props down, events up** for leaf/base components. Callback props typed; no implicit globals.
2. **Compound composition + internal context** for behavioral clusters (Tabs, Dialog, Form).
3. **Feature components fetch their own data** through generated hooks (TanStack Query); parents
   receive children via slot/children composition so features stay decoupled from layout.
4. **Cross-cutting UI concerns** (theme, command palette, sidebar collapse, toasts) go through the
   small Zustand UI store or imperative controllers (toast service) — never prop drilling >2 levels.
5. **Server events** (simulation messages, notifications) enter via a socket controller that writes
   into query caches (`setQueryData`) — components stay declarative.
6. **Contracts:** shared types/Zod schemas imported from `packages/shared`; components validate
   nothing they can trust, forms validate everything users type.

Component file anatomy:

```
src/components/ui/button/
├── button.tsx          // component + variants
├── button.variants.ts  // cva definitions
├── button.test.tsx     // RTL unit tests incl. a11y roles
└── index.ts            // public export
```

Rules: one concern per component; no fetching inside `ui/`; no route awareness inside `features/*`
presentational parts; every interactive element reachable and operable by keyboard; every async
surface has loading (skeleton matching final layout), empty, and error states designed up front.
