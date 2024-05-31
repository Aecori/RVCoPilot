import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Modal,  Alert, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import RequestAddress from '../../components/RequestAddress.js';
import FixedButton from '../../components/FixedButton.js';
import CommentModal from '../../components/CommentModal.js';
import SaveHeart from '../../components/SaveHeart.js';

function RVSiteScreen () {

  const route = useRoute();
  const navigation = useNavigation();
  const { rvItem } = route.params || {};

  const [siteData, setSiteData] = useState(rvItem);

  // User interactive screen navigation functions

  const goToRVSiteListScreen = useCallback(() => {
    navigation.navigate('RVSiteListScreen');
  },[navigation, siteData]);

  const goToHomeScreen = useCallback(() => {
      navigation.navigate('HomeScreen');
    }, [navigation, siteData]);

  const goToEditRVSiteScreen = useCallback((rvItem) => {
    navigation.navigate('EditRVSiteScreen',{ rvItem: rvItem });
  },[navigation, siteData]);

  // Update RV Site Screen after changes saved in EditRVSiteScreen

  useEffect(() => {
    if (route.params?.rvItem) {
      setSiteData(rvItem);
    }
  }, [route.params?.rvItem]);

  // Fetch address to display with other backend provided RVSite fields

  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchAddress = async () => {
      const addr = await RequestAddress(siteData.SiteLatitude, siteData.SiteLongitude);
      setAddress(addr);
    };
    fetchAddress();
  }, [siteData.SiteLatitude, siteData.SiteLongitude]);

  // Manage changes to Saved Trips

  const handleSaveTripChange = (value) => {
    if (value) {
      // TODO: API request with id to add site
      console.log("Save trip value is ", value, "need to update this function to add site id to saved trips screen is created")
    } else {
      // TODO: API request with id to remove site
      console.log("Save trip value is ", value, "need to update this function to remove from saved trips screen when screen created")
    }
    console.log("Site id: ", siteData.id);
  }

  // Manage Loading Comments

  const [displayedComments, setDisplayedComments] = useState(3); 
  const [totalComments, setTotalComments] = useState(siteData.Comments.length);

  const handleLoadMoreComments = () => {
    const additionalComments = 3;
    const newDisplayedComments = Math.min(displayedComments + additionalComments, totalComments);
    setDisplayedComments(newDisplayedComments);
  };

  // Manage Updates to Comments

  const [newComment, setNewComment] = useState({
    // TODO: Get UserName. 
    Username: "Anonymous",
    Comment: '',
    Rating: '',
  });
  
  const [commentView, setCommentView] = useState(false);

  const toggleAddCommentView = () => {
    setCommentView(!commentView);
  }
  
  const saveNewComment = (comment, rating) => {
    if (comment ==='' || rating === '') {
      setCommentView(false);
      return;
    }
    console.log("This is comment, rating from component", comment, rating);

    const updatedComment = {
      ...newComment,
      "Comment": comment,
      "Rating": rating
    }

    console.log("Newcomment", updatedComment);

    Alert.alert(
      'Confirm save?',
      '',
      [{text: 'Yes', onPress: () => {
            console.log('Confirm save');
            handleConfirmSave(updatedComment);
          }
        },
        {text: 'No', onPress: () => {
            console.log('Go back');
          },
        }],
        {cancelable: false}
    ); 
    setCommentView(false);
  }

  const handleConfirmSave = async (commentToSave) => {
   
    try {
      const dataToSend = JSON.stringify(commentToSave);
      console.log("dataToSend",dataToSend);
      const response = await fetch(`https://your-rv-copilot.uc.r.appspot.com/sites/${siteData.id}/comments`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, 
        body: dataToSend,
      });
      if(!response.ok) {
        throw new Error(`Failed to add user comment RV Site: ${response.status}`);
      }
      const result = await response.json();
      console.log('Comment update successful:', result);

      const updatedDataResponse = await fetch(`https://your-rv-copilot.uc.r.appspot.com/sites/${siteData.id}`, {
        headers: {
          Accept: 'application/json'
        }
      });

      if (!updatedDataResponse.ok) {
          throw new Error(`Failed to fetch updated RV Site data with new comment: ${updatedDataResponse.status}`);
      }
      const updatedSite = await updatedDataResponse.json();
      console.log("Updated Site:", updatedSite);
      setSiteData(updatedSite);
      setTotalComments(updatedSite.Comments.length);
      setDisplayedComments(Math.min(displayedComments + 1, updatedSite.Comments.length));

    } catch (error) {
      console.log('Error updating item with comment:', error);
    }
  }  

  return (

    <View style={styles.screenview}>

      <View style={styles.buttonContainer}>      
          <FixedButton title="RV Site List" onPress={goToRVSiteListScreen}/>
          <FixedButton title="Return Home" onPress={goToHomeScreen}/>
      </View>
    
      <View style={styles.container}>

        <View 
          style={styles.titleContainer}>
            <Text numberOfLines={2} style={[styles.title, {flexShrink: 1}]}>{siteData.SiteName}</Text>
            <SaveHeart
              style={{ position: 'absolute', right: 10 }}
              onSaveChange={handleSaveTripChange}/>
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
                  <Text style={styles.textRVSiteIndent}>(No known carriers with service)</Text>
                )
              ) : (
                <Text style={styles.textRVSite}>Data Not Available</Text>
              )}
            </View>

            <View style={styles.item}>
              <Text style={styles.textRVSite}>Recreation:</Text>{siteData.Recreation !== undefined ? (
                siteData.Recreation.map((recreationItem, index) => 
                <View key={index}>
                  <Text 
                    style={styles.textRVSiteIndent} 
                    key={index}>
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
              {siteData.Comments !== undefined && siteData.Comments.length > 0 ? (
                siteData.Comments.slice(0,displayedComments).map((comment, index) => (
                  <View 
                    style={[styles.textRVSiteIndent, {flexDirection:'row' }]} 
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
                <Text style={styles.textRVSiteIndent}>(Not Available)</Text>
              )}
              {displayedComments < totalComments && (
                <TouchableOpacity onPress={handleLoadMoreComments}>
                  <Text style={{ color: '#9A7B5B', marginLeft: 20, marginVertical: 15 }}>Load More</Text>
                </TouchableOpacity>
              )}
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={commentView}
              onRequestClose={() => {
                ()=> setCommentView(false);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <CommentModal 
                    isOpen={commentView}
                    onRequestClose={()=> setCommentView(false)}
                    initialComment={newComment}
                    onSave={saveNewComment} />
                  </View>
              </View>

            </Modal>

          </ScrollView>


      </View>

      <View style={{flexDirection:'row', marginBottom:20}}>
        <View style={{margin:20}}>
              <Button 
                color='#081516'
                title="Add Comment" 
                onPress={() => toggleAddCommentView()} 
              />
        </View>

        <View style={{margin:20}}>
              <Button 
                color='#081516'
                title="Update RV Site Info" 
                onPress={() => goToEditRVSiteScreen(rvItem)} 
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
  titleContainer: {
    flexDirection: "row", 
    backgroundColor: '#FFFFFF', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingRight: 20
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
  textRVSiteIndent: {
    marginLeft: 20,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    alignSelf: 'center', 
    maxWidth: '85%',
    maxHeight: '65%',
  },
  closeButton: {
    marginVertical: 5,
  },
  closeButtonText: {
    color: 'gray',
  },
  
});
    
export default RVSiteScreen;