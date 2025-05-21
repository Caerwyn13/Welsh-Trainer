import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

type Match = {
  matchId: string;
  headword: string;
};

type Definition = {
  pos?: string; // part of speech
  defText: string;
};

export default function GPCSearch() {
  const [query, setQuery] = useState('');
  const [lang, setLang] = useState<'welsh' | 'english'>('welsh');
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [definitions, setDefinitions] = useState<Definition[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const searchWord = async () => {
    if (!query.trim()) {
      setErrorMsg('Please enter a word.');
      setMatches([]);
      setSelectedMatch(null);
      setDefinitions([]);
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setMatches([]);
    setSelectedMatch(null);
    setDefinitions([]);

    try {
      const mode = lang === 'english' ? 2 : 1;
      const searchUrl = `https://welsh-dictionary.ac.uk/gpc/servlet?func=search&str=${encodeURIComponent(query)}&first=0&max=20&mode=${mode}&user=JS-800509a27d53b2ebd993033281540897`;
      const searchResp = await axios.get(searchUrl);

      // Extract matches from <match> tags
      const matchRegex = /<match>[\s\S]*?<matchheadword>(.*?)<\/matchheadword>[\s\S]*?<matchid>(.*?)<\/matchid>[\s\S]*?<\/match>/g;
      const foundMatches: Match[] = [];
      let m;
      while ((m = matchRegex.exec(searchResp.data)) !== null) {
        // Remove HTML tags from headword (e.g. <b>, <sup>)
        const headwordRaw = m[1];
        const headwordClean = headwordRaw.replace(/<[^>]+>/g, '').trim();
        foundMatches.push({ matchId: m[2], headword: headwordClean });
      }

      if (foundMatches.length === 0) {
        setErrorMsg('No match found.');
      } else {
        setMatches(foundMatches);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Error fetching search results.');
    } finally {
      setLoading(false);
    }
  };

  const fetchDefinition = async (match: Match) => {
    setLoading(true);
    setSelectedMatch(match);
    setDefinitions([]);
    setErrorMsg('');

    try {
      const entryUrl = `https://welsh-dictionary.ac.uk/gpc/servlet?func=entry&id=${match.matchId}&user=JS-800509a27d53b2ebd993033281540897`;
      const entryResp = await axios.get(entryUrl);

      // Parse headword, part of speech, definitions from XML
      // Definitions are often inside <sense> or <definition> tags
      
      const xml = entryResp.data;

      // Extract main headword (optional, fallback to selectedMatch.headword)
      const headwordMatch = xml.match(/<headword>([\s\S]*?)<\/headword>/);
      const headword = headwordMatch ? headwordMatch[1].replace(/<[^>]+>/g, '').trim() : match.headword;

      // Extract part of speech
      const posMatch = xml.match(/<pos>([\s\S]*?)<\/pos>/);
      const pos = posMatch ? posMatch[1].trim() : undefined;

      // Extract multiple definitions
      // Use <definition> or <sense> tags; sometimes nested
      const defMatches = [...xml.matchAll(/<definition>([\s\S]*?)<\/definition>/g)];
      let defs: Definition[] = [];

      if (defMatches.length > 0) {
        defs = defMatches.map((d) => ({
          defText: d[1].replace(/<[^>]+>/g, '').trim(),
        }));
      } else {
        // fallback: single <definition> content
        const defMatch = xml.match(/<definition>([\s\S]*?)<\/definition>/);
        if (defMatch) {
          defs = [{ defText: defMatch[1].replace(/<[^>]+>/g, '').trim() }];
        }
      }

      if (defs.length === 0) {
        setErrorMsg('No definition found.');
      } else {
        // Include pos on first definition if available
        if (pos) defs[0].pos = pos;
        setDefinitions(defs);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Error fetching definition.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>GPC Welsh Dictionary Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a word..."
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
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

      <Button title="Search" onPress={searchWord} disabled={loading} />

      {loading && <Text style={styles.status}>Loading...</Text>}
      {!!errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

      {matches.length > 0 && (
        <>
          <Text style={styles.matchesTitle}>Select a match:</Text>
          <FlatList
            data={matches}
            keyExtractor={(item) => item.matchId}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.matchItem,
                  selectedMatch?.matchId === item.matchId && styles.matchItemSelected,
                ]}
                onPress={() => fetchDefinition(item)}
              >
                <Text style={styles.matchText}>{item.headword}</Text>
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
              {def.pos && idx === 0 && <Text style={styles.partOfSpeech}>{def.pos}</Text>}
              <Text style={styles.definitionText}>{def.defText}</Text>
            </View>
          ))}
        </View>
      )}
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
  definitionContainer: {
    marginTop: 30,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#004D40',
    shadowOpacity: 0.15,
    shadowRadius: 10,
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
    marginBottom: 12,
  },
  definitionText: {
    fontSize: 18,
    lineHeight: 26,
    color: '#2E7D32',
  },
});