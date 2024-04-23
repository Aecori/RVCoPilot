import React from 'react';
import { View, Text, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
    // Function to navigate to the SignUp screen
    const goToCreateAccountScreen = () => {
        navigation.navigate('CreateAccountScreen');
    };

    
    const handleLogin = () => {
        // Logic for handling login
        // After successful login, navigate to the HomeScreen
        navigation.navigate('Home');

    };
    

    return (
        <View>
            <Text>Hi from Login</Text>
            {/* Button to navigate to SignUp screen */}
            <Button title="Go to Create Account" onPress={goToCreateAccountScreen} />
            <Button title="Login and go see RV sites" onPress={handleLogin} />
        </View>
    );
}

export default LoginScreen;
