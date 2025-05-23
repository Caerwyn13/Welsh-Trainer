import Reac, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'LearnSelection'>;

export default function LearnSelectionScreen({ navigation }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<'numbers' | 'colours' | 'greetings' | 'commonPhrases' | 'generalVocabulary' | 'grammar' | 'culture' | 'other'>('numbers');
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

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Select a Learning Category</Text>
            <Text style={styles.sectionTitle}>Choose a category to learn:</Text>
            <View style={styles.optionsGrid}>
                {categories.map(({ key, label }) => (
                    <TouchableOpacity
                        key={key}
                        style={[styles.optionButton, selectedCategory === key && styles.optionButtonActive]}
                        activeOpacity={0.7}
                        onPress={() => setSelectedCategory(key)}
                    >
                        <Text style={[styles.optionText, selectedCategory === key && styles.optionTextActive]}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity
                style={styles.startButton}
                activeOpacity={0.8}
                onPress={() => {
                    navigation.navigate('LearnCategory', { category: selectedCategory });
                }}
            >
                <Text style={styles.startButtonText}>Start Learning</Text>
            </TouchableOpacity>
        </ScrollView>
    )
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
  optionButtonActive: {
    backgroundColor: '#AED581',
    elevation: 4,
  },
  optionText: {
    fontSize: 16,
    color: '#558B2F',
    fontWeight: '500',
  },
  optionTextActive: {
    color: '#263238',
    fontWeight: '700',
  },
  startButton: {
    marginTop: 40,
    backgroundColor: '#33691E',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});