'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { localAssetsManager } from '@/lib/local-assets';

export default function TestAssetsWorkingPage() {
  const [assets, setAssets] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState<any>({});

  useEffect(() => {
    const testAssets = async () => {
      try {
        console.log('🧪 Testing assets...');
        
        // Load assets
        const loadedAssets = await localAssetsManager.loadAssets();
        setAssets(loadedAssets);
        console.log('✅ Assets loaded:', loadedAssets);
        
        // Test character image
        const characterImage = await localAssetsManager.getCharacterImage();
        console.log('👤 Character image:', characterImage);
        
        // Test chapter images
        const colonialImages = await localAssetsManager.getChapterImages('colonial');
        console.log('🏛️ Colonial images:', colonialImages);
        
        // Test audio
        const audioUrl = await localAssetsManager.getAudioUrl('chapter-colonial');
        console.log('🔊 Audio URL:', audioUrl);
        
        setTestResults({
          characterImage,
          colonialImages,
          audioUrl,
          assetsLoaded: !!loadedAssets
        });
        
      } catch (error) {
        console.error('❌ Test error:', error);
        setTestResults({ error: error.message });
      } finally {
        setLoading(false);
      }
    };

    testAssets();
  }, []);

  const testAudio = async () => {
    try {
      console.log('🔊 Testing audio playback...');
      await localAssetsManager.playAudio('chapter-colonial');
      console.log('✅ Audio test completed');
    } catch (error) {
      console.error('❌ Audio test failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-lg">Testing assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-red-600">
          🧪 Assets Working Test
        </h1>

        {/* Test Results */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Test Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Character Image</h3>
              {testResults.characterImage ? (
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-red-500">
                    <Image
                      src={testResults.characterImage}
                      alt="Character"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-green-600">✅ Working</p>
                    <p className="text-sm text-gray-600">{testResults.characterImage}</p>
                  </div>
                </div>
              ) : (
                <p className="text-red-600">❌ Not working</p>
              )}
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">Chapter Images</h3>
              {testResults.colonialImages && testResults.colonialImages.length > 0 ? (
                <div>
                  <p className="text-green-600">✅ {testResults.colonialImages.length} images found</p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {testResults.colonialImages.map((url: string, index: number) => (
                      <div key={index} className="relative">
                        <Image
                          src={url}
                          alt={`Colonial ${index + 1}`}
                          width={100}
                          height={100}
                          className="w-full h-20 object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-red-600">❌ No images found</p>
              )}
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">Audio</h3>
              {testResults.audioUrl ? (
                <div>
                  <p className="text-green-600">✅ Audio URL found</p>
                  <p className="text-sm text-gray-600">{testResults.audioUrl}</p>
                  <button
                    onClick={testAudio}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    🔊 Test Audio
                  </button>
                </div>
              ) : (
                <p className="text-red-600">❌ No audio found</p>
              )}
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-2">Assets Loading</h3>
              {testResults.assetsLoaded ? (
                <p className="text-green-600">✅ Assets loaded successfully</p>
              ) : (
                <p className="text-red-600">❌ Assets failed to load</p>
              )}
            </div>
          </div>
        </div>

        {/* Raw Data */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Raw Test Data</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(testResults, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
