import { Link } from 'react-router-dom'
import { tournamentStructure } from '@/content/glossary/tournamentStructure'
import GlossaryLink from '@/components/glossary/GlossaryLink'

export default function TournamentStructure() {
  const { tables, koppelsPerClub, gamesPerSet, setsPerMatch, phases, scoring, description } =
    tournamentStructure

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <p style={{ marginBottom: '0.5rem' }}>
        <Link to="/glossary">← Begrippenlijst</Link>
      </p>
      <h1 style={{ marginBottom: '0.5rem' }}>Toernooistructuur</h1>
      <p style={{ marginBottom: '1.5rem', opacity: 0.7 }}>{description}</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <StatTile label="Tafels" value={tables} />
        <StatTile label="Koppels per club" value={koppelsPerClub} />
        <StatTile label="Spellen per set" value={gamesPerSet} />
        <StatTile label="Sets per match" value={setsPerMatch} />
      </div>

      <h2 style={{ marginBottom: '0.75rem' }}>Fasen</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {phases.map((phase) => (
          <li
            key={phase.name}
            style={{ borderLeft: '3px solid currentColor', paddingLeft: '0.75rem' }}
          >
            <strong>{phase.name}</strong>
            <p style={{ margin: '0.25rem 0 0', opacity: 0.8 }}>{phase.description}</p>
          </li>
        ))}
      </ul>

      <h2 style={{ marginBottom: '0.75rem' }}>Competitiepunten</h2>
      <table style={{ borderCollapse: 'collapse', fontSize: '0.9rem', marginBottom: '2rem' }}>
        <thead>
          <tr>
            <th style={thStyle}>Resultaat</th>
            <th style={thStyle}>Punten</th>
          </tr>
        </thead>
        <tbody>
          {scoring.map((row, i) => (
            <tr key={row.result} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(128,128,128,0.07)' }}>
              <td style={tdStyle}>{row.result}</td>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginBottom: '0.75rem' }}>Gerelateerde begrippen</h2>
      <p>
        <GlossaryLink slug="lopende-koppels" />
        {' · '}
        <GlossaryLink slug="koppel" />
        {' · '}
        <GlossaryLink slug="tafel" />
        {' · '}
        <GlossaryLink slug="set" />
        {' · '}
        <GlossaryLink slug="match" />
      </p>
    </div>
  )
}

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        border: '1px solid rgba(128,128,128,0.3)',
        borderRadius: '8px',
        padding: '1rem',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>{value}</div>
      <div style={{ marginTop: '0.4rem', fontSize: '0.82rem', opacity: 0.65 }}>{label}</div>
    </div>
  )
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '0.5rem 1rem 0.5rem 0.75rem',
  borderBottom: '2px solid currentColor',
}

const tdStyle: React.CSSProperties = {
  padding: '0.5rem 1rem 0.5rem 0.75rem',
  borderBottom: '1px solid rgba(128,128,128,0.2)',
}
