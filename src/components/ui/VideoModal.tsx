import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { VideoItem } from '../../config/site.config'

const EASE = [0.22, 1, 0.36, 1] as const

interface VideoModalProps {
  video: VideoItem | null
  onClose: () => void
}

/**
 * Elegant modal player. Never autoplays — the visitor presses play.
 * Sound only starts from their own interaction with the controls.
 */
export default function VideoModal({ video, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const failed = video !== null && failedSrc === video.src

  useEffect(() => {
    if (!video) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    const media = videoRef.current
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      // Only pause — never strip src here: React StrictMode runs this
      // cleanup immediately after setup, which would break playback.
      // The element is destroyed by React on unmount anyway.
      media?.pause()
    }
  }, [video, onClose])

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          key="video-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 px-4 py-14 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-black/40 text-cream transition-colors hover:border-gold hover:text-gold"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-4xl"
          >
            <div className="glass-panel overflow-hidden rounded-2xl">
              <div className="aspect-video w-full bg-black">
                {failed ? (
                  <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                    <AlertTriangle
                      size={28}
                      strokeWidth={1.4}
                      className="text-gold"
                    />
                    <p className="font-display text-xl text-cream">
                      This memory could not be loaded.
                    </p>
                    <p className="font-body text-sm text-cream/60">
                      Please check the video file and try again.
                    </p>
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    key={video.src}
                    src={video.src}
                    controls
                    playsInline
                    preload="metadata"
                    onError={() => setFailedSrc(video.src)}
                    className="h-full w-full"
                  />
                )}
              </div>

              <div className="border-t border-gold/25 px-6 py-5 text-center">
                <h3 className="font-display text-2xl text-soft-white">
                  {video.title}
                </h3>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
