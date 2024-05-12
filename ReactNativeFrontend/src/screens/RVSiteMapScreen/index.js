import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import sampleRVSiteData from '../../assets/data/sampleRVSiteData.js';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';


const RVSiteMapScreen = () => {


  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const navigation = useNavigation();
  const userName = "Unverified user"

  const siteData=sampleRVSiteData;
  console.log(sampleRVSiteData);

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
    Geolocation.getCurrentPosition(info => console.log(info));
  }
  
  return (
    <View style={{flex:1, backgroundColor: '#3e4272', alignItems: 'center'}}>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, marginTop: 10}}>
          
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
          {siteData.map((site) => (
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
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
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
    width: '90%',
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
export default RVSiteMapScreen;