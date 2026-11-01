import { useEffect, useRef, useState } from 'react'

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]): {
  data: T | null
  loading: boolean
  error: unknown
  reload: () => void
  setData: (data: T | null) => void
} {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const [nonce, setNonce] = useState(0)
  const prevNonceRef = useRef(nonce)

  useEffect(() => {
    let alive = true
    // A parameter change starts a fresh load; an explicit reload keeps the
    // current view mounted so interactions never blank out the page.
    const isReload = prevNonceRef.current !== nonce
    prevNonceRef.current = nonce
    if (!isReload) setLoading(true)
    setError(null)
    fn()
      .then((d) => {
        if (alive) setData(d)
      })
      .catch((e) => {
        if (alive) setError(e)
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce])

  return { data, loading, error, reload: () => setNonce((n) => n + 1), setData }
}

export function isNoCareerError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code?: string }).code === 'NO_CAREER_SELECTED'
  )
}
