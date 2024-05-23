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
        <View style={styles.screenview}>
            <View>
                <Text style= {styles.title}>Welcome to RV CoPilot</Text>
                <MyButton backgroundColor='white' title="Go to RV Site List" onPress={goToRVSiteListScreen} />
                <MyButton title="Login" onPress={goToLoginScreen} />
                <MyButton title="Create Account" onPress={goToCreateAccountScreen} />
            </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    screenview: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'white'
      },
      title: {
        fontSize: 28,
        padding: 10,
        marginVertical: 25,
        color: '#9A7B5B',
        textAlign: 'center'
      },
})

export default HomeScreen;