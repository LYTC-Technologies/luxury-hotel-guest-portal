/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CreditCard, Download, CheckCircle, ShieldCheck } from 'lucide-react';
import { currentInvoice } from '../data';

interface BillsProps {
  onBack: () => void;
}

export default function Bills({ onBack }: BillsProps) {
  const [invoiceItems, setInvoiceItems] = useState(currentInvoice);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalBill = invoiceItems.reduce((acc, curr) => acc + curr.amount, 0);

  const handlePayment = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
      // Optional: Clear or change invoices, but let's keep them and mark paid
    }, 2000);
  };

  const handleDownloadInvoice = () => {
    alert('جاري توليد ملف الفاتورة بصيغة PDF... تم حفظ الفاتورة بنجاح في جهازك.');
  };

  return (
    <div className="pb-32 pt-6 px-4 max-w-4xl mx-auto space-y-6 text-right font-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* PDF Receipt download button */}
        <button
          onClick={handleDownloadInvoice}
          className="glass-panel px-4 py-2.5 rounded-full flex items-center gap-2 border-white/10 hover:border-[#dfba73]/40 cursor-pointer text-xs text-gray-300 hover:text-white"
          id="btn-download-pdf"
        >
          <span>تحميل الفاتورة (PDF)</span>
          <Download className="w-4 h-4 text-[#dfba73]" />
        </button>

        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">كشف الفواتير والمدفوعات الآمنة</h1>
            <p className="text-xs text-gray-400 mt-0.5">تفاصيل كشف حساب الخدمات وغرفة الإقامة مع دفع آمن فوري</p>
          </div>
          <button
            onClick={onBack}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors cursor-pointer"
            id="btn-back-bills"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {paymentSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-panel p-8 rounded-3xl text-center space-y-4 border-[#dfba73]/30"
          >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">تم الدفع والتسوية بنجاح!</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              تقديراً لاختيارك المتميز، تم تسوية وسداد إجمالي فاتورة الجناح رقم <span className="text-[#dfba73] font-bold">702</span> البالغة <span className="text-[#dfba73] font-bold font-mono">{totalBill} ر.س</span> بنجاح عبر بوابة الدفع الفيدرالية الآمنة. تم تحديث كشف الحساب فورياً.
            </p>
            <div className="w-20 h-[1px] bg-white/10 mx-auto" />
            <div className="text-[10px] text-gray-500 font-mono">المرجع البنكي للتأكيد: #TXN-{Math.floor(Math.random() * 900000) + 100000}</div>
            
            <button
              onClick={() => setPaymentSuccess(false)}
              className="mt-4 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white rounded-xl transition-colors cursor-pointer"
            >
              العودة لكشف الحساب
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* Left side: Pay Online Panel (1 column) */}
            <div className="glass-panel p-5 rounded-2xl border-white/5 flex flex-col justify-between space-y-5 md:col-span-1">
              <div className="space-y-4">
                <h3 className="font-serif text-sm font-bold text-[#dfba73] pb-2 border-b border-white/5 flex items-center justify-end gap-2">
                  <span>الدفع السريع الآمن</span>
                  <ShieldCheck className="w-4.5 h-4.5 text-[#dfba73]" />
                </h3>

                <div className="space-y-2 text-right">
                  <span className="text-xs text-gray-400">إجمالي المبلغ المستحق تسويته:</span>
                  <div className="text-2xl font-bold text-white font-mono">{totalBill} ر.س</div>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    * يمكنك تسوية حساب الجناح والطلبات الإضافية الآن عبر البوابة للتسريع من وتيرة المغادرة (Express Checkout) وتجنب الانتظار الطويل بالاستقبال.
                  </p>
                </div>

                {/* Simulated credit card interface */}
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-4 rounded-xl border border-white/10 space-y-4 shadow-inner text-right">
                  <div className="text-xs text-gray-500 font-mono">البطاقة المسجلة بالجناح</div>
                  <div className="text-sm font-bold text-white tracking-widest font-mono">•••• •••• •••• 9821</div>
                  <div className="flex justify-between items-center text-[10px] text-gray-400">
                    <span className="font-mono">11/29</span>
                    <span>سمو الشيخ سليمان آل سعود</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-black font-bold text-xs rounded-xl hover:shadow-[0_0_15px_rgba(223,186,115,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
                id="btn-execute-payment"
              >
                {loading ? (
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>جاري معالجة الدفع الآمن...</span>
                  </div>
                ) : (
                  <>
                    <span>تسوية وسداد الحساب فوراً</span>
                    <CreditCard className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Right side: Invoice Items details list (2 columns) */}
            <div className="md:col-span-2 glass-panel p-5 rounded-2xl border-white/5 space-y-4">
              <h3 className="font-serif text-sm font-bold text-[#dfba73] pb-2 border-b border-white/5 flex items-center justify-end gap-2">
                <span>تفاصيل كشف الحساب والخدمات</span>
                <CreditCard className="w-4 h-4 text-[#dfba73]" />
              </h3>

              <div className="space-y-2.5">
                {invoiceItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between text-right"
                  >
                    <span className="text-xs font-bold text-white font-mono">{item.amount} ر.س</span>
                    
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-gray-200">{item.description}</h4>
                      <span className="text-[9px] text-gray-500 font-mono block">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Total Bar */}
              <div className="pt-3 border-t border-dashed border-white/10 flex justify-between items-center">
                <span className="text-base font-bold text-[#dfba73] font-mono">{totalBill} ر.س</span>
                <span className="text-xs font-bold text-gray-400">إجمالي الفاتورة المتراكمة:</span>
              </div>
            </div>

          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
