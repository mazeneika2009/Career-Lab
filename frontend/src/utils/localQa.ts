export function isLocalQaMode(): boolean {
  return (
    import.meta.env.DEV &&
    import.meta.env.MODE !== 'test' &&
    import.meta.env.VITE_LOCAL_QA_MODE === 'true'
  )
}
