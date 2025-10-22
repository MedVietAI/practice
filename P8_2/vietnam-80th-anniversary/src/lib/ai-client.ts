import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_API_KEY,
  baseURL: "https://api.thucchien.ai"
});

export const generateText = async (prompt: string, model: string = "gemini-2.5-flash") => {
  try {
    const response = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating text:', error);
    return null;
  }
};

export const generateImage = async (prompt: string, n: number = 1) => {
  try {
    const response = await fetch(`${process.env.AI_API_BASE}/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AI_API_KEY}`
      },
      body: JSON.stringify({
        model: "imagen-4",
        prompt,
        n
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
};

export const generateSpeech = async (text: string, voice: string = "Zephyr") => {
  try {
    const response = await client.audio.speech.create({
      model: "gemini-2.5-flash-preview-tts",
      voice,
      input: text
    });
    return response;
  } catch (error) {
    console.error('Error generating speech:', error);
    return null;
  }
};
