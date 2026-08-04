import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Cpu, Check, Zap, Search, ShoppingBag, Brain, ArrowRight } from 'lucide-react';
import { AI_MODELS, generateAIResponse } from '@/data/ai';
import type { AIProvider, ChatMessage } from '@/data/ai';
import { useApp } from '@/store/AppContext';
import { getProductById } from '@/data/store';
import { PageHeader } from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/Button';

const CAPABILITIES = [
  { icon: Search, title: 'Search Products', desc: 'Find products by name, category, or natural language', color: '#0099FF' },
  { icon: Brain, title: 'Explain Features', desc: 'Get detailed explanations of what each product offers', color: '#7C3AED' },
  { icon: ShoppingBag, title: 'Compare Options', desc: 'Compare products side-by-side to make the best choice', color: '#22D3EE' },
  { icon: ArrowRight, title: 'Guide Purchases', desc: 'Step-by-step guidance from discovery to download', color: '#A259FF' },
];

export function AssistantPage() {
  const { navigate } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hi! I\'m your Novixa AI assistant. I can search products, explain features, compare options, and guide your purchasing decisions. What are you looking for today?',
      provider: 'openai',
      timestamp: Date.now(),
      suggestions: ['Find React components', 'Show me design kits', 'What AI products are available?', 'How does pricing work?'],
    },
  ]);
  const [input, setInput] = useState('');
  const [provider, setProvider] = useState<AIProvider>('openai');
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking]);

  const handleSend = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    setMessages((prev) => [...prev, { id: `u${Date.now()}`, role: 'user', content, timestamp: Date.now() }]);
    setInput('');
    setThinking(true);
    setTimeout(() => {
      const response = generateAIResponse(content, provider);
      setMessages((prev) => [...prev, { ...response, id: `a${Date.now()}`, timestamp: Date.now() }]);
      setThinking(false);
    }, 1200);
  };

  const currentModel = AI_MODELS.find((m) => m.id === provider)!;

  return (
    <div className="min-h-screen">
      <PageHeader
        title="AI Assistant"
        subtitle="Your intelligent guide to the Novixa ecosystem — powered by multi-model AI"
        breadcrumb={['Home', 'AI Assistant']}
      />

      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 pb-20">
        {/* Capabilities */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl p-5"
              >
                <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center" style={{ background: `${cap.color}15`, border: `1px solid ${cap.color}20` }}>
                  <Icon size={18} style={{ color: cap.color }} />
                </div>
                <p className="text-sm font-semibold text-novixa-white mb-1">{cap.title}</p>
                <p className="text-2xs text-novixa-muted font-light">{cap.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Chat interface */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          {/* Chat */}
          <div className="glass-card rounded-3xl flex flex-col h-[600px]">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-novixa-blue/20 to-novixa-purple/20 flex items-center justify-center">
                  <Sparkles size={18} className="text-novixa-blue" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-novixa-white">AI Assistant</p>
                  <p className="text-2xs text-emerald-400">Online · {currentModel.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {AI_MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setProvider(model.id)}
                    className={`flex items-center gap-1 glass rounded-lg px-2.5 py-1.5 text-2xs transition-colors ${provider === model.id ? 'text-novixa-white border-white/20' : 'text-novixa-muted'}`}
                  >
                    <Cpu size={10} style={{ color: model.color }} />
                    {model.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide px-5 py-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-2' : ''}`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Sparkles size={10} className="text-novixa-blue" />
                        <span className="text-2xs text-novixa-muted">{AI_MODELS.find((m) => m.id === msg.provider)?.name}</span>
                      </div>
                    )}
                    <div className={`rounded-2xl px-4 py-3 text-sm ${msg.role === 'user' ? 'bg-gradient-to-r from-novixa-blue/20 to-novixa-purple/20 text-novixa-white border border-white/10' : 'glass text-novixa-white'}`}>
                      {msg.content}
                    </div>
                    {msg.productRefs && msg.productRefs.length > 0 && (
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {msg.productRefs.map((id) => {
                          const product = getProductById(id);
                          if (!product) return null;
                          const Icon = product.icon;
                          return (
                            <button
                              key={id}
                              onClick={() => navigate(`/product/${id}`)}
                              className="glass rounded-xl px-3 py-1.5 flex items-center gap-2 hover:border-white/20 transition-colors"
                            >
                              <Icon size={12} style={{ color: product.color }} />
                              <span className="text-2xs text-novixa-white">{product.name}</span>
                              <span className="text-2xs text-novixa-cyan">${product.price}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {msg.suggestions.map((sug) => (
                          <button
                            key={sug}
                            onClick={() => handleSend(sug)}
                            className="glass rounded-full px-3 py-1 text-2xs text-novixa-muted hover:text-novixa-white hover:border-white/20 transition-colors"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {thinking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="glass rounded-2xl px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-novixa-blue" animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }} />
                      ))}
                    </div>
                    <span className="text-2xs text-novixa-muted">Thinking...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-white/5 px-5 py-4">
              <div className="flex items-center gap-2 glass rounded-2xl px-4 py-2.5">
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
                  className="p-2 rounded-lg bg-gradient-to-r from-novixa-blue to-novixa-purple text-white disabled:opacity-30 transition-opacity"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Model info */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-xs font-semibold text-novixa-white mb-3">Active Model</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${currentModel.color}15` }}>
                  <Cpu size={18} style={{ color: currentModel.color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-novixa-white">{currentModel.name}</p>
                  <p className="text-2xs text-novixa-muted">{currentModel.description}</p>
                </div>
              </div>
              <div className="space-y-2">
                {AI_MODELS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setProvider(m.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${provider === m.id ? 'glass' : 'hover:bg-white/5'}`}
                  >
                    <Cpu size={12} style={{ color: m.color }} />
                    <span className="text-2xs text-novixa-white flex-1">{m.name}</span>
                    {provider === m.id && <Check size={12} className="text-novixa-blue" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Capabilities */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-xs font-semibold text-novixa-white mb-3">Capabilities</h3>
              <div className="space-y-2">
                {['Product search', 'Feature explanations', 'Price comparisons', 'Purchase guidance', 'Category recommendations'].map((cap) => (
                  <div key={cap} className="flex items-center gap-2">
                    <Check size={12} className="text-emerald-400" />
                    <span className="text-2xs text-novixa-muted">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-xs font-semibold text-novixa-white mb-3">AI Stats</h3>
              <div className="space-y-3">
                {[
                  { label: 'Queries today', value: '1,284' },
                  { label: 'Avg response', value: '1.2s' },
                  { label: 'Accuracy', value: '98.4%' },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-2xs text-novixa-muted">{s.label}</span>
                    <span className="text-xs font-semibold text-novixa-white">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
