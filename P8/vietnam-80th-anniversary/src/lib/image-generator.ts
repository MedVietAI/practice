import axios from 'axios'

const AI_API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.thucchien.ai'
const AI_API_KEY = process.env.API_KEY

export class ImageGenerator {
  // Generate images using Imagen
  static async generateImage(prompt: string, n: number = 1) {
    try {
      const url = `${AI_API_BASE}/images/generations`
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`
      }
      
      const data = {
        model: 'imagen-4',
        prompt: prompt,
        n: n
      }

      const response = await axios.post(url, data, { headers })
      
      if (response.data && response.data.data) {
        return response.data.data.map((imageObj: any, index: number) => ({
          id: `generated_${Date.now()}_${index}`,
          b64_data: imageObj.b64_json,
          url: `data:image/png;base64,${imageObj.b64_json}`
        }))
      }
      
      return []
    } catch (error) {
      console.error('Error generating image:', error)
      throw error
    }
  }

  // Generate historical scene images
  static async generateHistoricalScene(event: string, style: 'realistic' | 'artistic' | 'cartoon' = 'realistic') {
    const stylePrompts = {
      realistic: 'photorealistic, detailed, historical accuracy',
      artistic: 'artistic painting style, beautiful colors, historical theme',
      cartoon: 'cartoon style, friendly, educational, colorful'
    }

    const prompt = `Historical scene of ${event} in Vietnam, ${stylePrompts[style]}, high quality, educational content`
    
    return await this.generateImage(prompt, 1)
  }

  // Generate character images for RPG
  static async generateCharacter(characterType: string, era: string) {
    const prompt = `Vietnamese historical character from ${era}, ${characterType}, traditional clothing, friendly appearance, educational game character`
    
    return await this.generateImage(prompt, 1)
  }

  // Generate celebration images
  static async generateCelebrationImage(celebration: string) {
    const prompt = `Vietnamese national celebration: ${celebration}, festive atmosphere, red and yellow colors, traditional elements, joyful mood`
    
    return await this.generateImage(prompt, 1)
  }
}

export default ImageGenerator
