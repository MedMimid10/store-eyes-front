import React, { useEffect } from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import Logo from '../assets/Splash-Screen.svg'

export default function StartScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Launch');
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
                    <Logo  style={styles.logoImage}  />
            <StatusBar style="auto" />
        </View>
    );
}

const { width , height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#87CEEB', // ou n'importe quelle couleur

    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
});
