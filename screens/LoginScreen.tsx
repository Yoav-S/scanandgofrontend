import React, {useState} from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useToken } from '../context/TokenContext'; // Import the TokenContext hook
import { CheckBox } from 'react-native-elements'
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BigTitle from "../components/UIComps/BigTitle";
import DayNightSwitcher from "../components/UIComps/DayNightSwitcher";
import FormInput from "../components/UIComps/FormInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import TitledBarrier from "../components/UIComps/TitledBarrier";
import { Icon } from "react-native-elements";
import StyledButton from "../components/UIComps/StyledButton";
import TitleAndBtnCon from "../components/UIComps/TitleAndBtnCon";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
const LoginScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, 'Login'>>();

  const { setToken } = useToken(); // Use the useToken hook
  const [checkBoxValue, setCheckBoxValue] = useState<boolean>(false);
  const { theme } = useTheme();
  const [EmailInput, setEmailInput] = useState<string | undefined>(undefined);
  const [PasswordInput, setPasswordInput] = useState<string | undefined>(undefined);
  const [buttonStatus, setButtonStatus] = useState<boolean>(true);

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
  const navigateToSignUp = () => {
    navigation.navigate('Signup');
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <DayNightSwitcher
      />
      <View style={styles.imageCon}>
        <Image style={styles.image} source={require("../images/3135715.png")} />
      </View>
      <BigTitle title="Login" />
      <FormInput setInput={setEmailInputHandler} label={"Email"}/>
      <FormInput setInput={setPasswordInputHandler} label={"Password"}/>
      <View style={styles.checkBoxBtnCon}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <CheckBox
         style={[styles.checkBoxStyles]}
         center
         checked={checkBoxValue} // Set the checked prop
         onPress={checkBoxHandler}
      />
      <Text style={{color: theme.textColor}}>Keep me logged in ?</Text>
      </View>
      <TouchableOpacity>
        <Text style={[{color: theme.secondaryColor},styles.forgotPasswordText]}>Forgot Password ?</Text>
      </TouchableOpacity>
      </View>
      <StyledButton disabled={buttonStatus} onPress={LoginAttempt} text={"Sign in"}/>
      <TitleAndBtnCon text={"Dont have an account ?"} btnlabel={"Sign up"} btnbold  onPress={navigateToSignUp} />
      <TitledBarrier text={"Or Sign in via"}/>
      <Icon style={styles.icon} name="home" size={30} />
      <TitleAndBtnCon text="Notice a bug in the app ?" btnlabel="Notice us" btnbold/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    margin: '2%'
  },
  checkBoxStyles: {
    width: '50%'
  },
  imageCon: {
    alignSelf: 'center',
    padding: '10%',
  },
  bugCon: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
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
