import { describe, expect, it } from 'vitest'
import type { TopicContentData } from '../../../types/domain'
import {
  buildNoteMarkdown,
  buildNotePdf,
  noteFilename,
  noteFilenameForLesson,
  parseRuns
} from './lessonNotes'

function sample(): TopicContentData {
  return {
    topic: {
      publicId: 'topic-1-0',
      title: 'HTML Semantics',
      minutes: 20,
      objectives: ['Write semantic HTML', 'Use landmarks correctly'],
      sections: [
        { heading: 'Why semantics matter', body: 'Semantic tags describe meaning, not appearance.' },
        { heading: 'Landmarks', body: 'Header, nav, main and footer guide assistive tech.' }
      ],
      status: 'in_progress'
    },
    chapter: { publicId: 'c1', title: 'Web Platform Core', stage: 'Beginner' },
    navigation: { previous: null, next: null, position: 1, totalInChapter: 3 },
    resources: {
      links: [
        {
          id: 'l1', kind: 'link', title: 'MDN HTML', url: 'https://developer.mozilla.org/',
          platform: 'MDN', creator: null, durationSec: null, relationship: 'Reference'
        }
      ],
      videos: [],
      tools: [],
      sources: []
    }
  }
}

describe('lesson notes', () => {
  it('builds safe filenames', () => {
    expect(noteFilename('topic-1-0', 'pdf')).toBe('topic-1-0-notes.pdf')
    expect(noteFilename('topic-1-0', 'md')).toBe('topic-1-0-notes.md')
    expect(noteFilename('  Weird ID!! ', 'pdf')).toBe('weird-id-notes.pdf')
  })

  it('names PDFs after the lesson, strictly .pdf', () => {
    expect(noteFilenameForLesson(1, 'HTML Semantics', 'pdf')).toBe('Lesson_01_HTML_Semantics.pdf')
    expect(noteFilenameForLesson(12, 'State & Props: React!', 'pdf')).toBe('Lesson_12_State_Props_React.pdf')
    expect(noteFilenameForLesson(null, 'Intro', 'pdf')).toBe('Intro.pdf')
  })

  it('parses bold and code runs', () => {
    expect(parseRuns('Use **semantic** tags and `<main>` landmarks')).toEqual([
      { text: 'Use ', bold: false, code: false },
      { text: 'semantic', bold: true, code: false },
      { text: ' tags and ', bold: false, code: false },
      { text: '<main>', bold: false, code: true },
      { text: ' landmarks', bold: false, code: false }
    ])
    expect(parseRuns('plain text')).toEqual([{ text: 'plain text', bold: false, code: false }])
  })

  it('builds markdown with title, objectives, sections and links', () => {
    const md = buildNoteMarkdown(sample())
    expect(md).toContain('# HTML Semantics')
    expect(md).toContain('- Write semantic HTML')
    expect(md).toContain('## Why semantics matter')
    expect(md).toContain('[MDN HTML](https://developer.mozilla.org/)')
  })

  it('builds a real PDF containing the lesson title', async () => {
    const bytes = await buildNotePdf(sample(), { compress: false })
    const header = new TextDecoder('ascii').decode(bytes.slice(0, 5))
    expect(header).toBe('%PDF-')
    expect(bytes.length).toBeGreaterThan(1000)
    const raw = new TextDecoder('latin1').decode(bytes)
    expect(raw).toContain('HTML Semantics')
    expect(raw).toContain('Why semantics matter')
  })

  it('renders brand header, markdown styling and code blocks', async () => {
    const d = sample()
    d.topic.sections = [
      { heading: 'Styled', body: 'Use **semantic** tags and `<main>` landmarks.' },
      { heading: 'Code', body: 'Example:\n```html\n<main>\n  <h1>Hi</h1>\n</main>\n```' }
    ]
    const bytes = await buildNotePdf(d, { compress: false, lessonNumber: 1 })
    const raw = new TextDecoder('latin1').decode(bytes)
    expect(raw).toContain('Career Lab')
    expect(raw).toContain('Lesson 01')
    expect(raw).toContain('semantic')
    expect(raw).toContain('Page 1 of 1')
  })

  it('paginates long content instead of overflowing', async () => {
    const d = sample()
    d.topic.sections = Array.from({ length: 30 }, (_, i) => ({
      heading: `Section ${i + 1}`,
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10)
    }))
    const bytes = await buildNotePdf(d, { compress: false })
    const raw = new TextDecoder('latin1').decode(bytes)
    const pages = raw.match(/\/Type\s*\/Page[^s]/g) ?? []
    expect(pages.length).toBeGreaterThan(1)
  })
})
