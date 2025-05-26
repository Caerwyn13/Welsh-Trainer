import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from "react-native";

interface Greeting {
  english: string;
  welsh: string;
  category: string;
}

const greetings: Greeting[] = [
  // Basic Greetings
  { english: "Hello", welsh: "Shwmae", category: "Basic" },
  { english: "Hi", welsh: "Haia", category: "Basic" },
  { english: "Good morning", welsh: "Bore da", category: "Time-based" },
  { english: "Good afternoon", welsh: "Prynhawn da", category: "Time-based" },
  { english: "Good evening", welsh: "Noswaith dda", category: "Time-based" },
  { english: "Good night", welsh: "Nos da", category: "Time-based" },
  
  // Questions & Responses
  { english: "How are you?", welsh: "Sut wyt ti?", category: "Questions" },
  { english: "How are you? (formal)", welsh: "Sut ydych chi?", category: "Questions" },
  { english: "I'm fine, thanks", welsh: "Da iawn, diolch", category: "Responses" },
  { english: "Very well, thank you", welsh: "Da iawn, diolch yn fawr", category: "Responses" },
  { english: "Not bad", welsh: "Ddim yn ddrwg", category: "Responses" },
  { english: "Could be better", welsh: "Gallai fod yn well", category: "Responses" },
  
  // Introductions
  { english: "Nice to meet you", welsh: "Braf cwrdd â chi", category: "Introductions" },
  { english: "What's your name?", welsh: "Beth yw dy enw di?", category: "Introductions" },
  { english: "What's your name? (formal)", welsh: "Beth yw eich enw chi?", category: "Introductions" },
  { english: "My name is...", welsh: "Fy enw i yw...", category: "Introductions" },
  { english: "Where are you from?", welsh: "O ble rwyt ti'n dod?", category: "Introductions" },
  { english: "I'm from...", welsh: "Rwy'n dod o...", category: "Introductions" },
  
  // Welcoming & Farewells
  { english: "Welcome", welsh: "Croeso", category: "Welcome" },
  { english: "Welcome to Wales", welsh: "Croeso i Gymru", category: "Welcome" },
  { english: "Goodbye", welsh: "Hwyl fawr", category: "Farewells" },
  { english: "See you later", welsh: "Wela i di wedyn", category: "Farewells" },
  { english: "See you soon", welsh: "Wela i di'n fuan", category: "Farewells" },
  { english: "See you tomorrow", welsh: "Wela i di yfory", category: "Farewells" },
  { english: "Take care", welsh: "Cymer ofal", category: "Farewells" },
  { english: "Bye for now", welsh: "Hwyl am nawr", category: "Farewells" },
  { english: "Until next time", welsh: "Tan y tro nesaf", category: "Farewells" },
  
  // Politeness
  { english: "Please", welsh: "Os gwelwch yn dda", category: "Politeness" },
  { english: "Thank you", welsh: "Diolch", category: "Politeness" },
  { english: "Thank you very much", welsh: "Diolch yn fawr", category: "Politeness" },
  { english: "You're welcome", welsh: "Croeso", category: "Politeness" },
  { english: "Excuse me", welsh: "Esgusodwch fi", category: "Politeness" },
  { english: "Sorry", welsh: "Mae'n ddrwg gen i", category: "Politeness" },
  { english: "No problem", welsh: "Dim problem", category: "Politeness" },
  
  // Additional Common Phrases
  { english: "Hows' it going?", welsh: "Sut mae pethau'n mynd?", category: "Casual" },
  { english: "What's up?", welsh: "Beth sy'n digwydd?", category: "Casual" },
  { english: "Long time no see", welsh: "Heb dy weld ers amser hir", category: "Casual" },
  { english: "Have a good day", welsh: "Cael diwrnod da", category: "Well-wishes" },
  { english: "Have a nice weekend", welsh: "Cael penwythnos braf", category: "Well-wishes" },
  { english: "Good luck", welsh: "Pob lwc", category: "Well-wishes" },
  { english: "Cheers", welsh: "Iechyd da", category: "Casual" },
];

const categories = ["All", "Basic", "Time-based", "Questions", "Responses", "Introductions", "Welcome", "Farewells", "Politeness", "Casual", "Well-wishes"];

const WelshGreetings = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [fadeAnim] = useState(new Animated.Value(1));

  const filteredGreetings = selectedCategory === "All" 
    ? greetings 
    : greetings.filter(greeting => greeting.category === selectedCategory);

  const animateFilter = (category: string) => {
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
    
    setTimeout(() => setSelectedCategory(category), 150);
  };

  const getCategoryEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
      "All": "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
      "Basic": "👋",
      "Time-based": "🕐",
      "Questions": "❓",
      "Responses": "💬",
      "Introductions": "🤝",
      "Welcome": "🎉",
      "Farewells": "👋",
      "Politeness": "🙏",
      "Casual": "😊",
      "Well-wishes": "✨"
    };
    return emojiMap[category] || "💬";
  };

  return (
    <View style={styles.container}>
        <View style={[styles.header, { position: 'absolute', width: '100%', zIndex: 1 }]}>
        <Text style={styles.title}>Welsh Greetings</Text>
        <Text style={styles.subtitle}>Cyfarchion Cymraeg</Text>
        <View style={styles.countBadge}>
            <Text style={styles.countText}>
            {filteredGreetings.length} {filteredGreetings.length === 1 ? "phrase" : "phrases"}
            </Text>
        </View>
        </View>

        <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: 180 }]} // Add padding to account for header height
        >
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

        <Animated.View style={[styles.listContainer, { opacity: fadeAnim }]}>
            {filteredGreetings.map((greeting, index) => (
            <View key={`${greeting.english}-${index}`} style={[
                styles.greetingItem,
                { backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa" }
            ]}>
                <View style={styles.greetingContent}>
                <View style={styles.categoryTag}>
                    <Text style={styles.categoryTagText}>{greeting.category}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.english}>{greeting.english}</Text>
                    <Text style={styles.welsh}>{greeting.welsh}</Text>
                </View>
                <View style={styles.indexBadge}>
                    <Text style={styles.indexText}>{index + 1}</Text>
                </View>
                </View>
            </View>
            ))}
        </Animated.View>
        </ScrollView>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#004D40",
    marginBottom: 12,
  },
  countBadge: {
    backgroundColor: "#e8f5e8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  countText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#004D40",
  },
  filterContainer: {
    paddingVertical: 20,
    paddingLeft: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 12,
  },
  categoryScroll: {
    paddingRight: 24,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeCategoryButton: {
    backgroundColor: "#004D40",
    borderColor: "#004D40",
  },
  categoryEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  activeCategoryButtonText: {
    color: "#fff",
  },
  listContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  greetingItem: {
    borderRadius: 12,
    marginVertical: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  greetingContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  categoryTag: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 12,
  },
  categoryTagText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#1976d2",
    textTransform: "uppercase",
  },
  textContainer: {
    flex: 1,
  },
  english: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  welsh: {
    fontSize: 16,
    color: "#004D40",
    fontWeight: "500",
    fontStyle: "italic",
  },
  indexBadge: {
    backgroundColor: "#e9ecef",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 28,
    alignItems: "center",
  },
  indexText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6c757d",
  },
});

export default WelshGreetings;