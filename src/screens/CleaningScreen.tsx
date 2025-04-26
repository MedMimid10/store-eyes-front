import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import CleaningIcon from '../assets/alert-green.svg';
import AreaCard, { DetailItem } from '../components/AreaCard';
import HeaderCompo from '../components/HeaderCompo';
import HistoricCleaningContainer from '../containers/HistoricCleaningContainer';


const CleaningScreen = () => {
    const { t } = useTranslation();
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <HeaderCompo
                title={t('cleaning')}
                subtitle={t('trackRecentCleaningActivity')}
            />

            {/* Recent Activity */}
            <AreaCard
                header={t('recentActivity')}
                details={[
                    { value: t('toiletCleaning'), isTitle: true },
                    { label: t('lastTime'), value: t('todayAt', { time: '8:00 AM' }) },
                    {
                        label: t('by'),
                        value: 'Fatima Larak',
                        image: require('../assets/fatima.png'),
                    },
                ]}
                sideIcon={<View><CleaningIcon /></View>}
            />

            <HistoricCleaningContainer />

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

export default CleaningScreen;
