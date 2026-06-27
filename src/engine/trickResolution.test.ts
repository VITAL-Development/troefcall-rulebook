import { describe, expect, it } from 'vitest'
import type { Card, SeatId, TrickPlay } from '@/content/types'
import { createDeck, dealHand, isLegalPlay, rankValue, resolveTrick } from './trickResolution'

describe('rankValue', () => {
  it('ranks ace highest and two lowest', () => {
    expect(rankValue('A')).toBe(13)
    expect(rankValue('2')).toBe(1)
  })

  it('ranks face cards above 10', () => {
    expect(rankValue('K')).toBeGreaterThan(rankValue('Q'))
    expect(rankValue('Q')).toBeGreaterThan(rankValue('J'))
    expect(rankValue('J')).toBeGreaterThan(rankValue('10'))
  })
})

describe('createDeck', () => {
  it('produces exactly 52 unique cards', () => {
    const deck = createDeck()
    expect(deck).toHaveLength(52)
    const ids = new Set(deck.map((c) => `${c.rank}-${c.suit}`))
    expect(ids.size).toBe(52)
  })
})

describe('dealHand', () => {
  const seatOrder: SeatId[] = ['N', 'E', 'S', 'W']

  it('gives every seat exactly 13 cards', () => {
    const hands = dealHand(createDeck(), seatOrder, 'E')
    for (const seat of seatOrder) {
      expect(hands[seat]).toHaveLength(13)
    }
  })

  it("deals the caller's first 5 cards before anyone else", () => {
    const deck = createDeck()
    const hands = dealHand(deck, seatOrder, 'S')
    expect(hands.S.slice(0, 5)).toEqual(deck.slice(0, 5))
  })

  it('deals every card from the deck exactly once', () => {
    const deck = createDeck()
    const hands = dealHand(deck, seatOrder, 'N')
    const dealt = [...hands.N, ...hands.E, ...hands.S, ...hands.W]
    expect(dealt).toHaveLength(52)
    expect(new Set(dealt.map((c) => `${c.rank}-${c.suit}`)).size).toBe(52)
  })

  it('rejects a deck that is not exactly 52 cards', () => {
    expect(() => dealHand(createDeck().slice(0, 51), seatOrder, 'N')).toThrow()
  })
})

describe('isLegalPlay', () => {
  const hand: Card[] = [
    { rank: 'A', suit: 'spades' },
    { rank: '9', suit: 'hearts' },
  ]

  it('allows any card when leading', () => {
    expect(isLegalPlay(hand, hand[0], undefined)).toBe(true)
  })

  it('allows following suit', () => {
    expect(isLegalPlay(hand, { rank: '9', suit: 'hearts' }, 'hearts')).toBe(true)
  })

  it('forbids playing another suit while holding the led suit', () => {
    expect(isLegalPlay(hand, { rank: 'A', suit: 'spades' }, 'hearts')).toBe(false)
  })

  it('allows troeven/snijden when out of the led suit', () => {
    expect(isLegalPlay(hand, { rank: 'A', suit: 'spades' }, 'diamonds')).toBe(true)
  })
})

describe('resolveTrick', () => {
  it('awards the trick to the highest card of the led suit when untrumped', () => {
    const plays: TrickPlay[] = [
      { seat: 'N', card: { rank: 'K', suit: 'hearts' } },
      { seat: 'E', card: { rank: '9', suit: 'hearts' } },
      { seat: 'S', card: { rank: '2', suit: 'clubs' } },
      { seat: 'W', card: { rank: '3', suit: 'hearts' } },
    ]
    expect(resolveTrick(plays, 'hearts', 'spades')).toBe('N')
  })

  it('awards the trick to the highest trump when troeven/snijden occurred', () => {
    const plays: TrickPlay[] = [
      { seat: 'N', card: { rank: 'K', suit: 'hearts' } },
      { seat: 'E', card: { rank: '9', suit: 'hearts' } },
      { seat: 'S', card: { rank: 'A', suit: 'spades' } },
      { seat: 'W', card: { rank: '3', suit: 'hearts' } },
    ]
    expect(resolveTrick(plays, 'hearts', 'spades')).toBe('S')
  })

  it('picks the highest of multiple trumps played', () => {
    const plays: TrickPlay[] = [
      { seat: 'N', card: { rank: '7', suit: 'hearts' } },
      { seat: 'E', card: { rank: '4', suit: 'spades' } },
      { seat: 'S', card: { rank: 'J', suit: 'spades' } },
      { seat: 'W', card: { rank: '2', suit: 'hearts' } },
    ]
    expect(resolveTrick(plays, 'hearts', 'spades')).toBe('S')
  })

  it('throws on an empty trick', () => {
    expect(() => resolveTrick([], 'hearts', 'spades')).toThrow()
  })
})
