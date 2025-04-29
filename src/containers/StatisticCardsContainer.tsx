import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StatisticCard from '../components/StatisticCard';
import TimeFilterDropdown from '../components/TimeFilterDropdown';
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
  
  // Create translated options for TimeFilterDropdown
  const TIME_FILTER_OPTIONS = TIME_FILTER_KEYS.map(key => t(key));
  
  // Track selected filter by its index to easily map back to keys
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);

  const {products, totalCount} = useSse();
  
  // Handle time filter selection from TimeFilterDropdown
  const handleTimeFilterChange = (option: string) => {
    // Find the index of the selected option
    const index = TIME_FILTER_OPTIONS.findIndex(opt => opt === option);
    setSelectedFilterIndex(index);
    
    // Call the parent's onTimeFilterChange with the corresponding key
    if (onTimeFilterChange && index >= 0) {
      onTimeFilterChange(TIME_FILTER_KEYS[index]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t('statistics')}</Text>
        
        {/* Time Filter Dropdown */}
        <TimeFilterDropdown 
          options={TIME_FILTER_OPTIONS}
          onSelect={handleTimeFilterChange}
          initialOption={TIME_FILTER_OPTIONS[selectedFilterIndex]}
          label=""
        />
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