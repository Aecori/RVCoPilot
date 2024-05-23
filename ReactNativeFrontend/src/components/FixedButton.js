import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native'; 

const FixedButton = ({ onPress, title }) => {
    const handlePress = () => {
        if (onPress) {
            onPress();
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.homeButton}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    homeButton: {
        width: 126,
        height: 35,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#AFAFAF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15
      },
});

export default FixedButton;