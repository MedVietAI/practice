'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { localAssetsManager } from '@/lib/local-assets';

export default function TestSimplePage() {
  const [characterImage, setCharacterImage] = useState<string>('/character-placeholder.svg');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        console.log('🔄 Loading character image...');
        const imageUrl = await localAssetsManager.getCharacterImage();
        console.log('✅ Character image loaded:', imageUrl);
        setCharacterImage(imageUrl);
      } catch (error) {
        console.error('❌ Error loading character:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCharacter();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6">Character Image Test</h1>
        
        {loading ? (
          <div className="text-blue-600">Loading...</div>
        ) : (
          <div>
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-red-500">
              <Image
                src={characterImage}
                alt="Character"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600">Image URL: {characterImage}</p>
            <p className="text-sm text-gray-600 mt-2">
              {characterImage.includes('anh-minh-character') ? '✅ Real image loaded' : '❌ Using placeholder'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
