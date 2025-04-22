import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // icône de cloche et flèche

interface StatisticCardProps {
    title: string;
    value: string | number;
    hasAlert: boolean;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, hasAlert }) => {
    return (
        <View style={styles.card}>
            {/* TOP */}
            <View style={styles.topRow}>
                <Text style={styles.title}>{title}</Text>
                <Feather name="chevron-right" size={20} color="gray" />
            </View>

            {/* MIDDLE */}
            <Text style={styles.value}>{value}</Text>

            {/* BOTTOM */}
            <View style={styles.bottomRow}>
                <View style={{ flex: 1 }} />
                <Feather
                    name="bell"
                    size={24}
                    color={hasAlert ? 'red' : 'green'}
                />
            </View>
        </View>
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
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: 'gray',
        fontSize: 14,
    },
    value: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 8,
        color: '#000',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default StatisticCard;
