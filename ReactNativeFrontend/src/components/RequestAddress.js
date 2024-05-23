//import {GOOGLE_MAPS_API_KEY} from "@env";

const RequestAddress = async (latitude, longitude) => {
    //const API_KEY = process.env.GOOGLE_MAPS_API_KEY
    const API_KEY = "AIzaSyCZ-tbuUXwGVbCud0w3St4imB0Rp8d_0fw"
    console.log("API KEY", API_KEY);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === 'OK') {
        const address = data.results[0].formatted_address;
        console.log('Reverse Geocoding Result:', address);
        console.log("Address",address);
        return address;
      } else {
        // No address found, error
        console.error('Reverse Geocoding Error:', data.status);
        return null;
      }
    } catch (error) {
      console.error('Reverse Geocoding Error:', error);
      return null;
    }
  };

export default RequestAddress;