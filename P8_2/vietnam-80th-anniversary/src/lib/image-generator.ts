'use client';

export interface GeneratedImage {
  url: string;
  type: string;
  prompt: string;
}

export class ImageGenerator {
  private static instance: ImageGenerator;
  private imageCache: Map<string, GeneratedImage[]> = new Map();

  public static getInstance(): ImageGenerator {
    if (!ImageGenerator.instance) {
      ImageGenerator.instance = new ImageGenerator();
    }
    return ImageGenerator.instance;
  }

  public async generateCharacterImage(): Promise<GeneratedImage | null> {
    const cacheKey = 'character';
    
    if (this.imageCache.has(cacheKey)) {
      const cached = this.imageCache.get(cacheKey);
      return cached ? cached[0] : null;
    }

    const prompt = `A Vietnamese man in his 30s, wearing traditional ao dai in red and yellow colors, with a warm and patriotic expression. He should look like a guide or teacher, with kind eyes and a confident smile. The background should be subtle with Vietnamese flag colors. High quality, detailed, professional portrait style, photorealistic.`;
    
    try {
      const response = await fetch('/api/generate-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'character',
          prompt: prompt,
          count: 1
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.images && data.images.length > 0) {
          this.imageCache.set(cacheKey, data.images);
          return data.images[0];
        }
      }
    } catch (error) {
      console.error('Error generating character image:', error);
    }

    return null;
  }

  public async generateChapterImages(chapterId: string): Promise<GeneratedImage[]> {
    const cacheKey = `chapter_${chapterId}`;
    
    if (this.imageCache.has(cacheKey)) {
      return this.imageCache.get(cacheKey) || [];
    }

    const prompts = this.getChapterPrompts(chapterId);
    const images: GeneratedImage[] = [];

    for (const prompt of prompts) {
      try {
        const response = await fetch('/api/generate-images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: `chapter_${chapterId}`,
            prompt: prompt,
            count: 1
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.images && data.images.length > 0) {
            images.push(data.images[0]);
          }
        }
      } catch (error) {
        console.error(`Error generating image for chapter ${chapterId}:`, error);
      }
    }

    this.imageCache.set(cacheKey, images);
    return images;
  }

  private getChapterPrompts(chapterId: string): string[] {
    const prompts: { [key: string]: string[] } = {
      colonial: [
        "Vietnamese people under French colonial rule, 19th century, black and white historical photo style, showing oppression and struggle",
        "Phan Bội Châu, Vietnamese revolutionary leader, portrait, historical photo style, serious expression",
        "French colonial buildings in Vietnam, 19th century architecture, historical photo style",
        "Vietnamese peasants working in rice fields under French rule, historical photo style, showing hardship"
      ],
      revolution: [
        "Ho Chi Minh as a young man, Nguyễn Tất Thành, in traditional Vietnamese clothing, historical photo style",
        "Ho Chi Minh during his travels abroad, 1920s-1930s, historical photo style, determined expression",
        "Communist Party meeting in Hong Kong, 1930, historical photo style, secretive atmosphere",
        "August Revolution 1945, Vietnamese people demonstrating, historical photo style, patriotic atmosphere"
      ],
      independence: [
        "Ho Chi Minh reading the Declaration of Independence, September 2, 1945, Ba Dinh Square, historical photo style",
        "Crowd at Ba Dinh Square during independence declaration, September 2, 1945, historical photo style",
        "Vietnamese flag being raised for the first time, September 2, 1945, historical photo style",
        "People celebrating independence in the streets, September 2, 1945, historical photo style"
      ],
      construction: [
        "Dien Bien Phu battle, 1954, Vietnamese soldiers, historical photo style, heroic atmosphere",
        "Vietnam War, American soldiers and Vietnamese landscape, 1960s-1970s, historical photo style",
        "Reunification Day, April 30, 1975, people celebrating in Saigon, historical photo style",
        "Doi Moi reform period, 1986, Vietnamese people working in factories, historical photo style"
      ],
      modern: [
        "Modern Ho Chi Minh City skyline, 2025, futuristic buildings, high-tech atmosphere",
        "Vietnamese technology companies, modern office buildings, 2025, professional atmosphere",
        "Vietnamese space program, satellite launch, 2025, scientific achievement",
        "Modern Vietnamese culture, traditional and modern elements combined, 2025, vibrant atmosphere"
      ]
    };

    return prompts[chapterId] || [];
  }

  public async generateTimelineImages(): Promise<GeneratedImage[]> {
    const cacheKey = 'timeline';
    
    if (this.imageCache.has(cacheKey)) {
      return this.imageCache.get(cacheKey) || [];
    }

    const prompts = [
      "Timeline of Vietnamese history, 1858-2025, infographic style, showing key events",
      "Vietnamese flag evolution through history, infographic style, patriotic colors",
      "Map of Vietnam showing historical regions and important cities, infographic style",
      "Vietnamese cultural symbols and achievements timeline, infographic style"
    ];

    const images: GeneratedImage[] = [];

    for (const prompt of prompts) {
      try {
        const response = await fetch('/api/generate-images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'timeline',
            prompt: prompt,
            count: 1
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.images && data.images.length > 0) {
            images.push(data.images[0]);
          }
        }
      } catch (error) {
        console.error('Error generating timeline image:', error);
      }
    }

    this.imageCache.set(cacheKey, images);
    return images;
  }

  public clearCache(): void {
    this.imageCache.clear();
  }
}

export const imageGenerator = ImageGenerator.getInstance();
