import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

// TODO(#49): replace with the real donation link once a platform/account is
// chosen (e.g. GitHub Sponsors, Ko-fi, Liberapay, Buy Me a Coffee). This is a
// deliberate, obviously-fake placeholder — do not ship it as-is.
const DONATE_URL = 'https://example.com/REPLACE_ME_DONATE_LINK'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link to="/over-ons" className={styles.link}>
          Over ons
        </Link>
        <a href={`mailto:${import.meta.env.VITE_FEEDBACK_EMAIL}`} className={styles.link}>
          Feedback
        </a>
        <a href={DONATE_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
          ☕ Steun dit project
        </a>
      </div>
    </footer>
  )
}
