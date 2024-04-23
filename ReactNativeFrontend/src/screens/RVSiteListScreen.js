import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const RVSiteListScreen = ({ navigation }) => {
  const goToLoginScreen = () => {
    navigation.navigate('LoginScreen');
  };

  const goToCreateAccountScreen = () => {
    navigation.navigate('CreateAccountScreen');
  };

  const goToRVSiteScreen = () => {
    navigation.navigate('RVSiteScreen');
  }

  const goToHomeScreen = () => {
    navigation.navigate('HomeScreen');
  }

  return (
    <View>
      <Text>Welcome to RV CoPilot RV Site List Screen</Text>
      <Button title="See a RV Site" onPress={goToRVSiteScreen}/>
      <Button title="Return Home" onPress={goToHomeScreen}/>
    </View>
  );
};

export default RVSiteListScreen;