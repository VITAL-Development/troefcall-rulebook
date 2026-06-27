import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h1>Helaas, geen slag</h1>
      <p>Deze pagina bestaat niet.</p>
      <Link to="/">Terug naar huis</Link>
    </div>
  )
}
