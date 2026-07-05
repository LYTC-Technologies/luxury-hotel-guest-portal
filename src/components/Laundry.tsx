/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Shirt, Plus, Minus, CheckCircle, Clock } from 'lucide-react';
import { laundryItems } from '../data';
import { LaundryItem, LaundryCartItem } from '../types';

interface LaundryProps {
  onBack: () => void;
  onAddOrder: (order: {
    type: 'laundry';
    title: string;
    details: string;
    estimatedDelivery: string;
  }) => void;
}

export default function Laundry({ onBack, onAddOrder }: LaundryProps) {
  const [cart, setCart] = useState<LaundryCartItem[]>([]);
  const [expressService, setExpressService] = useState(false);
  const [pickupTime, setPickupTime] = useState('10:00 صباحاً - 12:00 ظهراً');
  const [deliveryTime, setDeliveryTime] = useState('06:00 مساءً - 08:00 مساءً');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [activeTab, setActiveTab] = useState<'men' | 'women' | 'dryclean'>('men');

  const addToCart = (item: LaundryItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.item.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter((i) => i.item.id !== itemId);
    });
  };

  const totalBasePrice = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const expressFee = expressService ? totalBasePrice * 0.5 : 0;
  const grandTotal = totalBasePrice + expressFee;

  const handleOrder = () => {
    if (cart.length === 0) return;

    const details = cart
      .map((i) => `${i.item.name} (عدد ${i.quantity})`)
      .join(', ') +
      ` | موعد الاستلام: ${pickupTime} | موعد التسليم: ${deliveryTime}` +
      (expressService ? ' | الخدمة: مستعجلة فائقة السرعة' : ' | الخدمة: اعتيادية ممتازة');

    onAddOrder({
      type: 'laundry',
      title: 'طلب غسيل وكي ملابس',
      details,
      estimatedDelivery: expressService ? 'خلال ٤ ساعات' : 'غداً صباحاً'
    });

    setOrderPlaced(true);
    setCart([]);
    setTimeout(() => {
      setOrderPlaced(false);
    }, 4000);
  };

  const filteredItems = laundryItems.filter((i) => i.category === activeTab);

  return (
    <div className="pb-32 pt-6 px-4 max-w-4xl mx-auto space-y-6 text-right font-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-left text-xs font-mono text-[#dfba73]">
          {cart.length > 0 && `إجمالي المؤقت: ${grandTotal} ر.س`}
        </div>

        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">العناية بالملابس والمغسلة</h1>
            <p className="text-xs text-gray-400 mt-0.5">غسيل جاف، كي بالبخار وعناية ملكية بالبشوت والحرير</p>
          </div>
          <button
            onClick={onBack}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors cursor-pointer"
            id="btn-back-laundry"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {orderPlaced ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-panel p-8 rounded-3xl text-center space-y-4 border-[#dfba73]/30"
          >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">تم استلام طلب المغسلة بنجاح!</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              تم تسجيل الطلب في قائمة الخدمة الخاصة الفورية. سيقوم موظف العناية بالملابس بالمرور على جناحك رقم <span className="text-[#dfba73] font-bold">702</span> لاستلام الملابس خلال الموعد المختار.
            </p>
            <div className="w-20 h-[1px] bg-white/10 mx-auto" />
            <div className="text-[10px] text-gray-500 font-mono">الخدمة: {expressService ? 'عناية مستعجلة فائقة (٤ ساعات)' : 'عناية اعتيادية فاخرة'}</div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            
            {/* Left side: Order config and Summary (1 column) */}
            <div className="glass-panel p-5 rounded-2xl border-white/5 space-y-5 md:col-span-1">
              <h3 className="font-serif text-sm font-bold text-[#dfba73] pb-2 border-b border-white/5 flex items-center justify-end gap-2">
                <span>تفاصيل وجدولة الاستلام</span>
                <Clock className="w-4 h-4 text-[#dfba73]" />
              </h3>

              {/* Express Toggle */}
              <div className="bg-black/30 p-3.5 rounded-xl border border-white/5 space-y-1.5 text-right">
                <div className="flex justify-between items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={expressService}
                      onChange={(e) => setExpressService(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-white/10 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-[2px] after:bg-gray-400 after:peer-checked:bg-[#dfba73] after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#dfba73]/20" />
                  </label>
                  <span className="text-xs font-bold text-white">الخدمة المستعجلة الفائقة</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  * غسيل وتسليم خلال ٤ ساعات فقط مع إضافة رسوم إضافية بقيمة ٥٠٪ على السعر الأساسي.
                </p>
              </div>

              {/* Pickup Time Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-400">وقت استلام الملابس من الغرفة:</label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full bg-black/50 text-xs text-white p-3 rounded-xl border border-white/5 focus:border-[#dfba73] focus:outline-none"
                >
                  <option value="10:00 صباحاً - 12:00 ظهراً">10:00 صباحاً - 12:00 ظهراً</option>
                  <option value="12:00 ظهراً - 02:00 ظهراً">12:00 ظهراً - 02:00 ظهراً</option>
                  <option value="02:00 ظهراً - 04:00 عصراً">02:00 ظهراً - 04:00 عصراً</option>
                  <option value="04:00 عصراً - 06:00 مساءً">04:00 عصراً - 06:00 مساءً</option>
                </select>
              </div>

              {/* Delivery Time Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-400">وقت التسليم والتعليق بالخزانة:</label>
                <select
                  value={deliveryTime}
                  disabled={expressService}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full bg-black/50 text-xs text-white p-3 rounded-xl border border-white/5 focus:border-[#dfba73] focus:outline-none disabled:opacity-50"
                >
                  {expressService ? (
                    <option value="خلال ٤ ساعات من الاستلام">فوري خلال ٤ ساعات من الاستلام</option>
                  ) : (
                    <>
                      <option value="06:00 مساءً - 08:00 مساءً">06:00 مساءً - 08:00 مساءً</option>
                      <option value="08:00 مساءً - 10:00 مساءً">08:00 مساءً - 10:00 مساءً</option>
                      <option value="غداً 09:00 صباحاً - 11:00 صباحاً">غداً 09:00 صباحاً - 11:00 صباحاً</option>
                    </>
                  )}
                </select>
              </div>

              {/* Price summary */}
              <div className="pt-2 border-t border-white/5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-mono">{totalBasePrice} ر.س</span>
                  <span className="text-gray-400">المجموع الأساسي:</span>
                </div>
                {expressService && (
                  <div className="flex justify-between text-xs text-red-400">
                    <span className="font-mono">+{expressFee} ر.س</span>
                    <span>رسوم الخدمة المستعجلة (٥٠٪):</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#dfba73] pt-1 border-t border-dashed border-white/10">
                  <span className="font-mono">{grandTotal} ر.س</span>
                  <span>الإجمالي النهائي:</span>
                </div>
              </div>

              <button
                onClick={handleOrder}
                disabled={cart.length === 0}
                className="w-full py-3.5 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-black font-bold text-xs rounded-xl hover:shadow-[0_0_15px_rgba(223,186,115,0.3)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                id="btn-confirm-laundry"
              >
                تأكيد حجز خدمة المغسلة
              </button>
            </div>

            {/* Right side: Items selection (2 columns) */}
            <div className="md:col-span-2 space-y-4">
              
              {/* Gender/DryClean Tabs */}
              <div className="flex gap-2 border-b border-white/5 pb-2" dir="rtl">
                <button
                  onClick={() => setActiveTab('men')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'men' ? 'bg-[#dfba73]/10 text-[#dfba73] border border-[#dfba73]/30' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  العناية بالملابس الرجالية
                </button>
                <button
                  onClick={() => setActiveTab('women')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'women' ? 'bg-[#dfba73]/10 text-[#dfba73] border border-[#dfba73]/30' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  العناية بالملابس النسائية
                </button>
                <button
                  onClick={() => setActiveTab('dryclean')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'dryclean' ? 'bg-[#dfba73]/10 text-[#dfba73] border border-[#dfba73]/30' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  تنظيف جاف فقط
                </button>
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredItems.map((item) => {
                  const cartItem = cart.find((i) => i.item.id === item.id);
                  const qty = cartItem ? cartItem.quantity : 0;

                  return (
                    <div
                      key={item.id}
                      className="bg-black/40 p-4 rounded-xl border border-white/5 hover:border-[#dfba73]/20 flex justify-between items-center transition-all group"
                    >
                      {/* Quantity and Controls */}
                      <div className="flex items-center gap-2 bg-white/5 rounded-lg border border-white/10 px-1.5 py-1">
                        <button
                          onClick={() => addToCart(item)}
                          className="text-gray-400 hover:text-[#dfba73] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white font-mono w-4 text-center">{qty}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-400 cursor-pointer"
                          disabled={qty === 0}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item details */}
                      <div className="text-right">
                        <h4 className="text-xs font-bold text-white group-hover:text-[#dfba73] transition-colors">{item.name}</h4>
                        <span className="text-[10px] text-gray-500 font-mono mt-0.5 block">{item.price} ر.س / للقطعة</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
