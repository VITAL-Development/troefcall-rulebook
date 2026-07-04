import type { RuleTopic } from '@/content/types'
import { gameOverviewTopic } from '@/content/rules/gameOverview'
import { setupDealingTopic } from '@/content/rules/setupDealing'
import { trickTakingTopic } from '@/content/rules/trickTaking'
import { winningAHandTopic } from '@/content/rules/winningAHand'
import { sanctionsTopic } from '@/content/rules/sanctions'
import { tournamentStructureTopic } from '@/content/rules/tournamentStructure'

export const RULE_TOPICS: RuleTopic[] = [
  gameOverviewTopic,
  setupDealingTopic,
  trickTakingTopic,
  winningAHandTopic,
  sanctionsTopic,
  tournamentStructureTopic,
]

export function getRuleTopic(id: string): RuleTopic | undefined {
  return RULE_TOPICS.find((topic) => topic.id === id)
}
