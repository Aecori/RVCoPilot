import Geolocation from '@react-native-community/geolocation';

const RequestLocation = async (setLocation, setLocationError, setLoadingLocation, timeout = 5000) => {
    const defaultLocation = [41.7658, -72.6634];

    try {
        setLoadingLocation(true);
        const authorizationPromise = new Promise((resolve, reject) => {
            Geolocation.requestAuthorization(resolve, reject);
        });

        const locationPromise = new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                clearTimeout(timeoutId);
                reject(new Error("Location request timed out"));
            }, timeout);
            
            Geolocation.getCurrentPosition(
                info => {
                    clearTimeout(timeoutId);
                    resolve([info.coords.latitude, info.coords.longitude]);
                },
                error => {
                    clearTimeout(timeoutId);
                    console.error("Error getting location:", error);
                    console.log("Using default location");
                    setLocation(defaultLocation);
                    setLocationError(error.message);
                }
            );
        });

        await Promise.race([authorizationPromise, locationPromise]);

        const result = await locationPromise;
        setLocation(result);
        setLoadingLocation(false);
    } catch (error) {
        console.error("Error requesting location authorization:", error);
        setLocationError(error.message);
        setLocation(defaultLocation);
    } finally {
        setLoadingLocation(false);
    }
}

export default RequestLocation;



