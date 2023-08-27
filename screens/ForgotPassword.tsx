import react, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { ForgotPasswordProps } from '../interfaces/interfaces'
import BigTitle from '../components/UIComps/BigTitle'
import { useTheme } from '../context/ThemeContext'
import FormInput from '../components/UIComps/FormInput'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { emailSchema, otpCodeSchema, passwordSchema } from '../messages/Statements'
import StyledButton from '../components/UIComps/StyledButton'
import OtpInputs from 'react-native-otp-inputs'
import { useDataContext } from '../context/DataContext'
import { ActivityIndicator } from '@react-native-material/core'
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input'

import Clipboard from '@react-native-clipboard/clipboard';
import TitleAndBtnCon from '../components/UIComps/TitleAndBtnCon'
const validationSchema = Yup.object().shape({
    email: emailSchema,
  });
const otpValidationSchema = Yup.object().shape({
  otpCode: otpCodeSchema,
});
const passwordValidationSchema = Yup.object().shape({
password: passwordSchema,
confirmPassword: Yup.string().required('Field is required').oneOf([Yup.ref('password')], 'Must match the password'),
})
const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
    const { theme } = useTheme();
    const [emailSended, setEmailSended] = useState<boolean>(false);
    const [isOneMinuteBind, setisOneMinuteBind] = useState<boolean>(false);
    const [oneMinuteBindEndTime, setOneMinuteBindEndTime] = useState<number>(0);
    const [isLoadingForm, setisLoadingForm] = useState<boolean>(false);
    const [isLoadingResendEmail, setisLoadingResendEmail] = useState<boolean>(false);
    const [emailValue, setEmailValue] = useState<string>('');
    const [Digits, setDigits] = useState<string>('');
    const [isOtpVerified, setisOtpVerified] = useState<boolean>(false);
    const {verifyEmail} = useDataContext();
    useEffect(() => {
      if (isOneMinuteBind) {
        const interval = setInterval(() => {
          const currentTime = Date.now();
          if (currentTime > oneMinuteBindEndTime) {
            clearInterval(interval);
            setisOneMinuteBind(false);
          }
        }, 1000);
  
        return () => {
          clearInterval(interval);
        };
      }
    }, [isOneMinuteBind, oneMinuteBindEndTime]);
  

    const resendEmail = async () => {
      setisLoadingResendEmail(true);
      try{
        const [isEmailSended, digits, expireIn] = await verifyEmail(emailValue);
        setisLoadingResendEmail(false);
        if (isEmailSended) {
          setEmailSended(true);
  
          const currentTime = Date.now();
          const expirationTime = currentTime + 60000; // Adding 1 minute in milliseconds
  
          setOneMinuteBindEndTime(expirationTime); // Store the expiration time
          setisOneMinuteBind(true);
  
          await AsyncStorage.setItem('emailSentTime', currentTime.toString());
  
          console.log(`resend Email successfully! Digits: ${digits}, ExpireIn: ${expireIn}`);
        } else {
          console.log('resend Email sending failed.');
          // Handle the failure case here
        }
      } catch (err : any) {
        console.log(err.message);
        
      }
    }
    const verifyOtpCode = async (value: {otpCode : string}) => {
      if(value.otpCode === Digits){
        console.log('verified');
        setisOtpVerified(true);
      }
      console.log('still verified');
      
    }

    const handleChangePassword = async (value: {password : string}) => {

    }


    const handleFormSubmit = async (value: { email: string }) => {
      setisLoadingForm(true);
      setEmailValue(value.email);
      try {
        const [isEmailSended, digits, expireIn] = await verifyEmail(value.email);
        setDigits(digits);
        setisLoadingForm(false);
        if (isEmailSended) {
          setEmailSended(true);
  
          const currentTime = Date.now();
          const expirationTime = currentTime + 60000; // Adding 1 minute in milliseconds
  
          setOneMinuteBindEndTime(expirationTime); // Store the expiration time
          setisOneMinuteBind(true);
  
          await AsyncStorage.setItem('emailSentTime', currentTime.toString());
  
          console.log(`Email sent successfully! Digits: ${digits}, ExpireIn: ${expireIn}`);
        } else {
          console.log('Email sending failed.');
          // Handle the failure case here
        }
      } catch (error) {
        console.error('An error occurred:', error);
        // Handle error if needed
      }
    };
    return (
        <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>

                  
                                      {
            emailSended ? (
              emailSended && isOtpVerified ? (
                <View>
              <BigTitle title='Enter a new Password'/>
              <Text style={{color: theme.textColor}}>Enter the new password for your account</Text>
              <View>
              <Formik
                        initialValues={{ password: '', confirmPassword: '' }}
                        validationSchema={passwordValidationSchema}
                        onSubmit={({ password }) => handleChangePassword({ password })}
                    >
                        {({ handleChange, handleSubmit, values, errors, isValid, dirty, setFieldValue }) => (
                            <>
                                <FormInput
                                    value={values.password}
                                    errorMessage={errors.password}
                                    setInput={handleChange('password')}
                                    label={'Password'}
                                    
                                />
                                <FormInput
                                    value={values.confirmPassword}
                                    errorMessage={errors.confirmPassword}
                                    setInput={handleChange('confirmPassword')}
                                    label={'Confirm Password'}
                                    
                                />
                                <StyledButton disabled={!isValid || !dirty} onPress={handleSubmit} text={"Change Password"} />
                            </>
                        )}
                    </Formik>
              </View>
              </View>
              ) : (

                <View style={styles.otpCon}>
                                <BigTitle title='Verify your OTP'/>
                        <Formik
                            initialValues={{ otpCode: '' }}
                            validationSchema={otpValidationSchema}
                            onSubmit={verifyOtpCode}
                        >
                            {({ handleChange, handleSubmit, values, errors, isValid, dirty, setFieldValue }) => (
                                <OTPInputView
                                    style={styles.otp}
                                    pinCount={4}
                                    autoFocusOnLoad
                                    onCodeChanged={(code: string) => handleChange('otpCode')(code)}
                                    codeInputFieldStyle={styles.underlineStyleBase}
                                    onCodeFilled={() => {handleSubmit}}
                                />
                            )}
                        </Formik>
                                      <View>
                                              {!isOneMinuteBind && emailSended && (
                                                <TouchableOpacity onPress={resendEmail}>
                                                  <Text style={{color: theme.textColor}}>Didn’t receive an OTP? Resend OTP!</Text>
                                                </TouchableOpacity>
                                              )}
    
                                              {isOneMinuteBind && (
                                                <Text style={{color: theme.textColor}}>
                                                  Resend OTP in {Math.ceil((oneMinuteBindEndTime - Date.now()) / 1000)} seconds
                                                </Text>
                                              )}
                                      </View>
                                   </View>
              )
            ) : (
              <View>
              <BigTitle title='Lets Verify Your Email'/>

                <Text style={{color: theme.textColor, marginLeft: '5%'}}>Enter your personal email</Text>

              {
                isLoadingForm ? (<ActivityIndicator size={60}/>) : 
                (<Formik
                    initialValues={{ email: ''}}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                    >
                        {({ handleChange, handleSubmit, values, errors , isValid, dirty}) => (
                    <>
                        <FormInput
                        value={values.email}
                        errorMessage={errors.email}
                        setInput={handleChange('email')}
                        label={'Email'}
                        />
                        <StyledButton disabled={!isValid || !dirty} onPress={handleSubmit} text={"Send"} />
        
                    </>
                        )}
                  </Formik>
                  )
            }
        </View>




            )
          }
                </View>)
            

          


  
    
 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    otpCon: {
      width: '100%',
      position: 'absolute',
      marginTop: '25%',
      alignItems: 'center',
    },
    otp: {
      width: 250,
      backgroundColor: 'lightGray',
    },
    underlineStyleBase: {
        color: 'red'
      },
      otpinputs: {
        width: 30,
        height: 45,
        borderWidth: 1,
        borderBottomWidth: 1,
      }
})
export default ForgotPassword