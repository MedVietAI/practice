import axios from 'axios';
import * as cheerio from 'cheerio';

export interface NewsImage {
  url: string;
  title: string;
  source: string;
  description?: string;
}

const sources = [
  {
    name: 'dangcongsan',
    baseUrl: 'https://dangcongsan.vn',
    searchPath: '/tim-kiem'
  },
  {
    name: 'baochinhphu',
    baseUrl: 'https://baochinhphu.vn',
    searchPath: '/tim-kiem'
  },
  {
    name: 'vtv',
    baseUrl: 'https://vtv.vn',
    searchPath: '/tim-kiem'
  }
];

export const crawlImages = async (keywords: string[]): Promise<NewsImage[]> => {
  const allImages: NewsImage[] = [];
  
  for (const source of sources) {
    for (const keyword of keywords) {
      try {
        const images = await crawlSourceImages(source, keyword);
        allImages.push(...images);
      } catch (error) {
        console.error(`Error crawling ${source.name} for keyword "${keyword}":`, error);
      }
    }
  }
  
  return allImages;
};

const crawlSourceImages = async (source: any, keyword: string): Promise<NewsImage[]> => {
  const images: NewsImage[] = [];
  
  try {
    const searchUrl = `${source.baseUrl}${source.searchPath}?q=${encodeURIComponent(keyword)}`;
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(response.data);
    
    // Common selectors for news images
    const imageSelectors = [
      'img[src*=".jpg"]',
      'img[src*=".jpeg"]',
      'img[src*=".png"]',
      'img[src*=".webp"]'
    ];
    
    imageSelectors.forEach(selector => {
      $(selector).each((index, element) => {
        const $img = $(element);
        const src = $img.attr('src');
        const alt = $img.attr('alt') || '';
        const title = $img.attr('title') || alt;
        
        if (src && !src.startsWith('data:')) {
          const fullUrl = src.startsWith('http') ? src : `${source.baseUrl}${src}`;
          
          images.push({
            url: fullUrl,
            title: title || keyword,
            source: source.name,
            description: alt
          });
        }
      });
    });
    
  } catch (error) {
    console.error(`Error crawling ${source.name}:`, error);
  }
  
  return images;
};

export const getHistoricalImages = async (): Promise<NewsImage[]> => {
  const keywords = [
    'kỷ niệm 80 năm quốc khánh',
    '2/9/1945',
    'tuyên ngôn độc lập',
    'hồ chí minh',
    'cách mạng tháng tám',
    'quảng trường ba đình',
    'kháng chiến chống pháp',
    'điện biên phủ',
    'thành tựu việt nam',
    'phát triển kinh tế',
    'công nghệ việt nam',
    'văn hóa việt nam'
  ];
  
  return await crawlImages(keywords);
};
