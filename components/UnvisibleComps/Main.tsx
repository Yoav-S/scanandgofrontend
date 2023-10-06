import React, {useEffect, useState, useContext} from 'react';
import { View, Text, TouchableOpacity , StyleSheet, useColorScheme} from 'react-native';
import { useDataContext } from '../../context/DataContext';
import { AuthenticatedStackScreen } from '../../navigation/AuthenticatedStack';
import { NotAuthenticatedStackScreen } from '../../navigation/NotAuthenticatedStack';
import jwt_decode from 'jwt-decode';
import ScanModal from '../ModalsComps/ScanModal';
import MessageModal from '../ModalsComps/MessageModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Token } from '../../interfaces/interfaces';
import LogoutModal from '../ModalsComps/LogoutModal';
import AreYouSureModal from '../ModalsComps/AreYouSureModal';
import SplashScreen from '../../screens/SplashScreen';
import { ThemeContext } from '../../context/ThemeContext';
import TermsAndConditionsModal from '../ModalsComps/TermsAndConditionsModal';
import LoadingModal from '../ModalsComps/LoadingModal';
const Main: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const {setTheme, lightTheme, darkTheme, buttonTheme, theme} = useContext(ThemeContext);
  const {primary, secondary, text, background, loadingBackground} = theme.colors;

  const colorScheme = useColorScheme();
  const {authenticated,
    setAuthenticated,
    setCurrentUser,
    getUserById,
    setToken,
     } = useDataContext();

useEffect(() => {
  if (colorScheme === 'dark') {
    setTheme(darkTheme);
    
  } else if (colorScheme === 'light') {
    setTheme(lightTheme);
  }
}, [colorScheme]);
useEffect(() => {
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('connectedUser');
      if (token !== null) {
        const decoded : Token = jwt_decode(token);
        setToken(token);
        const currantUser = await getUserById(decoded.id, token);
        if (currantUser != null) {
          setCurrentUser(currantUser);
          //await updateDeviceToken(currantUser._id);
          setAuthenticated(true);
        }
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  getData();
}, []);

if(isLoading){
  return <SplashScreen/>
}
  return (
    <View style={[styles.container, {backgroundColor: background}]}>
        {authenticated ? (
                    <View style={{flex: 1}}>
                      
                    <AuthenticatedStackScreen />
                    <ScanModal/>
                    <MessageModal/>
                    <LogoutModal/>
                    <AreYouSureModal/>
                    <LoadingModal/>
                    </View>
        ) : (
          <View style={{flex: 1}}>
                    <NotAuthenticatedStackScreen />
                    <TermsAndConditionsModal/>
                    <LoadingModal/>

          </View>
        )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
export default Main;
