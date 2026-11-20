interface GoldOrnamentProps {
  className?: string
  /** hide the center diamond for a plain hairline */
  plain?: boolean
}

/** Decorative gold divider: hairline — diamond — hairline */
export default function GoldOrnament({
  className = '',
  plain = false,
}: GoldOrnamentProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-3 ${className}`}
    >
      <span className="gold-hairline w-16 sm:w-24" />
      {!plain && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="shrink-0"
        >
          <path
            d="M7 0.8 9.4 7 7 13.2 4.6 7 7 0.8Z"
            fill="#C6A15B"
            fillOpacity="0.9"
          />
          <path
            d="M0.8 7 7 4.6 13.2 7 7 9.4 0.8 7Z"
            fill="#C6A15B"
            fillOpacity="0.55"
          />
        </svg>
      )}
      <span className="gold-hairline w-16 sm:w-24" />
    </div>
  )
}
