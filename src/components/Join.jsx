import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Droplet, MessageCircle, Utensils } from 'lucide-react'
import InstagramIcon from './InstagramIcon'
import { LINKS } from '../lib/constants'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

const ways = [
  {
    icon: Droplet,
    title: 'Donate blood',
    copy: 'Register as a donor in our WhatsApp network. When a matching request comes in, you can say yes.',
    href: LINKS.whatsapp,
    label: 'Join as a donor',
  },
  {
    icon: Utensils,
    title: 'Serve a meal',
    copy: 'Cook, pack, or deliver. Food drives need hands more than speeches.',
    href: LINKS.whatsapp,
    label: 'Volunteer to feed',
  },
  {
    icon: MessageCircle,
    title: 'Join the helpline',
    copy: 'Coordinate requests, share hospital details, keep the thread moving when minutes matter.',
    href: LINKS.whatsapp,
    label: 'Open WhatsApp',
  },
  {
    icon: InstagramIcon,
    title: 'Amplify the work',
    copy: 'Follow and share @yashna_foundation. A story seen in time can still save a life.',
    href: LINKS.instagram,
    label: 'Follow on Instagram',
  },
]

export default function Join() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.join-card', {
        y: 32,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      })
    },
    { scope: root },
  )

  return (
    <section id="join" ref={root} className="px-5 py-16 pb-28 sm:py-24 md:px-8 md:py-32 md:pb-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] tracking-[0.34em] text-blood uppercase">Stand with us</p>
        <h2 className="font-display mt-4 max-w-2xl text-[2.15rem] leading-tight md:text-6xl">
          Four ways to share a life.
        </h2>
        <p className="mt-5 max-w-lg text-muted">
          Yashna is built by people who showed up. If you can give blood, time, a meal, or a share —
          you already belong here.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {ways.map((way) => {
            const Icon = way.icon
            return (
              <a
                key={way.title}
                href={way.href}
                target="_blank"
                rel="noreferrer"
                className="join-card group rounded-3xl border border-ink/10 bg-paper p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-7"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-blood/10 text-blood">
                  <Icon size={18} />
                </span>
                <h3 className="font-display mt-5 text-2xl sm:text-3xl">{way.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{way.copy}</p>
                <p className="mt-6 text-[12px] tracking-[0.18em] text-blood uppercase">
                  {way.label} →
                </p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
