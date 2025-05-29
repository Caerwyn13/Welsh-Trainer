import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { MaterialIcons } from '@expo/vector-icons'; // Make sure to install expo vector icons

type Props = NativeStackScreenProps<RootStackParamList, 'LearnSelection'>;

export default function LearnSelectionScreen({ navigation }: Props) {
  const categories = [
    { key: 'numbers', label: 'Numbers', icon: 'format-list-numbered' },
    { key: 'colours', label: 'Colours', icon: 'palette' },
    { key: 'greetings', label: 'Greetings', icon: 'emoji-people' },
    { key: 'commonPhrases', label: 'Common Phrases', icon: 'chat' },
    { key: 'generalVocabulary', label: 'General Vocabulary', icon: 'book' },
    { key: 'grammar', label: 'Grammar', icon: 'school' },
    { key: 'culture', label: 'Culture', icon: 'public' },
    { key: 'other', label: 'Other', icon: 'more-horiz' },
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
        navigation.navigate('CommonPhrases');
        break;
      case 'generalVocabulary':
        navigation.navigate('GeneralVocabulary');
        break;
      case 'culture':
        navigation.navigate('Culture');
        break;
      case 'grammar':
        navigation.navigate('GrammarSelection');
        break;
      default:
        // Handle unknown category or incomplete screens
        navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>Learn Welsh</Text>
        <Text style={styles.subtitle}>Choose your learning path</Text>
        <View style={styles.optionsGrid}>
          {categories.map(({ key, label, icon }) => (
            <TouchableOpacity
              key={key}
              style={styles.optionButton}
              activeOpacity={0.7}
              onPress={() => handleCategoryPress(key)}
            >
              <View style={styles.iconContainer}>
                <MaterialIcons name={icon} size={32} color="#558B2F" />
              </View>
              <Text style={styles.optionText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    padding: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#33691E',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#558B2F',
    textAlign: 'center',
    marginBottom: 24,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  optionButton: {
    width: '46%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: '#F1F8E9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#33691E',
    fontWeight: '600',
    textAlign: 'center',
  },
});
