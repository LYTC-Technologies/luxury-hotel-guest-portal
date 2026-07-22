/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Shirt, Utensils, Sparkles, Coffee, Heart, Car, Wrench, MessageSquare,
  CreditCard, Compass, Percent, ThumbsUp, HelpCircle, PhoneCall, Sun,
  MapPin, Calendar, KeyRound, Clock, Bell, Crown, Bed, LogIn, LogOut,
  Building2, Bot, Wallet, Star, Route, BookOpen, ShoppingBag
} from 'lucide-react';
import { Guest } from '../types';
import { hotelDetails, hotelAnnouncements, todayEvents } from '../data';

interface DashboardProps {
  guest: Guest;
  onNavigateToService: (serviceId: string) => void;
  onEmergencyCall: () => void;
}

export default function Dashboard({ guest, onNavigateToService, onEmergencyCall }: DashboardProps) {
  const [localTime, setLocalTime] = useState('');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });

  const nights = Math.ceil(
    (new Date(guest.checkOutDate).getTime() - new Date(guest.checkInDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      const diff = new Date(guest.checkOutDate + 'T12:00:00').getTime() - Date.now();
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        });
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [guest.checkOutDate]);

  const quickActions = [
    { id: 'room_service', label: 'طلب طعام', icon: Utensils },
    { id: 'my_room', label: 'تحكم بالغرفة', icon: Bed },
    { id: 'spa', label: 'حجز سبا', icon: Heart },
    { id: 'bills', label: 'الفواتير', icon: CreditCard },
    { id: 'reception', label: 'الاستقبال', icon: MessageSquare },
    { id: 'taxi', label: 'طلب سيارة', icon: Car },
  ];

  const gridServices = [
    { id: 'requests', title: 'طلبات', desc: 'تتبع طلباتك من المطعم والخدمات.', icon: ShoppingBag, color: 'from-amber-500/20 to-[#dfba73]/10', border: 'hover:border-[#dfba73]/50' },
    { id: 'special-orders', title: 'طلبات خاصة', desc: 'خدمات مميزة وعروض حصرية.', icon: Sparkles, color: 'from-purple-500/20 to-pink-500/10', border: 'hover:border-purple-500/50' },
    { id: 'bills', title: 'الفواتير والمدفوعات', desc: 'استعراض الحساب والدفع الفوري الآمن.', icon: CreditCard, color: 'from-blue-500/10 to-[#dfba73]/10', border: 'hover:border-blue-500/30' },
    { id: 'offers', title: 'العروض والمزايا', desc: 'ترقيات مجانية وكوبونات خصم.', icon: Percent, color: 'from-[#dfba73]/10 to-yellow-500/10', border: 'hover:border-[#dfba73]/30' },
    { id: 'reviews', title: 'التقييمات', desc: 'قيّم إقامتك وشارك تجربتك.', icon: Star, color: 'from-amber-500/10 to-yellow-500/10', border: 'hover:border-amber-500/30' },
  ];

  return (
    <div className="page-container space-y-6 font-sans text-right">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="شعار الفندق" className="h-12 w-12 rounded-full object-cover border-2 border-[#dfba73]/30" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div>
            <div className="text-[#dfba73] text-xs font-semibold tracking-widest mb-0.5">مرحباً بك</div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">ضيفنا</h1>
          </div>
        </div>
        <div className="flex gap-3 self-end sm:self-center">
          <div className="glass-panel-light rounded-2xl flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] text-gray-500">التوقيت المحلي</div>
              <div className="text-sm font-bold text-white font-mono">{localTime}</div>
            </div>
            <Clock className="w-5 h-5 text-[#dfba73]" />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div>
        <h3 className="font-serif text-lg font-bold text-white flex items-center justify-end gap-2 mb-1">
          <span>الخدمات والطلبات</span>
          <div className="w-1.5 h-1.5 bg-[#dfba73] rounded-full gold-border-glow" />
        </h3>
        <p className="text-xs text-gray-500 mb-4">تصفّح واطلب خدمات الجناح مع تتبع الحالة فورياً</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" id="services-grid">
          {gridServices.map((service, index) => {
            const IconComp = service.icon;
            return (
              <motion.button key={service.id} id={`service-card-${service.id}`}
                onClick={() => onNavigateToService(service.id)}
                whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02, duration: 0.4 }}
                className={`glass-panel rounded-2xl flex flex-col justify-between text-right cursor-pointer group transition-all border-white/5 ${service.border} touch-target`}>
                <div className="flex justify-between items-start w-full mb-3">
                  <span className="text-xs text-gray-600 group-hover:text-[#dfba73] transition-colors">←</span>
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${service.color} group-hover:scale-110 transition-transform`}>
                    <IconComp className="w-4 h-4 text-[#dfba73]" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#dfba73] transition-colors">{service.title}</h4>
                  <p className="text-[10px] text-gray-500 mt-1 leading-relaxed line-clamp-2">{service.desc}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="text-center pt-4 text-gray-600 select-none">
        <div className="text-sm font-serif tracking-[0.2em] mb-1">{hotelDetails.name}</div>
        <div className="text-[9px] tracking-widest text-[#dfba73]/40">الرفاهية في أبهى صورها</div>
      </div>
    </div>
  );
}
