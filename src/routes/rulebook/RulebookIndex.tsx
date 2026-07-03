import { Link } from 'react-router-dom'
import styles from './RulebookIndex.module.css'

export default function RulebookIndex() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Regelboek</h1>
      <p className={styles.intro}>
        Kies een onderwerp om de spelregels stap voor stap te doorlopen.
      </p>
      <ul className={styles.list}>
        <li>
          <Link to="/rulebook/setup-dealing">Schudden, delen &amp; troef roepen</Link>
        </li>
        <li>
          <Link to="/rulebook/trick-taking">Een slag spelen</Link>
        </li>
        <li>
          <Link to="/rulebook/winning-a-hand">Een hand winnen</Link>
        </li>
      </ul>
    </div>
  )
}
