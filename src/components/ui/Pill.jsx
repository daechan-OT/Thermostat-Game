// Pill — reusable rounded label chip
// variant: 'env' | 'choice' | 'positive' | 'negative' | 'neutral'

const VARIANTS = {
  env:      { bg: '#D6E0FF', color: '#40000F' },
  choice:   { bg: '#FFDEE5', color: '#930018' },
  positive: { bg: '#D0FCA1', color: '#40000F' },
  negative: { bg: '#FFADB0', color: '#930018' },
  neutral:  { bg: '#FFF9EF', color: '#930018' },
}

export default function Pill({ children, variant = 'neutral', className = '' }) {
  const { bg, color } = VARIANTS[variant] ?? VARIANTS.neutral
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-body font-semibold tracking-widest uppercase ${className}`}
      style={{
        backgroundColor: bg,
        color,
        borderRadius: '999px',
        fontFamily: '"DM Sans", system-ui, sans-serif',
        letterSpacing: '0.08em',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}
