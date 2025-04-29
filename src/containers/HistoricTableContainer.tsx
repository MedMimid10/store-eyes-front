// src/containers/HistoricTableContainer.tsx
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import CategoryFilter from '../components/CategoryFilter';
import HistoricCard from '../components/HistoricCard';
import TimeFilterDropdown from '../components/TimeFilterDropdown';

import AlertRed from '../assets/AlrtRed.svg';

type AlertItem = {
    title: string;
    by: string;
    time: string;
    image: any;
    AlertIcon: any;
    category: 'Cleaning Table' | 'Serving Table';
    isAlert: boolean;
};

// Sample data - only red alerts (all are problems that need attention)
const ALERT_DATA: AlertItem[] = [
    // Today's alerts
    {
        title: 'Toilet Cleaning Delayed',
        by: 'Fatima Larak',
        time: 'Today at 8:00 AM',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        category: 'Cleaning Table',
        isAlert: true
    },
    {
        title: 'Table #5 Served Late',
        by: 'Ahmed Raji',
        time: 'Today at 12:30 PM',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        category: 'Serving Table',
        isAlert: true
    },
    
    // Last Week's alerts (excluding today)
    {
        title: 'Non Served Table #12',
        by: 'Ali Benomar',
        time: 'Yesterday at 4:00 PM',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        category: 'Serving Table',
        isAlert: true
    },
    {
        title: 'Broken Window in Restroom',
        by: 'Karim Salhi',
        time: '3 days ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        category: 'Cleaning Table',
        isAlert: true
    },
    {
        title: 'Table #8 Cleared Late',
        by: 'Leila Douiri',
        time: '5 days ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        category: 'Serving Table',
        isAlert: true
    },
    
    // Last Month's alerts (excluding last week)
    {
        title: 'Monthly Maintenance Delayed',
        by: 'Mounia Salah',
        time: '3 weeks ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        category: 'Cleaning Table',
        isAlert: true
    },
    {
        title: 'Kitchen Area Not Cleaned',
        by: 'Omar Sabri',
        time: '2 weeks ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        category: 'Cleaning Table',
        isAlert: true
    },
    {
        title: 'Table #15 Order Missed',
        by: 'Nadia Chaoui',
        time: '4 weeks ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        category: 'Serving Table',
        isAlert: true
    }
];

const CATEGORY_OPTIONS = ['All', 'Cleaning Table', 'Serving Table'];

const HistoricTableContainer: React.FC = () => {
    const { t } = useTranslation();

    // Time filter options - to be shown in dropdown
    const TIME_FILTER_OPTIONS = [
        t('today'),
        t('lastWeek'),
        t('lastMonth')
    ];

    const [selectedTime, setSelectedTime] = useState<string>(TIME_FILTER_OPTIONS[0]);
    const [selectedCategory, setSelectedCategory] = useState(CATEGORY_OPTIONS[0]);

    const handleTimeFilterChange = (time: string) => {
        setSelectedTime(time);
    };

    // Filtrage combiné : catégorie + temps (cumulative time filtering)
    const filteredData = ALERT_DATA.filter(item => {
        // Catégorie
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
            return false;
        }
        
        // Temps - cumulative filtering
        const txt = item.time.toLowerCase();
        
        if (selectedTime === t('today')) {
            return txt.includes('today');
        }
        
        if (selectedTime === t('lastWeek')) {
            return txt.includes('today') || 
                   txt.includes('yesterday') || 
                   (txt.match(/(\d+)\s+days\s+ago/) !== null && 
                    Number(txt.match(/(\d+)\s+days\s+ago/)![1]) <= 7);
        }
        
        if (selectedTime === t('lastMonth')) {
            return txt.includes('today') || 
                   txt.includes('yesterday') || 
                   txt.match(/(\d+)\s+days\s+ago/) !== null || 
                   (txt.match(/(\d+)\s+weeks\s+ago/) !== null && 
                    Number(txt.match(/(\d+)\s+weeks\s+ago/)![1]) <= 4);
        }
        
        return true;
    });


    return (
        <View style={styles.wrapper}>
            {/* Entête + filtre temps */}
            <View style={styles.headerRow}>
                <Text style={styles.header}>{t('historic')}</Text>
                <TimeFilterDropdown 
                    options={TIME_FILTER_OPTIONS}
                    onSelect={handleTimeFilterChange}
                    initialOption={TIME_FILTER_OPTIONS[0]}
                    label=""
                />
            </View>

            {/* Filtre de catégorie */}
            <View style={styles.categoryFilterContainer}>
                <CategoryFilter
                    categories={CATEGORY_OPTIONS}
                    initialCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
            </View>

            {/* Liste des cartes */}
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
            >
                {filteredData.map((item, idx) => (
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
        marginTop: 12,
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
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
    timeFilter: {
        fontSize: 12,
        color: '#666',
        fontFamily: 'Raleway',
        marginRight: 6,
    },
    categoryFilterContainer: {
    }
});

export default HistoricTableContainer;
