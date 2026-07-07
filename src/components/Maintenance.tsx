/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Wrench, Camera, AlertTriangle, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { maintenanceIssues } from '../data';
import { Guest } from '../types';

interface MaintenanceProps {
  guest: Guest;
  onBack: () => void;
  onAddOrder: (order: {
    type: 'maintenance';
    title: string;
    details: string;
    estimatedDelivery: string;
  }) => void;
}

export default function Maintenance({ guest, onBack, onAddOrder }: MaintenanceProps) {
  const [issueType, setIssueType] = useState('m1');
  const [priority, setPriority] = useState('medium'); // low / medium / urgent
  const [description, setDescription] = useState('');
  const [photoAttached, setPhotoAttached] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const issueCategories = maintenanceIssues.map((m) => ({ id: m.id, name: m.name, priority: m.priority }));

  const handleAttachPhoto = () => {
    setPhotoAttached(true);
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('يرجى وصف المشكلة الفنية بالتفصيل للمتابعة.');
      return;
    }

    const categoryObj = issueCategories.find((c) => c.id === issueType);
    const priorityText = 
      priority === 'low' ? 'أولوية اعتيادية (صيانة مجدولة)' :
      priority === 'medium' ? 'أولوية متوسطة (خلال ساعة)' : 'أولوية طارئة للغاية (تلبية عاجلة فوراً)';

    const details = `الفئة: ${categoryObj?.name} | الأولوية: ${priorityText} | الوصف: ${description}` +
      (photoAttached ? ' | مرفق: صورة للخلل الفني' : '');

    onAddOrder({
      type: 'maintenance',
      title: `طلب صيانة للغرفة (${categoryObj?.name})`,
      details,
      estimatedDelivery: priority === 'urgent' ? 'فوري خلال ١٥ دقيقة' : 'خلال ٦٠ دقيقة'
    });

    setOrderPlaced(true);
    setDescription('');
    setPhotoAttached(false);

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
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">خدمات صيانة الغرف والمرافق</h1>
            <p className="text-xs text-gray-400 mt-0.5">أبلغ عن أي عطل فني في جناحك ليقوم مهندسو الصيانة الفورية بإصلاحه</p>
          </div>
          <button
            onClick={onBack}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors cursor-pointer"
            id="btn-back-maintenance"
          >
            <ArrowLeft className="w-5 h-5" />
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
            <h3 className="font-serif text-xl font-bold text-white">تم إرسال بلاغ الصيانة الفنية!</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              تم استلام البلاغ وتوجيهه إلى فريق المهندسين المناوبين لجناحك رقم <span className="text-[#dfba73] font-bold">{guest.roomNumber}</span>. سيصلك مهندس الصيانة المختص لتفقد الخلل فوراً.
            </p>
            <div className="w-20 h-[1px] bg-white/10 mx-auto" />
            <div className="text-[10px] text-gray-500 font-mono">التقدير المتوقع للوصول: {priority === 'urgent' ? 'خلال ١٥ دقيقة' : 'خلال ٤٥ دقيقة'}</div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Form Column */}
            <form onSubmit={handleOrder} className="glass-panel p-5 rounded-2xl border-white/5 space-y-5 text-right">
              <h3 className="font-serif text-sm font-bold text-[#dfba73] pb-2 border-b border-white/5 flex items-center justify-end gap-2">
                <span>تقديم بلاغ صيانة جديد</span>
                <Wrench className="w-4 h-4 text-[#dfba73]" />
              </h3>

              {/* Issue Type */}
              <div className="space-y-1.5 text-right">
                <label className="block text-xs font-medium text-gray-400">فئة ونوع الخلل الفني:</label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full bg-black/50 text-xs text-white p-3.5 rounded-xl border border-white/5 focus:border-[#dfba73] focus:outline-none"
                >
                  {issueCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Priority Selection */}
              <div className="space-y-1.5 text-right">
                <label className="block text-xs font-medium text-gray-400">مستوى الأولوية أو درجة الطوارئ:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPriority('low')}
                    className={`p-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      priority === 'low' ? 'bg-white/5 text-white border-white/20' : 'bg-black/30 text-gray-500 border-white/5'
                    }`}
                  >
                    منخفضة (اعتيادية)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriority('medium')}
                    className={`p-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      priority === 'medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-black/30 text-gray-500 border-white/5'
                    }`}
                  >
                    متوسطة (خلال اليوم)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriority('urgent')}
                    className={`p-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      priority === 'urgent' ? 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'bg-black/30 text-gray-500 border-white/5'
                    }`}
                  >
                    ⚠️ طارئة للغاية فوري
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5 text-right">
                <label className="block text-xs font-medium text-gray-400">وصف الخلل الفني بدقة:</label>
                <textarea
                  required
                  placeholder="مثال: مكيف الصالة يصدر صوتاً مرتفعاً ولا يبرد بالشكل المطلوب، أو أحد مصابيح الحمام الملكي لا يعمل..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-24 px-3 py-2 text-xs bg-black/50 border border-white/5 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#dfba73] resize-none text-right"
                />
              </div>

              {/* Mock photo attach */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-400">أرفق صورة لتوضيح العطل (اختياري):</label>
                <button
                  type="button"
                  onClick={handleAttachPhoto}
                  className={`w-full py-4 border border-dashed rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    photoAttached
                      ? 'border-[#dfba73] bg-[#dfba73]/5 text-[#dfba73]'
                      : 'border-white/10 bg-black/20 hover:border-[#dfba73]/30 text-gray-500 hover:text-white'
                  }`}
                  id="btn-attach-photo"
                >
                  {photoAttached ? (
                    <>
                      <ImageIcon className="w-4.5 h-4.5" />
                      <span className="text-xs font-bold">تم إرفاق صورة العطل (خلل_التبريد.jpg)</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-4.5 h-4.5" />
                      <span className="text-xs">التقط صورة أو حمّل ملفاً لتوضيح العطل</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-black font-bold text-xs rounded-xl hover:shadow-[0_0_15px_rgba(223,186,115,0.3)] transition-all cursor-pointer"
                id="btn-confirm-maintenance"
              >
                إرسال بلاغ الصيانة الآن
              </button>
            </form>

            {/* Note Column */}
            <div className="glass-panel p-5 rounded-2xl border-white/5 flex flex-col justify-between text-right">
              <div className="space-y-4">
                <h3 className="font-serif text-sm font-bold text-[#dfba73] pb-2 border-b border-white/5 flex items-center justify-end gap-2">
                  <span>إرشادات وتعليمات الصيانة الآمنة</span>
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                </h3>
                
                <div className="space-y-3.5 text-xs text-gray-400 leading-relaxed">
                  <p>
                    📌 للحفاظ على راحتك وخصوصيتك، لن يقوم الفنيون بزيارة الجناح إلا بعد الاتصال المسبق للتأكد من وجودك في الغرفة أو موافقتك الصريحة على الدخول أثناء غيابك.
                  </p>
                  <p>
                    💡 جميع تكاليف إصلاح الأعطال المعتادة في الغرفة مغطاة بالكامل وبشكل مجاني كجزء من خدمات الضيافة الملوكية لمنتجعنا الراقي.
                  </p>
                  <p>
                    ⚠️ إذا كنت تواجه مشكلة طارئة تشكل خطورة (مثل تسرب كبير للرطوبة أو تلامس كهربائي)، يرجى تفعيل بلاغ الصيانة الطارئة أو الاتصال فوراً بالاستقبال لطلب الإخلاء أو الإصلاح الفوري.
                  </p>
                </div>
              </div>

              <div className="bg-black/40 p-4 rounded-xl border border-white/5 mt-6 text-[10px] text-gray-500 leading-relaxed font-sans">
                🛡️ مهندسو الصيانة الفندقية يحملون بطاقات هوية معتمدة ومطهرة وخاضعون لبروتوكولات الأمان الفندقي لضمان سلامتك وراحتك التامة.
              </div>
            </div>

          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
