import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { FINAL_LINES } from '../../config/site.config'
import GoldOrnament from '../ui/GoldOrnament'
import Particles from '../ui/Particles'

const EASE = [0.22, 1, 0.36, 1] as const

interface FinalMessageProps {
  onReplay: () => void
}

export default function FinalMessage({ onReplay }: FinalMessageProps) {
  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-90px' },
    transition: { duration: 1, delay, ease: EASE },
  })

  return (
    <section
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 py-28 text-center"
      aria-labelledby="final-title"
    >
      <Particles variant="dust" density={45} />
      <Particles variant="stars" density={25} />

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 60% at 50% 55%, transparent 35%, rgba(8,3,7,0.6) 100%)',
        }}
      />

      <div className="relative z-10 flex max-w-3xl flex-col items-center">
        <motion.p
          {...reveal(0)}
          className="font-body text-[11px] tracking-[0.42em] text-gold uppercase"
        >
          One Last Thing
        </motion.p>

        <motion.h2
          id="final-title"
          {...reveal(0.15)}
          className="mt-7 max-w-2xl font-display text-xl leading-relaxed font-medium text-soft-white text-glow-cream sm:text-3xl"
        >
          {FINAL_LINES.wish}
        </motion.h2>

        <motion.div {...reveal(0.35)} className="my-10 w-full max-w-md">
          <GoldOrnament />
        </motion.div>

        <motion.p
          {...reveal(0.75)}
          className="gold-text mt-2 font-display text-4xl leading-tight font-bold sm:text-6xl md:text-7xl"
        >
          {FINAL_LINES.closing}
        </motion.p>

        <motion.p
          {...reveal(0.95)}
          className="mt-6 font-body text-xs tracking-[0.4em] text-gold/85 uppercase sm:text-sm"
        >
          {FINAL_LINES.date}
        </motion.p>

        <motion.div {...reveal(1.15)} className="mt-14">
          <button
            type="button"
            onClick={onReplay}
            className="group inline-flex items-center gap-3 rounded-full border border-gold/55 bg-gradient-to-r from-wine/70 to-forest/70 px-8 py-4 font-body text-[11px] font-medium tracking-[0.28em] text-soft-white uppercase transition-all duration-300 hover:border-gold hover:from-wine hover:to-forest hover:shadow-[0_0_34px_rgba(198,161,91,0.4)] focus:outline-none focus:ring-2 focus:ring-gold/60 sm:text-xs"
          >
            <RotateCcw
              size={15}
              strokeWidth={1.6}
              className="text-gold transition-transform duration-500 group-hover:-rotate-180"
            />
            Replay Our Surprise
          </button>
        </motion.div>

        <motion.p
          {...reveal(1.35)}
          className="mt-12 font-hand text-xl text-cream/60"
        >
          Made with love, for you — always.
        </motion.p>
      </div>
    </section>
  )
}
