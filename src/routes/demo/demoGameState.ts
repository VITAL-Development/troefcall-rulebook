import type { Card, Suit, SeatId, TrickPlay } from '@/content/types'
import { dealHand, isLegalPlay, resolveTrick } from '@/engine/trickResolution'

export type DemoPhase = 'playing' | 'resolved' | 'done'

export interface DemoGameState {
  phase: DemoPhase
  trumpSuit: Suit
  hands: Record<SeatId, Card[]>
  currentTrick: TrickPlay[]
  ledSuit: Suit | undefined
  leader: SeatId
  turnSeat: SeatId
  trickWinner: SeatId | undefined
  tricks: Record<SeatId, number>
  tricksDone: number
}

/** Clockwise seat order used for turn advancement. */
export const CLOCKWISE: SeatId[] = ['N', 'E', 'S', 'W']

export function nextSeat(seat: SeatId): SeatId {
  const idx = CLOCKWISE.indexOf(seat)
  return CLOCKWISE[(idx + 1) % 4]
}

/** Fisher-Yates shuffle (returns a new array). */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildDeck(): Card[] {
  const suits: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs']
  const ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'] as const
  return suits.flatMap((suit) => ranks.map((rank) => ({ rank, suit })))
}

export function createInitialState(trumpSuit: Suit, startingLeader: SeatId): DemoGameState {
  const deck = shuffle(buildDeck())
  const hands = dealHand(deck, CLOCKWISE, startingLeader)
  return {
    phase: 'playing',
    trumpSuit,
    hands,
    currentTrick: [],
    ledSuit: undefined,
    leader: startingLeader,
    turnSeat: startingLeader,
    trickWinner: undefined,
    tricks: { N: 0, E: 0, S: 0, W: 0 },
    tricksDone: 0,
  }
}

export function getPlayableCards(state: DemoGameState, seat: SeatId): Card[] {
  return state.hands[seat].filter((card) => isLegalPlay(state.hands[seat], card, state.ledSuit))
}

export function playCard(state: DemoGameState, seat: SeatId, card: Card): DemoGameState {
  if (state.phase !== 'playing') {
    throw new Error(`Cannot play a card in phase '${state.phase}'`)
  }
  if (seat !== state.turnSeat) {
    throw new Error(`It is ${state.turnSeat}'s turn, not ${seat}'s`)
  }
  const handHasCard = state.hands[seat].some((c) => c.rank === card.rank && c.suit === card.suit)
  if (!handHasCard) {
    throw new Error(`Card ${card.rank}-${card.suit} is not in ${seat}'s hand`)
  }
  if (!isLegalPlay(state.hands[seat], card, state.ledSuit)) {
    throw new Error(`Playing ${card.rank}-${card.suit} is not legal (must follow suit)`)
  }

  const newHand = state.hands[seat].filter((c) => !(c.rank === card.rank && c.suit === card.suit))
  const newTrick: TrickPlay[] = [...state.currentTrick, { seat, card }]
  const newLedSuit: Suit | undefined = state.ledSuit ?? card.suit

  // If this is the 4th card, resolve the trick
  if (newTrick.length === 4) {
    const winner = resolveTrick(newTrick, newLedSuit, state.trumpSuit)
    const newTricksDone = state.tricksDone + 1
    return {
      ...state,
      hands: { ...state.hands, [seat]: newHand },
      currentTrick: newTrick,
      ledSuit: newLedSuit,
      phase: newTricksDone >= 13 ? 'done' : 'resolved',
      trickWinner: winner,
      tricks: { ...state.tricks, [winner]: state.tricks[winner] + 1 },
      tricksDone: newTricksDone,
    }
  }

  return {
    ...state,
    hands: { ...state.hands, [seat]: newHand },
    currentTrick: newTrick,
    ledSuit: newLedSuit,
    turnSeat: nextSeat(state.turnSeat),
  }
}

export function clearAndAdvance(state: DemoGameState): DemoGameState {
  if (state.phase !== 'resolved') {
    throw new Error(`clearAndAdvance called in phase '${state.phase}', expected 'resolved'`)
  }
  const winner = state.trickWinner!
  return {
    ...state,
    phase: 'playing',
    currentTrick: [],
    ledSuit: undefined,
    leader: winner,
    turnSeat: winner,
    trickWinner: undefined,
  }
}

/** Returns tricks won by each team (N+S = team 1, E+W = team 2). */
export function teamScores(state: DemoGameState): { team1: number; team2: number } {
  return {
    team1: state.tricks.N + state.tricks.S,
    team2: state.tricks.E + state.tricks.W,
  }
}
