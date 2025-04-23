import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ActivityIndicator, View } from 'react-native';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    // Au démarrage, on voit si on a déjà un token
    useEffect(() => {
        (async () => {
            const token = await SecureStore.getItemAsync('access_token');
            setIsLoggedIn(!!token);
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
        <NavigationContainer>
            <AppNavigator
                isLoggedIn={isLoggedIn}
                onLogin={() => setIsLoggedIn(true)}
                onLogout={() => setIsLoggedIn(false)}
            />
        </NavigationContainer>
    );
}
