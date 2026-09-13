import { useEffect, useState } from 'react'
import type { Card, Seat, SeatId, Suit } from '@/content/types'
import { cardId } from '@/content/types'
import TableLayout from '@/components/table/TableLayout'
import PlayerSeat from '@/components/table/PlayerSeat'
import Hand from '@/components/cards/Hand'
import TrickPile from '@/components/cards/TrickPile'
import SuitIcon, { SUIT_NAME_NL } from '@/components/cards/SuitIcon'
import {
  clearAndAdvance,
  createInitialState,
  getPlayableCards,
  playCard,
  teamScores,
  type DemoGameState,
} from './demoGameState'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SEATS: Record<SeatId, Seat> = {
  N: { id: 'N', name: 'Noord', team: 1 },
  E: { id: 'E', name: 'Oost', team: 2 },
  S: { id: 'S', name: 'Zuid', team: 1 },
  W: { id: 'W', name: 'West', team: 2 },
}

const ALL_SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs']

const SEAT_NAMES: Record<SeatId, string> = {
  N: 'Noord',
  E: 'Oost',
  S: 'Zuid',
  W: 'West',
}

// ---------------------------------------------------------------------------
// Setup screen
// ---------------------------------------------------------------------------

interface SetupScreenProps {
  onStart: (trumpSuit: Suit, leader: SeatId) => void
}

function SetupScreen({ onStart }: SetupScreenProps) {
  const [trumpSuit, setTrumpSuit] = useState<Suit>('hearts')
  const [leader, setLeader] = useState<SeatId>('S')

  return (
    <div style={styles.setup}>
      <h1 style={styles.heading}>Probeer een slag</h1>
      <p style={styles.subtitle}>
        Kies de troefkleur en wie er begint, dan kun je als Zuid zelf kaarten spelen.
      </p>

      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Troefkleur</h2>
        <div style={styles.buttonGroup}>
          {ALL_SUITS.map((suit) => {
            const isRed = suit === 'hearts' || suit === 'diamonds'
            return (
              <button
                key={suit}
                type="button"
                onClick={() => setTrumpSuit(suit)}
                style={{
                  ...styles.suitBtn,
                  ...(trumpSuit === suit ? styles.suitBtnActive : {}),
                  color: isRed ? '#c0392b' : '#f5f0e8',
                }}
                aria-pressed={trumpSuit === suit}
                aria-label={SUIT_NAME_NL[suit]}
              >
                <SuitIcon suit={suit} size={28} />
                <span style={styles.suitBtnLabel}>{SUIT_NAME_NL[suit]}</span>
              </button>
            )
          })}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Wie begint?</h2>
        <div style={styles.buttonGroup}>
          {(['N', 'E', 'S', 'W'] as SeatId[]).map((seat) => (
            <button
              key={seat}
              type="button"
              onClick={() => setLeader(seat)}
              style={{
                ...styles.leaderBtn,
                ...(leader === seat ? styles.leaderBtnActive : {}),
              }}
              aria-pressed={leader === seat}
            >
              {SEAT_NAMES[seat]}
            </button>
          ))}
        </div>
      </section>

      <button type="button" onClick={() => onStart(trumpSuit, leader)} style={styles.startBtn}>
        Start spel
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Winner banner
// ---------------------------------------------------------------------------

function WinnerBanner({ winningSeat }: { winningSeat: SeatId }) {
  return (
    <div style={styles.winnerBanner} role="status" aria-live="polite">
      <strong>{SEAT_NAMES[winningSeat]}</strong> wint de slag!
    </div>
  )
}

// ---------------------------------------------------------------------------
// Game-over panel
// ---------------------------------------------------------------------------

function GameOverPanel({ game, onReset }: { game: DemoGameState; onReset: () => void }) {
  const { team1, team2 } = teamScores(game)
  const winner = team1 > team2 ? 'Noord/Zuid' : team2 > team1 ? 'Oost/West' : null

  return (
    <div style={styles.gameOver}>
      <h2 style={styles.gameOverHeading}>Spel afgelopen</h2>
      <table style={styles.scoreTable}>
        <tbody>
          <tr>
            <td style={styles.scoreLabel}>Noord/Zuid (koppel 1)</td>
            <td style={styles.scoreValue}>{team1} slagen</td>
          </tr>
          <tr>
            <td style={styles.scoreLabel}>Oost/West (koppel 2)</td>
            <td style={styles.scoreValue}>{team2} slagen</td>
          </tr>
        </tbody>
      </table>
      {winner ? (
        <p style={styles.winnerText}>{winner} wint!</p>
      ) : (
        <p style={styles.winnerText}>Gelijkspel!</p>
      )}
      <button type="button" onClick={onReset} style={styles.startBtn}>
        Opnieuw spelen
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main demo component
// ---------------------------------------------------------------------------

export default function TrickResolutionDemo() {
  const [game, setGame] = useState<DemoGameState | null>(null)

  // Auto-play for CPU seats (N, E, W)
  useEffect(() => {
    if (!game || game.phase !== 'playing' || game.turnSeat === 'S') return
    const timer = setTimeout(() => {
      setGame((g) => {
        if (!g || g.phase !== 'playing' || g.turnSeat === 'S') return g
        const playable = getPlayableCards(g, g.turnSeat)
        if (playable.length === 0) return g
        const card = playable[Math.floor(Math.random() * playable.length)]
        return playCard(g, g.turnSeat, card)
      })
    }, 700)
    return () => clearTimeout(timer)
  }, [game])

  // After showing trick winner, clear and advance to next trick
  useEffect(() => {
    if (!game || game.phase !== 'resolved') return
    const timer = setTimeout(() => {
      setGame((g) => (g && g.phase === 'resolved' ? clearAndAdvance(g) : g))
    }, 1500)
    return () => clearTimeout(timer)
  }, [game])

  // ---- Setup screen ----
  if (!game) {
    return (
      <div style={styles.page}>
        <SetupScreen
          onStart={(trump, leader) => setGame(createInitialState(trump, leader))}
        />
      </div>
    )
  }

  // ---- Game over ----
  if (game.phase === 'done') {
    return (
      <div style={styles.page}>
        <GameOverPanel game={game} onReset={() => setGame(null)} />
      </div>
    )
  }

  // ---- Active game ----
  const { team1, team2 } = teamScores(game)
  const isHumanTurn = game.phase === 'playing' && game.turnSeat === 'S'

  const playableIds: Set<string> | undefined = isHumanTurn
    ? new Set(getPlayableCards(game, 'S').map(cardId))
    : undefined

  function handlePlayCard(card: Card) {
    if (!isHumanTurn) return
    setGame((g) => (g ? playCard(g, 'S', card) : g))
  }

  return (
    <div style={styles.page}>
      {/* Header row */}
      <div style={styles.header}>
        <h1 style={styles.heading}>Probeer een slag</h1>
        <div style={styles.trumpIndicator}>
          <span style={styles.trumpLabel}>Troef:</span>
          <SuitIcon suit={game.trumpSuit} size={20} />
          <span>{SUIT_NAME_NL[game.trumpSuit]}</span>
        </div>
      </div>

      {/* Winner banner (visible for 1.5 s after trick resolves) */}
      {game.phase === 'resolved' && game.trickWinner && (
        <WinnerBanner winningSeat={game.trickWinner} />
      )}

      {/* Table */}
      <TableLayout
        renderSeat={(seatId) => {
          const seat = SEATS[seatId]
          const isSouth = seatId === 'S'
          const hand = game.hands[seatId]
          const isThinkingSeat = game.turnSeat === seatId && game.phase === 'playing' && !isSouth

          return (
            <PlayerSeat seat={seat}>
              {isSouth ? (
                <Hand
                  cards={hand}
                  faceUp={true}
                  size="md"
                  trumpSuit={game.trumpSuit}
                  playableCardIds={playableIds}
                  onPlayCard={isHumanTurn ? handlePlayCard : undefined}
                />
              ) : (
                <div style={styles.cpuHandWrap}>
                  <Hand cards={hand} faceUp={false} size="sm" trumpSuit={game.trumpSuit} />
                  {isThinkingSeat && (
                    <span style={styles.thinkingBadge} role="status">
                      denkt…
                    </span>
                  )}
                </div>
              )}
            </PlayerSeat>
          )
        }}
        center={
          <TrickPile
            plays={game.currentTrick}
            winningSeat={game.trickWinner}
            layoutIdPrefix="demo"
          />
        }
      />

      {/* Footer: scores + reset */}
      <div style={styles.footer}>
        <div style={styles.scoreBar}>
          <span>
            Noord/Zuid: <strong>{team1}</strong> slagen
          </span>
          <span style={styles.scoreDivider}>·</span>
          <span>
            Oost/West: <strong>{team2}</strong> slagen
          </span>
          <span style={styles.scoreDivider}>·</span>
          <span style={{ color: 'rgba(245,240,232,0.5)' }}>{game.tricksDone} / 13 gespeeld</span>
        </div>
        <button type="button" onClick={() => setGame(null)} style={styles.resetBtn}>
          Nieuw spel
        </button>
      </div>

      {/* Turn hint for the human player */}
      {isHumanTurn && (
        <p style={styles.hint} role="status">
          Jouw beurt — klik een kaart om te spelen.
        </p>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Inline styles
// ---------------------------------------------------------------------------

const styles = {
  page: {
    padding: '1.5rem 1rem',
    maxWidth: '720px',
    margin: '0 auto',
  } satisfies React.CSSProperties,

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    flexWrap: 'wrap',
    marginBottom: '0.5rem',
  } satisfies React.CSSProperties,

  heading: {
    margin: 0,
    fontSize: '1.6rem',
    color: 'var(--color-text, #f5f0e8)',
  } satisfies React.CSSProperties,

  subtitle: {
    color: 'var(--color-text-muted, #c9b89a)',
    marginBottom: '2rem',
    maxWidth: '480px',
  } satisfies React.CSSProperties,

  trumpIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '6px',
    padding: '0.3rem 0.75rem',
    color: 'var(--color-text, #f5f0e8)',
    fontSize: '0.95rem',
  } satisfies React.CSSProperties,

  trumpLabel: {
    color: 'var(--color-text-muted, #c9b89a)',
    marginRight: '0.25rem',
  } satisfies React.CSSProperties,

  winnerBanner: {
    background: 'rgba(46, 204, 113, 0.2)',
    border: '1px solid rgba(46, 204, 113, 0.5)',
    borderRadius: '8px',
    padding: '0.6rem 1rem',
    marginBottom: '0.75rem',
    color: '#2ecc71',
    fontSize: '1rem',
    textAlign: 'center',
  } satisfies React.CSSProperties,

  hint: {
    marginTop: '0.75rem',
    color: 'var(--color-text-muted, #c9b89a)',
    fontSize: '0.9rem',
    textAlign: 'center',
  } satisfies React.CSSProperties,

  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '1rem',
    paddingTop: '0.75rem',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  } satisfies React.CSSProperties,

  scoreBar: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    color: 'var(--color-text, #f5f0e8)',
    fontSize: '0.95rem',
    flexWrap: 'wrap',
  } satisfies React.CSSProperties,

  scoreDivider: {
    color: 'rgba(255,255,255,0.3)',
  } satisfies React.CSSProperties,

  resetBtn: {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '6px',
    color: 'var(--color-text, #f5f0e8)',
    padding: '0.4rem 0.9rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
  } satisfies React.CSSProperties,

  cpuHandWrap: {
    position: 'relative',
    display: 'inline-block',
  } satisfies React.CSSProperties,

  thinkingBadge: {
    position: 'absolute',
    bottom: '-1.4rem',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0,0,0,0.6)',
    color: '#f5f0e8',
    fontSize: '0.75rem',
    borderRadius: '4px',
    padding: '0.15rem 0.5rem',
    whiteSpace: 'nowrap',
  } satisfies React.CSSProperties,

  // Setup screen styles
  setup: {
    maxWidth: '480px',
    margin: '0 auto',
    paddingTop: '2rem',
  } satisfies React.CSSProperties,

  section: {
    marginBottom: '2rem',
  } satisfies React.CSSProperties,

  sectionHeading: {
    fontSize: '1rem',
    color: 'var(--color-text-muted, #c9b89a)',
    fontWeight: 600,
    marginBottom: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  } satisfies React.CSSProperties,

  buttonGroup: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  } satisfies React.CSSProperties,

  suitBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    border: '2px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.06)',
    cursor: 'pointer',
    minWidth: '80px',
  } satisfies React.CSSProperties,

  suitBtnActive: {
    border: '2px solid rgba(255,255,255,0.55)',
    background: 'rgba(255,255,255,0.15)',
  } satisfies React.CSSProperties,

  suitBtnLabel: {
    fontSize: '0.78rem',
    color: 'var(--color-text-muted, #c9b89a)',
    fontWeight: 500,
  } satisfies React.CSSProperties,

  leaderBtn: {
    padding: '0.5rem 1.1rem',
    borderRadius: '6px',
    border: '2px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.06)',
    color: 'var(--color-text, #f5f0e8)',
    cursor: 'pointer',
    fontSize: '0.95rem',
  } satisfies React.CSSProperties,

  leaderBtnActive: {
    border: '2px solid rgba(255,255,255,0.55)',
    background: 'rgba(255,255,255,0.15)',
  } satisfies React.CSSProperties,

  startBtn: {
    display: 'block',
    width: '100%',
    padding: '0.85rem',
    borderRadius: '8px',
    border: 'none',
    background: '#2d6a4f',
    color: '#fff',
    fontSize: '1.05rem',
    fontWeight: 600,
    cursor: 'pointer',
    letterSpacing: '0.02em',
    marginTop: '1rem',
  } satisfies React.CSSProperties,

  // Game-over panel
  gameOver: {
    maxWidth: '420px',
    margin: '2rem auto',
    textAlign: 'center',
  } satisfies React.CSSProperties,

  gameOverHeading: {
    color: 'var(--color-text, #f5f0e8)',
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
  } satisfies React.CSSProperties,

  scoreTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1.5rem',
  } satisfies React.CSSProperties,

  scoreLabel: {
    color: 'var(--color-text-muted, #c9b89a)',
    textAlign: 'left',
    padding: '0.4rem 0',
    fontSize: '0.95rem',
  } satisfies React.CSSProperties,

  scoreValue: {
    color: 'var(--color-text, #f5f0e8)',
    textAlign: 'right',
    fontWeight: 700,
    fontSize: '1.1rem',
  } satisfies React.CSSProperties,

  winnerText: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#2ecc71',
    marginBottom: '1.5rem',
  } satisfies React.CSSProperties,
}
