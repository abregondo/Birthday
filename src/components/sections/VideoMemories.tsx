import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useCallback, useState } from 'react'
import { VIDEOS, type VideoItem } from '../../config/site.config'
import GoldOrnament from '../ui/GoldOrnament'
import VideoModal from '../ui/VideoModal'

const EASE = [0.22, 1, 0.36, 1] as const

interface VideoCardProps {
  video: VideoItem
  index: number
  onOpen: () => void
}

function VideoCard({ video, index, onOpen }: VideoCardProps) {
  const hasSource = Boolean(video.src)
  const [posterFailed, setPosterFailed] = useState(false)
  const showPoster = Boolean(video.thumbnail) && !posterFailed

  return (
    <motion.button
      type="button"
      onClick={hasSource ? onOpen : undefined}
      aria-disabled={!hasSource}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: EASE }}
      whileHover={hasSource ? { y: -8 } : undefined}
      className={`group w-full overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-wine/45 to-forest/50 text-left shadow-[0_18px_45px_rgba(0,0,0,0.4)] transition-all duration-300 ${
        hasSource
          ? 'cursor-pointer hover:border-gold/70 hover:shadow-[0_26px_60px_rgba(0,0,0,0.5),0_0_26px_rgba(198,161,91,0.22)] focus:outline-none focus:ring-2 focus:ring-gold/70'
          : 'cursor-default opacity-80'
      }`}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {showPoster ? (
          <img
            src={video.thumbnail}
            alt=""
            loading="lazy"
            onError={() => setPosterFailed(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="h-full w-full transition-transform duration-700 group-hover:scale-105"
            style={{
              background:
                'linear-gradient(140deg, #6D1735 0%, #500D22 40%, #174B38 100%)',
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 30% 30%, rgba(198,161,91,0.4), transparent 55%), radial-gradient(circle at 75% 75%, rgba(245,235,221,0.15), transparent 50%)',
              }}
            />
          </div>
        )}

        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
        />

        {hasSource && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/70 bg-black/45 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-gold/25 group-hover:shadow-[0_0_30px_rgba(198,161,91,0.45)]">
              <Play
                size={26}
                strokeWidth={1.4}
                className="ml-1 text-gold"
                fill="currentColor"
              />
            </span>
          </span>
        )}

        {!hasSource && (
          <span className="absolute bottom-3 left-4 font-body text-[10px] tracking-[0.26em] text-cream/55 uppercase">
            Coming soon
          </span>
        )}
      </div>

      <div className="px-5 py-5">
        <h3 className="font-display text-xl font-medium text-soft-white sm:text-2xl">
          {video.title}
        </h3>
      </div>
    </motion.button>
  )
}

export default function VideoMemories() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const playableVideos = VIDEOS.filter((video) => video.src)

  const handleClose = useCallback(() => setActiveIndex(null), [])

  const activeVideo =
    activeIndex !== null && playableVideos[activeIndex]
      ? playableVideos[activeIndex]
      : null

  return (
    <section
      id="videos"
      className="relative px-4 py-24 sm:py-32"
      aria-labelledby="videos-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-body text-[11px] tracking-[0.42em] text-gold uppercase">
            Video Memories
          </p>
          <h2
            id="videos-title"
            className="gold-text mt-4 font-display text-4xl font-semibold sm:text-5xl md:text-6xl"
          >
            Little Moments, Big Memories
          </h2>
          <GoldOrnament className="mx-auto mt-7" />
          <p className="mt-6 font-body text-[15px] leading-relaxed text-cream/75">
            Clips of you, of us, of the days worth pressing play on again and
            again.
          </p>
        </motion.header>

        {VIDEOS.length === 0 ? (
          <p className="mt-14 text-center font-hand text-2xl text-cream/60">
            Our video memories will live here.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VIDEOS.map((video, index) => (
              <VideoCard
                key={`${video.title}-${index}`}
                video={video}
                index={index}
                onOpen={() => {
                  const playableIndex = VIDEOS.slice(0, index).filter(
                    (item) => item.src,
                  ).length
                  setActiveIndex(playableIndex)
                }}
              />
            ))}
          </div>
        )}
      </div>

      <VideoModal video={activeVideo} onClose={handleClose} />
    </section>
  )
}
