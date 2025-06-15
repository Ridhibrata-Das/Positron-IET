"use client";
import { useState, useCallback } from 'react';
import CameraPreview from './components/CameraPreview';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Mic, Settings, Share2, Shield, Wifi } from 'lucide-react';

// Helper function to create message components
const HumanMessage = ({ text }: { text: string }) => (
  <div className="flex gap-2 md:gap-3 items-start group animate-in slide-in-from-bottom-2">
    <Avatar className="h-7 w-7 md:h-8 md:w-8 ring-2 ring-offset-2 ring-offset-white ring-emerald-500/40">
      <AvatarImage src="/avatars/human.png" alt="Human" />
      <AvatarFallback>H</AvatarFallback>
    </Avatar>
    <div className="flex-1 space-y-1.5 md:space-y-2">
      <div className="flex items-center gap-1.5 md:gap-2">
        <p className="text-xs md:text-sm font-semibold text-zinc-900">You</p>
        <span className="text-[10px] md:text-xs text-zinc-500">{new Date().toLocaleTimeString()}</span>
      </div>
      <div className="rounded-lg bg-emerald-50 px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm text-zinc-800 shadow-sm">
        {text}
      </div>
    </div>
  </div>
);

const GeminiMessage = ({ text }: { text: string }) => (
  <div className="flex gap-2 md:gap-3 items-start group animate-in slide-in-from-bottom-2">
    <Avatar className="h-7 w-7 md:h-8 md:w-8 bg-blue-600 ring-2 ring-offset-2 ring-offset-white ring-blue-500/40">
      <AvatarImage src="/avatars/gemini.png" alt="Gemini" />
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
    <div className="flex-1 space-y-1.5 md:space-y-2">
      <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
        <p className="text-xs md:text-sm font-semibold text-zinc-900">Gemini</p>
        <Badge variant="secondary" className="h-4 md:h-5 text-[10px] md:text-xs bg-blue-50 text-blue-700 hover:bg-blue-50">AI Assistant</Badge>
        <span className="text-[10px] md:text-xs text-zinc-500">{new Date().toLocaleTimeString()}</span>
      </div>
      <div className="rounded-lg bg-white border border-zinc-200 px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm text-zinc-800 shadow-sm">
        {text}
      </div>
    </div>
  </div>
);

export default function BalaramAI() {
  const [messages, setMessages] = useState<{ type: 'human' | 'gemini', text: string }[]>([]);
  const [isConnected, setIsConnected] = useState(true);

  const handleTranscription = useCallback((transcription: string) => {
    setMessages(prev => [...prev, { type: 'gemini', text: transcription }]);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Mobile/Tablet: All content scrolls, no sticky header */}
      <div className="w-full max-w-7xl mx-auto px-2 md:px-4 py-2 md:py-4 flex flex-col gap-2 md:gap-4 flex-1">
        {/* Controls and Title */}
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <h1 className="text-lg md:text-xl font-semibold text-zinc-800">
              Balaram AI Chat
            </h1>
            <Badge variant="secondary" className="text-xs md:text-sm font-medium">
              Beta
            </Badge>
            <Badge variant={isConnected ? "default" : "destructive"} className="flex items-center gap-1 text-xs md:text-sm">
              <Wifi className="h-3 w-3 md:h-3.5 md:w-3.5" />
              {isConnected ? "Connected" : "Offline"}
            </Badge>
            <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9">
              <Settings className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <Badge variant="outline" className="flex items-center gap-1 text-xs md:text-sm">
              <Clock className="h-3 w-3 md:h-3.5 md:w-3.5" />
              Live Session
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 text-xs md:text-sm">
              <Shield className="h-3 w-3 md:h-3.5 md:w-3.5" />
              Secure
            </Badge>
            <Button variant="outline" size="sm" className="h-7 md:h-8 text-xs md:text-sm flex items-center gap-1">
              <Share2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Video Call Window - 90% of viewport height on mobile */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full" style={{height: 'min(90vh, 480px)'}}>
            <CameraPreview onTranscription={handleTranscription} className="h-full w-full" />
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-zinc-600 mt-2">
            <Mic className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <p>Voice recognition is active</p>
          </div>
        </div>

        {/* Chat Section - minimized on mobile */}
        <div className="w-full mt-2 md:mt-4" style={{maxHeight: '20vh', minHeight: '120px'}}>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="border-b px-3 md:px-4 py-2.5 md:py-3">
              <h2 className="text-sm md:text-base font-semibold text-zinc-800">Conversation</h2>
            </div>
            <ScrollArea className="h-[100px] md:h-[200px]">
              <div className="p-3 md:p-4 space-y-4 md:space-y-6">
                <GeminiMessage text="Hi! I'm Balaram AI. I can see and hear you. Let's chat!" />
                {messages.map((message, index) => (
                  message.type === 'human' ? (
                    <HumanMessage key={`msg-${index}`} text={message.text} />
                  ) : (
                    <GeminiMessage key={`msg-${index}`} text={message.text} />
                  )
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
} 