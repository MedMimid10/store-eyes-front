import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';



type TestHomeProps = {
    onLogout: () => void;
};
const TestHome = ({ onLogout }: TestHomeProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.container}
        >
            <View style={styles.header}>
                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/8847/8847419.png' }}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={async () => {
                            // 1. Supprime le token de SecureStore
                            await SecureStore.deleteItemAsync('access_token');
                            // 2. Informe App.js que l’utilisateur est déconnecté
                            onLogout();
                        }}
                    >
                        <Ionicons name="log-out-outline" size={24} color="white" />
                        <Text style={styles.logoutText}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeText}>Welcome to Store Eyes</Text>
                    <Text style={styles.subtitle}>Your Dashboard</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Store Overview</Text>
                    <Text style={styles.cardText}>Manage your store efficiently</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Analytics</Text>
                    <Text style={styles.cardText}>Track your store performance</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Inventory</Text>
                    <Text style={styles.cardText}>Manage your products</Text>
                </View>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Cleaning')}>
                    <Text style={styles.cardTitle}>Cleaning</Text>
                    <Text style={styles.cardText}>Track recent cleaning activity</Text>
                </TouchableOpacity>

            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        paddingTop: 50,
    },
    profileSection: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 15,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 5,
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    scrollView: {
        flex: 1,
        padding: 20,
    },
    welcomeContainer: {
        marginBottom: 30,
        marginTop: 20,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: 'white',
        opacity: 0.8,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 16,
        color: 'white',
        opacity: 0.8,
    },
});

export default TestHome;
