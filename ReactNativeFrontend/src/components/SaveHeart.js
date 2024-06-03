import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SaveHeart = ({ onSaveChange, size, userName }) => {

    const heartSize = size !== undefined ? size : 25

    const [selectedHeart, setSelectedHeart] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState('');

    const [isVisible, setIsVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const handleSavePress = () => {
        const newSelectedHeart = !selectedHeart;
        setSelectedHeart(newSelectedHeart);
        if (userName !== 'Anonymous') {
            setPopUpMessage(newSelectedHeart ? 'Trip added to saved!' : 'Trip removed from saved');
        }
        else {
            setPopUpMessage('Unable to update saved trips - user not logged in');
        }
        showPopup();
        onSaveChange(newSelectedHeart);
    }

    const showPopup = () => {
        setIsVisible(true);
        Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        }).start(() => {
        setTimeout(() => hidePopup(), 1000);
        });
    };

    const hidePopup = () => {
        Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        }).start(() => setIsVisible(false));
    };

    return [
        <View>
            <TouchableOpacity
                style={{marginHorizontal: 5}}
                onPress={() => handleSavePress()}>

                    {!selectedHeart ? 
                    <View key="heart-o-view-key">
                        <FontAwesome
                        name="heart-o" 
                        color="gray" 
                        size={heartSize}/> 
                
                    </View>
                    :
                    <View key="heart-view-key">
                        <FontAwesome
                        name="heart" 
                        color="gray" 
                        size={heartSize}/>
                    </View>
                    
                    }
                    {isVisible && (
                        <Animated.View style={[styles.popup, { opacity: fadeAnim }]}>
                        <Text style={styles.popupText}>{popUpMessage}</Text>
                        </Animated.View>
                    )}
                
            </TouchableOpacity>
        </View>
    ]

}

const styles = StyleSheet.create({
    popup: {
      position: 'absolute',
      bottom: 30, // Position above heart icon
      left: '50%',
      transform: [{ translateX: -75 }],
      width: 150,
      padding: 10,
      backgroundColor: '#000',
      borderRadius: 5,
      alignItems: 'center',
    },
    popupText: {
      color: '#fff',
    },
  });


export default SaveHeart;