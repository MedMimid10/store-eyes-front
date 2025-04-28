import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StatisticCard from '../components/StatisticCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useSse } from '../sse/sse-context';


// Define time filter keys (consistent across languages)
const TIME_FILTER_KEYS = ['today', 'lastweek', 'lastmonth'];

type StatisticCardsContainerProps = {
  onTimeFilterChange?: (filter: string) => void;
};

const StatisticCardsContainer = ({ onTimeFilterChange }: StatisticCardsContainerProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();  
  const { t, i18n } = useTranslation();
  
  // Track selected filter by its key, not by the translated text
  const [selectedFilterKey, setSelectedFilterKey] = useState(TIME_FILTER_KEYS[0]);
  const [showTimeFilterDropdown, setShowTimeFilterDropdown] = useState(false);


  const {products, totalCount} = useSse();
  
  // Update when language changes
  useEffect(() => {
    // This effect will run when i18n.language changes
    // We don't need to do anything here, just forcing a re-render
  }, [i18n.language]);
  
  const toggleTimeFilterDropdown = () => {
    setShowTimeFilterDropdown(!showTimeFilterDropdown);
  };
  
  const selectTimeFilter = (key: string) => {
    setSelectedFilterKey(key);
    setShowTimeFilterDropdown(false);
    if (onTimeFilterChange) {
      onTimeFilterChange(key);
    }
  };

  // Get current filter translated text
  const selectedFilterTranslated = t(selectedFilterKey);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t('statistics')}</Text>
        
        {/* Time Filter Dropdown */}
        <View>
          <TouchableOpacity 
            style={styles.timeFilterButton} 
            onPress={toggleTimeFilterDropdown}
          >
            <Text style={styles.timeFilter}>{selectedFilterTranslated}</Text>
            <Feather name="chevron-down" size={16} color="#666" />
          </TouchableOpacity>
          
          {showTimeFilterDropdown && (
            <View style={styles.timeFilterDropdown}>
              {TIME_FILTER_KEYS.map((key) => (
                <TouchableOpacity 
                  key={key} 
                  style={styles.timeFilterOption}
                  onPress={() => selectTimeFilter(key)}
                >
                  <Text style={[
                    styles.timeFilterOptionText,
                    key === selectedFilterKey && styles.selectedTimeFilterOption
                  ]}>
                    {t(key)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <View style={styles.statisticsGrid}>
        <View style={styles.statisticRow}>
          <View style={styles.statisticColumnLeft}>
            <StatisticCard 
              title={t('totalRevenue')} 
              value="1000,00 MAD"
              hasAlert={false}
              showCurrency={true}
            />
          </View>
          <View style={styles.statisticColumnRight}>
            <StatisticCard 
              title={t('totalSold')} 
              value="160" 
              hasAlert={false} 
            />
          </View>
        </View>

        <View style={styles.statisticRow}>
          <View style={styles.statisticColumnLeft}>
            <StatisticCard 
              title={t('nonResolvedAlert')} 
              value="0"
              hasAlert={true}
              onPress={() => navigation.navigate('Alert')}
            />
          </View>
          <View style={styles.statisticColumnRight}>
            <StatisticCard 
              title={t('totalConsumation')} 
              value={totalCount}
              hasAlert={false} 
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
  },
  timeFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    minWidth: 120,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timeFilter: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Raleway-Medium',
    marginRight: 8,
  },
  timeFilterDropdown: {
    position: 'absolute',
    top: 45,
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  timeFilterOptionText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Raleway-Medium',
  },
  selectedTimeFilterOption: {
    color: '#2691A3',
    fontWeight: '600',
  },
  statisticsGrid: {
    flexDirection: 'column',
  },
  statisticRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statisticColumnLeft: {
    flex: 1,
    marginRight: 8,
  },
  statisticColumnRight: {
    flex: 1,
    marginLeft: 8,
  },
});

export default StatisticCardsContainer; 