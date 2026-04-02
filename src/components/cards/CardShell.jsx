/**
 * CardShell — the single source of truth for card visual appearance.
 *
 * All card states (environment, choice reading, choice revealed, history)
 * use this shell so background, border, radius, height, and padding are
 * always identical regardless of where the card is rendered.
 *
 * Props:
 *   bg          — background colour string
 *   dark        — boolean; when true uses dark (#930018) border/text theme
 *   children    — card body content
 *   style       — optional extra inline styles (e.g. pointer-events: none)
 */
export const CARD_RADIUS = 20
export const CARD_BORDER = '2px solid #930018'
export const CARD_HEIGHT = 'var(--card-height)'
export const CARD_PADDING = '28px 24px'

// ── Shared text primitives ────────────────────────────────────────────────────

export function TypeHeader({ label, subtitle }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 24 }}>
      <p style={{
        fontFamily: '"DM Sans", system-ui, sans-serif',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#930018',
        margin: 0,
        marginBottom: 3,
      }}>
        {label}
      </p>
      <p style={{
        fontFamily: '"DM Sans", system-ui, sans-serif',
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: '#930018',
        opacity: 0.65,
        margin: 0,
      }}>
        {subtitle}
      </p>
    </div>
  )
}

export function CardTitle({ children, color = '#930018', size = 34 }) {
  return (
    <h2 style={{
      fontFamily: '"Playfair Display", Georgia, serif',
      fontSize: size,
      fontWeight: 700,
      color,
      lineHeight: 1.2,
      margin: 0,
      marginBottom: 20,
      textAlign: 'center',
    }}>
      {children}
    </h2>
  )
}

export function CardDescription({ children, color = '#930018', opacity = 0.8 }) {
  return (
    <p style={{
      fontFamily: '"DM Sans", system-ui, sans-serif',
      fontSize: 14,
      lineHeight: 1.65,
      color,
      opacity,
      margin: 0,
      textAlign: 'center',
      maxWidth: 290,
    }}>
      {children}
    </p>
  )
}

export function ImpactPill({ children, borderColor = '#930018', color = '#930018', bgColor = 'transparent' }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `2px solid ${borderColor}`,
      borderRadius: 999,
      padding: '9px 24px',
      backgroundColor: bgColor,
      marginBottom: 20,
    }}>
      <span style={{
        fontFamily: '"DM Sans", system-ui, sans-serif',
        fontSize: 15,
        fontWeight: 600,
        color,
      }}>
        {children}
      </span>
    </div>
  )
}

// ── The shell itself ──────────────────────────────────────────────────────────

export default function CardShell({ bg, children, style = {} }) {
  return (
    <div style={{
      backgroundColor: bg,
      border: CARD_BORDER,
      borderRadius: CARD_RADIUS,
      width: '100%',
      height: CARD_HEIGHT,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: CARD_PADDING,
      textAlign: 'center',
      overflowY: 'auto',
      ...style,
    }}>
      {children}
    </div>
  )
}
