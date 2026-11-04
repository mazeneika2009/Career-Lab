import { describe, expect, it } from 'vitest'
import { getAuthoredCareers } from '../src/content/index.js'
import { practicalEnvironmentFor } from '../src/content/practical-environments.js'

describe('practical exam environments', () => {
  it('provisions an environment for every supported authored career', () => {
    const careers = getAuthoredCareers()

    expect(careers.length).toBeGreaterThanOrEqual(40)
    for (const career of careers) {
      const profile = practicalEnvironmentFor(career)
      expect(profile.environment, career.slug).toMatch(/^(code|database|design|network|ai|business|writing)$/)
      expect(profile.language, career.slug).toBeTruthy()
      expect(profile.languageLabel, career.slug).toBeTruthy()
    }
  })

  it.each([
    ['frontend-developer', 'code'],
    ['database-administrator', 'database'],
    ['ui-designer', 'design'],
    ['network-engineer', 'network'],
    ['machine-learning-engineer', 'ai'],
    ['digital-marketing-specialist', 'business'],
    ['technical-writer', 'writing']
  ])('routes %s to the %s workspace', (slug, environment) => {
    const career = getAuthoredCareers().find((entry) => entry.slug === slug)

    expect(career).toBeDefined()
    expect(practicalEnvironmentFor(career!).environment).toBe(environment)
  })
})
