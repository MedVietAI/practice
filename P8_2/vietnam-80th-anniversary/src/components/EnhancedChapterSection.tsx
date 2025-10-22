'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Chapter, Question } from '@/lib/game-data';
import EnhancedQuestionCard from './EnhancedQuestionCard';
import EnhancedGameCharacter from './EnhancedGameCharacter';
import AnimatedBackground from './AnimatedBackground';
import HistoricalTimeline from './HistoricalTimeline';
import { localAssetsManager } from '@/lib/local-assets';

interface EnhancedChapterSectionProps {
  chapter: Chapter;
  onChapterComplete: (score: number) => void;
  onNextChapter: () => void;
}

export default function EnhancedChapterSection({ 
  chapter, 
  onChapterComplete, 
  onNextChapter 
}: EnhancedChapterSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [characterMessage, setCharacterMessage] = useState('');
  const [isCharacterSpeaking, setIsCharacterSpeaking] = useState(false);
  const [chapterImages, setChapterImages] = useState<string[]>([]);
  const [showTimeline, setShowTimeline] = useState(false);
  const [chapterIntro, setChapterIntro] = useState(true);

  useEffect(() => {
    // Load chapter images
    loadChapterImages();
    
    // Start chapter with character introduction
    startChapter();
  }, [chapter]);

  const loadChapterImages = async () => {
    try {
      console.log(`🔄 EnhancedChapterSection: Loading images for chapter ${chapter.id}...`);
      // Load images from local assets
      const imageUrls = await localAssetsManager.getChapterImages(chapter.id);
      console.log(`✅ EnhancedChapterSection: Images loaded for ${chapter.id}:`, imageUrls);
      setChapterImages(imageUrls);
    } catch (error) {
      console.error('❌ EnhancedChapterSection: Error loading images:', error);
      // Fallback to placeholder images
      setChapterImages([
        'https://via.placeholder.com/400x300/ff0000/ffffff?text=Hình+ảnh+Lịch+sử+1',
        'https://via.placeholder.com/400x300/ff6600/ffffff?text=Hình+ảnh+Lịch+sử+2',
        'https://via.placeholder.com/400x300/ffcc00/ffffff?text=Hình+ảnh+Lịch+sử+3',
        'https://via.placeholder.com/400x300/00ff00/ffffff?text=Hình+ảnh+Lịch+sử+4'
      ]);
    }
  };

  const startChapter = async () => {
    const introMessages = {
      colonial: "Chào bạn! Tôi là Anh Minh. Hãy cùng tôi quay ngược thời gian về những ngày đen tối khi đất nước ta còn chìm trong ách thống trị của thực dân Pháp. Đây là thời kỳ đau thương nhưng cũng là thời kỳ nhen nhóm những ngọn lửa yêu nước đầu tiên...",
      revolution: "Từ trong bóng tối, ngọn lửa cách mạng đã bùng lên! Hãy cùng tôi theo dõi hành trình 30 năm tìm đường cứu nước của Bác Hồ, từ những ngày đầu ra đi đến sự ra đời của Đảng Cộng sản Việt Nam và cuộc Cách mạng Tháng Tám vĩ đại...",
      independence: "Và rồi giây phút thiêng liêng nhất trong lịch sử dân tộc đã đến! Ngày 2/9/1945, tại Quảng trường Ba Đình, Bác Hồ đã đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa. Hàng triệu trái tim Việt Nam cùng hòa chung nhịp đập tự do...",
      construction: "Từ ngày độc lập, dân tộc ta đã trải qua biết bao thử thách để xây dựng đất nước. Cuộc kháng chiến chống Pháp và Mỹ, xây dựng chủ nghĩa xã hội, và bước ngoặt đổi mới năm 1986 đã mở ra một trang sử mới...",
      modern: "Và hôm nay, sau 80 năm, Việt Nam đã trở thành một quốc gia phát triển, hiện đại với những thành tựu rực rỡ. Từ nước nghèo đói trở thành nước có thu nhập trung bình, hội nhập sâu rộng với thế giới..."
    };

    const message = introMessages[chapter.id as keyof typeof introMessages] || '';
    setCharacterMessage(message);
    setIsCharacterSpeaking(true);
    
    // Play background speech
    await localAssetsManager.playAudio(`chapter-${chapter.id}`);
    
    // Simulate character speaking duration
    setTimeout(() => {
      setIsCharacterSpeaking(false);
      setChapterIntro(false);
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

  const handleNext = () => {
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
    
    const completionMessage = `Tuyệt vời! Bạn đã hoàn thành chương "${chapter.title}" với ${score} điểm. Kiến thức lịch sử của bạn thật đáng khen ngợi! Hãy tiếp tục hành trình khám phá lịch sử vẻ vang của dân tộc!`;
    setCharacterMessage(completionMessage);
    setIsCharacterSpeaking(true);
    
    setTimeout(() => {
      setIsCharacterSpeaking(false);
      onNextChapter();
    }, 4000);
  };

  const currentQuestion = chapter.questions[currentQuestionIndex];

  if (chapterIntro) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground chapterId={chapter.id} />
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="max-w-6xl w-full">
            <div className="bg-white bg-opacity-95 rounded-3xl shadow-2xl p-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{chapter.title}</h1>
                <p className="text-xl text-gray-600 leading-relaxed">{chapter.description}</p>
              </div>
              
              <div className="flex justify-center">
                <EnhancedGameCharacter
                  isSpeaking={isCharacterSpeaking}
                  message={characterMessage}
                  chapterId={chapter.id}
                  emotion="thoughtful"
                />
              </div>
              
              <div className="text-center mt-8">
                <div className="animate-pulse text-lg text-gray-600">
                  Đang chuẩn bị câu hỏi...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground chapterId={chapter.id} />
      
      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="bg-white bg-opacity-95 shadow-2xl backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{chapter.title}</h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">{chapter.description}</p>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600 mb-2">{score} điểm</div>
                <div className="text-sm text-gray-500">
                  Câu {currentQuestionIndex + 1}/{chapter.questions.length}
                </div>
                <button
                  onClick={() => setShowTimeline(!showTimeline)}
                  className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {showTimeline ? 'Ẩn' : 'Hiện'} Dòng thời gian
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        {showTimeline && (
          <div className="bg-white bg-opacity-95 shadow-lg">
            <HistoricalTimeline currentChapter={chapter.id} />
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Character */}
            <div className="lg:col-span-1">
              <EnhancedGameCharacter
                isSpeaking={isCharacterSpeaking}
                message={characterMessage}
                chapterId={chapter.id}
                emotion={isPlaying ? 'happy' : 'thoughtful'}
              />
            </div>

            {/* Game Content */}
            <div className="lg:col-span-3">
              {isPlaying && currentQuestion ? (
                <EnhancedQuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  timeLimit={30}
                  onTimeUp={handleTimeUp}
                  onNext={handleNext}
                  questionNumber={currentQuestionIndex + 1}
                  totalQuestions={chapter.questions.length}
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
