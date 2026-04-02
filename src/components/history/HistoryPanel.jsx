// HistoryPanel — collapsed side tab + expanded drawer carousel

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Pill from '../ui/Pill.jsx'

function cardRotation(index) {
  return (index % 5 - 2) * 3
}

function HistoryCardThumb({ entry, index, isTop }) {
  const rotation = isTop ? 0 : cardRotation(index)
  const impactVariant = entry.energyDelta > 0 ? 'negative' : entry.energyDelta < 0 ? 'positive' : 'neutral'

  return (
    <div
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        border: '1px solid rgba(147,0,24,0.12)',
        boxShadow: '0 2px 8px rgba(64,0,15,0.12)',
        padding: '10px 12px',
        width: '100%',
      }}
    >
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <Pill variant={entry.type === 'environment' ? 'env' : 'choice'}>
          {entry.label}
        </Pill>
        <Pill variant="neutral" >Round {entry.roundNumber}</Pill>
        <Pill variant={impactVariant}>
          {entry.energyDelta > 0 ? `+${entry.energyDelta}` : entry.energyDelta}
        </Pill>
      </div>
      <p
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 15,
          fontWeight: 700,
          color: '#930018',
          marginBottom: 6,
        }}
      >
        {entry.title}
      </p>
      <p
        style={{
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontSize: 13,
          color: '#40000F',
          lineHeight: 1.55,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {entry.description}
      </p>
      {entry.type === 'choice' && entry.chosenOptionId && (
        <div className="mt-2">
          {entry.options?.filter(o => o.id === entry.chosenOptionId).map(o => (
            <p
              key={o.id}
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: 12,
                color: '#930018',
                fontStyle: 'italic',
                marginTop: 4,
              }}
            >
              You chose: "{o.text}"
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default function HistoryPanel({ history, isOpen, onOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleOpen = () => {
    setCurrentIndex(Math.max(0, history.length - 1))
    onOpen()
  }

  const prev = () => setCurrentIndex(i => Math.max(0, i - 1))
  const next = () => setCurrentIndex(i => Math.min(history.length - 1, i + 1))

  return (
    <>
      {/* Collapsed side tab */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          aria-label="Open history panel"
          style={{
            position: 'fixed',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 40,
            backgroundColor: '#FFDEE5',
            borderRadius: '8px 0 0 8px',
            border: '1px solid rgba(147,0,24,0.15)',
            borderRight: 'none',
            padding: '12px 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            cursor: 'pointer',
          }}
        >
          {/* Stacked card corners preview */}
          {history.length > 0 && (
            <div style={{ position: 'relative', width: 24, height: 32, marginBottom: 4 }}>
              {history.slice(-3).map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: i * 3,
                    left: i * 1,
                    width: 20,
                    height: 26,
                    backgroundColor: '#fff',
                    borderRadius: 4,
                    border: '1px solid rgba(147,0,24,0.2)',
                    transform: `rotate(${[-5, 3, -8][i] || 0}deg)`,
                    boxShadow: '0 1px 3px rgba(64,0,15,0.1)',
                  }}
                />
              ))}
            </div>
          )}
          {/* "History" label rotated */}
          <span
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#930018',
              textTransform: 'uppercase',
            }}
          >
            History
          </span>
        </button>
      )}

      {/* Expanded overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              backgroundColor: 'rgba(64,0,15,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={onClose}
          >
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'fixed',
                right: 0,
                top: 0,
                bottom: 0,
                width: '92vw',
                maxWidth: 400,
                backgroundColor: '#FFF9EF',
                padding: '24px 16px 24px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <h3
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#930018',
                    margin: 0,
                  }}
                >
                  Round History
                </h3>
                <button
                  onClick={onClose}
                  style={{
                    width: 32, height: 32,
                    borderRadius: '50%',
                    border: '2px solid #930018',
                    backgroundColor: 'transparent',
                    color: '#930018',
                    fontSize: 18,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                  }}
                  aria-label="Close history"
                >
                  ×
                </button>
              </div>

              {/* Empty state */}
              {history.length === 0 ? (
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 40 }}>📋</span>
                  <p
                    style={{
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                      fontSize: 15,
                      color: '#40000F',
                      textAlign: 'center',
                      opacity: 0.6,
                    }}
                  >
                    Your decisions will appear here.
                  </p>
                </div>
              ) : (
                <>
                  {/* Navigation */}
                  <div className="flex items-center justify-between mb-3">
                    <button
                      onClick={prev}
                      disabled={currentIndex === 0}
                      style={{
                        width: 36, height: 36,
                        borderRadius: '50%',
                        border: '2px solid #930018',
                        backgroundColor: currentIndex === 0 ? 'transparent' : '#930018',
                        color: currentIndex === 0 ? '#930018' : '#fff',
                        fontSize: 18,
                        cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                        opacity: currentIndex === 0 ? 0.4 : 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                      aria-label="Previous card"
                    >
                      ‹
                    </button>
                    <span
                      style={{
                        fontFamily: '"DM Sans", system-ui, sans-serif',
                        fontSize: 13,
                        color: '#40000F',
                        opacity: 0.6,
                      }}
                    >
                      {currentIndex + 1} / {history.length}
                    </span>
                    <button
                      onClick={next}
                      disabled={currentIndex === history.length - 1}
                      style={{
                        width: 36, height: 36,
                        borderRadius: '50%',
                        border: '2px solid #930018',
                        backgroundColor: currentIndex === history.length - 1 ? 'transparent' : '#930018',
                        color: currentIndex === history.length - 1 ? '#930018' : '#fff',
                        fontSize: 18,
                        cursor: currentIndex === history.length - 1 ? 'not-allowed' : 'pointer',
                        opacity: currentIndex === history.length - 1 ? 0.4 : 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                      aria-label="Next card"
                    >
                      ›
                    </button>
                  </div>

                  {/* Card carousel */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HistoryCardThumb
                        entry={history[currentIndex]}
                        index={currentIndex}
                        isTop={currentIndex === history.length - 1}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Mini dots */}
                  <div className="flex justify-center gap-1.5 mt-4">
                    {history.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        style={{
                          width: i === currentIndex ? 16 : 7,
                          height: 7,
                          borderRadius: 4,
                          backgroundColor: i === currentIndex ? '#930018' : 'rgba(147,0,24,0.2)',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          padding: 0,
                        }}
                        aria-label={`Go to round ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
