import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import MyButton from '../components/button1';

const HomeScreen = ({ navigation }) => {

    const goToAuthScreen = () => {
        navigation.navigate('AuthScreen');
    };

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
        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}>
        <View>
            <Text style= {{fontSize: 28, textAlign: 'center'}}>Welcome to RV CoPilot</Text>
            <MyButton title="Go to RV Site List" onPress={goToRVSiteListScreen} />
            <MyButton title="Login" onPress={goToLoginScreen} />
            <MyButton title="Create Account" onPress={goToCreateAccountScreen} />
        </View>
        </ScrollView>
    );
};

export default HomeScreen;