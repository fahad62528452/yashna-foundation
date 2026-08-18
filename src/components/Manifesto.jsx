import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function Manifesto() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.manifesto-word', {
        y: 40,
        opacity: 0,
        rotateX: -28,
        stagger: 0.045,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: { trigger: root.current, start: 'top 78%' },
      })
      gsap.from('.manifesto-note', {
        y: 18,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      })
    },
    { scope: root },
  )

  const line =
    'When a family needs blood at midnight, we find a donor. When a stomach is empty, we fill a plate.'

  return (
    <section id="mission" ref={root} className="relative px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] tracking-[0.34em] text-blood uppercase">Our promise</p>
        <h2 className="font-display mt-6 max-w-5xl text-4xl leading-[1.15] font-medium sm:text-5xl md:text-6xl lg:text-7xl">
          {line.split(' ').map((word, i) => (
            <span key={`${word}-${i}`} className="manifesto-word mr-[0.28em] inline-block">
              {word}
            </span>
          ))}
        </h2>
        <p className="manifesto-note mt-10 max-w-xl text-base leading-relaxed text-muted">
          Yashna Foundation is a community-led NGO in Telangana. We exist for two urgencies that never
          wait: blood in an emergency, and food when there is none.
        </p>
      </div>
    </section>
  )
}
