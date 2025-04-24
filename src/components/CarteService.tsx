import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CleanIcon from '../assets/icons/clean-icon.svg';
import MealServingIcon from '../assets/icons/meal-serving-icon.svg';
import TableServingIcon from '../assets/icons/table-serving-icon.svg';

interface CarteServiceProps {
    iconType: 'meal' | 'clean' | 'table';
    label: string;
}

const CarteService: React.FC<CarteServiceProps> = ({ iconType, label }) => {
    const renderIcon = () => {
        switch (iconType) {
            case 'meal':
                return <MealServingIcon width={36} height={37} />;
            case 'clean':
                return <CleanIcon width={36} height={37} />;
            case 'table':
                return <TableServingIcon width={33} height={33} />;
            default:
                return <MealServingIcon width={36} height={37} />;
        }
    };
    
    return (
        <View style={styles.card}>
            <View style={styles.content}>
                {renderIcon()}
                <Text style={styles.label}>{label}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 110,
        height: 125,
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingTop: 21,
        paddingRight: 19,
        paddingBottom: 21,
        paddingLeft: 19,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    content: {
        width: 65,
        height: 85,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },
    label: {
        color: '#2691A3',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: 'Raleway-Medium',
    },
});

export default CarteService;