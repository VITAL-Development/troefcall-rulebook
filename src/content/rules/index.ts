import type { RuleTopic } from '@/content/types'
import { setupDealingTopic } from '@/content/rules/setupDealing'
import { trickTakingTopic } from '@/content/rules/trickTaking'
import { winningAHandTopic } from '@/content/rules/winningAHand'

export const RULE_TOPICS: RuleTopic[] = [setupDealingTopic, trickTakingTopic, winningAHandTopic]

export function getRuleTopic(id: string): RuleTopic | undefined {
  return RULE_TOPICS.find((topic) => topic.id === id)
}
