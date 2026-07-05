/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MapPin, Car, Clock, Navigation, CheckCircle } from 'lucide-react';

interface TaxiProps {
  onBack: () => void;
  onAddOrder: (order: {
    type: 'taxi';
    title: string;
    details: string;
    estimatedDelivery: string;
  }) => void;
}

export default function Taxi({ onBack, onAddOrder }: TaxiProps) {
  const [destination, setDestination] = useState('');
  const [pickupLocation, setPickupLocation] = useState('البوابة الرئيسية للمنتجع');
  const [pickupTime, setPickupTime] = useState('في أقرب وقت ممكن');
  const [selectedVehicle, setSelectedVehicle] = useState('mercedes');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const vehiclesList = [
    {
      id: 'mercedes',
      name: 'مرسيدس مايباخ الفئة S-Class الفاخرة',
      desc: 'قاعدة عجلات طويلة، مقاعد تدليك مهواة خلفية، عزل صوت فائق وشاشات ذكية.',
      price: 450,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'bentley',
      name: 'بنتلي فلاينج سبير الملوكية',
      desc: 'فخامة بريطانية كلاسيكية، مقاعد من جلد النابا المطرّز يدوياً ومقصورة مذهلة.',
      price: 850,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'rolls',
      name: 'رولز رويس غوست VIP الفاخرة',
      desc: 'التجربة الملوكية المطلقة للنزلاء والضيوف الهامين، مع سقف النجوم المضيء المذهل.',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      alert('يرجى كتابة وجهتك المفضلة للمتابعة.');
      return;
    }

    const vehicleObj = vehiclesList.find((v) => v.id === selectedVehicle);
    const details = `الوجهة: ${destination} | مكان الاستلام: ${pickupLocation} | نوع السيارة: ${vehicleObj?.name} | موعد الاستلام: ${pickupTime}`;

    onAddOrder({
      type: 'taxi',
      title: `طلب ليموزين فاخر (${vehicleObj?.name})`,
      details,
      estimatedDelivery: pickupTime === 'في أقرب وقت ممكن' ? '١٠-١٥ دقيقة' : 'في الموعد المحدد'
    });

    setOrderPlaced(true);
    setDestination('');
    setTimeout(() => {
      setOrderPlaced(false);
    }, 4000);
  };

  return (
    <div className="pb-32 pt-6 px-4 max-w-4xl mx-auto space-y-6 text-right font-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="w-10 h-10" />
        
        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">طلب سيارة ليموزين فاخرة</h1>
            <p className="text-xs text-gray-400 mt-0.5">أسطول الليموزين الملكي الخاص بالمنتجع بتصرفك على مدار الساعة</p>
          </div>
          <button
            onClick={onBack}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors cursor-pointer"
            id="btn-back-taxi"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {orderPlaced ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-panel p-8 rounded-3xl text-center space-y-4 border-[#dfba73]/30"
          >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">تم تأكيد طلب السيارة بنجاح!</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              تم حجز وتوجيه سيارتك الفاخرة من طراز <span className="text-[#dfba73] font-bold">
                {vehiclesList.find((v) => v.id === selectedVehicle)?.name}
              </span>. سائقك الخاص بانتظار تلبية طلبك وبدء الرحلة في الوقت المختار.
            </p>
            <div className="w-20 h-[1px] bg-white/10 mx-auto" />
            <div className="text-[10px] text-gray-500 font-mono">الوصول المتوقع: {pickupTime === 'في أقرب وقت ممكن' ? 'خلال ١٢ دقيقة' : 'في الوقت المختار'}</div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column: Input Form */}
            <form onSubmit={handleOrder} className="glass-panel p-5 rounded-2xl border-white/5 space-y-5 text-right">
              <h3 className="font-serif text-sm font-bold text-[#dfba73] pb-2 border-b border-white/5 flex items-center justify-end gap-2">
                <span>تحديد الرحلة والوجهة</span>
                <Navigation className="w-4 h-4 text-[#dfba73]" />
              </h3>

              {/* Destination Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-400">وجهتك المقصودة أو المشوار:</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="مثال: مطار الملك خالد الدولي، بوليفارد الرياض، مطل البجيري..."
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-3.5 pl-10 bg-black/50 text-xs text-white rounded-xl border border-white/5 focus:border-[#dfba73] focus:outline-none placeholder-gray-600 text-right"
                  />
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#dfba73]" />
                </div>
              </div>

              {/* Pickup Location Select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-400">نقطة استلامك الفندقية:</label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-black/50 text-xs text-white p-3.5 rounded-xl border border-white/5 focus:border-[#dfba73] focus:outline-none"
                >
                  <option value="البوابة الرئيسية للمنتجع">البوابة الرئيسية والاستقبال للمنتجع</option>
                  <option value="بوابة فيلتك / جناحك الخاصة">بوابة الجناح / الفيلا الخاصة بك</option>
                  <option value="بوابة مركز السبا والرياضة">بوابة مركز السبا والرياضة</option>
                  <option value="بوابة المطل المائي للمطاعم">بوابة المطل المائي للمطاعم</option>
                </select>
              </div>

              {/* Pickup Time Select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-400">توقيت استلام السيارة المفضل:</label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full bg-black/50 text-xs text-white p-3.5 rounded-xl border border-white/5 focus:border-[#dfba73] focus:outline-none"
                >
                  <option value="في أقرب وقت ممكن">في أقرب وقت ممكن (توصيل فوري خلال ١٠-١٥ دقيقة)</option>
                  <option value="بعد ٣٠ دقيقة">بعد ٣٠ دقيقة</option>
                  <option value="بعد ساعة واحدة">بعد ساعة واحدة</option>
                  <option value="مساء اليوم (الثامنة مساءً)">مساء اليوم (الثامنة مساءً)</option>
                  <option value="غداً صباحاً (التاسعة صباحاً)">غداً صباحاً (التاسعة صباحاً)</option>
                </select>
              </div>

              {/* Cost summary notice */}
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[10px] text-gray-400 leading-relaxed">
                * رسوم الليموزين سيتم إدراجها في فاتورة غرفتك الإجمالية. السعر شامل السائق الخاص والضيافة الخفيفة بالسيارة.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-black font-bold text-xs rounded-xl hover:shadow-[0_0_15px_rgba(223,186,115,0.3)] transition-all cursor-pointer"
                id="btn-confirm-taxi"
              >
                تأكيد حجز الليموزين الملكي
              </button>
            </form>

            {/* Right Column: Vehicles Details */}
            <div className="space-y-4">
              <h3 className="font-serif text-sm font-bold text-[#dfba73] pb-2 border-b border-white/5 flex items-center justify-end gap-2">
                <span>أسطول الليموزين الفندقي الفاخر</span>
                <Car className="w-4 h-4 text-[#dfba73]" />
              </h3>

              <div className="space-y-4">
                {vehiclesList.map((veh) => (
                  <div
                    key={veh.id}
                    onClick={() => setSelectedVehicle(veh.id)}
                    className={`glass-panel rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-row items-stretch h-28 group ${
                      selectedVehicle === veh.id ? 'border-[#dfba73] bg-[#dfba73]/5' : 'border-white/5 hover:border-white/10'
                    }`}
                  >
                    {/* Image section */}
                    <div className="w-1/4 relative overflow-hidden bg-neutral-950 flex items-center justify-center p-2">
                      <div className="text-4xl">🚗</div>
                    </div>

                    {/* Details */}
                    <div className="w-3/4 p-4 flex flex-col justify-between text-right">
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-[#dfba73] transition-colors">
                          {veh.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                          {veh.desc}
                        </p>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-white/5">
                        <span className="text-xs font-bold text-[#dfba73] font-mono">{veh.price} ر.س / مشوار</span>
                        <span className="text-[9px] text-emerald-400">سائق خاص معتمد</span>
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
