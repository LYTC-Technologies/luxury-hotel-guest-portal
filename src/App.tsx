/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PhoneCall, AlertTriangle, ShieldCheck, X, Search } from 'lucide-react';

// Data & Types
import { Guest, Order, Notification } from './types';
import { sampleGuest, initialNotifications } from './data';

// Components
import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './components/LoginScreen';
import FooterNav, { TabType } from './components/FooterNav';
import Dashboard from './components/Dashboard';
import RoomService from './components/RoomService';
import Laundry from './components/Laundry';
import Housekeeping from './components/Housekeeping';
import Restaurant from './components/Restaurant';
import Spa from './components/Spa';
import Taxi from './components/Taxi';
import Maintenance from './components/Maintenance';
import Reception from './components/Reception';
import Bills from './components/Bills';
import Activities from './components/Activities';
import Offers from './components/Offers';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import Reservation from './components/Reservation';
import CheckIn from './components/CheckIn';
import CheckOut from './components/CheckOut';
import MyRoom from './components/MyRoom';
import Concierge from './components/Concierge';
import Facilities from './components/Facilities';
import Loyalty from './components/Loyalty';
import Reviews from './components/Reviews';
import Wallet from './components/Wallet';
import StayTimeline from './components/StayTimeline';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [activeService, setActiveService] = useState<string | null>(null);
  
  // Real state for orders and notifications
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord-1',
      type: 'laundry',
      title: 'طلب غسيل وكي ملابس متميز',
      status: 'completed',
      time: '09:30 صباحاً',
      estimatedDelivery: 'تم التسليم والتعليق بالخزانة',
      details: 'بشت ملكي فاخر (عدد ١)، ثوب سعودي ممتاز (عدد ٢)'
    },
    {
      id: 'ord-2',
      type: 'spa',
      title: 'جلسة تدليك الظهر بالأحجار البركانية',
      status: 'preparing',
      time: '06:00 مساءً',
      estimatedDelivery: 'اليوم في 06:00 مساءً (مؤكد)',
      details: 'الخبير: أحمد | الزيوت: دهن العود الكمبودي'
    }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [emergencyCalling, setEmergencyCalling] = useState(false);
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | Order['status']>('all');

  // Auto-transition orders status for interactive immersion!
  useEffect(() => {
    if (!guest) return;

    const interval = setInterval(() => {
      setOrders((prev) =>
        prev.map((ord) => {
          if (ord.status === 'pending') {
            return { ...ord, status: 'preparing' };
          }
          if (ord.status === 'preparing') {
            // Keep some preparing, transition others to 'on_the_way'
            if (Math.random() > 0.5) {
              return { ...ord, status: 'on_the_way' };
            }
          }
          return ord;
        })
      );
    }, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, [guest]);

  // Handle Login success
  const handleLoginSuccess = (loggedInGuest: Guest) => {
    setGuest(loggedInGuest);
    setActiveTab('home');
    setActiveService(null);
  };

  // Logout action
  const handleLogout = () => {
    setGuest(null);
    setOrders([
      {
        id: 'ord-1',
        type: 'laundry',
        title: 'طلب غسيل وكي ملابس متميز',
        status: 'completed',
        time: '09:30 صباحاً',
        estimatedDelivery: 'تم التسليم والتعليق بالخزانة',
        details: 'بشت ملكي فاخر (عدد ١)، ثوب سعودي ممتاز (عدد ٢)'
      }
    ]);
    setNotifications(initialNotifications);
  };

  // Add a new order from sub-services dynamically
  const handleAddOrder = (newOrderData: {
    type: Order['type'];
    title: string;
    details: string;
    estimatedDelivery: string;
  }) => {
    const newOrder: Order = {
      id: `ord-${Math.floor(Math.random() * 10000)}`,
      type: newOrderData.type,
      title: newOrderData.title,
      status: 'pending',
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      estimatedDelivery: newOrderData.estimatedDelivery,
      details: newOrderData.details
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Push matching real notification dynamically
    const newNotif: Notification = {
      id: `notif-${Math.floor(Math.random() * 10000)}`,
      title: `تأكيد طلب جديد: ${newOrderData.title} ✨`,
      message: `تم استلام تفاصيل طلبك: (${newOrderData.details}) وجاري معالجته وتوجيهه فوراً إلى القسم المختص.`,
      time: 'الآن',
      read: false,
      type: 'order'
    };

    setNotifications((prev) => [newNotif, ...prev]);

    // Switch tab to Requests so they see it!
    setActiveTab('requests');
    setActiveService(null);
  };

  // Mark all notifications read
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Clear single notification
  const handleClearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Trigger emergency call mock
  const handleEmergencyCall = () => {
    setShowEmergencyModal(true);
  };

  const handleExecuteEmergencyCall = () => {
    setEmergencyCalling(true);
    setTimeout(() => {
      setEmergencyCalling(false);
      setShowEmergencyModal(false);
      alert('جاري الاتصال بقسم الطوارئ والأمن الفندقي... يرجى التحدث المباشر عبر الهاتف الملحق بالجناح.');
    }, 2000);
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchSearch = !orderSearch || ord.title.includes(orderSearch) || ord.details.includes(orderSearch);
      const matchStatus = orderStatusFilter === 'all' || ord.status === orderStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  // Navigation from dashboard cards
  const handleDashboardNavigation = (serviceId: string) => {
    // If it corresponds to a footer tab, switch footer tab
    if (serviceId === 'profile' || serviceId === 'notifications' || serviceId === 'bills') {
      if (serviceId === 'bills') {
        setActiveService('bills');
        setActiveTab('requests');
      } else {
        setActiveTab(serviceId as TabType);
        setActiveService(null);
      }
    } else if (serviceId === 'reservation') {
      setActiveService('reservation');
    } else {
      // Open as nested service screen
      setActiveService(serviceId);
    }
  };

  // Helper to render the active tab contents or active nested service screen
  const renderMainContent = () => {
    if (!guest) return null;

    // 1. First prioritize active nested service sub-views
    if (activeService) {
      switch (activeService) {
        case 'room_service':
          return <RoomService onBack={() => setActiveService(null)} onAddOrder={handleAddOrder} />;
        case 'laundry':
          return <Laundry guest={guest} onBack={() => setActiveService(null)} onAddOrder={handleAddOrder} />;
        case 'housekeeping':
          return <Housekeeping guest={guest} onBack={() => setActiveService(null)} onAddOrder={handleAddOrder} />;
        case 'restaurant':
          return <Restaurant onBack={() => setActiveService(null)} onAddOrder={handleAddOrder} />;
        case 'spa':
          return <Spa onBack={() => setActiveService(null)} onAddOrder={handleAddOrder} />;
        case 'taxi':
          return <Taxi onBack={() => setActiveService(null)} onAddOrder={handleAddOrder} />;
        case 'maintenance':
          return <Maintenance guest={guest} onBack={() => setActiveService(null)} onAddOrder={handleAddOrder} />;
        case 'reception':
          return <Reception guest={guest} onBack={() => setActiveService(null)} />;
        case 'bills':
          return <Bills guest={guest} onBack={() => setActiveService(null)} />;
        case 'activities':
          return <Activities onBack={() => setActiveService(null)} onAddOrder={handleAddOrder} />;
        case 'offers':
          return <Offers onBack={() => setActiveService(null)} onAddOrder={handleAddOrder} />;
        case 'faq':
          return <Profile guest={guest} onLogout={handleLogout} />;
        case 'reservation':
          return <Reservation onBack={() => setActiveService(null)} />;
        case 'check_in':
          return <CheckIn onBack={() => setActiveService(null)} />;
        case 'check_out':
          return <CheckOut onBack={() => setActiveService(null)} />;
        case 'my_room':
          return <MyRoom guest={guest} onBack={() => setActiveService(null)} onAddOrder={handleAddOrder} />;
        case 'concierge':
          return <Concierge onBack={() => setActiveService(null)} onAddOrder={handleAddOrder} />;
        case 'facilities':
          return <Facilities onBack={() => setActiveService(null)} onAddOrder={handleAddOrder} />;
        case 'loyalty':
          return <Loyalty guest={guest} onBack={() => setActiveService(null)} />;
        case 'reviews':
          return <Reviews onBack={() => setActiveService(null)} />;
        case 'wallet':
          return <Wallet guest={guest} onBack={() => setActiveService(null)} />;
        case 'stay_timeline':
          return <StayTimeline onBack={() => setActiveService(null)} />;
        default:
          setActiveService(null);
          return null;
      }
    }

    // 2. Otherwise render standard tab view
    switch (activeTab) {
      case 'home':
        return (
          <Dashboard
            guest={guest}
            onNavigateToService={handleDashboardNavigation}
            onEmergencyCall={handleEmergencyCall}
          />
        );
      case 'services':
        // Show a beautiful quick services collection list as main tab backup
        return (
          <Dashboard
            guest={guest}
            onNavigateToService={handleDashboardNavigation}
            onEmergencyCall={handleEmergencyCall}
          />
        );
      case 'requests':
        return (
          <div className="page-container space-y-6 text-right font-sans">
            <div className="flex justify-between items-center pb-2 border-b border-white/5 flex-wrap gap-3">
              <button
                onClick={() => setActiveService('bills')}
                className="text-xs text-[#dfba73] hover:text-[#dfba73]/80 border border-[#dfba73]/20 bg-[#dfba73]/5 px-3 py-1.5 rounded-full font-semibold transition-all touch-target"
                id="btn-requests-billing"
              >
                تفاصيل الفاتورة النشطة
              </button>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">سجل طلباتي النشطة</h1>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input value={orderSearch} onChange={(e) => setOrderSearch(e.target.value)} placeholder="ابحث في الطلبات..."
                  className="w-full bg-black/50 rounded-xl border border-white/10 pr-10 pl-4 py-3 text-sm text-white focus:border-[#dfba73] outline-none" />
              </div>
              <div className="flex flex-wrap gap-2 justify-end">
                {[
                  { id: 'all', label: 'الكل' },
                  { id: 'pending', label: 'قيد المراجعة' },
                  { id: 'preparing', label: 'جاري التحضير' },
                  { id: 'on_the_way', label: 'في الطريق' },
                  { id: 'completed', label: 'مكتمل' },
                ].map((f) => (
                  <button key={f.id} onClick={() => setOrderStatusFilter(f.id as typeof orderStatusFilter)}
                    className={`px-3 py-1.5 rounded-full text-[11px] touch-target ${orderStatusFilter === f.id ? 'bg-[#dfba73]/20 text-[#dfba73]' : 'bg-white/5 text-gray-400'}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="glass-panel rounded-2xl text-center space-y-3">
                <div className="text-4xl">📋</div>
                <h3 className="text-sm font-bold text-gray-400">{orders.length === 0 ? 'لا توجد طلبات جارية' : 'لا توجد نتائج مطابقة'}</h3>
                <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                  {orders.length === 0 ? 'لم تقم بإرسال أي طلبات للجناح بعد. تصفّح قائمة الخدمات الفندقية لطلب الطعام أو حجز السبا.' : 'جرّب تغيير معايير البحث أو الفلتر.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4" id="requests-list">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="glass-panel p-5 rounded-2xl border-white/5 space-y-4 relative overflow-hidden text-right shadow-md"
                  >
                    {/* Header line */}
                    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                      {/* Timeline status badge */}
                      {ord.status === 'pending' && (
                        <span className="px-2.5 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[10px] font-bold rounded-lg font-sans">
                          ⏳ قيد المراجعة الفورية
                        </span>
                      )}
                      {ord.status === 'preparing' && (
                        <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold rounded-lg font-sans animate-pulse">
                          👨‍🍳 جاري التحضير والتجهيز
                        </span>
                      )}
                      {ord.status === 'on_the_way' && (
                        <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold rounded-lg font-sans">
                          🚚 في الطريق إلى جناحك
                        </span>
                      )}
                      {ord.status === 'completed' && (
                        <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded-lg font-sans">
                          ✅ تم تسليم الخدمة بنجاح
                        </span>
                      )}

                      <div className="text-right">
                        <h4 className="text-xs font-bold text-white">{ord.title}</h4>
                        <span className="text-[10px] text-gray-500 font-mono block mt-0.5">{ord.time}</span>
                      </div>
                    </div>

                    {/* Details content */}
                    <p className="text-xs text-gray-400 leading-relaxed font-sans bg-black/20 p-3 rounded-xl border border-white/5">
                      {ord.details}
                    </p>

                    {/* Timeline Tracker visualization */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between items-center text-[10px] text-gray-500">
                        <span className="font-sans text-[#dfba73] font-medium">{ord.estimatedDelivery}</span>
                        <span>الوصول المقدر:</span>
                      </div>
                      
                      {/* 4 stage visual progress line */}
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden flex gap-0.5">
                        <div className={`h-full flex-1 ${ord.status !== 'pending' ? 'bg-[#dfba73]' : 'bg-yellow-500/40'}`} />
                        <div className={`h-full flex-1 ${ord.status === 'preparing' || ord.status === 'on_the_way' || ord.status === 'completed' ? 'bg-[#dfba73]' : 'bg-white/5'}`} />
                        <div className={`h-full flex-1 ${ord.status === 'on_the_way' || ord.status === 'completed' ? 'bg-[#dfba73]' : 'bg-white/5'}`} />
                        <div className={`h-full flex-1 ${ord.status === 'completed' ? 'bg-emerald-400' : 'bg-white/5'}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'notifications':
        return (
          <Notifications
            notifications={notifications}
            onMarkAllRead={handleMarkAllRead}
            onClearNotification={handleClearNotification}
          />
        );
      case 'profile':
        return <Profile guest={guest} onLogout={handleLogout} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white relative">
      <AnimatePresence mode="wait">
        {loading ? (
          /* 1. INITIAL LUXURY LOADING SCREEN */
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        ) : !guest ? (
          /* 2. AUTHENTICATION GUEST GATEWAY */
          <LoginScreen key="login" onLoginSuccess={handleLoginSuccess} />
        ) : (
          /* 3. MAIN PREMIUM PORTAL */
          <motion.div
            key="portal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen relative pb-10"
          >
            {/* Ambient luxury floating background nodes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(223,186,115,0.04)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.05)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

            {/* Render sub-view or active tab */}
            <main className="relative z-10 animate-luxury-fade min-h-[calc(100vh-140px)]">
              {renderMainContent()}
            </main>

            {/* Bottom floating premium footer tab navigator */}
            <FooterNav
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setActiveService(null); // Clear nested sub-views upon navigation
              }}
              cartCount={orders.filter((o) => o.status === 'pending' || o.status === 'preparing' || o.status === 'on_the_way').length}
              unreadNotifications={unreadNotificationsCount}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emergency Alert Modal */}
      <AnimatePresence>
        {showEmergencyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEmergencyModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-sm glass-panel p-6 rounded-2xl border-red-500/30 text-right space-y-4"
              id="emergency-modal"
            >
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6 text-red-500 animate-pulse" />
              </div>

              <div className="space-y-1.5 text-center">
                <h3 className="font-serif text-base font-bold text-red-400">الخط الهاتفي الساخن للطوارئ</h3>
                <p className="text-xs text-gray-300 leading-relaxed max-w-xs mx-auto">
                  أنت على وشك تفعيل اتصال طوارئ مباشر وآمن بقسم العمليات والأمن الداخلي للمنتجع. يرجى تفعيل هذا البلاغ فقط للحالات العاجلة الحقيقية.
                </p>
              </div>

              <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-center font-mono text-[#dfba73] text-sm">
                مكالمة طوارئ داخلية: 99
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowEmergencyModal(false)}
                  className="py-3 bg-white/5 hover:bg-white/10 text-xs text-gray-400 hover:text-white rounded-xl font-medium transition-colors cursor-pointer text-center"
                >
                  إلغاء الطلب
                </button>
                <button
                  type="button"
                  onClick={handleExecuteEmergencyCall}
                  className="py-3 bg-red-600 hover:bg-red-500 text-xs text-white rounded-xl font-bold transition-all shadow-[0_0_12px_rgba(239,68,68,0.3)] cursor-pointer flex items-center justify-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>بدء الاتصال الفوري</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
