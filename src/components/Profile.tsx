/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, LogOut, ChevronDown, ChevronUp, Bell, Shield, Phone, MessageSquare, Mail } from 'lucide-react';
import { Guest } from '../types';
import { faqs, hotelDetails } from '../data';

interface ProfileProps {
  guest: Guest;
  onLogout: () => void;
}

export default function Profile({ guest, onLogout }: ProfileProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [notifSound, setNotifSound] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(true);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="pb-32 pt-6 px-4 max-w-2xl mx-auto space-y-6 text-right font-sans">
      
      {/* Header Profile card */}
      <div className="glass-panel p-6 rounded-3xl border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-right relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-[#dfba73]/5">
        
        {/* Logout button */}
        <button
          onClick={onLogout}
          className="px-4 py-2.5 bg-red-950/20 hover:bg-red-600 border border-red-900/30 hover:border-transparent text-red-400 hover:text-white rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 self-center sm:self-start"
          id="btn-logout"
        >
          <span>تسجيل خروج الضيف</span>
          <LogOut className="w-4 h-4" />
        </button>

        {/* User Info */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="text-center sm:text-right">
            <span className="px-2 py-0.5 bg-[#dfba73]/10 text-[#dfba73] border border-[#dfba73]/20 rounded-full text-[9px] font-sans font-bold">
              عضوية المزايا الذهبية للضيوف
            </span>
            <h2 className="text-xl font-serif font-bold text-white mt-1.5">
              {guest.name} {guest.lastName}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              نزيل الجناح رقم <span className="text-[#dfba73] font-bold font-mono">{guest.roomNumber}</span> • {guest.hotelName}
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-[#dfba73]/10 border border-[#dfba73]/20 flex items-center justify-center text-2xl shadow-inner shadow-black/50 select-none">
            👤
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* App Preferences */}
        <div className="glass-panel p-5 rounded-2xl border-white/5 space-y-4">
          <h3 className="font-serif text-sm font-bold text-[#dfba73] pb-2 border-b border-white/5 flex items-center justify-end gap-2">
            <span>إعدادات التطبيق المفضلة</span>
            <Bell className="w-4 h-4 text-[#dfba73]" />
          </h3>

          <div className="space-y-3.5 text-xs text-gray-300">
            {/* Toggle sound */}
            <div className="flex justify-between items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifSound}
                  onChange={(e) => setNotifSound(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-8 h-4.5 bg-white/10 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-gray-400 after:peer-checked:bg-[#dfba73] after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#dfba73]/20" />
              </label>
              <span>أصوات وإشعارات البلاغات الفورية</span>
            </div>

            {/* Toggle privacy mode */}
            <div className="flex justify-between items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacyMode}
                  onChange={(e) => setPrivacyMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-8 h-4.5 bg-white/10 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-gray-400 after:peer-checked:bg-[#dfba73] after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#dfba73]/20" />
              </label>
              <span>تشفير حماية الخصوصية الرقمية</span>
            </div>

            {/* Read-only Language option */}
            <div className="flex justify-between items-center">
              <span className="font-sans text-[#dfba73]">العربية (RTL Only)</span>
              <span>لغة الواجهة والتخاطب:</span>
            </div>
          </div>
        </div>

        {/* Support Desk */}
        <div className="glass-panel p-5 rounded-2xl border-white/5 space-y-4">
          <h3 className="font-serif text-sm font-bold text-[#dfba73] pb-2 border-b border-white/5 flex items-center justify-end gap-2">
            <span>مركز دعم وإسناد الضيوف</span>
            <Shield className="w-4 h-4 text-[#dfba73]" />
          </h3>

          <div className="space-y-3 text-xs text-gray-400">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[#dfba73] select-all">{hotelDetails.phone}</span>
              <span className="flex items-center gap-1.5 justify-end">
                <span>الاتصال الهاتفي الساخن:</span>
                <Phone className="w-3.5 h-3.5 text-[#dfba73]" />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-[#dfba73] select-all">{hotelDetails.email}</span>
              <span className="flex items-center gap-1.5 justify-end">
                <span>البريد الإلكتروني للنزلاء:</span>
                <Mail className="w-3.5 h-3.5 text-blue-400" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion FAQ section */}
      <div className="space-y-4">
        <h3 className="font-serif text-base font-bold text-white flex items-center justify-end gap-2">
          <span>الأسئلة الشائعة والتعليمات العامة</span>
          <div className="w-1.5 h-1.5 bg-[#dfba73] rounded-full gold-border-glow" />
        </h3>

        <div className="space-y-2" id="faq-accordion">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div
                key={idx}
                className="glass-panel rounded-xl overflow-hidden border-white/5 transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 flex justify-between items-center text-right hover:bg-white/5 transition-colors cursor-pointer"
                  id={`faq-btn-${idx}`}
                >
                  <span className="text-[#dfba73]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                  <span className="text-xs font-bold text-white">{faq.q}</span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5 bg-black/20"
                    >
                      <p className="p-4 text-xs text-gray-400 leading-relaxed font-sans whitespace-pre-line">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
