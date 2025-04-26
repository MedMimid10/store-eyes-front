import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type TimeFilterDropdownProps = {
  options: string[];
  onSelect?: (option: string) => void;
  initialOption?: string;
  label?: string;
};

const TimeFilterDropdown = ({ 
  options, 
  onSelect, 
  initialOption,
  label = 'View All'
}: TimeFilterDropdownProps) => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(initialOption || options[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t(label.toLowerCase())}</Text>
      <View>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.selectedOption}>{selectedOption}</Text>
          <Feather name="chevron-down" size={16} color="#666" />
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleSelect(option)}
              >
                <Text style={[
                  styles.optionText,
                  selectedOption === option && styles.selectedOptionText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    minWidth: 120,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedOption: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  optionsContainer: {
    position: 'absolute',
    top: 45,
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
  option: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 12,
    color: '#666',
  },
  selectedOptionText: {
    color: '#2691A3',
    fontWeight: '600',
  },
});

export default TimeFilterDropdown; 