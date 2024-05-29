import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ startRating, maxRating, onRatingChange, icon, emptyIcon, size }) => {
  const [userRating, setUserRating] = useState(startRating);

  const starSize = size != undefined ? size : 24

  const handleStarPress = (selectedRating) => {
    setUserRating(selectedRating);
    onRatingChange(selectedRating);
  };

  return (
    <View style={styles.container}>
      {[...Array(maxRating).keys()].map((index) => (
        <TouchableOpacity
        style={{marginHorizontal: 5}}
          key={index}
          onPress={() => handleStarPress(index + 1)}
        >
          <FontAwesome
            name={index < userRating ? icon : emptyIcon}
            size={starSize}
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

export default StarRating;
