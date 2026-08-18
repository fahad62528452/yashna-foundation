import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function Nourish() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(['.stem', '.leaf-l', '.leaf-r', '.grain'], { opacity: 1, scale: 1 })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 72%' },
        defaults: { ease: 'expo.out' },
      })

      tl.from('.nourish-copy > *', { y: 24, opacity: 0, stagger: 0.08, duration: 0.65 })
        .from('.stem', { scaleY: 0, duration: 0.8, transformOrigin: 'bottom' }, 0.15)
        .from('.leaf-l', { scale: 0, rotate: -40, duration: 0.55, transformOrigin: 'right center' }, 0.55)
        .from('.leaf-r', { scale: 0, rotate: 40, duration: 0.55, transformOrigin: 'left center' }, 0.6)
        .from('.grain', { y: 10, opacity: 0, stagger: 0.04, duration: 0.4 }, 0.4)
    },
    { scope: root },
  )

  return (
    <section ref={root} className="bg-paper px-5 py-16 sm:py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <div className="nourish-copy">
          <p className="text-[11px] tracking-[0.34em] text-leaf uppercase">Share food</p>
          <h2 className="font-display mt-4 text-[2.15rem] leading-tight md:text-6xl">
            A bowl, a plant,
            <span className="block italic">a future.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            Hunger is quieter than a blood emergency, and just as urgent. We feed people who would
            otherwise skip a meal — with the same care we bring to a helpline call.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-leaf" />
              Community kitchens and packed meals for families in need
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-grain" />
              Volunteers who cook, carry, and serve with dignity
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blood" />
              One network for food drives and blood requests
            </li>
          </ul>
        </div>

        <div className="flex justify-center" aria-hidden="true">
          <svg viewBox="0 0 280 320" className="w-48 max-w-full sm:w-64 md:w-80">
            <ellipse className="grain" cx="140" cy="250" rx="78" ry="18" fill="#3a2415" />
            <path d="M70 236c8 34 32 50 70 50s62-16 70-50" fill="#2a1a10" />
            {[
              [108, 228],
              [128, 220],
              [148, 226],
              [168, 218],
              [118, 240],
              [152, 238],
              [138, 232],
            ].map(([x, y], i) => (
              <circle key={i} className="grain" cx={x} cy={y} r="8" fill={i % 2 ? '#c9a227' : '#7a9a4a'} />
            ))}
            <path className="stem" d="M140 230 V110" stroke="#3a7a45" strokeWidth="5" strokeLinecap="round" />
            <ellipse className="leaf-l" cx="108" cy="128" rx="28" ry="14" fill="#3a7a45" />
            <ellipse className="leaf-r" cx="174" cy="118" rx="30" ry="15" fill="#2f6a3c" />
          </svg>
        </div>
      </div>
    </section>
  )
}
