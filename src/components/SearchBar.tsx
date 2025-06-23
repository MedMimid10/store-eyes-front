import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type SearchBarProps = {
  placeholder?: string;
  onSearch?: (text: string) => void;
  onFilter?: () => void;
};

const SearchBar = ({ placeholder, onSearch, onFilter }: SearchBarProps) => {
  const { t } = useTranslation();
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder || t('searchByTitle')}
          placeholderTextColor="#999"
          onChangeText={onSearch}
        />
      </View>
      {/* <TouchableOpacity style={styles.filterButton} onPress={onFilter}>
        <Ionicons name="options-outline" size={20} color="#000" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
  },
  searchIcon: {
    marginRight: 2,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 14,
  },
  filterButton: {
    marginLeft: 10,
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar; 