import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SignalRating = ({ startRating, maxRating, onRatingChange, icon, emptyIcon }) => {
  const [userRating, setUserRating] = useState(startRating);

  const handleSignalPress = (selectedRating) => {
    setUserRating(selectedRating);
    onRatingChange(selectedRating);
  };

  return (
    <View style={styles.container}>
      {[...Array(maxRating).keys()].map((index) => (
        <TouchableOpacity
          style={{marginHorizontal: 5}}
          key={index}
          onPress={() => handleSignalPress(index + 1)}
        >
          <FontAwesome
            name={index < userRating ? icon : emptyIcon}
            size={24}
            color={index < userRating ? '#d69e02' : '#CCCCCC'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SignalRating;