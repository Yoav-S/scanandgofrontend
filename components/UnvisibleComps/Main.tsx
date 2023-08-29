import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity , StyleSheet} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useDataContext } from '../../context/DataContext';
import { AuthenticatedStackScreen } from '../../navigation/AuthenticatedStack';
import { NotAuthenticatedStackScreen } from '../../navigation/NotAuthenticatedStack';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Token } from '../../interfaces/interfaces';
const Main: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const {authenticated,
    setAuthenticated,
    setCurrentUser,
    getUserById,
    setToken,
    updateDeviceToken } = useDataContext();
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
  return (
    <View style={styles.container}>
        {authenticated ? (
                    <AuthenticatedStackScreen />
        ) : (
          <NotAuthenticatedStackScreen />
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
