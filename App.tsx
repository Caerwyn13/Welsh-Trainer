import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DictionaryScreen from './screens/DictionaryScreen';
import QuizSetupScreen from './screens/QuizSetupScreen';
import QuizScreen from './screens/QuizScreen';
import SettingsScreen from './screens/SettingsScreen';
import LearnSelectionScreen from './screens/LearnSelectionScreen';

export type RootStackParamList = {
  Home: undefined;
  Dictionary: undefined;
  QuizSetup: undefined;
  Quiz: {
    mode: 'multiple' | 'typed';
    direction: 'welshToEnglish' | 'englishToWelsh';
  };
  Settings: undefined;
  LearnSelection: undefined;
  LearnCategory: { category: 'numbers' | 'colours' | 'greetings' | 'commonPhrases' | 'generalVocabulary' | 'grammar' | 'culture' | 'other' };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LearnSelection" component={LearnSelectionScreen} />
        <Stack.Screen name="Dictionary" component={DictionaryScreen} />
        <Stack.Screen name="QuizSetup" component={QuizSetupScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}