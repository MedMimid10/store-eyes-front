import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AlertScreen from '../screens/AlertScreen';
import CleaningScreen from "../screens/CleaningScreen";
import HomeScreen from '../screens/Home';
import LaunchScreen from '../screens/LaunchScreen';
import LoginScreen from '../screens/LoginScreen';
import MealServingScreen from '../screens/MealServingScreen';
import StartScreen from '../screens/StartScreen';
import TableServingScreen from '../screens/TableServingScreen';
import TestHome from '../screens/TestHome';

export type RootStackParamList = {
  Start: undefined;
  Launch: undefined;
  Login: undefined;
  Home: undefined;
  TestHome: undefined;
  MealServing: undefined;
  Cleaning: undefined;
  TableServing: undefined;
  Alert: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
};

export function AppNavigator({ isLoggedIn, onLogin, onLogout }: Props) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Start">
        {/* StartScreen toujours affiché en premier */}
        <Stack.Screen name="Start">
          {(props) => <StartScreen {...props} isLoggedIn={isLoggedIn} />}
        </Stack.Screen>
  
        {isLoggedIn ? (
          // ─── Utilisateur déjà authentifié → Start → Home ──────────────
          <>
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} onLogout={onLogout} />}
            </Stack.Screen>
            <Stack.Screen name="MealServing" component={MealServingScreen} />
            <Stack.Screen name="Alert" component={AlertScreen} />
            <Stack.Screen name="Cleaning" component={CleaningScreen} />
            <Stack.Screen name="TableServing" component={TableServingScreen} />
          </>
        ) : (
          // ─── Utilisateur non-authentifié → Start → Launch → Login ────────
          <>
            <Stack.Screen name="Launch" component={LaunchScreen} />
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} onLogin={onLogin} />}
            </Stack.Screen>
          </>
        )}
        
        {/* <Stack.Screen name="TableServing" component={TableServingScreen} /> */}
      </Stack.Navigator>
    );
  }