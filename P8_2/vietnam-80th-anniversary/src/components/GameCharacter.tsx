'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface GameCharacterProps {
  isSpeaking: boolean;
  message: string;
  onSpeechEnd?: () => void;
}

export default function GameCharacter({ isSpeaking, message, onSpeechEnd }: GameCharacterProps) {
  const [characterImage, setCharacterImage] = useState<string>('/character-placeholder.png');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate character image using AI
    const generateCharacter = async () => {
      try {
        const response = await fetch('/api/generate-character');
        if (response.ok) {
          const data = await response.json();
          setCharacterImage(data.imageUrl);
        }
      } catch (error) {
        console.error('Error generating character:', error);
      } finally {
        setIsLoading(false);
      }
    };

    generateCharacter();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      <div className="relative">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-500 shadow-lg">
          {isLoading ? (
            <div className="w-full h-full bg-gradient-to-br from-red-100 to-yellow-100 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            </div>
          ) : (
            <Image
              src={characterImage}
              alt="Anh Minh - Người dẫn đường"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        {isSpeaking && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
      
      <div className="text-center max-w-md">
        <h3 className="text-lg font-bold text-red-600 mb-2">Anh Minh</h3>
        <p className="text-sm text-gray-600 mb-2">Người dẫn đường tinh thần</p>
        
        {message && (
          <div className="bg-white rounded-lg p-4 shadow-lg border-l-4 border-red-500">
            <p className="text-gray-800 leading-relaxed">{message}</p>
            {isSpeaking && (
              <div className="flex justify-center mt-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
