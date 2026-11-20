import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  radius: number
  baseAlpha: number
  speed: number
  drift: number
  phase: number
  twinkleSpeed: number
}

interface ParticlesProps {
  /** number of particles on screen */
  density?: number
  /** 'dust' = slow rising gold dust · 'stars' = twinkling stars */
  variant?: 'dust' | 'stars'
  className?: string
}

/**
 * Lightweight canvas particle field — gold dust or twinkling stars.
 * Hand-rolled to keep dependencies minimal; pauses when the tab is
 * hidden and respects prefers-reduced-motion.
 */
export default function Particles({
  density = 60,
  variant = 'dust',
  className = '',
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let width = 0
    let height = 0
    let raf = 0
    let running = true
    let particles: Particle[] = []

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const seed = () => {
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: variant === 'stars' ? 0.6 + Math.random() * 1.4 : 0.5 + Math.random() * 1.8,
        baseAlpha: variant === 'stars' ? 0.35 + Math.random() * 0.5 : 0.12 + Math.random() * 0.4,
        speed: variant === 'stars' ? 0.02 + Math.random() * 0.05 : 0.12 + Math.random() * 0.35,
        drift: (Math.random() - 0.5) * 0.25,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.008 + Math.random() * 0.02,
      }))
    }

    const resize = () => {
      const parent = canvas.parentElement
      width = parent ? parent.clientWidth : window.innerWidth
      height = parent ? parent.clientHeight : window.innerHeight
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = () => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.phase += p.twinkleSpeed
        if (!reducedMotion) {
          p.y -= p.speed
          p.x += p.drift + Math.sin(p.phase) * 0.14
          if (p.y < -6) {
            p.y = height + 6
            p.x = Math.random() * width
          }
          if (p.x < -6) p.x = width + 6
          if (p.x > width + 6) p.x = -6
        }

        const twinkle =
          variant === 'stars'
            ? 0.55 + Math.sin(p.phase * 2) * 0.45
            : 0.75 + Math.sin(p.phase) * 0.25
        const alpha = Math.max(0, p.baseAlpha * twinkle)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle =
          variant === 'stars'
            ? `rgba(245, 235, 221, ${alpha})`
            : `rgba(224, 200, 142, ${alpha})`
        ctx.shadowColor =
          variant === 'stars'
            ? 'rgba(245, 235, 221, 0.8)'
            : 'rgba(198, 161, 91, 0.8)'
        ctx.shadowBlur = p.radius * 4
        ctx.fill()
        ctx.shadowBlur = 0
      }

      if (!reducedMotion) raf = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        raf = requestAnimationFrame(draw)
      }
    }

    resize()
    draw()

    const observer = new ResizeObserver(resize)
    if (canvas.parentElement) observer.observe(canvas.parentElement)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [density, variant])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  )
}
