import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface Greeting {
    english: string;
    welsh: string;
}

const greetings: Greeting[] = [
  { english: 'Hello', welsh: 'Shwmae' },
  { english: 'Hi', welsh: 'Haia' },
  { english: 'Good morning', welsh: 'Bore da' },
  { english: 'Good afternoon', welsh: 'Prynhawn da' },
  { english: 'Good evening', welsh: 'Noswaith dda' },
  { english: 'Good night', welsh: 'Nos da' },
  { english: 'How are you?', welsh: 'Sut wyt ti?' },
  { english: 'I’m fine, thanks', welsh: 'Da iawn, diolch' },
  { english: 'Nice to meet you', welsh: 'Braf cwrdd â chi' },
  { english: 'Welcome', welsh: 'Croeso' },
  { english: 'Goodbye', welsh: 'Hwyl fawr' },
  { english: 'See you later', welsh: 'Wela i di wedyn' },
  { english: 'Take care', welsh: 'Cymer ofal' },
  { english: 'What’s your name?', welsh: 'Beth yw dy enw di?' },
  { english: 'My name is...', welsh: 'Fy enw i yw...' }
];


const WelshGreetings = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Welsh Greetings</Text>
            {greetings.map((greeting, index) => (
                <View key={index} style={styles.greetingItem}>
                    <Text style={styles.english}>{greeting.english}</Text>
                    <Text style={styles.welsh}>{greeting.welsh}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 60,
        paddingBottom: 80,
        backgroundColor: '#FAFAFA',
        minHeight: '100%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#004D40',
        textAlign: 'center',
    },
    greetingItem: {
        backgroundColor: '#E0F2F1',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
    },
    english: {
        fontSize: 20,
        color: '#004D40',
        marginBottom: 4,
    },
    welsh: {
        fontSize: 18,
        color: '#00695C',
        fontWeight: 'bold',
    },
});

export default WelshGreetings;
