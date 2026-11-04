import { describe, expect, it } from 'vitest'
import { buildJobCatalog, type JobCatalogCareer } from '../src/content/job-catalog.js'

const career: JobCatalogCareer = {
  slug: 'full-stack-developer',
  name: 'Full Stack Developer',
  roleTitle: 'Senior Senior Full Stack Consultant',
  companyName: 'Career Lab',
  mainSkills: ['TypeScript', 'React', 'Node.js']
}

describe('job catalog seniority mapping', () => {
  it('uses one consistent seniority in titles, levels, search URLs and descriptions', () => {
    const jobs = buildJobCatalog(career)

    for (const job of jobs) {
      const seniority =
        job.experienceLevel === 'Internship' || job.experienceLevel === 'Entry level'
          ? 'Junior'
          : job.experienceLevel === 'Associate' || job.experienceLevel === 'Mid level'
            ? 'Mid'
            : 'Senior'

      expect(job.title).toMatch(new RegExp(`^${seniority} `))
      expect(job.title).not.toMatch(/^(Junior|Mid|Senior) (Junior|Mid|Senior) /)
      expect(job.description).toContain(`hiring a ${job.title}.`)
      const url = new URL(job.externalUrl)
      const query = url.searchParams.get('q') ?? url.searchParams.get('keywords') ?? ''
      expect(decodeURIComponent(query.replace(/\+/g, ' '))).toContain(job.title)
    }
  })

  it('strips repeated seniority prefixes from the base career role', () => {
    const jobs = buildJobCatalog(career)
    expect(jobs.find((job) => job.experienceLevel === 'Senior level')?.title).toBe(
      'Senior Full Stack Consultant'
    )
    expect(jobs.find((job) => job.experienceLevel === 'Mid level')?.title).toBe(
      'Mid Full Stack Consultant (Remote)'
    )
  })
})
