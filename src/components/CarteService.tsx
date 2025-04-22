import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Tu peux aussi utiliser FontAwesome ou autre si tu veux

interface CarteServiceProps {
    iconName: keyof typeof Feather.glyphMap;
    label: string;
}

const CarteService: React.FC<CarteServiceProps> = ({ iconName, label }) => {
    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <Feather name={iconName} size={32} color="#2691A3" />
                <Text style={styles.label}>{label}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 104,
        height: 125,
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingTop: 21,
        paddingRight: 19,
        paddingBottom: 21,
        paddingLeft: 19,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: 53,
        height: 76,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8, // fonctionne avec React Native >= 0.71
    },
    label: {
        color: '#2691A3',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default CarteService;
