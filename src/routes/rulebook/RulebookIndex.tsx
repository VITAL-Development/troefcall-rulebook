import { Link } from 'react-router-dom'
import { RULE_TOPICS } from '@/content/rules'
import type { RuleExample, RuleTopic } from '@/content/types'
import styles from './RulebookIndex.module.css'

const LEVEL_LABEL_NL: Record<RuleExample['level'], string> = {
  simple: 'Eenvoudig',
  twist: 'Met een twist',
  full: 'Volledig',
}

const SUIT_MARKS = ['♠', '♥', '♦', '♣'] as const
const SUIT_TONE: Record<number, 'red' | 'black'> = { 0: 'black', 1: 'red', 2: 'red', 3: 'black' }

interface TopicCardProps {
  topic: RuleTopic
  index: number
}

function TopicCard({ topic, index }: TopicCardProps) {
  const totalSteps = topic.examples.reduce((sum, example) => sum + example.steps.length, 0)

  return (
    <Link
      to={`/regelboek/${topic.id}`}
      className={[styles.card, index % 2 === 0 ? styles.tiltLeft : styles.tiltRight].join(' ')}
    >
      <span
        className={[styles.cardSuit, SUIT_TONE[index % SUIT_MARKS.length] === 'red' ? styles.suitRed : styles.suitBlack].join(
          ' ',
        )}
        aria-hidden="true"
      >
        {SUIT_MARKS[index % SUIT_MARKS.length]}
      </span>
      <h2 className={styles.cardTitle}>{topic.title}</h2>
      <p className={styles.cardDesc}>{topic.intro}</p>
      <div className={styles.cardFooter}>
        <span className={styles.stepCount}>{totalSteps} stappen</span>
        <div className={styles.levelPills}>
          {topic.examples.map((example) => (
            <span key={example.id} className={styles.levelPill}>
              {LEVEL_LABEL_NL[example.level]}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default function RulebookIndex() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Regelboek</h1>
      <p className={styles.intro}>Kies een onderwerp om de spelregels stap voor stap te doorlopen.</p>

      <div className={styles.board}>
        <div className={styles.tiles}>
          {RULE_TOPICS.map((topic, index) => (
            <TopicCard key={topic.id} topic={topic} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
