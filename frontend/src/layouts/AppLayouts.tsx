import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { logoutCurrentSession } from '../services/api-client'
import { useSessionStore } from '../store/sessionStore'
import { Button } from '../components/ui/button/Button'
import { Icon } from '../components/ui/icon/Icon'
import { useSimulationGate } from '../hooks/useSimulationGate'
import { useCertificateGate } from '../hooks/useCertificateGate'
import { useTranslation } from '../i18n'
import { LanguageToggle } from '../components/app/LanguageToggle'
import { cn } from '../utils/cn'
import { isNavItemLocked, navLockHint, type WorkAccess } from './workplaceAccess'

type NavAccess = WorkAccess | 'jobHub'

const NAV_GROUPS: Array<{
  labelKey: string
  items: Array<{ to: string; labelKey: string; access?: NavAccess }>
}> = [
  {
    labelKey: 'nav.learn',
    items: [
      { to: ROUTES.dashboard, labelKey: 'nav.dashboard' },
      { to: ROUTES.learn, labelKey: 'nav.course' },
      { to: ROUTES.learningPath, labelKey: 'nav.learningPath' }
    ]
  },
  {
    labelKey: 'nav.assess',
    items: [
      { to: ROUTES.assignments, labelKey: 'nav.assignments' },
      { to: ROUTES.evaluations, labelKey: 'nav.evaluations' }
    ]
  },
  {
    labelKey: 'nav.grow',
    items: [
      { to: ROUTES.skills, labelKey: 'nav.skills' },
      { to: ROUTES.roadmap, labelKey: 'nav.roadmap' },
      { to: ROUTES.performanceReview, labelKey: 'nav.performanceReview' },
      { to: ROUTES.careerReport, labelKey: 'nav.careerReport' }
    ]
  },
  {
    labelKey: 'nav.work',
    items: [
      { to: ROUTES.virtualInterview, labelKey: 'nav.virtualInterview' },
      { to: ROUTES.technicalInterview, labelKey: 'nav.technicalInterview', access: 'technical' },
      // These two deliberately share the same access level: passing the
      // technical interview unlocks Company Simulation and Team Communication
      // at the exact same moment.
      { to: ROUTES.simulation, labelKey: 'nav.simulation', access: 'workplace' },
      { to: ROUTES.teamCommunication, labelKey: 'nav.teamCommunication', access: 'workplace' },
      { to: ROUTES.clientCommunication, labelKey: 'nav.clientCommunication', access: 'simulation' },
      { to: ROUTES.deadlines, labelKey: 'nav.deadlines', access: 'simulation' },
      { to: ROUTES.scenarios, labelKey: 'nav.scenarios', access: 'simulation' }
    ]
  },
  {
    labelKey: 'nav.prove',
    items: [
      { to: ROUTES.portfolio, labelKey: 'nav.portfolio' },
      { to: ROUTES.certificate, labelKey: 'nav.certificate' },
      { to: ROUTES.readiness, labelKey: 'nav.readiness' }
    ]
  },
  {
    labelKey: 'nav.launch',
    items: [
      { to: ROUTES.jobHub, labelKey: 'nav.jobHub', access: 'jobHub' }
    ]
  },
  {
    labelKey: 'nav.account',
    items: [
      { to: ROUTES.careers, labelKey: 'nav.careerSelection' },
      { to: ROUTES.profile, labelKey: 'nav.profile' },
      { to: ROUTES.notifications, labelKey: 'nav.notifications' },
      { to: ROUTES.security, labelKey: 'nav.security' }
    ]
  }
]

function Brand({ tone = 'dark', onClick }: { tone?: 'light' | 'dark'; onClick?: () => void }): React.JSX.Element {
  const isDark = tone === 'dark'
  return (
    <Link to={ROUTES.dashboard} onClick={onClick} className="group inline-flex min-w-0 items-center gap-2">
      <span
        className={`truncate font-display text-[15px] font-bold tracking-tight ${
          isDark ? 'text-surface' : 'text-primary'
        }`}
      >
        Career Lab
      </span>
    </Link>
  )
}

function NavItem({
  item,
  locked = false,
  lockHint,
  onNavigate
}: {
  item: { to: string; labelKey: string; access?: NavAccess }
  locked?: boolean
  lockHint?: string
  onNavigate?: () => void
}): React.JSX.Element {
  const { t } = useTranslation()

  if (locked) {
    return (
      <div
        aria-disabled="true"
        title={lockHint}
        className="flex cursor-not-allowed select-none items-center rounded-md py-2 pl-3 pr-2.5 text-sm text-surface/35"
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">
          <span className="truncate">{t(item.labelKey)}</span>
          <span className="ml-auto flex shrink-0 items-center gap-1 text-[10px] font-medium uppercase tracking-[0.08em] text-surface/25">
            <Icon name="lock" className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">{t('common.locked')}</span>
          </span>
        </span>
      </div>
    )
  }

  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `group relative flex items-center rounded-md py-2 pl-3 pr-2.5 text-sm transition-colors duration-150 ${
          isActive
            ? 'bg-surface/15 font-medium text-surface'
            : 'text-surface/65 hover:bg-surface/10 hover:text-surface'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            aria-hidden
            className={`absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full bg-accent transition-opacity duration-150 ${
              isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
            }`}
          />
          <span className="flex min-w-0 flex-1 items-center gap-2">
            <span className="truncate">{t(item.labelKey)}</span>
          </span>
        </>
      )}
    </NavLink>
  )
}

function NavGroups({ onNavigate }: { onNavigate?: () => void }): React.JSX.Element {
  const location = useLocation()
  const { t } = useTranslation()
  const { gate } = useSimulationGate(location.pathname)
  const certificateRefreshKey =
    location.pathname === ROUTES.certificate || location.pathname === ROUTES.jobHub
      ? location.pathname
      : null
  const certificate = useCertificateGate(certificateRefreshKey)

  return (
    <>
      {NAV_GROUPS.map((group) => (
        <div key={group.labelKey}>
          <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-surface/35">
            {t(group.labelKey)}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const jobHubLocked = item.access === 'jobHub' && !certificate.issued
              const locked =
                item.access === 'jobHub'
                  ? jobHubLocked
                  : isNavItemLocked(item.access, gate)
              const lockHint =
                item.access === 'jobHub'
                  ? certificate.loading
                    ? t('nav.checkingCertificate')
                    : t('nav.jobHubLocked')
                  : navLockHint(item.access, gate)
              return (
                <li key={item.to}>
                  <NavItem
                    item={item}
                    locked={locked}
                    lockHint={lockHint}
                    onNavigate={onNavigate}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </>
  )
}

export function AuthLayout(): React.JSX.Element {
  const status = useSessionStore((s) => s.status)
  const { t } = useTranslation()

  if (status === 'authenticated') {
    return <Navigate to={ROUTES.dashboard} replace />
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-bg">
      <div aria-hidden className="auth-glow pointer-events-none absolute inset-0 overflow-hidden" />

      <header className="relative z-10 border-b border-border bg-surface/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
          <Link to={ROUTES.landing} className="group inline-flex items-center gap-2">
            <span className="font-display text-[15px] font-bold tracking-tight text-primary">Career Lab</span>
          </Link>
          <div className="flex items-center gap-3">
            <NavLink to={ROUTES.landing} className="text-sm text-primary/55 transition-colors hover:text-primary">
              {t('common.home')}
            </NavLink>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-12 sm:py-16">
        <Outlet />
      </main>
    </div>
  )
}

export function AppShellLayout(): React.JSX.Element {
  const user = useSessionStore((s) => s.user)
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const isCoursePlayer = location.pathname === ROUTES.learn
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const asideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusables.length === 0) return

      const first = focusables[0]!
      const last = focusables[focusables.length - 1]!
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      menuButtonRef.current?.focus()
    }
  }, [mobileOpen])

  const handleSignOut = async (): Promise<void> => {
    await logoutCurrentSession()
    navigate(ROUTES.login, { replace: true })
  }

  const initials = user?.displayName
    ? user.displayName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('')
    : ''

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <aside
        ref={asideRef}
        className={`border-b border-border bg-primary transition-all duration-300 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:shrink-0 lg:flex-col lg:border-b-0 lg:border-r ${
          sidebarCollapsed ? 'lg:w-0 lg:overflow-hidden lg:border-r-0' : 'lg:w-64'
        }`}
      >
        <div className="flex h-14 shrink-0 items-center gap-3 px-4 lg:border-b lg:border-surface/10">
          <Brand tone="dark" />
        </div>

        <nav
          aria-label="Main"
          className="no-scrollbar hidden min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-3 pb-4 pt-4 lg:flex"
        >
          <NavGroups />
        </nav>

        <div className="hidden border-t border-surface/10 p-3 lg:block">
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-surface/35">
              {t('language.switch')}
            </span>
            <LanguageToggle tone="dark" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void handleSignOut()}
            className="w-full justify-start text-surface/70 hover:bg-surface/10 hover:text-surface"
          >
            <Icon name="log-out" className="h-4 w-4" />
            {t('common.signOut')}
          </Button>
        </div>
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="overlay-enter absolute inset-0 h-full w-full cursor-default bg-primary/45 backdrop-blur-[2px]"
          />
          <div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            className="drawer-enter relative flex h-full w-[min(19rem,88vw)] flex-col bg-primary shadow-2xl"
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-surface/10 px-4">
              <Brand tone="dark" onClick={() => setMobileOpen(false)} />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
                className="flex h-9 w-9 items-center justify-center rounded-md text-surface/75 transition-colors hover:bg-surface/10 hover:text-surface"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="no-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto px-3 py-4">
              <NavGroups onNavigate={() => setMobileOpen(false)} />
            </nav>

            <div className="shrink-0 border-t border-surface/10 p-3">
              {user ? (
                <Link
                  to={ROUTES.profile}
                  onClick={() => setMobileOpen(false)}
                  aria-label={`Open your profile, ${user.displayName}`}
                  className="mb-2 flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors duration-150 hover:bg-surface/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface/10 font-display text-[10px] font-semibold text-surface/80">
                    {initials || <Icon name="user" className="h-3.5 w-3.5" />}
                  </span>
                  <span className="truncate text-xs text-surface/60">{user.displayName}</span>
                </Link>
              ) : null}
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-surface/35">
                  {t('language.switch')}
                </span>
                <LanguageToggle tone="dark" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => void handleSignOut()}
                className="w-full justify-start text-surface/70 hover:bg-surface/10 hover:text-surface"
              >
                <Icon name="log-out" className="h-4 w-4" />
                {t('common.signOut')}
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-surface/95 px-4 lg:px-4 backdrop-blur supports-[backdrop-filter]:bg-surface/85">
          <div className="flex min-w-0 items-center gap-2.5">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className="-ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-primary/70 transition-colors hover:bg-primary/5 hover:text-primary lg:hidden"
            >
              <Icon name="menu" className="h-5 w-5" />
            </button>
            <p className="hidden truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/45 md:block">
              {t('nav.tagline')}
            </p>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <LanguageToggle />
            {/* Collapsible sidebar toggle button (desktop only) */}
            <button
              type="button"
              onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
              aria-label={sidebarCollapsed ? 'Expand navigation' : 'Collapse navigation'}
              aria-expanded={!sidebarCollapsed}
              className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-md text-primary/70 transition-colors hover:bg-primary/5 hover:text-primary lg:flex"
            >
              <Icon name={sidebarCollapsed ? 'menu' : 'arrow-left'} className="h-5 w-5" />
            </button>

            {user ? (
              <Link
                to={ROUTES.profile}
                title="View your profile"
                aria-label={`Open your profile, ${user.displayName}`}
                className="group flex min-w-0 cursor-pointer items-center gap-2.5 rounded-full py-1 pl-1 pr-1 transition-opacity duration-150 hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:pr-2"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-primary/5 font-display text-[10px] font-bold text-primary transition-colors duration-150 group-hover:border-primary/25 group-hover:bg-primary/10">
                  {initials || <Icon name="user" className="h-4 w-4" />}
                </span>
                <span className="hidden max-w-[12rem] truncate text-sm font-medium text-primary transition-colors duration-150 group-hover:text-accent sm:block">
                  {user.displayName}
                </span>
              </Link>
            ) : null}
          </div>
        </header>

        <main
          className={cn(
            'mx-auto w-full flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8',
            isCoursePlayer ? 'max-w-[1440px]' : 'max-w-5xl'
          )}
        >
          <div key={location.pathname} className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}