import type { Card, Rank, Suit, SeatId, TrickPlay } from '@/content/types'
import { ALL_RANKS, ALL_SUITS } from '@/content/types'

/** A is highest (13), 2 is lowest (1); same order in every suit, including trump. */
export function rankValue(rank: Rank): number {
  return ALL_RANKS.length - ALL_RANKS.indexOf(rank)
}

export function createDeck(): Card[] {
  return ALL_SUITS.flatMap((suit) => ALL_RANKS.map((rank) => ({ rank, suit })))
}

/**
 * Deals a 52-card deck 13 per seat: the caller gets 5 first (so they can
 * declare troef before anyone else is dealt), then 5/4/4 clockwise to the
 * other three, then 4/4 to everyone including the caller.
 */
export function dealHand(deck: Card[], seatOrder: SeatId[], callerSeat: SeatId): Record<SeatId, Card[]> {
  if (deck.length !== 52) throw new Error('deck must contain exactly 52 cards')
  if (!seatOrder.includes(callerSeat)) throw new Error('callerSeat must be part of seatOrder')

  const hands: Record<SeatId, Card[]> = { N: [], E: [], S: [], W: [] }
  const others = seatOrder.filter((seat) => seat !== callerSeat)
  let cursor = 0
  const take = (seat: SeatId, count: number) => {
    hands[seat].push(...deck.slice(cursor, cursor + count))
    cursor += count
  }

  take(callerSeat, 5)
  others.forEach((seat) => take(seat, 5))
  for (const batch of [4, 4]) {
    take(callerSeat, batch)
    others.forEach((seat) => take(seat, batch))
  }

  return hands
}

/**
 * A card is legal if it follows the led suit, or if the player has none of
 * the led suit left (in which case anything, including trump, is allowed).
 */
export function isLegalPlay(hand: Card[], card: Card, ledSuit: Suit | undefined): boolean {
  if (!ledSuit) return true
  if (card.suit === ledSuit) return true
  return !hand.some((c) => c.suit === ledSuit)
}

/**
 * Highest card of the led suit wins, unless the trick was trumped/"gesneden",
 * in which case the highest trump played wins.
 */
export function resolveTrick(plays: TrickPlay[], ledSuit: Suit, trumpSuit: Suit): SeatId {
  if (plays.length === 0) throw new Error('cannot resolve an empty trick')

  const trumpPlays = plays.filter((p) => p.card.suit === trumpSuit)
  const contenders = trumpPlays.length > 0 ? trumpPlays : plays.filter((p) => p.card.suit === ledSuit)

  return contenders.reduce((best, current) =>
    rankValue(current.card.rank) > rankValue(best.card.rank) ? current : best,
  ).seat
}
