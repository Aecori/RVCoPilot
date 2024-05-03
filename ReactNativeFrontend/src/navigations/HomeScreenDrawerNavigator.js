import React from 'react';
import {createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreenNavigator from './HomeScreenNavigator.js';
import { HOME_NAVIGATOR } from '../constants/Constants.js';

const HomeScreenDrawerNavigator= ({navigation}) => {
    const Drawer = createDrawerNavigator ();

    
    return (
        <Drawer.Navigator>
            <SafeAreaView>
                <Drawer.Screen name="HomeScreenNavigator" component={HomeScreenNavigator}/>
            </SafeAreaView>
        </Drawer.Navigator>
    );
}

export default HomeScreenDrawerNavigator;