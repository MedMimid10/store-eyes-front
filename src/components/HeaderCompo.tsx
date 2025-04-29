import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
                <View>
                    <BackBtm width={38} height={38} />
                </View>
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
        alignItems: 'flex-start',
        marginTop: 5
    },
    backButton: {
        marginRight: 10,
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
        marginTop: 4,
        fontFamily: 'Raleway',
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
    },
});

export default HeaderCompo;
