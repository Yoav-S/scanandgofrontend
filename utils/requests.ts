import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging'


  /**
 * Checks if there is permission to get notifications.
 * if there is returns the most updated device token else returns null
 * @returns DeviceToken | null
 */
export const requestUserPermission = async ():Promise<string> => {
    const authStatus = await messaging().requestPermission();

    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        return updateTokenInAsyncStorage();
    }
    return ''
}
//get FcmToken to send notification 
  /**
 * Get the most updated Device token and set it to Async Storage and return the token.
 * if there is an error, return null
 * @returns DeviceToken : string | null
 */
export const updateTokenInAsyncStorage = async (): Promise<string> => {
    try {
            let updatedToken = await messaging().getToken();
            await AsyncStorage.setItem('fcmToken',updatedToken);
            return updatedToken;
        } catch (error: any) {
            console.log('Error in function updateTokenInAsyncStorage:' + error.message);
            return '';
        }
    }