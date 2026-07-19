/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = 'https://lytc-hotel-backend.onrender.com';

// Create axios instance for guest API
const guestClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
guestClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh and errors
guestClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized - attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, { refreshToken });
        const { token } = response.data;
        localStorage.setItem('accessToken', token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return guestClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('guestInfo');
        window.location.hash = '/';
        return Promise.reject(refreshError);
      }
    }
    
    // Handle other HTTP errors gracefully
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
    } else {
      // Error in request setup
      console.error('Request Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// ==================== HELPER METHODS ====================

/**
 * Generic GET request helper
 */
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await guestClient.get<T>(url, config);
  return response.data;
};

/**
 * Generic POST request helper
 */
export const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await guestClient.post<T>(url, data, config);
  return response.data;
};

/**
 * Generic PUT request helper
 */
export const put = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await guestClient.put<T>(url, data, config);
  return response.data;
};

/**
 * Generic DELETE request helper
 */
export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await guestClient.delete<T>(url, config);
  return response.data;
};

/**
 * Generic PATCH request helper
 */
export const patch = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await guestClient.patch<T>(url, data, config);
  return response.data;
};

// ==================== TYPES ====================

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export interface Pageable {
  page: number;
  size: number;
  sort?: string[];
}

export interface MenuItemResponse {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  available: boolean;
}

export interface OrderItemResponse {
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
  completedAt?: string;
  items: OrderItemResponse[];
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

export interface CreateOrderRequest {
  category: string;
  items: {
    menuItemId: number;
    quantity: number;
    notes: string;
  }[];
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

// ==================== AUTHENTICATION APIs ====================

/**
 * Login with username (room number) and password
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  return post<LoginResponse>('/api/auth/login', credentials);
};

/**
 * Logout - clears tokens and redirects to login
 */
export const logout = async (): Promise<void> => {
  try {
    await post<void>('/api/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('guestInfo');
    localStorage.removeItem('roomNumber');
  }
};

// ==================== MENU APIs ====================

/**
 * Get menu items with optional category filter and pagination
 */
export const getMenu = async (
  category?: string,
  pageable: Pageable = { page: 0, size: 20 }
): Promise<PageMenuItemResponse> => {
  const params: Record<string, any> = {
    page: pageable.page,
    size: pageable.size,
  };
  
  if (category) params.category = category;
  if (pageable.sort && pageable.sort.length > 0) params.sort = pageable.sort;
  
  return get<PageMenuItemResponse>('/api/guest/menu', { params });
};

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

// ==================== ORDER APIs ====================

/**
 * Create a new order
 */
export const createOrder = async (roomNumber: string, orderData: CreateOrderRequest): Promise<OrderResponse> => {
  return post<OrderResponse>(`/api/guest/orders/${roomNumber}`, orderData);
};

/**
 * Get order history for a room
 */
export const getOrderHistory = async (
  roomNumber: string,
  pageable: Pageable = { page: 0, size: 20 }
): Promise<PageOrderResponse> => {
  const params: Record<string, any> = {
    page: pageable.page,
    size: pageable.size,
  };
  
  if (pageable.sort && pageable.sort.length > 0) params.sort = pageable.sort;
  
  return get<PageOrderResponse>(`/api/guest/orders/${roomNumber}`, { params });
};

/**
 * Get order details by order ID
 */
export const getOrderDetails = async (orderId: number): Promise<OrderResponse> => {
  return get<OrderResponse>(`/api/guest/orders/details/${orderId}`);
};

/**
 * Cancel an order
 */
export const cancelOrder = async (orderId: number): Promise<OrderResponse> => {
  return patch<OrderResponse>(`/api/guest/orders/${orderId}/cancel`);
};

// ==================== STAY DETAILS API ====================

/**
 * Get stay details by room number
 */
export const getStayDetails = async (roomNumber: string): Promise<StayDetailsResponse> => {
  return get<StayDetailsResponse>(`/api/guest/stays/${roomNumber}`);
};

// ==================== SPECIAL OFFERS API ====================

/**
 * Get special offers with pagination
 */
export const getSpecialOffers = async (
  pageable: Pageable = { page: 0, size: 20 }
): Promise<PageSpecialOfferResponse> => {
  const params: Record<string, any> = {
    page: pageable.page,
    size: pageable.size,
  };
  
  if (pageable.sort && pageable.sort.length > 0) params.sort = pageable.sort;
  
  return get<PageSpecialOfferResponse>('/api/guest/special-offers', { params });
};
