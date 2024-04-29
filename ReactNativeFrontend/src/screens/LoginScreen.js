import React from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';

import google from '../assets/google.svg';
import register from '../assets/register.png';
import MyButton from '../components/button1';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    // Function to navigate to the SignUp screen
    const goToCreateAccountScreen = () => {
        navigation.navigate('CreateAccountScreen');
    };

    
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
        <SafeAreaView 
            style={{
                backgroundColor: 'white',
                paddingTop: 0,      
                }}
        >
            <View style={{alignItems:'center'}}>
                <Image 
                source={register} 
                style={{width: 400, height: 400}} 
                />
                <Text style={{fontSize:28}}>Login</Text>
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
                {/* Button to navigate to CreateAccount screen */}
                <View style={{flexDirection:'row'}}>
                    <MyButton title="New user? Create Account" onPress={goToCreateAccountScreen} />
                </View>
            </View>
        </SafeAreaView>
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

export default LoginScreen;
