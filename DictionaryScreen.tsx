import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import axios from 'axios';

type Match = {
  matchId: string;
  headword: string;
};

type Definition = {
  pos?: string;
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

      console.log(`Searching: ${searchUrl}`);
      const searchResp = await axios.get(searchUrl);
      console.log('Got search response, length:', searchResp.data.length);
      console.log('Response sample:', searchResp.data.substring(0, 500));

      const foundMatches: Match[] = [];

      const headwordRegex = /<match>\s*<matchHeadword>([\s\S]*?)<\/matchHeadword>\s*<matchId>([^<]+)<\/matchId>\s*<\/match>/g;
      let matchResult;

      while ((matchResult = headwordRegex.exec(searchResp.data)) !== null) {
        const headwordRaw = matchResult[1];
        const matchId = matchResult[2].trim(); // THIS is the actual ID
        const headword = headwordRaw.replace(/<[^>]+>/g, '').trim(); // Strip <b> tags, etc.

        foundMatches.push({ matchId, headword });

        console.log(`Found match (simple): ${headword}, ID: ${matchId}`);
      }


      if (foundMatches.length === 0) {
        const traditionalRegex = /<match>[\s\S]*?<matchheadword>(.*?)<\/matchheadword>[\s\S]*?<matchid>(.*?)<\/matchid>[\s\S]*?<\/match>/g;

        while ((matchResult = traditionalRegex.exec(searchResp.data)) !== null) {
          const headwordRaw = matchResult[1];
          const headwordClean = headwordRaw.replace(/<[^>]+>/g, '').trim();
          const matchId = matchResult[2].trim();
          foundMatches.push({ matchId, headword: headwordClean });
          console.log(`Found match (traditional): ${headwordClean}, ID: ${matchId}`);
        }
      }

      if (foundMatches.length === 0) {
        const idMatch = searchResp.data.match(/<matchid>([^<]+)<\/matchid>/);
        const headwordMatch = searchResp.data.match(/<matchheadword>([^<]+)<\/matchheadword>/);

        if (idMatch && headwordMatch) {
          const matchId = idMatch[1].trim();
          const headword = headwordMatch[1].replace(/<[^>]+>/g, '').trim();
          foundMatches.push({ matchId, headword });
          console.log(`Found match (fallback): ${headword}, ID: ${matchId}`);
        }
      }

      // Handle Welsh direct lookup if nothing found
      if (lang === 'welsh' && foundMatches.length === 0) {
        console.log('No matches found through parsing, attempting direct lookup for Welsh word');
        const directEntryUrl = `https://welsh-dictionary.ac.uk/gpc/servlet?func=entry&str=${encodeURIComponent(query)}&user=JS-800509a27d53b2ebd993033281540897`;

        try {
          const directResp = await axios.get(directEntryUrl);
          console.log('Got direct entry response:', directResp.data.length);

          const syntheticMatch: Match = {
            matchId: query,
            headword: query
          };

          setMatches([syntheticMatch]);
          await fetchDefinition(syntheticMatch);
          return;
        } catch (directError) {
          console.error('Direct lookup failed:', directError);
        }
      }

      if (foundMatches.length === 0) {
        setErrorMsg('No match found.');
      } else {
        setMatches(foundMatches);
        if (lang === 'welsh' && foundMatches.length > 0) {
          await fetchDefinition(foundMatches[0]);
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      setErrorMsg('Error fetching search results. Please try again.');
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
      let entryUrl = `https://welsh-dictionary.ac.uk/gpc/servlet?func=entry&id=${match.matchId}&user=JS-800509a27d53b2ebd993033281540897`;
      if (match.matchId === match.headword) {
        entryUrl = `https://welsh-dictionary.ac.uk/gpc/servlet?func=entry&str=${encodeURIComponent(match.headword)}&user=JS-800509a27d53b2ebd993033281540897`;
      }

      console.log(`Fetching definition: ${entryUrl}`);
      const entryResp = await axios.get(entryUrl);
      console.log('Got definition response, length:', entryResp.data.length);

      const xml = entryResp.data;
      console.log("Definition response sample:", xml.substring(0, 300));

      const paragraphRegex = /<p[^>]*>([\s\S]*?)<\/p>/g;
      const paragraphs: string[] = [];
      let paragraphMatch;

      while ((paragraphMatch = paragraphRegex.exec(xml)) !== null) {
        const cleanParagraph = paragraphMatch[1]
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<[^>]+>/g, '')
          .trim();
        if (cleanParagraph) paragraphs.push(cleanParagraph);
      }

      const posMatch = xml.match(/<pos>([\s\S]*?)<\/pos>/);
      const pos = posMatch ? posMatch[1].replace(/<[^>]+>/g, '').trim() : undefined;

      if (paragraphs.length === 0) {
        const defMatches = [...xml.matchAll(/<definition>([\s\S]*?)<\/definition>/g)];

        if (defMatches.length > 0) {
          const defs: Definition[] = defMatches.map((d) => ({
            defText: d[1].replace(/<[^>]+>/g, '').trim(),
          }));

          if (pos && defs.length > 0) defs[0].pos = pos;
          setDefinitions(defs);
        } else {
          setErrorMsg('No definition content found.');
        }
      } else {
        const defs: Definition[] = paragraphs.map((text, index) => {
          if (index === 0 && pos) return { defText: text, pos };
          return { defText: text };
        });
        setDefinitions(defs);
      }
    } catch (error) {
      console.error('Definition fetch error:', error);
      setErrorMsg('Error fetching definition. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>GPC Welsh Dictionary</Text>

      <TextInput
        style={styles.input}
        placeholder={`Enter a ${lang} word...`}
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

      <TouchableOpacity
        style={styles.searchButton}
        onPress={searchWord}
        disabled={loading}
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {loading && <Text style={styles.status}>Loading...</Text>}
      {!!errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

      {lang === 'english' && matches.length > 0 && (
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
});
