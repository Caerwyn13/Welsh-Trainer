import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  buttonWrapper: { marginVertical: 10 }, // Add spacing between buttons
});

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>

      <View style={styles.buttonWrapper}>
        <Button
          title="Go to Dictionary"
          onPress={() => navigation.navigate('Dictionary')}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Start Quiz"
          onPress={() => navigation.navigate('QuizSetup')}
        />
      </View>
    </View>
  );
}
