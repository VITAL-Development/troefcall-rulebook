import ExampleStepper from '@/components/examples/ExampleStepper'
import { trickTakingTopic } from '@/content/rules/trickTaking'
import styles from './TrickResolutionDemo.module.css'

export default function TrickResolutionDemo() {
  const example = trickTakingTopic.examples[0]

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Probeer een slag</h1>
      <p className={styles.intro}>
        Doorloop de stappen om te zien hoe een slag wordt gespeeld en wie er wint.
      </p>
      <ExampleStepper example={example} />
    </div>
  )
}
