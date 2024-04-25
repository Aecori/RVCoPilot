import React from 'react';
import {createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreenNavigator from './HomeScreenNavigator.js';
import { HOME_NAVIGATOR } from '../constants/Constants.js';

const HomeScreenDrawerNavigator= ({navigation}) => {
    const Drawer = createDrawerNavigator ();

    
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="HomeScreenNavigator" component={HomeScreenNavigator}/>
        </Drawer.Navigator>
    );
}

export default HomeScreenDrawerNavigator;