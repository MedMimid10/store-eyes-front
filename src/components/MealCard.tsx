import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';

type MealCardProps = {
  title: string;
  image: string;
  pricePerUnit: number;
  soldUnits: number;
  totalPrice: number;
};

const MealCard = ({ title, image, pricePerUnit, soldUnits, totalPrice }: MealCardProps) => {
  const { t } = useTranslation();
  // Use a fallback image if the provided URL doesn't load
  const fallbackImage = 'https://cdn.pixabay.com/photo/2018/04/09/18/26/asparagus-3304997_1280.jpg';

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: image || fallbackImage }} 
        style={styles.image} 
        onError={(error) => console.log('Image error:', error.nativeEvent.error)}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>{t('pricePerUnit')}</Text>
            <View style={styles.currencyRow}>
              <Text style={styles.detailValue}>{pricePerUnit.toFixed(2)}</Text>
              <Text style={styles.currencyText}>MAD</Text>
            </View>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>{t('soldUnit')}</Text>
            <Text style={styles.detailValue}>{soldUnits}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>{t('totalPrice')}</Text>
            <View style={styles.currencyRow}>
              <Text style={styles.detailValue}>{totalPrice.toFixed(2)}</Text>
              <Text style={styles.currencyText}>MAD</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: '#f0f0f0', // Placeholder color while loading
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currencyText: {
    fontSize: 10,
    color: '#666',
    marginLeft: 2,
  },
});

export default MealCard; 