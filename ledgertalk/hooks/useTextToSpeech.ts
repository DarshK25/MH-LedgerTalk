'use client';

import { useState } from 'react';

export function useTextToSpeech() {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const speak = (text: string) => {
        // TODO: Implement text to speech
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 1000);
    };

    return {
        isSpeaking,
        speak,
    };
}
