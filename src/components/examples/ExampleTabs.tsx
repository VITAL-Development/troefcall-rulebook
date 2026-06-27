import type { RuleExample } from '@/content/types'
import styles from './ExampleTabs.module.css'

const LEVEL_LABEL_NL: Record<RuleExample['level'], string> = {
  simple: 'Eenvoudig',
  twist: 'Met een twist',
  full: 'Volledig',
}

interface ExampleTabsProps {
  examples: [RuleExample, RuleExample, RuleExample]
  activeId: string
  onSelect: (id: string) => void
}

export default function ExampleTabs({ examples, activeId, onSelect }: ExampleTabsProps) {
  return (
    <div className={styles.tabs} role="tablist">
      {examples.map((example) => (
        <button
          key={example.id}
          type="button"
          role="tab"
          aria-selected={example.id === activeId}
          className={[styles.tab, example.id === activeId ? styles.active : ''].join(' ')}
          onClick={() => onSelect(example.id)}
        >
          <span className={styles.level}>{LEVEL_LABEL_NL[example.level]}</span>
          {example.title}
        </button>
      ))}
    </div>
  )
}
