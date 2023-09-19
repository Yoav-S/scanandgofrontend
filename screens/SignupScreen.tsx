import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
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
import Toast from 'react-native-toast-message';
import { requestUserPermission } from '../utils/requests';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'react-native-elements';
import { Input } from '@rneui/themed';

import { ThemeContext } from '../context/ThemeContext';
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
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors 
  const [isBirthDateValidated, setIsBirthDateValidated] = useState<boolean>(false);
  const { signupAttempt, showToast , autoLoginNewUser} = useDataContext();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const inputRef = useRef(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [readTerms, setReadTerms] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [openDateModal, setopenDateModal] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [previewedDate, setPreviewedDate] = useState<string>('');
  const setOpenModalHandler = () => {
    setopenDateModal(!openDateModal);
  };


  const handleFormSubmit = async (values: Registergion_Form_Props) => {
    console.log(values);
    setIsBirthDateValidated(true);
    setisLoading(true);
      const deviceToken = await requestUserPermission();
        values.deviceToken = deviceToken;
        const [isRegistered, message, token] = await signupAttempt(values);
        const [messageToast, statusToast, headerToast] = isRegistered ? [`${message} moving to homepage`, 'success', 'Sign-Up Successfully 👋'] : [message, 'error', 'Sign-Up failed'];
        console.log(values);  
        setisLoading(false);  
        showToast(messageToast, statusToast, headerToast);
        if (!isRegistered || !token) return
        setTimeout(() => {
          autoLoginNewUser(token)
        }, 3000)
  };



  
    
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <BigTitle title={'Create An Account'} />
{ isLoading ? (<ActivityIndicator size={60}/>) : (<ScrollView style={{margin: '3%'}}>
  <View>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '', fullName: '', gender: '', birthDate: '', termsAndConditions: false }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        
        {({ handleChange, handleSubmit, values, errors, isValid, dirty, setFieldValue, touched }) => (
          <>
            <FormInput
              value={values.fullName}
              errorMessage={errors.fullName}
              startValue={values.fullName}
              setInput={handleChange('fullName')}
              label={'Full Name'}
              onPress={() => {handleChange('fullName')('')}}

            />
            <FormInput
              value={values.email}
              errorMessage={errors.email}
              startValue={values.email}
              setInput={handleChange('email')}
              label={'Email'}
              onPress={() => {handleChange('email')('')}}

            />
            <FormInput
              value={values.password}
              errorMessage={errors.password}
              startValue={values.password}
              setInput={handleChange('password')}
              label={'Password'}
              onPress={() => {handleChange('password')('')}}
            />
            <FormInput
              value={values.confirmPassword}
              startValue={values.confirmPassword}
              errorMessage={errors.confirmPassword}
              setInput={
                handleChange('confirmPassword')
              }
              onPress={() => {handleChange('confirmPassword')('')}}
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

            <View style={{marginTop: '10%', width: '90%'}}>
              <View style={{flexDirection:'column'}}>
                <Text style={{color: text.primary, fontWeight: 'bold', fontSize: 17,marginLeft: '7%'}}>Date Of Birth</Text>
                <Input
                 placeholder='mm/dd/yyyy'
                 inputContainerStyle={{width: screen.width * 0.5, marginLeft: '4%'}}
                 onFocus={() => {
                   setopenDateModal(true);
                   setIsInputFocused(true); // Set input focus to true when focused
                 }}
                 onBlur={() => setIsInputFocused(false)} // Set input focus to false when blurred
                 value={previewedDate}
                 inputStyle={{color: text.primary}}
                 // Remove ref={inputRef}
                  />
              </View>
              <View style={{flexDirection: 'row', width: '95%', justifyContent: 'space-between'}}>
              <DatePicker
                style={styles.datemodal}
                modal
                maximumDate={new Date()}
                open={openDateModal}
                date={date}
                mode="date"
                onConfirm={newDate => {
                  setopenDateModal(false);
                  setDate(newDate);
                  const isoDate = newDate.toISOString();
                  console.log(isoDate);
                  const formattedDate = newDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  });
                  setPreviewedDate(formattedDate);
                  setFieldValue('birthDate', isoDate);
                  setIsBirthDateValidated(true); // Update the validation flag
                }}
                onCancel={() => {
                  setIsInputFocused(false);
                  setopenDateModal(false);
                }}
              />
              {!(values.birthDate?.length === 0) && (
                <View style={{ marginLeft: '10%' , flexDirection: 'row'}}>
              <Text style={{color: text.primary}}>{values.birthDate?.substring(0,10)}</Text>
              <View style={{backgroundColor: text.primary, borderRadius: 50, marginLeft: '5%'}}>
              <Icon name="check"  size={20} color={'green'}/>

              </View>

              </View>
              )}
              </View>

              {!isBirthDateValidated && touched.birthDate && errors.birthDate && (
                <Text style={{ color: 'red' }}>{errors.birthDate}</Text>
              )}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: '5%' }}>
            <CheckBox
                style={{ alignSelf: 'center' }}
                center
                checkedColor='green'
                checked={values.termsAndConditions && readTerms}
                onPress={() => {
                  if (readTerms) {
                    setFieldValue('termsAndConditions', !values.termsAndConditions);
                  }
                }}
                disabled={!readTerms}
              />
              <TouchableOpacity onPress={() => setModalOpen(true)}>
                <Text style={{ color: text.secondary, textDecorationLine: 'underline' }}>View Terms and Conditions</Text>
              </TouchableOpacity>
            </View>
            <Modal
             style={[styles.modal, {backgroundColor: 'red'}]}
             isOpen={isModalOpen}
             onClosed={() => setModalOpen(false)}
            >
              <View style={{height: screen.height}}>

              <ScrollView style={styles.modalContent}>
                <Text style={{color: text.primary, lineHeight: 25}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
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
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
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
              </View>

              <StyledButton
              bigbutton
                text="I have read and agree"
                onPress={() => {
                setModalOpen(false);
                setFieldValue('termsAndConditions', true);
                setReadTerms(true); // Set readTerms to true when the user agrees
              }}
              />

            </Modal>
            <StyledButton
            bigbutton              
            disabled={!isValid || !dirty || (!values.termsAndConditions && !readTerms)}
            onPress={handleSubmit}
            text={'Sign up'}/>
          </>
        )}
      </Formik>
      <StyledButton bigbutton disabled={false} onPress={() => {navigation.navigate('Login')}} text={'Back to login'} />
      </View>
        </ScrollView>

     )}
  <Toast/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  datemodal: {
  },
  modal: {
    height: screen.height,
    width: screen.width,
    padding: '5%',
  },
  modalContent: {
    margin: '2%',
    height: '100%',
    flex: 1
  }
});

export default SignupScreen;
