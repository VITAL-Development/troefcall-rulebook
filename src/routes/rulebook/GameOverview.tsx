import RuleTopicLayout from '@/routes/rulebook/RuleTopicLayout'
import { gameOverviewTopic } from '@/content/rules/gameOverview'

export default function GameOverview() {
  return <RuleTopicLayout topic={gameOverviewTopic} />
}
