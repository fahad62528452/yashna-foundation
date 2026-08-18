import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from 'lucide-react'
import { LINKS } from '../lib/constants'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function Helpline() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.help-item', {
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 78%' },
      })
    },
    { scope: root },
  )

  return (
    <section id="helpline" ref={root} className="relative overflow-hidden bg-blood-deep px-5 py-24 text-cream md:px-8 md:py-32">
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-blood opacity-70 blur-3xl" />
      <div className="absolute top-1/2 left-[8%] hidden -translate-y-1/2 md:block" aria-hidden="true">
        <span className="pulse-ring absolute inset-0 rounded-full border border-cream/30" />
        <span className="pulse-ring absolute inset-0 rounded-full border border-cream/20 [animation-delay:700ms]" />
        <div className="relative grid h-28 w-28 place-items-center rounded-full bg-blood">
          <svg viewBox="0 0 40 56" className="h-12 w-8">
            <path d="M20 4C20 4 6 24 6 36a14 14 0 0 0 28 0C34 24 20 4 20 4z" fill="#f6f0e6" />
          </svg>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl lg:pl-44">
        <p className="help-item text-[11px] tracking-[0.34em] text-cream/70 uppercase">Telangana helpline</p>
        <h2 className="help-item font-display mt-4 max-w-3xl text-4xl leading-[1.1] md:text-6xl">
          Need blood tonight?
          <span className="mt-2 block italic">We are already awake.</span>
        </h2>
        <p className="help-item mt-6 max-w-xl text-base leading-relaxed text-cream/80">
          Join the WhatsApp network. Donors, coordinators, and volunteers across Telangana work from one
          thread — so a request does not get lost in the dark.
        </p>

        <div className="help-item mt-10 grid gap-4 sm:grid-cols-3">
          {['Send the blood group', 'Share the hospital & city', 'We mobilise a donor'].map((step, i) => (
            <div key={step} className="rounded-2xl border border-cream/15 p-5">
              <p className="font-display text-3xl text-cream/40">0{i + 1}</p>
              <p className="mt-3 text-sm leading-snug">{step}</p>
            </div>
          ))}
        </div>

        <a
          href={LINKS.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="help-item mt-10 inline-flex items-center gap-2 rounded-full bg-cream px-7 py-4 text-[13px] font-medium tracking-[0.16em] text-blood uppercase"
        >
          Open WhatsApp helpline
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  )
}
