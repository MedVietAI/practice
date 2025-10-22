'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { localAssetsManager } from '@/lib/local-assets';

export default function TestAssetsPage() {
  const [assets, setAssets] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        console.log('🔄 Loading assets...');
        const loadedAssets = await localAssetsManager.loadAssets();
        console.log('✅ Assets loaded:', loadedAssets);
        setAssets(loadedAssets);
        setError(null);
      } catch (err) {
        console.error('❌ Error loading assets:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, []);

  const testAudio = async (audioKey: string) => {
    try {
      console.log(`🔊 Testing audio: ${audioKey}`);
      await localAssetsManager.playAudio(audioKey);
    } catch (err) {
      console.error('❌ Error playing audio:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading assets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error Loading Assets</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-red-600">
          🎨 Assets Test Page
        </h1>

        {/* Character Image Test */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Character Image</h2>
          <div className="flex items-center space-x-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-500">
              <Image
                src={assets?.images?.character || '/character-placeholder.svg'}
                alt="Character"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-lg font-semibold">Anh Minh</p>
              <p className="text-gray-600">Character Image: {assets?.images?.character}</p>
            </div>
          </div>
        </div>

        {/* Chapter Images Test */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Chapter Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(assets?.images || {}).map(([chapter, images]) => {
              if (chapter === 'character') return null;
              return (
                <div key={chapter} className="border rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2 capitalize">{chapter}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Array.isArray(images) && images.map((image, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={image}
                          alt={`${chapter} ${index + 1}`}
                          width={100}
                          height={100}
                          className="w-full h-20 object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {Array.isArray(images) ? images.length : 0} images
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Audio Test */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Audio Files</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(assets?.audio || {}).map(([key, url]) => (
              <button
                key={key}
                onClick={() => testAudio(key)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                🔊 {key}
              </button>
            ))}
          </div>
        </div>

        {/* Raw Assets Data */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Raw Assets Data</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(assets, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
