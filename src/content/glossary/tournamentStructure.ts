export interface CompetitionPoints {
  outcome: 'win' | 'draw' | 'loss'
  points: number
}

export interface TournamentStructure {
  tablesPerSession: number
  koppelsPerClub: number
  gamesPerSet: number
  setsPerMatch: number
  tableRotation: {
    lopendeKoppels: string
    zittendeKoppels: string
  }
  competitionPoints: CompetitionPoints[]
}

export const TOURNAMENT_STRUCTURE: TournamentStructure = {
  tablesPerSession: 4,
  koppelsPerClub: 4,
  gamesPerSet: 4,
  setsPerMatch: 8,
  tableRotation: {
    lopendeKoppels:
      'Lopende koppels verplaatsen zich na elke set naar de volgende tafel (met de klok mee). Zo ontmoeten zij in de loop van de match meerdere verschillende tegenstanders.',
    zittendeKoppels:
      'Zittende koppels blijven aan dezelfde tafel voor de gehele match en ontvangen telkens wisselende tegenstanders.',
  },
  competitionPoints: [
    { outcome: 'win', points: 3 },
    { outcome: 'draw', points: 1 },
    { outcome: 'loss', points: 0 },
  ],
}
