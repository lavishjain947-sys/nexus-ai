import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import PageTransition from './components/PageTransition'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import AboutSection from './components/AboutSection'
import FounderSection from './components/FounderSection'
import CompanySection from './components/CompanySection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import AuthPage from './components/AuthPage'
import DashboardPage from './components/DashboardPage'

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true)
  const [page, setPage] = useState('landing')
  const [pageTransition, setPageTransition] = useState(false)
  const [pendingPage, setPendingPage] = useState(null)

  const handleNavigate = useCallback((targetPage) => {
    if (targetPage === page) return
    setPendingPage(targetPage)
    setPageTransition(true)
  }, [page])

  useEffect(() => {
    if (!pageTransition && pendingPage) {
      setPage(pendingPage)
      setPendingPage(null)
    }
  }, [pageTransition, pendingPage])

  const handleTransitionComplete = useCallback(() => {
    setPageTransition(false)
  }, [])

  useEffect(() => {
    document.body.style.overflow = initialLoading ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [initialLoading])

  const showNavbar = page !== 'dashboard'

  return (
    <>
      {initialLoading && <LoadingScreen onComplete={() => setInitialLoading(false)} />}

      <AnimatePresence mode="wait">
        {pageTransition && (
          <PageTransition key="transition" onComplete={handleTransitionComplete} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: initialLoading ? 0 : 1,
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {page === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Navbar onNavigate={handleNavigate} currentPage={page} />
            <main>
              <HeroSection />
              <FeaturesSection />
              <AboutSection />
              <FounderSection />
              <CompanySection />
              <ContactSection />
            </main>
            <Footer />
          </motion.div>
        )}

        {page === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Navbar onNavigate={handleNavigate} currentPage={page} />
            <AuthPage onNavigate={handleNavigate} />
          </motion.div>
        )}

        {page === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <DashboardPage onNavigate={handleNavigate} />
          </motion.div>
        )}
      </motion.div>
    </>
  )
}
