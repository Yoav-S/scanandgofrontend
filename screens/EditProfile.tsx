import react, {useState, useContext} from 'react';
import {Text, View, StyleSheet, SafeAreaView } from 'react-native'
import BottomNavbar from '../components/UIComps/BottomNavbar';
import TitleAndArrowBack from '../components/UIComps/TitleAndArrowBack';
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-native-date-picker';
import TitleAndBtnCon from '../components/UIComps/TitleAndBtnCon';
import AllCheckBoxCategories from '../components/UIComps/AllCheckboxCategories';
import FormInput from '../components/UIComps/FormInput';
import { emailSchema, fullnameSchema, genderSchema, birthDateSchema } from '../messages/Statements';
import StyledButton from '../components/UIComps/StyledButton';
import { ThemeContext } from '../context/ThemeContext';
import Toast from "react-native-toast-message";
import { useDataContext } from '../context/DataContext';
import { ActivityIndicator } from '@react-native-material/core';
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
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const [isBirthDateValidated, setIsBirthDateValidated] = useState<boolean>(false);
    const {showToast, updateDetailsAttempt} = useDataContext();
    const setOpenModalHandler = () => {
        setopenDateModal(!openDateModal);
      };

    const handleFormSubmit = async (values: {email: string, fullName: string, gender: string, birthDate: string}) => {
      setisLoading(true);
        const isDetailsSaved = await updateDetailsAttempt(values.email, values.fullName, values.gender, values.birthDate);
        
        setisLoading(false);
        if(isDetailsSaved) {
            showToast('You have succesfully updated your details', 'success', 'Details Saved !');
        }
        else{
            showToast('Something went wrong', 'error', 'Update Details Failed !')
        }
        
    }

    return (
        <SafeAreaView style={[styles.container,{backgroundColor: background}]}>
            <TitleAndArrowBack text='Edit Profile' onPress={() => {navigation.goBack()}}/>
            {
              isLoading ? (<ActivityIndicator size={60}/>) : (            <View style={styles.FormikCon}>
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
                  setInput={handleChange('fullName')}
                  label={'Full Name'}
                />
                <FormInput
                  value={values.email}
                  errorMessage={errors.email}
                  setInput={handleChange('email')}
                  label={'Email'}
                />
                    <View style={{marginTop: '10%'}}>
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
                </View>)
            }

            <BottomNavbar/>
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
    }
})