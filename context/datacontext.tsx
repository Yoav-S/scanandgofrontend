import React, { createContext, useContext, useState } from 'react';
import { Props, DataContextType, creditCardFormType, creditCardRegisterionType } from '../interfaces/interfaces'; // Make sure to import the required interfaces
import { CurrentUserType, Registergion_Form_Props, IHttpResponse, Token } from '../interfaces/interfaces';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Toast from 'react-native-toast-message';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestUserPermission } from '../utils/requests';
import DropDownPicker from 'react-native-dropdown-picker';
import {IteminCartType, CouponType, TransactionFormType} from '../interfaces/interfaces'
import { Asset } from 'react-native-image-picker';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showError, setShowError] = useState(false);
  const [token, setToken] = useState<string>('');
  const [isVisibleStatus, setisVisibleStatus] = useState(false);
  const [isMessageModalVisible, setisMessageModalVisible] = useState(false);
  const [amountofitemsvariable, setamountofitemsvariable] = useState<number>(currentUser?.cart.length || 0);
  const [isLogoutModal, setisLogoutModal] = useState<boolean>(false);
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
const updatePasswordAttempts = async (password: string, newpassword: string): Promise<boolean> =>{
  console.log(currentUser?._id);
  
  try{
    const response = await api.put('users/updatePassword', {
      oldPassword: password,
      newPassword: newpassword,
      userId: currentUser?._id
    },
    { 
      headers: 
      { 
        Authorization: 'Bearer ' + token, 
      } 
    })
    console.log(response.data);
    
    if(response.status === 200 || response.status === 201){
      return true;
    }else{
      return false;
    }
  } catch (err: any) {
    console.log(err.message);
    return false;
  }
}

const deleteCardAttempt = async (cardId: string, userId: string): Promise<boolean> => {
  const obj = {
    userId: userId,
    cardId: cardId
  }
  try{
    const response: AxiosResponse = await api.patch('paymentMethods/deleteCreditCard', obj);
    console.log(response.data);
    
    if(response.status === 200 || response.status === 201){
      return true;
    }
    else{
      return false;
    }
    
  } catch (err: any) {
    return false;
  }
}

const loginAttempt = async (email: string, password: string, rememberMeValue: boolean): Promise<boolean> => {  
      try {
        const response = await api.post(`auth/login`, {email: email, password: password});        
        if (response.status !== 201) { return false; }      
        const token = response.data.token;
        setToken(token)
        updateRememberMe(rememberMeValue, token)
        const decoded: Token = jwt_decode(token);
        const connectedUser: CurrentUserType | null = await getUserById(decoded.id, token)
        console.log(connectedUser);   
        if (!connectedUser) {
          console.error('Problem with Token')
          return false;
        }
        setCurrentUser(connectedUser);
      //  await updateDeviceToken(connectedUser._id)
        return true;
      } catch (error) {
        return false;
      }
};
const updateDeviceToken = async (userId: string) => {
  let updatedDeviceToken = await requestUserPermission();
  await updateDeviceTokenInDb(updatedDeviceToken, userId);
};
const verifyEmail = async (emailToSend: string): Promise<[boolean, string, Date?, string?]> => {
  console.log(emailToSend);
  
  try {
    const response = await api.get('auth/verifyEmail', { params: { email: emailToSend } });
    console.log(response.data);
    console.log(response.status);
    
    
    if (response.status === 200) {
      return [true, response.data.digits, response.data.expireIn, response.data.userId];
    } else {
      return [false, '00000'];
    }
  } catch (err: any) {
    return [false, '00000'];
  }
};
const resetPassword = async (password: string, userId: string): Promise<boolean> => {
  console.log(password);
  console.log(userId);
  
  try {
    const response = await api.put(`users/resetPassword`, { params: { newPassword: password, userId: userId } });
    console.log(response.data);
    console.log(response.status);
    
    if (response.status === 200) {
      return true;
    }
    else{
      return false;
    }
  } catch (error) {
    // Add a return statement for the failure case
    return false;
  }
};
const updateDetailsAttempt = async (email: string, fullName: string, gender: string, birthDate: string): Promise<boolean> => {
  try{
    const response = await api.patch('users/updateOne', {
      query: {
        _id: currentUser?._id
      },
      updateQuery: {
        email: email,
        fullName: fullName,
        gender: gender,
        birthDate: birthDate
      }
    },
    { 
      headers: 
      { 
        Authorization: 'Bearer ' + token, 
      } 
    }
    ) 
    if(response.status === 200){
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}
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
const getArrayOfDropDownCategories = async () : Promise<string[]> => {
    const response = await api.get('reportedProblem/getAllTypeCategories');
    return response.data;
}
const uploadFile = async (asset: Asset) : Promise<string> => {
    const formData = new FormData();      
    formData.append('file', {
      uri: asset.uri,
      type: asset.type,
      name: asset.fileName
    });
    const response = await api.post('reportedProblem/uploadFile',formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if(response.status === 201){
      return response.data.imageUrl;
    }
    else{
      return '';
    }
}
const uploadReport = async (currentAsset : Asset | null, currentCategoryValue : string, description : string, osValue : string, systemVersionValue : string, deviceModel: string, appVersionValue: string) : Promise<[boolean, string]> => {
    let imageUrl: string = '';
    const assetFlag: boolean = currentAsset !== null;
    if(assetFlag && currentAsset){
       imageUrl = await uploadFile(currentAsset);
    }     
    if(imageUrl === '' && assetFlag){
      return [false, 'Image upload failed'];
    }
    try{
      const response = await api.post('reportedProblem/createProblem', {deviceInfo: {
        os: osValue,
        deviceModel: deviceModel,
        systemVersion: systemVersionValue,
        appVersion: appVersionValue
      },
      description: description,
      type: currentCategoryValue,
      screenShot: imageUrl
    })
    return [true, response.data]
    } catch (err: any) {
      return [false, err.message]
    }
}
const updateDeviceTokenInDb = async (deviceToken: string, userId: string): Promise<[boolean, string]> => {
    try {
      
      const requestBody = {
        userId,
        deviceToken
      }
      const response = await api.post('/users/updateDeviceToken', requestBody)
      if (response.data.tokenError) { handleTokenError() }
      //as [boolean,string] : I add this just because i know that if responseData.success is false then error won't be undefined 100%
      return response.data.success ? [true, response.data.message] : [false, response.data.error!];

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
        newPassword: newUser.password,
        gender: newUser.gender,
        deviceToken: newUser.deviceToken ,
        birthDate: newUser.birthDate?.toString(),
      }
      const response = await api.post('auth/signup', requestBody);      
      return response.data.success ? [true, response.data.message, response.data] : [false, response.data.error!];
    } catch (error: any) {
      console.log(error.message);     
      return [false, error.message]

}};
const deleteItemAttempt = async (userId: string, nfcTagCode: string): Promise<[boolean, IteminCartType[]?]> => {
  console.log(userId);
  console.log(nfcTagCode);
  
  
try{
  const response : AxiosResponse = await api.patch('users/removeFromCart', {
    userId,
    nfcTagCode
  },
  { headers: { Authorization: 'Bearer ' + token, } });
  console.log(response.data);
  
  if(response.status === 200 || response.status === 201){
    return [true, response.data];
  } else {
    return [false];
  }
} catch (error: any) {
  return [false];
}
}
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
      const response: AxiosResponse = await api.post("users/getOne", requestBody, { headers: { Authorization: 'Bearer ' + token, } });
      console.log(response.data);
      
      if (response.data.tokenError) { handleTokenError() }
      if (response.data === undefined) { return null; }
      return response.data;
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

  const changeDefaultCardAttempt = async (cardId: string): Promise<boolean> => { 
    try{
      const response = await api.patch('users/paymentMethods/changeDefault', {
        cardId: cardId,
        userId: currentUser?._id
      },
      { headers: { Authorization: 'Bearer ' + token, } }
      )
      console.log(response.data);
      
      if(response.status == 200 || response.status === 201){
        return true;
      }
      else{
        return false;
      }
    } catch (err) {
      return false;
    }
  }

const addCreditCardAttempt = async (values: creditCardFormType): Promise<[boolean, string | null]> => {

  try{
    const creditCardObject: creditCardRegisterionType = {
      userId: currentUser?._id || '',
      creditCard: values
    } 
    console.log('credit card' , creditCardObject);
    
    const response: AxiosResponse = await api.post('paymentMethods/addCreditCard', creditCardObject, {headers: {Authorization: 'Bearer ' + token}});
    console.log(response.data);
    return [true, null];
  } catch (err : any) {
    return [false, err.message]
  }


}

  const PaymentAttempt = async (transactionObject: TransactionFormType): Promise<boolean> => {
    console.log(transactionObject);
    
    try{
      const response: AxiosResponse = await api.post('transactions/createTransaction', transactionObject, {headers: {Authorization: 'Bearer ' + token}});
      console.log('status',response.status);
      if(currentUser){
      const newUser = await getUserById(currentUser._id, token);
      if (newUser != null) {
        setCurrentUser(newUser);
        setAuthenticated(true);
      }
     }
      return true;
    } catch (error: any){
      if (error.response) {
        console.log(error.response.data.message);
        if (error.response.status === 500) {  
          return false;
        } else if (error.response.status === 404) {
          return false;
        } else {
          return false;
        }
      } else{
        return false;
      }
    }
  }

  const showToast = (message: string, status: string, header: string) => {
    Toast.show({
      type: status,
      text1: header,
      text2: message,
      topOffset: 4
    });
  }

  const verifyCouponAttempt = async (coupon: string): Promise<[boolean, CouponType | null]> => {
    const requestBody = {
      query: {
        code: coupon,
        isActive: true
      },
      projection: {
        discountPercentage:1
      },
    };
    try{
      const response: AxiosResponse = await api.post('coupon/getOne', requestBody,
      {
        headers:{Authorization: "Bearer " + token}
      });
        const couponObject: CouponType = response.data;
        return [true,couponObject];     
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 500) {
          console.log('error 500: ',error.response.message);
          return [false, null];
        } else if (error.response.status === 404) {
          console.log('error 404 if: ',error.response.data.message);
          return [false, null];
        } else {
          console.log('error 404 else: ',error.response.message);
          return [false, null];
        }
      } else{
        console.log('no response error', error.message);
        return [false, null];
      }
  }
}

const AddItemToCartAttempt = async (userId: string, itemInCart: {itemId: string, nfcTagCode: string}): Promise<boolean> => {
try{
const response = await api.post('users/addToCart', { userId, itemInCart }, {headers: {Authorization: 'Bearer ' + userId}})
if(currentUser){
let newUser: CurrentUserType = currentUser;
newUser.cart = response.data;
setCurrentUser(newUser);
}
return true;
} catch (err: any){
return false;
}
}


  const contextValue: DataContextType = {
    currentUser,
    setCurrentUser,
    signupAttempt,
    showToast,
    token,
    autoLoginNewUser,
    loginAttempt,
    setAuthenticated,
    authenticated,
    verifyEmail,
    getUserById,
    setToken,
    resetPassword,
    updateDeviceToken,
    getArrayOfDropDownCategories,
    uploadReport,
    uploadFile,
    handleLogOut,
    updateDetailsAttempt,
    updatePasswordAttempts,
    changeDefaultCardAttempt,
    deleteCardAttempt,
    isVisibleStatus,
    setisVisibleStatus,
    deleteItemAttempt,
    setamountofitemsvariable,
    amountofitemsvariable,
    verifyCouponAttempt,
    PaymentAttempt,
    AddItemToCartAttempt,
    addCreditCardAttempt,
    isMessageModalVisible,
    setisMessageModalVisible,
    isLogoutModal,
    setisLogoutModal
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
