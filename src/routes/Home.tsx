import { Link } from 'react-router-dom'
import styles from './Home.module.css'

interface SectionCardProps {
  to: string
  icon: string
  title: string
  description: string
}

function SectionCard({ to, icon, title, description }: SectionCardProps) {
  return (
    <Link to={to} className={styles.card} aria-label={title}>
      <span className={styles.cardIcon} aria-hidden="true">{icon}</span>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardDesc}>{description}</p>
    </Link>
  )
}

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>Troefcall</h1>
        <p className={styles.heroSubtitle}>
          Leer het Nederlandse kaartspel met interactieve spelregels en stap-voor-stap voorbeelden.
        </p>
      </header>

      <section className={styles.cards} aria-label="Hoofdsecties">
        <SectionCard
          to="/rulebook"
          icon="&#9824;"
          title="Regelboek"
          description="Alle spelregels stap voor stap uitgelegd met interactieve voorbeelden."
        />
        <SectionCard
          to="/glossary"
          icon="&#9827;"
          title="Woordenboek"
          description="Verklaringen van veelgebruikte termen in Troefcall."
        />
        <SectionCard
          to="/demo/trick-resolution"
          icon="&#9830;"
          title="Probeer het"
          description="Oefen het bepalen van de slagwinnaar in een interactieve demo."
        />
      </section>
    </div>
  )
}
