'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Clock, Trophy, Star } from 'lucide-react'
import AIClient from '@/lib/ai-client'

interface Question {
  question: string
  options: string[]
  correct: number
  explanation: string
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

  useEffect(() => {
    loadQuestions()
  }, [topic, difficulty])

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
      setQuestions(data.questions || [])
    } catch (error) {
      console.error('Error loading questions:', error)
      // Fallback questions
      setQuestions([
        {
          question: "Ngày Quốc khánh Việt Nam là ngày nào?",
          options: ["1/9", "2/9", "3/9", "4/9"],
          correct: 1,
          explanation: "Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, Hà Nội."
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    if (answerIndex === questions[currentQuestion]?.correct) {
      setScore(score + 1)
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
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Câu {currentQuestion + 1} / {questions.length}
          </span>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-600">{timeLeft}s</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-red-500 to-yellow-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="bg-white rounded-xl shadow-lg p-8 mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {question.question}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => {
            let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-300 "
            
            if (showResult) {
              if (index === question.correct) {
                buttonClass += "border-green-500 bg-green-50 text-green-800"
              } else if (index === selectedAnswer && index !== question.correct) {
                buttonClass += "border-red-500 bg-red-50 text-red-800"
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-600"
              }
            } else {
              buttonClass += "border-gray-300 hover:border-red-300 hover:bg-red-50 cursor-pointer"
            }

            return (
              <motion.button
                key={index}
                whileHover={!showResult ? { scale: 1.02 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                className={buttonClass}
              >
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-lg">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span>{option}</span>
                  {showResult && index === question.correct && (
                    <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                  )}
                  {showResult && index === selectedAnswer && index !== question.correct && (
                    <XCircle className="w-5 h-5 text-red-600 ml-auto" />
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
              className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <h4 className="font-semibold text-blue-800 mb-2">Giải thích:</h4>
              <p className="text-blue-700">{question.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Score Display */}
      <div className="flex justify-center items-center space-x-4 mb-6">
        <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-lg">
          <Trophy className="w-5 h-5 text-yellow-600" />
          <span className="font-semibold text-yellow-800">
            Điểm: {score}/{currentQuestion + (showResult ? 1 : 0)}
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-red-100 px-4 py-2 rounded-lg">
          <Star className="w-5 h-5 text-red-600" />
          <span className="font-semibold text-red-800">
            Đúng: {Math.round((score / (currentQuestion + (showResult ? 1 : 0))) * 100)}%
          </span>
        </div>
      </div>

      {/* Next Button */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextQuestion}
              className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-8 py-3 rounded-lg font-semibold text-lg"
            >
              {isLastQuestion ? 'Xem Kết Quả' : 'Câu Tiếp Theo'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
