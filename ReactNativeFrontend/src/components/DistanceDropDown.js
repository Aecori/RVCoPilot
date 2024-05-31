import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Switch } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Button2 from './Button2.js';


const DistanceDropdown = ({onSave}) => {

    const [distanceItem, setDistanceItem] = useState('');
    const [isFocus, setIsFocus] = useState();
    
    const distanceInMiles = [
      50, 100, 500, 1000, "Search all"
    ];
  
    const handleInputChange = (value) => {
      setDistanceItem(value); 
    }
  
    const handleSave = () => {
      if (distanceItem === "Search all") {
        onSave(null);
      }
      else {
        onSave(distanceItem);
      }
    };

    return (
        <View>
          <Text style={styles.title}>Search By Distance (miles)</Text>

          <View style={styles.container}>
          <View style={{alignItems: 'center', margin: 20}}>
                  <Button2 title="Search" onPress={handleSave} />
              </View>
              
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              data={distanceInMiles.map((item, index) => ({
                label: item,
                value: item,
              }))}
              maxHeight={300}
              valueField= "value"
              labelField="label"
              placeholder={!isFocus ? 'Distance' : '...'}
              value={distanceItem}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item=>{
                handleInputChange(item.value);
              setIsFocus(false);
              }}/>   

          </View>

        </View>
        
    )
}

const styles = StyleSheet.create({
    title: {
      textAlign: 'center',
      fontSize: 20,
      padding: 2,
      marginTop: 5,
      color: '#375D62',
      justifyContent: 'center',
    },
    text: {
      fontSize: 14,
      color: '#375D62',
      flexWrap: 'wrap'
    },
    container: {
      flexDirection: 'row',
      padding: 1,
      justifyContent: 'center',
      borderColor: '#ccc',
      alignItems: 'center'
    },  
    dropdown: {
      width: '40%',
      padding: 10,
      height: 40,
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 8,
    },
  });

export default DistanceDropdown;




