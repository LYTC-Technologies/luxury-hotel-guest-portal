/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileText, Clock, CheckCircle, AlertCircle, ChevronDown, CreditCard, Bed, Coffee, Wifi, Shield, User, Calendar, MapPin } from 'lucide-react';
import { hotelDetails } from '../data';

interface CheckInProps {
  onBack: () => void;
  guestPhone?: string;
  guestName?: string;
  guestLastName?: string;
  roomNumber?: string;
  roomType?: string;
  checkInDate?: string;
  checkOutDate?: string;
}

export default function CheckIn({ 
  onBack, 
  guestPhone = hotelDetails.phone,
  guestName = 'الضيف الكريم',
  guestLastName = '',
  roomNumber = '---',
  roomType = '---',
  checkInDate = '---',
  checkOutDate = '---'
}: CheckInProps) {
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ passport: boolean; id: boolean }>({ passport: false, id: false });
  const [arrivalTime, setArrivalTime] = useState('');
  const [lateArrival, setLateArrival] = useState(false);
  const [preferences, setPreferences] = useState({
    floor: '',
    view: '',
    pillows: '',
    smoking: false,
  });
  const [cardSaved, setCardSaved] = useState(false);
  const [policiesAccepted, setPoliciesAccepted] = useState(false);
  const [signature, setSignature] = useState(false);

  const handleFileUpload = (type: 'passport' | 'id') => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploadedFiles(prev => ({ ...prev, [type]: true }));
    }, 1500);
  };

  const handleCompleteCheckIn = () => {
    alert('تم إكمال تسجيل الدخول الرقمي بنجاح! ننتظر وصولك بكل سرور.');
    onBack();
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="page-container space-y-6 font-sans text-right">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors touch-target">
          <ChevronDown className="w-6 h-6 rotate-90" />
        </button>
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-[#dfba73] gold-text-glow">تسجيل الدخول الرقمي</h1>
          <p className="text-xs text-gray-500 mt-1">أكمل إجراءات تسجيل الدخول من تطبيق الضيوف</p>
        </div>
        <div className="w-6" />
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between gap-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex-1 flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step >= s ? 'bg-[#dfba73] text-black' : 'bg-white/10 text-gray-500'
            }`}>
              {step > s ? <CheckCircle className="w-4 h-4" /> : s}
            </div>
            {s < 5 && <div className={`flex-1 h-0.5 mx-2 transition-all ${step > s ? 'bg-[#dfba73]' : 'bg-white/10'}`} />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="glass-panel rounded-2xl space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <FileText className="w-5 h-5 text-[#dfba73]" />
                <h2 className="font-serif text-lg font-bold text-white">رفع الوثائق</h2>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                يرجى رفع صورة واضحة لجواز السفر أو الهوية الوطنية لإكمال عملية التحقق من الهوية
              </p>

              {/* Passport Upload */}
              <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-[#dfba73]/50 transition-colors">
                <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <div className="text-sm text-white font-medium mb-1">جواز السفر</div>
                <div className="text-[10px] text-gray-500 mb-3">PNG, JPG حتى 10MB</div>
                {uploadedFiles.passport ? (
                  <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs">
                    <CheckCircle className="w-4 h-4" />
                    <span>تم الرفع بنجاح</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleFileUpload('passport')}
                    disabled={uploading}
                    className="px-4 py-2 bg-[#dfba73] hover:bg-[#cbba53] text-black text-xs font-bold rounded-lg transition-all touch-target"
                  >
                    {uploading ? 'جاري الرفع...' : 'رفع الملف'}
                  </button>
                )}
              </div>

              {/* ID Upload */}
              <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-[#dfba73]/50 transition-colors">
                <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <div className="text-sm text-white font-medium mb-1">الهوية الوطنية</div>
                <div className="text-[10px] text-gray-500 mb-3">PNG, JPG حتى 10MB</div>
                {uploadedFiles.id ? (
                  <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs">
                    <CheckCircle className="w-4 h-4" />
                    <span>تم الرفع بنجاح</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleFileUpload('id')}
                    disabled={uploading}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-all touch-target"
                  >
                    {uploading ? 'جاري الرفع...' : 'رفع الملف'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="glass-panel rounded-2xl space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <Clock className="w-5 h-5 text-[#dfba73]" />
                <h2 className="font-serif text-lg font-bold text-white">وقت الوصول</h2>
              </div>

              <div className="space-y-3">
                <label className="block text-xs text-gray-400">توقيت الوصول المتوقع</label>
                <select
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white text-sm focus:border-[#dfba73] focus:outline-none transition-all"
                >
                  <option value="">اختر الوقت</option>
                  <option value="12:00">12:00 ظهراً</option>
                  <option value="14:00">2:00 ظهراً</option>
                  <option value="16:00">4:00 عصراً</option>
                  <option value="18:00">6:00 مساءً</option>
                  <option value="20:00">8:00 مساءً</option>
                  <option value="22:00">10:00 مساءً</option>
                </select>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <input
                  type="checkbox"
                  id="lateArrival"
                  checked={lateArrival}
                  onChange={(e) => setLateArrival(e.target.checked)}
                  className="w-4 h-4 accent-[#dfba73]"
                />
                <label htmlFor="lateArrival" className="text-xs text-white cursor-pointer">
                  سأصل بعد 10:00 مساءً (الوصول المتأخر)
                </label>
              </div>

              {lateArrival && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="text-[10px] text-amber-300 leading-relaxed">
                      في حال الوصول المتأخر، يرجى التواصل مع الاستقبال على الرقم {guestPhone} لضمان استقبالك.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="glass-panel rounded-2xl space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <Bed className="w-5 h-5 text-[#dfba73]" />
                <h2 className="font-serif text-lg font-bold text-white">تفضيلات الغرفة</h2>
              </div>

              <div className="space-y-3">
                <label className="block text-xs text-gray-400">الطابق المفضل</label>
                <select
                  value={preferences.floor}
                  onChange={(e) => setPreferences({ ...preferences, floor: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white text-sm focus:border-[#dfba73] focus:outline-none transition-all"
                >
                  <option value="">لا تفضيلات</option>
                  <option value="high">طوابق عليا (إطلالة أفضل)</option>
                  <option value="low">طوابق سفلية (سهولة الوصول)</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="block text-xs text-gray-400">نوع الإطلالة</label>
                <select
                  value={preferences.view}
                  onChange={(e) => setPreferences({ ...preferences, view: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white text-sm focus:border-[#dfba73] focus:outline-none transition-all"
                >
                  <option value="">لا تفضيلات</option>
                  <option value="city">إطلالة على المدينة</option>
                  <option value="garden">إطلالة على الحديقة</option>
                  <option value="pool">إطلالة على المسبح</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="block text-xs text-gray-400">نوع الوسائد</label>
                <select
                  value={preferences.pillows}
                  onChange={(e) => setPreferences({ ...preferences, pillows: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white text-sm focus:border-[#dfba73] focus:outline-none transition-all"
                >
                  <option value="">لا تفضيلات</option>
                  <option value="soft">وسائد ناعمة</option>
                  <option value="medium">وسائد متوسطة</option>
                  <option value="firm">وسائد صلبة</option>
                </select>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <input
                  type="checkbox"
                  id="smoking"
                  checked={preferences.smoking}
                  onChange={(e) => setPreferences({ ...preferences, smoking: e.target.checked })}
                  className="w-4 h-4 accent-[#dfba73]"
                />
                <label htmlFor="smoking" className="text-xs text-white cursor-pointer">
                  غرفة للمدخنين
                </label>
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="glass-panel rounded-2xl space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <CreditCard className="w-5 h-5 text-[#dfba73]" />
                <h2 className="font-serif text-lg font-bold text-white">طرق الدفع</h2>
              </div>

              <div className="bg-[#dfba73]/10 border border-[#dfba73]/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm text-white font-bold">حفظ بطاقة الدفع</div>
                    <div className="text-[10px] text-gray-400">للمصاريف الإضافية أثناء الإقامة</div>
                  </div>
                  {cardSaved ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <button
                      onClick={() => setCardSaved(true)}
                      className="px-3 py-1 bg-[#dfba73] text-black text-xs font-bold rounded-lg touch-target"
                    >
                      إضافة
                    </button>
                  )}
                </div>
                {cardSaved && (
                  <div className="text-[10px] text-gray-400">
                    سيتم استخدام البطاقة المحفوظة للمدفوعات الإضافية
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Shield className="w-4 h-4 text-[#dfba73]" />
                  <span>جميع المعاملات مشفرة وآمنة</span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <Shield className="w-5 h-5 text-[#dfba73]" />
                <h2 className="font-serif text-lg font-bold text-white">الموافقة على السياسات</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="policies"
                    checked={policiesAccepted}
                    onChange={(e) => setPoliciesAccepted(e.target.checked)}
                    className="w-4 h-4 accent-[#dfba73] mt-0.5"
                  />
                  <label htmlFor="policies" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                    أوافق على سياسات الفندق وقواعد الإقامة وشروط الإلغاء
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="signature"
                    checked={signature}
                    onChange={(e) => setSignature(e.target.checked)}
                    className="w-4 h-4 accent-[#dfba73] mt-0.5"
                  />
                  <label htmlFor="signature" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                    أوافق على التوقيع الإلكتروني للمستندات الرقمية
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="glass-panel rounded-2xl space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <CheckCircle className="w-5 h-5 text-[#dfba73]" />
                <h2 className="font-serif text-lg font-bold text-white">مراجعة التسجيل</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-xs text-white">{guestName} {guestLastName}</div>
                    <div className="text-[10px] text-gray-500">الضيف</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Bed className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-xs text-white">الجناح {roomNumber}</div>
                    <div className="text-[10px] text-gray-500">{roomType}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-xs text-white">{checkInDate} - {checkOutDate}</div>
                    <div className="text-[10px] text-gray-500">تواريخ الإقامة</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-xs text-white">{arrivalTime || 'لم يحدد'}</div>
                    <div className="text-[10px] text-gray-500">وقت الوصول</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-xs text-white">{hotelDetails.name}</div>
                    <div className="text-[10px] text-gray-500">موقع الفندق</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Wifi className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-xs text-white">AmanRoyal_Guest</div>
                    <div className="text-[10px] text-gray-500">شبكة الواي فاي</div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs">
                  <CheckCircle className="w-4 h-4" />
                  <span>جميع الوثائق مرفوعة والمعلومات مكتملة</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        {step > 1 && (
          <button onClick={prevStep} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-all touch-target">
                السابق
          </button>
        )}
        {step < 5 ? (
          <button
            onClick={nextStep}
            disabled={step === 1 && (!uploadedFiles.passport || !uploadedFiles.id)}
            className="flex-1 py-3 bg-[#dfba73] hover:bg-[#cbba53] text-black text-xs font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-target"
          >
            التالي
          </button>
        ) : (
          <button
            onClick={handleCompleteCheckIn}
            disabled={!policiesAccepted || !signature}
            className="flex-1 py-3 bg-[#dfba73] hover:bg-[#cbba53] text-black text-xs font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-target"
          >
            إكمال تسجيل الدخول
          </button>
        )}
      </div>
    </div>
  );
}
