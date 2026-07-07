/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sampleGuest, hotelDetails } from '../data';
import { Guest } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (guest: Guest) => void;
  key?: string;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [roomNumber, setRoomNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [reservationNumber, setReservationNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomNumber.trim() || !lastName.trim() || !reservationNumber.trim()) {
      setError('يرجى ملء جميع الحقول المطلوبة للمتابعة.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate luxury authentication latency
    setTimeout(() => {
      setLoading(false);
      // We accept the exact sample guest or any input for demo convenience (but prefill or validate gracefully)
      const cleanRoom = roomNumber.trim();
      const cleanLast = lastName.trim();
      const cleanRes = reservationNumber.trim();

      // If user inputs anything, log them in as a Guest using their name or standard guest
      const guestObj: Guest = {
        ...sampleGuest,
        name: cleanLast === sampleGuest.lastName ? sampleGuest.name : 'الضيف الكريم',
        lastName: cleanLast,
        roomNumber: cleanRoom,
        reservationNumber: cleanRes,
      };

      onLoginSuccess(guestObj);
    }, 1500);
  };

  const handleAutoFill = () => {
    setRoomNumber(sampleGuest.roomNumber);
    setLastName(sampleGuest.lastName);
    setReservationNumber(sampleGuest.reservationNumber);
    setError('');
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-luxury-bg overflow-hidden font-sans">
      {/* Background Image with Dark Vignette overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Hotel"
          className="w-full h-full object-cover scale-105 filter blur-[2px]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/90 via-[#080808]/75 to-[#080808]/95" />
      </div>

      {/* Floating ambient light spots */}
      <div className="absolute top-[20%] left-[15%] w-72 h-72 rounded-full bg-[#dfba73]/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-72 h-72 rounded-full bg-blue-900/10 blur-[80px] pointer-events-none" />

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg glass-panel p-8 sm:p-10 rounded-3xl shadow-2xl border-white/10"
        id="login-card"
      >
        {/* Card Header */}
        <div className="text-center mb-8">
          <div className="mb-4 animate-[bounce_3s_infinite] select-none" id="hotel-emblem">
            <img src="/logo.jpg" alt="Hotel Logo" className="w-20 h-20 rounded-full object-cover border-2 border-[#dfba73]/30 mx-auto" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#dfba73] gold-text-glow tracking-wide select-none">
            {hotelDetails.name}
          </h2>
          <p className="text-xs text-gray-400 mt-2 tracking-[0.25em] uppercase select-none">
            GUEST PORTAL • بوابة الضيوف
          </p>
          <div className="w-12 h-[1px] bg-[#dfba73]/30 mx-auto mt-4" />
        </div>

        {/* Demo Helper Button */}
        <div className="mb-6 text-center">
          <button
            type="button"
            onClick={handleAutoFill}
            className="text-[11px] text-[#dfba73]/80 hover:text-[#dfba73] border border-[#dfba73]/20 hover:border-[#dfba73]/50 bg-[#dfba73]/5 hover:bg-[#dfba73]/10 px-4 py-1.5 rounded-full transition-all duration-300 ease-out flex items-center gap-1.5 mx-auto font-sans"
            id="btn-autofill"
          >
            <span>✨</span>
            تعبئة تلقائية لبيانات الضيف التجريبية (تجربة سريعة)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" id="login-form">
          {/* Room Number Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-300 mr-1" htmlFor="roomNumber">
              رقم الغرفة أو الجناح <span className="text-[#dfba73]">*</span>
            </label>
            <input
              id="roomNumber"
              type="text"
              required
              placeholder="مثال: 702"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="w-full px-5 py-3.5 bg-black/50 hover:bg-black/70 focus:bg-black/80 rounded-xl border border-white/10 focus:border-[#dfba73] text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#dfba73] transition-all duration-300 text-right text-base font-sans"
            />
          </div>

          {/* Last Name Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-300 mr-1" htmlFor="lastName">
              اسم العائلة للنزيل <span className="text-[#dfba73]">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              required
              placeholder="مثال: آل سعود"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-5 py-3.5 bg-black/50 hover:bg-black/70 focus:bg-black/80 rounded-xl border border-white/10 focus:border-[#dfba73] text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#dfba73] transition-all duration-300 text-right text-base font-sans"
            />
          </div>

          {/* Reservation Number Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-300 mr-1" htmlFor="reservationNumber">
              رقم الحجز الفندقي <span className="text-[#dfba73]">*</span>
            </label>
            <input
              id="reservationNumber"
              type="text"
              required
              placeholder="مثال: RA-982341"
              value={reservationNumber}
              onChange={(e) => setReservationNumber(e.target.value)}
              className="w-full px-5 py-3.5 bg-black/50 hover:bg-black/70 focus:bg-black/80 rounded-xl border border-white/10 focus:border-[#dfba73] text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#dfba73] transition-all duration-300 text-right text-base font-sans font-mono"
            />
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-red-400 bg-red-950/30 border border-red-900/30 p-3 rounded-xl text-center"
              >
                ⚠️ {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="pt-2">
            <button
              id="btn-login"
              type="submit"
              disabled={loading}
              className="relative w-full py-4 rounded-xl bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] hover:from-[#dfba73] hover:to-[#cbba53] text-black font-bold text-base transition-all duration-500 hover:shadow-[0_0_20px_rgba(223,186,115,0.4)] active:scale-[0.98] focus:outline-none flex items-center justify-center cursor-pointer select-none"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>جاري التحقق من الهوية...</span>
                </div>
              ) : (
                <span>تسجيل الدخول الآمن</span>
              )}
            </button>
          </div>

          <div className="text-center pt-2">
            <button
              id="btn-forgot-reservation"
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-xs text-gray-400 hover:text-[#dfba73] transition-colors duration-200"
            >
              نسيت رقم الحجز الخاص بك؟
            </button>
          </div>
        </form>
      </motion.div>

      {/* Forgot Reservation Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForgotModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-md glass-panel p-6 sm:p-8 rounded-2xl shadow-2xl border-white/10 text-right"
              id="forgot-modal"
            >
              <h3 className="font-serif text-lg font-bold text-[#dfba73] mb-3">
                استرجاع رقم الحجز الفندقي
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                يسعدنا مساعدتك في استلام رقم الحجز الخاص بك. يرجى التواصل فوراً مع مركز خدمة الضيوف الملكي على الرقم التالي للحصول على الدعم الفوري:
              </p>
              
              <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-2 mb-5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#dfba73] font-mono select-all">{hotelDetails.phone}</span>
                  <span className="text-gray-400">رقم الهاتف المباشر:</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#dfba73] font-mono select-all">{hotelDetails.email}</span>
                  <span className="text-gray-400">البريد الإلكتروني:</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white transition-colors duration-200 cursor-pointer"
                id="btn-close-forgot"
              >
                إغلاق النافذة
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Luxury Footer details */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-600 text-center font-sans">
        نظام حماية الخصوصية الفندقية متصل ببروتوكولات الأمان الفدرالية ٢٠٢٦ © منتجع الأمان والريتز الملكي
      </div>
    </div>
  );
}
