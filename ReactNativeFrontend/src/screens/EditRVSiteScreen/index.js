import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, StyleSheet, Button, TouchableOpacity, TextInput, Alert, ScrollView, ErrorMessage, FlatList } from 'react-native';
import { useRoute, useNavigation} from '@react-navigation/native';
//import getCurrentDate from '../../utils/currentDate.js';  Not needed backend will apply to comment.

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
    CellService: false,
    PetsAllowed: false,
    Recreation: [],
    SiteRating: 0,
    Comments: []
  });

  const[newCellService, setCellService] = useState('');
  const[newComment, setNewComment] = useState('');
  const[newRating, setNewRating] = useState('');
  const[rating, setRating] = useState(0);
  const[recreationItem, setRecreationItem] = useState('');

  const [validationErrors, setValidationErrors] = useState({});
  
  useEffect(() => {
    if (item) {
      setEditedData(rvSite);
    }
  }, [rvSite]);

  const handleElectricAccess = (value) => {
    setEditedData(prevData => ({
      ...prevData,
      RVElectricAccess: value
    }));
  };

  const handleWaterAccess = (value) => {
    //console.log("handlewateraccess", value);
    setEditedData(prevData => ({
      ...prevData,
      WaterAccess: value
    }));
  }

  const handleWifiAccess = (value) => {
    setEditedData(prevData => ({
    ...prevData,
    WifiAccess: value
  }))
  }

  const handleCellService = (value) => {
    setEditedData(prevData => ({
      ...prevData,
      CellService: value
    }));
  }

  const handlePetsAllowed = (value) => {
    setEditedData(prevData => ({
      ...prevData,
      PetsAllowed: value
    }));
  }

  const handleSiteRating= (value) => {
    setEditedData(prevData => ({
      ...prevData,
      SiteRating: value
    }));
  }

  const saveComments = () => {
    console.log("New Comment", newComment);
    if (newComment === '') {
      return;
    }
    setEditedData(prevData => ({
      ...prevData,
      Comments: [
        ...prevData.Comments, {
          comment: newComment,
        //User name needs to be filled in
        user: "A User Name", 
        rating: rating
        }]
      })
    );
    console.log("Saved comments",editedData)
    setNewComment('');
    handleSaveChanges();
  }

  const addRecreationItem = () => {
    console.log("recreation item", recreationItem);
    if (recreationItem == '') {
      return;
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

  const deleteRecreationItem = (index) => {
    const updatedRecList = [...editedData.Recreation];
    updatedRecList.splice(index, 1);
    setEditedData(prevData => ({
      ...prevData,
      Recreation: updatedRecList
    }))
  }
  const handleInputChange = (key, value) => {
    
    setEditedData(prevData => ({
      ...prevData,
      [key]: value
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


    const handleConfirmChanges = () => {

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
        }]
    ); 
    console.log('Edited data:', editedData);

    const jsonSiteData = JSON.stringify(siteDataToSend);


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
                          maxLength={500}
                          multiline= {true}
                          onChangeText={text => handleInputChange('SiteDescription', text)}
                        />
                    </View>
                      {validationErrors.SiteDescription && (
                        <Text style={{ color: 'red' }}>{validationErrors.SiteDescription}</Text>
                      )}

                    <Text style={styles.textRVSite}>Electric Access for RV:</Text>
                      <View style={[styles.radioGroup, { flexDirection: 'row' }]}>
                        <TouchableOpacity
                          style={[styles.radioButton, editedData.RVElectricAccess === true && styles.radioButtonSelected]}
                          onPress={() => handleElectricAccess(true)}
                        >
                          <Text> Yes </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.radioButton, editedData.RVElectricAccess === false && styles.radioButtonSelected]}
                          onPress={() => handleElectricAccess(false)}
                        >
                          <Text> No </Text>
                        </TouchableOpacity>

                      </View>

                      <Text style={styles.textRVSite}>Water Access for RV:</Text>
                      <View style={[styles.radioGroup, { flexDirection: 'row' }]}>
                        <TouchableOpacity
                          style={[styles.radioButton, editedData.WaterAccess === true && styles.radioButtonSelected]}
                          onPress={() => handleWaterAccess(true)}
                        >
                          <Text> Yes </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.radioButton, editedData.WaterAccess === false && styles.radioButtonSelected]}
                          onPress={() => handleWaterAccess(false)}
                        >
                          <Text> No </Text>
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.textRVSite}>Wifi Access for RV:</Text>
                      <View style={[styles.radioGroup, { flexDirection: 'row' }]}>
                        <TouchableOpacity
                          style={[styles.radioButton, editedData.WifiAccess === true && styles.radioButtonSelected]}
                          onPress={() => handleWifiAccess(true)}
                        >
                          <Text> Yes </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.radioButton, editedData.WifiAccess === false && styles.radioButtonSelected]}
                          onPress={() => handleWifiAccess(false)}
                        >
                          <Text> No </Text>
                        </TouchableOpacity>
                        
                      </View>

                      <Text style={styles.textRVSite}>Cell Service for RV:</Text>
                      <View style={[styles.radioGroup, { flexDirection: 'row' }]}>
                        <TouchableOpacity
                          style={[styles.radioButton, editedData.CellService === true && styles.radioButtonSelected]}
                          onPress={() => handleCellService(true)}
                        >
                          <Text> Yes </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.radioButton, editedData.CellService === false && styles.radioButtonSelected]}
                          onPress={() => handleCellService(false)}
                        >
                          <Text> No </Text>
                        </TouchableOpacity>
                        
                      </View>

                      <Text style={styles.textRVSite}>Pets Allowed at Site:</Text>
                      <View style={[styles.radioGroup, { flexDirection: 'row' }]}>
                        <TouchableOpacity
                          style={[styles.radioButton, editedData.PetsAllowed === true && styles.radioButtonSelected]}
                          onPress={() => handlePetsAllowed(true)}
                        >
                          <Text> Yes </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.radioButton, editedData.PetsAllowed === false && styles.radioButtonSelected]}
                          onPress={() => handlePetsAllowed(false)}
                        >
                          <Text> No </Text>
                        </TouchableOpacity>
                        
                      </View>

                    <View>
                        <Text style={styles.textRVSite}>Comments:</Text>
                        <View style={[styles.commentInputWrapper]}>
                          <TextInput
                              placeholder="Additional Comments Here!"
                              style={{color: '#333333', width: 280}}
                              value={newComment}
                              maxLength={500}
                              multiline= {true}
                              onChangeText={text => setNewComment(text)} 
                          />
                          
                        </View>
                        
                    </View>
                    
                    <View>
                      <Text>XX</Text>
                      
                  
                    </View>

                    <View>
                        <Text style={styles.textRVSite}>Recreationad activities:</Text>
                        <View style={[styles.recreationInputWrapper]}>
                          <TextInput
                              placeholder="Additional recreation here"
                              style={{color: '#333333', width: 280}}
                              value={recreationItem}
                              maxLength={30}
                              onChangeText={text => setRecreationItem(text)}
                            />
                        </View>
                    </View>
                    
                        <Button title="Add New Recreation" onPress={addRecreationItem} />
                        <FlatList
                          numColumns={2}
                          data={editedData.Recreation}
                          renderItem={({ item, index }) => 
                            <View style={[{flex:1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}, styles.itemBox]}>
                                <Text style={styles.textRVSite}>{item}</Text>
                                <TouchableOpacity
                                  onPress={() => deleteRecreationItem(index)}>
                                    <Text style={styles.deleteButtonX}>X</Text>
                                </TouchableOpacity>
                            </View>}
                          
                          keyExtractor={(item, index) => index.toString()}
                          scrollEnabled={false}
                          
                        />         
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
    radioButton: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginHorizontal: 10,
      marginBottom: 5,
    },
    radioButtonSelected: {
      backgroundColor: '#7CCD7C',
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
    recreationInputWrapper: {
      width: 300,
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 5,
    }
  });
      
  export default EditRVSiteScreen;