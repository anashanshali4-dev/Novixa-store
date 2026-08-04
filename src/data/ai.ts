export type AIProvider = 'openai' | 'claude' | 'gemini';

export interface AIModelConfig {
  id: AIProvider;
  name: string;
  description: string;
  color: string;
  available: boolean;
}

export const AI_MODELS: AIModelConfig[] = [
  { id: 'openai', name: 'GPT-4o', description: 'OpenAI\'s most advanced model for general tasks', color: '#10A37F', available: true },
  { id: 'claude', name: 'Claude 3.5 Sonnet', description: 'Anthropic\'s model for nuanced reasoning', color: '#D97757', available: true },
  { id: 'gemini', name: 'Gemini 1.5 Pro', description: 'Google\'s multimodal model with long context', color: '#4285F4', available: true },
];

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  provider?: AIProvider;
  timestamp: number;
  suggestions?: string[];
  productRefs?: string[];
}

// Simulated AI responses based on query intent
export function generateAIResponse(query: string, provider: AIProvider): Omit<ChatMessage, 'id' | 'timestamp'> {
  const q = query.toLowerCase();

  // Product search intent
  if (q.includes('react') || q.includes('component')) {
    return {
      role: 'assistant',
      content: 'I found several React component libraries that would be perfect for your project. The Quantum React Kit is our bestseller with 80+ production-ready components and full TypeScript support. It\'s ideal if you need a comprehensive foundation. For something lighter, the Cipher Auth System focuses specifically on authentication flows.',
      provider,
      suggestions: ['Compare Quantum vs Cipher', 'Show me React products under $50', 'What\'s the download size?'],
      productRefs: ['p2', 'p9'],
    };
  }

  if (q.includes('design') || q.includes('ui kit') || q.includes('figma')) {
    return {
      role: 'assistant',
      content: 'For design work, I\'d recommend the Nebula UI Kit — it\'s our top-rated Figma kit with 200+ components and dark mode support. If you need icons, the Flux Icon System has 1000+ pixel-perfect SVGs. For brand work, the Prism Brand Kit includes logos, color systems, and guidelines.',
      provider,
      suggestions: ['Show me design products', 'What\'s included in Nebula?', 'Do these support Figma variables?'],
      productRefs: ['p1', 'p7', 'p11'],
    };
  }

  if (q.includes('ai') || q.includes('prompt') || q.includes('automation')) {
    return {
      role: 'assistant',
      content: 'We have excellent AI products. The Prompt Engineering Pack includes 500+ curated prompts for content, code, and marketing. For automation, the Spark AI Workflow builder comes with 30+ pre-built templates. Both support multiple AI models including GPT, Claude, and Gemini.',
      provider,
      suggestions: ['How do I use the prompts?', 'Can I customize the workflows?', 'Show AI products'],
      productRefs: ['p3', 'p10'],
    };
  }

  if (q.includes('price') || q.includes('cost') || q.includes('pricing')) {
    return {
      role: 'assistant',
      content: 'Product prices range from $19 to $89. Most products have significant discounts from their original prices. We also offer coupon codes — try NOVIXA10 for 10% off, or WELCOME20 for 20% off your first order. For ongoing access, our Pro plan includes credits and exclusive discounts.',
      provider,
      suggestions: ['What\'s included in Pro?', 'Apply a coupon', 'Show me products on sale'],
    };
  }

  if (q.includes('buy') || q.includes('purchase') || q.includes('checkout')) {
    return {
      role: 'assistant',
      content: 'Purchasing on Novixa is simple: add products to your cart, apply any coupon codes, and proceed to checkout. We support Apple Pay, Google Pay, and all major credit cards. After purchase, you\'ll get instant access to your downloads in your dashboard.',
      provider,
      suggestions: ['What payment methods are supported?', 'How do refunds work?', 'Show my cart'],
    };
  }

  // Default
  return {
    role: 'assistant',
    content: 'I\'m your Novixa AI assistant. I can help you search for products, explain features, compare options, and guide you through purchasing. Try asking me about React components, design kits, AI tools, or pricing. I\'m powered by multiple AI models so you always get the best response.',
    provider,
    suggestions: ['Find React components', 'Show me design kits', 'What AI products are available?', 'How does pricing work?'],
  };
}
