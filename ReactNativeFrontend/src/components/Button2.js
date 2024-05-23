import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native'; 

const Button2 = ({ onPress, title }) => {
    const handlePress = () => {
        if (onPress) {
            onPress();
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 35,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#AFAFAF',
        borderRadius: 10,
        shadowColor: 'gray', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 5,
      },
    buttonText: {

    }
});

export default Button2;