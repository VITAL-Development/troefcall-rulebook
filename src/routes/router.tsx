import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/routes/RootLayout'
import Home from '@/routes/Home'
import NotFound from '@/routes/NotFound'
import RulebookIndex from '@/routes/rulebook/RulebookIndex'
import GameOverview from '@/routes/rulebook/GameOverview'
import SetupDealing from '@/routes/rulebook/SetupDealing'
import TrickTaking from '@/routes/rulebook/TrickTaking'
import WinningAHand from '@/routes/rulebook/WinningAHand'
import Sanctions from '@/routes/rulebook/Sanctions'
import TournamentStructureTopic from '@/routes/rulebook/TournamentStructureTopic'
import TrickResolutionDemo from '@/routes/demo/TrickResolutionDemo'
import GlossaryIndex from '@/routes/glossary/GlossaryIndex'
import SanctionsTable from '@/routes/glossary/SanctionsTable'
import TournamentStructure from '@/routes/glossary/TournamentStructure'
import DevKitchenSink from '@/routes/DevKitchenSink'

export const router = createBrowserRouter([
  { path: '/dev-kitchen-sink', element: <DevKitchenSink /> },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'rulebook', element: <RulebookIndex /> },
      { path: 'rulebook/game-overview', element: <GameOverview /> },
      { path: 'rulebook/setup-dealing', element: <SetupDealing /> },
      { path: 'rulebook/trick-taking', element: <TrickTaking /> },
      { path: 'rulebook/winning-a-hand', element: <WinningAHand /> },
      { path: 'rulebook/sanctions', element: <Sanctions /> },
      { path: 'rulebook/tournament-structure', element: <TournamentStructureTopic /> },
      { path: 'demo/trick-resolution', element: <TrickResolutionDemo /> },
      { path: 'glossary', element: <GlossaryIndex /> },
      { path: 'sanctions', element: <SanctionsTable /> },
      { path: 'tournament-structure', element: <TournamentStructure /> },
      { path: 'glossary/:termSlug', element: <GlossaryIndex /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
