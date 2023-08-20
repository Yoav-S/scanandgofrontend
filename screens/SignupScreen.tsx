import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { useToken } from '../context/TokenContext'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import DayNightSwitcher from "../components/UIComps/DayNightSwitcher";
import BigTitle from "../components/UIComps/BigTitle";
import FormInput from "../components/UIComps/FormInput";
import AllCheckBoxCategories from "../components/UIComps/AllCheckboxCategories";
import StyledButton from "../components/UIComps/StyledButton";
const SignupScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, 'Signup'>>();
  const { setToken } = useToken();
  const { theme } = useTheme();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


  const signupHandler = () => {
    navigation.navigate('Login');
  };

  const SignupAttempt = async () => {
    try {
      const response = await axios.post('your_signup_endpoint', {
        // Your signup data
      });
      const newToken = response.data.token; 
      setToken(newToken);
      await AsyncStorage.setItem('token', newToken);
    } catch (error : any) {
      console.log(error.message);
    }
  };



  const setEmailInputHandler = (value: string) => {
    console.log('Email:', value);

};

  const setPasswordInputHandler = (value: string) => {
    console.log('Password:', value);

  };

  const setFullNameHandler = (value: string) => {
    console.log('FullName:', value);

  };

  const setConfirmPasswordInputHandler = (value: string) => {
    console.log('Confirm Password:', value);
    
  };
  console.log(selectedCategories);
  
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={{ marginBottom: '10%' }}>
        <DayNightSwitcher />
      </View>
      <BigTitle title={"Signup"} />
      <FormInput setInput={setFullNameHandler} label={"Full Name"} />
      <FormInput setInput={setEmailInputHandler} label={"Email"} />
      <FormInput setInput={setPasswordInputHandler} label={"Password"} />
      <FormInput setInput={setConfirmPasswordInputHandler} label={"Confirm Password"} />
      <AllCheckBoxCategories
          title="Gender"
          categories={['male', 'female']}
          setSelectedCategories={setSelectedCategories}
          selectedCategories={selectedCategories} 
          isSingleCategory
          />
      <StyledButton btnHandler={SignupAttempt} text={"Sign up"}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20,
  },
  signupButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modeToggleButton: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  modeToggleText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default SignupScreen;
