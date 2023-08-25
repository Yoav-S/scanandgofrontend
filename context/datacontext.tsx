import React, { createContext, useContext, useState } from 'react';
import { Props, DataContextType } from '../interfaces/interfaces'; // Make sure to import the required interfaces
import { CurrentUserType, Registergion_Form_Props, IHttpResponse, Token } from '../interfaces/interfaces';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Toast from 'react-native-toast-message';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestUserPermission } from '../utils/requests';
const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showError, setShowError] = useState(false);
  const [token, setToken] = useState<string>('');


  const [apiUrl, setapiUrl] = useState<string>('https://scan-and-go.onrender.com//');
  const api: AxiosInstance = axios.create({
    baseURL: 'https://scan-and-go.onrender.com/', // Set your base URL
  });  
    /**
 * Attempts to log in the user.
 * @param email The user's email.
 * @param password The user's password.
 * @param rememberMeValue Whether to remember the user's login.
 * @returns A promise that resolves to a boolean indicating whether the login was successful.
 */
    const loginAttempt = async (email: string, password: string, rememberMeValue: boolean): Promise<boolean> => {

      try {
        const response = await api.post(`/users/login`, {params: {email: email, password: password, rememberMeValue: rememberMeValue}});
        const responseData: IHttpResponse<{ token: string }> = response.data;
        if (!responseData.success || responseData.data === undefined) { return false; }
        const token = responseData.data.token
        setToken(token)
        updateRememberMe(rememberMeValue, token)
        const decoded: Token = jwt_decode(token);
        const connectedUser: CurrentUserType | null = await getUserById(decoded.id, token)
        if (!connectedUser) {
          console.error('Problem with Token')
          return false;
        }
        setCurrentUser(connectedUser);
        await updateDeviceToken(connectedUser._id)
        return true;
      } catch (error) {
        return false;
      }
    };
    const updateDeviceToken = async (userId: string) => {
      let updatedDeviceToken = await requestUserPermission();
      await updateDeviceTokenInDb(updatedDeviceToken, userId);
    };

    const verifyEmail = async (emailToSend: string): Promise<[boolean, string, Date | undefined]> => {
      try {
        const response = await api.get('users/verifyEmail', { params: { email: emailToSend } });
        const responseData: IHttpResponse<{ digits: string; expireIn: Date }> = response.data;
        
        if (responseData.success && responseData.data) {
          return [true, responseData.data.digits, responseData.data.expireIn];
        } else {
          return [false, responseData.error!, undefined];
        }
      } catch (err: any) {
        return [false, err.response.data.error, undefined];
      }
    };
    
    

  const updateRememberMe = async (rememberMeValue: boolean, token: string): Promise<void> => {
    if (rememberMeValue)
      storeObject('connectedUser', token)
    else
      AsyncStorage.removeItem('connectedUser');
  };
  /**
  * Stores an object in async storage with the specified key and value.
  * @param key The key of the object.
  * @param value The value of the object.
  * @returns A promise that resolves to void.
  */
  const storeObject = async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('Error storing object:', error);
    }
  };

  
  const updateDeviceTokenInDb = async (deviceToken: string, userId: string): Promise<[boolean, string]> => {
    try {
      
      const requestBody = {
        userId,
        deviceToken
      }
      const response = await api.post('/users/updateDeviceToken', requestBody)
      const responseData: IHttpResponse<void> = response.data;
      if (responseData.tokenError) { handleTokenError() }
      //as [boolean,string] : I add this just because i know that if responseData.success is false then error won't be undefined 100%
      return responseData.success ? [true, responseData.message] : [false, responseData.error!];

    } catch (error: any) {
      console.error(error.response.data); // Log the error response data for further analysis
      return [false, error.response.data.error];
    };
  };

  const signupAttempt = async (newUser: Registergion_Form_Props): Promise<[boolean, string, string?]> => {
    try {
      const requestBody = {
        fullName: newUser.fullName,
        email: newUser.email,
        password: newUser.password,
        gender: newUser.gender,
        birthDate: newUser,
        deviceToken: newUser.deviceToken  
      }
      const response = await api.post('/users/signup', requestBody);
      const responseData: IHttpResponse<string> = response.data;
      return responseData.success ? [true, responseData.message, responseData.data] : [false, responseData.error!];

    } catch (error: any) {
      return [false, error.response.data.error]

    }
  };

  const getUserById = async (id: string, token: string): Promise<CurrentUserType | null> => {
    const requestBody = {
      query: {
        _id: id,
      },
      projection: {
        password: 0,
      },
    };
    try {
      const response: AxiosResponse = await api.post("/users/getUser", requestBody, { headers: { Authorization: 'Bearer ' + token, } });
      const responseData: IHttpResponse<CurrentUserType> = response.data;
      if (responseData.tokenError) { handleTokenError() }
      if (responseData.data === undefined) { return null; }
      return responseData.data;
    } catch (error: any) {
      console.log(error.response.data.error);
      return null;
    }
  };

  const autoLoginNewUser = async (newToken: string) => {
    await AsyncStorage.setItem('connectedUser', newToken)
    const decoded: Token = jwt_decode(newToken);
    setToken(newToken)
    const newUser = await getUserById(decoded.id, newToken);

    if (newUser != null) {
      setCurrentUser(newUser);
      setAuthenticated(true);
    }
  }

  async function handleTokenError(): Promise<void> {
    // show the dialog 
    handleLogOut();
  }


  const handleLogOut = async (): Promise<void> => {
    await AsyncStorage.removeItem('connectedUser');
    setAuthenticated(false);
  };

  const showToast = (message: string, status: string, header: string) => {
    Toast.show({
      type: status,
      text1: header,
      text2: message,
      topOffset: 4
    });
  }


  const contextValue: DataContextType = {
    currentUser,
    setCurrentUser,
    apiUrl,
    signupAttempt,
    showToast,
    token,
    autoLoginNewUser,
    loginAttempt,
    setAuthenticated,
    authenticated,
    verifyEmail
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

// Create a custom hook to use the data context
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
