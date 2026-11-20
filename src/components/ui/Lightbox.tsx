import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Photo } from '../../config/site.config'
import PlaceholderFrame from './PlaceholderFrame'

const EASE = [0.22, 1, 0.36, 1] as const

interface LightboxProps {
  photos: Photo[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: LightboxProps) {
  const photo = photos[index]
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const imageFailed = photo?.src != null && photo.src === failedSrc

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight')
        onNavigate((index + 1) % photos.length)
      if (event.key === 'ArrowLeft')
        onNavigate((index - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [index, photos.length, onClose, onNavigate])

  if (!photo) return null

  return (
    <motion.div
      key="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-16 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="A memory of us"
    >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-black/40 text-cream transition-colors hover:border-gold hover:text-gold"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onNavigate((index - 1 + photos.length) % photos.length)
              }}
              aria-label="Previous photo"
              className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-black/40 text-cream transition-colors hover:border-gold hover:text-gold sm:left-6"
            >
              <ChevronLeft size={22} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onNavigate((index + 1) % photos.length)
              }}
              aria-label="Next photo"
              className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-black/40 text-cream transition-colors hover:border-gold hover:text-gold sm:right-6"
            >
              <ChevronRight size={22} strokeWidth={1.5} />
            </button>
          </>
        )}

        <motion.figure
          key={index}
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          onClick={(event) => event.stopPropagation()}
          className="flex max-h-full w-full max-w-3xl flex-col items-center"
        >
          <div className="max-h-[70vh] overflow-hidden rounded-xl border border-gold/40 bg-cream/5 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            {photo.src && !imageFailed ? (
              <img
                src={photo.src}
                alt="A memory of us"
                className="max-h-[70vh] w-auto max-w-full object-contain"
                onError={() => setFailedSrc(photo.src)}
              />
            ) : (
              <div className="w-[min(78vw,520px)]">
                <PlaceholderFrame shape={photo.size ?? 'normal'} />
              </div>
            )}
          </div>
          <figcaption className="mt-5 max-w-xl text-center">
            {photos.length > 1 && (
              <p className="font-body text-[11px] tracking-[0.3em] text-gold/80 uppercase">
                {index + 1} / {photos.length}
              </p>
            )}
          </figcaption>
        </motion.figure>
      </motion.div>
  )
}
