import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type LearnCategoryRouteProp = RouteProp<RootStackParamList, 'LearnCategory'>;

export const LearnCategoryScreen: React.FC = () => {
    const route = useRoute<LearnCategoryRouteProp>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { category } = route.params;

    React.useEffect(() => {
        switch (category) {
            case 'numbers':
                navigation.navigate('Numbers');
                break;
            case 'colours':
                // TODO: Navigate to colours learning content
                // navigation.replace('Colours');
                break;
            case 'greetings':
                // TODO: Navigate to greetings learning content
                // navigation.replace('Greetings');
                break;
            case 'commonPhrases':
                // TODO: Navigate to common phrases learning content
                // navigation.replace('CommonPhrases');
                break;
            case 'generalVocabulary':
                // TODO: Navigate to general vocabulary learning content
                // navigation.replace('GeneralVocabulary');
                break;
            default:
                // Handle unknown category by going back to HomeScreen
                navigation.goBack();
        }
    }, [category, navigation]);

    return (
        <View style={styles.container}>
            {/* TODO: add a loading indicator or temporary content here */}
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

export default LearnCategoryScreen;