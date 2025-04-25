import React from 'react';
import { StyleSheet, View } from 'react-native';
import BottomPopup from '../containers/BottomPopup';
import TopImageSection from '../containers/TopImageSection';

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
