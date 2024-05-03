import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import sampleRVSiteData from '../../assets/data/sampleRVSiteData.js';

const RVSiteListScreen = () => {

  const navigation = useNavigation();
  const userName = "Bob"

  const siteData=sampleRVSiteData;
  //console.log(sampleRVSiteData);

  const goToRVSiteScreen = (item) => {
    //console.log(item);
    navigation.navigate('RVSiteScreen', { item: item, userName: userName });
  }

  const goToHomeScreen = () => {
    navigation.navigate('HomeScreen');
  }
  
  const Item = ({item}) => (
    <View style={styles.item}>

      <Text style={styles.textRVSite}>{item.SiteName}</Text>
        <TouchableOpacity onPress={()=> goToRVSiteScreen(item)}>
          <Text style={styles.buttonText}>Site Details</Text>
        </TouchableOpacity>
      </View>
  );

  const keyExtractor = (item, index) => `${item.id}`;
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0e0e1'}}>
      
      <TouchableOpacity style={[styles.homeButton, styles.topRight] } onPress={goToHomeScreen}>
        <Text>Return Home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Nearby RV Sites</Text>

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
  item: {
    backgroundColor: '#3e4272',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 22,
    padding: 10, 
    marginTop: 15,
    color: '#899499'
  },
  textRVSite: {
    color:'#ecd9c4',
    fontSize: 16,
    padding: 5
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
    borderColor: '#FFFFFF',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
  },
  homeButton: {
    width: 126,
    height: 35,
    backgroundColor: '#D9D9D9',
    borderWidth: 1,
    borderColor: '#AFAFAF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
  },
  buttonText: {
    fontFamily: 'MarkoOne-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 32,
    textAlign: 'center',
    color: '#d0e6f2',
  },
  topRight: {
    position: 'absolute', 
    top: 5, 
    right: 20,
  }
});
export default RVSiteListScreen;
