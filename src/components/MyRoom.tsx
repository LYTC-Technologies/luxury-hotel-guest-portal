/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Thermometer, Lightbulb, Blinds, Tv, BellOff, Sparkles,
  Wine, Wifi, BookOpen, Phone, AlertTriangle, Wrench, Copy, Check
} from 'lucide-react';
import { Guest } from '../types';
import { hotelDetails, roomAmenities } from '../data';
import ServiceHeader from './ServiceHeader';

interface MyRoomProps {
  guest: Guest;
  onBack: () => void;
  onAddOrder: (order: { type: 'maintenance' | 'housekeeping'; title: string; details: string; estimatedDelivery: string }) => void;
}

export default function MyRoom({ guest, onBack, onAddOrder }: MyRoomProps) {
  const [temperature, setTemperature] = useState(22);
  const [lightLevel, setLightLevel] = useState(70);
  const [curtainsOpen, setCurtainsOpen] = useState(true);
  const [tvOn, setTvOn] = useState(true);
  const [dnd, setDnd] = useState(false);
  const [cleaningRequested, setCleaningRequested] = useState(false);
  const [minibarOpen, setMinibarOpen] = useState(false);
  const [wifiCopied, setWifiCopied] = useState(false);
  const [showGuides, setShowGuides] = useState<string | null>(null);

  const copyWifi = () => {
    navigator.clipboard?.writeText(hotelDetails.wifiPassword);
    setWifiCopied(true);
    setTimeout(() => setWifiCopied(false), 2000);
  };

  const requestCleaning = () => {
    setCleaningRequested(true);
    onAddOrder({ type: 'housekeeping', title: 'طلب تنظيف الغرفة', details: `تنظيف جناح ${guest.roomNumber}`, estimatedDelivery: '٢٠-٣٠ دقيقة' });
  };

  const requestMaintenance = () => {
    onAddOrder({ type: 'maintenance', title: 'طلب صيانة من الجناح', details: `صيانة جناح ${guest.roomNumber}`, estimatedDelivery: '١٥-٢٠ دقيقة' });
  };

  const controls = [
    { id: 'temp', icon: Thermometer, label: 'درجة الحرارة', value: `${temperature}°`, action: (
      <input type="range" min="18" max="28" value={temperature} onChange={(e) => setTemperature(+e.target.value)} className="w-full accent-[#dfba73] mt-2" />
    )},
    { id: 'light', icon: Lightbulb, label: 'الإضاءة', value: `${lightLevel}%`, action: (
      <input type="range" min="0" max="100" value={lightLevel} onChange={(e) => setLightLevel(+e.target.value)} className="w-full accent-[#dfba73] mt-2" />
    )},
    { id: 'curtains', icon: Blinds, label: 'الستائر', value: curtainsOpen ? 'مفتوحة' : 'مغلقة', action: (
      <button onClick={() => setCurtainsOpen(!curtainsOpen)} className="w-full mt-2 py-2 bg-white/5 rounded-lg text-xs text-[#dfba73] touch-target">{curtainsOpen ? 'إغلاق' : 'فتح'}</button>
    )},
    { id: 'tv', icon: Tv, label: 'التلفزيون', value: tvOn ? 'مشغّل' : 'مطفأ', action: (
      <button onClick={() => setTvOn(!tvOn)} className="w-full mt-2 py-2 bg-white/5 rounded-lg text-xs text-[#dfba73] touch-target">{tvOn ? 'إيقاف' : 'تشغيل'}</button>
    )},
    { id: 'dnd', icon: BellOff, label: 'عدم الإزعاج', value: dnd ? 'مفعّل' : 'معطّل', action: (
      <button onClick={() => setDnd(!dnd)} className={`w-full mt-2 py-2 rounded-lg text-xs touch-target ${dnd ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-[#dfba73]'}`}>{dnd ? 'إلغاء' : 'تفعيل'}</button>
    )},
    { id: 'minibar', icon: Wine, label: 'الميني بار', value: minibarOpen ? 'مفتوح' : 'مغلق', action: (
      <button onClick={() => setMinibarOpen(!minibarOpen)} className="w-full mt-2 py-2 bg-white/5 rounded-lg text-xs text-[#dfba73] touch-target">عرض المحتويات</button>
    )},
  ];

  return (
    <div className="page-container space-y-6 text-right font-sans">
      <ServiceHeader title="غرفتي" subtitle={`جناح ${guest.roomNumber} — ${guest.roomType}`} onBack={onBack} />

      {/* Room Status */}
      <div className="glass-panel-gold rounded-2xl">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-lg">جاهزة ومجهزة</span>
          <div className="text-right">
            <h2 className="font-serif text-lg font-bold text-[#dfba73]">جناح {guest.roomNumber}</h2>
            <p className="text-[11px] text-gray-500">{guest.roomType}</p>
          </div>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {controls.map((ctrl) => (
          <motion.div key={ctrl.id} whileHover={{ scale: 1.02 }} className="glass-panel rounded-xl space-y-1">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-[#dfba73]">{ctrl.value}</span>
              <ctrl.icon className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-[11px] text-gray-400">{ctrl.label}</div>
            {ctrl.action}
          </motion.div>
        ))}
      </div>

      {/* Minibar contents */}
      {minibarOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass-panel rounded-2xl space-y-2">
          <h3 className="text-sm font-bold text-white">محتويات الميني بار</h3>
          {['مياه فواره إيفيان', 'عصير برتقال طازج', 'شوكولاتة جوديفا', 'مكسرات مشكلة', 'مشروب طاقة ريد بول'].map((item) => (
            <div key={item} className="flex justify-between text-xs border-b border-white/5 pb-2">
              <span className="text-[#dfba73] font-mono">٢٥ ر.س</span>
              <span className="text-gray-300">{item}</span>
            </div>
          ))}
        </motion.div>
      )}

      {/* WiFi */}
      <div className="glass-panel rounded-2xl">
        <div className="flex justify-between items-center">
          <button onClick={copyWifi} className="px-3 py-1.5 bg-[#dfba73]/10 text-[#dfba73] text-xs rounded-lg flex items-center gap-1 touch-target">
            {wifiCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {wifiCopied ? 'تم النسخ' : 'نسخ'}
          </button>
          <div className="text-right">
            <div className="text-sm font-bold text-white flex items-center justify-end gap-2"><Wifi className="w-4 h-4 text-[#dfba73]" /> شبكة الواي فاي</div>
            <div className="text-[11px] text-gray-500 mt-1">AmanRoyal_Guest • {hotelDetails.wifiPassword}</div>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="glass-panel rounded-2xl space-y-3">
        <h3 className="font-serif text-sm font-bold text-white">وسائل الراحة</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {roomAmenities.map((a) => (
            <div key={a.id} className="bg-black/20 rounded-xl p-3 text-center">
              <div className="text-xl">{a.icon}</div>
              <div className="text-[10px] text-gray-400 mt-1">{a.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Guides & Emergency */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { id: 'tv', label: 'دليل التلفزيون', content: 'قنوات فاخرة: MBC، روتانا، نتفليكس، يوتيوب. استخدم الريموت للتنقل.' },
          { id: 'room', label: 'دليل الغرفة', content: 'تعليمات التكييف، الإضاءة الذكية، خزنة الأمان، وخدمات الجناح.' },
        ].map((guide) => (
          <button key={guide.id} onClick={() => setShowGuides(showGuides === guide.id ? null : guide.id)}
            className="glass-panel rounded-xl flex flex-col items-center gap-2 touch-target">
            <BookOpen className="w-5 h-5 text-[#dfba73]" />
            <span className="text-[11px] text-gray-300">{guide.label}</span>
          </button>
        ))}
      </div>
      {showGuides && (
        <div className="glass-panel rounded-xl text-xs text-gray-400">
          {[['tv', 'دليل التلفزيون'], ['room', 'دليل الغرفة']].find(([id]) => id === showGuides)?.[1] &&
            (showGuides === 'tv' ? 'قنوات فاخرة: MBC، روتانا، نتفلكس. استخدم الريموت للتنقل بين القنوات والتطبيقات.' : 'تعليمات التكييف الذكي، الإضاءة، خزنة الأمان (الرمز: 1234)، وخدمات الجناح على مدار الساعة.')}
        </div>
      )}

      <div className="glass-panel rounded-2xl space-y-2">
        <h3 className="text-sm font-bold text-white flex items-center justify-end gap-2"><AlertTriangle className="w-4 h-4 text-red-400" /> أرقام الطوارئ</h3>
        <div className="grid grid-cols-3 gap-2 text-center">
          {hotelDetails.emergencyNumbers.map((num) => (
            <div key={num} className="bg-red-500/10 rounded-xl p-3">
              <div className="text-lg font-bold text-red-400 font-mono">{num}</div>
              <div className="text-[9px] text-gray-500">طوارئ</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs pt-2 border-t border-white/5">
          <span className="text-[#dfba73] font-mono">{hotelDetails.roomPhone}</span>
          <span className="text-gray-400 flex items-center gap-1"><Phone className="w-3 h-3" /> هاتف الغرفة</span>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={requestCleaning} disabled={cleaningRequested}
          className="glass-panel rounded-xl flex items-center justify-center gap-2 touch-target disabled:opacity-50">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="text-xs text-gray-300">{cleaningRequested ? 'تم الطلب ✓' : 'تنظيف الغرفة'}</span>
        </button>
        <button onClick={requestMaintenance} className="glass-panel rounded-xl flex items-center justify-center gap-2 touch-target">
          <Wrench className="w-5 h-5 text-amber-400" />
          <span className="text-xs text-gray-300">طلب صيانة</span>
        </button>
      </div>
    </div>
  );
}
