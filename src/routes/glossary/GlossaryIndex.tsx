import { useState, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GLOSSARY_TERMS } from '@/content/glossary/index'
import type { GlossaryCategory, GlossaryTerm } from '@/content/glossary-types'
import Tag from '@/components/ui/Tag'
import GlossaryLink from '@/components/GlossaryLink'
import styles from './GlossaryIndex.module.css'

const ALL_CATEGORIES: GlossaryCategory[] = ['gameplay', 'scoring', 'roles', 'tournament', 'sanctions']

const CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  gameplay: 'Spelverloop',
  scoring: 'Punten',
  roles: 'Rollen',
  tournament: 'Toernooi',
  sanctions: 'Sancties',
}

interface TermCardProps {
  term: GlossaryTerm
  index: number
  highlighted: boolean
}

function TermCard({ term, index, highlighted }: TermCardProps) {
  return (
    <div
      id={term.slug}
      className={[
        styles.card,
        index % 2 === 0 ? styles.tiltLeft : styles.tiltRight,
        highlighted ? styles.highlighted : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>{term.term}</h2>
        <Tag>{CATEGORY_LABELS[term.category]}</Tag>
      </div>
      <p className={styles.cardDesc}>{term.definition}</p>

      {((term.relatedTerms && term.relatedTerms.length > 0) ||
        (term.relatedRules && term.relatedRules.length > 0)) && (
        <div className={styles.cardFooter}>
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <span>
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
            </span>
          )}

          {term.relatedRules && term.relatedRules.length > 0 && (
            <span>
              Regelboek:{' '}
              {term.relatedRules.map((rule, i) => (
                <span key={rule}>
                  {i > 0 && ', '}
                  <Link to={`/rulebook/${rule}`}>{rule}</Link>
                </span>
              ))}
            </span>
          )}
        </div>
      )}
    </div>
  )
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
    <div className={styles.page}>
      <h1 className={styles.heading}>Woordenboek</h1>
      <p className={styles.intro}>Alle termen, rollen en regels van Troefcall op één plek.</p>

      <input
        type="search"
        placeholder="Zoek een term…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Zoek in het woordenboek"
        className={styles.search}
      />

      <div className={styles.categoryFilters}>
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
        <p className={styles.empty}>Geen termen gevonden.</p>
      ) : (
        <div className={styles.board}>
          <div className={styles.tiles}>
            {filtered.map((term, index) => (
              <TermCard key={term.slug} term={term} index={index} highlighted={termSlug === term.slug} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
