import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import LoveLetter from '../sections/LoveLetter'
import FinalMessage from '../sections/FinalMessage'
import MemoryGallery from '../sections/MemoryGallery'
import VideoMemories from '../sections/VideoMemories'
import BirthdayGreeting from '../reveal/BirthdayGreeting'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Stage three — the midnight birthday reveal.
 * Plays the cinematic greeting, then unveils the memories,
 * videos, letter, and final message.
 */
export default function BirthdayReveal() {
  const [greetingDone, setGreetingDone] = useState(false)
  const [replayKey, setReplayKey] = useState(0)

  const handleGreetingDone = useCallback(() => setGreetingDone(true), [])

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    setGreetingDone(false)
    setReplayKey((key) => key + 1)
  }

  return (
    <main className="bg-stage-deep relative">
      <BirthdayGreeting key={replayKey} onDone={handleGreetingDone} />

      <AnimatePresence>
        {greetingDone && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, delay: 0.25, ease: EASE }}
          >
            <MemoryGallery />
            <VideoMemories />
            <LoveLetter />
            <FinalMessage onReplay={handleReplay} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
