/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RoomContextType {
  roomNumber: string | null;
  setRoomNumber: (roomNumber: string | null) => void;
  hasValidRoom: boolean;
  clearRoom: () => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

interface RoomProviderProps {
  children: ReactNode;
}

export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  const [roomNumber, setRoomNumberState] = useState<string | null>(null);

  // Restore room number from localStorage on mount
  useEffect(() => {
    const savedRoomNumber = localStorage.getItem('roomNumber');
    if (savedRoomNumber) {
      setRoomNumberState(savedRoomNumber);
    }
  }, []);

  // Save room number to localStorage whenever it changes
  useEffect(() => {
    if (roomNumber) {
      localStorage.setItem('roomNumber', roomNumber);
    } else {
      localStorage.removeItem('roomNumber');
    }
  }, [roomNumber]);

  const setRoomNumber = (newRoomNumber: string | null) => {
    setRoomNumberState(newRoomNumber);
  };

  const clearRoom = () => {
    setRoomNumberState(null);
    localStorage.removeItem('roomNumber');
  };

  const hasValidRoom = roomNumber !== null && roomNumber.trim().length > 0;

  const value: RoomContextType = {
    roomNumber,
    setRoomNumber,
    hasValidRoom,
    clearRoom,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

export const useRoom = (): RoomContextType => {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
};

// Validation helper for API requests
export const validateRoomNumber = (roomNumber: string | null): boolean => {
  return roomNumber !== null && roomNumber.trim().length > 0;
};

// Higher-order component to protect routes that require a valid room
export const withRoomValidation = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    const { hasValidRoom } = useRoom();

    if (!hasValidRoom) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-[#080808] text-white">
          <div className="text-center">
            <p className="text-[#dfba73] text-lg mb-2">يرجى تسجيل الدخول أولاً</p>
            <p className="text-gray-400 text-sm">يجب تحديد رقم الغرفة للوصول إلى هذه الصفحة</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
};
