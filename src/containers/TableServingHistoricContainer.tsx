import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AlertGrn from '../assets/AlrtGrn.svg';
import AlertRed from '../assets/AlrtRed.svg';
import CategoryFilter from '../components/CategoryFilter';
import HistoricCard from '../components/HistoricCard';
import TimeFilterDropdown from '../components/TimeFilterDropdown';

type AlertItem = {
    title: string;
    by: string;
    time: string;
    image: any;
    AlertIcon: any;
    category: string;
    isAlert: boolean;
};

// Sample data with more comprehensive time stamps and categories
const ALERT_DATA: AlertItem[] = [
    // Today's alerts
    {
        title: 'Table #5 Served Late',
        by: 'Ahmed Raji',
        time: 'Today at 12:30 PM',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        category: 'Serving Table',
        isAlert: true
    },
    {
        title: 'Table #8 Cleared Late',
        by: 'Mohammed Tazi',
        time: 'Today at 2:45 PM',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        category: 'Cleaning Table',
        isAlert: true
    },
    {
        title: 'Table #3 Served On Time',
        by: 'Sara Alami',
        time: 'Today at 1:15 PM',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertGrn,
        category: 'Serving Table',
        isAlert: false
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
        title: 'Table #8 Cleared Late',
        by: 'Leila Douiri',
        time: '5 days ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        category: 'Clearing Table',
        isAlert: true
    },
    {
        title: 'Table #7 Cleared On Time',
        by: 'Karim Salhi',
        time: '3 days ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertGrn,
        category: 'Cleaning Table',
        isAlert: false
    },
    
    // Last Month's alerts (excluding last week)
    {
        title: 'Table #15 Order Missed',
        by: 'Nadia Chaoui',
        time: '4 weeks ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        category: 'Serving Table',
        isAlert: true
    },
    {
        title: 'Table #9 Served Late',
        by: 'Hassan Mansouri',
        time: '2 weeks ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        category: 'Serving Table',
        isAlert: true
    },
    {
        title: 'Table #11 Cleared Late',
        by: 'Yasmine Idrissi',
        time: '3 weeks ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        category: 'Cleaning Table',
        isAlert: true
    }
];

const CATEGORY_OPTIONS = ['All', 'Serving Table', 'Cleaning Table'];

type TableServingHistoricContainerProps = {
    selectedTimeFilter?: string;
    showOnlyAlerts?: boolean;
};

const TableServingHistoricContainer: React.FC<TableServingHistoricContainerProps> = ({
    selectedTimeFilter: externalTimeFilter,
    showOnlyAlerts = false
}) => {
    const { t } = useTranslation();

    // Time filter options - to be shown in dropdown
    const TIME_FILTER_OPTIONS = [
        t('today'),
        t('lastWeek'),
        t('lastMonth')
    ];
    
    // Internal time filter state if not provided externally
    const [internalSelectedTime, setInternalSelectedTime] = useState<string>(TIME_FILTER_OPTIONS[0]);
    const [selectedCategory, setSelectedCategory] = useState(CATEGORY_OPTIONS[0]);
    
    // Use external time filter if provided, otherwise use internal state
    const selectedTime = externalTimeFilter || internalSelectedTime;
    
    const handleTimeFilterChange = (time: string) => {
        setInternalSelectedTime(time);
    };

    // Filtering logic for time and category
    const filteredData = ALERT_DATA.filter(item => {
        // Skip non-alerts if showOnlyAlerts is true
        if (showOnlyAlerts && !item.isAlert) {
            return false;
        }
        
        // Category filter
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
            return false;
        }
        
        // Time filter - cumulative filtering
        const txt = item.time.toLowerCase();
        
        if (selectedTime === t('today') || selectedTime === 'today') {
            return txt.includes('today');
        }
        
        if (selectedTime === t('lastWeek') || selectedTime === 'lastWeek') {
            return txt.includes('today') || 
                   txt.includes('yesterday') || 
                   (txt.match(/(\d+)\s+days\s+ago/) !== null && 
                    Number(txt.match(/(\d+)\s+days\s+ago/)![1]) <= 7);
        }
        
        if (selectedTime === t('lastMonth') || selectedTime === 'lastMonth') {
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
            {/* Header + time filter */}
            <View style={styles.headerRow}>
                <Text style={styles.header}>{t('historic')}</Text>
                
                {/* Only show internal time filter if no external filter is provided */}
                {!externalTimeFilter && (
                    <TimeFilterDropdown 
                        options={TIME_FILTER_OPTIONS}
                        onSelect={handleTimeFilterChange}
                        initialOption={TIME_FILTER_OPTIONS[0]}
                        label=""
                    />
                )}
            </View>

            {/* Category filter */}
            <View style={styles.categoryFilterContainer}>
                <CategoryFilter
                    categories={CATEGORY_OPTIONS}
                    initialCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
            </View>

            {/* Cards list */}
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
            >
                {filteredData.length > 0 ? (
                    filteredData.map((item, idx) => (
                        <HistoricCard
                            key={idx}
                            title={item.title}
                            by={item.by}
                            time={item.time}
                            image={item.image}
                            AlertIcon={item.AlertIcon}
                        />
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>{t('noRecordsFound')}</Text>
                    </View>
                )}
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
    categoryFilterContainer: {
        marginBottom: 10,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#666',
        fontFamily: 'Raleway',
    }
});

export default TableServingHistoricContainer; 