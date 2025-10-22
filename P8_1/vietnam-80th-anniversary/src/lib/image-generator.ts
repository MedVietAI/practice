import axios from 'axios'

const AI_API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.thucchien.ai'
const AI_API_KEY = process.env.API_KEY || process.env.OPENAI_API_KEY

export class ImageGenerator {
  // Generate images using Imagen
  static async generateImage(prompt: string, n: number = 1) {
    try {
      if (!AI_API_KEY) {
        console.warn('API_KEY not found, using mock images')
        return this.getMockImages(prompt, n)
      }

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
      // Return mock images on error
      return this.getMockImages(prompt, n)
    }
  }

  // Mock images for when API is not available
  private static getMockImages(prompt: string, n: number) {
    const mockImages = []
    for (let i = 0; i < n; i++) {
      mockImages.push({
        id: `mock_${Date.now()}_${i}`,
        b64_data: '',
        url: `data:image/svg+xml;base64,${Buffer.from(`
          <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#grad)"/>
            <text x="200" y="150" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">Hình Ảnh Lịch Sử</text>
            <text x="200" y="180" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" dominant-baseline="middle">80 Năm Quốc Khánh</text>
          </svg>
        `).toString('base64')}`
      })
    }
    return mockImages
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
