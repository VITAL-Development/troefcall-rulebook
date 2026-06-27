import styles from './ScoreBadge.module.css'

interface ScoreBadgeProps {
  points: number
  label?: string
}

export default function ScoreBadge({ points, label = 'punten' }: ScoreBadgeProps) {
  return (
    <span className={styles.badge}>
      <span className={styles.points}>{points}</span>
      <span className={styles.label}>{label}</span>
    </span>
  )
}
