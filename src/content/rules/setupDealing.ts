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
  id: 'setup-dealing',
  title: 'Schudden, delen & troef roepen',
  intro:
    'Voor er één kaart wordt gespeeld, moet de tafel eerst weten wie deelt, wie roept en welke kleur troef is. Deze stappen bepalen de rest van de hand.',
  rules: [
    'Er wordt om de hoogste kaart geloot: wie de hoogste kaart trekt, is dealer. De speler links van de dealer is de caller.',
    'De caller krijgt als enige eerst 5 kaarten en moet daaruit troef roepen vóórdat er verder gedeeld wordt. Eenmaal de tweede kaartenronde is gegeven, kan troef niet meer gewijzigd worden.',
    'Na de troefclaim deelt de dealer verder: 5 kaarten aan de overige drie spelers, daarna twee keer 4 kaarten rond — ook aan de caller — tot iedereen 13 kaarten heeft.',
    '"No picture no game": heeft de caller in alle 13 kaarten geen koning, vrouw of boer (een aas telt niet als plaatje), dan mag de caller eigenhandig een nieuwe deling eisen. Een onterechte claim levert de tegenpartij 5 punten op.',
    'Bij een misdeling (bijvoorbeeld een verkeerd geschud of gedeeld spel) krijgt de tegenpartij van de dealer 2 strafpunten, gemaximeerd op 2 misdelingen per ronde.',
  ],
  examples: [
    {
      id: 'setup-dealing-simple',
      level: 'simple',
      title: 'Een vlotte deling',
      narration: 'Een gewone deling zonder verrassingen: de caller ziet meteen een plaatje en roept troef.',
      seats: seatsEx1,
      steps: [
        {
          type: 'callout',
          tone: 'info',
          text: 'Noord/Zuid spelen als koppel tegen Oost/West. Wie de hoogste kaart trekt, is dealer; de speler links van de dealer is de caller.',
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
          caption: 'West is dealer. Noord, links van West, is de caller en krijgt als enige eerst 5 kaarten.',
        },
        {
          type: 'declareTrump',
          seat: 'N',
          suit: 'hearts',
          caption:
            'Noord ziet een koning bij die eerste 5 kaarten — genoeg voor een geldige troefclaim — en roept Harten.',
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
            'Pas nu troef vastligt, deelt West de rest uit: 5 kaarten aan Oost, Zuid en West, en daarna twee keer 4 kaarten rond — ook aan Noord. Iedereen heeft nu 13 kaarten.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'De deling is voltooid en troef ligt vast op Harten. Het spel kan beginnen.',
        },
      ],
    },
    {
      id: 'setup-dealing-twist',
      level: 'twist',
      title: 'Geen plaatje, geen spel',
      narration:
        'De caller krijgt een hand zonder enig plaatje en eist — terecht — een nieuwe deling.',
      seats: seatsEx2,
      steps: [
        {
          type: 'deal',
          hands: {
            W: [
              { rank: 'A', suit: 'clubs' },
              { rank: '9', suit: 'spades' },
              { rank: '7', suit: 'diamonds' },
              { rank: '5', suit: 'hearts' },
              { rank: '2', suit: 'clubs' },
            ],
          },
          caption: 'Zuid is dealer. West, links van Zuid, is de caller en krijgt de eerste 5 kaarten.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'West bekijkt de 5 kaarten: geen koning, vrouw of boer te zien. Een aas telt hier niet als plaatje.',
        },
        {
          type: 'deal',
          hands: {
            W: [
              { rank: 'A', suit: 'clubs' },
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
            'Voordat West iets zegt, wordt er gewoon verder gedeeld zoals gebruikelijk: West krijgt zijn volledige 13 kaarten, nog steeds zonder plaatje.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: '"No picture no game": heeft de caller in alle 13 kaarten geen koning, vrouw of boer, dan mag West eigenhandig een nieuwe deling eisen, zonder de andere spelers te raadplegen.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'West claimt terecht: nieuwe deling! Was de claim onterecht geweest, dan had de tegenpartij (Noord/Zuid) 5 punten gekregen.',
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
          caption: 'Er wordt opnieuw geschud en gedeeld. West krijgt een nieuwe eerste 5 kaarten — nu wél met een plaatje.',
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
          caption: 'De deling wordt afgemaakt: iedereen heeft weer 13 kaarten.',
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
        'Een geldige troefclaim wordt overschaduwd door een misdeling — en de regels voor strafpunten en de cap op herhaalde misdelingen komen allebei in beeld.',
      seats: seatsEx3,
      steps: [
        {
          type: 'callout',
          tone: 'info',
          text: 'Noord is dealer. Oost, links van Noord, is de caller.',
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
          caption: 'Oost krijgt de eerste 5 kaarten en ziet een boer — genoeg voor een geldige troefclaim.',
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
          text: 'Tijdens het verder delen valt op dat de kaarten niet goed geschud waren: een misdeling. Dit is een fout van de dealer (Noord), niet van Oost.',
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
          text: 'Er wordt opnieuw geschud en gedeeld. De eerdere troefclaim van Oost vervalt — de hele deling wordt herhaald.',
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
          text: 'Let op: misdelingen worden gemaximeerd op 2 per ronde. Een derde misdeling in dezelfde ronde levert geen extra strafpunten meer op.',
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
          caption: 'De deling wordt afgerond: iedereen heeft weer 13 kaarten.',
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
