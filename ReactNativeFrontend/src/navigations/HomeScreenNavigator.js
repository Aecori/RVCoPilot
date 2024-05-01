import React from 'react';

import { HOME, RVSITE_DETAILS, RVSITE_LIST, EDIT_RVSITE_DETAILS, MAIN_SCREEN } from '../constants/Constants.js';

import {createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen.js';
import LoginScreen from '../screens/LoginScreen.js';
import CreateAccountScreen from '../screens/CreateAccountScreen.js';
import MainScreen from '../screens/MainScreen/index.js';
import RVSiteListScreen from '../screens/RVSiteListScreen/index.js';
import RVSiteScreen from '../screens/RVSiteScreen/index.js';
import EditRVSiteScreen from '../screens/EditRVSiteScreen/index.js';
import AuthScreen from '../screens/AuthScreen.js';


const HomeStack = createStackNavigator ();

const HomeScreenNavigator= () => {
    
    return (
        <HomeStack.Navigator initialRouteName={HOME}>
            <HomeStack.Screen name={HOME} component={HomeScreen}/>
            <HomeStack.Screen name="LoginScreen" component= {LoginScreen}/>
            <HomeStack.Screen name="CreateAccountScreen" component={CreateAccountScreen}/>
            <HomeStack.Screen name="AuthScreen" component={AuthScreen}/>
            <HomeStack.Screen name={MAIN_SCREEN} component={MainScreen}/>
            <HomeStack.Screen name={RVSITE_LIST} component= {RVSiteListScreen}/>
            <HomeStack.Screen name={RVSITE_DETAILS} component= {RVSiteScreen}/>
            <HomeStack.Screen name={EDIT_RVSITE_DETAILS} component= {EditRVSiteScreen}/>
        </HomeStack.Navigator>
    );
}

export default HomeScreenNavigator;