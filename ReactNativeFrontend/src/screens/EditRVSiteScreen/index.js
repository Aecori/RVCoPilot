import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, StyleSheet, Button, TouchableOpacity, TextInput, Alert, ScrollView, ErrorMessage, FlatList } from 'react-native';
import { useRoute, useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StarRating from '../../components/StarRating.js';
import CellularDataInput from '../../components/CellularDataInput.js';
import YesNoButtons from '../../components/YesNoButtons.js';

function EditRVSiteScreen() {

  const screenWidth  = Dimensions.get('window').width;

  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params || {}; 

  const rvSite = item;

  if (!rvSite) {
    return <ErrorMessage message="RV site data is not available." />;
  }

  const goToRVSiteScreen = () => {
    navigation.goBack();
  }

  const goToHomeScreen = () => {
    navigation.navigate('HomeScreen');
  }

  const [editedData, setEditedData] = useState({
    // RV site attributes available to user to edit
    SiteDescription: '',
    SiteType: '',
    RVElectricAccess: false,
    WaterAccess: false,
    WifiAccess: false,
    CellService: [],
    PetsAllowed: false,
    Recreation: [],
    SiteRating: 0,
    Comments: []
  });

  const[newComment, setNewComment] = useState('');
  const[userRating, setUserRating] = useState(0);
  const[recreationItem, setRecreationItem] = useState('');

  const [activePanel, setActivePanel] = useState(null);
  
  useEffect(() => {
    if (item) {
      setEditedData(rvSite);
    }
  }, [rvSite]);

  const handleCellularDataChange = (index, newCellularData) => {
    const updatedCellService = [...editedData.CellService];
    updatedCellService[index] = newCellularData;
    setEditedData({ ...editedData, CellService: updatedCellService });
  };
  const togglePanel = (index) => {
    setActivePanel(activePanel === index ? null : index);
  };
  const handleRatingChange= (value) => {
    setUserRating(value);
  }

  const saveComments = () => {
    console.log("New Comment", newComment);

    // Ensure no new comments added if no comment or rating information provided by user
    if (newComment === '' && userRating === 0) {
      handleSaveChanges();
    }

    else {
      setEditedData(prevData => ({
        ...prevData,
        Comments: [
          // check if comments initialized properly
          ...(prevData.Comments || []), {
            comment: newComment,
          //TODO: User name needs to be filled in
          Username: "A User Name", 
          Rating: userRating,
          }]
        })
      );
      //console.log("Saved comments",editedData)
      setNewComment('');
      handleSaveChanges();
    }
    
  }
  const addRecreationItem = () => {
    if (recreationItem == '') {
      return;
    }
    if (editedData.Recreation.length > 20) {
      Alert.alert(
        'Recreation limit reached',
        '',
        [{text: 'Ok', onPress: () => {
            return;
            }
          },],
          {cancelable: false}
      ); 
    }
    setEditedData(prevData => ({
      ...prevData,
      Recreation: [
        ...prevData.Recreation, 
        recreationItem,
      ]
    }));
    setRecreationItem('');
  }

  const addCellServiceItem = () => {
    //TODO: Add Cell Service Item with Drop Down Menu for Carrier options when adding new Cell Service Item

  }
  const deleteRecreationItem = (index) => {
    const updatedRecList = [...editedData.Recreation];
    updatedRecList.splice(index, 1);
    setEditedData(prevData => ({
      ...prevData,
      Recreation: updatedRecList
    }))
  }
  const handleInputChange = (value, propertyName) => { 
    setEditedData(prevData => ({
      ...prevData,
      [propertyName]: value
    }));
  }
  const handleSaveChanges = () => {

    const siteDataToSend = {
        // Non editable and edited data to be sent to backend after user 'saves'
        SiteName: rvSite.SiteName,
        SiteRating: rvSite.SiteRating,
        SiteLatitude: rvSite.SiteLatitude,
        SiteLongitude: rvSite.SiteLongitude,
        ...editedData
    }

    const handleConfirmChanges = async () => {

        /*fetch('url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonSiteData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response from backend:', data);
    })
    .catch(error => {
      console.error('Error sending data to backend:', error);
    });*/

    }

    const jsonSiteData = JSON.stringify(siteDataToSend);

    Alert.alert(
      'Confirm new changes?',
      '',
      [{text: 'Yes', onPress: () => {
            console.log('Confirm save');
            console.log(siteDataToSend);
            
            //
          }
        },
        {text: 'No', onPress: () => {
            console.log('Go back');
            //
          },
        }],
        {cancelable: false}
    ); 

  }; 

  return (
      <View style={{flex:1, backgroundColor: '#3e4272'}}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, marginTop: 10}}>
        
          
              <TouchableOpacity style={[styles.homeButton] } onPress={goToRVSiteScreen}>
                  <Text>Back to Site</Text>
              </TouchableOpacity>
              

              <TouchableOpacity style={styles.homeButton } onPress={goToHomeScreen}>
                  <Text>Return Home</Text>
              </TouchableOpacity>

        </View>

        <View style={{  flex: 1, alignItems: 'center', overflow:'scroll' }}>

          <Text style={styles.title}>{rvSite.SiteName}</Text>

          <View style={{flex: 1, overflow:'hidden'}}>
              <ScrollView
                style={{paddingHorizontal: 20, backgroundColor: '#e0e0e1', borderRadius: 5, margin: 5, width: screenWidth * 0.9}}>

                    <Text style={styles.textRVSite}>Description of site:</Text>
                    <View style={[styles.descriptionInputWrapper]}>
                      <TextInput
                          placeholder="Description"
                          style={{color: '#333333', width: 280}}
                          value={editedData.SiteDescription}
                          maxLength={200}
                          multiline= {true}
                          onChangeText={text => setEditedData(prevData => ({
                            ...prevData,
                            SiteDescription: text
                          }))}
                        />
                    </View>

                    <YesNoButtons
                        label="Electric Access for RV:"
                        value={editedData.RVElectricAccess}
                        onSelect={(value) => handleInputChange(value, 'RVElectricAccess')}
                    />

                      <YesNoButtons
                        label="Water Access for RV:"
                        value={editedData.WaterAccess}
                        onSelect={(value) => handleInputChange(value, 'WaterAccess')}
                    />

                      <YesNoButtons
                        label="Wifi Access for RV:"
                        value={editedData.WifiAccess}
                        onSelect={(value) => handleInputChange(value, 'WifiAccess')}
                    />
                    
                      <YesNoButtons
                          label="Pets Allowed at Site:"
                          value={editedData.PetsAllowed}
                          onSelect={(value) => handleInputChange(value, 'PetsAllowed')}
                      />

                      <View style={{borderColor: "#ccc"}}>
                        <Text style={styles.textRVSite}>Cell Service Data:</Text>

                          <View>
                            {editedData.CellService && editedData.CellService.map((cellularData, index) => (
                              <View key={`${cellularData.id}-${index}`}>
                                <Button
                                  style={{fontSize: 16}}
                                  title={`Show ${cellularData.Carrier} Service Data`}
                                  onPress={() => togglePanel(index)}
                                  accessibilityLabel={`Show ${cellularData.Carrier} Service Data`}
                                />
                                {activePanel === index && (
                                  <CellularDataInput
                                    startCellularData={cellularData}
                                    onSave={(newCellularData) => handleCellularDataChange(index, newCellularData)}
                                  />
                                )}
                              </View>
                            ))}
                          </View>

                      </View>                     

                    <View>
                        <Text style={styles.textRVSite}>Comments:</Text>
                        <View style={[styles.commentInputWrapper]}>
                          <TextInput
                              placeholder="Additional Comments Here!"
                              style={{color: '#333333', width: 280}}
                              value={newComment}
                              maxLength={200}
                              multiline= {true}
                              onChangeText={text => setNewComment(text)} 
                          />
                        </View>
                    </View>
                    
                    <View style={[styles.textRVSite, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                        <Text>How would you rate this RV site? </Text>
                        <StarRating defaultRating={userRating} maxRating={5} onRatingChange={handleRatingChange} icon="star" emptyIcon="star-o"/>
                    </View>

                    <View style={{flex:1, marginVertical:20}}>
                      <Text style={styles.textRVSite}>Recreational activities:</Text>

                      <View style={styles.recreationInputWrapper}>
                        <TextInput
                          placeholder="Additional recreation here"
                          style={styles.textInput}
                          value={recreationItem}
                          maxLength={30}
                          onChangeText={(text) => setRecreationItem(text)}
                        />
                        <TouchableOpacity style={styles.addButtonContainer} onPress={addRecreationItem}>
                        <FontAwesome name="plus-circle" size={24} color="gray" />
                        </TouchableOpacity>
                        </View>
                    </View>
                                  
                    <View>
                      <FlatList
                        numColumns={2}
                        data={editedData.Recreation}
                        renderItem={({ item, index }) => 

                        <View style={[{flex:1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}, styles.itemBox]}>
                            <Text style={styles.textRVSite}>{item}
                            </Text>
                            <TouchableOpacity
                              onPress={() => deleteRecreationItem(index)}>
                                <FontAwesome
                                  name="times"
                                  size={15}
                                  style={styles.deleteButtonX}
                                />
                            </TouchableOpacity>
                        </View>}
                            
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={false}
                      />         
                    </View>
                        
                </ScrollView>    
            
          </View>

          <View style={{margin:15}}>
            <Button 
              title="Save Changes" 
              onPress = { () => {saveComments();}} 
            />
          </View>
             
        </View>

      </View>
    );
  }
  

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
      width: 40,
      marginHorizontal: 15,
    },
    deleteButtonX: {
      position: 'absolute',
      color: 'gray',
      top: 0,
      right: 0,
      padding: 5,
    },
    title: {
      fontSize: 22,
      padding: 10, 
      marginTop: 15,
      color: '#ecd9c4'
    },
    textRVSite: {
      flex: 1,
      color:'#899499',
      fontSize: 16,
      padding: 5
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 10,
      marginTop: 10,
      },
    gray: {
      color: '#A9A9A9',
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
      color: '#000000',
    },
    middleBottom: {
      position: 'absolute', 
      bottom: 5
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      width: '80%',
    },
    highlightedInput: {
      backgroundColor: 'yellow',
    },
    scrollContainer: {
      height: 100,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      marginBottom: 10,
      width: '80%',
    },
    descriptionInputWrapper: {
      width: 300,
      height: 120,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 5,
      
    },
    commentInputWrapper: {
      width: 300,
      height: 120,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 5,
    },

    addButtonContainer: {
      position: "absolute",
      top: 0,
      right: 0, 
      height: "100%", 
      justifyContent: "center", 
      paddingHorizontal: 10, 
    },
    recreationInputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      height: 40,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      paddingHorizontal: 10,
      position: "relative",
    },
    addButton: {
      color: "blue",
      size: 16
    }
  });
      
  export default EditRVSiteScreen;