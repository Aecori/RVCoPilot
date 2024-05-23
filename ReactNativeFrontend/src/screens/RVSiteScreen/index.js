import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome.js';
import RequestAddress from '../../components/RequestAddress.js';
import FixedButton from '../../components/FixedButton.js';

function RVSiteScreen () {

  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params || {};
  console.log("Item on RV Screen", item);

  const siteData = item;

  if (!siteData) {
    return <ErrorMessage message="RV site data is not available." />;
  };

  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchAddress = async () => {
      const addr = await RequestAddress(siteData.SiteLatitude, siteData.SiteLongitude);
      setAddress(addr);
    };
    fetchAddress();
  }, [siteData.SiteLatitude, siteData.SiteLongitude]);
  

  const goToRVSiteListScreen = () => {
    navigation.navigate('RVSiteListScreen');
  };

  const goToHomeScreen = () => {
    navigation.navigate('HomeScreen');
  }

  const goToEditRVSiteScreen = (item) => {
    navigation.navigate('EditRVSiteScreen',{ item: item });
  }

  return (

    <View style={styles.screenview}>

      <View style={styles.buttonContainer}>      
          <FixedButton title="RV Site List" onPress={goToRVSiteListScreen}/>
          <FixedButton title="Return Home" onPress={goToHomeScreen}/>
      </View>
    
      <View style={styles.container}>

        <View style={{flexDirection: "row", backgroundColor: '#FFFFFF'}}>
          <Text style={styles.title}>{siteData.SiteName}</Text>

          {/* TODO - SAVE/LIKE BUTTON */}
          <Icon name="heart-o" color="gray" size={20}></Icon>
        </View>


          <ScrollView style={{paddingHorizontal: 20, flex:1}}>
            
            <View style={styles.item}>
              <Text style={styles.textRVSite}>Site Id: {siteData.id} </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.textRVSite}>Site Description: {siteData.SiteDescription !== '' ? siteData.SiteDescription : '(Not available)'} </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.textRVSite}>Coordinates: {siteData.SiteLatitude}, {siteData.SiteLongitude} </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.textRVSite}>Region: {address} </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.textRVSite}>RV Electric Access: {siteData.RVElectricAccess !== undefined ? (siteData.RVElectricAccess ? 'Yes' : 'No') : 'Data Not Available'}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.textRVSite}>Water Access: {siteData.WaterAccess !== undefined ? (siteData.WaterAccess ? 'Yes' : 'No') : 'Data Not Available'}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.textRVSite}>Wifi Access: {siteData.WifiAccess !== undefined ? (siteData.WifeAccess ? 'Yes' : 'No') : 'Data Not Available'}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.textRVSite}>Pets Allowed: {siteData.PetsAllowed !== undefined ? (siteData.PetsAllowed ? 'Yes' : 'No') : 'Data Not Available'}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.textRVSite}>Cell Service:</Text>
              {siteData.CellService !== undefined ? (
                siteData.CellService.length > 0 ? (
                  siteData.CellService.map((carrier, index) => {
                    if (carrier && carrier.Signal) {
                      return (
                        <View key={index} style={[styles.carrierRow, { marginLeft: 20 }]}>
                        <Text style={styles.carrierText}>
                          {carrier.Carrier} 
                        </Text>
                        {carrier.SignalStrength !== undefined && (
                          <Text style={styles.carrierText}>
                            {carrier.SignalStrength} (bars)
                          </Text>
                        )}
                      </View>
                      );
                    }
                  })
                ) : (
                  <Text style={[styles.textRVSite,{marginLeft:20}]}>(No known carriers with service)</Text>
                )
              ) : (
                <Text style={styles.textRVSite}>Data Not Available</Text>
              )}
            </View>

            <View style={styles.item}>
              <Text style={styles.textRVSite}>Recreation:</Text>{siteData.Recreation !== undefined ? (
                siteData.Recreation.map((recreationItem, index) => 
                <View key={index}>
                  <Text style={[styles.textRVSite, { marginLeft: 20 }]} key={index}>
                    {recreationItem}
                  </Text>
                </View>))
             : <Text>'Data Not Available'</Text>
            }
            </View>

            <View style={styles.item}>
              <Text style={styles.textRVSite}>Site Rating: {siteData.SiteRating === null || siteData.SiteRating === 0 ? '(Not available)' : siteData.SiteRating}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.textRVSite}>User Comments:</Text>
              {siteData.Comments !== undefined ? (
                siteData.Comments.map((comment, index) => (
                  <View 
                    style={[styles.textRVSite, { marginLeft: 20, flexDirection:'row' }]} 
                    key={index}>
                      <Text style={styles.textRVSite}>
                        {comment.Username}:
                      </Text>
                      <Text style={styles.textRVSiteComment}>
                          {comment.Comment}
                      </Text>
                  </View>
                ))
              ) : (
                <Text>Data Not Available</Text>
              )}
            </View>

          </ScrollView>


      </View>

      <View style={{flexDirection:'row', marginBottom:20}}>
        <View style={{margin:20}}>
              <Button 
                fontStyle='bold'
                color='#081516'
                title="Add Comment" 
                onPress={() => addComment(item)} 
              />
        </View>

        <View style={{margin:20}}>
              <Button 
                fontStyle='bold'
                color='#081516'
                title="Update RV Site Info" 
                onPress={() => goToEditRVSiteScreen(item)} 
              />
        </View>

      </View>
    
    </View>
    );
  }

const styles = StyleSheet.create({
  screenview: {
    flex: 1,
    backgroundColor: '#6CA3AA'
  },
  title: {
    fontSize: 22,
    padding: 10,
    marginTop: 15,
    color: '#9A7B5B',
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
  container: {
    flex: 1,
    padding: 5,
    marginTop: 100, 
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  textRVSite: {
    color:'#899499',
    fontSize: 16,
    flexWrap: 'wrap',
  },
  textRVSiteComment: {
    fontStyle: 'italic',
    marginLeft: 10,
    color:'#97AFA9',
    fontSize: 16
  },
  carrierText: {
    marginRight: 10,
    color:'#97AFA9',
    fontSize: 16
  },
  textButton: {
    color: '#7CC2D1',
  },
  middleBottom: {
    position: 'absoulte', 
    bottom: 5
  },
  carrierRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
});
    
export default RVSiteScreen;