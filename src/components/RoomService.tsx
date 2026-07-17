/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Plus, Minus, ArrowLeft, Trash2, CheckCircle2 } from 'lucide-react';
import { foodCategories, favoriteOrders } from '../data';
import { FoodItem, CartItem } from '../types';
import { getMenu, MenuItemResponse } from '../services/guestService';

interface RoomServiceProps {
  onBack: () => void;
  onAddOrder: (order: {
    type: 'room_service';
    title: string;
    details: string;
    estimatedDelivery: string;
  }) => void;
}

export default function RoomService({ onBack, onAddOrder }: RoomServiceProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<'all' | 'vegetarian' | 'halal' | 'glutenFree'>('all');
  const [showFavorites, setShowFavorites] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await getMenu();
        // Convert API response to FoodItem format
        const items: FoodItem[] = response.content.map((item: MenuItemResponse) => ({
          id: item.id.toString(),
          name: item.name,
          description: item.description,
          price: parseFloat(item.price),
          image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', // Default image
          category: item.category as FoodItem['category'],
          available: item.available,
        }));
        setFoodItems(items);
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Filtering items
  const filteredItems = foodItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.includes(searchQuery) || item.description.includes(searchQuery);
    const matchesDiet =
      dietFilter === 'all' ||
      (dietFilter === 'vegetarian' && item.isVegetarian) ||
      (dietFilter === 'halal' && item.isHalal) ||
      (dietFilter === 'glutenFree' && item.isGlutenFree);
    return matchesCategory && matchesSearch && matchesDiet;
  });

  const reorderFavorite = (fav: typeof favoriteOrders[0]) => {
    const matchedItems = foodItems.filter((item) => fav.items.includes(item.name.split(' ')[0]) || fav.items.includes(item.name));
    matchedItems.forEach((item) => addToCart(item));
    setShowCart(true);
  };

  const addToCart = (item: FoodItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.foodItem.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.foodItem.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { foodItem: item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.foodItem.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.foodItem.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter((i) => i.foodItem.id !== itemId);
    });
  };

  const clearCart = () => setCart([]);

  const totalAmount = cart.reduce((acc, curr) => {
    const price = curr.foodItem.offerPrice || curr.foodItem.price;
    return acc + price * curr.quantity;
  }, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const details = cart
      .map((i) => `${i.foodItem.name} (عدد ${i.quantity})`)
      .join(', ') + (instructions ? ` | ملاحظات: ${instructions}` : '');

    // Trigger order creation in the main app
    onAddOrder({
      type: 'room_service',
      title: 'طلب خدمة الغرف والمأكولات',
      details,
      estimatedDelivery: '٣٥-٤٥ دقيقة'
    });

    setOrderPlaced(true);
    setCart([]);
    setInstructions('');
    setTimeout(() => {
      setOrderPlaced(false);
      setShowCart(false);
    }, 4000);
  };

  return (
    <div className="pb-32 pt-6 px-4 max-w-4xl mx-auto space-y-6 text-right font-sans">
      {/* Header with back button */}
      <div className="flex justify-between items-center">
        {/* Cart Trigger Button */}
        <button
          onClick={() => setShowCart(true)}
          className="relative glass-panel px-4 py-2.5 rounded-full flex items-center gap-2 border-white/10 hover:border-[#dfba73]/40 cursor-pointer group"
          id="btn-room-service-cart"
        >
          {cart.length > 0 && (
            <span className="bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-xs h-5 w-5 rounded-full flex items-center justify-center animate-pulse">
              {cart.reduce((a, c) => a + c.quantity, 0)}
            </span>
          )}
          <span className="text-xs text-gray-300 font-medium">سلة المأكولات</span>
          <ShoppingBag className="w-4 h-4 text-[#dfba73] group-hover:scale-110 transition-transform" />
        </button>

        {/* Back Title */}
        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white select-none">خدمة الغرف والمطاعم</h1>
            <p className="text-xs text-gray-400 mt-0.5">قائمة المأكولات الفاخرة المحضّرة في الجناح</p>
          </div>
          <button
            onClick={onBack}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors cursor-pointer"
            id="btn-back-room-service"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Offers / Banner */}
      <div className="relative rounded-2xl overflow-hidden h-36 border border-[#dfba73]/20">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
          alt="Luxury Food Offer"
          className="w-full h-full object-cover scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute bottom-4 right-6 text-right">
          <span className="px-2 py-0.5 bg-amber-500/25 text-[#dfba73] border border-[#dfba73]/30 rounded-full text-[10px] font-bold">
            عرض محدود للغرفة
          </span>
          <h3 className="text-lg font-serif font-bold text-white mt-1">خصم بقيمة ٢٠٪ على الأطباق السعودية التقليدية</h3>
          <p className="text-xs text-gray-300">الكبسة الملوكية والمندي باللحم الفاخر</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن أطباقك المفضلة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3.5 bg-black/50 rounded-xl border border-white/5 focus:border-[#dfba73] text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#dfba73] transition-all text-right text-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
        </div>

        {/* Dietary Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none justify-end" dir="rtl">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'vegetarian', label: 'نباتي' },
            { id: 'halal', label: 'حلال' },
            { id: 'glutenFree', label: 'خالٍ من الجلوتين' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setDietFilter(filter.id as typeof dietFilter)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer touch-target ${
                dietFilter === filter.id
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-white/5 text-gray-400 border border-white/5'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Categories Carousel */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none justify-end" dir="rtl">
          {foodCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === category.id
                  ? 'bg-[#dfba73] text-black font-semibold'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Favorites & Reorder */}
      <div className="glass-panel rounded-2xl space-y-3">
        <button onClick={() => setShowFavorites(!showFavorites)} className="w-full flex justify-between items-center touch-target">
          <span className="text-xs text-[#dfba73]">{showFavorites ? 'إخفاء' : 'عرض'}</span>
          <h3 className="font-serif text-sm font-bold text-white">المفضلة وإعادة الطلب السابق</h3>
        </button>
        {showFavorites && (
          <div className="space-y-2">
            {favoriteOrders.map((fav) => (
              <div key={fav.id} className="flex justify-between items-center bg-black/20 rounded-xl p-3 border border-white/5">
                <button onClick={() => reorderFavorite(fav)} className="px-3 py-1.5 bg-[#dfba73]/10 text-[#dfba73] text-[10px] font-bold rounded-lg touch-target">
                  إعادة الطلب
                </button>
                <div className="text-right">
                  <div className="text-xs font-bold text-white">{fav.title}</div>
                  <div className="text-[10px] text-gray-500">{fav.items}</div>
                  <div className="text-[9px] text-gray-600 font-mono">آخر طلب: {fav.lastOrdered}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="food-list">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 text-sm">جاري تحميل القائمة...</div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 text-sm">لا توجد عناصر متاحة</div>
          </div>
        ) : (
          filteredItems.map((item) => (
          <div
            key={item.id}
            id={`food-card-${item.id}`}
            className="glass-panel rounded-2xl overflow-hidden border-white/5 flex flex-row items-stretch min-h-36 group"
          >
            {/* Image section with labels */}
            <div className="w-1/3 relative overflow-hidden bg-neutral-900">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent" />
              
              {/* Special Badges */}
              {item.isChefSpecial && (
                <span className="absolute top-2 right-2 bg-[#dfba73] text-black text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md select-none font-sans">
                  موصى به
                </span>
              )}
              {item.isOffer && (
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md select-none font-sans">
                  عرض خاص
                </span>
              )}
            </div>

            {/* Details section */}
            <div className="w-2/3 p-4 flex flex-col justify-between text-right">
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#dfba73] transition-colors">
                  {item.name}
                </h3>
                <p className="text-[11px] text-gray-500 mt-1 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5">
                {/* Add/Cart Action */}
                <button
                  onClick={() => addToCart(item)}
                  className="px-3 py-1.5 bg-[#dfba73]/10 hover:bg-[#dfba73] text-[#dfba73] hover:text-black rounded-lg text-xs font-semibold flex items-center gap-1 transition-all duration-300 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>إضافة للطلب</span>
                </button>

                {/* Price display */}
                <div className="text-right">
                  {item.isOffer && item.offerPrice ? (
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="text-xs text-gray-500 line-through font-mono">{item.price} ر.س</span>
                      <span className="text-sm font-bold text-[#dfba73] font-mono">{item.offerPrice} ر.س</span>
                    </div>
                  ) : (
                    <span className="text-sm font-bold text-white font-mono">{item.price} ر.س</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )))}
      </div>

      {/* Cart Drawer / Overlay modal */}
      <AnimatePresence>
        {showCart && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">
            {/* Background Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Sidebar drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative z-10 w-full max-w-md h-full bg-[#0d0d0d] border-r border-white/10 flex flex-col justify-between"
              id="cart-drawer"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-colors cursor-pointer text-xs"
                >
                  إغلاق السلة
                </button>
                <h3 className="font-serif text-lg font-bold text-[#dfba73] flex items-center gap-2">
                  <span>طلبات غرفتك</span>
                  <ShoppingBag className="w-5 h-5 text-[#dfba73]" />
                </h3>
              </div>

              {/* Order Placed Success View */}
              {orderPlaced ? (
                <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="p-4 bg-emerald-500/10 rounded-full border border-emerald-500/20"
                  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                  </motion.div>
                  <h4 className="font-serif text-xl font-bold text-white">تم إرسال الطلب بنجاح!</h4>
                  <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                    يسعدنا تلبية رغباتك. تم استلام طلب المأكولات الخاص بك وجاري تحضيره في المطبخ الملكي تحت إشراف طاهي الجناح. التوصيل المقدر خلال ٣٥ دقيقة.
                  </p>
                  <div className="w-24 h-[1px] bg-emerald-500/30 my-4" />
                  <div className="text-[10px] text-gray-500 font-mono">رقم الطلب الفوري: #RS-{Math.floor(Math.random() * 9000) + 1000}</div>
                </div>
              ) : cart.length === 0 ? (
                /* Empty state */
                <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="text-4xl">🍽️</div>
                  <h4 className="text-sm font-bold text-gray-400">سلة المأكولات فارغة</h4>
                  <p className="text-xs text-gray-600 max-w-xs leading-relaxed">
                    تصفّح القائمة وقم بإضافة أطباق الإفطار، العشاء، أو المشروبات الفاخرة للتمتع بخدمة الضيافة في الجناح.
                  </p>
                </div>
              ) : (
                /* Item list */
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  <div className="flex justify-between items-center text-xs text-gray-500 pb-2 border-b border-white/5">
                    <button
                      onClick={clearCart}
                      className="text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>مسح السلة</span>
                    </button>
                    <span>المنتجات المضافة</span>
                  </div>

                  <div className="space-y-3">
                    {cart.map((item) => {
                      const price = item.foodItem.offerPrice || item.foodItem.price;
                      return (
                        <div
                          key={item.foodItem.id}
                          className="bg-black/30 p-3.5 rounded-xl border border-white/5 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 bg-white/5 rounded-lg border border-white/10 px-1.5 py-1">
                              <button
                                onClick={() => addToCart(item.foodItem)}
                                className="text-gray-400 hover:text-[#dfba73]"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-white font-mono">{item.quantity}</span>
                              <button
                                onClick={() => removeFromCart(item.foodItem.id)}
                                className="text-gray-400 hover:text-red-400"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Info */}
                            <div className="text-right">
                              <h5 className="text-xs font-bold text-white">{item.foodItem.name}</h5>
                              <span className="text-[10px] text-gray-500 font-mono">
                                {price} ر.س × {item.quantity}
                              </span>
                            </div>
                          </div>

                          <span className="text-xs font-bold text-[#dfba73] font-mono">
                            {price * item.quantity} ر.س
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Special instructions comments */}
                  <div className="pt-4 space-y-1.5 text-right">
                    <label className="text-xs font-medium text-gray-400">ملاحظات خاصة بالمطبخ أو الطهو:</label>
                    <textarea
                      placeholder="مثال: بدون سكر إضافي، درجة طهو اللحم متوسطة، تقديم حار جداً..."
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      className="w-full h-20 px-3 py-2 text-xs bg-black/50 border border-white/5 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#dfba73] resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Checkout Footer */}
              {!orderPlaced && cart.length > 0 && (
                <div className="p-6 border-t border-white/5 bg-black/50 space-y-4">
                  <div className="space-y-1 text-right">
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span className="font-mono text-white">مجاناً</span>
                      <span>رسوم الخدمة الملكية:</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold text-[#dfba73] pt-1">
                      <span className="font-mono text-lg">{totalAmount} ر.س</span>
                      <span>إجمالي الفاتورة:</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2">
                      * سيتم إدراج قيمة هذا الطلب تلقائياً في الفاتورة الإجمالية للجناح لتسويتها عند تسجيل المغادرة.
                    </p>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-gradient-to-r from-[#cbba53] via-[#dfba73] to-[#cbba53] text-black font-bold text-sm rounded-xl hover:shadow-[0_0_15px_rgba(223,186,115,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    id="btn-checkout-room-service"
                  >
                    <span>تأكيد الطلب الفوري للغرفة</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
