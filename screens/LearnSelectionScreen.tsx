import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'LearnSelection'>;

export default function LearnSelectionScreen({ navigation }: Props) {
  const categories = [
    { key: 'numbers', label: 'Numbers' },
    { key: 'colours', label: 'Colours' },
    { key: 'greetings', label: 'Greetings' },
    { key: 'commonPhrases', label: 'Common Phrases' },
    { key: 'generalVocabulary', label: 'General Vocabulary' },
    { key: 'grammar', label: 'Grammar' },
    { key: 'culture', label: 'Culture' },
    { key: 'other', label: 'Other' },
  ] as const;

  const handleCategoryPress = (category: string) => {
    switch (category) {
      case 'numbers':
        navigation.navigate('Numbers');
        break;
      case 'colours':
        navigation.navigate('Colours');
        break;
      case 'greetings':
        navigation.navigate('Greetings');
        break;
      case 'commonPhrases':
        // TODO: navigation.navigate('CommonPhrases');
        break;
      case 'generalVocabulary':
        // TODO: navigation.navigate('GeneralVocabulary');
        break;
      default:
        // Handle unknown category or incomplete screens
        navigation.goBack();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Select a Learning Category</Text>
      <Text style={styles.sectionTitle}>Choose a category to learn:</Text>
      <View style={styles.optionsGrid}>
        {categories.map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={styles.optionButton}
            activeOpacity={0.7}
            onPress={() => handleCategoryPress(key)}
          >
            <Text style={styles.optionText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F8E9',
    padding: 20,
    paddingTop: 50,
    flexGrow: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#33691E',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#558B2F',
    fontWeight: '600',
    marginBottom: 10,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '48%',
    marginVertical: 8,
    paddingVertical: 18,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    color: '#558B2F',
    fontWeight: '500',
  },
});
