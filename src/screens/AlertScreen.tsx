import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CleaningIcon from '../assets/alert-green.svg';
import AreaCard from '../components/AreaCard';
import HeaderCompo from '../components/HeaderCompo';
import HistoricTableContainer from '../containers/HistoricTableContainer';
import '../i18n';

const { height } = Dimensions.get('window');

const AlertScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#2691A3" barStyle="light-content" />
      
      {/* iOS status bar background */}
      {Platform.OS === 'ios' && <View style={styles.iosStatusBar} />}
      
      <SafeAreaView style={styles.safeArea} edges={['right', 'left', 'bottom']}>
        <View style={styles.container}>
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

          <View style={styles.historicWrapper}>
            <HistoricTableContainer />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F7F9',
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
  },
  historicWrapper: {
    flex: 1,
    height: height * 0.55, // Dynamically set height based on screen size
  }
});

export default AlertScreen;
