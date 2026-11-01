import { useEffect, useRef, useState } from 'react'
import { simulationApi } from '../../api/learning'
import type { ThreadView } from '../../types/domain'
import { useAsync } from '../../hooks/useAsync'
import { careerGateOrError } from './LearningPathPage'
import { Button } from '../../components/ui/button/Button'
import { EmptyState, LoadingState, PageHeader } from '../../components/app/primitives'

interface ThreadsResponse {
  threads: ThreadView[]
}

const MIN_THINKING_MS = 550
const REVEAL_TICK_MS = 16

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Shared thread UI for Team and Client communication pages.
 *
 * Sending is optimistic: the student's message appears immediately, a persona
 * typing indicator takes over while the API persists the turn, and the reply is
 * revealed progressively so the exchange behaves like a live chat. Every turn
 * is still persisted and evaluated server-side.
 */
export function CommunicationPageBase({
  kind,
  title,
  description
}: {
  kind: 'team' | 'client'
  title: string
  description: string
}): React.JSX.Element {
  const state = useAsync<ThreadsResponse>(
    () => (kind === 'team' ? simulationApi.teamThreads() : simulationApi.clientThreads()),
    [kind]
  )
  const [threads, setThreads] = useState<ThreadView[]>([])
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [sendingId, setSendingId] = useState<string | null>(null)
  const [typingId, setTypingId] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (state.data) setThreads(state.data.threads)
  }, [state.data])

  if (state.loading && threads.length === 0) return <LoadingState />
  if (state.error) return careerGateOrError(state.error)

  const setDraft = (threadPublicId: string, value: string): void => {
    setDrafts((prev) => ({ ...prev, [threadPublicId]: value }))
    setErrors((prev) => {
      if (!prev[threadPublicId]) return prev
      const next = { ...prev }
      delete next[threadPublicId]
      return next
    })
  }

  const patchThread = (threadPublicId: string, updater: (thread: ThreadView) => ThreadView): void => {
    setThreads((prev) => prev.map((thread) => (thread.publicId === threadPublicId ? updater(thread) : thread)))
  }

  const revealPersonaReply = async (
    threadPublicId: string,
    baseMessages: ThreadView['messages'],
    reply: ThreadView['messages'][number]
  ): Promise<void> => {
    const chunkSize = Math.max(2, Math.ceil(reply.body.length / 70))
    for (let end = chunkSize; end < reply.body.length; end += chunkSize) {
      if (!mountedRef.current) return
      const partial = { ...reply, body: reply.body.slice(0, end) }
      patchThread(threadPublicId, (thread) => ({
        ...thread,
        messages: [...baseMessages, partial],
        awaitingStudentReply: false
      }))
      await delay(REVEAL_TICK_MS)
    }
    if (!mountedRef.current) return
    patchThread(threadPublicId, (thread) => ({
      ...thread,
      messages: [...baseMessages, reply],
      awaitingStudentReply: false
    }))
  }

  const send = async (thread: ThreadView): Promise<void> => {
    const text = (drafts[thread.publicId] ?? '').trim()
    if (!text || sendingId !== null) return

    const optimisticMessage: ThreadView['messages'][number] = {
      from: 'student',
      body: text,
      at: new Date().toISOString()
    }
    const originalMessages = thread.messages

    setSendingId(thread.publicId)
    setTypingId(thread.publicId)
    setErrors((prev) => {
      if (!prev[thread.publicId]) return prev
      const next = { ...prev }
      delete next[thread.publicId]
      return next
    })
    setDrafts((prev) => ({ ...prev, [thread.publicId]: '' }))
    patchThread(thread.publicId, (current) => ({
      ...current,
      messages: [...current.messages, optimisticMessage],
      awaitingStudentReply: false
    }))

    try {
      const [result] = await Promise.all([
        simulationApi.reply(thread.publicId, text),
        delay(MIN_THINKING_MS)
      ])
      if (!mountedRef.current) return

      const last = result.messages[result.messages.length - 1]
      const hasPersonaReply = last?.from === 'persona'
      const baseMessages = hasPersonaReply ? result.messages.slice(0, -1) : result.messages

      // Keep the typing indicator visible while the persona reply is revealed.
      patchThread(thread.publicId, (current) => ({
        ...current,
        messages: baseMessages,
        awaitingStudentReply: false
      }))

      if (hasPersonaReply) {
        await revealPersonaReply(thread.publicId, baseMessages, last)
      }

      if (!mountedRef.current) return
      patchThread(thread.publicId, (current) => ({
        ...current,
        messages: result.messages,
        status: result.closed ? 'completed' : current.status,
        score: result.score ?? current.score,
        awaitingStudentReply: result.awaitingStudentReply
      }))
    } catch (e) {
      if (!mountedRef.current) return
      patchThread(thread.publicId, (current) => ({
        ...current,
        messages: originalMessages,
        awaitingStudentReply: true
      }))
      setDrafts((prev) => ({ ...prev, [thread.publicId]: text }))
      setErrors((prev) => ({
        ...prev,
        [thread.publicId]: e instanceof Error ? e.message : 'Your reply could not be sent. Please try again.'
      }))
    } finally {
      if (mountedRef.current) {
        setSendingId(null)
        setTypingId(null)
      }
    }
  }

  return (
    <div>
      <PageHeader eyebrow="Company simulation" title={title} description={description} />

      {threads.length === 0 ? (
        <EmptyState
          icon={kind === 'team' ? 'users' : 'headset'}
          title="No conversations yet"
          description={`Pass both interviews and start the company simulation to receive ${kind} scenarios for your career.`}
        />
      ) : (
        <ul className="space-y-4">
          {threads.map((thread) => (
            <ThreadCard
              key={thread.publicId}
              thread={thread}
              kind={kind}
              draft={drafts[thread.publicId] ?? ''}
              sending={sendingId === thread.publicId}
              typing={typingId === thread.publicId}
              busy={sendingId !== null}
              error={errors[thread.publicId]}
              onDraftChange={(value) => setDraft(thread.publicId, value)}
              onSend={() => void send(thread)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

function ThreadCard({
  thread,
  kind,
  draft,
  sending,
  typing,
  busy,
  error,
  onDraftChange,
  onSend
}: {
  thread: ThreadView
  kind: 'team' | 'client'
  draft: string
  sending: boolean
  typing: boolean
  busy: boolean
  error?: string
  onDraftChange: (value: string) => void
  onSend: () => void
}): React.JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = scrollRef.current
    if (element) element.scrollTop = element.scrollHeight
  }, [thread.messages, typing])

  const locked = thread.status === 'completed'

  return (
    <li className="rounded-lg border border-border bg-surface">
      <header className="flex flex-wrap items-start justify-between gap-2 border-b border-border px-5 py-3">
        <div>
          <p className="text-sm font-semibold text-primary">
            {thread.personaName} <span className="font-normal text-primary/55">· {thread.personaRole}</span>
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-primary/60">{thread.situation}</p>
        </div>
        {locked ? (
          <span className="shrink-0 text-sm font-semibold tabular-nums text-primary">
            {thread.score !== null ? `${thread.score}/100` : 'Resolved'}
          </span>
        ) : (
          <span className="shrink-0 text-xs uppercase tracking-wide text-accent">
            {typing ? `${thread.personaName} is typing…` : thread.awaitingStudentReply ? 'Awaiting your reply' : 'In progress'}
          </span>
        )}
      </header>

      <div
        ref={scrollRef}
        aria-live="polite"
        className="no-scrollbar max-h-[26rem] space-y-3 overflow-y-auto px-5 py-4"
      >
        {thread.messages.map((message, index) => {
          const streaming =
            typing && message.from === 'persona' && index === thread.messages.length - 1
          return (
            <div
              key={`${message.at}-${index}`}
              className={message.from === 'student' ? 'flex justify-end' : 'flex justify-start'}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                  message.from === 'student'
                    ? 'bg-primary text-surface'
                    : 'border border-border bg-bg text-primary/85'
                }`}
              >
                <p className="whitespace-pre-wrap">
                  {message.body}
                  {streaming ? (
                    <span
                      aria-hidden
                      className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-[1px] animate-pulse rounded-full bg-primary/45"
                    />
                  ) : null}
                </p>
                <p className={`mt-1 text-[11px] tabular-nums ${message.from === 'student' ? 'text-surface/60' : 'text-primary/45'}`}>
                  {new Date(message.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          )
        })}

        {typing ? (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-bg px-3.5 py-2.5">
              <span className="text-xs text-primary/55">{thread.personaName} is typing</span>
              <span className="flex items-center gap-1" aria-hidden>
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/35"
                    style={{ animationDelay: `${dot * 120}ms` }}
                  />
                ))}
              </span>
            </div>
          </div>
        ) : null}
      </div>

      {!locked ? (
        <footer className="border-t border-border px-5 py-3">
          <label htmlFor={`reply-${thread.publicId}`} className="sr-only">
            Your reply
          </label>
          <textarea
            id={`reply-${thread.publicId}`}
            name={`reply-${thread.publicId}`}
            rows={3}
            value={draft}
            disabled={busy}
            onChange={(e) => onDraftChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                onSend()
              }
            }}
            placeholder={`Reply to ${thread.personaName} as you would in a professional ${kind} channel…`}
            className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-primary placeholder:text-primary/35 focus:border-accent/60 focus:outline-none disabled:bg-bg disabled:text-primary/50"
          />
          {error ? (
            <p role="alert" className="mt-2 rounded-md bg-attention/10 px-3 py-1.5 text-sm text-attention">
              {error}
            </p>
          ) : null}
          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="text-xs text-primary/45">
              {sending || typing
                ? 'Waiting for the reply…'
                : 'Enter to send · Shift + Enter for a new line'}
            </span>
            <Button
              size="sm"
              disabled={busy || typing || !draft.trim()}
              onClick={onSend}
            >
              {sending ? 'Sending…' : typing ? 'Replying…' : 'Send reply'}
            </Button>
          </div>
        </footer>
      ) : (
        <footer className="border-t border-border px-5 py-2.5">
          <p className="text-xs text-primary/50">Scenario resolved and evaluated.</p>
        </footer>
      )}
    </li>
  )
}
