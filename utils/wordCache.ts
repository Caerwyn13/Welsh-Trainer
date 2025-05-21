import AsyncStorage from '@react-native-async-storage/async-storage';
import { TranslationService } from './translationService';

export type Word = {
  welsh?: string;
  english?: string;
  definitions?: { pos?: string; defText: string }[];
  isTranslated?: boolean; // Flag to indicate if translation was used
};

const CACHE_KEY = 'cachedWords';

export async function getCachedWords(): Promise<Word[]> {
  try {
    const json = await AsyncStorage.getItem(CACHE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Failed to load cached words', e);
    return [];
  }
}

export async function cacheWord(newWord: Word): Promise<void> {
  try {
    const existingWords = await getCachedWords();

    // Check if it's already in the list (by Welsh term, for example)
    const exists = existingWords.some(
      (word) =>
        word.welsh !== undefined &&
        newWord.welsh !== undefined &&
        word.welsh.trim().toLowerCase() === newWord.welsh.trim().toLowerCase()
    );

    if (!exists) {
      const updatedWords = [...existingWords, newWord];
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(updatedWords));
    }
  } catch (e) {
    console.error('Failed to cache word', e);
  }
}

export async function cacheWordWithTranslation(
  word: Partial<Word>, 
  preferredLang: 'welsh' | 'english'
): Promise<void> {
  try {
    let enhancedWord = { ...word };

    // If we have Welsh but no English, translate Welsh to English
    if (enhancedWord.welsh && !enhancedWord.english) {
      const englishTranslation = await TranslationService.translateWelshToEnglish(enhancedWord.welsh);
      if (englishTranslation) {
        enhancedWord.english = englishTranslation;
        enhancedWord.isTranslated = true;
      }
    }
    // If we have English but no Welsh, translate English to Welsh
    else if (enhancedWord.english && !enhancedWord.welsh) {
      const welshTranslation = await TranslationService.translateEnglishToWelsh(enhancedWord.english);
      if (welshTranslation) {
        enhancedWord.welsh = welshTranslation;
        enhancedWord.isTranslated = true;
      }
    }

    // Add basic definition if none exists
    if (!enhancedWord.definitions || enhancedWord.definitions.length === 0) {
      const translationText = preferredLang === 'welsh' ? enhancedWord.english : enhancedWord.welsh;
      if (translationText) {
        enhancedWord.definitions = [{
          defText: translationText,
          pos: undefined
        }];
      }
    }

    await cacheWord(enhancedWord as Word);
  } catch (e) {
    console.error('Failed to cache word with translation:', e);
    // Fall back to caching without translation
    await cacheWord(word as Word);
  }
}

export async function translateMissingWords(): Promise<number> {
  try {
    const words = await getCachedWords();
    let translatedCount = 0;
    const updatedWords: Word[] = [];

    for (const word of words) {
      let updatedWord = { ...word };
      let hasChanges = false;

      // Translate missing English
      if (updatedWord.welsh && !updatedWord.english) {
        const englishTranslation = await TranslationService.translateWelshToEnglish(updatedWord.welsh);
        if (englishTranslation) {
          updatedWord.english = englishTranslation;
          updatedWord.isTranslated = true;
          hasChanges = true;
          translatedCount++;
        }
      }

      // Translate missing Welsh
      if (updatedWord.english && !updatedWord.welsh) {
        const welshTranslation = await TranslationService.translateEnglishToWelsh(updatedWord.english);
        if (welshTranslation) {
          updatedWord.welsh = welshTranslation;
          updatedWord.isTranslated = true;
          hasChanges = true;
          translatedCount++;
        }
      }

      // Add basic definition if missing
      if (hasChanges && (!updatedWord.definitions || updatedWord.definitions.length === 0)) {
        const translationText = updatedWord.english || updatedWord.welsh;
        if (translationText) {
          updatedWord.definitions = [{
            defText: translationText,
            pos: undefined
          }];
        }
      }

      updatedWords.push(updatedWord);
    }

    // Save updated words if any changes were made
    if (translatedCount > 0) {
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(updatedWords));
    }

    return translatedCount;
  } catch (e) {
    console.error('Failed to translate missing words:', e);
    return 0;
  }
}

export async function clearCache(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CACHE_KEY);
  } catch (e) {
    console.error('Failed to clear cache', e);
    throw e;
  }
}