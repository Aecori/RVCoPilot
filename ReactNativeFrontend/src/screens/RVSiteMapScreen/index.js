import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import sampleRVSiteData from '../../assets/data/sampleRVSiteData.js';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';



const RVSiteMapScreen = () => {

  const route = useRoute();
  const navigation = useNavigation();
  const { siteData } = route.params || {};
  //const siteData=sampleRVSiteData;
  //console.log("SiteData on Map View Screen", siteData);
  const userName = "Unverified user";

  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [mapSiteData, setMapSiteData] = useState(null);

  const goToRVSiteScreen = (item) => {
    navigation.navigate('RVSiteScreen', { item: item, userName: userName });
  }

  const goToHomeScreen = () => {
    navigation.navigate('HomeScreen');
  }

  const goToRVSiteListScreen = () => {
    navigation.navigate('RVSiteListScreen');
  };

  const requestLocation = () => {
    Geolocation.getCurrentPosition(info => {
      if (info) {
          setLocation([info.coords.latitude, info.coords.longitude]);
          console.log("Location", [info.coords.latitude, info.coords.longitude]);
      } error => {
        console.error("Error getting location:", error);
        setLocationError(error.message);
      }
  });
  }

  if (!location) {
    requestLocation();
  }
  
  return (
    <View style={styles.screenview}>
      
      <View style={styles.buttonContainer}>
          
          <TouchableOpacity style={[styles.homeButton] } onPress={goToRVSiteListScreen}>
              <Text>View as List</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeButton } onPress={goToHomeScreen}>
              <Text>Return Home</Text>
          </TouchableOpacity>

      </View>

      <Text style={styles.title}>Nearby RV Sites</Text>
                       
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          {siteData && siteData.map((site) => (
          <Marker
            key={site.id}
            coordinate={{ latitude: site.SiteLatitude, longitude: site.SiteLongitude }}
            title={site.SiteName}
            onPress={() => goToRVSiteScreen(site)}
          />
        ))}
        </MapView>
      </View>

      <View style={styles.button}>
        <Button
          disabled={loading}
          title="Get Location"
          onPress={requestLocation}
        />

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
});
export default RVSiteMapScreen;