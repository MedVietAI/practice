'use client'

import { motion } from 'framer-motion'
import { Home, Gamepad2, Info, Flag, Clock, Image } from 'lucide-react'

interface NavigationProps {
  currentView: 'home' | 'game' | 'history' | 'gallery' | 'about'
  setCurrentView: (view: 'home' | 'game' | 'history' | 'gallery' | 'about') => void
}

export default function Navigation({ currentView, setCurrentView }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Trang Chủ', icon: Home },
    { id: 'game', label: 'Trò Chơi', icon: Gamepad2 },
    { id: 'history', label: 'Lịch Sử', icon: Clock },
    { id: 'gallery', label: 'Hình Ảnh', icon: Image },
    { id: 'about', label: 'Giới Thiệu', icon: Info },
  ] as const

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b-2 border-red-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="vietnam-gradient p-2 rounded-full shadow-lg"
            >
              <Flag className="w-10 h-10 text-white" />
            </motion.div>
            <div>
              <span className="text-2xl font-black gradient-text">
                80 Năm Quốc Khánh
              </span>
              <div className="text-sm text-gray-600 font-medium">
                Việt Nam Tự Hào
              </div>
            </div>
          </motion.div>

          {/* Navigation Items */}
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
                  className={`nav-item flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 vietnam-gradient rounded-xl -z-10"
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
              className="p-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden border-t border-gray-200">
          <div className="py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id
              
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentView(item.id)}
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
        </div>
      </div>
    </nav>
  )
}
