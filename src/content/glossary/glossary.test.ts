import { describe, it, expect } from 'vitest'
import { GLOSSARY_TERMS } from './terms'
import { SANCTION_RULES } from './sanctions'

const VALID_CATEGORIES = ['gameplay', 'scoring', 'roles', 'tournament', 'sanctions'] as const

const ALL_SLUGS = new Set(GLOSSARY_TERMS.map((t) => t.slug))

describe('GlossaryTerm content', () => {
  it('has at least one term', () => {
    expect(GLOSSARY_TERMS.length).toBeGreaterThan(0)
  })

  it('all terms have required fields (slug, term, category, definition)', () => {
    for (const term of GLOSSARY_TERMS) {
      expect(term.slug, `slug missing on term: ${JSON.stringify(term)}`).toBeTruthy()
      expect(term.term, `term name missing on slug "${term.slug}"`).toBeTruthy()
      expect(term.category, `category missing on slug "${term.slug}"`).toBeTruthy()
      expect(term.definition, `definition missing on slug "${term.slug}"`).toBeTruthy()
    }
  })

  it('all slugs are unique', () => {
    expect(ALL_SLUGS.size).toBe(GLOSSARY_TERMS.length)
  })

  it('all category values are valid GlossaryCategory values', () => {
    for (const term of GLOSSARY_TERMS) {
      expect(
        (VALID_CATEGORIES as readonly string[]).includes(term.category),
        `Term "${term.slug}" has invalid category "${term.category}"`,
      ).toBe(true)
    }
  })

  it('relatedTerms slugs all exist in the terms list', () => {
    for (const term of GLOSSARY_TERMS) {
      for (const ref of term.relatedTerms ?? []) {
        expect(
          ALL_SLUGS.has(ref),
          `Term "${term.slug}" references unknown relatedTerms slug "${ref}"`,
        ).toBe(true)
      }
    }
  })
})

describe('SanctionRule content', () => {
  it('has at least one sanction rule', () => {
    expect(SANCTION_RULES.length).toBeGreaterThan(0)
  })

  it('all sanction rules have required fields (id, violation, consequence)', () => {
    for (const rule of SANCTION_RULES) {
      expect(rule.id, `id missing on sanction rule: ${JSON.stringify(rule)}`).toBeTruthy()
      expect(rule.violation, `violation missing on id "${rule.id}"`).toBeTruthy()
      expect(rule.consequence, `consequence missing on id "${rule.id}"`).toBeTruthy()
    }
  })

  it('all sanction IDs are unique', () => {
    const ids = new Set(SANCTION_RULES.map((r) => r.id))
    expect(ids.size).toBe(SANCTION_RULES.length)
  })
})
