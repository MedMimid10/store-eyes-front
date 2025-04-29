import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';

type MealCardProps = {
  title: string;
  image: string;
  pricePerUnit: number;
  soldUnitsSystem: number;
  soldUnitsCamera: number;
};

const MealCard = ({ title, image, pricePerUnit, soldUnitsSystem, soldUnitsCamera }: MealCardProps) => {
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
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.detail}>
            <Text style={styles.detailLabel} numberOfLines={1}>{t('pricePerUnit')}</Text>
            <View style={styles.currencyRow}>
              <Text style={styles.detailValue}>{pricePerUnit.toFixed(2)}</Text>
              <Text style={styles.currencyText}>MAD</Text>
            </View>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel} numberOfLines={1}>{t('systemUnits')}</Text>
            <Text style={styles.detailValue}>{soldUnitsSystem}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel} numberOfLines={1}>{t('cameraUnits')}</Text>
            <Text style={[
              styles.detailValue, 
              soldUnitsCamera > soldUnitsSystem ? styles.higherValue : 
              soldUnitsCamera < soldUnitsSystem ? styles.lowerValue : null
            ]}>
              {soldUnitsCamera}
            </Text>
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
    padding: 10,
    marginBottom: 10,
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
    flex: 1,
    minWidth: 0, // Allows text truncation to work properly
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  higherValue: {
    color: '#2ecc71', // Green for higher camera values
  },
  lowerValue: {
    color: '#e74c3c', // Red for lower camera values
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