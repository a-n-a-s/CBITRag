
import { useState } from 'react';
import { Copy, Check, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-4 p-6 ${isUser ? 'bg-white/40' : 'bg-white/60'} backdrop-blur-sm border-b border-gray-100 group hover:bg-white/80 transition-all duration-200`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
        isUser ? 'bg-gray-700' : 'bg-gray-800'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <div className="text-white font-bold text-sm">AI</div>
        )}
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-800">
            {isUser ? 'You' : 'AI Assistant'}
          </span>
          <span className="text-xs text-gray-500">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {message}
          </p>
        </div>
        
        {!isUser && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 px-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100/80 border border-gray-200/80 backdrop-blur-sm"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span className="ml-2 text-xs">
                {copied ? 'Copied' : 'Copy'}
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
