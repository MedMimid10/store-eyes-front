import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CategoryFilterProps = {
  categories: string[];
  onCategoryChange?: (category: string) => void;
  initialCategory?: string;
};

const CategoryFilter = ({ 
  categories, 
  onCategoryChange, 
  initialCategory 
}: CategoryFilterProps) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || categories[0]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  return (
    <View style={styles.tabsContainer}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.tab,
            selectedCategory === category && styles.selectedTab
          ]}
          onPress={() => handleCategorySelect(category)}
        >
          <Text style={[
            styles.tabText,
            selectedCategory === category && styles.selectedTabText
          ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 22,
    borderRadius: 12,
    marginRight: 20,
    backgroundColor: '#fff',
  },
  selectedTab: {
    backgroundColor: '#2691A3',
  },
  tabText: {
    color: '#2691A3',
    fontSize: 14,
  },
  selectedTabText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default CategoryFilter; 