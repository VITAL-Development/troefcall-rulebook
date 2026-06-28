import { Link } from 'react-router-dom'

export default function RulebookIndex() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Regelboek</h1>
      <p style={{ fontStyle: 'italic', opacity: 0.7 }}>
        Tijdelijke navigator voor testers — overzichtspagina komt in M9.
      </p>
      <ul style={{ marginTop: '1rem', lineHeight: '2' }}>
        <li><Link to="/rulebook/setup-dealing">Schudden, delen &amp; troef roepen</Link></li>
        <li><Link to="/rulebook/trick-taking">Een slag spelen</Link></li>
        <li><Link to="/rulebook/winning-a-hand">Een hand winnen</Link></li>
      </ul>
    </div>
  )
}
