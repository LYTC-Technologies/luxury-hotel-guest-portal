/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Download, Star, MessageSquare, Car, Luggage, Calendar, CheckCircle, AlertCircle, ChevronDown, Plane, Home, Receipt, FileText } from 'lucide-react';
import { sampleGuest, currentInvoice } from '../data';

interface CheckOutProps {
  onBack: () => void;
}

export default function CheckOut({ onBack }: CheckOutProps) {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [issueReport, setIssueReport] = useState('');
  const [luggageRequested, setLuggageRequested] = useState(false);
  const [airportTransfer, setAirportTransfer] = useState(false);
  const [newBooking, setNewBooking] = useState(false);
  const [invoiceDownloaded, setInvoiceDownloaded] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handleDownloadInvoice = () => {
    setInvoiceDownloaded(true);
    alert('تم تحميل الفاتورة بنجاح. الملف محفوظ في جهازك.');
  };

  const handlePayment = () => {
    setPaymentConfirmed(true);
    alert('تم تأكيد الدفع بنجاح. شكراً لك على اختيار منتجع الأمان.');
  };

  const handleSubmitFeedback = () => {
    alert('شكراً لك على تقييمك وملاحظاتك القيمة. نقدر رأيك ونعمل على التحسين المستمر.');
    setStep(2);
  };

  const handleCompleteCheckOut = () => {
    alert('تم إكمال تسجيل المغادرة بنجاح! نتمنى لك رحلة آمنة ونتطلع لاستضافتك مرة أخرى.');
    onBack();
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="page-container space-y-6 font-sans text-right">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors touch-target">
          <ChevronDown className="w-6 h-6 rotate-90" />
        </button>
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-[#dfba73] gold-text-glow">تسجيل المغادرة</h1>
          <p className="text-xs text-gray-500 mt-1">أكمل إجراءات المغادرة بكل سهولة</p>
        </div>
        <div className="w-6" />
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Invoice Review */}
            <div className="glass-panel rounded-2xl space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <Receipt className="w-5 h-5 text-[#dfba73]" />
                <h2 className="font-serif text-lg font-bold text-white">مراجعة الفاتورة</h2>
              </div>

              <div className="space-y-3">
                {currentInvoice.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <div className="flex-1">
                      <div className="text-xs text-white">{item.description}</div>
                      <div className="text-[10px] text-gray-500">{item.date}</div>
                    </div>
                    <div className="text-sm text-[#dfba73] font-mono font-bold">{item.amount.toLocaleString('ar-SA')} ر.س</div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">إجمالي المبلغ</span>
                  <span className="text-sm text-white font-mono">{sampleGuest.totalAmount.toLocaleString('ar-SA')} ر.س</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">المدفوع مسبقاً</span>
                  <span className="text-sm text-emerald-400 font-mono">-{sampleGuest.paidAmount.toLocaleString('ar-SA')} ر.س</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/10">
                  <span className="text-sm font-bold text-white">الرصيد المستحق</span>
                  <span className="text-lg font-bold text-[#dfba73] font-mono">{sampleGuest.balanceDue.toLocaleString('ar-SA')} ر.س</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownloadInvoice}
                className="glass-panel rounded-xl flex items-center justify-center gap-2 hover:border-[#dfba73]/30 transition-all touch-target"
              >
                <Download className="w-4 h-4 text-[#dfba73]" />
                <span className="text-xs text-white font-medium">تحميل الفاتورة</span>
              </button>
              <button
                onClick={handlePayment}
                disabled={paymentConfirmed}
                className={`rounded-xl flex items-center justify-center gap-2 transition-all touch-target ${
                  paymentConfirmed
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[#dfba73] hover:bg-[#cbba53] text-black'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-xs font-bold">{paymentConfirmed ? 'تم الدفع' : 'دفع الفاتورة'}</span>
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Rating */}
            <div className="glass-panel rounded-2xl space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <Star className="w-5 h-5 text-[#dfba73]" />
                <h2 className="font-serif text-lg font-bold text-white">تقييم الإقامة</h2>
              </div>

              <div className="text-center space-y-3">
                <div className="text-sm text-white">كيف كانت تجربتك معنا؟</div>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all touch-target ${
                        rating >= star ? 'bg-[#dfba73] text-black' : 'bg-white/10 text-gray-500 hover:bg-white/20'
                      }`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs text-gray-400">شاركنا تجربتك (اختياري)</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="أخبرنا ما أعجبك وما يمكننا تحسينه..."
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white text-sm focus:border-[#dfba73] focus:outline-none transition-all resize-none h-24"
                />
              </div>

              <button
                onClick={handleSubmitFeedback}
                disabled={rating === 0}
                className="w-full py-3 bg-[#dfba73] hover:bg-[#cbba53] text-black text-xs font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-target"
              >
                إرسال التقييم
              </button>
            </div>

            {/* Report Issue */}
            <div className="glass-panel rounded-2xl space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <h2 className="font-serif text-lg font-bold text-white">الإبلاغ عن مشكلة</h2>
              </div>

              <div className="space-y-3">
                <label className="block text-xs text-gray-400">هل واجهت أي مشكلة أثناء إقامتك؟</label>
                <textarea
                  value={issueReport}
                  onChange={(e) => setIssueReport(e.target.value)}
                  placeholder="صف المشكلة بالتفصيل..."
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white text-sm focus:border-red-500/50 focus:outline-none transition-all resize-none h-20"
                />
              </div>

              {issueReport && (
                <button className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-xs font-bold rounded-xl transition-all touch-target">
                  إرسال البلاغ
                </button>
              )}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Additional Services */}
            <div className="glass-panel rounded-2xl space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <Car className="w-5 h-5 text-[#dfba73]" />
                <h2 className="font-serif text-lg font-bold text-white">خدمات إضافية</h2>
              </div>

              {/* Luggage */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <Luggage className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-xs text-white font-medium">طلب حمل الأمتعة</div>
                    <div className="text-[10px] text-gray-500">مساعدة في نقل الحقائب</div>
                  </div>
                </div>
                <button
                  onClick={() => setLuggageRequested(!luggageRequested)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all touch-target ${
                    luggageRequested ? 'bg-[#dfba73] text-black' : 'bg-white/10 text-white'
                  }`}
                >
                  {luggageRequested ? 'تم الطلب' : 'طلب'}
                </button>
              </div>

              {/* Airport Transfer */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <Plane className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-xs text-white font-medium">نقل للمطار</div>
                    <div className="text-[10px] text-gray-500">ليموزين فاخرة للمطار</div>
                  </div>
                </div>
                <button
                  onClick={() => setAirportTransfer(!airportTransfer)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all touch-target ${
                    airportTransfer ? 'bg-[#dfba73] text-black' : 'bg-white/10 text-white'
                  }`}
                >
                  {airportTransfer ? 'تم الحجز' : 'حجز'}
                </button>
              </div>

              {/* New Booking */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-xs text-white font-medium">حجز إقامة جديدة</div>
                    <div className="text-[10px] text-gray-500">احجز إقامتك القادمة الآن</div>
                  </div>
                </div>
                <button
                  onClick={() => setNewBooking(!newBooking)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all touch-target ${
                    newBooking ? 'bg-[#dfba73] text-black' : 'bg-white/10 text-white'
                  }`}
                >
                  {newBooking ? 'تم التخطيط' : 'حجز'}
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="glass-panel rounded-2xl space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <FileText className="w-5 h-5 text-[#dfba73]" />
                <h2 className="font-serif text-lg font-bold text-white">ملخص المغادرة</h2>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">تاريخ المغادرة</span>
                  <span className="text-white">{sampleGuest.checkOutDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">وقت المغادرة</span>
                  <span className="text-white">12:00 ظهراً</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">حالة الدفع</span>
                  <span className={`font-bold ${paymentConfirmed ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {paymentConfirmed ? 'مدفوع' : 'معلق'}
                  </span>
                </div>
                {luggageRequested && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">حمل الأمتعة</span>
                    <span className="text-emerald-400">مطلوب</span>
                  </div>
                )}
                {airportTransfer && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">نقل المطار</span>
                    <span className="text-emerald-400">محجوز</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="glass-panel rounded-2xl space-y-6 text-center">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-2xl font-bold text-[#dfba73]">شكراً لك!</h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  تم إكمال تسجيل المغادرة بنجاح. نتمنى لك رحلة آمنة ونتطلع لاستضافتك مرة أخرى في منتجع الأمان.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <Home className="w-4 h-4" />
                  <span>الجناح {sampleGuest.roomNumber}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{sampleGuest.checkOutDate}</span>
                </div>
              </div>

              <div className="bg-[#dfba73]/10 border border-[#dfba73]/20 rounded-xl p-4">
                <div className="text-xs text-[#dfba73] font-medium mb-2">نقاط الولاء المكتسبة</div>
                <div className="text-2xl font-bold text-[#dfba73] font-mono">{sampleGuest.loyaltyPoints.toLocaleString('ar-SA')}</div>
                <div className="text-[10px] text-gray-400 mt-1">نقطة</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        {step > 1 && step < 4 && (
          <button onClick={prevStep} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-all touch-target">
            السابق
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={nextStep}
            disabled={step === 1 && !paymentConfirmed}
            className="flex-1 py-3 bg-[#dfba73] hover:bg-[#cbba53] text-black text-xs font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-target"
          >
            التالي
          </button>
        ) : step === 3 ? (
          <button
            onClick={nextStep}
            className="flex-1 py-3 bg-[#dfba73] hover:bg-[#cbba53] text-black text-xs font-bold rounded-xl transition-all touch-target"
          >
            إكمال المغادرة
          </button>
        ) : (
          <button
            onClick={handleCompleteCheckOut}
            className="flex-1 py-3 bg-[#dfba73] hover:bg-[#cbba53] text-black text-xs font-bold rounded-xl transition-all touch-target"
          >
            العودة للرئيسية
          </button>
        )}
      </div>
    </div>
  );
}
