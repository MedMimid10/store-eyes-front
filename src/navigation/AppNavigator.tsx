import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import LaunchScreen from '../screens/LaunchScreen';

export type RootStackParamList = {
    Start: undefined;
    Launch: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Launch" component={LaunchScreen} />
        </Stack.Navigator>
    );
}
