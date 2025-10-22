'use client';

export interface LocalAssets {
  images: {
    character: string;
    colonial: string[];
    revolution: string[];
    independence: string[];
    construction: string[];
    modern: string[];
    timeline: string[];
  };
  audio: {
    [key: string]: string;
  };
  generatedAt: string;
  version: string;
}

class LocalAssetsManager {
  private static instance: LocalAssetsManager;
  private assets: LocalAssets | null = null;
  private loaded = false;

  public static getInstance(): LocalAssetsManager {
    if (!LocalAssetsManager.instance) {
      LocalAssetsManager.instance = new LocalAssetsManager();
    }
    return LocalAssetsManager.instance;
  }

  public async loadAssets(): Promise<LocalAssets> {
    if (this.loaded && this.assets) {
      return this.assets;
    }

    try {
      const response = await fetch('/assets/manifest.json');
      if (response.ok) {
        this.assets = await response.json();
        this.loaded = true;
        console.log('✅ Local assets loaded successfully');
        return this.assets!;
      } else {
        console.warn('⚠️ Could not load local assets, using fallbacks');
        return this.getFallbackAssets();
      }
    } catch (error) {
      console.error('❌ Error loading local assets:', error);
      return this.getFallbackAssets();
    }
  }

  public async getCharacterImage(): Promise<string> {
    const assets = await this.loadAssets();
    return assets.images.character || '/character-placeholder.svg';
  }

  public async getChapterImages(chapterId: string): Promise<string[]> {
    const assets = await this.loadAssets();
    const chapterImages = assets.images[chapterId as keyof typeof assets.images];
    
    if (Array.isArray(chapterImages)) {
      return chapterImages;
    }
    
    // Fallback to placeholder images
    return [
      'https://via.placeholder.com/400x300/ff0000/ffffff?text=Hình+ảnh+Lịch+sử+1',
      'https://via.placeholder.com/400x300/ff6600/ffffff?text=Hình+ảnh+Lịch+sử+2',
      'https://via.placeholder.com/400x300/ffcc00/ffffff?text=Hình+ảnh+Lịch+sử+3',
      'https://via.placeholder.com/400x300/00ff00/ffffff?text=Hình+ảnh+Lịch+sử+4'
    ];
  }

  public async getTimelineImages(): Promise<string[]> {
    const assets = await this.loadAssets();
    return assets.images.timeline || [];
  }

  public async getAudioUrl(audioKey: string): Promise<string | null> {
    const assets = await this.loadAssets();
    return assets.audio[audioKey] || null;
  }

  public async playAudio(audioKey: string): Promise<void> {
    const audioUrl = await this.getAudioUrl(audioKey);
    if (audioUrl) {
      try {
        const audio = new Audio(audioUrl);
        await audio.play();
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  }

  private getFallbackAssets(): LocalAssets {
    return {
      images: {
        character: '/character-placeholder.svg',
        colonial: [
          'https://via.placeholder.com/400x300/ff0000/ffffff?text=Thuộc+Địa+1',
          'https://via.placeholder.com/400x300/ff6600/ffffff?text=Thuộc+Địa+2',
          'https://via.placeholder.com/400x300/ffcc00/ffffff?text=Thuộc+Địa+3',
          'https://via.placeholder.com/400x300/00ff00/ffffff?text=Thuộc+Địa+4'
        ],
        revolution: [
          'https://via.placeholder.com/400x300/ff0000/ffffff?text=Cách+Mạng+1',
          'https://via.placeholder.com/400x300/ff6600/ffffff?text=Cách+Mạng+2',
          'https://via.placeholder.com/400x300/ffcc00/ffffff?text=Cách+Mạng+3',
          'https://via.placeholder.com/400x300/00ff00/ffffff?text=Cách+Mạng+4'
        ],
        independence: [
          'https://via.placeholder.com/400x300/ff0000/ffffff?text=Độc+Lập+1',
          'https://via.placeholder.com/400x300/ff6600/ffffff?text=Độc+Lập+2',
          'https://via.placeholder.com/400x300/ffcc00/ffffff?text=Độc+Lập+3',
          'https://via.placeholder.com/400x300/00ff00/ffffff?text=Độc+Lập+4'
        ],
        construction: [
          'https://via.placeholder.com/400x300/ff0000/ffffff?text=Xây+Dựng+1',
          'https://via.placeholder.com/400x300/ff6600/ffffff?text=Xây+Dựng+2',
          'https://via.placeholder.com/400x300/ffcc00/ffffff?text=Xây+Dựng+3',
          'https://via.placeholder.com/400x300/00ff00/ffffff?text=Xây+Dựng+4'
        ],
        modern: [
          'https://via.placeholder.com/400x300/ff0000/ffffff?text=Hiện+Đại+1',
          'https://via.placeholder.com/400x300/ff6600/ffffff?text=Hiện+Đại+2',
          'https://via.placeholder.com/400x300/ffcc00/ffffff?text=Hiện+Đại+3',
          'https://via.placeholder.com/400x300/00ff00/ffffff?text=Hiện+Đại+4'
        ],
        timeline: [
          'https://via.placeholder.com/400x300/ff0000/ffffff?text=Timeline+1',
          'https://via.placeholder.com/400x300/ff6600/ffffff?text=Timeline+2',
          'https://via.placeholder.com/400x300/ffcc00/ffffff?text=Timeline+3',
          'https://via.placeholder.com/400x300/00ff00/ffffff?text=Timeline+4'
        ]
      },
      audio: {},
      generatedAt: new Date().toISOString(),
      version: "1.0.0"
    };
  }
}

export const localAssetsManager = LocalAssetsManager.getInstance();
