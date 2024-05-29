import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import sampleRVSiteData from '../../assets/data/sampleRVSiteData.js';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import FixedButton from '../../components/FixedButton.js';
import RequestLocation from '../../components/RequestLocation.js';
import RequestAddress from '../../components/RequestAddress.js';

const RVSiteMapScreen = () => {

  const route = useRoute();
  const navigation = useNavigation();
  const { siteData } = route.params || {};
  const userName = "Unverified user";

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  
  useEffect(() => {
    RequestLocation(location, setLocation, setLocationError);
  }, []);

  useEffect(() => {
    if (location) {
      const latitudeDelta = 50 / 69; // 50 miles
      const longitudeDelta = 50 / (69 * Math.cos(location[0] * Math.PI / 180)); // Adjust for latitude

      setRegion({
        latitude: location[0],
        longitude: location[1],
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      });
    
    }
  }, [location]);

  useEffect(() => {
    console.log("REGION",region);
  }, [region]);

  const goToRVSiteScreen = (rvItem) => {
    navigation.navigate('RVSiteScreen', { rvItem: rvItem, userName: userName });
  }

  const goToHomeScreen = () => {
    navigation.navigate('HomeScreen');
  }

  const goToRVSiteListScreen = () => {
    navigation.navigate('RVSiteListScreen');
  };

  const handleRequestLocation = () => {
    setLoading(true); 
    RequestLocation(setLocation, setLocationError, () => {setLoading(false)
    });
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

      <Text style={styles.title}>Nearby RV Sites</Text>
                       
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
          {siteData && siteData.map((site) => (
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
      {location && (
          <Text>Your current location: {location}</Text>
        )}
        {location === null && (
          <Text>Fetching location...</Text>
        )}

        <View style={{flexDirection:'row'}}>
            <View style={styles.button}>
            <Button
              title="Get Location"
              onPress={handleRequestLocation}
            />
            </View>

          <View style={styles.button}>
            <Button
              title="Get Address"
              onPress={handleRequestAddress}
            />

          </View>

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
    marginTop: 15,
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
    background: '#D9D9D9',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
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