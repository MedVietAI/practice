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
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Flag className="w-8 h-8 text-red-600" />
            <span className="text-xl font-bold text-red-800">
              80 Năm Quốc Khánh
            </span>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id
              
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
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
