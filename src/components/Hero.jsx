import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowDownRight } from 'lucide-react'
import { LINKS } from '../lib/constants'
import { prefersReducedMotion } from '../lib/motion'

export default function Hero({ ready }) {
  const root = useRef(null)

  useGSAP(
    () => {
      if (!ready) return
      const reduced = prefersReducedMotion()
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      if (reduced) {
        gsap.set(['.hero-kicker', '.hero-fill', '.hero-line', '.hero-copy', '.hero-cta', '.hero-mark'], {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
        })
        return
      }

      tl.from('.hero-kicker', { y: 20, opacity: 0, duration: 0.6 })
        .from('.hero-letter', { yPercent: 110, rotateX: -40, stagger: 0.04, duration: 0.85 }, 0.1)
        .fromTo(
          '.hero-fill',
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'power3.inOut' },
          0.35,
        )
        .from('.hero-line', { scaleX: 0, duration: 0.8 }, 0.7)
        .from('.hero-copy', { y: 24, opacity: 0, duration: 0.7 }, 0.75)
        .from('.hero-cta', { y: 16, opacity: 0, stagger: 0.08, duration: 0.55 }, 0.95)
        .from('.hero-mark', { scale: 0.86, opacity: 0, duration: 1 }, 0.4)
    },
    { scope: root, dependencies: [ready] },
  )

  const magnetic = (e) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    gsap.to(el, {
      x: (e.clientX - r.left - r.width / 2) * 0.3,
      y: (e.clientY - r.top - r.height / 2) * 0.3,
      duration: 0.35,
      ease: 'power3.out',
    })
  }

  const reset = (e) =>
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })

  return (
    <section
      id="top"
      ref={root}
      className="relative min-h-dvh overflow-x-hidden px-5 pt-28 pb-16 md:px-8 md:pt-32 lg:pb-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-8 lg:gap-12">
        <div>
          <p className="hero-kicker text-[11px] font-medium tracking-[0.38em] text-muted uppercase">
            Telangana · Community NGO
          </p>

          <div className="relative mt-6">
            <h1 className="font-display overflow-hidden text-[16vw] leading-[0.82] font-semibold tracking-tight text-blood sm:text-7xl md:text-6xl lg:text-[7.5rem] xl:text-[8.4rem]">
              {'YASHNA'.split('').map((ch, i) => (
                <span key={`${ch}-${i}`} className="hero-letter inline-block">
                  {ch}
                </span>
              ))}
            </h1>
            <h1
              aria-hidden="true"
              className="hero-fill font-display pointer-events-none absolute inset-0 overflow-hidden text-[16vw] leading-[0.82] font-semibold tracking-tight text-blood-deep sm:text-7xl md:text-6xl lg:text-[7.5rem] xl:text-[8.4rem]"
              style={{ clipPath: 'inset(100% 0 0 0)' }}
            >
              YASHNA
            </h1>
          </div>

          <div className="mt-3 flex items-center gap-4">
            <div className="hero-line h-px flex-1 origin-left bg-ink/20" />
            <p className="text-[11px] tracking-[0.34em] text-ink uppercase">Foundation</p>
            <div className="hero-line h-px flex-1 origin-right bg-ink/20" />
          </div>

          <svg className="mt-3 w-full max-w-md" viewBox="0 0 420 36" fill="none" aria-hidden="true">
            <path
              className="ecg-draw"
              d="M0 18 H70 L82 18 L92 6 L104 30 L116 18 H200 L212 18 L222 4 L234 32 L246 18 H420"
              stroke="#8f1d2c"
              strokeWidth="1.6"
            />
          </svg>

          <p className="hero-copy font-display mt-8 max-w-xl text-3xl leading-tight text-ink italic sm:text-4xl">
            One drop saves a life.
            <br />
            One meal brings hope.
          </p>

          <p className="hero-copy mt-5 max-w-lg text-[15px] leading-relaxed text-muted">
            An emergency blood helpline across Telangana, and meals for people who need them. Neighbours
            helping neighbours — with blood, with food, with life.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              onMouseMove={magnetic}
              onMouseLeave={reset}
              className="hero-cta inline-flex items-center gap-2 rounded-full bg-blood px-6 py-3.5 text-[13px] font-medium tracking-[0.14em] text-cream uppercase"
            >
              Request blood
              <ArrowDownRight size={16} />
            </a>
            <a
              href="#join"
              onMouseMove={magnetic}
              onMouseLeave={reset}
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-[13px] font-medium tracking-[0.14em] uppercase"
            >
              Volunteer
            </a>
          </div>
        </div>

        <div className="hero-mark relative mx-auto grid h-[min(64vw,260px)] w-[min(64vw,260px)] place-items-center md:h-[280px] md:w-[280px] lg:h-[min(92vw,420px)] lg:w-[min(92vw,420px)] lg:justify-self-end">
          <svg
            className="orbit absolute inset-0 h-full w-full"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <defs>
              <path
                id="orbitPath"
                d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
              />
            </defs>
            <text fill="#8f1d2c" fontSize="7.2" letterSpacing="3.2" fontFamily="Outfit, sans-serif">
              <textPath href="#orbitPath">
                SHARE BLOOD · SHARE FOOD · SHARE LIFE · SHARE BLOOD · SHARE FOOD · SHARE LIFE ·
              </textPath>
            </text>
          </svg>
          <div className="relative grid h-[72%] w-[72%] place-items-center rounded-full bg-paper shadow-[0_30px_80px_-40px_rgba(92,16,28,0.55)]">
            <img
              src="/logo.png"
              alt="Yashna Foundation logo: a hand holding a droplet, a bowl, and a growing plant"
              className="h-[86%] w-[86%] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
