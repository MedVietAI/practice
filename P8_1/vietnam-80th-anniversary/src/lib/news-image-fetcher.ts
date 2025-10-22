// News Image Fetcher for Vietnamese Official Sources
export class NewsImageFetcher {
  private static readonly SOURCES = {
    dangcongsan: 'https://dangcongsan.vn',
    baochinhphu: 'https://baochinhphu.vn',
    vtv: 'https://vtv.vn'
  }

  // Mock implementation for demonstration - in real app, you'd use web scraping or APIs
  static async fetchCelebrationImages(): Promise<NewsImage[]> {
    // Create patriotic SVG images as fallbacks
    const createPatrioticImage = (title: string, description: string, category: string) => {
      const svgContent = `
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#f59e0b;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#dc2626;stop-opacity:1" />
            </linearGradient>
            <pattern id="stars" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#fbbf24" opacity="0.8"/>
            </pattern>
          </defs>
          <rect width="400" height="300" fill="url(#grad)"/>
          <rect width="400" height="100" fill="#dc2626"/>
          <rect width="400" height="100" y="100" fill="#fbbf24"/>
          <rect width="400" height="100" y="200" fill="#dc2626"/>
          <text x="200" y="50" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" dominant-baseline="middle">${title}</text>
          <text x="200" y="150" font-family="Arial, sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" dominant-baseline="middle">80 Năm Quốc Khánh</text>
          <text x="200" y="250" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle" dominant-baseline="middle">Việt Nam Tự Hào</text>
        </svg>
      `
      return `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`
    }

    // Simulate fetching images from official sources
    const mockImages: NewsImage[] = [
      {
        id: 'celebration-1',
        title: 'Lễ kỷ niệm 80 năm Quốc khánh tại Hà Nội',
        source: 'dangcongsan.vn',
        url: createPatrioticImage('Lễ kỷ niệm 80 năm Quốc khánh', 'Lễ diễu binh, diễu hành kỷ niệm 80 năm Quốc khánh tại Quảng trường Ba Đình', 'celebration'),
        description: 'Lễ diễu binh, diễu hành kỷ niệm 80 năm Quốc khánh tại Quảng trường Ba Đình',
        date: '2025-09-02',
        category: 'celebration'
      },
      {
        id: 'celebration-2',
        title: 'Triển lãm lịch sử 80 năm độc lập',
        source: 'baochinhphu.vn',
        url: createPatrioticImage('Triển lãm lịch sử 80 năm độc lập', 'Triển lãm trưng bày các hiện vật lịch sử về cuộc đấu tranh giành độc lập', 'exhibition'),
        description: 'Triển lãm trưng bày các hiện vật lịch sử về cuộc đấu tranh giành độc lập',
        date: '2025-09-01',
        category: 'exhibition'
      },
      {
        id: 'celebration-3',
        title: 'Hoạt động văn hóa nghệ thuật',
        source: 'vtv.vn',
        url: createPatrioticImage('Hoạt động văn hóa nghệ thuật', 'Các chương trình văn hóa, nghệ thuật chào mừng 80 năm Quốc khánh', 'culture'),
        description: 'Các chương trình văn hóa, nghệ thuật chào mừng 80 năm Quốc khánh',
        date: '2025-08-30',
        category: 'culture'
      },
      {
        id: 'celebration-4',
        title: 'Giáo dục truyền thống cho thế hệ trẻ',
        source: 'dangcongsan.vn',
        url: createPatrioticImage('Giáo dục truyền thống cho thế hệ trẻ', 'Các hoạt động giáo dục truyền thống cho học sinh, sinh viên', 'education'),
        description: 'Các hoạt động giáo dục truyền thống cho học sinh, sinh viên',
        date: '2025-08-25',
        category: 'education'
      }
    ]

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return mockImages
  }

  static async fetchHistoricalImages(): Promise<NewsImage[]> {
    // Create historical patriotic SVG images
    const createHistoricalImage = (title: string, description: string, year: string) => {
      const svgContent = `
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="histGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#dc2626;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#histGrad)"/>
          <rect width="400" height="100" fill="#dc2626"/>
          <rect width="400" height="100" y="100" fill="#fbbf24"/>
          <rect width="400" height="100" y="200" fill="#dc2626"/>
          <text x="200" y="40" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle" dominant-baseline="middle">${title}</text>
          <text x="200" y="150" font-family="Arial, sans-serif" font-size="16" fill="#1f2937" text-anchor="middle" dominant-baseline="middle">${year}</text>
          <text x="200" y="260" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle" dominant-baseline="middle">Lịch Sử Hào Hùng</text>
        </svg>
      `
      return `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`
    }

    const mockImages: NewsImage[] = [
      {
        id: 'historical-1',
        title: 'Tuyên ngôn Độc lập 2/9/1945',
        source: 'dangcongsan.vn',
        url: createHistoricalImage('Tuyên ngôn Độc lập', 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình', '1945'),
        description: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình',
        date: '1945-09-02',
        category: 'historical'
      },
      {
        id: 'historical-2',
        title: 'Cách mạng Tháng Tám 1945',
        source: 'baochinhphu.vn',
        url: createHistoricalImage('Cách mạng Tháng Tám', 'Cuộc tổng khởi nghĩa giành chính quyền tháng 8/1945', '1945'),
        description: 'Cuộc tổng khởi nghĩa giành chính quyền tháng 8/1945',
        date: '1945-08-19',
        category: 'historical'
      },
      {
        id: 'historical-3',
        title: 'Chiến thắng Điện Biên Phủ 1954',
        source: 'vtv.vn',
        url: createHistoricalImage('Chiến thắng Điện Biên Phủ', 'Chiến thắng quyết định kết thúc chế độ thực dân Pháp', '1954'),
        description: 'Chiến thắng quyết định kết thúc chế độ thực dân Pháp',
        date: '1954-05-07',
        category: 'historical'
      }
    ]

    await new Promise(resolve => setTimeout(resolve, 1000))
    return mockImages
  }

  static async fetchImagesByCategory(category: string): Promise<NewsImage[]> {
    const allImages = await Promise.all([
      this.fetchCelebrationImages(),
      this.fetchHistoricalImages()
    ])
    
    return allImages.flat().filter(img => img.category === category)
  }

  static getSourceInfo(source: string) {
    const sourceMap = {
      'dangcongsan.vn': {
        name: 'Báo Điện tử Đảng Cộng sản',
        logo: 'https://dangcongsan.vn/logo.png',
        color: 'red'
      },
      'baochinhphu.vn': {
        name: 'Báo Chính phủ',
        logo: 'https://baochinhphu.vn/logo.png',
        color: 'blue'
      },
      'vtv.vn': {
        name: 'VTV - Đài Truyền hình Việt Nam',
        logo: 'https://vtv.vn/logo.png',
        color: 'green'
      }
    }
    
    return sourceMap[source as keyof typeof sourceMap] || {
      name: 'Nguồn tin chính thống',
      logo: '',
      color: 'gray'
    }
  }
}

export interface NewsImage {
  id: string
  title: string
  source: string
  url: string
  description: string
  date: string
  category: 'celebration' | 'exhibition' | 'culture' | 'education' | 'historical'
}

export default NewsImageFetcher
