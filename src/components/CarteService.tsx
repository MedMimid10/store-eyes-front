import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

// Import des SVG
import CleanIcon from '../assets/icons/clean-icon.svg';
import MealServingIcon from '../assets/icons/meal-serving-icon.svg';
import TableServingIcon from '../assets/icons/table-serving-icon.svg';

type IconType = 'meal' | 'clean' | 'table';

type Props = {
  iconType: IconType;
  label: string;
};

const CarteService = ({ iconType, label }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    switch (iconType) {
      case 'meal':
        navigation.navigate('MealServing');
        break;
      case 'clean':
        // To be implemented
        break;
      case 'table':
        // To be implemented
        break;
    }
  };

  const renderIcon = () => {
    switch (iconType) {
      case 'meal':
        return <MealServingIcon width={36} height={37} />;
      case 'clean':
        return <CleanIcon width={36} height={37} />;
      case 'table':
        return <TableServingIcon width={33} height={33} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>{renderIcon()}</View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 125,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal:10
  },
  iconContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#2691A3',
    textAlign: 'center',
    fontWeight:500,
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
  },
});

export default CarteService;