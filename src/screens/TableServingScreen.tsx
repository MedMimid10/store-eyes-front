import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderCompo from '../components/HeaderCompo';
import TimeFilterDropdown from '../components/TimeFilterDropdown';
import TitleHeader from '../components/TitleHeader';
import TableServingHistoricContainer from '../containers/TableServingHistoricContainer';

const { height } = Dimensions.get('window');

// Mock stats data that would be updated based on time filter in a real app
const initialStats = {
  totalTableServing: 10,
  tableServedLate: 4,
  tableClearedLate: 3
};

const TableServingScreen = () => {
  const { t } = useTranslation();
  
  // Time filter options as translated strings
  const TIME_FILTER_OPTIONS = [
    t('today'),
    t('lastWeek'),
    t('lastMonth')
  ];

  const [selectedTimeFilter, setSelectedTimeFilter] = useState(TIME_FILTER_OPTIONS[0]);
  const [stats, setStats] = useState(initialStats);

  const handleTimeFilterChange = (time: string) => {
    setSelectedTimeFilter(time);
  };

  // In a real app, this would fetch updated stats based on the time filter
  useEffect(() => {
    // This is just for demonstration - in a real app, you would fetch data here
    if (selectedTimeFilter === t('today')) {
      setStats({
        totalTableServing: 3,
        tableServedLate: 1,
        tableClearedLate: 1
      });
    } else if (selectedTimeFilter === t('lastWeek')) {
      setStats({
        totalTableServing: 6,
        tableServedLate: 2,
        tableClearedLate: 2
      });
    } else if (selectedTimeFilter === t('lastMonth')) {
      setStats({
        totalTableServing: 10,
        tableServedLate: 4,
        tableClearedLate: 3
      });
    }
  }, [selectedTimeFilter]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#2691A3" barStyle="light-content" />
      
      {/* iOS status bar background */}
      {Platform.OS === 'ios' && <View style={styles.iosStatusBar} />}
      
      <SafeAreaView style={styles.safeArea} edges={['right', 'left', 'bottom']}>
        <View style={styles.container}>
          <HeaderCompo 
            title={t('tableServing')} 
            subtitle={t('trackTableServingInsights')} 
          />
          
          {/* Global Time Filter */}
          <View style={styles.filterContainer}>
            <TimeFilterDropdown 
              options={TIME_FILTER_OPTIONS}
              onSelect={handleTimeFilterChange}
              initialOption={TIME_FILTER_OPTIONS[0]}
              label=""
            />
          </View>
          
          {/* Unified Statistics Card */}
          <View style={styles.unifiedCardContainer}>
            <View style={styles.unifiedCard}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.totalTableServing}</Text>
                <Text style={styles.statLabel}>{t('totalTableServing')}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={[styles.statValue, styles.alertValue]}>{stats.tableServedLate}</Text>
                <Text style={styles.statLabel}>{t('tableServedLate')}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={[styles.statValue, styles.alertValue]}>{stats.tableClearedLate}</Text>
                <Text style={styles.statLabel}>{t('tableClearedLate')}</Text>
              </View>
            </View>
          </View>

          {/* History Section with fixed height */}
          <View style={styles.historyContainer}>
            <TableServingHistoricContainer 
              selectedTimeFilter={selectedTimeFilter}
              showOnlyAlerts={true}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F7F9',
  },
  iosStatusBar: {
    height: Platform.OS === 'ios' ? 40 : 0, // Adjust as needed
    backgroundColor: '#2691A3',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  unifiedCardContainer: {
    marginTop: 10,
  },
  unifiedCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  alertValue: {
    color: '#E74C3C',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  historyContainer: {
    flex: 1,
    height: height * 0.4,
  },
});

export default TableServingScreen; 