import type { SanctionRule } from '@/content/glossary-types'

export const SANCTION_RULES: SanctionRule[] = [
  {
    id: 'looking-at-closed-trick',
    violation: 'Een omgekeerde (gewonnen) slag bekijken',
    consequence: 'Tegenpartij krijgt 2 strafpunten; het spel eindigt onmiddellijk.',
    notes:
      'Geldt voor alle spelers — ook de winnaar van de slag mag de reeds gewonnen slagen niet meer inkijken nadat ze zijn omgekeerd.',
  },
  {
    id: 'card-out-of-turn-early',
    violation: 'Een kaart buiten de beurt spelen of tonen (0–4 slagen gespeeld)',
    consequence: 'Tegenpartij krijgt 5 strafpunten.',
    notes:
      'Van toepassing wanneer de overtredende partij nog geen slagen heeft gewonnen en er minder dan 5 slagen zijn gespeeld.',
  },
  {
    id: 'card-out-of-turn-late',
    violation: 'Een kaart buiten de beurt spelen of tonen (5 of meer slagen gespeeld)',
    consequence: 'Tegenpartij krijgt 15 strafpunten.',
    notes:
      'Van toepassing wanneer er al 5 of meer slagen zijn gespeeld en de overtredende partij nog geen slagen heeft gewonnen.',
  },
  {
    id: 'card-out-of-turn-offender-has-tricks',
    violation: 'Een kaart buiten de beurt spelen of tonen (overtredende partij heeft reeds slagen)',
    consequence: 'Tegenpartij krijgt 2 strafpunten.',
    notes:
      'Als de overtredende partij zelf al één of meer slagen heeft gewonnen, geldt een verzacht tarief van 2 punten, ongeacht het moment in het spel.',
  },
  {
    id: 'not-laying-down-cards',
    violation: 'Resterende kaarten niet neerleggen bij het einde van het spel',
    consequence: 'Tegenpartij krijgt 2 strafpunten.',
    notes:
      'Wanneer een speler zijn resterende kaarten op het einde van de hand moet neerleggen (bijv. na capitulatie of bij de laatste slagen), en dit nalaat, volgen 2 strafpunten.',
  },
]
