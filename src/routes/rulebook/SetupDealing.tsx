import RuleTopicLayout from '@/routes/rulebook/RuleTopicLayout'
import { setupDealingTopic } from '@/content/rules/setupDealing'

export default function SetupDealing() {
  return <RuleTopicLayout topic={setupDealingTopic} />
}
