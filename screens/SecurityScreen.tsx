import react, {useState, useContext} from 'react';
import {Text, View, StyleSheet, SafeAreaView } from 'react-native'
import BottomNavbar from '../components/UIComps/BottomNavbar';
import TitleAndArrowBack from '../components/UIComps/TitleAndArrowBack';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { passwordSchema } from '../messages/Statements';
import StyledButton from '../components/UIComps/StyledButton';
import FormInput from '../components/UIComps/FormInput';
import Toast from "react-native-toast-message";
import { ThemeContext } from '../context/ThemeContext';
import { useDataContext } from '../context/DataContext';
import { ActivityIndicator } from '@react-native-material/core';
const validationSchema = Yup.object().shape({
password: passwordSchema ,
newpassword: passwordSchema,
confirmPassword: Yup.string().required('Field is required').oneOf([Yup.ref('newpassword')], 'Must match the password'),

});
const SecurityScreen: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors     
  const { updatePasswordAttempts, showToast} = useDataContext();
    const navigation = useNavigation<StackNavigationProp<any, 'SecurityScreen'>>();
    const [isLoading, setisLoading] = useState<boolean>(false);
    const handleFormSubmit = async (values: {password: string, newpassword: string}) => {
        setisLoading(true);
        const isSubmited = await updatePasswordAttempts(values.password, values.newpassword);
        setisLoading(false);
        if(isSubmited) {
            showToast('you can now use your new password', 'success', 'Passwords updated successfully');
        }
        else{
            showToast('something went wrong', 'error', 'Password did not updated');
        }
    }
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: background}]}>
            <TitleAndArrowBack text='Security' onPress={() => {navigation.goBack()}}/>
            <View style={styles.FormikCon}>
                {
                    isLoading ? (<ActivityIndicator size={70}/>) : (            <Formik
                        initialValues={{password: "", newpassword: "", confirmPassword: ""}}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                      >
                        
                        {({ handleChange, handleSubmit, values, errors, isValid, dirty, setFieldValue, touched }) => (
                          <>
                            <FormInput
                              value={values.password}
                              errorMessage={errors.password}
                              setInput={handleChange('password')}
                              label={'Current Password'}
                            />
                            <FormInput
                              value={values.newpassword}
                              errorMessage={errors.password}
                              setInput={handleChange('newpassword')}
                              label={'New Password'}
                            />
                            <FormInput
                            value={values.confirmPassword}
                            errorMessage={errors.confirmPassword}
                            setInput={handleChange('confirmPassword')}
                            label={'Repeat Password'}
                            />
                            <StyledButton onPress={handleSubmit} text='Save' bigbutton disabled={!isValid || !dirty}/>
                          </>
                        )}
                      </Formik>  )
                }
 
            </View>
            <BottomNavbar />
            <Toast/>
        </SafeAreaView>
        )
}
export default SecurityScreen
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    FormikCon: {
        width: "95%",
        alignSelf: 'center'
    }
})