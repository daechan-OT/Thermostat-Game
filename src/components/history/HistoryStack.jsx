/**
 * HistoryStack — collapsed background stack + expanded drawer.
 *
 * All card rendering delegates to the same EnvironmentCard / ChoiceCard
 * components used during active play, so appearance is always identical.
 *
 * History entries spread all card fields (title, description, options, etc.)
 * plus: roundNumber, energyDelta, chosenOptionId.
 * We pass entries directly as `card` — the shape is compatible.
 */

import { motion, AnimatePresence } from 'framer-motion'
import EnvironmentCard from '../cards/EnvironmentCard.jsx'
import ChoiceCard from '../cards/ChoiceCard.jsx'

// Deterministic rotation per stack index
const ROTATIONS = [-6, 4, -3, 5, -2, 6, -4, 3, -5, 7]

// Render the right card component for a history entry (always in revealed/read-only state)
function HistoryCardView({ entry }) {
  if (entry.type === 'environment') {
    return <EnvironmentCard card={entry} />
  }
  return (
    <ChoiceCard
      card={entry}
      selectedOption={entry.chosenOptionId}
      phase="revealed"
      onSelectOption={() => {}}
    />
  )
}

// ── Round badge — shown in the drawer above each card ─────────────────────────
function RoundBadge({ n }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 8,
    }}>
      <span style={{
        fontFamily: '"DM Sans", system-ui, sans-serif',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: '#930018',
        opacity: 0.5,
        border: '1px solid rgba(147,0,24,0.2)',
        borderRadius: 999,
        padding: '3px 10px',
      }}>
        Round {n}
      </span>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function HistoryStack({ history, isExpanded, onToggle }) {
  const visibleStack = history.slice(-4)

  return (
    <div className="absolute inset-0 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {isExpanded ? (
          /* ── EXPANDED DRAWER ── */
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
            style={{ backgroundColor: 'rgba(64,0,15,0.45)', pointerEvents: 'auto' }}
            onClick={onToggle}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[92%] max-w-md bg-[#FFF9EF] shadow-2xl flex flex-col overflow-hidden"
              style={{ borderRadius: '20px 0 0 20px' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{
                padding: '20px 20px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(147,0,24,0.1)',
                flexShrink: 0,
              }}>
                <h3 style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#930018',
                  margin: 0,
                }}>
                  Leadership Log
                </h3>
                <button
                  onClick={onToggle}
                  style={{
                    border: '2px solid #930018',
                    backgroundColor: 'transparent',
                    color: '#930018',
                    width: 32, height: 32,
                    borderRadius: '50%',
                    fontSize: 18,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ×
                </button>
              </div>

              {/* Card list */}
              {history.length === 0 ? (
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: 10,
                  opacity: 0.5,
                }}>
                  <span style={{ fontSize: 36 }}>📋</span>
                  <p style={{
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                    fontSize: 14,
                    color: '#40000F',
                    textAlign: 'center',
                  }}>
                    Your decisions will appear here.
                  </p>
                </div>
              ) : (
                <div
                  className="scrollbar-hide"
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '16px 16px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                  }}
                >
                  {[...history].reverse().map((entry, idx) => (
                    <motion.div
                      key={entry.roundNumber ?? idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <RoundBadge n={entry.roundNumber} />
                      <HistoryCardView entry={entry} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        ) : (
          /* ── COLLAPSED STACK ── */
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pt-4"
            style={{ zIndex: 1 }}
          >
            {/* LOG button */}
            {history.length > 0 && (
              <button
                onClick={onToggle}
                style={{
                  position: 'absolute',
                  top: -30,
                  right: 20,
                  backgroundColor: '#FFF9EF',
                  border: '1.5px solid rgba(147,0,24,0.2)',
                  color: '#930018',
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 10,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  padding: '5px 12px',
                  borderRadius: 99,
                  pointerEvents: 'auto',
                  boxShadow: '0 2px 4px rgba(64,0,15,0.06)',
                }}
              >
                LOG: {history.length}
              </button>
            )}

            {/* Fanned card stack — renders identical cards, just rotated */}
            <div style={{
              position: 'relative',
              width: 'calc(100% - 64px)',
              height: 'var(--card-height)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {visibleStack.map((entry, i) => {
                const stackDepth = visibleStack.length - 1 - i
                const rotation = ROTATIONS[(entry.roundNumber ?? i) % ROTATIONS.length]

                return (
                  <motion.div
                    key={entry.roundNumber ?? i}
                    initial={{ scale: 1.05, opacity: 0, y: -16 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      y: stackDepth * -3,
                      x: stackDepth * 2,
                      rotate: rotation,
                    }}
                    transition={{ type: 'spring', damping: 22, stiffness: 120 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: i,
                      pointerEvents: 'none',
                    }}
                  >
                    <HistoryCardView entry={entry} />
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
