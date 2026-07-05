import type { RuleTopic, Seat } from '@/content/types'

const seats: [Seat, Seat, Seat, Seat] = [
  { id: 'N', name: 'Noord', team: 1 },
  { id: 'E', name: 'Oost', team: 2 },
  { id: 'S', name: 'Zuid', team: 1 },
  { id: 'W', name: 'West', team: 2 },
]

export const sanctionsTopic: RuleTopic = {
  id: 'sancties',
  title: 'Sancties tijdens het spel',
  intro:
    'Naast misdelingen bij het schudden (zie "Schudden, delen & troef roepen") kent Troefcall ook sancties tijdens het uitspelen van de hand zelf: een kaart buiten de beurt, stiekem kijken naar een afgesloten slag, of kaarten niet netjes neerleggen aan het einde. De hoogte van de straf hangt af van het moment in de hand en van hoeveel slagen de overtreder al heeft.',
  rules: [
    'Een kaart buiten de beurt spelen of tonen, terwijl er nog geen 5 slagen zijn gespeeld en de overtredende partij nog op 0 slagen staat: 5 strafpunten voor de tegenpartij.',
    'Dezelfde overtreding vanaf slag 5, terwijl de overtredende partij nog steeds op 0 slagen staat: 15 strafpunten voor de tegenpartij.',
    'Heeft de overtredende partij zelf al minstens 1 slag gewonnen, dan geldt ongeacht het moment in de hand een verzacht tarief van 2 strafpunten.',
    'Een reeds gewonnen en omgekeerde slag opnieuw bekijken is nooit toegestaan: 2 strafpunten voor de tegenpartij, en het spel eindigt onmiddellijk.',
    'Resterende kaarten niet neerleggen aan het einde van de hand (bijvoorbeeld na een capitulatie of bij de laatste slagen): 2 strafpunten voor de tegenpartij.',
  ],
  examples: [
    {
      id: 'sanctions-simple',
      level: 'simple',
      title: 'Een kaart buiten de beurt, vroeg in de hand',
      narration:
        'Vóór slag 5, terwijl de overtredende partij nog op 0 slagen staat, geldt het zwaarste tarief voor dit tijdstip: 5 strafpunten.',
      seats,
      steps: [
        {
          type: 'declareTrump',
          seat: 'N',
          suit: 'hearts',
          caption: 'Troef is Harten.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'De eerste drie slagen zijn gespeeld. Oost/West staan nog op 0 slagen.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Tijdens slag 4 laat Oost per ongeluk een kaart uit zijn hand zien vóórdat hij aan de beurt is.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Er zijn nog geen 5 slagen gespeeld en Oost/West staan nog op 0 slagen — dit valt onder het vroege tarief.',
        },
        {
          type: 'score',
          team: 1,
          points: 5,
          reason: 'Kaart buiten de beurt vóór slag 5, terwijl de overtreder op 0 slagen staat — Noord/Zuid krijgen 5 strafpunten.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Het spel gaat na de sanctie gewoon verder met de rest van de hand.',
        },
      ],
    },
    {
      id: 'sanctions-twist',
      level: 'twist',
      title: 'Zelfde overtreding, ander tarief',
      narration:
        'Een kaart buiten de beurt kan 5, 15 of slechts 2 strafpunten kosten — alles hangt af van het moment en van hoeveel slagen de overtreder al op zak heeft.',
      seats,
      steps: [
        {
          type: 'declareTrump',
          seat: 'S',
          suit: 'diamonds',
          caption: 'Troef is Ruiten.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Noord/Zuid winnen de eerste 5 slagen. Oost/West staan nog op 0.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Bij slag 6 toont West een kaart buiten de beurt.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Er zijn al 5 of meer slagen gespeeld en Oost/West staan nog steeds op 0 slagen — dit valt onder het late tarief.',
        },
        {
          type: 'score',
          team: 1,
          points: 15,
          reason: 'Kaart buiten de beurt vanaf slag 5, terwijl de overtreder nog op 0 slagen staat — Noord/Zuid krijgen 15 strafpunten.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Scenario B (alternatief): stel dat Oost/West vóór dit moment al één slag hadden gewonnen.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Omdat de overtredende partij dan al minstens 1 slag heeft, geldt het verzachte tarief — ongeacht het moment in de hand.',
        },
        {
          type: 'score',
          team: 1,
          points: 2,
          reason: 'Scenario B: heeft de overtreder al een slag gewonnen, dan daalt de straf naar 2 punten, zelfs laat in de hand.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Dezelfde overtreding kost dus 5, 15 of 2 punten, afhankelijk van het moment in de hand en of de overtreder al een slag had.',
        },
      ],
    },
    {
      id: 'sanctions-full',
      level: 'full',
      title: 'Verboden kijken beëindigt de hand direct',
      narration:
        'Stiekem terugkijken naar een afgesloten slag stopt het spel meteen. Ter vergelijking: kaarten niet netjes neerleggen aan het einde van een hand is een lichtere overtreding.',
      seats,
      steps: [
        {
          type: 'declareTrump',
          seat: 'W',
          suit: 'clubs',
          caption: 'Troef is Klaveren.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Noord/Zuid winnen de eerste 6 slagen, Oost/West winnen er 2.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Bij slag 9 bekijkt Zuid stiekem een eerder gewonnen en omgekeerde slag van zijn eigen koppel.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Verboden kijken naar een afgesloten slag is nooit toegestaan — ook niet naar een slag die het eigen koppel al gewonnen heeft.',
        },
        {
          type: 'score',
          team: 2,
          points: 2,
          reason: 'Verboden kijken naar een afgesloten slag — Oost/West krijgen 2 strafpunten.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Het spel eindigt onmiddellijk zodra dit gebeurt: de resterende slagen worden niet meer uitgespeeld.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Ter vergelijking, een lichtere overtreding: stel dat een hand wél normaal eindigt, maar West zijn resterende kaarten niet neerlegt.',
        },
        {
          type: 'score',
          team: 1,
          points: 2,
          reason: 'Resterende kaarten niet neerleggen aan het einde van de hand — Noord/Zuid krijgen 2 strafpunten.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Verboden kijken en het niet neerleggen van kaarten leveren allebei 2 strafpunten op, maar alleen verboden kijken beëindigt de hand meteen.',
        },
      ],
    },
  ],
}
