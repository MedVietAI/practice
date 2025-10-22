import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '@/lib/ai-client';

export async function GET(request: NextRequest) {
  try {
    const prompt = `A Vietnamese man in his 30s, wearing traditional ao dai in red and yellow colors, with a warm and patriotic expression. He should look like a guide or teacher, with kind eyes and a confident smile. The background should be subtle with Vietnamese flag colors. High quality, detailed, professional portrait style.`;
    
    const images = await generateImage(prompt, 1);
    
    if (!images || images.length === 0) {
      return NextResponse.json({ error: 'Failed to generate character image' }, { status: 500 });
    }

    return NextResponse.json({ 
      imageUrl: images[0].b64_json ? `data:image/png;base64,${images[0].b64_json}` : images[0].url 
    });
  } catch (error) {
    console.error('Error generating character:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
