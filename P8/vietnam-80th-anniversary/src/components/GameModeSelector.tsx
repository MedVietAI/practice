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
    <div className="py-16 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block"
        >
          <h2 className="text-4xl md:text-6xl font-black gradient-text mb-6">
            Chọn Chế Độ Chơi
          </h2>
        </motion.div>
        
        <motion.p 
          className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Mỗi chế độ chơi mang đến trải nghiệm học tập và giải trí khác nhau. 
          Hãy chọn chế độ phù hợp với sở thích của bạn!
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {gameModes.map((mode, index) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              y: -10,
              rotateY: 5
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartGame}
            className="game-card group cursor-pointer"
          >
            <div className={`game-card-header text-center relative overflow-hidden`}>
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10zm20 0c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>
              
              <motion.div 
                className="relative z-10"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  {mode.icon}
                </div>
                <h3 className="text-3xl font-black mb-4">{mode.title}</h3>
                <p className="text-lg opacity-90 leading-relaxed">{mode.description}</p>
              </motion.div>
              
              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full opacity-60"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="game-card-content">
              <div className="space-y-3 mb-8">
                {mode.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: featureIndex * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full vietnam-gradient text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                🎮 Bắt Đầu Chơi
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
        className="mt-16 celebration-banner text-center relative overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative z-10">
          <motion.div 
            className="flex items-center justify-center mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="mr-4"
            >
              <Flag className="w-12 h-12" />
            </motion.div>
            <h3 className="text-4xl font-black">Sự Kiện Đặc Biệt</h3>
          </motion.div>
          
          <motion.p 
            className="text-2xl mb-8 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Nhân dịp kỷ niệm 80 năm Quốc khánh, tất cả nội dung đều miễn phí!
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-6 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.span 
              className="bg-white bg-opacity-20 px-6 py-3 rounded-full font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              🎯 Nội dung chính thống
            </motion.span>
            <motion.span 
              className="bg-white bg-opacity-20 px-6 py-3 rounded-full font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              🤖 Tích hợp AI
            </motion.span>
            <motion.span 
              className="bg-white bg-opacity-20 px-6 py-3 rounded-full font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              📱 Hỗ trợ mobile
            </motion.span>
          </motion.div>
        </div>
        
        {/* Floating stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-300 text-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              ★
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
