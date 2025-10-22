'use client';

import { useState, useEffect } from 'react';
import { gameChapters, Question } from '@/lib/game-data';
import EnhancedChapterSection from './EnhancedChapterSection';
import GameResult from './GameResult';
import AnimatedBackground from './AnimatedBackground';

type GameState = 'intro' | 'playing' | 'result';

export default function EnhancedVietnamGame() {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [chapterScores, setChapterScores] = useState<number[]>([]);
  const [showIntro, setShowIntro] = useState(true);

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
    setShowIntro(true);
  };

  const startGame = () => {
    setShowIntro(false);
    setTimeout(() => {
      setGameState('playing');
    }, 1000);
  };

  if (gameState === 'intro') {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground chapterId="intro" />
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="max-w-6xl w-full">
            <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-1000 ${
              showIntro ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}>
              {/* Enhanced Header */}
              <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-4 animate-bounce">🇻🇳</div>
                  <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">
                    Hành Trình 80 Năm Độc Lập
                  </h1>
                  <p className="text-2xl mb-8 drop-shadow-md">
                    Khám phá lịch sử vẻ vang của dân tộc Việt Nam
                  </p>
                  <div className="text-lg opacity-90">
                    Từ những ngày đen tối thuộc địa đến những thành tựu rực rỡ hiện đại
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-white bg-opacity-30 rounded-full animate-ping"></div>
                <div className="absolute top-8 right-8 w-6 h-6 bg-white bg-opacity-30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-8 w-4 h-4 bg-white bg-opacity-30 rounded-full animate-bounce"></div>
                <div className="absolute bottom-8 right-4 w-5 h-5 bg-white bg-opacity-30 rounded-full animate-ping"></div>
              </div>

              {/* Enhanced Content */}
              <div className="p-12">
                <div className="text-center mb-12">
                  <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-yellow-100 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg">
                    <span className="text-6xl">🎮</span>
                  </div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-6">
                    Chào mừng bạn đến với trò chơi tương tác
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-8">
                    Hãy cùng <strong>Anh Minh</strong> - người dẫn đường tinh thần, khám phá hành trình 80 năm độc lập của dân tộc Việt Nam. 
                    Từ những ngày đen tối dưới ách thống trị thực dân đến những thành tựu rực rỡ của ngày hôm nay.
                  </p>
                </div>

                {/* Enhanced Game Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center p-8 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-5xl mb-6">📚</div>
                    <h3 className="text-2xl font-bold text-red-600 mb-4">Lịch Sử Sống Động</h3>
                    <p className="text-gray-600 leading-relaxed">
                      5 chương lịch sử chi tiết với hình ảnh thực tế từ các nguồn tin chính thống Việt Nam
                    </p>
                  </div>
                  
                  <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-5xl mb-6">❓</div>
                    <h3 className="text-2xl font-bold text-blue-600 mb-4">30 Câu Hỏi Tương Tác</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Câu hỏi MCQ đa dạng về lịch sử, văn hóa và thành tựu hiện đại của Việt Nam
                    </p>
                  </div>
                  
                  <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-5xl mb-6">🎯</div>
                    <h3 className="text-2xl font-bold text-green-600 mb-4">Hệ Thống Điểm Số</h3>
                    <p className="text-gray-600 leading-relaxed">
                      5 danh hiệu từ "Cần Học Thêm" đến "Anh Hùng Dân Tộc" dựa trên kiến thức của bạn
                    </p>
                  </div>
                </div>

                {/* Enhanced Game Rules */}
                <div className="bg-gradient-to-r from-red-100 via-yellow-100 to-green-100 rounded-2xl p-8 mb-12">
                  <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Luật Chơi & Tính Năng
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-4xl mb-4">⏱️</div>
                      <h4 className="font-bold text-gray-700 mb-2">Thời gian</h4>
                      <p className="text-gray-600">30 giây cho mỗi câu hỏi</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-4">📊</div>
                      <h4 className="font-bold text-gray-700 mb-2">Điểm số</h4>
                      <p className="text-gray-600">10 điểm cho mỗi câu trả lời đúng</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-4">💡</div>
                      <h4 className="font-bold text-gray-700 mb-2">Gợi ý</h4>
                      <p className="text-gray-600">2 gợi ý trong toàn bộ game</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-4">🏆</div>
                      <h4 className="font-bold text-gray-700 mb-2">Danh hiệu</h4>
                      <p className="text-gray-600">Dựa trên tổng điểm đạt được</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Start Button */}
                <div className="text-center">
                  <button
                    onClick={startGame}
                    className="px-16 py-6 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white text-2xl font-bold rounded-2xl hover:from-red-600 hover:via-yellow-600 hover:to-green-600 transition-all duration-300 shadow-2xl transform hover:scale-105 hover:shadow-3xl"
                  >
                    🚀 Bắt Đầu Hành Trình
                  </button>
                  <p className="mt-4 text-gray-600">
                    Thời gian chơi: ~15 phút | Độ khó: Từ dễ đến khó
                  </p>
                </div>
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
    <EnhancedChapterSection
      chapter={currentChapter}
      onChapterComplete={handleChapterComplete}
      onNextChapter={handleNextChapter}
    />
  );
}
