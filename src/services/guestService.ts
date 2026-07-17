/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import axios from 'axios';

const API_BASE_URL = 'https://lytc-hotel-backend.onrender.com';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {}, {
          headers: {
            Cookie: `refreshToken=${refreshToken}`,
          },
        });
        const { token } = response.data;
        localStorage.setItem('accessToken', token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
  userId: number;
  username: string;
  tokenType: string;
}

export interface MenuItemResponse {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  available: boolean;
}

export interface Pageable {
  page: number;
  size: number;
  sort?: string[];
}

export interface PageMenuItemResponse {
  content: MenuItemResponse[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface StayDetailsResponse {
  stayId: number;
  checkInTime: string;
  expectedCheckOutDate: string;
  checkOutTime: string;
  status: string;
  stars: number;
  notes: string;
  roomCharge: number;
  totalCharge: number;
  guestId: number;
  guestName: string;
  guestPhone: string;
  roomId: number;
  roomNumber: string;
  floor: number;
  description: string;
  maxAdults: number;
  maxKids: number;
  numAdults: number;
  numKids: number;
}

// API 1: Authentication - Login
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/api/auth/login', credentials);
  
  // Store tokens
  if (response.data.token) {
    localStorage.setItem('accessToken', response.data.token);
    localStorage.setItem('userId', response.data.userId.toString());
    localStorage.setItem('username', response.data.username);
    localStorage.setItem('role', response.data.role);
  }
  
  return response.data;
};

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/api/auth/logout');
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }
};

// API 2: Get Menu Items
export const getMenu = async (
  category?: string,
  pageable: Pageable = { page: 0, size: 20 }
): Promise<PageMenuItemResponse> => {
  const params: Record<string, any> = {
    page: pageable.page,
    size: pageable.size,
  };
  
  if (category) {
    params.category = category;
  }
  
  if (pageable.sort && pageable.sort.length > 0) {
    params.sort = pageable.sort;
  }
  
  const response = await apiClient.get<PageMenuItemResponse>('/api/guest/menu', { params });
  return response.data;
};

// API 3: Get Stay Details
export const getStayDetails = async (roomNumber: string): Promise<StayDetailsResponse> => {
  const response = await apiClient.get<StayDetailsResponse>('/api/guest/stay-details', {
    params: { roomNumber },
  });
  return response.data;
};

// Helper function to get current room number from localStorage
export const getCurrentRoomNumber = (): string | null => {
  return localStorage.getItem('roomNumber');
};

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('accessToken');
};

// Helper function to get current user role
export const getCurrentUserRole = (): string | null => {
  return localStorage.getItem('role');
};

// Additional Types for Orders
export interface OrderItemRequest {
  menuItemId: number;
  quantity: number;
  notes?: string;
}

export interface CreateOrderRequest {
  category: 'FOOD' | 'DRINK' | 'SERVICE';
  items: OrderItemRequest[];
}

export interface OrderItemDetailResponse {
  id: number;
  menuItemId: number;
  itemName: string;
  quantity: number;
  unitPrice: string;
  notes: string;
}

export interface OrderResponse {
  orderId: number;
  roomNumber: string;
  guestName: string;
  category: string;
  totalAmount: string;
  status: string;
  createdAt: string;
  completedAt: string;
  items: OrderItemDetailResponse[];
}

export interface PageOrderResponse {
  content: OrderResponse[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

// Guest Order APIs
export const createOrder = async (
  roomNumber: string,
  orderData: CreateOrderRequest
): Promise<OrderResponse> => {
  const response = await apiClient.post<OrderResponse>('/api/guest/orders', orderData, {
    params: { roomNumber },
  });
  return response.data;
};

export const getOrderHistory = async (
  roomNumber: string,
  pageable: Pageable = { page: 0, size: 20 }
): Promise<PageOrderResponse> => {
  const params: Record<string, any> = {
    roomNumber,
    page: pageable.page,
    size: pageable.size,
  };
  
  if (pageable.sort && pageable.sort.length > 0) {
    params.sort = pageable.sort;
  }
  
  const response = await apiClient.get<PageOrderResponse>('/api/guest/orders', { params });
  return response.data;
};

export const getOrderDetails = async (
  orderId: number,
  roomNumber: string
): Promise<OrderResponse> => {
  const response = await apiClient.get<OrderResponse>(`/api/guest/orders/${orderId}`, {
    params: { roomNumber },
  });
  return response.data;
};

export const cancelOrder = async (
  orderId: number,
  roomNumber: string
): Promise<OrderResponse> => {
  const response = await apiClient.post<OrderResponse>(`/api/guest/orders/${orderId}/cancel`, {}, {
    params: { roomNumber },
  });
  return response.data;
};

// Special Offers Types
export interface SpecialOfferResponse {
  id: number;
  title: string;
  description: string;
}

export interface PageSpecialOfferResponse {
  content: SpecialOfferResponse[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

// Guest Special Offers API
export const getSpecialOffers = async (
  pageable: Pageable = { page: 0, size: 20 }
): Promise<PageSpecialOfferResponse> => {
  const params: Record<string, any> = {
    page: pageable.page,
    size: pageable.size,
  };
  
  if (pageable.sort && pageable.sort.length > 0) {
    params.sort = pageable.sort;
  }
  
  const response = await apiClient.get<PageSpecialOfferResponse>('/api/guest/special-offers', { params });
  return response.data;
};

// Special Orders Types
export interface SpecialOrderResponse {
  id: number;
  stayId: number;
  specialOffer: SpecialOfferResponse;
  agreedPrice: number;
  createdAt: string;
}

// Guest Special Orders API
export const getSpecialOrders = async (roomNumber: string): Promise<SpecialOrderResponse[]> => {
  const response = await apiClient.get<SpecialOrderResponse[]>('/api/guest/stays/special-orders', {
    params: { roomNumber },
  });
  return response.data;
};

// Rate Stay Types
export interface RateStayRequest {
  stars: number;
  notes?: string;
}

// Rate Stay API
export const rateStay = async (
  roomNumber: string,
  ratingData: RateStayRequest
): Promise<StayDetailsResponse> => {
  const response = await apiClient.put<StayDetailsResponse>('/api/guest/stay/rating', ratingData, {
    params: { roomNumber },
  });
  return response.data;
};
