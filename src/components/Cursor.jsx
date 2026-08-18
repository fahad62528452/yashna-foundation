import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/motion'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || prefersReducedMotion()) return

    document.body.classList.add('hide-cursor')
    const xTo = gsap.quickTo(dot.current, 'x', { duration: 0.16, ease: 'power3.out' })
    const yTo = gsap.quickTo(dot.current, 'y', { duration: 0.16, ease: 'power3.out' })
    const xRing = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3.out' })
    const yRing = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3.out' })

    const move = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }

    const enter = () => gsap.to(ring.current, { scale: 1.8, duration: 0.25 })
    const leave = () => gsap.to(ring.current, { scale: 1, duration: 0.25 })

    window.addEventListener('pointermove', move)
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('pointerenter', enter)
      el.addEventListener('pointerleave', leave)
    })

    return () => {
      document.body.classList.remove('hide-cursor')
      window.removeEventListener('pointermove', move)
    }
  }, [])

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blood/50 md:block"
      />
      <div
        ref={dot}
        className="pointer-events-none fixed top-0 left-0 z-[91] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blood md:block"
      />
    </>
  )
}
