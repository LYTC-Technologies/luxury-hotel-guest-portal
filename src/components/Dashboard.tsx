/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import {
  Shirt,
  Utensils,
  Sparkles,
  Coffee,
  Heart,
  Car,
  Wrench,
  MessageSquare,
  CreditCard,
  Compass,
  Percent,
  ThumbsUp,
  HelpCircle,
  PhoneCall,
  Sun,
  MapPin,
  Calendar,
  KeyRound
} from 'lucide-react';
import { Guest } from '../types';
import { hotelDetails } from '../data';

interface DashboardProps {
  guest: Guest;
  onNavigateToService: (serviceId: string) => void;
  onEmergencyCall: () => void;
}

export default function Dashboard({ guest, onNavigateToService, onEmergencyCall }: DashboardProps) {
  // Service grid cards in Arabic
  const gridServices = [
    {
      id: 'room_service',
      title: 'خدمة الغرف',
      desc: 'قائمة الأطعمة الفاخرة والمشروبات المجهزة على مدار ٢٤ ساعة.',
      icon: Utensils,
      color: 'from-amber-500/10 to-[#dfba73]/10',
      border: 'hover:border-[#dfba73]/40'
    },
    {
      id: 'spa',
      title: 'السبا الملكي',
      desc: 'حمام مغربي أصيل وعلاجات طبيعية مريحة للروح والجسد.',
      icon: Heart,
      color: 'from-pink-500/10 to-[#dfba73]/10',
      border: 'hover:border-pink-500/30'
    },
    {
      id: 'restaurant',
      title: 'حجز المطاعم',
      desc: 'طاولات مميزة وأطباق مبتكرة من أمهر الطهاة الدوليين.',
      icon: Coffee,
      color: 'from-amber-600/10 to-orange-500/10',
      border: 'hover:border-amber-500/30'
    },
    {
      id: 'laundry',
      title: 'غسيل الملابس',
      desc: 'كي وغسيل جاف مستعجل للبشوت والأثواب والملابس الحريرية.',
      icon: Shirt,
      color: 'from-blue-500/10 to-cyan-500/10',
      border: 'hover:border-cyan-500/30'
    },
    {
      id: 'housekeeping',
      title: 'تنظيف الغرفة',
      desc: 'تجهيز السرير وإضافة مناشف ووسائد حريرية فاخرة في أي وقت.',
      icon: Sparkles,
      color: 'from-emerald-500/10 to-teal-500/10',
      border: 'hover:border-emerald-500/30'
    },
    {
      id: 'taxi',
      title: 'طلب سيارة',
      desc: 'أسطول سيارات ليموزين فاخرة (مرسيدس، بينتلي، رولز رويس) للتوصيل.',
      icon: Car,
      color: 'from-indigo-500/10 to-purple-500/10',
      border: 'hover:border-indigo-500/30'
    },
    {
      id: 'maintenance',
      title: 'خدمات الصيانة',
      desc: 'إصلاح التكييف أو التلفاز أو مشكلات السباكة بدقة وسرعة فورية.',
      icon: Wrench,
      color: 'from-yellow-600/10 to-amber-500/10',
      border: 'hover:border-yellow-500/30'
    },
    {
      id: 'reception',
      title: 'دردشة الاستقبال',
      desc: 'تواصل فوري ومباشر مع موظفي الخدمة الخاصة والاستقبال.',
      icon: MessageSquare,
      color: 'from-[#dfba73]/15 to-blue-900/10',
      border: 'hover:border-[#dfba73]/40'
    },
    {
      id: 'bills',
      title: 'الفواتير والمدفوعات',
      desc: 'استعراض الحساب الإجمالي الحالي لخدمات الغرفة والدفع الفوري آمن.',
      icon: CreditCard,
      color: 'from-blue-500/10 to-[#dfba73]/10',
      border: 'hover:border-blue-500/30'
    },
    {
      id: 'activities',
      title: 'الأنشطة والرحلات',
      desc: 'رحلات الدرعية التاريخية وسفاري الكثبان ومخيمات الصحراء الخاصة.',
      icon: Compass,
      color: 'from-rose-500/10 to-amber-500/10',
      border: 'hover:border-rose-500/30'
    },
    {
      id: 'offers',
      title: 'العروض والمزايا',
      desc: 'ترقيات مجانية للغرف والفلل وكوبونات خصم لمطاعم المنتجع.',
      icon: Percent,
      color: 'from-[#dfba73]/10 to-yellow-500/10',
      border: 'hover:border-[#dfba73]/30'
    },
    {
      id: 'profile', // Switch to profile tab for feedback/support
      title: 'التقييم والشكاوى',
      desc: 'يسعدنا سماع رأيك لضمان تقديم أرقى مستويات الفخامة والراحة.',
      icon: ThumbsUp,
      color: 'from-gray-500/10 to-blue-500/10',
      border: 'hover:border-gray-500/30'
    }
  ];

  return (
    <div className="pb-32 pt-6 px-4 max-w-4xl mx-auto space-y-6 font-sans">
      
      {/* Premium Hotel Greeting & Location banner */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-right">
        <div>
          <div className="text-[#dfba73] text-xs font-semibold tracking-widest uppercase mb-1">
            مرحباً بك في
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-wide text-white select-none">
            {hotelDetails.name}
          </h1>
          <div className="flex items-center justify-end gap-1 text-xs text-gray-400 mt-1">
            <span>{hotelDetails.location}</span>
            <MapPin className="w-3.5 h-3.5 text-[#dfba73]" />
          </div>
        </div>

        {/* Dynamic Weather Widget */}
        <div className="glass-panel-light p-3.5 rounded-2xl flex items-center gap-4 border-white/5 self-end sm:self-center">
          <div className="text-right">
            <div className="text-xs text-gray-400">الطقس في الرياض</div>
            <div className="text-sm font-bold text-white mt-0.5">٣٨° مئوية</div>
            <div className="text-[10px] text-emerald-400">مشرق ورياح عليلة</div>
          </div>
          <div className="p-2.5 bg-amber-500/10 rounded-xl">
            <Sun className="w-6 h-6 text-amber-400 animate-spin" style={{ animationDuration: '30s' }} />
          </div>
        </div>
      </div>

      {/* Guest Card - Aman Resort Luxury Branding */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-[#dfba73]/25 bg-gradient-to-br from-neutral-900/90 via-neutral-950/80 to-[#1e3a8a]/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
      >
        {/* Decorative gold lines and rings */}
        <div className="absolute top-0 left-0 w-32 h-32 rounded-full border border-[#dfba73]/10 -translate-x-12 -translate-y-12 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full border border-[#dfba73]/5 translate-x-16 translate-y-16 pointer-events-none" />
        
        {/* Golden Royal Badge */}
        <div className="absolute top-4 left-6 text-3xl opacity-20 select-none">👑</div>

        <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-stretch gap-6">
          <div className="space-y-4 text-right flex-1">
            <div>
              <div className="text-[10px] text-gray-400 tracking-wider font-sans mb-1 uppercase">الضيف المكرّم</div>
              <h2 className="text-2xl font-serif font-bold text-[#dfba73] gold-text-glow">
                {guest.name} {guest.lastName}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
              <div>
                <div className="text-[10px] text-gray-500 font-sans">تاريخ الدخول</div>
                <div className="flex items-center justify-end gap-1.5 text-xs text-white font-medium mt-1">
                  <span className="font-mono">{guest.checkInDate}</span>
                  <Calendar className="w-3.5 h-3.5 text-[#dfba73]" />
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-sans">تاريخ المغادرة</div>
                <div className="flex items-center justify-end gap-1.5 text-xs text-white font-medium mt-1">
                  <span className="font-mono">{guest.checkOutDate}</span>
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between items-end gap-4 min-w-[140px] md:border-r md:border-white/10 md:pr-6">
            <div className="text-right">
              <div className="text-[10px] text-gray-400 tracking-wider uppercase mb-1">رقم الجناح الملوكي</div>
              <div className="flex items-center justify-end gap-2 text-xl font-bold text-white">
                <span className="font-mono text-2xl text-[#dfba73]">{guest.roomNumber}</span>
                <KeyRound className="w-5 h-5 text-[#dfba73]" />
              </div>
            </div>

            <div className="text-right w-full">
              <div className="text-[9px] text-gray-500 uppercase">رقم رمز الحجز</div>
              <div className="text-[11px] text-gray-300 font-mono mt-0.5 bg-white/5 px-2 py-1 rounded-md text-center inline-block">
                {guest.reservationNumber}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* EMERGENCY BUTTON & FAQ quick entry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Royal FAQ Card */}
        <button
          onClick={() => onNavigateToService('faq')}
          className="glass-panel p-4 rounded-2xl flex items-center justify-between text-right cursor-pointer hover:border-[#dfba73]/30 hover:bg-white/5 transition-all duration-300 group"
          id="btn-faq-dashboard"
        >
          <div className="p-3 bg-blue-900/20 rounded-xl group-hover:scale-105 transition-transform">
            <HelpCircle className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">الأسئلة الشائعة والتعليمات</h4>
            <p className="text-[11px] text-gray-400 mt-0.5">تفاصيل خدمات الإنترنت والمرافق والمواعيد الفندقية.</p>
          </div>
        </button>

        {/* Emergency Call Card */}
        <button
          onClick={onEmergencyCall}
          className="glass-panel p-4 rounded-2xl flex items-center justify-between text-right border-red-500/20 hover:border-red-500/50 bg-red-950/5 hover:bg-red-950/15 cursor-pointer transition-all duration-300 group shadow-[0_4px_20px_rgba(239,68,68,0.05)]"
          id="btn-emergency-dashboard"
        >
          <div className="p-3 bg-red-600/20 rounded-xl group-hover:animate-ping transition-all">
            <PhoneCall className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-red-400">الاتصال المباشر بالطوارئ</h4>
            <p className="text-[11px] text-red-300/80 mt-0.5">خط دفاع فوري طارئ للمساعدة الطبية أو الأمنية العاجلة.</p>
          </div>
        </button>
      </div>

      {/* Quick Services Title */}
      <div className="text-right pt-2">
        <h3 className="font-serif text-lg font-bold text-white flex items-center justify-end gap-2">
          <span>الخدمات والطلبات المتاحة للغرفة</span>
          <div className="w-1.5 h-1.5 bg-[#dfba73] rounded-full gold-border-glow" />
        </h3>
        <p className="text-xs text-gray-500 mt-1">تصفّح واطلب خدمات الجناح بضغطة زر مع تتبع الحالة فورياً</p>
      </div>

      {/* Services Grid with micro-interactions */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4" id="services-grid">
        {gridServices.map((service, index) => {
          const IconComp = service.icon;
          return (
            <motion.button
              key={service.id}
              id={`service-card-${service.id}`}
              onClick={() => onNavigateToService(service.id)}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.5, ease: 'easeOut' }}
              className={`glass-panel p-5 rounded-2xl flex flex-col justify-between text-right cursor-pointer group transition-all duration-300 border-white/5 ${service.border}`}
            >
              <div className="flex justify-between items-start w-full mb-4">
                {/* Arrow indicator */}
                <span className="text-xs text-gray-600 group-hover:text-[#dfba73] transition-colors font-sans">←</span>

                {/* Premium gradient circle for icon */}
                <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} text-[#dfba73] group-hover:scale-110 transition-transform duration-300`}>
                  <IconComp className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-[#dfba73] transition-colors duration-200">
                  {service.title}
                </h4>
                <p className="text-[11px] text-gray-500 mt-1 leading-relaxed line-clamp-2">
                  {service.desc}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Luxury Slogan */}
      <div className="text-center pt-8 text-gray-600 select-none">
        <div className="text-[15px] font-serif tracking-[0.2em] mb-1">AMAN RESORTS</div>
        <div className="text-[9px] tracking-widest text-[#dfba73]/40">الرفاهية في أبهى صورها</div>
      </div>

    </div>
  );
}
