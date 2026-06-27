import { NavLink } from 'react-router-dom'
import styles from './TopNav.module.css'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.link} ${styles.linkActive}` : styles.link

export default function TopNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <span aria-hidden="true">♠</span>
        <span>Troefcall</span>
      </div>
      <div className={styles.links}>
        <NavLink to="/" className={navLinkClass} end>
          Home
        </NavLink>
        <NavLink to="/rulebook" className={navLinkClass}>
          Regelboek
        </NavLink>
        <NavLink to="/demo/trick-resolution" className={navLinkClass}>
          Probeer het
        </NavLink>
        <NavLink to="/glossary" className={navLinkClass}>
          Woordenboek
        </NavLink>
      </div>
    </nav>
  )
}
