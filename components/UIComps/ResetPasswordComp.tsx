/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text, Dimensions} from 'react-native';
import { Formik } from 'formik'
import * as Yup from 'yup';
import {ResetPasswordCompProps} from '../../interfaces/interfaces'
import BigTitle from './BigTitle';
import { ThemeContext } from '../../context/ThemeContext';
import FormInput from './FormInput';
import StyledButton from './StyledButton';
import { passwordSchema } from '../../messages/Statements';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TitleAndArrowBack from './TitleAndArrowBack';
const screen = Dimensions.get('window');
const passwordValidationSchema = Yup.object().shape({
    password: passwordSchema,
    confirmPassword: Yup.string().required('Field is required').oneOf([Yup.ref('password')], 'Must match the password'),
})
const ResetPasswordComp: React.FC<ResetPasswordCompProps> = ({handleChangePassword}) => {
    const navigation = useNavigation<StackNavigationProp<any, 'ForgotPassword'>>();

    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors     



  return (
    <View style={{backgroundColor: background, height: screen.height, flex: 1}}>
            <TitleAndArrowBack text='Forgot Password' onPress={() => {navigation.goBack()}}/>

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
  );
};

export default ResetPasswordComp;