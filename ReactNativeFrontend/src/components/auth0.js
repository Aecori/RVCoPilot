import React from 'react';
import { Alert } from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({ domain: 'dev-zifkiob8dukhcy86.us.auth0.com', clientId: 'oQZMm2AFurSbtzd0h9htwed8z2ZtwYAM' });

const handleAuthLogin = async (navigation) => {
    try {
        const credentials = await auth0.webAuth.authorize({
            scope: 'openid profile email',
            audience: 'https://dev-zifkiob8dukhcy86.us.auth0.com/api/v2/'
        });
        console.log('Credentials:', credentials);
        const accessToken = credentials.accessToken;
        console.log('Access Token:', accessToken);

        // Fetch user profile
        const userInfo = await auth0.auth.userInfo({ token: accessToken });
        console.log('User Info:', userInfo);

        // Extract the username from the user profile 
        const username = userInfo.nickname; // or userInfo.givenName or userInfo.name
        const email = userInfo.email;

        // PUT request
        const url = 'http://localhost:8080/user/';
        console.log('Request URL:', url);

        const response = await fetch(url, {
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

        // Check if the response status is 200 or 201
        if (response.status === 200 || response.status === 201) {
            console.log(`Success: Received ${response.status} status`);
            const responseData = await response.json();
            console.log(responseData);

            // Navigate to the homescreen/RV List
            navigation.navigate('RVSiteListScreen', { userName: userInfo.nickname });
        } else {
            console.log(`Unexpected status code: ${response.status}`);
            const responseText = await response.text(); // Get raw response text
            console.log('Response Text:', responseText); // Log raw response text
            throw new Error(`Unexpected status code: ${response.status}`);
        }

    } catch (error) {
        console.error('Error:', error);
        Alert.alert('Login failed', error.message);
    }
};

export default handleAuthLogin;
