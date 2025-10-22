'use client'

import { motion } from 'framer-motion'
import { Play, BookOpen, Star, Trophy, Users, Flag } from 'lucide-react'

interface GameModeSelectorProps {
  onStartGame: () => void
}

export default function GameModeSelector({ onStartGame }: GameModeSelectorProps) {
  const gameModes = [
    {
      id: 'qa',
      title: 'Câu Hỏi & Trả Lời',
      description: 'Kiểm tra kiến thức lịch sử Việt Nam qua các câu hỏi thú vị',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      features: ['Câu hỏi đa dạng', 'Gợi ý thông minh', 'Điểm số động']
    },
    {
      id: 'quiz',
      title: 'Trắc Nghiệm',
      description: 'Chọn đáp án đúng từ các lựa chọn được đưa ra',
      icon: <Star className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      features: ['Nhiều lựa chọn', 'Thời gian giới hạn', 'Xếp hạng']
    },
    {
      id: 'rpg',
      title: 'Hành Trình RPG',
      description: 'Khám phá lịch sử qua cuộc phiêu lưu tương tác',
      icon: <Trophy className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      features: ['Nhân vật riêng', 'Cốt truyện hấp dẫn', 'Thu thập thành tích']
    },
    {
      id: 'multiplayer',
      title: 'Thi Đấu',
      description: 'Cạnh tranh với bạn bè trong các thử thách',
      icon: <Users className="w-8 h-8" />,
      color: 'from-orange-500 to-orange-600',
      features: ['Đấu trực tuyến', 'Bảng xếp hạng', 'Giải thưởng']
    }
  ]

  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4">
          Chọn Chế Độ Chơi
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Mỗi chế độ chơi mang đến trải nghiệm học tập và giải trí khác nhau. 
          Hãy chọn chế độ phù hợp với sở thích của bạn!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {gameModes.map((mode, index) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartGame}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-red-300 transition-all duration-300"
          >
            <div className={`bg-gradient-to-r ${mode.color} p-6 text-white`}>
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  {mode.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{mode.title}</h3>
                  <p className="text-sm opacity-90">{mode.description}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-2 mb-6">
                {mode.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full bg-gradient-to-r ${mode.color} text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2`}
              >
                <Play className="w-5 h-5" />
                <span>Bắt Đầu Chơi</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Special Event Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-12 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-2xl p-8 text-white text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <Flag className="w-8 h-8 mr-3" />
          <h3 className="text-2xl font-bold">Sự Kiện Đặc Biệt</h3>
        </div>
        <p className="text-lg mb-4">
          Nhân dịp kỷ niệm 80 năm Quốc khánh, tất cả nội dung đều miễn phí!
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">🎯 Nội dung chính thống</span>
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">🤖 Tích hợp AI</span>
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">📱 Hỗ trợ mobile</span>
        </div>
      </motion.div>
    </div>
  )
}
