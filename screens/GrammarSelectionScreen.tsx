import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Animated, ScrollView, StyleSheet } from 'react-native';

const WelshGrammarHub = () => {
  const [selectedLevel, setSelectedLevel] = useState('All');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const grammarSections = [
    {
      title: 'Verb Conjugation',
      welsh: 'Rhediad y Ferf',
      level: 'Beginner',
      description: 'Learn how Welsh verbs change form based on tense, person, and number.',
      topics: ['Present tense (Presennol)', 'Past tense (Gorffennol)', 'Future tense (Dyfodol)', 'Conditional (Amodol)', 'Imperative (Gorchmynnol)'],
      difficulty: 'Medium',
      estimatedTime: '2-3 hours',
      icon: '🔄',
      color: '#4CAF50',
      prerequisite: 'Basic Welsh vocabulary'
    },
    {
      title: 'Mutations',
      welsh: 'Treigladau',
      level: 'Beginner',
      description: 'Master the systematic changes to the beginning of Welsh words.',
      topics: ['Soft mutation (Treiglad meddal)', 'Aspirate mutation (Treiglad llaes)', 'Nasal mutation (Treiglad trwynol)', 'When to use each mutation', 'Common triggers'],
      difficulty: 'Hard',
      estimatedTime: '4-6 hours',
      icon: '🔤',
      color: '#F44336',
      prerequisite: 'Welsh alphabet knowledge'
    },
    {
      title: 'Pronouns',
      welsh: 'Rhagenwau',
      level: 'Beginner',
      description: 'Personal, possessive, and demonstrative pronouns in Welsh.',
      topics: ['Personal pronouns (Rhagenwau personol)', 'Possessive pronouns (Rhagenwau meddiannol)', 'Demonstrative pronouns (Rhagenwau dangosol)', 'Reflexive pronouns (Rhagenwau atblyg)'],
      difficulty: 'Easy',
      estimatedTime: '1-2 hours',
      icon: '👤',
      color: '#2196F3',
      prerequisite: 'None'
    },
    {
      title: 'Articles & Adjectives',
      welsh: 'Bannau ac Ansoddeiriau',
      level: 'Beginner',
      description: 'Definite articles, adjective placement, and agreement rules.',
      topics: ['Definite articles (Y, Yr, \'R)', 'Adjective placement', 'Comparative and superlative', 'Gender agreement', 'Adjective mutations'],
      difficulty: 'Medium',
      estimatedTime: '2-3 hours',
      icon: '📝',
      color: '#FF9800',
      prerequisite: 'Basic mutations'
    },
    {
      title: 'Prepositions',
      welsh: 'Arddodiaid',
      level: 'Intermediate',
      description: 'Welsh prepositions and their inflected forms.',
      topics: ['Simple prepositions', 'Inflected prepositions', 'Preposition + pronoun combinations', 'Prepositional phrases', 'Common idioms'],
      difficulty: 'Hard',
      estimatedTime: '3-4 hours',
      icon: '🔗',
      color: '#9C27B0',
      prerequisite: 'Pronouns and mutations'
    },
    {
      title: 'Word Order',
      welsh: 'Trefn Geiriau',
      level: 'Intermediate',
      description: 'Understanding Welsh sentence structure and word placement.',
      topics: ['Verb-Subject-Object order', 'Question formation', 'Negative sentences', 'Emphasis and fronting', 'Relative clauses'],
      difficulty: 'Medium',
      estimatedTime: '2-3 hours',
      icon: '📊',
      color: '#607D8B',
      prerequisite: 'Basic verb conjugation'
    },
    {
      title: 'Numbers & Time',
      welsh: 'Rhifau ac Amser',
      level: 'Beginner',
      description: 'Counting, ordinal numbers, dates, and time expressions.',
      topics: ['Cardinal numbers (1-100)', 'Ordinal numbers', 'Telling time', 'Days and months', 'Age expressions'],
      difficulty: 'Easy',
      estimatedTime: '1-2 hours',
      icon: '🔢',
      color: '#00BCD4',
      prerequisite: 'None'
    },
    {
      title: 'Conditional Sentences',
      welsh: 'Brawddegau Amodol',
      level: 'Advanced',
      description: 'If-then constructions and hypothetical situations.',
      topics: ['Real conditionals (Os + present)', 'Unreal conditionals (Pe + conditional)', 'Past conditionals', 'Unless constructions (Oni bai)', 'Mixed conditionals'],
      difficulty: 'Hard',
      estimatedTime: '3-4 hours',
      icon: '🤔',
      color: '#795548',
      prerequisite: 'Verb conjugation, subjunctive mood'
    },
    {
      title: 'Reported Speech',
      welsh: 'Araith Anuniongyrchol',
      level: 'Advanced',
      description: 'Converting direct speech to indirect speech in Welsh.',
      topics: ['Direct vs indirect speech', 'Tense changes in reporting', 'Reporting verbs (dweud, gofyn)', 'Time and place changes', 'Reported questions'],
      difficulty: 'Hard',
      estimatedTime: '2-3 hours',
      icon: '💬',
      color: '#E91E63',
      prerequisite: 'Advanced verb forms'
    },
    {
      title: 'Subjunctive Mood',
      welsh: 'Y Modd Dibynnol',
      level: 'Advanced',
      description: 'Expressing doubt, emotion, and hypothetical situations.',
      topics: ['Present subjunctive', 'Imperfect subjunctive', 'After expressions of doubt', 'After emotional expressions', 'In formal/literary Welsh'],
      difficulty: 'Very Hard',
      estimatedTime: '4-5 hours',
      icon: '🎭',
      color: '#673AB7',
      prerequisite: 'All verb tenses, conditional sentences'
    },
    {
      title: 'Relative Clauses',
      welsh: 'Cymalau Perthynol',
      level: 'Intermediate',
      description: 'Connecting clauses with relative pronouns and particles.',
      topics: ['A, y, yr as relative particles', 'Direct and indirect relatives', 'Relative clauses with prepositions', 'Free relatives', 'Cleft sentences'],
      difficulty: 'Hard',
      estimatedTime: '3-4 hours',
      icon: '🔄',
      color: '#FF5722',
      prerequisite: 'Word order, mutations'
    },
    {
      title: 'Participles & Gerunds',
      welsh: 'Rhangymeriadau a Berfenwau',
      level: 'Advanced',
      description: 'Non-finite verb forms and their uses.',
      topics: ['Present participles', 'Past participles', 'Verbal nouns (berfenwau)', 'Participial phrases', 'Gerund constructions'],
      difficulty: 'Hard',
      estimatedTime: '3-4 hours',
      icon: '⚙️',
      color: '#009688',
      prerequisite: 'Verb conjugation, adjectives'
    }
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredSections = selectedLevel === 'All' 
    ? grammarSections 
    : grammarSections.filter(section => section.level === selectedLevel);

  interface GrammarSection {
    title: string;
    welsh: string;
    level: string;
    description: string;
    topics: string[];
    difficulty: string;
    estimatedTime: string;
    icon: string;
    color: string;
    prerequisite: string;
  }

  const animateFilter = (level: string): void => {
    setSelectedLevel(level);
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

  const getDifficultyColor = (difficulty: string): string => {
    switch(difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      case 'Very Hard': return '#9C27B0';
      default: return '#9E9E9E';
    }
  };

  const getLevelEmoji = (level: string): string => {
    switch(level) {
      case 'All': return '📚';
      case 'Beginner': return '🌱';
      case 'Intermediate': return '🌿';
      case 'Advanced': return '🌳';
      default: return '📚';
    }
  };

  const renderGrammarSection = ({ item, index }: { item: GrammarSection; index: number }) => {
    return (
      <TouchableOpacity 
        style={[
          styles.grammarCard,
          { backgroundColor: '#fff' }
        ]}
        onPress={() => {
          // Navigate to specific grammar section
          console.log(`Navigate to ${item.title}`);
        }}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
            <Text style={styles.sectionIcon}>{item.icon}</Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>{item.level}</Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          <Text style={styles.welshTitle}>{item.welsh}</Text>
          <Text style={styles.sectionDescription}>{item.description}</Text>

          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>⏱️ Duration:</Text>
              <Text style={styles.metaValue}>{item.estimatedTime}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>📋 Prerequisite:</Text>
              <Text style={styles.metaValue}>{item.prerequisite}</Text>
            </View>
          </View>

          <View style={styles.topicsContainer}>
            <Text style={styles.topicsLabel}>📖 Topics covered:</Text>
            {item.topics.map((topic, idx) => (
              <Text key={idx} style={styles.topicItem}>• {topic}</Text>
            ))}
          </View>

          <View style={styles.cardFooter}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
              <Text style={styles.difficultyText}>{item.difficulty}</Text>
            </View>
            <TouchableOpacity style={[styles.startButton, { backgroundColor: item.color }]}>
              <Text style={styles.startButtonText}>Start Learning</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { position: 'absolute', width: '100%', zIndex: 1 }]}>
        <Text style={styles.title}>Welsh Grammar Hub</Text>
        <Text style={styles.subtitle}>Canolfan Gramadeg Cymraeg</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{filteredSections.length}</Text>
            <Text style={styles.statLabel}>Sections</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{grammarSections.reduce((acc, section) => acc + section.topics.length, 0)}</Text>
            <Text style={styles.statLabel}>Topics</Text>
          </View>
        </View>
      </View>

      <Animated.View style={[styles.listContainer, { opacity: fadeAnim }]}>
        <FlatList
          data={filteredSections}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={renderGrammarSection}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.listContent, { paddingTop: 180 }]}
          ListHeaderComponent={
            <View>
              <View style={styles.filterContainer}>
                <Text style={styles.filterLabel}>Learning Level:</Text>
                <ScrollView 
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.levelScroll}
                >
                  {levels.map((level) => (
                    <TouchableOpacity
                      key={level}
                      style={[
                        styles.levelButton,
                        selectedLevel === level && styles.activeLevelButton
                      ]}
                      onPress={() => animateFilter(level)}
                    >
                      <Text style={styles.levelEmoji}>{getLevelEmoji(level)}</Text>
                      <Text style={[
                        styles.levelButtonText,
                        selectedLevel === level && styles.activeLevelButtonText
                      ]}>
                        {level}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.instructionContainer}>
                <Text style={styles.instructionText}>
                  🎯 Choose a grammar topic to start your Welsh learning journey
                </Text>
                <Text style={styles.tipText}>
                  💡 Tip: Start with "Pronouns" if you're a complete beginner
                </Text>
              </View>
            </View>
          }
        />
      </Animated.View>
    </View>
  );
};

export default WelshGrammarHub;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
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
    color: '#d32f2f',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#d32f2f',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    textTransform: 'uppercase',
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
  levelScroll: {
    paddingVertical: 8,
    flexDirection: 'row',
    gap: 8,
  },
  levelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activeLevelButton: {
    backgroundColor: '#d32f2f',
    borderColor: '#d32f2f',
  },
  levelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activeLevelButtonText: {
    color: '#fff',
  },
  levelEmoji: {
    fontSize: 16,
    marginRight: 6,
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
    marginBottom: 8,
  },
  tipText: {
    fontSize: 12,
    color: '#FF9800',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  grammarCard: {
    padding: 20,
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionIcon: {
    fontSize: 28,
  },
  levelBadge: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
    textTransform: 'uppercase',
  },
  cardContent: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  welshTitle: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#d32f2f',
    fontWeight: '500',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 15,
    color: '#495057',
    lineHeight: 22,
  },
  metaInfo: {
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6c757d',
    minWidth: 100,
  },
  metaValue: {
    fontSize: 13,
    color: '#495057',
    flex: 1,
  },
  topicsContainer: {
    marginTop: 8,
  },
  topicsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  topicItem: {
    fontSize: 13,
    color: '#6c757d',
    marginBottom: 4,
    marginLeft: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'uppercase',
  },
  startButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});