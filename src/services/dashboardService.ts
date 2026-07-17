/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import axios from 'axios';

const API_BASE_URL = 'https://lytc-hotel-backend.onrender.com';

// Create axios instance for dashboard
const dashboardClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
dashboardClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh
dashboardClient.interceptors.response.use(
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
        return dashboardClient(originalRequest);
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

// Common Types
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

export interface CreateMenuItemRequest {
  name: string;
  description?: string;
  price: number;
  available?: boolean;
}

export interface UpdateMenuItemRequest {
  name: string;
  description?: string;
  price: number;
  available?: boolean;
}

export interface PatchMenuItemRequest {
  name?: string;
  description?: string;
  price?: number;
  available?: boolean;
}

export interface OrderItemDetailResponse {
  id: number;
  menuItemId: number;
  itemName: string;
  quantity: number;
  unitPrice: string;
  notes: string;
}

export interface PendingOrdersResponse {
  orderId: number;
  roomNumber: string;
  guestName: string;
  category: string;
  totalAmount: string;
  orderStatus: string;
  createdAt: string;
  items: OrderItemDetailResponse[];
}

export interface UpdateOrderStatusRequest {
  status: string;
}

export interface DashboardStatsResponse {
  totalOrders: number;
  totalRevenue: string;
  averageOrderValue: string;
  averagePreparationTimeMinutes: number;
  completedOrders: number;
}

// ==================== ROOM SERVICE DASHBOARD APIs ====================

export const createRoomServiceMenuItem = async (
  menuItemData: CreateMenuItemRequest
): Promise<MenuItemResponse> => {
  const response = await dashboardClient.post<MenuItemResponse>('/api/dashboard/room-service/menu', menuItemData);
  return response.data;
};

export const updateRoomServiceMenuItem = async (
  id: number,
  menuItemData: UpdateMenuItemRequest
): Promise<MenuItemResponse> => {
  const response = await dashboardClient.put<MenuItemResponse>(`/api/dashboard/room-service/menu/${id}`, menuItemData);
  return response.data;
};

export const patchRoomServiceMenuItem = async (
  id: number,
  menuItemData: PatchMenuItemRequest
): Promise<MenuItemResponse> => {
  const response = await dashboardClient.patch<MenuItemResponse>(`/api/dashboard/room-service/menu/${id}`, menuItemData);
  return response.data;
};

export const updateRoomServiceOrderStatus = async (
  orderId: number,
  statusData: UpdateOrderStatusRequest
): Promise<PendingOrdersResponse> => {
  const response = await dashboardClient.patch<PendingOrdersResponse>(
    `/api/dashboard/room-service/orders/${orderId}/status`,
    statusData
  );
  return response.data;
};

export const getRoomServiceStats = async (): Promise<DashboardStatsResponse> => {
  const response = await dashboardClient.get<DashboardStatsResponse>('/api/dashboard/room-service/stats');
  return response.data;
};

export const getRoomServicePendingOrders = async (): Promise<PendingOrdersResponse[]> => {
  const response = await dashboardClient.get<PendingOrdersResponse[]>('/api/dashboard/room-service/pending-orders');
  return response.data;
};

// ==================== RESTAURANT DASHBOARD APIs ====================

export const createRestaurantMenuItem = async (
  menuItemData: CreateMenuItemRequest
): Promise<MenuItemResponse> => {
  const response = await dashboardClient.post<MenuItemResponse>('/api/dashboard/restaurant/menu', menuItemData);
  return response.data;
};

export const updateRestaurantMenuItem = async (
  id: number,
  menuItemData: UpdateMenuItemRequest
): Promise<MenuItemResponse> => {
  const response = await dashboardClient.put<MenuItemResponse>(`/api/dashboard/restaurant/menu/${id}`, menuItemData);
  return response.data;
};

export const patchRestaurantMenuItem = async (
  id: number,
  menuItemData: PatchMenuItemRequest
): Promise<MenuItemResponse> => {
  const response = await dashboardClient.patch<MenuItemResponse>(`/api/dashboard/restaurant/menu/${id}`, menuItemData);
  return response.data;
};

export const updateRestaurantOrderStatus = async (
  orderId: number,
  statusData: UpdateOrderStatusRequest
): Promise<PendingOrdersResponse> => {
  const response = await dashboardClient.patch<PendingOrdersResponse>(
    `/api/dashboard/restaurant/orders/${orderId}/status`,
    statusData
  );
  return response.data;
};

export const getRestaurantStats = async (): Promise<DashboardStatsResponse> => {
  const response = await dashboardClient.get<DashboardStatsResponse>('/api/dashboard/restaurant/stats');
  return response.data;
};

export const getRestaurantPendingOrders = async (): Promise<PendingOrdersResponse[]> => {
  const response = await dashboardClient.get<PendingOrdersResponse[]>('/api/dashboard/restaurant/pending-orders');
  return response.data;
};

// ==================== CAFE DASHBOARD APIs ====================

export const createCafeMenuItem = async (
  menuItemData: CreateMenuItemRequest
): Promise<MenuItemResponse> => {
  const response = await dashboardClient.post<MenuItemResponse>('/api/dashboard/cafe/menu', menuItemData);
  return response.data;
};

export const updateCafeMenuItem = async (
  id: number,
  menuItemData: UpdateMenuItemRequest
): Promise<MenuItemResponse> => {
  const response = await dashboardClient.put<MenuItemResponse>(`/api/dashboard/cafe/menu/${id}`, menuItemData);
  return response.data;
};

export const patchCafeMenuItem = async (
  id: number,
  menuItemData: PatchMenuItemRequest
): Promise<MenuItemResponse> => {
  const response = await dashboardClient.patch<MenuItemResponse>(`/api/dashboard/cafe/menu/${id}`, menuItemData);
  return response.data;
};

export const updateCafeOrderStatus = async (
  orderId: number,
  statusData: UpdateOrderStatusRequest
): Promise<PendingOrdersResponse> => {
  const response = await dashboardClient.patch<PendingOrdersResponse>(
    `/api/dashboard/cafe/orders/${orderId}/status`,
    statusData
  );
  return response.data;
};

export const getCafeStats = async (): Promise<DashboardStatsResponse> => {
  const response = await dashboardClient.get<DashboardStatsResponse>('/api/dashboard/cafe/stats');
  return response.data;
};

export const getCafePendingOrders = async (): Promise<PendingOrdersResponse[]> => {
  const response = await dashboardClient.get<PendingOrdersResponse[]>('/api/dashboard/cafe/pending-orders');
  return response.data;
};

// ==================== MANAGER DASHBOARD APIs ====================

export interface UserResponse {
  id: number;
  username: string;
  role: string;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  role: string;
}

export interface UpdateUserRequest {
  username: string;
  password?: string;
  role: string;
}

export interface PageUserResponse {
  content: UserResponse[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface EmployeeResponse {
  id: number;
  fullName: string;
  phone: string;
  job: string;
  department: string;
  status: string;
}

export interface CreateEmployeeRequest {
  fullName: string;
  phone: string;
  job: string;
  department: string;
}

export interface UpdateEmployeeStatusRequest {
  status: string;
}

export interface PageEmployeeResponse {
  content: EmployeeResponse[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface VipResponse {
  id: number;
  fullName: string;
  phone: string;
  nationality: string;
  notes: string;
}

export interface CreateVipRequest {
  fullName: string;
  phone: string;
  nationality?: string;
  notes?: string;
}

export interface PageVipResponse {
  content: VipResponse[];
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

export interface PageStayDetailsResponse {
  content: StayDetailsResponse[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface SpecialOrderResponse {
  id: number;
  stayId: number;
  specialOffer: {
    id: number;
    title: string;
    description: string;
  };
  agreedPrice: number;
  createdAt: string;
}

export interface PageSpecialOrderResponse {
  content: SpecialOrderResponse[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface ManagerOverviewResponse {
  totalPendingOrders: number;
  totalOrdersCompletedToday: number;
  totalRevenueToday: string;
  occupancyRate: number;
  occupiedRooms: number;
  totalRooms: number;
}

// User Management
export const getUsers = async (pageable: Pageable = { page: 0, size: 20 }): Promise<PageUserResponse> => {
  const params: Record<string, any> = {
    page: pageable.page,
    size: pageable.size,
  };
  
  if (pageable.sort && pageable.sort.length > 0) {
    params.sort = pageable.sort;
  }
  
  const response = await dashboardClient.get<PageUserResponse>('/api/dashboard/manager/users', { params });
  return response.data;
};

export const createUser = async (userData: CreateUserRequest): Promise<UserResponse> => {
  const response = await dashboardClient.post<UserResponse>('/api/dashboard/manager/users', userData);
  return response.data;
};

export const updateUser = async (id: number, userData: UpdateUserRequest): Promise<UserResponse> => {
  const response = await dashboardClient.put<UserResponse>(`/api/dashboard/manager/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await dashboardClient.delete(`/api/dashboard/manager/users/${id}`);
};

// Employee Management
export const getEmployees = async (
  status?: string,
  department?: string,
  pageable: Pageable = { page: 0, size: 20 }
): Promise<PageEmployeeResponse> => {
  const params: Record<string, any> = {
    page: pageable.page,
    size: pageable.size,
  };
  
  if (status) params.status = status;
  if (department) params.department = department;
  if (pageable.sort && pageable.sort.length > 0) params.sort = pageable.sort;
  
  const response = await dashboardClient.get<PageEmployeeResponse>('/api/dashboard/manager/employees', { params });
  return response.data;
};

export const createEmployee = async (employeeData: CreateEmployeeRequest): Promise<EmployeeResponse> => {
  const response = await dashboardClient.post<EmployeeResponse>('/api/dashboard/manager/employees', employeeData);
  return response.data;
};

export const updateEmployeeStatus = async (
  id: number,
  statusData: UpdateEmployeeStatusRequest
): Promise<EmployeeResponse> => {
  const response = await dashboardClient.put<EmployeeResponse>(
    `/api/dashboard/manager/employees/${id}/status`,
    statusData
  );
  return response.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await dashboardClient.delete(`/api/dashboard/manager/employees/${id}`);
};

// VIP Management
export const getVips = async (
  nationality?: string,
  pageable: Pageable = { page: 0, size: 20 }
): Promise<PageVipResponse> => {
  const params: Record<string, any> = {
    page: pageable.page,
    size: pageable.size,
  };
  
  if (nationality) params.nationality = nationality;
  if (pageable.sort && pageable.sort.length > 0) params.sort = pageable.sort;
  
  const response = await dashboardClient.get<PageVipResponse>('/api/dashboard/manager/vips', { params });
  return response.data;
};

export const createVip = async (vipData: CreateVipRequest): Promise<VipResponse> => {
  const response = await dashboardClient.post<VipResponse>('/api/dashboard/manager/vips', vipData);
  return response.data;
};

export const deleteVip = async (id: number): Promise<void> => {
  await dashboardClient.delete(`/api/dashboard/manager/vips/${id}`);
};

// Stay Management
export const getManagerStays = async (
  status?: string,
  pageable: Pageable = { page: 0, size: 20 }
): Promise<PageStayDetailsResponse> => {
  const params: Record<string, any> = {
    page: pageable.page,
    size: pageable.size,
  };
  
  if (status) params.status = status;
  if (pageable.sort && pageable.sort.length > 0) params.sort = pageable.sort;
  
  const response = await dashboardClient.get<PageStayDetailsResponse>('/api/dashboard/manager/stays', { params });
  return response.data;
};

export const getRatedStays = async (pageable: Pageable = { page: 0, size: 20 }): Promise<PageStayDetailsResponse> => {
  const params: Record<string, any> = {
    page: pageable.page,
    size: pageable.size,
  };
  
  if (pageable.sort && pageable.sort.length > 0) params.sort = pageable.sort;
  
  const response = await dashboardClient.get<PageStayDetailsResponse>('/api/dashboard/manager/stays/rated', { params });
  return response.data;
};

// Special Orders
export const getManagerSpecialOrders = async (
  pageable: Pageable = { page: 0, size: 20 }
): Promise<PageSpecialOrderResponse> => {
  const params: Record<string, any> = {
    page: pageable.page,
    size: pageable.size,
  };
  
  if (pageable.sort && pageable.sort.length > 0) params.sort = pageable.sort;
  
  const response = await dashboardClient.get<PageSpecialOrderResponse>('/api/dashboard/manager/special-orders', { params });
  return response.data;
};

// Overview & Statistics
export const getManagerOverview = async (): Promise<ManagerOverviewResponse> => {
  const response = await dashboardClient.get<ManagerOverviewResponse>('/api/dashboard/manager/overview');
  return response.data;
};

export const getOccupancy = async (): Promise<Record<string, any>> => {
  const response = await dashboardClient.get('/api/dashboard/manager/occupancy');
  return response.data;
};

// ==================== FRONT DESK DASHBOARD APIs ====================

export interface RoomResponse {
  id: number;
  roomNumber: string;
  status: string;
  maxAdults: number;
  maxKids: number;
  floor: number;
  price: string;
  description: string;
}

export interface CreateRoomRequest {
  roomNumber: string;
  maxAdults?: number;
  maxKids?: number;
  description?: string;
  floor?: number;
  price: number;
}

export interface UpdateRoomRequest {
  roomNumber: string;
  maxAdults?: number;
  maxKids?: number;
  description?: string;
  floor?: number;
  price: number;
  status: string;
}

export interface PatchRoomRequest {
  roomNumber?: string;
  maxAdults?: number;
  maxKids?: number;
  description?: string;
  floor?: number;
  price?: number;
  status?: string;
}

export interface PageRoomResponse {
  content: RoomResponse[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface CreateStayRequest {
  guestName: string;
  phone: string;
  roomNumber: string;
  numAdults?: number;
  numKids?: number;
  expectedCheckInDate: string;
  expectedCheckOutDate: string;
  dateRangeValid?: boolean;
}

export interface SpecialOfferResponse {
  id: number;
  title: string;
  description: string;
}

export interface CreateSpecialOfferRequest {
  title: string;
  description?: string;
}

export interface UpdateSpecialOfferRequest {
  title: string;
  description?: string;
}

export interface PatchSpecialOfferRequest {
  title?: string;
  description?: string;
}

export interface CreateSpecialOrderRequest {
  specialOfferId: number;
  agreedPrice: number;
}

// Room Management
export const getFrontDeskRooms = async (
  status?: string,
  floor?: number,
  pageable: Pageable = { page: 0, size: 20 }
): Promise<PageRoomResponse> => {
  const params: Record<string, any> = {
    page: pageable.page,
    size: pageable.size,
  };
  
  if (status) params.status = status;
  if (floor) params.floor = floor;
  if (pageable.sort && pageable.sort.length > 0) params.sort = pageable.sort;
  
  const response = await dashboardClient.get<PageRoomResponse>('/api/dashboard/front-desk/rooms', { params });
  return response.data;
};

export const createRoom = async (roomData: CreateRoomRequest): Promise<RoomResponse> => {
  const response = await dashboardClient.post<RoomResponse>('/api/dashboard/front-desk/rooms', roomData);
  return response.data;
};

export const updateRoom = async (id: number, roomData: UpdateRoomRequest): Promise<RoomResponse> => {
  const response = await dashboardClient.put<RoomResponse>(`/api/dashboard/front-desk/rooms/${id}`, roomData);
  return response.data;
};

export const patchRoom = async (id: number, roomData: PatchRoomRequest): Promise<RoomResponse> => {
  const response = await dashboardClient.patch<RoomResponse>(`/api/dashboard/front-desk/rooms/${id}`, roomData);
  return response.data;
};

// Stay Management
export const getFrontDeskStays = async (
  status?: string,
  pageable: Pageable = { page: 0, size: 20 }
): Promise<PageStayDetailsResponse> => {
  const params: Record<string, any> = {
    page: pageable.page,
    size: pageable.size,
  };
  
  if (status) params.status = status;
  if (pageable.sort && pageable.sort.length > 0) params.sort = pageable.sort;
  
  const response = await dashboardClient.get<PageStayDetailsResponse>('/api/dashboard/front-desk/stays', { params });
  return response.data;
};

export const createStay = async (stayData: CreateStayRequest): Promise<StayDetailsResponse> => {
  const response = await dashboardClient.post<StayDetailsResponse>('/api/dashboard/front-desk/stays', stayData);
  return response.data;
};

export const checkInStay = async (stayId: number): Promise<StayDetailsResponse> => {
  const response = await dashboardClient.put<StayDetailsResponse>(`/api/dashboard/front-desk/stays/${stayId}/checkin`);
  return response.data;
};

export const checkOutStay = async (stayId: number): Promise<StayDetailsResponse> => {
  const response = await dashboardClient.put<StayDetailsResponse>(`/api/dashboard/front-desk/stays/${stayId}/checkout`);
  return response.data;
};

export const getStaysCheckInToday = async (
  pageable: Pageable = { page: 0, size: 20 }
): Promise<PageStayDetailsResponse> => {
  const params: Record<string, any> = {
    page: pageable.page,
    size: pageable.size,
  };
  
  if (pageable.sort && pageable.sort.length > 0) params.sort = pageable.sort;
  
  const response = await dashboardClient.get<PageStayDetailsResponse>('/api/dashboard/front-desk/stays/checkin-today', { params });
  return response.data;
};

export const getStaysCheckOutToday = async (
  pageable: Pageable = { page: 0, size: 20 }
): Promise<PageStayDetailsResponse> => {
  const params: Record<string, any> = {
    page: pageable.page,
    size: pageable.size,
  };
  
  if (pageable.sort && pageable.sort.length > 0) params.sort = pageable.sort;
  
  const response = await dashboardClient.get<PageStayDetailsResponse>('/api/dashboard/front-desk/stays/checkout-today', { params });
  return response.data;
};

// Stay Orders
export const getOrdersForStay = async (stayId: number): Promise<PendingOrdersResponse[]> => {
  const response = await dashboardClient.get<PendingOrdersResponse[]>(`/api/dashboard/front-desk/stays/${stayId}/orders`);
  return response.data;
};

// Stay Special Orders
export const getSpecialOrdersForStay = async (stayId: number): Promise<SpecialOrderResponse[]> => {
  const response = await dashboardClient.get<SpecialOrderResponse[]>(`/api/dashboard/front-desk/stays/${stayId}/special-orders`);
  return response.data;
};

export const createSpecialOrderForStay = async (
  stayId: number,
  specialOrderData: CreateSpecialOrderRequest
): Promise<SpecialOrderResponse> => {
  const response = await dashboardClient.post<SpecialOrderResponse>(
    `/api/dashboard/front-desk/stays/${stayId}/special-orders`,
    specialOrderData
  );
  return response.data;
};

// Special Offers
export const createSpecialOffer = async (offerData: CreateSpecialOfferRequest): Promise<SpecialOfferResponse> => {
  const response = await dashboardClient.post<SpecialOfferResponse>('/api/dashboard/front-desk/special-offers', offerData);
  return response.data;
};

export const updateSpecialOffer = async (
  id: number,
  offerData: UpdateSpecialOfferRequest
): Promise<SpecialOfferResponse> => {
  const response = await dashboardClient.put<SpecialOfferResponse>(
    `/api/dashboard/front-desk/special-offers/${id}`,
    offerData
  );
  return response.data;
};

export const patchSpecialOffer = async (
  id: number,
  offerData: PatchSpecialOfferRequest
): Promise<SpecialOfferResponse> => {
  const response = await dashboardClient.patch<SpecialOfferResponse>(
    `/api/dashboard/front-desk/special-offers/${id}`,
    offerData
  );
  return response.data;
};
