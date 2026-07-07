/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, Send, Sparkles } from 'lucide-react';
import ServiceHeader from './ServiceHeader';

interface TravelAssistantProps {
  onBack: () => void;
}

const suggestions = [
  'ما أفضل مطعم في الرياض؟',
  'اقترح رحلة يومية للعائلة',
  'ما أوقات عمل السبا؟',
  'كيف أصل إلى الدرعية؟',
  'ما العروض المتاحة حالياً؟',
];

const responses: Record<string, string> = {
  'ما أفضل مطعم في الرياض؟': 'أنصحك بمطعم ألبا الإيطالي داخل المنتجع (حائز نجوم ميشلان) أو مطعم النخيل للمأكولات العربية الفاخرة. يمكنني حجز طاولة لك فوراً.',
  'اقترح رحلة يومية للعائلة': 'جولة الدرعية التاريخية مثالية للعائلات — تشمل دليلاً خاصاً وعشاء في مطل البجيري. كما يتوفر نادي الأطفال بالمنتجع من 9 ص إلى 8 م.',
  'ما أوقات عمل السبا؟': 'السبا الملكي مفتوح من 9:00 صباحاً حتى 11:00 مساءً. لديك حجز مؤكد اليوم الساعة 6:00 مساءً.',
  'كيف أصل إلى الدرعية؟': 'الدرعية على بعد 25 كم. يمكننا ترتيب سيارة ليموزين خاصة مع دليل سياحي. الرحلة تستغرق 30 دقيقة.',
  'ما العروض المتاحة حالياً؟': 'لديك 3 عروض نشطة: ترقية الفيلا بخصم 35%، باقة العافية الشاملة، وخصم 20% في مطعم ألبا.',
};

export default function TravelAssistant({ onBack }: TravelAssistantProps) {
  const [messages, setMessages] = useState([
    { id: '0', sender: 'bot' as const, text: 'مرحباً! أنا مساعد السفر الذكي. كيف يمكنني مساعدتك في رحلتك بالرياض؟' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: 'guest', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply = responses[text] || 'شكراً لسؤالك. سأبحث عن أفضل الإجابات وأعود إليك خلال لحظات. يمكنك أيضاً التواصل مع الكونسيرج مباشرة.';
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', text: reply }]);
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="page-container space-y-4 text-right font-sans">
      <ServiceHeader title="مساعد السفر" subtitle="ذكاء اصطناعي لرحلتك" onBack={onBack} />

      <div className="glass-panel rounded-2xl min-h-[50vh] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-3 p-1 max-h-[50vh]">
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${msg.sender === 'guest' ? 'flex-row-reverse' : ''}`}>
              {msg.sender === 'bot' && <Bot className="w-6 h-6 text-[#dfba73] shrink-0 mt-1" />}
              <div className={`text-xs p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                msg.sender === 'guest' ? 'bg-[#dfba73]/10 text-[#dfba73]' : 'bg-white/5 text-gray-300'
              }`}>{msg.text}</div>
            </motion.div>
          ))}
          {typing && (
            <div className="flex gap-2 items-center text-xs text-gray-500">
              <Sparkles className="w-4 h-4 text-[#dfba73] animate-pulse" />
              <span>جاري الكتابة...</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
          {suggestions.map((s) => (
            <button key={s} onClick={() => sendMessage(s)}
              className="px-3 py-1.5 bg-white/5 hover:bg-[#dfba73]/10 text-[10px] text-gray-400 hover:text-[#dfba73] rounded-full transition-colors touch-target">
              {s}
            </button>
          ))}
        </div>

        <div className="flex gap-2 pt-3">
          <button onClick={() => sendMessage(input)} className="p-3 bg-[#dfba73]/20 rounded-xl touch-target shrink-0">
            <Send className="w-4 h-4 text-[#dfba73]" />
          </button>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder="اسأل مساعد السفر..." className="flex-1 bg-black/50 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#dfba73] outline-none min-w-0" />
        </div>
      </div>
    </div>
  );
}
