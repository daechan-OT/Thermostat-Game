import { motion } from 'framer-motion'
import logo from '../assets/logo.png'

const RULES = [
  {
    num: '1',
    text: 'Survive 10 rounds by keeping Store Energy between −5 and +5.',
  },
  {
    num: '2',
    text: 'Environment cards happen to you. Your choices determine your reaction.',
  },
  {
    num: '3',
    text: 'Stay close to 0. The further you drift, the harder it gets.',
  },
]

export default function WelcomeScreen({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-dvh px-6 py-10"
      style={{ backgroundColor: '#FFF9EF', maxWidth: 480, margin: '0 auto', width: '100%' }}
    >
      {/* Logo / Wordmark */}
      <div className="text-center mb-2 mt-4">
        {/* Project Logo */}
        <img
          src={logo}
          alt="Thermostat Challenge Logo"
          style={{ width: 120, height: 'auto', marginBottom: 24, marginInline: 'auto', display: 'block' }}
        />

        <h1
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 30,
            fontWeight: 800,
            color: '#930018',
            lineHeight: 1.2,
            marginBottom: 10,
          }}
        >
          The Thermostat<br />Challenge
        </h1>

        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 15,
            color: '#40000F',
            opacity: 0.7,
            letterSpacing: '0.03em',
          }}
        >
          Set the temperature. Lead the room.
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: 'rgba(147,0,24,0.1)', margin: '28px 0' }} />

      {/* How to Play */}
      <div className="mb-8">
        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#930018',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          How to Play
        </p>

        <div className="flex flex-col gap-3">
          {RULES.map((rule, i) => (
            <motion.div
              key={rule.num}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.3 }}
              className="flex gap-4 items-start p-4 rounded-xl"
              style={{
                backgroundColor: '#fff',
                border: '1px solid rgba(147,0,24,0.08)',
                boxShadow: '0 1px 4px rgba(64,0,15,0.06)',
              }}
            >
              <span
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#930018',
                  lineHeight: 1,
                  minWidth: 24,
                  marginTop: 1,
                }}
              >
                {rule.num}
              </span>
              <p
                style={{
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: '#40000F',
                  margin: 0,
                }}
              >
                {rule.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Play button */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        onClick={onStart}
        whileTap={{ scale: 0.97 }}
        className="w-full py-4 rounded-2xl text-white font-semibold text-xl transition-all"
        style={{
          backgroundColor: '#930018',
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 20,
          cursor: 'pointer',
          border: 'none',
          boxShadow: '0 4px 20px rgba(147,0,24,0.3)',
        }}
      >
        Play
      </motion.button>
    </motion.div>
  )
}
