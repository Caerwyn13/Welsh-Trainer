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
      details: 'Dating back to the 12th century, Eisteddfods feature competitions in poetry, music, and drama. The winner of the poetry competition receives the prestigious Chair or Crown. The Royal National Eisteddfod alternates between North and South Wales each year, attracting over 150,000 visitors. Smaller local eisteddfods happen throughout the year in communities across Wales.',
      importance: 'Cultural Heritage',
      funFact: 'The Gorsedd of Bards ceremony includes druids in colorful robes and is based on 18th-century romantic notions of ancient Celtic practices.'
    },
    {
      title: 'Welsh Dragon',
      welsh: 'Y Ddraig Goch',
      category: 'Symbols',
      description: 'The red dragon is the national symbol of Wales, appearing on the Welsh flag. It represents strength, wisdom, and protection.',
      details: 'Legend says the red dragon defeated the white dragon of the Saxons in the tale of Lludd and Llefelys. The dragon has been associated with Wales for over 1,000 years. King Arthur\'s father Uther Pendragon means "head dragon" in Welsh. The current flag design was officially adopted in 1959.',
      importance: 'National Identity',
      funFact: 'Wales is the only country in the UK whose flag doesn\'t appear on the Union Jack, despite being part of the union since 1536.'
    },
    {
      title: 'Cawl',
      welsh: 'Cawl',
      category: 'Food',
      description: 'Traditional Welsh stew made with lamb or beef, vegetables, and herbs. Often considered the national dish of Wales.',
      details: 'Typically contains leeks (the national vegetable), potatoes, swede, and carrots. Each family has their own recipe passed down through generations. Originally a peasant dish, cawl was cooked slowly over an open fire. The best cawl is said to taste better the next day when reheated.',
      importance: 'Culinary Tradition',
      funFact: 'There\'s a Welsh saying: "Cawl without leeks is like a hug without arms" - emphasizing the importance of leeks in the dish.'
    },
    {
      title: 'Male Voice Choirs',
      welsh: 'Corau Meibion',
      category: 'Music',
      description: 'Wales is famous for its male voice choirs, with a rich tradition of choral singing dating back to the 19th century.',
      details: 'Originally formed by miners and steelworkers, these choirs sing traditional Welsh hymns, folk songs, and classical pieces in beautiful harmony. The Morriston Orpheus Choir and Treorchy Male Choir are world-renowned. Choir competitions are fierce, with the "Battle of the Choirs" being a popular TV format.',
      importance: 'Musical Heritage',
      funFact: 'The tradition started in the 1800s when Welsh miners would sing together to pass time and boost morale in the dangerous coal mines.'
    },
    {
      title: 'St. David\'s Day',
      welsh: 'Dydd Gŵyl Dewi',
      category: 'Holidays',
      description: 'Wales\' national day celebrated on March 1st, honoring St. David, the patron saint of Wales.',
      details: 'People wear daffodils or leeks, traditional Welsh symbols. Children often wear traditional Welsh costumes to school. St. David was a 6th-century monk who became the patron saint. His last words were reportedly "Be joyful, keep the faith, and do the little things." Celebrations include parades, concerts, and traditional Welsh food.',
      importance: 'National Celebration',
      funFact: 'St. David is said to have lived on bread, water, and wild leeks, which is why the leek became a Welsh symbol.'
    },
    {
      title: 'Castell',
      welsh: 'Castell',
      category: 'Architecture',
      description: 'Wales has more castles per square mile than any other country. These medieval fortresses tell the story of Welsh history.',
      details: 'Famous castles include Caerphilly, Conwy, and Harlech. Many were built during the 13th-century conquest of Wales by Edward I, known as the "iron ring" of castles. Caerphilly Castle is the second-largest castle in Britain. Some castles like Raglan are ruins, while others like Cardiff Castle are still inhabited.',
      importance: 'Historical Legacy',
      funFact: 'Wales has over 600 castles - more per square mile than anywhere else in the world, earning it the nickname "Castle Capital of the World."'
    },
    {
      title: 'Rugby',
      welsh: 'Rygbi',
      category: 'Sports',
      description: 'Rugby is Wales\' national sport and a source of great pride. The Welsh national team plays at the Principality Stadium in Cardiff.',
      details: 'Wales has won the Six Nations Championship multiple times and achieved Grand Slams in 1908, 1909, 1911, 1950, 1952, 1971, 1976, 1978, 2005, 2008, and 2012. The sport brings communities together and is deeply embedded in Welsh culture. Famous players include Gareth Edwards, JPR Williams, and more recently, Alun Wyn Jones.',
      importance: 'National Sport',
      funFact: 'The Principality Stadium (formerly Millennium Stadium) was the first stadium in the UK to have a fully retractable roof.'
    },
    {
      title: 'Cymanfa Ganu',
      welsh: 'Cymanfa Ganu',
      category: 'Music',
      description: 'A traditional Welsh hymn-singing festival where congregations gather to sing Welsh hymns in four-part harmony.',
      details: 'These events can last several hours with hundreds of voices joining together. They maintain the tradition of Welsh hymn singing. Popular hymns include "Cwm Rhondda" (Guide Me O Thou Great Redeemer) and "Calon Lân" (Pure Heart). The tradition spread with Welsh emigrants to America, Australia, and Patagonia.',
      importance: 'Religious Tradition',
      funFact: 'The largest Cymanfa Ganu in North America takes place annually in Ohio, attracting Welsh singers from across the continent.'
    },
    {
      title: 'Welsh Language',
      welsh: 'Cymraeg',
      category: 'Language',
      description: 'Welsh is one of Europe\'s oldest languages and is spoken by over 700,000 people. It\'s an official language of Wales.',
      details: 'The language nearly disappeared but has seen a revival since the 1960s. All children in Wales now learn Welsh in school, and Welsh-medium education is growing. The language has official status and all public signs must be bilingual. Welsh belongs to the Celtic language family, related to Cornish and Breton.',
      importance: 'Cultural Identity',
      funFact: 'Welsh has the longest place name in Europe: Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch (58 letters)!'
    },
    {
      title: 'Lovespoons',
      welsh: 'Llwyau Cariad',
      category: 'Crafts',
      description: 'Ornately carved wooden spoons traditionally given as tokens of affection and courtship in Wales.',
      details: 'Each symbol carved on the spoon has meaning - hearts for love, horseshoes for luck, Celtic knots for eternal love, wheels for working together, and houses for settling down. The tradition dates back to the 17th century when young men would carve spoons during long winter evenings.',
      importance: 'Folk Art',
      funFact: 'The phrase "spooning" (meaning romantic behavior) comes from the Welsh tradition of giving lovespoons as courtship tokens.'
    },
    {
      title: 'Welsh Cakes',
      welsh: 'Picau ar y Maen',
      category: 'Food',
      description: 'Small, round griddle cakes cooked on a bakestone, traditionally served warm with butter and sugar.',
      details: 'Also known as bakestone cakes, they contain flour, butter, sugar, eggs, and currants or raisins. Cooked on a flat iron griddle called a "maen" (stone), they\'re a teatime favorite. Each region has slight variations - some add spices like nutmeg or mixed spice.',
      importance: 'Culinary Tradition',
      funFact: 'Welsh cakes are best eaten on the day they\'re made - they don\'t keep well, which makes them extra special!'
    },
    {
      title: 'Hiraeth',
      welsh: 'Hiraeth',
      category: 'Language',
      description: 'A uniquely Welsh concept describing a deep longing for home, homeland, or a sense of belonging.',
      details: 'Often described as untranslatable, hiraeth encompasses homesickness, nostalgia, and yearning rolled into one emotion. It\'s deeply connected to the Welsh relationship with their land and culture. The feeling can be triggered by music, landscape, or memories of Wales.',
      importance: 'Cultural Identity',
      funFact: 'Hiraeth was voted one of the world\'s most beautiful words and has no direct English translation.'
    },
    {
      title: 'Wool Industry',
      welsh: 'Diwydiant Gwlân',
      category: 'Crafts',
      description: 'Wales has a long tradition of wool production, with distinctive regional patterns and techniques.',
      details: 'Welsh wool blankets feature geometric patterns in traditional colors. The Melin Tregwynt mill in Pembrokeshire still produces wool using traditional methods. Each region developed its own distinctive patterns - Caernarfon, Montgomeryshire, and Teifi being famous examples.',
      importance: 'Folk Art',
      funFact: 'Welsh wool was so prized that it was used as currency in medieval times, and wool merchants became some of the wealthiest people in Wales.'
    },
    {
      title: 'Pubs and Inns',
      welsh: 'Tafarnau',
      category: 'Social Life',
      description: 'Traditional Welsh pubs serve as community gathering places, often featuring live music and local ales.',
      details: 'Many pubs date back centuries and feature traditional Welsh names like "Lamb and Flag" or "Red Lion." They serve local beers like Brains SA (Skull Attack) and often host traditional music sessions. The pub is central to village life, serving as a meeting place for locals.',
      importance: 'Social Heritage',
      funFact: 'Wales was the last part of Britain to allow Sunday drinking - pubs were closed on Sundays until 1961 due to strong temperance movements.'
    },
    {
      title: 'Celtic Cross',
      welsh: 'Croes Geltaidd',
      category: 'Symbols',
      description: 'Stone crosses featuring intricate Celtic knotwork, found throughout Wales as ancient monuments.',
      details: 'These crosses combine Christian symbolism with Celtic art, featuring endless knots representing eternal life. Many date from the 6th-12th centuries. They served as waymarkers, boundary stones, and memorials. The crosses often feature inscriptions in Latin and ancient Welsh.',
      importance: 'Historical Legacy',
      funFact: 'The Celtic cross design influenced the creation of modern Celtic jewelry and tattoos worldwide.'
    }
  ];

  const categories = ['All', 'Festivals', 'Symbols', 'Food', 'Music', 'Holidays', 'Architecture', 'Sports', 'Language', 'Crafts', 'Social Life'];

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
    funFact: string;
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
        'Crafts': '🪵',
        'Social Life': '🍺'
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
    'Social Heritage': string;
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
        case 'Social Heritage': return '#673AB7';
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
                
                <Text style={styles.funFactLabel}>💡 Fun Fact:</Text>
                <Text style={styles.funFact}>{item.funFact}</Text>
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
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  detailsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
  },
  details: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  funFactLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
    marginBottom: 6,
  },
  funFact: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
    backgroundColor: '#fff7f0',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B35',
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