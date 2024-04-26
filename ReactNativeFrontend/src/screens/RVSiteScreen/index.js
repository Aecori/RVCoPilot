import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function RVSiteScreen ({route}) {

    const navigation = useNavigation();

    const { item } = route.params;
    const siteData  = Object.entries(item).map(([key, value]) => ({key,value}));

    if (!siteData) {
      console.error("Item is not defined");
      return null;
    }
  
    //console.log("Inside individual RV Site screen", item);

    const goToRVSiteListScreen = () => {
      navigation.navigate('RVSiteListScreen');
    };

    const goToHomeScreen = () => {
      navigation.navigate('HomeScreen');
    }

    const goToEditRVSiteScreen = () => {
      navigation.navigate('EditRVSiteScreen');
    }

    const formatKey = (str) => {
      //Uppercase first letter
      str = str.charAt(0).toUpperCase() + str.slice(1);
      return str;
    };

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Text>RV Site: </Text>
    
        <TouchableOpacity style={[styles.homeButton, styles.topLeft] } onPress={goToRVSiteListScreen}>
            <Text>Back to List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.homeButton, styles.topRight] } onPress={goToHomeScreen}>
            <Text>Return Home</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <FlatList
          data={siteData}
          renderItem={ ( {item} ) => (
            <View style={styles.item}>
              <Text style={styles.key}>{ formatKey(item.key)}:</Text>
              <Text style={styles.value}>{typeof item.value === "object" ? JSON.stringify(item.value) : item.value}</Text>
            </View>
              )
            }
            keyExtractor={(item, index) => {
              return `${item.key}-${index}`;
            }}
          />

      
      </View>
        
        <Button title="Edit RV Site" onPress={goToEditRVSiteScreen} />
        
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      backgroundColor: '#EDEDED',
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 5,
    },
    title: {
      fontSize: 18,
    },
    container: {
      boxSizing: 'border-box',
      width: '85%',
      aspectRatio: .8,
      alignItems: 'center',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      padding: 5,
      background: '#D9D9D9',
      borderWidth: 1,
      borderColor: '#AFAFAF',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      borderRadius: 10,
    },
  
    homeButton: {
      width: 126,
      height: 40,
      backgroundColor: '#D9D9D9',
      borderWidth: 1,
      borderColor: '#AFAFAF',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
  
    buttonText: {
      fontFamily: 'MarkoOne-Regular',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 32,
      textAlign: 'center',
      color: '#000000',
    },
    justifyCenter: {
      justifyContent: 'center'
    },
    topLeft: {
      position: 'absolute', 
      top: 5, 
      left: 20,
    },
    topRight: {
      position: 'absolute', 
      top: 5, 
      right: 20,
    },
    middleBottom: {
      position: 'absoulte', 
      bottom: 5
    }
  });
      
  export default RVSiteScreen;