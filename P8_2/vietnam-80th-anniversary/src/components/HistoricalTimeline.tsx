'use client';

import { useState, useEffect } from 'react';
import { localAssetsManager } from '@/lib/local-assets';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  chapter: string;
  isActive: boolean;
}

interface HistoricalTimelineProps {
  currentChapter: string;
  onEventClick?: (event: TimelineEvent) => void;
}

export default function HistoricalTimeline({ currentChapter, onEventClick }: HistoricalTimelineProps) {
  const [events, setEvents] = useState<TimelineEvent[]>([
    {
      year: '1858',
      title: 'Pháp xâm lược Việt Nam',
      description: 'Thực dân Pháp bắt đầu xâm lược Việt Nam tại Đà Nẵng',
      chapter: 'colonial',
      isActive: false
    },
    {
      year: '1911',
      title: 'Nguyễn Tất Thành ra đi tìm đường cứu nước',
      description: 'Hồ Chí Minh bắt đầu hành trình 30 năm tìm đường cứu nước',
      chapter: 'revolution',
      isActive: false
    },
    {
      year: '1930',
      title: 'Thành lập Đảng Cộng sản Việt Nam',
      description: 'Đảng Cộng sản Việt Nam ra đời tại Hồng Kông',
      chapter: 'revolution',
      isActive: false
    },
    {
      year: '1945',
      title: 'Cách mạng Tháng Tám',
      description: 'Cuộc cách mạng vĩ đại giành độc lập cho dân tộc',
      chapter: 'revolution',
      isActive: false
    },
    {
      year: '1945',
      title: 'Tuyên ngôn Độc lập',
      description: 'Ngày 2/9/1945 - Khai sinh nước Việt Nam Dân chủ Cộng hòa',
      chapter: 'independence',
      isActive: false
    },
    {
      year: '1954',
      title: 'Chiến thắng Điện Biên Phủ',
      description: 'Kết thúc cuộc kháng chiến chống Pháp',
      chapter: 'construction',
      isActive: false
    },
    {
      year: '1975',
      title: 'Giải phóng miền Nam',
      description: 'Thống nhất đất nước, kết thúc chiến tranh',
      chapter: 'construction',
      isActive: false
    },
    {
      year: '1986',
      title: 'Đổi mới',
      description: 'Mở ra thời kỳ phát triển mới cho đất nước',
      chapter: 'modern',
      isActive: false
    },
    {
      year: '2025',
      title: '80 năm độc lập',
      description: 'Kỷ niệm 80 năm Quốc khánh Việt Nam',
      chapter: 'modern',
      isActive: false
    }
  ]);

  useEffect(() => {
    setEvents(prev => prev.map(event => ({
      ...event,
      isActive: event.chapter === currentChapter
    })));
    
    // Play timeline explanation speech
    localAssetsManager.playAudio('timeline-explanation');
  }, [currentChapter]);

  const getEventColor = (event: TimelineEvent) => {
    if (event.isActive) return 'bg-red-500 text-white';
    switch (event.chapter) {
      case 'colonial': return 'bg-gray-600 text-white';
      case 'revolution': return 'bg-red-600 text-white';
      case 'independence': return 'bg-yellow-500 text-black';
      case 'construction': return 'bg-blue-600 text-white';
      case 'modern': return 'bg-green-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Dòng Thời Gian Lịch Sử
      </h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 via-yellow-500 to-green-500 rounded-full" />
        
        {/* Events */}
        <div className="space-y-8">
          {events.map((event, index) => (
            <div
              key={event.year}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Event content */}
              <div className={`w-5/12 p-4 rounded-lg shadow-lg transition-all duration-500 ${
                event.isActive ? 'scale-105 shadow-xl' : 'hover:scale-102'
              } ${getEventColor(event)}`}>
                <div className="text-sm font-bold mb-1">{event.year}</div>
                <div className="font-semibold mb-2">{event.title}</div>
                <div className="text-sm opacity-90">{event.description}</div>
              </div>
              
              {/* Timeline dot */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white shadow-lg transition-all duration-500 ${
                event.isActive ? 'scale-125 bg-red-500' : 'bg-gray-400'
              }`} />
              
              {/* Spacer */}
              <div className="w-5/12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
