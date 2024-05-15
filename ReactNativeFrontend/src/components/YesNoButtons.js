import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const YesNoButtons = ({ label, value, onSelect }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textRVSite}>{label}</Text>
            <View style={[styles.radioGroup, { flexDirection: 'row' }]}>
                <TouchableOpacity
                    style={[styles.radioButton, value === true && styles.radioButtonSelected]}
                    onPress={() => onSelect(true)}
                >
                    <Text> Yes </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.radioButton, value === false && styles.radioButtonSelected]}
                    onPress={() => onSelect(false)}
                >
                    <Text> No </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textRVSite: {
      flex: 1,
      color:'#899499',
      fontSize: 16,
      padding: 5
    },
    radioButton: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginHorizontal: 10,
      marginBottom: 5,
    },
    radioButtonSelected: {
      backgroundColor: '#7CCD7C',
    },
  });
      
  export default YesNoButtons;
