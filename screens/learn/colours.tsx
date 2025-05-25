import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const colours = [
  { english: 'Silver', welsh: 'arian' },
  { english: 'Gold', welsh: 'aur' },
  { english: 'Mottled black', welsh: 'brithddu' },
  { english: 'Red', welsh: 'coch' },
  { english: 'Purple (Reddish blue)', welsh: 'cochlas' },
  { english: 'Black and White', welsh: 'du a gwyn' },
  { english: 'Dark red', welsh: 'dugoch' },
  { english: 'Heather', welsh: 'ehöeg' },
  { english: 'Blue', welsh: 'glas' },
  { english: 'Purple (bluish red)', welsh: 'glasgoch' },
  { english: 'Green', welsh: 'gwyrdd' },
  { english: 'Brown', welsh: 'brown' },
  { english: 'White', welsh: 'gwyn' },
  { english: 'Black', welsh: 'du' },
  { english: 'Pink', welsh: 'pinc' },
  { english: 'Yellow', welsh: 'melyn' },
  { english: 'Orange', welsh: 'oren' },
  { english: 'Grey', welsh: 'llwyd' },
  { english: 'Light blue', welsh: 'glas golau' },
  { english: 'Dark blue', welsh: 'glas tywyll' }
];


export default function WelshColours() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welsh Colours</Text>
      <FlatList
        data={colours}
        keyExtractor={(item) => item.english}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.english}>{item.english}</Text>
            <Text style={styles.welsh}>{item.welsh}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  english: {
    fontSize: 20,
    color: '#333',
  },
  welsh: {
    fontSize: 20,
    color: '#007a33',
    fontWeight: 'bold',
  },
});