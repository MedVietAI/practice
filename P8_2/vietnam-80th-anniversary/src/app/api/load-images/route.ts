import { NextRequest, NextResponse } from 'next/server';
import { getHistoricalImages } from '@/lib/image-crawler';

export async function POST(request: NextRequest) {
  try {
    const { chapterId } = await request.json();
    
    // Define keywords for each chapter
    const chapterKeywords = {
      colonial: [
        'thực dân pháp',
        'thuộc địa việt nam',
        'phan bội châu',
        'phan châu trinh',
        'khởi nghĩa yên bái'
      ],
      revolution: [
        'hồ chí minh',
        'cách mạng tháng tám',
        'đảng cộng sản việt nam',
        'nguyễn ái quốc',
        'tìm đường cứu nước'
      ],
      independence: [
        '2/9/1945',
        'tuyên ngôn độc lập',
        'quảng trường ba đình',
        'hồ chí minh đọc tuyên ngôn',
        'lễ độc lập'
      ],
      construction: [
        'kháng chiến chống pháp',
        'điện biên phủ',
        'kháng chiến chống mỹ',
        'đổi mới việt nam',
        'xây dựng đất nước'
      ],
      modern: [
        'thành tựu việt nam',
        'phát triển kinh tế',
        'công nghệ việt nam',
        'văn hóa việt nam',
        'thể thao việt nam'
      ]
    };

    const keywords = chapterKeywords[chapterId as keyof typeof chapterKeywords] || [];
    
    // For demo purposes, return placeholder images
    // In production, this would call the actual image crawler
    const placeholderImages = [
      'https://via.placeholder.com/400x300/ff0000/ffffff?text=Hình+ảnh+Lịch+sử+1',
      'https://via.placeholder.com/400x300/ff6600/ffffff?text=Hình+ảnh+Lịch+sử+2',
      'https://via.placeholder.com/400x300/ffcc00/ffffff?text=Hình+ảnh+Lịch+sử+3',
      'https://via.placeholder.com/400x300/00ff00/ffffff?text=Hình+ảnh+Lịch+sử+4',
      'https://via.placeholder.com/400x300/0066ff/ffffff?text=Hình+ảnh+Lịch+sử+5',
      'https://via.placeholder.com/400x300/6600ff/ffffff?text=Hình+ảnh+Lịch+sử+6',
      'https://via.placeholder.com/400x300/ff0066/ffffff?text=Hình+ảnh+Lịch+sử+7',
      'https://via.placeholder.com/400x300/00ffff/ffffff?text=Hình+ảnh+Lịch+sử+8'
    ];

    return NextResponse.json({ 
      images: placeholderImages,
      keywords: keywords
    });
  } catch (error) {
    console.error('Error loading images:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
