'use client';

import { useState, useEffect } from 'react';

export function useVoiceRecognition() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    // TODO: Implement voice recognition

    return {
        isListening,
        transcript,
        startListening: () => setIsListening(true),
        stopListening: () => setIsListening(false),
    };
}
