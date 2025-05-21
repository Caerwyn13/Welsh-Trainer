import { readAsStringAsync } from 'expo-file-system';
import { XMLParser } from 'fast-xml-parser';
import { Asset } from 'expo-asset';

export type XMLWord = {
  welsh: string;
  english: string;
  type?: string;
};

let cachedWords: XMLWord[] | null = null;

/**
 * Loads the Welsh-English dictionary from the local XML asset.
 */
export async function loadDictionary(): Promise<XMLWord[]> {
  if (cachedWords) return cachedWords;

  try {
    const asset = Asset.fromModule(require('./assets/dictionary.xml'));
    await asset.downloadAsync();

    const xmlContent = await readAsStringAsync(asset.localUri!);

    // Parse XML with options to preserve attributes and text nodes
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      textNodeName: '#text',
      parseAttributeValue: true,
      isArray: (name, jpath) => {
        // Ensure r/p is always treated as an array
        if (name === 'p' && jpath.endsWith('r.p')) return true;
        return false;
      },
    });
    const parsed = parser.parse(xmlContent);

    // Navigate to entries array
    const entries: any[] = parsed?.dictionary?.section?.e ?? [];

    // Parse each entry
    const words: XMLWord[] = entries.map((entry) => {
      // Each <e> has a <p>, which contains <l> and <r>
      const p = entry?.p;
      
      // Get the part of speech from the entry attributes
      const partOfSpeech = entry?.pos || '';

      // <l> can be a string or an object with #text
      let lemma = '';
      if (typeof p?.l === 'string') {
        lemma = p.l;
      } else if (p?.l?.['#text']) {
        lemma = p.l['#text'];
      }

      // <r> contains one or multiple <p> elements (translations)
      let englishText = '';
      if (p?.r) {
        const r = p.r;

        if (Array.isArray(r.p)) {
          // Multiple translations
          englishText = r.p
            .map((pt: any) =>
              typeof pt === 'string' ? pt : pt?.['#text'] ?? ''
            )
            .filter((t: string) => t.length > 0)
            .join(', ');
        } else if (typeof r.p === 'string') {
          englishText = r.p;
        } else if (r.p?.['#text']) {
          englishText = r.p['#text'];
        }
      }

      return {
        welsh: lemma.trim(),
        english: englishText.trim(),
        type: partOfSpeech || undefined,
      };
    });

    cachedWords = words.filter(word => word.welsh && word.english);
    return cachedWords;
  } catch (error) {
    console.error('Failed to load dictionary:', error);
    return [];
  }
}

/**
 * Searches the dictionary by a query in either Welsh or English.
 * @param query The search term
 * @param lang The language to search in ('welsh' or 'english')
 */
export async function searchDictionary(
  query: string,
  lang: 'welsh' | 'english'
): Promise<XMLWord[]> {
  const words = await loadDictionary();
  const normalizedQuery = query.trim().toLowerCase();

  return words.filter((word) =>
    word[lang].toLowerCase().includes(normalizedQuery)
  );
}