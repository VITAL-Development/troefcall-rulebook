import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { SeatId, TrickPlay } from '@/content/types'
import { cardId } from '@/content/types'
import PlayingCard from '@/components/cards/PlayingCard'
import styles from './TrickPile.module.css'

const SLOT_CLASS: Record<SeatId, string> = {
  N: styles.slotN,
  E: styles.slotE,
  S: styles.slotS,
  W: styles.slotW,
}

/** Where a swept-up trick flies toward, relative to the pile center, per winning seat. */
const COLLECT_TARGET: Record<SeatId, { x: number; y: number }> = {
  N: { x: 0, y: -120 },
  E: { x: 120, y: 0 },
  S: { x: 0, y: 120 },
  W: { x: -120, y: 0 },
}

interface TrickPileProps {
  plays: TrickPlay[]
  winningSeat?: SeatId
  layoutIdPrefix?: string
}

export default function TrickPile({ plays, winningSeat, layoutIdPrefix }: TrickPileProps) {
  const prefersReducedMotion = useReducedMotion()
  const collectTarget = winningSeat ? COLLECT_TARGET[winningSeat] : { x: 0, y: 0 }

  return (
    <div className={styles.pile}>
      <AnimatePresence>
        {plays.map((play) => {
          const isWinner = winningSeat === play.seat
          const isResolved = Boolean(winningSeat)
          return (
            <motion.div
              key={play.seat}
              layout
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.5, x: collectTarget.x, y: collectTarget.y }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.01 }
                  : { duration: 0.45, ease: 'easeInOut' }
              }
              className={[
                styles.slot,
                SLOT_CLASS[play.seat],
                isWinner ? styles.winner : '',
                isResolved && !isWinner ? styles.dimmed : '',
              ].join(' ')}
            >
              <PlayingCard
                card={play.card}
                size="sm"
                layoutId={layoutIdPrefix ? `${layoutIdPrefix}-${cardId(play.card)}` : undefined}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
