'use client';

import { useEffect, useState } from 'react';
import { getTitleByScore } from '@/lib/game-data';

interface GameResultProps {
  totalScore: number;
  maxScore: number;
  onRestart: () => void;
}

export default function GameResult({ totalScore, maxScore, onRestart }: GameResultProps) {
  const [title, setTitle] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setTitle(getTitleByScore(totalScore));
    
    if (totalScore >= 120) {
      setShowConfetti(true);
    }
  }, [totalScore]);

  const getScoreColor = () => {
    if (totalScore >= 180) return 'text-red-600';
    if (totalScore >= 150) return 'text-orange-600';
    if (totalScore >= 120) return 'text-green-600';
    if (totalScore >= 90) return 'text-blue-600';
    return 'text-gray-600';
  };

  const getTitleColor = () => {
    if (totalScore >= 180) return 'text-red-500';
    if (totalScore >= 150) return 'text-orange-500';
    if (totalScore >= 120) return 'text-green-500';
    if (totalScore >= 90) return 'text-blue-500';
    return 'text-gray-500';
  };

  const getMessage = () => {
    if (totalScore >= 180) {
      return "Xuất sắc! Bạn thực sự hiểu biết sâu sắc về lịch sử dân tộc. Bạn xứng đáng với danh hiệu Anh Hùng Dân Tộc!";
    }
    if (totalScore >= 150) {
      return "Tuyệt vời! Kiến thức lịch sử của bạn rất vững vàng. Bạn là một Chiến Sĩ Cách Mạng thực thụ!";
    }
    if (totalScore >= 120) {
      return "Rất tốt! Bạn có hiểu biết tốt về lịch sử Việt Nam. Bạn là một Công Dân Yêu Nước!";
    }
    if (totalScore >= 90) {
      return "Khá tốt! Bạn đã có những hiểu biết cơ bản về lịch sử. Hãy tiếp tục học hỏi thêm!";
    }
    return "Hãy tiếp tục học tập để hiểu rõ hơn về lịch sử vẻ vang của dân tộc Việt Nam!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white p-8 text-center">
            <h1 className="text-4xl font-bold mb-4">🎉 Chúc Mừng! 🎉</h1>
            <p className="text-xl">Bạn đã hoàn thành hành trình 80 năm độc lập</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Score Display */}
            <div className="text-center mb-8">
              <div className={`text-6xl font-bold ${getScoreColor()} mb-4`}>
                {totalScore}/{maxScore}
              </div>
              <div className="text-2xl text-gray-600 mb-2">Điểm số của bạn</div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                <div
                  className="bg-gradient-to-r from-red-500 to-yellow-500 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${(totalScore / maxScore) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold ${getTitleColor()} mb-4`}>
                {title}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {getMessage()}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {Math.round((totalScore / maxScore) * 100)}%
                </div>
                <div className="text-gray-600">Độ chính xác</div>
              </div>
              
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {Math.floor(totalScore / 10)}
                </div>
                <div className="text-gray-600">Câu trả lời đúng</div>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {totalScore >= 120 ? 'A+' : totalScore >= 90 ? 'A' : totalScore >= 60 ? 'B' : 'C'}
                </div>
                <div className="text-gray-600">Xếp loại</div>
              </div>
            </div>

            {/* Final Message */}
            <div className="bg-gradient-to-r from-red-100 to-yellow-100 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
                Thông Điệp Cuối Cùng
              </h3>
              <p className="text-center text-gray-700 leading-relaxed">
                "80 năm qua, từ giây phút thiêng liêng ngày 2/9/1945, dân tộc Việt Nam đã vượt qua bao thử thách để xây dựng một đất nước độc lập, tự do, hạnh phúc. Hôm nay, chúng ta tự hào về những thành tựu đã đạt được và tin tưởng vào tương lai tươi sáng của Tổ quốc."
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onRestart}
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold rounded-lg hover:from-red-600 hover:to-yellow-600 transition-all duration-200 shadow-lg"
              >
                Chơi Lại
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="px-8 py-3 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-lg"
              >
                Về Trang Chủ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
