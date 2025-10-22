'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, BookOpen, Trophy, Users, Star, Flag, Award, Heart, Clock, Image, ChevronRight, Sparkles, Crown, Shield } from 'lucide-react'

interface PremiumDashboardProps {
  onStartGame: () => void
  onLearnHistory: () => void
  onViewGallery: () => void
}

export default function PremiumDashboard({ onStartGame, onLearnHistory, onViewGallery }: PremiumDashboardProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const heroSlides = [
    {
      title: "80 Năm Quốc Khánh Việt Nam",
      subtitle: "Hành Trình Lịch Sử Hào Hùng",
      description: "Khám phá lịch sử 80 năm độc lập, tự do và phát triển của dân tộc Việt Nam",
      icon: Flag,
      color: "from-red-600 to-red-800"
    },
    {
      title: "Tinh Thần Yêu Nước",
      subtitle: "Tự Hào Dân Tộc Việt Nam",
      description: "Thể hiện lòng yêu nước và hiểu biết sâu sắc về lịch sử dân tộc",
      icon: Heart,
      color: "from-yellow-500 to-orange-600"
    },
    {
      title: "Tương Lai Tươi Sáng",
      subtitle: "Xây Dựng Đất Nước Phồn Vinh",
      description: "Tiếp nối truyền thống cha ông, xây dựng Việt Nam ngày càng phát triển",
      icon: Star,
      color: "from-blue-600 to-purple-700"
    }
  ]

  const features = [
    {
      icon: Trophy,
      title: "Trò Chơi Tương Tác",
      description: "Khám phá lịch sử qua các trò chơi thú vị và bổ ích",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      icon: BookOpen,
      title: "Lịch Sử Sống Động",
      description: "Tìm hiểu lịch sử qua những câu chuyện và sự kiện thực tế",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Image,
      title: "Hình Ảnh Lịch Sử",
      description: "Xem những hình ảnh quý giá từ các nguồn tin chính thống",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: Award,
      title: "Thành Tựu Cá Nhân",
      description: "Theo dõi tiến độ học tập và đạt được các thành tựu",
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ]

  const stats = [
    { label: "Năm Lịch Sử", value: "80", icon: Clock },
    { label: "Trò Chơi", value: "3+", icon: Trophy },
    { label: "Câu Hỏi", value: "100+", icon: Star },
    { label: "Hình Ảnh", value: "50+", icon: Image }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-100 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-red-200 to-yellow-200 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-yellow-200 to-red-200 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 16 + 8}px`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            ★
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Hero Carousel */}
            <div className="relative mb-16">
              <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].color} flex items-center justify-center`}
                  >
                    <div className="text-center text-white px-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="mb-8"
                      >
                        {(() => {
                          const Icon = heroSlides[currentSlide].icon
                          return <Icon className="w-24 h-24 mx-auto mb-4 drop-shadow-2xl" />
                        })()}
                      </motion.div>
                      <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-4xl lg:text-6xl font-black mb-4 drop-shadow-2xl"
                      >
                        {heroSlides[currentSlide].title}
                      </motion.h1>
                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-xl lg:text-2xl font-semibold mb-6 drop-shadow-lg"
                      >
                        {heroSlides[currentSlide].subtitle}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed drop-shadow-md"
                      >
                        {heroSlides[currentSlide].description}
                      </motion.p>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Slide Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Call-to-Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStartGame}
                className="group relative bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center space-x-3">
                  <Play className="w-6 h-6" />
                  <span>Bắt Đầu Chơi Ngay</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLearnHistory}
                className="group relative bg-white text-red-600 px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl border-2 border-red-200 hover:border-red-300 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-6 h-6" />
                  <span>Tìm Hiểu Lịch Sử</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20"
                >
                  <div className="bg-gradient-to-r from-red-500 to-yellow-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-black text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-black text-gray-800 mb-6">
                Tính Năng Nổi Bật
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Khám phá lịch sử Việt Nam qua những trải nghiệm tương tác đầy thú vị và bổ ích
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className={`${feature.bgColor} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${feature.borderColor} group cursor-pointer`}
                >
                  <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-black text-gray-800 mb-6">
                Khám Phá Ngay
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Bắt đầu hành trình khám phá lịch sử Việt Nam ngay hôm nay
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={onStartGame}
                className="group relative bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <Trophy className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Trò Chơi</h3>
                  <p className="text-red-100 mb-6">Tham gia các trò chơi tương tác để học lịch sử</p>
                  <div className="flex items-center text-sm font-semibold">
                    <span>Bắt đầu ngay</span>
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={onLearnHistory}
                className="group relative bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <BookOpen className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Lịch Sử</h3>
                  <p className="text-blue-100 mb-6">Tìm hiểu lịch sử qua các câu chuyện sinh động</p>
                  <div className="flex items-center text-sm font-semibold">
                    <span>Khám phá ngay</span>
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={onViewGallery}
                className="group relative bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <Image className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Hình Ảnh</h3>
                  <p className="text-green-100 mb-6">Xem những hình ảnh lịch sử quý giá</p>
                  <div className="flex items-center text-sm font-semibold">
                    <span>Xem ngay</span>
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
