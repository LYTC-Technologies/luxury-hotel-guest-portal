/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Clock, CheckCircle2, XCircle, 
  Utensils, Heart, Shirt, Wrench, Car, Coffee,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { getSpecialOrders, SpecialOrderResponse } from '../services/guestApi';
import { useRoom } from '../contexts/RoomContext';

interface OrdersProps {
  onAddOrder?: (orderData: any) => void;
}

export default function Orders({ onAddOrder }: OrdersProps) {
  const [serviceOrders, setServiceOrders] = useState<SpecialOrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const { roomNumber } = useRoom();

  useEffect(() => {
    fetchOrders();
  }, [roomNumber]);

  const fetchOrders = async () => {
    if (!roomNumber) return;

    setLoading(true);
    try {
      // Fetch service orders
      const servicesResponse = await getSpecialOrders(roomNumber);
      setServiceOrders(servicesResponse || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-[#dfba73]" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'room_service':
      case 'restaurant':
        return <Utensils className="w-4 h-4" />;
      case 'spa':
        return <Heart className="w-4 h-4" />;
      case 'laundry':
        return <Shirt className="w-4 h-4" />;
      case 'maintenance':
        return <Wrench className="w-4 h-4" />;
      case 'taxi':
        return <Car className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="page-container space-y-6 text-right font-sans">
      {/* Header with Toggle */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="font-serif text-2xl font-bold text-[#dfba73] gold-text-glow">طلبات الخدمات</h1>
        <p className="text-xs text-gray-400">تصفح جميع طلبات الخدمات وتتبع حالتها</p>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-block w-8 h-8 border-2 border-[#dfba73] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-400 mt-3">جاري تحميل الطلبات...</p>
        </motion.div>
      )}

      {/* Orders List */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-3"
        >
          {serviceOrders.length === 0 ? (
            <div className="text-center py-12">
            </div>
          ) : (
            serviceOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-[#dfba73]/30 transition-all"
              >
                <div
                  onClick={() => toggleExpand(`service-${order.id}`)}
                  className="p-4 cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-[#dfba73]/10 to-purple-500/10">
                        <Sparkles className="w-4 h-4 text-[#dfba73]" />
                      </div>
                      <div className="text-right">
                        <h4 className="text-sm font-bold text-white">{order.specialOffer?.title}</h4>
                        <p className="text-[10px] text-gray-500">
                          #{order.id} • {new Date(order.createdAt).toLocaleDateString('ar-EG')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      {expandedOrder === `service-${order.id}` ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-xs font-bold text-[#dfba73]">{order.agreedPrice} ر.س</span>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedOrder === `service-${order.id}` && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/10 p-4"
                    >
                      <p className="text-xs text-gray-400">{order.specialOffer?.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
}
