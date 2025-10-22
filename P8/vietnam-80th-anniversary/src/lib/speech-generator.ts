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
  static async generateSpeech(text: string, voice: 'Zephyr' | 'Nova' | 'Shimmer' = 'Zephyr'): Promise<string> {
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
      
      // Convert response to blob URL
      const arrayBuffer = await response.arrayBuffer()
      const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' })
      return URL.createObjectURL(blob)
    } catch (error) {
      console.error('Error generating speech:', error)
      // Return mock response on error
      return this.getMockSpeechResponse(text)
    }
  }

  // Mock speech response for when API is not available
  private static getMockSpeechResponse(text: string): string {
    // Create a simple beep sound as mock audio
    const sampleRate = 44100
    const duration = 2 // 2 seconds
    const frequency = 800 // 800 Hz beep
    const samples = sampleRate * duration
    const buffer = new ArrayBuffer(44 + samples * 2)
    const view = new DataView(buffer)
    
    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i))
      }
    }
    
    writeString(0, 'RIFF')
    view.setUint32(4, 36 + samples * 2, true)
    writeString(8, 'WAVE')
    writeString(12, 'fmt ')
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, 1, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, sampleRate * 2, true)
    view.setUint16(32, 2, true)
    view.setUint16(34, 16, true)
    writeString(36, 'data')
    view.setUint32(40, samples * 2, true)
    
    // Generate sine wave with envelope for better sound
    for (let i = 0; i < samples; i++) {
      const t = i / sampleRate
      const envelope = Math.exp(-t * 2) // Exponential decay
      const sample = Math.sin(2 * Math.PI * frequency * t) * 0.3 * envelope
      view.setInt16(44 + i * 2, sample * 32767, true)
    }
    
    const blob = new Blob([buffer], { type: 'audio/wav' })
    return URL.createObjectURL(blob)
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
