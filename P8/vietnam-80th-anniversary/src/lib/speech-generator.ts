import OpenAI from 'openai'
import { PathLike } from 'fs'

// Initialize client with fallback for missing API key
const getClient = () => {
  const apiKey = process.env.API_KEY || process.env.OPENAI_API_KEY
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.thucchien.ai'
  
  if (!apiKey) {
    console.warn('API_KEY not found, speech generation disabled')
    return null
  }
  
  return new OpenAI({
    apiKey,
    baseURL
  })
}

export class SpeechGenerator {
  // Generate speech from text
  static async generateSpeech(text: string, voice: 'Zephyr' | 'Nova' | 'Shimmer' = 'Zephyr') {
    try {
      const client = getClient()
      if (!client) {
        // Return mock response when API key is not available
        return this.getMockSpeechResponse(text)
      }
      
      const response = await client.audio.speech.create({
        model: 'gemini-2.5-flash-preview-tts',
        voice: voice,
        input: text
      })
      
      return response
    } catch (error) {
      console.error('Error generating speech:', error)
      // Return mock response on error
      return this.getMockSpeechResponse(text)
    }
  }

  // Mock speech response for when API is not available
  private static getMockSpeechResponse(text: string) {
    return {
      stream: () => {
        // Mock stream that does nothing
        return new ReadableStream({
          start(controller) {
            controller.close()
          }
        })
      },
      streamToFile: async (path: string) => {
        console.log('Mock speech generation - no audio file created')
        return Promise.resolve()
      }
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
