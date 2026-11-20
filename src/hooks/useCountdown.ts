import { useEffect, useState } from 'react'
import { getParts, type CountdownParts } from '../lib/time'

interface CountdownResult {
  remainingMs: number
  parts: CountdownParts
}

/**
 * Ticks against a fixed target timestamp every second.
 * Accurate across refreshes, timezone changes, and device sleep
 * because it always recomputes from Date.now().
 */
export function useCountdown(targetMs: number): CountdownResult {
  const [remainingMs, setRemainingMs] = useState(() => targetMs - Date.now())

  useEffect(() => {
    const compute = () => setRemainingMs(targetMs - Date.now())

    compute()
    const interval = window.setInterval(compute, 250)

    const onVisible = () => {
      if (document.visibilityState === 'visible') compute()
    }
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('focus', onVisible)

    return () => {
      window.clearInterval(interval)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('focus', onVisible)
    }
  }, [targetMs])

  return { remainingMs, parts: getParts(remainingMs) }
}
