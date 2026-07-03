import { describe, expect, it } from 'vitest'
import { RULE_TOPICS } from '@/content/rules/index'
import { resolveTrick } from '@/engine/trickResolution'
import type { TrickPlay, ScoreStep } from '@/content/types'

describe('authored rule content matches the trick-resolution engine', () => {
  for (const topic of RULE_TOPICS) {
    for (const example of topic.examples) {
      it(`${topic.id} / ${example.id}: every resolveTrick step matches engine.resolveTrick`, () => {
        let trumpSuit: TrickPlay['card']['suit'] | undefined = example.trumpSuit
        let currentTrick: TrickPlay[] = []

        for (const step of example.steps) {
          switch (step.type) {
            case 'declareTrump':
              trumpSuit = step.suit
              break
            case 'play':
              currentTrick.push({ seat: step.seat, card: step.card })
              break
            case 'resolveTrick': {
              expect(currentTrick.length).toBeGreaterThan(0)
              const ledSuit = currentTrick[0].card.suit
              // When no trump is in play, treat the led suit as "trump" too — every
              // led-suit card already counts as the trump suit's own highest-wins rule.
              const actualWinner = resolveTrick(currentTrick, ledSuit, trumpSuit ?? ledSuit)
              expect(actualWinner).toBe(step.winningSeat)
              currentTrick = []
              break
            }
            default:
              break
          }
        }
      })
    }
  }
})

describe('kap and capituleren scoring rules', () => {
  const winningTopic = RULE_TOPICS.find((t) => t.id === 'winning-a-hand')!

  it('partner tapping out at kap yields only 2 points (not 5)', () => {
    // The twist example models a kap situation with two scenarios.
    // Scenario A: the *partner* (Noord) taps out instead of the trick winner (Zuid).
    // The authored content must reflect the rule: partner tap-out → 2 pts, not 5.
    const twistExample = winningTopic.examples.find((e) => e.id === 'winning-a-hand-twist')!
    const scoreSteps = twistExample.steps.filter((s): s is ScoreStep => s.type === 'score')

    // First score step = Scenario A (partner taps out)
    const partnerTapStep = scoreSteps[0]
    expect(partnerTapStep.points).toBe(2)
    // Noord/Zuid (team 1) still receive the (reduced) kap points
    expect(partnerTapStep.team).toBe(1)
  })

  it('early capitulation while baunie was still possible yields the full 15 baunie points', () => {
    // The full example shows Oost/West capitulating before both sides have won ≥1 trick.
    // The canonical rule: conceding while baunie is still possible is penalised at the
    // full baunie rate (15 pts for the non-conceding side), NOT a lesser amount.
    const fullExample = winningTopic.examples.find((e) => e.id === 'winning-a-hand-full')!
    const scoreSteps = fullExample.steps.filter((s): s is ScoreStep => s.type === 'score')

    // First score step = the early-capitulation penalty
    const capitulationStep = scoreSteps[0]
    expect(capitulationStep.points).toBe(15)
    // Noord/Zuid (team 1) receive the baunie-rate penalty points
    expect(capitulationStep.team).toBe(1)
  })
})
