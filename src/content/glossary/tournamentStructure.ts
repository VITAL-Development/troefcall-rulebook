export const tournamentStructure = {
  tables: 4,
  koppelsPerClub: 4,
  gamesPerSet: 4,
  setsPerMatch: 8,
  competitionPoints: {
    win: 3,
    draw: 1,
    loss: 0,
  },
  rotation: 'lopende-koppels' as const,
  description:
    'Een standaard Troefcall-toernooi bestaat uit vier tafels met vier koppels per club. Per set worden vier spellen per tafel gespeeld. Een volledige match omvat acht sets. De koppels roteren via het lopende-koppels-systeem zodat elke combinatie van spelers aan bod komt.',
  phases: [
    {
      name: 'Set',
      description: '4 spellen per tafel. Na elke set roteren de koppels naar een nieuwe tafel.',
    },
    {
      name: 'Match',
      description: '8 sets vormen één match. Na de match worden competitiepunten verdeeld.',
    },
  ],
  scoring: [
    { result: 'Overwinning', points: 3 },
    { result: 'Gelijkspel', points: 1 },
    { result: 'Verlies', points: 0 },
  ],
}
