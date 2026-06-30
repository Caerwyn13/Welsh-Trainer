import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

interface VerbExample {
  english: string;
  welsh: string;
  pronunciation?: string;
}

interface TenseData {
  id: string;
  name: string;
  welshName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  formation: string;
  examples: VerbExample[];
  funFact: string;
  category: 'present' | 'past' | 'future' | 'conditional' | 'imperative';
}

const WelshVerbTenses: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedTense, setExpandedTense] = useState<string | null>(null);

  const tenses: TenseData[] = [
    // PRESENT TENSES
    {
      id: 'present-simple',
      name: 'Present Simple',
      welshName: 'Presennol Syml',
      difficulty: 'Easy',
      description: 'Used for actions happening now or general truths.',
      formation: 'Use "mae" (is/are) + subject + "yn" + verb-noun',
      examples: [
        { english: 'I am walking', welsh: 'Dw i\'n cerdded', pronunciation: 'doo een KER-theth' },
        { english: 'She is reading', welsh: 'Mae hi\'n darllen', pronunciation: 'my heen DAR-hlen' },
        { english: 'We are eating', welsh: 'Dyn ni\'n bwyta', pronunciation: 'din neen BOO-ih-ta' }
      ],
      funFact: 'Welsh doesn\'t distinguish between "I walk" and "I am walking" - both use the same form!',
      category: 'present'
    },
    {
      id: 'present-habitual',
      name: 'Present Habitual',
      welshName: 'Presennol Arferiadol',
      difficulty: 'Medium',
      description: 'Used for repeated actions or habits.',
      formation: 'Use "bydda i" (I will be) + "yn" + verb-noun',
      examples: [
        { english: 'I usually go', welsh: 'Bydda i\'n mynd', pronunciation: 'BETH-a een mind' },
        { english: 'He often visits', welsh: 'Bydd e\'n ymweld', pronunciation: 'beeth een um-WELD' },
        { english: 'They always help', welsh: 'Byddan nhw\'n helpu', pronunciation: 'BETH-an hoo hen HEL-pi' }
      ],
      funFact: 'This tense is unique to Welsh and doesn\'t have a direct English equivalent!',
      category: 'present'
    },

    // PAST TENSES
    {
      id: 'past-simple',
      name: 'Past Simple',
      welshName: 'Gorffennol Syml',
      difficulty: 'Easy',
      description: 'Used for completed actions in the past.',
      formation: 'Use past tense forms of "bod" (to be) + "wedi" + verb-noun',
      examples: [
        { english: 'I went', welsh: 'Es i', pronunciation: 'ess ee' },
        { english: 'She saw', welsh: 'Gwelodd hi', pronunciation: 'GWEL-oth hee' },
        { english: 'We had', welsh: 'Roedd gyda ni', pronunciation: 'roith GUH-da nee' }
      ],
      funFact: 'Many Welsh verbs have irregular past tense forms that must be memorized.',
      category: 'past'
    },
    {
      id: 'past-continuous',
      name: 'Past Continuous',
      welshName: 'Gorffennol Parhaus',
      difficulty: 'Medium',
      description: 'Used for ongoing actions in the past.',
      formation: 'Use "roeddwn i" (I was) + "yn" + verb-noun',
      examples: [
        { english: 'I was singing', welsh: 'Roeddwn i\'n canu', pronunciation: 'ROITH-oon een KA-ni' },
        { english: 'They were playing', welsh: 'Roedden nhw\'n chwarae', pronunciation: 'ROITH-en hoon KHWA-ry' },
        { english: 'We were learning', welsh: 'Roedden ni\'n dysgu', pronunciation: 'ROITH-en neen DUS-gi' }
      ],
      funFact: 'The continuous aspect is very important in Welsh - it changes the entire meaning!',
      category: 'past'
    },
    {
      id: 'pluperfect',
      name: 'Pluperfect',
      welshName: 'Gorberffaith',
      difficulty: 'Hard',
      description: 'Used for actions completed before another past action.',
      formation: 'Use "roeddwn i wedi" (I had) + verb-noun',
      examples: [
        { english: 'I had finished', welsh: 'Roeddwn i wedi gorffen', pronunciation: 'ROITH-oon ee WEH-di GOR-fen' },
        { english: 'She had left', welsh: 'Roedd hi wedi gadael', pronunciation: 'roith hee WEH-di ga-DAH-el' },
        { english: 'They had arrived', welsh: 'Roedden nhw wedi cyrraedd', pronunciation: 'ROITH-en hoo WEH-di kur-RYTH' }
      ],
      funFact: 'This tense is formed by combining the past continuous of "bod" with "wedi".',
      category: 'past'
    },

    // FUTURE TENSES
    {
      id: 'future-simple',
      name: 'Future Simple',
      welshName: 'Dyfodol Syml',
      difficulty: 'Easy',
      description: 'Used for future actions and intentions.',
      formation: 'Use "bydda i" (I will be) + "yn" + verb-noun',
      examples: [
        { english: 'I will go', welsh: 'Bydda i\'n mynd', pronunciation: 'BETH-a een mind' },
        { english: 'She will come', welsh: 'Bydd hi\'n dod', pronunciation: 'beeth heen dohd' },
        { english: 'We will see', welsh: 'Byddwn ni\'n gweld', pronunciation: 'BETH-oon neen gweld' }
      ],
      funFact: 'Welsh future tense can also express habitual actions in the present!',
      category: 'future'
    },
    {
      id: 'future-perfect',
      name: 'Future Perfect',
      welshName: 'Dyfodol Perffaith',
      difficulty: 'Hard',
      description: 'Used for actions that will be completed by a specific future time.',
      formation: 'Use future tense of "bod" + "wedi" + verb-noun',
      examples: [
        { english: 'I will have finished', welsh: 'Bydda i wedi gorffen', pronunciation: 'BETH-a ee WEH-di GOR-fen' },
        { english: 'She will have gone', welsh: 'Bydd hi wedi mynd', pronunciation: 'beeth hee WEH-di mind' },
        { english: 'They will have learned', welsh: 'Byddan nhw wedi dysgu', pronunciation: 'BETH-an hoo WEH-di DUS-gi' }
      ],
      funFact: 'This tense is less commonly used in spoken Welsh than in written Welsh.',
      category: 'future'
    },

    // CONDITIONAL
    {
      id: 'conditional-simple',
      name: 'Conditional',
      welshName: 'Amodol',
      difficulty: 'Medium',
      description: 'Used for hypothetical situations and polite requests.',
      formation: 'Use "byddwn i" (I would be) + "yn" + verb-noun',
      examples: [
        { english: 'I would go', welsh: 'Byddwn i\'n mynd', pronunciation: 'BETH-oon een mind' },
        { english: 'She would like', welsh: 'Byddai hi\'n hoffi', pronunciation: 'BETH-y heen HOF-fi' },
        { english: 'We would help', welsh: 'Bydden ni\'n helpu', pronunciation: 'BETH-en neen HEL-pi' }
      ],
      funFact: 'The conditional is essential for polite speech - "Hoffwn i" (I would like) is much more polite than "Dw i eisiau" (I want).',
      category: 'conditional'
    },
    {
      id: 'conditional-perfect',
      name: 'Conditional Perfect',
      welshName: 'Amodol Perffaith',
      difficulty: 'Hard',
      description: 'Used for hypothetical past actions.',
      formation: 'Use conditional of "bod" + "wedi" + verb-noun',
      examples: [
        { english: 'I would have gone', welsh: 'Byddwn i wedi mynd', pronunciation: 'BETH-oon ee WEH-di mind' },
        { english: 'She would have known', welsh: 'Byddai hi wedi gwybod', pronunciation: 'BETH-y hee WEH-di GWUH-bod' },
        { english: 'They would have seen', welsh: 'Bydden nhw wedi gweld', pronunciation: 'BETH-en hoo WEH-di gweld' }
      ],
      funFact: 'This tense is crucial for expressing regret or unrealized possibilities.',
      category: 'conditional'
    },

    // IMPERATIVE
    {
      id: 'imperative-informal',
      name: 'Imperative (Informal)',
      welshName: 'Gorchmynnol Anffurfiol',
      difficulty: 'Easy',
      description: 'Used for commands and requests to friends and family.',
      formation: 'Use the verb stem (often the verb-noun)',
      examples: [
        { english: 'Go!', welsh: 'Dos!', pronunciation: 'doss' },
        { english: 'Come here!', welsh: 'Dere yma!', pronunciation: 'DEH-reh UH-ma' },
        { english: 'Listen!', welsh: 'Gwranda!', pronunciation: 'goo-RAN-da' }
      ],
      funFact: 'Welsh imperatives often have different forms for different persons - "Dos!" (you go) vs "Ewch!" (you all go).',
      category: 'imperative'
    },
    {
      id: 'imperative-formal',
      name: 'Imperative (Formal)',
      welshName: 'Gorchmynnol Ffurfiol',
      difficulty: 'Medium',
      description: 'Used for polite commands and formal requests.',
      formation: 'Use the plural imperative forms',
      examples: [
        { english: 'Please go', welsh: 'Ewch, os gwelwch yn dda', pronunciation: 'EH-okh oss GWEL-ookh un tha' },
        { english: 'Please come', welsh: 'Dewch yma', pronunciation: 'DEH-ookh UH-ma' },
        { english: 'Please sit', welsh: 'Eisteddwch', pronunciation: 'eye-STETH-ookh' }
      ],
      funFact: 'Formal imperatives are the same as the second person plural forms.',
      category: 'imperative'
    }
  ];

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const categories = [
    { key: 'All', label: 'All Tenses', emoji: '📚' },
    { key: 'present', label: 'Present', emoji: '⏰' },
    { key: 'past', label: 'Past', emoji: '⏪' },
    { key: 'future', label: 'Future', emoji: '⏩' },
    { key: 'conditional', label: 'Conditional', emoji: '🤔' },
    { key: 'imperative', label: 'Imperative', emoji: '❗' }
  ];

  const filteredTenses = tenses.filter(tense => {
    const difficultyMatch = selectedDifficulty === 'All' || tense.difficulty === selectedDifficulty;
    const categoryMatch = selectedCategory === 'All' || tense.category === selectedCategory;
    return difficultyMatch && categoryMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      default: return '#666';
    }
  };

  const toggleExpanded = (tenseId: string) => {
    setExpandedTense(expandedTense === tenseId ? null : tenseId);
  };

  const renderDifficultyButtons = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
      {difficulties.map(difficulty => (
        <TouchableOpacity
          key={difficulty}
          style={[
            styles.categoryButton,
            selectedDifficulty === difficulty && styles.activeCategoryButton
          ]}
          onPress={() => setSelectedDifficulty(difficulty)}
        >
          <Text style={[
            styles.categoryButtonText,
            selectedDifficulty === difficulty && styles.activeCategoryButtonText
          ]}>
            {difficulty}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderCategoryButtons = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
      {categories.map(category => (
        <TouchableOpacity
          key={category.key}
          style={[
            styles.categoryButton,
            selectedCategory === category.key && styles.activeCategoryButton
          ]}
          onPress={() => setSelectedCategory(category.key)}
        >
          <Text style={styles.categoryEmoji}>{category.emoji}</Text>
          <Text style={[
            styles.categoryButtonText,
            selectedCategory === category.key && styles.activeCategoryButtonText
          ]}>
            {category.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderTenseItem = (tense: TenseData) => {
    const isExpanded = expandedTense === tense.id;
    
    return (
      <TouchableOpacity
        key={tense.id}
        style={styles.tenseItem}
        onPress={() => toggleExpanded(tense.id)}
        activeOpacity={0.7}
      >
        <View style={styles.tenseContent}>
          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.tenseTitle}>{tense.name}</Text>
              <Text style={styles.expandIcon}>{isExpanded ? '−' : '+'}</Text>
            </View>
            <Text style={styles.welshTitle}>{tense.welshName}</Text>
            <Text style={styles.description}>{tense.description}</Text>
            
            <View style={styles.tagRow}>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryTagText}>
                  {categories.find(c => c.key === tense.category)?.emoji} {categories.find(c => c.key === tense.category)?.label}
                </Text>
              </View>
              <View style={[
                styles.importanceBadge,
                { backgroundColor: getDifficultyColor(tense.difficulty) }
              ]}>
                <Text style={styles.importanceText}>{tense.difficulty}</Text>
              </View>
            </View>
          </View>
        </View>

        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.formationSection}>
              <Text style={styles.detailsLabel}>Formation</Text>
              <Text style={styles.details}>{tense.formation}</Text>
            </View>

            <View style={styles.examplesSection}>
              <Text style={styles.detailsLabel}>Examples</Text>
              {tense.examples.map((example, index) => (
                <View key={index} style={styles.example}>
                  <View style={styles.exampleRow}>
                    <Text style={styles.englishText}>{example.english}</Text>
                    <Text style={styles.welshText}>{example.welsh}</Text>
                  </View>
                  {example.pronunciation && (
                    <Text style={styles.pronunciationText}>/{example.pronunciation}/</Text>
                  )}
                </View>
              ))}
            </View>

            <View style={styles.funFactSection}>
              <Text style={styles.funFactLabel}>💡 Fun Fact</Text>
              <Text style={styles.funFact}>{tense.funFact}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent}>
            <View style={styles.header}>
            <Text style={styles.title}>Welsh Verb Tenses</Text>
            <Text style={styles.subtitle}>Amserau Berfau Cymraeg</Text>
            <View style={styles.countBadge}>
                <Text style={styles.countText}>{filteredTenses.length} tenses</Text>
            </View>
            </View>

            <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>
                Learn Welsh verb tenses from basic to advanced. Tap any tense to explore examples and formation rules.
            </Text>
            </View>

            <View style={styles.filterContainer}>
            <Text style={styles.filterLabel}>Difficulty Level</Text>
            {renderDifficultyButtons()}

            <Text style={styles.filterLabel}>Tense Category</Text>
            {renderCategoryButtons()}
            </View>

            {filteredTenses.map(renderTenseItem)}
        </ScrollView>
        </SafeAreaView>

  );
};

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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#007a33',
    marginBottom: 12,
    textAlign: 'center',
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
  categoryScroll: {
    paddingVertical: 8,
    marginBottom: 16,
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
    marginRight: 8,
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
  tenseItem: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 4,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    backgroundColor: '#fff',
  },
  tenseContent: {
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
  tenseTitle: {
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
  tagRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  categoryTag: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  categoryTagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#007a33',
  },
  importanceBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  importanceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  formationSection: {
    marginBottom: 16,
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
  },
  examplesSection: {
    marginBottom: 16,
  },
  example: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  exampleRow: {
    flexDirection: 'column',
    gap: 4,
  },
  englishText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  welshText: {
    fontSize: 16,
    color: '#007a33',
    fontWeight: '600',
  },
  pronunciationText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  funFactSection: {
    marginTop: 8,
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
});

export default WelshVerbTenses;