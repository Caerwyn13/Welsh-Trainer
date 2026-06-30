import React, { useRef, useEffect } from 'react';
import { View, Text, FlatList, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const pronunciationData = [
  { sound: 'Ll', pronunciation: "A voiceless 'l' — blow air around the sides of your tongue", example: 'Llanelli', audio: require('../assets/audio/sounds/ll.m4a') },
  { sound: 'Ch', pronunciation: "A throaty 'kh' sound, as in Scottish 'loch'", example: 'Bach', audio: require('../assets/audio/sounds/ch.m4a') },
  { sound: 'Dd', pronunciation: "A voiced 'th' like in 'this'", example: 'Dda', audio: require('../assets/audio/sounds/dd.m4a') },
  { sound: 'F', pronunciation: "Sounds like English 'v'", example: 'Myfyr', audio: require('../assets/audio/sounds/f.m4a') },
  { sound: 'FF', pronunciation: "Sounds like English 'f'", example: 'Ceffyl', audio: require('../assets/audio/sounds/ff.m4a') },
  { sound: 'Rh', pronunciation: "A voiceless trilled 'r'", example: 'Rhos', audio: require('../assets/audio/sounds/rh.m4a') },
  { sound: 'Th', pronunciation: "A soft 'th' as in 'thin'", example: 'Llethr', audio: require('../assets/audio/sounds/th.m4a') },
  { sound: 'U', pronunciation: "Pronounced like 'i' in 'bit' or 'ee'", example: 'Llugwy', audio: require('../assets/audio/sounds/u.m4a') },
  { sound: 'Y', pronunciation: "Varies by position — like 'i' or a schwa", example: 'Cymru', audio: require('../assets/audio/sounds/y.m4a') },
  { sound: 'W', pronunciation: "Varies by position — like 'oo' or as the normal consonant w", example: 'Dŵr', audio: require('../assets/audio/sounds/w.m4a') },
];

const PronunciationGuide = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animateList = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const playSound = async (audioFile: any) => {
    const { sound } = await Audio.Sound.createAsync(audioFile);
    await sound.playAsync();
    // Unload sound when done
    sound.setOnPlaybackStatusUpdate(status => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View
      style={[
        styles.itemContainer,
        { backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa' },
      ]}
    >
      <View style={styles.soundBox}>
        <Text style={styles.soundText}>{item.sound}</Text>
        <TouchableOpacity onPress={() => playSound(item.audio)} style={styles.audioButton}>
          <Ionicons name="volume-high" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.pronunciationText}>{item.pronunciation}</Text>
        <Text style={styles.exampleText}>Example: <Text style={styles.exampleWord}>{item.example}</Text></Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pronunciation Guide</Text>
        <Text style={styles.subtitle}>Canllaw ynganiad Cymraeg</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {pronunciationData.length} entries
          </Text>
        </View>
        <Text style={styles.text}>Although it may look scary, Welsh writing is actually very simple. Welsh is what's known as a phonetic language,
            meaning that words are pronounced exactly as they are written.
            The pronunciation guide below will help you with the most common sounds in Welsh.
            Letters that are not listed here are pronounced as in English, and letters such as 'c' and 'g' are always hard, as in 'cat' and 'go',
            and not soft as in 'city' or 'giant'.
        </Text>
      </View>

      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <FlatList
          data={pronunciationData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.sound}-${index}`}
          contentContainerStyle={styles.listContent}
          onScrollBeginDrag={animateList}
        />
      </Animated.View>
    </View>
  );
};

export default PronunciationGuide;

const styles = StyleSheet.create({
    // Layout
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        backgroundColor: '#fff',
        paddingTop: 60,
        paddingBottom: 24,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        alignItems: 'center',
        // Enhanced shadow for better depth
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },

    // Typography
    title: {
        fontSize: 34,
        fontWeight: '800',
        color: '#1a1a1a',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#007a33',
        marginBottom: 16,
        letterSpacing: 0.3,
    },
    text: {
        fontSize: 16,
        lineHeight: 26,
        color: '#444',
        textAlign: 'center',
        paddingHorizontal: 8,
    },

    // Badge
    countBadge: {
        backgroundColor: '#e8f5e8',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        marginBottom: 16,
    },
    countText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#007a33',
    },

    // List
    listContent: {
        padding: 16,
        paddingBottom: 40,
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: '#e9ecef',
        borderRadius: 16,
        padding: 18,
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
        backgroundColor: '#fff',
        // Subtle shadow for list items
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },

    // Sound box
    soundBox: {
        backgroundColor: '#007a33',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    soundText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
    },
    audioButton: {
        marginTop: 6,
        opacity: 0.9,
    },

    // Description
    descriptionContainer: {
        flex: 1,
    },
    pronunciationText: {
        fontSize: 15,
        color: '#333',
        marginBottom: 6,
        lineHeight: 22,
    },
    exampleText: {
        fontSize: 15,
        color: '#666',
    },
    exampleWord: {
        fontWeight: '700',
        color: '#007a33',
    },
});
