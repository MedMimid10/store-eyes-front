import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Onboard_Screen from '../assets/img17.svg';

const TopImageSection = () => {
    return (
        <LinearGradient
            colors={['#87CEEB', '#5DD9F0', '#2691A3']}
            style={styles.gradient}
        >
            <View style={styles.container}>
                {/* You can add content here like logos, text, or icons */}
            </View>
        </LinearGradient>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TopImageSection;
