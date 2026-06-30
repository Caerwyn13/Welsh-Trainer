import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DictionaryScreen from './screens/DictionaryScreen';
import PronunciationGuide from './screens/PronunciationScreen';
import QuizSetupScreen from './screens/QuizSetupScreen';
import QuizScreen from './screens/QuizScreen';
import SettingsScreen from './screens/SettingsScreen';

import LearnSelectionScreen from './screens/LearnSelectionScreen';
import WelshNumbers from './screens/learn/numbers';
import WelshColours from './screens/learn/colours';
import WelshGreetings from './screens/learn/greetings';
import WelshVocabulary from './screens/learn/generalVocabulary';
import WelshPhrases from './screens/learn/commonPhrases';
import WelshCulture from './screens/learn/culture';
import GrammarSelectionScreen from './screens/learn/GrammarSelectionScreen'; 

import WelshVerbTenses from './screens/learn/grammar/verbs';

export type RootStackParamList = {
  Home: undefined;
  Dictionary: undefined;
  Pronunciation: undefined;
  QuizSetup: undefined;
  Quiz: {
    mode: 'multiple' | 'typed';
    direction: 'welshToEnglish' | 'englishToWelsh';
  };
  Settings: undefined;
  LearnSelection: undefined;

  Numbers: undefined;
  Colours: undefined;
  Greetings: undefined;
  CommonPhrases: undefined;
  GeneralVocabulary: undefined;
  GrammarSelection: undefined;
  Culture: undefined;
  Other: undefined;

  WelshVerbTenses: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LearnSelection" component={LearnSelectionScreen} />
        <Stack.Screen name="Dictionary" component={DictionaryScreen} />
        <Stack.Screen name="Pronunciation" component={PronunciationGuide} />
        <Stack.Screen name="QuizSetup" component={QuizSetupScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />

        <Stack.Screen name="Numbers" component={WelshNumbers} />
        <Stack.Screen name="Colours" component={WelshColours} />
        <Stack.Screen name="Greetings" component={WelshGreetings} />
        <Stack.Screen name="CommonPhrases" component={WelshPhrases} />
        <Stack.Screen name="GeneralVocabulary" component={WelshVocabulary} />
        <Stack.Screen name="Culture" component={WelshCulture} />
        <Stack.Screen name="GrammarSelection" component={GrammarSelectionScreen} />

        <Stack.Screen name="WelshVerbTenses" component={WelshVerbTenses} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}