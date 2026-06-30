import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  ScrollView,
  StyleSheet,
} from 'react-native';

interface Phrase {
  english: string;
  welsh: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  pronunciation: string;
}

interface DifficultyOrder {
  Beginner: number;
  Intermediate: number;
  Advanced: number;
}

interface EmojiMap {
  [key: string]: string;
}

const WelshPhrases = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentSort, setCurrentSort] = useState('none');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const phrasesData: Phrase[] = [
    { english: 'How are you?', welsh: 'Sut wyt ti?', category: 'Conversation', difficulty: 'Beginner', pronunciation: 'Sit oyt tee' },
    { english: 'Thank you very much', welsh: 'Diolch yn fawr', category: 'Politeness', difficulty: 'Beginner', pronunciation: 'Dee-olkh un vawr' },
    { english: 'What is your name?', welsh: 'Beth yw dy enw di?', category: 'Conversation', difficulty: 'Beginner', pronunciation: 'Beth yu duh en-oo dee' },
    { english: 'I love Wales', welsh: 'Rwy\'n caru Cymru', category: 'Emotions', difficulty: 'Intermediate', pronunciation: 'Roo-in ka-ree Kum-ree' },
    { english: 'Where is the toilet?', welsh: 'Ble mae\'r tŷ bach?', category: 'Travel', difficulty: 'Beginner', pronunciation: 'Bleh my-er tee bahkh' },
    { english: 'I don\'t understand', welsh: 'Dw i ddim yn deall', category: 'Conversation', difficulty: 'Intermediate', pronunciation: 'Doo ee theem un de-ahl' },
    { english: 'Good morning', welsh: 'Bore da', category: 'Greetings', difficulty: 'Beginner', pronunciation: 'Bor-eh da' },
    { english: 'Have a nice day', welsh: 'Cewch ddiwrnod da', category: 'Politeness', difficulty: 'Intermediate', pronunciation: 'Keh-ookh thee-oor-nod da' },
    { english: 'I would like a coffee', welsh: 'Hoffwn i gael coffi', category: 'Food & Drink', difficulty: 'Intermediate', pronunciation: 'Hoff-oon ee guy-el koff-ee' },
    { english: 'Excuse me', welsh: 'Esgusodwch fi', category: 'Politeness', difficulty: 'Beginner', pronunciation: 'Es-gee-sod-ookh vee' },
    { english: 'See you later', welsh: 'Wela i chi wedyn', category: 'Farewells', difficulty: 'Intermediate', pronunciation: 'Well-ah ee khee wed-in' },
    { english: 'How much does it cost?', welsh: 'Faint mae\'n costio?', category: 'Shopping', difficulty: 'Intermediate', pronunciation: 'Vint my-en kost-ee-o' },
    { english: 'I am learning Welsh', welsh: 'Dw i\'n dysgu Cymraeg', category: 'Education', difficulty: 'Intermediate', pronunciation: 'Doo een dus-gee Kum-ry-eg' },
    { english: 'Happy birthday', welsh: 'Pen-blwydd hapus', category: 'Celebrations', difficulty: 'Beginner', pronunciation: 'Pen-bloo-ith hap-ees' },
  ];

  const difficultyOrder: DifficultyOrder = {
    Beginner: 1,
    Intermediate: 2,
    Advanced: 3,
  };

  const categories = ['All', 'Greetings', 'Conversation', 'Politeness', 'Travel', 'Food & Drink', 'Shopping', 'Education', 'Emotions', 'Farewells', 'Celebrations', 'Requests'];

  const filteredPhrases = selectedCategory === 'All'
    ? phrasesData
    : phrasesData.filter(item => item.category === selectedCategory);

  const getSortedData = () => {
    switch (currentSort) {
      case 'english':
        return [...filteredPhrases].sort((a, b) => a.english.localeCompare(b.english));
      case 'welsh':
        return [...filteredPhrases].sort((a, b) => a.welsh.localeCompare(b.welsh));
      case 'difficulty':
        return [...filteredPhrases].sort((a, b) =>
          difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        );
      default:
        return filteredPhrases;
    }
  };

  const getCategoryEmoji = (category: string): string => {
    const emojiMap: EmojiMap = {
      'All': '💬',
      'Greetings': '👋',
      'Conversation': '🗣️',
      'Politeness': '🙏',
      'Travel': '✈️',
      'Food & Drink': '🍽️',
      'Shopping': '🛒',
      'Education': '📚',
      'Emotions': '❤️',
      'Farewells': '👋',
      'Celebrations': '🎉',
      'Requests': '🙋',
    };
    return emojiMap[category] || '💬';
  };

  const animateFilter = (category: string) => {
    setSelectedCategory(category);
    setCurrentSort('none');
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.3, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  const animateSort = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.3, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return '#4CAF50';
      case 'Intermediate':
        return '#FF9800';
      case 'Advanced':
        return '#F44336';
      default:
        return '#2196F3';
    }
  };

  const renderPhraseItem = ({ item, index }: { item: Phrase; index: number }) => (
    <View style={[
      styles.phraseItem,
      { backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa' }
    ]}>
      <View style={styles.phraseContent}>
        <View style={styles.categoryTag}>
          <Text style={styles.categoryTagText}>{item.category}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.english}>{item.english}</Text>
          <Text style={styles.welsh}>{item.welsh}</Text>
        </View>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
          <Text style={styles.difficultyText}>{item.difficulty}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { position: 'absolute', width: '100%', zIndex: 1 }]}>
        <Text style={styles.title}>Welsh Common Phrases</Text>
        <Text style={styles.subtitle}>Ymadroddion Cyffredin Cymraeg</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {filteredPhrases.length} {filteredPhrases.length === 1 ? "phrase" : "phrases"}
          </Text>
        </View>
      </View>

      <Animated.View style={[styles.listContainer, { opacity: fadeAnim }]}>
        <FlatList
          data={getSortedData()}
          keyExtractor={(item, index) => `${item.english}-${index}`}
          renderItem={renderPhraseItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.listContent, { paddingTop: 160 }]}
          ListHeaderComponent={
            <View>
              <View style={styles.filterContainer}>
                <Text style={styles.filterLabel}>Categories:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.categoryScroll}
                >
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.categoryButton,
                        selectedCategory === category && styles.activeCategoryButton
                      ]}
                      onPress={() => animateFilter(category)}
                    >
                      <Text style={styles.categoryEmoji}>{getCategoryEmoji(category)}</Text>
                      <Text style={[
                        styles.categoryButtonText,
                        selectedCategory === category && styles.activeCategoryButtonText
                      ]}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.controls}>
                <Text style={styles.sortLabel}>Sort by:</Text>
                <View style={styles.buttonContainer}>
                  {['english', 'welsh', 'difficulty'].map(type => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.button,
                        currentSort === type && styles.activeButton,
                        styles.buttonShadow
                      ]}
                      onPress={() => { setCurrentSort(type); animateSort(); }}
                    >
                      <Text style={[
                        styles.buttonText,
                        currentSort === type && styles.activeButtonText
                      ]}>
                        {{
                          english: '🇬🇧 English',
                          welsh: '🏴 Cymraeg',
                          difficulty: '📊 Difficulty'
                        }[type]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  {currentSort !== 'none' && (
                    <TouchableOpacity
                      style={[styles.resetButton, styles.buttonShadow]}
                      onPress={() => { setCurrentSort('none'); animateSort(); }}
                    >
                      <Text style={styles.resetButtonText}>↻ Reset</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          }
        />
      </Animated.View>
    </View>
  );
};

export default WelshPhrases;


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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  filterContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  controls: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },

  // Typography
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#007a33',
    marginBottom: 12,
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007a33',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  sortLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  english: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  welsh: {
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'italic',
    color: '#007a33',
  },
  pronunciation: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  // Phrase Items
  phraseItem: {
    marginVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  phraseContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },

  // Badges
  countBadge: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryTag: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  categoryTagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#007a33',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#ffffff',
  },

  // Buttons
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  activeButton: {
    backgroundColor: '#007a33',
    borderColor: '#007a33',
    transform: [{ scale: 1.02 }],
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  activeButtonText: {
    color: '#fff',
  },
  resetButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Category Buttons
  categoryScroll: {
    paddingVertical: 8,
    flexDirection: 'row',
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  activeCategoryButton: {
    backgroundColor: '#007a33',
    borderColor: '#007a33',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activeCategoryButtonText: {
    color: '#fff',
  },
  categoryEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
});
