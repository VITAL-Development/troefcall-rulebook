import type { RuleTopic, Seat } from '@/content/types'

const seats: [Seat, Seat, Seat, Seat] = [
  { id: 'N', name: 'Noord', team: 1 },
  { id: 'E', name: 'Oost', team: 2 },
  { id: 'S', name: 'Zuid', team: 1 },
  { id: 'W', name: 'West', team: 2 },
]

export const trickTakingTopic: RuleTopic = {
  id: 'slag-spelen',
  title: 'Een slag spelen',
  intro:
    'Troef is de kleur die extra sterk is in deze hand. Een slag is één ronde waarin elke speler één kaart speelt. Bij elke slag zijn er drie vragen: moet je de gevraagde kleur spelen, moet je troeven, en wie heeft de hoogste kaart?',
  rules: [
    "Wie de slag begint, kiest de kleur. We noemen dit de gevraagde kleur. Heb je deze kleur op de hand? Dan moet je deze kleur spelen. Dit heet 'bijspelen'.",
    "Heb je de gevraagde kleur niet? Dan moet je troef spelen, als je troef hebt. Dit heet 'troeven'. Is er al getroefd, en heb je een hogere troef? Dan moet je die hogere troef spelen. Dit heet 'overtroeven'. Heb je geen troef? Dan mag je een andere kaart spelen.",
    'Speelt niemand troef? Dan wint de hoogste kaart van de gevraagde kleur. Speelt iemand troef? Dan wint de hoogste troefkaart altijd, ook al was dat niet de gevraagde kleur.',
    'Wie de slag wint, begint de volgende slag.',
  ],
  examples: [
    {
      id: 'trick-taking-simple',
      level: 'simple',
      title: 'Iedereen volgt de kleur',
      narration: 'Niemand speelt troef. Daarom wint de hoogste kaart van de gevraagde kleur.',
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
        { type: 'play', seat: 'E', card: { rank: '9', suit: 'hearts' }, caption: 'Oost heeft Harten en moet bijspelen (deze kleur spelen).' },
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
          text: 'Niemand kon hier troeven, want iedereen had Harten. Daarom wint gewoon de hoogste kaart van de gevraagde kleur.',
        },
      ],
    },
    {
      id: 'trick-taking-twist',
      level: 'twist',
      title: 'Geen kleur? Dan moet je troeven',
      narration: 'Heb je de gevraagde kleur niet? Dan moet je troef spelen, als je troef hebt. Heb je de kleur wél? Dan moet je altijd die kleur spelen, ook als de slag al getroefd is.',
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
          caption: 'Oost heeft geen Ruiten en moet troeven. Oost troeft met de Koning Schoppen.',
        },
        {
          type: 'play',
          seat: 'S',
          card: { rank: '6', suit: 'spades' },
          caption: 'Zuid heeft ook geen Ruiten en troeft ook, maar met een lagere troefkaart.',
        },
        {
          type: 'play',
          seat: 'W',
          card: { rank: 'Q', suit: 'diamonds' },
          caption: 'West heeft wél Ruiten. West moet deze kleur spelen, ook al is er al getroefd.',
        },
        {
          type: 'resolveTrick',
          winningSeat: 'E',
          caption: 'Er is getroefd. Daarom wint niet de hoogste Ruiten, maar de hoogste troefkaart: de Koning Schoppen van Oost.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Is er getroefd in een slag? Dan telt de gevraagde kleur niet meer. Alleen de hoogste troefkaart wint.',
        },
      ],
    },
    {
      id: 'trick-taking-full',
      level: 'full',
      title: 'Hoger troeven, en de winnaar begint de volgende slag',
      narration: 'Een hogere troef wint, ook als die kaart later gespeeld wordt. De winnaar van slag 1 begint meteen slag 2.',
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
          caption: 'Zuid heeft ook geen Klaveren. Zuid speelt een hogere troef dan Oost — dit heet overtroeven.',
        },
        {
          type: 'play',
          seat: 'W',
          card: { rank: 'K', suit: 'clubs' },
          caption: 'West heeft wél Klaveren. West moet deze kleur spelen, ook al is er al getroefd.',
        },
        {
          type: 'resolveTrick',
          winningSeat: 'S',
          caption: 'De hoogste troefkaart wint: de Vrouw Harten van Zuid wint deze slag, ook al speelde Zuid niet als eerste.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'De winnaar van een slag begint de volgende slag. Dat is nu Zuid.',
        },
        { type: 'play', seat: 'S', card: { rank: '9', suit: 'diamonds' }, caption: 'Zuid leidt de tweede slag met 9 Ruiten.' },
        { type: 'play', seat: 'W', card: { rank: '7', suit: 'diamonds' }, caption: 'West heeft Ruiten en volgt de kleur.' },
        {
          type: 'play',
          seat: 'N',
          card: { rank: 'A', suit: 'diamonds' },
          caption: 'Noord heeft ook Ruiten en speelt de Aas — tot nu toe de hoogste.',
        },
        { type: 'play', seat: 'E', card: { rank: '4', suit: 'diamonds' }, caption: 'Oost heeft ook Ruiten en moet bijspelen.' },
        {
          type: 'resolveTrick',
          winningSeat: 'N',
          caption: 'Niemand troeft deze keer. De hoogste Ruiten-kaart wint: de Aas van Noord.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Zo begint de winnaar van elke slag steeds de volgende slag, tot de hand klaar is.',
        },
      ],
    },
  ],
}
