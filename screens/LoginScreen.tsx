import React, {useState, useContext} from "react";
import { View, StyleSheet, Text , ScrollView, Dimensions, TouchableOpacityBase} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { CheckBox } from 'react-native-elements'
import BigTitle from "../components/UIElements/BigTitle";
import FormInput from "../components/UIElements/FormInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import TitledBarrier from "../components/UIElements/TitledBarrier";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Icon } from "react-native-elements";
import StyledButton from "../components/UIElements/StyledButton";
import TitleAndBtnCon from "../components/UIElements/TitleAndBtnCon";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { emailSchema, passwordSchema } from "../messages/Statements";
import Toast from 'react-native-toast-message';
import { useDataContext } from "../context/DataContext";
import activityIndicator from '../assets/activitiindicator.json'
import bugbuttonanimation from '../assets/bugpressanimation.json'
import LottieView from "lottie-react-native";
import loginAnimation from '../assets/loginscreenlottie.json'
import StyledWrapper from "../components/UIElements/StyledWrapper";
const validationSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});
const screen = Dimensions.get('window');

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, 'Login'>>();
  const [checkBoxValue, setCheckBoxValue] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors   
  const [buttonStatus, setButtonStatus] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const {loginAttempt, setAuthenticated, showToast, setisLoadingModal} = useDataContext();
  const activitiIndicatorObject = (<LottieView
    style={{width: 100, height: 100 , zIndex: 10}}
    speed={1} 
    source={activityIndicator}
    autoPlay
    loop={true}
    />)
    const bugbuttonanimationObject = (<LottieView
      style={{width: 50, height: 50 , zIndex: 10, margin: '3%'}}
      speed={1} 
      source={bugbuttonanimation}
      autoPlay
      loop={!isLoading}
      />)
  const loginAnimationObject = (<LottieView
    style={{width: 250, height: 250}}
    speed={1} 
    source={loginAnimation}
    autoPlay
    loop={true}
    />)
  const handleFormSubmit = async (values: { email: string; password: string; }) => {
    setIsLoading(true);
    setisLoadingModal(true);
    const result = await loginAttempt(values.email, values.password, checkBoxValue);
    setisLoadingModal(false);
    setIsLoading(false)
    if (result === false) {
      showToast('Sorry... wrong email or password','error','Login Failed');
      return;
    }
    showToast('We will now move to Home page', 'success', 'Login Success')
    setTimeout(() => {
      setAuthenticated(true);
      navigation.navigate('Home');
    }, 2000)
  };

  const navigateToSignUp = () => {
    navigation.navigate('Signup');
  }

  return (
    <StyledWrapper style={{backgroundColor: background, flex: 1}} route={'login'}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <BigTitle title="Login" />
      <TouchableOpacity disabled={isLoading} onPress={() => {navigation.navigate('ProblemReport', {cameFrom: 'Login'})}}>
      {bugbuttonanimationObject}

      </TouchableOpacity>
      </View>
      <ScrollView style={{margin: '3%'}} showsVerticalScrollIndicator={false}>
      <View>

      <View style={styles.imageCon}>
        {loginAnimationObject}
       </View>


{
  isLoading ? (<View style={{padding: '15%', alignItems: 'center', marginBottom: '10%'}}>{activitiIndicatorObject}</View>) : (      
  <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={validationSchema}
    onSubmit={handleFormSubmit}
  >
    {({ handleChange, handleSubmit, values, errors, isValid, dirty, touched }) => (
      <>
        <FormInput
          value={values.email}
          startValue={values.email}
          errorMessage={errors.email}
          setInput={handleChange('email')}
          label={'Email'}
          onPress={() => {handleChange('email')('')}}

        />
        <FormInput
          value={values.password}
          startValue={values.password}
          errorMessage={errors.password}
          setInput={handleChange('password')}
          label={'Password'}
          onPress={() => {handleChange('password')('')}}
        />
  <View style={styles.checkBoxBtnCon}>
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
  <CheckBox
     center
     containerStyle={styles.checkBoxStyles}
     checkedColor='green'
     checked={checkBoxValue} // Set the checked prop
     onPress={() => setCheckBoxValue(!checkBoxValue)}
     />
  <Text style={[{color: text.primary}]}>Remember me ?</Text>
  </View>
  <TouchableOpacity onPress={() => {navigation.navigate('ForgotPassword', {cameFrom: 'Login'})}}>
    <Text style={[{color: text.primary},styles.forgotPasswordText]}>Forgot Password ?</Text>
  </TouchableOpacity>
  </View>
  <StyledButton disabled={!isValid  || (values.email === '' && values.password === '')} onPress={handleSubmit} text={"Login"} bigbutton/>

      </>
    )}
  </Formik>)
 
}
</View>
<View style={[styles.border, {backgroundColor: text.primary}]}/>
<StyledButton disabled={isLoading} text="Register" bigbutton onPress={() => {navigation.navigate('Signup')}}/>
      </ScrollView>
      <Toast/> 

    </StyledWrapper>
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
    width: 30
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
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forgotPasswordText: {
    fontWeight: '500',
    fontSize: 12
  },
  border: {
    width: screen.width * 0.9 ,
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: '4%',
    marginBottom: '4%'
  },
  CheckBoxCon: {

  }
});

export default LoginScreen;
