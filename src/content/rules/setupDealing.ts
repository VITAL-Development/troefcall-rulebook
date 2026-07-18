import type { RuleTopic, Seat } from '@/content/types'

const seatsEx1: [Seat, Seat, Seat, Seat] = [
  { id: 'N', name: 'Noord', team: 1, isCaller: true },
  { id: 'E', name: 'Oost', team: 2 },
  { id: 'S', name: 'Zuid', team: 1 },
  { id: 'W', name: 'West', team: 2, isDealer: true },
]

const seatsEx2: [Seat, Seat, Seat, Seat] = [
  { id: 'N', name: 'Noord', team: 1 },
  { id: 'E', name: 'Oost', team: 2 },
  { id: 'S', name: 'Zuid', team: 1, isDealer: true },
  { id: 'W', name: 'West', team: 2, isCaller: true },
]

const seatsEx3: [Seat, Seat, Seat, Seat] = [
  { id: 'N', name: 'Noord', team: 1, isDealer: true },
  { id: 'E', name: 'Oost', team: 2, isCaller: true },
  { id: 'S', name: 'Zuid', team: 1 },
  { id: 'W', name: 'West', team: 2 },
]

export const setupDealingTopic: RuleTopic = {
  id: 'schudden-en-delen',
  title: 'Schudden, delen & troef roepen',
  intro:
    'Een hand is één ronde van het spel: van het delen van de kaarten tot de puntentelling aan het einde. Voordat een hand begint, moet de tafel drie dingen weten: wie deelt de kaarten, wie roept troef, en welke kleur troef is. Dit bepaalt de rest van de hand.',
  rules: [
    "Elke speler trekt een kaart. Wie de hoogste kaart trekt, is de dealer (de speler die deelt). De speler links van de dealer is de caller (de speler die troef roept).",
    'Alleen de caller krijgt eerst 5 kaarten. De caller moet met deze 5 kaarten troef roepen, vóórdat er verder gedeeld wordt. De caller mag zelf kiezen welke kleur troef wordt, bijvoorbeeld de kleur met de hoogste kaart, of de kleur waar de caller de meeste kaarten van heeft. Er is geen vaste manier om dit te kiezen. Is de tweede ronde kaarten al gedeeld? Dan kan troef niet meer veranderen.',
    'Na de troefclaim (het roepen van troef) deelt de dealer de rest van de kaarten. Eerst krijgen de andere drie spelers 5 kaarten. Daarna krijgt iedereen, ook de caller, nog twee keer 4 kaarten. Aan het einde heeft iedereen 13 kaarten.',
    '"No picture no game" (geen plaatje, geen spel): een plaatje is een aas, koning, vrouw of boer. Heeft de caller in alle 13 kaarten geen enkel plaatje? Dan mag de caller zelf een nieuwe deling vragen. Klopt deze claim niet? Dan krijgt de tegenpartij 5 punten.',
    'Een misdeling is een fout bij het schudden of delen van de kaarten. Bij een misdeling krijgt de tegenpartij van de dealer 2 strafpunten. Er tellen maximaal 2 misdelingen per ronde mee voor punten.',
  ],
  examples: [
    {
      id: 'setup-dealing-simple',
      level: 'simple',
      title: 'Een deling zonder problemen',
      narration: 'Een gewone deling zonder verrassingen. De caller ziet meteen een plaatje en roept troef.',
      seats: seatsEx1,
      steps: [
        {
          type: 'callout',
          tone: 'info',
          text: 'Noord/Zuid spelen als koppel tegen Oost/West. Wie de hoogste kaart trekt, is de dealer. De speler links van de dealer is de caller.',
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
          caption: 'West is de dealer. Noord zit links van West en is de caller. Alleen Noord krijgt eerst 5 kaarten.',
        },
        {
          type: 'declareTrump',
          seat: 'N',
          suit: 'hearts',
          caption:
            'Noord ziet een koning bij de eerste 5 kaarten. Dat is genoeg voor een geldige troefclaim. Noord roept Harten.',
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
              { rank: 'Q', suit: 'diamonds' },
              { rank: '10', suit: 'clubs' },
              { rank: '8', suit: 'hearts' },
              { rank: '7', suit: 'spades' },
              { rank: '5', suit: 'diamonds' },
              { rank: '4', suit: 'clubs' },
              { rank: 'J', suit: 'spades' },
              { rank: '2', suit: 'hearts' },
            ],
          },
          handCounts: { E: 13, S: 13, W: 13 },
          caption:
            'Nu troef vastligt, deelt West de rest van de kaarten uit. Oost, Zuid en West krijgen 5 kaarten. Daarna krijgt iedereen, ook Noord, nog twee keer 4 kaarten. Iedereen heeft nu 13 kaarten.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'De deling is klaar en troef ligt vast op Harten. Het spel kan beginnen.',
        },
      ],
    },
    {
      id: 'setup-dealing-twist',
      level: 'twist',
      title: 'Geen plaatje, geen spel',
      narration:
        'De caller krijgt een hand zonder plaatje. De caller vraagt een nieuwe deling — dat mag.',
      seats: seatsEx2,
      steps: [
        {
          type: 'deal',
          hands: {
            W: [
              { rank: '6', suit: 'clubs' },
              { rank: '9', suit: 'spades' },
              { rank: '7', suit: 'diamonds' },
              { rank: '5', suit: 'hearts' },
              { rank: '2', suit: 'clubs' },
            ],
          },
          caption: 'Zuid is de dealer. West zit links van Zuid en is de caller. West krijgt de eerste 5 kaarten.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'West bekijkt de 5 kaarten. Er is geen aas, koning, vrouw of boer bij.',
        },
        {
          type: 'deal',
          hands: {
            W: [
              { rank: '6', suit: 'clubs' },
              { rank: '9', suit: 'spades' },
              { rank: '7', suit: 'diamonds' },
              { rank: '5', suit: 'hearts' },
              { rank: '2', suit: 'clubs' },
              { rank: '10', suit: 'spades' },
              { rank: '8', suit: 'hearts' },
              { rank: '6', suit: 'diamonds' },
              { rank: '4', suit: 'clubs' },
              { rank: '3', suit: 'spades' },
              { rank: '2', suit: 'hearts' },
              { rank: '9', suit: 'diamonds' },
              { rank: '7', suit: 'clubs' },
            ],
          },
          handCounts: { N: 13, S: 13, E: 13 },
          caption:
            'Voordat West iets zegt, gaat het delen gewoon verder. West krijgt alle 13 kaarten, nog steeds zonder plaatje.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: '"No picture no game": heeft de caller in alle 13 kaarten geen aas, koning, vrouw of boer? Dan mag West zelf een nieuwe deling vragen. West hoeft de andere spelers niet te vragen.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'West claimt dit terecht: nieuwe deling! Klopte deze claim niet? Dan had de tegenpartij (Noord/Zuid) 5 punten gekregen.',
        },
        {
          type: 'deal',
          hands: {
            W: [
              { rank: 'K', suit: 'spades' },
              { rank: '10', suit: 'hearts' },
              { rank: '8', suit: 'diamonds' },
              { rank: '4', suit: 'clubs' },
              { rank: '2', suit: 'spades' },
            ],
          },
          handCounts: { N: 0, S: 0, E: 0 },
          caption: 'Er wordt opnieuw geschud en gedeeld. West krijgt nieuwe eerste 5 kaarten, nu wél met een plaatje.',
        },
        {
          type: 'declareTrump',
          seat: 'W',
          suit: 'spades',
          caption: 'West roept dit keer Schoppen als troef.',
        },
        {
          type: 'deal',
          hands: {
            W: [
              { rank: 'K', suit: 'spades' },
              { rank: '10', suit: 'hearts' },
              { rank: '8', suit: 'diamonds' },
              { rank: '4', suit: 'clubs' },
              { rank: '2', suit: 'spades' },
              { rank: 'Q', suit: 'clubs' },
              { rank: '9', suit: 'diamonds' },
              { rank: '7', suit: 'hearts' },
              { rank: '5', suit: 'spades' },
              { rank: '3', suit: 'diamonds' },
              { rank: 'J', suit: 'hearts' },
              { rank: '6', suit: 'spades' },
              { rank: '8', suit: 'clubs' },
            ],
          },
          handCounts: { N: 13, S: 13, E: 13 },
          caption: 'De deling gaat verder: iedereen heeft weer 13 kaarten.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Troef ligt vast op Schoppen en de deling is geldig. Het spel kan beginnen.',
        },
      ],
    },
    {
      id: 'setup-dealing-full',
      level: 'full',
      title: 'Een misdeling tijdens het roepen',
      narration:
        'Oost roept troef op de juiste manier, maar er is ook een misdeling. Dit voorbeeld laat de regels voor strafpunten zien, en het maximum aantal misdelingen per ronde.',
      seats: seatsEx3,
      steps: [
        {
          type: 'callout',
          tone: 'info',
          text: 'Noord is de dealer. Oost zit links van Noord en is de caller.',
        },
        {
          type: 'deal',
          hands: {
            E: [
              { rank: 'J', suit: 'diamonds' },
              { rank: '9', suit: 'clubs' },
              { rank: '7', suit: 'spades' },
              { rank: '5', suit: 'hearts' },
              { rank: '2', suit: 'diamonds' },
            ],
          },
          caption: 'Oost krijgt de eerste 5 kaarten en ziet een boer. Dat is genoeg voor een geldige troefclaim.',
        },
        {
          type: 'declareTrump',
          seat: 'E',
          suit: 'diamonds',
          caption: 'Oost roept Ruiten als troef.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Tijdens het delen blijkt dat de kaarten niet goed geschud zijn. Dit is een misdeling. Het is een fout van de dealer (Noord), niet van Oost.',
        },
        {
          type: 'score',
          team: 2,
          points: 2,
          reason: 'Misdeling door de dealer (Noord) — de tegenpartij (Oost/West) krijgt 2 strafpunten.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Er wordt opnieuw geschud en gedeeld. De vorige troefclaim van Oost telt niet meer. De hele deling begint opnieuw.',
        },
        {
          type: 'deal',
          hands: {
            E: [
              { rank: 'Q', suit: 'clubs' },
              { rank: '9', suit: 'hearts' },
              { rank: '6', suit: 'diamonds' },
              { rank: '4', suit: 'spades' },
              { rank: '2', suit: 'clubs' },
            ],
          },
          handCounts: { N: 0, S: 0, W: 0 },
          caption: 'Oost krijgt een nieuwe eerste 5 kaarten.',
        },
        {
          type: 'declareTrump',
          seat: 'E',
          suit: 'clubs',
          caption: 'Oost roept dit keer Klaveren als troef.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Let op: er tellen maximaal 2 misdelingen per ronde mee voor punten. Een derde misdeling in dezelfde ronde geeft geen extra strafpunten.',
        },
        {
          type: 'deal',
          hands: {
            E: [
              { rank: 'Q', suit: 'clubs' },
              { rank: '9', suit: 'hearts' },
              { rank: '6', suit: 'diamonds' },
              { rank: '4', suit: 'spades' },
              { rank: '2', suit: 'clubs' },
              { rank: 'K', suit: 'hearts' },
              { rank: '10', suit: 'diamonds' },
              { rank: '8', suit: 'spades' },
              { rank: '7', suit: 'clubs' },
              { rank: '5', suit: 'diamonds' },
              { rank: 'J', suit: 'spades' },
              { rank: '3', suit: 'hearts' },
              { rank: 'A', suit: 'diamonds' },
            ],
          },
          handCounts: { N: 13, S: 13, W: 13 },
          caption: 'De deling is klaar: iedereen heeft weer 13 kaarten.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Troef ligt vast op Klaveren. Het spel kan nu echt beginnen.',
        },
      ],
    },
  ],
}
