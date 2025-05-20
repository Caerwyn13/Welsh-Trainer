import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';

type Props = NativeStackScreenProps<RootStackParamList, 'QuizSetup'>;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  button: {
    padding: 12,
    borderRadius: 6,
    marginVertical: 8,
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  selected: {
    backgroundColor: '#87ceeb',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});

function SelectButton({
  label,
  onPress,
  selected,
}: {
  label: string;
  onPress: () => void;
  selected: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, selected && styles.selected]}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function QuizSetupScreen({ navigation }: Props) {
  const [mode, setMode] = useState<'multiple' | 'typed'>('multiple');
  const [direction, setDirection] = useState<'welshToEnglish' | 'englishToWelsh'>('welshToEnglish');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Setup</Text>

      <Text style={styles.label}>Select Mode:</Text>
      <SelectButton label="Multiple Choice" onPress={() => setMode('multiple')} selected={mode === 'multiple'} />
      <SelectButton label="Typed" onPress={() => setMode('typed')} selected={mode === 'typed'} />

      <Text style={styles.label}>Select Direction:</Text>
      <SelectButton label="Welsh to English" onPress={() => setDirection('welshToEnglish')} selected={direction === 'welshToEnglish'} />
      <SelectButton label="English to Welsh" onPress={() => setDirection('englishToWelsh')} selected={direction === 'englishToWelsh'} />

      <View style={{ marginTop: 30 }}>
        <SelectButton
          label="Start Quiz"
          onPress={() => navigation.navigate('Quiz', { mode, direction })}
          selected={false}
        />
      </View>
    </View>
  );
}
