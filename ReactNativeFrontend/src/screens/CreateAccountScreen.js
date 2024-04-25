import React, {useState} from 'react';
import { View, Text, Button, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';



import google from '../assets/google.svg';
import MyButton from '../components/button1';


const CreateAccountScreen = ({ navigation }) => {
    // Function to navigate to the SignUp screen
    const goToLogin = () => {
        navigation.navigate('LoginScreen');
    };

   return (
        <View>
            <Text>Create Account</Text>
            {/* Button to navigate to Login screen */ }
            <Button title="Go to Log In" onPress={goToLogin} />
        </View>
    ); 
}

export default CreateAccountScreen;