'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, Gamepad2, Info, Flag } from 'lucide-react'

interface MobileNavigationProps {
  currentView: 'home' | 'game' | 'about'
  setCurrentView: (view: 'home' | 'game' | 'about') => void
}

export default function MobileNavigation({ currentView, setCurrentView }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Trang Chủ', icon: Home },
    { id: 'game', label: 'Trò Chơi', icon: Gamepad2 },
    { id: 'about', label: 'Giới Thiệu', icon: Info },
  ] as const

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const handleNavClick = (view: 'home' | 'game' | 'about') => {
    setCurrentView(view)
    closeMenu()
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 md:hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Flag className="w-6 h-6 text-red-600" />
            <span className="text-lg font-bold text-red-800">
              80 Năm Quốc Khánh
            </span>
          </motion.div>

          {/* Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="p-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 overflow-hidden"
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
                      onClick={() => handleNavClick(item.id)}
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
        </AnimatePresence>
      </div>
    </nav>
  )
}
