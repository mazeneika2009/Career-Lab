import { describe, expect, it } from 'vitest'
import {
  answerLeaks,
  buildDeterministicTheoryHint,
  buildTheoryHintBase,
  findTheoryTopic,
  redactCorrectAnswer,
  type TheoryQuestionSource,
  type TheoryTopicSource
} from '../src/services/theory-hint.service.js'

const lesson = {
  chapterPublicId: 'chapter-public-id',
  number: 2,
  title: 'REST API Design'
}

const topics: TheoryTopicSource[] = [
  {
    publicId: 'topic-1',
    slug: 'rest-fundamentals',
    title: 'REST Fundamentals',
    objectives: ['Choose HTTP status codes that match the outcome of a request.'],
    sections: [
      {
        heading: 'HTTP status codes',
        body: 'Status codes describe the outcome of a request. Authentication failures differ from permission failures.'
      }
    ]
  },
  {
    publicId: 'topic-2',
    slug: 'request-validation',
    title: 'Request Validation',
    objectives: ['Place request validation before business logic runs.'],
    sections: [
      {
        heading: 'Validation middleware',
        body:
          'Validation middleware runs before the route handler.\n\n' +
          'It rejects malformed input at the boundary so handlers only receive trusted data.'
      },
      {
        heading: 'Safe database access',
        body: 'Prepared statements parameterise queries so SQL code is never mixed with untrusted data.'
      },
      {
        heading: 'Database constraints',
        body: 'Constraints are a final safety net, not the primary place for request validation.'
      }
    ]
  }
]

const question: TheoryQuestionSource = {
  topicSlug: 'request-validation',
  prompt: 'Where should request-body validation live?',
  options: [
    'Inside each handler ad hoc',
    'A validation middleware before the handler',
    'In the database',
    'Client-side only'
  ],
  answerIndex: 1,
  explanation: 'Validation middleware centralizes schema checks and rejects bad input before business logic runs.'
}

describe('theory hints', () => {
  it('resolves the authored topic by slug', () => {
    expect(findTheoryTopic(question, topics, 0)?.publicId).toBe('topic-2')
  })

  it('resolves a legacy fallback topic by title or question index', () => {
    expect(findTheoryTopic({ ...question, topicSlug: 'Request Validation' }, topics, 0)?.publicId).toBe(
      'topic-2'
    )
    expect(findTheoryTopic({ ...question, topicSlug: undefined }, topics, 1)?.publicId).toBe('topic-2')
  })

  it('points at the exact section and paragraph without exposing the correct option', () => {
    const base = buildTheoryHintBase({ question, questionIndex: 1, topics, lesson })
    expect(base.lessonRef.lessonNumber).toBe(2)
    expect(base.lessonRef.topicPublicId).toBe('topic-2')
    expect(base.lessonRef.sectionIndex).toBe(0)
    expect(base.lessonRef.sectionHeading).toBe('Validation middleware')
    expect(base.lessonRef.paragraphNumber).toBeGreaterThanOrEqual(1)
    expect(base.hint).toContain('Lesson 02')
    expect(base.hint.toLowerCase()).not.toContain('a validation middleware before the handler')
  })

  it('chooses the section that matches the question concept', () => {
    const sqlQuestion: TheoryQuestionSource = {
      topicSlug: 'request-validation',
      prompt: 'Which query pattern is safe from SQL injection?',
      options: ['String concatenation', 'Prepared statements', 'Manual escaping', 'Base64 encoding'],
      answerIndex: 1,
      explanation: 'Parameterised queries separate SQL code from data.'
    }
    const base = buildTheoryHintBase({ question: sqlQuestion, questionIndex: 0, topics, lesson })
    expect(base.lessonRef.sectionIndex).toBe(1)
    expect(base.lessonRef.sectionHeading).toBe('Safe database access')
  })

  it('redacts an explicit correct option from generated text', () => {
    expect(redactCorrectAnswer('Use 401 for expired credentials.', '401')).not.toContain('401')
  })

  it('rejects hints that name the key explicitly', () => {
    const answer = 'A validation middleware before the handler'
    expect(answerLeaks('The correct option is validation middleware.', answer)).toBe(true)
    expect(answerLeaks('Option B is the one you want.', answer)).toBe(true)
    expect(answerLeaks('Options A and C are distractors.', answer)).toBe(true)
    expect(answerLeaks('B) validation middleware before the handler', answer)).toBe(true)
    expect(answerLeaks('The second choice describes the rule.', answer)).toBe(true)
    expect(answerLeaks('Statements should be prepared before execution.', 'Prepared statements')).toBe(
      true
    )
    expect(answerLeaks('Use 401 for expired credentials.', '401')).toBe(true)
    expect(answerLeaks('Compare each option against the request lifecycle.', answer)).toBe(false)
  })

  it('does not leak the answer when the section heading matches the correct option', () => {
    const leakyTopics: TheoryTopicSource[] = [
      {
        publicId: 'topic-testing',
        slug: 'testing',
        title: 'Testing',
        objectives: [],
        sections: [
          {
            heading: 'Unit testing',
            body: 'Unit testing isolates a function from its dependencies.'
          }
        ]
      }
    ]
    const leakyQuestion: TheoryQuestionSource = {
      topicSlug: 'testing',
      prompt: 'Which practice isolates a function from its dependencies?',
      options: ['Manual QA', 'Unit testing', 'Load testing', 'Beta testing'],
      answerIndex: 1,
      explanation: 'Unit testing isolates a function from its dependencies.'
    }
    const base = buildTheoryHintBase({
      question: leakyQuestion,
      questionIndex: 0,
      topics: leakyTopics,
      lesson
    })
    expect(base.lessonRef.sectionHeading.toLowerCase()).not.toContain('unit testing')
    expect(base.hint.toLowerCase()).not.toContain('unit testing')
  })

  it('keeps the deterministic hint focused on the rule, not the answer', () => {
    const hint = buildDeterministicTheoryHint({
      question,
      topicTitle: 'Request Validation',
      sectionHeading: 'Validation middleware',
      paragraphNumber: 1,
      lessonNumber: 2,
      objective: 'Place request validation before business logic runs.'
    })
    expect(hint).toContain('Validation middleware')
    expect(hint.toLowerCase()).toContain('paragraph 1')
    expect(hint.toLowerCase()).not.toContain('a validation middleware before the handler')
  })
})
