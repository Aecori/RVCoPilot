import React from 'react';

import { HOME, RVSITE_DETAILS, RVSITE_LIST, EDIT_RVSITE_DETAILS } from '../constants/Constants.js';

import {createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import RVSiteListScreen from '../screens/RVSiteListScreen';
import RVSiteScreen from '../screens/RVSiteScreen';
import EditRVSiteScreen from '../screens/EditRVSiteScreen';



const HomeStack = createStackNavigator ();

const HomeScreenNavigator= () => {
    
    return (
        <HomeStack.Navigator initialRouteName={HOME}>
            <HomeStack.Screen name={HOME} component={HomeScreen}/>
            <HomeStack.Screen name={RVSITE_LIST} component= {RVSiteListScreen}/>
            <HomeStack.Screen name={RVSITE_DETAILS} component= {RVSiteScreen}/>
            <HomeStack.Screen name={EDIT_RVSITE_DETAILS} component= {EditRVSiteScreen}/>
        </HomeStack.Navigator>
    );
}

export default HomeScreenNavigator;