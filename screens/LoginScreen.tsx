import React, {useState, useContext} from "react";
import { View, StyleSheet, Image, Text , ScrollView} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
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
import activityIndicator from '../assets/activitiindicator.json'

import LottieView from "lottie-react-native";
import loginAnimation from '../assets/loginscreenlottie.json'
const validationSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});
const LoginScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, 'Login'>>();
  const [checkBoxValue, setCheckBoxValue] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors   
  const [buttonStatus, setButtonStatus] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const {loginAttempt, setAuthenticated, showToast} = useDataContext();
  const activitiIndicatorObject = (<LottieView
    style={{width: 100, height: 100 , zIndex: 10}}
    speed={1} 
    source={activityIndicator}
    autoPlay
    loop={true}
    />)
  const loginAnimationObject = (<LottieView
    style={{width: 250, height: 250}}
    speed={1} 
    source={loginAnimation}
    autoPlay
    loop={true}
    />)
  const handleFormSubmit = async (values: { email: string; password: string; }) => {
    setIsLoading(true)
    const result = await loginAttempt(values.email, values.password, checkBoxValue);
    setIsLoading(false)
    if (result === false) {
      showToast('Sorry... wrong email or password','error','Login Failed');
      return;
    }
    setTimeout(() => {
      showToast('We will now move to Home page', 'success', 'Login Success')
    }, 3000)
    setAuthenticated(true);
  };

  const navigateToSignUp = () => {
    navigation.navigate('Signup');
  }

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <ScrollView>
      <View style={styles.imageCon}>
        {loginAnimationObject}
       </View>
      <BigTitle title="Login" />
      <View>

{
  isLoading ? (<View style={{padding: '15%', alignItems: 'center', marginBottom: '10%'}}>{activitiIndicatorObject}</View>) : (      
  <Formik
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
     checkedColor='green'
     checked={checkBoxValue} // Set the checked prop
     onPress={() => setCheckBoxValue(!checkBoxValue)}
     />
  <Text style={{color: text.primary}}>Keep me logged in ?</Text>
  </View>
  <TouchableOpacity onPress={() => {navigation.navigate('ForgotPassword')}}>
    <Text style={[{color: text.primary},styles.forgotPasswordText]}>Forgot Password ?</Text>
  </TouchableOpacity>
  </View>
  <StyledButton disabled={isLoading} onPress={handleSubmit} text={"Login"} bigbutton/>

      </>
    )}
  </Formik>)
 
}
</View>


      {!isLoading && <TitleAndBtnCon text={"Dont have an account ?"} btnlabel={"Sign up"} btnbold  onPress={navigateToSignUp} />}
      {!isLoading && <TitledBarrier text={"Or Sign in via"}/>}
      {!isLoading && <Icon style={styles.icon} name="home" size={30} />}
      {!isLoading && <TitleAndBtnCon text="Notice a bug in the app ?" btnlabel="Notice us" btnbold onPress={() => {navigation.navigate('ProblemReport', {cameFrom: 'LoginScreen'});}}/>}
      <Toast/> 
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  icon: {
    margin: '2%'
  },
  checkBoxStyles: {
    width: '50%'
  },
  imageCon: {
    alignSelf: 'center',
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
