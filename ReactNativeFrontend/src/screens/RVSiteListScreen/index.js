import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import sampleRVSiteData from '../../assets/data/sampleRVSiteData.js';

const RVSiteListScreen = () => {

  const navigation = useNavigation();
  const userName = "Unverified user"

  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://your-rv-copilot.uc.r.appspot.com/sites', {
          headers: {
            Accept: 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to load RV Site Data');
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
        console.log("Error logging site JSON, using default sample");
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#3e4272'}}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, marginTop: 10}}>
          
          <TouchableOpacity style={[styles.homeButton] } onPress={goToMapScreen}>
              <Text>Map View</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeButton } onPress={goToHomeScreen}>
              <Text>Return Home</Text>
          </TouchableOpacity>

      </View>

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
    backgroundColor: '#e0e0e1',
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 6,
    borderRadius: 5,
  },
  itemBox: {
    backgroundColor: '#f0f0f0', 
    padding: 5, 
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 1, 
    borderColor: '#ccc', 
  },
  title: {
    fontSize: 22,
    padding: 10,
    marginTop: 15,
    color: '#ecd9c4'
  },
  textRVSite: {
    color:'#A9A9A9',
    fontSize: 16
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
    color: '#333333',
  },
  topRight: {
    position: 'absolute', 
    top: 5, 
    right: 20,
  }
});
export default RVSiteListScreen;
