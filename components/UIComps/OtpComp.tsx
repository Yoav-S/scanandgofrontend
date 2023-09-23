/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {OtpCompProps} from '../../interfaces/interfaces'
import { ThemeContext } from '../../context/ThemeContext';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TitleAndArrowBack from './TitleAndArrowBack';
import LottieView from 'lottie-react-native';
import otpanimation from '../../assets/otpanimation.json'
import activityIndicator from '../../assets/activitiindicator.json'
import BigTitle from './BigTitle';

const screen = Dimensions.get('window');
const OtpComp: React.FC<OtpCompProps> = ({verifyOtpCode, isOneMinuteBind, emailSended, resendEmail, formatTime, remainingTime, isLoadingResendEmail}) => {
    const navigation = useNavigation<StackNavigationProp<any, 'ForgotPassword'>>();

    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors 

    const otpanimationObject = (<LottieView
        style={{width: 200, height: 200 , zIndex: 10}}
        speed={1} 
        source={otpanimation}
        autoPlay
        loop={true}
        />)
        const activityIndicatorObject = (<LottieView
          style={{width: 30, height: 30 , zIndex: 10}}
          speed={1} 
          source={activityIndicator}
          autoPlay
          loop={true}
          />)
  return (
<View style={[styles.otpCon, {marginBottom: '5%', height: screen.height * 0.6}]}>
  <BigTitle title='Verify Your OTP'/>
                        <View style={{alignSelf: 'center', position: 'relative'}}>
                            {otpanimationObject}
                            <View style={[styles.otp]}>
                            <OTPInputView
                                 pinCount={4}
                                 autoFocusOnLoad={false} // Make sure this is set to true
                                 codeInputFieldStyle={styles.underlineStyleBase}
                                 onCodeFilled={(code: string) => verifyOtpCode({ otpCode: code })}
                                 />
                                <View style={{alignSelf: 'center'}}>
                                    {!isOneMinuteBind && emailSended && (
                                        
                                          isLoadingResendEmail ?
                                           (activityIndicatorObject) : 
                                           (
                                        <TouchableOpacity style={{flexDirection: 'row'}} onPress={resendEmail}>
                                            <Text style={{ color: text.primary, marginRight: '3%' }}>Didn’t receive an OTP?</Text>
                                            <Text style={{ color: text.primary, fontWeight: 'bold' }}>Resend OTP</Text>

                                        </TouchableOpacity>)
                                    )}
                                    {isOneMinuteBind && (
                                        <Text style={{ color: text.primary }}>
                                              Resend OTP in {formatTime(remainingTime)}
                                        </Text>
                                    )}
                                </View>
                            </View>


                        </View>

  </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    otpCon: {
      width: '100%',

    },
    otp: {
      width: 250,
      alignSelf: 'center',
      position: 'absolute',
      top: screen.height * 0.3
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
export default OtpComp;