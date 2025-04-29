import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Platform, SafeAreaView as RNSafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderCompo from '../components/HeaderCompo';
import TitleHeader from '../components/TitleHeader';
import MealListContainer from '../containers/MealListContainer';
import SearchFilterContainer from '../containers/SearchFilterContainer';

// Enhanced Sample data with category and time

const CATEGORIES = ['All', 'Food', 'Drink'];
const TIME_OPTIONS = ['Today', 'Last Week', 'Last Month'];

const MealServingScreen = () => {

  const MEAL_DATA = [
    {
      id: '1',
      title: 'Café Noir',
      image: 'https://everestorganichome.com/image/cache/catalog/Coffee/benefits%20of%20black%20coffee-1263x660.jpeg',
      pricePerUnit: 25.00,
      soldUnitsSystem: 15,
      soldUnitsCamera: 17,
      totalPriceSystem: 375.00,
      totalPriceCamera: 425.00,
      category: 'Drink',
      time: 'Today'
    },
  
    {
      id: '2',
      title: 'Café Latte',
      image: 'https://cdn.pixabay.com/photo/2016/11/29/02/10/caffeine-1866758_1280.jpg',
      pricePerUnit: 44.00,
      soldUnitsSystem: 10,
      soldUnitsCamera: 12,
      totalPriceSystem: 440.00,
      totalPriceCamera: 528.00,
      category: 'Drink',
      time: 'Today'
    },
    {
      id: '3',
      title: 'Thé',
      image: 'https://cdn.pixabay.com/photo/2015/07/02/20/37/cup-829527_1280.jpg',
      pricePerUnit: 44.00,
      soldUnitsSystem: 10,
      soldUnitsCamera: 9,
      totalPriceSystem: 440.00,
      totalPriceCamera: 396.00,
      category: 'Drink',
      time: 'Today'
    },
    {
      id: '20',
      title: 'Salade Gusto',
      image: 'https://cdn.pixabay.com/photo/2018/04/09/18/26/asparagus-3304997_1280.jpg',
      pricePerUnit: 44.00,
      soldUnitsSystem: 10,
      soldUnitsCamera: 11,
      totalPriceSystem: 440.00,
      totalPriceCamera: 484.00,
      category: 'Food',
      time: 'Last Week'
    },
    {
      id: '30',
      title: 'Pizza Margherita',
      image: 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg',
      pricePerUnit: 60.00,
      soldUnitsSystem: 8,
      soldUnitsCamera: 10,
      totalPriceSystem: 480.00,
      totalPriceCamera: 600.00,
      category: 'Food',
      time: 'Last Week'
    },
    
    {
      id: '40',
      title: 'Fresh Orange Juice',
      image: 'https://cdn.pixabay.com/photo/2017/01/20/14/59/orange-1995044_1280.jpg',
      pricePerUnit: 30.00,
      soldUnitsSystem: 12,
      soldUnitsCamera: 14,
      totalPriceSystem: 360.00,
      totalPriceCamera: 420.00,
      category: 'Drink',
      time: 'Last Week'
    },
    {
      id: '50',
      title: 'Pasta Carbonara',
      image: 'https://cdn.pixabay.com/photo/2020/01/31/07/26/pasta-4807317_1280.jpg',
      pricePerUnit: 55.00,
      soldUnitsSystem: 6,
      soldUnitsCamera: 8,
      totalPriceSystem: 330.00,
      totalPriceCamera: 440.00,
      category: 'Food',
      time: 'Last Week'
    },
  ];

  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [selectedTimeOption, setSelectedTimeOption] = useState(TIME_OPTIONS[0]);
  const [meals, setMeals] = useState(MEAL_DATA);
  
  // Translated time options for UI
  const translatedTimeOptions = TIME_OPTIONS.map(option => t(option.replace(' ', '').toLowerCase()));
  
  // Create a mapping between translated and original time options
  const timeOptionsMap = TIME_OPTIONS.reduce((acc, option, index) => {
    acc[translatedTimeOptions[index]] = option;
    return acc;
  }, {} as Record<string, string>);

  // Filter meals based on search, category and time
  const filteredMeals = meals.filter(meal => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      meal.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === 'All' || 
      meal.category === selectedCategory;
    
    // Time filter
    const matchesTime = selectedTimeOption === 'Today' ? 
      meal.time === 'Today' : 
      selectedTimeOption === 'Last Week' ? 
        (meal.time === 'Today' || meal.time === 'Last Week') : 
        true; // Last Month shows all
    
    return matchesSearch && matchesCategory && matchesTime;
  });

  // Calculate summary statistics
  const totalSoldUnitsSystem = filteredMeals.reduce((sum, meal) => sum + (meal.soldUnitsSystem || 0), 0);
  const totalSoldUnitsCamera = filteredMeals.reduce((sum, meal) => sum + (meal.soldUnitsCamera || 0), 0);
  const totalPriceSystem = filteredMeals.reduce((sum, meal) => sum + (meal.totalPriceSystem || 0), 0);
  const totalPriceCamera = filteredMeals.reduce((sum, meal) => sum + (meal.totalPriceCamera || 0), 0);

  // For debugging
  useEffect(() => {
    console.log('Selected time option:', selectedTimeOption);
    console.log('Filtered meals count:', filteredMeals.length);
  }, [selectedTimeOption, filteredMeals.length]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#2691A3" barStyle="light-content" />
      
      {/* iOS status bar background */}
      {Platform.OS === 'ios' && <View style={styles.iosStatusBar} />}
      
      <SafeAreaView style={styles.safeArea} edges={['right', 'left', 'bottom']}>
        <View style={styles.container}>
          <HeaderCompo
            title={t('mealServing')} 
            subtitle={t('trackFoodServingInsights')} 
          />
          
          <SearchFilterContainer 
            categories={CATEGORIES.map(category => t(category.toLowerCase()))}
            timeOptions={translatedTimeOptions}
            onSearch={setSearchQuery}
            onCategoryChange={(category) => {
              // Find the original category (before translation)
              const index = CATEGORIES.map(c => t(c.toLowerCase())).findIndex(c => c === category);
              if (index !== -1) {
                setSelectedCategory(CATEGORIES[index]);
              }
            }}
            onTimeChange={(translatedTime) => {
              // Use the mapping to find the original time option
              const originalTime = timeOptionsMap[translatedTime];
              if (originalTime) {
                setSelectedTimeOption(originalTime);
              }
            }}
          />
          
          <View style={styles.mealListWrapper}>
            <MealListContainer meals={filteredMeals} />
          </View>
        </View>
      </SafeAreaView>
      
      {/* Fixed Summary Cards at the bottom */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>{t('systemRevenue')}</Text>
          <View style={styles.currencyRow}>
            <Text style={styles.summaryValue}>{totalPriceSystem.toFixed(2)}</Text>
            <Text style={styles.currencyText}>MAD</Text>
          </View>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>{t('cameraRevenue')}</Text>
          <View style={styles.currencyRow}>
            <Text style={styles.summaryValue}>{totalPriceCamera.toFixed(2)}</Text>
            <Text style={styles.currencyText}>MAD</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F7F9',
    position: 'relative'
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
    marginBottom: 92 // Add bottom margin to make space for the summary cards
  },
  mealListWrapper: {
    flex: 1
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    backgroundColor: '#F5F7F9',
    position: 'absolute',
    bottom: 2,
    left: 16,
    right: 16,
    zIndex: 10
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    width: '48.5%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2691A3',
    textAlign: 'center',
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  currencyText: {
    fontSize: 12,
    color: '#2691A3',
    marginLeft: 2,
    fontWeight: '500',
  }
});

export default MealServingScreen; 