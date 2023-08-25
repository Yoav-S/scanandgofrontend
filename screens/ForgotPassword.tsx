import react, {useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { ForgotPasswordProps } from '../interfaces/interfaces'
import BigTitle from '../components/UIComps/BigTitle'
import { useTheme } from '../context/ThemeContext'
import FormInput from '../components/UIComps/FormInput'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { emailSchema } from '../messages/Statements'
import StyledButton from '../components/UIComps/StyledButton'
import OtpInputs from 'react-native-otp-inputs'
import { useDataContext } from '../context/DataContext'
import { ActivityIndicator } from '@react-native-material/core'

const validationSchema = Yup.object().shape({
    email: emailSchema,
  });


const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
    const { theme } = useTheme();
    const [emailSended, setEmailSended] = useState<boolean>(false);
    const [isLoadingForm, setisLoadingForm] = useState<boolean>(false);
    const {verifyEmail} = useDataContext();

    const handleFormSubmit = async (value: { email: string }) => {
        setisLoadingForm(true);
        try {
          const [isEmailSended, digits, expireIn] = await verifyEmail(value.email);
          setisLoadingForm(false)
          if (isEmailSended) {
            setEmailSended(true);
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
            <BigTitle title='Lets Verify Your Email'/>
            <Text style={{color: theme.textColor, marginLeft: '5%'}}>Enter your personal email</Text>
            {
                emailSended ? (
                    <View>
                    <OtpInputs
                    handleChange={(code) => console.log(code)}
                    numberOfInputs={6}
                    autofillFromClipboard={false}/></View>
                    ) : 
                    (   <View>
                        {
                            isLoadingForm ? (<ActivityIndicator size={60}/>) : (<Formik
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
                                </Formik>)
                        }
                        </View>
                        )
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
      },
    
      underlineStyleHighLighted: {
        borderColor: "#03DAC6",
      },
})
export default ForgotPassword