import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput, Button } from 'react-native';
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

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  const getQuestion = () => {
    const word = getRandomWord();
    const correctAnswer = direction === 'welshToEnglish' ? word.english : word.welsh;
    const question = direction === 'welshToEnglish' ? word.welsh : word.english;

    setAnswer(correctAnswer);
    setQuestionWord(question);
    setSelected(null);
    setTypedAnswer('');

    if (mode === 'multiple') {
      const otherOptions = words
        .filter(w => {
          const other = direction === 'welshToEnglish' ? w.english : w.welsh;
          return other !== correctAnswer;
        })
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(w => (direction === 'welshToEnglish' ? w.english : w.welsh));

      const allOptions = [...otherOptions, correctAnswer].sort(() => 0.5 - Math.random());
      setOptions(allOptions);
    }
  };

  const handleTypedAnswer = () => {
    if (typedAnswer.trim().toLowerCase() === answer.toLowerCase()) {
      Alert.alert('Correct!');
      setScore(score + 1);
    } else {
      Alert.alert(`Wrong! The correct answer was "${answer}".`);
    }
    setQuestionCount(questionCount + 1);
  };

  const handleMultipleChoice = (selectedOption: string) => {
    setSelected(selectedOption);
    setTimeout(() => {
      if (selectedOption === answer) {
        Alert.alert('Correct!');
        setScore(score + 1);
      } else {
        Alert.alert(`Wrong! The correct answer was "${answer}".`);
      }
      setQuestionCount(questionCount + 1);
    }, 300);
  };

  useEffect(() => {
    getQuestion();
  }, [questionCount]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Translate: {questionWord}</Text>

      {mode === 'multiple' &&
        options.map((opt, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, selected === opt && styles.selected]}
            onPress={() => handleMultipleChoice(opt)}
            disabled={selected !== null}
          >
            <Text style={styles.buttonText}>{opt}</Text>
          </TouchableOpacity>
        ))}

      {mode === 'typed' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Type your answer"
            value={typedAnswer}
            onChangeText={setTypedAnswer}
          />
          <Button title="Submit" onPress={handleTypedAnswer} />
        </>
      )}

      <Text style={styles.score}>Score: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  score: { fontSize: 18, marginTop: 30, textAlign: 'center' },
  button: {
    padding: 12,
    borderRadius: 6,
    marginVertical: 8,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#90ee90',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginVertical: 12,
    borderRadius: 5,
    fontSize: 16,
  },
});
