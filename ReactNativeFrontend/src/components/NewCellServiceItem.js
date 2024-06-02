import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import SignalRating from './SignalRating.js';
import Button2 from './Button2.js';


const NewCellServiceItem = ({ editedData, onSave }) => {

  const [cellServiceItem, setCellServiceItem] = useState({
    Carrier: '',
    Signal: false,
    SignalStrength: 0,
  });
  const [availableCarriers, setAvailableCarriers] = useState([]);
  const [isFocus, setIsFocus] = useState();

  const allCarriers = [
    "AT&T",
    "Verizon",
    "Mint Mobile",
    "T-Mobile",
    "Cricket",
    "Boost",
    "Other"
  ];

  useEffect( () => {
    const currentCellCarriers = editedData.CellService.map( item => item.Carrier );
    const availableCellCarriers = allCarriers.filter(carrier => !currentCellCarriers.includes(carrier));
    setAvailableCarriers(availableCellCarriers);
  },[editedData.CellService]);

  const handleInputChange = (key, value) => {
    setCellServiceItem({
      ...cellServiceItem,
      [key]: value
    })
  }

  const handleSave = () => {
    onSave(cellServiceItem);
    setCellServiceItem({ Carrier: '', Signal: false, SignalStrength: 0 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Cell Carrier</Text>

      <View style={styles.carrierAttributeContainer}>
        <Text style={styles.text}>Carrier  </Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            data={availableCarriers.map((item, index) => ({
              label: item,
              value: item,
            }))}
            maxHeight={300}
            valueField= "value"
            labelField="label"
            placeholder={!isFocus ? 'Select item' : '...'}
            value={cellServiceItem.Carrier}
            onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            onChange={item=>{
              handleInputChange("Carrier",item.value);
              setIsFocus(false);
          }}/>
          
      </View>
    
      <View style={styles.carrierAttributeContainer}>
        <Text style={styles.text}>Signal Present </Text>
          <Switch
            value={cellServiceItem.Signal}
            onValueChange={value => handleInputChange('Signal', value)}
          />
      </View>
      
      <View style={styles.carrierAttributeContainer}>
        <Text style={styles.text}>Signal Strength </Text>
          <SignalRating 
            startRating={0} 
            maxRating={5} 
            onRatingChange={value => handleInputChange("SignalStrength",value)} 
            icon="star" 
            emptyIcon="star-o"/>
      </View>

      <View style={{alignItems: 'center', margin: 20}}>
        <Button2 title="Save" onPress={handleSave} />
      </View>
      
    </View>
  );
};

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

export default NewCellServiceItem;