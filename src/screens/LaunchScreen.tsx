import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopImageSection from '../containers/TopImageSection';
import BottomPopup from '../containers/BottomPopup';

export default function LaunchScreen() {
    return (
        <View style={styles.container}>
            <TopImageSection />
            <BottomPopup />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
});
