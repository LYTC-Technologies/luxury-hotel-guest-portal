/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft } from 'lucide-react';

interface ServiceHeaderProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  action?: React.ReactNode;
}

export default function ServiceHeader({ title, subtitle, onBack, action }: ServiceHeaderProps) {
  return (
    <div className="flex justify-between items-center gap-3">
      {action ?? <div className="w-10" />}
      <div className="flex-1 text-right">
        <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <button
        onClick={onBack}
        className="glass-panel p-3 rounded-xl hover:border-[#dfba73]/40 transition-all cursor-pointer shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="رجوع"
      >
        <ArrowLeft className="w-5 h-5 text-[#dfba73]" />
      </button>
    </div>
  );
}
