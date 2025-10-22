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
      console.log('📦 Using cached assets');
      return this.assets;
    }

    try {
      console.log('🔄 Fetching assets from /assets/manifest.json');
      const response = await fetch('/assets/manifest.json');
      console.log('📡 Response status:', response.status);
      
      if (response.ok) {
        this.assets = await response.json();
        this.loaded = true;
        console.log('✅ Local assets loaded successfully:', this.assets);
        return this.assets!;
      } else {
        console.warn('⚠️ Could not load local assets, using fallbacks. Status:', response.status);
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
           if (!audioUrl) {
             console.warn(`Audio asset not found for ID: ${audioKey}`);
             return;
           }

           try {
             console.log(`🔊 Attempting to play audio: ${audioUrl}`);
             
             // Create audio element with proper MIME type handling
             const audio = new Audio();
             
             // Add event listeners for debugging
             audio.addEventListener('loadstart', () => console.log('🔄 Audio loading started'));
             audio.addEventListener('canplay', () => console.log('✅ Audio can play'));
             audio.addEventListener('play', () => console.log('▶️ Audio started playing'));
             audio.addEventListener('ended', () => console.log('⏹️ Audio finished playing'));
             audio.addEventListener('error', (e) => {
               console.error('❌ Audio error:', e);
               console.error('❌ Audio error details:', {
                 error: audio.error,
                 networkState: audio.networkState,
                 readyState: audio.readyState,
                 src: audio.src
               });
             });
             
             // Set audio properties
             audio.volume = 0.7;
             audio.preload = 'auto';
             
             // Handle WAVE files with .mp3 extension
             // Note: The files are WAVE format but have .mp3 extension
             // Browsers should handle this automatically
             
             // Set the source
             audio.src = audioUrl;
             
             // Try to play immediately
             try {
               const playPromise = audio.play();
               if (playPromise !== undefined) {
                 await playPromise;
                 console.log(`✅ Audio played successfully: ${audioKey}`);
               }
             } catch (playError) {
               console.warn('⚠️ Immediate play failed, trying with user interaction...');
               
               // If immediate play fails, try to load first
               audio.load();
               
               // Wait for canplay event
               await new Promise((resolve, reject) => {
                 const timeout = setTimeout(() => {
                   reject(new Error('Audio loading timeout'));
                 }, 5000);
                 
                 audio.addEventListener('canplay', () => {
                   clearTimeout(timeout);
                   resolve(true);
                 });
                 
                 audio.addEventListener('error', (e) => {
                   clearTimeout(timeout);
                   reject(e);
                 });
               });
               
               // Try to play again
               const playPromise = audio.play();
               if (playPromise !== undefined) {
                 await playPromise;
                 console.log(`✅ Audio played successfully after load: ${audioKey}`);
               }
             }
           } catch (error) {
             console.error(`❌ Error playing audio ${audioKey}:`, error);
             
             // Final fallback - try with different approach
             try {
               console.log('🔄 Trying final fallback...');
               const audio = new Audio(audioUrl);
               audio.volume = 0.5;
               audio.play().catch(fallbackError => {
                 console.error('❌ Final fallback also failed:', fallbackError);
               });
             } catch (fallbackError) {
               console.error('❌ Final fallback method failed:', fallbackError);
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
