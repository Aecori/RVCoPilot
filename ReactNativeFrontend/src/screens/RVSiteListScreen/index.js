import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import sampleRVSiteData from '../../assets/data/sampleRVSiteData.js';
import FixedButton from '../../components/FixedButton.js';
import DistanceDropdown from '../../components/DistanceDropDown.js';

const RVSiteListScreen = () => {

  const navigation = useNavigation();
  const userName = "Unverified user"

  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Distance dropdown state
  const [distanceSelected, setDistanceSelected] = useState('');

  const handleDistanceChange = (value) => {
    setDistanceSelected(value);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://your-rv-copilot.uc.r.appspot.com/sites', {
          headers: {
            Accept: 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to load RV Site Data:', response.status);
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setSiteData(data);
          setLoading(false); 
        } else {
          throw new Error('Response format not JSON');
        }
      } catch (error) {
        console.log("Error logging site JSON, using default sample RV data");
        setSiteData(sampleRVSiteData);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const goToRVSiteScreen = (item) => {
    navigation.navigate('RVSiteScreen', { item: item, userName: userName });
  }

  const goToHomeScreen = () => {
    navigation.navigate('HomeScreen');
  }

  const goToMapScreen = () => {
    navigation.navigate('MapScreen', { siteData: siteData, userName: userName});
  }
  
  const Item = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.textRVSite}>{item.SiteName}</Text>
        <TouchableOpacity onPress={()=> goToRVSiteScreen(item, userName)}>
          <Text style={styles.buttonText}>Site Details</Text>
        </TouchableOpacity>
      </View>
  );

  const keyExtractor = (item, index) => `${item.id}`;
  
  return (
    <View style={styles.screenview}>

      <View style={styles.buttonContainer}>
      
          <FixedButton title="Map View" onPress={goToMapScreen}/>
          <FixedButton title="Return Home" onPress={goToHomeScreen}/>

      </View>
  
      <Text style={styles.title}>Nearby RV Sites</Text>  

      
      
     
      <View style={styles.container}>
          {loading ? <ActivityIndicator color="#fff" /> : 
      
        <FlatList
          data={siteData}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={keyExtractor}
        />}
      </View>
    </View>
    
  );
};


const styles = StyleSheet.create({
  screenview: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#6CA3AA'
  },
  title: {
    fontSize: 24,
    padding: 10,
    marginTop: 25,
    color: '#F5F6E4'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    position: 'absolute',
    top: 10, 
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 6,
    borderRadius: 5,
  },
  textRVSite: {
    textAlign: 'center',
    color:'#97AFA9',
    fontSize: 20
  },
  container: {
    boxSizing: 'border-box',
    width: '90%',
    aspectRatio: 0.7,
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    padding: 5,
    paddingTop: 20,
    background: '#D9D9D9',
    borderWidth: 2,
    borderColor: '#F6F5E4',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
  },
  
  buttonText: {
    lineHeight: 32,
    textAlign: 'center',
    color: '#7CC2D1',
  },
});
export default RVSiteListScreen;
