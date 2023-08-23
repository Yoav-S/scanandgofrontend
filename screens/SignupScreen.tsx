import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import { useToken } from '../context/TokenContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BigTitle from '../components/UIComps/BigTitle';
import FormInput from '../components/UIComps/FormInput';
import AllCheckBoxCategories from '../components/UIComps/AllCheckboxCategories';
import StyledButton from '../components/UIComps/StyledButton';
import DatePicker from 'react-native-date-picker';
import TitleAndBtnCon from '../components/UIComps/TitleAndBtnCon';
import messaging from '@react-native-firebase/messaging'; // Import Firebase messaging
import { emailSchema, fullnameSchema, passwordSchema, genderSchema } from '../messages/Statements';
import { Registergion_Form_Props } from '../interfaces/interfaces';
import { useDataContext } from '../context/DataContext';
const birthDateSchema = Yup.string().required('Field is required');

const validationSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: Yup.string().required('Field is required').oneOf([Yup.ref('password')], 'Must match the password'),
  fullName: fullnameSchema,
  gender: genderSchema,
  birthDate: birthDateSchema
});

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, 'Signup'>>();
  const { setToken } = useToken();
  const { theme } = useTheme();
  const [isBirthDateValidated, setIsBirthDateValidated] = useState<boolean>(false);
  const {apiUrl} = useDataContext();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [openDateModal, setopenDateModal] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const setOpenModalHandler = () => {
    setopenDateModal(!openDateModal);
  };

  const requestPermission = async (): Promise<string | null> => {
    try {
      await messaging().requestPermission();
      console.log('Permission granted');
      const token = await getDeviceToken();
      return token;
    } catch (error) {
      console.error('Permission denied:', error);
      return null;
    }
  };
  
  const getDeviceToken = async (): Promise<string | null> => {
    try {
      const token = await messaging().getToken();
      console.log('Device Token:', token);
      return token;
    } catch (error) {
      console.error('Error getting device token:', error);
      return null;
    }
  };
  
  const handleFormSubmit = async (values: Registergion_Form_Props) => {
    console.log(values);
    setIsBirthDateValidated(true);
    try {
      const token = await requestPermission();
      if (token !== null) {
        values.deviceToken = token;
        console.log(values);
        
  //     const response = await axios.post(apiUrl, {
  //       values
  //     });
  
        // Log the response from the server
   //     console.log('Response from server:', response.data);
      } else {
        console.log('Permission denied or error occurred.');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const onTokenRefreshListener = messaging().onTokenRefresh((fcmToken : any) => {
      console.log('Refreshed token:', fcmToken);
    });  
    return () => onTokenRefreshListener();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <BigTitle title={'Signup'} />
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '', fullName: '', gender: '', birthDate: '' }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        
        {({ handleChange, handleSubmit, values, errors, isValid, dirty, setFieldValue, touched }) => (
          <>
          {console.log('errors:', errors)}
            <FormInput
              value={values.fullName}
              errorMessage={errors.fullName}
              setInput={handleChange('fullName')}
              label={'Full Name'}
            />
            <FormInput
              value={values.email}
              errorMessage={errors.email}
              setInput={handleChange('email')}
              label={'Email'}
            />
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
            <AllCheckBoxCategories
              title="Gender"
              value={values.gender}
              errorMessage={errors.gender}
              categories={['male', 'female']}
              setSelectedCategories={(value: any) => handleChange('gender')(value)}
              selectedCategories={selectedCategories}
              isSingleCategory
            />

            <View>
              <TitleAndBtnCon
                text="Date of birth"
                btnbold
                onPress={() => {
                  setOpenModalHandler();
                  // Mark the birthDate field as touched to trigger validation
                  touched.birthDate = true;
                }}
                btnlabel="Open Date book"
              />
              <DatePicker
                style={styles.datemodal}
                modal
                open={openDateModal}
                date={date}
                mode="date"
                onConfirm={newDate => {
                  setopenDateModal(false);
                  setDate(newDate);
                  const isoDate = newDate.toISOString();
                  setFieldValue('birthDate', isoDate);
                  setIsBirthDateValidated(true); // Update the validation flag
                }}
                onCancel={() => {
                  setopenDateModal(false);
                }}
              />
              {/* Show error message only if birthDate has been validated and there's an error */}
              {isBirthDateValidated && touched.birthDate && errors.birthDate && (
                <Text style={{ color: 'red' }}>{errors.birthDate}</Text>
              )}
            </View>

            <StyledButton disabled={!isValid || !dirty} onPress={handleSubmit} text={'Sign up'} />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  datemodal: {
  },
});

export default SignupScreen;
