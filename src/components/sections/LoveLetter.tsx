import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Mail } from 'lucide-react'
import { useState } from 'react'
import { LETTER_MESSAGE } from '../../config/site.config'
import GoldOrnament from '../ui/GoldOrnament'

const EASE = [0.22, 1, 0.36, 1] as const

type LetterPhase = 'sealed' | 'opening' | 'open'

const paragraphs = LETTER_MESSAGE.split(/\n\s*\n/).map((text) =>
  text.trim(),
).filter(Boolean)

function Envelope({
  onOpen,
  opening,
}: {
  onOpen: () => void
  opening: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: EASE }}
      className="flex flex-col items-center"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open the letter"
        className="group relative focus:outline-none"
        style={{ perspective: '900px' }}
      >
        {/* envelope body */}
        <div className="relative h-44 w-72 overflow-hidden rounded-lg border border-gold/50 shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_34px_rgba(198,161,91,0.18)] sm:h-52 sm:w-96">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(150deg, #6D1735 0%, #500D22 55%, #174B38 100%)',
            }}
          />
          {/* inner letter peeking */}
          <div className="absolute inset-x-5 bottom-4 top-10 rounded border border-gold/30 bg-cream/90" />

          {/* lower folds */}
          <span
            aria-hidden
            className="absolute bottom-0 left-0 h-0 w-0"
            style={{
              borderTop: '88px solid rgba(80,13,34,0.95)',
              borderRight: '144px solid transparent',
            }}
          />
          <span
            aria-hidden
            className="absolute right-0 bottom-0 h-0 w-0"
            style={{
              borderTop: '88px solid rgba(18,59,42,0.95)',
              borderLeft: '144px solid transparent',
            }}
          />

          {/* flap */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1/2 origin-top"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              background:
                'linear-gradient(180deg, #7d1c3f 0%, #500D22 100%)',
              transform: opening ? 'rotateX(-180deg)' : 'rotateX(0deg)',
              transition: 'transform 1.1s cubic-bezier(0.22,1,0.36,1)',
              backfaceVisibility: 'hidden',
            }}
          />

          {/* wax seal */}
          <span className="absolute left-1/2 top-[46%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold-soft/70 bg-gradient-to-br from-[#e0c88e] to-[#a8823f] shadow-[0_4px_14px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110">
            <Heart size={18} className="text-burgundy" fill="currentColor" />
          </span>
        </div>
      </button>

      <motion.p
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-7 flex items-center gap-2.5 font-hand text-2xl text-gold/85"
      >
        <Mail size={18} strokeWidth={1.5} />
        Tap to open your letter
      </motion.p>
    </motion.div>
  )
}

export default function LoveLetter() {
  const [phase, setPhase] = useState<LetterPhase>('sealed')

  const open = () => {
    if (phase !== 'sealed') return
    setPhase('opening')
    window.setTimeout(() => setPhase('open'), 1500)
  }

  return (
    <section
      id="letter"
      className="relative px-4 py-24 sm:py-32"
      aria-labelledby="letter-title"
    >
      {/* soft decorative washes */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-wine/25 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-emerald-deep/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="font-body text-[11px] tracking-[0.42em] text-gold uppercase">
            Written Just For You
          </p>
          <h2
            id="letter-title"
            className="gold-text mt-4 font-display text-4xl font-semibold sm:text-5xl md:text-6xl"
          >
            A Letter From My Heart
          </h2>
          <GoldOrnament className="mx-auto mt-7" />
        </motion.header>

        <div className="mt-14 flex justify-center">
          <AnimatePresence mode="wait">
            {phase !== 'open' ? (
              <motion.div
                key="envelope"
                exit={{
                  opacity: 0,
                  y: -50,
                  scale: 0.9,
                  filter: 'blur(8px)',
                }}
                transition={{ duration: 0.8, ease: EASE }}
                className="w-full"
              >
                <div className="flex justify-center">
                  <Envelope onOpen={open} opening={phase === 'opening'} />
                </div>
              </motion.div>
            ) : (
              <motion.article
                key="letter"
                initial={{ opacity: 0, y: 70, scale: 0.92, rotateX: 18 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{ duration: 1.2, ease: EASE }}
                style={{ perspective: '1200px' }}
                className="relative w-full rounded-[10px] border border-gold/50 px-6 py-10 shadow-[0_34px_90px_rgba(0,0,0,0.55),0_0_44px_rgba(198,161,91,0.14)] sm:px-12 sm:py-14"
              >
                {/* paper */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[10px]"
                  style={{
                    background:
                      'repeating-linear-gradient(0deg, rgba(139,105,72,0.045) 0px, rgba(139,105,72,0.045) 1px, transparent 1px, transparent 4px), linear-gradient(160deg, #F5EBDD 0%, #efe1cd 60%, #f7efe3 100%)',
                  }}
                />
                {/* double gold frame */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-2.5 rounded-[6px] border border-gold/45"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-[13px] rounded-[4px] border border-gold/25"
                />

                <div className="relative">
                  <div className="mb-8 flex justify-center">
                    <Heart
                      size={22}
                      className="text-wine"
                      fill="currentColor"
                      strokeWidth={1.2}
                    />
                  </div>

                  <div className="space-y-6">
                    {paragraphs.map((paragraph, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.5 + index * 0.4,
                          duration: 0.9,
                          ease: EASE,
                        }}
                        className="font-hand text-[23px] leading-[1.7] text-[#43121f] sm:text-[26px]"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: 0.7 + paragraphs.length * 0.4,
                      duration: 1,
                    }}
                    className="mt-10 flex flex-col items-center gap-4"
                  >
                    <GoldOrnament />
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-gradient-to-br from-gold-soft to-gold shadow-[0_4px_16px_rgba(198,161,91,0.4)]">
                      <Heart
                        size={16}
                        className="text-burgundy"
                        fill="currentColor"
                      />
                    </span>
                  </motion.div>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>

        {phase === 'opening' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center font-hand text-2xl text-gold/85"
          >
            Unfolding something written only for you...
          </motion.p>
        )}
      </div>
    </section>
  )
}
