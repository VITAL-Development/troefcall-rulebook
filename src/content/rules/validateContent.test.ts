import { describe, expect, it } from 'vitest'
import { RULE_TOPICS } from '@/content/rules/index'
import { resolveTrick } from '@/engine/trickResolution'
import type { TrickPlay } from '@/content/types'

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
