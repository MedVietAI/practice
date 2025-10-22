'use client'

import { motion } from 'framer-motion'
import { Flag, Star, Users, Trophy } from 'lucide-react'

export default function HeroSection() {
  return (
    <div className="text-center py-12">
      {/* Main Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="bg-gradient-to-r from-red-600 to-yellow-500 p-4 rounded-full"
          >
            <Flag className="w-16 h-16 text-white" />
          </motion.div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-red-800 mb-6">
          Kỷ Niệm 80 Năm
          <br />
          <span className="text-yellow-600">Quốc Khánh Việt Nam</span>
        </h1>
        
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
          Khám phá lịch sử hào hùng và văn hóa truyền thống của dân tộc Việt Nam 
          thông qua trò chơi tương tác đầy thú vị và bổ ích.
        </p>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        <FeatureCard
          icon={<Star className="w-8 h-8" />}
          title="Học Tập Tương Tác"
          description="Học lịch sử qua các hoạt động vui chơi"
        />
        <FeatureCard
          icon={<Users className="w-8 h-8" />}
          title="Nhiều Chế Độ"
          description="Q&A, Trắc nghiệm, RPG và nhiều hơn nữa"
        />
        <FeatureCard
          icon={<Trophy className="w-8 h-8" />}
          title="Thành Tích"
          description="Thu thập điểm và mở khóa nội dung mới"
        />
        <FeatureCard
          icon={<Flag className="w-8 h-8" />}
          title="Nguồn Tin Chính Thống"
          description="Nội dung từ các trang báo uy tín"
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
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white rounded-lg shadow-lg p-6 border-2 border-transparent hover:border-red-300 transition-all duration-300"
    >
      <div className="text-center">
        <div className="text-red-600 mb-4 flex justify-center">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </motion.div>
  )
}
