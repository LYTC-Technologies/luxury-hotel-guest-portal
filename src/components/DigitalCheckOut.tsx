/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText, CreditCard, Download, Star, AlertTriangle, Luggage,
  Plane, CalendarPlus, CheckCircle2
} from 'lucide-react';
import { Guest } from '../types';
import { currentInvoice } from '../data';
import ServiceHeader from './ServiceHeader';

interface DigitalCheckOutProps {
  guest: Guest;
  onBack: () => void;
}

export default function DigitalCheckOut({ guest, onBack }: DigitalCheckOutProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [issueReport, setIssueReport] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [paid, setPaid] = useState(false);
  const [luggageRequested, setLuggageRequested] = useState(false);
  const [airportTransfer, setAirportTransfer] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const total = currentInvoice.reduce((a, i) => a + i.amount, 0);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handlePay = () => {
    setPaid(true);
    setShowPayment(false);
    showSuccess('تم دفع الفاتورة بنجاح. شكراً لإقامتك!');
  };

  return (
    <div className="page-container space-y-6 text-right font-sans">
      <ServiceHeader title="تسجيل المغادرة الرقمي" subtitle={`جناح ${guest.roomNumber}`} onBack={onBack} />

      <AnimatePresence>
        {successMsg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="glass-panel-gold rounded-2xl flex items-center gap-3 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm">{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invoice Review */}
      <div className="glass-panel rounded-2xl space-y-3">
        <h3 className="font-serif text-sm font-bold text-white flex items-center justify-end gap-2">
          <span>مراجعة الفاتورة</span>
          <FileText className="w-4 h-4 text-[#dfba73]" />
        </h3>
        <div className="space-y-2">
          {currentInvoice.map((item) => (
            <div key={item.id} className="flex justify-between text-xs border-b border-white/5 pb-2">
              <span className="text-[#dfba73] font-mono">{item.amount.toLocaleString('ar-SA')} ر.س</span>
              <div className="text-right flex-1 mr-3">
                <div className="text-gray-300">{item.description}</div>
                <div className="text-[10px] text-gray-600 font-mono">{item.date}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-2 border-t border-white/10">
          <span className="text-lg font-bold text-[#dfba73] font-mono">{total.toLocaleString('ar-SA')} ر.س</span>
          <span className="text-sm text-white font-bold">الإجمالي</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => showSuccess('جاري تحميل الفاتورة...')} className="py-2.5 bg-white/5 hover:bg-white/10 text-xs text-gray-300 rounded-xl flex items-center justify-center gap-1 touch-target">
            <Download className="w-3.5 h-3.5" /> تحميل الفاتورة
          </button>
          <button onClick={() => setShowPayment(true)} disabled={paid} className="py-2.5 bg-[#dfba73]/10 hover:bg-[#dfba73]/20 text-xs text-[#dfba73] rounded-xl flex items-center justify-center gap-1 touch-target disabled:opacity-50">
            <CreditCard className="w-3.5 h-3.5" /> {paid ? 'تم الدفع ✓' : 'دفع الفاتورة'}
          </button>
        </div>
      </div>

      {/* Rating */}
      <div className="glass-panel rounded-2xl space-y-3">
        <h3 className="font-serif text-sm font-bold text-white flex items-center justify-end gap-2">
          <span>تقييم الإقامة</span>
          <Star className="w-4 h-4 text-[#dfba73]" />
        </h3>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} onClick={() => setRating(s)} className="touch-target">
              <Star className={`w-8 h-8 ${s <= rating ? 'text-[#dfba73] fill-[#dfba73]' : 'text-gray-600'}`} />
            </button>
          ))}
        </div>
        <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="شاركنا تجربتك..." rows={3}
          className="w-full bg-black/50 rounded-xl border border-white/10 px-4 py-3 text-sm text-white focus:border-[#dfba73] outline-none resize-none" />
        <button onClick={() => { if (rating) showSuccess('شكراً لتقييمك! نقدّر ملاحظاتك.'); }} disabled={!rating}
          className="w-full py-3 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-xs text-black font-bold rounded-xl disabled:opacity-50 touch-target">
          إرسال التقييم
        </button>
      </div>

      {/* Issue Report */}
      <div className="glass-panel rounded-2xl space-y-3">
        <h3 className="font-serif text-sm font-bold text-white flex items-center justify-end gap-2">
          <span>الإبلاغ عن مشكلة</span>
          <AlertTriangle className="w-4 h-4 text-amber-400" />
        </h3>
        <textarea value={issueReport} onChange={(e) => setIssueReport(e.target.value)} placeholder="صف المشكلة التي واجهتها..." rows={2}
          className="w-full bg-black/50 rounded-xl border border-white/10 px-4 py-3 text-sm text-white focus:border-[#dfba73] outline-none resize-none" />
        <button onClick={() => { if (issueReport) { showSuccess('تم إرسال البلاغ. سيتواصل معك مدير الخدمة.'); setIssueReport(''); } }}
          disabled={!issueReport} className="w-full py-2.5 bg-amber-500/10 text-amber-400 text-xs rounded-xl disabled:opacity-50 touch-target">
          إرسال البلاغ
        </button>
      </div>

      {/* Services */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button onClick={() => { setLuggageRequested(true); showSuccess('تم طلب حمل الأمتعة. سيصل الفريق خلال 15 دقيقة.'); }}
          className={`glass-panel rounded-xl flex flex-col items-center gap-2 touch-target ${luggageRequested ? 'border-emerald-500/30' : ''}`}>
          <Luggage className="w-6 h-6 text-[#dfba73]" />
          <span className="text-[11px] text-gray-300">{luggageRequested ? 'تم الطلب ✓' : 'طلب حمل الأمتعة'}</span>
        </button>
        <button onClick={() => { setAirportTransfer(true); showSuccess('تم حجز نقل المطار. الليموزين بانتظارك الساعة 10:00 ص.'); }}
          className={`glass-panel rounded-xl flex flex-col items-center gap-2 touch-target ${airportTransfer ? 'border-emerald-500/30' : ''}`}>
          <Plane className="w-6 h-6 text-blue-400" />
          <span className="text-[11px] text-gray-300">{airportTransfer ? 'تم الحجز ✓' : 'نقل للمطار'}</span>
        </button>
        <button onClick={() => showSuccess('تم فتح نموذج حجز إقامة جديدة. سيتواصل معك فريق الحجوزات.')}
          className="glass-panel rounded-xl flex flex-col items-center gap-2 touch-target">
          <CalendarPlus className="w-6 h-6 text-emerald-400" />
          <span className="text-[11px] text-gray-300">حجز إقامة جديدة</span>
        </button>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPayment(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative z-10 w-full max-w-sm glass-panel rounded-2xl space-y-4 text-right">
              <h3 className="font-serif text-base font-bold text-white text-center">دفع الفاتورة</h3>
              <div className="text-center text-2xl font-bold text-[#dfba73] font-mono">{guest.balanceDue.toLocaleString('ar-SA')} ر.س</div>
              <input placeholder="رقم البطاقة" className="w-full bg-black/50 rounded-xl border border-white/10 px-4 py-3 text-sm text-white font-mono focus:border-[#dfba73] outline-none" />
              <div className="grid grid-cols-2 gap-2">
                <input placeholder="MM/YY" className="bg-black/50 rounded-xl border border-white/10 px-4 py-3 text-sm text-white font-mono focus:border-[#dfba73] outline-none" />
                <input placeholder="CVV" className="bg-black/50 rounded-xl border border-white/10 px-4 py-3 text-sm text-white font-mono focus:border-[#dfba73] outline-none" />
              </div>
              <button onClick={handlePay} className="w-full py-3 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-xs text-black font-bold rounded-xl touch-target">تأكيد الدفع</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
