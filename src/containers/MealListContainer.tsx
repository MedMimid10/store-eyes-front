import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MealCard from '../components/MealCard';

type Meal = {
  id: string;
  title: string;
  image: string;
  pricePerUnit: number;
  soldUnitsSystem: number;
  soldUnitsCamera: number;
  totalPriceSystem: number;
  totalPriceCamera: number;
  category: string;
  time: string;
};

type MealListContainerProps = {
  meals: Meal[];
};

const MealListContainer = ({ meals }: MealListContainerProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MealCard
            title={item.title}
            image={item.image}
            pricePerUnit={item.pricePerUnit}
            soldUnitsSystem={item.soldUnitsSystem}
            soldUnitsCamera={item.soldUnitsCamera}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 10,
  }
});

export default MealListContainer; 