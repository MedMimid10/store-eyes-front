import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AlertGrn from '../assets/AlrtGrn.svg';
import AlertRed from '../assets/AlrtRed.svg';
import CategoryFilter from '../components/CategoryFilter';
import HistoricCard from '../components/HistoricCard';

const sampleData = [
    // Today's data
    {
        title: 'Table #12 Served Late',
        by: 'Ahmed Salah',
        time: 'Today at 9:30 AM',
        type: 'served',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        details: {
            tableNumber: '12',
            orderTime: '9:00 AM',
            servedTime: '9:30 AM',
            delay: '30 min'
        },
        isAlert: true
    },
    {
        title: 'Table #8 Cleared Late',
        by: 'Mounia Raji',
        time: 'Today at 12:15 PM',
        type: 'cleared',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        details: {
            tableNumber: '8',
            finishedTime: '11:45 AM',
            clearedTime: '12:15 PM',
            delay: '30 min'
        },
        isAlert: true
    },
    {
        title: 'Table #3 Served On Time',
        by: 'Hassan Alaoui',
        time: 'Today at 2:15 PM',
        type: 'served',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertGrn,
        details: {
            tableNumber: '3',
            orderTime: '2:00 PM',
            servedTime: '2:15 PM',
            delay: '0 min'
        },
        isAlert: false
    },
    
    // This week's data (excluding today)
    {
        title: 'Table #5 Served On Time',
        by: 'Karim Idrissi',
        time: 'Yesterday at 7:20 PM',
        type: 'served',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertGrn,
        details: {
            tableNumber: '5',
            orderTime: '7:05 PM',
            servedTime: '7:20 PM',
            delay: '0 min'
        },
        isAlert: false
    },
    {
        title: 'Table #14 Cleared Late',
        by: 'Sara Benani',
        time: '3 days ago',
        type: 'cleared',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        details: {
            tableNumber: '14',
            finishedTime: '6:30 PM',
            clearedTime: '7:15 PM',
            delay: '45 min'
        },
        isAlert: true
    },
    {
        title: 'Table #7 Served Late',
        by: 'Amal Tazi',
        time: '4 days ago',
        type: 'served',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        details: {
            tableNumber: '7',
            orderTime: '1:00 PM',
            servedTime: '1:40 PM',
            delay: '40 min'
        },
        isAlert: true
    },
    
    // This month's data (excluding this week)
    {
        title: 'Table #19 Cleared Late',
        by: 'Yasmine Chaoui',
        time: '2 weeks ago',
        type: 'cleared',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        details: {
            tableNumber: '19',
            finishedTime: '8:15 PM',
            clearedTime: '9:00 PM',
            delay: '45 min'
        },
        isAlert: true
    },
    {
        title: 'Table #10 Served On Time',
        by: 'Omar Ziani',
        time: '2 weeks ago',
        type: 'served',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertGrn,
        details: {
            tableNumber: '10',
            orderTime: '12:30 PM',
            servedTime: '12:45 PM',
            delay: '0 min'
        },
        isAlert: false
    },
    {
        title: 'Table #22 Served Late',
        by: 'Fatima Kabbaj',
        time: '3 weeks ago',
        type: 'served',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        details: {
            tableNumber: '22',
            orderTime: '7:45 PM',
            servedTime: '8:30 PM',
            delay: '45 min'
        },
        isAlert: true
    },
    {
        title: 'Table #16 Cleared Late',
        by: 'Nabil Hadri',
        time: '4 weeks ago',
        type: 'cleared',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        details: {
            tableNumber: '16',
            finishedTime: '3:10 PM',
            clearedTime: '3:45 PM',
            delay: '35 min'
        },
        isAlert: true
    }
];

interface TableServingHistoricContainerProps {
    selectedTimeFilter: string;
    showOnlyAlerts?: boolean;
}

const TableServingHistoricContainer: React.FC<TableServingHistoricContainerProps> = ({ 
    selectedTimeFilter, 
    showOnlyAlerts = false 
}) => {
    const { t } = useTranslation();

    // Category options for table serving
    const categories = [t('all'), t('served'), t('cleared')];
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    // Filter data by time (cumulative)
    const filterDataByTime = (data: any[]) => {
        if (selectedTimeFilter === 'today') {
            return data.filter(item =>
                item.time.toLowerCase().includes('today')
            );
        }

        if (selectedTimeFilter === 'lastWeek') {
            return data.filter(item => {
                const time = item.time.toLowerCase();
                return time.includes('today') || 
                       time.includes('yesterday') || 
                       (time.includes('days ago') && parseInt(time.split(' ')[0], 10) <= 7);
            });
        }

        if (selectedTimeFilter === 'lastMonth') {
            return data.filter(item => {
                const time = item.time.toLowerCase();
                return time.includes('today') || 
                       time.includes('yesterday') || 
                       time.includes('days ago') || 
                       (time.includes('weeks ago') && parseInt(time.split(' ')[0], 10) <= 4);
            });
        }

        return data;
    };

    // Filter data by category
    const filterDataByCategory = (data: any[]) => {
        if (selectedCategory === t('all')) return data;
        
        const categoryLower = selectedCategory.toLowerCase();
        return data.filter(item => 
            categoryLower === t('served').toLowerCase() ? 
            item.type === 'served' : 
            item.type === 'cleared'
        );
    };

    // Filter by alert status
    const filterByAlertStatus = (data: any[]) => {
        if (!showOnlyAlerts) return data;
        return data.filter(item => item.isAlert);
    };

    // Apply all filters
    const getFilteredData = () => {
        const timeFiltered = filterDataByTime(sampleData);
        const categoryFiltered = filterDataByCategory(timeFiltered);
        return filterByAlertStatus(categoryFiltered);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{t('historic')}</Text>

            {/* Category Filter */}
            <View style={styles.categoryFilterContainer}>
                <CategoryFilter
                    categories={categories}
                    onCategoryChange={handleCategoryChange}
                    initialCategory={categories[0]}
                />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
            >
                {getFilteredData().map((item, idx) => (
                    <TableServingHistoricCard
                        key={idx}
                        title={item.title}
                        by={item.by}
                        time={item.time}
                        image={item.image}
                        AlertIcon={item.AlertIcon}
                        details={item.details}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

// Extended version of HistoricCard with additional details for table serving
const TableServingHistoricCard = ({ title, by, time, image, AlertIcon, details }: any) => {
    const [expanded, setExpanded] = useState(false);
    
    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                <HistoricCard
                    title={title}
                    by={by}
                    time={time}
                    image={image}
                    AlertIcon={AlertIcon}
                />
            </TouchableOpacity>
            
            {expanded && details && (
                <View style={styles.detailsContainer}>
                    {details.tableNumber && (
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Table:</Text>
                            <Text style={styles.detailValue}>#{details.tableNumber}</Text>
                        </View>
                    )}
                    {details.orderTime && (
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Order Time:</Text>
                            <Text style={styles.detailValue}>{details.orderTime}</Text>
                        </View>
                    )}
                    {details.servedTime && (
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Served Time:</Text>
                            <Text style={styles.detailValue}>{details.servedTime}</Text>
                        </View>
                    )}
                    {details.finishedTime && (
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Finished Time:</Text>
                            <Text style={styles.detailValue}>{details.finishedTime}</Text>
                        </View>
                    )}
                    {details.clearedTime && (
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Cleared Time:</Text>
                            <Text style={styles.detailValue}>{details.clearedTime}</Text>
                        </View>
                    )}
                    {details.delay && (
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Delay:</Text>
                            <Text style={styles.detailValue}>{details.delay}</Text>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontFamily: 'Raleway',
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        marginBottom: 16,
    },
    categoryFilterContainer: {
        marginBottom: 16,
    },
    list: {
        paddingBottom: 20,
    },
    cardContainer: {
    },
    detailsContainer: {
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        padding: 16,
        marginTop: -8,
        marginBottom: 8,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailLabel: {
        fontFamily: 'Raleway',
        fontSize: 14,
        color: '#666',
    },
    detailValue: {
        fontFamily: 'Raleway',
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
});

export default TableServingHistoricContainer; 