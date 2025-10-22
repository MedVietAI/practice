import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '@/lib/ai-client';

export async function GET(request: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.AI_API_KEY) {
      return NextResponse.json({ 
        imageUrl: '/character-placeholder.svg' 
      });
    }

    const prompt = `A Vietnamese man in his 30s, wearing traditional ao dai in red and yellow colors, with a warm and patriotic expression. He should look like a guide or teacher, with kind eyes and a confident smile. The background should be subtle with Vietnamese flag colors. High quality, detailed, professional portrait style.`;
    
    const images = await generateImage(prompt, 1);
    
    if (!images || images.length === 0) {
      return NextResponse.json({ 
        imageUrl: '/character-placeholder.svg' 
      });
    }

    return NextResponse.json({ 
      imageUrl: images[0].b64_json ? `data:image/png;base64,${images[0].b64_json}` : images[0].url 
    });
  } catch (error) {
    console.error('Error generating character:', error);
    return NextResponse.json({ 
      imageUrl: '/character-placeholder.png' 
    });
  }
}
