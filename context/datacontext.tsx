import React, { createContext, useContext, useState } from 'react';
import { Props, DataContextType } from '../interfaces/interfaces'; // Make sure to import the required interfaces
import { CurrentUserType } from '../interfaces/interfaces';
import { set_confirm_password_Validator_Flag,
set_date_of_birth_Validator_Flag,
set_device_token_Validator_Flag,
set_email_Validator_Flag,
set_full_name_Validator_Flag,
set_gender_Validator_Flag,
set_password_Validator_Flag,
confirm_password_Validator_Flag,
date_of_birth_Validator_Flag,
device_token_Validator_Flag,
email_Validator_Flag,
full_name_Validator_Flag,
gender_Validator_Flag,
password_Validator_Flag,
   } 
from '../messages/Statements';



const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(null);

  const validateInput = (regex: RegExp, input: string) => {
    return regex.test(input);
  };
  const [full_name, set_full_name] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [confirm_password, setconfirmPassword] = useState<string | undefined>(undefined);
  const [birth_date, set_birth_date] = useState<string | undefined>(undefined);
  const [device_token, set_device_token] = useState<string | undefined>(undefined);
  
  const setEmailInputHandler = (value: string) => {
    const isValid = validateInput(/^\S+@\S+\.\S+$/, value); // Email validation regex
    isValid ? set_email_Validator_Flag(true) : set_email_Validator_Flag(false);
  };
  
  
  const setPasswordInputHandler = (value: string) => {
    const isValid = validateInput(/^(?=.*[!@#$%^&*()\-_=+{};:,<.>/?[\]|\w]).{8,}$/, value); // Password validation regex
    isValid ? set_password_Validator_Flag(true) : set_password_Validator_Flag(false);
  };
  
  
  const setFullNameHandler = (value: string) => {
    const isValid = validateInput(/^[A-Za-z\s]{2,}$/, value); // Full name validation regex
    isValid ? set_full_name_Validator_Flag(true) : set_full_name_Validator_Flag(false);
  };
  
  
  const setConfirmPasswordInputHandler = (value: string, originalpassword?: string) => {
    const isValid = value === originalpassword; // Confirm password match validation
    isValid ? set_confirm_password_Validator_Flag(true) : set_confirm_password_Validator_Flag(false);
  };




  const contextValue: DataContextType = {
    currentUser,
    setCurrentUser,
    setConfirmPasswordInputHandler,
    setFullNameHandler,
    setPasswordInputHandler,
    setEmailInputHandler,
    full_name,
    password,
    email,
    birth_date,
    device_token,
    confirm_password,
    confirm_password_Validator_Flag,
    date_of_birth_Validator_Flag,
    device_token_Validator_Flag,
    email_Validator_Flag,
    full_name_Validator_Flag,
    gender_Validator_Flag,
    password_Validator_Flag,
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
