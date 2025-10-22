'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Trophy, Star, Users } from 'lucide-react'
import QuizGame from './games/QuizGame'
import QAGame from './games/QAGame'
import RPGGame from './games/RPGGame'

type GameMode = 'quiz' | 'qa' | 'rpg' | null

interface GameLauncherProps {
  onBack: () => void
}

export default function GameLauncher({ onBack }: GameLauncherProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode>(null)
  const [gameResults, setGameResults] = useState<any>(null)

  const gameModes = [
    {
      id: 'quiz' as GameMode,
      title: 'Trắc Nghiệm',
      description: 'Chọn đáp án đúng từ các lựa chọn',
      icon: <Star className="w-8 h-8" />,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'qa' as GameMode,
      title: 'Câu Hỏi & Trả Lời',
      description: 'Trả lời câu hỏi mở về lịch sử Việt Nam',
      icon: <Trophy className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'rpg' as GameMode,
      title: 'Hành Trình RPG',
      description: 'Khám phá lịch sử qua cuộc phiêu lưu',
      icon: <Users className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const handleGameComplete = (results: any) => {
    setGameResults(results)
  }

  const resetGame = () => {
    setSelectedMode(null)
    setGameResults(null)
  }

  if (gameResults) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto p-6"
      >
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Chúc Mừng!
          </h2>
          
          <div className="space-y-4 mb-8">
            {gameResults.score !== undefined && (
              <div className="bg-yellow-100 rounded-lg p-4">
                <p className="text-lg font-semibold text-yellow-800">
                  Điểm số: {gameResults.score}
                  {gameResults.total && `/${gameResults.total}`}
                </p>
              </div>
            )}
            
            {gameResults.level && (
              <div className="bg-blue-100 rounded-lg p-4">
                <p className="text-lg font-semibold text-blue-800">
                  Cấp độ đạt được: {gameResults.level}
                </p>
              </div>
            )}
            
            {gameResults.achievements && gameResults.achievements.length > 0 && (
              <div className="bg-green-100 rounded-lg p-4">
                <p className="text-lg font-semibold text-green-800 mb-2">
                  Thành tựu đạt được:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {gameResults.achievements.map((achievement: string, index: number) => (
                    <span
                      key={index}
                      className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Chơi Lại
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Về Trang Chủ
            </motion.button>
          </div>
        </div>
      </motion.div>
    )
  }

  if (selectedMode) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-6xl mx-auto p-6"
      >
        <div className="flex items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại</span>
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {selectedMode === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <QuizGame
                topic="Lịch sử Việt Nam - Kỷ niệm 80 năm Quốc khánh"
                difficulty="medium"
                onComplete={(score, total) => handleGameComplete({ score, total })}
              />
            </motion.div>
          )}

          {selectedMode === 'qa' && (
            <motion.div
              key="qa"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <QAGame
                topic="Lịch sử Việt Nam - Kỷ niệm 80 năm Quốc khánh"
                onComplete={(score) => handleGameComplete({ score })}
              />
            </motion.div>
          )}

          {selectedMode === 'rpg' && (
            <motion.div
              key="rpg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <RPGGame
                onComplete={(player) => handleGameComplete(player)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-6"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4">
          Chọn Chế Độ Chơi
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Mỗi chế độ chơi mang đến trải nghiệm học tập và giải trí khác nhau. 
          Hãy chọn chế độ phù hợp với sở thích của bạn!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {gameModes.map((mode, index) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMode(mode.id)}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-red-300 transition-all duration-300"
          >
            <div className={`bg-gradient-to-r ${mode.color} p-8 text-white text-center`}>
              <div className="mb-4">
                {mode.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{mode.title}</h3>
              <p className="text-sm opacity-90">{mode.description}</p>
            </div>
            
            <div className="p-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full bg-gradient-to-r ${mode.color} text-white py-4 px-6 rounded-lg font-semibold text-lg`}
              >
                Bắt Đầu Chơi
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
