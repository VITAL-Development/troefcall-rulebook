import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link to="/over-ons" className={styles.link}>
          Over ons
        </Link>
      </div>
    </footer>
  )
}
