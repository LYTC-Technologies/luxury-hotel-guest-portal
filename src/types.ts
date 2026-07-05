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
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'breakfast' | 'main' | 'dessert' | 'drinks';
  isOffer?: boolean;
  offerPrice?: number;
  isChefSpecial?: boolean;
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
  type: 'info' | 'order' | 'billing' | 'spa';
}

export interface Message {
  id: string;
  sender: 'guest' | 'reception';
  text: string;
  time: string;
}

export interface Order {
  id: string;
  type: 'room_service' | 'laundry' | 'housekeeping' | 'spa' | 'restaurant' | 'taxi' | 'maintenance' | 'activities' | 'offers';
  title: string;
  status: 'pending' | 'preparing' | 'on_the_way' | 'completed';
  time: string;
  estimatedDelivery?: string;
  details: string;
}
