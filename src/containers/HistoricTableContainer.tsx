// src/containers/HistoricTableContainer.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import HistoricCard from '../components/HistoricCard';
import CategoryFilter from '../components/CategoryFilter';

import AlertRed from '../assets/AlrtRed.svg';

type AlertItem = {
    title: string;
    by: string;
    time: string;
    image: any;
    AlertIcon: any;
    category: 'Cleaning Table' | 'Serving Table';
};

// Données de test : uniquement alertes non résolues (AlertIcon = AlertRed)
const ALERT_DATA: AlertItem[] = [
    {
        title: 'Toilet Cleaning',
        by: 'Fatima Larak',
        time: 'Today at 8:00 AM',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        category: 'Cleaning Table'
    },
    {
        title: 'Non served table',
        by: 'Ali Benomar',
        time: 'Yesterday at 4:00 PM',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        category: 'Serving Table'
    },
    {
        title: 'Monthly Maintenance',
        by: 'Mounia Salah',
        time: '3 weeks ago',
        image: require('../assets/fatima.png'),
        AlertIcon: AlertRed,
        category: 'Cleaning Table'
    },
    // … ajoutez d’autres alertes non résolues pour tester
];

const CATEGORY_OPTIONS = ['All', 'Cleaning Table', 'Serving Table'];

const HistoricTableContainer: React.FC = () => {
    const { t } = useTranslation();

    // Filtre de temps (option 'all' commentée pour usage ultérieur)
    const TIME_FILTER_OPTIONS = [
        //{ key: 'all',       label: t('all') },
        { key: 'today',     label: t('Today') },
        { key: 'lastWeek',  label: t('Last Week') },
        { key: 'lastMonth', label: t('Last Month') },
    ];

    const [selectedTime,     setSelectedTime]     = useState<string>(TIME_FILTER_OPTIONS[0].key);
    const [showTimeDropdown, setShowTimeDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(CATEGORY_OPTIONS[0]);

    const toggleTimeDropdown = () => setShowTimeDropdown(!showTimeDropdown);
    const chooseTime = (key: string) => {
        setSelectedTime(key);
        setShowTimeDropdown(false);
    };

    // Filtrage combiné : catégorie + temps
    const filteredData = ALERT_DATA.filter(item => {
        // Catégorie
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
            return false;
        }
        // Temps
        const txt = item.time.toLowerCase();
        // Si l'option 'all' est active (décommentée), passer toutes les alertes de la catégorie
        if (selectedTime === 'all') {
            return true;
        }
        if (selectedTime === 'today') {
            return txt.includes('today');
        }
        if (selectedTime === 'lastWeek') {
            if (txt.includes('yesterday')) return true;
            const m = txt.match(/(\d+)\s+days\s+ago/);
            return m !== null && Number(m[1]) <= 7;
        }
        if (selectedTime === 'lastMonth') {
            const m = txt.match(/(\d+)\s+weeks\s+ago/);
            return m !== null && Number(m[1]) <= 4;
        }
        return true;
    });


    return (
        <View style={styles.wrapper}>
            {/* Entête + filtre temps */}
            <View style={styles.headerRow}>
                <Text style={styles.header}>{t('Historic')}     </Text>
            <View style={{ position: 'relative' }}>
                <TouchableOpacity
                    style={styles.timeFilterButton}
                    onPress={toggleTimeDropdown}
                >
                    <Text style={styles.timeFilter}>
                        {TIME_FILTER_OPTIONS.find(o => o.key === selectedTime)?.label}
                    </Text>
                    <Feather name="chevron-down" size={16} color="#666" />
                </TouchableOpacity>

                {showTimeDropdown && (
                    <View style={styles.timeFilterDropdown}>
                        {TIME_FILTER_OPTIONS.map(opt => (
                            <TouchableOpacity
                                key={opt.key}
                                style={styles.timeFilterOption}
                                onPress={() => chooseTime(opt.key)}
                            >
                                <Text
                                    style={[
                                        styles.timeFilterOptionText,
                                        opt.key === selectedTime && styles.selectedTimeFilterOption
                                    ]}
                                >
                                    {opt.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        </View>

    {/* Filtre de catégorie */}
    <CategoryFilter
        categories={CATEGORY_OPTIONS}
        initialCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
    />

    {/* Liste des cartes */}
    <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
    >
        {filteredData.map((item, idx) => (
            <HistoricCard
                key={idx}
                title={item.title}
                by={item.by}
                time={item.time}
                image={item.image}
                AlertIcon={item.AlertIcon}
            />
        ))}
    </ScrollView>
</View>
);
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#F8F8F8',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
       // paddingHorizontal: 16,
    },
    header: {
        fontFamily: 'Raleway',
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    },
    list: {
        paddingBottom: 20,
       // paddingHorizontal: 16,
    },
    timeFilterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    timeFilterDropdown: {
        position: 'absolute',
        top: 40,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 10,
        minWidth: 120,
    },
    timeFilterOption: {
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    timeFilterOptionText: {
        fontSize: 12,
        color: '#333',
    },
    selectedTimeFilterOption: {
        fontWeight: 'bold',
        color: '#2691A3',
    },
    timeFilter :{
    },
});

export default HistoricTableContainer;
