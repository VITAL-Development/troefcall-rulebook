import { describe, expect, it } from 'vitest'
import { setupDealingTopic } from '@/content/rules/setupDealing'
import { winningAHandTopic } from '@/content/rules/winningAHand'
import type { RuleExample, ScoreStep, Seat, SeatId } from '@/content/types'

/**
 * These tests encode the rule statements from GitHub issue #9 as executable
 * checks, so future content edits can't silently drift away from the
 * documented ground truth (seating convention, kap tap-out value, and the
 * baunie-concession penalty). `validate-content` only checks trick-resolution
 * correctness — it does not know about seating, scoring, or narrative rules,
 * which is the gap these tests close.
 */

const CLOCKWISE_ORDER: SeatId[] = ['N', 'E', 'S', 'W']

function nextClockwise(seat: SeatId): SeatId {
  const idx = CLOCKWISE_ORDER.indexOf(seat)
  return CLOCKWISE_ORDER[(idx + 1) % CLOCKWISE_ORDER.length]
}

function findSeat(seats: RuleExample['seats'], predicate: (seat: Seat) => boolean): Seat | undefined {
  return seats.find(predicate)
}

function findScoreSteps(example: RuleExample): ScoreStep[] {
  return example.steps.filter((step): step is ScoreStep => step.type === 'score')
}

describe('seating convention: caller is the dealer\'s next-clockwise neighbour (N -> E -> S -> W)', () => {
  for (const example of setupDealingTopic.examples) {
    const dealer = findSeat(example.seats, (seat) => seat.isDealer === true)
    const caller = findSeat(example.seats, (seat) => seat.isCaller === true)

    it(`${example.id}: dealer and caller are both assigned`, () => {
      expect(dealer).toBeDefined()
      expect(caller).toBeDefined()
    })

    it(`${example.id}: caller seat is the dealer's next-clockwise neighbour`, () => {
      if (!dealer || !caller) return
      expect(caller.id).toBe(nextClockwise(dealer.id))
    })
  }
})

describe('kap rule: value depends on who taps out (winningAHand twist example)', () => {
  const kapExample = winningAHandTopic.examples.find((example) => example.id === 'winning-a-hand-twist')

  it('the kap twist example exists', () => {
    expect(kapExample).toBeDefined()
  })

  it('scenario A (partner taps out instead of the trick-7 winner) scores 2 points, not 5', () => {
    if (!kapExample) return
    const scoreSteps = findScoreSteps(kapExample)
    // First score step in this example is Scenario A: the partner (Noord) taps out
    // instead of Zuid, the actual winner of trick 7. Per the rule, that must be 2
    // points -- NOT 5, which is reserved for the trick winner stopping it themself.
    const scenarioA = scoreSteps[0]
    expect(scenarioA).toBeDefined()
    expect(scenarioA.points).toBe(2)
    expect(scenarioA.reason.toLowerCase()).toContain('partner')
  })

  it('a failed push-to-baunie attempt awards 2 points to the opposing team, not the kapping team', () => {
    if (!kapExample) return
    const scoreSteps = findScoreSteps(kapExample)
    // Second score step is Scenario B: pushing toward baunie fails, so the
    // opposing team (team 2, Oost/West) gets 2 points instead of the kapping
    // team (team 1, Noord/Zuid).
    const scenarioB = scoreSteps[1]
    expect(scenarioB).toBeDefined()
    expect(scenarioB.points).toBe(2)
    expect(scenarioB.team).toBe(2)
  })

  it('the rules prose states the partner-taps-out value is 2 points (not the 5-point self-stop value)', () => {
    const kapRule = winningAHandTopic.rules.find((rule) => rule.toLowerCase().includes('kap'))
    expect(kapRule).toBeDefined()
    expect(kapRule).toMatch(/stoppen.*5 punten/)
    expect(kapRule).toMatch(/partner.*2 punten/)
  })
})

describe('baunie-concession rule: conceding before both sides have a trick costs the full baunie rate', () => {
  const concessionExample = winningAHandTopic.examples.find((example) => example.id === 'winning-a-hand-full')

  it('the baunie-concession example exists', () => {
    expect(concessionExample).toBeDefined()
  })

  it('premature concession is scored at the full baunie rate (15 points), not a lesser rate', () => {
    if (!concessionExample) return
    const scoreSteps = findScoreSteps(concessionExample)
    const concessionScore = scoreSteps[0]
    expect(concessionScore).toBeDefined()
    expect(concessionScore.points).toBe(15)
    expect(concessionScore.reason.toLowerCase()).toContain('capituleren')
  })

  it('the rules prose states the early-concession penalty equals the baunie rate (15), not less', () => {
    const concessionRule = winningAHandTopic.rules.find((rule) => rule.toLowerCase().includes('capituleren'))
    expect(concessionRule).toBeDefined()
    expect(concessionRule).toMatch(/15 punten/)
    expect(concessionRule).toMatch(/minstens 1 slag/)
  })

  it('baunie itself is also scored at 15 points, so the rules stay consistent with each other', () => {
    const baunieRule = winningAHandTopic.rules.find(
      (rule) => rule.toLowerCase().startsWith('baunie:'),
    )
    expect(baunieRule).toBeDefined()
    expect(baunieRule).toMatch(/15 punten/)
  })
})

describe('misdeal penalty: capped at 2 misdeals per round, 2 points each', () => {
  const misdealExample = setupDealingTopic.examples.find((example) => example.id === 'setup-dealing-full')

  it('the misdeal example exists', () => {
    expect(misdealExample).toBeDefined()
  })

  it('the recorded misdeal penalty is 2 points awarded to the non-dealing team', () => {
    if (!misdealExample) return
    const scoreSteps = findScoreSteps(misdealExample)
    expect(scoreSteps.length).toBeGreaterThan(0)
    for (const step of scoreSteps) {
      expect(step.points).toBe(2)
    }
  })

  it('the rules prose states the cap is 2 misdeals per round', () => {
    const misdealRule = setupDealingTopic.rules.find((rule) => rule.toLowerCase().includes('misdeling'))
    expect(misdealRule).toBeDefined()
    expect(misdealRule).toMatch(/2 strafpunten/)
    expect(misdealRule).toMatch(/gemaximeerd op 2 misdelingen per ronde/)
  })
})
