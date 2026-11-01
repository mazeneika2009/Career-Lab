import nodemailer, { type Transporter } from 'nodemailer'
import { env } from '../config/env.js'
import { logger } from '../utils/logger.js'

let transporter: Transporter | null = null

function getTransporter(): Transporter | null {
  if (!env.SMTP_HOST) return null
  transporter ??= nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth:
      env.SMTP_USER && env.SMTP_PASS
        ? { user: env.SMTP_USER, pass: env.SMTP_PASS }
        : undefined,
    pool: true,
    maxConnections: 3,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000
  })
  return transporter
}

interface MailTemplate {
  subject: string
  html: string
  text: string
}

function layout(title: string, bodyHtml: string): MailTemplate['html'] {
  return [
    '<!doctype html>',
    '<html><body style="margin:0;padding:24px;background:#F7F1E3;font-family:Arial,Helvetica,sans-serif;color:#173F35">',
    `<div style="max-width:520px;margin:0 auto;background:#FFFDF7;border:1px solid #DDD2BD;border-radius:10px;padding:32px">`,
    `<h1 style="margin:0 0 16px;font-size:20px;color:#173F35">${title}</h1>`,
    bodyHtml,
    `<p style="margin-top:28px;font-size:12px;color:#527568">Career Lab</p>`,
    '</div></body></html>'
  ].join('')
}

function button(url: string, label: string): string {
  return `<p style="margin:20px 0"><a href="${url}" style="display:inline-block;background:#173F35;color:#FFFDF7;text-decoration:none;padding:10px 18px;border-radius:6px;font-size:14px">${label}</a></p><p style="font-size:12px;word-break:break-all;color:#4A5568">Or paste this link into your browser:<br>${url}</p>`
}

function verificationMail(link: string): MailTemplate {
  return {
    subject: 'Verify your Career Lab account',
    html: layout(
      'Verify your email',
      `<p>Welcome to Career Lab. Confirm this email address to activate your account. The link expires in 24 hours.</p>${button(link, 'Verify email')}`
    ),
    text: `Welcome to Career Lab.\n\nConfirm your email address to activate your account:\n${link}\n\nThe link expires in 24 hours.`
  }
}

function passwordResetMail(link: string): MailTemplate {
  return {
    subject: 'Reset your Career Lab password',
    html: layout(
      'Password reset',
      `<p>A password reset was requested for your account. The link expires in 24 hours and can be used once. If you did not request this, ignore this email.</p>${button(link, 'Choose a new password')}`
    ),
    text: `A password reset was requested for your Career Lab account.\n\nChoose a new password:\n${link}\n\nThe link expires in 24 hours and can be used once.`
  }
}

function passwordChangedMail(): MailTemplate {
  return {
    subject: 'Your Career Lab password was changed',
    html: layout(
      'Password changed',
      '<p>Your password was just changed and all other signed-in devices were signed out. If this was not you, reset your password immediately.</p>'
    ),
    text: 'Your Career Lab password was changed and all other signed-in devices were signed out.'
  }
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function newDeviceMail(ip: string | null, device: string, when: Date): MailTemplate {
  const safeIp = esc(ip ?? 'unknown')
  const safeDevice = esc(device)
  return {
    subject: 'New sign-in to your Career Lab account',
    html: layout(
      'New sign-in',
      `<p>Your account was just accessed from a new device.</p><p style="font-size:14px">Device: ${safeDevice}<br>IP: ${safeIp}<br>Time (UTC): ${when.toISOString()}</p>`
    ),
    text: `Your Career Lab account was accessed from a new device.\nDevice: ${device}\nIP: ${ip ?? 'unknown'}\nTime (UTC): ${when.toISOString()}`
  }
}

function safeTimeZone(timeZone: string | null | undefined): string {
  if (!timeZone) return 'UTC'
  try {
    new Intl.DateTimeFormat('en-US', { timeZone }).format(new Date())
    return timeZone
  } catch {
    return 'UTC'
  }
}

function formatLoginTime(when: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone
  }).format(when)
}

export interface LoginAlertDetails {
  when: Date
  timeZone?: string | null
  ip?: string | null
  device?: string | null
}

function loginAlertMail(details: LoginAlertDetails): MailTemplate {
  const timeZone = safeTimeZone(details.timeZone)
  const utcTime = formatLoginTime(details.when, 'UTC')
  const localTime = formatLoginTime(details.when, timeZone)
  const safeDevice = esc(details.device ?? 'Unknown device')
  const safeIp = esc(details.ip ?? 'Not available')
  const row = (label: string, value: string): string =>
    `<tr><td style="padding:6px 12px 6px 0;color:#527568;white-space:nowrap">${label}</td><td style="padding:6px 0;text-align:right">${value}</td></tr>`

  return {
    subject: 'New login detected on your Career Lab account',
    html: layout(
      'New login detected on your Career Lab account',
      [
        '<p>A successful sign-in to your Career Lab account was just recorded.</p>',
        '<table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px">',
        row('Time (UTC)', esc(utcTime)),
        row(`Time (${esc(timeZone)})`, esc(localTime)),
        row('Device', safeDevice),
        row('IP address', safeIp),
        '</table>',
        '<p style="margin-top:20px">If this was you, no action is needed. If you do not recognise this activity, reset your password immediately and contact support.</p>'
      ].join('')
    ),
    text: [
      'New login detected on your Career Lab account.',
      '',
      `Time (UTC): ${utcTime}`,
      `Time (${timeZone}): ${localTime}`,
      `Device: ${details.device ?? 'Unknown device'}`,
      `IP address: ${details.ip ?? 'Not available'}`,
      '',
      'If this was you, no action is needed. If you do not recognise this activity, reset your password immediately and contact support.'
    ].join('\n')
  }
}

async function deliver(to: string, template: MailTemplate): Promise<void> {
  const transport = getTransporter()
  if (!transport) {
    logger.warn(
      { to, subject: template.subject },
      'smtp_not_configured_email_not_sent'
    )
    return
  }
  try {
    await transport.sendMail({
      from: env.MAIL_FROM,
      to,
      subject: template.subject,
      text: template.text,
      html: template.html
    })
  } catch (error) {
    logger.error({ err: error, to }, 'email_delivery_failed')
    throw error instanceof Error ? error : new Error('email_delivery_failed')
  }
}

export function isSmtpConfigured(): boolean {
  return Boolean(env.SMTP_HOST)
}

let warmedUp = false

export async function warmUpSmtp(): Promise<void> {
  const transport = getTransporter()
  if (!transport) {
    logger.warn('smtp_not_configured_email_will_be_logged')
    return
  }
  if (warmedUp) return
  try {
    await transport.verify()
    warmedUp = true
    logger.info(
      { host: env.SMTP_HOST, port: env.SMTP_PORT, secure: env.SMTP_SECURE },
      'smtp_connection_ready'
    )
  } catch (error) {
    logger.error({ err: error }, 'smtp_warmup_failed')
  }
}

export async function verifySmtpConnection(): Promise<void> {
  const transport = getTransporter()
  if (!transport) throw new Error('smtp_not_configured')
  await transport.verify()
  warmedUp = true
}

export async function sendVerificationEmail(to: string, link: string): Promise<void> {
  await deliver(to, verificationMail(link))
}

export async function sendPasswordResetEmail(to: string, link: string): Promise<void> {
  await deliver(to, passwordResetMail(link))
}

export async function sendPasswordChangedEmail(to: string): Promise<void> {
  await deliver(to, passwordChangedMail())
}

export async function sendNewDeviceEmail(
  to: string,
  ip: string | null,
  device: string,
  when: Date
): Promise<void> {
  await deliver(to, newDeviceMail(ip, device, when))
}

/**
 * Security alert sent after every successful password login.
 *
 * Deliberately fire-and-forget at the call site: SMTP latency or failure must
 * never delay or block the authentication response.
 */
export async function sendLoginAlertEmail(
  to: string,
  details: LoginAlertDetails
): Promise<void> {
  await deliver(to, loginAlertMail(details))
}
