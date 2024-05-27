import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import sampleRVSiteData from '../../assets/data/sampleRVSiteData.js';
import FixedButton from '../../components/FixedButton.js';
import DistanceDropdown from '../../components/DistanceDropDown.js';

const RVSiteListScreen = () => {

  const navigation = useNavigation();
  const userName = "Unverified user"

  const [screenState, setScreenState] = useState({
      siteData: null,
      loading: true,
      error: null,
    }
  )

  const { siteData, loading, error } = screenState;

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
          throw new Error(`Failed to load RV Site Data: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setScreenState({ siteData: data, loading: false, error: null });
        } else {
          throw new Error('Response format not JSON');
        }

      } catch (error) {
        console.log("Error logging site JSON, using default sample RV data");
        setScreenState({ siteData: sampleRVSiteData, loading: false, error: error.message });
      }
      
    };
    fetchData();
  }, []);

  const goToRVSiteScreen = useCallback((rvItem) => {
    navigation.navigate('RVSiteScreen', { rvItem, userName });
  }, [navigation]);

  const goToHomeScreen = useCallback(() => {
    navigation.navigate('HomeScreen');
  }, [navigation]);

  const goToMapScreen = useCallback(() => {
    navigation.navigate('MapScreen', { siteData, userName });
  }, [navigation, siteData]);

  const renderItem = useCallback(({ item }) => (
    <RVSiteItem 
      rvItem={item}
      userName= {userName}
      goToRVSiteScreen={goToRVSiteScreen}
       />
  ), [goToRVSiteScreen, siteData]);
  
  return (
    <View style={styles.screenview}>

      <View style={styles.buttonContainer}>
      
          <FixedButton title="Map View" onPress={goToMapScreen}/>
          <FixedButton title="Return Home" onPress={goToHomeScreen}/>

      </View>
  
      <Text style={styles.title}>Nearby RV Sites</Text>  
     
      <View style={styles.container}>
          {loading ? <ActivityIndicator color="#fff" /> : 
            error ? <Text style={styles.errorMessage}>{error}</Text> :
            <FlatList
              data={siteData}
              renderItem={renderItem}
              keyExtractor={(item)=>`${item.id}`}
        />}
      </View>
    </View>
    
  );
};

const RVSiteItem = ({ rvItem, goToRVSiteScreen, userName }) => (
  <View style={styles.item}>
    <Text style={styles.textRVSite}>{rvItem.SiteName}</Text>
      <TouchableOpacity onPress={()=> goToRVSiteScreen( rvItem, userName)}>
        <Text style={styles.buttonText}>Site Details</Text>
      </TouchableOpacity>
    </View>
);

RVSiteItem.propTypes = {
  rvItem: PropTypes.object.isRequired,
  goToRVSiteScreen: PropTypes.func.isRequired,
}


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
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  }
});
export default RVSiteListScreen;
