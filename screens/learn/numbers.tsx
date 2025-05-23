import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

type NumberItem = {
  welsh: string;
  english: string;
  number: number;
};

function shuffleArray(array: NumberItem[]): NumberItem[] {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

const WelshNumbers = () => {
    const originalNumbers: NumberItem[] = [
    { welsh: 'un', english: 'one', number: 1 },
    { welsh: 'dau', english: 'two', number: 2 },
    { welsh: 'tri', english: 'three', number: 3 },
    { welsh: 'pedwar', english: 'four', number: 4 },
    { welsh: 'pump', english: 'five', number: 5 },
    { welsh: 'chwech', english: 'six', number: 6 },
    { welsh: 'saith', english: 'seven', number: 7 },
    { welsh: 'wyth', english: 'eight', number: 8 },
    { welsh: 'naw', english: 'nine', number: 9 },
    { welsh: 'deg', english: 'ten', number: 10 },
    { welsh: 'un ar ddeg', english: 'eleven', number: 11 },
    { welsh: 'deuddeg', english: 'twelve', number: 12 },
    { welsh: 'tri ar ddeg', english: 'thirteen', number: 13 },
    { welsh: 'pedwar ar ddeg', english: 'fourteen', number: 14 },
    { welsh: 'pymtheg', english: 'fifteen', number: 15 },
    { welsh: 'un ar bymtheg', english: 'sixteen', number: 16 },
    { welsh: 'dau ar bymtheg', english: 'seventeen', number: 17 },
    { welsh: 'deunaw', english: 'eighteen', number: 18 },
    { welsh: 'pedwar ar bymtheg', english: 'nineteen', number: 19 },
    { welsh: 'ugain', english: 'twenty', number: 20 },
    { welsh: 'un ar hugain', english: 'twenty-one', number: 21 },
    { welsh: 'dau ar hugain', english: 'twenty-two', number: 22 },
    { welsh: 'tri ar hugain', english: 'twenty-three', number: 23 },
    { welsh: 'pedwar ar hugain', english: 'twenty-four', number: 24 },
    { welsh: 'pump ar hugain', english: 'twenty-five', number: 25 },
    { welsh: 'chwech ar hugain', english: 'twenty-six', number: 26 },
    { welsh: 'saith ar hugain', english: 'twenty-seven', number: 27 },
    { welsh: 'wyth ar hugain', english: 'twenty-eight', number: 28 },
    { welsh: 'naw ar hugain', english: 'twenty-nine', number: 29 },
    { welsh: 'deg ar hugain', english: 'thirty', number: 30 },
    { welsh: 'un ar ddeg ar hugain', english: 'thirty-one', number: 31 },
    { welsh: 'dau ar ddeg ar hugain', english: 'thirty-two', number: 32 },
    { welsh: 'tri ar ddeg ar hugain', english: 'thirty-three', number: 33 },
    { welsh: 'pedwar ar ddeg ar hugain', english: 'thirty-four', number: 34 },
    { welsh: 'pump ar ddeg ar hugain', english: 'thirty-five', number: 35 },
    { welsh: 'chwech ar ddeg ar hugain', english: 'thirty-six', number: 36 },
    { welsh: 'saith ar ddeg ar hugain', english: 'thirty-seven', number: 37 },
    { welsh: 'wyth ar ddeg ar hugain', english: 'thirty-eight', number: 38 },
    { welsh: 'naw ar ddeg ar hugain', english: 'thirty-nine', number: 39 },
    { welsh: 'pedwar deg', english: 'forty', number: 40 },
    { welsh: 'un ar bedwar deg', english: 'forty-one', number: 41 },
    { welsh: 'dau ar bedwar deg', english: 'forty-two', number: 42 },
    { welsh: 'tri ar bedwar deg', english: 'forty-three', number: 43 },
    { welsh: 'pedwar ar bedwar deg', english: 'forty-four', number: 44 },
    { welsh: 'pump ar bedwar deg', english: 'forty-five', number: 45 },
    { welsh: 'chwech ar bedwar deg', english: 'forty-six', number: 46 },
    { welsh: 'saith ar bedwar deg', english: 'forty-seven', number: 47 },
    { welsh: 'wyth ar bedwar deg', english: 'forty-eight', number: 48 },
    { welsh: 'naw ar bedwar deg', english: 'forty-nine', number: 49 },
    { welsh: 'pum deg', english: 'fifty', number: 50 },
    { welsh: 'un ar bum deg', english: 'fifty-one', number: 51 },
    { welsh: 'dau ar bum deg', english: 'fifty-two', number: 52 },
    { welsh: 'tri ar bum deg', english: 'fifty-three', number: 53 },
    { welsh: 'pedwar ar bum deg', english: 'fifty-four', number: 54 },
    { welsh: 'pump ar bum deg', english: 'fifty-five', number: 55 },
    { welsh: 'chwech ar bum deg', english: 'fifty-six', number: 56 },
    { welsh: 'saith ar bum deg', english: 'fifty-seven', number: 57 },
    { welsh: 'wyth ar bum deg', english: 'fifty-eight', number: 58 },
    { welsh: 'naw ar bum deg', english: 'fifty-nine', number: 59 },
    { welsh: 'chwe deg', english: 'sixty', number: 60 },
    { welsh: 'un ar chwe deg', english: 'sixty-one', number: 61 },
    { welsh: 'dau ar chwe deg', english: 'sixty-two', number: 62 },
    { welsh: 'tri ar chwe deg', english: 'sixty-three', number: 63 },
    { welsh: 'pedwar ar chwe deg', english: 'sixty-four', number: 64 },
    { welsh: 'pump ar chwe deg', english: 'sixty-five', number: 65 },
    { welsh: 'chwech ar chwe deg', english: 'sixty-six', number: 66 },
    { welsh: 'saith ar chwe deg', english: 'sixty-seven', number: 67 },
    { welsh: 'wyth ar chwe deg', english: 'sixty-eight', number: 68 },
    { welsh: 'naw ar chwe deg', english: 'sixty-nine', number: 69 },
    { welsh: 'saith deg', english: 'seventy', number: 70 },
    { welsh: 'un ar saith deg', english: 'seventy-one', number: 71 },
    { welsh: 'dau ar saith deg', english: 'seventy-two', number: 72 },
    { welsh: 'tri ar saith deg', english: 'seventy-three', number: 73 },
    { welsh: 'pedwar ar saith deg', english: 'seventy-four', number: 74 },
    { welsh: 'pump ar saith deg', english: 'seventy-five', number: 75 },
    { welsh: 'chwech ar saith deg', english: 'seventy-six', number: 76 },
    { welsh: 'saith ar saith deg', english: 'seventy-seven', number: 77 },
    { welsh: 'wyth ar saith deg', english: 'seventy-eight', number: 78 },
    { welsh: 'naw ar saith deg', english: 'seventy-nine', number: 79 },
    { welsh: 'wyth deg', english: 'eighty', number: 80 },
    { welsh: 'un ar wyth deg', english: 'eighty-one', number: 81 },
    { welsh: 'dau ar wyth deg', english: 'eighty-two', number: 82 },
    { welsh: 'tri ar wyth deg', english: 'eighty-three', number: 83 },
    { welsh: 'pedwar ar wyth deg', english: 'eighty-four', number: 84 },
    { welsh: 'pump ar wyth deg', english: 'eighty-five', number: 85 },
    { welsh: 'chwech ar wyth deg', english: 'eighty-six', number: 86 },
    { welsh: 'saith ar wyth deg', english: 'eighty-seven', number: 87 },
    { welsh: 'wyth ar wyth deg', english: 'eighty-eight', number: 88 },
    { welsh: 'naw ar wyth deg', english: 'eighty-nine', number: 89 },
    { welsh: 'naw deg', english: 'ninety', number: 90 },
    { welsh: 'un ar naw deg', english: 'ninety-one', number: 91 },
    { welsh: 'dau ar naw deg', english: 'ninety-two', number: 92 },
    { welsh: 'tri ar naw deg', english: 'ninety-three', number: 93 },
    { welsh: 'pedwar ar naw deg', english: 'ninety-four', number: 94 },
    { welsh: 'pump ar naw deg', english: 'ninety-five', number: 95 },
    { welsh: 'chwech ar naw deg', english: 'ninety-six', number: 96 },
    { welsh: 'saith ar naw deg', english: 'ninety-seven', number: 97 },
    { welsh: 'wyth ar naw deg', english: 'ninety-eight', number: 98 },
    { welsh: 'naw ar naw deg', english: 'ninety-nine', number: 99 },
    { welsh: 'cant', english: 'one hundred', number: 100 },
    ];


  const [numbers, setNumbers] = useState<NumberItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    setNumbers(shuffleArray(originalNumbers));
  }, []);

  const nextNumber = () => {
    setCurrentIndex((prev) => (prev + 1) % numbers.length);
    setShowTranslation(false);
  };

  if (numbers.length === 0) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welsh Numbers</Text>
      <View style={styles.card}>
        <Text style={styles.number}>{numbers[currentIndex].number}</Text>
        <Text style={styles.welsh}>{numbers[currentIndex].welsh}</Text>
        {showTranslation && (
          <Text style={styles.english}>{numbers[currentIndex].english}</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={nextNumber}>
          <Text style={styles.buttonText}>Next Number</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F8E9',
    padding: 20,
    paddingTop: 50,
    flexGrow: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#33691E',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    width: 280,
    backgroundColor: '#FFFFFF',
    paddingVertical: 30,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    marginBottom: 30,
  },
  number: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#558B2F',
    marginBottom: 10,
  },
  welsh: {
    fontSize: 36,
    color: '#33691E',
    marginBottom: 10,
    paddingLeft: 10,
  },
  english: {
    fontSize: 24,
    color: '#888',
    marginTop: 8,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#33691E',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 140,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WelshNumbers;
