import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ServiceCardsContainer from '../containers/ServiceCardsContainer';
import StatisticCardsContainer from '../containers/StatisticCardsContainer';
import '../i18n'; // Import i18n configuration
import { logout } from '../service/KeycloakService';
import { useSse } from "../sse/sse-context";

interface HomeScreenProps {
  onLogout: () => void;
}

const HomeScreen = ({ onLogout }: HomeScreenProps) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();

  const { products } = useSse();
  
  // Verify authentication on mount
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await SecureStore.getItemAsync('access_token');
        const tokenExpiryStr = await SecureStore.getItemAsync('token_expiry');
        
        if (!token || !tokenExpiryStr) {
          // Token missing, trigger logout
          handleLogout();
          return;
        }
        
        // Check if token is expired
        const tokenExpiry = parseInt(tokenExpiryStr, 10);
        const now = Date.now();
        if (now >= tokenExpiry) {
          handleLogout();
        }
      } catch (error) {
        console.error('Authentication check error:', error);
        handleLogout();
      }
    };
    
    checkAuthentication();
  }, []);
  
  // Toggle language function
  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLanguage);
  };
  
  // Handle logout with proper cleanup
  const handleLogout = async () => {
    try {
      // Call service logout function
      await logout();
      // Notify App.tsx about logout
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
      // Still notify App.tsx even if there's an error
      onLogout();
    }
  };
  
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#2691A3" barStyle="light-content" />
      
      {/* iOS status bar background */}
      {Platform.OS === 'ios' && <View style={styles.iosStatusBar} />}
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>{t('greeting')}</Text>
              <Text style={styles.username}>Mohammed kacim</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
                <Text style={styles.languageText}>{i18n.language.toUpperCase()}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>
                <Image 
                  source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
                  style={styles.profileImage} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Statistics Section */}
          <StatisticCardsContainer />

          {/* Services Section */}
          <ServiceCardsContainer />
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
    backgroundColor: Platform.OS === 'ios' ? '#F5F7F9' : 'transparent',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageButton: {
    backgroundColor: '#2691A3',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  languageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
  },
  username: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Raleway-Medium',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default HomeScreen;
