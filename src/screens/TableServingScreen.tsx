import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import HeaderCompo from '../components/HeaderCompo';
import AreaCard, { DetailItem } from '../components/AreaCard';
import CleaningIcon from '../assets/alert-green.svg';
import HistoricTableContainer from '../containers/HistoricTableContainer';


const TableServingScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <HeaderCompo
                title="Table Serving"
                subtitle="Track Recent Table Served"
            />

            {/* 2eme cas : Recent Activity */}
            <AreaCard
                header="Recent Activity"
                details={[
                    { label: 'Type', value: 'Non served table' },
                    { label: 'Detected time', value: 'Today at 8:00 AM' },
                    {
                        label: 'Assigned to',
                        value: 'Fatima Larak',
                        image: require('../assets/fatima.png'),
                    },
                ]}
                sideIcon={<CleaningIcon />}
                buttonLabel="Make Action"
                onButtonPress={() => {
                    // ton action ici
                    console.log('Button pressed!');
                }}
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

export default TableServingScreen;
