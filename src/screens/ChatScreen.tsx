import { useState } from 'react';
import { Send, ChevronLeft, Sprout } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { chatMessages, type ChatMessage } from '@/data/mockData';
import { Button } from '@/components/ui/button';

export function ChatScreen() {
  const { goBack } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = { id: Date.now().toString(), sender: 'farmer', text: input.trim() };
    setMessages((m) => [...m, newMsg]);
    setInput('');
    setTimeout(() => {
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agronomist',
        text: 'This is a demonstration assistant, not a live agronomist. For irrigation, review your plot moisture and sensor freshness. For yellowing leaves or fertiliser dosage, consult a qualified agronomist before treatment.',
      };
      setMessages((m) => [...m, reply]);
    }, 1200);
  };

  return (
     <div className="flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex flex-shrink-0 items-center gap-3 border-b border-border bg-card px-4 py-3 sm:px-6 lg:px-8">
        <button onClick={goBack} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-muted tap-highlight -ml-2">
          <ChevronLeft size={20} className="text-accent" />
        </button>
        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
          <Sprout size={18} className="text-accent" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">Crop support</p>
          <p className="text-xs text-accent">Demo conversation</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 sm:px-6 lg:px-8 py-4 space-y-3 max-w-3xl mx-auto w-full">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'farmer' ? 'justify-end' : 'justify-start'} animate-slide-up`}
          >
            <div
              className={`max-w-[78%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                msg.sender === 'farmer'
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-card text-foreground shadow-panel'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mx-auto flex w-full max-w-3xl flex-shrink-0 items-center gap-2 border-t border-border bg-card px-4 py-3 sm:px-6 lg:px-8">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          aria-label="Your message" placeholder="Type your message..."
          className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
        />
        <Button
          size="icon"
          onClick={sendMessage}
          aria-label="Send message"
        >
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
}
