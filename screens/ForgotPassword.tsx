import react, {useState, useEffect, useContext} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions} from 'react-native'
import { ForgotPasswordProps, UserEmailVerificationDetails } from '../interfaces/interfaces'
import BigTitle from '../components/UIElements/BigTitle'
import FormInput from '../components/UIElements/FormInput'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { emailSchema, passwordSchema } from '../messages/Statements'
import StyledButton from '../components/UIElements/StyledButton'
import OtpInputs from 'react-native-otp-inputs'
import { useDataContext } from '../context/DataContext'
import { ActivityIndicator } from '@react-native-material/core'
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Clipboard from '@react-native-clipboard/clipboard';
import { StackNavigationProp } from '@react-navigation/stack';
import { ThemeContext } from '../context/ThemeContext'
import TitleAndBtnCon from '../components/UIElements/TitleAndBtnCon'
import Toast from 'react-native-toast-message'
import EmailVerifyComp from '../components/UIComps/ForgotPasswordComps/EmailVerifyComp'
import OtpComp from '../components/UIComps/ForgotPasswordComps/OtpComp'
import ResetPasswordComp from '../components/UIComps/ForgotPasswordComps/ResetPasswordComp'
import TitleAndArrowBack from '../components/UIElements/TitleAndArrowBack'
import { useNavigation, useRoute, RouteProp  } from "@react-navigation/native";

type NavigatorParamList = {
  ForgotPassword: { cameFrom: string}; // Define the parameter type here
};

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const navigation = useNavigation<StackNavigationProp<any, 'ForgotPassword'>>();
  const { theme } = useContext(ThemeContext);
  const route = useRoute<RouteProp<NavigatorParamList, 'ForgotPassword'>>();
  
  const { primary, secondary, text, background, loadingBackground } = theme.colors     
  const [emailSended, setEmailSended] = useState<boolean>(false);
  const [isOneMinuteBind, setisOneMinuteBind] = useState<boolean>(false);
  const [oneMinuteBindEndTime, setOneMinuteBindEndTime] = useState<number>(0);
  const [isLoadingForm, setisLoadingForm] = useState<boolean>(false);
  const [isLoadingResendEmail, setisLoadingResendEmail] = useState<boolean>(false);
  const [isLoadingResetPassword, setisLoadingResetPassword] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string>('');
  const [Digits, setDigits] = useState<string>('');
  const [otpExpireInTime, setotpExpireInTime] = useState<Date>();
  const [userId, setUserId] = useState<string>('');
  const [isOtpVerified, setisOtpVerified] = useState<boolean>(false);
  const {verifyEmail, showToast, resetPassword} = useDataContext();
  const [remainingTime, setRemainingTime] = useState<number>(60); // Initialize with 60 seconds
  const screen = Dimensions.get('window');

    useEffect(() => {
        if (isOneMinuteBind) {
            const interval = setInterval(() => {
                const currentTime = Date.now();
                if (currentTime < oneMinuteBindEndTime) {
                    const timeDiff = Math.max(Math.floor((oneMinuteBindEndTime - currentTime) / 1000), 0);
                    setRemainingTime(timeDiff);
                } else {
                    clearInterval(interval);
                    setisOneMinuteBind(false);
                }
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [isOneMinuteBind, oneMinuteBindEndTime]);
  
    useEffect(() => {
      if(emailSended){
        const currentTime = Date.now();
        const expirationTime = currentTime + 60000; // Adding 1 minute in milliseconds
        setOneMinuteBindEndTime(expirationTime); // Store the expiration time
        setisOneMinuteBind(true);
      }
    },[emailSended])

    const resendEmail = async () => {
      setisLoadingResendEmail(true);
      try{
        console.log(emailValue);
        
        const [isEmailSended, digits, expireIn] = await verifyEmail(emailValue);
        const [messageToast, statusToast, headerToast] = isEmailSended ? 
        ['Please check your email', 'success', 'Email Successfully Resent'] : 
        ['Resend Email Failed', 'error', 'Please try again'];
        setisLoadingResendEmail(false);
        if (isEmailSended) {
          setEmailSended(true);
          setDigits(digits)
          showToast(messageToast, statusToast, headerToast)
          const currentTime = Date.now();
          const expirationTime = currentTime + 60000; // Adding 1 minute in milliseconds
  
          setOneMinuteBindEndTime(expirationTime); // Store the expiration time
          setisOneMinuteBind(true);
  
          await AsyncStorage.setItem('emailSentTime', currentTime.toString());
  
          console.log(`resend Email successfully! Digits: ${digits}, ExpireIn: ${expireIn}`);
        } else {
          showToast(messageToast, statusToast, headerToast)
          console.log('resend Email sending failed.');
          // Handle the failure case here
        }
      } catch (err : any) {
        console.log(err.message);    
      }
    }
    const verifyOtpCode = async (value: {otpCode : string}) => {
      const verified = value.otpCode === Digits
      if(verified){
        showToast('you can now change password', 'success', 'Otp verified Successfully');
        setisOtpVerified(true);
      }
      else{
        showToast('please try again', 'error', 'Otp verify failed');  
      }      
    }
      
    const handleChangePassword = async (value: {password : string}) => {
     try{
      setisLoadingResetPassword(true);
      const isPasswordChanged = await resetPassword(value.password, userId);
      setisLoadingResetPassword(false);
      if(isPasswordChanged) {
        showToast('Password Succesfully saved', 'success', `your about to move to ${route.params.cameFrom}`);
        setTimeout(() => {
          const cameFromVal: string = route.params.cameFrom;      
              
          navigation.navigate(`${cameFromVal}`);

        }, 2000)
      }
      else{
         showToast('Password reset failed !', 'error', 'something went wrong');
      }
    } catch (err) {
      showToast('Password reset failed !', 'error', 'something went wrong');
     }
      
    }


    const handleFormSubmit = async (value: { email: string }) => {
      setisLoadingForm(true);
      setEmailValue(value.email);
      try {
        const [isEmailSended, digits, expireIn, userId] = await verifyEmail(value.email);
        const [messageToast, statusToast, headerToast] = isEmailSended ? 
        ['Please check your email', 'success', 'Email Successfully Sent'] : 
        ['Email sent Failed', 'error', 'Please try again'];
        setisLoadingForm(false);
        if (isEmailSended && userId != null) {
          console.log('success');
          
          setDigits(digits);
          setUserId(userId);
          setotpExpireInTime(expireIn);
          setEmailSended(true);          
          showToast(messageToast, statusToast, headerToast);
        } else {
          showToast(messageToast, statusToast, headerToast);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        // Handle error if needed
      }
    };

    const formatTime = (time: number): string => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: isLoadingForm || isLoadingResendEmail || isLoadingResetPassword ? loadingBackground : background}]}>  
    <TitleAndArrowBack text='Forgot Password' onPress={() => {navigation.goBack()}}/>
    <ScrollView>
        {emailSended ? (isOtpVerified ? ( <ResetPasswordComp isloadingResetPassword={isLoadingResetPassword} handleChangePassword={handleChangePassword}/>) : 
        (            
          <OtpComp 
          emailSended={emailSended} 
          isOneMinuteBind={isOneMinuteBind} 
          verifyOtpCode={verifyOtpCode}
          resendEmail={resendEmail}
          formatTime={formatTime}
          remainingTime={remainingTime}
          isLoadingResendEmail={isLoadingResendEmail}
          />
        ) ) : ( <EmailVerifyComp handleFormSubmit={handleFormSubmit} isLoadingForm={isLoadingForm}/> )}
        </ScrollView>
        <Toast/>
    </View>
)


          


  
    
 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default ForgotPassword