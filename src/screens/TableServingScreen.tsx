import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TitleHeader from '../components/TitleHeader';
import TableServingHistoricContainer from '../containers/TableServingHistoricContainer';
import HeaderCompo from '../components/HeaderCompo';

// Mock stats data that would be updated based on time filter in a real app
const initialStats = {
  totalTableServing: 10,
  tableServedLate: 4,
  tableClearedLate: 3
};

const TableServingScreen = () => {
  const { t } = useTranslation();
  
  // Time filter options
  const TimeFilterOptions = [
    { key: 'today', label: t('today') },
    { key: 'lastWeek', label: t('lastWeek') },
    { key: 'lastMonth', label: t('lastMonth') },
  ];

  const [selectedTimeFilter, setSelectedTimeFilter] = useState(TimeFilterOptions[0].key);
  const [showTimeFilterDropdown, setShowTimeFilterDropdown] = useState(false);
  const [stats, setStats] = useState(initialStats);

  const toggleTimeFilterDropdown = () => {
    setShowTimeFilterDropdown(!showTimeFilterDropdown);
  };

  const selectTimeFilter = (filterKey: string) => {
    setSelectedTimeFilter(filterKey);
    setShowTimeFilterDropdown(false);
  };

  // In a real app, this would fetch updated stats based on the time filter
  useEffect(() => {
    // This is just for demonstration - in a real app, you would fetch data here
    if (selectedTimeFilter === 'today') {
      setStats({
        totalTableServing: 3,
        tableServedLate: 1,
        tableClearedLate: 1
      });
    } else if (selectedTimeFilter === 'lastWeek') {
      setStats({
        totalTableServing: 6,
        tableServedLate: 2,
        tableClearedLate: 2
      });
    } else if (selectedTimeFilter === 'lastMonth') {
      setStats({
        totalTableServing: 10,
        tableServedLate: 4,
        tableClearedLate: 3
      });
    }
  }, [selectedTimeFilter]);

  return (
    <View style={styles.container}>
      <HeaderCompo 
        title={t('tableServing')} 
        subtitle={t('trackTableServingInsights')} 
      />
      
      {/* Global Time Filter */}
      <View style={styles.filterContainer}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7F9',
    paddingHorizontal: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 16,
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
  unifiedCardContainer: {
    marginBottom: 20,
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
  },
});

export default TableServingScreen; 