import type { ReactNode } from 'react'
import type { Seat } from '@/content/types'
import styles from './PlayerSeat.module.css'

interface PlayerSeatProps {
  seat: Seat
  children?: ReactNode
}

export default function PlayerSeat({ seat, children }: PlayerSeatProps) {
  return (
    <div className={styles.seat}>
      <span className={styles.name}>{seat.name}</span>
      <div className={styles.badges}>
        {seat.isDealer && <span className={styles.badge}>Dealer</span>}
        {seat.isCaller && <span className={styles.badge}>Caller</span>}
        <span className={[styles.team, seat.team === 1 ? styles.team1 : styles.team2].join(' ')}>
          Koppel {seat.team}
        </span>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
