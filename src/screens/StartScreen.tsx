import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Logo from '../assets/img18.svg';
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = {
  isLoggedIn: boolean;
};

export default function StartScreen({ isLoggedIn }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        navigation.replace('Home'); // 🔁 Redirection directe si connecté
      } else {
        navigation.replace('Launch');   // ➡️ Sinon vers Launch
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoggedIn, navigation]);

  return (
    <View style={styles.container}>
      <Logo style={styles.logoImage} />
      <StatusBar style="auto" />
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#87CEEB',
  },
  logoImage: {
    width: '100%',
    height: '60%',
  }
});
