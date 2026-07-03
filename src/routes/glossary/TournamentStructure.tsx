import { Link } from 'react-router-dom'
import { TOURNAMENT_STRUCTURE } from '@/content/glossary/index'

const OUTCOME_LABELS: Record<'win' | 'draw' | 'loss', string> = {
  win: 'Gewonnen',
  draw: 'Gelijkspel',
  loss: 'Verloren',
}

export default function TournamentStructure() {
  const ts = TOURNAMENT_STRUCTURE

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <p style={{ marginBottom: '1rem' }}>
        <Link to="/glossary">&larr; Woordenboek</Link>
      </p>

      <h1>Toernooistructuur</h1>
      <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
        Hoe een Troefcall-toernooi is opgebouwd: tafels, sets, matches en puntentelling.
      </p>

      {/* Opzet */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '0.75rem' }}>Opzet</h2>
        <ul style={{ lineHeight: 2 }}>
          <li>
            <strong>Tafels per sessie:</strong> {ts.tablesPerSession}
          </li>
          <li>
            <strong>Koppels per club:</strong> {ts.koppelsPerClub}
          </li>
          <li>
            <strong>Spellen per set:</strong> {ts.gamesPerSet}
          </li>
          <li>
            <strong>Sets per match:</strong> {ts.setsPerMatch}
          </li>
        </ul>
      </section>

      {/* Tafelrotatie */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '0.75rem' }}>Tafelrotatie</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          <div
            style={{
              padding: '1rem',
              borderRadius: '6px',
              border: '1px solid rgba(212,175,55,0.25)',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <strong>Lopende koppels</strong>
            <p style={{ marginTop: '0.4rem', lineHeight: 1.6, opacity: 0.9 }}>
              {ts.tableRotation.lopendeKoppels}
            </p>
          </div>
          <div
            style={{
              padding: '1rem',
              borderRadius: '6px',
              border: '1px solid rgba(212,175,55,0.25)',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <strong>Zittende koppels</strong>
            <p style={{ marginTop: '0.4rem', lineHeight: 1.6, opacity: 0.9 }}>
              {ts.tableRotation.zittendeKoppels}
            </p>
          </div>
        </div>
      </section>

      {/* Competitiepunten */}
      <section>
        <h2 style={{ marginBottom: '0.75rem' }}>Competitiepunten</h2>
        <table
          style={{
            borderCollapse: 'collapse',
            width: '100%',
            maxWidth: '400px',
            fontSize: '0.95rem',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(212,175,55,0.5)', textAlign: 'left' }}>
              <th style={{ padding: '0.5rem 1rem 0.5rem 0' }}>Uitslag</th>
              <th style={{ padding: '0.5rem 0' }}>Punten</th>
            </tr>
          </thead>
          <tbody>
            {ts.competitionPoints.map((row, i) => (
              <tr
                key={row.outcome}
                style={{
                  borderBottom: '1px solid rgba(212,175,55,0.15)',
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : undefined,
                }}
              >
                <td style={{ padding: '0.6rem 1rem 0.6rem 0' }}>{OUTCOME_LABELS[row.outcome]}</td>
                <td style={{ padding: '0.6rem 0', fontWeight: 700 }}>{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
