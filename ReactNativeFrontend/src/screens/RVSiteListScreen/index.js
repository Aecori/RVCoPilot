import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import sampleRVSiteData from '../../assets/data/sampleRVSiteData.js';
import FixedButton from '../../components/FixedButton.js';
import DistanceDropdown from '../../components/DistanceDropdown.js';
import RequestLocation from '../../components/RequestLocation.js';

const RVSiteListScreen = () => {

  const route = useRoute();
  const navigation = useNavigation();
  const { distanceFromMapView } = route.params || {};

  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(true);
  
  useEffect(() => {
    RequestLocation(setLocation, setLocationError, setLoadingLocation);
    console.log("Current location",location);
  }, [distanceSelected]);
 
  const userName = "Anonymous"

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
  };

  useEffect(()=>{
    //console.log("SiteData",screenState.siteData);
  }, [siteData]);

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        let url = 'https://your-rv-copilot.uc.r.appspot.com/sites';
      
        // Search with latitude and longitude parameters if distance (distanceSelected) is specified
        if (distanceSelected) {
          url += `/latitude/${location[0]}/longitude/${location[1]}/distance/${distanceSelected}`;
        }
        const response = await fetch(url, {
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
  }, [distanceSelected]);

  // Navigation functions to other screens

  const goToRVSiteScreen = useCallback((rvItem) => {
    navigation.navigate('RVSiteScreen', { rvItem, userName });
  }, [navigation]);

  const goToHomeScreen = useCallback(() => {
    navigation.navigate('HomeScreen');
  }, [navigation]);

  const goToMapScreen = useCallback(() => {
    navigation.navigate('MapScreen', { siteData, userName });
  }, [navigation, siteData]);

  // Render items for FlatList of RV Sites

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

      <View style={styles.contentContainer}>
          <View style={styles.distanceAttributeContainer}>
            <Text style={styles.title}>Nearby RV Sites</Text>  
            
            <DistanceDropdown
              onSave={handleDistanceChange}/>

            {locationError && (
              <Text
                style={{color:'black', fontSize: 14}}>*(Unable to get current location, using default coordinates)</Text>
            )}
          
          </View>
          
        
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
    width: '100%'
  },
  textRVSite: {
    textAlign: 'center',
    color:'#97AFA9',
    fontSize: 20
  },
  contentContainer: {
    marginTop: 60,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    maxHeight: '90%'
  },
  container: {
    flex: 1,
    boxSizing: 'border-box',
    width: '90%',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    padding: 5,
    paddingTop: 20,
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
  },
  distanceAttributeContainer: {
    alignItems: 'center',
    marginVertical: 10,
    maxWidth: '100%',
  },
});
export default RVSiteListScreen;
