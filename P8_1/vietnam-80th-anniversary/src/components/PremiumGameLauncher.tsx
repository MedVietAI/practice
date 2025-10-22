'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Trophy, Star, Users, Play, Clock, Award, Sparkles, Crown, Shield, Zap } from 'lucide-react'
import QuizGame from './games/QuizGame'
import EnhancedQAGame from './games/EnhancedQAGame'
import RPGGame from './games/RPGGame'

type GameMode = 'quiz' | 'qa' | 'rpg' | null

interface PremiumGameLauncherProps {
  onBack: () => void
}

export default function PremiumGameLauncher({ onBack }: PremiumGameLauncherProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode>(null)
  const [gameResults, setGameResults] = useState<any>(null)

  const gameModes = [
    {
      id: 'quiz' as GameMode,
      title: 'Trắc Nghiệm Lịch Sử',
      description: 'Thử thách kiến thức lịch sử Việt Nam qua các câu hỏi trắc nghiệm',
      icon: Star,
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      features: ['100+ câu hỏi', 'Tính điểm thời gian thực', 'Thành tích cá nhân'],
      difficulty: 'Dễ - Trung bình'
    },
    {
      id: 'qa' as GameMode,
      title: 'Hỏi & Đáp Mở',
      description: 'Thể hiện hiểu biết sâu sắc về lịch sử qua câu trả lời tự luận',
      icon: Trophy,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      features: ['Câu hỏi mở', 'Đánh giá AI', 'Gợi ý thông minh'],
      difficulty: 'Trung bình - Khó'
    },
    {
      id: 'rpg' as GameMode,
      title: 'Hành Trình RPG',
      description: 'Khám phá lịch sử qua cuộc phiêu lưu tương tác đầy thú vị',
      icon: Users,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      features: ['Câu chuyện tương tác', 'Nhân vật lịch sử', 'Lựa chọn ảnh hưởng'],
      difficulty: 'Tất cả cấp độ'
    }
  ]

  const handleGameComplete = (results: any) => {
    setGameResults(results)
  }

  const resetGame = () => {
    setSelectedMode(null)
    setGameResults(null)
  }

  if (selectedMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-100 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
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
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              ★
            </motion.div>
          ))}
        </div>

        <div className="relative z-10">
          {selectedMode === 'quiz' && (
            <QuizGame
              topic="Lịch sử Việt Nam - Kỷ niệm 80 năm Quốc khánh"
              difficulty="medium"
              onComplete={(score) => handleGameComplete({ mode: 'quiz', score, maxScore: 100 })}
            />
          )}
          {selectedMode === 'qa' && (
            <EnhancedQAGame
              topic="Lịch sử Việt Nam - Kỷ niệm 80 năm Quốc khánh"
              onComplete={(score) => handleGameComplete({ mode: 'qa', score, maxScore: 50 })}
            />
          )}
          {selectedMode === 'rpg' && (
            <RPGGame
              onComplete={(score) => handleGameComplete({ mode: 'rpg', score, maxScore: 100 })}
            />
          )}
        </div>
      </div>
    )
  }

  if (gameResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 max-w-2xl w-full shadow-2xl border-2 border-red-200"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>
            
            <h2 className="text-3xl font-black text-gray-800 mb-4">Chúc Mừng!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Bạn đã hoàn thành trò chơi {gameResults.mode === 'quiz' ? 'Trắc Nghiệm' : 
              gameResults.mode === 'qa' ? 'Hỏi & Đáp' : 'RPG'} với điểm số:
            </p>
            
            <div className="text-4xl font-black text-red-600 mb-8">
              {gameResults.score}/{gameResults.maxScore}
            </div>
            
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-8 py-3 rounded-xl font-semibold"
              >
                Chơi Lại
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-xl font-semibold hover:bg-gray-300"
              >
                Về Trang Chủ
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-100 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-red-200 to-yellow-200 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-yellow-200 to-red-200 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Stars */}
        {[...Array(25)].map((_, i) => (
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

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Quay lại</span>
          </motion.button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 pb-20">
          <div className="max-w-6xl w-full">
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl lg:text-6xl font-black text-gray-800 mb-6">
                Chọn Trò Chơi
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
                Khám phá lịch sử Việt Nam qua những trải nghiệm tương tác đầy thú vị
              </p>
            </motion.div>

            {/* Game Modes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {gameModes.map((mode, index) => {
                const Icon = mode.icon
                return (
                  <motion.div
                    key={mode.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`${mode.bgColor} rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 ${mode.borderColor} cursor-pointer group relative overflow-hidden`}
                  >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`bg-gradient-to-r ${mode.color} p-4 rounded-2xl w-20 h-20 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-white transition-colors duration-300">
                        {mode.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 group-hover:text-gray-200 transition-colors duration-300">
                        {mode.description}
                      </p>

                      {/* Difficulty Badge */}
                      <div className="mb-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          mode.difficulty.includes('Dễ') ? 'bg-green-100 text-green-800' :
                          mode.difficulty.includes('Khó') ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {mode.difficulty}
                        </span>
                      </div>

                      {/* Features */}
                      <div className="space-y-2 mb-8">
                        {mode.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 + featureIndex * 0.1 }}
                            className="flex items-center space-x-2 text-sm text-gray-600 group-hover:text-gray-200 transition-colors duration-300"
                          >
                            <div className="w-2 h-2 bg-current rounded-full" />
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Play Button */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center justify-center space-x-2 text-lg font-semibold group-hover:text-white transition-colors duration-300"
                      >
                        <Play className="w-5 h-5" />
                        <span>Bắt đầu chơi</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Bottom Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-16"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Thời gian linh hoạt</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>Thành tích cá nhân</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>An toàn & Bảo mật</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
