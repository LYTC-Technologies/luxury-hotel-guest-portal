/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Search } from 'lucide-react';
import { localPlaces } from '../data';
import ServiceHeader from './ServiceHeader';

interface LocalGuideProps {
  onBack: () => void;
}

export default function LocalGuide({ onBack }: LocalGuideProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  const categories = ['الكل', ...Array.from(new Set(localPlaces.map((p) => p.category)))];

  const filtered = localPlaces.filter((p) => {
    const matchCat = activeCategory === 'الكل' || p.category === activeCategory;
    const matchSearch = p.name.includes(search) || p.description.includes(search);
    return matchCat && matchSearch;
  });

  const place = localPlaces.find((p) => p.id === selectedPlace);

  return (
    <div className="page-container space-y-6 text-right font-sans">
      <ServiceHeader title="الدليل المحلي" subtitle="اكتشف الرياض" onBack={onBack} />

      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث عن مكان..."
          className="w-full bg-black/50 rounded-xl border border-white/10 pr-10 pl-4 py-3 text-sm text-white focus:border-[#dfba73] outline-none" />
      </div>

      <div className="flex flex-wrap gap-2 justify-end">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-[11px] touch-target ${activeCategory === cat ? 'bg-[#dfba73]/20 text-[#dfba73]' : 'bg-white/5 text-gray-400'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Interactive Map Placeholder */}
      <div className="glass-panel rounded-2xl h-40 sm:h-52 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/20 to-[#dfba73]/10" />
        <div className="relative text-center space-y-2">
          <MapPin className="w-8 h-8 text-[#dfba73] mx-auto" />
          <p className="text-xs text-gray-400">خريطة تفاعلية — الرياض، المملكة العربية السعودية</p>
          <p className="text-[10px] text-gray-600">منتجع الأمان • {filtered.length} وجهة قريبة</p>
        </div>
      </div>

      {place ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <img src={place.image} alt={place.name} className="w-full h-48 object-cover rounded-2xl" loading="lazy" />
          <div className="glass-panel-gold rounded-2xl space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#dfba73]">{place.name}</h2>
            <p className="text-xs text-gray-400 leading-relaxed">{place.description}</p>
            <div className="flex justify-between text-xs">
              <span className="text-[#dfba73]">{place.distance}</span>
              <span className="text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{place.category}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setSelectedPlace(null)} className="py-2.5 bg-white/5 text-xs text-gray-400 rounded-xl touch-target">رجوع</button>
              <button onClick={() => alert('تم فتح الملاحة نحو ' + place.name)} className="py-2.5 bg-[#dfba73]/10 text-xs text-[#dfba73] rounded-xl flex items-center justify-center gap-1 touch-target">
                <Navigation className="w-3.5 h-3.5" /> الاتجاهات
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((p) => (
            <button key={p.id} onClick={() => setSelectedPlace(p.id)}
              className="glass-panel rounded-2xl text-right overflow-hidden touch-target">
              <img src={p.image} alt={p.name} className="w-full h-28 object-cover rounded-xl mb-2" loading="lazy" />
              <h3 className="text-sm font-bold text-white">{p.name}</h3>
              <div className="flex justify-between mt-2 text-[10px]">
                <span className="text-[#dfba73]">{p.distance}</span>
                <span className="text-gray-500">{p.category}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
