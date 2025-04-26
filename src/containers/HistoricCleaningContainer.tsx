import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AlertGrn from '../assets/AlrtGrn.svg';
import AlertRed from '../assets/AlrtRed.svg';
import HistoricCard from '../components/HistoricCard';

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

    // Time filter options without "all"
    const TimeFilterOptions = [
        { key: 'today', label: t('today') },
        { key: 'lastWeek', label: t('lastWeek') },
        { key: 'lastMonth', label: t('lastMonth') },
    ];

    const [selectedTimeFilter, setSelectedTimeFilter] = useState(TimeFilterOptions[0].key);
    const [showTimeFilterDropdown, setShowTimeFilterDropdown] = useState(false);

    const toggleTimeFilterDropdown = () => {
        setShowTimeFilterDropdown(!showTimeFilterDropdown);
    };

    const selectTimeFilter = (filterKey: string) => {
        setSelectedTimeFilter(filterKey);
        setShowTimeFilterDropdown(false);
    };

    // Filter data by time with cumulative filtering
    const filterDataByTime = () => {
        if (selectedTimeFilter === 'today') {
            return sampleData.filter(item =>
                item.time.toLowerCase().includes('today')
            );
        }

        if (selectedTimeFilter === 'lastWeek') {
            return sampleData.filter(item => {
                const time = item.time.toLowerCase();
                return time.includes('today') || 
                       time.includes('yesterday') || 
                       (time.includes('days ago') && parseInt(time.split(' ')[0], 10) <= 7);
            });
        }

        if (selectedTimeFilter === 'lastMonth') {
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
                <View style={{ position: 'relative' }}>
                    <TouchableOpacity
                        style={styles.timeFilterButton}
                        onPress={toggleTimeFilterDropdown}
                    >
                        <Text style={styles.timeFilter}>
                            {TimeFilterOptions.find(opt => opt.key === selectedTimeFilter)?.label}
                        </Text>
                        <Feather name="chevron-down" size={16} color="#666" />
                    </TouchableOpacity>

                    {showTimeFilterDropdown && (
                        <View style={styles.timeFilterDropdown}>
                            {TimeFilterOptions.map(filter => (
                                <TouchableOpacity
                                    key={filter.key}
                                    style={styles.timeFilterOption}
                                    onPress={() => selectTimeFilter(filter.key)}
                                >
                                    <Text
                                        style={[
                                            styles.timeFilterOptionText,
                                            filter.key === selectedTimeFilter && styles.selectedTimeFilterOption,
                                        ]}
                                    >
                                        {filter.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
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
        marginVertical: 15,
        backgroundColor: '#F8F8F8',
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
    list: {
        paddingBottom: 20,
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
    },
    timeFilterOptionText: {
        fontSize: 12,
        color: '#333',
    },
    selectedTimeFilterOption: {
        fontWeight: 'bold',
        color: '#2691A3',
    },
});
export default HistoricCleaningContainer;