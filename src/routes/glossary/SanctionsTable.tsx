import { Link } from 'react-router-dom'
import { sanctionRules } from '@/content/glossary/sanctions'

export default function SanctionsTable() {
  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <p style={{ marginBottom: '0.5rem' }}>
        <Link to="/glossary">← Begrippenlijst</Link>
      </p>
      <h1 style={{ marginBottom: '0.5rem' }}>Sancties</h1>
      <p style={{ marginBottom: '1.5rem', opacity: 0.7 }}>
        Overtredingen en de bijbehorende strafpunten.
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Overtreding</th>
              <th style={thStyle}>Gevolg</th>
              <th style={thStyle}>Opmerkingen</th>
            </tr>
          </thead>
          <tbody>
            {sanctionRules.map((rule, i) => (
              <tr key={rule.id} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(128,128,128,0.07)' }}>
                <td style={tdStyle}>{rule.violation}</td>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{rule.consequence}</td>
                <td style={{ ...tdStyle, opacity: 0.75, fontSize: '0.82rem' }}>{rule.notes ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '0.6rem 0.75rem',
  borderBottom: '2px solid currentColor',
  whiteSpace: 'nowrap',
}

const tdStyle: React.CSSProperties = {
  padding: '0.6rem 0.75rem',
  verticalAlign: 'top',
  borderBottom: '1px solid rgba(128,128,128,0.2)',
}
