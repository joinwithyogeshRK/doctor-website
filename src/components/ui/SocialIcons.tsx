/**
 * Social marks as inline SVG. Lucide v1 no longer ships brand icons, and these
 * stay crisp at any size unlike the bitmap row in the asset pack.
 */
type IconProps = { className?: string }

const base = 'h-[17px] w-[17px]'

export function FacebookMark({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6A22 22 0 0 0 14.3 3.5c-2.4 0-4 1.45-4 4.1v2.3H7.6V13h2.7v8z" />
    </svg>
  )
}

export function XMark({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.2 3h3.3l-7.2 8.2L21.7 21h-6.6l-5.2-6.6L3.9 21H.6l7.7-8.8L.1 3h6.8l4.7 6.1zm-1.2 16h1.8L6.1 4.8H4.2z" />
    </svg>
  )
}

export function LinkedinMark({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M6.1 21H2.7V9.3h3.4zM4.4 7.8a2 2 0 1 1 0-4 2 2 0 0 1 0 4M21.3 21h-3.4v-5.7c0-1.36-.03-3.1-1.9-3.1s-2.2 1.47-2.2 3v5.8H10.4V9.3h3.25v1.6h.05c.45-.86 1.56-1.77 3.2-1.77 3.43 0 4.06 2.26 4.06 5.2z" />
    </svg>
  )
}

export function YoutubeMark({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M22.5 7.2a2.75 2.75 0 0 0-1.93-1.95C18.85 4.8 12 4.8 12 4.8s-6.85 0-8.57.45A2.75 2.75 0 0 0 1.5 7.2 28.7 28.7 0 0 0 1.05 12c0 1.6.15 3.2.45 4.8a2.75 2.75 0 0 0 1.93 1.95c1.72.45 8.57.45 8.57.45s6.85 0 8.57-.45a2.75 2.75 0 0 0 1.93-1.95c.3-1.6.45-3.2.45-4.8s-.15-3.2-.45-4.8M9.8 15.3V8.7l5.7 3.3z" />
    </svg>
  )
}

export function InstagramMark({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 4.5c2.44 0 2.73.01 3.69.05.89.04 1.37.19 1.69.31.43.17.73.36 1.05.68s.51.62.68 1.05c.12.32.27.8.31 1.69.04.96.05 1.25.05 3.69s-.01 2.73-.05 3.69c-.04.89-.19 1.37-.31 1.69-.17.43-.36.73-.68 1.05s-.62.51-1.05.68c-.32.12-.8.27-1.69.31-.96.04-1.25.05-3.69.05s-2.73-.01-3.69-.05c-.89-.04-1.37-.19-1.69-.31a2.8 2.8 0 0 1-1.05-.68 2.8 2.8 0 0 1-.68-1.05c-.12-.32-.27-.8-.31-1.69C4.51 14.73 4.5 14.44 4.5 12s.01-2.73.05-3.69c.04-.89.19-1.37.31-1.69.17-.43.36-.73.68-1.05s.62-.51 1.05-.68c.32-.12.8-.27 1.69-.31.96-.04 1.25-.05 3.69-.05M12 2.9c-2.48 0-2.79.01-3.76.05-.97.05-1.63.2-2.21.43-.6.23-1.11.55-1.62 1.05-.5.51-.82 1.02-1.05 1.62-.23.58-.38 1.24-.43 2.21-.04.97-.05 1.28-.05 3.76s.01 2.79.05 3.76c.05.97.2 1.63.43 2.21.23.6.55 1.11 1.05 1.62.51.5 1.02.82 1.62 1.05.58.23 1.24.38 2.21.43.97.04 1.28.05 3.76.05s2.79-.01 3.76-.05c.97-.05 1.63-.2 2.21-.43.6-.23 1.11-.55 1.62-1.05.5-.51.82-1.02 1.05-1.62.23-.58.38-1.24.43-2.21.04-.97.05-1.28.05-3.76s-.01-2.79-.05-3.76c-.05-.97-.2-1.63-.43-2.21a4.4 4.4 0 0 0-1.05-1.62 4.4 4.4 0 0 0-1.62-1.05c-.58-.23-1.24-.38-2.21-.43-.97-.04-1.28-.05-3.76-.05" />
      <path d="M12 7.32a4.68 4.68 0 1 0 0 9.36 4.68 4.68 0 0 0 0-9.36m0 7.72a3.04 3.04 0 1 1 0-6.08 3.04 3.04 0 0 1 0 6.08" />
      <circle cx="16.86" cy="7.14" r="1.09" />
    </svg>
  )
}
