'use client';

import { useEffect, useState } from 'react';

interface AnimatedBackgroundProps {
  chapterId: string;
}

export default function AnimatedBackground({ chapterId }: AnimatedBackgroundProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate particles based on chapter
    const particleCount = 50;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, [chapterId]);

  const getChapterColors = () => {
    switch (chapterId) {
      case 'colonial':
        return {
          primary: 'from-gray-900 to-red-900',
          secondary: 'from-red-800 to-gray-800',
          accent: 'red-500'
        };
      case 'revolution':
        return {
          primary: 'from-red-900 to-yellow-600',
          secondary: 'from-yellow-500 to-red-600',
          accent: 'yellow-400'
        };
      case 'independence':
        return {
          primary: 'from-red-600 to-yellow-500',
          secondary: 'from-yellow-400 to-red-500',
          accent: 'yellow-300'
        };
      case 'construction':
        return {
          primary: 'from-blue-900 to-green-600',
          secondary: 'from-green-500 to-blue-600',
          accent: 'green-400'
        };
      case 'modern':
        return {
          primary: 'from-green-600 to-blue-500',
          secondary: 'from-blue-400 to-green-500',
          accent: 'blue-300'
        };
      default:
        return {
          primary: 'from-red-500 to-yellow-500',
          secondary: 'from-yellow-400 to-red-400',
          accent: 'yellow-300'
        };
    }
  };

  const colors = getChapterColors();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.primary} opacity-20`} />
      
      {/* Animated gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${colors.secondary} opacity-10 animate-pulse`} />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute w-2 h-2 bg-${colors.accent} rounded-full opacity-30 animate-bounce`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
      
      {/* Moving light effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-300 rounded-full opacity-10 animate-ping" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-red-400 rounded-full opacity-10 animate-pulse" />
      
      {/* Historical timeline visualization */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-30" />
    </div>
  );
}
