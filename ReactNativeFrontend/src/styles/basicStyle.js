import { StyleSheet } from 'react-native';
import MarkoOneRegular from '../assets/fonts/Marko/MarkoOne-Regular.ttf';


const basicStyle = StyleSheet.create({
  simpleContainer: {
    width: '85%', 
    aspectRatio: 1, 
    maxHeight: '50%', 
    borderWidth: 1, 
    alignItems: 'center'
  },
  container: {
    boxSizing: 'border-box',
  
    width: '85%',
    aspectRatio: 1,
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

  button: {
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
  middleBottom: {
    position: 'absoulte', 
    bottom: 5
  }

});

export default basicStyle;
