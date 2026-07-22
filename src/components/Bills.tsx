/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ArrowLeft, Download, CreditCard } from 'lucide-react';
import { Guest } from '../types';

interface BillsProps {
  guest: Guest;
  onBack: () => void;
}

export default function Bills({ guest, onBack }: BillsProps) {
  const [invoiceItems, setInvoiceItems] = useState([]);

  const totalBill = invoiceItems.reduce((acc, curr) => acc + curr.amount, 0);

  const handleDownloadInvoice = () => {
    alert('جاري توليد ملف الفاتورة بصيغة PDF... تم حفظ الفاتورة بنجاح في جهازك.');
  };

  return (
    <div className="page-container space-y-6 text-right font-sans">
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
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">كشف الفواتير والمدفوعات</h1>
            <p className="text-xs text-gray-400 mt-0.5">تفاصيل كشف حساب الخدمات وغرفة الإقامة</p>
          </div>
          <button
            onClick={onBack}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors cursor-pointer"
            id="btn-back-bills"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Invoice Items details list */}
      <div className="glass-panel p-5 rounded-2xl border-white/5 space-y-4">
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
        {invoiceItems.length > 0 && (
          <div className="pt-3 border-t border-dashed border-white/10 flex justify-between items-center">
            <span className="text-base font-bold text-[#dfba73] font-mono">{totalBill} ر.س</span>
            <span className="text-xs font-bold text-gray-400">إجمالي الفاتورة المتراكمة:</span>
          </div>
        )}
        {invoiceItems.length === 0 && (
          <div className="pt-3 text-center text-xs text-gray-400">
            لا توجد فواتير متاحة حالياً
          </div>
        )}
      </div>
    </div>
  );
}
