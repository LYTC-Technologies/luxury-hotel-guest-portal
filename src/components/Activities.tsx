/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Compass, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { activities } from '../data';

interface ActivitiesProps {
  onBack: () => void;
  onAddOrder: (order: {
    type: 'activities';
    title: string;
    details: string;
    estimatedDelivery: string;
  }) => void;
}

export default function Activities({ onBack, onAddOrder }: ActivitiesProps) {
  const [bookedActivityId, setBookedActivityId] = useState<string | null>(null);

  const handleBook = (activityId: string) => {
    const act = activities.find((a) => a.id === activityId);
    if (!act) return;

    onAddOrder({
      type: 'activities',
      title: `حجز رحلة: ${act.title}`,
      details: `النشاط: ${act.title} | التوقيت: ${act.time} | السعر: ${act.price} ر.س | الموقع: ${act.location}`,
      estimatedDelivery: 'مؤكد تلقائياً'
    });

    setBookedActivityId(activityId);
    setTimeout(() => {
      setBookedActivityId(null);
    }, 4000);
  };

  return (
    <div className="pb-32 pt-6 px-4 max-w-4xl mx-auto space-y-6 text-right font-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="w-10 h-10" />
        
        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">الرحلات الاستكشافية والأنشطة</h1>
            <p className="text-xs text-gray-400 mt-0.5">اكتشف روعة التاريخ العربي والمغامرات الصحراوية الاستثنائية بأسلوب ملوكي</p>
          </div>
          <button
            onClick={onBack}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors cursor-pointer"
            id="btn-back-activities"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-6">
        {activities.map((act) => {
          const isThisBooked = bookedActivityId === act.id;

          return (
            <div
              key={act.id}
              id={`activity-card-${act.id}`}
              className="glass-panel rounded-3xl overflow-hidden border-white/5 flex flex-col md:flex-row items-stretch group shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
            >
              {/* Image Section */}
              <div className="w-full md:w-2/5 relative overflow-hidden min-h-48 md:min-h-auto">
                <img
                  src={act.image}
                  alt={act.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-750"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-black via-black/30 to-transparent" />
              </div>

              {/* Details Section */}
              <div className="w-full md:w-3/5 p-6 flex flex-col justify-between text-right space-y-4">
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 bg-[#dfba73]/10 border border-[#dfba73]/25 text-[#dfba73] text-[9px] font-bold rounded-full select-none inline-block">
                    تجربة استكشاف حصرية للغرفة
                  </span>
                  
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-[#dfba73] transition-colors">
                    {act.title}
                  </h3>
                  
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {act.description}
                  </p>
                </div>

                {/* Logistics */}
                <div className="grid grid-cols-2 gap-4 py-3 border-y border-white/5 text-xs text-gray-400">
                  <div className="flex items-center justify-end gap-1.5">
                    <span>{act.location}</span>
                    <MapPin className="w-4 h-4 text-[#dfba73]" />
                  </div>
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="font-sans">{act.time}</span>
                    <Calendar className="w-4 h-4 text-blue-400" />
                  </div>
                </div>

                {/* Price and booking action */}
                <div className="flex justify-between items-center pt-2">
                  <AnimatePresence mode="wait">
                    {isThisBooked ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs rounded-xl flex items-center gap-1.5"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>تم حجز رحلتك بنجاح!</span>
                      </motion.div>
                    ) : (
                      <button
                        onClick={() => handleBook(act.id)}
                        className="px-6 py-3 bg-gradient-to-r from-[#cbba53] to-[#dfba73] text-black font-bold text-xs rounded-xl hover:shadow-[0_0_12px_rgba(223,186,115,0.3)] transition-all cursor-pointer flex items-center gap-2"
                        id={`btn-book-act-${act.id}`}
                      >
                        <Compass className="w-4 h-4" />
                        <span>احجز الرحلة الخاصة الآن</span>
                      </button>
                    )}
                  </AnimatePresence>

                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 block">تكلفة الحجز للشخص:</span>
                    <span className="text-base font-bold text-[#dfba73] font-mono">{act.price} ر.س</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
