import { AnimatePresence, motion } from 'framer-motion'
import { pad2, type CountdownParts } from '../../lib/time'

const EASE = [0.22, 1, 0.36, 1] as const

interface UnitProps {
  value: number
  label: string
}

function Unit({ value, label }: UnitProps) {
  const display = label === 'Days' ? String(value) : pad2(value)

  return (
    <div className="flex w-[62px] shrink-0 flex-col items-center gap-2 sm:w-24 sm:gap-3 md:w-28 lg:w-32">
      <div className="glass-panel relative h-[76px] w-full overflow-hidden rounded-2xl sm:h-28 md:h-32 lg:h-36">
        <span
          aria-hidden
          className="absolute inset-x-3 top-3 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />
        <span
          aria-hidden
          className="absolute inset-x-3 bottom-3 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />
        <div className="relative h-full w-full">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={display}
              initial={{ y: '-55%', opacity: 0, filter: 'blur(6px)' }}
              animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: '55%', opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.55, ease: EASE }}
              className="absolute inset-0 flex items-center justify-center font-display text-[32px] leading-none font-semibold text-gold text-glow-gold tabular-nums sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {display}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <span className="font-body text-[9px] font-medium tracking-[0.28em] text-cream/70 uppercase sm:text-[10px] md:text-xs">
        {label}
      </span>
    </div>
  )
}

interface CountdownTimerProps {
  parts: CountdownParts
}

function Colon() {
  return (
    <span
      aria-hidden
      className="mt-9 hidden shrink-0 font-display text-2xl text-gold/50 sm:block sm:mt-12 md:mt-14 md:text-3xl"
    >
      :
    </span>
  )
}

export default function CountdownTimer({ parts }: CountdownTimerProps) {
  return (
    <div
      className="flex items-start justify-center gap-1.5 sm:gap-3 md:gap-5"
      role="timer"
      aria-label="Time until the birthday"
    >
      <Unit value={parts.days} label="Days" />
      <Colon />
      <Unit value={parts.hours} label="Hours" />
      <Colon />
      <Unit value={parts.minutes} label="Minutes" />
      <Colon />
      <Unit value={parts.seconds} label="Seconds" />
    </div>
  )
}
