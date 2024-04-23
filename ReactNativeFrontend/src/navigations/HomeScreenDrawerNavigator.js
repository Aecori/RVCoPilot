import React from 'react';
import {createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreenNavigator from './HomeScreenNavigator';

const HomeScreenDrawerNavigator= ({navigation}) => {
    const Drawer = createDrawerNavigator ();

    
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreenNavigator}/>
        </Drawer.Navigator>
    );
}

export default HomeScreenDrawerNavigator;