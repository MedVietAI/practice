'use client';

import { useState, useEffect } from 'react';
import { localAssetsManager } from '@/lib/local-assets';

export default function AssetDebugger() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const debugAssets = async () => {
      try {
        console.log('🔍 Starting asset debug...');
        
        // Test character image
        const characterImage = await localAssetsManager.getCharacterImage();
        console.log('👤 Character image:', characterImage);
        
        // Test chapter images
        const colonialImages = await localAssetsManager.getChapterImages('colonial');
        console.log('🏛️ Colonial images:', colonialImages);
        
        // Test audio
        const audioUrl = await localAssetsManager.getAudioUrl('chapter-colonial');
        console.log('🔊 Audio URL:', audioUrl);
        
        // Load full assets
        const assets = await localAssetsManager.loadAssets();
        console.log('📦 Full assets:', assets);
        
        setDebugInfo({
          characterImage,
          colonialImages,
          audioUrl,
          assets
        });
        
      } catch (error) {
        console.error('❌ Debug error:', error);
        setDebugInfo({ error: error instanceof Error ? error.message : 'Unknown error' });
      } finally {
        setLoading(false);
      }
    };

    debugAssets();
  }, []);

  if (loading) {
    return <div className="p-4 bg-yellow-100 text-yellow-800">🔍 Debugging assets...</div>;
  }

  return (
    <div className="p-4 bg-blue-100 text-blue-800 text-sm">
      <h3 className="font-bold mb-2">🔍 Asset Debug Info:</h3>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
}
