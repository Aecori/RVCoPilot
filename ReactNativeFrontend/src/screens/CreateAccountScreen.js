import React, {useState} from 'react';
import { View, Text, Button, Image, SafeAreaView, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';



import google from '../assets/google.svg';
import register from '../assets/register.png';
import MyButton from '../components/button1';


const CreateAccountScreen = ({ navigation }) => {
    // Function to navigate to the SignUp screen
    const goToLogin = () => {
        navigation.navigate('RVSiteListScreen');
    };

   return (
        <SafeAreaView>
            <View style={{alignItems:'center'}}>
                <Text>Create Account</Text>
                {/* Button to navigate to Login screen */ }
                <MyButton title="Create Account" onPress={goToLogin} />
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

export default CreateAccountScreen;