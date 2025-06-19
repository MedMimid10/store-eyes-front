import React, {useState, useEffect} from "react"
import {useSse, SseContext} from "./sse-context"
import EventSource from 'react-native-sse';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

interface SseProviderProps {
  children: React.ReactNode;
}

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const SseProvider = ({ children }: SseProviderProps) => {
  const [products, setProducts] = useState<Record<string, number>>({});
  const [totalCount, setTotalCount] = useState<number>(0);
  const [notificationToken, setNotificationToken] = useState<string | null>(null);

  // Request notification permissions and get push token
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        // Request permissions
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        
        if (finalStatus !== 'granted') {
          console.log('Notification permissions not granted');
          return;
        }

        // Get push notification token
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }

        const tokenData = await Notifications.getExpoPushTokenAsync();
        setNotificationToken(tokenData.data);
        console.log('Notification token:', tokenData.data);
        
      } catch (error) {
        console.error('Error setting up notifications:', error);
      }
    };

    setupNotifications();
  }, []);

  // Handle notification responses (when user taps on notification)
  useEffect(() => {
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
      const { productCode, count } = response.notification.request.content.data || {};
      console.log(`User tapped notification for ${productCode} (count: ${count})`);
    });

    return () => responseSubscription.remove();
  }, []);

  // Handle foreground notifications
  useEffect(() => {
    const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Foreground notification received:', notification);
    });

    return () => foregroundSubscription.remove();
  }, []);

  useEffect(() => {
    const eventSource = new EventSource('https://storeyes.io/api/sse?clientId=123');
  
    eventSource.addEventListener("message", (event) => {
      const {productCode} = JSON.parse(event.data!);
      console.log('New SSE message:', productCode);

      // Update product counts
      let newCount = 0;
      setProducts(prev => {
        const existingProduct = prev[productCode];
        if (existingProduct) {
          newCount = existingProduct + 1;
          return { ...prev, [productCode]: newCount };
        }
        newCount = 1;
        return { ...prev, [productCode]: newCount };
      });

      setTotalCount(prev => prev + 1);

      // Send notification with product details
      sendNotification(productCode, newCount);
    });

    eventSource.addEventListener("error", (event) => {
      console.error('SSE connection error:', event);
      eventSource.close();
    });

    return () => {
      eventSource.close();
    };
  }, []);

  const sendNotification = async (productCode: string, count: number) => {
    try {
      const productNames: Record<string, string> = {
        'coffee': 'Coffee',
        'coffee-latte': 'Coffee Latte',
        'tea': 'Tea',
        'orange-juice': 'Orange Juice',
        'salad': 'Salad',
        'pizza': 'Pizza',
        'pasta': 'Pasta'
      };

      const productName = productNames[productCode] || productCode;
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🍽️ New Product Detected!',
          body: `${productName} detected (Total: ${count})`,
          sound: 'default',
          data: { 
            productCode, 
            count,
            timestamp: new Date().toISOString()
          },
          badge: count,
        },
        trigger: null, // Show immediately
      });
      
      console.log(`Notification sent for ${productName} (count: ${count})`);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <SseContext.Provider value={{ products, totalCount, notificationToken }} >
      {children}
    </SseContext.Provider>
  );
};