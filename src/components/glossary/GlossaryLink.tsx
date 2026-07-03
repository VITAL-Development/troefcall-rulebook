import { Link } from 'react-router-dom'
import { glossaryTerms } from '@/content/glossary/terms'

interface GlossaryLinkProps {
  slug: string
  children?: React.ReactNode
}

export default function GlossaryLink({ slug, children }: GlossaryLinkProps) {
  const term = glossaryTerms.find((t) => t.slug === slug)
  const label = children ?? term?.term ?? slug
  return <Link to={`/glossary/${slug}`}>{label}</Link>
}
