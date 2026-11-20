import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import GoldOrnament from '../ui/GoldOrnament'
import Particles from '../ui/Particles'

const EASE = [0.22, 1, 0.36, 1] as const
const SEQUENCE_MS = 6200

interface BirthdayGreetingProps {
  onDone: () => void
}

/**
 * Cinematic full-screen birthday greeting that plays once at midnight
 * (and again on "Replay Our Surprise"). Calls onDone when finished —
 * the visitor can also skip ahead.
 */
export default function BirthdayGreeting({ onDone }: BirthdayGreetingProps) {
  const doneRef = useRef(false)
  const timerRef = useRef<number | null>(null)

  const finish = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    if (timerRef.current) window.clearTimeout(timerRef.current)
    onDone()
  }, [onDone])

  useEffect(() => {
    timerRef.current = window.setTimeout(finish, SEQUENCE_MS)
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [finish])

  return (
    <section
      className="relative flex min-h-svh cursor-pointer items-center justify-center overflow-hidden px-4"
      onClick={finish}
      aria-label="Birthday greeting"
    >
      <Particles variant="dust" density={95} />
      <Particles variant="stars" density={40} />

      {/* golden burst behind the text */}
      <motion.span
        aria-hidden
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: [0.3, 1.15, 1], opacity: [0, 0.75, 0.5] }}
        transition={{ duration: 2.4, ease: EASE }}
        className="pointer-events-none absolute h-[70vmin] w-[70vmin] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(198,161,91,0.28) 0%, rgba(198,161,91,0.08) 40%, transparent 70%)',
        }}
      />
      <motion.span
        aria-hidden
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.6], opacity: [0.7, 0] }}
        transition={{ duration: 2.2, ease: 'easeOut', delay: 0.2 }}
        className="pointer-events-none absolute h-[60vmin] w-[60vmin] rounded-full border border-gold/60"
      />

      <div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
        >
          <GoldOrnament />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 34, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.8, ease: EASE }}
          className="gold-text mt-8 font-display text-[40px] leading-[1.05] font-bold tracking-wide sm:text-7xl md:text-8xl"
        >
          IT&apos;S YOUR DAY,
          <br />
          MY BABY! ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 2.2, ease: EASE }}
          className="text-glow-cream mt-8 font-display text-2xl font-medium text-soft-white italic sm:text-4xl"
        >
          Happy Birthday, bb lalai !
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.2, ease: EASE }}
          className="mt-7 flex flex-col items-center gap-5"
        >
          <span className="font-body text-xs tracking-[0.45em] text-gold uppercase sm:text-sm">
            December 1, 2026
          </span>
          <GoldOrnament />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4.4 }}
          className="mt-8 font-hand text-xl text-cream/75 sm:text-2xl"
        >
          There&apos;s so much more waiting for you below...
        </motion.p>
      </div>

      <motion.button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          finish()
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute right-5 top-5 z-20 rounded-full border border-gold/40 px-4 py-2 font-body text-[10px] tracking-[0.28em] text-cream/70 uppercase transition-colors hover:border-gold hover:text-gold sm:right-8 sm:top-8"
      >
        Skip
      </motion.button>
    </section>
  )
}
