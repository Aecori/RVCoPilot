import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import LoginScreen from './LoginScreen.js';
import CreateAccountScreen from './CreateAccountScreen.js';


// Screen to "Authorize" User - From here can either create account or Login
const AuthScreen = ({ navigation }) => {
  const goToLoginScreen = () => {
    navigation.navigate('LoginScreen');
  };

  const goToCreateAccountScreen = () => {
    navigation.navigate('CreateAccountScreen');
  };

  return (
    <View>
      <Text>Welcome to RV CoPilot</Text>
      <Button title="Login" onPress={goToLoginScreen}/>
      <Button title="Create Account" onPress={goToCreateAccountScreen} />
    </View>
  );
};

export default AuthScreen;
