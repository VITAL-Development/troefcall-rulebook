import type { ReactNode } from 'react'
import type { Seat } from '@/content/types'
import styles from './PlayerSeat.module.css'

interface PlayerSeatProps {
  seat: Seat
  children?: ReactNode
  /** Reserves a hand's worth of height even while this seat is empty, so a seat that's dealt
   *  cards partway through an example doesn't grow the table at that step. */
  reserveHandHeight?: boolean
}

export default function PlayerSeat({ seat, children, reserveHandHeight }: PlayerSeatProps) {
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
      <div className={[styles.content, reserveHandHeight ? styles.contentReserved : ''].join(' ')}>
        {children}
      </div>
    </div>
  )
}
