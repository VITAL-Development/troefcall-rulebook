export type GlossaryCategory = 'gameplay' | 'scoring' | 'roles' | 'tournament' | 'sanctions'

export interface GlossaryTerm {
  slug: string
  term: string
  category: GlossaryCategory
  definition: string
  relatedRules?: string[]
  relatedTerms?: string[]
}

export interface SanctionRule {
  id: string
  violation: string
  consequence: string
  notes?: string
}
