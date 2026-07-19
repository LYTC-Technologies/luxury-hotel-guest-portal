/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Percent, Sparkles, CheckCircle, Loader2 } from 'lucide-react';
import { getSpecialOffers, SpecialOfferResponse } from '../services/guestApi';
import { Offer } from '../types';
import { useRoom } from '../contexts/RoomContext';

interface OffersProps {
  onBack: () => void;
  onAddOrder: (order: {
    type: 'offers';
    title: string;
    details: string;
    estimatedDelivery: string;
  }) => void;
}

export default function Offers({ onBack, onAddOrder }: OffersProps) {
  const [redeemedOfferId, setRedeemedOfferId] = useState<string | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { hasValidRoom } = useRoom();

  // Fetch special offers from API
  useEffect(() => {
    const fetchOffers = async () => {
      if (!hasValidRoom) {
        setError('يرجى تسجيل الدخول أولاً');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await getSpecialOffers({
          page: currentPage,
          size: 20,
        });
        
        // Convert API response to Offer format
        const items: Offer[] = response.content.map((item: SpecialOfferResponse) => ({
          id: item.id.toString(),
          title: item.title,
          description: item.description,
          image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
          discount: 'عرض خاص',
          code: `OFFER-${item.id}`,
        }));
        
        setOffers(items);
        setTotalPages(response.totalPages);
      } catch (error: any) {
        console.error('Failed to fetch special offers:', error);
        setError(error.response?.data?.message || 'فشل تحميل العروض. يرجى المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [currentPage, hasValidRoom]);

  const handleRedeem = (offerId: string) => {
    const offer = offers.find((o) => o.id === offerId);
    if (!offer) return;

    onAddOrder({
      type: 'offers',
      title: `تفعيل ميزة: ${offer.title}`,
      details: `العرض: ${offer.title} | الخصم/الميزة: ${offer.discount}`,
      estimatedDelivery: 'جاري مراجعة المساعد الشخصي'
    });

    setRedeemedOfferId(offerId);
    setTimeout(() => {
      setRedeemedOfferId(null);
    }, 4000);
  };

  return (
    <div className="pb-32 pt-6 px-4 max-w-4xl mx-auto space-y-6 text-right font-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="w-10 h-10" />
        
        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">العروض والمزايا الذهبية</h1>
            <p className="text-xs text-gray-400 mt-0.5">مزايا ترقية الغرف وباقات السبا وعروض المطبخ الحصرية لنزلاء الأجنحة والفلل</p>
          </div>
          <button
            onClick={onBack}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors cursor-pointer"
            id="btn-back-offers"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Offers list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="glass-panel rounded-2xl overflow-hidden border-white/5 opacity-50">
              <div className="h-40 bg-gray-800 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-gray-800 rounded animate-pulse w-full" />
                <div className="h-3 bg-gray-800 rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))
        ) : error ? (
          // Error state
          <div className="col-span-full text-center py-12">
            <div className="text-red-400 text-sm mb-2">⚠️ {error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="text-[#dfba73] text-xs underline"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : offers.length === 0 ? (
          // Empty state
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 text-sm">لا توجد عروض متاحة حالياً</div>
          </div>
        ) : (
          offers.map((off) => {
          const isRedeemed = redeemedOfferId === off.id;

          return (
            <div
              key={off.id}
              id={`offer-card-${off.id}`}
              className="glass-panel rounded-3xl overflow-hidden border-white/5 flex flex-col justify-between group shadow-xl"
            >
              {/* Image with overlay badge */}
              <div className="relative h-44 overflow-hidden bg-neutral-900">
                <img
                  src={off.image}
                  alt={off.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-750"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 bg-[#dfba73] text-black font-sans font-bold text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Percent className="w-3 h-3" />
                  <span>{off.discount}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-right">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-white group-hover:text-[#dfba73] transition-colors">
                    {off.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {off.description}
                  </p>
                </div>

                {/* Redeem Trigger */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <AnimatePresence mode="wait">
                    {isRedeemed ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs rounded-xl flex items-center gap-1.5"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>تم تفعيل الطلب!</span>
                      </motion.div>
                    ) : (
                      <button
                        onClick={() => handleRedeem(off.id)}
                        className="px-5 py-2.5 bg-white/5 hover:bg-[#dfba73] border border-white/10 hover:border-transparent text-[#dfba73] hover:text-black font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                        id={`btn-redeem-off-${off.id}`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>تفعيل الطلب أو الترقية</span>
                      </button>
                    )}
                  </AnimatePresence>

                  <span className="text-[10px] text-gray-500">حالة العرض: متاح فوري</span>
                </div>
              </div>
            </div>
          );
        }))}
      </div>
    </div>
  );
}
