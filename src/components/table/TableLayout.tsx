import type { ReactNode } from 'react'
import type { SeatId } from '@/content/types'
import styles from './TableLayout.module.css'

interface TableLayoutProps {
  renderSeat: (seatId: SeatId) => ReactNode
  center?: ReactNode
}

export default function TableLayout({ renderSeat, center }: TableLayoutProps) {
  return (
    <div className={styles.table}>
      <div className={styles.north}>{renderSeat('N')}</div>
      <div className={styles.west}>{renderSeat('W')}</div>
      <div className={styles.center}>{center}</div>
      <div className={styles.east}>{renderSeat('E')}</div>
      <div className={styles.south}>{renderSeat('S')}</div>
    </div>
  )
}
