'use client'

import { useState, useEffect } from 'react'
import Navigation from './Navigation'
import MobileNavigation from './MobileNavigation'

interface ResponsiveLayoutProps {
  currentView: 'home' | 'game' | 'about'
  setCurrentView: (view: 'home' | 'game' | 'about') => void
  children: React.ReactNode
}

export default function ResponsiveLayout({ currentView, setCurrentView, children }: ResponsiveLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-100">
      {isMobile ? (
        <MobileNavigation currentView={currentView} setCurrentView={setCurrentView} />
      ) : (
        <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      )}
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
