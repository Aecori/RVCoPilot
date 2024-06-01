import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import FixedButton from '../../components/FixedButton.js';
import RequestLocation from '../../components/RequestLocation.js';
import RequestAddress from '../../components/RequestAddress.js';
import DistanceDropdown from '../../components/DistanceDropdown.js';

const RVSiteMapScreen = () => {

  const route = useRoute();
  const navigation = useNavigation();
  const { siteData } = route.params || {};
  const userName = "Anonymous";

  const [screenState, setScreenState] = useState({
    siteDataMap: siteData || null,
    loading: true,
    error: null,
    }
  )

  const { siteDataMap, loading, error } = screenState;

  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    RequestLocation(setLocation, setLocationError, setLoadingLocation);
  }, [distanceSelected]);

  const [initialRegion, setInitialRegion] = useState({
    // default initial region for map view
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  //Distance dropdown state
  const [distanceSelected, setDistanceSelected] = useState('');

  const handleDistanceChange = (value) => {
    setDistanceSelected(value);
  };

  useEffect(()=>{
    //console.log("SiteDataMap",screenState.siteDataMap);
  }, [siteDataMap]);

  // Update screen state when user changes location or distance to view

  useEffect(() => {
    if (location) {
      console.log("There is location", location);
      if (!distanceSelected) {
        //if user selects 'Search All' - widen map view
        setDistanceSelected(5000);
      }
      const latitudeDelta = distanceSelected / 69;
      const longitudeDelta = distanceSelected / (69 * Math.cos(location[0] * Math.PI / 180)); // Adjust for latitude

      setRegion({
        latitude: location[0],
        longitude: location[1],
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      });

      setInitialRegion({
        latitude: location[0],
        longitude: location[1],
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      });
    
    }
  }, [location, distanceSelected]);

  // Get RV sites to view in map as markers based on distance selected

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
        setScreenState({ siteDataMap: data, loading: false, error: null });
      } else {
        throw new Error('Response format not JSON');
      }
    } catch (error) {
      console.log("Error logging site JSON, using last available RV Site data");
      setScreenState({ siteDataMap: siteData, loading: false, error: error.message });
    }
  };

   useEffect(() => {
      fetchData();
  }, [distanceSelected]);

   // Navigation functions to other screens
  const goToRVSiteScreen = (rvItem) => {
    navigation.navigate('RVSiteScreen', { rvItem: rvItem, userName: userName });
  }

  const goToHomeScreen = () => {
    navigation.navigate('HomeScreen');
  }

  const goToRVSiteListScreen = () => {
    navigation.navigate('RVSiteListScreen', {distanceFromMapView: distanceSelected});
  };

  const handleRequestLocation = () => {
    RequestLocation(setLocation, setLocationError, setLoadingLocation);
  }

  const handleRequestAddress = () => {
    RequestAddress(location[0], location[1]);
  }
  
  return (
    <View style={styles.screenview}>
      
      
      <View style={styles.buttonContainer}>
          <FixedButton title="View as List" onPress={goToRVSiteListScreen}/>
          <FixedButton title="Return Home" onPress={goToHomeScreen}/>
      </View>

      

      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>

          <View style={styles.distanceAttributeContainer}>

            <Text style={styles.title}>Nearby RV Sites</Text>
            <DistanceDropdown 
              onSave={handleDistanceChange} />
            {locationError && (
              <Text
                style={{color:'black', fontSize: 14}}>*(Unable to get current location, using default coordinates)</Text>
            )}
          </View>
                
          <View style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              initialRegion={region}
              region={region}
              showsMyLocationButton={true}
              showsCompass={true}
              scrollDuringRotateOrZoomEnabled={false}
              >
                {siteDataMap && siteDataMap.map((site) => (
                    <Marker
                      key={site.id}
                      coordinate={{ latitude: site.SiteLatitude, longitude: site.SiteLongitude }}
                      title={site.SiteName}
                      onPress={() => goToRVSiteScreen(site)}
                    />
                ))}

                {location && (
                  <Marker
                    coordinate={{
                      latitude: location[0],
                      longitude: location[1],
                    }}
                    title="User Location"
                    pinColor="blue"
                  />
                )}
            </MapView>
          </View>

          <View style={{alignItems: 'center', marginTop: 10}}>
              {location && (
                  <Text>Your current location (coordinates): {location}</Text>
                )}

                {loadingLocation && (
                  <Text>Fetching location...</Text>
                )}

                {error && (
                <Text>Error: {error}</Text>
                )}
          </View>

            
          <View style={{alignContents: 'center',marginBottom: 20}}>
              <View style={styles.button}>
                <Button
                  title="Refresh Location"
                  onPress={handleRequestLocation}
              />
              </View>

              {/*<View style={styles.button}>
                <Button
                  title=" Address"
                  onPress={handleRequestAddress}
                />
              </View>*/}
          </View>
        </ScrollView>
      </View> 
      
    </View> 
  );
};


const styles = StyleSheet.create({
  screenview: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#6CA3AA',
    overflow: 'scroll'
  },
  scrollContent: {
    flexGrow: 1,
    marginTop: 10, 
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    padding: 5,
    marginTop: 10,
    color: '#F5F6E4'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
    backgroundColor: '#3e4272',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  textRVSite: {
    color:'#ecd9c4',
    fontSize: 16,
    padding: 5
  },
  contentContainer: {
    marginTop: 70,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '90%'
  },
  container: {
    flex: 1,
    boxSizing: 'border-box',
    width: '90%',
    aspectRatio: 0.7,
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    padding: 5,
    background: '#D9D9D9',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center'
  },
  distanceAttributeContainer: {
    alignItems: 'center',
    marginVertical: 10,
    maxWidth: '100%',
  },
  homeButton: {
    width: 126,
    height: 35,
    backgroundColor: 'white',
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
});
export default RVSiteMapScreen;