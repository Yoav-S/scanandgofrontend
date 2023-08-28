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
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Icon } from "react-native-elements";
import StyledButton from "../components/UIComps/StyledButton";
import TitleAndBtnCon from "../components/UIComps/TitleAndBtnCon";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { emailSchema, passwordSchema } from "../messages/Statements";
import Toast from 'react-native-toast-message';
import { useDataContext } from "../context/DataContext";
import { ActivityIndicator } from "@react-native-material/core";

const validationSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});
const LoginScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, 'Login'>>();

  const [checkBoxValue, setCheckBoxValue] = useState<boolean>(false);
  const { theme } = useTheme();
  const [buttonStatus, setButtonStatus] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false)
  const {loginAttempt, setAuthenticated, showToast} = useDataContext();


  const handleFormSubmit = async (values: { email: string; password: string; }) => {
    setIsLoading(true)
    const result = await loginAttempt(values.email, values.password, checkBoxValue);
    setIsLoading(false)
    if (result === false) {
      showToast('Sorry... wrong email or password','error','Login Failed');
      return;
    }
    setAuthenticated(true);
  };

  const navigateToSignUp = () => {
    navigation.navigate('Signup');
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.imageCon}>
        <Image style={styles.image} source={require("../images/3135715.png")} />
      </View>
      <BigTitle title="Login" />
      <View>

{
  isLoading ? (<ActivityIndicator size={60}/>) : (      <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={validationSchema}
    onSubmit={handleFormSubmit}
  >
    {({ handleChange, handleSubmit, values, errors }) => (
      <>
        <FormInput
          value={values.email}
          errorMessage={errors.email}
          setInput={handleChange('email')}
          label={'Email'}
        />
        <FormInput
          value={values.password}
          errorMessage={errors.password}
          setInput={handleChange('password')}
          label={'Password'}
        />
  <View style={styles.checkBoxBtnCon}>
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
  <CheckBox
     style={[styles.checkBoxStyles]}
     center
     checked={checkBoxValue} // Set the checked prop
     onPress={() => setCheckBoxValue(!checkBoxValue)}
     />
  <Text style={{color: theme.textColor}}>Keep me logged in ?</Text>
  </View>
  <TouchableOpacity onPress={() => {navigation.navigate('ForgotPassword')}}>
    <Text style={[{color: theme.secondaryColor},styles.forgotPasswordText]}>Forgot Password ?</Text>
  </TouchableOpacity>
  </View>
  <StyledButton disabled={isLoading} onPress={handleSubmit} text={"Login"}/>

      </>
    )}
  </Formik>)
 
}
</View>


      <TitleAndBtnCon text={"Dont have an account ?"} btnlabel={"Sign up"} btnbold  onPress={navigateToSignUp} />
      <TitledBarrier text={"Or Sign in via"}/>
      <Icon style={styles.icon} name="home" size={30} />
      <TitleAndBtnCon text="Notice a bug in the app ?" btnlabel="Notice us" btnbold onPress={() => {navigation.navigate('ProblemReport', {cameFrom: 'LoginScreen'});}}/>
      <Toast/>
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
