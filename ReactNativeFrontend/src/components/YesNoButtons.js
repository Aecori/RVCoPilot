import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const YesNoButtons = ({ label, value, onSelect }) => {
    return (
        <View style={styles.fieldItem}>
            <Text style={styles.textRVSite}>{label}</Text>
            <View style={[{ flexDirection: 'row' }]}>
                <TouchableOpacity
                    style={[styles.radioButton, value === true && styles.radioButtonSelected]}
                    onPress={() => onSelect(true)}
                >
                    <Text style={styles.radioButtonText}> Yes </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.radioButton, value === false && styles.radioButtonSelected]}
                    onPress={() => onSelect(false)}
                >
                    <Text style={styles.radioButtonText}> No </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    fieldItem: {
        flexDirection: 'row',
        marginVertical: 15,
        alignItems: 'center'
      },
    textRVSite: {
        flex: 1,
        color:'#899499',
        fontSize: 16,
        padding: 10
    },
    radioButton: {
        borderWidth: 1,
        borderColor: '#899499',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 7,
        marginHorizontal: 7,
        marginVertical: 10,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    radioButtonText: {
        color: '#899499'
    },
    radioButtonSelected: {
        backgroundColor: '#A8C7B9',
    },
  });
      
  export default YesNoButtons;
