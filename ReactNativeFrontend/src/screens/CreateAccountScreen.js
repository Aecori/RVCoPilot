import React, {useState} from 'react';
import { Alert, View, Text, Button, Image, SafeAreaView, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import google from '../assets/google.svg';
import register from '../assets/register.png';

import storeCredentials from '../components/auth';
import MyButton from '../components/button1';


const CreateAccountScreen = ({ navigation }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const handleCreateAccount = () => {
        // Logic for handling login
        if (!username || !password || !confirmPassword) {
            Alert.alert('Please enter both username and password');
            return;
        } else if (password !== confirmPassword) {
            Alert.alert('Passwords do not match');
            return;
        } 
        else {
            // Store the username and password securely
            storeCredentials(username, password);
            // After successful login, navigate to the RVSiteListScreen
            navigation.navigate('RVSiteListScreen');
        }
        

    };

   return (
        <ScrollView
        style={{
            backgroundColor: 'white',
            flex: 1,
            }}
        >   
            <View style={{alignItems:'center'}}>
            <Image 
                source={register} 
                style={{width: 400, height: 400}} 
            />
                <Text style={{fontSize:28}}>Create Account</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Select a username"
                    value={username}
                    onChangeText={setUsername}
                    keyboardType='default'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    keyboardType='default'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    keyboardType='default'
                />    
                {/* Button to navigate to Login screen */ }
                <MyButton title="Create Account" onPress={handleCreateAccount} />
                <TouchableOpacity title = "Log in instead" onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={{color: '#007bff'}}>Already have an account? Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    ); 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    input: {
      width: '70%',    
      margin: 10,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
    }
  });

export default CreateAccountScreen;