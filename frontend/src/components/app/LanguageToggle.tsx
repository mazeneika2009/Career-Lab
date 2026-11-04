import { useTranslation } from '../../i18n'
import { cn } from '../../utils/cn'

export function LanguageToggle({ tone = 'light' }: { tone?: 'light' | 'dark' }): React.JSX.Element {
  const { language, setLanguage } = useTranslation()
  const next = language === 'en' ? 'ar' : 'en'
  const isDark = tone === 'dark'

  return (
    <button
      type="button"
      onClick={() => setLanguage(next)}
      aria-label={language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
      title={language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
      className={cn(
        'inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors',
        isDark
          ? 'border-surface/20 text-surface/70 hover:border-surface/40 hover:text-surface'
          : 'border-border text-primary/60 hover:border-primary/30 hover:text-primary'
      )}
    >
      <span className={cn(language === 'en' ? 'opacity-100' : 'opacity-40')}>EN</span>
      <span aria-hidden className={isDark ? 'text-surface/30' : 'text-primary/25'}>
        /
      </span>
      <span className={cn(language === 'ar' ? 'opacity-100' : 'opacity-40')}>ع</span>
    </button>
  )
}
