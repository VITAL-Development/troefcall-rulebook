import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import TopNav from '@/components/nav/TopNav'
import FeltSurface from '@/components/table/FeltSurface'

export default function RootLayout() {
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()

  return (
    <FeltSurface>
      <TopNav />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </FeltSurface>
  )
}
