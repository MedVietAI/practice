'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/lib/game-data';

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  timeLimit: number;
  onTimeUp: () => void;
}

export default function QuestionCard({ question, onAnswer, timeLimit, onTimeUp }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

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

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index
        ? 'bg-blue-500 text-white border-blue-500'
        : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-50';
    }
    
    if (index === question.correctAnswer) {
      return 'bg-green-500 text-white border-green-500';
    }
    
    if (index === selectedAnswer && index !== question.correctAnswer) {
      return 'bg-red-500 text-white border-red-500';
    }
    
    return 'bg-gray-100 text-gray-500 border-gray-200';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Câu hỏi {question.id}</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Thời gian:</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                timeLeft <= 10 ? 'bg-red-600' : 'bg-white text-red-500'
              }`}>
                {timeLeft}
              </div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 leading-relaxed">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  getOptionStyle(index)
                } ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}`}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-current text-white flex items-center justify-center text-sm font-bold mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 mb-2">Giải thích:</h4>
              <p className="text-blue-700">{question.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
