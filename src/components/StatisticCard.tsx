import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AlertIcon from '../assets/icons/alert-icon.svg';

interface StatisticCardProps {
    title: string;
    value: string | number;
    hasAlert: boolean;
    showCurrency?: boolean;
    onPress?: () => void;
    loading?: boolean;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, hasAlert, showCurrency = false, onPress, loading = false }) => {
    // Split value if it contains currency
    let mainValue = value;
    let currencyValue = '';
    
    if (showCurrency && typeof value === 'string') {
        const parts = value.split(' ');
        if (parts.length > 1) {
            mainValue = parts[0];
            currencyValue = parts[1];
        }
    }
    
    // Wrap the card in TouchableOpacity if onPress is provided
    const CardContainer = onPress ? TouchableOpacity : View;
    
    return (
        <CardContainer 
            style={styles.card} 
            onPress={onPress}
            activeOpacity={0.7}
        >
            {/* TOP */}
            <View style={styles.topRow}>
                <Text style={styles.title}>{title}</Text>
                {onPress && <Feather name="chevron-right" size={16} color="gray" />}
            </View>

            {/* MIDDLE */}
            <View style={styles.valueContainer}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <View style={styles.loadingSkeleton} />
                    </View>
                ) : (
                    <>
                        <View style={styles.valueRow}>
                            <Text style={styles.value}>{mainValue}</Text>
                            {showCurrency && <Text style={styles.currency}>{currencyValue}</Text>}
                        </View>
                        
                        {/* Alert icon for Non-resolved Alert */}
                        {hasAlert && (
                            <View style={styles.alertIconContainer}>
                                <View>
                                    <AlertIcon width={16} height={16} />
                                </View>
                            </View>
                        )}
                    </>
                )}
            </View>

            {/* BOTTOM - Keep for spacing */}
            <View style={styles.bottomRow}>
                <View style={{ flex: 1 }} />
            </View>
        </CardContainer>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 16,
        height: 120, // Increase height
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: 'gray',
        fontSize: 12,
        fontFamily: 'Raleway-Medium',
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
        justifyContent: 'space-between',
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    value: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2691A3',
        fontFamily: 'Raleway-Bold',
    },
    currency: {
        fontSize: 12,
        color: '#2691A3',
        marginLeft: 2,
        marginBottom: 2,
        fontFamily: 'Raleway-Medium',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
    },
    alertIconContainer: {
        backgroundColor: '#AB1C1C1A',
        width: 28,
        height: 28,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
    },
    loadingSkeleton: {
        height: 20,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        width: '60%',
    },
});

export default StatisticCard;