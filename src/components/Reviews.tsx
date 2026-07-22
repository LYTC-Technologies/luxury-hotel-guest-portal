/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Send, CheckCircle2, Loader2 } from 'lucide-react';
import ServiceHeader from './ServiceHeader';
import { getStayRating, rateStay } from '../services/guestApi';
import { useRoom } from '../contexts/RoomContext';

interface ReviewsProps {
  onBack: () => void;
}

export default function Reviews({ onBack }: ReviewsProps) {
  const [existingRating, setExistingRating] = useState<{ stars: number; notes: string } | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { roomNumber } = useRoom();

  useEffect(() => {
    const fetchRating = async () => {
      if (!roomNumber) return;
      
      setLoading(true);
      try {
        const fetchedRating = await getStayRating(roomNumber);
        setExistingRating(fetchedRating);
      } catch (error: any) {
        console.error('Failed to fetch rating:', error);
        if (error?.response?.status === 404) {
          setError('لا يوجد حجز نشط لهذه الغرفة');
        } else {
          setError('فشل تحميل التقييم. يرجى المحاولة مرة أخرى.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, [roomNumber]);

  const handleSubmit = async () => {
    if (!rating || !comment) return;
    if (!roomNumber) {
      setError('يرجى تسجيل الدخول أولاً');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await rateStay(roomNumber, {
        stars: rating,
        notes: comment
      });
      setSubmitted(true);
      // Update existing rating
      setExistingRating({ stars: rating, notes: comment });
      setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setComment('');
      }, 4000);
    } catch (err: any) {
      if (err?.response?.status === 404) {
        setError('لا يوجد حجز نشط لهذه الغرفة. لا يمكن إرسال التقييم.');
      } else {
        setError('فشل إرسال التقييم. يرجى المحاولة مرة أخرى.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container space-y-6 text-right font-sans">
      <ServiceHeader title="التقييمات والمراجعات" subtitle="شاركنا تجربتك الفاخرة" onBack={onBack} />

      {loading && (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 text-[#dfba73] mx-auto mb-3 animate-spin" />
          <p className="text-xs text-gray-400">جاري تحميل التقييم...</p>
        </div>
      )}

      {!loading && existingRating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel-gold rounded-2xl space-y-4"
        >
          <h3 className="font-serif text-sm font-bold text-white">تقييم إقامتك الحالي</h3>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`w-8 h-8 ${s <= existingRating.stars ? 'text-[#dfba73] fill-[#dfba73]' : 'text-gray-600'}`} />
            ))}
          </div>
          {existingRating.notes && (
            <div className="bg-black/20 rounded-xl p-4 border border-white/5">
              <p className="text-sm text-gray-300 leading-relaxed">{existingRating.notes}</p>
            </div>
          )}
        </motion.div>
      )}

      {submitted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="glass-panel-gold rounded-2xl flex items-center gap-3 text-emerald-400">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm">شكراً لتقييمك! نقدّر ملاحظاتك.</span>
        </motion.div>
      )}

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="glass-panel rounded-2xl flex items-center gap-3 text-red-400 border-red-500/30">
          <span className="text-sm">{error}</span>
        </motion.div>
      )}

      <div className="glass-panel rounded-2xl space-y-4">
        <h3 className="font-serif text-sm font-bold text-white">{existingRating ? 'تحديث تقييمك' : 'أضف تقييمك'}</h3>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} onClick={() => setRating(s)} className="touch-target">
              <Star className={`w-8 h-8 ${s <= rating ? 'text-[#dfba73] fill-[#dfba73]' : 'text-gray-600'}`} />
            </button>
          ))}
        </div>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="اكتب مراجعتك..." rows={3}
          className="w-full bg-black/50 rounded-xl border border-white/10 px-4 py-3 text-sm text-white focus:border-[#dfba73] outline-none resize-none" />
        <button onClick={handleSubmit} disabled={!rating || !comment || submitting}
          className="w-full py-3 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-xs text-black font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 touch-target">
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              جاري الإرسال...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> {existingRating ? 'تحديث التقييم' : 'إرسال التقييم'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
