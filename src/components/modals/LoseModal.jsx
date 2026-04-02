import { motion } from 'framer-motion'

export default function LoseModal({ energy, onRestart }) {
  const isFrozen = energy <= -5
  const icon = isFrozen ? '❄️' : '🔥'
  const title = 'The Team Felt It'

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(64,0,15,0.88)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '0 0 0 0',
      }}
    >
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          backgroundColor: '#40000F',
          borderRadius: '24px 24px 0 0',
          padding: '40px 28px 48px',
          maxWidth: 480,
          width: '100%',
          boxShadow: '0 -4px 40px rgba(0,0,0,0.4)',
          textAlign: 'center',
        }}
      >
        {/* Icon */}
        <div style={{ fontSize: 56, marginBottom: 16 }}>{icon}</div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 28,
            fontWeight: 700,
            color: '#fff',
            marginBottom: 16,
          }}
        >
          {title}
        </h2>

        {/* Body */}
        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 16,
            lineHeight: 1.7,
            color: '#FFDEE5',
            marginBottom: 32,
          }}
        >
          The energy got away from you this time — and that&apos;s okay. Every great manager has been here.
          What matters is you noticed. Try again and find your balance.
        </p>

        {/* CTA */}
        <button
          onClick={onRestart}
          className="w-full py-4 rounded-xl font-semibold text-white text-lg transition-all active:scale-95"
          style={{
            backgroundColor: '#930018',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 17,
            cursor: 'pointer',
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        >
          Try Again
        </button>
      </motion.div>
    </div>
  )
}
