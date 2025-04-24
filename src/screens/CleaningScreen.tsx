import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import HeaderCompo from '../components/HeaderCompo';

const CleaningScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <HeaderCompo
                title="Cleaning"
                subtitle="Track Recent Cleaning Activity"
            />

            {/* Tu pourras ajouter AreaCard et Historic ici plus tard */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default CleaningScreen;

