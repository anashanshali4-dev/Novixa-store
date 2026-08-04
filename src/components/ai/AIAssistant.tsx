import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Cpu, ChevronDown, Check, Zap } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { AI_MODELS, generateAIResponse } from '@/data/ai';
import type { AIProvider, ChatMessage } from '@/data/ai';
import { getProductById } from '@/data/store';

export function AIAssistant() {
  const { aiOpen, setAiOpen, navigate } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [provider, setProvider] = useState<AIProvider>('openai');
  const [providerOpen, setProviderOpen] = useState(false);
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aiOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: 'Hi! I\'m your Novixa AI assistant. I can help you find products, explain features, compare options, and guide you through purchasing. What are you looking for today?',
          provider: 'openai',
          timestamp: Date.now(),
          suggestions: ['Find React components', 'Show me design kits', 'What AI products are available?', 'How does pricing work?'],
        },
      ]);
    }
  }, [aiOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking]);

  const handleSend = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;

    const userMsg: ChatMessage = {
      id: `u${Date.now()}`,
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setThinking(true);

    setTimeout(() => {
      const response = generateAIResponse(content, provider);
      setMessages((prev) => [
        ...prev,
        { ...response, id: `a${Date.now()}`, timestamp: Date.now() },
      ]);
      setThinking(false);
    }, 1200);
  };

  const currentModel = AI_MODELS.find((m) => m.id === provider)!;

  return (
    <AnimatePresence>
      {aiOpen && (
        <motion.div
          className="fixed bottom-4 right-4 z-[85] w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-2rem)]"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="glass-strong rounded-3xl flex flex-col h-full overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-novixa-blue/20 to-novixa-purple/20 flex items-center justify-center">
                    <Sparkles size={18} className="text-novixa-blue" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-novixa-bg" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-novixa-white">AI Assistant</p>
                  <p className="text-2xs text-emerald-400">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* Model selector */}
                <div className="relative">
                  <button
                    onClick={() => setProviderOpen((o) => !o)}
                    className="flex items-center gap-1.5 glass rounded-lg px-2.5 py-1.5 text-xs text-novixa-muted hover:text-novixa-white transition-colors"
                  >
                    <Cpu size={12} style={{ color: currentModel.color }} />
                    <span className="hidden sm:inline">{currentModel.name}</span>
                    <ChevronDown size={10} />
                  </button>
                  <AnimatePresence>
                    {providerOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setProviderOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 top-full mt-1 glass-strong rounded-xl py-1 min-w-[200px] z-20"
                        >
                          <div className="px-3 py-1.5 text-2xs font-semibold uppercase tracking-ultra text-novixa-muted">
                            AI Model
                          </div>
                          {AI_MODELS.map((model) => (
                            <button
                              key={model.id}
                              onClick={() => { setProvider(model.id); setProviderOpen(false); }}
                              className={`w-full flex items-center gap-2.5 px-3 py-2 hover:bg-white/5 transition-colors ${provider === model.id ? 'bg-white/5' : ''}`}
                            >
                              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${model.color}15` }}>
                                <Cpu size={12} style={{ color: model.color }} />
                              </div>
                              <div className="flex-1 text-left">
                                <p className="text-xs font-medium text-novixa-white">{model.name}</p>
                                <p className="text-2xs text-novixa-muted truncate">{model.description}</p>
                              </div>
                              {provider === model.id && <Check size={12} className="text-novixa-blue" />}
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
                <button onClick={() => setAiOpen(false)} className="p-1.5 text-novixa-muted hover:text-novixa-white transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : ''}`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-novixa-blue/20 to-novixa-purple/20 flex items-center justify-center">
                          <Sparkles size={10} className="text-novixa-blue" />
                        </div>
                        <span className="text-2xs text-novixa-muted">
                          {AI_MODELS.find((m) => m.id === msg.provider)?.name}
                        </span>
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-sm ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-novixa-blue/20 to-novixa-purple/20 text-novixa-white border border-white/10'
                          : 'glass text-novixa-white'
                      }`}
                    >
                      {msg.content}
                    </div>

                    {/* Product refs */}
                    {msg.productRefs && msg.productRefs.length > 0 && (
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {msg.productRefs.map((id) => {
                          const product = getProductById(id);
                          if (!product) return null;
                          const Icon = product.icon;
                          return (
                            <button
                              key={id}
                              onClick={() => { navigate(`/product/${id}`); setAiOpen(false); }}
                              className="glass rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 hover:border-white/20 transition-colors"
                            >
                              <Icon size={12} style={{ color: product.color }} />
                              <span className="text-2xs text-novixa-white">{product.name}</span>
                              <span className="text-2xs text-novixa-cyan">${product.price}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Suggestions */}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {msg.suggestions.map((sug) => (
                          <button
                            key={sug}
                            onClick={() => handleSend(sug)}
                            className="glass rounded-full px-2.5 py-1 text-2xs text-novixa-muted hover:text-novixa-white hover:border-white/20 transition-colors"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Thinking indicator */}
              {thinking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="glass rounded-2xl px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-novixa-blue"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                    <span className="text-2xs text-novixa-muted">Thinking...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-white/5 px-4 py-3">
              <div className="flex items-center gap-2 glass rounded-2xl px-3 py-2">
                <Sparkles size={16} className="text-novixa-muted shrink-0" />
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                  placeholder="Ask anything about products..."
                  className="flex-1 bg-transparent text-sm text-novixa-white placeholder:text-novixa-muted focus:outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="p-1.5 rounded-lg bg-gradient-to-r from-novixa-blue to-novixa-purple text-white disabled:opacity-30 transition-opacity"
                >
                  <Send size={14} />
                </button>
              </div>
              <div className="flex items-center justify-between mt-2 px-1">
                <span className="text-2xs text-novixa-muted flex items-center gap-1">
                  <Zap size={10} className="text-novixa-blue" />
                  Powered by {currentModel.name}
                </span>
                <button onClick={() => { setAiOpen(false); navigate('/assistant'); }} className="text-2xs text-novixa-blue hover:text-novixa-blue-soft">
                  Open full view
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
