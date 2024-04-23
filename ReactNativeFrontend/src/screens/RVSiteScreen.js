import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function RVSiteScreen ({navigation}) {

    const goToRVSiteListScreen = () => {
      navigation.navigate('RVSiteListScreen');
    };

    const goToHomeScreen = () => {
      navigation.navigate('HomeScreen');
    }

    const goToEditRVSiteScreen = () => {
      navigation.navigate('EditRVSiteScreen');
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Text>This is an RV Site</Text>
        <Button title="Return Home" onPress={goToHomeScreen}/>
        <Button title="Go to RV Site List" onPress={goToRVSiteListScreen} />
        <Button title="Go to Edit RV Site Screen" onPress={goToEditRVSiteScreen} />
        
      </View>
    );
  }

  export default RVSiteScreen;