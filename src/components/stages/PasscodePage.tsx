import { AnimatePresence, motion } from 'framer-motion'
import { KeyRound, Lock, Unlock } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PASSCODE } from '../../config/site.config'
import GoldOrnament from '../ui/GoldOrnament'
import Particles from '../ui/Particles'

const EASE = [0.22, 1, 0.36, 1] as const
const CODE_LENGTH = PASSCODE.length

type Phase = 'idle' | 'unlocking'

interface PasscodePageProps {
  onUnlock: () => void
}

export default function PasscodePage({ onUnlock }: PasscodePageProps) {
  const [digits, setDigits] = useState<string[]>(() =>
    Array(CODE_LENGTH).fill(''),
  )
  const [phase, setPhase] = useState<Phase>('idle')
  const [error, setError] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    inputsRef.current[0]?.focus()
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const joined = digits.join('')

  const setDigit = (index: number, value: string) => {
    setError(false)
    setDigits((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  const handleChange = (index: number, raw: string) => {
    const value = raw.replace(/\D/g, '').slice(-1)
    setDigit(index, value)
    if (value && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Backspace') {
      event.preventDefault()
      if (digits[index]) {
        setDigit(index, '')
      } else if (index > 0) {
        setDigit(index - 1, '')
        inputsRef.current[index - 1]?.focus()
      }
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
    if (event.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
    if (event.key === 'Enter') {
      attemptUnlock(joined)
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '')
    if (!pasted) return
    setError(false)
    const next = Array(CODE_LENGTH).fill('')
    for (let i = 0; i < CODE_LENGTH; i++) {
      next[i] = pasted[i] ?? ''
    }
    setDigits(next)
    const focusIndex = Math.min(pasted.length, CODE_LENGTH - 1)
    inputsRef.current[focusIndex]?.focus()
  }

  const attemptUnlock = useCallback(
    (code: string) => {
      if (phase !== 'idle' || code.length < CODE_LENGTH) return
      if (code === PASSCODE) {
        setPhase('unlocking')
        timerRef.current = window.setTimeout(onUnlock, 1700)
      } else {
        setError(true)
        setShakeKey((key) => key + 1)
        timerRef.current = window.setTimeout(() => {
          setDigits(Array(CODE_LENGTH).fill(''))
          inputsRef.current[0]?.focus()
        }, 600)
      }
    },
    [phase, onUnlock],
  )

  // Auto-verify the moment the last digit lands.
  useEffect(() => {
    if (phase === 'idle' && joined.length === CODE_LENGTH) {
      const id = window.setTimeout(() => attemptUnlock(joined), 280)
      return () => window.clearTimeout(id)
    }
  }, [joined, phase, attemptUnlock])

  const unlocking = phase === 'unlocking'

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-10">
      <Particles variant="stars" density={70} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 45%, transparent 30%, rgba(10,4,8,0.55) 100%)',
        }}
      />

      <motion.div
        key={shakeKey}
        animate={error ? { x: [0, -10, 9, -7, 6, -4, 2, 0] } : { x: 0 }}
        transition={{ duration: 0.55 }}
        className="relative w-full max-w-md"
      >
        <div className="glass-panel relative rounded-[26px] px-7 py-10 text-center sm:px-10">
          {/* corner flourishes */}
          <span aria-hidden className="absolute left-4 top-4 h-6 w-6 border-l border-t border-gold/50" />
          <span aria-hidden className="absolute right-4 top-4 h-6 w-6 border-r border-t border-gold/50" />
          <span aria-hidden className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-gold/50" />
          <span aria-hidden className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-gold/50" />

          {/* lock medallion */}
          <div className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center">
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full border border-gold/40"
              animate={
                unlocking
                  ? { scale: [1, 1.35, 1.8], opacity: [0.9, 0.4, 0] }
                  : { scale: [1, 1.05, 1], opacity: [0.5, 0.9, 0.5] }
              }
              transition={
                unlocking
                  ? { duration: 1.4, ease: 'easeOut' }
                  : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }
              }
            />
            <motion.div
              className="relative flex h-20 w-20 items-center justify-center rounded-full border border-gold/60 bg-gradient-to-br from-wine/70 to-forest/70 shadow-[0_0_36px_rgba(198,161,91,0.35)]"
              animate={unlocking ? { scale: [1, 1.12, 1] } : { y: [0, -5, 0] }}
              transition={
                unlocking
                  ? { duration: 0.9, ease: EASE }
                  : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              <AnimatePresence mode="wait" initial={false}>
                {unlocking ? (
                  <motion.span
                    key="unlock"
                    initial={{ opacity: 0, rotate: -25, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <Unlock size={30} className="text-gold" strokeWidth={1.4} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="lock"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Lock size={30} className="text-gold" strokeWidth={1.4} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {!unlocking ? (
              <motion.div
                key="form"
                exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <p className="font-display text-[26px] leading-tight font-medium text-soft-white text-glow-cream sm:text-[30px]">
                  Something special is waiting for you...
                </p>

                <p className="mx-auto mt-3 max-w-xs font-body text-sm leading-relaxed text-cream/75 sm:text-[15px]">
                  A little surprise made with love, just for you.
                </p>

                <GoldOrnament className="my-7" />

                {/* digit boxes */}
                <div className="flex justify-center gap-3 sm:gap-4">
                  {digits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputsRef.current[index] = el
                      }}
                      value={digit}
                      onChange={(event) => handleChange(index, event.target.value)}
                      onKeyDown={(event) => handleKeyDown(index, event)}
                      onPaste={handlePaste}
                      onFocus={(event) => event.target.select()}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      aria-label={`Passcode digit ${index + 1}`}
                      maxLength={1}
                      disabled={unlocking}
                      className={`h-16 w-12 rounded-xl border bg-soft-white/5 text-center font-display text-3xl text-soft-white caret-gold outline-none transition-all duration-300 sm:h-[70px] sm:w-14 ${
                        error
                          ? 'border-red-400/70 bg-red-500/10'
                          : digit
                            ? 'border-gold/70 bg-gold/10 shadow-[0_0_18px_rgba(198,161,91,0.25)]'
                            : 'border-gold/30 hover:border-gold/60 focus:border-gold focus:bg-gold/10 focus:shadow-[0_0_22px_rgba(198,161,91,0.3)]'
                      }`}
                    />
                  ))}
                </div>

                <div className="mt-4 h-6">
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        key="error"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="font-body text-sm tracking-wide text-red-300/90"
                      >
                        That isn&apos;t the secret... try again, my love.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="button"
                  onClick={() => attemptUnlock(joined)}
                  disabled={joined.length < CODE_LENGTH}
                  className="group mt-4 inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-gold/60 bg-gradient-to-r from-wine/80 to-forest/80 px-8 py-4 font-body text-[13px] font-medium tracking-[0.28em] text-soft-white uppercase transition-all duration-300 hover:border-gold hover:from-wine hover:to-forest hover:shadow-[0_0_30px_rgba(198,161,91,0.35)] focus:outline-none focus:ring-2 focus:ring-gold/60 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
                >
                  <KeyRound
                    size={16}
                    strokeWidth={1.6}
                    className="text-gold transition-transform duration-300 group-hover:rotate-12"
                  />
                  Unlock Your Surprise
                </button>

                <p className="mt-6 font-hand text-lg text-gold/75">
                  Only you know the secret.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="unlocking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="py-4"
              >
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
                  className="font-display text-2xl tracking-wide text-gold text-glow-gold sm:text-3xl"
                >
                  It&apos;s opening...
                </motion.p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 1.1, ease: EASE }}
                  className="gold-hairline mx-auto mt-5 w-40"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </main>
  )
}
