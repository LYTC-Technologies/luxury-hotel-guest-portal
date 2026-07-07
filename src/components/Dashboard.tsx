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
  Building2, Bot, Wallet, Star, Route, BookOpen
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
    { id: 'reservation', title: 'حجزي', desc: 'تفاصيل الحجز والفاتورة والتسلسل الزمني.', icon: Calendar, color: 'from-blue-500/10 to-[#dfba73]/10', border: 'hover:border-blue-500/30' },
    { id: 'check_in', title: 'تسجيل الدخول', desc: 'تسجيل دخول رقمي سريع برفع الوثائق والتوقيع.', icon: LogIn, color: 'from-emerald-500/10 to-teal-500/10', border: 'hover:border-emerald-500/30' },
    { id: 'check_out', title: 'تسجيل المغادرة', desc: 'مراجعة الفاتورة والتقييم وطلب نقل المطار.', icon: LogOut, color: 'from-rose-500/10 to-red-500/10', border: 'hover:border-rose-500/30' },
    { id: 'my_room', title: 'غرفتي', desc: 'تحكم بالتكييف والإضاءة والتلفزيون والميني بار.', icon: Bed, color: 'from-indigo-500/10 to-purple-500/10', border: 'hover:border-indigo-500/30' },
    { id: 'room_service', title: 'خدمة الغرف', desc: 'قائمة الأطعمة الفاخرة والمشروبات على مدار ٢٤ ساعة.', icon: Utensils, color: 'from-amber-500/10 to-[#dfba73]/10', border: 'hover:border-[#dfba73]/40' },
    { id: 'spa', title: 'السبا الملكي', desc: 'حمام مغربي أصيل وعلاجات طبيعية مريحة.', icon: Heart, color: 'from-pink-500/10 to-[#dfba73]/10', border: 'hover:border-pink-500/30' },
    { id: 'restaurant', title: 'حجز المطاعم', desc: 'طاولات مميزة وأطباق من أمهر الطهاة الدوليين.', icon: Coffee, color: 'from-amber-600/10 to-orange-500/10', border: 'hover:border-amber-500/30' },
    { id: 'facilities', title: 'مرافق الفندق', desc: 'المسبح والنادي الرياضي والسينما وقاعات الاجتماعات.', icon: Building2, color: 'from-cyan-500/10 to-blue-500/10', border: 'hover:border-cyan-500/30' },
    { id: 'laundry', title: 'غسيل الملابس', desc: 'كي وغسيل جاف مستعجل للبشوت والملابس الحريرية.', icon: Shirt, color: 'from-blue-500/10 to-cyan-500/10', border: 'hover:border-cyan-500/30' },
    { id: 'housekeeping', title: 'تنظيف الغرفة', desc: 'تجهيز السرير ومناشف ووسائد حريرية فاخرة.', icon: Sparkles, color: 'from-emerald-500/10 to-teal-500/10', border: 'hover:border-emerald-500/30' },
    { id: 'concierge', title: 'الكونسيرج', desc: 'نقل ومطاعم وجولات سياحية ومساعدة طبية.', icon: Compass, color: 'from-violet-500/10 to-purple-500/10', border: 'hover:border-violet-500/30' },
    { id: 'taxi', title: 'طلب سيارة', desc: 'أسطول ليموزين فاخرة للتوصيل.', icon: Car, color: 'from-indigo-500/10 to-purple-500/10', border: 'hover:border-indigo-500/30' },
    { id: 'maintenance', title: 'خدمات الصيانة', desc: 'إصلاح التكييف والتلفاز ومشكلات السباكة.', icon: Wrench, color: 'from-yellow-600/10 to-amber-500/10', border: 'hover:border-yellow-500/30' },
    { id: 'reception', title: 'دردشة الاستقبال', desc: 'تواصل فوري مع موظفي الخدمة والاستقبال.', icon: MessageSquare, color: 'from-[#dfba73]/15 to-blue-900/10', border: 'hover:border-[#dfba73]/40' },
    { id: 'bills', title: 'الفواتير والمدفوعات', desc: 'استعراض الحساب والدفع الفوري الآمن.', icon: CreditCard, color: 'from-blue-500/10 to-[#dfba73]/10', border: 'hover:border-blue-500/30' },
    { id: 'activities', title: 'الأنشطة والرحلات', desc: 'رحلات الدرعية وسفاري الكثبان ومخيمات الصحراء.', icon: Route, color: 'from-rose-500/10 to-amber-500/10', border: 'hover:border-rose-500/30' },
    { id: 'offers', title: 'العروض والمزايا', desc: 'ترقيات مجانية وكوبونات خصم.', icon: Percent, color: 'from-[#dfba73]/10 to-yellow-500/10', border: 'hover:border-[#dfba73]/30' },
    { id: 'loyalty', title: 'برنامج الولاء', desc: 'نقاطك ومزايا العضوية الذهبية.', icon: Crown, color: 'from-yellow-500/10 to-amber-500/10', border: 'hover:border-yellow-500/30' },
    { id: 'wallet', title: 'المحفظة الرقمية', desc: 'إدارة مدفوعاتك وسجل المعاملات.', icon: Wallet, color: 'from-green-500/10 to-emerald-500/10', border: 'hover:border-green-500/30' },
    { id: 'stay_timeline', title: 'خط زمني الإقامة', desc: 'رحلتك الكاملة في المنتجع.', icon: Clock, color: 'from-gray-500/10 to-blue-500/10', border: 'hover:border-gray-500/30' },
    { id: 'reviews', title: 'التقييمات', desc: 'قيّم إقامتك وشارك تجربتك.', icon: Star, color: 'from-amber-500/10 to-yellow-500/10', border: 'hover:border-amber-500/30' },
    { id: 'faq', title: 'الملف الشخصي', desc: 'إعداداتك والأسئلة الشائعة.', icon: ThumbsUp, color: 'from-gray-500/10 to-blue-500/10', border: 'hover:border-gray-500/30' },
  ];

  return (
    <div className="page-container space-y-6 font-sans text-right">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="شعار الفندق" className="h-12 w-12 rounded-full object-cover border-2 border-[#dfba73]/30" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div>
            <div className="text-[#dfba73] text-xs font-semibold tracking-widest mb-0.5">مرحباً بك</div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">{guest.name}</h1>
            <div className="flex items-center justify-end gap-1 text-[11px] text-gray-400 mt-0.5">
              <span>{hotelDetails.location}</span>
              <MapPin className="w-3 h-3 text-[#dfba73]" />
            </div>
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
          <div className="glass-panel-light rounded-2xl flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] text-gray-500">الطقس</div>
              <div className="text-sm font-bold text-white">٣٨°م</div>
              <div className="text-[9px] text-emerald-400">مشرق</div>
            </div>
            <Sun className="w-6 h-6 text-amber-400" style={{ animation: 'spin 30s linear infinite' }} />
          </div>
        </div>
      </div>

      {/* Guest Card */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-[#dfba73]/25 bg-gradient-to-br from-neutral-900/90 via-neutral-950/80 to-[#1e3a8a]/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        style={{ padding: '1.5rem' }}>
        <div className="absolute top-4 left-6 text-3xl opacity-20 select-none">👑</div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div>
              <div className="text-[10px] text-gray-400 uppercase mb-1">الضيف المكرّم</div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#dfba73] gold-text-glow">{guest.name} {guest.lastName}</h2>
              <p className="text-[11px] text-gray-500 mt-1">{guest.roomType}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/10">
              <div><div className="text-[10px] text-gray-500">تاريخ الدخول</div><div className="text-xs text-white font-mono mt-0.5">{guest.checkInDate}</div></div>
              <div><div className="text-[10px] text-gray-500">تاريخ المغادرة</div><div className="text-xs text-white font-mono mt-0.5">{guest.checkOutDate}</div></div>
              <div><div className="text-[10px] text-gray-500">عدد الليالي</div><div className="text-xs text-white font-bold mt-0.5">{nights} ليالٍ</div></div>
              <div><div className="text-[10px] text-gray-500">رقم الحجز</div><div className="text-[11px] text-gray-300 font-mono mt-0.5">{guest.reservationNumber}</div></div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3 lg:border-r lg:border-white/10 lg:pr-6">
            <div className="text-right">
              <div className="text-[10px] text-gray-400 uppercase mb-1">رقم الغرفة</div>
              <div className="flex items-center justify-end gap-2 text-2xl font-bold text-[#dfba73] font-mono">
                {guest.roomNumber}<KeyRound className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Countdown + Balance + Loyalty */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="glass-panel-gold rounded-2xl text-center">
          <div className="text-[10px] text-gray-400 mb-2">العد التنازلي للمغادرة</div>
          <div className="flex justify-center gap-3">
            {[{ v: countdown.days, l: 'يوم' }, { v: countdown.hours, l: 'ساعة' }, { v: countdown.minutes, l: 'دقيقة' }].map((c) => (
              <div key={c.l}><div className="text-xl font-bold text-[#dfba73] font-mono">{c.v}</div><div className="text-[9px] text-gray-500">{c.l}</div></div>
            ))}
          </div>
        </div>
        <button onClick={() => onNavigateToService('bills')} className="glass-panel rounded-2xl text-center hover:border-[#dfba73]/30 transition-all cursor-pointer touch-target">
          <CreditCard className="w-5 h-5 text-[#dfba73] mx-auto mb-1" />
          <div className="text-[10px] text-gray-400">الرصيد المستحق</div>
          <div className="text-lg font-bold text-white font-mono">{guest.balanceDue.toLocaleString('ar-SA')} ر.س</div>
        </button>
        <button onClick={() => onNavigateToService('loyalty')} className="glass-panel rounded-2xl text-center hover:border-[#dfba73]/30 transition-all cursor-pointer touch-target">
          <Crown className="w-5 h-5 text-[#dfba73] mx-auto mb-1" />
          <div className="text-[10px] text-gray-400">نقاط الولاء</div>
          <div className="text-lg font-bold text-[#dfba73] font-mono">{guest.loyaltyPoints.toLocaleString('ar-SA')}</div>
        </button>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-serif text-sm font-bold text-white mb-3 flex items-center justify-end gap-2">
          <span>الإجراءات السريعة</span>
          <div className="w-1.5 h-1.5 bg-[#dfba73] rounded-full" />
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {quickActions.map((action) => (
            <button key={action.id} onClick={() => onNavigateToService(action.id)}
              className="glass-panel rounded-xl flex flex-col items-center gap-1.5 hover:border-[#dfba73]/30 transition-all touch-target">
              <action.icon className="w-5 h-5 text-[#dfba73]" />
              <span className="text-[10px] text-gray-400">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Events + Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-panel rounded-2xl space-y-3">
          <h3 className="font-serif text-sm font-bold text-white flex items-center justify-end gap-2">
            <span>فعاليات اليوم</span><Calendar className="w-4 h-4 text-[#dfba73]" />
          </h3>
          {todayEvents.map((event) => (
            <div key={event.id} className="flex justify-between items-center bg-black/20 rounded-xl p-3 border border-white/5">
              <span className="text-[10px] text-[#dfba73] font-mono">{event.time}</span>
              <div className="text-right"><div className="text-xs text-white font-medium">{event.title}</div><div className="text-[10px] text-gray-500">{event.location}</div></div>
            </div>
          ))}
        </div>
        <div className="glass-panel rounded-2xl space-y-3">
          <h3 className="font-serif text-sm font-bold text-white flex items-center justify-end gap-2">
            <span>إعلانات الفندق</span><Bell className="w-4 h-4 text-[#dfba73]" />
          </h3>
          {hotelAnnouncements.map((ann) => (
            <div key={ann.id} className={`bg-black/20 rounded-xl p-3 border ${ann.priority === 'high' ? 'border-[#dfba73]/20' : 'border-white/5'}`}>
              <div className="text-xs font-bold text-white">{ann.title}</div>
              <p className="text-[11px] text-gray-500 mt-1">{ann.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency & FAQ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button onClick={() => onNavigateToService('faq')} className="glass-panel rounded-2xl flex items-center justify-between hover:border-[#dfba73]/30 transition-all cursor-pointer group touch-target">
          <HelpCircle className="w-6 h-6 text-blue-400" />
          <div className="text-right"><h4 className="text-sm font-bold text-white">الأسئلة الشائعة</h4><p className="text-[11px] text-gray-400">تفاصيل الخدمات والمواعيد</p></div>
        </button>
        <button onClick={onEmergencyCall} className="glass-panel rounded-2xl flex items-center justify-between border-red-500/20 hover:border-red-500/50 bg-red-950/5 cursor-pointer transition-all touch-target">
          <PhoneCall className="w-6 h-6 text-red-500" />
          <div className="text-right"><h4 className="text-sm font-bold text-red-400">اتصال الطوارئ</h4><p className="text-[11px] text-red-300/80">مساعدة طبية أو أمنية عاجلة</p></div>
        </button>
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
