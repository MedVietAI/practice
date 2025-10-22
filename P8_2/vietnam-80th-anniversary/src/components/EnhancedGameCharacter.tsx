'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { localAssetsManager } from '@/lib/local-assets';

interface EnhancedGameCharacterProps {
  isSpeaking: boolean;
  message: string;
  onSpeechEnd?: () => void;
  chapterId: string;
  emotion?: 'happy' | 'serious' | 'proud' | 'thoughtful';
}

export default function EnhancedGameCharacter({ 
  isSpeaking, 
  message, 
  onSpeechEnd, 
  chapterId,
  emotion = 'thoughtful' 
}: EnhancedGameCharacterProps) {
  const [characterImage, setCharacterImage] = useState<string>('/character-placeholder.svg');
  const [isLoading, setIsLoading] = useState(true);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Load character image from local assets
    const loadCharacter = async () => {
      try {
        console.log('🔄 EnhancedGameCharacter: Loading character image...');
        const characterUrl = await localAssetsManager.getCharacterImage();
        console.log('✅ EnhancedGameCharacter: Character image loaded:', characterUrl);
        setCharacterImage(characterUrl);
      } catch (error) {
        console.error('❌ EnhancedGameCharacter: Error loading character:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCharacter();
  }, []);

  // Typewriter effect for messages
  useEffect(() => {
    if (message && isSpeaking) {
      setCurrentMessage('');
      setMessageIndex(0);
      
      const typewriter = setInterval(() => {
        if (messageIndex < message.length) {
          setCurrentMessage(message.slice(0, messageIndex + 1));
          setMessageIndex(prev => prev + 1);
        } else {
          clearInterval(typewriter);
          setTimeout(() => {
            onSpeechEnd?.();
          }, 2000);
        }
      }, 50);

      return () => clearInterval(typewriter);
    }
  }, [message, isSpeaking, messageIndex, onSpeechEnd]);

  const getChapterTheme = () => {
    switch (chapterId) {
      case 'colonial':
        return {
          bg: 'from-gray-800 to-red-900',
          border: 'border-red-500',
          text: 'text-red-600',
          accent: 'bg-red-500'
        };
      case 'revolution':
        return {
          bg: 'from-red-800 to-yellow-600',
          border: 'border-yellow-500',
          text: 'text-yellow-600',
          accent: 'bg-yellow-500'
        };
      case 'independence':
        return {
          bg: 'from-red-600 to-yellow-500',
          border: 'border-yellow-400',
          text: 'text-yellow-600',
          accent: 'bg-yellow-400'
        };
      case 'construction':
        return {
          bg: 'from-blue-800 to-green-600',
          border: 'border-green-500',
          text: 'text-green-600',
          accent: 'bg-green-500'
        };
      case 'modern':
        return {
          bg: 'from-green-600 to-blue-500',
          border: 'border-blue-400',
          text: 'text-blue-600',
          accent: 'bg-blue-400'
        };
      default:
        return {
          bg: 'from-red-500 to-yellow-500',
          border: 'border-yellow-400',
          text: 'text-yellow-600',
          accent: 'bg-yellow-400'
        };
    }
  };

  const theme = getChapterTheme();

  const getEmotionStyle = () => {
    switch (emotion) {
      case 'happy':
        return 'animate-bounce';
      case 'serious':
        return 'animate-pulse';
      case 'proud':
        return 'animate-pulse scale-105';
      case 'thoughtful':
        return 'animate-pulse';
      default:
        return 'animate-pulse';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-8">
      {/* Character container with enhanced styling */}
      <div className="relative group">
        <div className={`w-40 h-40 rounded-full overflow-hidden border-4 ${theme.border} shadow-2xl transform transition-all duration-500 ${getEmotionStyle()}`}>
          {isLoading ? (
            <div className={`w-full h-full bg-gradient-to-br ${theme.bg} flex items-center justify-center`}>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : (
            <Image
              src={characterImage}
              alt="Anh Minh - Người dẫn đường"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        {/* Speaking indicator */}
        {isSpeaking && (
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-ping">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        )}
        
        {/* Character name and title */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg">
          <div className={`text-sm font-bold ${theme.text}`}>Anh Minh</div>
          <div className="text-xs text-gray-600">Người dẫn đường tinh thần</div>
        </div>
      </div>
      
      {/* Message bubble with enhanced styling */}
      {currentMessage && (
        <div className="max-w-md relative">
          <div className={`bg-white rounded-2xl p-6 shadow-xl border-l-4 ${theme.accent} transform transition-all duration-500 hover:scale-105`}>
            <div className="flex items-start space-x-3">
              <div className={`w-3 h-3 rounded-full ${theme.accent} mt-2 animate-pulse`}></div>
              <div className="flex-1">
                <p className="text-gray-800 leading-relaxed text-lg">
                  {currentMessage}
                  {isSpeaking && <span className="animate-pulse">|</span>}
                </p>
              </div>
            </div>
          </div>
          
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
        </div>
      )}
      
      {/* Chapter progress indicator */}
      <div className="w-full max-w-xs">
        <div className="text-center text-sm text-gray-600 mb-2">
          Tiến độ chương
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${theme.accent}`}
            style={{ width: `${(getChapterProgress(chapterId))}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function getChapterProgress(chapterId: string): number {
  const progressMap: { [key: string]: number } = {
    'colonial': 20,
    'revolution': 40,
    'independence': 60,
    'construction': 80,
    'modern': 100
  };
  return progressMap[chapterId] || 0;
}
