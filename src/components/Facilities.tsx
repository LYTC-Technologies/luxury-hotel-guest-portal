/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Users, CheckCircle2, Calendar } from 'lucide-react';
import { hotelFacilities } from '../data';
import ServiceHeader from './ServiceHeader';

interface FacilitiesProps {
  onBack: () => void;
  onAddOrder: (order: { type: 'facilities' | 'spa'; title: string; details: string; estimatedDelivery: string }) => void;
  initialFacility?: string;
}

export default function Facilities({ onBack, onAddOrder, initialFacility }: FacilitiesProps) {
  const [selectedId, setSelectedId] = useState<string | null>(initialFacility ?? null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [booked, setBooked] = useState(false);

  const selected = hotelFacilities.find((f) => f.id === selectedId);

  const handleBook = () => {
    if (!selected || !bookingDate || !bookingTime) return;
    onAddOrder({
      type: selected.id === 'spa' ? 'spa' : 'facilities',
      title: `حجز ${selected.name}`,
      details: `${selected.name} — ${bookingDate} الساعة ${bookingTime} — ${guests} أشخاص`,
      estimatedDelivery: `${bookingDate} ${bookingTime}`,
    });
    setBooked(true);
    setTimeout(() => { setBooked(false); setSelectedId(null); }, 4000);
  };

  return (
    <div className="page-container space-y-6 text-right font-sans">
      <ServiceHeader title="مرافق الفندق" subtitle="احجز مرافقنا الفاخرة" onBack={onBack} />

      <AnimatePresence>
        {booked && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="glass-panel-gold rounded-2xl flex items-center gap-3 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm">تم تأكيد حجزك بنجاح</span>
          </motion.div>
        )}
      </AnimatePresence>

      {!selected ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {hotelFacilities.map((facility) => (
            <motion.button key={facility.id} whileHover={{ y: -4 }} onClick={() => setSelectedId(facility.id)}
              className="glass-panel rounded-2xl text-right overflow-hidden touch-target">
              <img src={facility.image} alt={facility.name} className="w-full h-32 object-cover rounded-xl mb-3" loading="lazy" />
              <h3 className="text-sm font-bold text-white">{facility.name}</h3>
              <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{facility.description}</p>
              <div className="flex justify-between items-center mt-3 text-[10px]">
                <span className="text-emerald-400">{facility.availability}</span>
                <span className="text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{facility.hours}</span>
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <img src={selected.image} alt={selected.name} className="w-full h-48 sm:h-64 object-cover rounded-2xl" loading="lazy" />
          <div className="glass-panel-gold rounded-2xl space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#dfba73]">{selected.name}</h2>
            <p className="text-xs text-gray-400 leading-relaxed">{selected.description}</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex justify-between"><span className="text-white">{selected.hours}</span><span className="text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />ساعات العمل</span></div>
              <div className="flex justify-between"><span className="text-white">{selected.location}</span><span className="text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />الموقع</span></div>
              <div className="flex justify-between"><span className="text-white">{selected.capacity}</span><span className="text-gray-500 flex items-center gap-1"><Users className="w-3 h-3" />السعة</span></div>
              <div className="flex justify-between"><span className="text-emerald-400">{selected.availability}</span><span className="text-gray-500">التوفر</span></div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center justify-end gap-2"><Calendar className="w-4 h-4 text-[#dfba73]" /> حجز الموعد</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-gray-500">التاريخ</label>
                <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full mt-1 bg-black/50 rounded-xl border border-white/10 px-3 py-2.5 text-sm text-white focus:border-[#dfba73] outline-none" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500">الوقت</label>
                <input type="time" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full mt-1 bg-black/50 rounded-xl border border-white/10 px-3 py-2.5 text-sm text-white focus:border-[#dfba73] outline-none" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 bg-white/10 rounded-lg text-white touch-target">-</button>
                <span className="text-white font-bold">{guests}</span>
                <button onClick={() => setGuests(guests + 1)} className="w-8 h-8 bg-white/10 rounded-lg text-white touch-target">+</button>
              </div>
              <span className="text-xs text-gray-400">عدد الأشخاص</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setSelectedId(null)} className="py-3 bg-white/5 text-xs text-gray-400 rounded-xl touch-target">رجوع</button>
              <button onClick={handleBook} disabled={!bookingDate || !bookingTime}
                className="py-3 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-xs text-black font-bold rounded-xl disabled:opacity-50 touch-target">
                تأكيد الحجز
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
