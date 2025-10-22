'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Gamepad2, Info, Flag, Clock, Image, Menu, X, Star, Award, Heart } from 'lucide-react'

interface PremiumHeaderProps {
  currentView: 'home' | 'game' | 'history' | 'gallery' | 'about'
  setCurrentView: (view: 'home' | 'game' | 'history' | 'gallery' | 'about') => void
}

export default function PremiumHeader({ currentView, setCurrentView }: PremiumHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Trang Chủ', icon: Home, color: 'from-red-500 to-red-600' },
    { id: 'game', label: 'Trò Chơi', icon: Gamepad2, color: 'from-blue-500 to-blue-600' },
    { id: 'history', label: 'Lịch Sử', icon: Clock, color: 'from-purple-500 to-purple-600' },
    { id: 'gallery', label: 'Hình Ảnh', icon: Image, color: 'from-green-500 to-green-600' },
    { id: 'about', label: 'Giới Thiệu', icon: Info, color: 'from-orange-500 to-orange-600' },
  ] as const

  return (
    <div className="relative">
      {/* Premium Vietnamese Flag Background with Parallax */}
      <div className={`relative h-40 overflow-hidden transition-all duration-300 ${scrollY > 50 ? 'h-20' : 'h-40'}`}>
        {/* Animated Flag Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-red-600 via-red-700 to-red-600"></div>
          <div className="absolute top-1/3 left-0 w-full h-1/3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"></div>
          <div className="absolute top-2/3 left-0 w-full h-1/3 bg-gradient-to-r from-red-600 via-red-700 to-red-600"></div>
        </div>
        
        {/* Animated Wave Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
              fill="rgba(255,255,255,0.1)"
            >
              <animateTransform
                attributeName="transform"
                type="translateX"
                values="0;100;0"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
        
        {/* Floating Stars with Enhanced Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-300"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 12 + 8}px`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            >
              ★
            </motion.div>
          ))}
        </div>

        {/* Premium Content */}
        <div className="relative z-10 h-full flex items-center justify-between px-6 lg:px-8">
          {/* Enhanced Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="relative"
            >
              {/* Premium Flag Icon with Glow Effect */}
              <div className="relative">
                <div className="w-16 h-12 bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-yellow-300">
                  <div className="w-full h-full relative">
                    <div className="absolute top-0 left-0 w-full h-1/3 bg-red-600"></div>
                    <div className="absolute top-1/3 left-0 w-full h-1/3 bg-yellow-500"></div>
                    <div className="absolute top-2/3 left-0 w-full h-1/3 bg-red-600"></div>
                    {/* Star in center */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-300 text-xl">
                      ★
                    </div>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-yellow-400 rounded-xl blur-md opacity-30 animate-pulse"></div>
              </div>
            </motion.div>
            
            <div className="text-white">
              <motion.h1 
                className="text-2xl lg:text-3xl font-black drop-shadow-2xl"
                animate={{ 
                  textShadow: [
                    "0 0 10px rgba(255,255,255,0.5)",
                    "0 0 20px rgba(255,255,255,0.8)",
                    "0 0 10px rgba(255,255,255,0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                80 Năm Quốc Khánh
              </motion.h1>
              <motion.p 
                className="text-sm lg:text-base text-yellow-200 font-semibold drop-shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Việt Nam Tự Hào - Hành Trình Lịch Sử
              </motion.p>
            </div>
          </motion.div>

          {/* Premium Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id
              
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentView(item.id)}
                  className={`relative flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? 'text-white shadow-2xl'
                      : 'text-yellow-100 hover:text-white hover:bg-white hover:bg-opacity-20'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm lg:text-base">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-xl -z-10 shadow-lg`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 rounded-xl text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Premium Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-md shadow-2xl border-t-2 border-red-200"
          >
            <div className="py-4 space-y-1 px-4">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = currentView === item.id
                
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentView(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-red-100 to-yellow-100 text-red-800 font-semibold shadow-lg'
                        : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-lg">{item.label}</span>
                    {isActive && (
                      <motion.div
                        className="ml-auto w-2 h-2 bg-red-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600"></div>
    </div>
  )
}
