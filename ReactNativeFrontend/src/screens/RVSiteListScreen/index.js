import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import basicStyle from '../../styles/basicStyle.js';
import sampleRVSiteData from '../../assets/data/sampleRVSiteData.js';


const RVSiteListScreen = () => {

  const navigation = useNavigation();

  const siteData=sampleRVSiteData;
  //console.log(sampleRVSiteData);

  const goToRVSiteScreen = (item) => {
    //console.log(item);
    navigation.navigate('RVSiteScreen', { item: item });
  }

  const goToHomeScreen = () => {
    navigation.navigate('HomeScreen');
  }
  
  const Item = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <TouchableOpacity onPress={()=> goToRVSiteScreen(item)} style={styles.button}>
            <Text style={styles.buttonText}>Site Details</Text>
          </TouchableOpacity>
    </View>
  );

  const keyExtractor = (item, index) => `${item.name}-${item.site_identifier}`;
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity style={[styles.homeButton, styles.topRight] } onPress={goToHomeScreen}>
        <Text>Return Home</Text>
      </TouchableOpacity>
      <Text>Nearby RV Sites</Text>
      <View style={styles.container}>
        <FlatList
          data={siteData}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={keyExtractor}
        />
      </View>
    </View>

    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#FFC3D3BC',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
  },
  container: {
    boxSizing: 'border-box',
    width: '85%',
    aspectRatio: 0.8,
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    padding: 5,
    background: '#D9D9D9',
    borderWidth: 1,
    borderColor: '#AFAFAF',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
  },

  homeButton: {
    width: 126,
    height: 40,
    backgroundColor: '#D9D9D9',
    borderWidth: 1,
    borderColor: '#AFAFAF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    fontFamily: 'MarkoOne-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 32,
    textAlign: 'center',
    color: '#000000',
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  topRight: {
    position: 'absolute', 
    top: 5, 
    right: 20,
  },
  middleBottom: {
    position: 'absoulte', 
    bottom: 5
  }
});
export default RVSiteListScreen;
