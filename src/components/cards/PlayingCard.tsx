import type { CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Card } from '@/content/types'
import SuitIcon, { SUIT_SYMBOL } from '@/components/cards/SuitIcon'
import styles from './PlayingCard.module.css'

export type CardSize = 'sm' | 'md' | 'lg'

const SIZE_DIMS: Record<CardSize, { w: number; h: number }> = {
  sm: { w: 52, h: 73 },
  md: { w: 70, h: 98 },
  lg: { w: 92, h: 129 },
}

interface PlayingCardProps {
  card?: Card
  faceUp?: boolean
  isTrump?: boolean
  size?: CardSize
  onClick?: () => void
  disabled?: boolean
  layoutId?: string
  className?: string
  'aria-label'?: string
}

export default function PlayingCard({
  card,
  faceUp = true,
  isTrump = false,
  size = 'md',
  onClick,
  disabled = false,
  layoutId,
  className,
  ...aria
}: PlayingCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const dims = SIZE_DIMS[size]
  const isRed = card && (card.suit === 'hearts' || card.suit === 'diamonds')
  const showFace = faceUp && card

  return (
    <motion.div
      layoutId={layoutId}
      className={[styles.cardWrap, className].filter(Boolean).join(' ')}
      style={{ '--card-w': `${dims.w}px`, '--card-h': `${dims.h}px` } as CSSProperties}
      whileHover={onClick && !disabled ? { y: -6 } : undefined}
      transition={
        prefersReducedMotion
          ? { duration: 0.01 }
          : { type: 'spring', stiffness: 400, damping: 30 }
      }
    >
      <button
        type="button"
        onClick={onClick}
        disabled={disabled || !onClick}
        className={[styles.card, onClick && !disabled ? styles.clickable : ''].join(' ')}
        style={{ border: 'none', padding: 0, background: 'none' }}
        aria-label={aria['aria-label'] ?? (card ? `${card.rank} ${SUIT_SYMBOL[card.suit]}` : 'kaart')}
      >
        <motion.div
          className={styles.face}
          style={{ transformStyle: 'preserve-3d' }}
          initial={false}
          animate={{ rotateY: showFace ? 0 : 180 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, ease: 'easeInOut' }}
        >
          {card && (
            <>
              <span className={[styles.rankTop, isRed ? styles.red : styles.black].join(' ')}>
                {card.rank}
                <SuitIcon suit={card.suit} size={12} />
              </span>
              <span className={styles.centerSuit}>
                <SuitIcon suit={card.suit} size={dims.w * 0.42} />
              </span>
              <span className={[styles.rankBottom, isRed ? styles.red : styles.black].join(' ')}>
                {card.rank}
                <SuitIcon suit={card.suit} size={12} />
              </span>
            </>
          )}
        </motion.div>
        <motion.div
          className={styles.back}
          style={{ transformStyle: 'preserve-3d' }}
          initial={false}
          animate={{ rotateY: showFace ? -180 : 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, ease: 'easeInOut' }}
        />
      </button>
      {isTrump && <span className={styles.trumpBadge}>TROEF</span>}
    </motion.div>
  )
}
