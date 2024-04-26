import React from 'react';

import { HOME, RVSITE_DETAILS, RVSITE_LIST, EDIT_RVSITE_DETAILS } from '../constants/Constants.js';

import {createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen.js';
import RVSiteListScreen from '../screens/RVSiteListScreen.js';
import RVSiteScreen from '../screens/RVSiteScreen.js';
import EditRVSiteScreen from '../screens/EditRVSiteScreen.js';
import LoginScreen from '../screens/LoginScreen.js';
import CreateAccountScreen from '../screens/CreateAccountScreen.js';
import AuthScreen from '../screens/AuthScreen.js';


const HomeStack = createStackNavigator ();

const HomeScreenNavigator= () => {
    
    return (
        <HomeStack.Navigator initialRouteName={HOME}>
            <HomeStack.Screen name={HOME} component={HomeScreen}/>
            <HomeStack.Screen name={RVSITE_LIST} component= {RVSiteListScreen}/>
            <HomeStack.Screen name={RVSITE_DETAILS} component= {RVSiteScreen}/>
            <HomeStack.Screen name={EDIT_RVSITE_DETAILS} component= {EditRVSiteScreen}/>
            <HomeStack.Screen name="LoginScreen" component= {LoginScreen}/>
            <HomeStack.Screen name="CreateAccountScreen" component={CreateAccountScreen}/>
            <HomeStack.Screen name="AuthScreen" component={AuthScreen}/>
        </HomeStack.Navigator>
    );
}

export default HomeScreenNavigator;