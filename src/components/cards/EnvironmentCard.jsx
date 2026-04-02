// EnvironmentCard — fixed outcome, no player choice
// Shows autoplay countdown ring when autoplay is ON

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Pill from '../ui/Pill.jsx'

const COUNTDOWN_S = 5
const CIRCUMFERENCE = 2 * Math.PI * 18 // r=18

export default function EnvironmentCard({ card, autoplay, onAcknowledge }) {
  const [countdown, setCountdown] = useState(COUNTDOWN_S)
  const intervalRef = useRef(null)
  const firedRef = useRef(false)

  useEffect(() => {
    firedRef.current = false
    setCountdown(COUNTDOWN_S)
    if (!autoplay) return

    intervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          if (!firedRef.current) {
            firedRef.current = true
            onAcknowledge()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [autoplay, card?.id])

  const handleClick = () => {
    clearInterval(intervalRef.current)
    firedRef.current = true
    onAcknowledge()
  }

  const impactVariant = card.energyImpact > 0 ? 'negative' : card.energyImpact < 0 ? 'positive' : 'neutral'

  // Ring progress: countdown/COUNTDOWN_S * CIRCUMFERENCE → stroke-dashoffset
  const progress = autoplay ? (countdown / COUNTDOWN_S) * CIRCUMFERENCE : CIRCUMFERENCE

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full rounded-2xl shadow-lg overflow-hidden"
      style={{ backgroundColor: '#fff', border: '1px solid rgba(147,0,24,0.08)' }}
    >
      <div className="p-5">
        {/* Pills row */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Pill variant="env">{card.label}</Pill>
          <Pill variant={impactVariant}>{card.impactLabel}</Pill>
        </div>

        {/* Title */}
        <h2
          className="mb-3 leading-tight"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 22,
            fontWeight: 700,
            color: '#930018',
          }}
        >
          {card.title}
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 15,
            lineHeight: 1.65,
            color: '#40000F',
          }}
        >
          {card.description}
        </p>
      </div>

      {/* Understood button */}
      <div className="px-5 pb-5">
        <button
          onClick={handleClick}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold text-white transition-all active:scale-95"
          style={{
            backgroundColor: '#930018',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 16,
          }}
        >
          <span>Understood</span>
          <span style={{ opacity: 0.8 }}>→</span>

          {/* Autoplay countdown ring */}
          {autoplay && (
            <svg width="28" height="28" viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
              {/* Track */}
              <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
              {/* Progress */}
              <circle
                cx="20" cy="20" r="18"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE - progress}
                style={{
                  transform: 'rotate(-90deg)',
                  transformOrigin: '20px 20px',
                  transition: 'stroke-dashoffset 1s linear',
                }}
              />
              {/* Countdown number */}
              <text
                x="20" y="25"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="white"
                fontFamily="DM Sans, sans-serif"
              >
                {countdown}
              </text>
            </svg>
          )}
        </button>
      </div>
    </motion.div>
  )
}
