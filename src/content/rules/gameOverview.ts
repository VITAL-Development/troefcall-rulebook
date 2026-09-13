import type { RuleTopic, Seat } from '@/content/types'

const seats: [Seat, Seat, Seat, Seat] = [
  { id: 'N', name: 'Noord', team: 1, isCaller: true },
  { id: 'E', name: 'Oost', team: 2 },
  { id: 'S', name: 'Zuid', team: 1 },
  { id: 'W', name: 'West', team: 2, isDealer: true },
]

const plainSeats: [Seat, Seat, Seat, Seat] = [
  { id: 'N', name: 'Noord', team: 1 },
  { id: 'E', name: 'Oost', team: 2 },
  { id: 'S', name: 'Zuid', team: 1 },
  { id: 'W', name: 'West', team: 2 },
]

export const gameOverviewTopic: RuleTopic = {
  id: 'spelverloop',
  title: 'Het spel in het kort: van deel tot score',
  intro:
    'Dit hoofdstuk loopt één volledige hand in vogelvlucht langs — van de deling tot de puntentelling — en laat zien hoe de andere hoofdstukken van dit regelboek in elkaar grijpen. Gebruik het als kompas voordat je de rest in detail leest.',
  rules: [
    'Troefcall wordt gespeeld door 4 spelers in 2 vaste koppels: Noord/Zuid tegen Oost/West.',
    'Elke hand doorloopt drie fases: schudden & delen met troef roepen, 13 slagen uitspelen, en de hand afronden met een puntentelling.',
    'Zie "Schudden, delen & troef roepen" voor de volledige deel- en biedregels, "Een slag spelen" voor wat er binnen één slag gebeurt, en "Een hand winnen" voor kap, baunie en capituleren.',
    'Losse hands tellen op tot een setuitslag en uiteindelijk een matchstand — zie "Toernooistructuur & competitiepunten".',
    'Overtredingen tijdens het spel, zoals een kaart buiten de beurt of verboden kijken, worden apart bestraft — zie "Sancties tijdens het spel".',
  ],
  examples: [
    {
      id: 'game-overview-simple',
      level: 'simple',
      title: 'Eén hand, drie fases',
      narration: 'Een verkorte rondgang door de drie fases van een hand: delen & troef roepen, een slag spelen, en de hand afronden.',
      seats,
      steps: [
        {
          type: 'callout',
          tone: 'info',
          text: 'Fase 1 — Schudden, delen & troef roepen: West is dealer, Noord (links van West) is de caller.',
        },
        {
          type: 'deal',
          hands: {
            N: [
              { rank: 'A', suit: 'spades' },
              { rank: 'K', suit: 'hearts' },
              { rank: '9', suit: 'diamonds' },
              { rank: '6', suit: 'clubs' },
              { rank: '3', suit: 'spades' },
            ],
          },
          caption: 'Noord krijgt als caller de eerste 5 kaarten en ziet meteen een plaatje.',
        },
        {
          type: 'declareTrump',
          seat: 'N',
          suit: 'clubs',
          caption: 'Noord roept Klaveren als troef.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'De rest van de kaarten wordt gedeeld tot iedereen 13 kaarten heeft. Zie "Schudden, delen & troef roepen" voor de volledige regels, inclusief "no picture no game" en misdelingen.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Fase 2 — Een slag spelen: elke slag draait om dezelfde vragen — volgen, troeven, en wie heeft de hoogste kaart?',
        },
        {
          type: 'deal',
          hands: {
            N: [{ rank: 'Q', suit: 'diamonds' }],
            E: [{ rank: '8', suit: 'diamonds' }],
            S: [{ rank: 'A', suit: 'diamonds' }],
            W: [{ rank: '5', suit: 'diamonds' }],
          },
          caption: 'Een van de 13 slagen: iedereen speelt hier toevallig Ruiten, dus niemand hoeft te troeven.',
        },
        { type: 'play', seat: 'N', card: { rank: 'Q', suit: 'diamonds' }, caption: 'Noord leidt met Vrouw Ruiten.' },
        { type: 'play', seat: 'E', card: { rank: '8', suit: 'diamonds' }, caption: 'Oost volgt met 8 Ruiten.' },
        { type: 'play', seat: 'S', card: { rank: 'A', suit: 'diamonds' }, caption: 'Zuid speelt de Aas Ruiten — tot nu toe de hoogste.' },
        { type: 'play', seat: 'W', card: { rank: '5', suit: 'diamonds' }, caption: 'West volgt met 5 Ruiten.' },
        {
          type: 'resolveTrick',
          winningSeat: 'S',
          caption: 'Zuid had de hoogste Ruiten-kaart en wint deze slag. Zuid leidt meteen de volgende.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Dit patroon herhaalt zich 13 keer per hand. Zie "Een slag spelen" voor troeven, snijden en overtroeven.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Fase 3 — De hand afronden: aan het einde telt hoeveel slagen elk koppel heeft gewonnen, niet de kaartwaarde binnen een slag.',
        },
        {
          type: 'score',
          team: 1,
          points: 2,
          reason: 'Noord/Zuid winnen de meeste slagen in deze hand (een gewone winst) — 2 punten. Zie "Een hand winnen" voor kap, baunie en capituleren.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Delen & troef roepen, 13 slagen uitspelen, en de puntentelling — dat zijn de drie fases van elke hand Troefcall.',
        },
      ],
    },
    {
      id: 'game-overview-twist',
      level: 'twist',
      title: 'Wanneer een hand groter wordt dan een gewone winst',
      narration: 'Niet elke hand eindigt met een gewone winst — soms loopt fase 3 uit op een kap, een baunie, of een vroege capitulatie.',
      seats: plainSeats,
      steps: [
        {
          type: 'callout',
          tone: 'info',
          text: 'Meestal eindigt fase 3 met een gewone winst: het koppel met de meeste slagen krijgt 2 punten, zoals in het vorige voorbeeld.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Soms wint één koppel de eerste 7 slagen op rij terwijl de tegenpartij nog op 0 staat — een kap. Dan mag alleen de winnaar van die 7de slag kiezen: stoppen voor 5 punten, of doorduwen richting baunie.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Lukt het om ook de resterende 6 slagen te winnen, dan is dat een baunie: 15 punten in plaats van 5.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Een koppel mag zich ook overgeven (capituleren) — maar alleen zodra beide koppels al minstens 1 slag hebben. Te vroeg capituleren, terwijl een baunie nog mogelijk was, wordt afgerekend als een volledige baunie voor de tegenpartij.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Kap, baunie en capituleren komen in detail aan bod in "Een hand winnen", inclusief de precieze grenzen en puntentallen.',
        },
      ],
    },
    {
      id: 'game-overview-full',
      level: 'full',
      title: 'Van losse hand naar toernooistand',
      narration: 'Eén hand is maar het begin: de punten van elke hand stapelen op tot een setuitslag, en overtredingen onderweg hebben hun eigen regels.',
      seats: plainSeats,
      steps: [
        {
          type: 'callout',
          tone: 'info',
          text: 'Elke hand levert punten op voor één van beide koppels: 2 voor een gewone winst, 5 of 2 voor een kap, of 15 voor een baunie.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Op een clubavond worden 4 hands na elkaar gespeeld aan dezelfde tafel — dat is samen één set.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Wie de meeste hands in een set wint, wint de set. Setuitslagen worden omgezet in competitiepunten: 3 voor winst, 1 voor gelijkspel, 0 voor verlies.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Na elke set wisselen de lopende koppels van tafel, en na 8 sets is de match voorbij. De opgetelde competitiepunten bepalen de einduitslag — zie "Toernooistructuur & competitiepunten".',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Onderweg gelden ook eigen regels voor misplays: een kaart buiten de beurt of verboden kijken naar een afgesloten slag levert de tegenpartij strafpunten op, los van de gewone puntentelling.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Zo bouwt Troefcall op van één slag, naar één hand, naar één set, naar een volledige match — elke laag met zijn eigen hoofdstuk in dit regelboek.',
        },
      ],
    },
  ],
}
