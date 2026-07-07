/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Crown, Gift, Star, TrendingUp } from 'lucide-react';
import { Guest } from '../types';
import { loyaltyTier } from '../data';
import ServiceHeader from './ServiceHeader';

interface LoyaltyProps {
  guest: Guest;
  onBack: () => void;
}

export default function Loyalty({ guest, onBack }: LoyaltyProps) {
  const progress = (loyaltyTier.points / (loyaltyTier.points + loyaltyTier.pointsToNext)) * 100;

  return (
    <div className="page-container space-y-6 text-right font-sans">
      <ServiceHeader title="برنامج الولاء" subtitle={loyaltyTier.name} onBack={onBack} />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="glass-panel-gold rounded-2xl text-center space-y-4">
        <Crown className="w-12 h-12 text-[#dfba73] mx-auto" />
        <div>
          <div className="text-3xl font-bold text-[#dfba73] font-mono">{guest.loyaltyPoints.toLocaleString('ar-SA')}</div>
          <div className="text-xs text-gray-400 mt-1">نقطة ولاء</div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] text-gray-500">
            <span>{loyaltyTier.nextTier}</span>
            <span>{loyaltyTier.pointsToNext.toLocaleString('ar-SA')} نقطة متبقية</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-l from-[#dfba73] to-[#cbba53] transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </motion.div>

      <div className="glass-panel rounded-2xl space-y-3">
        <h3 className="font-serif text-sm font-bold text-white flex items-center justify-end gap-2">
          <span>مزايا العضوية</span>
          <Gift className="w-4 h-4 text-[#dfba73]" />
        </h3>
        <div className="space-y-2">
          {loyaltyTier.benefits.map((benefit, i) => (
            <div key={i} className="flex items-center justify-end gap-2 text-xs text-gray-300 bg-black/20 rounded-xl p-3">
              <span>{benefit}</span>
              <Star className="w-3.5 h-3.5 text-[#dfba73] shrink-0" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="glass-panel rounded-xl text-center">
          <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white font-mono">+٥٠٠</div>
          <div className="text-[10px] text-gray-500">نقاط هذا الشهر</div>
        </div>
        <div className="glass-panel rounded-xl text-center">
          <Gift className="w-6 h-6 text-[#dfba73] mx-auto mb-2" />
          <div className="text-lg font-bold text-white font-mono">٣</div>
          <div className="text-[10px] text-gray-500">مكافآت مستبدلة</div>
        </div>
      </div>
    </div>
  );
}
