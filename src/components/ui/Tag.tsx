import type { ReactNode } from 'react'
import styles from './Tag.module.css'

interface TagProps {
  children: ReactNode
  onClick?: () => void
  active?: boolean
  /** Use on light backgrounds (e.g. a card face) — the default tone is pale gold-on-gold and
   *  only reads on the dark felt/wood surfaces it was designed for. */
  onLight?: boolean
}

export default function Tag({ children, onClick, active, onLight }: TagProps) {
  const classes = [
    styles.tag,
    onClick ? styles.clickable : '',
    active ? styles.active : '',
    onLight ? styles.onLight : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (onClick) {
    return (
      <button type="button" className={classes} onClick={onClick}>
        {children}
      </button>
    )
  }
  return <span className={classes}>{children}</span>
}
