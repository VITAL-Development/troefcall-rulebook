import type { ReactNode } from 'react'
import styles from './Tag.module.css'

interface TagProps {
  children: ReactNode
  onClick?: () => void
  active?: boolean
}

export default function Tag({ children, onClick, active }: TagProps) {
  const classes = [styles.tag, onClick ? styles.clickable : '', active ? styles.active : '']
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
