import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CarteService from '../components/CarteService';

type ServiceCardsContainerProps = {
  onViewAll?: () => void;
};

const ServiceCardsContainer = ({ onViewAll }: ServiceCardsContainerProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t('services')}</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>{t('viewAll')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.servicesContainer}>
        <CarteService iconType="meal" label={t('mealServing')} />
        <CarteService iconType="clean" label={t('cleaning')} />
        <CarteService iconType="table" label={t('tableServing')} />
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
  viewAll: {
    fontSize: 14,
    color: '#2691A3',
    fontFamily: 'Raleway-Medium',
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default ServiceCardsContainer; 