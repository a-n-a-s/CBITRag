import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { MessageInput } from "@/components/MessageInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { MessageSquare } from "lucide-react";
import axios from "axios";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/query", {
        question: content,
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data, // Use the response data directly here
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
      setMessage(""); // Clear the input if needed
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  console.log(messages);
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">RAG Chat</h1>
              <p className="text-sm text-gray-600">
                AI-powered document assistant
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white/60 backdrop-blur-sm">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Welcome to RAG Chat
              </h2>
              <p className="text-gray-700 max-w-md mb-8">
                Ask questions about your documents and get AI-powered answers
                based on your knowledge base.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                <div className="p-6 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-3">
                    Example Questions
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• "What are the main topics in my documents?"</li>
                    <li>• "Summarize the key findings"</li>
                    <li>• "Find information about [specific topic]"</li>
                  </ul>
                </div>
                <div className="p-6 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-3">How it works</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Searches your document knowledge base</li>
                    <li>• Retrieves relevant context</li>
                    <li>• Generates accurate responses</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-0">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.content}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              {isLoading && <TypingIndicator />}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default Index;
