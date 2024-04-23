import React from 'react';
import { View, Text, Button } from 'react-native';

const CreateAccountScreen = ({ navigation }) => {
    // Function to navigate to the SignUp screen
    const goToLogin = () => {
        navigation.navigate('LoginScreen');
    };

    return (
        <View>
            <Text>Hi from Create Account Screen</Text>
            {/* Button to navigate to SignUp screen */}
            <Button title="Go to Log In" onPress={goToLogin} />
        </View>
    );
}

export default CreateAccountScreen;