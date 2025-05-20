import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function GPCSearch() {
  const [query, setQuery] = useState('');
  const [lang, setLang] = useState<'welsh' | 'english'>('welsh');
  const [definition, setDefinition] = useState('');

  const searchWord = async () => {
    setDefinition('Searching...');
    try {
      const response = await axios.get(`https://welsh-trainer.onrender.com`, {
        params: { word: query, lang },
      });

      const entryData = response.data.entry;
      const defText = JSON.stringify(entryData, null, 2); // Replace with your own formatting
      setDefinition(defText);
    } catch (err) {
      console.error(err);
      setDefinition('Error fetching definition.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Search GPC</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a word..."
        value={query}
        onChangeText={setQuery}
      />
      <View style={styles.langButtons}>
        <Button title="Welsh" onPress={() => setLang('welsh')} color={lang === 'welsh' ? '#00796B' : '#aaa'} />
        <Button title="English" onPress={() => setLang('english')} color={lang === 'english' ? '#00796B' : '#aaa'} />
      </View>
      <Button title="Search" onPress={searchWord} />
      <Text style={styles.result}>{definition}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#00796B', borderRadius: 8, padding: 10, marginBottom: 10 },
  langButtons: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  result: { marginTop: 20, fontSize: 14, fontFamily: 'monospace' },
});
