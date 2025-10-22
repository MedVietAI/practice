'use client';

export interface SpeechAudio {
  url: string;
  text: string;
  type: string;
}

export class SpeechManager {
  private static instance: SpeechManager;
  private audioCache: Map<string, SpeechAudio> = new Map();
  private currentAudio: HTMLAudioElement | null = null;

  public static getInstance(): SpeechManager {
    if (!SpeechManager.instance) {
      SpeechManager.instance = new SpeechManager();
    }
    return SpeechManager.instance;
  }

  public async generateSpeech(text: string, type: string = 'narrator'): Promise<SpeechAudio | null> {
    const cacheKey = `${type}_${text.substring(0, 50)}`;
    
    if (this.audioCache.has(cacheKey)) {
      return this.audioCache.get(cacheKey) || null;
    }

    try {
      const response = await fetch('/api/generate-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text,
          voice: type === 'character' ? 'Zephyr' : 'Zephyr'
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.audioUrl) {
          const speechAudio: SpeechAudio = {
            url: data.audioUrl,
            text: text,
            type: type
          };
          this.audioCache.set(cacheKey, speechAudio);
          return speechAudio;
        }
      }
    } catch (error) {
      console.error('Error generating speech:', error);
    }

    return null;
  }

  public async playSpeech(text: string, type: string = 'narrator', onEnd?: () => void): Promise<void> {
    // Stop current audio if playing
    this.stopCurrentAudio();

    const speechAudio = await this.generateSpeech(text, type);
    if (!speechAudio) {
      console.warn('Could not generate speech for:', text);
      onEnd?.();
      return;
    }

    try {
      this.currentAudio = new Audio(speechAudio.url);
      this.currentAudio.onended = () => {
        this.currentAudio = null;
        onEnd?.();
      };
      this.currentAudio.onerror = () => {
        console.error('Error playing speech audio');
        this.currentAudio = null;
        onEnd?.();
      };
      
      await this.currentAudio.play();
    } catch (error) {
      console.error('Error playing speech:', error);
      onEnd?.();
    }
  }

  public stopCurrentAudio(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  public async playChapterIntro(chapterId: string): Promise<void> {
    const introTexts: { [key: string]: string } = {
      colonial: "Chào mừng bạn đến với chương đầu tiên của hành trình lịch sử. Chúng ta sẽ quay ngược thời gian về những ngày đen tối khi đất nước ta còn chìm trong ách thống trị của thực dân Pháp. Đây là thời kỳ đau thương nhưng cũng là thời kỳ nhen nhóm những ngọn lửa yêu nước đầu tiên.",
      revolution: "Bây giờ chúng ta bước vào chương thứ hai - Ngọn Lửa Cách Mạng. Hãy cùng theo dõi hành trình 30 năm tìm đường cứu nước của Bác Hồ, từ những ngày đầu ra đi đến sự ra đời của Đảng Cộng sản Việt Nam và cuộc Cách mạng Tháng Tám vĩ đại.",
      independence: "Và đây là giây phút thiêng liêng nhất trong lịch sử dân tộc - ngày 2 tháng 9 năm 1945. Tại Quảng trường Ba Đình, Bác Hồ đã đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa. Hàng triệu trái tim Việt Nam cùng hòa chung nhịp đập tự do.",
      construction: "Từ ngày độc lập, dân tộc ta đã trải qua biết bao thử thách để xây dựng đất nước. Cuộc kháng chiến chống Pháp và Mỹ, xây dựng chủ nghĩa xã hội, và bước ngoặt đổi mới năm 1986 đã mở ra một trang sử mới cho dân tộc.",
      modern: "Và cuối cùng, chúng ta đến với Việt Nam hiện đại - một quốc gia phát triển, hiện đại với những thành tựu rực rỡ. Từ nước nghèo đói trở thành nước có thu nhập trung bình, hội nhập sâu rộng với thế giới, và khẳng định vị thế trên trường quốc tế."
    };

    const text = introTexts[chapterId] || "Chào mừng bạn đến với chương mới của hành trình lịch sử Việt Nam.";
    await this.playSpeech(text, 'narrator');
  }

  public async playQuestionExplanation(question: string, explanation: string): Promise<void> {
    const text = `Câu hỏi: ${question}. Giải thích: ${explanation}`;
    await this.playSpeech(text, 'narrator');
  }

  public async playTimelineExplanation(): Promise<void> {
    const text = "Đây là dòng thời gian lịch sử Việt Nam, từ năm 1858 khi thực dân Pháp xâm lược đến năm 2025 kỷ niệm 80 năm độc lập. Mỗi sự kiện đều có ý nghĩa quan trọng trong hành trình phát triển của dân tộc.";
    await this.playSpeech(text, 'narrator');
  }

  public clearCache(): void {
    this.audioCache.clear();
    this.stopCurrentAudio();
  }
}

export const speechManager = SpeechManager.getInstance();
