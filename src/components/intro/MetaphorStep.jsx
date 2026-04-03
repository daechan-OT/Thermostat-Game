import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GaugeArc from '../gauge/GaugeArc'

// Oscillating sequence to show the gauge "alive" — illustrates why staying near 0 matters
const DEMO_SEQUENCE = [0, 2, 3, 1, -1, -3, -1, 1, 0]

export default function MetaphorStep() {
  const [demoIdx, setDemoIdx] = useState(0)
  const [accordionOpen, setAccordionOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setDemoIdx(i => (i + 1) % DEMO_SEQUENCE.length)
    }, 1500)
    return () => clearInterval(timer)
  }, [])

  const energy = DEMO_SEQUENCE[demoIdx]

  return (
    <div style={{ padding: '4px 24px 16px', display: 'flex', flexDirection: 'column' }}>

      {/* Live gauge */}
      <div style={{ marginBottom: 4 }}>
        <GaugeArc energy={energy} />
      </div>

      {/* Headline */}
      <h2
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 26,
          fontWeight: 800,
          color: '#930018',
          lineHeight: 1.25,
          textAlign: 'center',
          marginBottom: 14,
        }}
      >
        You Are the Thermostat
      </h2>

      {/* Short copy */}
      <p
        style={{
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontSize: 15,
          color: '#40000F',
          lineHeight: 1.75,
          textAlign: 'center',
          marginBottom: 20,
          opacity: 0.8,
        }}
      >
        A thermometer only <em>reads</em> the room. A thermostat <strong>sets</strong> it.
        Your team constantly scans your energy — when you stay steady, they feel safe to do the same.
      </p>

      {/* Accordion */}
      <div
        style={{
          border: '1.5px solid rgba(147,0,24,0.18)',
          borderRadius: 14,
          overflow: 'hidden',
          backgroundColor: '#fff',
        }}
      >
        <button
          onClick={() => setAccordionOpen(o => !o)}
          style={{
            width: '100%',
            padding: '14px 18px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 14,
            fontWeight: 700,
            color: '#930018',
            textAlign: 'left',
          }}
        >
          <span>Why does this matter in real life?</span>
          <motion.span
            animate={{ rotate: accordionOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'inline-block', fontSize: 16, lineHeight: 1, flexShrink: 0 }}
          >
            ↓
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {accordionOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  padding: '14px 18px 18px',
                  borderTop: '1px solid rgba(147,0,24,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <p
                  style={{
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                    fontSize: 14,
                    color: '#40000F',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  Emotions spread through teams like temperature through a room — automatically
                  and invisibly. When a manager walks in tense, cortisol levels in the team rise
                  within minutes. Mistakes increase. Communication breaks down.
                </p>
                <p
                  style={{
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                    fontSize: 14,
                    color: '#40000F',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  When you stay regulated — not robotic, but <strong>steady</strong> — your team has
                  permission to stay calm too. That's not soft leadership. That's the{' '}
                  <strong>most powerful lever</strong> you have as a manager.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
