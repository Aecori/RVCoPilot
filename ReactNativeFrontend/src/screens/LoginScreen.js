import React from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

import google from '../assets/google.svg';
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
        <SafeAreaView>
            <View style={{alignItems:'center'}}>
                <Text>Login</Text>
                
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
                <Button title="New user? Go to Create Account" onPress={goToCreateAccountScreen} />
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
