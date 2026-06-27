export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs'
export type Rank = 'A' | 'K' | 'Q' | 'J' | '10' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2'

export interface Card {
  rank: Rank
  suit: Suit
}

export const ALL_SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs']
export const ALL_RANKS: Rank[] = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']

export function cardId(card: Card): string {
  return `${card.rank}-${card.suit}`
}

export type SeatId = 'N' | 'E' | 'S' | 'W'

export interface Seat {
  id: SeatId
  name: string
  team: 1 | 2
  isDealer?: boolean
  isCaller?: boolean
}

export interface TrickPlay {
  seat: SeatId
  card: Card
}

export interface DealStep {
  type: 'deal'
  hands: Partial<Record<SeatId, Card[]>>
  /** Card counts for seats whose exact hand isn't shown (still face-down). */
  handCounts?: Partial<Record<SeatId, number>>
  caption: string
}

export interface DeclareTrumpStep {
  type: 'declareTrump'
  seat: SeatId
  suit: Suit
  caption: string
}

export interface PlayStep {
  type: 'play'
  seat: SeatId
  card: Card
  caption: string
}

export interface ResolveTrickStep {
  type: 'resolveTrick'
  winningSeat: SeatId
  caption: string
}

export interface CalloutStep {
  type: 'callout'
  tone: 'info' | 'warning' | 'success'
  text: string
}

export interface ScoreStep {
  type: 'score'
  team: 1 | 2
  points: number
  reason: string
}

export type ExampleStep =
  | DealStep
  | DeclareTrumpStep
  | PlayStep
  | ResolveTrickStep
  | CalloutStep
  | ScoreStep

export type ExampleLevel = 'simple' | 'twist' | 'full'

export interface RuleExample {
  id: string
  level: ExampleLevel
  title: string
  narration: string
  seats: [Seat, Seat, Seat, Seat]
  /** Trump already fixed before the example starts (when no in-example declareTrump step sets it). */
  trumpSuit?: Suit
  steps: ExampleStep[]
}

export interface RuleTopic {
  id: string
  title: string
  intro: string
  rules: string[]
  examples: [RuleExample, RuleExample, RuleExample]
}

