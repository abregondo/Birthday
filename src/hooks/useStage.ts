import { useCallback, useState } from 'react'
import { useCountdown } from './useCountdown'

export type Stage = 'passcode' | 'countdown' | 'reveal'

const UNLOCK_KEY = 'birthday-surprise-unlocked'

function readUnlocked(): boolean {
  try {
    return window.sessionStorage.getItem(UNLOCK_KEY) === '1'
  } catch {
    return false
  }
}

function writeUnlocked(value: boolean) {
  try {
    if (value) window.sessionStorage.setItem(UNLOCK_KEY, '1')
    else window.sessionStorage.removeItem(UNLOCK_KEY)
  } catch {
    /* storage unavailable — session just won't persist */
  }
}

function resolveInitialStage(unlocked: boolean, targetMs: number): Stage {
  if (!unlocked) return 'passcode'
  return Date.now() >= targetMs ? 'reveal' : 'countdown'
}

/**
 * Owns the three-stage flow:
 *   passcode → countdown → reveal
 *
 * • Unlocking persists for the browser session (refresh-safe).
 * • Opening the site at/after the birthday goes straight to reveal.
 * • When the countdown reaches zero the reveal begins automatically —
 *   no page refresh required.
 */
export function useStage(targetMs: number) {
  const [unlocked, setUnlocked] = useState<boolean>(readUnlocked)
  const [stageState, setStage] = useState<Stage>(() =>
    resolveInitialStage(readUnlocked(), targetMs),
  )
  const countdown = useCountdown(targetMs)

  // Automatic midnight transition — derived from the live countdown,
  // so it flips the instant the target is reached (no refresh needed).
  const stage: Stage =
    stageState === 'countdown' && countdown.remainingMs <= 0
      ? 'reveal'
      : stageState

  const unlock = useCallback(() => {
    writeUnlocked(true)
    setUnlocked(true)
    setStage(Date.now() >= targetMs ? 'reveal' : 'countdown')
  }, [targetMs])

  const lock = useCallback(() => {
    writeUnlocked(false)
    setUnlocked(false)
    setStage('passcode')
  }, [])

  return { stage, setStage, unlocked, unlock, lock, countdown }
}
