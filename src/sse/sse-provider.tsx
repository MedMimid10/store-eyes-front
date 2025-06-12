import React, {useState, useEffect} from "react"
import {useSse, SseContext} from "./sse-context"
import EventSource from 'react-native-sse';
import * as Notifications from 'expo-notifications';

interface SseProviderProps {
  children: React.ReactNode;
}


export const SseProvider = ({ children }: SseProviderProps) => {
  const [products, setProducts] = useState<Record<string, number>>({});
  const [totalCount, setTotalCount] = useState<number>(0);

  // useEffect(() => {
  //   const eventSource = new EventSource('http://138.199.234.39:9090/sse?clientId=123');
  
  //   eventSource.addEventListener("message", (event) => {

  //     const {productCode} = JSON.parse(event.data!);
  //     console.log('New SSE message:', productCode);

  //     sendNotification(`New update: ${productCode}`);


  //     setProducts(prev => {
  //       const existingProduct = prev[productCode];
  //       if (existingProduct) {
  //         return { ...prev, [productCode]: existingProduct + 1 };
  //       }
  //       return { ...prev, [productCode]: 1 };
  //     });

  //     setTotalCount(prev => prev + 1);
      

  //     //sendNotification(`New update: ${data.title ?? 'Check now!'}`);
  //   });

  //   eventSource.addEventListener("error", (event) => {
  //     console.error('SSE connection error:', event);
  //     eventSource.close();
  //   });

  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);

  const sendNotification = (message: string) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "hello world",
        body: message,
        sound: 'default',
      },
      trigger: null
    });
  };

  return (
    <SseContext.Provider value={{ products, totalCount }} >
      {children}
    </SseContext.Provider>
  );
};