import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import '../i18n';
import HeaderCompo from '../components/HeaderCompo';
import AreaCard from '../components/AreaCard';
import CleaningIcon from '../assets/alert-green.svg';
import HistoricTableContainer from '../containers/HistoricTableContainer';

const AlertScreen = () => {
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderCompo
        title={t('alert.title')}
        subtitle={t('alert.subtitle')}
      />

      <AreaCard
        header={t('alert.recentActivity')}
        details={[
          { label: t('alert.type'), value: t('alert.typeValue') },
          { label: t('alert.detectedTime'), value: t('alert.todayAt', { time: '8:00 AM' }) },
          { label: t('alert.assignedTo'), value: 'Fatima Larak', image: require('../assets/fatima.png') },
        ]}
        sideIcon={<CleaningIcon />}
        buttonLabel={t('alert.makeAction')}
        onButtonPress={() => console.log('Button pressed!')}
      />

      <HistoricTableContainer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
  },
});

export default AlertScreen;
