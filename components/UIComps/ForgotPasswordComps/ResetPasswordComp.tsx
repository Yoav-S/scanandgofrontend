/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text, Dimensions} from 'react-native';
import { Formik } from 'formik'
import * as Yup from 'yup';
import {ResetPasswordCompProps} from '../../../interfaces/interfaces'
import { ThemeContext } from '../../../context/ThemeContext';
import FormInput from '../../UIElements/FormInput';
import StyledButton from '../../UIElements/StyledButton';
import { passwordSchema } from '../../../messages/Statements';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TitleAndArrowBack from '../../UIElements/TitleAndArrowBack';
import LottieView from 'lottie-react-native';
import activityIndicator from '../../../assets/activitiindicator.json'
import resetpasswordanimation from '../../../assets/resetpasswordanimation.json'
import BigTitle from '../../UIElements/BigTitle';

const screen = Dimensions.get('window');
const passwordValidationSchema = Yup.object().shape({
    password: passwordSchema,
    confirmPassword: Yup.string().required('Field is required').oneOf([Yup.ref('password')], 'Must match the password'),
})
const ResetPasswordComp: React.FC<ResetPasswordCompProps> = ({handleChangePassword, isloadingResetPassword}) => {
    const navigation = useNavigation<StackNavigationProp<any, 'ForgotPassword'>>();

    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors     
    const activityIndicatorObject = (<LottieView
        style={{width: 75, height: 75 , zIndex: 10, alignSelf: 'center', marginTop: screen.height * 0.15}}
        speed={1} 
        source={activityIndicator}
        autoPlay
        loop={true}
        />)
        const resetpasswordanimationObject = (<LottieView
            style={{width: 250, height: 250 , zIndex: 10, alignSelf: 'center', marginTop: '5%', marginBottom: '5%'}}
            speed={1} 
            source={resetpasswordanimation}
            autoPlay
            loop={true}
            />)


  return (
    <View style={{ marginBottom: '5%'}}>
        <BigTitle title='Enter a new password'/>
    {resetpasswordanimationObject}
     <Text style={{color: text.primary, marginLeft: '5%',marginBottom: '5%'}}>Enter the new password for your account</Text>
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
                        <StyledButton bigbutton disabled={!isValid || !dirty || isloadingResetPassword} onPress={handleSubmit} text={"Change Password"} />
                    </>
                )}
            </Formik>

    </View>
    </View>
  );
};

export default ResetPasswordComp;