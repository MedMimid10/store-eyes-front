import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AlertGrn from '../assets/AlrtGrn.svg';
import AlertRed from '../assets/AlrtRed.svg';
import HistoricCard from '../components/HistoricCard';
import TimeFilterDropdown from '../components/TimeFilterDropdown';

const sampleData = [
    // Today's data
    {
        title: 'Toilet Cleaning',
        by: 'Fatima Larak',
        time: 'Today at 8:00 AM',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertGrn,
        isAlert: false
    },
    {
        title: 'Toilet Cleaning',
        by: 'Ahmed Tazi',
        time: 'Today at 10:30 AM',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        isAlert: true
    },
    {
        title: 'Toilet Cleaning',
        by: 'Sara Bakali',
        time: 'Today at 2:15 PM',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertGrn,
        isAlert: false
    },
    
    // Last Week's data (excluding today)
    {
        title: 'Toilet Cleaning',
        by: 'Ali Benomar',
        time: 'Yesterday at 4:00 PM',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        isAlert: true
    },
    {
        title: 'Toilet Cleaning',
        by: 'Rachid Amrani',
        time: '6 days ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertGrn,
        isAlert: false
    },
    {
        title: 'Toilet Cleaning',
        by: 'Leila Sadiki',
        time: '2 days ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertGrn,
        isAlert: false
    },
    {
        title: 'Toilet Cleaning',
        by: 'Omar Kadiri',
        time: '4 days ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        isAlert: true
    },
    
    // Last Month's data (excluding last week)
    {
        title: 'Toilet Cleaning',
        by: 'Mounia Salah',
        time: '3 weeks ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        isAlert: true
    },
    {
        title: 'Toilet Cleaning',
        by: 'Karim Nasri',
        time: '2 weeks ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertGrn,
        isAlert: false
    },
    {
        title: 'Toilet Cleaning',
        by: 'Hassan Mansouri',
        time: '3 weeks ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        isAlert: true
    },
    {
        title: 'Toilet Cleaning',
        by: 'Nadia Chaoui',
        time: '4 weeks ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertGrn,
        isAlert: false
    }
];

const HistoricCleaningContainer: React.FC = () => {
    const { t } = useTranslation();

    // Time filter options as translated strings
    const TIME_FILTER_OPTIONS = [
        t('today'),
        t('lastWeek'),
        t('lastMonth')
    ];

    const [selectedTimeFilter, setSelectedTimeFilter] = useState(TIME_FILTER_OPTIONS[0]);

    const handleTimeFilterChange = (time: string) => {
        setSelectedTimeFilter(time);
    };

    // Filter data by time with cumulative filtering
    const filterDataByTime = () => {
        if (selectedTimeFilter === t('today')) {
            return sampleData.filter(item =>
                item.time.toLowerCase().includes('today')
            );
        }

        if (selectedTimeFilter === t('lastWeek')) {
            return sampleData.filter(item => {
                const time = item.time.toLowerCase();
                return time.includes('today') || 
                       time.includes('yesterday') || 
                       (time.includes('days ago') && parseInt(time.split(' ')[0], 10) <= 7);
            });
        }

        if (selectedTimeFilter === t('lastMonth')) {
            return sampleData.filter(item => {
                const time = item.time.toLowerCase();
                return time.includes('today') || 
                       time.includes('yesterday') || 
                       time.includes('days ago') || 
                       (time.includes('weeks ago') && parseInt(time.split(' ')[0], 10) <= 4);
            });
        }

        return sampleData;
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.headerRow}>
                <Text style={styles.header}>{t('historic')}</Text>
                <TimeFilterDropdown 
                    options={TIME_FILTER_OPTIONS}
                    onSelect={handleTimeFilterChange}
                    initialOption={TIME_FILTER_OPTIONS[0]}
                    label=""
                />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            >
                {filterDataByTime().map((item, idx) => (
                    <HistoricCard
                        key={idx}
                        title={item.title}
                        by={item.by}
                        time={item.time}
                        image={item.image}
                        AlertIcon={item.AlertIcon}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginTop: 12,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },
    header: {
        fontFamily: 'Raleway',
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    },
    scrollView: {
        flex: 1,
    },
    list: {
        paddingBottom: 10,
    },
    timeFilterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    timeFilter: {
        fontSize: 12,
        color: '#666',
        fontFamily: 'Raleway',
        marginRight: 6,
    },
    timeFilterDropdown: {
        position: 'absolute',
        top: 40,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 10,
        minWidth: 120,
    },
    timeFilterOption: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    timeFilterOptionText: {
        fontSize: 12,
        color: '#333',
        fontFamily: 'Raleway',
    },
    selectedTimeFilterOption: {
        fontWeight: 'bold',
        color: '#2691A3',
    },
});
export default HistoricCleaningContainer;