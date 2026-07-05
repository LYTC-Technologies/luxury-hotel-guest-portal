/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MessageSquare, Send, Phone, UserCheck, CalendarDays } from 'lucide-react';
import { hotelDetails } from '../data';
import { Message } from '../types';

interface ReceptionProps {
  onBack: () => void;
}

export default function Reception({ onBack }: ReceptionProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'reception',
      text: 'مرحباً بك سمو الشيخ سليمان. يسعدني مساعدتك في مركز الخدمة والمكتب الأمامي الخاص بـ منتجع الأمان الملكي. كيف يمكنني تلبية تطلعاتك اليوم؟',
      time: '11:02 ص'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [callbackRequested, setCallbackRequested] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const presetQuestions = [
    { q: 'أين يقع المسبح والنادي الرياضي؟', a: 'يقع مسبح المنتجع والنادي الرياضي المتكامل في الطابق الأرضي من الجناح الشرقي (الواحة). يفتح النادي أبوابه يومياً من الساعة 6:00 صباحاً وحتى 11:00 مساءً، ويتوفر طاقم مدربين وخدمة مناشف وعصائر طازجة مجانية.' },
    { q: 'هل يمكنني تمديد تسجيل المغادرة؟', a: 'يسعدنا تلبية رغبتك في المغادرة المتأخرة سمو الشيخ. يتم تمديد المغادرة مجاناً حتى الساعة 4:00 عصراً لنزلاء الفلل والأجنحة الملكية. يمكنك تأكيد ذلك مباشرة مع مكتب الاستقبال الآن.' },
    { q: 'أود طلب الخادم الشخصي المباشر', a: 'تم توجيه طلبك فوراً إلى مساعدك الشخصي المناوب للجناح 702. سيقوم المساعد الشخصي بالاتصال الهاتفي بجناحك أو المرور شخصياً لمساعدتك خلال 5 دقائق لتنفيذ كافة متطلباتك.' }
  ];

  const handleSendCustom = (text: string) => {
    if (!text.trim()) return;

    const newMsg: Message = {
      id: `g-${Math.random()}`,
      sender: 'guest',
      text,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    // Formulate a smart, premium response
    setTimeout(() => {
      setIsTyping(false);
      let responseText = 'شكراً لتواصلك معنا سمو الشيخ. تم استلام رسالتك وتوجيهها فوراً إلى مدير المكتب الأمامي للمتابعة والتنفيذ. سنقوم بخدمتك وتلبية رغبتك في أسرع وقت ممكن.';
      
      // Basic rule matching for responsive demo feel
      const lowText = text.toLowerCase();
      if (lowText.includes('مسبح') || lowText.includes('رياضي') || lowText.includes('نادي')) {
        responseText = presetQuestions[0].a;
      } else if (lowText.includes('مغادرة') || lowText.includes('خروج') || lowText.includes('تمديد')) {
        responseText = presetQuestions[1].a;
      } else if (lowText.includes('خادم') || lowText.includes('مساعد') || lowText.includes('بشت')) {
        responseText = presetQuestions[2].a;
      }

      const reply: Message = {
        id: `r-${Math.random()}`,
        sender: 'reception',
        text: responseText,
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, reply]);
    }, 1800);
  };

  const handleCallbackRequest = () => {
    setCallbackRequested(true);
    setTimeout(() => {
      setCallbackRequested(false);
    }, 4000);
  };

  return (
    <div className="pb-32 pt-6 px-4 max-w-4xl mx-auto space-y-6 text-right font-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* Callback request button */}
        <button
          onClick={handleCallbackRequest}
          className="glass-panel px-4 py-2.5 rounded-full flex items-center gap-2 border-white/10 hover:border-[#dfba73]/40 cursor-pointer text-xs font-semibold text-gray-300 hover:text-white"
          id="btn-callback-request"
        >
          <span>طلب اتصال هاتفي فوري</span>
          <Phone className="w-3.5 h-3.5 text-[#dfba73]" />
        </button>

        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">الاستقبال والخدمة الخاصة</h1>
            <p className="text-xs text-gray-400 mt-0.5">دردشة فورية ومباشرة مع مدير الضيافة لتلبية رغباتك</p>
          </div>
          <button
            onClick={onBack}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors cursor-pointer"
            id="btn-back-reception"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* Left column: Contact info & callback confirmation (1 column) */}
        <div className="glass-panel p-5 rounded-2xl border-white/5 flex flex-col justify-between space-y-6 md:col-span-1 text-right">
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#dfba73] pb-2 border-b border-white/5 flex items-center justify-end gap-2">
              <span>أرقام الاتصال الهاتفي المباشر</span>
              <Phone className="w-4 h-4 text-[#dfba73]" />
            </h3>

            <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#dfba73] font-mono select-all">الرقم: 0</span>
                <span className="text-gray-400">مكتب الاستقبال والمساعد الشخصي:</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#dfba73] font-mono select-all">الرقم: 50</span>
                <span className="text-gray-400">خدمة المأكولات والمشروبات:</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#dfba73] font-mono select-all">الرقم: 99</span>
                <span className="text-gray-400">إدارة الأمن وسلامة الضيوف:</span>
              </div>
            </div>
          </div>

          {/* Callback requested overlay popup info */}
          <AnimatePresence>
            {callbackRequested && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl text-center space-y-2"
                id="callback-success"
              >
                <div className="w-8 h-8 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                  <UserCheck className="w-4.5 h-4.5 text-emerald-400" />
                </div>
                <h4 className="text-xs font-bold text-white">جاري توجيه طلب الاتصال...</h4>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  تم إبلاغ الخادم الشخصي لجناحك <span className="text-[#dfba73] font-bold">702</span>. ستتلقى اتصالاً هاتفياً على هاتف الجناح فوراً خلال دقيقتين.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 text-[10px] text-gray-500 leading-relaxed font-sans">
            🕒 يتواجد طاقم العمل من المدراء والمضيفين في خدمتك على مدار ٢٤ ساعة طوال أيام الأسبوع لضمان راحتك.
          </div>
        </div>

        {/* Right column: Interactive chat (2 columns) */}
        <div className="md:col-span-2 glass-panel rounded-2xl border-white/5 flex flex-col h-[420px]" id="chat-container">
          {/* Active partner bar */}
          <div className="p-4 border-b border-white/5 bg-black/30 flex items-center justify-between">
            <span className="text-[10px] text-emerald-400 flex items-center gap-1.5 font-sans">
              <span>● متصل حالياً</span>
            </span>
            <div className="flex items-center gap-2.5 text-right">
              <div>
                <h4 className="text-xs font-bold text-white">المكتب الأمامي والخدمة الملوكية</h4>
                <p className="text-[9px] text-[#dfba73]">مدير الضيافة المناوب: أ. فهد الهذلول</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#dfba73]/10 border border-[#dfba73]/20 flex items-center justify-center text-sm">
                👤
              </div>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
            {messages.map((msg) => {
              const isGuest = msg.sender === 'guest';
              return (
                <div
                  key={msg.id}
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed text-right ${
                    isGuest
                      ? 'bg-gradient-to-l from-[#dfba73]/15 to-[#dfba73]/5 border border-[#dfba73]/20 text-white self-end rounded-tr-none'
                      : 'bg-white/5 border border-white/5 text-gray-300 self-start rounded-tl-none'
                  }`}
                >
                  <p className="font-sans whitespace-pre-line">{msg.text}</p>
                  <span className="text-[9px] text-gray-500 font-mono mt-1.5 block text-left">
                    {msg.time}
                  </span>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none p-3.5 text-xs max-w-[140px] self-start flex items-center justify-center gap-1.5">
                <span className="text-gray-400 font-sans">جاري الكتابة</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#dfba73] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#dfba73] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#dfba73] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Preset Questions Panel */}
          <div className="p-3 border-t border-white/5 bg-black/20 flex gap-2 overflow-x-auto justify-start scrollbar-none">
            {presetQuestions.map((pq, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendCustom(pq.q)}
                className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 hover:text-[#dfba73] hover:border-[#dfba73]/40 hover:bg-[#dfba73]/5 transition-all whitespace-nowrap cursor-pointer"
                id={`btn-preset-chat-${idx}`}
              >
                {pq.q}
              </button>
            ))}
          </div>

          {/* Form input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendCustom(inputText);
            }}
            className="p-3 border-t border-white/5 bg-black/40 flex items-center gap-2"
          >
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-3 bg-gradient-to-r from-[#cbba53] to-[#dfba73] hover:from-[#dfba73] hover:to-[#cbba53] text-black rounded-xl transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              id="btn-send-message"
            >
              <Send className="w-4.5 h-4.5 rotate-180" />
            </button>
            <input
              type="text"
              placeholder="اكتب رسالتك لمدير الضيافة أو اطرح استفسارك هنا..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-3 bg-black/50 text-xs text-white rounded-xl border border-white/5 focus:border-[#dfba73] focus:outline-none text-right"
            />
          </form>
        </div>

      </div>
    </div>
  );
}
