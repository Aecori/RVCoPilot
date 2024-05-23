import React from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { useAuth0, Auth0Provider } from 'react-native-auth0';

import handleAuthLogin from '../components/auth0';

import google from '../assets/google.svg';
import register from '../assets/register.png';
import MyButton from '../components/button1';
import { ScrollView } from 'react-native-gesture-handler';

const LoginScreen = ({ navigation }) => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = () => {
        // Logic for handling login
        if (!username || !password) {
            Alert.alert('Please enter both username and password');
            return;
        } else {
            // Call the login API
            // If successful, navigate to the RVSiteListScreen
            // If unsuccessful, show an error message
        }
        // After successful login, navigate to the RVSiteListScreen
        navigation.navigate('RVSiteListScreen');

    };
    

    return (
        <Auth0Provider domain={"dev-zifkiob8dukhcy86.us.auth0.com"} clientId={"oQZMm2AFurSbtzd0h9htwed8z2ZtwYAM"}>
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
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
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
                <MyButton title="Login and go see RV sites" onPress={handleLogin} />
                <MyButton title="Login with Auth0" onPress={() => handleAuthLogin(navigation)} />
                {/* Button to navigate to CreateAccount screen */}
                <TouchableOpacity onPress={() => navigation.navigate('CreateAccountScreen')}>
                    <Text style={{color: '#007bff'}}>New user? Create account</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </Auth0Provider>
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
    },
    title: {
        fontSize: 28,
        padding: 10,
        color: '#9A7B5B',
        textAlign: 'center'
      },
  });

export default LoginScreen;
