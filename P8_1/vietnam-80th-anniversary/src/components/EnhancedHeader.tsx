'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Gamepad2, Info, Flag, Clock, Image, Menu, X } from 'lucide-react'

interface EnhancedHeaderProps {
  currentView: 'home' | 'game' | 'history' | 'gallery' | 'about'
  setCurrentView: (view: 'home' | 'game' | 'history' | 'gallery' | 'about') => void
}

export default function EnhancedHeader({ currentView, setCurrentView }: EnhancedHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Trang Chủ', icon: Home },
    { id: 'game', label: 'Trò Chơi', icon: Gamepad2 },
    { id: 'history', label: 'Lịch Sử', icon: Clock },
    { id: 'gallery', label: 'Hình Ảnh', icon: Image },
    { id: 'about', label: 'Giới Thiệu', icon: Info },
  ] as const

  return (
    <div className="relative">
      {/* Vietnamese Flag Background */}
      <div className="relative h-32 bg-gradient-to-r from-red-600 via-red-600 to-red-600 overflow-hidden">
        {/* Flag stripes */}
        <div className="absolute inset-0">
          <div className="h-full bg-gradient-to-r from-red-600 via-red-600 to-red-600"></div>
          <div className="absolute top-0 left-0 w-full h-1/3 bg-red-600"></div>
          <div className="absolute top-1/3 left-0 w-full h-1/3 bg-yellow-500"></div>
          <div className="absolute top-2/3 left-0 w-full h-1/3 bg-red-600"></div>
        </div>
        
        {/* Floating stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-300 text-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 180, 360],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              ★
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-between px-4">
          {/* Logo with real Vietnamese flag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="relative"
            >
              {/* Real Vietnamese flag image */}
              <div className="w-16 h-12 bg-white rounded shadow-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-red-600 via-red-600 to-red-600 relative">
                  <div className="absolute top-0 left-0 w-full h-1/3 bg-red-600"></div>
                  <div className="absolute top-1/3 left-0 w-full h-1/3 bg-yellow-500"></div>
                  <div className="absolute top-2/3 left-0 w-full h-1/3 bg-red-600"></div>
                  {/* Star in the center */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-300 text-lg">
                    ★
                  </div>
                </div>
              </div>
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white drop-shadow-lg">
                80 Năm Quốc Khánh
              </h1>
              <p className="text-sm md:text-base text-yellow-200 font-semibold">
                Việt Nam Tự Hào
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id
              
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentView(item.id)}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-white bg-opacity-20 shadow-lg'
                      : 'text-yellow-100 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-white bg-opacity-20 rounded-lg -z-10"
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white hover:bg-opacity-10"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white shadow-lg border-t border-gray-200"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id
              
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setCurrentView(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-red-100 text-red-800 font-semibold'
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}
