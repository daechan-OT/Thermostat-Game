// ChoiceCard — two-option choice card with reveal phase

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Pill from '../ui/Pill.jsx'

const COUNTDOWN_S = 5
const CIRCUMFERENCE = 2 * Math.PI * 18

export default function ChoiceCard({
  card,
  selectedOption,
  phase,         // 'reading' | 'revealed' | 'animating'
  autoplay,
  onSelectOption,
  onConfirm,
  onAcknowledge,
}) {
  const [countdown, setCountdown] = useState(COUNTDOWN_S)
  const intervalRef = useRef(null)
  const firedRef = useRef(false)

  // Autoplay countdown only applies in 'revealed' phase (on "Understood" button)
  useEffect(() => {
    if (phase !== 'revealed' || !autoplay) return
    firedRef.current = false
    setCountdown(COUNTDOWN_S)

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
  }, [phase, autoplay, card?.id])

  const handleUnderstood = () => {
    clearInterval(intervalRef.current)
    firedRef.current = true
    onAcknowledge()
  }

  const chosen = card.options.find(o => o.id === selectedOption)
  const impactVariant = chosen
    ? chosen.energyImpact > 0 ? 'negative' : chosen.energyImpact < 0 ? 'positive' : 'neutral'
    : 'neutral'

  const progress = (phase === 'revealed' && autoplay)
    ? (countdown / COUNTDOWN_S) * CIRCUMFERENCE
    : CIRCUMFERENCE

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full rounded-2xl shadow-lg overflow-hidden"
      style={{ backgroundColor: '#fff', border: '1px solid rgba(147,0,24,0.08)' }}
    >
      <div className="p-5">
        {/* Pill */}
        <div className="flex items-center gap-2 mb-4">
          <Pill variant="choice">{card.label}</Pill>
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
          className="mb-5"
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 15,
            lineHeight: 1.65,
            color: '#40000F',
          }}
        >
          {card.description}
        </p>

        {/* Options */}
        <div className="flex flex-col gap-3 mb-4">
          {card.options.map(opt => {
            const isSelected = selectedOption === opt.id
            const isRevealed = phase === 'revealed' || phase === 'animating'
            const isUnchosen = isRevealed && selectedOption !== opt.id

            return (
              <motion.button
                key={opt.id}
                onClick={() => phase === 'reading' && onSelectOption(opt.id)}
                disabled={phase !== 'reading'}
                whileTap={phase === 'reading' ? { scale: 0.98 } : {}}
                animate={{
                  opacity: isUnchosen ? 0.35 : 1,
                  scale: isSelected ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="w-full text-left p-4 rounded-xl border-2 transition-colors"
                style={{
                  backgroundColor: isSelected ? '#FFDEE5' : '#FFF9EF',
                  borderColor: isSelected ? '#930018' : 'rgba(147,0,24,0.25)',
                  cursor: phase === 'reading' ? 'pointer' : 'default',
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: '#40000F',
                  fontWeight: isSelected ? 500 : 400,
                }}
              >
                <span style={{ color: '#930018', fontWeight: 700, marginRight: 8 }}>
                  {opt.id}.
                </span>
                {opt.text}
              </motion.button>
            )
          })}
        </div>

        {/* Educational message — slides in after reveal */}
        <AnimatePresence>
          {(phase === 'revealed' || phase === 'animating') && chosen && (
            <motion.div
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div
                className="rounded-xl p-4 mb-4"
                style={{ backgroundColor: '#FFF9EF', border: '1px solid rgba(147,0,24,0.12)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ fontSize: 16 }}>💡</span>
                  <Pill variant={impactVariant}>
                    Energy {chosen.energyImpact > 0 ? `+${chosen.energyImpact}` : chosen.energyImpact}
                  </Pill>
                </div>
                <p
                  style={{
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: '#40000F',
                  }}
                >
                  {chosen.educationalMessage}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action button */}
      <div className="px-5 pb-5">
        {phase === 'reading' ? (
          <button
            onClick={onConfirm}
            disabled={!selectedOption}
            className="w-full py-3 rounded-xl font-semibold text-white transition-all active:scale-95"
            style={{
              backgroundColor: selectedOption ? '#930018' : '#C9A0A8',
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: 16,
              cursor: selectedOption ? 'pointer' : 'not-allowed',
            }}
          >
            Confirm
          </button>
        ) : (
          <button
            onClick={handleUnderstood}
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
                <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
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
                <text x="20" y="25" textAnchor="middle" fontSize="14" fontWeight="700" fill="white" fontFamily="DM Sans, sans-serif">
                  {countdown}
                </text>
              </svg>
            )}
          </button>
        )}
      </div>
    </motion.div>
  )
}
