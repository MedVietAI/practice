'use client'

import { motion } from 'framer-motion'
import { Flag, Star, Users, Trophy } from 'lucide-react'

interface HeroSectionProps {
  onStartGame?: () => void
  onLearnHistory?: () => void
}

export default function HeroSection({ onStartGame, onLearnHistory }: HeroSectionProps) {
  return (
    <div className="relative text-center py-16 overflow-hidden">
      {/* Patriotic Background */}
      <div className="absolute inset-0 hero-bg opacity-10"></div>
      
      {/* Floating Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-500 text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
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

      {/* Main Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-16"
      >
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="vietnam-gradient p-6 rounded-full shadow-2xl animate-patriotic-glow"
          >
            <Flag className="w-20 h-20 text-white" />
          </motion.div>
        </div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-black mb-8 gradient-text"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Kỷ Niệm 80 Năm
          <br />
          <span className="block mt-4 text-4xl md:text-6xl">
            Quốc Khánh Việt Nam
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-2xl text-gray-800 max-w-4xl mx-auto mb-12 font-medium leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Khám phá lịch sử hào hùng và văn hóa truyền thống của dân tộc Việt Nam 
          thông qua trò chơi tương tác đầy thú vị và bổ ích.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartGame}
            className="btn-primary text-xl px-12 py-6 cursor-pointer"
          >
            🎮 Bắt Đầu Chơi Ngay
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLearnHistory}
            className="btn-secondary text-xl px-12 py-6 cursor-pointer"
          >
            📚 Tìm Hiểu Lịch Sử
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
      >
        <FeatureCard
          icon={<Star className="w-10 h-10" />}
          title="Học Tập Tương Tác"
          description="Học lịch sử qua các hoạt động vui chơi thú vị và bổ ích"
          color="from-yellow-500 to-orange-500"
          delay={0.1}
        />
        <FeatureCard
          icon={<Users className="w-10 h-10" />}
          title="Nhiều Chế Độ"
          description="Q&A, Trắc nghiệm, RPG và nhiều chế độ chơi khác"
          color="from-blue-500 to-purple-500"
          delay={0.2}
        />
        <FeatureCard
          icon={<Trophy className="w-10 h-10" />}
          title="Thành Tích"
          description="Thu thập điểm, mở khóa nội dung và đạt thành tựu"
          color="from-green-500 to-teal-500"
          delay={0.3}
        />
        <FeatureCard
          icon={<Flag className="w-10 h-10" />}
          title="Nguồn Tin Chính Thống"
          description="Nội dung từ các trang báo uy tín và chính thống"
          color="from-red-500 to-pink-500"
          delay={0.4}
        />
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-gradient-to-r from-red-600 to-yellow-500 rounded-2xl p-8 text-white"
      >
        <h2 className="text-2xl font-bold mb-4">
          Sẵn Sàng Bắt Đầu Hành Trình?
        </h2>
        <p className="text-lg mb-6 opacity-90">
          Chọn chế độ chơi yêu thích và bắt đầu khám phá lịch sử Việt Nam ngay hôm nay!
        </p>
      </motion.div>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  delay: number
}

function FeatureCard({ icon, title, description, color, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        rotateY: 5
      }}
      whileTap={{ scale: 0.95 }}
      className="feature-card group cursor-pointer"
    >
      <div className="text-center relative">
        {/* Icon with gradient background */}
        <motion.div 
          className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-white">
            {icon}
          </div>
        </motion.div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>
        
        {/* Hover effect line */}
        <motion.div 
          className={`h-1 bg-gradient-to-r ${color} rounded-full mt-4 mx-auto`}
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}
