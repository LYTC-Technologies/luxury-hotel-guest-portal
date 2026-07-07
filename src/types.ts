/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Guest {
  name: string;
  roomNumber: string;
  lastName: string;
  reservationNumber: string;
  checkInDate: string;
  checkOutDate: string;
  hotelName: string;
  roomType: string;
  bedType: string;
  guestCount: number;
  childrenCount: number;
  loyaltyPoints: number;
  balanceDue: number;
  paidAmount: number;
  totalAmount: number;
  taxes: number;
  discounts: number;
  promoCode: string;
  reservationStatus: 'مؤكد' | 'قيد المراجعة' | 'ملغى';
  email: string;
  phone: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'drinks' | 'coffee' | 'kids' | 'snacks';
  isOffer?: boolean;
  offerPrice?: number;
  isChefSpecial?: boolean;
  isVegetarian?: boolean;
  isHalal?: boolean;
  isGlutenFree?: boolean;
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
  notes?: string;
}

export interface LaundryItem {
  id: string;
  name: string;
  price: number;
  category: 'men' | 'women' | 'dryclean';
}

export interface LaundryCartItem {
  item: LaundryItem;
  quantity: number;
}

export interface SpaService {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  image: string;
}

export interface Therapist {
  id: string;
  name: string;
  gender: 'male' | 'female';
  rating: number;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  price: number;
  image: string;
  location: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code?: string;
  image: string;
  discount?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  date: string;
  amount: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'order' | 'billing' | 'spa' | 'promo' | 'concierge';
}

export interface Message {
  id: string;
  sender: 'guest' | 'reception';
  text: string;
  time: string;
}

export interface Order {
  id: string;
  type: 'room_service' | 'laundry' | 'housekeeping' | 'spa' | 'restaurant' | 'taxi' | 'maintenance' | 'activities' | 'offers' | 'concierge' | 'facilities';
  title: string;
  status: 'pending' | 'preparing' | 'on_the_way' | 'completed';
  time: string;
  estimatedDelivery?: string;
  details: string;
}

export interface ReservationHistory {
  id: string;
  reservationNumber: string;
  hotelName: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  status: 'مكتمل' | 'ملغى' | 'قادم';
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  icon: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface HotelFacility {
  id: string;
  name: string;
  description: string;
  hours: string;
  location: string;
  capacity: string;
  availability: string;
  image: string;
}

export interface HotelAnnouncement {
  id: string;
  title: string;
  message: string;
  date: string;
  priority: 'high' | 'normal';
}

export interface TodayEvent {
  id: string;
  title: string;
  time: string;
  location: string;
}

export interface ConciergeService {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'transport' | 'dining' | 'tourism' | 'shopping' | 'emergency' | 'finance';
}

export interface Review {
  id: string;
  guestName: string;
  rating: number;
  comment: string;
  date: string;
  category: string;
}

export interface LoyaltyTier {
  name: string;
  points: number;
  nextTier: string;
  pointsToNext: number;
  benefits: string[];
}

export interface WalletTransaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
}

export interface LocalPlace {
  id: string;
  name: string;
  description: string;
  distance: string;
  category: string;
  image: string;
}

export interface FavoriteOrder {
  id: string;
  title: string;
  items: string;
  lastOrdered: string;
}
