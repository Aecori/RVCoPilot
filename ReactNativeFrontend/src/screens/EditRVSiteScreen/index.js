import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditRVSiteScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',} }>
      <Text>Edit RV SITE</Text>
    
    </View>
  );
};

export default EditRVSiteScreen;