import type { ReactNode } from 'react'

/**
 * Career Lab line-icon set.
 *
 * A single, consistent 24px line family (1.75 stroke, rounded joins) used for
 * navigation, section identity and quiet status cues. Every icon inherits
 * `currentColor`, so it stays inside the existing palette.
 */
export type IconName =
  | 'dashboard'
  | 'route'
  | 'compass'
  | 'layers'
  | 'book-open'
  | 'book'
  | 'video'
  | 'clipboard-check'
  | 'terminal'
  | 'file-text'
  | 'message-square'
  | 'bar-chart'
  | 'milestone'
  | 'trending-up'
  | 'file-chart'
  | 'building'
  | 'check-square'
  | 'users'
  | 'headset'
  | 'calendar-clock'
  | 'git-branch'
  | 'mic'
  | 'folder'
  | 'award'
  | 'shield-check'
  | 'target'
  | 'user'
  | 'bell'
  | 'shield'
  | 'search'
  | 'menu'
  | 'close'
  | 'log-out'
  | 'arrow-right'
  | 'arrow-left'
  | 'check'
  | 'check-circle'
  | 'circle'
  | 'clock'
  | 'alert-triangle'
  | 'play'
  | 'graduation-cap'
  | 'lightbulb'
  | 'zap'
  | 'lock'
  | 'calendar'

const ICONS = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="19" r="2.5" />
      <path d="M8.5 19h8a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="2.5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.4 8.6-2 5.2-5.2 2 2-5.2 5.2-2Z" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </>
  ),
  'book-open': (
    <>
      <path d="M12 6.5c-2-1.8-5-2.2-8-1.4v13c3-.8 6-.4 8 1.4 2-1.8 5-2.2 8-1.4v-13c-3-.8-6-.4-8 1.4Z" />
      <path d="M12 6.5v13" />
    </>
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      <path d="M8 7h8" />
    </>
  ),
  video: (
    <>
      <rect x="2" y="5" width="14" height="14" rx="2.5" />
      <path d="m22 8-6 4 6 4V8Z" />
    </>
  ),
  'clipboard-check': (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 3h6v3H9z" />
      <path d="m9 13 2 2 4-4" />
    </>
  ),
  terminal: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="m7 9 3 3-3 3" />
      <path d="M13 15h4" />
    </>
  ),
  'file-text': (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h6" />
    </>
  ),
  'message-square': (
    <>
      <path d="M21 15a3 3 0 0 1-3 3H8l-5 4V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3Z" />
      <path d="M8 8h8" />
      <path d="M8 12h5" />
    </>
  ),
  'bar-chart': (
    <>
      <path d="M3 21h18" />
      <path d="M6 21v-6" />
      <path d="M12 21V8" />
      <path d="M18 21V4" />
    </>
  ),
  milestone: (
    <>
      <path d="M12 3v18" />
      <path d="M12 7h7.5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H12" />
      <path d="M12 14H4.5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1H12" />
    </>
  ),
  'trending-up': (
    <>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  'file-chart': (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M8 17v-3" />
      <path d="M12 17v-5" />
      <path d="M16 17v-2" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16" />
      <path d="M17 9h3a1 1 0 0 1 1 1v11" />
      <path d="M2 21h20" />
      <path d="M8 7h1" />
      <path d="M8 11h1" />
      <path d="M8 15h1" />
      <path d="M12 7h1" />
      <path d="M12 11h1" />
      <path d="M12 15h1" />
    </>
  ),
  'check-square': (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
      <path d="M16 3.1a4 4 0 0 1 0 7.8" />
    </>
  ),
  headset: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M18 19c0 1.7-2.7 3-6 3" />
      <rect x="2" y="13" width="4" height="7" rx="1.5" />
      <rect x="18" y="13" width="4" height="7" rx="1.5" />
    </>
  ),
  'calendar-clock': (
    <>
      <path d="M21 9V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5" />
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M3 10h18" />
      <circle cx="18" cy="17" r="4" />
      <path d="M18 15.5V17l1 1" />
    </>
  ),
  'git-branch': (
    <>
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M6 15V9a3 3 0 0 1 3-3h6" />
      <path d="M18 9v3a3 3 0 0 1-3 3H9" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <path d="M12 17v5" />
      <path d="M8 22h8" />
    </>
  ),
  folder: (
    <>
      <path d="M4 4h5l2 3h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M2 10h20" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="5" />
      <path d="m8.5 12.5-1.3 8 4.8-2.8 4.8 2.8-1.3-8" />
      <path d="m10 8 1.4 1.4L14 6.8" />
    </>
  ),
  'shield-check': (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  menu: (
    <>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </>
  ),
  close: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  'log-out': (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  'arrow-left': (
    <>
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </>
  ),
  circle: <circle cx="12" cy="12" r="8" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  'alert-triangle': (
    <>
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </>
  ),
  play: <path d="m8 5 11 7-11 7V5Z" />,
  'graduation-cap': (
    <>
      <path d="m2 10 10-5 10 5-10 5-10-5Z" />
      <path d="M6 12v5c0 1.7 3 3 6 3s6-1.3 6-3v-5" />
      <path d="M22 10v6" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M8.5 14.5A6 6 0 1 1 15.5 14.5c-.9.7-1.5 1.6-1.5 3.5h-4c0-1.9-.6-2.8-1.5-3.5Z" />
    </>
  ),
  zap: <path d="M13 2 3 14h8l-1 8 11-13h-8l1-7Z" />,
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M3 10h18" />
    </>
  )
} satisfies Record<IconName, ReactNode>

export function Icon({
  name,
  className = 'h-4 w-4',
  title
}: {
  name: IconName
  className?: string
  title?: string
}): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {ICONS[name]}
    </svg>
  )
}
