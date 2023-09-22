/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text, Dimensions} from 'react-native';
import BigTitle from './BigTitle';
import activityIndicatorAnimation from '../../assets/activitiindicator.json'
import LottieView from 'lottie-react-native';
import { Formik } from 'formik'
import * as Yup from 'yup';
import { emailSchema } from '../../messages/Statements';
import { EmailVerifyCompProps } from '../../interfaces/interfaces';
import StyledButton from './StyledButton';
import { ThemeContext } from '../../context/ThemeContext';
import FormInput from './FormInput';
import TitleAndArrowBack from './TitleAndArrowBack';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
const screen = Dimensions.get('window');

const validationSchema = Yup.object().shape({
    email: emailSchema,
  });
const EmailVerifyComp: React.FC<EmailVerifyCompProps> = ({isLoadingForm, handleFormSubmit}) => {

    const navigation = useNavigation<StackNavigationProp<any, 'ForgotPassword'>>();

    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors   
    const activitiIndicatorObject = (<LottieView
        style={{width: 100, height: 100 , zIndex: 10, alignSelf: 'center', marginTop: '15%'}}
        speed={1} 
        source={activityIndicatorAnimation}
        autoPlay
        loop={true}
        />)


  return (
    <View style={{backgroundColor: background, height: screen.height, flex: 1}}>
    <TitleAndArrowBack text='Forgot Password' onPress={() => {navigation.goBack()}}/>
    <BigTitle title='Lets verify your email !'/>

      {isLoadingForm ? (
          activitiIndicatorObject
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
  );
};

export default EmailVerifyComp;