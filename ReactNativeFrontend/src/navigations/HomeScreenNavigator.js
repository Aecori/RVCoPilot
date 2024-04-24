import React from 'react';

import {createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen.js';
import RVSiteListScreen from '../screens/RVSiteListScreen.js';
import RVSiteScreen from '../screens/RVSiteScreen.js';
import EditRVSiteScreen from '../screens/EditRVSiteScreen.js';


const HomeStack = createStackNavigator ();

const HomeScreenNavigator= () => {
    

    
    return (
        <HomeStack.Navigator initialRouteName="HomeScrenn">
            <HomeStack.Screen name="HomeScreen" component={HomeScreen}/>
            <HomeStack.Screen name="RVSiteListScreen" component= {RVSiteListScreen}/>
            <HomeStack.Screen name="RVSiteScreen" component= {RVSiteScreen}/>
            <HomeStack.Screen name="EditRVSiteScreen" component= {EditRVSiteScreen}/>
        </HomeStack.Navigator>
    );
}

export default HomeScreenNavigator;