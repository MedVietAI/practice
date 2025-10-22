'use client';

import { useState, useEffect } from 'react';
import { localAssetsManager } from '@/lib/local-assets';

interface AssetStatusProps {
  chapterId: string;
}

export default function AssetStatus({ chapterId }: AssetStatusProps) {
  const [assets, setAssets] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const loadedAssets = await localAssetsManager.loadAssets();
        setAssets(loadedAssets);
      } catch (error) {
        console.error('Error loading assets:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, [chapterId]);

  if (loading) {
    return (
      <div className="bg-blue-100 p-4 rounded-lg">
        <div className="text-blue-800">🔄 Loading assets...</div>
      </div>
    );
  }

  if (!assets) {
    return (
      <div className="bg-red-100 p-4 rounded-lg">
        <div className="text-red-800">❌ Failed to load assets</div>
      </div>
    );
  }

  const chapterImages = assets.images[chapterId] || [];
  const audioUrl = assets.audio[`chapter-${chapterId}`] || null;

  return (
    <div className="bg-gray-100 p-4 rounded-lg text-sm">
      <h4 className="font-bold text-gray-800 mb-2">📊 Asset Status for {chapterId}</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 className="font-semibold text-gray-700 mb-1">📸 Images ({chapterImages.length})</h5>
          {chapterImages.length > 0 ? (
            <ul className="text-gray-600">
              {chapterImages.map((url: string, index: number) => (
                <li key={index} className="truncate">
                  ✅ {url.split('/').pop()}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-red-600">❌ No images found</div>
          )}
        </div>
        
        <div>
          <h5 className="font-semibold text-gray-700 mb-1">🔊 Audio</h5>
          {audioUrl ? (
            <div className="text-gray-600">
              ✅ {audioUrl.split('/').pop()}
            </div>
          ) : (
            <div className="text-red-600">❌ No audio found</div>
          )}
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        Character: {assets.images.character ? '✅' : '❌'} | 
        Timeline: {assets.images.timeline?.length || 0} images
      </div>
    </div>
  );
}
