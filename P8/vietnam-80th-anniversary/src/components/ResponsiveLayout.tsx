'use client'

import { useState, useEffect } from 'react'
import EnhancedHeader from './EnhancedHeader'

interface ResponsiveLayoutProps {
  currentView: 'home' | 'game' | 'history' | 'gallery' | 'about'
  setCurrentView: (view: 'home' | 'game' | 'history' | 'gallery' | 'about') => void
  children: React.ReactNode
}

export default function ResponsiveLayout({ currentView, setCurrentView, children }: ResponsiveLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-100">
      <EnhancedHeader currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
