/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, CreditCard, Download, Edit2, X, Check, AlertCircle, User, Bed, ChevronDown, ChevronUp, FileText, Receipt } from 'lucide-react';
import { sampleGuest, reservationTimeline, reservationHistory, currentInvoice } from '../data';

interface ReservationProps {
  onBack: () => void;
}

export default function Reservation({ onBack }: ReservationProps) {
  const [activeTab, setActiveTab] = useState<'current' | 'history' | 'timeline'>('current');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleCancelReservation = () => {
    setShowCancelModal(false);
    alert('تم إرسال طلب إلغاء الحجز. سيتم التواصل معك خلال 24 ساعة لتأكيد الإجراء.');
  };

  const handleModifyReservation = () => {
    setShowModifyModal(false);
    alert('تم إرسال طلب تعديل الحجز. سيتم مراجعة طلبك والتواصل معك قريباً.');
  };

  return (
    <div className="page-container space-y-6 font-sans text-right">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors touch-target">
          <ChevronDown className="w-6 h-6 rotate-90" />
        </button>
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-[#dfba73] gold-text-glow">حجزي الحالي</h1>
          <p className="text-xs text-gray-500 mt-1">تفاصيل الحجز والفاتورة والتسلسل الزمني</p>
        </div>
        <div className="w-6" />
      </div>

      {/* Guest Info Card */}
      <div className="glass-panel rounded-2xl space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <User className="w-5 h-5 text-[#dfba73]" />
          <h2 className="font-serif text-lg font-bold text-white">معلومات النزيل</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] text-gray-500 mb-1">الاسم الكامل</div>
            <div className="text-sm text-white font-medium">{sampleGuest.name} {sampleGuest.lastName}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 mb-1">رقم الحجز</div>
            <div className="text-sm text-[#dfba73] font-mono font-bold">{sampleGuest.reservationNumber}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 mb-1">البريد الإلكتروني</div>
            <div className="text-sm text-white">{sampleGuest.email}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 mb-1">رقم الهاتف</div>
            <div className="text-sm text-white font-mono">{sampleGuest.phone}</div>
          </div>
        </div>
      </div>

      {/* Room Details */}
      <div className="glass-panel rounded-2xl space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <Bed className="w-5 h-5 text-[#dfba73]" />
          <h2 className="font-serif text-lg font-bold text-white">تفاصيل الغرفة</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] text-gray-500 mb-1">رقم الغرفة</div>
            <div className="text-sm text-white font-bold">{sampleGuest.roomNumber}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 mb-1">نوع الغرفة</div>
            <div className="text-sm text-white">{sampleGuest.roomType}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 mb-1">نوع السرير</div>
            <div className="text-sm text-white">{sampleGuest.bedType}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 mb-1">عدد الضيوف</div>
            <div className="text-sm text-white">{sampleGuest.guestCount} بالغين، {sampleGuest.childrenCount} أطفال</div>
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="glass-panel rounded-2xl space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <Calendar className="w-5 h-5 text-[#dfba73]" />
          <h2 className="font-serif text-lg font-bold text-white">تواريخ الإقامة</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] text-gray-500 mb-1">تاريخ الوصول</div>
            <div className="text-sm text-white font-mono">{sampleGuest.checkInDate}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 mb-1">تاريخ المغادرة</div>
            <div className="text-sm text-white font-mono">{sampleGuest.checkOutDate}</div>
          </div>
        </div>
        <div className="bg-[#dfba73]/10 rounded-xl p-3 border border-[#dfba73]/20">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#dfba73] font-medium">حالة الحجز</span>
            <span className="text-xs text-white font-bold bg-[#dfba73] px-3 py-1 rounded-full">{sampleGuest.reservationStatus}</span>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="glass-panel rounded-2xl space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <CreditCard className="w-5 h-5 text-[#dfba73]" />
          <h2 className="font-serif text-lg font-bold text-white">الملخص المالي</h2>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">إجمالي المبلغ</span>
            <span className="text-sm text-white font-mono">{sampleGuest.totalAmount.toLocaleString('ar-SA')} ر.س</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">المبلغ المدفوع</span>
            <span className="text-sm text-emerald-400 font-mono">{sampleGuest.paidAmount.toLocaleString('ar-SA')} ر.س</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">الضرائب</span>
            <span className="text-sm text-white font-mono">{sampleGuest.taxes.toLocaleString('ar-SA')} ر.س</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">الخصومات</span>
            <span className="text-sm text-[#dfba73] font-mono">-{sampleGuest.discounts.toLocaleString('ar-SA')} ر.س</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-white/10">
            <span className="text-sm font-bold text-white">الرصيد المستحق</span>
            <span className="text-lg font-bold text-[#dfba73] font-mono">{sampleGuest.balanceDue.toLocaleString('ar-SA')} ر.س</span>
          </div>
          {sampleGuest.promoCode && (
            <div className="bg-[#dfba73]/10 rounded-xl p-2 border border-[#dfba73]/20">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-400">رمز الخصم المستخدم</span>
                <span className="text-xs text-[#dfba73] font-mono font-bold">{sampleGuest.promoCode}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setShowModifyModal(true)} className="glass-panel rounded-xl flex items-center justify-center gap-2 hover:border-[#dfba73]/30 transition-all touch-target">
          <Edit2 className="w-4 h-4 text-[#dfba73]" />
          <span className="text-xs text-white font-medium">تعديل الحجز</span>
        </button>
        <button onClick={() => setShowCancelModal(true)} className="glass-panel rounded-xl flex items-center justify-center gap-2 border-red-500/20 hover:border-red-500/50 transition-all touch-target">
          <X className="w-4 h-4 text-red-400" />
          <span className="text-xs text-red-400 font-medium">إلغاء الحجز</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-3">
        {(['current', 'history', 'timeline'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all touch-target ${
              activeTab === tab
                ? 'bg-[#dfba73] text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab === 'current' ? 'التفاصيل الحالية' : tab === 'history' ? 'سجل الحجوزات' : 'التسلسل الزمني'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'current' && (
          <motion.div
            key="current"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            <h3 className="font-serif text-sm font-bold text-white mb-3">الفاتورة الحالية</h3>
            {currentInvoice.map((item) => (
              <div key={item.id} className="glass-panel rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-xs text-white font-medium">{item.description}</div>
                    <div className="text-[10px] text-gray-500 mt-1">{item.date}</div>
                  </div>
                  <div className="text-sm text-[#dfba73] font-mono font-bold">{item.amount.toLocaleString('ar-SA')} ر.س</div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {reservationHistory.map((res) => (
              <div key={res.id} className="glass-panel rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-sm text-white font-bold">{res.hotelName}</div>
                    <div className="text-xs text-gray-400 mt-1">{res.roomType}</div>
                    <div className="text-[10px] text-gray-500 mt-1">{res.checkInDate} - {res.checkOutDate}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#dfba73] font-mono font-bold">{res.totalAmount.toLocaleString('ar-SA')} ر.س</div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full mt-1 inline-block ${
                      res.status === 'مكتمل' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>{res.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {reservationTimeline.map((event, index) => (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                    event.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                    event.status === 'current' ? 'bg-[#dfba73]/20 text-[#dfba73]' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {event.icon}
                  </div>
                  {index < reservationTimeline.length - 1 && (
                    <div className="w-0.5 h-full bg-white/10 mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="text-sm text-white font-bold">{event.title}</div>
                  <div className="text-xs text-gray-400 mt-1">{event.description}</div>
                  <div className="text-[10px] text-gray-500 mt-2 font-mono">{event.date} - {event.time}</div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cancel Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCancelModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-md glass-panel p-6 rounded-2xl border-red-500/30 text-right space-y-4"
            >
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="font-serif text-lg font-bold text-red-400">تأكيد إلغاء الحجز</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  هل أنت متأكد من رغبتك في إلغاء حجزك رقم {sampleGuest.reservationNumber}؟ قد يتم تطبيق رسوم إلغاء حسب سياسة الفندق.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setShowCancelModal(false)} className="py-3 bg-white/5 hover:bg-white/10 text-xs text-gray-400 hover:text-white rounded-xl font-medium transition-colors touch-target">
                  إلغاء
                </button>
                <button onClick={handleCancelReservation} className="py-3 bg-red-600 hover:bg-red-500 text-xs text-white rounded-xl font-bold transition-all touch-target">
                  تأكيد الإلغاء
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modify Modal */}
      <AnimatePresence>
        {showModifyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModifyModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-md glass-panel p-6 rounded-2xl text-right space-y-4"
            >
              <div className="w-12 h-12 bg-[#dfba73]/10 border border-[#dfba73]/30 rounded-xl flex items-center justify-center mx-auto">
                <Edit2 className="w-6 h-6 text-[#dfba73]" />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="font-serif text-lg font-bold text-[#dfba73]">تعديل الحجز</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  اختر نوع التعديل المطلوب على حجزك
                </p>
              </div>
              <div className="space-y-2">
                <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white transition-colors touch-target">
                  تمديد الإقامة
                </button>
                <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white transition-colors touch-target">
                  ترقية الغرفة
                </button>
                <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white transition-colors touch-target">
                  إضافة ضيف
                </button>
                <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white transition-colors touch-target">
                  إضافة خدمات
                </button>
              </div>
              <button onClick={() => setShowModifyModal(false)} className="w-full py-3 bg-[#dfba73] hover:bg-[#cbba53] text-black text-xs font-bold rounded-xl transition-all touch-target">
                إرسال طلب التعديل
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
