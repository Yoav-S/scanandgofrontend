import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
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
import { emailSchema, fullnameSchema, passwordSchema, genderSchema, birthDateSchema, termsSchema } from '../messages/Statements';
import { Registergion_Form_Props } from '../interfaces/interfaces';
import { useDataContext } from '../context/DataContext';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { CheckBox } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';
import { ActivityIndicator } from '@react-native-material/core';
const validationSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: Yup.string().required('Field is required').oneOf([Yup.ref('password')], 'Must match the password'),
  fullName: fullnameSchema,
  gender: genderSchema,
  birthDate: birthDateSchema,
  termsAndConditions: termsSchema
});
const screen = Dimensions.get('window');

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, 'Signup'>>();
  const { setToken } = useToken();
  const { theme } = useTheme();
  const [isBirthDateValidated, setIsBirthDateValidated] = useState<boolean>(false);
  const {apiUrl} = useDataContext();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [readTerms, setReadTerms] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
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
    setisLoading(true);
    try {
      const token = await requestPermission();
      if (token !== null) {
        values.deviceToken = token;
        console.log(values);    
    //   const response = await axios.post(apiUrl + 'auth/signup', {
    //     values
    //   });
    setisLoading(false);
       showMessage({
        message: "Success",
        description: "success",
        type: "success",
        backgroundColor: "green", // background color
        color: "#606060", // text color
      });
   } else {
    setisLoading(false);
       showMessage({
         message: "failure",
         description: "Permission denied",
         type: "danger",
         backgroundColor: "red", // background color
         color: "#606060", // text color
       });
     }
    } catch (error: any) {
      setisLoading(false);
      showMessage({
        message: "failure",
        description: error.message,
        type: "danger",
        backgroundColor: "red", // background color
        color: "#606060", // text color
      });
      
    }
    setisLoading(false);

  };

  useEffect(() => {
    const onTokenRefreshListener = messaging().onTokenRefresh((fcmToken : any) => {
      console.log('Refreshed token:', fcmToken);
    });  
    return () => onTokenRefreshListener();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>

{ isLoading ? (<ActivityIndicator/>) : (  <View><BigTitle title={'Signup'} />
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '', fullName: '', gender: '', birthDate: '', termsAndConditions: false }}
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

            <View style={{marginTop: '4%'}}>
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
              {isBirthDateValidated && touched.birthDate && errors.birthDate && (
                <Text style={{ color: 'red' }}>{errors.birthDate}</Text>
              )}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <CheckBox
                style={{ alignSelf: 'center' }}
                center
                checked={values.termsAndConditions && readTerms}
                onPress={() => {
                  if (readTerms) {
                    setFieldValue('termsAndConditions', !values.termsAndConditions);
                  }
                }}
                disabled={!readTerms}
              />
              <TouchableOpacity onPress={() => setModalOpen(true)}>
                <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>View Terms and Conditions</Text>
              </TouchableOpacity>
            </View>
            <Modal
             style={[styles.modal, {backgroundColor: theme.backgroundColor}]}
             isOpen={isModalOpen}
             onClosed={() => setModalOpen(false)}
            >
              <ScrollView style={styles.modalContent}>
                <Text style={{color: theme.textColor, lineHeight: 25}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                          numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                          optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                          obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                          nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                          tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                          quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
                          sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                          recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
                          minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
                          quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
                          fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
                          consequuntur! Commodi minima excepturi repudiandae velit hic maxime
                          </Text>
              </ScrollView>
              <StyledButton
                text="I have read and agree"
                onPress={() => {
                setModalOpen(false);
                setFieldValue('termsAndConditions', true);
                setReadTerms(true); // Set readTerms to true when the user agrees
              }}
              />

            </Modal>
            <StyledButton              
            disabled={!isValid || !dirty || (!values.termsAndConditions && !readTerms)}
            onPress={handleSubmit}
            text={'Sign up'}/>
          </>
        )}
      </Formik>
      <StyledButton disabled={false} onPress={() => {navigation.navigate('Login')}} text={'Back to login'} />
      </View>
     )}



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
  modal: {
    height: screen.height,
    width: screen.width,
  },
  modalContent: {
    margin: '2%'
  }
});

export default SignupScreen;
