import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { type, prompt, count = 1 } = await request.json();
    
    // Check if API key is available
    if (!process.env.AI_API_KEY) {
      return NextResponse.json({ 
        error: 'AI API key not configured',
        images: [] 
      });
    }

    const images = [];
    
    // Generate images based on type
    for (let i = 0; i < count; i++) {
      try {
        const response = await fetch(`${process.env.AI_API_BASE}/images/generations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.AI_API_KEY}`
          },
          body: JSON.stringify({
            model: "imagen-4",
            prompt: prompt,
            n: 1
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.data && result.data.length > 0) {
          const imageData = result.data[0];
          images.push({
            url: imageData.b64_json ? `data:image/png;base64,${imageData.b64_json}` : imageData.url,
            type: type,
            prompt: prompt
          });
        }
      } catch (error) {
        console.error(`Error generating image ${i + 1}:`, error);
        // Continue with other images even if one fails
      }
    }

    return NextResponse.json({ 
      images: images,
      success: images.length > 0
    });
  } catch (error) {
    console.error('Error in generate-images API:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      images: [] 
    }, { status: 500 });
  }
}
