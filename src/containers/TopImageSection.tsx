import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Onboard_Screen from '../assets/img17.svg'

const TopImageSection = () => {
    return (
        <View style={styles.container}>
            <Onboard_Screen  style={styles.image} />
        </View>
    );
};

const { width , height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  backgroundColor: '#f2f2f2',
        alignItems: 'center',

    },
    image: {
        width: width,
        height: '70%',

    },
});

export default TopImageSection;
