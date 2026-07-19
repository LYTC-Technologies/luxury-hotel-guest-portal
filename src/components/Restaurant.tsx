/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Calendar, Users, Clock, Compass, CheckCircle, Loader2 } from 'lucide-react';
import { hotelDetails } from '../data';
import { useRoom } from '../contexts/RoomContext';

interface RestaurantProps {
  onBack: () => void;
  onAddOrder: (order: {
    type: 'restaurant';
    title: string;
    details: string;
    estimatedDelivery: string;
  }) => void;
}

export default function Restaurant({ onBack, onAddOrder }: RestaurantProps) {
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState('2026-07-05');
  const [selectedTime, setSelectedTime] = useState('08:30 مساءً');
  const [seatingPreference, setSeatingPreference] = useState('outdoor'); // indoor / outdoor / VIP
  const [specialOccasion, setSpecialOccasion] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('alba'); // alba / fireplace / oasis
  const [reserved, setReserved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { roomNumber, hasValidRoom } = useRoom();

  const restaurantsList = [
    {
      id: 'alba',
      name: 'المطعم الإيطالي "ألبا" (ALBA)',
      desc: 'أطباق مبتكرة معكرونة طازجة وترافل أسود معدّة بواسطة كبار طهاة ميشلان بإطلالة مائية رائعة.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      time: 'يومياً من ٦ مساءً حتى ١٢ ليلاً'
    },
    {
      id: 'fireplace',
      name: 'ستيك هاوس "ذا فاير بليس" (The Fireplace)',
      desc: 'أجود شرائح لحوم التوماهاوك والواغيو المشوية على خشب شجر الكرز والأرز الطبيعي بنكهة مدخنة رائعة.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
      time: 'يومياً من ٥ مساءً حتى ١ ليلاً'
    },
    {
      id: 'oasis',
      name: 'المطعم العربي "الواحة الشرقية"',
      desc: 'بوفيه فاخر يقدم أشهى الأطباق السعودية والخليجية التقليدية مع جلسات بيت شعر وموسيقى العود الحية.',
      image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=800&q=80',
      time: 'يومياً من ١٢ ظهراً حتى ١١ مساءً'
    }
  ];

  const handleReservation = async () => {
    if (!hasValidRoom || !roomNumber) {
      alert('يرجى تسجيل الدخول أولاً');
      return;
    }

    setSubmitting(true);

    try {
      const restaurantObj = restaurantsList.find((r) => r.id === selectedRestaurant);
      const seatingText = 
        seatingPreference === 'outdoor' ? 'جلسة خارجية تطل على النوافير' :
        seatingPreference === 'indoor' ? 'جلسة داخلية هادئة مكيفة' : 'طاولة VIP خاصة مع حجب الخصوصية';

      const details = `مطعم: ${restaurantObj?.name} | عدد الضيوف: ${guestsCount} | تاريخ: ${selectedDate} | الوقت: ${selectedTime} | الجلسة: ${seatingText}` +
        (specialOccasion ? ` | مناسبة خاصة: ${specialOccasion}` : '');

      onAddOrder({
        type: 'restaurant',
        title: `حجز طاولة في ${restaurantObj?.name}`,
        details,
        estimatedDelivery: 'مؤكد فورياً'
      });

      setReserved(true);
      setTimeout(() => {
        setReserved(false);
      }, 4000);
    } catch (error) {
      console.error('Reservation error:', error);
      alert('فشل إرسال الحجز. يرجى المحاولة مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pb-32 pt-6 px-4 max-w-4xl mx-auto space-y-6 text-right font-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="w-10 h-10" />
        
        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">حجز طاولات مطاعم المنتجع</h1>
            <p className="text-xs text-gray-400 mt-0.5">احجز مكانك في أرقى الوجهات المطبخية لتجربة طعام استثنائية</p>
          </div>
          <button
            onClick={onBack}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors cursor-pointer"
            id="btn-back-restaurant"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {reserved ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-panel p-8 rounded-3xl text-center space-y-4 border-[#dfba73]/30"
          >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">تم تأكيد حجز الطاولة بنجاح!</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              تم حجز وتأكيد طاولتك المفضلة في <span className="text-[#dfba73] font-bold">
                {restaurantsList.find((r) => r.id === selectedRestaurant)?.name}
              </span>. المضيفون بانتظار تشريفك في الموعد المختار.
            </p>
            <div className="w-20 h-[1px] bg-white/10 mx-auto" />
            <div className="text-[10px] text-gray-500 font-mono">رمز التأكيد الآمن: #RES-{Math.floor(Math.random() * 90000) + 10000}</div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left side: Booking details form */}
            <div className="glass-panel p-5 rounded-2xl border-white/5 space-y-5">
              <h3 className="font-serif text-sm font-bold text-[#dfba73] pb-2 border-b border-white/5 flex items-center justify-end gap-2">
                <span>تخصيص وتأكيد الحجز</span>
                <Calendar className="w-4 h-4 text-[#dfba73]" />
              </h3>

              {/* Select restaurant dropdown */}
              <div className="space-y-1.5 text-right">
                <label className="block text-xs font-medium text-gray-400">اختر وجهتك المفضلة:</label>
                <select
                  value={selectedRestaurant}
                  onChange={(e) => setSelectedRestaurant(e.target.value)}
                  className="w-full bg-black/50 text-xs text-white p-3 rounded-xl border border-white/5 focus:border-[#dfba73] focus:outline-none"
                >
                  {restaurantsList.map((rest) => (
                    <option key={rest.id} value={rest.id}>{rest.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Guests count */}
                <div className="space-y-1.5 text-right">
                  <label className="block text-xs font-medium text-gray-400">عدد الضيوف والمرافقين:</label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                    className="w-full bg-black/50 text-xs text-white p-3 rounded-xl border border-white/5 focus:border-[#dfba73] focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>{n} أشخاص</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-1.5 text-right">
                  <label className="block text-xs font-medium text-gray-400">تاريخ الحجز:</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-black/50 text-xs text-white p-3 rounded-xl border border-white/5 focus:border-[#dfba73] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Time slot */}
                <div className="space-y-1.5 text-right">
                  <label className="block text-xs font-medium text-gray-400">توقيت الحضور المفضل:</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-black/50 text-xs text-white p-3 rounded-xl border border-white/5 focus:border-[#dfba73] focus:outline-none"
                  >
                    <option value="06:00 مساءً">06:00 مساءً</option>
                    <option value="07:00 مساءً">07:00 مساءً</option>
                    <option value="08:00 مساءً">08:00 مساءً</option>
                    <option value="08:30 مساءً">08:30 مساءً</option>
                    <option value="09:00 مساءً">09:00 مساءً</option>
                    <option value="10:00 مساءً">10:00 مساءً</option>
                  </select>
                </div>

                {/* Seating Preference */}
                <div className="space-y-1.5 text-right">
                  <label className="block text-xs font-medium text-gray-400">نوع تفضيل الطاولة والجلسة:</label>
                  <select
                    value={seatingPreference}
                    onChange={(e) => setSeatingPreference(e.target.value)}
                    className="w-full bg-black/50 text-xs text-white p-3 rounded-xl border border-white/5 focus:border-[#dfba73] focus:outline-none"
                  >
                    <option value="outdoor">خارجية تطل على النوافير والمسبح</option>
                    <option value="indoor">داخلية مكيفة وهادئة</option>
                    <option value="VIP">جناح VIP خاص مع خصوصية عائلية كاملة</option>
                  </select>
                </div>
              </div>

              {/* Special Occasion comments */}
              <div className="space-y-1.5 text-right">
                <label className="block text-xs font-medium text-gray-400">هل هناك مناسبة خاصة تود ترتيبها؟</label>
                <input
                  type="text"
                  placeholder="مثال: ذكرى زواج، ترقية، إعداد باقة زهور خاصة، كعكة عيد ميلاد..."
                  value={specialOccasion}
                  onChange={(e) => setSpecialOccasion(e.target.value)}
                  className="w-full bg-black/50 text-xs text-white p-3.5 rounded-xl border border-white/5 focus:border-[#dfba73] focus:outline-none placeholder-gray-600"
                />
              </div>

              <button
                onClick={handleReservation}
                disabled={submitting}
                className="w-full py-4 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-black font-bold text-xs rounded-xl hover:shadow-[0_0_15px_rgba(223,186,115,0.3)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                id="btn-confirm-reservation"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جاري إرسال الحجز...</span>
                  </>
                ) : (
                  <span>حجز الطاولة وتأكيد المضيف فوراً</span>
                )}
              </button>
            </div>

            {/* Right side: Restaurants details list */}
            <div className="space-y-4">
              <h3 className="font-serif text-sm font-bold text-[#dfba73] pb-2 border-b border-white/5 flex items-center justify-end gap-2">
                <span>وجهاتنا المطبخية الحائزة على جوائز</span>
                <Compass className="w-4 h-4 text-[#dfba73]" />
              </h3>

              <div className="space-y-4">
                {restaurantsList.map((rest) => (
                  <div
                    key={rest.id}
                    onClick={() => setSelectedRestaurant(rest.id)}
                    className={`glass-panel rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-row items-stretch h-28 group ${
                      selectedRestaurant === rest.id ? 'border-[#dfba73] bg-[#dfba73]/5' : 'border-white/5 hover:border-white/10'
                    }`}
                  >
                    {/* Image section */}
                    <div className="w-1/4 relative overflow-hidden bg-neutral-900">
                      <img
                        src={rest.image}
                        alt={rest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Details */}
                    <div className="w-3/4 p-4 flex flex-col justify-between text-right">
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-[#dfba73] transition-colors">
                          {rest.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                          {rest.desc}
                        </p>
                      </div>
                      <span className="text-[9px] text-[#dfba73]/80 font-medium font-sans">
                        🕒 {rest.time}
                      </span>
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
