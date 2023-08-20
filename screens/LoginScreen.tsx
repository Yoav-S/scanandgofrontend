import React, {useState} from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useToken } from '../context/TokenContext'; // Import the TokenContext hook
import { NightTheme } from "../themes/themes";
import { CheckBox } from 'react-native-elements'
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BigTitle from "../components/UIComps/BigTitle";
import DayNightSwitcher from "../components/UIComps/DayNightSwitcher";
import FormInput from "../components/UIComps/FormInput";
import { TouchableOpacity } from "react-native-gesture-handler";
const LoginScreen: React.FC = () => {
  const { setToken } = useToken(); // Use the useToken hook
  const [checkBoxValue, setCheckBoxValue] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();
  const [EmailInput, setEmailInput] = useState<string | undefined>(undefined);
  const [PasswordInput, setPasswordInput] = useState<string | undefined>(undefined);
  const setPasswordInputHandler = (value: string) => {
    setPasswordInput(value);
  }
  const setEmailInputHandler = (value: string) => {
    setEmailInput(value);
  }
  const LoginAttempt = async () => {
    try {
      const response = await axios.post('my_login_endpoint', {
        email: EmailInput,
        password: PasswordInput
      });
      const { token: newToken } = response.data;
      setToken(newToken);
      await AsyncStorage.setItem('token', newToken);
      console.log(newToken);
      
    } catch (error : any) {
      console.log(error.message);
    }
  };
  const checkBoxHandler = () => {
    setCheckBoxValue(!checkBoxValue)
  }
  console.log(checkBoxValue);
  
  

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <DayNightSwitcher
        isEnabled={theme === NightTheme}
        onToggle={toggleTheme}
      />
      <View style={styles.imageCon}>
        <Image style={styles.image} source={require("../images/3135715.png")} />
      </View>
      <BigTitle title="Login" theme={theme} />
      <FormInput theme={theme} setEmailInput={setEmailInputHandler} label={"Email"}/>
      <FormInput theme={theme} setPasswordInput={setPasswordInputHandler} label={"Password"}/>
      <View style={styles.checkBoxBtnCon}>
      <CheckBox
         style={[styles.checkBoxStyles]}
         center
         title='Keep me logged in ?'
         checked={checkBoxValue} // Set the checked prop
         onPress={checkBoxHandler}
      />
      <TouchableOpacity>
        <Text style={[{color: theme.secondaryColor},styles.forgotPasswordText]}>Forgot Password ?</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkBoxStyles: {
    width: '50%'
  },
  imageCon: {
    alignSelf: 'center',
    padding: '10%',
  },
  image: {
    width: 150,
    height: 150,
  },
  checkBoxBtnCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2%'
  },
  forgotPasswordText: {
    fontWeight: '500',
    fontSize: 12
  },
  CheckBoxCon: {

  }
});

export default LoginScreen;
