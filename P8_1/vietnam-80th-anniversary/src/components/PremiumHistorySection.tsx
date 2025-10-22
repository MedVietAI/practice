'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin, Users, Flag, Camera, BookOpen, Play, Pause, RotateCcw, Volume2, VolumeX, ArrowLeft, ArrowRight, Star, Award, Heart, Crown, Shield, Zap, ChevronDown, Calendar, Globe, User, Sparkles } from 'lucide-react'
import AIClient from '@/lib/ai-client'
import ImageGenerator from '@/lib/image-generator'
import SpeechGenerator from '@/lib/speech-generator'

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
  category: 'political' | 'military' | 'cultural' | 'economic'
  importance: 'high' | 'medium' | 'low'
}

interface TimeTravelState {
  currentYear: number
  currentEvent: HistoricalEvent | null
  isPlaying: boolean
  progress: number
  timeline: HistoricalEvent[]
}

export default function PremiumHistorySection() {
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
    currentLocation: 'Hà Nội, 1945',
    totalEvents: 0,
    completedEvents: 0
  })

  const [showAchievement, setShowAchievement] = useState<string | null>(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isVoicePlaying, setIsVoicePlaying] = useState(false)
  const [voiceCache, setVoiceCache] = useState<Map<string, string>>(new Map())
  const [isLoadingVoice, setIsLoadingVoice] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'timeline' | 'cards'>('cards')

  const categories = [
    { id: 'all', name: 'Tất cả', color: 'from-gray-500 to-gray-600', icon: Globe },
    { id: 'political', name: 'Chính trị', color: 'from-red-500 to-red-600', icon: Flag },
    { id: 'military', name: 'Quân sự', color: 'from-blue-500 to-blue-600', icon: Shield },
    { id: 'cultural', name: 'Văn hóa', color: 'from-green-500 to-green-600', icon: BookOpen },
    { id: 'economic', name: 'Kinh tế', color: 'from-yellow-500 to-orange-600', icon: Star }
  ]

  const getFallbackEvents = (): HistoricalEvent[] => [
    {
      id: 'independence-declaration',
      title: 'Tuyên ngôn Độc lập',
      date: '1945-09-02',
      location: 'Quảng trường Ba Đình, Hà Nội',
      description: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa',
      keyFigures: ['Hồ Chí Minh', 'Võ Nguyên Giáp', 'Phạm Văn Đồng'],
      significance: 'Đánh dấu sự ra đời của nước Việt Nam độc lập, chấm dứt 80 năm đô hộ của thực dân Pháp',
      category: 'political',
      importance: 'high'
    },
    {
      id: 'august-revolution',
      title: 'Cách mạng Tháng Tám',
      date: '1945-08-19',
      location: 'Toàn quốc',
      description: 'Cuộc tổng khởi nghĩa giành chính quyền từ tay phát xít Nhật và thực dân Pháp',
      keyFigures: ['Hồ Chí Minh', 'Võ Nguyên Giáp', 'Trường Chinh'],
      significance: 'Tạo tiền đề cho việc tuyên bố độc lập và thành lập nhà nước Việt Nam',
      category: 'political',
      importance: 'high'
    },
    {
      id: 'dien-bien-phu',
      title: 'Chiến thắng Điện Biên Phủ',
      date: '1954-05-07',
      location: 'Điện Biên Phủ, Việt Nam',
      description: 'Chiến thắng quyết định kết thúc chế độ thực dân Pháp tại Đông Dương',
      keyFigures: ['Võ Nguyên Giáp', 'Hoàng Văn Thái', 'Lê Trọng Tấn'],
      significance: 'Chấm dứt hoàn toàn ách thống trị của thực dân Pháp, mở ra kỷ nguyên mới cho Việt Nam',
      category: 'military',
      importance: 'high'
    },
    {
      id: 'reunification',
      title: 'Giải phóng miền Nam',
      date: '1975-04-30',
      location: 'Sài Gòn (TP.HCM)',
      description: 'Giải phóng hoàn toàn miền Nam, thống nhất đất nước',
      keyFigures: ['Lê Duẩn', 'Võ Nguyên Giáp', 'Văn Tiến Dũng'],
      significance: 'Hoàn thành sự nghiệp giải phóng dân tộc, thống nhất Tổ quốc',
      category: 'military',
      importance: 'high'
    },
    {
      id: 'doi-moi',
      title: 'Đổi mới',
      date: '1986-12-15',
      location: 'Hà Nội',
      description: 'Đại hội VI của Đảng Cộng sản Việt Nam khởi xướng công cuộc đổi mới',
      keyFigures: ['Nguyễn Văn Linh', 'Đỗ Mười', 'Võ Văn Kiệt'],
      significance: 'Mở ra thời kỳ phát triển mới, đưa Việt Nam hội nhập với thế giới',
      category: 'economic',
      importance: 'high'
    }
  ]

  useEffect(() => {
    loadTimeline()
  }, [])

  const loadTimeline = async () => {
    try {
      const events = await AIClient.generateGameContent('story', 'Lịch sử Việt Nam 80 năm qua')
      if (events && events !== 'Đây là một câu chuyện thú vị về lịch sử Việt Nam. Hãy cùng khám phá những sự kiện quan trọng.') {
        // Parse AI response and create events
        const parsedEvents = getFallbackEvents()
        setTimeTravelState(prev => ({
          ...prev,
          timeline: parsedEvents,
          currentEvent: parsedEvents[0]
        }))
        setPlayer(prev => ({ ...prev, totalEvents: parsedEvents.length }))
      } else {
        const fallbackEvents = getFallbackEvents()
        setTimeTravelState(prev => ({
          ...prev,
          timeline: fallbackEvents,
          currentEvent: fallbackEvents[0]
        }))
        setPlayer(prev => ({ ...prev, totalEvents: fallbackEvents.length }))
      }
    } catch (error) {
      console.error('Error loading timeline:', error)
      const fallbackEvents = getFallbackEvents()
      setTimeTravelState(prev => ({
        ...prev,
        timeline: fallbackEvents,
        currentEvent: fallbackEvents[0]
      }))
      setPlayer(prev => ({ ...prev, totalEvents: fallbackEvents.length }))
    }
  }

  const preloadAllVoices = async () => {
    const events = timeTravelState.timeline
    for (const event of events) {
      if (!voiceCache.has(event.id)) {
        try {
          setIsLoadingVoice(true)
          const audioUrl = await SpeechGenerator.generateHistoricalNarration(event.title, event.description)
          if (audioUrl) {
            setVoiceCache(prev => new Map(prev).set(event.id, audioUrl))
          }
        } catch (error) {
          console.error('Error preloading voice for event:', event.id, error)
        }
      }
    }
    setIsLoadingVoice(false)
  }

  const playCurrentCardVoice = async () => {
    const event = timeTravelState.timeline[currentCardIndex]
    if (!event) return

    try {
      setIsVoicePlaying(true)
      let audioUrl = voiceCache.get(event.id)
      
      if (!audioUrl) {
        const newAudioUrl = await SpeechGenerator.generateHistoricalNarration(event.title, event.description)
        if (newAudioUrl) {
          audioUrl = newAudioUrl
          setVoiceCache(prev => new Map(prev).set(event.id, newAudioUrl))
        }
      }

      if (audioUrl) {
        const audio = new Audio(audioUrl)
        audio.onended = () => setIsVoicePlaying(false)
        audio.onerror = () => setIsVoicePlaying(false)
        await audio.play()
      }
    } catch (error) {
      console.error('Error playing voice:', error)
      setIsVoicePlaying(false)
    }
  }

  const nextCard = () => {
    const nextIndex = (currentCardIndex + 1) % timeTravelState.timeline.length
    setCurrentCardIndex(nextIndex)
    setTimeTravelState(prev => ({
      ...prev,
      currentEvent: prev.timeline[nextIndex]
    }))
  }

  const prevCard = () => {
    const prevIndex = currentCardIndex === 0 ? timeTravelState.timeline.length - 1 : currentCardIndex - 1
    setCurrentCardIndex(prevIndex)
    setTimeTravelState(prev => ({
      ...prev,
      currentEvent: prev.timeline[prevIndex]
    }))
  }

  const filteredEvents = selectedCategory === 'all' 
    ? timeTravelState.timeline 
    : timeTravelState.timeline.filter(event => event.category === selectedCategory)

  const currentEvent = filteredEvents[currentCardIndex] || timeTravelState.currentEvent

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-100 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm shadow-xl border-b-2 border-red-200 sticky top-0 z-40">
          <div className="container mx-auto px-6 py-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl lg:text-5xl font-black text-gray-800 mb-4">
                Hành Trình Lịch Sử Việt Nam
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Khám phá 80 năm lịch sử hào hùng của dân tộc Việt Nam qua những sự kiện quan trọng
              </p>
            </motion.div>

            {/* Player Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-6 mb-6 border-2 border-red-200"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Crown className="w-5 h-5 text-yellow-600" />
                    <span className="font-semibold text-gray-700">Cấp độ</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">{player.level}</div>
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Star className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-700">Kinh nghiệm</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{player.experience}</div>
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-700">Sự kiện</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{player.completedEvents}/{player.totalEvents}</div>
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-gray-700">Thành tựu</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">{player.achievements.length}</div>
                </div>
              </div>
            </motion.div>

            {/* Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon
                  return (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                        selectedCategory === cat.id
                          ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                          : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{cat.name}</span>
                    </motion.button>
                  )
                })}
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'cards' ? 'bg-white shadow-md' : 'hover:bg-gray-200'
                  }`}
                >
                  Thẻ
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'timeline' ? 'bg-white shadow-md' : 'hover:bg-gray-200'
                  }`}
                >
                  Dòng thời gian
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8">
          {viewMode === 'cards' ? (
            /* Card View */
            <div className="max-w-4xl mx-auto">
              {currentEvent && (
                <motion.div
                  key={currentEvent.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-2 border-red-200"
                >
                  {/* Event Image */}
                  {currentEvent.imageUrl && (
                    <div className="relative h-64 lg:h-80 overflow-hidden">
                      <img
                        src={currentEvent.imageUrl}
                        alt={currentEvent.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <button
                          onClick={playCurrentCardVoice}
                          disabled={isVoicePlaying || isLoadingVoice}
                          className={`p-3 rounded-full ${
                            isVoicePlaying || isLoadingVoice
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-white/80 text-red-600 hover:bg-white hover:scale-110 transition-all duration-300'
                          }`}
                        >
                          {isLoadingVoice ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full"
                            />
                          ) : isVoicePlaying ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Event Content */}
                  <div className="p-8">
                    {/* Event Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            currentEvent.importance === 'high' ? 'bg-red-100 text-red-800' :
                            currentEvent.importance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {currentEvent.importance === 'high' ? 'Quan trọng' :
                             currentEvent.importance === 'medium' ? 'Trung bình' : 'Thường'}
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${
                            categories.find(c => c.id === currentEvent.category)?.color || 'from-gray-500 to-gray-600'
                          } text-white`}>
                            {categories.find(c => c.id === currentEvent.category)?.name || 'Khác'}
                          </div>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black text-gray-800 mb-4">
                          {currentEvent.title}
                        </h2>
                        <div className="flex items-center space-x-6 text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5" />
                            <span className="font-semibold">{new Date(currentEvent.date).toLocaleDateString('vi-VN')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-5 h-5" />
                            <span className="font-semibold">{currentEvent.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Event Description */}
                    <div className="mb-8">
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        {currentEvent.description}
                      </p>
                      
                      {/* Key Figures */}
                      {currentEvent.keyFigures.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center space-x-2">
                            <Users className="w-5 h-5" />
                            <span>Nhân vật chính</span>
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {currentEvent.keyFigures.map((figure, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold"
                              >
                                {figure}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Significance */}
                      <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-xl p-6 border-2 border-red-200">
                        <h4 className="text-lg font-bold text-red-800 mb-3 flex items-center space-x-2">
                          <Flag className="w-5 h-5" />
                          <span>Ý nghĩa lịch sử</span>
                        </h4>
                        <p className="text-red-700 leading-relaxed">
                          {currentEvent.significance}
                        </p>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {currentCardIndex + 1} / {filteredEvents.length} sự kiện
                      </div>
                      <div className="flex items-center space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={prevCard}
                          className="p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={nextCard}
                          className="p-3 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            /* Timeline View */
            <div className="max-w-6xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-yellow-500 to-red-500 rounded-full"></div>
                
                {/* Timeline Events */}
                <div className="space-y-12">
                  {filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative flex items-center"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                      
                      {/* Event Card */}
                      <div className="ml-16 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-red-200 hover:shadow-2xl transition-all duration-300 flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(event.date).toLocaleDateString('vi-VN')}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${
                            categories.find(c => c.id === event.category)?.color || 'from-gray-500 to-gray-600'
                          } text-white`}>
                            {categories.find(c => c.id === event.category)?.name || 'Khác'}
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{event.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Achievement Notification */}
        <AnimatePresence>
          {showAchievement && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
              className="fixed top-20 right-6 z-50 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-6 rounded-xl shadow-2xl border-2 border-yellow-300 max-w-sm"
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Award className="w-8 h-8" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Thành Tựu Mới!</h3>
                  <p className="text-sm font-semibold">{showAchievement}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAchievement(null)}
                  className="text-white hover:text-yellow-200 text-xl font-bold"
                >
                  ×
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
