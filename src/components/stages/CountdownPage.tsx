import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import type { CountdownParts } from '../../lib/time'
import CountdownTimer from '../countdown/CountdownTimer'
import GoldOrnament from '../ui/GoldOrnament'
import Particles from '../ui/Particles'

const EASE = [0.22, 1, 0.36, 1] as const

interface CountdownPageProps {
  parts: CountdownParts
}

export default function CountdownPage({ parts }: CountdownPageProps) {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 py-14">
      <Particles variant="dust" density={55} />
      <Particles variant="stars" density={30} />

      {/* floating gold ornaments */}
      <span
        aria-hidden
        className="animate-float-slow pointer-events-none absolute left-[8%] top-[16%] h-2.5 w-2.5 rotate-45 border border-gold/50"
        style={{ animationDelay: '0s' }}
      />
      <span
        aria-hidden
        className="animate-float-slow pointer-events-none absolute right-[10%] top-[24%] h-2 w-2 rotate-45 bg-gold/40"
        style={{ animationDelay: '1.4s' }}
      />
      <span
        aria-hidden
        className="animate-float-slow pointer-events-none absolute bottom-[18%] left-[14%] h-2 w-2 rotate-45 bg-gold/35"
        style={{ animationDelay: '2.6s' }}
      />
      <span
        aria-hidden
        className="animate-float-slow pointer-events-none absolute bottom-[22%] right-[12%] h-3 w-3 rotate-45 border border-gold/40"
        style={{ animationDelay: '3.5s' }}
      />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-6 flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/10 px-5 py-2"
        >
          <Sparkles size={14} strokeWidth={1.6} className="text-gold" />
          <span className="font-body text-[11px] tracking-[0.3em] text-gold uppercase">
            December 1, 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
          className="gold-text font-display text-[38px] leading-[1.08] font-semibold sm:text-6xl md:text-7xl"
        >
          Something Beautiful
          <br className="sm:hidden" /> Is Coming...
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="mx-auto mt-6 max-w-xl font-body text-[15px] leading-relaxed text-cream/80 sm:text-lg"
        >
          Every second brings me closer to celebrating the most special person
          in my life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.65, ease: EASE }}
          className="mt-10 w-full sm:mt-14"
        >
          <CountdownTimer parts={parts} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="mt-12 w-full max-w-md sm:mt-16"
        >
          <GoldOrnament />
          <p className="mt-5 font-hand text-xl text-cream/70 sm:text-2xl">
            The wait is almost over...
          </p>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="animate-gentle-pulse absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-gold/50 p-1.5">
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="block h-2.5 w-1 rounded-full bg-gold"
          />
        </div>
      </motion.div>
    </main>
  )
}
