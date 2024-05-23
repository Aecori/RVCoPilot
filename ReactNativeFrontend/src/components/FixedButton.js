import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native'; 

const FixedButton = ({ onPress, title }) => {
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
        width: 126,
        height: 35,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#AFAFAF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        shadowColor: 'black', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 5,
      },
      buttonText: {

      }
});

export default FixedButton;