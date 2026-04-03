import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GaugeArc from '../gauge/GaugeArc'
import skCrown from '../../assets/SKcrown.svg'

// Oscillating sequence to show the gauge "alive"
const DEMO_SEQUENCE = [0, 2, 3, 1, -1, -3, -1, 1, 0]

// ── Mini card preview ─────────────────────────────────────────────────────────
// A compact, non-interactive card sample used in the legend below.
function MiniCard({ bg, borderColor, label, title, pillText, pillColor, pillBg, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: 'easeOut' }}
      style={{
        backgroundColor: bg,
        border: `2px solid ${borderColor}`,
        borderRadius: 14,
        padding: '12px 10px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        minWidth: 0,
        boxShadow: '0 4px 10px rgba(64,0,15,0.14), 0 12px 28px rgba(64,0,15,0.10)',
      }}
    >
      {/* Crown + label */}
      <div style={{ textAlign: 'center' }}>
        <img src={skCrown} alt="" style={{ width: 14, height: 'auto', marginBottom: 5, display: 'block', marginInline: 'auto' }} />
        <p style={{
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontSize: 8,
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#930018',
          margin: 0,
        }}>
          {label}
        </p>
      </div>

      {/* Title */}
      <p style={{
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: 12,
        fontWeight: 800,
        color: '#40000F',
        lineHeight: 1.3,
        textAlign: 'center',
        margin: '8px 0',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
      }}>
        {title}
      </p>

      {/* Impact pill */}
      <div style={{
        backgroundColor: pillBg,
        color: pillColor,
        border: `1.5px solid ${pillColor}33`,
        borderRadius: 99,
        padding: '4px 10px',
        fontSize: 9,
        fontFamily: '"DM Sans", system-ui, sans-serif',
        fontWeight: 700,
        whiteSpace: 'nowrap',
      }}>
        {pillText}
      </div>
    </motion.div>
  )
}

// ── Step ──────────────────────────────────────────────────────────────────────
export default function MetaphorStep() {
  const [demoIdx, setDemoIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDemoIdx(i => (i + 1) % DEMO_SEQUENCE.length)
    }, 1500)
    return () => clearInterval(timer)
  }, [])

  const energy = DEMO_SEQUENCE[demoIdx]

  return (
    <div style={{ padding: '4px 24px 20px', display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* Live gauge */}
      <GaugeArc energy={energy} />

      {/* Headline */}
      <h2 style={{
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: 26,
        fontWeight: 800,
        color: '#930018',
        lineHeight: 1.25,
        textAlign: 'center',
        margin: '8px 0 12px',
      }}>
        You Are the Thermostat
      </h2>

      {/* Short copy */}
      <p style={{
        fontFamily: '"DM Sans", system-ui, sans-serif',
        fontSize: 14,
        color: '#40000F',
        lineHeight: 1.75,
        textAlign: 'center',
        marginBottom: 24,
        opacity: 0.8,
      }}>
        A thermometer only <em>reads</em> the room. A thermostat <strong>sets</strong> it.
        Two kinds of events move the gauge — and only one is yours to own.
      </p>

      {/* ── Three card-type legend ── */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'stretch', marginBottom: 20 }}>
        {/* Blue — energy drains */}
        <MiniCard
          bg="#D6E0FF"
          borderColor="rgba(0,78,147,0.35)"
          label="Environment"
          title="AC is Acting Up"
          pillText="−1 Deepfreeze"
          pillColor="#004E93"
          pillBg="#fff"
          delay={0.05}
        />
        {/* Pink — stress rises */}
        <MiniCard
          bg="#FFDEE5"
          borderColor="rgba(147,0,24,0.35)"
          label="Environment"
          title="Understaffed Rush"
          pillText="+2 Meltdown"
          pillColor="#930018"
          pillBg="#fff"
          delay={0.12}
        />
        {/* Cream — scenario card */}
        <MiniCard
          bg="#FFF9EF"
          borderColor="rgba(147,0,24,0.35)"
          label="Scenario"
          title="Guest Goes Off"
          pillText="Your call"
          pillColor="#930018"
          pillBg="#FFDEE5"
          delay={0.19}
        />
      </div>

      {/* Caption rows */}
      {[
        { dot: '#004E93', dotBg: '#D6E0FF', text: 'Sometimes the energy tanks and you don\'t have any control.' },
        { dot: '#930018', dotBg: '#FFDEE5', text: 'Sometimes the stress rises and you don\'t have any control.' },
        { dot: '#930018', dotBg: '#FFF9EF', text: 'But in most situations, you can shape the energy of the store.' },
      ].map(({ dot, dotBg, text }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 + i * 0.08, duration: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            marginBottom: 10,
          }}
        >
          <div style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: dotBg,
            border: `2px solid ${dot}`,
            flexShrink: 0,
            marginTop: 4,
          }} />
          <p style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 13,
            color: '#40000F',
            lineHeight: 1.6,
            margin: 0,
            opacity: 0.8,
          }}>
            {text}
          </p>
        </motion.div>
      ))}

    </div>
  )
}
