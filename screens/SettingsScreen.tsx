import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { clearCache, getCachedWords, translateMissingWords } from '../utils/wordCache';

export default function SettingsScreen() {
  const [cachedWordCount, setCachedWordCount] = useState<number>(0);
  const [isClearing, setIsClearing] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    loadCacheInfo();
  }, []);

  const loadCacheInfo = async () => {
    try {
      const words = await getCachedWords();
      setCachedWordCount(words.length);
    } catch (e) {
      console.error('Failed to load cache info:', e);
    }
  };

  const handleTranslateMissing = async () => {
    setIsTranslating(true);
    try {
      const translatedCount = await translateMissingWords();
      await loadCacheInfo(); // Refresh the cache info
      
      if (translatedCount > 0) {
        Alert.alert(
          'Translation Complete', 
          `Successfully translated ${translatedCount} words!`
        );
      } else {
        Alert.alert(
          'No Translation Needed', 
          'All your saved words already have translations.'
        );
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to translate words. Please check your internet connection and try again.');
    } finally {
      setIsTranslating(false);
    }
  };
  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      `Are you sure you want to clear all ${cachedWordCount} saved words? This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            setIsClearing(true);
            try {
              await clearCache();
              setCachedWordCount(0);
              Alert.alert('Success', 'Cache cleared successfully!');
            } catch (e) {
              Alert.alert('Error', 'Failed to clear cache. Please try again.');
            } finally {
              setIsClearing(false);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <Text style={styles.sectionTitle}>Cache Management</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          You have <Text style={styles.highlightText}>{cachedWordCount}</Text> saved words
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.actionButton,
          isTranslating && styles.disabledButton
        ]}
        activeOpacity={0.7}
        onPress={handleTranslateMissing}
        disabled={isTranslating || cachedWordCount === 0}
      >
        <Text style={[
          styles.actionButtonText,
          (isTranslating || cachedWordCount === 0) && styles.disabledButtonText
        ]}>
          {isTranslating ? 'Translating...' : 'Auto-Translate Missing Words'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.actionButton,
          styles.clearButton,
          isClearing && styles.disabledButton
        ]}
        activeOpacity={0.7}
        onPress={handleClearCache}
        disabled={isClearing || cachedWordCount === 0}
      >
        <Text style={[
          styles.actionButtonText,
          styles.clearButtonText,
          (isClearing || cachedWordCount === 0) && styles.disabledButtonText
        ]}>
          {isClearing ? 'Clearing...' : 'Clear All Saved Words'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>About</Text>
      
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutText}>
          GPC Welsh Dictionary allows you to search and save Welsh-English word translations.
        </Text>
        <Text style={styles.aboutText}>
          Use the search feature to find words and save them for later reference.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        activeOpacity={0.7}
        onPress={loadCacheInfo}
      >
        <Text style={styles.actionButtonText}>
          Refresh Cache Info
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F8E9',
    padding: 20,
    paddingTop: 50,
    flexGrow: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#33691E',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#558B2F',
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 15,
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    color: '#558B2F',
    textAlign: 'center',
  },
  highlightText: {
    fontWeight: 'bold',
    color: '#33691E',
  },
  actionButton: {
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#AED581',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#263238',
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#FFCDD2',
  },
  clearButtonText: {
    color: '#C62828',
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
  },
  disabledButtonText: {
    color: '#9E9E9E',
  },
  aboutContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
  },
  aboutText: {
    fontSize: 14,
    color: '#558B2F',
    lineHeight: 20,
    marginBottom: 8,
  },
});