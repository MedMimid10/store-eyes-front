import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Onboard_Screen from '../assets/img17.svg';

const TopImageSection = () => {
    return (
        <View style={styles.container}>
            <View style={styles.image}>
                <Onboard_Screen/>
            </View>
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
        height: height,
    },
});

export default TopImageSection;
