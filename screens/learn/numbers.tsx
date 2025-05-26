import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type NumbersStackParamList = {
  LearnSelectionScreen: undefined;
};

interface NumberItem {
  number: number;
  english: string;
  traditional: string;
  modern: string;
}

// Traditional Welsh numbers (vigesimal system)
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

// Modern Welsh numbers (decimal system)
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
  const [fadeAnim] = useState(new Animated.Value(1));
  const numberList = generateNumberList();

  const animateSystemChange = (isTraditional: boolean) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    
    setTimeout(() => setUseTraditional(isTraditional), 150);
  };

  const getRangeLabel = (index: number): string => {
    if (index < 10) return '1-10';
    if (index < 20) return '11-20';
    if (index < 30) return '21-30';
    if (index < 40) return '31-40';
    if (index < 50) return '41-50';
    if (index < 60) return '51-60';
    if (index < 70) return '61-70';
    if (index < 80) return '71-80';
    if (index < 90) return '81-90';
    if (index < 100) return '91-100';
    return '100';
  };

  const shouldShowRangeHeader = (index: number): boolean => {
    return index === 0 || index === 10 || index === 20 || index === 30 || 
           index === 40 || index === 50 || index === 60 || index === 70 || 
           index === 80 || index === 90 || index === 99;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { position: 'absolute', width: '100%', zIndex: 1 }]}>
        <Text style={styles.title}>Welsh Numbers</Text>
        <Text style={styles.subtitle}>Rhifau Cymraeg</Text>
        <View style={styles.systemBadge}>
          <Text style={styles.systemBadgeText}>
            {useTraditional ? '📜 Traditional System' : '🔢 Modern System'}
          </Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: 180 }]} // Add padding to account for header height
      >
        <View style={styles.controls}>
          <Text style={styles.systemLabel}>Number System:</Text>
          <View style={styles.langButtons}>
            <TouchableOpacity
              style={[
                styles.langButton, 
                !useTraditional && styles.langButtonActive,
                styles.buttonShadow
              ]}
              onPress={() => animateSystemChange(false)}
            >
              <Text style={styles.buttonEmoji}>🔢</Text>
              <Text style={[styles.langButtonText, !useTraditional && styles.langButtonTextActive]}>
                Modern
              </Text>
              <Text style={[styles.buttonSubtext, !useTraditional && styles.buttonSubtextActive]}>
                Decimal
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.langButton, 
                useTraditional && styles.langButtonActive,
                styles.buttonShadow
              ]}
              onPress={() => animateSystemChange(true)}
            >
              <Text style={styles.buttonEmoji}>📜</Text>
              <Text style={[styles.langButtonText, useTraditional && styles.langButtonTextActive]}>
                Traditional
              </Text>
              <Text style={[styles.buttonSubtext, useTraditional && styles.buttonSubtextActive]}>
                Vigesimal
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.definitionContainer}>
          <Text style={styles.defHeadword}>
            {useTraditional ? '📜 Traditional (Vigesimal)' : '🔢 Modern (Decimal)'} System
          </Text>
          <Text style={styles.definitionText}>
            {useTraditional 
              ? 'The traditional Welsh system counts in twenties (ugain). For example, 25 is "pump ar hugain" (five on twenty). Complex numbers like 31 use "un ar ddeg ar hugain" (one on ten on twenty). This ancient system reflects Celtic mathematical traditions.'
              : 'The modern Welsh system follows decimal patterns like English. For example, 25 is "dau ddeg pump" (two tens five). This simpler system is more commonly used today and easier for learners to understand.'
            }
          </Text>
        </View>

        <Animated.View style={[styles.listContainer, { opacity: fadeAnim }]}>
          {numberList.map((item, index) => (
            <View key={item.number}>
              {shouldShowRangeHeader(index) && (
                <View style={styles.rangeHeader}>
                  <Text style={styles.rangeHeaderText}>{getRangeLabel(index)}</Text>
                </View>
              )}
              <View style={[
                styles.matchItem,
                { backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa' }
              ]}>
                <View style={styles.numberContainer}>
                  <View style={styles.numberCircle}>
                    <Text style={styles.numberText}>{item.english}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.welshText}>
                      {useTraditional ? item.traditional : item.modern}
                    </Text>
                    <Text style={styles.systemIndicator}></Text>
                      {useTraditional ? 'Traddodiadol' : 'Modern'}
                    <Text style={styles.systemIndicator}>
                      {useTraditional ? 'Traditional' : 'Modern'}
                    </Text>
                    <Text style={styles.complexityText}>
                      {(useTraditional ? item.traditional : item.modern).split(' ').length}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default WelshNumbers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#004D40',
    marginBottom: 12,
  },
  systemBadge: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  systemBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#004D40',
  },
  controls: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  systemLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  langButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  langButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  langButtonActive: {
    backgroundColor: '#004D40',
    borderColor: '#004D40',
    transform: [{ scale: 1.02 }],
  },
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  langButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  langButtonTextActive: {
    color: '#fff',
  },
  buttonSubtext: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  buttonSubtextActive: {
    color: '#b8e6b8',
  },
  definitionContainer: {
    marginHorizontal: 24,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  defHeadword: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#004D40',
    textAlign: 'center',
  },
  definitionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  rangeHeader: {
    backgroundColor: '#004D40',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 12,
  },
  rangeHeaderText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  matchItem: {
    borderRadius: 12,
    marginVertical: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  numberCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#004D40',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  numberText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  textContainer: {
    flex: 1,
  },
  welshText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  systemIndicator: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  complexityBadge: {
    backgroundColor: '#e9ecef',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 28,
    alignItems: 'center',
  },
  complexityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6c757d',
  },
});