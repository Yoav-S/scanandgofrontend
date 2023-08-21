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
import { FormErrors, FormSuccessMessages } from "../messages/Errors";
import DatePicker from 'react-native-date-picker'
import TitleAndBtnCon from "../components/UIComps/TitleAndBtnCon";
import { useDataContext } from "../context/DataContext";

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, 'Signup'>>();
  const { setToken } = useToken();
  const { theme } = useTheme();
  const {setConfirmPasswordInputHandler, 
    setFullNameHandler, 
    setPasswordInputHandler, setEmailInputHandler, 
    full_name, 
    email, 
    password, 
    confirm_password, 
    device_token, 
    birth_date,
    confirm_password_Validator_Flag,
    date_of_birth_Validator_Flag,
    device_token_Validator_Flag,
    email_Validator_Flag,
    full_name_Validator_Flag,
    gender_Validator_Flag,
    password_Validator_Flag,} = useDataContext();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [buttonStatus, setButtonStatus] = useState<boolean>(true);
  const [openDateModal, setopenDateModal] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  

  const setOpenModalHandler = () =>{
    console.log('trigger');
    setopenDateModal(!openDateModal);
  }




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

   
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={{ marginBottom: '10%' }}>
        <DayNightSwitcher />
      </View>
      <BigTitle title={"Signup"} />
      <FormInput startValue={full_name} errorMessage={FormErrors.invalidFullName} validator={full_name_Validator_Flag} setInput={setFullNameHandler} label={"Full Name"} />
      <FormInput startValue={email} errorMessage={FormErrors.invalidEmail} validator={email_Validator_Flag} setInput={setEmailInputHandler} label={"Email"} />
      <FormInput startValue={password} errorMessage={FormErrors.invalidPassword} validator={password_Validator_Flag} setInput={setPasswordInputHandler} label={"Password"} />
      <FormInput startValue={confirm_password} errorMessage={FormErrors.passwordsDoNotMatch} validator={confirm_password_Validator_Flag} setInput={setConfirmPasswordInputHandler} label={"Confirm Password"} />
      <AllCheckBoxCategories
          validator={gender_Validator_Flag}
          title="Gender"
          categories={['male', 'female']}
          setSelectedCategories={setSelectedCategories}
          selectedCategories={selectedCategories} 
          isSingleCategory
          />
      <View>
      <TitleAndBtnCon text="Date of birth" btnbold onPress={setOpenModalHandler} btnlabel="Open Date book"/>
      <DatePicker
      style={styles.datemodal}
        modal
        open={openDateModal}
        date={date}
        mode="date"
        onConfirm={(date) => {
          setopenDateModal(false)
          setDate(date)
        }}
        onCancel={() => {
          setopenDateModal(false)
        }}
      />
      </View>
      <StyledButton disabled={buttonStatus} btnHandler={SignupAttempt} text={"Sign up"}/>
      

    
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
  datePicker: {
    height: 200
  },
  datemodal: {
    height: 500
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
