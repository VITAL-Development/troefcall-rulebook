import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Card, ExampleStep, RuleExample, SeatId, Suit, TrickPlay } from '@/content/types'
import { cardId } from '@/content/types'
import TableLayout from '@/components/table/TableLayout'
import PlayerSeat from '@/components/table/PlayerSeat'
import Hand from '@/components/cards/Hand'
import CardBack from '@/components/cards/CardBack'
import TrickPile from '@/components/cards/TrickPile'
import ScoreBadge from '@/components/ui/ScoreBadge'
import SuitIcon, { SUIT_NAME_NL } from '@/components/cards/SuitIcon'
import styles from './ExampleStepper.module.css'

interface AccumulatedState {
  hands: Partial<Record<SeatId, Card[]>>
  handCounts: Partial<Record<SeatId, number>>
  trumpSuit?: Suit
  trickPlays: TrickPlay[]
  winningSeat?: SeatId
  scoreLog: { team: 1 | 2; points: number; reason: string }[]
  latestCallout?: { tone: 'info' | 'warning' | 'success'; text: string }
}

function stepCaption(step: ExampleStep): string {
  switch (step.type) {
    case 'deal':
    case 'declareTrump':
    case 'play':
    case 'resolveTrick':
      return step.caption
    case 'callout':
      return step.text
    case 'score':
      return step.reason
  }
}

function accumulate(steps: ExampleStep[], upTo: number, initialTrumpSuit?: Suit): AccumulatedState {
  const state: AccumulatedState = { hands: {}, handCounts: {}, trumpSuit: initialTrumpSuit, trickPlays: [], scoreLog: [] }
  for (let i = 0; i <= upTo; i++) {
    const step = steps[i]
    switch (step.type) {
      case 'deal':
        state.hands = { ...state.hands, ...step.hands }
        state.handCounts = { ...state.handCounts, ...step.handCounts }
        break
      case 'declareTrump':
        state.trumpSuit = step.suit
        break
      case 'play':
        if (state.winningSeat) {
          state.trickPlays = []
          state.winningSeat = undefined
        }
        state.trickPlays = [...state.trickPlays, { seat: step.seat, card: step.card }]
        if (state.hands[step.seat]) {
          state.hands = {
            ...state.hands,
            [step.seat]: state.hands[step.seat]!.filter((c) => cardId(c) !== cardId(step.card)),
          }
        }
        break
      case 'resolveTrick':
        state.winningSeat = step.winningSeat
        break
      case 'callout':
        state.latestCallout = { tone: step.tone, text: step.text }
        break
      case 'score':
        state.scoreLog = [...state.scoreLog, { team: step.team, points: step.points, reason: step.reason }]
        break
    }
  }
  return state
}

interface ExampleStepperProps {
  example: RuleExample
}

export default function ExampleStepper({ example }: ExampleStepperProps) {
  const [index, setIndex] = useState(0)
  const step = example.steps[index]
  const state = useMemo(() => accumulate(example.steps, index, example.trumpSuit), [example, index])
  const seatById = useMemo(() => new Map(example.seats.map((s) => [s.id, s])), [example])

  return (
    <div className={styles.stepper}>
      <p className={styles.progress}>
        Stap {index + 1} / {example.steps.length}
      </p>

      <TableLayout
        renderSeat={(seatId) => {
          const seat = seatById.get(seatId)
          if (!seat) return null
          const cards = state.hands[seatId]
          const count = state.handCounts[seatId]
          return (
            <PlayerSeat seat={seat}>
              {cards ? (
                <Hand cards={cards} size="sm" trumpSuit={state.trumpSuit} />
              ) : count ? (
                <CardBack size="sm" stacked={Math.min(count, 6)} />
              ) : null}
            </PlayerSeat>
          )
        }}
        center={
          state.trickPlays.length > 0 ? (
            <TrickPile plays={state.trickPlays} winningSeat={state.winningSeat} />
          ) : state.trumpSuit ? (
            <span className={styles.trumpBadge}>
              <SuitIcon suit={state.trumpSuit} size={14} color="var(--color-wood-900)" />
              Troef: {SUIT_NAME_NL[state.trumpSuit]}
            </span>
          ) : null
        }
      />

      <AnimatePresence mode="wait">
        {state.latestCallout && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={[styles.banner, styles[state.latestCallout.tone]].join(' ')}
          >
            {state.latestCallout.text}
          </motion.div>
        )}
      </AnimatePresence>

      <p className={styles.caption}>{stepCaption(step)}</p>

      {state.scoreLog.length > 0 && (
        <div className={styles.scoreLog}>
          {state.scoreLog.map((entry, i) => (
            <div key={i} className={styles.scoreEntry}>
              <ScoreBadge points={entry.points} label={`punten koppel ${entry.team}`} />
              <span>{entry.reason}</span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.controls}>
        <button type="button" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
          Vorige
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(example.steps.length - 1, i + 1))}
          disabled={index === example.steps.length - 1}
        >
          Volgende
        </button>
      </div>
    </div>
  )
}
