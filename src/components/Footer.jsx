import InstagramIcon from './InstagramIcon'
import { LINKS } from '../lib/constants'

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink px-5 pt-16 pb-28 text-cream md:px-8 md:pb-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-4xl tracking-[0.08em] text-cream sm:text-5xl">YASHNA</p>
          <p className="mt-1 text-[11px] tracking-[0.34em] uppercase opacity-70">Foundation</p>
          <svg className="mt-4 w-48" viewBox="0 0 240 28" fill="none" aria-hidden="true">
            <path
              d="M0 14 H50 L60 14 L70 4 L82 24 L94 14 H240"
              stroke="#8f1d2c"
              strokeWidth="1.6"
            />
          </svg>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
            Share Blood · Share Food · Share Life. Emergency blood helpline across Telangana, and meals
            for those in need.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4">
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm tracking-[0.12em] uppercase"
          >
            <InstagramIcon size={16} />
            @yashna_foundation
          </a>
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-blood px-5 py-2.5 text-[12px] tracking-[0.16em] uppercase"
          >
            WhatsApp community
          </a>
          <p className="text-xs text-cream/40">Telangana, India</p>
        </div>
      </div>
    </footer>
  )
}
