import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import Cursor from './components/Cursor'
import Footer from './components/Footer'
import Helpline from './components/Helpline'
import Hero from './components/Hero'
import Join from './components/Join'
import Manifesto from './components/Manifesto'
import Nav from './components/Nav'
import Nourish from './components/Nourish'
import Pillars from './components/Pillars'
import Preloader from './components/Preloader'
import { LINKS } from './lib/constants'
import { prefersReducedMotion } from './lib/motion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function App() {
  const [ready, setReady] = useState(false)
  const done = useRef(false)

  const handleDone = () => {
    if (done.current) return
    done.current = true
    setReady(true)
  }

  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
  }, [ready])

  useEffect(() => {
    if (!ready) return
    const desktopMotion = window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches
    if (prefersReducedMotion() || !desktopMotion) {
      ScrollTrigger.refresh()
      return
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [ready])

  return (
    <>
      <a
        href="#mission"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[120] focus:bg-cream focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      {!ready && <Preloader onDone={handleDone} />}
      <div className="grain-overlay" />
      <Cursor />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Manifesto />
        <Pillars />
        <Helpline />
        <Nourish />
        <Join />
      </main>
      <Footer />
      <a
        href={LINKS.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="fixed right-4 z-40 rounded-full bg-blood px-5 py-3 text-[11px] font-medium tracking-[0.16em] text-cream uppercase shadow-lg md:hidden bottom-[max(1rem,env(safe-area-inset-bottom))]"
      >
        Need blood?
      </a>
    </>
  )
}
