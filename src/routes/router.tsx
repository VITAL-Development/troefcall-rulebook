import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/routes/RootLayout'
import Home from '@/routes/Home'
import OverOns from '@/routes/OverOns'
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
      { path: 'over-ons', element: <OverOns /> },
      { path: 'regelboek', element: <RulebookIndex /> },
      { path: 'regelboek/spelverloop', element: <GameOverview /> },
      { path: 'regelboek/schudden-en-delen', element: <SetupDealing /> },
      { path: 'regelboek/slag-spelen', element: <TrickTaking /> },
      { path: 'regelboek/hand-winnen', element: <WinningAHand /> },
      { path: 'regelboek/sancties', element: <Sanctions /> },
      { path: 'regelboek/toernooistructuur', element: <TournamentStructureTopic /> },
      { path: 'demo/slag-oplossen', element: <TrickResolutionDemo /> },
      { path: 'woordenboek', element: <GlossaryIndex /> },
      { path: 'sancties', element: <SanctionsTable /> },
      { path: 'toernooistructuur', element: <TournamentStructure /> },
      { path: 'woordenboek/:termSlug', element: <GlossaryIndex /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
