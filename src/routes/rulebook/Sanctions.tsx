import RuleTopicLayout from '@/routes/rulebook/RuleTopicLayout'
import { sanctionsTopic } from '@/content/rules/sanctions'

export default function Sanctions() {
  return <RuleTopicLayout topic={sanctionsTopic} />
}
