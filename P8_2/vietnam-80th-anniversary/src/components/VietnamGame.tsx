'use client';

import { useState, useEffect } from 'react';
import { gameChapters, Question } from '@/lib/game-data';
import ChapterSection from './ChapterSection';
import GameResult from './GameResult';

type GameState = 'intro' | 'playing' | 'result';

export default function VietnamGame() {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [chapterScores, setChapterScores] = useState<number[]>([]);

  const currentChapter = gameChapters[currentChapterIndex];
  const maxScore = gameChapters.reduce((total, chapter) => total + chapter.questions.length * 10, 0);

  const handleChapterComplete = (score: number) => {
    setChapterScores(prev => [...prev, score]);
    setTotalScore(prev => prev + score);
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < gameChapters.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
    } else {
      setGameState('result');
    }
  };

  const handleRestart = () => {
    setGameState('intro');
    setCurrentChapterIndex(0);
    setTotalScore(0);
    setChapterScores([]);
  };

  const startGame = () => {
    setGameState('playing');
  };

  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white p-8 text-center">
              <h1 className="text-5xl font-bold mb-4">🇻🇳 Hành Trình 80 Năm Độc Lập 🇻🇳</h1>
              <p className="text-xl">Khám phá lịch sử vẻ vang của dân tộc Việt Nam</p>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-yellow-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-6xl">🎮</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Chào mừng bạn đến với trò chơi tương tác
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  Hãy cùng Anh Minh - người dẫn đường tinh thần, khám phá hành trình 80 năm độc lập của dân tộc Việt Nam, 
                  từ những ngày đen tối dưới ách thống trị thực dân đến những thành tựu rực rỡ của ngày hôm nay.
                </p>
              </div>

              {/* Game Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="text-xl font-bold text-red-600 mb-2">Lịch Sử Sống Động</h3>
                  <p className="text-gray-600">5 chương lịch sử với hình ảnh thực tế từ các nguồn tin chính thống</p>
                </div>
                
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-4xl mb-4">❓</div>
                  <h3 className="text-xl font-bold text-blue-600 mb-2">20 Câu Hỏi Tương Tác</h3>
                  <p className="text-gray-600">Câu hỏi MCQ và Q&A đa dạng về lịch sử Việt Nam</p>
                </div>
                
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold text-green-600 mb-2">Hệ Thống Điểm Số</h3>
                  <p className="text-gray-600">5 danh hiệu từ "Cần Học Thêm" đến "Anh Hùng Dân Tộc"</p>
                </div>
              </div>

              {/* Game Rules */}
              <div className="bg-gradient-to-r from-red-100 to-yellow-100 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
                  Luật Chơi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">⏱️ Thời gian:</h4>
                    <p className="text-gray-600">30 giây cho mỗi câu hỏi</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">📊 Điểm số:</h4>
                    <p className="text-gray-600">10 điểm cho mỗi câu trả lời đúng</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">💡 Gợi ý:</h4>
                    <p className="text-gray-600">2 gợi ý trong toàn bộ game</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">🏆 Danh hiệu:</h4>
                    <p className="text-gray-600">Dựa trên tổng điểm đạt được</p>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <div className="text-center">
                <button
                  onClick={startGame}
                  className="px-12 py-4 bg-gradient-to-r from-red-500 to-yellow-500 text-white text-xl font-bold rounded-lg hover:from-red-600 hover:to-yellow-600 transition-all duration-200 shadow-lg transform hover:scale-105"
                >
                  Bắt Đầu Hành Trình
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'result') {
    return (
      <GameResult
        totalScore={totalScore}
        maxScore={maxScore}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <ChapterSection
      chapter={currentChapter}
      onChapterComplete={handleChapterComplete}
      onNextChapter={handleNextChapter}
    />
  );
}
