import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native'; 

const MyButton = ({ onPress, title }) => {
    const handlePress = () => {
        console.log('Button pressed!');
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
        backgroundColor: '#6CA3AA',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default MyButton;