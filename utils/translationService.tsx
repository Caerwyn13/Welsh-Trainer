export class TranslationService {
  private static readonly MYMEMORY_URL = 'https://api.mymemory.translated.net/get';
  private static readonly LIBRETRANSLATE_URL = 'https://libretranslate.de/translate';
  private static readonly RATE_LIMIT_DELAY = 1000; // ms between requests
  private static lastRequestTime = 0;

  // Whitelist for known fixed translations
  // Shitty fix for shitty translations because MyMemory is a dumpster fire
  // and I don't want to pollute my database with fucked translations
  private static readonly WHITELIST: Record<string, string> = {
    'cymru': 'Wales',
  };

  // Trusted sources for MyMemory matches
  private static readonly TRUSTED_CREATORS = ['MateCat', 'SDL', 'Microsoft', 'Google'];

  private static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Translate text between Welsh and English using MyMemory + fallback LibreTranslate
   */
  static async translate(
    text: string,
    fromLang: 'cy' | 'en',
    toLang: 'cy' | 'en'
  ): Promise<string | null> {
    if (!text.trim()) return null;

    const lowerText = text.toLowerCase();

    // Check whitelist first
    if (this.WHITELIST[lowerText]) {
      return this.WHITELIST[lowerText];
    }

    try {
      // Rate limiting
      const now = Date.now();
      const elapsed = now - this.lastRequestTime;
      if (elapsed < this.RATE_LIMIT_DELAY) {
        await this.delay(this.RATE_LIMIT_DELAY - elapsed);
      }
      this.lastRequestTime = Date.now();

      // Query MyMemory API
      const url = `${this.MYMEMORY_URL}?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`;
      const response = await fetch(url);
      const data = await response.json();

      // Filter matches for exact segment matches from trusted sources and remove bad translations
      if (Array.isArray(data.matches)) {
        const filteredMatches = data.matches.filter((m: any) =>
          m.segment?.toLowerCase() === lowerText &&
          this.TRUSTED_CREATORS.includes(m['created-by']) &&
          !['ipiales', "i'm in"].includes(m.translation.toLowerCase()) &&
          m.match >= 0.75
        );

        if (filteredMatches.length > 0) {
          // Sort by quality (descending)
          filteredMatches.sort((a: any, b: any) => (parseInt(b.quality) || 0) - (parseInt(a.quality) || 0));
          return filteredMatches[0].translation;
        }
      }

      // If no good matches found, fallback to LibreTranslate
      return await this.fallbackLibreTranslate(text, fromLang, toLang);

    } catch (error) {
      console.warn('Translation error, falling back to LibreTranslate:', error);
      return await this.fallbackLibreTranslate(text, fromLang, toLang);
    }
  }

  private static async fallbackLibreTranslate(
    text: string,
    fromLang: string,
    toLang: string
  ): Promise<string | null> {
    try {
      const res = await fetch(this.LIBRETRANSLATE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: fromLang,
          target: toLang,
          format: 'text',
        }),
      });
      const json = await res.json();
      return json.translatedText || null;
    } catch (err) {
      console.error('LibreTranslate fallback failed:', err);
      return null;
    }
  }

  /** Convenience: Welsh to English */
  static async translateWelshToEnglish(welshText: string): Promise<string | null> {
    return this.translate(welshText, 'cy', 'en');
  }

  /** Convenience: English to Welsh */
  static async translateEnglishToWelsh(englishText: string): Promise<string | null> {
    return this.translate(englishText, 'en', 'cy');
  }

  /** Batch translate multiple texts */
  static async batchTranslate(
    texts: string[],
    fromLang: 'cy' | 'en',
    toLang: 'cy' | 'en'
  ): Promise<(string | null)[]> {
    const results: (string | null)[] = [];
    for (const text of texts) {
      const translation = await this.translate(text, fromLang, toLang);
      results.push(translation);
    }
    return results;
  }
}
