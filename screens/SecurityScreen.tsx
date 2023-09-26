import react, {useState, useContext, useEffect} from 'react';
import {Text, View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Keyboard,Platform } from 'react-native'
import BottomNavbar from '../components/UIElements/BottomNavbar';
import TitleAndArrowBack from '../components/UIElements/TitleAndArrowBack';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { passwordSchema } from '../messages/Statements';
import StyledButton from '../components/UIElements/StyledButton';
import FormInput from '../components/UIElements/FormInput';
import Toast from "react-native-toast-message";
import { ThemeContext } from '../context/ThemeContext';
import { useDataContext } from '../context/DataContext';
import { ActivityIndicator } from '@react-native-material/core';
import LottieView from "lottie-react-native";
import activitiIndicator from '../assets/activitiindicator.json'
import { ScrollView } from 'react-native-gesture-handler';

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
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const handleFormSubmit = async (values: {password: string, newpassword: string}) => {
        setisLoading(true);
        const [isSubmited, message] = await updatePasswordAttempts(values.password, values.newpassword);
        setisLoading(false);
        if(isSubmited) {
            showToast('you can now use your new password', 'success', 'Passwords updated successfully');
        }
        else{
          console.log(message);
            if(message === "Request failed with status code 400"){
              showToast('old password incorrect', 'error', 'Password did not updated');
            } else{
              showToast(message || 'something went wrong', 'error', 'Password did not updated');
            }
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



    const activitiIndicatorAnimation = (<LottieView
      style={{width: 150, height: 150, alignSelf: 'center', marginTop: '50%'}}
      speed={1} 
      source={activitiIndicator}
      autoPlay
      loop={true}
      />)




    return (
        <SafeAreaView style={[styles.container, {backgroundColor: background}]}>
                          <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
            <TitleAndArrowBack text='Security' onPress={() => {navigation.goBack()}}/>
            <ScrollView>
            <View style={styles.FormikCon}>
                {
                    isLoading ? (activitiIndicatorAnimation) : (            <Formik
                        initialValues={{password: "", newpassword: "", confirmPassword: ""}}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                      >
                        
                        {({ handleChange, handleSubmit, values, errors, isValid, dirty, setFieldValue, touched }) => (
                          <>
                            <FormInput
                              startValue={values.password}
                              value={values.password}
                              errorMessage={errors.password}
                              setInput={handleChange('password')}
                              label={'Current Password'}
                            />
                            <FormInput
                              startValue={values.newpassword}
                              value={values.newpassword}
                              errorMessage={errors.newpassword}
                              setInput={handleChange('newpassword')}
                              label={'New Password'}
                            />
                            <FormInput
                            startValue={values.confirmPassword}
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
            <View style={styles.lottieAnimationCon}>

            </View>
            </ScrollView>
            {!isKeyboardVisible && <BottomNavbar />}
            </KeyboardAvoidingView>
            <Toast/>
        </SafeAreaView>
        )
}
export default SecurityScreen
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    lottieAnimationCon: {

    },
    FormikCon: {
        width: "95%",
        alignSelf: 'center'
    }
})