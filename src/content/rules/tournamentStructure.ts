import type { RuleTopic, Seat } from '@/content/types'

const seats: [Seat, Seat, Seat, Seat] = [
  { id: 'N', name: 'Noord', team: 1 },
  { id: 'E', name: 'Oost', team: 2 },
  { id: 'S', name: 'Zuid', team: 1 },
  { id: 'W', name: 'West', team: 2 },
]

export const tournamentStructureTopic: RuleTopic = {
  id: 'tournament-structure',
  title: 'Toernooistructuur & competitiepunten',
  intro:
    'Een losse hand levert punten op (zie "Een hand winnen"), maar op een clubavond tellen die punten op tot een setuitslag, en setuitslagen tellen weer op tot een matchstand. Dit hoofdstuk legt de opbouw van een toernooi uit: sets, matches, tafelrotatie en competitiepunten.',
  rules: [
    'Een set bestaat uit 4 hands, gespeeld aan één tafel.',
    'Een volledige match bestaat uit 8 sets.',
    'Na elke set verplaatsen de lopende koppels zich met de klok mee naar de volgende tafel. De zittende koppels blijven aan dezelfde tafel en ontvangen telkens een nieuw koppel.',
    'Aan het einde van elke set wordt de setuitslag omgezet in competitiepunten: een setoverwinning levert 3 competitiepunten op, een gelijkspel 1 punt voor beide koppels, en een setverlies 0 punten.',
    'De competitiepunten van alle 8 sets samen bepalen de eindstand van de match.',
  ],
  examples: [
    {
      id: 'tournament-structure-simple',
      level: 'simple',
      title: 'Eén set: 4 hands aan dezelfde tafel',
      narration: 'Een set bestaat uit 4 hands. Wie de meeste hands wint, wint de set en de bijbehorende competitiepunten.',
      seats,
      steps: [
        {
          type: 'callout',
          tone: 'info',
          text: 'Een set bestaat uit 4 hands, allemaal gespeeld aan dezelfde tafel tussen dezelfde twee koppels.',
        },
        {
          type: 'score',
          team: 1,
          points: 2,
          reason: 'Hand 1: Noord/Zuid winnen (normale winst, 2 punten).',
        },
        {
          type: 'score',
          team: 2,
          points: 2,
          reason: 'Hand 2: Oost/West winnen (normale winst, 2 punten).',
        },
        {
          type: 'score',
          team: 1,
          points: 5,
          reason: 'Hand 3: Noord/Zuid winnen met een kap (5 punten).',
        },
        {
          type: 'score',
          team: 1,
          points: 2,
          reason: 'Hand 4: Noord/Zuid winnen opnieuw (normale winst, 2 punten).',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Noord/Zuid winnen 3 van de 4 hands in deze set en halen in totaal de meeste handpunten.',
        },
        {
          type: 'score',
          team: 1,
          points: 3,
          reason: 'Setoverwinning voor Noord/Zuid — 3 competitiepunten.',
        },
        {
          type: 'score',
          team: 2,
          points: 0,
          reason: 'Setverlies voor Oost/West — 0 competitiepunten.',
        },
      ],
    },
    {
      id: 'tournament-structure-twist',
      level: 'twist',
      title: 'Gelijkspel, en daarna de tafelrotatie',
      narration: 'Een set kan ook gelijk eindigen. Daarna wisselen de lopende koppels van tafel, terwijl de zittende koppels blijven zitten.',
      seats,
      steps: [
        {
          type: 'callout',
          tone: 'info',
          text: 'Na 4 hands staat de set gelijk: Noord/Zuid en Oost/West hebben allebei 2 hands gewonnen.',
        },
        {
          type: 'score',
          team: 1,
          points: 1,
          reason: 'Gelijkspel in de set — Noord/Zuid krijgen 1 competitiepunt.',
        },
        {
          type: 'score',
          team: 2,
          points: 1,
          reason: 'Gelijkspel in de set — Oost/West krijgen ook 1 competitiepunt.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Na de set verplaatsen de lopende koppels zich met de klok mee naar de volgende tafel.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'De zittende koppels blijven aan deze tafel zitten en spelen de volgende set tegen een nieuw lopend koppel.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Zo speelt elk koppel in de loop van een match tegen meerdere verschillende tegenstanders.',
        },
      ],
    },
    {
      id: 'tournament-structure-full',
      level: 'full',
      title: 'Een volledige match: 8 sets bij elkaar opgeteld',
      narration: 'Een match bestaat uit 8 sets. Aan het einde tellen de competitiepunten van alle sets samen op tot de einduitslag.',
      seats,
      steps: [
        {
          type: 'callout',
          tone: 'info',
          text: 'Een match bestaat uit 8 sets. Noord/Zuid volgen de competitiepunten van set tot set.',
        },
        {
          type: 'score',
          team: 1,
          points: 3,
          reason: 'Set 1: setoverwinning — 3 competitiepunten.',
        },
        {
          type: 'score',
          team: 1,
          points: 1,
          reason: 'Set 2: gelijkspel — 1 competitiepunt.',
        },
        {
          type: 'score',
          team: 1,
          points: 0,
          reason: 'Set 3: setverlies — 0 competitiepunten.',
        },
        {
          type: 'score',
          team: 1,
          points: 3,
          reason: 'Set 4: setoverwinning — 3 competitiepunten.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Na 4 sets staat Noord/Zuid op 7 competitiepunten (3 + 1 + 0 + 3). De resterende 4 sets van de match volgen hetzelfde patroon.',
        },
        {
          type: 'score',
          team: 1,
          points: 3,
          reason: 'Set 5: setoverwinning — 3 competitiepunten.',
        },
        {
          type: 'score',
          team: 1,
          points: 3,
          reason: 'Set 6: setoverwinning — 3 competitiepunten.',
        },
        {
          type: 'score',
          team: 1,
          points: 0,
          reason: 'Set 7: setverlies — 0 competitiepunten.',
        },
        {
          type: 'score',
          team: 1,
          points: 1,
          reason: 'Set 8: gelijkspel — 1 competitiepunt.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Eindstand van de match voor Noord/Zuid: 7 + 3 + 3 + 0 + 1 = 14 competitiepunten over 8 sets. Deze eindstand, niet de punten van één losse hand, bepaalt wie de match wint.',
        },
      ],
    },
  ],
}
