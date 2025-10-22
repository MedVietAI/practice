'use client';

import { generateText } from './ai-client';

interface HintCache {
  [questionId: string]: string;
}

class HintGenerator {
  private static instance: HintGenerator;
  private cache: HintCache = {};

  public static getInstance(): HintGenerator {
    if (!HintGenerator.instance) {
      HintGenerator.instance = new HintGenerator();
    }
    return HintGenerator.instance;
  }

  public async generateHint(question: {
    id: string;
    question: string;
    options: string[];
    chapter: string;
    difficulty: string;
  }): Promise<string> {
    // Check cache first
    if (this.cache[question.id]) {
      console.log('🎯 Using cached hint for question:', question.id);
      return this.cache[question.id];
    }

    try {
      console.log('🤖 Generating AI hint for question:', question.id);
      
      const prompt = `Bạn là một giáo viên lịch sử Việt Nam chuyên nghiệp. Hãy tạo một gợi ý thông minh cho câu hỏi trắc nghiệm sau:

Câu hỏi: "${question.question}"
Các lựa chọn: ${question.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join(', ')}
Chương: ${question.chapter}
Độ khó: ${question.difficulty}

Yêu cầu:
1. Gợi ý phải hữu ích nhưng KHÔNG được quá rõ ràng (không nói trực tiếp đáp án)
2. Gợi ý nên liên quan đến bối cảnh lịch sử, mốc thời gian, hoặc sự kiện quan trọng
3. Sử dụng ngôn ngữ tiếng Việt tự nhiên và thân thiện
4. Độ dài 1-2 câu, ngắn gọn nhưng ý nghĩa
5. Có thể gợi ý về xu hướng lịch sử hoặc tác động của sự kiện

Ví dụ gợi ý tốt: "Hãy nghĩ về thời kỳ này và những thay đổi lớn trong xã hội Việt Nam"
Ví dụ gợi ý không tốt: "Đáp án là B vì..."

Chỉ trả về gợi ý, không cần giải thích thêm.`;

      const hint = await generateText(prompt, "gemini-2.5-flash");
      
      if (hint && hint.trim()) {
        // Cache the generated hint
        this.cache[question.id] = hint.trim();
        console.log('✅ AI hint generated and cached:', hint.trim());
        return hint.trim();
      } else {
        throw new Error('Failed to generate hint');
      }
    } catch (error) {
      console.error('❌ Error generating AI hint:', error);
      
      // Fallback to contextual hints based on difficulty and chapter
      const fallbackHint = this.getFallbackHint(question);
      this.cache[question.id] = fallbackHint;
      return fallbackHint;
    }
  }

  private getFallbackHint(question: {
    chapter: string;
    difficulty: string;
  }): string {
    const chapterHints = {
      colonial: "Hãy nghĩ về thời kỳ đen tối khi đất nước ta chìm trong ách thống trị của thực dân Pháp.",
      revolution: "Đây là thời kỳ ngọn lửa cách mạng bùng lên mạnh mẽ, dẫn đến sự thay đổi lớn.",
      independence: "Hãy nhớ về giây phút thiêng liêng nhất trong lịch sử dân tộc - ngày độc lập.",
      construction: "Thời kỳ này đánh dấu những thử thách và thành tựu trong việc xây dựng đất nước.",
      modern: "Đây là thời kỳ Việt Nam hội nhập và phát triển mạnh mẽ trên trường quốc tế."
    };

    const difficultyHints = {
      easy: "Đây là kiến thức lịch sử cơ bản mà mọi người Việt Nam đều nên biết.",
      medium: "Hãy nhớ lại các sự kiện lịch sử quan trọng và mốc thời gian.",
      hard: "Đây là câu hỏi chuyên sâu, cần kiến thức chi tiết về lịch sử Việt Nam."
    };

    const chapterHint = chapterHints[question.chapter as keyof typeof chapterHints] || "Hãy suy nghĩ về bối cảnh lịch sử của thời kỳ này.";
    const difficultyHint = difficultyHints[question.difficulty as keyof typeof difficultyHints] || "Hãy suy nghĩ kỹ về câu hỏi này.";

    return `${chapterHint} ${difficultyHint}`;
  }

  public clearCache(): void {
    this.cache = {};
    console.log('🗑️ Hint cache cleared');
  }

  public getCacheSize(): number {
    return Object.keys(this.cache).length;
  }
}

export const hintGenerator = HintGenerator.getInstance();
