import { Ionicons } from '@expo/vector-icons'; // pour icône
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from "../navigation/AppNavigator";

const BottomPopup = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleGetStarted = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.popupContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Ionicons name="eye" size={20} color="gray" />
                <Text style={styles.subtitle}>Eyes on Every Corner.</Text>
            </View>

            <Text style={styles.title}>Welcome to Store Eyes</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Text style={styles.description}>
                    Your smart assistant for real-time table tracking, customer monitoring, and instant alerts - all from one powerful dashboard.
                </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                <Text style={styles.buttonText}>Get Started  &gt;</Text>
            </TouchableOpacity>
        </View>
    );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    popupContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: height * 0.42,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        justifyContent: 'space-between',
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: -3 },
        shadowRadius: 10,
    },
    subtitle: {
        color: 'gray',
        fontSize: 16,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#000',
    },
    description: {
        color: 'gray',
        fontSize: 16,
        flex: 1,
        flexWrap: 'wrap',
    },
    button: {
        backgroundColor: '#2691A3',
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
       // marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default BottomPopup;
