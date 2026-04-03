import { motion } from 'framer-motion'
import logo from '../../assets/logo.png'

export default function LandingStep() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 32px 16px',
        textAlign: 'center',
      }}
    >
      <motion.img
        src={logo}
        alt="Logo"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
        style={{ width: 130, height: 'auto', marginBottom: 36, display: 'block' }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 38,
          fontWeight: 800,
          color: '#930018',
          lineHeight: 1.15,
          marginBottom: 18,
        }}
      >
        The Thermostat<br />Challenge
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32, duration: 0.4 }}
        style={{
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontSize: 16,
          color: '#40000F',
          opacity: 0.55,
          letterSpacing: '0.02em',
          lineHeight: 1.7,
          marginBottom: 0,
        }}
      >
        Set the temperature.<br />Lead the room.
      </motion.p>
    </div>
  )
}
