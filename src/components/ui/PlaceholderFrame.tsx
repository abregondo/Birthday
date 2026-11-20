import { Camera, Heart } from 'lucide-react'

interface PlaceholderFrameProps {
  /** sets the aspect ratio of the placeholder */
  shape?: 'normal' | 'tall' | 'wide'
  label?: string
  className?: string
}

const SHAPE_CLASS: Record<NonNullable<PlaceholderFrameProps['shape']>, string> =
  {
    normal: 'aspect-square',
    tall: 'aspect-[3/4]',
    wide: 'aspect-[4/3]',
  }

/**
 * Elegant stand-in shown until a real photo is added in
 * site.config.ts. Never a stock photo — just tasteful colour.
 */
export default function PlaceholderFrame({
  shape = 'normal',
  label,
  className = '',
}: PlaceholderFrameProps) {
  return (
    <div
      className={`relative flex ${SHAPE_CLASS[shape]} w-full items-center justify-center overflow-hidden ${className}`}
      style={{
        background:
          'linear-gradient(150deg, #6D1735 0%, #500D22 45%, #174B38 100%)',
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 25%, rgba(198,161,91,0.35), transparent 45%), radial-gradient(circle at 75% 80%, rgba(245,235,221,0.18), transparent 50%)',
        }}
      />
      <div className="relative flex flex-col items-center gap-2 text-gold/80">
        <Camera size={30} strokeWidth={1.2} />
        <Heart size={13} strokeWidth={1.4} className="text-gold/60" />
      </div>
      {label && (
        <span className="absolute bottom-3 left-0 right-0 text-center font-body text-[11px] tracking-[0.25em] text-cream/60 uppercase">
          {label}
        </span>
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 border border-gold/25"
      />
    </div>
  )
}
