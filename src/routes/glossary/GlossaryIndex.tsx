import { useState, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GLOSSARY_TERMS } from '@/content/glossary/index'
import type { GlossaryCategory } from '@/content/glossary-types'
import Tag from '@/components/ui/Tag'
import GlossaryLink from '@/components/GlossaryLink'

const ALL_CATEGORIES: GlossaryCategory[] = ['gameplay', 'scoring', 'roles', 'tournament', 'sanctions']

const CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  gameplay: 'Spelverloop',
  scoring: 'Punten',
  roles: 'Rollen',
  tournament: 'Toernooi',
  sanctions: 'Sancties',
}

export default function GlossaryIndex() {
  const { termSlug } = useParams<{ termSlug?: string }>()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | 'all'>('all')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return GLOSSARY_TERMS.filter((t) => {
      const matchesCategory = activeCategory === 'all' || t.category === activeCategory
      const matchesSearch =
        !q ||
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.slug.includes(q)
      return matchesCategory && matchesSearch
    })
  }, [search, activeCategory])

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Woordenboek</h1>
      <p style={{ opacity: 0.8, marginBottom: '1.5rem' }}>
        Alle termen, rollen en regels van Troefcall op één plek.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <Link to="/glossary/sanctions">Sanctietabel</Link>
        <Link to="/glossary/tournament-structure">Toernooistructuur</Link>
      </div>

      <input
        type="search"
        placeholder="Zoek een term…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Zoek in het woordenboek"
        style={{
          width: '100%',
          padding: '0.5rem 0.75rem',
          marginBottom: '1rem',
          borderRadius: '6px',
          border: '1px solid rgba(212,175,55,0.4)',
          background: 'rgba(0,0,0,0.3)',
          color: 'inherit',
          fontSize: '1rem',
          boxSizing: 'border-box',
        }}
      />

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <Tag onClick={() => setActiveCategory('all')} active={activeCategory === 'all'}>
          Alles
        </Tag>
        {ALL_CATEGORIES.map((cat) => (
          <Tag
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? 'all' : cat)}
            active={activeCategory === cat}
          >
            {CATEGORY_LABELS[cat]}
          </Tag>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ opacity: 0.6, fontStyle: 'italic' }}>Geen termen gevonden.</p>
      ) : (
        <dl>
          {filtered.map((term) => {
            const isHighlighted = termSlug === term.slug
            return (
              <div
                key={term.slug}
                id={term.slug}
                style={{
                  marginBottom: '2rem',
                  scrollMarginTop: '5rem',
                  borderBottom: '1px solid rgba(212,175,55,0.15)',
                  outline: isHighlighted ? '2px solid rgba(212,175,55,0.6)' : undefined,
                  borderRadius: isHighlighted ? '4px' : undefined,
                  padding: isHighlighted ? '0.75rem' : '0 0 1.5rem',
                }}
              >
                <dt
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}
                >
                  <strong style={{ fontSize: '1.1rem' }}>{term.term}</strong>
                  <Tag>{CATEGORY_LABELS[term.category]}</Tag>
                </dt>
                <dd style={{ margin: 0, lineHeight: 1.6, opacity: 0.9 }}>{term.definition}</dd>

                {term.relatedTerms && term.relatedTerms.length > 0 && (
                  <dd style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', opacity: 0.7 }}>
                    Zie ook:{' '}
                    {term.relatedTerms.map((slug, i) => {
                      const linked = GLOSSARY_TERMS.find((t) => t.slug === slug)
                      return (
                        <span key={slug}>
                          {i > 0 && ', '}
                          <GlossaryLink slug={slug}>{linked?.term ?? slug}</GlossaryLink>
                        </span>
                      )
                    })}
                  </dd>
                )}

                {term.relatedRules && term.relatedRules.length > 0 && (
                  <dd style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', opacity: 0.7 }}>
                    Regelboek:{' '}
                    {term.relatedRules.map((rule, i) => (
                      <span key={rule}>
                        {i > 0 && ', '}
                        <Link to={`/rulebook/${rule}`}>{rule}</Link>
                      </span>
                    ))}
                  </dd>
                )}
              </div>
            )
          })}
        </dl>
      )}
    </div>
  )
}
