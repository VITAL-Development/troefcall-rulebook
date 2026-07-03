import type { SanctionRule } from '@/content/glossary-types'

export const sanctionRules: SanctionRule[] = [
  {
    id: 'closed-trick-peek',
    violation: 'Inkijken van een gedekte slag',
    consequence: 'Tegenstanders krijgen 2 punten en het spel eindigt onmiddellijk.',
    notes: 'Een gedekte slag mag door niemand bekeken worden nadat hij weggelegd is.',
  },
  {
    id: 'out-of-turn-0-4',
    violation: 'Kaart buiten de beurt spelen of tonen — 0 tot 4 slagen gewonnen',
    consequence: 'De overtredende partij geeft de tegenstanders 5 punten.',
    notes: 'Van toepassing wanneer de overtredende partij op het moment van de overtreding 0 tot 4 slagen heeft gewonnen.',
  },
  {
    id: 'out-of-turn-5-plus',
    violation: 'Kaart buiten de beurt spelen of tonen — 5 of meer slagen gewonnen',
    consequence: 'De overtredende partij geeft de tegenstanders 15 punten.',
    notes: 'Van toepassing wanneer de overtredende partij op het moment van de overtreding 5 of meer slagen heeft gewonnen.',
  },
  {
    id: 'out-of-turn-already-has-tricks',
    violation: 'Kaart buiten de beurt spelen terwijl de overtredende partij al slagen heeft',
    consequence: 'De overtredende partij geeft de tegenstanders 2 punten.',
    notes: 'Afwijkend geval: wanneer de overtredende zijde zelf al slagen op zak heeft op het moment van de fout.',
  },
  {
    id: 'cards-not-laid-down',
    violation: 'Resterende kaarten niet neerleggen bij het einde van het spel',
    consequence: 'De overtredende partij geeft de tegenstanders 2 punten.',
    notes: 'Bij het einde van een hand moeten alle nog niet gespeelde kaarten zichtbaar neergelegd worden.',
  },
]
