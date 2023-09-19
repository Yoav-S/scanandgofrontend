import react, {useState, useEffect, useContext} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { ForgotPasswordProps, UserEmailVerificationDetails } from '../interfaces/interfaces'
import BigTitle from '../components/UIComps/BigTitle'
import FormInput from '../components/UIComps/FormInput'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { emailSchema, passwordSchema } from '../messages/Statements'
import StyledButton from '../components/UIComps/StyledButton'
import OtpInputs from 'react-native-otp-inputs'
import { useDataContext } from '../context/DataContext'
import { ActivityIndicator } from '@react-native-material/core'
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ThemeContext } from '../context/ThemeContext'
import TitleAndBtnCon from '../components/UIComps/TitleAndBtnCon'
import Toast from 'react-native-toast-message'
const validationSchema = Yup.object().shape({
    email: emailSchema,
  });
const passwordValidationSchema = Yup.object().shape({
password: passwordSchema,
confirmPassword: Yup.string().required('Field is required').oneOf([Yup.ref('password')], 'Must match the password'),
})

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const navigation = useNavigation<StackNavigationProp<any, 'ForgotPassword'>>();
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors     
  const [emailSended, setEmailSended] = useState<boolean>(false);
  const [isOneMinuteBind, setisOneMinuteBind] = useState<boolean>(false);
  const [oneMinuteBindEndTime, setOneMinuteBindEndTime] = useState<number>(0);
  const [isLoadingForm, setisLoadingForm] = useState<boolean>(false);
  const [isLoadingResendEmail, setisLoadingResendEmail] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string>('');
  const [Digits, setDigits] = useState<string>('');
  const [otpExpireInTime, setotpExpireInTime] = useState<Date>();
  const [userId, setUserId] = useState<string>('');
  const [isOtpVerified, setisOtpVerified] = useState<boolean>(false);
  const {verifyEmail, showToast, resetPassword} = useDataContext();
  const [remainingTime, setRemainingTime] = useState<number>(60); // Initialize with 60 seconds

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
  

    const resendEmail = async () => {
      setisLoadingResendEmail(true);
      try{
        const [isEmailSended, digits, expireIn] = await verifyEmail(emailValue);
        const [messageToast, statusToast, headerToast] = isEmailSended ? 
        ['Please check your email', 'success', 'Email Successfully Resent'] : 
        ['Email Resend Failed', 'error', 'Please try again'];
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
      const isPasswordChanged = await resetPassword(value.password, userId);
      if(isPasswordChanged) {
        showToast('Password Succesfully saved', 'success', 'your about to move to login');
        setTimeout(() => {
          navigation.navigate('Login')

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
    <View style={[styles.container, { backgroundColor: background }]}>
        
        {emailSended ? (
          isOtpVerified ? (
            <View>
            <BigTitle key={1} title='Enter a new Password'/>
             <Text style={{color: text.primary, marginLeft: '5%'}}>Enter the new password for your account</Text>
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
                                  startValue={values.password}
                                  label={'Password'}
                                  onPress={() => {handleChange('password')('')}}
                              />
                              <FormInput
                                  value={values.confirmPassword}
                                  errorMessage={errors.confirmPassword}
                                  startValue={values.confirmPassword}
                                  setInput={handleChange('confirmPassword')}
                                  label={'Confirm Password'}
                                  onPress={() => {handleChange('confirmPassword')('')}}
                              />
                              <StyledButton bigbutton disabled={!isValid || !dirty} onPress={handleSubmit} text={"Change Password"} />
                          </>
                      )}
                  </Formik>
            </View>
            </View>
          ) : (            
          <View style={styles.otpCon}>
                        <BigTitle key={2} title='Verify your OTP'/>
                        <OTPInputView
                          style={styles.otp}
                          pinCount={4}
                          autoFocusOnLoad={false} // Make sure this is set to true
                          codeInputFieldStyle={styles.underlineStyleBase}
                          onCodeFilled={(code: string) => verifyOtpCode({ otpCode: code })}
                          />
      <View>
          {!isOneMinuteBind && emailSended && (
              <TouchableOpacity onPress={resendEmail}>
                  <Text style={{ color: text.primary }}>Didn’t receive an OTP? Resend OTP!</Text>
              </TouchableOpacity>
          )}
          {isOneMinuteBind && (
              <Text style={{ color: text.primary }}>
                    Resend OTP in {formatTime(remainingTime)}
              </Text>
          )}
      </View>
  </View>)

        ) : (
            <View>
              <BigTitle key={3} title='Lets verify your email !'/>

                {isLoadingForm ? (
                    <ActivityIndicator size={60} />
                ) : (
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({ handleChange, handleSubmit, values, errors, isValid, dirty }) => (
                            <>
                                <FormInput
                                    value={values.email}
                                    errorMessage={errors.email}
                                    startValue={values.email}
                                    setInput={handleChange('email')}
                                    label={'Email'}
                                    onPress={() => {handleChange('email')('')}}
                                />
                                <StyledButton bigbutton disabled={!isValid || !dirty} onPress={handleSubmit} text={"Send"} />
                            </>
                        )}
                    </Formik>
                )}
            </View>
        )}
              <Toast/>

    </View>
)


          


  
    
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