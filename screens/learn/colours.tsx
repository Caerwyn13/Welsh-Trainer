import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native'; 

interface ColourItem {
  english: string;
  welsh: string;
}

const colours: ColourItem[] = [
  { english: 'Silver', welsh: 'arian' },
  { english: 'Gold', welsh: 'aur' },
  { english: 'Mottled black', welsh: 'brithddu' },
  { english: 'Red', welsh: 'coch' },
  { english: 'Purple (Reddish blue)', welsh: 'cochlas' },
  { english: 'Black and White', welsh: 'du a gwyn' },
  { english: 'Dark red', welsh: 'dugoch' },
  { english: 'Heather', welsh: 'ehöeg' },
  { english: 'Blue', welsh: 'glas' },
  { english: 'Purple (bluish red)', welsh: 'glasgoch' },
  { english: 'Green', welsh: 'gwyrdd' },
  { english: 'Brown', welsh: 'brown' },
  { english: 'White', welsh: 'gwyn' },
  { english: 'Black', welsh: 'du' },
  { english: 'Pink', welsh: 'pinc' },
  { english: 'Yellow', welsh: 'melyn' },
  { english: 'Orange', welsh: 'oren' },
  { english: 'Grey', welsh: 'llwyd' },
  { english: 'Light blue', welsh: 'glas golau' },
  { english: 'Dark blue', welsh: 'glas tywyll' },
  
  // Additional colors
  { english: 'Crimson', welsh: 'rhuddgoch' },
  { english: 'Scarlet', welsh: 'ysgarlad' },
  { english: 'Maroon', welsh: 'rhudd' },
  { english: 'Rust', welsh: 'rhwd' },
  { english: 'Copper', welsh: 'copr' },
  { english: 'Bronze', welsh: 'efydd' },
  { english: 'Brass', welsh: 'pres' },
  { english: 'Cream', welsh: 'hufen' },
  { english: 'Ivory', welsh: 'ifori' },
  { english: 'Beige', welsh: 'beige' },
  { english: 'Tan', welsh: 'melyngoch' },
  { english: 'Olive', welsh: 'olif' },
  { english: 'Lime', welsh: 'leim' },
  { english: 'Forest green', welsh: 'gwyrdd coedwig' },
  { english: 'Sage', welsh: 'saets' },
  { english: 'Mint', welsh: 'mintys' },
  { english: 'Teal', welsh: 'glaswyrdd' },
  { english: 'Turquoise', welsh: 'gwyrddlas' },
  { english: 'Cyan', welsh: 'cyan' },
  { english: 'Sky blue', welsh: 'glas yr awyr' },
  { english: 'Navy', welsh: 'glas tywyll y llynges' },
  { english: 'Royal blue', welsh: 'glas brenhinol' },
  { english: 'Indigo', welsh: 'indigo' },
  { english: 'Violet', welsh: 'fioled' },
  { english: 'Lavender', welsh: 'lafant' },
  { english: 'Lilac', welsh: 'leilac' },
  { english: 'Magenta', welsh: 'majenta' },
  { english: 'Fuchsia', welsh: 'ffwcsia' },
  { english: 'Rose', welsh: 'rhosliw' },
  { english: 'Coral', welsh: 'cwrel' },
  { english: 'Salmon', welsh: 'pinc eog' },
  { english: 'Peach', welsh: 'eirin wlanog' },
  { english: 'Apricot', welsh: 'bricyllen' },
  { english: 'Lemon', welsh: 'lemwn' },
  { english: 'Mustard', welsh: 'mwstard' },
  { english: 'Amber', welsh: 'ambr' },
  { english: 'Ochre', welsh: 'ocer' },
  { english: 'Sienna', welsh: 'siena' },
  { english: 'Umber', welsh: 'wmbr' },
  { english: 'Mahogany', welsh: 'mahogani' },
  { english: 'Chestnut', welsh: 'castan' },
  { english: 'Auburn', welsh: 'gwinau' },
  { english: 'Burgundy', welsh: 'burgundy' },
  { english: 'Wine', welsh: 'gwin' },
  { english: 'Plum', welsh: 'eirin' },
  { english: 'Charcoal', welsh: 'golosg' },
  { english: 'Slate', welsh: 'llechi' },
  { english: 'Steel', welsh: 'dur' },
  { english: 'Pearl', welsh: 'perl' },
  { english: 'Snow', welsh: 'eira' },
  { english: 'Ash', welsh: 'lludw' },
  { english: 'Smoke', welsh: 'mwg' },
  { english: 'Fog', welsh: 'niwl' }
];

export default function WelshColours() {
  const [sortedColours, setSortedColours] = useState(colours);
  const [currentSort, setCurrentSort] = useState('none');
  const [fadeAnim] = useState(new Animated.Value(1));

  interface SortFunction {
    (): void;
  }

  const animateSort = (sortFunction: SortFunction): void => {
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
    
    setTimeout(sortFunction, 150);
  };

  const sortByEnglish = () => {
    const sorted = [...colours].sort((a, b) => a.english.localeCompare(b.english));
    setSortedColours(sorted);
    setCurrentSort('english');
  };

  const sortByWelsh = () => {
    const sorted = [...colours].sort((a, b) => a.welsh.localeCompare(b.welsh));
    setSortedColours(sorted);
    setCurrentSort('welsh');
  };

  const resetSort = () => {
    setSortedColours(colours);
    setCurrentSort('none');
  };

  const renderColorItem = ({ item, index }: { item: ColourItem; index: number }) => (
    <View style={[styles.row, { backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff' }]}>
      <View style={styles.colorInfo}>
        <View style={styles.colorDot} />
        <View style={styles.textContainer}>
          <Text style={styles.english}>{item.english}</Text>
          <Text style={styles.welsh}>{item.welsh}</Text>
        </View>
      </View>
      <View style={styles.indexBadge}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { position: 'absolute', width: '100%', zIndex: 1 }]}>
        <Text style={styles.title}>Welsh Colours</Text>
        <Text style={styles.subtitle}>Lliwiau Cymraeg</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{sortedColours.length} colours</Text>
        </View>
      </View>
            
      <Animated.View style={[styles.listContainer, { opacity: fadeAnim }]}>
        <FlatList
          data={sortedColours}
          keyExtractor={(item, index) => `${item.english}-${index}`}
          renderItem={renderColorItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.listContent, { paddingTop: 160 }]}
          ListHeaderComponent={
            <View style={styles.controls}>
              <Text style={styles.sortLabel}>Sort by:</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[
                    styles.button, 
                    currentSort === 'english' && styles.activeButton,
                    styles.buttonShadow
                  ]}
                  onPress={() => animateSort(sortByEnglish)}
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
                  onPress={() => animateSort(sortByWelsh)}
                >
                  <Text style={[styles.buttonText, currentSort === 'welsh' && styles.activeButtonText]}>
                    🏴󠁧󠁢󠁷󠁬󠁳󠁿 Cymraeg
                  </Text>
                </TouchableOpacity>
                
                {currentSort !== 'none' && (
                  <TouchableOpacity 
                    style={[styles.resetButton, styles.buttonShadow]}
                    onPress={() => animateSort(resetSort)}
                  >
                    <Text style={styles.resetButtonText}>↻ Reset</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          }
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
