import React from 'react';
import { Alert } from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({ domain: 'dev-zifkiob8dukhcy86.us.auth0.com', clientId: 'oQZMm2AFurSbtzd0h9htwed8z2ZtwYAM' });

const handleAuthLogin = async (navigation) => {
    try {
        const credentials = await auth0.webAuth.authorize({
            scope: 'openid profile email',
            audience: 'https://dev-zifkiob8dukhcy86.us.auth0.com/userinfo',
        });
        console.log(credentials);
        // Store the credentials - maybe?  
        // Navigate to the homescreen/RV List
        navigation.navigate('RVSiteListScreen');
    } catch (error) {
        console.error(error);
        Alert.alert('Login failed', error.message);
    }
};

export default handleAuthLogin;
