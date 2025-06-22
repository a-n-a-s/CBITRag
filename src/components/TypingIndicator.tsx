
export const TypingIndicator = () => {
  return (
    <div className="flex gap-4 p-6 bg-white/60 backdrop-blur-sm border-b border-gray-100">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shadow-sm">
        <div className="w-5 h-5 text-white font-bold">AI</div>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold text-gray-800">AI Assistant</span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Creative thinking animation with floating dots */}
          <div className="relative">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-800 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-700 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            {/* Floating thought bubble effect */}
            <div className="absolute -top-1 left-0 w-1 h-1 bg-gray-800 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.1s' }}></div>
            <div className="absolute -top-2 left-2 w-1 h-1 bg-gray-600 rounded-full animate-bounce opacity-40" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute -top-1 left-4 w-1 h-1 bg-gray-700 rounded-full animate-bounce opacity-50" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <span className="text-gray-600 text-sm">Thinking...</span>
        </div>
      </div>
    </div>
  );
};
