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
        const accessToken = credentials.accessToken;
        // Fetch user profile
        const userInfo = await auth0.auth.userInfo({ token: accessToken });
        console.log(userInfo.nickname);

        // Extract the username from the user profile and set it in state
        const username = userInfo.nickname; // or userInfo.givenName or userInfo.name
        const email = userInfo.email;
        //setUsername(username);
        //setEmail(email);

        //  PUT request 
        const response = await fetch('https://your-rv-copilot.uc.r.appspot.com/user/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                username: username,
                email: email
            })
        });
        
        const responseData = await response.json();
        console.log(responseData);

        // Navigate to the homescreen/RV List
        navigation.navigate('RVSiteListScreen', {userName: userInfo.nickname});
    } catch (error) {
        console.error(error);
        Alert.alert('Login failed', error.message);
    }
};

export default handleAuthLogin;
