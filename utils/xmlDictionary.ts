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
 * Helper function to extract text content and part of speech from XML elements
 */
function extractTextAndPos(element: any): { text: string; pos?: string } {
  if (typeof element === 'string') {
    return { text: element.trim() };
  }

  if (!element) {
    return { text: '' };
  }

  let text = '';
  let pos: string | undefined;

  // Handle different possible structures
  if (typeof element['#text'] === 'string') {
    text = element['#text'].trim();
  } else if (typeof element === 'object') {
    // If element is an object, it might have text content directly
    // or we need to extract it from mixed content
    const keys = Object.keys(element);
    
    // Look for direct text content
    for (const key of keys) {
      if (key !== 's' && typeof element[key] === 'string') {
        text = element[key].trim();
        break;
      }
    }
    
    // If no direct text found, try to concatenate text nodes
    if (!text && element['#text']) {
      text = String(element['#text']).trim();
    }
  }

  // Look for <s> tag with n attribute for part of speech
  if (element.s) {
    if (typeof element.s === 'object' && element.s.n) {
      pos = element.s.n;
    } else if (Array.isArray(element.s)) {
      // Handle case where there might be multiple <s> tags
      const sTag = element.s.find((s: any) => s.n);
      if (sTag) pos = sTag.n;
    }
  }

  return { text, pos };
}

/**
 * Loads the Welsh-English dictionary from the local XML asset.
 */
export async function loadDictionary(): Promise<XMLWord[]> {
  if (cachedWords) return cachedWords;

  try {
    const asset = Asset.fromModule(require('../assets/dictionary.xml'));
    await asset.downloadAsync();

    const xmlContent = await readAsStringAsync(asset.localUri!);

    // Parse XML with options to preserve attributes and text nodes
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      textNodeName: '#text',
      parseAttributeValue: true,
      trimValues: true,
      parseTagValue: false,
      processEntities: true,
    });
    const parsed = parser.parse(xmlContent);

    // Navigate to entries array - adjust path based on your XML structure
    let entries: any[] = [];
    
    // Try different possible paths to find the entries
    if (parsed?.dictionary?.section?.e) {
      entries = Array.isArray(parsed.dictionary.section.e) ? parsed.dictionary.section.e : [parsed.dictionary.section.e];
    } else if (parsed?.dictionary?.e) {
      entries = Array.isArray(parsed.dictionary.e) ? parsed.dictionary.e : [parsed.dictionary.e];
    } else if (parsed?.e) {
      entries = Array.isArray(parsed.e) ? parsed.e : [parsed.e];
    }

    console.log('Found entries:', entries.length);

    // Parse each entry
    const words = entries
      .map((entry) => {
        const p = entry?.p;
        
        if (!p) {
          console.warn('Entry missing p element:', entry);
          return null;
        }

        // Extract Welsh text and pos from <l> element
        const welshData = extractTextAndPos(p.l);
        
        // Extract English text from <r> element
        const englishData = extractTextAndPos(p.r);

        // Use Welsh pos if available, otherwise English pos
        const partOfSpeech = welshData.pos || englishData.pos;

        return {
          welsh: welshData.text,
          english: englishData.text,
          type: partOfSpeech,
        } as XMLWord;
      })
      .filter((word): word is XMLWord => 
        word !== null && word.welsh.length > 0 && word.english.length > 0
      );

    console.log('Parsed words:', words.length);
    console.log('Sample words:', words.slice(0, 5));

    cachedWords = words;
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

  console.log('Searching for:', normalizedQuery, 'in', lang);
  console.log('Total words to search:', words.length);

  const results = words.filter((word) =>
    word[lang].toLowerCase().includes(normalizedQuery)
  );

  console.log('Search results:', results.length);
  
  return results;
}