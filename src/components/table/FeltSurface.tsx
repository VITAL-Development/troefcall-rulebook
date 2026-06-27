import type { ReactNode } from 'react'
import styles from './FeltSurface.module.css'

interface FeltSurfaceProps {
  children: ReactNode
  className?: string
}

export default function FeltSurface({ children, className }: FeltSurfaceProps) {
  return (
    <div className={[styles.felt, className].filter(Boolean).join(' ')}>
      <div className={styles.inner}>{children}</div>
    </div>
  )
}
