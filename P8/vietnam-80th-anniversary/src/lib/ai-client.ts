import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.thucchien.ai'
})

export class AIClient {
  // Text generation using Gemini
  static async generateText(prompt: string, model: 'gemini-2.5-flash' | 'gemini-2.5-pro' = 'gemini-2.5-flash') {
    try {
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
      throw error
    }
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
