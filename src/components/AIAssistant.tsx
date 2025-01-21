import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Minimize2, Maximize2, Send, Globe2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' }
];

// Simulated AI responses based on keywords
const getAIResponse = (message: string, language: string) => {
  const responses = {
    en: {
      product: "I can help you find the perfect anime merchandise! What type of item are you looking for?",
      order: "I can help you track your order or process a return. Could you provide your order number?",
      shipping: "Our standard shipping takes 3-5 business days. Express shipping is available for faster delivery.",
      payment: "We accept all major credit cards, PayPal, and digital wallets for payment.",
      size: "You can find our detailed size chart on each product page. Would you like help with sizing?",
      default: "How can I assist you today with your shopping experience?"
    },
    hi: {
      product: "मैं आपको सही एनीमे मर्चेंडाइज खोजने में मदद कर सकता हूं! आप किस तरह का आइटम ढूंढ रहे हैं?",
      order: "मैं आपके ऑर्डर को ट्रैक करने या रिटर्न प्रोसेस में मदद कर सकता हूं। क्या आप ऑर्डर नंबर प्रदान कर सकते हैं?",
      default: "मैं आपकी शॉपिंग में कैसे मदद कर सकता हूं?"
    },
    ta: {
      product: "சரியான அனிமே பொருட்களைக் கண்டுபிடிக்க நான் உங்களுக்கு உதவ முடியும்! நீங்கள் எந்த வகையான பொருளைத் தேடுகிறீர்கள்?",
      order: "உங்கள் ஆர்டரைக் கண்காணிக்க அல்லது திரும்பப் பெற நான் உதவ முடியும். ஆர்டர் எண்ணை வழங்க முடியுமா?",
      default: "உங்கள் ஷாப்பிங் அனுபவத்தில் நான் எவ்வாறு உதவ முடியும்?"
    },
    te: {
      product: "సరైన అనిమే మెర్చండైజ్ కనుగొనడంలో నేను మీకు సహాయం చేయగలను! మీరు ఏ రకమైన వస్తువును వెతుకుతున్నారు?",
      order: "మీ ఆర్డర్‌ను ట్రాక్ చేయడంలో లేదా రిటర్న్ ప్రాసెస్ చేయడంలో నేను సహాయం చేయగలను. మీరు ఆర్డర్ నంబర్‌ను అందించగలరా?",
      default: "మీ షాపింగ్ అనుభవంలో నేను ఎలా సహాయం చేయగలను?"
    }
  };

  const currentLangResponses = responses[language as keyof typeof responses] || responses.en;
  
  const message_lower = message.toLowerCase();
  if (message_lower.includes('product') || message_lower.includes('item')) {
    return currentLangResponses.product;
  } else if (message_lower.includes('order') || message_lower.includes('track')) {
    return currentLangResponses.order;
  } else if (message_lower.includes('shipping') && language === 'en') {
    return currentLangResponses.shipping;
  } else if (message_lower.includes('payment') && language === 'en') {
    return currentLangResponses.payment;
  } else if (message_lower.includes('size') && language === 'en') {
    return currentLangResponses.size;
  }
  return currentLangResponses.default;
};

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'bot' | 'user' }>>([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en');
  const [showLanguages, setShowLanguages] = useState(false);
  const { state: authState } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authState.isAuthenticated && messages.length === 0) {
      const welcomeMessage = `Hi ${authState.user?.name}! 👋 How can I help you today?`;
      setMessages([{ text: welcomeMessage, sender: 'bot' }]);
      setIsOpen(true);
    }
  }, [authState.isAuthenticated]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(input, language);
      setMessages(prev => [...prev, { text: aiResponse, sender: 'bot' }]);
    }, 1000);
  };

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setShowLanguages(false);
    // Add a language change notification
    setMessages(prev => [
      ...prev,
      { 
        text: `Language changed to ${languages.find(l => l.code === langCode)?.name}`,
        sender: 'bot'
      }
    ]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-purple-600 rounded-full shadow-lg flex items-center justify-center hover:bg-purple-700 transition-colors z-50 animate-bounce"
      >
        <Bot className="w-8 h-8 text-white" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-xl z-50 transition-all duration-300 ${isMinimized ? 'h-14' : 'h-[500px]'}`}>
      {/* Header */}
      <div className="bg-purple-600 rounded-t-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-white" />
          <span className="text-white font-medium">AI Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLanguages(!showLanguages)}
            className="text-white hover:text-purple-200"
          >
            <Globe2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:text-purple-200"
          >
            {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-purple-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Language Selector */}
      {showLanguages && !isMinimized && (
        <div className="absolute top-14 right-0 bg-white rounded-lg shadow-lg p-2 w-40">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 rounded-md ${
                language === lang.code ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="p-4 h-[380px] overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};