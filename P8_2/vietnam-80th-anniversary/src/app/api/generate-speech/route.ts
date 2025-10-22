import { NextRequest, NextResponse } from 'next/server';
import { generateSpeech } from '@/lib/ai-client';

export async function POST(request: NextRequest) {
  try {
    const { text, voice = "Zephyr" } = await request.json();
    
    // Check if API key is available
    if (!process.env.AI_API_KEY) {
      return NextResponse.json({ 
        error: 'AI API key not configured',
        audioUrl: null 
      });
    }

    if (!text) {
      return NextResponse.json({ 
        error: 'Text is required',
        audioUrl: null 
      }, { status: 400 });
    }

    const speechResponse = await generateSpeech(text, voice);
    
    if (!speechResponse) {
      return NextResponse.json({ 
        error: 'Failed to generate speech',
        audioUrl: null 
      }, { status: 500 });
    }

    // Convert the response to base64 for web use
    const arrayBuffer = await speechResponse.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const audioUrl = `data:audio/mpeg;base64,${base64}`;

    return NextResponse.json({ 
      audioUrl: audioUrl,
      success: true
    });
  } catch (error) {
    console.error('Error generating speech:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      audioUrl: null 
    }, { status: 500 });
  }
}
