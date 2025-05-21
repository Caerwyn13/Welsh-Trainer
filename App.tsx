import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DictionaryScreen from './DictionaryScreen';
import QuizSetupScreen from './QuizSetupScreen';
import QuizScreen from './QuizScreen';
import SettingsScreen from './SettingsScreen';

export type RootStackParamList = {
  Home: undefined;
  Dictionary: undefined;
  QuizSetup: undefined;
  Quiz: {
    mode: 'multiple' | 'typed';
    direction: 'welshToEnglish' | 'englishToWelsh';
  };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dictionary" component={DictionaryScreen} />
        <Stack.Screen name="QuizSetup" component={QuizSetupScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}