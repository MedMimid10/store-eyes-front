import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import HistoricCard from '../components/HistoricCard';
import AlertGrn from '../assets/AlrtGrn.svg';
import AlertRed from '../assets/AlrtRed.svg';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const sampleData = [
    {
        title: 'Toilet Cleaning',
        by: 'Fatima Larak',
        time: 'Today at 8:00 AM',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertGrn,
    },
    {
        title: 'Broken Window',
        by: 'Ali Benomar',
        time: 'Yesterday at 4:00 PM',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
    },
    {
        title: 'Weekly Inspection',
        by: 'Rachid Amrani',
        time: '6 days ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertGrn,
    },
    {
        title: 'Monthly Maintenance',
        by: 'Mounia Salah',
        time: '3 weeks ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
    },
];

const HistoricCleaningContainer: React.FC = () => {
    const { t } = useTranslation();

    const TimeFilterOptions = [
        { key: 'all', label: t('all') },
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

    const filterDataByTime = () => {
        const selectedKey = selectedTimeFilter;

        if (selectedKey === 'all') return sampleData;

        if (selectedKey === 'today') {
            return sampleData.filter(item =>
                item.time.toLowerCase().includes('today')
            );
        }

        if (selectedKey === 'lastWeek') {
            return sampleData.filter(item => {
                const time = item.time.toLowerCase();
                if (time.includes('yesterday')) return true;
                if (time.includes('days ago')) {
                    const days = parseInt(time.split(' ')[0], 10);
                    return !isNaN(days) && days <= 7;
                }
                return false;
            });
        }

        if (selectedKey === 'lastMonth') {
            return sampleData.filter(item => {
                const time = item.time.toLowerCase();
                if (time.includes('weeks ago')) {
                    const weeks = parseInt(time.split(' ')[0], 10);
                    return !isNaN(weeks) && weeks <= 4;
                }
                return false;
            });
        }

        return sampleData;
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.headerRow}>
                <Text style={styles.header}>Historic</Text>
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
                showsHorizontalScrollIndicator={false}
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
        marginTop: 20,
        backgroundColor: '#F8F8F8',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
       // paddingHorizontal: 1,
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