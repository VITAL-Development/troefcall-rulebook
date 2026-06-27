import type { RuleTopic, Seat } from '@/content/types'

const seats: [Seat, Seat, Seat, Seat] = [
  { id: 'N', name: 'Noord', team: 1 },
  { id: 'E', name: 'Oost', team: 2 },
  { id: 'S', name: 'Zuid', team: 1 },
  { id: 'W', name: 'West', team: 2 },
]

export const winningAHandTopic: RuleTopic = {
  id: 'winning-a-hand',
  title: 'Een hand winnen',
  intro:
    'Aan het einde van een hand telt niet hoeveel punten je haalt binnen de slag, maar hoeveel slagen je koppel wint. Drie uitkomsten zijn mogelijk: een normale winst, kap, of baunie — elk met eigen punten en eigen regels.',
  rules: [
    'Normale winst: een koppel wint 7 of meer slagen terwijl de tegenpartij minstens 1 slag heeft — dat levert 2 punten op.',
    'Kap: een koppel wint de eerste 7 slagen terwijl de tegenpartij nog op 0 slagen staat. Alleen de speler die de 7de slag wint, mag beslissen: stoppen voor 5 punten, of doorspelen richting baunie. Tapt de partner in plaats van de slagwinnaar zelf de hand af, dan daalt de waarde naar 2 punten.',
    'Lukt een doorgezette kap-poging niet (de tegenpartij wint alsnog een slag voor slag 13), dan krijgt de tegenpartij 2 punten.',
    'Baunie: een koppel wint alle 13 slagen terwijl de tegenpartij op 0 blijft staan — dat levert 15 punten op.',
    'Capituleren mag alleen zodra beide koppels minstens 1 slag hebben gewonnen. Capituleren vóór die grens, terwijl baunie nog mogelijk was, wordt afgerekend als een volledige baunie: 15 punten voor de tegenpartij.',
  ],
  examples: [
    {
      id: 'winning-a-hand-simple',
      level: 'simple',
      title: 'Een gewone winst',
      narration: 'Geen kap, geen baunie — gewoon de meeste slagen winnen is al genoeg voor 2 punten.',
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
          text: 'Beide koppels hebben nu minstens 1 slag — kap en baunie zijn voor deze hand niet meer mogelijk, voor geen van beide koppels.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'De resterende 6 slagen worden verdeeld: Noord/Zuid winnen er nog 4, Oost/West nog 2.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Eindstand: Noord/Zuid winnen 8 van de 13 slagen, Oost/West winnen 5. Geen van beiden bleef op 0 staan, dus dit is een gewone winst.',
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
      title: 'Kap: stoppen of doorduwen?',
      narration:
        'Noord/Zuid winnen de eerste 7 slagen op rij terwijl Oost/West nog op 0 staan — een kap-situatie. Wie mag beslissen, en wat gebeurt er in twee verschillende scenario’s?',
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
          text: 'Alleen Zuid, de winnaar van die 7de slag, mag nu beslissen: de hand hier stopzetten voor 5 punten, of doorspelen richting baunie. Partner Noord mag deze keuze niet voor Zuid maken.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Scenario A: in plaats van Zuid zelf, tapt partner Noord de hand af.',
        },
        {
          type: 'score',
          team: 1,
          points: 2,
          reason: 'Scenario A: omdat de partner aftapt in plaats van de slagwinnaar zelf, daalt de kap van 5 naar 2 punten.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Scenario B (alternatief): Zuid besluit zelf om door te spelen richting baunie, in plaats van te stoppen.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Bij slag 11 heeft Oost eindelijk een kleur die niemand van Noord/Zuid kan volgen of overtroeven — Oost wint een slag. De baunie-poging is mislukt.',
        },
        {
          type: 'score',
          team: 2,
          points: 2,
          reason: 'Scenario B: de doorgezette kap-poging lukt niet, dus Oost/West krijgen 2 punten in plaats van Noord/Zuid.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Zelfde 7-0 startpositie, drie heel verschillende uitkomsten: 5 punten bij stoppen door de slagwinnaar zelf, 2 punten bij aftappen door de partner, of 2 punten voor de tegenpartij als doorduwen naar baunie mislukt.',
        },
      ],
    },
    {
      id: 'winning-a-hand-full',
      level: 'full',
      title: 'Te vroeg capituleren kost de baunie-prijs',
      narration:
        'Oost/West staan nog op 0 slagen en willen er nu al de brui aan geven — maar capituleren mag pas zodra beide koppels minstens 1 slag hebben. Wat als ze het toch proberen?',
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
          text: 'Noord/Zuid winnen de eerste 5 slagen op rij. Oost/West staan nog op 0 — baunie is voor Noord/Zuid op dit moment nog volledig mogelijk.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Oost wil capituleren om verder puntenverlies te beperken. Maar dat mag niet: capituleren is alleen toegestaan zodra beide koppels minstens 1 slag gewonnen hebben, en Oost/West staan nog op 0.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Oost capituleert toch, vóórdat een kap zelfs maar zeker was en terwijl baunie nog mogelijk was. Dat wordt afgerekend als een volledige baunie.',
        },
        {
          type: 'score',
          team: 1,
          points: 15,
          reason: 'Te vroeg capituleren terwijl baunie nog mogelijk was: Noord/Zuid krijgen de volle 15 baunie-punten.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Was dit niet gebeurd, dan had de hand normaal verder gespeeld. Ter vergelijking: stel dat Oost/West die capitulatie niet hadden geprobeerd en in plaats daarvan eerlijk doorspeelden.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Bij slag 6 wint West alsnog een slag. Vanaf nu hebben beide koppels minstens 1 slag — kap en baunie zijn voor de rest van deze hand niet meer mogelijk, en capituleren zou vanaf nu wél zijn toegestaan.',
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'De resterende slagen worden verdeeld: Noord/Zuid winnen er nog 5, Oost/West nog 2. Eindstand: 10 tegen 3 slagen.',
        },
        {
          type: 'score',
          team: 1,
          points: 2,
          reason: 'Zonder de voortijdige capitulatie was dit een gewone winst geweest voor Noord/Zuid (10 tegen 3 slagen) — 2 punten in plaats van 15.',
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Het verschil is groot: eerlijk uitspelen had Noord/Zuid hier maar 2 punten opgeleverd. Te vroeg capituleren terwijl baunie nog mogelijk was, koste Oost/West in plaats daarvan de volle 15 punten.',
        },
      ],
    },
  ],
}
