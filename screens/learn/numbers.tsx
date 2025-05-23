import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type NumbersStackParamList = {
  LearnSelectionScreen: undefined;
};

interface NumberItem {
  number: number;
  english: string;
  traditional: string;
  modern: string;
}

// Traditional Welsh numbers (vigesimal system) - corrected version
const traditional: { [key: number]: string } = {
  1: 'un', 2: 'dau', 3: 'tri', 4: 'pedwar', 5: 'pump', 6: 'chwech', 7: 'saith', 8: 'wyth', 9: 'naw', 10: 'deg',
  11: 'un ar ddeg', 12: 'deuddeg', 13: 'tri ar ddeg', 14: 'pedwar ar ddeg', 15: 'pymtheg', 16: 'un ar bymtheg', 17: 'dau ar bymtheg', 18: 'tri ar bymtheg', 19: 'pedwar ar bymtheg', 20: 'ugain',
  21: 'un ar hugain', 22: 'dau ar hugain', 23: 'tri ar hugain', 24: 'pedwar ar hugain', 25: 'pump ar hugain', 26: 'chwech ar hugain', 27: 'saith ar hugain', 28: 'wyth ar hugain', 29: 'naw ar hugain', 30: 'deg ar hugain',
  31: 'un ar ddeg ar hugain', 32: 'dau ar ddeg ar hugain', 33: 'tri ar ddeg ar hugain', 34: 'pedwar ar ddeg ar hugain', 35: 'pump ar ddeg ar hugain', 36: 'chwech ar ddeg ar hugain', 37: 'saith ar ddeg ar hugain', 38: 'wyth ar ddeg ar hugain', 39: 'naw ar ddeg ar hugain', 40: 'deugain',
  41: 'un ar ddeugain', 42: 'dau ar ddeugain', 43: 'tri ar ddeugain', 44: 'pedwar ar ddeugain', 45: 'pump ar ddeugain', 46: 'chwech ar ddeugain', 47: 'saith ar ddeugain', 48: 'wyth ar ddeugain', 49: 'naw ar ddeugain', 50: 'hanner cant',
  51: 'un ar hanner cant', 52: 'dau ar hanner cant', 53: 'tri ar hanner cant', 54: 'pedwar ar hanner cant', 55: 'pump ar hanner cant', 56: 'chwech ar hanner cant', 57: 'saith ar hanner cant', 58: 'wyth ar hanner cant', 59: 'naw ar hanner cant', 60: 'trigain',
  61: 'un ar drigain', 62: 'dau ar drigain', 63: 'tri ar drigain', 64: 'pedwar ar drigain', 65: 'pump ar drigain', 66: 'chwech ar drigain', 67: 'saith ar drigain', 68: 'wyth ar drigain', 69: 'naw ar drigain', 70: 'deg a thrigain',
  71: 'un ar ddeg a thrigain', 72: 'dau ar ddeg a thrigain', 73: 'tri ar ddeg a thrigain', 74: 'pedwar ar ddeg a thrigain', 75: 'pump ar ddeg a thrigain', 76: 'chwech ar ddeg a thrigain', 77: 'saith ar ddeg a thrigain', 78: 'wyth ar ddeg a thrigain', 79: 'naw ar ddeg a thrigain', 80: 'pedwar ugain',
  81: 'un ar bedwar ugain', 82: 'dau ar bedwar ugain', 83: 'tri ar bedwar ugain', 84: 'pedwar ar bedwar ugain', 85: 'pump ar bedwar ugain', 86: 'chwech ar bedwar ugain', 87: 'saith ar bedwar ugain', 88: 'wyth ar bedwar ugain', 89: 'naw ar bedwar ugain', 90: 'deg a phedwar ugain',
  91: 'un ar ddeg a phedwar ugain', 92: 'dau ar ddeg a phedwar ugain', 93: 'tri ar ddeg a phedwar ugain', 94: 'pedwar ar ddeg a phedwar ugain', 95: 'pump ar ddeg a phedwar ugain', 96: 'chwech ar ddeg a phedwar ugain', 97: 'saith ar ddeg a phedwar ugain', 98: 'wyth ar ddeg a phedwar ugain', 99: 'naw ar ddeg a phedwar ugain', 
  100: 'cant'
};

// Modern Welsh numbers (decimal system) - proper implementation
const modern: { [key: number]: string } = {
  1: 'un', 2: 'dau', 3: 'tri', 4: 'pedwar', 5: 'pump', 6: 'chwech', 7: 'saith', 8: 'wyth', 9: 'naw', 10: 'deg',
  11: 'un deg un', 12: 'un deg dau', 13: 'un deg tri', 14: 'un deg pedwar', 15: 'un deg pump', 16: 'un deg chwech', 17: 'un deg saith', 18: 'un deg wyth', 19: 'un deg naw', 20: 'dau ddeg',
  21: 'dau ddeg un', 22: 'dau ddeg dau', 23: 'dau ddeg tri', 24: 'dau ddeg pedwar', 25: 'dau ddeg pump', 26: 'dau ddeg chwech', 27: 'dau ddeg saith', 28: 'dau ddeg wyth', 29: 'dau ddeg naw', 30: 'tri deg',
  31: 'tri deg un', 32: 'tri deg dau', 33: 'tri deg tri', 34: 'tri deg pedwar', 35: 'tri deg pump', 36: 'tri deg chwech', 37: 'tri deg saith', 38: 'tri deg wyth', 39: 'tri deg naw', 40: 'pedwar deg',
  41: 'pedwar deg un', 42: 'pedwar deg dau', 43: 'pedwar deg tri', 44: 'pedwar deg pedwar', 45: 'pedwar deg pump', 46: 'pedwar deg chwech', 47: 'pedwar deg saith', 48: 'pedwar deg wyth', 49: 'pedwar deg naw', 50: 'pum deg',
  51: 'pum deg un', 52: 'pum deg dau', 53: 'pum deg tri', 54: 'pum deg pedwar', 55: 'pum deg pump', 56: 'pum deg chwech', 57: 'pum deg saith', 58: 'pum deg wyth', 59: 'pum deg naw', 60: 'chwe deg',
  61: 'chwe deg un', 62: 'chwe deg dau', 63: 'chwe deg tri', 64: 'chwe deg pedwar', 65: 'chwe deg pump', 66: 'chwe deg chwech', 67: 'chwe deg saith', 68: 'chwe deg wyth', 69: 'chwe deg naw', 70: 'saith deg',
  71: 'saith deg un', 72: 'saith deg dau', 73: 'saith deg tri', 74: 'saith deg pedwar', 75: 'saith deg pump', 76: 'saith deg chwech', 77: 'saith deg saith', 78: 'saith deg wyth', 79: 'saith deg naw', 80: 'wyth deg',
  81: 'wyth deg un', 82: 'wyth deg dau', 83: 'wyth deg tri', 84: 'wyth deg pedwar', 85: 'wyth deg pump', 86: 'wyth deg chwech', 87: 'wyth deg saith', 88: 'wyth deg wyth', 89: 'wyth deg naw', 90: 'naw deg',
  91: 'naw deg un', 92: 'naw deg dau', 93: 'naw deg tri', 94: 'naw deg pedwar', 95: 'naw deg pump', 96: 'naw deg chwech', 97: 'naw deg saith', 98: 'naw deg wyth', 99: 'naw deg naw', 
  100: 'cant'
};

const generateNumberList = (): NumberItem[] => {
  const list: NumberItem[] = [];
  for (let i = 1; i <= 100; i++) {
    list.push({
      number: i,
      english: i.toString(),
      traditional: traditional[i] || '',
      modern: modern[i] || '',
    });
  }
  return list;
};

const WelshNumbers = () => {
  const navigation = useNavigation<NavigationProp<NumbersStackParamList>>();
  const [useTraditional, setUseTraditional] = useState(true);
  const numberList = generateNumberList();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Welsh Numbers: {useTraditional ? 'Traditional' : 'Modern'} System
      </Text>

      <View style={styles.langButtons}>
        <TouchableOpacity
          style={[styles.langButton, !useTraditional && styles.langButtonActive]}
          onPress={() => setUseTraditional(false)}
        >
          <Text style={[styles.langButtonText, !useTraditional && styles.langButtonTextActive]}>Modern</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.langButton, useTraditional && styles.langButtonActive]}
          onPress={() => setUseTraditional(true)}
        >
          <Text style={[styles.langButtonText, useTraditional && styles.langButtonTextActive]}>Traditional</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.definitionContainer}>
        <Text style={styles.defHeadword}>Traditional vs Modern Systems</Text>
        <Text style={styles.definitionText}>
          Welsh has two number systems: the traditional (vigesimal) system counts in twenties 
          and is based on the number 20 (ugain). For example, 25 is "pump ar hugain" (five on twenty). 
          The modern (decimal) system is simpler and follows decimal patterns like "dau ddeg pump" (two ten five) 
          for 25, similar to how English works.
        </Text>
      </View>

      <View style={styles.numbersContainer}>
        {numberList.map(item => (
          <View key={item.number} style={styles.matchItem}>
            <Text style={styles.numberText}>{item.english}</Text>
            <Text style={styles.welshText}>{useTraditional ? item.traditional : item.modern}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default WelshNumbers;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FAFAFA',
    minHeight: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    color: '#00796B',
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#004D40',
    textAlign: 'center',
  },
  langButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  langButton: {
    borderWidth: 1,
    borderColor: '#00796B',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    backgroundColor: '#FFFFFF',
  },
  langButtonActive: {
    backgroundColor: '#00796B',
  },
  langButtonText: {
    color: '#00796B',
    fontSize: 16,
    fontWeight: '600',
  },
  langButtonTextActive: {
    color: '#FFFFFF',
  },
  definitionContainer: {
    marginTop: 30,
    marginBottom: 40,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 20,
  },
  defHeadword: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1B5E20',
    textAlign: 'center',
  },
  definitionText: {
    fontSize: 18,
    lineHeight: 26,
    color: '#2E7D32',
  },
  numbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  matchItem: {
    width: '48%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#E0F2F1',
    marginBottom: 10,
  },
  numberText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004D40',
    textAlign: 'center',
    marginBottom: 4,
  },
  welshText: {
    fontSize: 16,
    color: '#00695C',
    textAlign: 'center',
  },
});