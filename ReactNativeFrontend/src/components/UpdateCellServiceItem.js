import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, TextInput, Switch } from 'react-native';
import SignalRating from './SignalRating.js';

const UpdateCellServiceItem = ({ startCellularData, rvSiteName, onSave, onDelete }) => {

  const [cellularData, setCellularData] = useState({
    Carrier: startCellularData.Carrier,
    Signal: startCellularData.Signal,
    SignalStrength: startCellularData.SignalStrength,
  });

  const handleInputChange = (key, value) => {
    setCellularData({ ...cellularData, [key]: value });
  };

  const handleSave = () => {
    onSave(cellularData);
  };

  const handleDelete = () => {
    onDelete(cellularData);
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Update Cell Service ({rvSiteName})</Text>   

        <View style={styles.carrierAttributeContainer}>
          <Text style={styles.text}>Carrier: {cellularData.Carrier}</Text>
        </View>
      
        <View style={styles.carrierAttributeContainer}>
          <Text style={styles.text}>Signal Present  </Text>
            <Switch
              value={cellularData.Signal}
              onValueChange={value => handleInputChange("Signal", value)}
            />
        </View>
        
        <View style={styles.carrierAttributeContainer}>
          <Text style={styles.text}>Signal Strength</Text>
            <SignalRating 
              startRating={cellularData.Strength} 
              maxRating={5} 
              onRatingChange={value => handleInputChange("SignalStrength",value)} 
              icon="star" 
              emptyIcon="star-o"/>
        </View>

        <View style={{flexDirection: "row", justifyContent: 'space-between', margin: 20}}>
          <Button title="Save" onPress={handleSave} />
          <Button title="Delete" onPress={handleDelete} />
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
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  container: {
    padding: 20,
    justifyContent: 'center',
    borderColor: '#ccc',
  },
  carrierAttributeContainer: {
    flex: 1,
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    flexShrink: 1
  }, 
});

export default UpdateCellServiceItem;
