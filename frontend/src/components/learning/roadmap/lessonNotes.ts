import type { jsPDF } from 'jspdf'
import type { TopicContentData } from '../../../types/domain'

const PRIMARY: [number, number, number] = [23, 63, 53]
const ACCENT: [number, number, number] = [231, 111, 60]
const INK: [number, number, number] = [30, 30, 30]
const MUTED: [number, number, number] = [110, 110, 110]
const CODE_BG: [number, number, number] = [244, 241, 234]

/** `Lesson_01_HTML_Semantics.pdf` — readable, lesson-titled, strictly .pdf/.md. */
export function noteFilenameForLesson(
  lessonNumber: number | null,
  title: string,
  ext: 'md' | 'pdf'
): string {
  const clean = title
    .replace(/[^A-Za-z0-9 ]+/g, ' ')
    .trim()
    .split(/\s+/)
    .join('_')
    .slice(0, 48) || 'Notes'
  const prefix = lessonNumber ? `Lesson_${String(lessonNumber).padStart(2, '0')}_` : ''
  return `${prefix}${clean}.${ext}`
}

/** Legacy id-based filename (kept for compatibility). */
export function noteFilename(topicPublicId: string, ext: 'md' | 'pdf'): string {
  const slug =
    topicPublicId
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'lesson-notes'
  return `${slug}-notes.${ext}`
}

/** Markdown version of the lesson notes. */
export function buildNoteMarkdown(d: TopicContentData): string {
  const lines = [
    `# ${d.topic.title}`,
    '',
    `Chapter: ${d.chapter.title} · ${d.topic.minutes} min`,
    '',
    '## Objectives',
    '',
    ...d.topic.objectives.map((o) => `- ${o}`),
    ''
  ]
  for (const s of d.topic.sections) {
    lines.push(`## ${s.heading}`, '', s.body, '')
  }
  if (d.resources.links.length > 0) {
    lines.push('## Further reading', '')
    for (const r of d.resources.links) lines.push(`- [${r.title}](${r.url})`)
    lines.push('')
  }
  return lines.join('\n')
}

/* ------------------------- rich PDF rendering ---------------------------- */

interface TextRun {
  text: string
  bold: boolean
  code: boolean
}

/** Split `**bold**` and `` `code` `` spans into styled runs. */
export function parseRuns(text: string): TextRun[] {
  const runs: TextRun[] = []
  const re = /(\*\*.+?\*\*|`[^`]+`)/g
  let last = 0
  for (const m of text.matchAll(re)) {
    const idx = m.index ?? 0
    if (idx > last) runs.push({ text: text.slice(last, idx), bold: false, code: false })
    const token = m[0]
    if (token.startsWith('**')) runs.push({ text: token.slice(2, -2), bold: true, code: false })
    else runs.push({ text: token.slice(1, -1), bold: false, code: true })
    last = idx + token.length
  }
  if (last < text.length) runs.push({ text: text.slice(last), bold: false, code: false })
  return runs.filter((r) => r.text.length > 0)
}

interface PdfContext {
  doc: jsPDF
  pageWidth: number
  pageHeight: number
  margin: number
  maxWidth: number
  y: number
  headerTitle: string
}

function ctx(doc: jsPDF, headerTitle: string): PdfContext {
  return {
    doc,
    pageWidth: doc.internal.pageSize.getWidth(),
    pageHeight: doc.internal.pageSize.getHeight(),
    margin: 15,
    maxWidth: doc.internal.pageSize.getWidth() - 30,
    y: 18,
    headerTitle
  }
}

function paintHeader(c: PdfContext): void {
  const { doc, margin, pageWidth } = c
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(...ACCENT)
  doc.text('Career Lab', margin, 11)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...MUTED)
  const right = doc.splitTextToSize(c.headerTitle, 110) as string[]
  doc.text(right[0] ?? '', pageWidth - margin, 11, { align: 'right' })
  doc.setDrawColor(221, 210, 189)
  doc.setLineWidth(0.4)
  doc.line(margin, 13.5, pageWidth - margin, 13.5)
  c.y = 20
}

function newPage(c: PdfContext): void {
  c.doc.addPage()
  paintHeader(c)
}

function need(c: PdfContext, height: number): void {
  if (c.y + height > c.pageHeight - 16) newPage(c)
}

function setRunFont(c: PdfContext, run: TextRun, size: number): void {
  c.doc.setFont(run.code ? 'courier' : 'helvetica', run.bold && !run.code ? 'bold' : 'normal')
  c.doc.setFontSize(run.code ? Math.max(8, size - 1) : size)
}

/** Wrapped paragraph honoring bold/code runs. */
function richParagraph(c: PdfContext, text: string, size = 11, indent = 0): void {
  const words: Array<{ word: string; run: TextRun }> = []
  for (const run of parseRuns(text)) {
    for (const w of run.text.split(/(\s+)/)) {
      if (w.length > 0) words.push({ word: w, run })
    }
  }
  const x0 = c.margin + indent
  const width = c.maxWidth - indent
  let line: typeof words = []
  let lineWidth = 0
  const flush = (): void => {
    if (line.length === 0) return
    need(c, size * 0.55)
    let x = x0
    for (const { word, run } of line) {
      setRunFont(c, run, size)
      c.doc.setTextColor(...INK)
      c.doc.text(word, x, c.y)
      x += c.doc.getTextWidth(word)
    }
    c.y += size * 0.55
    line = []
    lineWidth = 0
  }
  for (const item of words) {
    setRunFont(c, item.run, size)
    const w = c.doc.getTextWidth(item.word)
    if (lineWidth + w > width && line.length > 0) flush()
    // Skip leading whitespace at line starts.
    if (line.length === 0 && /^\s+$/.test(item.word)) continue
    line.push(item)
    lineWidth += w
  }
  flush()
  c.y += 2
}

function heading(c: PdfContext, text: string): void {
  need(c, 11)
  c.doc.setFont('helvetica', 'bold')
  c.doc.setFontSize(13)
  c.doc.setTextColor(...PRIMARY)
  for (const line of c.doc.splitTextToSize(text, c.maxWidth) as string[]) {
    need(c, 7)
    c.doc.text(line, c.margin, c.y)
    c.y += 7
  }
  c.y += 1
}

/** Fenced code block: monospace on a shaded panel, page-break safe. */
function codeBlock(c: PdfContext, code: string): void {
  c.doc.setFont('courier', 'normal')
  c.doc.setFontSize(9.5)
  const rawLines: string[] = []
  for (const src of code.split('\n')) {
    const wrapped = c.doc.splitTextToSize(src || ' ', c.maxWidth - 6) as string[]
    rawLines.push(...wrapped)
  }
  const lineH = 5
  const pad = 2.5
  let i = 0
  while (i < rawLines.length) {
    need(c, lineH + pad * 2)
    const startY = c.y
    c.doc.setFillColor(...CODE_BG)
    // Fill as lines are drawn so a block can span pages.
    let drawn = 0
    const top = c.y + pad
    while (i < rawLines.length) {
      if (c.y + lineH > c.pageHeight - 16) break
      drawn += 1
      i += 1
      c.y += lineH
    }
    const h = drawn * lineH + pad * 2
    c.doc.rect(c.margin, startY, c.maxWidth, h, 'F')
    c.doc.setTextColor(...INK)
    // Re-draw text over the panel (positions recomputed deterministically).
    let ty = top
    for (let k = i - drawn; k < i; k++) {
      c.doc.text(rawLines[k] ?? '', c.margin + 3, ty)
      ty += lineH
    }
    c.y += pad + 2
  }
}

/** Body text supporting fenced ``` code blocks between prose. */
function richBody(c: PdfContext, text: string): void {
  const parts = text.split(/```/)
  parts.forEach((part, idx) => {
    if (idx % 2 === 1) {
      codeBlock(c, part.replace(/^\w+\n/, '').trim())
    } else if (part.trim().length > 0) {
      for (const para of part.split(/\n{2,}|\n/)) {
        if (para.trim().length > 0) richParagraph(c, para.trim())
      }
    }
  })
}

/**
 * Real PDF version of the lesson notes, generated fully client-side.
 * `compress: false` is exposed for tests so text stays searchable in the
 * raw bytes; production uses compression.
 *
 * jsPDF is imported on demand: the library is several hundred kilobytes and
 * most learners never download a PDF, so it must not sit in the learning route
 * chunk.
 */
export async function buildNotePdf(
  d: TopicContentData,
  opts: { compress?: boolean; lessonNumber?: number | null } = {}
): Promise<Uint8Array> {
  const { jsPDF: PdfDocument } = await import('jspdf')
  const doc = new PdfDocument({ unit: 'mm', format: 'a4', compress: opts.compress ?? true })
  const headerTitle =
    opts.lessonNumber != null
      ? `Lesson ${String(opts.lessonNumber).padStart(2, '0')} · ${d.topic.title}`
      : d.topic.title
  const c = ctx(doc, headerTitle)
  paintHeader(c)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(...PRIMARY)
  for (const line of doc.splitTextToSize(d.topic.title, c.maxWidth) as string[]) {
    need(c, 9)
    doc.text(line, c.margin, c.y)
    c.y += 9
  }

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...MUTED)
  need(c, 6)
  doc.text(`${d.chapter.title} · ${d.topic.minutes} min`, c.margin, c.y)
  c.y += 9

  heading(c, 'Objectives')
  for (const o of d.topic.objectives) richParagraph(c, `•  ${o}`, 11, 0)

  for (const s of d.topic.sections) {
    heading(c, s.heading)
    richBody(c, s.body)
  }

  if (d.resources.links.length > 0) {
    heading(c, 'Further reading')
    for (const r of d.resources.links) richParagraph(c, `•  ${r.title} — ${r.url}`, 10, 0)
  }

  const pages = doc.getNumberOfPages()
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...MUTED)
    doc.text(`Page ${i} of ${pages}`, c.pageWidth - c.margin, c.pageHeight - 10, { align: 'right' })
  }
  return new Uint8Array(doc.output('arraybuffer') as ArrayBuffer)
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

/** Primary download: lesson-titled PDF (`Lesson_01_Title.pdf`). */
export async function downloadTopicPdf(
  d: TopicContentData,
  lessonNumber: number | null = null
): Promise<void> {
  const pdf = await buildNotePdf(d, { lessonNumber })
  downloadBlob(
    new Blob([pdf as unknown as BlobPart], { type: 'application/pdf' }),
    noteFilenameForLesson(lessonNumber, d.topic.title, 'pdf')
  )
}

export function downloadTopicMarkdown(
  d: TopicContentData,
  lessonNumber: number | null = null
): void {
  downloadBlob(
    new Blob([buildNoteMarkdown(d)], { type: 'text/markdown' }),
    noteFilenameForLesson(lessonNumber, d.topic.title, 'md')
  )
}
