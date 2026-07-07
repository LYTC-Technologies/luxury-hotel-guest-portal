/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Send, CheckCircle2 } from 'lucide-react';
import { reviews } from '../data';
import ServiceHeader from './ServiceHeader';

interface ReviewsProps {
  onBack: () => void;
}

export default function Reviews({ onBack }: ReviewsProps) {
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('الإقامة');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = ['الإقامة', 'السبا', 'المطاعم', 'خدمة الغرف', 'الاستقبال', 'المرافق'];

  const handleSubmit = () => {
    if (!rating || !comment) return;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setRating(0); setComment(''); }, 4000);
  };

  return (
    <div className="page-container space-y-6 text-right font-sans">
      <ServiceHeader title="التقييمات والمراجعات" subtitle="شاركنا تجربتك الفاخرة" onBack={onBack} />

      {submitted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="glass-panel-gold rounded-2xl flex items-center gap-3 text-emerald-400">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm">شكراً لتقييمك! نقدّر ملاحظاتك.</span>
        </motion.div>
      )}

      <div className="glass-panel rounded-2xl space-y-4">
        <h3 className="font-serif text-sm font-bold text-white">أضف تقييمك</h3>
        <div className="flex flex-wrap gap-2 justify-end">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-[11px] touch-target ${category === cat ? 'bg-[#dfba73]/20 text-[#dfba73]' : 'bg-white/5 text-gray-400'}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} onClick={() => setRating(s)} className="touch-target">
              <Star className={`w-8 h-8 ${s <= rating ? 'text-[#dfba73] fill-[#dfba73]' : 'text-gray-600'}`} />
            </button>
          ))}
        </div>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="اكتب مراجعتك..." rows={3}
          className="w-full bg-black/50 rounded-xl border border-white/10 px-4 py-3 text-sm text-white focus:border-[#dfba73] outline-none resize-none" />
        <button onClick={handleSubmit} disabled={!rating || !comment}
          className="w-full py-3 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-xs text-black font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 touch-target">
          <Send className="w-4 h-4" /> إرسال التقييم
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="font-serif text-sm font-bold text-white">مراجعات الضيوف</h3>
        {reviews.map((review) => (
          <div key={review.id} className="glass-panel rounded-2xl space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-[#dfba73] fill-[#dfba73]' : 'text-gray-600'}`} />
                ))}
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-white">{review.guestName}</div>
                <div className="text-[10px] text-gray-500">{review.category} • {review.date}</div>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
