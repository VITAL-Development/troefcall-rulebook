import type { GlossaryTerm } from '@/content/glossary-types'

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ── gameplay ─────────────────────────────────────────────────────────────
  {
    slug: 'troef',
    term: 'Troef',
    category: 'gameplay',
    definition:
      'De troefkleur is de kleur die de caller vóór de volledige deling roept. Troefkaarten verslaan elke kaart van een andere kleur, ongeacht de waarde. Troef kan niet gewijzigd worden nadat de tweede kaartenronde is gegeven.',
    relatedTerms: ['bieder', 'slag', 'snijden'],
    relatedRules: ['setup-dealing'],
  },
  {
    slug: 'slag',
    term: 'Slag',
    category: 'gameplay',
    definition:
      'Een slag bestaat uit vier kaarten — één van elke speler — en wordt gewonnen door de hoogste kaart van de aangespeelde kleur of, indien troef is gespeeld, door de hoogste troefkaart. De winnaar van een slag leidt de volgende slag.',
    relatedTerms: ['troef', 'leiden', 'volgen', 'snijden'],
    relatedRules: ['trick-taking'],
  },
  {
    slug: 'leiden',
    term: 'Leiden',
    category: 'gameplay',
    definition:
      'De winnaar van de vorige slag opent de volgende slag door als eerste een kaart te spelen. Bij de eerste slag leidt de speler links van de dealer.',
    relatedTerms: ['slag', 'dealer'],
  },
  {
    slug: 'volgen',
    term: 'Volgen',
    category: 'gameplay',
    definition:
      'Een speler is verplicht om dezelfde kleur te spelen als de aangeleide kleur, als hij die kleur in zijn hand heeft. Pas als een speler geen kaart van de gevraagde kleur meer heeft, mag hij een andere kleur of troef spelen.',
    relatedTerms: ['slag', 'snijden', 'troef'],
    relatedRules: ['trick-taking'],
  },
  {
    slug: 'snijden',
    term: 'Snijden',
    category: 'gameplay',
    definition:
      'Het spelen van een troefkaart wanneer een speler geen kaarten meer heeft van de aangeleide kleur. Een gesneden slag wordt door de hoogste troefkaart gewonnen, ook als andere spelers nog hogere kaarten van de originele kleur spelen.',
    relatedTerms: ['troef', 'volgen', 'slag'],
    relatedRules: ['trick-taking'],
  },
  {
    slug: 'misdeal',
    term: 'Misdeling',
    category: 'gameplay',
    definition:
      'Een misdeling treedt op wanneer de dealer fout schudt of deelt (bv. kaarten zichtbaar of in verkeerde volgorde). De tegenpartij van de dealer krijgt 2 strafpunten per misdeling, met een maximum van 2 misdelingen per ronde. De troefclaim van de caller vervalt en er wordt opnieuw gedeeld.',
    relatedTerms: ['dealer', 'strafpunten'],
    relatedRules: ['setup-dealing'],
  },
  {
    slug: 'no-picture-no-game',
    term: 'No picture, no game',
    category: 'gameplay',
    definition:
      'Als de caller in al zijn 13 kaarten geen koning, vrouw of boer heeft (een aas telt niet als plaatje), mag hij eigenhandig een nieuwe deling eisen. Een onterechte claim levert de tegenpartij 5 punten op.',
    relatedTerms: ['bieder', 'misdeal'],
    relatedRules: ['setup-dealing'],
  },
  {
    slug: 'capituleren',
    term: 'Capituleren',
    category: 'gameplay',
    definition:
      'De verliezende partij mag zich overgeven wanneer zij inschat dat zij de hand niet meer kunnen winnen. Het spel stopt en de punten worden verrekend zoals bij een reguliere overwinning van de winnende partij.',
    relatedTerms: ['kap', 'baunie'],
    relatedRules: ['winning-a-hand'],
  },
  {
    slug: 'bieden',
    term: 'Bieden / troef roepen',
    category: 'gameplay',
    definition:
      'Het uitroepen van de troefkleur. Alleen de caller (bieder), de speler links van de dealer, mag troef roepen. Dit gebeurt na het ontvangen van de eerste 5 kaarten en vóór de rest van de kaarten worden gedeeld.',
    relatedTerms: ['bieder', 'troef', 'dealer'],
    relatedRules: ['setup-dealing'],
  },

  // ── scoring ───────────────────────────────────────────────────────────────
  {
    slug: 'kap',
    term: 'Kap',
    category: 'scoring',
    definition:
      'Als een partij precies 7 slagen wint en de hand daarna stopt, verdient zij 5 punten. Dit is het standaard doel van de aanvallende partij. De kap wordt ook uitgesproken als de winnende partij na de 7e slag aangeeft te stoppen.',
    relatedTerms: ['baunie', 'slag', 'capituleren'],
    relatedRules: ['winning-a-hand'],
  },
  {
    slug: 'baunie',
    term: 'Baunie',
    category: 'scoring',
    definition:
      'Als een partij alle 13 slagen wint, verdient zij 15 punten in plaats van de gebruikelijke 5. Een baunie is de hoogst mogelijke score in een hand.',
    relatedTerms: ['kap', 'slag'],
    relatedRules: ['winning-a-hand'],
  },
  {
    slug: 'strafpunten',
    term: 'Strafpunten',
    category: 'scoring',
    definition:
      'Punten die worden toegekend aan de tegenpartij als straf voor een overtreding. Voorbeelden: 2 punten voor een misdeling, 5 punten voor een onterechte "no picture"-claim, 5 of 15 punten voor een kaart uit de beurt spelen.',
    relatedTerms: ['misdeal', 'no-picture-no-game'],
  },
  {
    slug: 'competitiepunten',
    term: 'Competitiepunten',
    category: 'scoring',
    definition:
      'Punten die worden bijgehouden over een volledige match in een toernooi. Een overwinning levert 3 competitiepunten op, een gelijkspel 1 punt en een verlies 0 punten.',
    relatedTerms: ['match', 'set'],
    relatedRules: [],
  },

  // ── roles ─────────────────────────────────────────────────────────────────
  {
    slug: 'dealer',
    term: 'Dealer',
    category: 'roles',
    definition:
      'De speler die de kaarten schudt en deelt. De dealer roteert elke hand met de klok mee. De speler links van de dealer is de caller. Een foutieve deling door de dealer resulteert in strafpunten voor de tegenpartij.',
    relatedTerms: ['bieder', 'misdeal'],
    relatedRules: ['setup-dealing'],
  },
  {
    slug: 'bieder',
    term: 'Caller / Bieder',
    category: 'roles',
    definition:
      'De speler direct links van de dealer. Alleen de caller ontvangt als eerste 5 kaarten en is de enige die troef mag roepen. Na de troefclaim wordt de rest van de hand gedeeld.',
    relatedTerms: ['dealer', 'troef', 'bieden'],
    relatedRules: ['setup-dealing'],
  },
  {
    slug: 'koppel',
    term: 'Koppel',
    category: 'roles',
    definition:
      'Een partnerschap van twee spelers die tegenover elkaar zitten: Noord/Zuid of Oost/West. Koppels spelen samen en delen elkaars punten.',
    relatedTerms: ['noorden', 'zuiden', 'oosten', 'westen'],
  },
  {
    slug: 'noorden',
    term: 'Noord (N)',
    category: 'roles',
    definition:
      'De speler op de noordpositie aan tafel. Noord speelt samen met Zuid als koppel tegen Oost en West.',
    relatedTerms: ['zuiden', 'oosten', 'westen', 'koppel'],
  },
  {
    slug: 'oosten',
    term: 'Oost (O)',
    category: 'roles',
    definition:
      'De speler op de oostpositie aan tafel. Oost speelt samen met West als koppel tegen Noord en Zuid.',
    relatedTerms: ['westen', 'noorden', 'zuiden', 'koppel'],
  },
  {
    slug: 'zuiden',
    term: 'Zuid (Z)',
    category: 'roles',
    definition:
      'De speler op de zuidpositie aan tafel. Zuid speelt samen met Noord als koppel tegen Oost en West.',
    relatedTerms: ['noorden', 'oosten', 'westen', 'koppel'],
  },
  {
    slug: 'westen',
    term: 'West (W)',
    category: 'roles',
    definition:
      'De speler op de westpositie aan tafel. West speelt samen met Oost als koppel tegen Noord en Zuid.',
    relatedTerms: ['oosten', 'noorden', 'zuiden', 'koppel'],
  },

  // ── tournament ────────────────────────────────────────────────────────────
  {
    slug: 'set',
    term: 'Set',
    category: 'tournament',
    definition:
      'Een set bestaat uit 4 spellen gespeeld aan één tafel. Na elke set roteren de lopende koppels naar een volgende tafel.',
    relatedTerms: ['match', 'tafelrotatie', 'lopende-koppels'],
  },
  {
    slug: 'match',
    term: 'Match',
    category: 'tournament',
    definition:
      'Een volledige match bestaat uit 8 sets. De competitiepunten over de gehele match bepalen de eindstand.',
    relatedTerms: ['set', 'competitiepunten'],
  },
  {
    slug: 'tafelrotatie',
    term: 'Tafelrotatie',
    category: 'tournament',
    definition:
      'Na elke set verplaatsen de lopende koppels zich naar de volgende tafel (doorgaans met de klok mee). De zittende koppels blijven aan dezelfde tafel. Zo ontmoeten koppels in de loop van een match meerdere tegenstanders.',
    relatedTerms: ['lopende-koppels', 'set'],
  },
  {
    slug: 'lopende-koppels',
    term: 'Lopende koppels',
    category: 'tournament',
    definition:
      'De koppels die na elke set van tafel wisselen tijdens een toernooi. Tegenover hen staan de zittende koppels die aan dezelfde tafel blijven.',
    relatedTerms: ['tafelrotatie', 'set'],
  },

  // ── sanctions ─────────────────────────────────────────────────────────────
  {
    slug: 'verboden-kijken',
    term: 'Verboden kijken',
    category: 'sanctions',
    definition:
      'Het bekijken van een reeds gewonnen en omgekeerde slag is verboden. De overtreder geeft de tegenpartij 2 strafpunten en het spel eindigt onmiddellijk.',
    relatedTerms: ['strafpunten', 'slag'],
  },
]
