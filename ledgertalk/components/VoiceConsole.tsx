'use client';

import { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function VoiceConsole() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        size="icon"
        className="h-16 w-16 rounded-full shadow-lg"
        onClick={() => router.push('/assistant')}
      >
        <MessageSquare className="h-8 w-8" />
      </Button>
    </div>
  ) : null;
}
