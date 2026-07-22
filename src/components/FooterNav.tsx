/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Grid, ClipboardList } from 'lucide-react';

export type TabType = 'services' | 'requests';

interface FooterNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  cartCount: number;
}

export default function FooterNav({
  activeTab,
  setActiveTab,
  cartCount,
}: FooterNavProps) {
  const navItems = [
    { id: 'requests', name: 'طلباتي', icon: ClipboardList, badge: cartCount },
    { id: 'services', name: 'الخدمات', icon: Grid },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black via-black/95 to-transparent pb-6 pt-2 px-4 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <div className="glass-panel-light border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] rounded-2xl px-3 py-2.5 flex justify-around items-center relative overflow-hidden backdrop-blur-xl">
          {/* Subtle gold line on top of navigation */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#dfba73]/30 to-transparent" />

          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => setActiveTab(item.id as TabType)}
                className="relative flex flex-col items-center justify-center py-1 px-3 cursor-pointer group focus:outline-none transition-all duration-300"
              >
                {/* Active Indicator Background */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-[#dfba73]/10 rounded-xl"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}

                {/* Icon wrapper with animation */}
                <div
                  className={`relative p-1.5 rounded-lg transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? 'text-[#dfba73]' : 'text-gray-400 group-hover:text-white'
                  }`}
                >
                  <IconComponent className="w-5 h-5 stroke-[1.8]" />

                  {/* Badges for counts */}
                  {item.badge !== undefined && item.badge > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-red-500 text-[10px] text-white font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-lg border border-black"
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </div>

                {/* Text Label */}
                <span
                  className={`text-[10px] mt-1 select-none font-sans font-medium transition-all duration-300 ${
                    isActive ? 'text-[#dfba73] scale-105' : 'text-gray-500 group-hover:text-gray-300'
                  }`}
                >
                  {item.name}
                </span>

                {/* Bottom line active bar */}
                {isActive && (
                  <div className="absolute bottom-0 w-1 h-1 bg-[#dfba73] rounded-full gold-border-glow" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
