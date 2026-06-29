import { describe, expect, it } from 'vitest'
import {
  clearAndAdvance,
  CLOCKWISE,
  createInitialState,
  getPlayableCards,
  nextSeat,
  playCard,
  teamScores,
  type DemoGameState,
} from './demoGameState'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a minimal DemoGameState for unit testing without dealing a real deck. */
function makeState(overrides: Partial<DemoGameState> = {}): DemoGameState {
  const base: DemoGameState = {
    phase: 'playing',
    trumpSuit: 'spades',
    hands: {
      N: [{ rank: 'A', suit: 'hearts' }, { rank: 'K', suit: 'hearts' }],
      E: [{ rank: 'Q', suit: 'hearts' }, { rank: 'J', suit: 'hearts' }],
      S: [{ rank: '10', suit: 'hearts' }, { rank: '9', suit: 'hearts' }],
      W: [{ rank: '8', suit: 'hearts' }, { rank: '7', suit: 'hearts' }],
    },
    currentTrick: [],
    ledSuit: undefined,
    leader: 'N',
    turnSeat: 'N',
    trickWinner: undefined,
    tricks: { N: 0, E: 0, S: 0, W: 0 },
    tricksDone: 0,
  }
  return { ...base, ...overrides }
}

// ---------------------------------------------------------------------------
// nextSeat
// ---------------------------------------------------------------------------

describe('nextSeat', () => {
  it('advances clockwise through N→E→S→W→N', () => {
    expect(nextSeat('N')).toBe('E')
    expect(nextSeat('E')).toBe('S')
    expect(nextSeat('S')).toBe('W')
    expect(nextSeat('W')).toBe('N')
  })
})

// ---------------------------------------------------------------------------
// createInitialState
// ---------------------------------------------------------------------------

describe('createInitialState', () => {
  it('gives every seat exactly 13 cards', () => {
    const state = createInitialState('hearts', 'S')
    for (const seat of CLOCKWISE) {
      expect(state.hands[seat]).toHaveLength(13)
    }
  })

  it('sets the correct starting leader and turnSeat', () => {
    const state = createInitialState('diamonds', 'W')
    expect(state.leader).toBe('W')
    expect(state.turnSeat).toBe('W')
  })

  it('starts with an empty trick and no led suit', () => {
    const state = createInitialState('clubs', 'N')
    expect(state.currentTrick).toHaveLength(0)
    expect(state.ledSuit).toBeUndefined()
  })

  it('starts in playing phase with zero scores', () => {
    const state = createInitialState('spades', 'E')
    expect(state.phase).toBe('playing')
    expect(state.tricksDone).toBe(0)
    expect(state.tricks).toEqual({ N: 0, E: 0, S: 0, W: 0 })
  })

  it('deals all 52 cards with no duplicates', () => {
    const state = createInitialState('hearts', 'N')
    const all = [...state.hands.N, ...state.hands.E, ...state.hands.S, ...state.hands.W]
    expect(all).toHaveLength(52)
    const ids = new Set(all.map((c) => `${c.rank}-${c.suit}`))
    expect(ids.size).toBe(52)
  })
})

// ---------------------------------------------------------------------------
// getPlayableCards
// ---------------------------------------------------------------------------

describe('getPlayableCards', () => {
  it('returns all cards when there is no led suit (leading)', () => {
    const state = makeState({ ledSuit: undefined })
    const playable = getPlayableCards(state, 'N')
    expect(playable).toEqual(state.hands.N)
  })

  it('returns only cards of the led suit when player has them', () => {
    const state = makeState({
      hands: {
        N: [{ rank: 'A', suit: 'hearts' }, { rank: 'K', suit: 'spades' }],
        E: [], S: [], W: [],
      },
      ledSuit: 'hearts',
    })
    const playable = getPlayableCards(state, 'N')
    expect(playable).toEqual([{ rank: 'A', suit: 'hearts' }])
  })

  it('returns any card when player has none of the led suit', () => {
    const state = makeState({
      hands: {
        N: [{ rank: 'A', suit: 'spades' }, { rank: 'K', suit: 'clubs' }],
        E: [], S: [], W: [],
      },
      ledSuit: 'hearts',
    })
    const playable = getPlayableCards(state, 'N')
    expect(playable).toHaveLength(2) // both non-heart cards are legal
  })
})

// ---------------------------------------------------------------------------
// playCard — turn enforcement
// ---------------------------------------------------------------------------

describe('playCard — turn enforcement', () => {
  it('throws if it is not the seat\'s turn', () => {
    const state = makeState({ turnSeat: 'N' })
    expect(() => playCard(state, 'E', { rank: 'Q', suit: 'hearts' })).toThrow()
  })

  it('throws if the card is not in the seat\'s hand', () => {
    const state = makeState({ turnSeat: 'N' })
    expect(() => playCard(state, 'N', { rank: '2', suit: 'clubs' })).toThrow()
  })

  it('throws if phase is not playing', () => {
    const state = makeState({ phase: 'resolved', trickWinner: 'N' })
    expect(() => playCard(state, 'N', { rank: 'A', suit: 'hearts' })).toThrow()
  })
})

// ---------------------------------------------------------------------------
// playCard — legal play enforcement
// ---------------------------------------------------------------------------

describe('playCard — legal play enforcement', () => {
  it('throws when player plays off-suit while holding the led suit', () => {
    const state = makeState({
      hands: {
        N: [{ rank: 'A', suit: 'hearts' }, { rank: 'A', suit: 'spades' }],
        E: [], S: [], W: [],
      },
      currentTrick: [{ seat: 'W', card: { rank: '3', suit: 'hearts' } }],
      ledSuit: 'hearts',
      turnSeat: 'N',
    })
    // Trying to play the spade ace while holding a heart — illegal
    expect(() => playCard(state, 'N', { rank: 'A', suit: 'spades' })).toThrow()
  })

  it('allows playing off-suit (trump or otherwise) when player has no led suit', () => {
    const state = makeState({
      hands: {
        N: [{ rank: 'A', suit: 'spades' }, { rank: 'K', suit: 'clubs' }],
        E: [], S: [], W: [],
      },
      currentTrick: [{ seat: 'W', card: { rank: '3', suit: 'hearts' } }],
      ledSuit: 'hearts',
      turnSeat: 'N',
    })
    expect(() => playCard(state, 'N', { rank: 'A', suit: 'spades' })).not.toThrow()
  })
})

// ---------------------------------------------------------------------------
// playCard — trick progression
// ---------------------------------------------------------------------------

describe('playCard — trick progression', () => {
  it('sets ledSuit after the first card is played', () => {
    const state = makeState({ turnSeat: 'N', ledSuit: undefined })
    const next = playCard(state, 'N', { rank: 'A', suit: 'hearts' })
    expect(next.ledSuit).toBe('hearts')
  })

  it('advances turnSeat clockwise after each card', () => {
    let state = makeState({ turnSeat: 'N', leader: 'N' })
    state = playCard(state, 'N', { rank: 'A', suit: 'hearts' })
    expect(state.turnSeat).toBe('E')
    state = playCard(state, 'E', { rank: 'Q', suit: 'hearts' })
    expect(state.turnSeat).toBe('S')
    state = playCard(state, 'S', { rank: '10', suit: 'hearts' })
    expect(state.turnSeat).toBe('W')
  })

  it('stays in playing phase until the 4th card is played', () => {
    let state = makeState({ turnSeat: 'N', leader: 'N' })
    state = playCard(state, 'N', { rank: 'A', suit: 'hearts' })
    expect(state.phase).toBe('playing')
    state = playCard(state, 'E', { rank: 'Q', suit: 'hearts' })
    expect(state.phase).toBe('playing')
    state = playCard(state, 'S', { rank: '10', suit: 'hearts' })
    expect(state.phase).toBe('playing')
  })

  it('resolves to phase=resolved after the 4th card and sets the correct winner', () => {
    let state = makeState({ turnSeat: 'N', leader: 'N' })
    // N leads A♥, E plays Q♥, S plays 10♥, W plays 8♥ → N wins (highest hearts)
    state = playCard(state, 'N', { rank: 'A', suit: 'hearts' })
    state = playCard(state, 'E', { rank: 'Q', suit: 'hearts' })
    state = playCard(state, 'S', { rank: '10', suit: 'hearts' })
    state = playCard(state, 'W', { rank: '8', suit: 'hearts' })

    expect(state.phase).toBe('resolved')
    expect(state.trickWinner).toBe('N')
  })

  it('awards the trick to the trump player when trump is played', () => {
    const state = makeState({
      trumpSuit: 'spades',
      hands: {
        N: [{ rank: 'A', suit: 'hearts' }],
        E: [{ rank: 'Q', suit: 'hearts' }],
        S: [{ rank: '2', suit: 'spades' }], // trump
        W: [{ rank: '8', suit: 'hearts' }],
      },
      turnSeat: 'N',
      leader: 'N',
    })
    let s = playCard(state, 'N', { rank: 'A', suit: 'hearts' })
    s = playCard(s, 'E', { rank: 'Q', suit: 'hearts' })
    s = playCard(s, 'S', { rank: '2', suit: 'spades' }) // S cuts with trump
    s = playCard(s, 'W', { rank: '8', suit: 'hearts' })

    expect(s.trickWinner).toBe('S')
  })

  it('increments the winner\'s trick count and tricksDone', () => {
    let state = makeState({ turnSeat: 'N', leader: 'N' })
    state = playCard(state, 'N', { rank: 'A', suit: 'hearts' })
    state = playCard(state, 'E', { rank: 'Q', suit: 'hearts' })
    state = playCard(state, 'S', { rank: '10', suit: 'hearts' })
    state = playCard(state, 'W', { rank: '8', suit: 'hearts' })

    expect(state.tricks.N).toBe(1)
    expect(state.tricksDone).toBe(1)
  })
})

// ---------------------------------------------------------------------------
// clearAndAdvance
// ---------------------------------------------------------------------------

describe('clearAndAdvance', () => {
  function resolvedState(): DemoGameState {
    return makeState({
      phase: 'resolved',
      currentTrick: [
        { seat: 'N', card: { rank: 'A', suit: 'hearts' } },
        { seat: 'E', card: { rank: 'Q', suit: 'hearts' } },
        { seat: 'S', card: { rank: '10', suit: 'hearts' } },
        { seat: 'W', card: { rank: '8', suit: 'hearts' } },
      ],
      ledSuit: 'hearts',
      trickWinner: 'N',
      tricks: { N: 1, E: 0, S: 0, W: 0 },
      tricksDone: 1,
    })
  }

  it('sets leader and turnSeat to the trick winner', () => {
    const next = clearAndAdvance(resolvedState())
    expect(next.leader).toBe('N')
    expect(next.turnSeat).toBe('N')
  })

  it('clears the trick pile and led suit', () => {
    const next = clearAndAdvance(resolvedState())
    expect(next.currentTrick).toHaveLength(0)
    expect(next.ledSuit).toBeUndefined()
    expect(next.trickWinner).toBeUndefined()
  })

  it('returns to playing phase', () => {
    const next = clearAndAdvance(resolvedState())
    expect(next.phase).toBe('playing')
  })

  it('throws when called outside resolved phase', () => {
    expect(() => clearAndAdvance(makeState({ phase: 'playing' }))).toThrow()
  })
})

// ---------------------------------------------------------------------------
// Score accumulation over multiple tricks
// ---------------------------------------------------------------------------

describe('score accumulation', () => {
  it('accumulates trick counts across multiple tricks', () => {
    // Build two hands with 2 cards each, play both tricks
    const state = makeState({
      hands: {
        N: [{ rank: 'A', suit: 'hearts' }, { rank: 'K', suit: 'hearts' }],
        E: [{ rank: 'Q', suit: 'hearts' }, { rank: 'J', suit: 'hearts' }],
        S: [{ rank: '10', suit: 'hearts' }, { rank: '9', suit: 'hearts' }],
        W: [{ rank: '8', suit: 'hearts' }, { rank: '7', suit: 'hearts' }],
      },
      turnSeat: 'N',
      leader: 'N',
    })

    // Trick 1: N leads A♥, E=Q♥, S=10♥, W=8♥ → N wins
    let s = state
    s = playCard(s, 'N', { rank: 'A', suit: 'hearts' })
    s = playCard(s, 'E', { rank: 'Q', suit: 'hearts' })
    s = playCard(s, 'S', { rank: '10', suit: 'hearts' })
    s = playCard(s, 'W', { rank: '8', suit: 'hearts' })
    expect(s.tricks.N).toBe(1)

    // Advance to next trick
    s = clearAndAdvance(s)
    expect(s.leader).toBe('N')

    // Trick 2: N leads K♥, E=J♥, S=9♥, W=7♥ → N wins again
    s = playCard(s, 'N', { rank: 'K', suit: 'hearts' })
    s = playCard(s, 'E', { rank: 'J', suit: 'hearts' })
    s = playCard(s, 'S', { rank: '9', suit: 'hearts' })
    s = playCard(s, 'W', { rank: '7', suit: 'hearts' })
    expect(s.tricks.N).toBe(2)
    expect(s.tricksDone).toBe(2)
  })

  it('reaches phase=done after 13 tricks', () => {
    // Use a real 13-card deal and auto-play all tricks for N
    let state = createInitialState('spades', 'N')
    for (let trick = 0; trick < 13; trick++) {
      for (let play = 0; play < 4; play++) {
        const seat = state.turnSeat
        const [card] = getPlayableCards(state, seat)
        state = playCard(state, seat, card)
      }
      if (state.phase === 'resolved') {
        state = clearAndAdvance(state)
      }
    }
    // After 13 tricks the last playCard should have set phase='done'
    // clearAndAdvance was skipped for the last trick since phase='done'
    expect(state.tricksDone).toBe(13)
    // teamScores should add up to 13 total tricks
    const { team1, team2 } = teamScores(state)
    expect(team1 + team2).toBe(13)
  })
})

// ---------------------------------------------------------------------------
// teamScores
// ---------------------------------------------------------------------------

describe('teamScores', () => {
  it('adds N+S for team1 and E+W for team2', () => {
    const state = makeState({ tricks: { N: 3, E: 2, S: 5, W: 3 } })
    expect(teamScores(state)).toEqual({ team1: 8, team2: 5 })
  })
})

// ---------------------------------------------------------------------------
// Edge case: playCard on the 13th trick sets phase=done (not resolved)
// ---------------------------------------------------------------------------

describe('playCard — 13th trick sets phase=done', () => {
  it('sets phase=done instead of resolved after the final trick', () => {
    // Cheat: pre-fill tricksDone=12 to simulate last trick
    const state = makeState({
      tricksDone: 12,
      turnSeat: 'N',
      leader: 'N',
    })
    let s = playCard(state, 'N', { rank: 'A', suit: 'hearts' })
    s = playCard(s, 'E', { rank: 'Q', suit: 'hearts' })
    s = playCard(s, 'S', { rank: '10', suit: 'hearts' })
    s = playCard(s, 'W', { rank: '8', suit: 'hearts' })
    expect(s.phase).toBe('done')
  })
})
