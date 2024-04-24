import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {

    const name = "Name";

    const goToLoginScreen = () => {
        navigation.navigate('LoginScreen');
    };

    const goToCreateAccountScreen = () => {
        navigation.navigate('CreateAccountScreen');
    };

    const goToRVSiteListScreen = () => {
        navigation.navigate('RVSiteListScreen');
    };

    return (
        <View>
            <Text>Welcome to RV CoPilot {name} </Text>
            <Button title="Go to RV Site List" onPress={goToRVSiteListScreen} />
        </View>
    );
};

export default HomeScreen;