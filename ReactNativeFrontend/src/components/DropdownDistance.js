import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Switch } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Button2 from './Button2.js';


const DropdownDistance = ({onSave}) => {

    const [distanceItem, setDistanceItem] = useState('');
    
      const [isFocus, setIsFocus] = useState();
    
      const distanceInMiles = [
        50, 100, 500, 1000
      ];
    
      const handleInputChange = (value) => {
        setDistanceItem(value); 
      }
    
      const handleSave = () => {
        onSave(distanceItem);
      };

    return (
        <View style={{flexDirection: 'row'}}>
            <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            data={distanceInMiles.map((item, index) => ({
              label: item,
              value: item,
            }))}
            maxHeight={300}
            valueField= "value"
            labelField="label"
            placeholder={!isFocus ? 'Select item' : '...'}
            value={distanceItem}
            onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            onChange={item=>{
              handleInputChange(item.value);
            setIsFocus(false);
            }}/>

            <View style={{alignItems: 'center', margin: 20}}>
                <Button2 title="Save" onPress={handleSave} />
            </View>


        </View>
        
    )
}

const styles = StyleSheet.create({
    title: {
      textAlign: 'center',
      fontSize: 22,
      padding: 10,
      marginTop: 15,
      color: '#375D62',
      justifyContent: 'center',
    },
    text: {
      fontSize: 16,
      color: '#375D62',
      flexWrap: 'wrap'
    },
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      borderColor: '#ccc'
    },
    carrierAttributeContainer: {
      flex: 1,
      marginVertical: 15,
      flexDirection: "row",
      alignItems: "center",
    }, 
    dropdown: {
      width: '60%',
      padding: 20,
      height: 45,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 8,
    },
  });

export default DropdownDistance;
