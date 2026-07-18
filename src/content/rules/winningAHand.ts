import type { RuleTopic, Seat } from '@/content/types'

const seats: [Seat, Seat, Seat, Seat] = [
  { id: 'N', name: 'Noord', team: 1 },
  { id: 'E', name: 'Oost', team: 2 },
  { id: 'S', name: 'Zuid', team: 1 },
  { id: 'W', name: 'West', team: 2 },
]

export const winningAHandTopic: RuleTopic = {
  id: 'hand-winnen',
  title: 'Een hand winnen',
  intro:
    'Een hand is één ronde van het spel, van het delen van de kaarten tot alle 13 slagen. Aan het einde van een hand tel je niet punten per kaart. Je telt hoeveel slagen jouw koppel wint. Er zijn drie mogelijke uitkomsten: een normale winst, kap, of baunie. Elke uitkomst geeft andere punten en heeft eigen regels.',
  rules: [
    'Normale winst: jouw koppel wint 7 of meer slagen, en de tegenpartij wint minstens 1 slag. Dit geeft 2 punten.',
    "Kap: jouw koppel wint de eerste 7 slagen op rij, en de tegenpartij heeft nog 0 slagen. Alleen de speler die de 7de slag wint, mag kiezen: de hand hier stoppen (de resterende slagen niet meer uitspelen) voor 5 punten, of doorspelen voor een baunie (proberen ook alle andere slagen te winnen). Stopt de partner de hand, in plaats van de speler die de 7de slag won? Dan geeft dit maar 2 punten in plaats van 5.",
    'Speelt het koppel door na een kap, maar wint de tegenpartij toch nog een slag vóór slag 13? Dan krijgt de tegenpartij 2 punten.',
    'Baunie: jouw koppel wint alle 13 slagen, en de tegenpartij wint geen enkele slag. Dit geeft 15 punten.',
    'Capituleren betekent dat een koppel de hand stopt vóórdat alle 13 slagen gespeeld zijn, omdat dat koppel toch gaat verliezen. Dit mag pas als beide koppels minstens 1 slag hebben gewonnen. Capituleer je te vroeg, terwijl een baunie voor de tegenpartij nog mogelijk was? Dan telt dit als een volledige baunie: de tegenpartij krijgt 15 punten.',
  ],
  examples: [
    {
      id: 'winning-a-hand-simple',
      level: 'simple',
      title: 'Een gewone winst',
      narration: 'Geen kap en geen baunie. De meeste slagen winnen is al genoeg voor 2 punten.',
      seats,
      steps: [
        {
          type: 'declareTrump',
          seat: 'N',
          suit: 'hearts',
          caption: 'Troef is Harten. De hand wordt uitgespeeld over 13 slagen.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Noord/Zuid winnen de eerste 4 slagen, Oost/West winnen daarna 3 slagen op rij.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Beide koppels hebben nu minstens 1 slag. Daarom zijn kap en baunie voor deze hand niet meer mogelijk.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'De laatste 6 slagen worden verdeeld: Noord/Zuid winnen er nog 4, Oost/West nog 2.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Eindstand: Noord/Zuid winnen 8 van de 13 slagen, Oost/West winnen 5. Beide koppels wonnen minstens 1 slag. Dit is een gewone winst.',
        },
        {
          type: 'score',
          team: 1,
          points: 2,
          reason: 'Normale winst voor Noord/Zuid (8 tegen 5 slagen) — 2 punten.',
        },
      ],
    },
    {
      id: 'winning-a-hand-twist',
      level: 'twist',
      title: 'Kap: stoppen of doorspelen?',
      narration:
        'Noord/Zuid winnen de eerste 7 slagen op rij. Oost/West staan nog op 0 slagen — dit is een kap. Wie mag beslissen? En wat gebeurt er in twee verschillende situaties?',
      seats,
      steps: [
        {
          type: 'declareTrump',
          seat: 'S',
          suit: 'clubs',
          caption: 'Troef is Klaveren.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Noord/Zuid winnen de eerste 6 slagen. Oost/West hebben nog geen enkele slag gewonnen.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Zuid wint ook de 7de slag op rij. Dit is een kap: Oost/West staan na 7 slagen nog steeds op 0.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Alleen Zuid, de winnaar van de 7de slag, mag nu kiezen: stoppen voor 5 punten, of doorspelen naar een baunie. Partner Noord mag deze keuze niet maken voor Zuid.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Situatie A: in plaats van Zuid zelf, stopt partner Noord de hand.',
        },
        {
          type: 'score',
          team: 1,
          points: 2,
          reason: 'Situatie A: de partner stopt de hand, niet de speler die de slag won. Daarom geeft de kap nu 2 punten in plaats van 5.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Situatie B (in plaats van A): Zuid kiest zelf om door te spelen naar een baunie, in plaats van te stoppen.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Bij slag 11 heeft Oost een kleur die niemand van Noord/Zuid kan volgen of overtroeven. Oost wint deze slag. De baunie lukt nu niet meer.',
        },
        {
          type: 'score',
          team: 2,
          points: 2,
          reason: 'Situatie B: doorspelen naar de baunie lukt niet. Daarom krijgen Oost/West 2 punten, niet Noord/Zuid.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Dezelfde start van 7-0, maar drie verschillende uitkomsten: 5 punten als de slagwinnaar zelf stopt, 2 punten als de partner stopt, of 2 punten voor de tegenpartij als doorspelen naar de baunie niet lukt.',
        },
      ],
    },
    {
      id: 'winning-a-hand-full',
      level: 'full',
      title: 'Te vroeg capituleren kost de baunie-prijs',
      narration:
        'Oost/West staan nog op 0 slagen en willen nu al stoppen. Maar capituleren mag pas als beide koppels minstens 1 slag hebben. Wat gebeurt er als ze het toch proberen?',
      seats,
      steps: [
        {
          type: 'declareTrump',
          seat: 'W',
          suit: 'diamonds',
          caption: 'Troef is Ruiten.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Noord/Zuid winnen de eerste 5 slagen op rij. Oost/West staan nog op 0 slagen. Een baunie voor Noord/Zuid is nu nog mogelijk.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Oost wil capituleren om niet meer punten te verliezen. Maar dat mag niet: capituleren mag pas als beide koppels minstens 1 slag hebben gewonnen. Oost/West staan nog op 0.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Oost capituleert toch. Een kap was nog niet eens zeker, en een baunie was nog mogelijk. Daarom telt dit als een volledige baunie.',
        },
        {
          type: 'score',
          team: 1,
          points: 15,
          reason: 'Oost/West capituleren te vroeg, terwijl een baunie nog mogelijk was. Noord/Zuid krijgen daarom de volle 15 baunie-punten.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Was dit niet gebeurd? Dan was de hand normaal verder gespeeld. Stel dat Oost/West niet hadden gecapituleerd, en gewoon waren doorgegaan.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Bij slag 6 wint West eindelijk een slag. Nu hebben beide koppels minstens 1 slag. Kap en baunie zijn voor de rest van deze hand niet meer mogelijk. Vanaf nu mag je wél capituleren.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'De laatste slagen worden verdeeld: Noord/Zuid winnen er nog 5, Oost/West nog 2. Eindstand: 10 tegen 3 slagen.',
        },
        {
          type: 'score',
          team: 1,
          points: 2,
          reason: 'Zonder de te vroege capitulatie was dit een gewone winst geweest voor Noord/Zuid (10 tegen 3 slagen): 2 punten in plaats van 15.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Het verschil is groot. Gewoon doorspelen had Noord/Zuid hier maar 2 punten gegeven. Maar te vroeg capituleren, terwijl een baunie nog mogelijk was, kostte Oost/West de volle 15 punten.',
        },
      ],
    },
  ],
}
