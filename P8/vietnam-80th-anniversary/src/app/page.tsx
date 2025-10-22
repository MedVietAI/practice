'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, BookOpen, Trophy, Users, Star, Flag } from 'lucide-react'
import GameModeSelector from '@/components/GameModeSelector'
import HeroSection from '@/components/HeroSection'
import GameLauncher from '@/components/GameLauncher'
import HistorySection from '@/components/HistorySection'
import NewsImageGallery from '@/components/NewsImageGallery'
import CelebrationSection from '@/components/CelebrationSection'
import ResponsiveLayout from '@/components/ResponsiveLayout'

export default function Home() {
  const [currentView, setCurrentView] = useState<'home' | 'game' | 'history' | 'gallery' | 'about'>('home')

  return (
    <ResponsiveLayout currentView={currentView} setCurrentView={setCurrentView}>
        {currentView === 'home' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroSection />
            <CelebrationSection />
            <GameModeSelector onStartGame={() => setCurrentView('game')} />
          </motion.div>
        )}
        
        {currentView === 'game' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <GameLauncher onBack={() => setCurrentView('home')} />
          </motion.div>
        )}
        
        {currentView === 'history' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HistorySection />
          </motion.div>
        )}
        
        {currentView === 'gallery' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <NewsImageGallery 
              title="Hình Ảnh Kỷ Niệm 80 Năm Quốc Khánh"
              showFilters={true}
            />
          </motion.div>
        )}
        
        {currentView === 'about' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-red-800 mb-6 text-center">
                Về Trò Chơi
              </h2>
              <div className="prose prose-lg mx-auto">
                <p className="text-gray-700 mb-4">
                  Trò chơi tương tác này được thiết kế để kỷ niệm 80 năm Quốc khánh Việt Nam (2/9/2025).
                  Thông qua các hoạt động vui chơi và học tập, người chơi sẽ có cơ hội tìm hiểu sâu hơn về
                  lịch sử, văn hóa và truyền thống của dân tộc Việt Nam.
                </p>
                <h3 className="text-xl font-semibold text-red-700 mt-6 mb-3">
                  Tính Năng Chính:
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Nhiều chế độ chơi đa dạng (Q&A, Trắc nghiệm, RPG)</li>
                  <li>Tích hợp AI để tạo nội dung động</li>
                  <li>Giao diện thân thiện, hỗ trợ desktop và mobile</li>
                  <li>Nội dung được cập nhật từ các nguồn tin chính thống</li>
                  <li>Hành trình lịch sử với trải nghiệm du hành thời gian</li>
                  <li>Thư viện hình ảnh từ các nguồn tin uy tín</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
    </ResponsiveLayout>
  )
}

interface GameCardProps {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
}

function GameCard({ icon, title, description, onClick }: GameCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="bg-white rounded-lg shadow-lg p-6 cursor-pointer border-2 border-transparent hover:border-red-300 transition-all duration-300"
    >
      <div className="text-center">
        <div className="text-red-600 mb-4 flex justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </motion.div>
  )
}