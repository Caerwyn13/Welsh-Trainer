import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Animated, StyleSheet, ScrollView } from 'react-native';

const WelshVocabulary = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentSort, setCurrentSort] = useState('none');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const vocabularyData = [
    { english: 'House', welsh: 'Tŷ', category: 'Home', difficulty: 'Beginner' },
    { english: 'Water', welsh: 'Dŵr', category: 'Nature', difficulty: 'Beginner' },
    { english: 'Book', welsh: 'Llyfr', category: 'Education', difficulty: 'Beginner' },
    { english: 'Family', welsh: 'Teulu', category: 'People', difficulty: 'Beginner' },
    { english: 'Beautiful', welsh: 'Hardd', category: 'Adjectives', difficulty: 'Intermediate' },
    { english: 'Mountain', welsh: 'Mynydd', category: 'Nature', difficulty: 'Beginner' },
    { english: 'Kitchen', welsh: 'Cegin', category: 'Home', difficulty: 'Beginner' },
    { english: 'Teacher', welsh: 'Athro/Athrawes', category: 'People', difficulty: 'Intermediate' },
    { english: 'Dragon', welsh: 'Draig', category: 'Culture', difficulty: 'Beginner' },
    { english: 'Language', welsh: 'Iaith', category: 'Education', difficulty: 'Intermediate' },
    { english: 'Sea', welsh: 'Môr', category: 'Nature', difficulty: 'Beginner' },
    { english: 'Castle', welsh: 'Castell', category: 'Culture', difficulty: 'Beginner' },
    { english: 'Wonderful', welsh: 'Bendigedig', category: 'Adjectives', difficulty: 'Advanced' },
    { english: 'Grandmother', welsh: 'Nain', category: 'People', difficulty: 'Beginner' },
    { english: 'Garden', welsh: 'Gardd', category: 'Home', difficulty: 'Beginner' }
  ];

  const categories = ['All', 'Home', 'Nature', 'People', 'Education', 'Culture', 'Adjectives'];

  const filteredVocabulary = selectedCategory === 'All' 
    ? vocabularyData 
    : vocabularyData.filter(item => item.category === selectedCategory);

  const sortByEnglish = () => {
    return [...filteredVocabulary].sort((a, b) => a.english.localeCompare(b.english));
  };

  const sortByWelsh = () => {
    return [...filteredVocabulary].sort((a, b) => a.welsh.localeCompare(b.welsh));
  };

  const resetSort = () => {
    return filteredVocabulary;
  };

  const getSortedData = () => {
    switch(currentSort) {
      case 'english': return sortByEnglish();
      case 'welsh': return sortByWelsh();
      default: return filteredVocabulary;
    }
  };

interface AnimationConfig {
    toValue: number;
    duration: number;
    useNativeDriver: boolean;
}

const animateSort = (sortFunction?: () => void): void => {
    Animated.sequence([
        Animated.timing(fadeAnim, {
            toValue: 0.3,
            duration: 150,
            useNativeDriver: true
        } as AnimationConfig),
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true
        } as AnimationConfig)
    ]).start();
};

interface FilterAnimationConfig {
    toValue: number;
    duration: number;
    useNativeDriver: boolean;
}

const animateFilter = (category: string): void => {
    setSelectedCategory(category);
    setCurrentSort('none');
    Animated.sequence([
        Animated.timing(fadeAnim, {
            toValue: 0.3,
            duration: 150,
            useNativeDriver: true
        } as FilterAnimationConfig),
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true
        } as FilterAnimationConfig)
    ]).start();
};

interface CategoryEmojiMap {
    [key: string]: string;
}

const getCategoryEmoji = (category: string): string => {
    const emojiMap: CategoryEmojiMap = {
        'All': '📚',
        'Home': '🏠',
        'Nature': '🌿',
        'People': '👥',
        'Education': '📖',
        'Culture': '🏰',
        'Adjectives': '✨'
    };
    return emojiMap[category] || '📝';
};

interface DifficultyLevel {
    Beginner: string;
    Intermediate: string;
    Advanced: string;
}

const getDifficultyColor = (difficulty: keyof DifficultyLevel | string): string => {
    switch(difficulty) {
        case 'Beginner': return '#4CAF50';
        case 'Intermediate': return '#FF9800';
        case 'Advanced': return '#F44336';
        default: return '#2196F3';
    }
};

  const renderVocabularyItem = ({ item, index }: { item: any, index: number }) => (
    <View style={[
      styles.vocabularyItem,
      { backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa' }
    ]}>
      <View style={styles.vocabularyContent}>
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
        <Text style={styles.title}>Welsh Vocabulary</Text>
        <Text style={styles.subtitle}>Geirfa Cymraeg</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {filteredVocabulary.length} {filteredVocabulary.length === 1 ? "word" : "words"}
          </Text>
        </View>
      </View>

      <Animated.View style={[styles.listContainer, { opacity: fadeAnim }]}>
        <FlatList
          data={getSortedData()}
          keyExtractor={(item, index) => `${item.english}-${index}`}
          renderItem={renderVocabularyItem}
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
                  <TouchableOpacity 
                    style={[
                      styles.button, 
                      currentSort === 'english' && styles.activeButton,
                      styles.buttonShadow
                    ]}
                    onPress={() => { setCurrentSort('english'); animateSort(); }}
                  >
                    <Text style={[styles.buttonText, currentSort === 'english' && styles.activeButtonText]}>
                      🇬🇧 English
                    </Text>
                  </TouchableOpacity>
                             
                  <TouchableOpacity 
                    style={[
                      styles.button, 
                      currentSort === 'welsh' && styles.activeButton,
                      styles.buttonShadow
                    ]}
                    onPress={() => { setCurrentSort('welsh'); animateSort(); }}
                  >
                    <Text style={[styles.buttonText, currentSort === 'welsh' && styles.activeButtonText]}>
                      🏴󠁧󠁢󠁷󠁬󠁳󠁿 Cymraeg
                    </Text>
                  </TouchableOpacity>
                   
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

export default WelshVocabulary;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  categoryScroll: {
    paddingVertical: 8,
    flexDirection: 'row',
    gap: 8,
  },
  vocabularyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vocabularyItem: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 4,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
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
  countBadge: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007a33',
  },
  controls: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  sortLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
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
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 2,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  colorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007a33',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  english: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  welsh: {
    fontSize: 16,
    color: '#007a33',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  indexBadge: {
    backgroundColor: '#e9ecef',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 28,
    alignItems: 'center',
  },
  indexText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6c757d',
  },
  filterContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
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
});
