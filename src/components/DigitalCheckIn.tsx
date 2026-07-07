/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload, FileCheck, Pen, Shield, Clock, CreditCard, Bed,
  CheckCircle2, Camera, AlertTriangle
} from 'lucide-react';
import { Guest } from '../types';
import { hotelPolicies } from '../data';
import ServiceHeader from './ServiceHeader';

interface DigitalCheckInProps {
  guest: Guest;
  onBack: () => void;
}

type Step = 'passport' | 'id' | 'verify' | 'signature' | 'policies' | 'arrival' | 'payment' | 'preferences' | 'complete';

export default function DigitalCheckIn({ guest, onBack }: DigitalCheckInProps) {
  const [currentStep, setCurrentStep] = useState<Step>('passport');
  const [passportUploaded, setPassportUploaded] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);
  const [verified, setVerified] = useState(false);
  const [signed, setSigned] = useState(false);
  const [policiesAccepted, setPoliciesAccepted] = useState<boolean[]>(hotelPolicies.map(() => false));
  const [arrivalTime, setArrivalTime] = useState('14:00');
  const [lateArrival, setLateArrival] = useState(false);
  const [cardSaved, setCardSaved] = useState(false);
  const [preferences, setPreferences] = useState({ floor: 'عالي', view: 'حديقة', pillow: 'ناعمة', temp: '22' });

  const steps: { id: Step; label: string; icon: typeof Upload }[] = [
    { id: 'passport', label: 'جواز السفر', icon: Upload },
    { id: 'id', label: 'الهوية', icon: Camera },
    { id: 'verify', label: 'التحقق', icon: FileCheck },
    { id: 'signature', label: 'التوقيع', icon: Pen },
    { id: 'policies', label: 'السياسات', icon: Shield },
    { id: 'arrival', label: 'وقت الوصول', icon: Clock },
    { id: 'payment', label: 'بطاقة الدفع', icon: CreditCard },
    { id: 'preferences', label: 'تفضيلات الغرفة', icon: Bed },
  ];

  const stepIndex = steps.findIndex((s) => s.id === currentStep);
  const allPoliciesAccepted = policiesAccepted.every(Boolean);

  const handleUpload = (type: 'passport' | 'id') => {
    if (type === 'passport') { setPassportUploaded(true); setCurrentStep('id'); }
    else { setIdUploaded(true); setCurrentStep('verify'); }
  };

  const handleNext = () => {
    const next = steps[stepIndex + 1];
    if (next) setCurrentStep(next.id);
    else setCurrentStep('complete');
  };

  return (
    <div className="page-container space-y-6 text-right font-sans">
      <ServiceHeader title="تسجيل الدخول الرقمي" subtitle="أكمل الخطوات لتسريع استقبالك" onBack={onBack} />

      {/* Progress */}
      <div className="glass-panel rounded-2xl">
        <div className="flex justify-between text-[10px] text-gray-500 mb-2">
          <span>{stepIndex + 1} / {steps.length}</span>
          <span>التقدم</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-[#dfba73] transition-all duration-500" style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }} />
        </div>
        <div className="flex flex-wrap gap-2 mt-3 justify-end">
          {steps.map((s, i) => (
            <span key={s.id} className={`text-[9px] px-2 py-0.5 rounded-full ${i <= stepIndex ? 'bg-[#dfba73]/20 text-[#dfba73]' : 'bg-white/5 text-gray-600'}`}>
              {s.label}
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 'complete' ? (
          <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel-gold rounded-2xl text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
            <h2 className="font-serif text-xl font-bold text-[#dfba73]">اكتمل تسجيل الدخول الرقمي</h2>
            <p className="text-xs text-gray-400">مرحباً {guest.name}، جناحك {guest.roomNumber} جاهز. مفتاحك الرقمي مفعّل.</p>
          </motion.div>
        ) : (
          <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-panel rounded-2xl space-y-4">

            {currentStep === 'passport' && (
              <>
                <h3 className="font-serif text-sm font-bold text-white">رفع جواز السفر</h3>
                <button onClick={() => handleUpload('passport')} className="w-full border-2 border-dashed border-[#dfba73]/30 rounded-2xl p-8 hover:border-[#dfba73]/60 transition-colors touch-target">
                  {passportUploaded ? <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" /> : <Upload className="w-10 h-10 text-[#dfba73] mx-auto" />}
                  <p className="text-xs text-gray-400 mt-2">{passportUploaded ? 'تم رفع جواز السفر بنجاح' : 'اضغط لرفع صورة جواز السفر'}</p>
                </button>
              </>
            )}

            {currentStep === 'id' && (
              <>
                <h3 className="font-serif text-sm font-bold text-white">رفع الهوية الوطنية</h3>
                <button onClick={() => handleUpload('id')} className="w-full border-2 border-dashed border-[#dfba73]/30 rounded-2xl p-8 hover:border-[#dfba73]/60 transition-colors touch-target">
                  {idUploaded ? <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" /> : <Camera className="w-10 h-10 text-[#dfba73] mx-auto" />}
                  <p className="text-xs text-gray-400 mt-2">{idUploaded ? 'تم رفع الهوية بنجاح' : 'اضغط لالتقاط أو رفع صورة الهوية'}</p>
                </button>
              </>
            )}

            {currentStep === 'verify' && (
              <>
                <h3 className="font-serif text-sm font-bold text-white">التحقق من الهوية</h3>
                <div className="bg-black/30 rounded-xl p-4 space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-white">{guest.name} {guest.lastName}</span><span className="text-gray-500">الاسم</span></div>
                  <div className="flex justify-between"><span className="text-white font-mono">{guest.reservationNumber}</span><span className="text-gray-500">رقم الحجز</span></div>
                </div>
                <button onClick={() => { setVerified(true); handleNext(); }} className="w-full py-3 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-xs text-black font-bold rounded-xl touch-target">
                  {verified ? 'تم التحقق ✓' : 'تأكيد التحقق من الهوية'}
                </button>
              </>
            )}

            {currentStep === 'signature' && (
              <>
                <h3 className="font-serif text-sm font-bold text-white">التوقيع الإلكتروني</h3>
                <div className="bg-black/40 border border-white/10 rounded-xl h-32 flex items-center justify-center">
                  {signed ? <span className="font-serif text-2xl text-[#dfba73] italic">{guest.name}</span> : <Pen className="w-8 h-8 text-gray-600" />}
                </div>
                <button onClick={() => { setSigned(true); handleNext(); }} className="w-full py-3 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-xs text-black font-bold rounded-xl touch-target">
                  {signed ? 'تم التوقيع ✓' : 'اضغط للتوقيع'}
                </button>
              </>
            )}

            {currentStep === 'policies' && (
              <>
                <h3 className="font-serif text-sm font-bold text-white">الموافقة على سياسات الفندق</h3>
                <div className="space-y-2">
                  {hotelPolicies.map((policy, i) => (
                    <label key={i} className="flex items-center justify-between gap-3 bg-black/20 rounded-xl p-3 cursor-pointer">
                      <input type="checkbox" checked={policiesAccepted[i]} onChange={() => {
                        const next = [...policiesAccepted]; next[i] = !next[i]; setPoliciesAccepted(next);
                      }} className="accent-[#dfba73] w-4 h-4" />
                      <span className="text-xs text-gray-300">{policy}</span>
                    </label>
                  ))}
                </div>
                <button onClick={handleNext} disabled={!allPoliciesAccepted} className="w-full py-3 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-xs text-black font-bold rounded-xl disabled:opacity-50 touch-target">موافق ومتابعة</button>
              </>
            )}

            {currentStep === 'arrival' && (
              <>
                <h3 className="font-serif text-sm font-bold text-white">تحديد وقت الوصول</h3>
                <input type="time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} className="w-full bg-black/50 rounded-xl border border-white/10 px-4 py-3 text-white focus:border-[#dfba73] outline-none" />
                <label className="flex items-center justify-between gap-3 bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 cursor-pointer">
                  <input type="checkbox" checked={lateArrival} onChange={(e) => setLateArrival(e.target.checked)} className="accent-amber-500" />
                  <div className="text-right">
                    <span className="text-xs text-amber-400 font-bold flex items-center justify-end gap-1"><AlertTriangle className="w-3 h-3" /> إبلاغ عن وصول متأخر</span>
                    <span className="text-[10px] text-gray-500">سنحتفظ بحجزك حتى 11:00 مساءً</span>
                  </div>
                </label>
                <button onClick={handleNext} className="w-full py-3 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-xs text-black font-bold rounded-xl touch-target">تأكيد وقت الوصول</button>
              </>
            )}

            {currentStep === 'payment' && (
              <>
                <h3 className="font-serif text-sm font-bold text-white">حفظ بطاقة الدفع</h3>
                <div className="space-y-3">
                  <input placeholder="رقم البطاقة" className="w-full bg-black/50 rounded-xl border border-white/10 px-4 py-3 text-sm text-white focus:border-[#dfba73] outline-none font-mono" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="MM/YY" className="bg-black/50 rounded-xl border border-white/10 px-4 py-3 text-sm text-white focus:border-[#dfba73] outline-none font-mono" />
                    <input placeholder="CVV" className="bg-black/50 rounded-xl border border-white/10 px-4 py-3 text-sm text-white focus:border-[#dfba73] outline-none font-mono" />
                  </div>
                </div>
                <button onClick={() => { setCardSaved(true); handleNext(); }} className="w-full py-3 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-xs text-black font-bold rounded-xl touch-target">
                  {cardSaved ? 'تم حفظ البطاقة ✓' : 'حفظ البطاقة بأمان'}
                </button>
              </>
            )}

            {currentStep === 'preferences' && (
              <>
                <h3 className="font-serif text-sm font-bold text-white">تفضيلات الغرفة</h3>
                <div className="space-y-3">
                  {[
                    { key: 'floor', label: 'الطابق المفضل', options: ['أرضي', 'متوسط', 'عالي'] },
                    { key: 'view', label: 'الإطلالة', options: ['حديقة', 'مسبح', 'مدينة'] },
                    { key: 'pillow', label: 'نوع الوسادة', options: ['ناعمة', 'متوسطة', 'صلبة'] },
                  ].map((pref) => (
                    <div key={pref.key}>
                      <label className="text-[10px] text-gray-500">{pref.label}</label>
                      <select
                        value={preferences[pref.key as keyof typeof preferences]}
                        onChange={(e) => setPreferences({ ...preferences, [pref.key]: e.target.value })}
                        className="w-full mt-1 bg-black/50 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#dfba73] outline-none"
                      >
                        {pref.options.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  <div>
                    <label className="text-[10px] text-gray-500">درجة الحرارة المفضلة: {preferences.temp}°م</label>
                    <input type="range" min="18" max="26" value={preferences.temp} onChange={(e) => setPreferences({ ...preferences, temp: e.target.value })} className="w-full accent-[#dfba73] mt-1" />
                  </div>
                </div>
                <button onClick={() => setCurrentStep('complete')} className="w-full py-3 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-xs text-black font-bold rounded-xl touch-target">إتمام تسجيل الدخول</button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
