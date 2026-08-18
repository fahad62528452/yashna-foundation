import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Droplet, HeartPulse, Wheat } from 'lucide-react'
import { PILLARS } from '../lib/constants'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

const icons = {
  drop: Droplet,
  bowl: Wheat,
  pulse: HeartPulse,
}

const tones = {
  blood: 'bg-blood text-cream',
  earth: 'bg-cream text-ink',
  ink: 'bg-ink text-cream',
}

function Motif({ type, tone }) {
  if (type === 'drop') {
    return (
      <svg viewBox="0 0 160 200" className="h-40 w-32 md:h-56 md:w-44">
        <path
          d="M80 8C80 8 24 78 24 124a56 56 0 0 0 112 0C136 78 80 8 80 8z"
          fill={tone === 'blood' ? '#5c101c' : '#8f1d2c'}
        />
        <path d="M80 48c-10 18-22 38-22 58a22 22 0 0 0 44 0c0-20-12-40-22-58z" fill="#f6f0e6" opacity="0.2" />
      </svg>
    )
  }
  if (type === 'bowl') {
    return (
      <svg viewBox="0 0 180 140" className="h-32 w-40 md:h-44 md:w-56">
        <ellipse cx="90" cy="58" rx="70" ry="22" fill="#c9a227" />
        <path d="M28 58c4 42 28 62 62 62s58-20 62-62" fill="#3a2415" />
        <path d="M90 18c8 10 10 22 4 32" stroke="#3a7a45" strokeWidth="4" fill="none" />
        <ellipse cx="102" cy="16" rx="14" ry="8" fill="#3a7a45" />
        <ellipse cx="82" cy="22" rx="12" ry="7" fill="#2f6a3c" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 280 80" className="w-56 md:w-80">
      <path
        d="M0 40 H70 L82 40 L94 12 L108 68 L122 40 H280"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  )
}

export default function Pillars() {
  const root = useRef(null)
  const track = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const distance = () => track.current.scrollWidth - window.innerWidth
        gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            end: () => `+=${distance()}`,
          },
        })
      })

      mm.add('(max-width: 1023px)', () => {
        gsap.from('.pillar-card', {
          y: 40,
          opacity: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: root.current, start: 'top 80%' },
        })
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section id="work" ref={root} className="relative lg:h-screen lg:overflow-hidden">
      <div ref={track} className="flex flex-col lg:h-screen lg:w-[300vw] lg:flex-row">
        {PILLARS.map((pillar) => {
          const Icon = icons[pillar.motif]
          return (
            <article
              key={pillar.index}
              className={`pillar-card flex min-h-[min(32rem,78dvh)] w-full flex-col justify-between px-5 py-14 sm:px-6 md:min-h-[80vh] md:px-14 lg:h-screen lg:w-screen lg:min-h-0 lg:px-20 ${tones[pillar.tone]}`}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="pt-2 text-[10px] tracking-[0.28em] uppercase opacity-70 sm:text-[11px] sm:tracking-[0.32em]">
                  {pillar.kicker}
                </p>
                <span className="font-display text-5xl sm:text-6xl md:text-8xl">{pillar.index}</span>
              </div>

              <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
                <div>
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-current/20 md:mb-6">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-4xl leading-none sm:text-5xl md:text-7xl lg:text-8xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-[15px] leading-relaxed opacity-85 md:mt-6 md:text-lg">
                    {pillar.body}
                  </p>
                </div>
                <div className="flex justify-start lg:justify-end">
                  <Motif type={pillar.motif} tone={pillar.tone} />
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
