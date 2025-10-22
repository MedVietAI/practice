'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Chapter, Question } from '@/lib/game-data';
import QuestionCard from './QuestionCard';
import GameCharacter from './GameCharacter';

interface ChapterSectionProps {
  chapter: Chapter;
  onChapterComplete: (score: number) => void;
  onNextChapter: () => void;
}

export default function ChapterSection({ chapter, onChapterComplete, onNextChapter }: ChapterSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [characterMessage, setCharacterMessage] = useState('');
  const [isCharacterSpeaking, setIsCharacterSpeaking] = useState(false);
  const [chapterImages, setChapterImages] = useState<string[]>([]);

  useEffect(() => {
    // Load chapter images
    loadChapterImages();
    
    // Start chapter with character introduction
    startChapter();
  }, [chapter]);

  const loadChapterImages = async () => {
    try {
      const response = await fetch('/api/load-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapterId: chapter.id })
      });
      
      if (response.ok) {
        const data = await response.json();
        setChapterImages(data.images);
      }
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const startChapter = async () => {
    const introMessages = {
      colonial: "Chào bạn! Tôi là Anh Minh. Hãy cùng tôi quay ngược thời gian về những ngày đen tối khi đất nước ta còn chìm trong ách thống trị của thực dân Pháp...",
      revolution: "Từ trong bóng tối, ngọn lửa cách mạng đã bùng lên! Hãy cùng tôi chứng kiến hành trình 30 năm tìm đường cứu nước của Bác Hồ...",
      independence: "Và rồi giây phút thiêng liêng đã đến! Ngày 2/9/1945, tại Quảng trường Ba Đình, Bác Hồ đã đọc Tuyên ngôn Độc lập...",
      construction: "Từ ngày độc lập, dân tộc ta đã trải qua biết bao thử thách để xây dựng đất nước. Hãy cùng tôi khám phá hành trình này...",
      modern: "Và hôm nay, sau 80 năm, Việt Nam đã trở thành một quốc gia phát triển, hiện đại. Hãy cùng tôi ngắm nhìn những thành tựu tuyệt vời này..."
    };

    setCharacterMessage(introMessages[chapter.id as keyof typeof introMessages] || '');
    setIsCharacterSpeaking(true);
    
    // Simulate character speaking duration
    setTimeout(() => {
      setIsCharacterSpeaking(false);
      setIsPlaying(true);
    }, 3000);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 10);
    }
  };

  const handleTimeUp = () => {
    // Move to next question or complete chapter
    if (currentQuestionIndex < chapter.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeChapter();
    }
  };

  const completeChapter = () => {
    setIsPlaying(false);
    onChapterComplete(score);
    
    const completionMessage = `Tuyệt vời! Bạn đã hoàn thành chương "${chapter.title}" với ${score} điểm. Hãy tiếp tục hành trình khám phá lịch sử dân tộc!`;
    setCharacterMessage(completionMessage);
    setIsCharacterSpeaking(true);
    
    setTimeout(() => {
      setIsCharacterSpeaking(false);
      onNextChapter();
    }, 3000);
  };

  const currentQuestion = chapter.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50">
      {/* Background Images */}
      {chapterImages.length > 0 && (
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {chapterImages.slice(0, 8).map((image, index) => (
              <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`Chapter ${chapter.id} image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-red-600">{chapter.title}</h1>
                <p className="text-gray-600 mt-2">{chapter.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{score} điểm</div>
                <div className="text-sm text-gray-500">
                  Câu {currentQuestionIndex + 1}/{chapter.questions.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Character */}
            <div className="lg:col-span-1">
              <GameCharacter
                isSpeaking={isCharacterSpeaking}
                message={characterMessage}
              />
            </div>

            {/* Game Content */}
            <div className="lg:col-span-2">
              {isPlaying && currentQuestion ? (
                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  timeLimit={30}
                  onTimeUp={handleTimeUp}
                />
              ) : !isPlaying ? (
                <div className="text-center py-12">
                  <div className="animate-pulse">
                    <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600">Đang chuẩn bị...</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
