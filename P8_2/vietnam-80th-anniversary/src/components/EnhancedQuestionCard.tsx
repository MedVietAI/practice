'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/lib/game-data';

interface EnhancedQuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  timeLimit: number;
  onTimeUp: () => void;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function EnhancedQuestionCard({ 
  question, 
  onAnswer, 
  timeLimit, 
  onTimeUp, 
  onNext,
  questionNumber,
  totalQuestions 
}: EnhancedQuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setTimeLeft(timeLimit);
    setShowResult(false);
    setIsAnswered(false);
    setShowHint(false);
    setHintsUsed(0);
  }, [question.id, timeLimit]);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      onTimeUp();
    }
  }, [timeLeft, isAnswered, onTimeUp]);

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowResult(true);
    
    const isCorrect = answerIndex === question.correctAnswer;
    onAnswer(isCorrect);
  };

  const handleHint = () => {
    if (hintsUsed < 2) {
      setShowHint(true);
      setHintsUsed(hintsUsed + 1);
    }
  };

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      if (selectedAnswer === index) {
        return 'bg-blue-500 text-white border-blue-500 transform scale-105 shadow-lg';
      }
      return 'bg-white text-gray-800 border-gray-300 hover:bg-blue-50 hover:scale-102 transition-all duration-200';
    }
    
    if (index === question.correctAnswer) {
      return 'bg-green-500 text-white border-green-500 animate-pulse';
    }
    
    if (index === selectedAnswer && index !== question.correctAnswer) {
      return 'bg-red-500 text-white border-red-500';
    }
    
    return 'bg-gray-100 text-gray-500 border-gray-200';
  };

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getDifficultyText = () => {
    switch (question.difficulty) {
      case 'easy': return 'Dễ';
      case 'medium': return 'Trung bình';
      case 'hard': return 'Khó';
      default: return 'Không xác định';
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-102 transition-all duration-300">
        {/* Header with progress and timer */}
        <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold">
                Câu {questionNumber}/{totalQuestions}
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor()}`}>
                {getDifficultyText()}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm">Thời gian:</div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                timeLeft <= 10 ? 'bg-red-600 animate-pulse' : 'bg-white text-red-500'
              }`}>
                {timeLeft}
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question content */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed text-center">
            {question.question}
          </h3>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
                className={`p-6 text-left rounded-xl border-2 transition-all duration-300 ${
                  getOptionStyle(index)
                } ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}`}
              >
                <div className="flex items-center">
                  <span className="w-10 h-10 rounded-full bg-current text-white flex items-center justify-center text-lg font-bold mr-4">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Hint button */}
          {!isAnswered && hintsUsed < 2 && (
            <div className="text-center mb-6">
              <button
                onClick={handleHint}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200"
              >
                💡 Gợi ý ({2 - hintsUsed} lần còn lại)
              </button>
            </div>
          )}

          {/* Hint display */}
          {showHint && !isAnswered && (
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-semibold text-yellow-800 mb-2">💡 Gợi ý:</h4>
              <p className="text-yellow-700">
                {question.difficulty === 'easy' && 'Đây là câu hỏi cơ bản, hãy suy nghĩ về kiến thức lịch sử cơ bản.'}
                {question.difficulty === 'medium' && 'Hãy nhớ lại các sự kiện lịch sử quan trọng và mốc thời gian.'}
                {question.difficulty === 'hard' && 'Đây là câu hỏi chuyên sâu, cần kiến thức chi tiết về lịch sử Việt Nam.'}
              </p>
            </div>
          )}

          {/* Explanation */}
          {showResult && (
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-800 mb-3 text-lg">📚 Giải thích chi tiết:</h4>
              <p className="text-blue-700 text-lg leading-relaxed">{question.explanation}</p>
              
              {/* Next Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={onNext}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg transform hover:scale-105"
                >
                  {questionNumber < totalQuestions ? 'Câu tiếp theo →' : 'Hoàn thành chương ✓'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
