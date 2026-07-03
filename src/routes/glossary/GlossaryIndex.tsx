import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { glossaryTerms } from '@/content/glossary/terms'
import type { GlossaryCategory } from '@/content/glossary-types'

const CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  gameplay: 'Spel',
  scoring: 'Punten',
  roles: 'Rollen',
  tournament: 'Toernooi',
  sanctions: 'Sancties',
}

const ALL_CATEGORIES: GlossaryCategory[] = ['gameplay', 'scoring', 'roles', 'tournament', 'sanctions']

export default function GlossaryIndex() {
  const { termSlug } = useParams<{ termSlug?: string }>()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | null>(null)

  const selectedTerm = termSlug ? glossaryTerms.find((t) => t.slug === termSlug) : null

  const filtered = glossaryTerms.filter((t) => {
    const matchesCategory = activeCategory === null || t.category === activeCategory
    const matchesSearch =
      search.trim() === '' ||
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sorted = [...filtered].sort((a, b) => a.term.localeCompare(b.term, 'nl'))

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Begrippenlijst</h1>
      <p style={{ marginBottom: '1.5rem', opacity: 0.7 }}>
        Alle vaktermen van Troefcall, van spelbegrippen tot toernooiregels.
      </p>

      {selectedTerm && (
        <div
          style={{
            border: '2px solid currentColor',
            borderRadius: '8px',
            padding: '1.25rem',
            marginBottom: '2rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h2 style={{ margin: 0 }}>{selectedTerm.term}</h2>
            <span
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                opacity: 0.6,
                letterSpacing: '0.05em',
              }}
            >
              {CATEGORY_LABELS[selectedTerm.category]}
            </span>
          </div>
          <p style={{ marginTop: '0.75rem', marginBottom: selectedTerm.relatedTerms?.length ? '0.75rem' : 0 }}>
            {selectedTerm.definition}
          </p>
          {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              <strong>Gerelateerde termen: </strong>
              {selectedTerm.relatedTerms.map((slug, i) => {
                const related = glossaryTerms.find((t) => t.slug === slug)
                return (
                  <span key={slug}>
                    {i > 0 && ', '}
                    <Link to={`/glossary/${slug}`}>{related?.term ?? slug}</Link>
                  </span>
                )
              })}
            </p>
          )}
          {selectedTerm.relatedRules && selectedTerm.relatedRules.length > 0 && (
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem' }}>
              <strong>Zie ook: </strong>
              {selectedTerm.relatedRules.map((ruleId, i) => (
                <span key={ruleId}>
                  {i > 0 && ', '}
                  <Link to={`/rulebook/${ruleId}`}>{ruleId}</Link>
                </span>
              ))}
            </p>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <button
          onClick={() => setActiveCategory(null)}
          style={{
            padding: '0.35rem 0.75rem',
            borderRadius: '4px',
            border: '1px solid currentColor',
            background: activeCategory === null ? 'currentColor' : 'transparent',
            color: activeCategory === null ? 'var(--color-surface, #fff)' : 'inherit',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Alles
        </button>
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '4px',
              border: '1px solid currentColor',
              background: activeCategory === cat ? 'currentColor' : 'transparent',
              color: activeCategory === cat ? 'var(--color-surface, #fff)' : 'inherit',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <input
        type="search"
        placeholder="Zoek een begrip…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '0.5rem 0.75rem',
          borderRadius: '4px',
          border: '1px solid currentColor',
          background: 'transparent',
          color: 'inherit',
          fontSize: '1rem',
          marginBottom: '1.5rem',
          boxSizing: 'border-box',
        }}
      />

      {sorted.length === 0 && (
        <p style={{ opacity: 0.6 }}>Geen begrippen gevonden voor deze zoekopdracht.</p>
      )}

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {sorted.map((t) => (
          <li
            key={t.slug}
            style={{
              borderLeft: '3px solid currentColor',
              paddingLeft: '0.75rem',
              opacity: selectedTerm && selectedTerm.slug !== t.slug ? 0.6 : 1,
            }}
          >
            <Link
              to={`/glossary/${t.slug}`}
              style={{ fontWeight: 600, textDecoration: 'none' }}
            >
              {t.term}
            </Link>
            <span
              style={{
                marginLeft: '0.5rem',
                fontSize: '0.75rem',
                opacity: 0.55,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {CATEGORY_LABELS[t.category]}
            </span>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', opacity: 0.8 }}>
              {t.definition.length > 120 ? t.definition.slice(0, 120) + '…' : t.definition}
            </p>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/glossary/sanctions">Sanctietabel</Link>
        <Link to="/glossary/tournament">Toernooistructuur</Link>
      </div>
    </div>
  )
}
