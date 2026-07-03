import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface GlossaryLinkProps {
  /** The slug of the glossary term to link to */
  slug: string
  /** Link label; defaults to the slug if omitted */
  children?: ReactNode
}

/**
 * Bidirectional link between glossary terms and rulebook pages.
 * Navigates to /glossary/<slug> and scrolls to the term anchor.
 */
export default function GlossaryLink({ slug, children }: GlossaryLinkProps) {
  return <Link to={`/glossary/${slug}`}>{children ?? slug}</Link>
}
