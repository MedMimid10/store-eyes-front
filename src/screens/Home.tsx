import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CarteService from '../components/CarteService';
import StatisticCard from '../components/StatisticCard';
import '../i18n'; // Import i18n configuration

interface HomeScreenProps {
  onLogout: () => void;
}

const HomeScreen = ({ onLogout }: HomeScreenProps) => {
  const { t, i18n } = useTranslation();
  
  // Update TimeFilterOptions to use translations
  const TimeFilterOptions = [t('today'), t('lastWeek'), t('lastMonth')];
  
  const [selectedTimeFilter, setSelectedTimeFilter] = useState(TimeFilterOptions[0]);
  const [showTimeFilterDropdown, setShowTimeFilterDropdown] = useState(false);
  
  const toggleTimeFilterDropdown = () => {
    setShowTimeFilterDropdown(!showTimeFilterDropdown);
  };
  
  const selectTimeFilter = (filter: string) => {
    setSelectedTimeFilter(filter);
    setShowTimeFilterDropdown(false);
  };
  
  // Toggle language function
  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLanguage);
  };
  
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{t('greeting')}</Text>
          <Text style={styles.username}>Mohammed kacim</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
            <Text style={styles.languageText}>{i18n.language.toUpperCase()}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onLogout}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
              style={styles.profileImage} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Statistics Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('statistics')}</Text>
          
          {/* Time Filter Dropdown */}
          <View>
            <TouchableOpacity 
              style={styles.timeFilterButton} 
              onPress={toggleTimeFilterDropdown}
            >
              <Text style={styles.timeFilter}>{selectedTimeFilter}</Text>
              <Feather name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>
            
            {showTimeFilterDropdown && (
              <View style={styles.timeFilterDropdown}>
                {TimeFilterOptions.map((filter) => (
                  <TouchableOpacity 
                    key={filter} 
                    style={styles.timeFilterOption}
                    onPress={() => selectTimeFilter(filter)}
                  >
                    <Text style={[
                      styles.timeFilterOptionText,
                      filter === selectedTimeFilter && styles.selectedTimeFilterOption
                    ]}>
                      {filter}
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
                value="9" 
                hasAlert={true} 
              />
            </View>
            <View style={styles.statisticColumnRight}>
              <StatisticCard 
                title={t('totalConsumation')} 
                value="78" 
                hasAlert={false} 
              />
            </View>
          </View>
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('services')}</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>{t('viewAll')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.servicesContainer}>
          <CarteService iconType="meal" label={t('mealServing')} />
          <CarteService iconType="clean" label={t('cleaning')} />
          <CarteService iconType="table" label={t('tableServing')} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7F9',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 40,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageButton: {
    backgroundColor: '#2691A3',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  languageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
  },
  username: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Raleway-Medium',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  section: {
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
    paddingVertical: 8,
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
    fontSize: 14,
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
  viewAll: {
    fontSize: 14,
    color: '#2691A3',
    fontFamily: 'Raleway-Medium',
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
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default HomeScreen;
