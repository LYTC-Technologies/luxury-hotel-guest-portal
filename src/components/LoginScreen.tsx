/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { hotelDetails } from '../data';
import { Guest } from '../types';
import { useRoom } from '../contexts/RoomContext';

interface LoginScreenProps {
  onLoginSuccess: (guest: Guest) => void;
  key?: string;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [roomNumber, setRoomNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setRoomNumber: setContextRoomNumber } = useRoom();

  // Check for room number in URL parameter (Base64 encoded)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encryptedRoom = urlParams.get('room');

    if (encryptedRoom) {
      try {
        // Decode Base64
        const decodedRoom = atob(encryptedRoom);
        setRoomNumber(decodedRoom);

        // Auto-submit login after a short delay
        setTimeout(() => {
          handleLogin();
        }, 500);
      } catch (err) {
        setError('رمز الغرفة غير صحيح.');
      }
    }
  }, []);

  const handleLogin = async () => {
    if (!roomNumber.trim()) {
      setError('يرجى إدخال رقم الغرفة.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 500));

    // Create guest object with room number (mock data)
    const guest: Guest = {
      name: 'ضيف فندق',
      lastName: '',
      roomNumber: roomNumber,
      reservationNumber: `RA-${roomNumber}`,
      checkInDate: new Date().toISOString().split('T')[0],
      checkOutDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      hotelName: hotelDetails.name,
      roomType: 'جناح ملكي',
      bedType: 'King Size',
      guestCount: 2,
      childrenCount: 0,
      loyaltyPoints: 0,
      balanceDue: 0,
      paidAmount: 0,
      totalAmount: 0,
      taxes: 0,
      discounts: 0,
      promoCode: '',
      reservationStatus: 'مؤكد' as const,
      email: '',
      phone: '',
    };

    // Set room number in RoomContext
    setContextRoomNumber(roomNumber);

    // Save guest info in localStorage
    localStorage.setItem('guestInfo', JSON.stringify(guest));
    localStorage.setItem('roomNumber', roomNumber);

    onLoginSuccess(guest);
    setLoading(false);
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

        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-5" id="login-form">
          {/* Room Number Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-300 mr-1" htmlFor="roomNumber">
              رقم الغرفة <span className="text-[#dfba73]">*</span>
            </label>
            <input
              id="roomNumber"
              type="text"
              required
              placeholder="رقم الغرفة"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="w-full px-5 py-3.5 bg-black/50 hover:bg-black/70 focus:bg-black/80 rounded-xl border border-white/10 focus:border-[#dfba73] placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#dfba73] transition-all duration-300 text-right text-base font-sans"
              style={{ color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.5)' }}
            />
          </div>

          {/* Error Message */}
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
                  <span>جاري التحقق...</span>
                </div>
              ) : (
                <span>دخول</span>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Luxury Footer details */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-600 text-center font-sans">
        نظام حماية الخصوصية الفندقية متصل ببروتوكولات الأمان الفدرالية ٢٠٢٦ © منتجع الأمان والريتز الملكي
      </div>
    </div>
  );
}
