import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MealCard from '../components/MealCard';

type Meal = {
  id: string;
  title: string;
  image: string;
  pricePerUnit: number;
  soldUnits: number;
  totalPrice: number;
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
            soldUnits={item.soldUnits}
            totalPrice={item.totalPrice}
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
    paddingBottom: 20,
  }
});

export default MealListContainer; 