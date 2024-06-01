import Geolocation from '@react-native-community/geolocation';

const RequestLocation = async (location, setLocation, setLocationError) => {

    const defaultLocation = [38.890, -120.388];
    
    try {
        Geolocation.requestAuthorization();
        
        Geolocation.getCurrentPosition(
            info => {
                setLocation([info.coords.latitude, info.coords.longitude]);
                console.log("Location", [info.coords.latitude, info.coords.longitude]);
            },
            error => {
                console.error("Error getting location:", error);
                console.log("Using default location");
                setLocation(defaultLocation);
                setLocationError(error.message);
            }
        );
    } catch (error) {
        console.error("Error requesting location authorization:", error);
        setLocationError(error.message);
        setLocation(defaultLocation);
    }
}

export default RequestLocation;



