const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const AI_API_BASE = "https://api.thucchien.ai/v1";
const AI_API_KEY = "sk--";

async function makeRequest(url, options) {
  return new Promise((resolve, reject) => {
    const https = require('https');
    const http = require('http');
    const { URL } = require('url');
    
    const parsedUrl = new URL(url);
    const isHttps = parsedUrl.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const req = client.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, json: () => Promise.resolve(jsonData) });
        } catch (e) {
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, buffer: () => Promise.resolve(Buffer.from(data)) });
        }
      });
    });
    
    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function generateCharacterImage() {
  try {
    console.log('🖼️  Generating character image...');
    
    const response = await makeRequest(`${AI_API_BASE}/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`
      },
      body: JSON.stringify({
        model: "imagen-4",
        prompt: "A Vietnamese man in his 30s, wearing traditional ao dai in red and yellow colors, with a warm and patriotic expression. He should look like a guide or teacher, with kind eyes and a confident smile. The background should be subtle with Vietnamese flag colors. High quality, detailed, professional portrait style, photorealistic.",
        n: 1
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.data && result.data.length > 0) {
      const imageData = result.data[0];
      let imageBuffer;
      
      if (imageData.b64_json) {
        imageBuffer = Buffer.from(imageData.b64_json, 'base64');
      } else if (imageData.url) {
        const imageResponse = await makeRequest(imageData.url, { method: 'GET' });
        imageBuffer = await imageResponse.buffer();
      } else {
        throw new Error('No image data available');
      }
      
      const filePath = path.join(__dirname, 'public', 'assets', 'images', 'anh-minh-character.png');
      fs.writeFileSync(filePath, imageBuffer);
      console.log('✅ Saved character image');
      return true;
    } else {
      throw new Error('No image data returned');
    }
    
  } catch (error) {
    console.error('❌ Error generating character image:', error.message);
    return false;
  }
}

async function testAssetsAccess() {
  console.log('🧪 Testing assets access...');
  
  // Test if manifest is accessible
  try {
    const manifestPath = path.join(__dirname, 'public', 'assets', 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    console.log('✅ Manifest loaded successfully');
    console.log('📊 Images available:', Object.keys(manifest.images));
    console.log('📊 Audio available:', Object.keys(manifest.audio));
    
    // Check if character image exists
    const characterPath = path.join(__dirname, 'public', 'assets', 'images', 'anh-minh-character.png');
    if (fs.existsSync(characterPath)) {
      console.log('✅ Character image exists');
    } else {
      console.log('❌ Character image missing, generating...');
      await generateCharacterImage();
    }
    
    // Update manifest with character image
    manifest.images.character = '/assets/images/anh-minh-character.png';
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('✅ Updated manifest with character image');
    
  } catch (error) {
    console.error('❌ Error testing assets:', error);
  }
}

async function main() {
  console.log('🚀 Testing and fixing assets...');
  await testAssetsAccess();
  console.log('✅ Assets test completed!');
}

main().catch(console.error);
