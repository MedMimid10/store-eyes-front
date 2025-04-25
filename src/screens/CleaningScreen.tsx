import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import HeaderCompo from '../components/HeaderCompo';
import AreaCard, { DetailItem } from '../components/AreaCard';
import CleaningIcon from '../assets/alert-green.svg';
import HistoricCleaningContainer from '../containers/HistoricCleaningContainer';


const CleaningScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <HeaderCompo
                title="Cleaning"
                subtitle="Track Recent Cleaning Activity"
            />

            {/* 1er cas : Recent Activity */}
            <AreaCard
                header="Recent Activity"
                details={[
                    { value: 'Toilet Cleaning', isTitle: true },
                    { label: 'Last time', value: 'Today at 8:00 AM' },
                    {
                        label: 'By',
                        value: 'Fatima Larak',
                        image: require('../assets/fatima.png'),
                    },
                ]}
                sideIcon={<CleaningIcon />}
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
