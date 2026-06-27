import type { ReactNode } from 'react'
import styles from './WoodPanel.module.css'

interface WoodPanelProps {
  children: ReactNode
  className?: string
}

export default function WoodPanel({ children, className }: WoodPanelProps) {
  return <div className={[styles.panel, className].filter(Boolean).join(' ')}>{children}</div>
}
