import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { useSessionStore } from '../store/sessionStore'
import { Button } from '../components/ui/button/Button'
import { HeroArt } from '../components/landing/HeroArt'
import { Icon, type IconName } from '../components/ui/icon/Icon'

const JOURNEY: Array<{ step: string; label: string; note: string; icon: IconName }> = [
  { step: '01', label: 'Learn', note: 'Courses, books and video lessons', icon: 'folder' },
  { step: '02', label: 'Practice', note: 'Interactive exercises in a real editor', icon: 'terminal' },
  { step: '03', label: 'Prove', note: 'Timed theory and practical exams', icon: 'clipboard-check' },
  { step: '04', label: 'Interview', note: 'Pass the virtual and technical interviews to unlock the workplace', icon: 'mic' },
  { step: '05', label: 'Work', note: 'A company simulation with real deadlines', icon: 'building' },
  { step: '06', label: 'Certify', note: 'Verifiable certificates and a career report', icon: 'award' }
]

const LEVELS = ['Beginner', 'Learner', 'Trainee', 'Junior', 'Mid-Level', 'Senior']

export function LandingPage(): React.JSX.Element {
  const authenticated = useSessionStore((s) => s.status === 'authenticated')

  return (
    <div className="min-h-dvh bg-bg">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <Link
            to={ROUTES.landing}
            aria-label="Career Lab home"
            className="group inline-flex items-center gap-2.5"
          >
            <span className="font-display text-base font-bold tracking-tight text-primary transition-colors duration-200 group-hover:text-primary-dark">
              Career Lab
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            {authenticated ? (
              <Link to={ROUTES.account}>
                <Button size="sm">My account</Button>
              </Link>
            ) : (
              <>
                <Link to={ROUTES.login}>
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </Link>
                <Link to={ROUTES.register}>
                  <Button size="sm">Get started</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-glow relative overflow-hidden">
          <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/40">
                  Learn · Practice · Prove
                </p>
                <h1 className="mt-4 max-w-3xl text-balance font-display text-[2.15rem] font-bold leading-[1.06] tracking-[-0.035em] text-primary sm:text-4xl md:text-5xl lg:text-[3.4rem]">
                  Learn the work, not just the lessons.
                </h1>
                <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-primary/65 sm:text-lg">
                  Career Lab takes you from watching tutorials to doing the job: study the
                  fundamentals, practice in a real editor, pass exams, join a simulated company,
                  survive interviews — and leave with evidence an employer can verify.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link to={authenticated ? ROUTES.account : ROUTES.register}>
                    <Button size="lg">{authenticated ? 'Continue learning' : 'Start your path'}</Button>
                  </Link>
                  {!authenticated ? (
                    <Link to={ROUTES.login}>
                      <Button variant="secondary" size="lg">
                        Sign in
                      </Button>
                    </Link>
                  ) : null}
                </div>
                <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/40">Learning path</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-primary">10+ gated lessons</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/40">Hands-on</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-primary">Labs & exams in one hub</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/40">Outcome</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-primary">Verifiable certificate</dd>
                  </div>
                </dl>
              </div>
              <HeroArt />
            </div>
          </div>
        </section>

        <section aria-labelledby="journey-heading" className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 id="journey-heading" className="font-display text-2xl font-bold tracking-[-0.03em] text-primary">
              The journey
            </h2>
            <ol className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {JOURNEY.map((item) => (
                <li key={item.step} className="group relative pl-9">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0.5 text-primary/55 transition-colors duration-200 group-hover:text-accent"
                  >
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary/35">Step {item.step}</p>
                  <h3 className="mt-0.5 font-display text-base font-semibold text-primary">{item.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-primary/60">{item.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="ladder-heading" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="ladder-heading" className="font-display text-2xl font-bold tracking-[-0.03em] text-primary">
                The level ladder
              </h2>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary/55">
                <Icon name="shield-check" className="h-3.5 w-3.5 text-accent/80" />
                Evidence-verified gates
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-primary/60">
              Every career is structured as six levels. Each gate is verified on the server — exam
              results, reviewed projects, simulation ratings and interview scores decide when you
              advance.
            </p>
            <ol className="mt-8 space-y-0">
              {LEVELS.map((level, index) => (
                <li key={level} className="flex items-center gap-4 py-1">
                  <span className="font-mono text-xs text-primary/50">L{index + 1}</span>
                  <span className="text-sm font-medium text-primary">{level}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-6 text-xs text-primary/50">
          <span>© 2026 Career Lab</span>
          <span>The platform between tutorials and the job.</span>
        </div>
      </footer>
    </div>
  )
}
