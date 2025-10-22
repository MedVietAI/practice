'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sword, Shield, Heart, Star, MapPin, BookOpen, Trophy, User, Calendar, Volume2, VolumeX, ArrowRight, RotateCcw, Home } from 'lucide-react'
import AIClient from '@/lib/ai-client'
import ImageGenerator from '@/lib/image-generator'
import SpeechGenerator from '@/lib/speech-generator'

interface Player {
  name: string
  level: number
  experience: number
  health: number
  maxHealth: number
  achievements: string[]
}

interface GameState {
  currentScenario: string
  description: string
  options: string[]
  historicalContext: string
  backgroundImage?: string
  characterImage?: string
  characterName?: string
  characterRole?: string
  location?: string
  year?: string
}

interface Character {
  name: string
  role: string
  image: string
  description: string
}

interface RPGGameProps {
  onComplete: (player: Player) => void
}

export default function RPGGame({ onComplete }: RPGGameProps) {
  const [player, setPlayer] = useState<Player>({
    name: 'Nhà Sử Học Trẻ',
    level: 1,
    experience: 0,
    health: 100,
    maxHealth: 100,
    achievements: []
  })

  const [gameState, setGameState] = useState<GameState>({
    currentScenario: 'Bắt đầu hành trình khám phá lịch sử Việt Nam',
    description: 'Bạn là một nhà sử học trẻ, được giao nhiệm vụ khám phá và tìm hiểu về lịch sử hào hùng của dân tộc Việt Nam. Hành trình của bạn bắt đầu từ thời kỳ dựng nước và giữ nước.',
    options: [
      'Khám phá thời kỳ dựng nước Văn Lang',
      'Tìm hiểu về cuộc kháng chiến chống Pháp',
      'Nghiên cứu về Cách mạng Tháng Tám 1945'
    ],
    historicalContext: 'Việt Nam có lịch sử hàng nghìn năm với nhiều triều đại và sự kiện quan trọng.',
    characterName: 'Hướng Dẫn Viên Lịch Sử',
    characterRole: 'Người dẫn đường',
    location: 'Hà Nội',
    year: '2025'
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isVoicePlaying, setIsVoicePlaying] = useState(false)
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null)
  const [voiceCache, setVoiceCache] = useState<Map<string, string>>(new Map())
  const [showAchievement, setShowAchievement] = useState<string | null>(null)

  // Generate character for current scenario
  const generateCharacter = async (scenario: string) => {
    try {
      const characterPrompt = `Tạo một nhân vật hướng dẫn lịch sử Việt Nam cho tình huống: ${scenario}. Nhân vật nên là một chuyên gia lịch sử, có kiến thức sâu rộng về Việt Nam.`
      const characterImage = await ImageGenerator.generateImage(characterPrompt, 1)
      
      const character: Character = {
        name: gameState.characterName || 'Hướng Dẫn Viên',
        role: gameState.characterRole || 'Chuyên Gia Lịch Sử',
        image: characterImage[0]?.url || '',
        description: `Chuyên gia lịch sử Việt Nam với kiến thức sâu rộng về ${scenario}`
      }
      
      setCurrentCharacter(character)
      return character
    } catch (error) {
      console.error('Error generating character:', error)
      return null
    }
  }

  // Generate background image for scenario
  const generateBackgroundImage = async (scenario: string) => {
    try {
      const backgroundPrompt = `Tạo hình ảnh nền lịch sử Việt Nam cho: ${scenario}. Hình ảnh nên thể hiện không khí lịch sử, có thể là cảnh quan, kiến trúc, hoặc sự kiện lịch sử.`
      const backgroundImages = await ImageGenerator.generateImage(backgroundPrompt, 1)
      
      if (backgroundImages[0]?.url) {
        setGameState(prev => ({
          ...prev,
          backgroundImage: backgroundImages[0].url
        }))
      }
    } catch (error) {
      console.error('Error generating background image:', error)
    }
  }

  // Play character voice
  const playCharacterVoice = async (text: string) => {
    try {
      setIsVoicePlaying(true)
      const cacheKey = `voice_${text.substring(0, 50)}`
      
      let audioUrl = voiceCache.get(cacheKey)
      if (!audioUrl) {
        const newAudioUrl = await SpeechGenerator.generateSpeech(text, 'Zephyr')
        if (newAudioUrl) {
          audioUrl = newAudioUrl
          setVoiceCache(prev => new Map(prev).set(cacheKey, newAudioUrl))
        }
      }
      
      if (!audioUrl) {
        console.error('Failed to generate audio URL')
        setIsVoicePlaying(false)
        return
      }
      
      const audio = new Audio(audioUrl)
      audio.onended = () => setIsVoicePlaying(false)
      audio.onerror = () => setIsVoicePlaying(false)
      await audio.play()
    } catch (error) {
      console.error('Error playing character voice:', error)
      setIsVoicePlaying(false)
    }
  }

  const handleOptionSelect = async (option: string, index: number) => {
    setIsLoading(true)
    
    try {
      // Generate new scenario based on player choice
      const newScenario = await AIClient.generateRPGContent(gameState.currentScenario, option)
      
      // Update player stats
      const newExperience = player.experience + 10
      const newLevel = Math.floor(newExperience / 100) + 1
      const newHealth = Math.min(player.maxHealth, player.health + 5)
      
      setPlayer(prev => ({
        ...prev,
        experience: newExperience,
        level: newLevel,
        health: newHealth
      }))

      // Check for achievements
      const newAchievements = [...player.achievements]
      if (newLevel > player.level && !newAchievements.includes(`Đạt cấp độ ${newLevel}`)) {
        newAchievements.push(`Đạt cấp độ ${newLevel}`)
        setShowAchievement(`Đạt cấp độ ${newLevel}`)
      }

      // Generate character and background image
      try {
        const [character, images] = await Promise.all([
          generateCharacter(option),
          ImageGenerator.generateHistoricalScene(option)
        ])
        
        if (images.length > 0) {
          setGameState(prev => ({
            ...prev,
            ...newScenario,
            backgroundImage: images[0].url
          }))
        } else {
          setGameState(prev => ({
            ...prev,
            ...newScenario
          }))
        }
        
        // Play character voice if character was generated
        if (character) {
          await playCharacterVoice(newScenario.description)
        }
      } catch {
        setGameState(prev => ({
          ...prev,
          ...newScenario
        }))
      }

      // Check if game should end
      if (newLevel >= 5) {
        setTimeout(() => onComplete({
          ...player,
          experience: newExperience,
          level: newLevel,
          health: newHealth,
          achievements: newAchievements
        }), 2000)
      }

    } catch (error) {
      console.error('Error processing choice:', error)
      // Enhanced fallback scenarios
      const fallbackScenarios = [
        {
          description: `Bạn đã chọn: ${option}. Đây là một quyết định quan trọng trong hành trình khám phá lịch sử Việt Nam. Bạn cảm thấy mình đã học được nhiều điều mới mẻ.`,
          options: [
            'Tiếp tục khám phá thời kỳ khác',
            'Tìm hiểu sâu hơn về chủ đề này',
            'Quay lại lựa chọn trước'
          ],
          historicalContext: 'Lịch sử Việt Nam rất phong phú và đa dạng, mỗi thời kỳ đều có những đặc điểm riêng biệt.'
        },
        {
          description: `Thông qua lựa chọn "${option}", bạn đã hiểu thêm về lịch sử hào hùng của dân tộc. Kiến thức của bạn ngày càng được mở rộng.`,
          options: [
            'Khám phá thêm về văn hóa truyền thống',
            'Tìm hiểu về các anh hùng dân tộc',
            'Nghiên cứu về các cuộc kháng chiến'
          ],
          historicalContext: 'Việt Nam có truyền thống đấu tranh bảo vệ độc lập dân tộc rất lâu đời.'
        }
      ]
      
      const randomScenario = fallbackScenarios[Math.floor(Math.random() * fallbackScenarios.length)]
      
      setGameState(prev => ({
        ...prev,
        description: randomScenario.description,
        options: randomScenario.options,
        historicalContext: randomScenario.historicalContext
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const getHealthColor = () => {
    const percentage = (player.health / player.maxHealth) * 100
    if (percentage > 70) return 'text-green-600'
    if (percentage > 30) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Player Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800">{player.name}</h3>
              <p className="text-sm text-gray-600">Cấp độ {player.level}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Máu:</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${player.health > 70 ? 'bg-green-500' : player.health > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(player.health / player.maxHealth) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className={`text-sm font-bold ${getHealthColor()}`}>
                  {player.health}/{player.maxHealth}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Kinh nghiệm:</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-yellow-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((player.experience % 100) / 100) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-sm font-bold text-yellow-600">
                  {player.experience}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        {player.achievements.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Thành tựu:</h4>
            <div className="flex flex-wrap gap-2">
              {player.achievements.map((achievement, index) => (
                <span
                  key={index}
                  className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Game Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Game Area */}
        <div className="lg:col-span-2">
          <motion.div
            key={gameState.currentScenario}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Background Image */}
            {gameState.backgroundImage && (
              <div className="h-48 bg-cover bg-center relative">
                <img
                  src={gameState.backgroundImage}
                  alt="Historical scene"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30" />
                <div className="absolute bottom-4 left-4 text-white">
                  <MapPin className="w-5 h-5 inline mr-2" />
                  <span className="font-semibold">{gameState.currentScenario}</span>
                </div>
              </div>
            )}

            <div className="p-6">
              {/* Character Display */}
              {currentCharacter && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-300">
                      <img
                        src={currentCharacter.image}
                        alt={currentCharacter.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `data:image/svg+xml;base64,${Buffer.from(`
                            <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="32" cy="32" r="30" fill="#3b82f6"/>
                              <text x="32" y="38" font-family="Arial" font-size="24" fill="white" text-anchor="middle">👤</text>
                            </svg>
                          `).toString('base64')}`
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-blue-800">{currentCharacter.name}</h3>
                      <p className="text-sm text-blue-600">{currentCharacter.role}</p>
                      <p className="text-xs text-blue-500 mt-1">{currentCharacter.description}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => playCharacterVoice(gameState.description)}
                      disabled={isVoicePlaying}
                      className={`p-2 rounded-lg ${
                        isVoicePlaying
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isVoicePlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {gameState.currentScenario}
              </h2>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                {gameState.description}
              </p>

              {/* Options */}
              <div className="space-y-3">
                {gameState.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOptionSelect(option, index)}
                    disabled={isLoading}
                    className="w-full p-4 text-left bg-gradient-to-r from-red-50 to-yellow-50 border-2 border-red-200 hover:border-red-400 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-red-600">{index + 1}.</span>
                      <span className="text-gray-800">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Historical Context */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6"
          >
            <div className="flex items-center space-x-2 mb-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Bối cảnh lịch sử</h3>
            </div>
            <p className="text-blue-700 text-sm leading-relaxed">
              {gameState.historicalContext}
            </p>
          </motion.div>

          {/* Loading State */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-4 border-yellow-200 border-t-yellow-600 rounded-full mx-auto mb-3"
                />
                <p className="text-yellow-700 font-medium">Đang xử lý...</p>
              </motion.div>
            )}
          </AnimatePresence>
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
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
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
