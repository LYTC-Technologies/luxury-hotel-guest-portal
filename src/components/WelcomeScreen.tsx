/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Sparkles, Star, ArrowRight, 
  ChevronLeft, Hotel, Crown, Sparkles as SparklesIcon
} from 'lucide-react';
import { Guest } from '../types';

interface WelcomeScreenProps {
  guest: Guest;
  onNavigate: (page: string) => void;
}

export default function WelcomeScreen({ guest, onNavigate }: WelcomeScreenProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const cards = [
    {
      id: 'orders',
      title: 'طلباتي',
      subtitle: 'تتبع طلباتك من المطعم والخدمات',
      icon: ShoppingBag,
      color: 'from-amber-500/20 to-[#dfba73]/10',
      borderColor: 'hover:border-[#dfba73]/50',
      iconBg: 'bg-amber-500/10',
      delay: 0.1
    },
    {
      id: 'special-orders',
      title: 'طلبات خاصة',
      subtitle: 'خدمات مميزة وعروض حصرية',
      icon: Sparkles,
      color: 'from-purple-500/20 to-pink-500/10',
      borderColor: 'hover:border-purple-500/50',
      iconBg: 'bg-purple-500/10',
      delay: 0.2
    },
    {
      id: 'reviews',
      title: 'تقييمك',
      subtitle: 'شاركنا رأيك في تجربتك',
      icon: Star,
      color: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'hover:border-emerald-500/50',
      iconBg: 'bg-emerald-500/10',
      delay: 0.3
    }
  ];

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId);
    setTimeout(() => {
      if (cardId === 'orders') {
        onNavigate('requests');
      } else if (cardId === 'special-orders') {
        onNavigate('services');
      } else if (cardId === 'reviews') {
        onNavigate('reviews');
      }
    }, 300);
  };

  const handleBack = () => {
    setSelectedCard(null);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-[#dfba73]/5 via-transparent to-purple-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tl from-blue-500/5 via-transparent to-[#dfba73]/5 rounded-full blur-3xl"
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#dfba73]/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {!selectedCard ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md space-y-8"
            >
              {/* Welcome Message */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center space-y-4"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="inline-block"
                >
                  <Hotel className="w-16 h-16 text-[#dfba73] mx-auto mb-4" />
                </motion.div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white gold-text-glow">
                  أهلاً بك
                </h1>
                <p className="text-xl text-[#dfba73] font-semibold">
                  {guest.name} {guest.lastName}
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-0.5 bg-gradient-to-r from-transparent via-[#dfba73] to-transparent mx-auto"
                />
                <p className="text-sm text-gray-400">
                  في فندقنا الفاخر • الغرفة {guest.roomNumber}
                </p>
              </motion.div>

              {/* Action Cards */}
              <div className="space-y-4">
                {cards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <motion.button
                      key={card.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: card.delay, duration: 0.5 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCardClick(card.id)}
                      className="w-full glass-panel rounded-2xl p-6 text-right border border-white/10 transition-all group touch-target"
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`p-4 rounded-xl ${card.iconBg} group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="w-6 h-6 text-[#dfba73]" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-serif text-lg font-bold text-white mb-1">
                            {card.title}
                          </h3>
                          <p className="text-xs text-gray-400">
                            {card.subtitle}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Crown Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dfba73]/10 border border-[#dfba73]/30">
                  <Crown className="w-4 h-4 text-[#dfba73]" />
                  <span className="text-xs text-[#dfba73] font-semibold">
                    تجربة VIP
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="selected"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full max-w-md"
            >
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 touch-target"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">رجوع</span>
              </motion.button>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="glass-panel rounded-2xl p-8 text-center border border-[#dfba73]/30"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block p-6 rounded-full bg-[#dfba73]/10 mb-6"
                >
                  <SparklesIcon className="w-12 h-12 text-[#dfba73]" />
                </motion.div>
                <h2 className="font-serif text-2xl font-bold text-white mb-2">
                  جاري التحميل...
                </h2>
                <p className="text-sm text-gray-400">
                  نجهز لك أفضل تجربة
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
