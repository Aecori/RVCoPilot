import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import basicStyle from '../../styles/basicStyle.js';

const MainScreen = () => {
    
    const navigation = useNavigation();
    const name = "Name";

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Welcome to RV CoPilot {name} </Text>
            <View style={basicStyle.container}>
                <TouchableOpacity style={basicStyle.button} onPress={goToRVSiteListScreen} >
                    <Text>Go to RV Site List</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    );
};

export default MainScreen;