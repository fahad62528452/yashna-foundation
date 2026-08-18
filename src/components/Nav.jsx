import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Menu, X } from 'lucide-react'
import { LINKS, NAV } from '../lib/constants'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const bar = useRef(null)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const magnetic = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    gsap.to(el, {
      x: (e.clientX - r.left - r.width / 2) * 0.28,
      y: (e.clientY - r.top - r.height / 2) * 0.28,
      duration: 0.35,
      ease: 'power3.out',
    })
  }

  const reset = (e) => gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.4)' })

  return (
    <header
      ref={bar}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid || open ? 'bg-cream/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 md:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="Yashna Foundation home">
          <img src="/logo.png" alt="" className="h-11 w-11 rounded-full bg-paper object-contain" />
          <span className="hidden sm:block">
            <span className="font-display block text-lg leading-none font-semibold tracking-[0.14em] text-blood">
              YASHNA
            </span>
            <span className="text-[10px] tracking-[0.32em] text-ink/70 uppercase">Foundation</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] tracking-[0.16em] text-ink/80 uppercase transition-colors hover:text-blood"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noreferrer"
            onMouseMove={magnetic}
            onMouseLeave={reset}
            className="hidden rounded-full bg-blood px-5 py-2.5 text-[12px] font-medium tracking-[0.16em] text-cream uppercase transition-colors hover:bg-blood-deep md:inline-flex"
          >
            Need blood?
          </a>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="flex h-[calc(100dvh-72px)] flex-col justify-between bg-cream px-6 pt-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] lg:hidden">
          <nav className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-6" aria-label="Mobile">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl text-ink sm:text-5xl"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-blood py-4 text-center text-sm tracking-[0.18em] text-cream uppercase"
          >
            Emergency helpline
          </a>
        </div>
      )}
    </header>
  )
}
