import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {

    const name = "Name";

    const goToAuthScreen = () => {
        navigation.navigate('AuthScreen');
    };

    const goToRVSiteListScreen = () => {
        navigation.navigate('RVSiteListScreen');
    };

    return (
        <View>
            <Text>Welcome to RV CoPilot {name} </Text>
            <Button title="Go to RV Site List" onPress={goToRVSiteListScreen} />
            <Button title="Login / Create account" onPress={goToAuthScreen} />
        </View>
    );
};

export default HomeScreen;