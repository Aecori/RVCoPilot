import React from 'react';

import {createStackNavigator } from '@react-navigation/stack';
import {Text, View, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen.js';
import CreateAccountScreen from '../screens/CreateAccountScreen.js';
import AuthScreen from '../screens/AuthScreen.js';


const AuthNavigator= ({navigation}) => {

    const AuthStack = createStackNavigator();

    
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="AuthScreen" component={AuthScreen}/>
            <AuthStack.Screen name="LoginScreen" component={LoginScreen}/>
            <AuthStack.Screen name="CreateAccountScreen" component={CreateAccountScreen}/>
        </AuthStack.Navigator>
    );
}

export default AuthNavigator;