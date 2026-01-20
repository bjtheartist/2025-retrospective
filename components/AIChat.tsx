import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { Message, SectorData } from '../types';
import { getSectorAnalysis } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  currentSectorId: string;
}

const AIChat: React.FC<Props> = ({ currentSectorId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hello! I'm your Venture Analyst for Chicago's 2025 ecosystem. Ask me about trends, data, or specific sectors shown on the screen.",
      timestamp: Date.now(),
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: input, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await getSectorAnalysis(userMsg.text, currentSectorId);
    
    const aiMsg: Message = { role: 'model', text: responseText, timestamp: Date.now() };
    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="text-white font-semibold">Analyst AI</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/95" ref={scrollRef}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-sm'
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-sm border border-slate-700 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    <span className="text-xs text-slate-400">Analyzing report data...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 bg-slate-800 border-t border-slate-700">
              <div className="flex items-center gap-2 bg-slate-900 rounded-full px-4 py-2 border border-slate-700 focus-within:border-emerald-500 transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about 2025 trends..."
                  className="bg-transparent border-none outline-none text-slate-200 text-sm w-full placeholder-slate-500"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="text-emerald-500 hover:text-emerald-400 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-lg shadow-emerald-900/20 flex items-center gap-2 group border border-emerald-500/50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!isOpen && <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">Ask AI Analyst</span>}
      </motion.button>
    </div>
  );
};

export default AIChat;
