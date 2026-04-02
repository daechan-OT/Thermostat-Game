import { motion } from 'framer-motion'

export default function WinModal({ onRestart }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(255,249,239,0.96)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          backgroundColor: '#fff',
          borderRadius: 24,
          padding: '40px 28px',
          maxWidth: 360,
          width: '100%',
          boxShadow: '0 8px 40px rgba(64,0,15,0.18)',
          textAlign: 'center',
        }}
      >
        {/* Icon */}
        <div style={{ fontSize: 56, marginBottom: 16 }}>🌡️</div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 28,
            fontWeight: 700,
            color: '#930018',
            marginBottom: 16,
          }}
        >
          Congratulations!
        </h2>

        {/* Body */}
        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 16,
            lineHeight: 1.65,
            color: '#40000F',
            marginBottom: 32,
          }}
        >
          You kept the temperature balanced across all 10 rounds. Your team felt the difference.
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
            border: 'none',
          }}
        >
          Play Again
        </button>
      </motion.div>
    </div>
  )
}
