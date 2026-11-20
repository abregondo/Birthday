import { AnimatePresence, motion } from 'framer-motion'
import BirthdayReveal from './components/stages/BirthdayReveal'
import CountdownPage from './components/stages/CountdownPage'
import PasscodePage from './components/stages/PasscodePage'
import { useStage } from './hooks/useStage'
import { TARGET_MS } from './lib/time'

const EASE = [0.22, 1, 0.36, 1] as const

export default function App() {
  const { stage, unlock, countdown } = useStage(TARGET_MS)

  return (
    <div className="relative min-h-svh w-full overflow-x-hidden bg-stage">
      <AnimatePresence mode="wait">
        {stage === 'passcode' && (
          <motion.div
            key="passcode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              filter: 'blur(12px)',
              transition: { duration: 0.9, ease: EASE },
            }}
            transition={{ duration: 0.8, ease: EASE }}
            className="min-h-svh"
          >
            <PasscodePage onUnlock={unlock} />
          </motion.div>
        )}

        {stage === 'countdown' && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.06,
              filter: 'blur(14px)',
              transition: { duration: 1, ease: EASE },
            }}
            transition={{ duration: 1, ease: EASE }}
            className="min-h-svh"
          >
            <CountdownPage parts={countdown.parts} />
          </motion.div>
        )}

        {stage === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: EASE }}
            className="min-h-svh"
          >
            <BirthdayReveal />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
