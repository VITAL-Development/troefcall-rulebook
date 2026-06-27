import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/routes/RootLayout'
import Home from '@/routes/Home'
import NotFound from '@/routes/NotFound'
import RulebookIndex from '@/routes/rulebook/RulebookIndex'
import SetupDealing from '@/routes/rulebook/SetupDealing'
import TrickTaking from '@/routes/rulebook/TrickTaking'
import WinningAHand from '@/routes/rulebook/WinningAHand'
import TrickResolutionDemo from '@/routes/demo/TrickResolutionDemo'
import GlossaryIndex from '@/routes/glossary/GlossaryIndex'
import DevKitchenSink from '@/routes/DevKitchenSink'

export const router = createBrowserRouter([
  { path: '/dev-kitchen-sink', element: <DevKitchenSink /> },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'rulebook', element: <RulebookIndex /> },
      { path: 'rulebook/setup-dealing', element: <SetupDealing /> },
      { path: 'rulebook/trick-taking', element: <TrickTaking /> },
      { path: 'rulebook/winning-a-hand', element: <WinningAHand /> },
      { path: 'demo/trick-resolution', element: <TrickResolutionDemo /> },
      { path: 'glossary', element: <GlossaryIndex /> },
      { path: 'glossary/:termSlug', element: <GlossaryIndex /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
