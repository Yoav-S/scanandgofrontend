import react, {useState, useContext, useEffect} from 'react';
import {Text, View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'
import BottomNavbar from '../components/UIElements/BottomNavbar';
import TitleAndArrowBack from '../components/UIElements/TitleAndArrowBack';
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Icon } from 'react-native-elements';

import DatePicker from 'react-native-date-picker';
import TitleAndBtnCon from '../components/UIElements/TitleAndBtnCon';
import AllCheckBoxCategories from '../components/UIElements/AllCheckboxCategories';
import FormInput from '../components/UIElements/FormInput';
import { emailSchema, fullnameSchema, genderSchema, birthDateSchema } from '../messages/Statements';
import StyledButton from '../components/UIElements/StyledButton';
import { ThemeContext } from '../context/ThemeContext';
import Toast from "react-native-toast-message";
import { useDataContext } from '../context/DataContext';
import { ActivityIndicator } from '@react-native-material/core';
import { ScrollView } from 'react-native-gesture-handler';
const validationSchema = Yup.object().shape({
    email: emailSchema,
    fullName: fullnameSchema,
    gender: genderSchema,
    birthDate: birthDateSchema,
  });


const EditProfile: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const { primary, secondary, text, background } = theme.colors 
    const navigation = useNavigation<StackNavigationProp<any, 'EditProfile'>>();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [openDateModal, setopenDateModal] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const [isBirthDateValidated, setIsBirthDateValidated] = useState<boolean>(false);
    const {showToast, updateDetailsAttempt, isLoadingModal, setisLoadingModal} = useDataContext();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const setOpenModalHandler = () => {
        setopenDateModal(!openDateModal);
      };

    const handleFormSubmit = async (values: {email: string, fullName: string, gender: string, birthDate: string}) => {
        setisLoadingModal(true);
        const isDetailsSaved = await updateDetailsAttempt(values.email, values.fullName, values.gender, values.birthDate);     
        setisLoadingModal(false);
        if(isDetailsSaved) {
          showToast('You have succesfully updated your details', 'success', 'Details Saved !');
          setTimeout(() => {
            navigation.navigate('Settings');
          }, 2000)
        }
        else{
            showToast('Something went wrong', 'error', 'Update Details Failed !')
        }
        
    }



    useEffect(() => {
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false);
        },
      );
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardVisible(true);
        },
      );

  
      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);



    return (
        <SafeAreaView style={[styles.container,{backgroundColor: background}]}>
                <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
            <TitleAndArrowBack text='Edit Profile' onPress={() => {navigation.goBack()}}/>
<ScrollView>
                <View style={styles.FormikCon}>
                <Formik
            initialValues={{ email: '', fullName: '', gender: '', birthDate: '' }}
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
                />
                <FormInput
                  value={values.email}
                  startValue={values.email}
                  errorMessage={errors.email}
                  setInput={handleChange('email')}
                  label={'Email'}
                />
            <View style={{width: '90%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: '7%'}}>
                <Button 
                titleStyle={{fontWeight: '100', color: text.primary}}
                buttonStyle={[styles.selectbirthdateBtn,{borderColor: text.primary, borderWidth: 1, borderRadius: 8}]}
                title='SELECT BIRTH DATE' 
                onPress={() => {
                  setOpenModalHandler();
                  // Mark the birthDate field as touched to trigger validation
                  touched.birthDate = true;
                }}/>
              <DatePicker
                modal
                maximumDate={new Date()}
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
              {!(values.birthDate?.length === 0) && (
                <View style={{ marginLeft: '10%' , flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: text.primary}}>{values.birthDate?.substring(0,10)}</Text>
              <View style={{padding: '1%', backgroundColor: 'green', borderRadius: 50}}><Icon name="check" iconStyle={{fontWeight: 'bold'}} color={text.primary} size={20}/></View>
              
              </View>
              )}
</View>
              {!isBirthDateValidated && touched.birthDate && errors.birthDate && (
                <Text style={{ color: 'red' }}>{errors.birthDate}</Text>
              )}
            </View>
    
                <AllCheckBoxCategories
                  title="Gender"
                  value={values.gender}
                  errorMessage={errors.gender}
                  categories={['male', 'female']}
                  setSelectedCategories={(value: any) => handleChange('gender')(value)}
                  selectedCategories={selectedCategories}
                  isSingleCategory
                />
                    <StyledButton onPress={handleSubmit} text='Save' bigbutton disabled={!isValid || !dirty}/>
    
            
    
              </>
            )}
          </Formik>
                </View></ScrollView>


                    {!isKeyboardVisible && <BottomNavbar />}
            </KeyboardAvoidingView>
            <Toast/>
        </SafeAreaView>
    )
}
export default EditProfile
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    FormikCon: {
        width: "95%",
        alignSelf: 'center'
    },
    selectbirthdateBtn:{
      backgroundColor: 'transparent'
    }
})