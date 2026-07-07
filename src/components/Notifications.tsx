/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, Info, Sparkles, CheckCheck, Trash2, CreditCard, Percent } from 'lucide-react';
import { Notification } from '../types';

interface NotificationsProps {
  notifications: Notification[];
  onMarkAllRead: () => void;
  onClearNotification: (id: string) => void;
}

export default function Notifications({
  notifications,
  onMarkAllRead,
  onClearNotification
}: NotificationsProps) {
  const [filter, setFilter] = useState<'all' | Notification['type']>('all');

  const filtered = filter === 'all' ? notifications : notifications.filter((n) => n.type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case 'info': return <Info className="w-4 h-4 text-blue-400" />;
      case 'spa': return <Sparkles className="w-4 h-4 text-[#dfba73]" />;
      case 'billing': return <CreditCard className="w-4 h-4 text-amber-400" />;
      case 'promo': return <Percent className="w-4 h-4 text-purple-400" />;
      default: return <Bell className="w-4 h-4 text-emerald-400" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-500/10 border-blue-500/20';
      case 'spa': return 'bg-[#dfba73]/10 border-[#dfba73]/20';
      case 'billing': return 'bg-amber-500/10 border-amber-500/20';
      case 'promo': return 'bg-purple-500/10 border-purple-500/20';
      default: return 'bg-emerald-500/10 border-emerald-500/20';
    }
  };

  const filterLabels: Record<string, string> = {
    all: 'الكل', info: 'معلومات', order: 'طلبات', billing: 'فواتير', spa: 'سبا', promo: 'عروض', concierge: 'كونسيرج',
  };

  return (
    <div className="page-container space-y-6 text-right font-sans">
      <div className="flex justify-between items-center flex-wrap gap-3">
        {notifications.some((n) => !n.read) && (
          <button onClick={onMarkAllRead}
            className="text-xs text-[#dfba73] hover:text-[#dfba73]/80 flex items-center gap-1.5 cursor-pointer font-semibold touch-target"
            id="btn-mark-all-read">
            <span>تعيين الكل كمقروء</span>
            <CheckCheck className="w-4 h-4" />
          </button>
        )}
        <div className="text-right">
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">مركز التنبيهات والإشعارات</h1>
          <p className="text-xs text-gray-400 mt-0.5">{notifications.filter((n) => !n.read).length} إشعار غير مقروء</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-end">
        {Object.entries(filterLabels).map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key as typeof filter)}
            className={`px-3 py-1.5 rounded-full text-[11px] touch-target ${filter === key ? 'bg-[#dfba73]/20 text-[#dfba73]' : 'bg-white/5 text-gray-400'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="glass-panel rounded-2xl text-center space-y-3">
            <div className="text-4xl">🔔</div>
            <h3 className="text-sm font-bold text-gray-400">لا توجد إشعارات</h3>
            <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
              لا توجد تنبيهات في هذا التصنيف حالياً.
            </p>
          </div>
        ) : (
          <div className="space-y-3" id="notifications-list">
            {filtered.map((notif, idx) => (
              <motion.div key={notif.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
                className={`glass-panel rounded-2xl border flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative overflow-hidden transition-all ${
                  notif.read ? 'border-white/5 bg-black/30 opacity-70' : 'border-[#dfba73]/20 bg-neutral-950 shadow-md'
                }`}>
                {!notif.read && <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#dfba73]" />}
                <button onClick={() => onClearNotification(notif.id)}
                  className="p-2 text-gray-600 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer self-end sm:self-start touch-target"
                  id={`btn-clear-notif-${notif.id}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-[10px] text-gray-500 font-mono">{notif.time}</span>
                    <h4 className={`text-xs font-bold ${notif.read ? 'text-gray-400' : 'text-white'}`}>{notif.title}</h4>
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{notif.message}</p>
                </div>
                <div className={`p-2.5 rounded-xl border flex items-center justify-center shrink-0 ${getBg(notif.type)}`}>
                  {getIcon(notif.type)}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
