'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2, Send, Bot, StopCircle, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { getAgentInfo } from '@/lib/agents/agentNames';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  agents?: string[];
  insights?: any[];
  actions?: any[];
}

export function OrchestratorChat({ businessId = 1 }: { businessId?: number }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Enhanced voice recognition
  const {
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported: isSpeechSupported
  } = useVoiceRecognition({
    language: 'en-IN',
    continuous: false,
    interimResults: true,
    onResult: (text) => {
      console.log('Voice input received:', text);
      handleSend(text);
    },
    onError: (error) => {
      console.error('Voice error:', error);
    }
  });

  // Enhanced text-to-speech
  const {
    speak,
    stop: stopSpeaking,
    isSpeaking,
    isSupported: isTTSSupported
  } = useTextToSpeech({
    rate: 0.9,
    pitch: 1.1,
    volume: 1.0,
    lang: 'en-IN'
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Update input when transcript changes
  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);

  async function handleSend(text?: string) {
    const query = text || inputValue.trim();
    if (!query) return;

    // Add user message
    setMessages(prev => [...prev, {
      role: 'user',
      content: query,
      timestamp: new Date()
    }]);
    setInputValue('');
    resetTranscript();
    setIsProcessing(true);

    try {
      const res = await fetch('/api/orchestrator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            query, 
            businessId, 
            mode: 'text',
            context: {
                pathname: window.location.pathname,
                timestamp: new Date().toISOString()
            }
        })
      });

      if (!res.ok) throw new Error('Request failed');

      const data = await res.json();

      // Add assistant message with agent info
      const responseContent = data.response || data.message || 'I encountered an issue processing your request. Please try again.';
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
        agents: data.agents || [],
        insights: data.insights || [],
        actions: data.actions || []
      }]);

      // Show toast notification if agent requests it
      if (data.showToast && data.toastMessage) {
        if (data.toastAction) {
          toast.success(data.toastMessage, {
            action: {
              label: data.toastAction.label,
              onClick: () => window.location.href = data.toastAction.link
            },
            duration: 10000
          });
        } else {
          toast.success(data.toastMessage);
        }
      }

      // Speak response with enhanced TTS
      if (isTTSSupported) {
        speak(responseContent);
        // Auto-restart listening if hands-free mode is active (simple check for now: if we were listening before)
        // Ideally we'd have a toggle, but for now let's assume if they used voice, they want to continue
        if (isSpeechSupported) {
          setTimeout(() => {
            startListening();
          }, 500);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to process query');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.',
        timestamp: new Date()
      }]);
    } finally {
      setIsProcessing(false);
    }
  }

  function toggleListening() {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }

  return (
    <Card className="flex flex-col h-[600px] shadow-lg">
      <CardHeader className="border-b flex-shrink-0 bg-gradient-to-r from-card to-card/50">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
              <Bot className="relative h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold">AI Orchestrator</div>
              <div className="text-xs font-normal text-muted-foreground">Multi-Agent Intelligence</div>
            </div>
          </div>
          <div className="flex gap-2">
            {!isSpeechSupported && (
              <Badge variant="destructive" className="text-xs">
                Voice not supported
              </Badge>
            )}
            {isSpeaking && (
              <Badge variant="outline" className="text-xs animate-pulse">
                <Volume2 className="h-3 w-3 mr-1" />
                Speaking
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div ref={scrollRef} className="p-4 space-y-4 min-h-full">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <Bot className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Welcome to LedgerTalk AI!</p>
                <p className="text-sm">Ask me anything about your business finances, sales, compliance, or market insights.</p>
                <p className="text-xs mt-4 text-primary">
                  {isSpeechSupported ? '🎤 Voice recognition enabled' : '⚠️ Voice not available - use text input'}
                </p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-4 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground'
                      : 'bg-gradient-to-br from-muted to-muted/50'
                  }`}>
                    {msg.role === 'assistant' && msg.agents && msg.agents.length > 0 && (
                      <div className="flex gap-2 mb-2 flex-wrap">
                        {msg.agents.map((agent, i) => {
                          const agentInfo = getAgentInfo(agent);
                          return (
                            <Badge key={i} variant="outline" className="text-xs">
                              {agentInfo.name}
                            </Badge>
                          );
                        })}
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                    {msg.insights && msg.insights.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs font-semibold">Key Insights:</p>
                        {msg.insights.slice(0, 3).map((insight, i) => (
                          <div key={i} className="text-xs bg-background/50 p-2 rounded border border-l-4 border-l-blue-500">
                            <p className="font-medium">{insight.title}</p>
                            <p className="text-muted-foreground mt-1">{insight.message.substring(0, 100)}...</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Display Actions */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs font-semibold">Actions Taken:</p>
                        {msg.actions.map((action, i) => (
                          <div key={i} className="text-xs bg-green-500/10 p-2 rounded border border-l-4 border-l-green-500 flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                            <p className="font-medium">{action.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-4">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t p-4 space-y-2 flex-shrink-0 bg-card/50 backdrop-blur-sm">
          {isListening && (
            <div className="text-sm text-primary animate-pulse flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Listening... {interimTranscript && <span className="text-muted-foreground">"{interimTranscript}"</span>}
            </div>
          )}

          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder={isSpeechSupported ? "Type or click mic to speak..." : "Type your question..."}
              disabled={isProcessing || isListening}
              className="flex-1"
            />
            
            {isSpeechSupported && (
              <Button
                size="icon"
                variant={isListening ? "destructive" : "outline"}
                onClick={toggleListening}
                disabled={isProcessing || isSpeaking}
                title={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            )}
            
            {isSpeaking && (
              <Button
                size="icon"
                variant="outline"
                onClick={stopSpeaking}
                title="Stop speaking"
              >
                <VolumeX className="h-4 w-4" />
              </Button>
            )}
            
            <Button
              size="icon"
              onClick={() => handleSend()}
              disabled={isProcessing || !inputValue.trim()}
              title="Send message"
            >
              {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
