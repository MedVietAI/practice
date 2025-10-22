'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Clock, Trophy, Star, Flag, Heart, Award, Volume2, VolumeX, RotateCcw, Home } from 'lucide-react'
import AIClient from '@/lib/ai-client'
import ImageGenerator from '@/lib/image-generator'
import SpeechGenerator from '@/lib/speech-generator'

interface Question {
  question: string
  options: string[]
  correct: number
  explanation: string
  imageUrl?: string
  patrioticContext?: string
}

interface QuizGameProps {
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
  onComplete: (score: number, total: number) => void
}

export default function QuizGame({ topic, difficulty, onComplete }: QuizGameProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isLoading, setIsLoading] = useState(true)
  const [isVoicePlaying, setIsVoicePlaying] = useState(false)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [achievements, setAchievements] = useState<string[]>([])
  const [showAchievement, setShowAchievement] = useState<string | null>(null)
  const [backgroundImage, setBackgroundImage] = useState<string>('')

  useEffect(() => {
    loadQuestions()
    generateBackgroundImage()
  }, [topic, difficulty])

  // Generate patriotic background image
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

  // Play question voice
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

  // Check achievements
  const checkAchievements = (newScore: number, newStreak: number) => {
    const newAchievements = [...achievements]
    
    if (newScore >= 5 && !newAchievements.includes('Nhà Sử Học Tài Năng')) {
      newAchievements.push('Nhà Sử Học Tài Năng')
      setShowAchievement('Nhà Sử Học Tài Năng')
    }
    
    if (newStreak >= 3 && !newAchievements.includes('Chuỗi Thành Công')) {
      newAchievements.push('Chuỗi Thành Công')
      setShowAchievement('Chuỗi Thành Công')
    }
    
    if (newScore === questions.length && !newAchievements.includes('Hoàn Hảo')) {
      newAchievements.push('Hoàn Hảo')
      setShowAchievement('Hoàn Hảo')
    }
    
    setAchievements(newAchievements)
  }

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1) // Time's up
    }
  }, [timeLeft, showResult])

  const loadQuestions = async () => {
    try {
      setIsLoading(true)
      const data = await AIClient.generateQuizQuestions(topic, difficulty)
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions)
      } else {
        // Use fallback questions
        setQuestions(getFallbackQuestions())
      }
    } catch (error) {
      console.error('Error loading questions:', error)
      // Use fallback questions
      setQuestions(getFallbackQuestions())
    } finally {
      setIsLoading(false)
    }
  }

  const getFallbackQuestions = () => [
    {
      question: "Ngày Quốc khánh Việt Nam là ngày nào?",
      options: ["1/9", "2/9", "3/9", "4/9"],
      correct: 1,
      explanation: "Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, Hà Nội."
    },
    {
      question: "Ai là người đọc Tuyên ngôn Độc lập ngày 2/9/1945?",
      options: ["Võ Nguyên Giáp", "Hồ Chí Minh", "Phạm Văn Đồng", "Trường Chinh"],
      correct: 1,
      explanation: "Chủ tịch Hồ Chí Minh đã đọc Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa."
    },
    {
      question: "Năm 2025 kỷ niệm bao nhiêu năm Quốc khánh?",
      options: ["75 năm", "80 năm", "85 năm", "90 năm"],
      correct: 1,
      explanation: "Năm 2025 kỷ niệm 80 năm Quốc khánh Việt Nam (1945-2025)."
    },
    {
      question: "Quảng trường Ba Đình nằm ở đâu?",
      options: ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Huế"],
      correct: 1,
      explanation: "Quảng trường Ba Đình nằm ở Hà Nội, nơi Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập."
    },
    {
      question: "Tuyên ngôn Độc lập được đọc vào năm nào?",
      options: ["1944", "1945", "1946", "1947"],
      correct: 1,
      explanation: "Tuyên ngôn Độc lập được đọc vào ngày 2/9/1945, khai sinh nước Việt Nam Dân chủ Cộng hòa."
    }
  ]

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    const isCorrect = answerIndex === questions[currentQuestion]?.correct
    const newScore = isCorrect ? score + 1 : score
    const newStreak = isCorrect ? streak + 1 : 0
    const newMaxStreak = Math.max(maxStreak, newStreak)
    
    setScore(newScore)
    setStreak(newStreak)
    setMaxStreak(newMaxStreak)
    
    // Check achievements
    checkAchievements(newScore, newStreak)
    
    // Play patriotic sound effect
    if (isCorrect) {
      playQuestionVoice("Chính xác! Bạn đã thể hiện tinh thần yêu nước và hiểu biết về lịch sử dân tộc!")
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setTimeLeft(30)
    } else {
      onComplete(score + (selectedAnswer === questions[currentQuestion]?.correct ? 1 : 0), questions.length)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full"
        />
        <span className="ml-4 text-lg text-gray-600">Đang tải câu hỏi...</span>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Không thể tải câu hỏi</h3>
        <p className="text-gray-600">Vui lòng thử lại sau.</p>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const isCorrect = selectedAnswer === question.correct
  const isLastQuestion = currentQuestion === questions.length - 1

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
        {/* Header with Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 mb-8 border-2 border-red-200"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="bg-gradient-to-r from-red-600 to-yellow-500 p-3 rounded-full shadow-lg"
              >
                <Flag className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-black text-red-800">Quiz Lịch Sử Việt Nam</h1>
                <p className="text-sm text-gray-600">Thể hiện tinh thần yêu nước và hiểu biết lịch sử</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-2xl font-bold text-red-600">{score}</span>
                </div>
                <div className="text-xs text-gray-600">Điểm</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-bold text-yellow-600">{streak}</span>
                </div>
                <div className="text-xs text-gray-600">Chuỗi</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-2xl font-bold text-blue-600">{timeLeft}</span>
                </div>
                <div className="text-xs text-gray-600">Giây</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Câu {currentQuestion + 1} / {questions.length}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 h-3 rounded-full shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
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
                Câu hỏi {currentQuestion + 1}
              </h2>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => playQuestionVoice(question.question)}
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
              {question.question}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {question.options.map((option, index) => {
              let buttonClass = "w-full p-6 text-left rounded-xl border-2 transition-all duration-300 shadow-lg "
              
              if (showResult) {
                if (index === question.correct) {
                  buttonClass += "border-green-500 bg-gradient-to-r from-green-50 to-green-100 text-green-800 shadow-green-200"
                } else if (index === selectedAnswer && index !== question.correct) {
                  buttonClass += "border-red-500 bg-gradient-to-r from-red-50 to-red-100 text-red-800 shadow-red-200"
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-600"
                }
              } else {
                buttonClass += "border-red-300 bg-white hover:border-red-500 hover:bg-gradient-to-r hover:from-red-50 hover:to-yellow-50 cursor-pointer hover:shadow-xl"
              }

              return (
                <motion.button
                  key={index}
                  whileHover={!showResult ? { scale: 1.05, y: -5 } : {}}
                  whileTap={!showResult ? { scale: 0.95 } : {}}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                      showResult 
                        ? index === question.correct 
                          ? 'bg-green-500 text-white' 
                          : index === selectedAnswer 
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        : 'bg-gradient-to-r from-red-500 to-yellow-500 text-white'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg font-medium flex-1">{option}</span>
                    {showResult && index === question.correct && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-green-500 p-2 rounded-full"
                      >
                        <CheckCircle className="w-6 h-6 text-white" />
                      </motion.div>
                    )}
                    {showResult && index === selectedAnswer && index !== question.correct && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-red-500 p-2 rounded-full"
                      >
                        <XCircle className="w-6 h-6 text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-500 p-2 rounded-full">
                    <Flag className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-blue-800">Giải thích lịch sử:</h4>
                </div>
                <p className="text-blue-700 text-lg leading-relaxed">{question.explanation}</p>
                
                {isCorrect && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="font-semibold text-green-800">Tuyệt vời! Bạn đã thể hiện tinh thần yêu nước!</span>
                    </div>
                  </motion.div>
                )}
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
              className="fixed top-20 right-6 z-50 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-6 rounded-xl shadow-2xl border-2 border-yellow-300"
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Award className="w-8 h-8" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-lg">Thành Tựu Mới!</h3>
                  <p className="text-sm">{showAchievement}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAchievement(null)}
                className="absolute top-2 right-2 text-white hover:text-yellow-200"
              >
                ×
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Score Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center items-center space-x-6 mb-8"
        >
          <div className="flex items-center space-x-3 bg-gradient-to-r from-yellow-100 to-yellow-200 px-6 py-4 rounded-xl border-2 border-yellow-300 shadow-lg">
            <Trophy className="w-6 h-6 text-yellow-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-800">{score}</div>
              <div className="text-sm text-yellow-700">Điểm</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-gradient-to-r from-red-100 to-red-200 px-6 py-4 rounded-xl border-2 border-red-300 shadow-lg">
            <Star className="w-6 h-6 text-red-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-red-800">{streak}</div>
              <div className="text-sm text-red-700">Chuỗi</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-100 to-blue-200 px-6 py-4 rounded-xl border-2 border-blue-300 shadow-lg">
            <Award className="w-6 h-6 text-blue-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-800">{achievements.length}</div>
              <div className="text-sm text-blue-700">Thành tựu</div>
            </div>
          </div>
        </motion.div>

        {/* Next Button */}
        <AnimatePresence>
          {showResult && (
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
                  {isLastQuestion ? (
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
