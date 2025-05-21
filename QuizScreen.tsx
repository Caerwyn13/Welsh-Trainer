import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './App';
import { words } from './words';

type Props = {
  route: RouteProp<RootStackParamList, 'Quiz'>;
};

export default function QuizScreen({ route }: Props) {
  const { mode, direction } = route.params;
  const [questionWord, setQuestionWord] = useState('');
  const [answer, setAnswer] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);

  // Normalize function ignores punctuation and extra whitespace
  const normalize = (s: string) =>
    s.toLowerCase().replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ').trim();

  const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

  const getQuestion = () => {
    const w = getRandomWord();
    const correct = direction === 'welshToEnglish' ? w.english : w.welsh;
    const prompt = direction === 'welshToEnglish' ? w.welsh : w.english;

    setAnswer(correct);
    setQuestionWord(prompt);
    setSelected(null);
    setTypedAnswer('');

    if (mode === 'multiple') {
      const distractors = words
        .map(x => (direction === 'welshToEnglish' ? x.english : x.welsh))
        .filter(x => normalize(x) !== normalize(correct))
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setOptions([...distractors, correct].sort(() => Math.random() - 0.5));
    }
  };

  const nextQuestion = () => setQuestionCount(q => q + 1);

  const handleMultiple = (choice: string) => {
    setSelected(choice);
    setTimeout(() => {
      normalize(choice) === normalize(answer)
        ? (Alert.alert('✅ Correct!'), setScore(s => s + 1))
        : Alert.alert('❌ Wrong', `Answer: ${answer}`);
      nextQuestion();
    }, 300);
  };

  const handleTyped = () => {
    const correct = normalize(typedAnswer) === normalize(answer);
    correct
      ? (Alert.alert('✅ Correct!'), setScore(s => s + 1))
      : Alert.alert('❌ Wrong', `Answer: ${answer}`);
    nextQuestion();
  };

  useEffect(getQuestion, [questionCount]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.scoreBar}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.prompt}>Translate:</Text>
        <Text style={styles.word}>{questionWord}</Text>

        {mode === 'multiple' ? (
          options.map(opt => (
            <TouchableOpacity
              key={opt}
              style={[
                styles.option,
                selected === opt && styles.optionSelected,
              ]}
              activeOpacity={0.7}
              disabled={!!selected}
              onPress={() => handleMultiple(opt)}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Type your answer..."
              value={typedAnswer}
              onChangeText={setTypedAnswer}
            />
            <TouchableOpacity
              style={styles.submit}
              activeOpacity={0.8}
              onPress={handleTyped}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFDE7',
    padding: 20,
    paddingTop: 40,
    minHeight: '100%',
  },
  scoreBar: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#33691E',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    // shadows
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  prompt: {
    fontSize: 20,
    color: '#558B2F',
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  word: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 14,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: '#A5D6A7',
  },
  optionText: {
    fontSize: 18,
    color: '#2E7D32',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  submit: {
    backgroundColor: '#558B2F',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
