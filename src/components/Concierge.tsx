/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { conciergeServices } from '../data';
import ServiceHeader from './ServiceHeader';

interface ConciergeProps {
  onBack: () => void;
  onAddOrder: (order: { type: 'taxi' | 'concierge'; title: string; details: string; estimatedDelivery: string }) => void;
}

const categoryLabels: Record<string, string> = {
  transport: 'النقل',
  dining: 'المطاعم',
  tourism: 'السياحة',
  shopping: 'التسوق',
  emergency: 'الطوارئ',
  finance: 'المالية',
};

export default function Concierge({ onBack, onAddOrder }: ConciergeProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [requestDetails, setRequestDetails] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; sender: 'concierge' | 'guest'; text: string; time: string }>>([
    { id: '1', sender: 'concierge', text: 'مرحباً بك! أنا أحمد، كونسيرجك الشخصي. كيف يمكنني مساعدتك اليوم؟', time: 'الآن' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [success, setSuccess] = useState(false);

  const filtered = activeCategory === 'all'
    ? conciergeServices
    : conciergeServices.filter((s) => s.category === activeCategory);

  const handleRequest = () => {
    const service = conciergeServices.find((s) => s.id === selectedService);
    if (!service) return;
    onAddOrder({
      type: 'concierge',
      title: `طلب كونسيرج: ${service.title}`,
      details: requestDetails || service.description,
      estimatedDelivery: 'خلال ٣٠ دقيقة',
    });
    setSuccess(true);
    setSelectedService(null);
    setRequestDetails('');
    setTimeout(() => setSuccess(false), 4000);
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const guestMsg = { id: Date.now().toString(), sender: 'guest' as const, text: chatInput, time: 'الآن' };
    setChatMessages((prev) => [...prev, guestMsg]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'concierge',
        text: 'شكراً لتواصلك. سأقوم بترتيب طلبك فوراً وأعود إليك خلال دقائق.',
        time: 'الآن',
      }]);
    }, 1500);
  };

  return (
    <div className="page-container space-y-6 text-right font-sans">
      <ServiceHeader
        title="خدمات الكونسيرج"
        subtitle="مساعدك الشخصي على مدار الساعة"
        onBack={onBack}
        action={
          <button onClick={() => setChatOpen(!chatOpen)} className="glass-panel rounded-xl p-3 touch-target">
            <MessageSquare className="w-5 h-5 text-[#dfba73]" />
          </button>
        }
      />

      <AnimatePresence>
        {success && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="glass-panel-gold rounded-2xl flex items-center gap-3 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm">تم إرسال طلبك إلى الكونسيرج بنجاح</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Chat */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="glass-panel rounded-2xl space-y-3 overflow-hidden">
            <h3 className="text-sm font-bold text-white">محادثة مباشرة مع الكونسيرج</h3>
            <div className="h-48 overflow-y-auto space-y-2">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`text-xs p-2.5 rounded-xl max-w-[85%] ${
                  msg.sender === 'guest' ? 'bg-[#dfba73]/10 text-[#dfba73] ml-auto' : 'bg-white/5 text-gray-300 mr-auto'
                }`}>{msg.text}</div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={sendChat} className="p-3 bg-[#dfba73]/20 rounded-xl touch-target"><Send className="w-4 h-4 text-[#dfba73]" /></button>
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendChat()}
                placeholder="اكتب رسالتك..." className="flex-1 bg-black/50 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#dfba73] outline-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-end">
        <button onClick={() => setActiveCategory('all')} className={`px-3 py-1.5 rounded-full text-[11px] font-medium touch-target ${activeCategory === 'all' ? 'bg-[#dfba73]/20 text-[#dfba73]' : 'bg-white/5 text-gray-400'}`}>الكل</button>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button key={key} onClick={() => setActiveCategory(key)} className={`px-3 py-1.5 rounded-full text-[11px] font-medium touch-target ${activeCategory === key ? 'bg-[#dfba73]/20 text-[#dfba73]' : 'bg-white/5 text-gray-400'}`}>{label}</button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {filtered.map((service) => (
          <button key={service.id} onClick={() => setSelectedService(service.id)}
            className={`glass-panel rounded-xl text-right transition-all touch-target ${selectedService === service.id ? 'border-[#dfba73]/40 bg-[#dfba73]/5' : ''}`}>
            <div className="text-2xl mb-2">{service.icon}</div>
            <div className="text-xs font-bold text-white">{service.title}</div>
            <div className="text-[10px] text-gray-500 mt-1 line-clamp-2">{service.description}</div>
          </button>
        ))}
      </div>

      {/* Request Form */}
      {selectedService && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel-gold rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-[#dfba73]">
            {conciergeServices.find((s) => s.id === selectedService)?.title}
          </h3>
          <textarea value={requestDetails} onChange={(e) => setRequestDetails(e.target.value)}
            placeholder="أضف تفاصيل طلبك (التاريخ، الوقت، عدد الأشخاص...)" rows={3}
            className="w-full bg-black/50 rounded-xl border border-white/10 px-4 py-3 text-sm text-white focus:border-[#dfba73] outline-none resize-none" />
          <button onClick={handleRequest} className="w-full py-3 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-xs text-black font-bold rounded-xl touch-target">
            إرسال الطلب
          </button>
        </motion.div>
      )}
    </div>
  );
}
