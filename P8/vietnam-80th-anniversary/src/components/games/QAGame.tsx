'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Lightbulb, BookOpen, Trophy, Star } from 'lucide-react'
import AIClient from '@/lib/ai-client'

interface QAGameProps {
  topic: string
  onComplete: (score: number) => void
}

export default function QAGame({ topic, onComplete }: QAGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [userAnswer, setUserAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hint, setHint] = useState('')
  const [score, setScore] = useState(0)
  const [questionCount, setQuestionCount] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)

  useEffect(() => {
    generateNewQuestion()
  }, [topic])

  const generateNewQuestion = async () => {
    setIsLoading(true)
    try {
      const question = await AIClient.generateGameContent('question', topic)
      setCurrentQuestion(question || 'Không thể tải câu hỏi. Vui lòng thử lại.')
      setUserAnswer('')
      setShowHint(false)
      setHint('')
      setFeedback('')
      setShowFeedback(false)
    } catch (error) {
      console.error('Error generating question:', error)
      setCurrentQuestion('Có lỗi xảy ra khi tạo câu hỏi. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  const getHint = async () => {
    if (hint) {
      setShowHint(true)
      return
    }

    setIsLoading(true)
    try {
      const hintText = await AIClient.generateGameContent('fact', topic)
      setHint(hintText || 'Không có gợi ý cho câu hỏi này.')
      setShowHint(true)
    } catch (error) {
      console.error('Error generating hint:', error)
      setHint('Không thể tạo gợi ý.')
      setShowHint(true)
    } finally {
      setIsLoading(false)
    }
  }

  const submitAnswer = async () => {
    if (!userAnswer.trim()) return

    setIsLoading(true)
    try {
      // Generate feedback using AI
      const feedbackPrompt = `Đánh giá câu trả lời của học sinh về câu hỏi: "${currentQuestion}"
      Câu trả lời của học sinh: "${userAnswer}"
      
      Hãy đánh giá và cho điểm từ 0-10, sau đó đưa ra nhận xét tích cực và gợi ý cải thiện.`
      
      const aiFeedback = await AIClient.generateText(feedbackPrompt)
      setFeedback(aiFeedback || 'Câu trả lời của bạn rất tốt!')
      
      // Simple scoring (in a real app, you'd use more sophisticated evaluation)
      const newScore = Math.min(10, Math.max(0, userAnswer.length / 10))
      setScore(score + newScore)
      setQuestionCount(questionCount + 1)
      setShowFeedback(true)
    } catch (error) {
      console.error('Error evaluating answer:', error)
      setFeedback('Câu trả lời của bạn rất tốt! Hãy tiếp tục phát huy.')
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
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-red-800 mb-4">
          Câu Hỏi & Trả Lời
        </h2>
        <div className="flex justify-center items-center space-x-6">
          <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-lg">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span className="font-semibold text-yellow-800">
              Điểm: {Math.round(score)}
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-lg">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-800">
              Câu: {questionCount}/5
            </span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8 mb-6"
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full"
            />
            <span className="ml-4 text-lg text-gray-600">Đang tạo câu hỏi...</span>
          </div>
        ) : (
          <>
            <div className="flex items-start space-x-3 mb-6">
              <div className="bg-red-100 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Câu hỏi:
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {currentQuestion}
                </p>
              </div>
            </div>

            {/* Answer Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Câu trả lời của bạn:
              </label>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Nhập câu trả lời của bạn ở đây..."
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 resize-none"
                rows={4}
                disabled={isLoading}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={submitAnswer}
                disabled={!userAnswer.trim() || isLoading}
                className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                <span>Gửi Câu Trả Lời</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={getHint}
                disabled={isLoading}
                className="bg-blue-100 text-blue-700 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-200 transition-colors disabled:opacity-50"
              >
                <Lightbulb className="w-5 h-5" />
                <span>Gợi Ý</span>
              </motion.button>
            </div>

            {/* Hint */}
            <AnimatePresence>
              {showHint && hint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">Gợi ý:</h4>
                  </div>
                  <p className="text-blue-700">{hint}</p>
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
                  className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <Star className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">Nhận xét:</h4>
                  </div>
                  <p className="text-green-700 mb-4">{feedback}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextQuestion}
                    className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-2 rounded-lg font-semibold"
                  >
                    {questionCount >= 4 ? 'Xem Kết Quả' : 'Câu Tiếp Theo'}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>

      {/* Progress Indicator */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < questionCount ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-600">
            Tiến độ: {questionCount}/5
          </span>
        </div>
      </div>
    </div>
  )
}
