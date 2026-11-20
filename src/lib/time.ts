/**
 * Single source of truth for the birthday moment.
 *
 * December 1, 2026 – 12:00:00 AM Asia/Manila (UTC+8)
 * === November 30, 2026 – 16:00:00 UTC
 *
 * We store one fixed UTC timestamp. Comparing Date.now() against
 * it is timezone-independent and survives refreshes, device sleep,
 * and any viewer locale.
 */
export const BIRTHDAY_TARGET_MS = Date.UTC(2026, 10, 30, 16, 0, 0)

/** Dev-only: ?sim=45 makes the target 45 seconds from page load so the
 *  midnight transition can be tested. Never active in production builds. */
const SIM_SECONDS = (() => {
  if (!import.meta.env.DEV) return 0
  const raw = new URLSearchParams(window.location.search).get('sim')
  if (!raw) return 0
  const seconds = Number(raw)
  return Number.isFinite(seconds) && seconds > 0 ? seconds : 0
})()

export const TARGET_MS =
  SIM_SECONDS > 0 ? Date.now() + SIM_SECONDS * 1000 : BIRTHDAY_TARGET_MS

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalMs: number
  isPast: boolean
}

export function getParts(totalMs: number): CountdownParts {
  const clamped = Math.max(0, totalMs)
  const totalSeconds = Math.floor(clamped / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    totalMs: clamped,
    isPast: totalMs <= 0,
  }
}

export function pad2(value: number): string {
  return value.toString().padStart(2, '0')
}
