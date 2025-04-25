import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackBtm from '../assets/backBt.svg'; // 👈 SVG importé

const { width } = Dimensions.get('window');

interface HeaderCompoProps {
    title: string;
    subtitle: string;
}

const HeaderCompo: React.FC<HeaderCompoProps> = ({ title, subtitle }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <BackBtm width={40} height={40} /> {/* 👈 SVG au lieu de Ionicons */}
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 16,
        alignItems: 'flex-start',
        backgroundColor: '#F8F8F8',

    },
    backButton: {
        marginRight: 10,
        marginTop: 4,
    },
    textContainer: {
        flexShrink: 1,
    },
    title: {
        fontFamily: 'Raleway',
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
    },
    subtitle: {
        marginTop: 8,
        fontFamily: 'Raleway',
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
    },
});

export default HeaderCompo;
