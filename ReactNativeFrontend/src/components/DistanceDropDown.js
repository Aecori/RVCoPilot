import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DistanceDropdown = ({ distance, onSelect }) => {

    const [isFocus, setIsFocus] = useState();
    //const [selectedValue, setSelectedValue] = useState(distance);

    const distanceInMiles = [
        "50",
        "100",
        "200",
        "500"
      ];

    return (

        <View style={styles.distanceAttributeContainer}>
            <Text>Distance to Search  </Text>
          
          <Dropdown
            style={styles.distanceDropdown}
            inputSearchStyle={styles.inputSearchStyle}
            data={distanceInMiles.map((item, index) => ({
              label: `${item} miles`,
              value: item,
            }))}
            maxHeight={300}
            valueField= "value"
            labelField="label"
            placeholder={!isFocus ? 'Select distance' : '...'}
            value={distance}
            onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            onChange={item=>{
              handleChangeDistance(item.value);
            setIsFocus(false);
          }}/>
          
      </View>
    )
}

const styles = StyleSheet.create({
      distanceAttributeContainer: {
        alignItems: 'baseline',
        marginVertical: 15,
        flexDirection: "row",
      },
    distanceDropdown: {
        width: '40%',
        paddingLeft: 10,
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
      },
})

export default DistanceDropdown;



