'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Lightbulb, BookOpen, Trophy, Star, Flag, Volume2, VolumeX, Award, Heart, RotateCcw, Home, ArrowRight } from 'lucide-react'
import AIClient from '@/lib/ai-client'
import ImageGenerator from '@/lib/image-generator'
import SpeechGenerator from '@/lib/speech-generator'

interface QAGameProps {
  topic: string
  onComplete: (score: number) => void
}

export default function EnhancedQAGame({ topic, onComplete }: QAGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [userAnswer, setUserAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hint, setHint] = useState('')
  const [score, setScore] = useState(0)
  const [questionCount, setQuestionCount] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isVoicePlaying, setIsVoicePlaying] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState('')
  const [achievements, setAchievements] = useState<string[]>([])
  const [showAchievement, setShowAchievement] = useState<string | null>(null)

  useEffect(() => {
    generateNewQuestion()
    generateBackgroundImage()
  }, [topic])

  const generateBackgroundImage = async () => {
    try {
      const prompt = `Tạo hình ảnh nền lịch sử Việt Nam cho chủ đề: ${topic}. Hình ảnh nên thể hiện tinh thần yêu nước, lịch sử hào hùng của dân tộc Việt Nam.`
      const images = await ImageGenerator.generateImage(prompt, 1)
      if (images[0]?.url) {
        setBackgroundImage(images[0].url)
      }
    } catch (error) {
      console.error('Error generating background image:', error)
    }
  }

  const playQuestionVoice = async (question: string) => {
    try {
      setIsVoicePlaying(true)
      const audioUrl = await SpeechGenerator.generateSpeech(question, 'Zephyr')
      if (audioUrl) {
        const audio = new Audio(audioUrl)
        audio.onended = () => setIsVoicePlaying(false)
        audio.onerror = () => setIsVoicePlaying(false)
        await audio.play()
      }
    } catch (error) {
      console.error('Error playing question voice:', error)
      setIsVoicePlaying(false)
    }
  }

  const checkAchievements = (newScore: number) => {
    const newAchievements = [...achievements]
    
    if (newScore >= 20 && !newAchievements.includes('Nhà Sử Học Tài Năng')) {
      newAchievements.push('Nhà Sử Học Tài Năng')
      setShowAchievement('Nhà Sử Học Tài Năng')
    }
    
    if (questionCount >= 3 && !newAchievements.includes('Kiên Trì Học Tập')) {
      newAchievements.push('Kiên Trì Học Tập')
      setShowAchievement('Kiên Trì Học Tập')
    }
    
    setAchievements(newAchievements)
  }

  const getFallbackQuestions = () => [
    "Hãy kể về ý nghĩa của ngày Quốc khánh Việt Nam 2/9/1945.",
    "Tại sao ngày 2/9/1945 được chọn làm ngày Quốc khánh của Việt Nam?",
    "Hãy mô tả không khí tại Quảng trường Ba Đình ngày 2/9/1945.",
    "Nêu ý nghĩa lịch sử của Tuyên ngôn Độc lập do Chủ tịch Hồ Chí Minh đọc.",
    "Hãy kể về những thành tựu của Việt Nam trong 80 năm qua."
  ]

  const generateNewQuestion = async () => {
    setIsLoading(true)
    try {
      const question = await AIClient.generateGameContent('question', topic)
      if (question && question !== 'Đây là một câu hỏi thú vị về lịch sử Việt Nam. Hãy suy nghĩ kỹ và đưa ra câu trả lời của bạn.') {
        setCurrentQuestion(question)
      } else {
        // Use fallback questions
        const fallbackQuestions = getFallbackQuestions()
        const randomIndex = Math.floor(Math.random() * fallbackQuestions.length)
        setCurrentQuestion(fallbackQuestions[randomIndex])
      }
      setUserAnswer('')
      setShowHint(false)
      setHint('')
      setFeedback('')
      setShowFeedback(false)
    } catch (error) {
      console.error('Error generating question:', error)
      // Use fallback questions
      const fallbackQuestions = getFallbackQuestions()
      const randomIndex = Math.floor(Math.random() * fallbackQuestions.length)
      setCurrentQuestion(fallbackQuestions[randomIndex])
    } finally {
      setIsLoading(false)
    }
  }

  const getHint = async () => {
    try {
      const hintText = await AIClient.generateGameContent('fact', currentQuestion)
      setHint(hintText || 'Hãy suy nghĩ về ý nghĩa lịch sử và tầm quan trọng của sự kiện này đối với dân tộc Việt Nam.')
      setShowHint(true)
    } catch (error) {
      console.error('Error generating hint:', error)
      setHint('Hãy suy nghĩ về ý nghĩa lịch sử và tầm quan trọng của sự kiện này đối với dân tộc Việt Nam.')
      setShowHint(true)
    }
  }

  const submitAnswer = async () => {
    if (!userAnswer.trim()) return
    
    setIsLoading(true)
    try {
      const evaluation = await AIClient.generateGameContent('story', `${currentQuestion}\n\nCâu trả lời: ${userAnswer}`)
      setFeedback(evaluation || 'Câu trả lời của bạn rất tốt! Hãy tiếp tục phát huy tinh thần yêu nước và hiểu biết lịch sử.')
      
      // Simple scoring (in a real app, you'd use more sophisticated evaluation)
      const newScore = Math.min(10, Math.max(0, userAnswer.length / 10))
      const totalScore = score + newScore
      setScore(totalScore)
      setQuestionCount(questionCount + 1)
      setShowFeedback(true)
      
      // Check achievements
      checkAchievements(totalScore)
    } catch (error) {
      console.error('Error evaluating answer:', error)
      setFeedback('Câu trả lời của bạn rất tốt! Hãy tiếp tục phát huy tinh thần yêu nước và hiểu biết lịch sử.')
      setScore(score + 5) // Default score
      setQuestionCount(questionCount + 1)
      setShowFeedback(true)
    } finally {
      setIsLoading(false)
    }
  }

  const nextQuestion = () => {
    if (questionCount >= 5) {
      onComplete(score)
    } else {
      generateNewQuestion()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-100 relative overflow-hidden">
      {/* Patriotic Background */}
      {backgroundImage && (
        <div className="absolute inset-0 opacity-10">
          <img
            src={backgroundImage}
            alt="Patriotic background"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      )}
      
      {/* Floating Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400 text-lg"
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

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 border-2 border-red-200">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="bg-gradient-to-r from-red-600 to-yellow-500 p-3 rounded-full shadow-lg"
              >
                <Flag className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-3xl font-black text-red-800">
                Hỏi & Đáp Lịch Sử Việt Nam
              </h2>
            </div>
            <p className="text-lg text-gray-700">
              Thể hiện hiểu biết và tinh thần yêu nước của bạn về lịch sử dân tộc
            </p>
            
            {/* Score Display */}
            <div className="flex justify-center items-center space-x-6 mt-6">
              <div className="text-center">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-bold text-yellow-600">{Math.round(score)}</span>
                </div>
                <div className="text-xs text-gray-600">Điểm</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-red-500" />
                  <span className="text-2xl font-bold text-red-600">{questionCount}</span>
                </div>
                <div className="text-xs text-gray-600">Câu hỏi</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-500" />
                  <span className="text-2xl font-bold text-blue-600">{achievements.length}</span>
                </div>
                <div className="text-xs text-gray-600">Thành tựu</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 mb-6 border-2 border-red-200"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="bg-gradient-to-r from-red-600 to-yellow-500 p-2 rounded-full"
              >
                <Star className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-red-800">
                Câu hỏi {questionCount + 1}/5
              </h2>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => playQuestionVoice(currentQuestion)}
              disabled={isVoicePlaying}
              className={`p-3 rounded-full ${
                isVoicePlaying
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isVoicePlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </motion.button>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-lg p-6 mb-8 border border-red-200">
            <h3 className="text-xl font-semibold text-gray-800 text-center leading-relaxed">
              {currentQuestion}
            </h3>
          </div>

          {/* Answer Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Câu trả lời của bạn:
            </label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Hãy viết câu trả lời của bạn về lịch sử Việt Nam..."
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 resize-none h-32 text-lg"
              disabled={isLoading}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={submitAnswer}
              disabled={!userAnswer.trim() || isLoading}
              className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl border-2 border-red-400 hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-3">
                <Send className="w-6 h-6" />
                <span>Gửi Câu Trả Lời</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={getHint}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl border-2 border-blue-400 hover:shadow-3xl transition-all duration-300 disabled:opacity-50"
            >
              <div className="flex items-center space-x-3">
                <Lightbulb className="w-6 h-6" />
                <span>Gợi Ý</span>
              </div>
            </motion.button>
          </div>

          {/* Hint */}
          <AnimatePresence>
            {showHint && hint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-blue-500 p-2 rounded-full">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-blue-800">Gợi ý:</h4>
                </div>
                <p className="text-blue-700 text-lg leading-relaxed">{hint}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-green-500 p-2 rounded-full">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-green-800">Nhận xét:</h4>
                </div>
                <p className="text-green-700 text-lg leading-relaxed">{feedback}</p>
                
                <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-yellow-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Flag className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-800">Tuyệt vời! Bạn đã thể hiện tinh thần yêu nước!</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

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

        {/* Next Button */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextQuestion}
                className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 text-white px-12 py-4 rounded-xl font-bold text-xl shadow-2xl border-2 border-red-400 hover:shadow-3xl transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  {questionCount >= 5 ? (
                    <>
                      <Trophy className="w-6 h-6" />
                      <span>Xem Kết Quả Cuối Cùng</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-6 h-6" />
                      <span>Câu Tiếp Theo</span>
                    </>
                  )}
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
