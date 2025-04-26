import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import CleaningIcon from '../assets/alert-green.svg';
import AreaCard from '../components/AreaCard';
import HeaderCompo from '../components/HeaderCompo';
import HistoricTableContainer from '../containers/HistoricTableContainer';
import '../i18n';

const AlertScreen = () => {
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderCompo
        title={t('alert.title')}
        subtitle={t('alert.subtitle')}
      />

      <AreaCard
        header={t('recentActivity')}
        details={[
          { label: t('alert.type'), value: t('alert.typeValue') },
          { label: t('lastTime'), value: t('todayAt', { time: '8:00 AM' }) },
          { label: t('by'), value: 'Fatima Larak', image: require('../assets/fatima.png') },
        ]}
        sideIcon={<View><CleaningIcon /></View>}
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
