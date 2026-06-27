import type { Card, Suit } from '@/content/types'
import { cardId } from '@/content/types'
import PlayingCard, { type CardSize } from '@/components/cards/PlayingCard'
import styles from './Hand.module.css'

interface HandProps {
  cards: Card[]
  faceUp?: boolean
  size?: CardSize
  trumpSuit?: Suit
  highlightedCardId?: string
  playableCardIds?: Set<string>
  onPlayCard?: (card: Card) => void
  layoutIdPrefix?: string
}

export default function Hand({
  cards,
  faceUp = true,
  size = 'md',
  trumpSuit,
  highlightedCardId,
  playableCardIds,
  onPlayCard,
  layoutIdPrefix,
}: HandProps) {
  return (
    <div className={styles.hand}>
      {cards.map((card) => {
        const id = cardId(card)
        const isHighlighted = highlightedCardId === id
        const isPlayable = !playableCardIds || playableCardIds.has(id)
        return (
          <div key={id} className={[styles.slot, isHighlighted ? styles.highlighted : ''].join(' ')}>
            <PlayingCard
              card={card}
              faceUp={faceUp}
              size={size}
              isTrump={trumpSuit === card.suit}
              layoutId={layoutIdPrefix ? `${layoutIdPrefix}-${id}` : undefined}
              onClick={onPlayCard && isPlayable ? () => onPlayCard(card) : undefined}
              disabled={Boolean(onPlayCard) && !isPlayable}
            />
          </div>
        )
      })}
    </div>
  )
}
