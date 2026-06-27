import { useState } from 'react'
import type { RuleTopic } from '@/content/types'
import WoodPanel from '@/components/ui/WoodPanel'
import ExampleTabs from '@/components/examples/ExampleTabs'
import ExampleStepper from '@/components/examples/ExampleStepper'
import styles from './RuleTopicLayout.module.css'

interface RuleTopicLayoutProps {
  topic: RuleTopic
}

export default function RuleTopicLayout({ topic }: RuleTopicLayoutProps) {
  const [activeId, setActiveId] = useState(topic.examples[0].id)
  const activeExample = topic.examples.find((e) => e.id === activeId) ?? topic.examples[0]

  return (
    <div className={styles.page}>
      <h1>{topic.title}</h1>
      <p className={styles.intro}>{topic.intro}</p>

      <ul className={styles.rules}>
        {topic.rules.map((rule, i) => (
          <li key={i}>{rule}</li>
        ))}
      </ul>

      <WoodPanel>
        <h2>Voorbeelden</h2>
        <ExampleTabs examples={topic.examples} activeId={activeId} onSelect={setActiveId} />
        <ExampleStepper key={activeExample.id} example={activeExample} />
      </WoodPanel>
    </div>
  )
}
