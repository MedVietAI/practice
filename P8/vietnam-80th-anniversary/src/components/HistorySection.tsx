'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin, Users, Flag, Camera, BookOpen, Play, Pause, RotateCcw } from 'lucide-react'
import AIClient from '@/lib/ai-client'
import ImageGenerator from '@/lib/image-generator'

interface HistoricalEvent {
  id: string
  title: string
  date: string
  location: string
  description: string
  keyFigures: string[]
  significance: string
  imageUrl?: string
  audioNarration?: string
}

interface TimeTravelState {
  currentYear: number
  currentEvent: HistoricalEvent | null
  isPlaying: boolean
  progress: number
  timeline: HistoricalEvent[]
}

export default function HistorySection() {
  const [timeTravelState, setTimeTravelState] = useState<TimeTravelState>({
    currentYear: 1945,
    currentEvent: null,
    isPlaying: false,
    progress: 0,
    timeline: []
  })

  const [player, setPlayer] = useState({
    name: 'Nhà Sử Học Thời Gian',
    level: 1,
    experience: 0,
    achievements: [] as string[],
    currentLocation: 'Hà Nội, 1945'
  })

  const [showAchievement, setShowAchievement] = useState<string | null>(null)

  useEffect(() => {
    loadHistoricalTimeline()
  }, [])

  const loadHistoricalTimeline = async () => {
    try {
      // Load historical events for 80th anniversary celebrations
      const events: HistoricalEvent[] = [
        {
          id: 'independence-declaration',
          title: 'Tuyên Ngôn Độc Lập 2/9/1945',
          date: '2/9/1945',
          location: 'Quảng trường Ba Đình, Hà Nội',
          description: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa',
          keyFigures: ['Hồ Chí Minh', 'Võ Nguyên Giáp', 'Phạm Văn Đồng'],
          significance: 'Đánh dấu sự ra đời của nước Việt Nam độc lập, tự do'
        },
        {
          id: 'august-revolution',
          title: 'Cách Mạng Tháng Tám 1945',
          date: '19/8/1945',
          location: 'Toàn quốc',
          description: 'Cuộc tổng khởi nghĩa giành chính quyền trên toàn quốc',
          keyFigures: ['Hồ Chí Minh', 'Võ Nguyên Giáp', 'Trường Chinh'],
          significance: 'Mở ra kỷ nguyên mới cho dân tộc Việt Nam'
        },
        {
          id: 'dien-bien-phu',
          title: 'Chiến Thắng Điện Biên Phủ 1954',
          date: '7/5/1954',
          location: 'Điện Biên Phủ, Lai Châu',
          description: 'Chiến thắng quyết định kết thúc chế độ thực dân Pháp',
          keyFigures: ['Võ Nguyên Giáp', 'Hoàng Văn Thái', 'Lê Trọng Tấn'],
          significance: 'Khẳng định ý chí độc lập, tự do của dân tộc Việt Nam'
        },
        {
          id: 'reunification',
          title: 'Giải Phóng Miền Nam 1975',
          date: '30/4/1975',
          location: 'Sài Gòn (TP.HCM)',
          description: 'Thống nhất đất nước, kết thúc chiến tranh',
          keyFigures: ['Lê Duẩn', 'Phạm Văn Đồng', 'Võ Nguyên Giáp'],
          significance: 'Hoàn thành sự nghiệp giải phóng dân tộc'
        }
      ]

      setTimeTravelState(prev => ({
        ...prev,
        timeline: events,
        currentEvent: events[0]
      }))
    } catch (error) {
      console.error('Error loading timeline:', error)
    }
  }

  const startTimeTravel = () => {
    setTimeTravelState(prev => ({ ...prev, isPlaying: true }))
    
    // Simulate time travel progression
    const interval = setInterval(() => {
      setTimeTravelState(prev => {
        const newProgress = prev.progress + 2
        if (newProgress >= 100) {
          clearInterval(interval)
          return { ...prev, isPlaying: false, progress: 100 }
        }
        
        // Update current event based on progress
        const eventIndex = Math.floor((newProgress / 100) * prev.timeline.length)
        const newEvent = prev.timeline[Math.min(eventIndex, prev.timeline.length - 1)]
        
        return {
          ...prev,
          progress: newProgress,
          currentEvent: newEvent,
          currentYear: parseInt(newEvent?.date.split('/')[2] || '1945')
        }
      })
    }, 100)

    return () => clearInterval(interval)
  }

  const pauseTimeTravel = () => {
    setTimeTravelState(prev => ({ ...prev, isPlaying: false }))
  }

  const resetTimeTravel = () => {
    setTimeTravelState(prev => ({
      ...prev,
      isPlaying: false,
      progress: 0,
      currentEvent: prev.timeline[0],
      currentYear: 1945
    }))
  }

  const jumpToEvent = (event: HistoricalEvent) => {
    setTimeTravelState(prev => ({
      ...prev,
      currentEvent: event,
      currentYear: parseInt(event.date.split('/')[2]),
      progress: (prev.timeline.indexOf(event) / prev.timeline.length) * 100
    }))
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold text-red-800 mb-4">
          Hành Trình Lịch Sử
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Du hành ngược thời gian để chứng kiến những khoảnh khắc lịch sử hào hùng của dân tộc Việt Nam
        </p>
      </motion.div>

      {/* Player Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-red-600 to-yellow-500 p-3 rounded-full">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{player.name}</h3>
              <p className="text-sm text-gray-600">Cấp độ {player.level} - {player.currentLocation}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{timeTravelState.currentYear}</div>
              <div className="text-sm text-gray-600">Năm hiện tại</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{timeTravelState.timeline.length}</div>
              <div className="text-sm text-gray-600">Sự kiện</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Time Travel Interface */}
        <div className="lg:col-span-2">
          <motion.div
            key={timeTravelState.currentEvent?.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Event Header */}
            <div className="bg-gradient-to-r from-red-600 to-yellow-500 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6" />
                  <span className="font-semibold">{timeTravelState.currentEvent?.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">{timeTravelState.currentEvent?.date}</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">
                {timeTravelState.currentEvent?.title}
              </h3>
              
              <p className="text-lg opacity-90">
                {timeTravelState.currentEvent?.description}
              </p>
            </div>

            {/* Event Content */}
            <div className="p-6">
              {/* Key Figures */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Nhân vật lịch sử
                </h4>
                <div className="flex flex-wrap gap-2">
                  {timeTravelState.currentEvent?.keyFigures.map((figure, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {figure}
                    </span>
                  ))}
                </div>
              </div>

              {/* Significance */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Flag className="w-5 h-5 mr-2 text-red-600" />
                  Ý nghĩa lịch sử
                </h4>
                <p className="text-gray-700 bg-red-50 p-4 rounded-lg">
                  {timeTravelState.currentEvent?.significance}
                </p>
              </div>

              {/* Time Travel Controls */}
              <div className="flex items-center justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={timeTravelState.isPlaying ? pauseTimeTravel : startTimeTravel}
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2"
                >
                  {timeTravelState.isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span>{timeTravelState.isPlaying ? 'Tạm Dừng' : 'Bắt Đầu'}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetTimeTravel}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Khởi Động Lại</span>
                </motion.button>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Tiến độ du hành</span>
                  <span className="text-sm font-medium text-gray-600">{Math.round(timeTravelState.progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-red-500 to-yellow-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${timeTravelState.progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline Sidebar */}
        <div className="space-y-6">
          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
              Dòng Thời Gian
            </h3>
            
            <div className="space-y-4">
              {timeTravelState.timeline.map((event, index) => (
                <motion.div
                  key={event.id}
                  whileHover={{ scale: 1.02, x: 5 }}
                  onClick={() => jumpToEvent(event)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    timeTravelState.currentEvent?.id === event.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      timeTravelState.currentEvent?.id === event.id ? 'bg-red-500' : 'bg-gray-300'
                    }`} />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm">{event.title}</h4>
                      <p className="text-xs text-gray-600">{event.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          {player.achievements.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Flag className="w-6 h-6 mr-2 text-yellow-600" />
                Thành Tựu
              </h3>
              <div className="space-y-2">
                {player.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-sm text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Achievement Popup */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-black bg-opacity-50 absolute inset-0" />
            <div className="bg-white rounded-xl p-8 text-center relative z-10 max-w-md mx-4">
              <Flag className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Thành tựu mới!</h3>
              <p className="text-lg text-gray-600 mb-4">{showAchievement}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAchievement(null)}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Tuyệt vời!
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
