import React, { createContext, useContext } from 'react';




interface SseContextType {
  products: Record<string, number>;
  totalCount: number;
  notificationToken: string | null;
}
  
export const SseContext = createContext<SseContextType>({} as SseContextType);
  
export const useSse = () => {
  const context = useContext(SseContext);
  if (!context) {
      throw new Error('useSse must be used within a SseProvider');
  }
  return context;
};
  