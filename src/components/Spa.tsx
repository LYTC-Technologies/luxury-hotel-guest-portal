/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Calendar, User, Clock, Heart, CheckCircle } from 'lucide-react';
import { spaServices, therapists } from '../data';

interface SpaProps {
  onBack: () => void;
  onAddOrder: (order: {
    type: 'spa';
    title: string;
    details: string;
    estimatedDelivery: string;
  }) => void;
}

export default function Spa({ onBack, onAddOrder }: SpaProps) {
  const [selectedService, setSelectedService] = useState('s1');
  const [selectedTherapist, setSelectedTherapist] = useState('t3');
  const [selectedDate, setSelectedDate] = useState('2026-07-05');
  const [selectedTime, setSelectedTime] = useState('06:00 مساءً');
  const [specialRequests, setSpecialRequests] = useState('');
  const [booked, setBooked] = useState(false);

  const activeServiceObj = spaServices.find((s) => s.id === selectedService) || spaServices[0];
  const activeTherapistObj = therapists.find((t) => t.id === selectedTherapist) || therapists[0];

  const handleBooking = () => {
    const details = `الخدمة: ${activeServiceObj.name} | المعالج: ${activeTherapistObj.name} | التاريخ: ${selectedDate} | الوقت: ${selectedTime}` +
      (specialRequests ? ` | طلبات خاصة: ${specialRequests}` : '');

    onAddOrder({
      type: 'spa',
      title: `حجز موعد في السبا الملكي (${activeServiceObj.name})`,
      details,
      estimatedDelivery: 'مؤكد تلقائياً'
    });

    setBooked(true);
    setTimeout(() => {
      setBooked(false);
    }, 4000);
  };

  return (
    <div className="pb-32 pt-6 px-4 max-w-4xl mx-auto space-y-6 text-right font-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="w-10 h-10" />
        
        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">السبا ومركز الاستشفاء الملكي</h1>
            <p className="text-xs text-gray-400 mt-0.5">رحلة من الاسترخاء الفائق لتجديد طاقة الجسد والروح</p>
          </div>
          <button
            onClick={onBack}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors cursor-pointer"
            id="btn-back-spa"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {booked ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-panel p-8 rounded-3xl text-center space-y-4 border-[#dfba73]/30"
          >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">تم تأكيد حجز موعد العافية بنجاح!</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              يسعدنا استضافتك في واحة السبا الملكية. تم تأكيد جلستك الخاصة بـ <span className="text-[#dfba73] font-bold">
                {activeServiceObj.name}
              </span> اليوم في تمام <span className="text-[#dfba73] font-mono">{selectedTime}</span> بإشراف الخبير: {activeTherapistObj.name}.
            </p>
            <div className="w-20 h-[1px] bg-white/10 mx-auto" />
            <div className="text-[10px] text-gray-500 font-mono">رمز حجز الجلسة الفوري: #SPA-{Math.floor(Math.random() * 90000) + 10000}</div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left side: Booking details Form */}
            <div className="glass-panel p-5 rounded-2xl border-white/5 space-y-5">
              <h3 className="font-serif text-sm font-bold text-[#dfba73] pb-2 border-b border-white/5 flex items-center justify-end gap-2">
                <span>تخصيص جلسة الاستشفاء</span>
                <Calendar className="w-4 h-4 text-[#dfba73]" />
              </h3>

              {/* Select service dropdown */}
              <div className="space-y-1.5 text-right">
                <label className="block text-xs font-medium text-gray-400">اختر علاج العافية المفضل:</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-black/50 text-xs text-white p-3 rounded-xl border border-white/5 focus:border-[#dfba73] focus:outline-none"
                >
                  {spaServices.map((service) => (
                    <option key={service.id} value={service.id}>{service.name} ({service.duration})</option>
                  ))}
                </select>
              </div>

              {/* Select therapist dropdown */}
              <div className="space-y-1.5 text-right">
                <label className="block text-xs font-medium text-gray-400">اختر خبير الاستشفاء المفضل:</label>
                <select
                  value={selectedTherapist}
                  onChange={(e) => setSelectedTherapist(e.target.value)}
                  className="w-full bg-black/50 text-xs text-white p-3 rounded-xl border border-white/5 focus:border-[#dfba73] focus:outline-none"
                >
                  {therapists.map((ther) => (
                    <option key={ther.id} value={ther.id}>{ther.name} • ⭐ {ther.rating}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Date */}
                <div className="space-y-1.5 text-right">
                  <label className="block text-xs font-medium text-gray-400">تاريخ موعد الجلسة:</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-black/50 text-xs text-white p-3 rounded-xl border border-white/5 focus:border-[#dfba73] focus:outline-none"
                  />
                </div>

                {/* Time Slot */}
                <div className="space-y-1.5 text-right">
                  <label className="block text-xs font-medium text-gray-400">الوقت المفضل للبدء:</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-black/50 text-xs text-white p-3 rounded-xl border border-white/5 focus:border-[#dfba73] focus:outline-none"
                  >
                    <option value="10:00 صباحاً">10:00 صباحاً</option>
                    <option value="12:00 ظهراً">12:00 ظهراً</option>
                    <option value="02:00 ظهراً">02:00 ظهراً</option>
                    <option value="04:00 عصراً">04:00 عصراً</option>
                    <option value="06:00 مساءً">06:00 مساءً</option>
                    <option value="08:00 مساءً">08:00 مساءً</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-1.5 text-right">
                <label className="block text-xs font-medium text-gray-400">ملاحظات طبية أو تفضيلات عطرية:</label>
                <textarea
                  placeholder="مثال: يرجى تفادي زيوت الياسمين، تركيز التدليك على الكتف، الإضاءة خافتة جداً وموسيقى أصوات الطبيعة..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full h-20 px-3 py-2 text-xs bg-black/50 border border-white/5 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#dfba73] resize-none"
                />
              </div>

              {/* Cost and confirmation */}
              <div className="pt-2 border-t border-white/5 flex justify-between items-center text-xs">
                <span className="text-sm font-bold text-[#dfba73] font-mono">{activeServiceObj.price} ر.س</span>
                <span className="text-gray-400">تكلفة الجلسة الملوكية:</span>
              </div>

              <button
                onClick={handleBooking}
                className="w-full py-4 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-black font-bold text-xs rounded-xl hover:shadow-[0_0_15px_rgba(223,186,115,0.3)] transition-all cursor-pointer"
                id="btn-confirm-spa-booking"
              >
                تأكيد حجز جلسة العافية فوراً
              </button>
            </div>

            {/* Right side: Spa treatments details list */}
            <div className="space-y-4">
              <h3 className="font-serif text-sm font-bold text-[#dfba73] pb-2 border-b border-white/5 flex items-center justify-end gap-2">
                <span>علاجاتنا ومزايا الاستشفاء</span>
                <Heart className="w-4 h-4 text-[#dfba73]" />
              </h3>

              <div className="space-y-4">
                {spaServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`glass-panel rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-row items-stretch h-32 group ${
                      selectedService === service.id ? 'border-[#dfba73] bg-[#dfba73]/5' : 'border-white/5 hover:border-white/10'
                    }`}
                  >
                    {/* Image section */}
                    <div className="w-1/3 relative overflow-hidden bg-neutral-900">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Details */}
                    <div className="w-2/3 p-4 flex flex-col justify-between text-right">
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-[#dfba73] transition-colors">
                          {service.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-white/5">
                        <span className="text-xs font-bold text-[#dfba73] font-mono">{service.price} ر.س</span>
                        <span className="text-[9px] text-gray-400">🕒 {service.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
