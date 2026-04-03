import { motion } from 'framer-motion'
import CardShell, { TypeHeader, CardTitle, CardDescription, ImpactPill } from './CardShell.jsx'

export function getEnvImpactLabel(impact) {
  if (impact > 0) return `+${impact} (Meltdown)`
  if (impact < 0) return `${impact} (Deepfreeze)`
  return '0 (Balanced)'
}

// Kept for any external usage (history stack tinting etc.) but cards are now cream
export function getEnvBg() { return '#FFF9EF' }

function getEnvPill(energyImpact) {
  if (energyImpact > 0) return { bgColor: '#FFDEE5', color: '#930018', borderColor: 'rgba(147,0,24,0.18)' }
  if (energyImpact < 0) return { bgColor: '#D6E0FF', color: '#004E93', borderColor: 'rgba(0,78,147,0.18)' }
  return { bgColor: '#E8F5E8', color: '#1A6B2A', borderColor: 'rgba(26,107,42,0.18)' }
}

export default function EnvironmentCard({ card }) {
  const pill = getEnvPill(card.energyImpact)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 22, stiffness: 110 }}
      style={{ width: '100%' }}
    >
      <CardShell bg="#FFF9EF">
        {/* Top: crown + type label */}
        <TypeHeader label="Environment" subtitle="Out of Your Control" />

        {/* Middle: title + description */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px 0',
        }}>
          <CardTitle>{card.title}</CardTitle>
          <CardDescription>{card.description}</CardDescription>
        </div>

        {/* Bottom: filled impact pill */}
        <ImpactPill bgColor={pill.bgColor} color={pill.color} borderColor={pill.borderColor}>
          {getEnvImpactLabel(card.energyImpact)}
        </ImpactPill>
      </CardShell>
    </motion.div>
  )
}
