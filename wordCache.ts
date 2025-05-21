import AsyncStorage from '@react-native-async-storage/async-storage';

export type Word = {
  welsh?: string;
  english?: string;
  definitions?: { pos?: string; defText: string }[];
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

export async function clearCache(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CACHE_KEY);
  } catch (e) {
    console.error('Failed to clear cache', e);
    throw e;
  }
}