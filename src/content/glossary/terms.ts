import type { GlossaryTerm } from '@/content/glossary-types'

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: 'troef',
    term: 'Troef',
    category: 'gameplay',
    definition:
      'De kleur die boven alle andere kleuren staat. Troefkaarten winnen altijd van niet-troefkaarten, ongeacht de hoogte. De roeper kiest de troefkleur na de eerste vijf kaarten.',
    relatedTerms: ['roepen', 'roeper'],
    relatedRules: ['setup-dealing', 'trick-taking'],
  },
  {
    slug: 'slag',
    term: 'Slag',
    category: 'gameplay',
    definition:
      'Één speelronde waarbij elke speler één kaart speelt. De speler die de hoogste kaart van de gevraagde kleur speelt — of de hoogste troef — wint de slag en mag de volgende slag openen.',
    relatedTerms: ['troef', 'koppel'],
    relatedRules: ['trick-taking'],
  },
  {
    slug: 'roepen',
    term: 'Roepen',
    category: 'gameplay',
    definition:
      'Het uitroepen van de troefkleur door de roeper, na het ontvangen van de eerste vijf kaarten. Eenmaal geroepen kan de troef niet meer gewijzigd worden nadat de tweede kaartenronde is uitgedeeld.',
    relatedTerms: ['troef', 'roeper', 'gever'],
    relatedRules: ['setup-dealing'],
  },
  {
    slug: 'baunie',
    term: 'Baunie',
    category: 'scoring',
    definition:
      'Het winnen van alle acht slagen in één hand. Een baunie levert 15 punten op voor het winnende koppel in plaats van de gewone puntenberekening.',
    relatedTerms: ['slag', 'koppel', 'punten'],
    relatedRules: ['winning-a-hand'],
  },
  {
    slug: 'kap',
    term: 'Kap',
    category: 'gameplay',
    definition:
      'Het aftikken na de zevende slag: een koppel dat na zeven slagen al gewonnen heeft, kan de hand beëindigen door af te tikken zonder de achtste slag te spelen.',
    relatedTerms: ['slag', 'koppel', 'punten'],
    relatedRules: ['winning-a-hand'],
  },
  {
    slug: 'misdeal',
    term: 'Misdeling',
    category: 'gameplay',
    definition:
      'Een fout bij het uitdelen van de kaarten, veroorzaakt door de dealer. Een misdeling levert de tegenpartij van de dealer 2 strafpunten op, met een maximum van 2 misdelingen per ronde.',
    relatedTerms: ['gever'],
    relatedRules: ['setup-dealing'],
  },
  {
    slug: 'koppel',
    term: 'Koppel',
    category: 'roles',
    definition:
      'Een samenspelend duo van twee spelers. Noord en Zuid spelen samen als koppel tegen Oost en West. Bij lopende koppels roteren de koppelsamenstelling per ronde.',
    relatedTerms: ['lopende-koppels', 'tafel'],
    relatedRules: ['trick-taking'],
  },
  {
    slug: 'gever',
    term: 'Gever',
    category: 'roles',
    definition:
      'De speler die de kaarten uitdeelt. De gever wordt bepaald door wie de hoogste kaart trekt bij het loten. De speler links van de gever is de roeper.',
    relatedTerms: ['roeper', 'roepen', 'misdeal'],
    relatedRules: ['setup-dealing'],
  },
  {
    slug: 'roeper',
    term: 'Roeper',
    category: 'roles',
    definition:
      'De speler links van de gever die als enige de troefkleur bepaalt. De roeper ontvangt als eerste vijf kaarten en moet vóór de tweede kaartenronde troef roepen.',
    relatedTerms: ['gever', 'roepen', 'troef'],
    relatedRules: ['setup-dealing'],
  },
  {
    slug: 'punten',
    term: 'Punten',
    category: 'scoring',
    definition:
      'De scoreeenheid in Troefcall. Punten worden verdiend door slagen te winnen en bepaalde bonussen te behalen, of door strafpunten bij de tegenstander te forceren.',
    relatedTerms: ['slag', 'baunie', 'kap'],
    relatedRules: ['winning-a-hand'],
  },
  {
    slug: 'geen-plaatje',
    term: 'Geen plaatje',
    category: 'gameplay',
    definition:
      'Een hand zonder een enkele koning, vrouw of boer in alle 13 kaarten — een aas telt niet als plaatje. De roeper mag eigenhandig een nieuwe deling eisen. Een onterechte claim levert de tegenpartij 5 punten op.',
    relatedTerms: ['roeper', 'gever', 'misdeal'],
    relatedRules: ['setup-dealing'],
  },
  {
    slug: 'capituleren',
    term: 'Capituleren',
    category: 'gameplay',
    definition:
      'Het opgeven van een hand door een koppel dat de strijd verloren acht. Na capitulatie worden de resterende kaarten neergelegd en de punten berekend op basis van de al gewonnen slagen.',
    relatedTerms: ['koppel', 'slag', 'punten'],
    relatedRules: ['winning-a-hand'],
  },
  {
    slug: 'lopende-koppels',
    term: 'Lopende koppels',
    category: 'tournament',
    definition:
      'Een toernooiformaat waarbij de koppelsamenstelling per set roteert. Spelers wisselen van tafelpartner zodat elke speler met en tegen verschillende tegenstanders speelt in de loop van het toernooi.',
    relatedTerms: ['koppel', 'tafel', 'set', 'match'],
    relatedRules: [],
  },
  {
    slug: 'tafel',
    term: 'Tafel',
    category: 'tournament',
    definition:
      'Eén speelgroep van vier spelers. Een standaard Troefcall-toernooi heeft vier tafels met vier koppels per club. Per tafel worden vier spellen gespeeld per set.',
    relatedTerms: ['koppel', 'set', 'lopende-koppels'],
    relatedRules: [],
  },
  {
    slug: 'set',
    term: 'Set',
    category: 'tournament',
    definition:
      'Een speeleenheid van vier spellen per tafel. Na elke set roteren de koppels naar een nieuwe tafel. Een match bestaat uit acht sets.',
    relatedTerms: ['tafel', 'match', 'lopende-koppels'],
    relatedRules: [],
  },
  {
    slug: 'match',
    term: 'Match',
    category: 'tournament',
    definition:
      'Een volledige speeldag of competitieronde bestaande uit acht sets. Na een match worden de competitiepunten toegekend: 3 voor een overwinning, 1 voor gelijkspel, 0 voor verlies.',
    relatedTerms: ['set', 'tafel', 'lopende-koppels', 'punten'],
    relatedRules: [],
  },
]
