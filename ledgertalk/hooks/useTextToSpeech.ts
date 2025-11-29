import { useState, useEffect, useRef } from 'react';

interface TextToSpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
  voice?: SpeechSynthesisVoice;
}

interface TextToSpeechResult {
  speak: (text: string, onEnd?: () => void) => void;
  isSpeaking: boolean;
  isSupported: boolean;
  stop: () => void;
}

export function useTextToSpeech(options: TextToSpeechOptions = {}): TextToSpeechResult {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    }

    return () => {
      if (utteranceRef.current && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = (text: string, onEnd?: () => void) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

      // Apply options
      utterance.rate = options.rate ?? 1;
      utterance.pitch = options.pitch ?? 1;
      utterance.volume = options.volume ?? 1;
      utterance.lang = options.lang ?? 'en-US';
      if (options.voice) {
        utterance.voice = options.voice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        if (onEnd) {
          onEnd();
        }
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error', event);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Text-to-speech not supported in this browser');
    }
  };

  const stop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return {
    speak,
    isSpeaking,
    isSupported,
    stop,
  };
}
