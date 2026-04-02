import { motion } from 'framer-motion'
import CardShell, { TypeHeader, CardTitle, CardDescription, ImpactPill } from './CardShell.jsx'

export function getEnvImpactLabel(impact) {
  if (impact > 0) return `+${impact} (Meltdown)`
  if (impact < 0) return `${impact} (Deepfreeze)`
  return '0 (Balanced)'
}

export function getEnvBg(energyImpact) {
  return energyImpact > 0 ? '#FFDEE5' : '#D6E0FF'
}

export default function EnvironmentCard({ card }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 22, stiffness: 110 }}
      style={{ width: '100%' }}
    >
      <CardShell bg={getEnvBg(card.energyImpact)}>
        <TypeHeader label="Environment" subtitle="Out of Your Control" />
        <CardTitle>{card.title}</CardTitle>
        <ImpactPill>{getEnvImpactLabel(card.energyImpact)}</ImpactPill>
        <CardDescription>{card.description}</CardDescription>
      </CardShell>
    </motion.div>
  )
}
