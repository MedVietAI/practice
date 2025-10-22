'use client';

class SoundManager {
  private static instance: SoundManager;
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private isEnabled = true;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  public async playSound(soundType: 'correct' | 'incorrect' | 'timeup' | 'chapter' | 'background') {
    if (!this.isEnabled || !this.audioContext) return;

    try {
      const frequency = this.getFrequencyForSound(soundType);
      const duration = this.getDurationForSound(soundType);
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Could not play sound:', error);
    }
  }

  private getFrequencyForSound(soundType: string): number {
    switch (soundType) {
      case 'correct': return 800; // Higher pitch for correct answers
      case 'incorrect': return 200; // Lower pitch for incorrect answers
      case 'timeup': return 150; // Very low pitch for time up
      case 'chapter': return 600; // Medium pitch for chapter transitions
      case 'background': return 400; // Background ambient sound
      default: return 440;
    }
  }

  private getDurationForSound(soundType: string): number {
    switch (soundType) {
      case 'correct': return 0.3;
      case 'incorrect': return 0.5;
      case 'timeup': return 1.0;
      case 'chapter': return 0.8;
      case 'background': return 2.0;
      default: return 0.5;
    }
  }

  public playBackgroundMusic() {
    if (!this.isEnabled || !this.audioContext) return;

    // Create a simple ambient background sound
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.02, this.audioContext.currentTime);
    
    oscillator.start();
    
    // Stop after 10 seconds
    setTimeout(() => {
      oscillator.stop();
    }, 10000);
  }
}

export const soundManager = SoundManager.getInstance();
