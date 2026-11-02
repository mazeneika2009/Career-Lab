type WorkMode = 'Remote' | 'Hybrid' | 'On-site'
type EmploymentType =
  | 'Full-time'
  | 'Part-time'
  | 'Contract'
  | 'Internship'
  | 'Freelance'
type ExperienceLevel =
  | 'Internship'
  | 'Entry level'
  | 'Associate'
  | 'Mid level'
  | 'Senior level'
  | 'Lead'
type SourcePlatform = 'LinkedIn' | 'Wuzzuf' | 'Tanqeeb' | 'Bayt' | 'Indeed'

export interface JobCatalogCareer {
  slug: string
  name: string
  roleTitle: string
  companyName: string
  mainSkills: string[]
}

export interface JobCatalogSpec {
  title: string
  companyName: string
  location: string
  workMode: WorkMode
  employmentType: EmploymentType
  experienceLevel: ExperienceLevel
  sourcePlatform: SourcePlatform
  externalUrl: string
  salaryRange: string
  description: string
  skills: string[]
  careerSlugs: string[]
  postedDaysAgo: number
}

interface JobTemplate {
  title: (role: string) => string
  company: string
  city: string
  workMode: WorkMode
  employmentType: EmploymentType
  experienceLevel: ExperienceLevel
  platform: SourcePlatform
  salaryRange: string
  focus: string
  skillOffset: number
  skillCount: number
  postedDaysAgo: number
}

const TEMPLATES: JobTemplate[] = [
  {
    title: (role) => `Junior ${role}`,
    company: 'Nexa Studio',
    city: 'Cairo, Egypt',
    workMode: 'On-site',
    employmentType: 'Full-time',
    experienceLevel: 'Entry level',
    platform: 'Wuzzuf',
    salaryRange: 'EGP 12,000 – 18,000 / month',
    focus: 'ship supervised features, learn the team workflow, and grow through structured code or design reviews',
    skillOffset: 0,
    skillCount: 3,
    postedDaysAgo: 1
  },
  {
    title: (role) => `${role} (Remote)`,
    company: 'Orbit Labs',
    city: 'Remote',
    workMode: 'Remote',
    employmentType: 'Full-time',
    experienceLevel: 'Mid level',
    platform: 'LinkedIn',
    salaryRange: 'EGP 22,000 – 34,000 / month',
    focus: 'own features end to end, collaborate asynchronously, and keep delivery predictable across time zones',
    skillOffset: 1,
    skillCount: 4,
    postedDaysAgo: 2
  },
  {
    title: (role) => `${role} — Contract`,
    company: 'Bluegate Consulting',
    city: 'Giza, Egypt',
    workMode: 'Hybrid',
    employmentType: 'Contract',
    experienceLevel: 'Mid level',
    platform: 'Tanqeeb',
    salaryRange: 'EGP 25,000 – 40,000 / month',
    focus: 'deliver a time-boxed client engagement, communicate trade-offs clearly, and leave maintainable handover documentation',
    skillOffset: 2,
    skillCount: 3,
    postedDaysAgo: 3
  },
  {
    title: (role) => `${role} (Part-time)`,
    company: 'Rampline',
    city: 'Remote',
    workMode: 'Remote',
    employmentType: 'Part-time',
    experienceLevel: 'Entry level',
    platform: 'Bayt',
    salaryRange: 'EGP 8,000 – 12,000 / month',
    focus: 'support a small product team on a flexible schedule while building a stronger professional portfolio',
    skillOffset: 0,
    skillCount: 2,
    postedDaysAgo: 4
  },
  {
    title: (role) => `Senior ${role}`,
    company: 'Northstar Digital',
    city: 'Cairo, Egypt',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experienceLevel: 'Senior level',
    platform: 'Indeed',
    salaryRange: 'EGP 38,000 – 58,000 / month',
    focus: 'lead complex delivery, mentor teammates, and raise the technical bar through design and review practice',
    skillOffset: 2,
    skillCount: 5,
    postedDaysAgo: 5
  },
  {
    title: (role) => `Freelance ${role}`,
    company: 'Talent Pool',
    city: 'Remote',
    workMode: 'Remote',
    employmentType: 'Freelance',
    experienceLevel: 'Mid level',
    platform: 'LinkedIn',
    salaryRange: 'EGP 300 – 600 / hour',
    focus: 'take short client projects, scope work transparently, and deliver polished outcomes against clear acceptance criteria',
    skillOffset: 1,
    skillCount: 3,
    postedDaysAgo: 6
  },
  {
    title: (role) => `${role} Trainee`,
    company: 'Career Lab Talent Network',
    city: 'Alexandria, Egypt',
    workMode: 'On-site',
    employmentType: 'Internship',
    experienceLevel: 'Internship',
    platform: 'Wuzzuf',
    salaryRange: 'EGP 5,000 – 8,000 / month',
    focus: 'complete a paid training rotation with weekly feedback, paired tasks, and a portfolio-ready final project',
    skillOffset: 0,
    skillCount: 4,
    postedDaysAgo: 7
  },
  {
    title: (role) => `${role} Specialist`,
    company: 'Cedar & Co',
    city: 'Remote',
    workMode: 'Remote',
    employmentType: 'Full-time',
    experienceLevel: 'Associate',
    platform: 'Tanqeeb',
    salaryRange: 'EGP 18,000 – 26,000 / month',
    focus: 'specialize in the team’s highest-impact workstream while partnering with product, design, and operations',
    skillOffset: 3,
    skillCount: 3,
    postedDaysAgo: 8
  },
  {
    title: (role) => `Lead ${role}`,
    company: 'Signal Foundry',
    city: 'Cairo, Egypt',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experienceLevel: 'Lead',
    platform: 'Bayt',
    salaryRange: 'EGP 52,000 – 78,000 / month',
    focus: 'shape the roadmap, coach a cross-functional team, and own quality signals from discovery to release',
    skillOffset: 1,
    skillCount: 5,
    postedDaysAgo: 9
  },
  {
    title: (role) => `${role} — Graduate Program`,
    company: 'Meridian Tech',
    city: 'Cairo, Egypt',
    workMode: 'On-site',
    employmentType: 'Full-time',
    experienceLevel: 'Entry level',
    platform: 'LinkedIn',
    salaryRange: 'EGP 14,000 – 20,000 / month',
    focus: 'rotate across squads, pair with senior practitioners, and build production experience in a structured graduate track',
    skillOffset: 2,
    skillCount: 3,
    postedDaysAgo: 10
  },
  {
    title: (role) => `${role} (Hybrid)`,
    company: 'Lumen Works',
    city: 'Giza, Egypt',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experienceLevel: 'Mid level',
    platform: 'Indeed',
    salaryRange: 'EGP 24,000 – 36,000 / month',
    focus: 'balance focused remote work with in-person collaboration while improving the team’s delivery practice',
    skillOffset: 1,
    skillCount: 4,
    postedDaysAgo: 11
  },
  {
    title: (role) => `${role} Consultant`,
    company: 'Atlas Advisory',
    city: 'Remote',
    workMode: 'Remote',
    employmentType: 'Contract',
    experienceLevel: 'Senior level',
    platform: 'LinkedIn',
    salaryRange: 'EGP 45,000 – 65,000 / month',
    focus: 'advise client teams, translate ambiguous requirements into delivery plans, and protect quality under real constraints',
    skillOffset: 3,
    skillCount: 5,
    postedDaysAgo: 12
  }
]

function searchUrl(
  platform: SourcePlatform,
  title: string,
  level: string,
  location: string
): string {
  const keywords = encodeURIComponent(`${title} ${level}`)
  const place = encodeURIComponent(location)
  switch (platform) {
    case 'Wuzzuf':
      return `https://wuzzuf.net/search/jobs/?q=${keywords}`
    case 'Tanqeeb':
      return `https://www.tanqeeb.com/en/jobs?q=${keywords}`
    case 'Bayt':
      return `https://www.bayt.com/en/jobs/?q=${keywords}&l=${place}`
    case 'Indeed':
      return `https://www.indeed.com/jobs?q=${keywords}&l=${place}`
    case 'LinkedIn':
    default:
      return `https://www.linkedin.com/jobs/search/?keywords=${keywords}&location=${place}`
  }
}

function pickSkills(skills: string[], offset: number, count: number): string[] {
  if (skills.length === 0) return []
  const picked: string[] = []
  for (let index = 0; index < Math.min(count, skills.length); index += 1) {
    picked.push(skills[(offset + index) % skills.length] as string)
  }
  return picked
}

export function buildJobCatalog(career: JobCatalogCareer): JobCatalogSpec[] {
  const role = career.roleTitle || career.name
  return TEMPLATES.map((template) => {
    const skills = pickSkills(career.mainSkills, template.skillOffset, template.skillCount)
    const title = template.title(role)
    const skillPhrase = skills.length > 0 ? skills.join(', ') : career.mainSkills.slice(0, 3).join(', ')
    return {
      title,
      companyName: template.company,
      location: template.city,
      workMode: template.workMode,
      employmentType: template.employmentType,
      experienceLevel: template.experienceLevel,
      sourcePlatform: template.platform,
      externalUrl: searchUrl(template.platform, title, template.experienceLevel, template.city),
      salaryRange: template.salaryRange,
      description: `${template.company} is hiring a ${title}. In this role you will ${template.focus}. Candidates should be comfortable demonstrating ${skillPhrase || 'the core skills for this career'} in a practical portfolio or interview exercise.`,
      skills,
      careerSlugs: [career.slug],
      postedDaysAgo: template.postedDaysAgo
    }
  })
}
