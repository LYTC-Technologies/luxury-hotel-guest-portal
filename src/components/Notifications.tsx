/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Bell, Info, ShieldAlert, Sparkles, CheckCheck, Trash2 } from 'lucide-react';
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
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="w-4 h-4 text-blue-400" />;
      case 'spa':
        return <Sparkles className="w-4 h-4 text-[#dfba73]" />;
      default:
        return <Bell className="w-4 h-4 text-emerald-400" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'info':
        return 'bg-blue-500/10 border-blue-500/20';
      case 'spa':
        return 'bg-[#dfba73]/10 border-[#dfba73]/20';
      default:
        return 'bg-emerald-500/10 border-emerald-500/20';
    }
  };

  return (
    <div className="pb-32 pt-6 px-4 max-w-2xl mx-auto space-y-6 text-right font-sans">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        {notifications.some(n => !n.read) && (
          <button
            onClick={onMarkAllRead}
            className="text-xs text-[#dfba73] hover:text-[#dfba73]/80 flex items-center gap-1.5 cursor-pointer font-semibold"
            id="btn-mark-all-read"
          >
            <span>تعيين الكل كمقروء</span>
            <CheckCheck className="w-4 h-4" />
          </button>
        )}

        <div className="text-right">
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">مركز التنبيهات والإشعارات</h1>
          <p className="text-xs text-gray-400 mt-0.5">تحديثات فورية بشأن طلبات الغرفة والمواعيد والفوترة</p>
        </div>
      </div>

      {/* Inbox list */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="glass-panel p-10 rounded-2xl text-center space-y-3 border-white/5">
            <div className="text-4xl">🔔</div>
            <h3 className="text-sm font-bold text-gray-400">صندوق الإشعارات فارغ</h3>
            <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
              لا توجد أي تنبيهات واردة جديدة لجناحك حالياً. سنقوم بإبلاغك هنا فور تجهيز طلباتك أو تحديث قائمة الفواتير.
            </p>
          </div>
        ) : (
          <div className="space-y-3" id="notifications-list">
            {notifications.map((notif, idx) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className={`glass-panel p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative overflow-hidden transition-all ${
                  notif.read ? 'border-white/5 bg-black/30 opacity-70' : 'border-[#dfba73]/20 bg-neutral-950 shadow-md'
                }`}
              >
                {/* Unread glow ring */}
                {!notif.read && (
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#dfba73]" />
                )}

                {/* Delete button */}
                <button
                  onClick={() => onClearNotification(notif.id)}
                  className="p-1 text-gray-600 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer self-end sm:self-start order-last sm:order-first"
                  id={`btn-clear-notif-${notif.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Info Text */}
                <div className="flex-1 text-right order-2 sm:order-none">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-[10px] text-gray-500 font-mono">{notif.time}</span>
                    <h4 className={`text-xs font-bold ${notif.read ? 'text-gray-400' : 'text-white'}`}>
                      {notif.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed font-sans">
                    {notif.message}
                  </p>
                </div>

                {/* Icon badge */}
                <div className={`p-2.5 rounded-xl border flex items-center justify-center self-end sm:self-start order-1 sm:order-none ${getBg(notif.type)}`}>
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
