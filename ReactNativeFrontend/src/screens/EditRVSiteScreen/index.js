import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, StyleSheet, Button, TouchableOpacity, TextInput, Alert, ScrollView, ErrorMessage, FlatList, Modal } from 'react-native';
import { useRoute, useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FixedButton from '../../components/FixedButton.js';
import StarRating from '../../components/StarRating.js';
import YesNoButtons from '../../components/YesNoButtons.js';
import CellServiceDataList from '../../components/CellServiceDataList.js';
import NewCellServiceItem from '../../components/NewCellServiceItem.js';


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
  const [cellServiceView, setCellServiceView] = useState(null);
  const [newCellServiceView, setNewCellServiceView] = useState(false);
  
  useEffect(() => {
    if (item) {
      setEditedData(rvSite);
    }
  }, [rvSite]);

  const handleCellularDataChange = (index, newCellularData) => {
    const updatedCellService = [...editedData.CellService];
    updatedCellService[index] = newCellularData;
    setEditedData({ ...editedData, CellService: updatedCellService });
    toggleCellServiceView(false);
  };
  const toggleCellServiceView = (index) => {
    setCellServiceView(cellServiceView === index ? null : index);
  };

  const toggleNewCellServiceView =() => {
    setNewCellServiceView(!newCellServiceView);
  }

  const handleRatingChange= (value) => {
    setUserRating(value);
  }
  const saveComments = () => {
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
  const saveNewCarrier = (newCellServiceItem) => {
    if (newCellServiceItem.Carrier === '') {
      toggleNewCellServiceView(false);
      return;
    }
    setEditedData(prevData => ({
      ...prevData,
      CellService: [
        ...prevData.CellService,
        newCellServiceItem,
      ]
    }));
    toggleNewCellServiceView(false);
  }
  const deleteCellCarrierItem = (index) => {
    const updatedCellCarrierList = [...editedData.CellService];
    updatedCellCarrierList.splice(index, 1);
    setEditedData(prevData => ({
      ...prevData,
      CellService: updatedCellCarrierList
    }));
    toggleCellServiceView(false);
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
  const deleteRecreationItem = (index) => {
    const updatedRecList = [...editedData.Recreation];
    updatedRecList.splice(index, 1);
    setEditedData(prevData => ({
      ...prevData,
      Recreation: updatedRecList
    }));
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

    const handleConfirmUpdate = async () => {
      console.log("handle confirmed update to rv site");

      const toSend = JSON.stringify(siteDataToSend);
      console.log("SiteData TO Send;", toSend);
      try {
        const response = await fetch(`https://your-rv-copilot.uc.r.appspot.com/sites/${rvSite.id}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify(siteDataToSend),
        });
        if(!response.ok) {
          throw new Error(`Failed to update RV Site: ${response.status}`);
        }
        const result = await response.json();
        console.log('Update successful:', result);
      } catch (error) {
        console.log('Error updating item:', error);
      }
    }  

    Alert.alert(
      'Confirm new changes?',
      '',
      [{text: 'Yes', onPress: () => {
            console.log('Confirm save');
            handleConfirmUpdate();
            console.log(siteDataToSend);
          }
        },
        {text: 'No', onPress: () => {
            console.log('Go back');
          },
        }],
        {cancelable: false}
    ); 

    
  }; 

  return (
      <View style={styles.screenview}>

        <View style={styles.buttonContainer}>
        
              <FixedButton title="Back to Site" onPress={goToRVSiteScreen}/>
              <FixedButton title="Return Home" onPress={goToHomeScreen}/>

        </View>

        <View style={styles.container}>

          <Text style={styles.title}>Edit {rvSite.SiteName}</Text>

          <View style={{flex: 1, overflow:'hidden'}}>
              <ScrollView
                style={{paddingHorizontal: 10, borderRadius: 5, margin: 5, width: screenWidth * 0.9}}>

                  <View style={styles.fieldItem}>
                    <Text style={styles.textRVSite}>Description of site:</Text>
                      <View style={[styles.inputWrapper]}>
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

                    <View style={styles.fieldItem}>
        
                      <Text style={styles.textRVSite}>Cell Service at RV Site:</Text>
      
                      <CellServiceDataList
                        editedData={editedData}
                        cellServiceView={cellServiceView}
                        toggleCellServiceView={toggleCellServiceView}
                        handleCellularDataChange={handleCellularDataChange}
                        deleteCellCarrierItem={deleteCellCarrierItem}
                        styles={styles}
                      />
                    </View>

                    <View style={styles.fieldItem}>

                      <View style={{flexDirection: 'row'}}>
                          <Text style={styles.textRVSite}>Add new cell service:</Text>
                          <TouchableOpacity style={styles.addButtonContainer} onPress={toggleNewCellServiceView}>
                            <FontAwesome name="plus-circle" size={24} color="gray" />
                          </TouchableOpacity>

                          <Modal
                            animationType="slide"
                            transparent={true}
                            visible={newCellServiceView}
                            onRequestClose={() => {
                              setNewCellServiceView(false);
                            }}
                          >
                            <View style={styles.centeredView}>
                              <View style={styles.modalView}>
                                <NewCellServiceItem editedData={editedData} onSave={saveNewCarrier} />
                                  <TouchableOpacity style={styles.closeButton} onPress={toggleNewCellServiceView}>
                                      <Text style={styles.closeButtonText}>Close</Text>
                                  </TouchableOpacity>
                              </View>
                            </View>

                          </Modal>
                      </View>
                      
                      {newCellServiceView && 
                      <NewCellServiceItem
                        editedData={editedData}
                        onSave={saveNewCarrier}></NewCellServiceItem>}
                    </View>

                    <View style={styles.fieldItem}>
                        <Text style={styles.textRVSite}>Comments:</Text>
                        <View style={[styles.inputWrapper]}>
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
                    
                    <View style={styles.fieldItem}>
                        <Text style={styles.textRVSite}>How would you rate this RV site? </Text>
                        <StarRating defaultRating={userRating} maxRating={5} onRatingChange={handleRatingChange} icon="star" emptyIcon="star-o"/>
                    </View>

                    <View style={styles.fieldItem}>
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

                        <View style={[{flex:1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}, styles.item]}>
                            <Text style={[styles.textRVSite, {color: color='#F5F6E4'}]}>{item}
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
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity>
                            <Text
                              marginTop={40}
                              color='#899499'
                              title="Delete Site"
                              fontSize={8}
                              onPress = { () => {}} 
                            >Delete Site</Text>
                          </TouchableOpacity>
                    </View>       
                </ScrollView>    
            
          </View>
   
        </View>

        <View style={{margin:15}}>
            <Button 
              borderWidth= {2}
              borderColor= '#D9D9D9'
              boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
              borderRadius={10}
              color='#081516'
              title="Save Changes" 
              onPress = { () => {saveComments();}} 
            />
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
      fontSize: 24,
      padding: 10,
      marginTop: 15,
      color: '#9A7B5B'
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
    fieldItem: {
      flex: 1,
      padding: 5,
      marginVertical: 20
    },
    item: {
      backgroundColor: '#9A7B5B',
      padding: 5,
      marginVertical: 6,
      marginHorizontal: 6,
      borderRadius: 5,
    },
    textRVSite: {
      flex: 1,
      color:'#899499',
      fontSize: 16,
      padding: 5
    },
    deleteButtonX: {
      position: 'absolute',
      color: '#F5F6E4',
      top: 0,
      right: 0,
      padding: 5,
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
    inputWrapper: {
      marginVertical: 20,
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
      maxWidth: '80%',
      maxHeight: '60%',
    },
    closeButton: {
      marginVertical: 5,
    },
    closeButtonText: {
      color: 'gray',
    },
  });
      
  export default EditRVSiteScreen;