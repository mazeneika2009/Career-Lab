/**
 * HeroArt — decorative landing illustration for Career Lab.
 *
 * Inline SVG (no external asset needed, works offline) depicting the
 * LEARN → PRACTICE → PROVE → WORK journey: a learning roadmap path with
 * nodes, an open digital book, a video lecture card and skill bars.
 */
export function HeroArt(): React.JSX.Element {
  return (
    <div
      role="img"
      aria-label="Illustration of a career learning roadmap with a digital book, video lessons and skill progress"
      className="relative mx-auto w-full max-w-md lg:max-w-none"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-8 right-1/4 h-40 w-40 rounded-full bg-success/15 blur-3xl"
      />
      <svg viewBox="0 0 480 400" className="relative h-auto w-full drop-shadow-sm" aria-hidden="true">
        {/* backdrop blob */}
        <path
          d="M40 200C40 110 120 40 240 40s200 70 200 160-80 160-200 160S40 290 40 200Z"
          fill="#fffdf7"
          stroke="#ddd2bd"
          strokeWidth="2"
        />
        {/* roadmap path */}
        <path
          d="M70 300C140 300 120 220 200 220s70-70 130-70"
          fill="none"
          stroke="#e76f3c"
          strokeWidth="4"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
        {/* roadmap nodes */}
        <g>
          <circle cx="70" cy="300" r="12" fill="#8fb996" />
          <path d="M64 300l4 4 8-8" stroke="#fffdf7" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="200" cy="220" r="12" fill="#e76f3c" />
          <circle cx="200" cy="220" r="5" fill="#fffdf7" />
          <circle cx="330" cy="150" r="12" fill="#173f35" />
          <path d="M324 150l4 4 8-8" stroke="#fffdf7" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* open digital book */}
        <g transform="translate(248 218)">
          <path d="M0 12C20 2 44 2 64 12v72c-20-10-44-10-64 0Z" fill="#173f35" />
          <path d="M64 12c20-10 44-10 64 0v72c-20-10-44-10-64 0Z" fill="#214d41" />
          <path d="M64 12v72" stroke="#f7f1e3" strokeWidth="2" />
          <g stroke="#f7f1e3" strokeWidth="3" strokeLinecap="round" opacity="0.85">
            <line x1="12" y1="28" x2="52" y2="28" />
            <line x1="12" y1="40" x2="52" y2="40" />
            <line x1="12" y1="52" x2="44" y2="52" />
            <line x1="76" y1="28" x2="116" y2="28" />
            <line x1="76" y1="40" x2="116" y2="40" />
            <line x1="76" y1="52" x2="108" y2="52" />
          </g>
        </g>

        {/* video lecture card */}
        <g transform="translate(56 96)">
          <rect x="0" y="0" width="150" height="102" rx="12" fill="#173f35" />
          <rect x="10" y="10" width="130" height="68" rx="8" fill="#2c5d4f" />
          <circle cx="75" cy="44" r="16" fill="#e76f3c" />
          <path d="M70 36l12 8-12 8Z" fill="#fffdf7" />
          <rect x="10" y="84" width="76" height="8" rx="4" fill="#f7f1e3" opacity="0.8" />
          <rect x="92" y="84" width="30" height="8" rx="4" fill="#e76f3c" />
        </g>

        {/* skill progress card */}
        <g transform="translate(276 62)">
          <rect x="0" y="0" width="150" height="96" rx="12" fill="#fffdf7" stroke="#ddd2bd" strokeWidth="2" />
          <text x="14" y="22" fontSize="11" fontWeight="700" fill="#173f35" fontFamily="Plus Jakarta Sans, Inter, system-ui, sans-serif">
            Skill growth
          </text>
          <g>
            <rect x="14" y="32" width="122" height="8" rx="4" fill="#f7f1e3" stroke="#ddd2bd" />
            <rect x="14" y="32" width="98" height="8" rx="4" fill="#8fb996" />
            <rect x="14" y="48" width="122" height="8" rx="4" fill="#f7f1e3" stroke="#ddd2bd" />
            <rect x="14" y="48" width="70" height="8" rx="4" fill="#e76f3c" />
            <rect x="14" y="64" width="122" height="8" rx="4" fill="#f7f1e3" stroke="#ddd2bd" />
            <rect x="14" y="64" width="44" height="8" rx="4" fill="#d9a441" />
          </g>
        </g>

        {/* certificate badge */}
        <g transform="translate(120 232)">
          <circle cx="0" cy="0" r="26" fill="#fffdf7" stroke="#e76f3c" strokeWidth="3" />
          <path d="M-8 0l5 5 11-11" stroke="#173f35" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-10 20l-6 14 16-6M10 20l6 14-16-6" fill="#e76f3c" />
        </g>
      </svg>
    </div>
  )
}
