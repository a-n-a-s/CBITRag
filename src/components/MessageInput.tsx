
import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const MessageInput = ({ onSendMessage, disabled }: MessageInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white border-t border-gray-100 p-6 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 focus-within:shadow-md focus-within:border-gray-300">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask me anything about your documents..."
            disabled={disabled}
            className="min-h-[80px] max-h-[200px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent placeholder:text-gray-400 text-gray-800 p-4 pr-16 rounded-2xl"
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            size="sm"
            className="absolute right-3 bottom-3 h-10 w-10 p-0 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-300 rounded-xl shadow-sm transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
