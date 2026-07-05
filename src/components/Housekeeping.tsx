/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, CheckCircle2, Heart, Plus, Minus, Layers } from 'lucide-react';
import { hotelDetails } from '../data';

interface HousekeepingProps {
  onBack: () => void;
  onAddOrder: (order: {
    type: 'housekeeping';
    title: string;
    details: string;
    estimatedDelivery: string;
  }) => void;
}

export default function Housekeeping({ onBack, onAddOrder }: HousekeepingProps) {
  const [needCleaning, setNeedCleaning] = useState(false);
  const [towelsCount, setTowelsCount] = useState(0);
  const [pillowsCount, setPillowsCount] = useState(0);
  const [blanketsCount, setBlanketsCount] = useState(0);
  const [needBabyBed, setNeedBabyBed] = useState(false);
  const [preferredTime, setPreferredTime] = useState('في أقرب وقت ممكن');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrder = () => {
    let detailsArr: string[] = [];

    if (needCleaning) detailsArr.push('تنظيف وتعقيم كامل للغرفة والجناح');
    if (towelsCount > 0) detailsArr.push(`مناشف ميكروفيبر إضافية (عدد ${towelsCount})`);
    if (pillowsCount > 0) detailsArr.push(`وسائد ريش النعام حريرية (عدد ${pillowsCount})`);
    if (blanketsCount > 0) detailsArr.push(`ألحفة شتوية قطنية إضافية (عدد ${blanketsCount})`);
    if (needBabyBed) detailsArr.push('سرير طفل رضيع مبطن بالكامل مع ألعاب معقمة');
    
    if (detailsArr.length === 0 && !specialInstructions) {
      alert('يرجى تحديد خدمة واحدة على الأقل للمتابعة.');
      return;
    }

    const details = detailsArr.join(', ') + 
      (specialInstructions ? ` | تعليمات إضافية: ${specialInstructions}` : '') +
      ` | الوقت المفضل: ${preferredTime}`;

    onAddOrder({
      type: 'housekeeping',
      title: 'طلب خدمة الغرف والتنظيف',
      details,
      estimatedDelivery: preferredTime === 'في أقرب وقت ممكن' ? '١٥-٢٥ دقيقة' : 'في الموعد المحدد'
    });

    setOrderPlaced(true);
    // Reset state
    setNeedCleaning(false);
    setTowelsCount(0);
    setPillowsCount(0);
    setBlanketsCount(0);
    setNeedBabyBed(false);
    setSpecialInstructions('');

    setTimeout(() => {
      setOrderPlaced(false);
    }, 4000);
  };

  const amenities = [
    {
      id: 'towels',
      name: 'مناشف إضافية فاخرة',
      desc: 'مناشف قطن مصري عضوي ناعمة ومطهرة.',
      val: towelsCount,
      set: setTowelsCount
    },
    {
      id: 'pillows',
      name: 'وسائد ريش ناعمة',
      desc: 'وسائد حريرية هيبوالرجينيك للنوم العميق.',
      val: pillowsCount,
      set: setPillowsCount
    },
    {
      id: 'blankets',
      name: 'لحاف إضافي ثقيل',
      desc: 'لحاف مخملي عازل دافئ ومريح.',
      val: blanketsCount,
      set: setBlanketsCount
    }
  ];

  return (
    <div className="pb-32 pt-6 px-4 max-w-4xl mx-auto space-y-6 text-right font-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="w-10 h-10" /> {/* Spacer */}
        
        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">خدمة ترتيب وتنظيف الغرف</h1>
            <p className="text-xs text-gray-400 mt-0.5">تهيئة الجناح وتوفير المناشف والوسائد الملكية المريحة</p>
          </div>
          <button
            onClick={onBack}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors cursor-pointer"
            id="btn-back-housekeeping"
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
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">تم إرسال طلب التهيئة بنجاح!</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              تم إشعار فريق خدمة الغرف الخاص بجناحك رقم <span className="text-[#dfba73] font-bold">702</span>. سيقوم الفريق بالمرور لتلبية احتياجاتك بالكامل في الوقت المختار.
            </p>
            <div className="w-20 h-[1px] bg-white/10 mx-auto" />
            <div className="text-[10px] text-gray-500 font-mono">التقدير المتوقع: {preferredTime === 'في أقرب وقت ممكن' ? 'خلال ٢٠ دقيقة' : 'في الوقت المختار'}</div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Quick Request Toggles & Time Selector */}
            <div className="glass-panel p-5 rounded-2xl border-white/5 space-y-5">
              <h3 className="font-serif text-sm font-bold text-[#dfba73] pb-2 border-b border-white/5 flex items-center justify-end gap-2">
                <span>الخدمات المباشرة والوقت</span>
                <Sparkles className="w-4 h-4 text-[#dfba73]" />
              </h3>

              {/* Full cleaning request toggle */}
              <button
                onClick={() => setNeedCleaning(!needCleaning)}
                className={`w-full p-4 rounded-xl border transition-all text-right flex items-center justify-between ${
                  needCleaning
                    ? 'border-[#dfba73] bg-[#dfba73]/5 shadow-[0_0_15px_rgba(223,186,115,0.1)]'
                    : 'border-white/5 bg-black/40 hover:border-white/10'
                }`}
                id="btn-toggle-cleaning"
              >
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${needCleaning ? 'border-[#dfba73]' : 'border-gray-600'}`}>
                  {needCleaning && <div className="w-2.5 h-2.5 bg-[#dfba73] rounded-full" />}
                </span>
                <div className="text-right">
                  <h4 className="text-xs font-bold text-white">طلب تنظيف وتعقيم الغرفة فوري</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">تغيير الأغطية، تعطير الجناح بالعود الفاخر، ومسح الأرضيات.</p>
                </div>
              </button>

              {/* Baby bed request toggle */}
              <button
                onClick={() => setNeedBabyBed(!needBabyBed)}
                className={`w-full p-4 rounded-xl border transition-all text-right flex items-center justify-between ${
                  needBabyBed
                    ? 'border-[#dfba73] bg-[#dfba73]/5 shadow-[0_0_15px_rgba(223,186,115,0.1)]'
                    : 'border-white/5 bg-black/40 hover:border-white/10'
                }`}
                id="btn-toggle-babybed"
              >
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${needBabyBed ? 'border-[#dfba73]' : 'border-gray-600'}`}>
                  {needBabyBed && <div className="w-2.5 h-2.5 bg-[#dfba73] rounded-full" />}
                </span>
                <div className="text-right">
                  <h4 className="text-xs font-bold text-white">طلب سرير طفل رضيع إضافي</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">سرير مريح معقم مع ألعاب أطفال ناعمة ووسائد آمنة.</p>
                </div>
              </button>

              {/* Timing selector */}
              <div className="space-y-1.5 text-right">
                <label className="block text-xs font-medium text-gray-400">الوقت المفضل لتنفيذ الطلب:</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full bg-black/50 text-xs text-white p-3 rounded-xl border border-white/5 focus:border-[#dfba73] focus:outline-none"
                >
                  <option value="في أقرب وقت ممكن">في أقرب وقت ممكن (توصيل فوري خلال ٢٠ دقيقة)</option>
                  <option value="بعد ساعة واحدة">بعد ساعة واحدة</option>
                  <option value="عند الخروج للعشاء (مساءً)">عند الخروج للعشاء (مساءً)</option>
                  <option value="خلال فترة إفطار الغد">خلال فترة إفطار الغد</option>
                </select>
              </div>

              {/* Custom comments */}
              <div className="space-y-1.5 text-right">
                <label className="block text-xs font-medium text-gray-400">ملاحظات أو طلبات خاصة:</label>
                <textarea
                  placeholder="مثال: يرجى التركيز على تعقيم صالة الجلوس، استخدام معطر خفيف خالي من الكحول، عدم الإزعاج أثناء رنين الهاتف..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full h-24 px-3 py-2 text-xs bg-black/50 border border-white/5 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#dfba73] resize-none"
                />
              </div>

              <button
                onClick={handleOrder}
                className="w-full py-3.5 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-black font-bold text-xs rounded-xl hover:shadow-[0_0_15px_rgba(223,186,115,0.3)] transition-all cursor-pointer"
                id="btn-confirm-housekeeping"
              >
                إرسال طلب التهيئة فورا
              </button>
            </div>

            {/* Right Column: Custom Amenities Quantities */}
            <div className="glass-panel p-5 rounded-2xl border-white/5 space-y-4">
              <h3 className="font-serif text-sm font-bold text-[#dfba73] pb-2 border-b border-white/5 flex items-center justify-end gap-2">
                <span>طلب مستلزمات ومناشف إضافية</span>
                <Layers className="w-4 h-4 text-[#dfba73]" />
              </h3>

              <div className="space-y-3">
                {amenities.map((item) => (
                  <div
                    key={item.id}
                    className="bg-black/40 p-4 rounded-xl border border-white/5 flex items-center justify-between group hover:border-[#dfba73]/10 transition-all"
                  >
                    {/* Controls */}
                    <div className="flex items-center gap-2.5 bg-white/5 rounded-lg border border-white/10 px-2 py-1">
                      <button
                        onClick={() => item.set(item.val + 1)}
                        className="text-gray-400 hover:text-[#dfba73] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-white font-mono w-4 text-center">{item.val}</span>
                      <button
                        onClick={() => item.set(Math.max(0, item.val - 1))}
                        className="text-gray-400 hover:text-red-400 cursor-pointer"
                        disabled={item.val === 0}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Description */}
                    <div className="text-right">
                      <h4 className="text-xs font-bold text-white group-hover:text-[#dfba73] transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative note */}
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[10px] text-gray-400 leading-relaxed text-right">
                💡 جميع المستلزمات الإضافية المذكورة تقدم مجاناً بالكامل كجزء من التزامنا الفاخر تجاه نزلاء الأجنحة والفلل الملكية بـ <span className="text-[#dfba73]">{hotelDetails.name}</span>.
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
