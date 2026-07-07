/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
import { stayTimeline } from '../data';
import ServiceHeader from './ServiceHeader';

interface StayTimelineProps {
  onBack: () => void;
}

export default function StayTimeline({ onBack }: StayTimelineProps) {
  return (
    <div className="page-container space-y-6 text-right font-sans">
      <ServiceHeader title="الخط الزمني للإقامة" subtitle="رحلتك في منتجع الأمان" onBack={onBack} />

      <div className="glass-panel rounded-2xl space-y-1">
        {stayTimeline.map((event, index) => (
          <motion.div key={event.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
            className="flex gap-4 items-start relative">
            {index < stayTimeline.length - 1 && (
              <div className={`absolute right-[11px] top-8 w-0.5 h-full ${
                event.status === 'completed' ? 'bg-[#dfba73]/30' : 'bg-white/5'
              }`} />
            )}
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs z-10 ${
              event.status === 'completed' ? 'bg-emerald-500/20 border border-emerald-500/40' :
              event.status === 'current' ? 'bg-[#dfba73]/20 border border-[#dfba73]/40 animate-pulse' :
              'bg-white/5 border border-white/10'
            }`}>{event.icon}</div>
            <div className="flex-1 pb-6">
              <div className="flex justify-between items-start gap-2">
                <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />{event.date} • {event.time}
                </span>
                <h4 className="text-xs font-bold text-white">{event.title}</h4>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">{event.description}</p>
              {event.status === 'current' && (
                <span className="inline-block mt-2 px-2 py-0.5 bg-[#dfba73]/10 text-[#dfba73] text-[9px] font-bold rounded-lg">جاري الآن</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
