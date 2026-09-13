import { useEffect, useReducer, useCallback } from 'react'
import type { Card, Suit, SeatId, TrickPlay } from '@/content/types'
import { ALL_SUITS, cardId } from '@/content/types'
import { createDeck, dealHand, isLegalPlay, resolveTrick } from '@/engine/trickResolution'
import TableLayout from '@/components/table/TableLayout'
import PlayerSeat from '@/components/table/PlayerSeat'
import Hand from '@/components/cards/Hand'
import TrickPile from '@/components/cards/TrickPile'
import SuitIcon, { SUIT_NAME_NL } from '@/components/cards/SuitIcon'
import WoodPanel from '@/components/ui/WoodPanel'
import styles from './TrickResolutionDemo.module.css'

const SEATS: Record<SeatId, { id: SeatId; name: string; team: 1 | 2 }> = {
  N: { id: 'N', name: 'Noord', team: 1 },
  E: { id: 'E', name: 'Oost', team: 2 },
  S: { id: 'S', name: 'Zuid', team: 1 },
  W: { id: 'W', name: 'West', team: 2 },
}

const SEAT_ORDER: SeatId[] = ['N', 'E', 'S', 'W']
const HUMAN_SEAT: SeatId = 'S'


function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function cpuPickCard(hand: Card[], ledSuit: Suit | undefined, trumpSuit: Suit): Card {
  const legal = hand.filter((c) => isLegalPlay(hand, c, ledSuit))
  if (!ledSuit) {
    // Leading: prefer a non-trump if possible
    const nonTrump = legal.filter((c) => c.suit !== trumpSuit)
    return (nonTrump.length > 0 ? nonTrump : legal)[Math.floor(Math.random() * (nonTrump.length || legal.length))]
  }
  // Following: pick random legal card
  return legal[Math.floor(Math.random() * legal.length)]
}

type Phase = 'setup' | 'playing' | 'resolved' | 'done'

interface GameState {
  phase: Phase
  trumpSuit: Suit
  pendingTrump: Suit | null
  hands: Record<SeatId, Card[]>
  trickPlays: TrickPlay[]
  trickLeader: SeatId
  trickWinner: SeatId | null
  trickScores: Record<1 | 2, number>
  handCount: number
}

type Action =
  | { type: 'SELECT_TRUMP'; suit: Suit }
  | { type: 'START_GAME' }
  | { type: 'PLAY_CARD'; seatId: SeatId; card: Card }
  | { type: 'NEXT_TRICK' }
  | { type: 'RESTART' }

function initialState(): GameState {
  return {
    phase: 'setup',
    trumpSuit: 'hearts',
    pendingTrump: 'hearts',
    hands: { N: [], E: [], S: [], W: [] },
    trickPlays: [],
    trickLeader: 'N',
    trickWinner: null,
    trickScores: { 1: 0, 2: 0 },
    handCount: 0,
  }
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SELECT_TRUMP':
      return { ...state, pendingTrump: action.suit }

    case 'START_GAME': {
      if (!state.pendingTrump) return state
      const deck = shuffle(createDeck())
      const hands = dealHand(deck, SEAT_ORDER, 'N')
      return {
        ...state,
        phase: 'playing',
        trumpSuit: state.pendingTrump,
        hands,
        trickPlays: [],
        trickLeader: 'N',
        trickWinner: null,
        trickScores: { 1: 0, 2: 0 },
        handCount: 0,
      }
    }

    case 'PLAY_CARD': {
      if (state.phase !== 'playing') return state
      const newPlays = [...state.trickPlays, { seat: action.seatId, card: action.card }]
      const newHand = state.hands[action.seatId].filter((c) => cardId(c) !== cardId(action.card))
      const newHands = { ...state.hands, [action.seatId]: newHand }

      if (newPlays.length < 4) {
        return { ...state, trickPlays: newPlays, hands: newHands }
      }

      // All 4 played — resolve
      const ledSuit = newPlays[0].card.suit
      const winner = resolveTrick(newPlays, ledSuit, state.trumpSuit)
      const winnerTeam = SEATS[winner].team
      const newScores = { ...state.trickScores, [winnerTeam]: state.trickScores[winnerTeam] + 1 }

      return {
        ...state,
        phase: 'resolved',
        trickPlays: newPlays,
        hands: newHands,
        trickWinner: winner,
        trickScores: newScores,
      }
    }

    case 'NEXT_TRICK': {
      if (state.phase !== 'resolved' || !state.trickWinner) return state
      const newHandCount = state.handCount + 1

      if (newHandCount >= 13) {
        return { ...state, phase: 'done', trickPlays: [], handCount: newHandCount }
      }

      return {
        ...state,
        phase: 'playing',
        trickPlays: [],
        trickLeader: state.trickWinner,
        trickWinner: null,
        handCount: newHandCount,
      }
    }

    case 'RESTART':
      return initialState()

    default:
      return state
  }
}

function currentTurn(state: GameState): SeatId {
  const leaderIdx = SEAT_ORDER.indexOf(state.trickLeader)
  return SEAT_ORDER[(leaderIdx + state.trickPlays.length) % 4]
}

export default function TrickResolutionDemo() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState)

  const turn = state.phase === 'playing' ? currentTurn(state) : null
  const isCpuTurn = turn !== null && turn !== HUMAN_SEAT
  const ledSuit = state.trickPlays.length > 0 ? state.trickPlays[0].card.suit : undefined

  // CPU auto-play
  useEffect(() => {
    if (!isCpuTurn) return
    const timer = setTimeout(() => {
      const card = cpuPickCard(state.hands[turn!], ledSuit, state.trumpSuit)
      dispatch({ type: 'PLAY_CARD', seatId: turn!, card })
    }, 600)
    return () => clearTimeout(timer)
  }, [isCpuTurn, turn, state.hands, ledSuit, state.trumpSuit])

  // Auto-advance after trick resolves
  useEffect(() => {
    if (state.phase !== 'resolved') return
    const timer = setTimeout(() => dispatch({ type: 'NEXT_TRICK' }), 1500)
    return () => clearTimeout(timer)
  }, [state.phase, state.trickWinner])

  const handlePlayCard = useCallback(
    (card: Card) => {
      if (state.phase !== 'playing' || turn !== HUMAN_SEAT) return
      dispatch({ type: 'PLAY_CARD', seatId: HUMAN_SEAT, card })
    },
    [state.phase, turn],
  )

  const humanHand = state.hands[HUMAN_SEAT]
  const humanPlayable =
    state.phase === 'playing' && turn === HUMAN_SEAT
      ? new Set(humanHand.filter((c) => isLegalPlay(humanHand, c, ledSuit)).map(cardId))
      : undefined

  const winnerName = state.trickWinner ? SEATS[state.trickWinner].name : null
  const winnerTeam = state.trickWinner ? SEATS[state.trickWinner].team : null

  const overallWinner =
    state.phase === 'done'
      ? state.trickScores[1] > state.trickScores[2]
        ? 'Noord/Zuid'
        : state.trickScores[2] > state.trickScores[1]
          ? 'Oost/West'
          : 'Gelijkspel'
      : null

  return (
    <div className={styles.page}>
      <p className={styles.intro}>
        Kies troef en speel een volledige hand van 13 slagen. Jij bent <strong>Zuid</strong> (koppel 1 met Noord). De
        andere drie spelers zijn CPU. Volgen is verplicht — illegale kaarten zijn uitgeschakeld.
      </p>

      {/* ── SETUP ── */}
      {state.phase === 'setup' && (
        <WoodPanel>
          <div className={styles.setup}>
            <h2>Kies troef</h2>
            <div className={styles.suitPicker}>
              {ALL_SUITS.map((suit) => (
                <button
                  key={suit}
                  className={[styles.suitBtn, state.pendingTrump === suit ? styles.selected : ''].join(' ')}
                  onClick={() => dispatch({ type: 'SELECT_TRUMP', suit })}
                >
                  <SuitIcon suit={suit} size={18} />
                  {SUIT_NAME_NL[suit]}
                </button>
              ))}
            </div>
            <button className={styles.startBtn} onClick={() => dispatch({ type: 'START_GAME' })}>
              Start
            </button>
          </div>
        </WoodPanel>
      )}

      {/* ── GAME ── */}
      {(state.phase === 'playing' || state.phase === 'resolved') && (
        <div className={styles.game}>
          <div className={styles.scorebar}>
            <span>
              Troef:{' '}
              <span className={styles.trumpLabel}>
                <SuitIcon suit={state.trumpSuit} size={14} color="var(--color-wood-900)" />
                {SUIT_NAME_NL[state.trumpSuit]}
              </span>
            </span>
            <span>Slag {state.handCount + 1} / 13</span>
            <span>Noord/Zuid: {state.trickScores[1]} · Oost/West: {state.trickScores[2]}</span>
          </div>

          <p className={[styles.message, state.phase === 'resolved' ? styles.highlight : ''].join(' ')}>
            {state.phase === 'resolved'
              ? `${winnerName} (Koppel ${winnerTeam}) wint de slag!`
              : turn === HUMAN_SEAT
                ? ''
                : `${SEATS[turn!]?.name ?? ''} speelt...`}
          </p>

          {state.phase === 'playing' && turn === HUMAN_SEAT && (
            <p className={styles.humanPrompt}>Kies een kaart om te spelen</p>
          )}

          <TableLayout
            renderSeat={(seatId) => {
              const seat = SEATS[seatId]
              const isCurrentTurn = turn === seatId && state.phase === 'playing'
              const seatCards = state.hands[seatId]
              return (
                <PlayerSeat
                  seat={{
                    ...seat,
                    isDealer: false,
                    isCaller: seatId === 'N',
                  }}
                >
                  <Hand
                    cards={seatCards}
                    faceUp={true}
                    size={seatId === HUMAN_SEAT ? 'md' : 'sm'}
                    trumpSuit={state.trumpSuit}
                    playableCardIds={seatId === HUMAN_SEAT ? humanPlayable : undefined}
                    onPlayCard={seatId === HUMAN_SEAT && isCurrentTurn ? handlePlayCard : undefined}
                    layoutIdPrefix={`demo-${seatId}`}
                  />
                </PlayerSeat>
              )
            }}
            center={
              <TrickPile
                plays={state.trickPlays}
                winningSeat={state.trickWinner ?? undefined}
                layoutIdPrefix="demo-trick"
              />
            }
          />
        </div>
      )}

      {/* ── DONE ── */}
      {state.phase === 'done' && (
        <WoodPanel>
          <div className={styles.finalScore}>
            <h3>Hand afgelopen</h3>
            <div className={styles.scoreRow}>
              <span>Noord/Zuid: {state.trickScores[1]} slagen</span>
              <span>·</span>
              <span>Oost/West: {state.trickScores[2]} slagen</span>
            </div>
            <p className={styles.winner}>{overallWinner} wint!</p>
            <button className={styles.restartBtn} onClick={() => dispatch({ type: 'RESTART' })}>
              Opnieuw spelen
            </button>
          </div>
        </WoodPanel>
      )}
    </div>
  )
}
