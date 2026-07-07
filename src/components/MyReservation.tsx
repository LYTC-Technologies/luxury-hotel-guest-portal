/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar, Users, Bed, CreditCard, FileText, Receipt, Clock,
  XCircle, Edit, CalendarPlus, ArrowUpCircle, UserPlus, Plus,
  CheckCircle2, AlertCircle
} from 'lucide-react';
import { Guest } from '../types';
import { reservationHistory, reservationTimeline } from '../data';
import ServiceHeader from './ServiceHeader';

interface MyReservationProps {
  guest: Guest;
  onBack: () => void;
}

export default function MyReservation({ guest, onBack }: MyReservationProps) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showAddGuestModal, setShowAddGuestModal] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [extendNights, setExtendNights] = useState(1);
  const [newGuestName, setNewGuestName] = useState('');

  const nights = Math.ceil(
    (new Date(guest.checkOutDate).getTime() - new Date(guest.checkInDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleAction = (action: string) => {
    setActionSuccess(action);
    setShowCancelModal(false);
    setShowExtendModal(false);
    setShowUpgradeModal(false);
    setShowAddGuestModal(false);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  return (
    <div className="page-container space-y-6 text-right font-sans">
      <ServiceHeader title="حجزي" subtitle={`رقم الحجز: ${guest.reservationNumber}`} onBack={onBack} />

      <AnimatePresence>
        {actionSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-panel-gold rounded-2xl flex items-center gap-3 text-emerald-400"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">{actionSuccess}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status & Summary */}
      <div className="glass-panel-gold rounded-2xl space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-lg">
            {guest.reservationStatus}
          </span>
          <h2 className="font-serif text-lg font-bold text-[#dfba73]">تفاصيل الحجز الحالي</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <div className="text-[10px] text-gray-500">نوع الغرفة</div>
            <div className="text-xs text-white font-medium mt-1">{guest.roomType}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500">نوع السرير</div>
            <div className="text-xs text-white font-medium mt-1 flex items-center justify-end gap-1">
              <Bed className="w-3 h-3 text-[#dfba73]" />
              {guest.bedType}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500">عدد الليالي</div>
            <div className="text-xs text-white font-medium mt-1">{nights} ليالٍ</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500">عدد الضيوف</div>
            <div className="text-xs text-white font-medium mt-1 flex items-center justify-end gap-1">
              <Users className="w-3 h-3 text-[#dfba73]" />
              {guest.guestCount} بالغين
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500">عدد الأطفال</div>
            <div className="text-xs text-white font-medium mt-1">{guest.childrenCount} أطفال</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500">رمز الخصم</div>
            <div className="text-xs text-[#dfba73] font-mono mt-1">{guest.promoCode}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/10">
          <div>
            <div className="text-[10px] text-gray-500">تاريخ الوصول</div>
            <div className="text-xs text-white font-mono mt-1 flex items-center justify-end gap-1">
              <Calendar className="w-3 h-3 text-[#dfba73]" />
              {guest.checkInDate}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500">تاريخ المغادرة</div>
            <div className="text-xs text-white font-mono mt-1 flex items-center justify-end gap-1">
              <Calendar className="w-3 h-3 text-blue-400" />
              {guest.checkOutDate}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="glass-panel rounded-2xl space-y-3">
        <h3 className="font-serif text-sm font-bold text-white flex items-center justify-end gap-2">
          <span>الملخص المالي</span>
          <CreditCard className="w-4 h-4 text-[#dfba73]" />
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between"><span className="text-white font-mono">{guest.totalAmount.toLocaleString('ar-SA')} ر.س</span><span className="text-gray-400">إجمالي المبلغ</span></div>
          <div className="flex justify-between"><span className="text-emerald-400 font-mono">{guest.paidAmount.toLocaleString('ar-SA')} ر.س</span><span className="text-gray-400">المبلغ المدفوع</span></div>
          <div className="flex justify-between"><span className="text-[#dfba73] font-mono font-bold">{guest.balanceDue.toLocaleString('ar-SA')} ر.س</span><span className="text-gray-400">المبلغ المتبقي</span></div>
          <div className="flex justify-between border-t border-white/5 pt-2"><span className="text-gray-300 font-mono">{guest.taxes.toLocaleString('ar-SA')} ر.س</span><span className="text-gray-400">الضرائب</span></div>
          <div className="flex justify-between"><span className="text-emerald-400 font-mono">-{guest.discounts.toLocaleString('ar-SA')} ر.س</span><span className="text-gray-400">الخصومات</span></div>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button className="py-2.5 bg-white/5 hover:bg-white/10 text-xs text-gray-300 rounded-xl transition-colors flex items-center justify-center gap-1 touch-target">
            <Receipt className="w-3.5 h-3.5" />
            تحميل الإيصال
          </button>
          <button className="py-2.5 bg-[#dfba73]/10 hover:bg-[#dfba73]/20 text-xs text-[#dfba73] rounded-xl transition-colors flex items-center justify-center gap-1 touch-target">
            <FileText className="w-3.5 h-3.5" />
            عرض الفاتورة
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="glass-panel rounded-2xl space-y-4">
        <h3 className="font-serif text-sm font-bold text-white flex items-center justify-end gap-2">
          <span>التسلسل الزمني للحجز</span>
          <Clock className="w-4 h-4 text-[#dfba73]" />
        </h3>
        <div className="space-y-3">
          {reservationTimeline.map((event) => (
            <div key={event.id} className="flex gap-3 items-start">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                event.status === 'completed' ? 'bg-emerald-400' :
                event.status === 'current' ? 'bg-[#dfba73] animate-pulse' : 'bg-white/20'
              }`} />
              <div className="flex-1 text-right">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] text-gray-500 font-mono">{event.date} • {event.time}</span>
                  <span className="text-xs font-bold text-white">{event.icon} {event.title}</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: 'إلغاء الحجز', icon: XCircle, color: 'text-red-400', action: () => setShowCancelModal(true) },
          { label: 'تعديل الحجز', icon: Edit, color: 'text-blue-400', action: () => handleAction('تم إرسال طلب تعديل الحجز إلى الاستقبال') },
          { label: 'تمديد الإقامة', icon: CalendarPlus, color: 'text-[#dfba73]', action: () => setShowExtendModal(true) },
          { label: 'ترقية الغرفة', icon: ArrowUpCircle, color: 'text-emerald-400', action: () => setShowUpgradeModal(true) },
          { label: 'إضافة ضيف', icon: UserPlus, color: 'text-purple-400', action: () => setShowAddGuestModal(true) },
          { label: 'إضافة خدمات', icon: Plus, color: 'text-amber-400', action: () => handleAction('تم فتح قائمة الخدمات الإضافية') },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            className="glass-panel rounded-xl hover:border-[#dfba73]/30 transition-all flex flex-col items-center gap-2 touch-target"
          >
            <btn.icon className={`w-5 h-5 ${btn.color}`} />
            <span className="text-[11px] text-gray-300 font-medium">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* History */}
      <div className="glass-panel rounded-2xl space-y-3">
        <h3 className="font-serif text-sm font-bold text-white">سجل الحجوزات السابقة</h3>
        <div className="table-responsive">
          <div className="space-y-3 min-w-[280px]">
            {reservationHistory.map((res) => (
              <div key={res.id} className="bg-black/20 rounded-xl p-4 border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] px-2 py-0.5 rounded-lg font-bold ${
                    res.status === 'مكتمل' ? 'bg-emerald-500/10 text-emerald-400' :
                    res.status === 'قادم' ? 'bg-blue-500/10 text-blue-400' : 'bg-red-500/10 text-red-400'
                  }`}>{res.status}</span>
                  <span className="text-xs font-mono text-[#dfba73]">{res.reservationNumber}</span>
                </div>
                <div className="text-xs text-white">{res.hotelName}</div>
                <div className="text-[11px] text-gray-500">{res.roomType} • {res.checkInDate} → {res.checkOutDate}</div>
                <div className="text-xs text-gray-400 font-mono">{res.totalAmount.toLocaleString('ar-SA')} ر.س</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showCancelModal && (
          <Modal onClose={() => setShowCancelModal(false)} title="تأكيد إلغاء الحجز">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
            <p className="text-xs text-gray-400 text-center">هل أنت متأكد من إلغاء حجزك؟ قد تطبق رسوم إلغاء حسب سياسة الفندق.</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setShowCancelModal(false)} className="py-3 bg-white/5 text-xs text-gray-400 rounded-xl">تراجع</button>
              <button onClick={() => handleAction('تم إرسال طلب إلغاء الحجز. سيتواصل معك الاستقبال خلال ساعة.')} className="py-3 bg-red-600 text-xs text-white rounded-xl font-bold">تأكيد الإلغاء</button>
            </div>
          </Modal>
        )}
        {showExtendModal && (
          <Modal onClose={() => setShowExtendModal(false)} title="تمديد الإقامة">
            <div className="flex justify-center items-center gap-4">
              <button onClick={() => setExtendNights(Math.max(1, extendNights - 1))} className="w-10 h-10 bg-white/10 rounded-xl text-white">-</button>
              <span className="text-2xl font-bold text-[#dfba73]">{extendNights} ليلة</span>
              <button onClick={() => setExtendNights(extendNights + 1)} className="w-10 h-10 bg-white/10 rounded-xl text-white">+</button>
            </div>
            <button onClick={() => handleAction(`تم إرسال طلب تمديد الإقامة ${extendNights} ليلة إضافية`)} className="w-full py-3 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-xs text-black font-bold rounded-xl">تأكيد التمديد</button>
          </Modal>
        )}
        {showUpgradeModal && (
          <Modal onClose={() => setShowUpgradeModal(false)} title="ترقية الغرفة">
            <p className="text-xs text-gray-400 text-center">ترقية إلى فيلا ملكية بمسبح خاص — خصم 35% متاح حالياً</p>
            <button onClick={() => handleAction('تم إرسال طلب ترقية الغرفة. سيتم إعلامك عند التوفر.')} className="w-full py-3 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-xs text-black font-bold rounded-xl">طلب الترقية</button>
          </Modal>
        )}
        {showAddGuestModal && (
          <Modal onClose={() => setShowAddGuestModal(false)} title="إضافة ضيف">
            <input
              value={newGuestName}
              onChange={(e) => setNewGuestName(e.target.value)}
              placeholder="اسم الضيف الكامل"
              className="w-full bg-black/50 rounded-xl border border-white/10 px-4 py-3 text-sm text-white focus:border-[#dfba73] outline-none"
            />
            <button
              onClick={() => { if (newGuestName) handleAction(`تمت إضافة الضيف: ${newGuestName}`); }}
              disabled={!newGuestName}
              className="w-full py-3 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-xs text-black font-bold rounded-xl disabled:opacity-50"
            >تأكيد الإضافة</button>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative z-10 w-full max-w-sm glass-panel rounded-2xl space-y-4 text-right">
        <h3 className="font-serif text-base font-bold text-white text-center">{title}</h3>
        {children}
      </motion.div>
    </div>
  );
}
