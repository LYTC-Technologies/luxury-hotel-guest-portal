/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PhoneCall, AlertTriangle, ShieldCheck, X, Search } from 'lucide-react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Data & Types
import { Guest, Order } from './types';
import { logout } from './services/guestApi';
import { RoomProvider } from './contexts/RoomContext';
import { getOrderHistory, cancelOrder } from './services/guestApi';
import { useRoom } from './contexts/RoomContext';

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
import Orders from './components/Orders';
import { hotelDetails } from './data';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('services');
  const [activeService, setActiveService] = useState<string | null>(null);
  const location = useLocation();
  const { roomNumber, setRoomNumber: setContextRoomNumber } = useRoom();

  // Restore tab and service from localStorage
  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab') as TabType;
    const savedService = localStorage.getItem('activeService');

    if (savedTab) {
      setActiveTab(savedTab);
    }
    if (savedService) {
      setActiveService(savedService);
    }
  }, []);

  // Save activeTab and activeService to localStorage
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (activeService) {
      localStorage.setItem('activeService', activeService);
    } else {
      localStorage.removeItem('activeService');
    }
  }, [activeService]);

  // Fetch order history from API when guest is logged in
  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (!guest || !roomNumber) return;

      // Skip API fetch if using mock login (no auth token)
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      try {
        const response = await getOrderHistory(roomNumber, { page: 0, size: 20 });
        
        // Convert API response to Order format
        const apiOrders: Order[] = response.content.map((order: any) => ({
          id: order.orderId.toString(),
          type: order.category === 'FOOD' ? 'room_service' : 
                order.category === 'DRINK' ? 'room_service' : 
                order.category === 'SERVICE' ? 'laundry' : 'room_service',
          title: `طلب #${order.orderId}`,
          status: order.status === 'COMPLETED' ? 'completed' :
                  order.status === 'PENDING' ? 'pending' :
                  order.status === 'CANCELLED' ? 'cancelled' : 'pending',
          time: new Date(order.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
          estimatedDelivery: order.completedAt ? 'تم التوصيل' : 'قيد المعالجة',
          details: order.items.map((item: any) => `${item.itemName} (عدد ${item.quantity})`).join(', ')
        }));

        setOrders(apiOrders);
      } catch (error: any) {
        // Handle 404 (no active stay) gracefully - expected with mock login
        if (error.response?.status === 404) {
          // Silent fail - no active stay found
          return;
        }
        console.error('Failed to fetch order history:', error);
        // Keep default orders on error
      }
    };

    fetchOrderHistory();
  }, [guest, roomNumber]);
  
  // Real state for orders
  const [orders, setOrders] = useState<Order[]>([]);

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
    setActiveTab('services');
    setActiveService(null);
  };

  // Add a new order from sub-services dynamically
  const handleAddOrder = async (newOrderData: {
    type: Order['type'];
    title: string;
    details: string;
    estimatedDelivery: string;
  }) => {
    // Refresh orders from API to get the latest
    if (roomNumber) {
      try {
        const response = await getOrderHistory(roomNumber, { page: 0, size: 20 });
        
        // Convert API response to Order format
        const apiOrders: Order[] = response.content.map((order: any) => ({
          id: order.orderId.toString(),
          type: order.category === 'FOOD' ? 'room_service' : 
                order.category === 'DRINK' ? 'room_service' : 
                order.category === 'SERVICE' ? 'laundry' : 'room_service',
          title: `طلب #${order.orderId}`,
          status: order.status === 'COMPLETED' ? 'completed' :
                  order.status === 'PENDING' ? 'pending' :
                  order.status === 'CANCELLED' ? 'cancelled' : 'pending',
          time: new Date(order.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
          estimatedDelivery: order.completedAt ? 'تم التوصيل' : 'قيد المعالجة',
          details: order.items.map((item: any) => `${item.itemName} (عدد ${item.quantity})`).join(', ')
        }));

        setOrders(apiOrders);
      } catch (error) {
        console.error('Failed to refresh orders:', error);
      }
    }

    // Switch tab to Requests so they see it!
    setActiveTab('requests');
    setActiveService(null);
  };

  // Cancel an order
  const handleCancelOrder = async (orderId: string) => {
    try {
      // Try to cancel via API if it's a numeric order ID (from backend)
      const numericOrderId = parseInt(orderId.replace('ord-', ''));
      if (!isNaN(numericOrderId)) {
        await cancelOrder(numericOrderId);
      }

      // Update local state
      setOrders((prev) =>
        prev.map((ord) =>
          ord.id === orderId ? { ...ord, status: 'cancelled' } : ord
        )
      );

    } catch (error) {
      console.error('Failed to cancel order:', error);
      alert('فشل إلغاء الطلب. يرجى المحاولة مرة أخرى.');
    }
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

  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchSearch = !orderSearch || ord.title.includes(orderSearch) || ord.details.includes(orderSearch);
      const matchStatus = orderStatusFilter === 'all' || ord.status === orderStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  // Navigation from dashboard cards
  const handleDashboardNavigation = (serviceId: string) => {
    // Don't navigate for requests and special-orders
    if (serviceId === 'requests' || serviceId === 'special-orders') {
      return;
    } else if (serviceId === 'bills') {
      setActiveService('bills');
      setActiveTab('requests');
    } else {
      // Open as nested service screen
      setActiveService(serviceId);
    }
  };

  // Sync URL with state
  useEffect(() => {
    if (activeService) {
      window.location.hash = `/${activeService}`;
    } else if (activeTab === 'home') {
      window.location.hash = '/';
    } else {
      window.location.hash = `/${activeTab}`;
    }
  }, [activeService, activeTab]);

  // Handle URL changes from user input
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    
    // If on login screen, force URL to home
    if (!guest) {
      if (hash !== '/' && hash !== '') {
        window.location.hash = '/';
      }
      return;
    }

    // If logged in, parse URL and update state
    if (hash === '/' || hash === '') {
      setActiveTab('services');
      setActiveService(null);
    } else if (hash.startsWith('/')) {
      const path = hash.substring(1);
      
      // Check if it's a service or a tab
      const services = ['room_service', 'laundry', 'spa', 'restaurant', 'taxi', 'maintenance', 'reception', 'bills', 'activities', 'offers', 'reservation', 'check_in', 'check_out', 'my_room', 'concierge', 'facilities', 'loyalty', 'reviews', 'wallet', 'stay_timeline'];
      const tabs = ['services', 'requests'];
      
      if (services.includes(path)) {
        setActiveService(path);
      } else if (tabs.includes(path)) {
        setActiveTab(path as TabType);
        setActiveService(null);
      }
    }
  }, [guest]);

  // Helper to render the active tab contents or active nested service screen
  const renderMainContent = () => {
    if (!guest) return null;

    // 1. First prioritize active nested service sub-views
    if (activeService) {
      switch (activeService) {
        case 'room_service':
          return <RoomService onBack={() => { setActiveService(null); setActiveTab('services'); }} onAddOrder={handleAddOrder} />;
        case 'laundry':
          return <Laundry guest={guest} onBack={() => { setActiveService(null); setActiveTab('services'); }} onAddOrder={handleAddOrder} />;
        case 'housekeeping':
          return <Housekeeping guest={guest} onBack={() => { setActiveService(null); setActiveTab('services'); }} onAddOrder={handleAddOrder} />;
        case 'restaurant':
          return <Restaurant onBack={() => { setActiveService(null); setActiveTab('services'); }} onAddOrder={handleAddOrder} />;
        case 'spa':
          return <Spa onBack={() => { setActiveService(null); setActiveTab('services'); }} onAddOrder={handleAddOrder} />;
        case 'taxi':
          return <Taxi onBack={() => { setActiveService(null); setActiveTab('services'); }} onAddOrder={handleAddOrder} />;
        case 'maintenance':
          return <Maintenance guest={guest} onBack={() => { setActiveService(null); setActiveTab('services'); }} onAddOrder={handleAddOrder} />;
        case 'reception':
          return <Reception guest={guest} onBack={() => { setActiveService(null); setActiveTab('services'); }} />;
        case 'bills':
          return <Bills guest={guest} onBack={() => { setActiveService(null); setActiveTab('services'); }} />;
        case 'activities':
          return <Activities onBack={() => { setActiveService(null); setActiveTab('services'); }} onAddOrder={handleAddOrder} />;
        case 'offers':
          return <Offers onBack={() => { setActiveService(null); setActiveTab('services'); }} onAddOrder={handleAddOrder} />;
        case 'reservation':
          return <Reservation 
            onBack={() => { setActiveService(null); setActiveTab('services'); }} 
            guestName={guest.name}
            guestLastName={guest.lastName}
            reservationNumber={guest.reservationNumber}
            email={guest.email}
            phone={guest.phone}
            roomNumber={guest.roomNumber}
            roomType={guest.roomType}
            checkInDate={guest.checkInDate}
            checkOutDate={guest.checkOutDate}
          />;
        case 'check_in':
          return <CheckIn 
            onBack={() => { setActiveService(null); setActiveTab('services'); }} 
            guestPhone={guest.phone}
            guestName={guest.name}
            guestLastName={guest.lastName}
            roomNumber={guest.roomNumber}
            roomType={guest.roomType}
            checkInDate={guest.checkInDate}
            checkOutDate={guest.checkOutDate}
          />;
        case 'check_out':
          return <CheckOut 
            onBack={() => { setActiveService(null); setActiveTab('services'); }} 
            roomNumber={guest.roomNumber}
            checkOutDate={guest.checkOutDate}
            totalAmount={guest.totalAmount}
            paidAmount={guest.paidAmount}
            balanceDue={guest.balanceDue}
            loyaltyPoints={guest.loyaltyPoints}
          />;
        case 'my_room':
          return <MyRoom guest={guest} onBack={() => { setActiveService(null); setActiveTab('services'); }} onAddOrder={handleAddOrder} />;
        case 'concierge':
          return <Concierge onBack={() => { setActiveService(null); setActiveTab('services'); }} onAddOrder={handleAddOrder} />;
        case 'facilities':
          return <Facilities onBack={() => { setActiveService(null); setActiveTab('services'); }} onAddOrder={handleAddOrder} />;
        case 'loyalty':
          return <Loyalty guest={guest} onBack={() => { setActiveService(null); setActiveTab('services'); }} />;
        case 'reviews':
          return <Reviews onBack={() => { setActiveService(null); setActiveTab('services'); }} />;
        case 'wallet':
          return <Wallet guest={guest} onBack={() => { setActiveService(null); setActiveTab('services'); }} />;
        case 'stay_timeline':
          return <StayTimeline onBack={() => { setActiveService(null); setActiveTab('services'); }} />;
        default:
          setActiveService(null);
          setActiveTab('services');
          return null;
      }
    }

    // 2. Otherwise render standard tab view
    switch (activeTab) {
      case 'services':
        return (
          <Dashboard
            guest={guest}
            onNavigateToService={handleDashboardNavigation}
            onEmergencyCall={handleEmergencyCall}
          />
        );
      case 'requests':
        return <Orders onAddOrder={handleAddOrder} />;
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
          /* 2. LOGIN SCREEN */
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

export default function App() {
  return (
    <HashRouter>
      <RoomProvider>
        <AppContent />
      </RoomProvider>
    </HashRouter>
  );
}
