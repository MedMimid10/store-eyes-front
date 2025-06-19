import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, AppState } from 'react-native';
import './src/i18n';
import { AppNavigator } from './src/navigation/AppNavigator';
import { SseContext } from './src/sse/sse-context';
import { SseProvider } from './src/sse/sse-provider';
import { BackgroundService } from './src/service/BackgroundService';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Initialize background services
  useEffect(() => {
    const setupBackgroundServices = async () => {
      // Register background fetch for SSE monitoring
      await BackgroundService.registerBackgroundFetch();
      
      // Handle app state changes
      const handleAppStateChange = (nextAppState: string) => {
        console.log('App state changed to:', nextAppState);
        
        if (nextAppState === 'background') {
          console.log('App went to background - setting up background SSE');
          BackgroundService.setupBackgroundSSE();
        } else if (nextAppState === 'active') {
          console.log('App became active - closing background SSE');
          BackgroundService.closeBackgroundSSE();
        }
      };

      const subscription = AppState.addEventListener('change', handleAppStateChange);
      
      return () => {
        subscription?.remove();
        BackgroundService.unregisterBackgroundFetch();
        BackgroundService.closeBackgroundSSE();
      };
    };

    setupBackgroundServices();
  }, []);

  // Au démarrage, on voit si on a déjà un token valide
  useEffect(() => {
    (async () => {
      try {
        // Retrieve token and expiry time
        const token = await SecureStore.getItemAsync('access_token');
        const tokenExpiryStr = await SecureStore.getItemAsync('token_expiry');

        // Check if token exists and is not expired
        if (token && tokenExpiryStr) {
          const tokenExpiry = parseInt(tokenExpiryStr, 10);
          const now = Date.now();

          // If token exists and is not expired, user is logged in
          // Otherwise, user needs to log in again
          if (now < tokenExpiry) {
            setIsLoggedIn(true);
          } else {
            // Clear expired tokens
            await Promise.all([
              SecureStore.deleteItemAsync('access_token'),
              SecureStore.deleteItemAsync('refresh_token'),
              SecureStore.deleteItemAsync('token_expiry'),
            ]);
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsLoggedIn(false);
      }
    })();
  }, []);

  if (isLoggedIn === null) {
    // Chargement initial
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SseProvider>
      <NavigationContainer>
      <AppNavigator
        isLoggedIn={isLoggedIn}
        onLogin={() => setIsLoggedIn(true)}
        onLogout={() => setIsLoggedIn(false)}
      />
      </NavigationContainer>
    </SseProvider>
    
  );
}
