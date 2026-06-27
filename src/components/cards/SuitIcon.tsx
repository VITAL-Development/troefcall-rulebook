export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs'

interface SuitIconProps {
  suit: Suit
  size?: number
  color?: string
  className?: string
}

const PATHS: Record<Suit, string> = {
  spades:
    'M12 2c-3.2 4-7 6.2-7 10.2A4.4 4.4 0 0 0 12 16c-.3 1.9-1 3.3-2 4.6h4c-1-1.3-1.7-2.7-2-4.6a4.4 4.4 0 0 0 7-3.8C19 8.2 15.2 6 12 2z',
  hearts:
    'M12 21s-7.5-4.6-10.3-9.2C-0.2 8.4 1.4 4.5 5 3.4 7.6 2.6 10 3.8 12 6.5c2-2.7 4.4-3.9 7-3.1 3.6 1.1 5.2 5 3.3 8.4C19.5 16.4 12 21 12 21z',
  diamonds: 'M12 2 20 12 12 22 4 12z',
  clubs:
    'M12 2a4 4 0 0 0-4 4c0 1 .3 1.9.8 2.6A4 4 0 1 0 8 16c1 0 1.9-.3 2.6-.8-.3 1.9-1 3.3-2 4.6h6.8c-1-1.3-1.7-2.7-2-4.6.7.5 1.6.8 2.6.8a4 4 0 1 0-.8-7.4c.5-.7.8-1.6.8-2.6a4 4 0 0 0-4-4z',
}

export default function SuitIcon({ suit, size = 20, color, className }: SuitIconProps) {
  const isRed = suit === 'hearts' || suit === 'diamonds'
  const fill = color ?? (isRed ? 'var(--color-suit-red)' : 'var(--color-suit-black)')

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      className={className}
      aria-hidden="true"
    >
      <path d={PATHS[suit]} />
    </svg>
  )
}

export const SUIT_SYMBOL: Record<Suit, string> = {
  spades: '♠',
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
}

export const SUIT_NAME_NL: Record<Suit, string> = {
  spades: 'Schoppen',
  hearts: 'Harten',
  diamonds: 'Ruiten',
  clubs: 'Klaveren',
}
