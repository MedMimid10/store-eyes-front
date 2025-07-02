import React, {useState, useEffect, useRef} from "react"
import {useSse, SseContext} from "./sse-context"
import EventSource from 'react-native-sse';
import * as Notifications from 'expo-notifications';
import { Platform, AppState, AppStateStatus } from 'react-native';
import { SENTRY_DSN } from "@env";

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
  const [loading, setLoading] = useState<boolean>(true);
  const eventSourceRef = useRef<EventSource | null>(null);
  const appState = useRef(AppState.currentState);

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

  // Function to load initial data
  const loadInitialData = async () => {
    try {
      setLoading(true);
      console.log('Loading initial data from SSE...');
      const response = await fetch('https://storeyes.io/api/sse/load?clientId=123');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: Record<string, number> = await response.json();
      console.log('Initial data loaded:', data);
      
      // Update products state with loaded data
      setProducts(data);
      
      // Calculate and update total count
      const total = Object.values(data).reduce((sum, count) => sum + count, 0);
      setTotalCount(total);
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading initial data:', error);
      setLoading(false);
    }
  };

  // Function to connect to SSE
  const connectSSE = async (isInitialConnection: boolean) => {
    if (eventSourceRef.current) {
      console.log('SSE already connected');
      return;
    }

    console.log('Connecting to SSE...');
    
    // Load initial data only on first connection
    if (isInitialConnection) {
      await loadInitialData();
    }
    
    const eventSource = new EventSource('https://storeyes.io/api/sse?clientId=123&send=true');
    eventSourceRef.current = eventSource;

    eventSource.addEventListener("open", (event) => {
      console.log("---------- CONNECTED TO SSE ----------");
    });
  
    eventSource.addEventListener("message", (event) => {
      const {productCode, count} = JSON.parse(event.data!);
      //console.log('New SSE message:', productCode, count);
      const increment = count ? count : 1;
      // Update product counts

      
      setProducts(prev => {
        let newCount = 0;
        const existingProduct = prev[productCode];
        if (existingProduct) {
          newCount = existingProduct + increment;
          return { ...prev, [productCode]: newCount };
        }
        newCount = increment;
        
        return { ...prev, [productCode]: newCount };
      });

      setTotalCount(prev => prev + increment);

      if (isInitialConnection) {
        sendNotification(productCode);
      }

    });

    eventSource.addEventListener("error", (event) => {
      console.error('SSE connection error:', event);
      disconnectSSE();
    });
  };

  // Function to disconnect from SSE
  const disconnectSSE = () => {
    if (eventSourceRef.current) {
      console.log('Disconnecting from SSE...');
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  // Handle app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground, reconnecting SSE and reloading data');
        setLoading(true);
        connectSSE(true);
      } else if (
        appState.current === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        console.log('App has gone to the background, disconnecting SSE');
        // Clear previous data when reconnecting
        setProducts({});
        setTotalCount(0);
        setLoading(true);
        disconnectSSE();
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  // Initial connection when component mounts
  useEffect(() => {
    connectSSE(true);
    
    return () => {
      disconnectSSE();
    };
  }, []);

  const sendNotification = async (productCode: string) => {
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
          body: `${productName} detected`,
        sound: 'default',
          data: { 
            productCode, 
            timestamp: new Date().toISOString()
          },
          badge: 1,
      },
        trigger: null, // Show immediately
    });
      
      console.log(`Notification sent for ${productName}`);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <SseContext.Provider value={{ products, totalCount, notificationToken, loading }} >
      {children}
    </SseContext.Provider>
  );
};