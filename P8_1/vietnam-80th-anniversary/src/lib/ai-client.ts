import OpenAI from 'openai'

// Initialize client with fallback for missing API key
const getClient = () => {
  const apiKey = process.env.API_KEY || process.env.OPENAI_API_KEY
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.thucchien.ai'
  
  if (!apiKey) {
    console.warn('API_KEY not found, using mock responses')
    return null
  }
  
  return new OpenAI({
    apiKey,
    baseURL
  })
}

export class AIClient {
  // Text generation using Gemini
  static async generateText(prompt: string, model: 'gemini-2.5-flash' | 'gemini-2.5-pro' = 'gemini-2.5-flash') {
    try {
      const client = getClient()
      if (!client) {
        // Return mock response when API key is not available
        return this.getMockResponse(prompt)
      }
      
      const response = await client.chat.completions.create({
        model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
      return response.choices[0].message.content
    } catch (error) {
      console.error('Error generating text:', error)
      // Return mock response on error
      return this.getMockResponse(prompt)
    }
  }

  // Mock responses for when API is not available
  private static getMockResponse(prompt: string): string {
    if (prompt.includes('câu hỏi') || prompt.includes('question')) {
      return "Đây là một câu hỏi thú vị về lịch sử Việt Nam. Hãy suy nghĩ kỹ và đưa ra câu trả lời của bạn."
    }
    if (prompt.includes('story') || prompt.includes('câu chuyện')) {
      return "Đây là một câu chuyện hấp dẫn về lịch sử Việt Nam. Hãy khám phá thêm để tìm hiểu chi tiết."
    }
    if (prompt.includes('fact') || prompt.includes('sự kiện')) {
      return "Đây là một sự kiện quan trọng trong lịch sử Việt Nam. Hãy tìm hiểu thêm để hiểu rõ hơn."
    }
    return "Đây là nội dung được tạo bởi AI về lịch sử Việt Nam. Hãy khám phá thêm để tìm hiểu chi tiết."
  }

  // Generate game content
  static async generateGameContent(type: 'question' | 'story' | 'fact', topic: string) {
    const prompts = {
      question: `Tạo một câu hỏi thú vị về ${topic} trong lịch sử Việt Nam. Câu hỏi phải phù hợp với học sinh và có tính giáo dục cao.`,
      story: `Viết một câu chuyện ngắn hấp dẫn về ${topic} trong lịch sử Việt Nam, phù hợp cho trẻ em và thanh thiếu niên.`,
      fact: `Cung cấp một sự kiện thú vị và ít được biết đến về ${topic} trong lịch sử Việt Nam.`
    }

    return await this.generateText(prompts[type])
  }

  // Generate quiz questions
  static async generateQuizQuestions(topic: string, difficulty: 'easy' | 'medium' | 'hard' = 'medium') {
    const prompt = `Tạo 5 câu hỏi trắc nghiệm về ${topic} trong lịch sử Việt Nam với độ khó ${difficulty}. 
    Mỗi câu hỏi có 4 lựa chọn và chỉ có 1 đáp án đúng. 
    Trả về dưới dạng JSON với format:
    {
      "questions": [
        {
          "question": "Câu hỏi",
          "options": ["A", "B", "C", "D"],
          "correct": 0,
          "explanation": "Giải thích"
        }
      ]
    }`

    const response = await this.generateText(prompt)
    try {
      return JSON.parse(response || '{}')
    } catch {
      return { questions: [] }
    }
  }

  // Generate RPG story content
  static async generateRPGContent(scenario: string, playerAction: string) {
    const prompt = `Tạo nội dung RPG về lịch sử Việt Nam. 
    Tình huống: ${scenario}
    Hành động của người chơi: ${playerAction}
    
    Tạo ra một đoạn văn hấp dẫn mô tả kết quả của hành động, bao gồm:
    - Mô tả tình huống mới
    - Các lựa chọn tiếp theo (2-3 lựa chọn)
    - Thông tin lịch sử liên quan
    
    Trả về dưới dạng JSON:
    {
      "description": "Mô tả tình huống",
      "options": ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3"],
      "historicalContext": "Thông tin lịch sử"
    }`

    const response = await this.generateText(prompt)
    try {
      return JSON.parse(response || '{}')
    } catch {
      return {
        description: "Có lỗi xảy ra khi tạo nội dung.",
        options: ["Thử lại"],
        historicalContext: ""
      }
    }
  }
}

export default AIClient
