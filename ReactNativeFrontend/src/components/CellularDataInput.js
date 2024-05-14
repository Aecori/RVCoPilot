import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, TextInput, Switch } from 'react-native';
import SignalRating from './SignalRating.js';

const CellularDataInput = ({ startCellularData, onSave }) => {

  console.log("in cellulardatacomponent");
  const [cellularData, setCellularData] = useState({
    Carrier: startCellularData.Carrier,
    Signal: startCellularData.Signal,
    Strength: startCellularData.Strength,
  });

  const handleInputChange = (key, value) => {
    setCellularData({ ...cellularData, [key]: value });
  };

  const handleSave = () => {
    onSave(cellularData);
  };

  return (
    <View style={styles.container}>

      <View style={styles.carrierAttributeContainer}>
      <Text>Carrier:</Text>
      <TextInput
        style={styles.textInputWrapper}
        maxLength={50}
        label="Carrier"
        value={cellularData.Carrier}
        onChangeText={text => handleInputChange('Carrier', text)}
      />
      </View>
    
      <View style={styles.carrierAttributeContainer}>
        <Text>Signal Present:</Text>
          <Switch
            value={cellularData.Signal}
            onValueChange={value => handleInputChange('Signal', value)}
          />
      </View>
      
      <View style={styles.carrierAttributeContainer}>
        <Text>Signal Strength</Text>
          <SignalRating defaultRating={cellularData.Strength} maxRating={5} onRatingChange={value => handleInputChange('Strength',value)} icon="star" emptyIcon="star-o"/>
      </View>
      

      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    borderColor: '#ccc'
  },
  carrierAttributeContainer: {
    flexDirection: "row",
    alignItems: "center",
  }, 
  textInputWrapper: {
    width: "80%",
    height: 35,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    position: "relative",
  }
});

export default CellularDataInput;
