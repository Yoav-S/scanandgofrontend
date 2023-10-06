/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text, Dimensions} from 'react-native';
import activityIndicatorAnimation from '../../../assets/activitiindicator.json'
import LottieView from 'lottie-react-native';
import { Formik } from 'formik'
import * as Yup from 'yup';
import { emailSchema } from '../../../messages/Statements';
import { EmailVerifyCompProps } from '../../../interfaces/interfaces';
import StyledButton from '../../UIElements/StyledButton';
import { ThemeContext } from '../../../context/ThemeContext';
import FormInput from '../../UIElements/FormInput';
import TitleAndArrowBack from '../../UIElements/TitleAndArrowBack';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import verifyemailanimation from '../../../assets/emailverifyanimation.json'
import BigTitle from '../../UIElements/BigTitle';
const screen = Dimensions.get('window');

const validationSchema = Yup.object().shape({
    email: emailSchema,
  });
const EmailVerifyComp: React.FC<EmailVerifyCompProps> = ({isLoadingForm, handleFormSubmit}) => {

    const navigation = useNavigation<StackNavigationProp<any, 'ForgotPassword'>>();

    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background , loadingBackground} = theme.colors   
    const activitiIndicatorObject = (<LottieView
        style={{width: screen.width * 0.2, height: screen.height * 0.1, alignSelf: 'center'}}
        speed={1} 
        source={activityIndicatorAnimation}
        autoPlay
        loop={true}
        />)
        const verifyemailanimationObject = (<LottieView
            style={{width: 200, height: 200 , zIndex: 10, alignSelf: 'center', marginTop: '15%'}}
            speed={1} 
            source={verifyemailanimation}
            autoPlay
            loop={false}
            />)

  return (
    <View>
    <BigTitle title='Email Verification'/>
    <View style={{marginBottom: '5%'}}>
    {verifyemailanimationObject}

    </View>

      {isLoadingForm ? (
        <View style={{alignSelf: 'center', borderRadius: 150, borderWidth: 1, backgroundColor: 'black', alignItems: 'center', marginTop: '15%'}}>
{activitiIndicatorObject}
        </View>
          
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