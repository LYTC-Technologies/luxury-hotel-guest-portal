/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
  key?: string;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#080808] z-50 flex flex-col items-center justify-center p-6 text-center select-none">
      {/* Background elegant slow floating gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[30%] w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(223,186,115,0.07)_0%,rgba(0,0,0,0)_70%)] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute -bottom-[40%] -right-[30%] w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.08)_0%,rgba(0,0,0,0)_70%)] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full">
        {/* Animated Hotel Emblem / Logo Crown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center w-24 h-24 mb-8"
        >
          {/* Rotating outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#dfba73]/30 animate-[spin_40s_linear_infinite]" />
          
          {/* Animated glow background */}
          <div className="absolute w-16 h-16 rounded-full bg-[#dfba73]/10 blur-xl animate-pulse" />
          
          {/* Emblem Icon */}
          <div className="relative select-none filter drop-shadow-[0_0_15px_rgba(223,186,115,0.4)]">
            <img src="/logo.jpg" alt="Hotel Logo" className="w-16 h-16 object-contain" />
          </div>
        </motion.div>

        {/* Hotel Name & Slogan */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-serif text-3xl font-bold tracking-wide text-[#dfba73] gold-text-glow mb-3 select-none"
        >
          بوابة الضيوف الملكية
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-xs tracking-[0.2em] uppercase font-sans text-gray-400 select-none mb-12"
        >
          ROYAL GUEST PORTAL
        </motion.p>

        {/* Premium Progress Bar */}
        <div className="relative w-64 h-[2px] bg-white/5 rounded-full overflow-hidden mb-4">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-transparent via-[#dfba73] to-[#dfba73] shadow-[0_0_10px_rgba(223,186,115,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading details in Arabic */}
        <div className="h-6">
          <AnimatePresence mode="wait">
            {progress < 40 && (
              <motion.p
                key="p1"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-gray-500 font-sans tracking-wide"
              >
                جاري الاتصال بالنظام الآمن للمنتجع...
              </motion.p>
            )}
            {progress >= 40 && progress < 80 && (
              <motion.p
                key="p2"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-[#dfba73]/80 font-sans tracking-wide"
              >
                تحميل الخدمات وتحديث قائمة خيارات الغرفة...
              </motion.p>
            )}
            {progress >= 80 && (
              <motion.p
                key="p3"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-gold-400 font-sans tracking-widest font-medium"
              >
                مرحباً بك في عالم من الرفاهية المطلقة ✨
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative Elegant Line Art */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-gray-600 font-serif tracking-[0.3em] uppercase">
        AMAN RESORTS & HOTELS
      </div>
    </div>
  );
}
