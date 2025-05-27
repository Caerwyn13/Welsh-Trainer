import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Animated, ScrollView, StyleSheet } from 'react-native';

const WelshCulture = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const cultureData = [
    {
      title: 'Eisteddfod',
      welsh: 'Eisteddfod',
      category: 'Festivals',
      description: 'A traditional Welsh festival celebrating literature, music, and performance. The National Eisteddfod is held annually and conducted entirely in Welsh.',
      details: 'Dating back to the 12th century, Eisteddfods feature competitions in poetry, music, and drama. The winner of the poetry competition receives the prestigious Chair or Crown.',
      importance: 'Cultural Heritage'
    },
    {
      title: 'Welsh Dragon',
      welsh: 'Y Ddraig Goch',
      category: 'Symbols',
      description: 'The red dragon is the national symbol of Wales, appearing on the Welsh flag. It represents strength, wisdom, and protection.',
      details: 'Legend says the red dragon defeated the white dragon of the Saxons. The dragon has been associated with Wales for over 1,000 years.',
      importance: 'National Identity'
    },
    {
      title: 'Cawl',
      welsh: 'Cawl',
      category: 'Food',
      description: 'Traditional Welsh stew made with lamb or beef, vegetables, and herbs. Often considered the national dish of Wales.',
      details: 'Typically contains leeks (the national vegetable), potatoes, swede, and carrots. Each family has their own recipe passed down through generations.',
      importance: 'Culinary Tradition'
    },
    {
      title: 'Male Voice Choirs',
      welsh: 'Corau Meibion',
      category: 'Music',
      description: 'Wales is famous for its male voice choirs, with a rich tradition of choral singing dating back to the 19th century.',
      details: 'Originally formed by miners and steelworkers, these choirs sing traditional Welsh hymns, folk songs, and classical pieces in beautiful harmony.',
      importance: 'Musical Heritage'
    },
    {
      title: 'St. David\'s Day',
      welsh: 'Dydd Gŵyl Dewi',
      category: 'Holidays',
      description: 'Wales\' national day celebrated on March 1st, honoring St. David, the patron saint of Wales.',
      details: 'People wear daffodils or leeks, traditional Welsh symbols. Children often wear traditional Welsh costumes to school.',
      importance: 'National Celebration'
    },
    {
      title: 'Castell',
      welsh: 'Castell',
      category: 'Architecture',
      description: 'Wales has more castles per square mile than any other country. These medieval fortresses tell the story of Welsh history.',
      details: 'Famous castles include Caerphilly, Conwy, and Harlech. Many were built during the 13th-century conquest of Wales by Edward I.',
      importance: 'Historical Legacy'
    },
    {
      title: 'Rugby',
      welsh: 'Rygbi',
      category: 'Sports',
      description: 'Rugby is Wales\' national sport and a source of great pride. The Welsh national team plays at the Principality Stadium in Cardiff.',
      details: 'Wales has won the Six Nations Championship multiple times. The sport brings communities together and is deeply embedded in Welsh culture.',
      importance: 'National Sport'
    },
    {
      title: 'Cymanfa Ganu',
      welsh: 'Cymanfa Ganu',
      category: 'Music',
      description: 'A traditional Welsh hymn-singing festival where congregations gather to sing Welsh hymns in four-part harmony.',
      details: 'These events can last several hours with hundreds of voices joining together. They maintain the tradition of Welsh hymn singing.',
      importance: 'Religious Tradition'
    },
    {
      title: 'Welsh Language',
      welsh: 'Cymraeg',
      category: 'Language',
      description: 'Welsh is one of Europe\'s oldest languages and is spoken by over 700,000 people. It\'s an official language of Wales.',
      details: 'The language nearly disappeared but has seen a revival. All children in Wales now learn Welsh in school, and Welsh-medium education is growing.',
      importance: 'Cultural Identity'
    },
    {
      title: 'Lovespoons',
      welsh: 'Llwyau Cariad',
      category: 'Crafts',
      description: 'Ornately carved wooden spoons traditionally given as tokens of affection and courtship in Wales.',
      details: 'Each symbol carved on the spoon has meaning - hearts for love, horseshoes for luck, Celtic knots for eternal love. The tradition dates back to the 17th century.',
      importance: 'Folk Art'
    }
  ];

  const categories = ['All', 'Festivals', 'Symbols', 'Food', 'Music', 'Holidays', 'Architecture', 'Sports', 'Language', 'Crafts'];

  const filteredCulture = selectedCategory === 'All' 
    ? cultureData 
    : cultureData.filter(item => item.category === selectedCategory);

interface CultureItem {
    title: string;
    welsh: string;
    category: string;
    description: string;
    details: string;
    importance: string;
}

const animateFilter = (category: string): void => {
    setSelectedCategory(category);
    setExpandedItems(new Set<number>()); // Collapse all items when changing category
    Animated.sequence([
        Animated.timing(fadeAnim, { 
            toValue: 0.3, 
            duration: 150, 
            useNativeDriver: true 
        }),
        Animated.timing(fadeAnim, { 
            toValue: 1, 
            duration: 150, 
            useNativeDriver: true 
        })
    ]).start();
};

interface ExpandedItems extends Set<number> {}

const toggleExpanded = (index: number): void => {
    const newExpanded: ExpandedItems = new Set<number>(expandedItems);
    if (newExpanded.has(index)) {
        newExpanded.delete(index);
    } else {
        newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
};

interface CategoryEmojiMap {
    [key: string]: string;
}

const getCategoryEmoji = (category: string): string => {
    const emojiMap: CategoryEmojiMap = {
        'All': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
        'Festivals': '🎭',
        'Symbols': '🐉', 
        'Food': '🍲',
        'Music': '🎵',
        'Holidays': '🎉',
        'Architecture': '🏰',
        'Sports': '🏉',
        'Language': '🗣️',
        'Crafts': '🪵'
    };
    return emojiMap[category] || '🏴󠁧󠁢󠁷󠁬󠁳󠁿';
};

interface ImportanceColors {
    'Cultural Heritage': string;
    'National Identity': string;
    'Culinary Tradition': string;
    'Musical Heritage': string;
    'National Celebration': string;
    'Historical Legacy': string;
    'National Sport': string;
    'Religious Tradition': string;
    'Cultural Identity': string;
    'Folk Art': string;
}

type ImportanceType = keyof ImportanceColors | string;

const getImportanceColor = (importance: ImportanceType): string => {
    switch(importance) {
        case 'Cultural Heritage': return '#9C27B0';
        case 'National Identity': return '#F44336';
        case 'Culinary Tradition': return '#FF9800';
        case 'Musical Heritage': return '#2196F3';
        case 'National Celebration': return '#4CAF50';
        case 'Historical Legacy': return '#795548';
        case 'National Sport': return '#E91E63';
        case 'Religious Tradition': return '#607D8B';
        case 'Cultural Identity': return '#FF5722';
        case 'Folk Art': return '#009688';
        default: return '#9E9E9E';
    }
};

  const renderCultureItem = ({ item, index }: { item: CultureItem; index: number }) => {
    const isExpanded = expandedItems.has(index);
    
    return (
      <TouchableOpacity 
        style={[
          styles.cultureItem,
          { backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa' }
        ]}
        onPress={() => toggleExpanded(index)}
      >
        <View style={styles.cultureContent}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>{item.category}</Text>
          </View>
          
          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.cultureTitle}>{item.title}</Text>
              <Text style={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</Text>
            </View>
            <Text style={styles.welshTitle}>{item.welsh}</Text>
            <Text style={styles.description}>{item.description}</Text>
            
            {isExpanded && (
              <View style={styles.expandedContent}>
                <Text style={styles.detailsLabel}>More Details:</Text>
                <Text style={styles.details}>{item.details}</Text>
              </View>
            )}
          </View>
          
          <View style={[styles.importanceBadge, { backgroundColor: getImportanceColor(item.importance) }]}>
            <Text style={styles.importanceText}>{item.importance}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { position: 'absolute', width: '100%', zIndex: 1 }]}>
        <Text style={styles.title}>Welsh Culture</Text>
        <Text style={styles.subtitle}>Diwylliant Cymru</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {filteredCulture.length} {filteredCulture.length === 1 ? "topic" : "topics"}
          </Text>
        </View>
      </View>

      <Animated.View style={[styles.listContainer, { opacity: fadeAnim }]}>
        <FlatList
          data={filteredCulture}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={renderCultureItem}
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

              <View style={styles.instructionContainer}>
                <Text style={styles.instructionText}>
                  💡 Tap any item to learn more about Welsh culture and traditions
                </Text>
              </View>
            </View>
          }
        />
      </Animated.View>
    </View>
  );
};

export default WelshCulture;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  instructionContainer: {
    padding: 16,
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  cultureItem: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 4,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  categoryScroll: {
    paddingVertical: 8,
    flexDirection: 'row',
    gap: 8,
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
    alignSelf: 'flex-start',
  },
  categoryTagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#007a33',
  },
  cultureContent: {
    flexDirection: 'column',
    gap: 8,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cultureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  expandIcon: {
    fontSize: 16,
    color: '#999',
  },
  welshTitle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#007a33',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#444',
  },
  expandedContent: {
    marginTop: 8,
  },
  detailsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#333',
  },
  importanceBadge: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  importanceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
});
