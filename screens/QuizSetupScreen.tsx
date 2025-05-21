import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'QuizSetup'>;

export default function QuizSetupScreen({ navigation }: Props) {
  const [mode, setMode] = useState<'multiple' | 'typed'>('multiple');
  const [direction, setDirection] = useState<'welshToEnglish' | 'englishToWelsh'>('welshToEnglish');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Quiz Settings</Text>

      <Text style={styles.sectionTitle}>1. Choose Mode</Text>
      <View style={styles.optionsRow}>
        {['multiple', 'typed'].map((m) => (
          <TouchableOpacity
            key={m}
            style={[
              styles.optionButton,
              mode === m && styles.optionButtonActive,
            ]}
            activeOpacity={0.7}
            onPress={() => setMode(m as any)}
          >
            <Text
              style={[
                styles.optionText,
                mode === m && styles.optionTextActive,
              ]}
            >
              {m === 'multiple' ? 'Multiple Choice' : 'Typed Answer'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>2. Choose Direction</Text>
      <View style={styles.optionsRow}>
        {[
          { key: 'welshToEnglish', label: 'Welsh → English' },
          { key: 'englishToWelsh', label: 'English → Welsh' },
        ].map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.optionButton,
              direction === key && styles.optionButtonActive,
            ]}
            activeOpacity={0.7}
            onPress={() => setDirection(key as any)}
          >
            <Text
              style={[
                styles.optionText,
                direction === key && styles.optionTextActive,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.startButton}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Quiz', { mode, direction })}
      >
        <Text style={styles.startButtonText}>Start Quiz ▶️</Text>
      </TouchableOpacity>
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
    marginTop: 20,
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    // subtle shadow
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
    // shadow
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
