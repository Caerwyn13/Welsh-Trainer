import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList, Modal } from 'react-native';


import { searchDictionary } from '../utils/xmlDictionary';
import { cacheWord } from '../utils/wordCache';

type Match = {
  matchId: string;
  headword: string;
};

type Definition = {
  pos?: string;
  defText: string;
};

const posHelp = [
  { abbr: 'n',     desc: 'Noun'         },
  { abbr: 'np',    desc: 'Proper Noun'  },
  { abbr: 'v',     desc: 'Verb'         },
  { abbr: 'adj',   desc: 'Adjective'    },
  { abbr: 'adv',   desc: 'Adverb'       },
  { abbr: 'conj',  desc: 'Conjunction'  },
  { abbr: 'prep',  desc: 'Preposition'  },
  { abbr: 'intj',  desc: 'Interjection' },
  { abbr: 'pron',  desc: 'Pronoun'      },
  { abbr: 'vblex', desc: 'Lexical Verb' },
  { abbr: 'vbser', desc: 'No clue :('   },
];


export default function GPCSearch() {
  const [query, setQuery] = useState('');
  const [lang, setLang] = useState<'welsh' | 'english'>('welsh');
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [definitions, setDefinitions] = useState<Definition[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [helpVisible, setHelpVisible] = useState(false);

  // Function to search the dictionary
  // This function is called when the user submits a search query
 const searchWord = async () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setErrorMsg('Please enter a word.');
      setMatches([]);
      setSelectedMatch(null);
      setDefinitions([]);
      return;
    }

    if (!lang) {
      setErrorMsg('Language not selected.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setMatches([]);
    setSelectedMatch(null);
    setDefinitions([]);

    try {
      const results = await searchDictionary(trimmedQuery, lang);

      if (results.length === 0) {
        setErrorMsg('No match found.');
      } else {
        // Separate exact matches from partial matches
        const exactMatches = results.filter(r => 
          (lang === 'welsh' ? r.welsh : r.english).toLowerCase() === trimmedQuery.toLowerCase()
        );

        const partialMatches = results.filter(r =>
          (lang === 'welsh' ? r.welsh : r.english).toLowerCase() !== trimmedQuery.toLowerCase()
        );

        // Sort partial matches alphabetically
        partialMatches.sort((a, b) => {
          const aText = lang === 'welsh' ? a.welsh : a.english;
          const bText = lang === 'welsh' ? b.welsh : b.english;
          return aText.localeCompare(bText);
        });

        // Combine exact matches first, then partial matches
        const orderedResults = [...exactMatches, ...partialMatches];

        // Map results to match objects
        const localMatches: Match[] = orderedResults.map((r, idx) => ({
          matchId: `${lang === 'welsh' ? r.welsh : r.english}-${idx}`,
          headword: lang === 'welsh' ? r.welsh : r.english,
        }));

        setMatches(localMatches);

        // Load definition of the first exact match if exists, otherwise first partial match
        if (localMatches.length > 0) {
          await fetchDefinition(localMatches[0]);
        }
      }
    } catch (e) {
      console.error('Local dictionary search failed:', e);
      setErrorMsg('Error searching dictionary.');
    } finally {
      setLoading(false);
    }
  };

  // Updated fetchDefinition to display full info nicely
  const fetchDefinition = async (match: Match) => {
    setLoading(true);
    setSelectedMatch(match);
    setDefinitions([]);
    setErrorMsg('');

    try {
      const results = await searchDictionary(match.headword, lang);

      if (results.length === 0) {
        setErrorMsg('No definition found.');
        return;
      }

      // Show all matching definitions for this headword, if multiple
      const defs: Definition[] = results.map(r => ({
        defText: lang === 'welsh' ? r.english : r.welsh,
        pos: r.type,
      }));

      setDefinitions(defs);
    } catch (e) {
      console.error('Definition load error:', e);
      setErrorMsg('Error loading definition.');
    } finally {
      setLoading(false);
    }
  };

  async function handleCacheNewWord() {
    if (!selectedMatch || definitions.length === 0) return;

    try {
      // Cache the selected word with its definitions and language
      await cacheWord({
        [lang]: selectedMatch.headword,
        definitions,
      });
      setErrorMsg('Word saved!');
    } catch (e) {
      console.error('Error caching word:', e);
      setErrorMsg('Failed to save word.');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>GPC Welsh Dictionary</Text>

      <TextInput
        style={styles.input}
        placeholder={`Enter a ${lang} word...`}
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        onSubmitEditing={searchWord}
      />

      <View style={styles.langButtons}>
        <TouchableOpacity
          style={[styles.langButton, lang === 'welsh' && styles.langButtonActive]}
          onPress={() => setLang('welsh')}
        >
          <Text style={[styles.langButtonText, lang === 'welsh' && styles.langButtonTextActive]}>Welsh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.langButton, lang === 'english' && styles.langButtonActive]}
          onPress={() => setLang('english')}
        >
          <Text style={[styles.langButtonText, lang === 'english' && styles.langButtonTextActive]}>English</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.searchButton}
        onPress={searchWord}
        disabled={loading}
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {loading && <Text style={styles.status}>Loading...</Text>}
      {!!errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

      {matches.length > 0 && (
        <>
          <Text style={styles.matchesTitle}>
            {matches.length} {matches.length === 1 ? 'Match' : 'Matches'} Found:
          </Text>
          <FlatList
            data={matches}
            keyExtractor={(item) => item.matchId}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.matchItem,
                  selectedMatch?.matchId === item.matchId && styles.matchItemSelected,
                ]}
                onPress={() => fetchDefinition(item)}
              >
                <Text style={[
                  styles.matchText,
                  selectedMatch?.matchId === item.matchId && styles.matchTextSelected
                ]}>
                  {item.headword}
                </Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      {selectedMatch && definitions.length > 0 && (
        <View style={styles.definitionContainer}>
          <Text style={styles.defHeadword}>{selectedMatch.headword}</Text>
          {definitions.map((def, idx) => (
            <View key={idx} style={styles.definitionBlock}>
              {def.pos && <Text style={styles.partOfSpeech}>{def.pos}</Text>}
              <Text style={styles.definitionText}>{def.defText}</Text>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity
        style={styles.searchButton}
        onPress={async () => {
          if (selectedMatch && definitions.length > 0) {
            await handleCacheNewWord();
          }
        }}
        disabled={!selectedMatch || definitions.length === 0}
      >
        <Text style={styles.searchButtonText}>Save Word</Text>
      </TouchableOpacity>

            <TouchableOpacity
        style={[styles.searchButton, { backgroundColor: '#004D40' }]}
        onPress={() => setHelpVisible(true)}
      >
        <Text style={styles.searchButtonText}>Help</Text>
      </TouchableOpacity>

      <Modal
        visible={helpVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setHelpVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Part of Speech Abbreviations</Text>
            {posHelp.map((item) => (
              <Text key={item.abbr} style={styles.modalItem}>
                <Text style={{ fontWeight: 'bold' }}>{item.abbr}</Text>: {item.desc}
              </Text>
            ))}
            <TouchableOpacity
              style={[styles.searchButton, { marginTop: 20 }]}
              onPress={() => setHelpVisible(false)}
            >
              <Text style={styles.searchButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FAFAFA',
    minHeight: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#004D40',
    textAlign: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#00796B',
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
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
  searchButton: {
    backgroundColor: '#00796B',
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    marginVertical: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#333',
  },
  error: {
    color: '#D32F2F',
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  matchesTitle: {
    marginTop: 25,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#004D40',
  },
  matchItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#E0F2F1',
    marginBottom: 10,
  },
  matchItemSelected: {
    backgroundColor: '#004D40',
  },
  matchText: {
    fontSize: 18,
    color: '#004D40',
  },
  matchTextSelected: {
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
  partOfSpeech: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#2E7D32',
    marginBottom: 8,
    textAlign: 'center',
  },
  definitionBlock: {
    marginBottom: 18,
  },
  definitionText: {
    fontSize: 18,
    lineHeight: 26,
    color: '#2E7D32',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#004D40',
  },
  modalItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
});
