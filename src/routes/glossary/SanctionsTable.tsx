import { Link } from 'react-router-dom'
import { SANCTION_RULES } from '@/content/glossary/index'

export default function SanctionsTable() {
  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <p style={{ marginBottom: '1rem' }}>
        <Link to="/glossary">&larr; Woordenboek</Link>
      </p>

      <h1>Sancties</h1>
      <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
        Overzicht van overtredingen en de bijbehorende straffen tijdens een Troefcall-spel.
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.95rem',
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: '2px solid rgba(212,175,55,0.5)',
                textAlign: 'left',
              }}
            >
              <th style={{ padding: '0.6rem 1rem 0.6rem 0', width: '40%' }}>Overtreding</th>
              <th style={{ padding: '0.6rem 1rem', width: '35%' }}>Gevolg</th>
              <th style={{ padding: '0.6rem 0 0.6rem 1rem', width: '25%' }}>Notities</th>
            </tr>
          </thead>
          <tbody>
            {SANCTION_RULES.map((rule, i) => (
              <tr
                key={rule.id}
                style={{
                  borderBottom: '1px solid rgba(212,175,55,0.15)',
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : undefined,
                  verticalAlign: 'top',
                }}
              >
                <td style={{ padding: '0.75rem 1rem 0.75rem 0', lineHeight: 1.5 }}>
                  {rule.violation}
                </td>
                <td style={{ padding: '0.75rem 1rem', lineHeight: 1.5, fontWeight: 600 }}>
                  {rule.consequence}
                </td>
                <td style={{ padding: '0.75rem 0 0.75rem 1rem', lineHeight: 1.5, opacity: 0.75, fontSize: '0.875rem' }}>
                  {rule.notes ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
