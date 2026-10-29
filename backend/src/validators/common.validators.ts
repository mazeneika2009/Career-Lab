function buildSupportedTimezones(): readonly string[] {
  try {
    const list = Intl.supportedValuesOf('timeZone')
    return Array.from(list)
  } catch {
    return ['UTC']
  }
}

export const SUPPORTED_TIMEZONES = buildSupportedTimezones()
