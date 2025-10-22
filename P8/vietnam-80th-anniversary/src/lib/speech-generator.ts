import OpenAI from 'openai'
import { PathLike } from 'fs'

const client = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.thucchien.ai'
})

export class SpeechGenerator {
  // Generate speech from text
  static async generateSpeech(text: string, voice: 'Zephyr' | 'Nova' | 'Shimmer' = 'Zephyr') {
    try {
      const response = await client.audio.speech.create({
        model: 'gemini-2.5-flash-preview-tts',
        voice: voice,
        input: text
      })
      
      return response
    } catch (error) {
      console.error('Error generating speech:', error)
      throw error
    }
  }

  // Generate speech for game content
  static async generateGameSpeech(content: string, type: 'narration' | 'character' | 'instruction' = 'narration') {
    const voiceMap: Record<string, 'Zephyr' | 'Nova' | 'Shimmer'> = {
      narration: 'Zephyr',
      character: 'Nova', 
      instruction: 'Shimmer'
    }

    return await this.generateSpeech(content, voiceMap[type])
  }

  // Generate historical narration
  static async generateHistoricalNarration(event: string, context: string) {
    const narration = `Đây là câu chuyện về ${event}. ${context}. Hãy cùng khám phá lịch sử hào hùng của dân tộc Việt Nam.`
    
    return await this.generateGameSpeech(narration, 'narration')
  }

  // Generate character dialogue
  static async generateCharacterDialogue(character: string, dialogue: string) {
    const fullDialogue = `${character} nói: "${dialogue}"`
    
    return await this.generateGameSpeech(fullDialogue, 'character')
  }

  // Generate instruction speech
  static async generateInstruction(instruction: string) {
    const fullInstruction = `Hướng dẫn: ${instruction}. Hãy làm theo để tiếp tục cuộc phiêu lưu của bạn.`
    
    return await this.generateGameSpeech(fullInstruction, 'instruction')
  }
}

export default SpeechGenerator
