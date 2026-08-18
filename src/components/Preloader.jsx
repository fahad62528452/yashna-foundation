import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { prefersReducedMotion } from '../lib/motion'

export default function Preloader({ onDone }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const reduced = prefersReducedMotion()
      if (reduced) {
        gsap.set(root.current, { autoAlpha: 0 })
        onDone()
        return
      }

      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
        onComplete: onDone,
      })

      tl.fromTo(
        '.loader-fill',
        { scaleY: 0 },
        { scaleY: 1, duration: 1.15, ease: 'power3.inOut' },
      )
        .from('.loader-word span', { yPercent: 110, stagger: 0.05, duration: 0.7 }, 0.45)
        .from('.loader-line', { scaleX: 0, duration: 0.8 }, 0.7)
        .from('.loader-tag', { opacity: 0, y: 12, duration: 0.5 }, 1)
        .to(root.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'expo.inOut',
          delay: 0.35,
        })
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-cream"
      aria-hidden="true"
    >
      <div className="relative mb-10 h-28 w-20">
        <svg viewBox="0 0 80 112" className="h-full w-full">
          <defs>
            <clipPath id="dropClip">
              <path d="M40 6C40 6 10 48 10 74a30 30 0 0 0 60 0C70 48 40 6 40 6z" />
            </clipPath>
          </defs>
          <path
            d="M40 6C40 6 10 48 10 74a30 30 0 0 0 60 0C70 48 40 6 40 6z"
            fill="none"
            stroke="#8f1d2c"
            strokeWidth="2.2"
          />
          <g clipPath="url(#dropClip)">
            <rect
              className="loader-fill origin-bottom"
              x="0"
              y="0"
              width="80"
              height="112"
              fill="#8f1d2c"
              style={{ transformOrigin: 'center bottom' }}
            />
          </g>
        </svg>
      </div>

      <p className="loader-word font-display overflow-hidden px-4 text-center text-4xl font-semibold tracking-[0.12em] text-blood sm:text-6xl sm:tracking-[0.18em]">
        {'YASHNA'.split('').map((ch, i) => (
          <span key={`${ch}-${i}`} className="inline-block">
            {ch}
          </span>
        ))}
      </p>
      <div className="loader-line mt-4 h-px w-40 origin-left bg-ink/30" />
      <p className="loader-tag mt-4 max-w-[90%] px-4 text-center text-[10px] font-medium tracking-[0.22em] text-muted uppercase sm:text-[11px] sm:tracking-[0.32em]">
        Share blood · Share food · Share life
      </p>
    </div>
  )
}
