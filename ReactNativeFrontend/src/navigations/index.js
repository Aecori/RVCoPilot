import React, { useState } from 'react';

import {NavigationContainer } from '@react-navigation/native';
import {Text} from 'react-native';
import AuthNavigator from './AuthNavigator';
import HomeScreenDrawerNavigator from './HomeScreenNavigator';

const AppNavContainer = () => {

    //for now set as true or false to view either AuthStack screens or HomeStack sreens
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleLogin = () => {
        // Perform authentication logic here, e.g., validating credentials
        setIsLoggedIn(true);
    };

    return (
        <NavigationContainer>
            {isLoggedIn? <HomeScreenDrawerNavigator/> : <AuthNavigator onLogin={handleLogin}/>}
        </NavigationContainer>
    );
}

export default AppNavContainer;
