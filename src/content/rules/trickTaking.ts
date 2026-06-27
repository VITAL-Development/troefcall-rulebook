import type { RuleTopic, Seat } from '@/content/types'

const seats: [Seat, Seat, Seat, Seat] = [
  { id: 'N', name: 'Noord', team: 1 },
  { id: 'E', name: 'Oost', team: 2 },
  { id: 'S', name: 'Zuid', team: 1 },
  { id: 'W', name: 'West', team: 2 },
]

export const trickTakingTopic: RuleTopic = {
  id: 'trick-taking',
  title: 'Een slag spelen',
  intro:
    'Zodra troef vastligt, draait elke slag om dezelfde drie vragen: moet je de gevraagde kleur volgen, mag je troeven, en wie heeft de hoogste kaart?',
  rules: [
    'Wie een slag leidt, bepaalt de gevraagde kleur. Spelers die deze kleur op de hand hebben, moeten bijspelen.',
    'Heb je de gevraagde kleur niet, dan mag je vrij spelen — ook troef (troeven/snijden).',
    'De hoogste kaart van de gevraagde kleur wint de slag, tenzij er getroefd is: dan wint de hoogste gespeelde troefkaart, ongeacht welke kleur er gevraagd was.',
    'De winnaar van een slag leidt automatisch de volgende slag.',
  ],
  examples: [
    {
      id: 'trick-taking-simple',
      level: 'simple',
      title: 'Iedereen volgt de kleur',
      narration: 'Niemand kan troeven, dus de hoogste kaart van de gevraagde kleur wint gewoon.',
      seats,
      steps: [
        {
          type: 'deal',
          hands: {
            N: [
              { rank: 'Q', suit: 'hearts' },
              { rank: '9', suit: 'spades' },
              { rank: '4', suit: 'clubs' },
            ],
            E: [
              { rank: '9', suit: 'hearts' },
              { rank: '7', suit: 'diamonds' },
              { rank: '2', suit: 'spades' },
            ],
            S: [
              { rank: 'A', suit: 'hearts' },
              { rank: '8', suit: 'clubs' },
              { rank: '5', suit: 'diamonds' },
            ],
            W: [
              { rank: '3', suit: 'hearts' },
              { rank: 'K', suit: 'diamonds' },
              { rank: '6', suit: 'spades' },
            ],
          },
          caption: 'Iedereen heeft Harten op de hand. Noord mag de slag leiden.',
        },
        { type: 'play', seat: 'N', card: { rank: 'Q', suit: 'hearts' }, caption: 'Noord leidt met Vrouw Harten.' },
        { type: 'play', seat: 'E', card: { rank: '9', suit: 'hearts' }, caption: 'Oost heeft Harten en moet bijspelen.' },
        { type: 'play', seat: 'S', card: { rank: 'A', suit: 'hearts' }, caption: 'Zuid speelt de Aas Harten — tot nu toe de hoogste.' },
        { type: 'play', seat: 'W', card: { rank: '3', suit: 'hearts' }, caption: 'West heeft ook Harten en speelt bij.' },
        {
          type: 'resolveTrick',
          winningSeat: 'S',
          caption: 'Zuid had de hoogste Harten-kaart en wint de slag.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Niemand kon hier troeven, want iedereen had Harten — de hoogste kaart van de gevraagde kleur beslist dan gewoon.',
        },
      ],
    },
    {
      id: 'trick-taking-twist',
      level: 'twist',
      title: 'Geen kleur? Dan mag je troeven',
      narration: 'Wie de gevraagde kleur niet heeft, mag vrij spelen — inclusief troef. Maar wie de kleur wél heeft, moet volgen, ook als de slag al getroefd is.',
      seats,
      trumpSuit: 'spades',
      steps: [
        {
          type: 'deal',
          hands: {
            N: [
              { rank: '7', suit: 'diamonds' },
              { rank: '9', suit: 'clubs' },
              { rank: '2', suit: 'hearts' },
            ],
            E: [
              { rank: 'K', suit: 'spades' },
              { rank: '5', suit: 'clubs' },
              { rank: '8', suit: 'hearts' },
            ],
            S: [
              { rank: '6', suit: 'spades' },
              { rank: '3', suit: 'hearts' },
              { rank: '2', suit: 'clubs' },
            ],
            W: [
              { rank: 'Q', suit: 'diamonds' },
              { rank: '5', suit: 'spades' },
              { rank: '4', suit: 'hearts' },
            ],
          },
          caption: 'Troef is Schoppen. Noord leidt met Ruiten.',
        },
        { type: 'play', seat: 'N', card: { rank: '7', suit: 'diamonds' }, caption: 'Noord leidt met 7 Ruiten.' },
        {
          type: 'play',
          seat: 'E',
          card: { rank: 'K', suit: 'spades' },
          caption: 'Oost heeft geen Ruiten en mag vrij spelen — Oost troeft met de Koning Schoppen.',
        },
        {
          type: 'play',
          seat: 'S',
          card: { rank: '6', suit: 'spades' },
          caption: 'Zuid heeft ook geen Ruiten en troeft mee, maar met een lagere troefkaart.',
        },
        {
          type: 'play',
          seat: 'W',
          card: { rank: 'Q', suit: 'diamonds' },
          caption: 'West heeft wél Ruiten en moet de kleur volgen — ook al is de slag al getroefd.',
        },
        {
          type: 'resolveTrick',
          winningSeat: 'E',
          caption: 'Er is getroefd, dus niet de hoogste Ruiten maar de hoogste troefkaart wint: de Koning Schoppen van Oost.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Zodra een slag getroefd is, telt de gevraagde kleur niet meer mee — alleen de hoogste troefkaart in die slag beslist.',
        },
      ],
    },
    {
      id: 'trick-taking-full',
      level: 'full',
      title: 'Overtroeven, en de winnaar leidt de volgende slag',
      narration: 'Een hogere troef wint ook als hij later gespeeld wordt, en de winnaar van slag één leidt meteen slag twee.',
      seats,
      trumpSuit: 'hearts',
      steps: [
        {
          type: 'deal',
          hands: {
            N: [
              { rank: '9', suit: 'clubs' },
              { rank: 'A', suit: 'diamonds' },
              { rank: '5', suit: 'spades' },
            ],
            E: [
              { rank: '8', suit: 'hearts' },
              { rank: '4', suit: 'diamonds' },
              { rank: '2', suit: 'clubs' },
            ],
            S: [
              { rank: 'Q', suit: 'hearts' },
              { rank: '9', suit: 'diamonds' },
              { rank: '3', suit: 'spades' },
            ],
            W: [
              { rank: 'K', suit: 'clubs' },
              { rank: '7', suit: 'diamonds' },
              { rank: '6', suit: 'hearts' },
            ],
          },
          caption: 'Troef is Harten. Noord leidt de eerste slag.',
        },
        { type: 'play', seat: 'N', card: { rank: '9', suit: 'clubs' }, caption: 'Noord leidt met 9 Klaveren.' },
        {
          type: 'play',
          seat: 'E',
          card: { rank: '8', suit: 'hearts' },
          caption: 'Oost heeft geen Klaveren en troeft met 8 Harten.',
        },
        {
          type: 'play',
          seat: 'S',
          card: { rank: 'Q', suit: 'hearts' },
          caption: "Zuid heeft ook geen Klaveren en overtroeft met de Vrouw Harten — hoger dan Oost' troef.",
        },
        {
          type: 'play',
          seat: 'W',
          card: { rank: 'K', suit: 'clubs' },
          caption: 'West heeft wél Klaveren en moet de kleur volgen, ook al is er al getroefd.',
        },
        {
          type: 'resolveTrick',
          winningSeat: 'S',
          caption: 'De hoogste troefkaart beslist: de Vrouw Harten van Zuid wint, ook al kwam die kaart niet als eerste.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'De winnaar van een slag leidt de volgende slag — dat is nu Zuid.',
        },
        { type: 'play', seat: 'S', card: { rank: '9', suit: 'diamonds' }, caption: 'Zuid leidt de tweede slag met 9 Ruiten.' },
        { type: 'play', seat: 'W', card: { rank: '7', suit: 'diamonds' }, caption: 'West heeft Ruiten en volgt de kleur.' },
        {
          type: 'play',
          seat: 'N',
          card: { rank: 'A', suit: 'diamonds' },
          caption: 'Noord heeft ook Ruiten en speelt de Aas — tot nu toe de hoogste.',
        },
        { type: 'play', seat: 'E', card: { rank: '4', suit: 'diamonds' }, caption: 'Oost heeft eveneens Ruiten en moet bijspelen.' },
        {
          type: 'resolveTrick',
          winningSeat: 'N',
          caption: 'Niemand troefde deze keer: de hoogste Ruiten-kaart, de Aas van Noord, wint de slag.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Zo blijft de slagwinnaar steeds de nieuwe leider, totdat de hand is afgelopen.',
        },
      ],
    },
  ],
}
