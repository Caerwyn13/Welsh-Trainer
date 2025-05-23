import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type LearnCategoryRouteProp = RouteProp<RootStackParamList, 'LearnCategory'>;

export const LearnCategory: React.FC = () => {
    const route = useRoute<LearnCategoryRouteProp>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { category } = route.params;

    React.useEffect(() => {
        // Here you can add logic to load the appropriate content based on category
        switch (category) {
            case 'numbers':
                navigation.navigate('Numbers');
                break;
            case 'colours':
                //TODO: Navigate to colours learning content
                break;
            case 'greetings':
                //TODO: Navigate to greetings learning content
                break;
            case 'commonPhrases':
                //TODO: Navigate to common phrases learning content
                break;
            case 'generalVocabulary':
                //TODO: Navigate to general vocabulary learning content
            default:
                // Handle unknown category or navigate back
                navigation.goBack();
        }
    }, [category, navigation]);

    return (
        <View style={styles.container}>
            {/*TODO: add a loading indicator or temporary content here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LearnCategory;