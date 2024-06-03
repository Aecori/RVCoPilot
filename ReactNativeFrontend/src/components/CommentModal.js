import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import StarRating from './StarRating';
import Button2 from './Button2';

const CommentModal = ({ isOpen, onRequestClose, initialComment, onSave}) => {

    const [comment, setComment] = useState(initialComment.comment ? initialComment.Comment : '');
    const [rating, setRating] = useState(initialComment.Rating);

    const handleCommentChange = (value) => {
        setComment(value);
    }

    const handleRatingChange = (value) => {
        setRating(value);
    }

    const handleSaveComment = () => {
        if (comment && rating) {
           onSave(comment, rating)
        } else {
            Alert.alert(
                'Please include both rating and a comment to save changes', '',
                [{text: 'Ok', onPress: () => {
                }}, {text: "Leave without saving", onPress: () => {
                    onRequestClose();
                }}]
            );
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.fieldItem}>
                <Text style={styles.title}>Comments on RV Site:</Text>
                <View style={[styles.inputWrapper]}>
                    <TextInput
                        placeholder="Comments here!"
                        style={{color: '#333333', width: 280}}
                        value={comment}
                        maxLength={200}
                        multiline= {true}
                        onChangeText={text => handleCommentChange(text)} 
                    />
                </View>
            </View>
            
            <View style={styles.fieldItem}>
                <Text 
                    style={styles.textRVSite}>How would you rate this RV site? 
                </Text>
                <StarRating 
                    defaultRating={rating} 
                    maxRating={5} 
                    onRatingChange={rating => handleRatingChange(rating)} 
                    icon="star" 
                    emptyIcon="star-o"
                    size={30}/>
            </View>

            <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                <Button2 onPress={handleSaveComment} title="Save"/>
                <Button2 onPress={onRequestClose} title="Cancel"/>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    title: {
      textAlign: 'center',
      fontSize: 22,
      padding: 10,
      marginTop: 15,
      color: '#9A7B5B',
      justifyContent: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        borderColor: '#ccc',
    },
    fieldItem: {
        flex: 1,
        padding: 5,
        marginVertical: 10
    },
    textRVSite: {
        color:'#899499',
        fontSize: 16,
        marginVertical: 6
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
  });
  

export default CommentModal;